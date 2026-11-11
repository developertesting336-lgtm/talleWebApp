import axios from "axios";
import { apiClient } from "./api";

export type ApiBlogPost = {
  _id: string;
  userName: string;
  category: string;
  title: string;
  blogPost: string;
  status: string;
  createdAt: string;
  updatedAt: string;
  __v?: number;
};

export type BlogsApiResponse = {
  success: boolean;
  total: number;
  page: number;
  pages: number;
  blogs: ApiBlogPost[];
};

export type CreateBlogPayload = {
  yourName: string;
  category: string;
  title: string;
  blogPost: string;
};

export type CreateBlogResponse = {
  success?: boolean;
  message?: string;
  blog?: ApiBlogPost;
};

/** Fetches paginated blog posts from GET /blogs. */
export async function fetchBlogs(page = 1): Promise<BlogsApiResponse> {
  const { data } = await apiClient.get<BlogsApiResponse>("/blogs", {
    params: { page },
  });
  return data;
}

/**
 * Searches pages from GET /blogs for a post matching `_id`.
 * Avoids relying on an unconfirmed single-post endpoint while staying paginated.
 */
export async function fetchBlogById(id: string): Promise<{ post: ApiBlogPost | null; related: ApiBlogPost[] }> {
  const firstPage = await fetchBlogs(1);
  const allApproved: ApiBlogPost[] = [...filterApprovedBlogs(firstPage.blogs)];
  const matchFirst = allApproved.find((b) => b._id === id);
  if (matchFirst) {
    return { post: matchFirst, related: allApproved.filter((b) => b._id !== id).slice(0, 3) };
  }

  for (let page = 2; page <= (firstPage.pages || 1); page += 1) {
    const next = await fetchBlogs(page);
    const approved = filterApprovedBlogs(next.blogs);
    allApproved.push(...approved);
    const found = approved.find((b) => b._id === id);
    if (found) {
      return { post: found, related: allApproved.filter((b) => b._id !== id).slice(0, 3) };
    }
  }

  return { post: null, related: allApproved.slice(0, 3) };
}

/** Submits a new blog post to POST /blogs. */
export async function createBlogPost(payload: CreateBlogPayload): Promise<CreateBlogResponse> {
  const { data } = await apiClient.post<CreateBlogResponse>("/blogs", payload);
  return data;
}

/** Keeps approved posts (or posts with no status field) for public display. */
export function filterApprovedBlogs(blogs: ApiBlogPost[] = []): ApiBlogPost[] {
  return blogs.filter((b) => !b.status || b.status === "approved");
}

/** Detects whether blog body content contains HTML markup. */
export function isHtmlContent(text: string): boolean {
  return /<[a-z][\s\S]*>/i.test(text);
}

/** Extracts readable plain text from HTML or plain-text blog content. */
export function stripHtml(text: string): string {
  const spaced = text
    .replace(/<(br|\/p|\/div|\/li|\/h[1-6]|\/blockquote)\b[^>]*>/gi, " ")
    .replace(/<[^>]+>/g, " ");

  return spaced
    .replace(/&nbsp;/gi, " ")
    .replace(/&amp;/gi, "&")
    .replace(/&lt;/gi, "<")
    .replace(/&gt;/gi, ">")
    .replace(/&quot;/gi, '"')
    .replace(/&#39;/gi, "'")
    .replace(/\s+/g, " ")
    .trim();
}

/** Builds a clean short excerpt from raw or HTML blog body text. */
export function buildExcerpt(text: string, maxLength = 160): string {
  const normalized = stripHtml(text);
  if (normalized.length <= maxLength) return normalized;
  return `${normalized.slice(0, maxLength - 1).trimEnd()}…`;
}

/** Estimates reading time in minutes from plain-text word count. */
export function estimateReadMinutes(text: string): number {
  const words = stripHtml(text).split(/\s+/).filter(Boolean).length;
  return Math.max(1, Math.ceil(words / 200));
}

/** Splits raw blog body text into display paragraphs. */
export function splitParagraphs(text: string): string[] {
  const byBlankLine = text
    .split(/\n\s*\n/)
    .map((p) => p.trim())
    .filter(Boolean);
  if (byBlankLine.length > 0) return byBlankLine;
  return text
    .split(/\n/)
    .map((p) => p.trim())
    .filter(Boolean);
}

/** Extracts a user-friendly error message from an Axios or unknown error. */
export function getApiErrorMessage(err: unknown, fallback: string): string {
  if (axios.isAxiosError(err)) {
    const data = err.response?.data as { message?: string; error?: string } | undefined;
    if (data?.message) return data.message;
    if (data?.error) return data.error;
    if (err.code === "ERR_NETWORK") {
      return "Unable to reach the blog server. Please make sure the API is running and try again.";
    }
    if (err.message) return err.message;
  }
  if (err instanceof Error && err.message) return err.message;
  return fallback;
}


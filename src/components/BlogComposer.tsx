"use client";

import dynamic from "next/dynamic";
import { useState, type FormEvent } from "react";
import { blogCategories } from "@/lib/blog";
import { createBlogPost, getApiErrorMessage, type ApiBlogPost } from "@/lib/blog-api";

const RichTextEditor = dynamic(
  () => import("@/components/RichTextEditor").then((m) => m.RichTextEditor),
  {
    ssr: false,
    loading: () => (
      <div
        aria-hidden="true"
        className="mt-2 h-[268px] animate-pulse rounded-lg border border-cream/20 bg-white/[0.04]"
      />
    ),
  },
);

const field =
  "mt-2 w-full rounded-lg border border-cream/20 bg-white/[0.04] px-4 py-3 text-cream placeholder:text-cream/40 transition-colors hover:border-cream/40 focus:border-gold focus:outline-none focus:ring-2 focus:ring-gold/30 aria-[invalid=true]:border-red-400";
const label = "text-sm font-bold tracking-wide text-cream";
const errorText = "mt-2 block text-sm text-red-300";

type FieldErrors = Partial<Record<"yourName" | "category" | "title" | "blogPost", string>>;

type Props = {
  onPostCreated?: (blog?: ApiBlogPost) => void;
};

export function BlogComposer({ onPostCreated }: Props) {
  const [yourName, setYourName] = useState("");
  const [category, setCategory] = useState("");
  const [title, setTitle] = useState("");
  const [blogPost, setBlogPost] = useState("");
  const [plainText, setPlainText] = useState("");
  const [editorResetKey, setEditorResetKey] = useState(0);

  const [pending, setPending] = useState(false);
  const [fieldErrors, setFieldErrors] = useState<FieldErrors>({});
  const [submitError, setSubmitError] = useState<string | null>(null);
  const [successMessage, setSuccessMessage] = useState<string | null>(null);

  async function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setSubmitError(null);

    const trimmedName = yourName.trim();
    const trimmedCategory = category.trim();
    const trimmedTitle = title.trim();
    const trimmedPlain = plainText.trim();

    const errors: FieldErrors = {};
    if (!trimmedName) errors.yourName = "Please enter your name.";
    if (!trimmedCategory) errors.category = "Please choose a category.";
    if (!trimmedTitle) errors.title = "Please enter a title.";
    if (!trimmedPlain) errors.blogPost = "Please write your post.";
    else if (trimmedPlain.length > 50000) errors.blogPost = "Post text must be 50,000 characters or fewer.";

    if (Object.keys(errors).length > 0) {
      setFieldErrors(errors);
      return;
    }

    setFieldErrors({});
    setPending(true);

    try {
      const result = await createBlogPost({
        yourName: trimmedName,
        category: trimmedCategory,
        title: trimmedTitle,
        blogPost,
      });

      const isPendingApproval = result.blog?.status && result.blog.status !== "approved";
      setSuccessMessage(
        result.message ||
        (isPendingApproval ? "Thanks! Your post was submitted for review." : "Your blog post has been published!"),
      );
      setYourName("");
      setCategory("");
      setTitle("");
      setBlogPost("");
      setPlainText("");
      setEditorResetKey((k) => k + 1);
      onPostCreated?.(result.blog);
    } catch (err) {
      setSubmitError(getApiErrorMessage(err, "Something went wrong while publishing your post. Please try again."));
    } finally {
      setPending(false);
    }
  }

  if (successMessage) {
    return (
      <div className="rounded-2xl border border-gold/30 bg-ink p-6 shadow-[0_20px_60px_rgba(0,0,0,0.5)] sm:p-10">
        <div role="status" className="flex flex-col items-center py-8 text-center">
          <span className="grid h-16 w-16 place-items-center rounded-full border border-gold/60 text-gold">
            <svg viewBox="0 0 24 24" aria-hidden="true" className="h-8 w-8" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M5 12.5l4.5 4.5L19 7.5" />
            </svg>
          </span>
          <p className="mt-6 font-display text-3xl font-bold text-gold">{successMessage}</p>
          <p className="mt-3 max-w-xs leading-relaxed text-cream/80">
            Thank you for sharing your favorite spots and tips with the Tallee community.
          </p>
          <button
            type="button"
            onClick={() => setSuccessMessage(null)}
            className="mt-8 inline-flex items-center justify-center rounded-full border border-gold/50 px-7 py-2.5 text-sm font-bold text-gold transition-colors hover:bg-gold hover:text-ink"
          >
            Write another post
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="rounded-2xl border border-gold/30 bg-ink p-6 shadow-[0_20px_60px_rgba(0,0,0,0.5)] sm:p-10">
      <form onSubmit={handleSubmit} className="grid gap-6 sm:grid-cols-2" aria-label="Post a blog" noValidate>
        <div>
          <label htmlFor="bp-name" className={label}>
            Your name <span className="text-gold">*</span>
          </label>
          <input
            id="bp-name"
            name="yourName"
            required
            maxLength={100}
            value={yourName}
            onChange={(e) => {
              setYourName(e.target.value);
              if (fieldErrors.yourName) setFieldErrors((prev) => ({ ...prev, yourName: undefined }));
            }}
            placeholder="How you want to be credited"
            className={field}
            aria-invalid={!!fieldErrors.yourName}
            aria-describedby={fieldErrors.yourName ? "bp-name-error" : undefined}
          />
          {fieldErrors.yourName && (
            <span id="bp-name-error" className={errorText}>
              {fieldErrors.yourName}
            </span>
          )}
        </div>

        <div>
          <label htmlFor="bp-category" className={label}>
            Category <span className="text-gold">*</span>
          </label>
          <select
            id="bp-category"
            name="category"
            required
            value={category}
            onChange={(e) => {
              setCategory(e.target.value);
              if (fieldErrors.category) setFieldErrors((prev) => ({ ...prev, category: undefined }));
            }}
            className={field}
            aria-invalid={!!fieldErrors.category}
            aria-describedby={fieldErrors.category ? "bp-category-error" : undefined}
          >
            <option value="" disabled className="bg-ink text-cream/60">
              Choose a category
            </option>
            {blogCategories.map((c) => (
              <option key={c} value={c.toLowerCase()} className="bg-ink text-cream">
                {c}
              </option>
            ))}
          </select>
          {fieldErrors.category && (
            <span id="bp-category-error" className={errorText}>
              {fieldErrors.category}
            </span>
          )}
        </div>

        <div className="sm:col-span-2">
          <label htmlFor="bp-title" className={label}>
            Title <span className="text-gold">*</span>
          </label>
          <input
            id="bp-title"
            name="title"
            required
            maxLength={200}
            value={title}
            onChange={(e) => {
              setTitle(e.target.value);
              if (fieldErrors.title) setFieldErrors((prev) => ({ ...prev, title: undefined }));
            }}
            placeholder="Give your post a title"
            className={field}
            aria-invalid={!!fieldErrors.title}
            aria-describedby={fieldErrors.title ? "bp-title-error" : undefined}
          />
          {fieldErrors.title && (
            <span id="bp-title-error" className={errorText}>
              {fieldErrors.title}
            </span>
          )}
        </div>

        <div className="sm:col-span-2">
          <label
            id="bp-body-label"
            htmlFor="bp-body"
            onClick={() => document.getElementById("bp-body")?.focus()}
            className={label}
          >
            Your post <span className="text-gold">*</span>
          </label>
          <RichTextEditor
            id="bp-body"
            labelId="bp-body-label"
            invalid={!!fieldErrors.blogPost}
            describedBy={fieldErrors.blogPost ? "bp-body-error" : undefined}
            resetTrigger={editorResetKey}
            onChange={(html, text) => {
              setBlogPost(html);
              setPlainText(text);
              if (fieldErrors.blogPost) setFieldErrors((prev) => ({ ...prev, blogPost: undefined }));
            }}
          />
          {fieldErrors.blogPost && (
            <span id="bp-body-error" className={errorText}>
              {fieldErrors.blogPost}
            </span>
          )}
        </div>

        {submitError && (
          <p role="alert" className="text-sm text-red-300 sm:col-span-2">
            {submitError}
          </p>
        )}

        <div className="sm:col-span-2">
          <button
            type="submit"
            disabled={pending}
            className="group inline-flex w-full items-center justify-center gap-2 rounded-full bg-gold px-9 py-3.5 font-bold text-ink transition-all duration-300 hover:bg-cream focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-gold disabled:opacity-60 sm:w-auto motion-safe:hover:-translate-y-0.5"
          >
            {pending ? "Posting…" : "Post blog"}
            {!pending && (
              <span aria-hidden="true" className="transition-transform duration-300 group-hover:translate-x-1">
                →
              </span>
            )}
          </button>
        </div>
      </form>
    </div>
  );
}

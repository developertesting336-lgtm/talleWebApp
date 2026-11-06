import type { MetadataRoute } from "next";
import { blogPosts, blogPublished } from "@/lib/blog";
import { allSeoPaths, hubPaths } from "@/lib/seo-content";
import { site } from "@/lib/site";

// SEO landing pages come from src/lib/seo-content.ts, so adding a page there
// adds it to the sitemap too.
const routes = ["", "/how-it-works", "/english-privacy-policy", "/accessibility-statement", "/term-conditions", "/delete-account"];

export default function sitemap(): MetadataRoute.Sitemap {
  const staticPages = routes.map((path) => ({
    url: `${site.url}${path}`,
    changeFrequency: path === "" ? ("weekly" as const) : ("yearly" as const),
    priority: path === "" ? 1 : path === "/how-it-works" ? 0.8 : 0.3,
  }));
  const hubs = hubPaths.map((path) => ({ url: `${site.url}${path}`, changeFrequency: "monthly" as const, priority: 0.8 }));
  const seoPages = allSeoPaths().map((path) => ({
    url: `${site.url}${path}`,
    changeFrequency: "monthly" as const,
    priority: 0.7,
  }));
  // The blog only has sample posts for now, so it stays out of the sitemap until
  // `blogPublished` is set in src/lib/blog.ts.
  const blog = blogPublished
    ? ["/blog", ...blogPosts.map((p) => `/blog/${p.slug}`)].map((path) => ({
        url: `${site.url}${path}`,
        changeFrequency: "weekly" as const,
        priority: 0.6,
      }))
    : [];
  return [...staticPages, ...hubs, ...seoPages, ...blog];
}

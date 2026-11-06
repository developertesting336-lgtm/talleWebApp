import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { SeoLanding } from "@/components/SeoLanding";
import { categories, pick, relatedForCategory, urls } from "@/lib/seo-content";

// Every known slug is prerendered at build time, and unknown slugs return a real
// 404. Wrapping params in Suspense would turn those 404s into soft-404s.
export const instant = false;

export function generateStaticParams() {
  return Object.keys(categories).map((slug) => ({ slug }));
}

export async function generateMetadata({ params }: PageProps<"/category/[slug]">): Promise<Metadata> {
  const { slug } = await params;
  const page = pick(categories, slug);
  if (!page) return {};
  return { title: page.metaTitle, description: page.metaDescription, alternates: { canonical: urls.category(slug) } };
}

export default async function CategoryPage({ params }: PageProps<"/category/[slug]">) {
  const { slug } = await params;
  const page = pick(categories, slug);
  if (!page) notFound();
  return <SeoLanding page={page} path={urls.category(slug)} crumbs={[{ name: "Vibes", href: "/category" }, { name: page.name }]} related={relatedForCategory(slug)} />;
}

import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { SeoLanding } from "@/components/SeoLanding";
import { occasions, pick, relatedForOccasion, urls } from "@/lib/seo-content";

// Every known slug is prerendered at build time, and unknown slugs return a real
// 404. Wrapping params in Suspense would turn those 404s into soft-404s.
export const instant = false;

export function generateStaticParams() {
  return Object.keys(occasions).map((slug) => ({ slug }));
}

export async function generateMetadata({ params }: PageProps<"/occasion/[slug]">): Promise<Metadata> {
  const { slug } = await params;
  const page = pick(occasions, slug);
  if (!page) return {};
  return { title: page.metaTitle, description: page.metaDescription, alternates: { canonical: urls.occasion(slug) } };
}

export default async function OccasionPage({ params }: PageProps<"/occasion/[slug]">) {
  const { slug } = await params;
  const page = pick(occasions, slug);
  if (!page) notFound();
  return <SeoLanding page={page} path={urls.occasion(slug)} crumbs={[{ name: "Occasions", href: "/occasion" }, { name: page.name }]} related={relatedForOccasion(slug)} />;
}

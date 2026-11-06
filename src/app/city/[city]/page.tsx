import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { SeoLanding } from "@/components/SeoLanding";
import { cities, pick, relatedForCity, urls } from "@/lib/seo-content";

// Every known slug is prerendered at build time, and unknown slugs return a real
// 404. Wrapping params in Suspense would turn those 404s into soft-404s.
export const instant = false;

export function generateStaticParams() {
  return Object.keys(cities).map((city) => ({ city }));
}

export async function generateMetadata({ params }: PageProps<"/city/[city]">): Promise<Metadata> {
  const { city } = await params;
  const page = pick(cities, city);
  if (!page) return {};
  return { title: page.metaTitle, description: page.metaDescription, alternates: { canonical: urls.city(city) } };
}

export default async function CityPage({ params }: PageProps<"/city/[city]">) {
  const { city } = await params;
  const page = pick(cities, city);
  if (!page) notFound();
  return <SeoLanding page={page} path={urls.city(city)} crumbs={[{ name: "Cities", href: "/city" }, { name: page.name }]} related={relatedForCity(city)} />;
}

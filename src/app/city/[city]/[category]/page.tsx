import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { SeoLanding } from "@/components/SeoLanding";
import { categories, cities, cityCategories, pick, relatedForCityCategory, urls } from "@/lib/seo-content";

// Every known slug is prerendered at build time, and unknown slugs return a real
// 404. Wrapping params in Suspense would turn those 404s into soft-404s.
export const instant = false;

export function generateStaticParams() {
  return Object.keys(cityCategories).map((key) => {
    const [city, category] = key.split("/");
    return { city, category };
  });
}

export async function generateMetadata({ params }: PageProps<"/city/[city]/[category]">): Promise<Metadata> {
  const { city, category } = await params;
  const page = pick(cityCategories, `${city}/${category}`);
  if (!page) return {};
  return { title: page.metaTitle, description: page.metaDescription, alternates: { canonical: urls.cityCategory(city, category) } };
}

export default async function CityCategoryPage({ params }: PageProps<"/city/[city]/[category]">) {
  const { city, category } = await params;
  const key = `${city}/${category}`;
  const page = pick(cityCategories, key);
  const cityPage = pick(cities, city);
  const categoryPage = pick(categories, category);
  if (!page || !cityPage || !categoryPage) notFound();
  return (
    <SeoLanding
      page={page}
      path={urls.cityCategory(city, category)}
      crumbs={[{ name: "Cities", href: "/city" }, { name: cityPage.name, href: urls.city(city) }, { name: categoryPage.name }]}
      related={relatedForCityCategory(key)}
    />
  );
}

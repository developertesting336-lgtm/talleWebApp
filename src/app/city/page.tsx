import type { Metadata } from "next";
import { HubPage } from "@/components/HubPage";
import { cities, cityCategories, summary, urls } from "@/lib/seo-content";

export const metadata: Metadata = {
  title: "Find a Place by City",
  description:
    "Explore bars and restaurants in Washington, DC, New York, Atlanta, Chicago, Los Angeles and Miami. Tallee works worldwide.",
  alternates: { canonical: "/city" },
};

export default function CitiesHub() {
  return (
    <HubPage
      path="/city"
      eyebrow="Cities"
      h1="Find a place in your city"
      intro="Tallee works worldwide. Here are some cities to start with, plus guides to the vibes people search for most."
      groups={[
        {
          title: "Cities",
          items: Object.entries(cities).map(([slug, p]) => ({ href: urls.city(slug), kind: "City", name: p.name, text: summary(p) })),
        },
        {
          title: "City guides",
          items: Object.entries(cityCategories).map(([key, p]) => {
            const [city, category] = key.split("/");
            return { href: urls.cityCategory(city, category), kind: "Guide", name: p.name, text: summary(p) };
          }),
        },
      ]}
    />
  );
}

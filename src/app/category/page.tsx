import type { Metadata } from "next";
import { HubPage } from "@/components/HubPage";
import { categories, summary, urls } from "@/lib/seo-content";

export const metadata: Metadata = {
  title: "Find a Place by Vibe",
  description:
    "Brunch, craft cocktail bars, romantic restaurants, sports bars and more. Choose your vibe and let Tallee find the right place.",
  alternates: { canonical: "/category" },
};

export default function CategoriesHub() {
  return (
    <HubPage
      path="/category"
      eyebrow="Vibes"
      h1="Find a place by vibe"
      intro="From a quiet cocktail bar to a lively brunch party, pick the mood you want and Tallee finds places that match."
      groups={[
        {
          items: Object.entries(categories).map(([slug, p]) => ({ href: urls.category(slug), kind: "Vibe", name: p.name, text: summary(p) })),
        },
      ]}
    />
  );
}

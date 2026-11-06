import type { Metadata } from "next";
import { HubPage } from "@/components/HubPage";
import { occasions, summary, urls } from "@/lib/seo-content";

export const metadata: Metadata = {
  title: "Find a Place by Occasion",
  description:
    "Date night, birthday, anniversary, girls and guys night out and more. Choose your occasion and let Tallee find bars and restaurants that fit.",
  alternates: { canonical: "/occasion" },
};

export default function OccasionsHub() {
  return (
    <HubPage
      path="/occasion"
      eyebrow="Occasions"
      h1="Find a place for every occasion"
      intro="Tell Tallee what you’re celebrating, or just meeting for, and it recommends bars and restaurants that fit the moment."
      groups={[
        {
          items: Object.entries(occasions).map(([slug, p]) => ({ href: urls.occasion(slug), kind: "Occasion", name: p.name, text: summary(p) })),
        },
      ]}
    />
  );
}

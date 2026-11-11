import type { Metadata } from "next";
import type { CSSProperties } from "react";
import { BlogSection } from "@/components/BlogSection";
import { Breadcrumbs } from "@/components/Breadcrumbs";
import { HeroEmblem } from "@/components/HeroEmblem";
import { PatternBackground } from "@/components/PatternBackground";
import { ReadyToFindBanner } from "@/components/ReadyToFindBanner";
import { ScrollZoomHero } from "@/components/ScrollZoomHero";
import { blogPublished } from "@/lib/blog";

export const metadata: Metadata = {
  title: "Tallee Blog",
  description: "Guides, tips and news for finding the right bar, restaurant or event for your vibe, mood and occasion.",
  alternates: { canonical: "/blog" },
  // Set `blogPublished` in src/lib/blog.ts to true when ready for search indexing.
  robots: blogPublished ? undefined : { index: false, follow: false },
};

export default function BlogPage() {
  return (
    <>
      <ScrollZoomHero compact background={<PatternBackground />} emblem={<HeroEmblem />} contentClassName="max-w-4xl">
        <div className="hero-in flex justify-center">
          <Breadcrumbs items={[{ name: "Blog" }]} path="/blog" />
        </div>
        <p
          className="hero-in mt-8 rounded-full border border-gold/40 bg-[rgba(0,0,0,0.67)] px-5 py-1.5 text-xs font-bold uppercase tracking-[0.25em] text-gold shadow-[0_2px_12px_rgba(0,0,0,0.7)] backdrop-blur-sm"
          style={{ textShadow: "0 1px 3px rgba(0, 0, 0, 1)" }}
        >
          The Tallee Blog
        </p>
        <h1
          className="hero-in mt-6 font-display text-[2.5rem] font-bold uppercase leading-[1.05] text-gold sm:text-6xl lg:text-7xl"
          style={{ "--d": 1 } as CSSProperties}
        >
          Ideas for your next night out
        </h1>
        <div
          className="hero-in relative mt-8 max-w-2xl px-8 py-6 text-lg leading-relaxed text-[#F6EFDF] sm:px-10"
          style={{
            "--d": 2,
            textShadow: "0 1px 3px rgba(0, 0, 0, 1)",
          } as CSSProperties}
        >
          {/* Feathered dark text scrim vignette */}
          <div
            aria-hidden="true"
            className="pointer-events-none absolute inset-0 -z-10 rounded-[16px] bg-[rgba(0,0,0,0.67)] blur-[10px]"
          />
          <p>Guides, tips and stories from the Tallee community.</p>
        </div>
      </ScrollZoomHero>

      <BlogSection />

      <ReadyToFindBanner id="blog-download" />
    </>
  );
}

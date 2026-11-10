import Link from "next/link";
import { Breadcrumbs, type Crumb } from "@/components/Breadcrumbs";
import type { CSSProperties, ReactNode } from "react";
import { JsonLd } from "@/components/JsonLd";
import { PatternBackground } from "@/components/PatternBackground";
import { PhoneRow, PhoneShot } from "@/components/PhoneShot";
import { StoreButtons } from "@/components/StoreButtons";
import { ScrollZoomHero } from "@/components/ScrollZoomHero";
import { HeroEmblem } from "@/components/HeroEmblem";
import { ReadyToFindBanner } from "@/components/ReadyToFindBanner";
import { Reveal } from "@/components/Reveal";
import { ThreeStepsSection } from "@/components/ThreeStepsSection";
import { TipsSection } from "@/components/TipsSection";
import { VibeMarquee } from "@/components/VibeMarquee";
import type { Related, SeoPage } from "@/lib/seo-content";
import { appScreens } from "@/lib/site";

// Sets a CSS variable used for staggered animation (--i) or delay (--d).
const step = (n: number, name: "--i" | "--d" = "--i") => ({ [name]: n }) as CSSProperties;

function SectionTitle({ id, eyebrow, children }: { id: string; eyebrow?: string; children: ReactNode }) {
  return (
    <div className="reveal text-center">
      {eyebrow && <p className="font-display text-lg font-bold uppercase tracking-[0.25em] text-gold">{eyebrow}</p>}
      <h2 id={id} className="mt-2 font-display text-4xl font-bold text-cream sm:text-5xl">
        {children}
      </h2>
      <span aria-hidden="true" className="line-grow mx-auto mt-5 block h-px w-16 bg-gold" />
    </div>
  );
}

const steps = (filterLine: string) => [
  { title: filterLine, text: "Then tell Tallee who you’re with and the mood you want. One or two vibes give the best results." },
  { title: "Get picks matched to you", text: "Tallee’s AI turns your answers into a list of places that fit, with photos, ratings and addresses." },
  { title: "Check the details, then go", text: "Open a place to see its hours, website, phone number and an AI summary for faster decisions, then tap Get Directions." },
];

export function SeoLanding({ page, path, crumbs, related }: { page: SeoPage; path: string; crumbs: Crumb[]; related: Related[] }) {
  const jsonLd = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "FAQPage",
        mainEntity: page.faqs.map((f) => ({
          "@type": "Question",
          name: f.q,
          acceptedAnswer: { "@type": "Answer", text: f.a },
        })),
      },
    ],
  };

  return (
    <>
      <JsonLd data={jsonLd} />

      {/* HERO */}
      <ScrollZoomHero
        compact
        background={<PatternBackground />}
        emblem={<HeroEmblem />}
        contentClassName="max-w-4xl"
      >
        <div className="hero-in flex justify-center" style={step(0, "--d")}>
          <Breadcrumbs items={crumbs} path={path} className="text-center" />
        </div>

        <p
          className="hero-in mt-8 rounded-full border border-gold/40 bg-[rgba(0,0,0,0.67)] px-5 py-1.5 text-xs font-bold uppercase tracking-[0.25em] text-gold shadow-[0_2px_12px_rgba(0,0,0,0.7)] backdrop-blur-sm"
          style={{
            ...step(1, "--d"),
            textShadow: "0 1px 3px rgba(0, 0, 0, 1)",
          }}
        >
          {page.eyebrow}
        </p>
        <h1
          className="hero-in mt-6 font-display text-[2.5rem] font-bold uppercase leading-[1.05] text-gold sm:text-6xl lg:text-7xl"
          style={step(2, "--d")}
        >
          {page.h1}
        </h1>
        <div
          className="hero-in relative mt-8 max-w-2xl px-8 py-6 sm:px-10 text-lg leading-relaxed text-[#F6EFDF]"
          style={{
            ...step(3, "--d"),
            textShadow: "0 1px 3px rgba(0, 0, 0, 1)",
          }}
        >
          {/* Feathered dark text scrim vignette */}
          <div
            aria-hidden="true"
            className="pointer-events-none absolute inset-0 -z-10 rounded-[16px] bg-[rgba(0,0,0,0.67)] blur-[10px]"
          />
          <div className="space-y-4">
            {page.intro.map((p) => (
              <p key={p}>{p}</p>
            ))}
          </div>
        </div>
        <div className="hero-in" style={step(4, "--d")}>
          <StoreButtons className="mt-10" />
        </div>
        <p className="hero-in mt-5 text-sm text-cream/70" style={step(5, "--d")}>
          Free to download on iOS and Android
        </p>
      </ScrollZoomHero>

      <VibeMarquee />

      {/* HIGHLIGHTS */}
      <section aria-labelledby="highlights" className="bg-ink">
        <div className="section-y mx-auto max-w-6xl px-5 sm:px-6">
          <SectionTitle id="highlights">{page.highlightsTitle}</SectionTitle>
          <ul className="mt-14 grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4">
            {page.highlights.map((h, i) => (
              <Reveal as="li" key={h.title} variant="card" delay={(i % 4) * 60} className="min-w-0">
                <div className="card-lift h-full rounded-2xl border border-gold/20 bg-gradient-to-b from-white/[0.05] to-transparent p-7 hover:border-gold/60">
                  <span aria-hidden="true" className="block h-0.5 w-8 bg-gold" />
                  <h3 className="mt-5 break-words font-display text-2xl font-bold text-gold">{h.title}</h3>
                  <p className="mt-3 leading-relaxed">{h.text}</p>
                </div>
              </Reveal>
            ))}
          </ul>
        </div>
      </section>

      {/* HOW TALLEE FINDS IT */}
      <ThreeStepsSection
        stepsList={steps(page.filterLine)}
        shots={[page.shots[0], page.shots[1]]}
        screenLabel={`Tallee app screens for ${page.name}`}
      />

      {/* TIPS */}
      <TipsSection
        id="tips"
        title={page.tipsTitle}
        tips={page.tips}
      />

      {/* FAQ */}
      <section aria-labelledby="faq" className="relative isolate overflow-clip">
        <PatternBackground />
        <div className="section-y mx-auto max-w-3xl px-5 sm:px-6">
          <div className="faq reveal bg-charcoal/90 px-5 py-12 sm:px-12">
            <SectionTitle id="faq">Questions, answered</SectionTitle>
            <div className="mt-10">
              {page.faqs.map((f) => (
                <details key={f.q} className="group border-b border-gold/25 py-5 first:border-t">
                  <summary className="flex cursor-pointer list-none items-center justify-between gap-6 font-display text-2xl font-bold text-cream marker:content-none [&::-webkit-details-marker]:hidden">
                    {f.q}
                    <span aria-hidden="true" className="text-3xl leading-none text-gold transition-transform duration-300 group-open:rotate-45">
                      +
                    </span>
                  </summary>
                  <p className="mt-4 leading-relaxed">{f.a}</p>
                </details>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* RELATED */}
      {related.length > 0 && (
        <section aria-labelledby="related" className="bg-ink">
          <div className="section-y mx-auto max-w-6xl px-5 sm:px-6">
            <SectionTitle id="related">Keep exploring</SectionTitle>
            <ul className="mt-14 grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
              {related.map((r, i) => (
                <Reveal as="li" key={r.href} variant="card" delay={(i % 3) * 60} className="min-w-0">
                  <Link
                    href={r.href}
                    className="card-lift group flex h-full items-center justify-between gap-4 rounded-2xl border border-gold/20 p-6 hover:border-gold hover:bg-white/[0.04]"
                  >
                    <span className="min-w-0">
                      <span className="block text-xs font-bold uppercase tracking-[0.2em] text-gold">{r.kind}</span>
                      <span className="mt-1 block break-words font-display text-2xl font-bold text-cream">{r.label}</span>
                    </span>
                    <span aria-hidden="true" className="text-2xl text-gold transition-transform duration-300 group-hover:translate-x-1.5">
                      →
                    </span>
                  </Link>
                </Reveal>
              ))}
            </ul>
          </div>
        </section>
      )}

      {/* DOWNLOAD */}
      <ReadyToFindBanner id="download" />
    </>
  );
}

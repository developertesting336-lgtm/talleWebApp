import Link from "next/link";
import { Breadcrumbs, type Crumb } from "@/components/Breadcrumbs";
import type { CSSProperties, ReactNode } from "react";
import { JsonLd } from "@/components/JsonLd";
import { PatternBackground } from "@/components/PatternBackground";
import { PhoneRow, PhoneShot } from "@/components/PhoneShot";
import { StoreButtons } from "@/components/StoreButtons";
import { ScrollZoomHero } from "@/components/ScrollZoomHero";
import { HeroEmblem } from "@/components/HeroEmblem";
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
          className="hero-in mt-8 rounded-full border border-gold/40 px-5 py-1.5 text-xs font-bold uppercase tracking-[0.25em] text-gold"
          style={step(1, "--d")}
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
              <li key={h.title} className="reveal-i min-w-0" style={step(i)}>
                <div className="card-lift h-full rounded-2xl border border-gold/20 bg-gradient-to-b from-white/[0.05] to-transparent p-7 hover:border-gold/60">
                  <span aria-hidden="true" className="block h-0.5 w-8 bg-gold" />
                  <h3 className="mt-5 break-words font-display text-2xl font-bold text-gold">{h.title}</h3>
                  <p className="mt-3 leading-relaxed">{h.text}</p>
                </div>
              </li>
            ))}
          </ul>
        </div>
      </section>

      {/* HOW TALLEE FINDS IT */}
      <section aria-labelledby="how" className="bg-charcoal">
        <div className="section-y mx-auto grid max-w-6xl items-center gap-14 px-5 sm:px-6 lg:grid-cols-2 lg:gap-16">
          <div>
            <div className="reveal">
              <p className="font-display text-lg font-bold uppercase tracking-[0.25em] text-gold">How Tallee works</p>
              <h2 id="how" className="mt-2 font-display text-4xl font-bold text-cream sm:text-5xl">
                Three steps to the right place
              </h2>
            </div>
            <ol className="mt-10 space-y-8">
              {steps(page.filterLine).map((s, i) => (
                <li key={s.title} className="reveal-i flex gap-5" style={step(i)}>
                  <span className="grid h-11 w-11 flex-none place-items-center rounded-full border border-gold bg-ink font-display text-xl font-bold text-gold">
                    {i + 1}
                  </span>
                  <div>
                    <h3 className="font-display text-2xl font-bold text-cream">{s.title}</h3>
                    <p className="mt-2 leading-relaxed">{s.text}</p>
                  </div>
                </li>
              ))}
            </ol>
            <Link href="/how-it-works" className="mt-10 inline-block border-b border-gold pb-1 font-bold text-gold transition-colors hover:text-cream">
              See how Tallee works →
            </Link>
          </div>
          <div className="min-w-0">
            <PhoneRow label={`Tallee app screens for ${page.name}`}>
              <PhoneShot screen={appScreens[page.shots[0]]} />
              <PhoneShot screen={appScreens[page.shots[1]]} />
            </PhoneRow>
          </div>
        </div>
      </section>

      {/* TIPS */}
      <section aria-labelledby="tips" className="bg-ink">
        <div className="section-y mx-auto max-w-6xl px-5 sm:px-6">
          <SectionTitle id="tips">{page.tipsTitle}</SectionTitle>
          <ul className="mx-auto mt-14 grid max-w-4xl gap-x-12 gap-y-9 sm:grid-cols-2">
            {page.tips.map((t, i) => (
              <li key={t.title} className="reveal-i flex gap-4" style={step(i)}>
                <svg viewBox="0 0 24 24" className="mt-1 h-6 w-6 flex-none text-gold" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true">
                  <path d="M5 12.5l4.5 4.5L19 7.5" />
                </svg>
                <div>
                  <h3 className="font-display text-2xl font-bold text-cream">{t.title}</h3>
                  <p className="mt-2 leading-relaxed">{t.text}</p>
                </div>
              </li>
            ))}
          </ul>
        </div>
      </section>

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
                <li key={r.href} className="reveal-i min-w-0" style={step(i)}>
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
                </li>
              ))}
            </ul>
          </div>
        </section>
      )}

      {/* DOWNLOAD */}
      <section aria-labelledby="download" className="relative isolate overflow-clip">
        <PatternBackground />
        <div
          aria-hidden="true"
          className="glow-pulse absolute inset-0 -z-10 bg-[radial-gradient(ellipse_at_center,rgba(223,179,96,0.16),transparent_65%)]"
        />
        <div className="section-y reveal mx-auto flex max-w-4xl flex-col items-center px-5 text-center sm:px-6">
          <h2 id="download" className="font-display text-4xl font-bold uppercase leading-tight text-gold sm:text-5xl">
            Ready to find your next favorite spot?
          </h2>
          <p className="mt-6 text-lg">Download Tallee and search “Tallee Knows” in your app store.</p>
          <StoreButtons className="mt-10" />
        </div>
      </section>
    </>
  );
}

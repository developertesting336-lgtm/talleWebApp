import Link from "next/link";
import type { CSSProperties } from "react";
import { Breadcrumbs } from "@/components/Breadcrumbs";
import { PatternBackground } from "@/components/PatternBackground";
import { StoreButtons } from "@/components/StoreButtons";
import { ScrollZoomHero } from "@/components/ScrollZoomHero";
import { HeroEmblem } from "@/components/HeroEmblem";

export type HubItem = { href: string; kind: string; name: string; text: string };
export type HubGroup = { title?: string; items: HubItem[] };

const step = (n: number, name: "--i" | "--d" = "--i") => ({ [name]: n }) as CSSProperties;

// An index page that lists a set of landing pages as cards.
export function HubPage({ eyebrow, h1, intro, groups, path }: { eyebrow: string; h1: string; intro: string; groups: HubGroup[]; path: string }) {
  return (
    <>
      <ScrollZoomHero
        compact
        background={<PatternBackground />}
        emblem={<HeroEmblem />}
        contentClassName="max-w-4xl"
      >
        <div className="hero-in flex justify-center">
          <Breadcrumbs items={[{ name: eyebrow }]} path={path} />
        </div>
        <p className="hero-in mt-8 rounded-full border border-gold/40 px-5 py-1.5 text-xs font-bold uppercase tracking-[0.25em] text-gold">{eyebrow}</p>
        <h1
          className="hero-in mt-6 font-display text-[2.5rem] font-bold uppercase leading-[1.05] text-gold sm:text-6xl lg:text-7xl"
          style={step(1, "--d")}
        >
          {h1}
        </h1>
        <div
          className="hero-in relative mt-8 max-w-2xl px-8 py-6 sm:px-10 text-lg leading-relaxed text-[#F6EFDF]"
          style={{
            ...step(2, "--d"),
            textShadow: "0 1px 3px rgba(0, 0, 0, 1)",
          }}
        >
          {/* Feathered dark text scrim vignette */}
          <div
            aria-hidden="true"
            className="pointer-events-none absolute inset-0 -z-10 rounded-[16px] bg-[rgba(0,0,0,0.67)] blur-[10px]"
          />
          <p>{intro}</p>
        </div>
      </ScrollZoomHero>

      {groups.map((g, gi) => (
        <section key={g.title ?? gi} aria-label={g.title ?? eyebrow} className="bg-ink">
          <div className="mx-auto max-w-6xl px-5 pb-16 pt-4 sm:px-6 sm:pb-20 lg:pb-24">
            {g.title && (
              <h2 className="reveal mb-10 border-b border-gold/30 pb-4 font-display text-3xl font-bold text-cream sm:text-4xl">{g.title}</h2>
            )}
            <ul className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
              {g.items.map((item, i) => (
                <li key={item.href} className="reveal-i" style={step(i % 3)}>
                  <Link
                    href={item.href}
                    className="card-lift group flex h-full flex-col rounded-2xl border border-gold/20 bg-gradient-to-b from-white/[0.05] to-transparent p-7 hover:border-gold/70"
                  >
                    <span className="text-xs font-bold uppercase tracking-[0.2em] text-gold">{item.kind}</span>
                    <span className="mt-3 font-display text-3xl font-bold text-cream">{item.name}</span>
                    <span className="mt-3 flex-1 leading-relaxed">{item.text}</span>
                    <span className="mt-6 font-bold text-gold">
                      Explore{" "}
                      <span aria-hidden="true" className="inline-block transition-transform duration-300 group-hover:translate-x-1.5">
                        →
                      </span>
                    </span>
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </section>
      ))}

      <section className="relative isolate overflow-clip" aria-labelledby="hub-download">
        <PatternBackground />
        <div className="section-y reveal mx-auto flex max-w-4xl flex-col items-center px-5 text-center sm:px-6">
          <h2 id="hub-download" className="font-display text-4xl font-bold uppercase leading-tight text-gold sm:text-5xl">
            Ready to find your next favorite spot?
          </h2>
          <p className="mt-6 text-lg">Download Tallee and search “Tallee Knows” in your app store.</p>
          <StoreButtons className="mt-10" />
        </div>
      </section>
    </>
  );
}

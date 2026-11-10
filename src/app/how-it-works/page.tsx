import { HeroEmblem } from "@/components/HeroEmblem";
import { DownloadStage } from "@/components/DownloadStage";
import { DemoStage } from "@/components/DemoStage";
import { ScrollItem } from "@/components/ScrollItem";
import { ScrollZoomHero } from "@/components/ScrollZoomHero";
import { StepsBox, type BoxStep } from "@/components/StepsBox";
import { FadeUp, Float, HoverNudge, MotionProvider, Stagger, StaggerItem } from "@/components/Motion";
import type { Metadata } from "next";
import Link from "next/link";
import type { ReactNode } from "react";
import * as motion from "motion/react-client";
import { Breadcrumbs } from "@/components/Breadcrumbs";
import { PatternBackground } from "@/components/PatternBackground";
import { PhoneRow, PhoneShot, PhoneVideo } from "@/components/PhoneShot";
import { StoreButtons } from "@/components/StoreButtons";
import { categories, cities, occasions, urls } from "@/lib/seo-content";
import { appScreens as s } from "@/lib/site";

export const metadata: Metadata = {
  title: "How Tallee Works",
  description:
    "See how Tallee finds the right bar, restaurant or event for your occasion and vibe: tell it what you want, get matched picks, then open directions and go.",
  alternates: { canonical: "/how-it-works" },
};

// Hero entrance: runs on load (not on scroll) so the top of the page never flashes empty
const heroIn = (delay: number) => ({
  initial: { opacity: 0, y: 24 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.8, ease: "easeOut" as const, delay },
});

function Step({ n, title, children, shots, reverse = false }: { n: number; title: string; children: ReactNode; shots: ReactNode; reverse?: boolean }) {
  const dir = reverse ? 40 : -40; // text slides in from one side, phones from the other
  return (
    <section aria-labelledby={`step-${n}`} className="section-y mx-auto grid max-w-6xl items-center gap-10 px-5 sm:px-6 lg:grid-cols-2 lg:gap-16">
      <FadeUp x={dir} y={0} className={reverse ? "lg:order-2" : ""}>
        <p className="font-display text-xl font-bold uppercase tracking-widest text-gold">Step {n}</p>
        <h2 id={`step-${n}`} className="mt-2 font-display text-4xl font-bold text-cream sm:text-5xl">
          {title}
        </h2>
        <div className="mt-6 space-y-4 text-base leading-relaxed">{children}</div>
      </FadeUp>
      <FadeUp x={-dir} y={0} delay={0.15} className={`min-w-0 ${reverse ? "lg:order-1" : ""}`}>
        {shots}
      </FadeUp>
    </section>
  );
}

function ExploreGroup({ title, links }: { title: string; links: { href: string; label: string }[] }) {
  return (
    <div>
      <h3 className="border-b border-gold/30 pb-3 font-display text-2xl font-bold text-cream">{title}</h3>
      <ul className="mt-4 space-y-3">
        {links.map((l) => (
          <HoverNudge key={l.href}>
            <Link href={l.href} className="hover:text-gold">
              {l.label} →
            </Link>
          </HoverNudge>
        ))}
      </ul>
    </div>
  );
}

function Feature({ title, text, children }: { title: string; text: string; children: ReactNode }) {
  return (
    <div className="flex min-w-0 flex-col items-center text-center">
      <PhoneRow label={title}>{children}</PhoneRow>
      <h3 className="mt-8 font-display text-3xl font-bold text-gold">{title}</h3>
      <p className="mt-3 max-w-xs leading-relaxed">{text}</p>
    </div>
  );
}

type Cell = boolean | string;
type PlanRow = { feature: string; free: Cell; premium: Cell };

// Feature names are the ones used on the app's Premium screen.
const bothPlans: PlanRow[] = [
  { feature: "Searches", free: "15 per month", premium: "Unlimited" },
  { feature: "Basic recommendations", free: true, premium: true },
  { feature: "Save favorites manually", free: true, premium: true },
  { feature: "Basic history (10–20 venues)", free: true, premium: true },
  { feature: "Session-based memory", free: true, premium: true },
];

const premiumOnly: PlanRow[] = [
  { feature: "Access to premium content", free: false, premium: true },
  { feature: "Smart recommendations", free: false, premium: true },
  { feature: "Persistent memory", free: false, premium: true },
  { feature: "Smart learning", free: false, premium: true },
  { feature: "Advanced history", free: false, premium: true },
  { feature: "Multi-profile support", free: false, premium: true },
  { feature: "Sharing favorites and lists", free: false, premium: true },
  { feature: "Invite friends to shared lists", free: false, premium: true },
];

function PlanCell({ value, highlight = false }: { value: Cell; highlight?: boolean }) {
  return (
    <td className={`px-2 py-3.5 text-center align-middle sm:px-4 ${highlight ? "bg-gold/10" : ""}`}>
      {typeof value === "string" ? (
        <span className="text-sm font-bold sm:text-base">{value}</span>
      ) : value ? (
        <>
          <svg viewBox="0 0 24 24" aria-hidden="true" className="mx-auto h-6 w-6 text-gold" fill="none" stroke="currentColor" strokeWidth="2.2">
            <motion.path
              d="M5 12.5l4.5 4.5L19 7.5"
              initial={{ pathLength: 0 }}
              whileInView={{ pathLength: 1 }}
              viewport={{ once: false }}
              transition={{ duration: 0.5, ease: "easeOut", delay: 0.2 }}
            />
          </svg>
          <span className="sr-only">Included</span>
        </>
      ) : (
        <>
          <span aria-hidden="true" className="mx-auto block h-0.5 w-4 rounded bg-cream/30" />
          <span className="sr-only">Not included</span>
        </>
      )}
    </td>
  );
}

function PlanGroup({ title, rows }: { title: string; rows: PlanRow[] }) {
  return (
    <tbody>
      <tr>
        <th colSpan={3} scope="colgroup" className="bg-white/[0.04] px-4 py-2.5 text-left text-xs font-bold uppercase tracking-[0.2em] text-gold">
          {title}
        </th>
      </tr>
      {rows.map((r, i) => (
        <motion.tr
          key={r.feature}
          // opacity only: transforms on <tr> can misbehave
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: false, margin: "-40px" }}
          transition={{ duration: 0.4, delay: i * 0.05 }}
          className="border-t border-gold/15"
        >
          <th scope="row" className="px-4 py-3.5 text-left text-sm font-normal leading-snug sm:text-base">
            {r.feature}
          </th>
          <PlanCell value={r.free} />
          <PlanCell value={r.premium} highlight />
        </motion.tr>
      ))}
    </tbody>
  );
}

const steps: BoxStep[] = [
  {
    n: 1,
    title: "Tell Tallee what you’re after",
    shots: (
      <PhoneRow label="Choosing a place type, occasion and vibe">
        <PhoneShot screen={s.home} compact />
        <PhoneShot screen={s.occasion} compact />
        <PhoneShot screen={s.vibe} compact />
      </PhoneRow>
    ),
    body: (
      <>
        <p>
          Set your location, or use your current one, and how far you’re willing to travel. Choose Eat &amp; Drink or Goods &amp;
          Services.
        </p>
        <p>
          Then tell Tallee who you’re with, plus one or two other things: the occasion, from date night to girls and guys night out, and
          the vibe you want, like romantic or fancy. Can’t find the right vibe? Add your own.
        </p>
      </>
    ),
  },
  {
    n: 2,
    title: "Get picks matched to you",
    shots: (
      <PhoneRow label="Matched results and saved favorites">
        <PhoneShot screen={s.results} compact />
        <PhoneShot screen={s.favorites} compact />
      </PhoneRow>
    ),
    body: (
      <>
        <p>
          Tallee’s AI turns your answers into a list of places that fit, with photos, ratings and addresses, so you can skip the
          endless scrolling.
        </p>
        <p>Tap the heart to save the ones you like and find them again in My Favorites.</p>
      </>
    ),
  },
  {
    n: 3,
    title: "Check the details, then go",
    shots: (
      <PhoneRow label="A venue's details and directions">
        <PhoneShot screen={s.venue} compact />
        <PhoneShot screen={s.venueMap} compact />
      </PhoneRow>
    ),
    body: (
      <>
        <p>Open any place to see its rating, address, website, phone number, opening hours and photo gallery.</p>
        <p>Each place also has an AI summary, so you can make a decision faster.</p>
        <p>When you’ve decided, tap Get Directions to open the map and head out.</p>
      </>
    ),
  },
];

export default function HowItWorksPage() {
  return (
    <MotionProvider>
      <div className="overflow-x-clip">

        {/* HERO */}
        <ScrollZoomHero compact background={<PatternBackground />} emblem={<HeroEmblem />}>
          <Breadcrumbs items={[{ name: "How It Works" }]} path="/how-it-works" />
          <motion.h1 {...heroIn(0)} className="mt-8 font-display text-[2.6rem] font-bold uppercase leading-[1.05] text-gold sm:text-6xl">
            How Tallee works
          </motion.h1>
          <motion.div
            {...heroIn(0.15)}
            className="relative mt-8 max-w-2xl px-8 py-6 sm:px-10 text-lg leading-relaxed text-[#F6EFDF]"
            style={{
              textShadow: "0 1px 3px rgba(0, 0, 0, 1)",
            }}
          >
            {/* Feathered dark text scrim vignette */}
            <div
              aria-hidden="true"
              className="pointer-events-none absolute inset-0 -z-10 rounded-[16px] bg-[rgba(0,0,0,0.67)] blur-[10px]"
            />
            <div className="space-y-1">
              <p>
                Tallee turns “What should we do tonight?” into a plan. Tell it who you’re with and what you’re in the mood for, and it
                recommends places that fit.
              </p>
            </div>
          </motion.div>
          <motion.div {...heroIn(0.3)}>
            <StoreButtons className="mt-10" />
          </motion.div>
        </ScrollZoomHero>

        <StepsBox
          steps={steps}
          fallback={steps.map((st, i) => (
            <Step key={st.n} n={st.n} title={st.title} shots={st.shots} reverse={i % 2 === 1}>
              {st.body}
            </Step>
          ))}
        />

        {/* DEMO VIDEO */}
        {/* DEMO VIDEO */}
        <section className="relative isolate overflow-clip bg-charcoal" aria-labelledby="demo">
          <div className="section-y mx-auto grid max-w-6xl items-center gap-10 px-5 sm:px-6 lg:grid-cols-2 lg:gap-16">
            <FadeUp x={-40} y={0}>
              <h2 id="demo" className="font-display text-4xl font-bold text-gold sm:text-5xl">
                See it in action
              </h2>
              <motion.span
                aria-hidden="true"
                className="mt-4 block h-0.5 w-24 origin-left bg-gradient-to-r from-gold to-transparent"
                initial={{ scaleX: 0 }}
                whileInView={{ scaleX: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.9, ease: "easeOut", delay: 0.3 }}
              />
              <p className="mt-6 text-base leading-relaxed">
                Watch a real search from start to finish: pick who you’re with, the occasion and the vibe, tap Get My Picks, and
                open a place to see the details.
              </p>
            </FadeUp>
            <FadeUp x={40} y={0} delay={0.15} className="min-w-0">
              <DemoStage>
                <PhoneVideo
                  src="/video/tallee-demo.mp4"
                  poster="/images/app/demo-poster.webp"
                  label="Screen recording of a Tallee search, from choosing filters to opening a video"
                />
              </DemoStage>
            </FadeUp>
          </div>
        </section>

        {/* MORE IN THE APP */}
        <section className="overflow-x-clip bg-ink" aria-labelledby="more">
          <div className="section-y mx-auto max-w-6xl px-5 sm:px-6">
            <FadeUp y={24}>
              <h2 id="more" className="text-center font-display text-4xl font-bold text-gold sm:text-5xl">
                And there’s more
              </h2>
            </FadeUp>
            <div className="mt-14 grid gap-16 lg:grid-cols-3 lg:gap-8">
              <ScrollItem x={-80} y={160} rotate={-8}>
                <Feature title="Goods & Services" text="Shopping instead? Search by distance, category or voice.">
                  <Float delay={0}>
                    <PhoneShot screen={s.goods} />
                  </Float>
                </Feature>
              </ScrollItem>
              <ScrollItem y={260}>
                <Feature title="Events near you" text="See what’s happening nearby, with dates, venues and ratings.">
                  <Float delay={1.5}>
                    <PhoneShot screen={s.events} />
                  </Float>
                </Feature>
              </ScrollItem>
              <ScrollItem x={80} y={160} rotate={8}>
                <Feature title="Free to start" text="Get going on the Free plan. Upgrade to Premium for unlimited searches.">
                  <Float delay={3}>
                    <PhoneShot screen={s.premium} />
                  </Float>
                </Feature>
              </ScrollItem>
            </div>
          </div>
        </section>

        {/* FREE VS PREMIUM */}
        <section id="premium" className="bg-charcoal" aria-labelledby="plans">
          <div className="section-y mx-auto max-w-6xl px-5 sm:px-6">
            <FadeUp y={24} className="mx-auto max-w-2xl text-center">
              <p className="font-display text-xl font-bold uppercase tracking-widest text-gold">Free and Premium</p>
              <h2 id="plans" className="mt-2 font-display text-4xl font-bold text-cream sm:text-5xl">
                What you get with each plan
              </h2>
              <p className="mt-6 leading-relaxed">
                Start on the Free plan with no payment. Upgrade to Premium for unlimited searches, smart recommendations and lists you
                can share with friends.
              </p>
            </FadeUp>

            <div className="mt-12 grid items-center gap-12 lg:grid-cols-[1fr_auto] lg:gap-16">
              {/* old "reveal" class removed so it doesn't fight Motion */}
              <FadeUp className="overflow-clip rounded-2xl border border-gold/30 bg-ink">
                <table className="w-full border-collapse">
                  <caption className="sr-only">Features included in the Free plan and the Premium plan</caption>
                  <thead>
                    <tr>
                      <th scope="col" className="px-4 py-5 text-left align-bottom text-xs font-bold uppercase tracking-[0.2em] text-cream/60">
                        Feature
                      </th>
                      <th scope="col" className="w-[26%] px-2 py-5 text-center align-bottom sm:px-4">
                        <span className="block font-display text-2xl font-bold text-cream">Free</span>
                        <span className="mt-1 block text-sm text-cream/70">$0</span>
                      </th>
                      <th scope="col" className="w-[30%] bg-gold/10 px-2 py-5 text-center align-bottom sm:px-4">
                        <span className="block font-display text-2xl font-bold text-gold">Premium</span>
                        <span className="mt-1 block text-sm">$4.99 / month</span>
                        <span className="mt-0.5 block text-xs text-cream/70">Free trial for new users</span>
                      </th>
                    </tr>
                  </thead>
                  <PlanGroup title="On both plans" rows={bothPlans} />
                  <PlanGroup title="Premium only" rows={premiumOnly} />
                </table>
              </FadeUp>

              <FadeUp x={40} y={0} delay={0.2}>
                <PhoneRow label="The Free and Premium plan screens in the app">
                  <PhoneShot screen={s.planFree} compact />
                  <PhoneShot screen={s.planPremium} compact />
                </PhoneRow>
              </FadeUp>
            </div>

            <p className="mx-auto mt-8 max-w-2xl text-center text-sm text-cream/70">
              Plans and prices are as shown in the app and can differ by country or app store.
            </p>
          </div>
        </section>

        {/* EXPLORE */}
        <section className="bg-charcoal" aria-labelledby="explore">
          <div className="section-y mx-auto max-w-6xl px-5 sm:px-6">
            <FadeUp y={24}>
              <h2 id="explore" className="text-center font-display text-4xl font-bold text-gold sm:text-5xl">
                Explore Tallee
              </h2>
            </FadeUp>
            <Stagger className="mt-12 grid gap-10 md:grid-cols-3" gap={0.12}>
              <StaggerItem>
                <ExploreGroup title="By occasion" links={Object.entries(occasions).map(([slug, p]) => ({ href: urls.occasion(slug), label: p.name }))} />
              </StaggerItem>
              <StaggerItem>
                <ExploreGroup title="By vibe" links={Object.entries(categories).map(([slug, p]) => ({ href: urls.category(slug), label: p.name }))} />
              </StaggerItem>
              <StaggerItem>
                <ExploreGroup title="By city" links={Object.entries(cities).map(([slug, p]) => ({ href: urls.city(slug), label: p.name }))} />
              </StaggerItem>
            </Stagger>
          </div>
        </section>

        {/* DOWNLOAD */}
        {/* DOWNLOAD */}
        <DownloadStage
          id="download"
          title="Ready to find your next favorite spot?"
          text="Download Tallee and search “Tallee Knows” in your app store."
          background={
            <>
              <PatternBackground />
              <div className="absolute inset-0 -z-10 opacity-60">
                <HeroEmblem />
              </div>
            </>
          }
        >
          <StoreButtons />
        </DownloadStage>
      </div>
    </MotionProvider>
  );
}






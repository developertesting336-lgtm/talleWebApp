import type { Metadata } from "next";
import Image from "next/image";
import { PatternBackground } from "@/components/PatternBackground";
import { StoreButtons } from "@/components/StoreButtons";
import { ContactForm } from "@/components/ContactForm";
import { JsonLd } from "@/components/JsonLd";
import { images, site } from "@/lib/site";
import { ScrollZoomHero } from "@/components/ScrollZoomHero";
import { HeroEmblem } from "@/components/HeroEmblem";
import WhoWeAre from "@/components/WhoWeAre";
import DifferenceSection from "@/components/DifferenceSection";
import { FaqCard, FaqItem } from "@/components/FaqMotion";
import { TextReveal } from "@/components/TextReveal";
import { Reveal } from "@/components/Reveal";
import { FaqAmbient } from "@/components/FaqAmbient";

export const metadata: Metadata = {
  title: { absolute: site.title },
  alternates: { canonical: "/" },
};

const differentiators = [
  "Occasion based suggestions (date night, celebrations, casual hangs, business meetups)",
  "Hidden gems, not just popular picks: Tallee doesn’t recommend a place just because it’s popular, so you can find great spots that don’t show up on every “top 10” list",
  "Vibe matching based on your mood and preferences",
  "Personalized picks that get better over time",
  "Memory mode, so your favorites and preferences stay saved",
];

const faqs = [
  {
    q: "How to Navigate Tallee?",
    a: "Using Tallee is intuitive. Simply set your mood and occasion, and let our AI recommend the perfect spot for you.",
  },
  {
    q: "Is It Affordable and Accessible?",
    a: "Yes, Tallee is free to download and use, ensuring everyone can benefit from our tailored recommendations.",
  },
  {
    q: "Does My Voice Matter?",
    a: "Absolutely! We welcome your suggestions for new places to feature on Tallee. Your feedback helps us improve our recommendations.",
  },
  {
    q: "Precision in Picks",
    a: "Our AI algorithm and user ratings ensure that our recommendations are accurate and in line with your preferences.",
  },
];

const faqJsonLd = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: faqs.map((f) => ({
    "@type": "Question",
    name: f.q,
    acceptedAnswer: { "@type": "Answer", text: f.a },
  })),
};

export default function HomePage() {
  return (
    <>
      <JsonLd data={faqJsonLd} />

      {/* HERO */}
      <ScrollZoomHero
        background={<PatternBackground />}
        emblem={<HeroEmblem />}
        contentClassName="max-w-5xl"
      >
        <h1 className="hero-in font-display text-[2.6rem] font-bold uppercase leading-[1.05] text-gold sm:text-6xl lg:text-[67px]">
          Find your next favorite spot with Tallee
        </h1>
        <div
          className="hero-in relative mt-10 max-w-3xl px-8 py-8 sm:px-10 text-[17px] leading-relaxed text-[#F6EFDF]"
          style={{
            "--d": 2,
            textShadow: "0 1px 3px rgba(0, 0, 0, 1)",
          } as React.CSSProperties}
        >
          {/* Feathered dark text scrim vignette */}
          <div
            aria-hidden="true"
            className="pointer-events-none absolute inset-0 -z-10 rounded-[16px] bg-[rgba(0,0,0,0.67)] blur-[10px]"
          />
          <div className="space-y-1">
            <p>Tallee helps you find the right bars, restaurants, stores, and service providers fast.</p>
            <p>
              Whether it’s date night, brunch with friends, a solo reset, or a last-minute plan, Tallee researches options and recommends what fits your vibe. Use voice search, tailor results to your preferences, and get ideas for important dates with reminders that help you plan ahead.
            </p>
            <p>{site.tagline}</p>
          </div>
        </div>
        <p className="hero-in mt-14 font-display text-2xl font-bold uppercase sm:text-[26px]" style={{ "--d": 4 } as React.CSSProperties}>
          Click your app store below to
          <br />
          download the app. Search &quot;Tallee Knows&quot;
        </p>
        <div className="hero-in" style={{ "--d": 5 } as React.CSSProperties}>
          <StoreButtons className="mt-10" />
        </div>
      </ScrollZoomHero>

      {/* WHO WE ARE */}
      <WhoWeAre />

      {/* WHAT MAKES TALLEE DIFFERENT */}
      <DifferenceSection differentiators={differentiators} />

      {/* FAQ */}
      <section className="relative isolate overflow-clip" aria-labelledby="faq">
        <PatternBackground />
        <FaqAmbient />

        <div className="section-y mx-auto max-w-5xl px-4 sm:px-6">
          <Reveal variant="zoom" className="bg-charcoal/80 px-6 py-12 sm:px-12">
            <Reveal as="h2" variant="blur" delay={100} className="font-display text-4xl font-bold text-gold sm:text-center sm:text-[38px]" >
              <span id="faq">FAQ</span>
            </Reveal>
            <dl className="mt-10 grid gap-10 sm:grid-cols-2">
              {faqs.map((f, i) => (
                <Reveal key={f.q} variant="up" delay={200 + i * 120}>
                  <dt className="font-bold text-gold">{f.q}</dt>
                  <dd className="mt-3 leading-relaxed text-white">{f.a}</dd>
                </Reveal>
              ))}
            </dl>
          </Reveal>
        </div>
      </section>


      {/* CONTACT */}
      {/* <section id="contact" className="relative isolate overflow-clip bg-charcoal" aria-labelledby="contact-heading">
        <div
          aria-hidden="true"
          className="glow-pulse absolute inset-0 -z-10 bg-[radial-gradient(ellipse_at_top_left,rgba(223,179,96,0.14),transparent_60%)]"
        />
        <div className="section-y mx-auto grid max-w-6xl gap-12 px-5 sm:px-6 lg:grid-cols-[5fr_7fr] lg:items-center lg:gap-16">
          <div className="reveal">
            <p className="font-display text-xl font-bold uppercase tracking-widest text-gold">Get in touch</p>
            <h2 id="contact-heading" className="mt-2 font-display text-5xl font-bold text-cream sm:text-6xl">
              Contact us
            </h2>
            <span aria-hidden="true" className="line-grow mt-5 block h-px w-16 bg-gold" />
            <p className="mt-6 max-w-md text-lg leading-relaxed">
              Questions, feedback, or a place you think Tallee should know about? Send us a message and we’ll get back to you.
            </p>

            <dl className="mt-10 space-y-6">
              <div>
                <dt className="text-xs font-bold uppercase tracking-[0.2em] text-gold">Email</dt>
                <dd className="mt-1.5">
                  <a href={`mailto:${site.contactEmail}`} className="hover:text-gold">
                    {site.contactEmail}
                  </a>
                </dd>
              </div>
              <div>
                <dt className="text-xs font-bold uppercase tracking-[0.2em] text-gold">Address</dt>
                <dd className="mt-1.5">
                  <address className="not-italic leading-relaxed">
                    TALLEE L.L.C.
                    {site.address.map((line) => (
                      <span key={line} className="block">
                        {line}
                      </span>
                    ))}
                  </address>
                </dd>
              </div>
              <div>
                <dt className="text-xs font-bold uppercase tracking-[0.2em] text-gold">Follow</dt>
                <dd className="mt-1.5 flex gap-6">
                  <a href={site.social.instagram} target="_blank" rel="noopener noreferrer" className="hover:text-gold">
                    Instagram
                  </a>
                  <a href={site.social.tiktok} target="_blank" rel="noopener noreferrer" className="hover:text-gold">
                    TikTok
                  </a>
                </dd>
              </div>
            </dl>
          </div>

          <div className="reveal rounded-2xl border border-gold/30 bg-ink p-6 shadow-[0_20px_60px_rgba(0,0,0,0.5)] sm:p-10">
            <ContactForm />
          </div>
        </div>
      </section> */}
      {/* CONTACT */}
      <section id="contact" className="relative isolate overflow-clip bg-charcoal" aria-labelledby="contact-heading">
        <div
          aria-hidden="true"
          className="glow-pulse absolute inset-0 -z-10 bg-[radial-gradient(ellipse_at_top_left,rgba(223,179,96,0.14),transparent_60%)]"
        />
        <div className="section-y mx-auto grid max-w-6xl gap-12 px-5 sm:px-6 lg:grid-cols-[5fr_7fr] lg:items-center lg:gap-16">
          <div>
            <Reveal as="p" variant="fade" className="font-display text-xl font-bold uppercase tracking-widest text-gold">
              Get in touch
            </Reveal>
            <Reveal as="h2" variant="up" delay={100} className="mt-2 font-display text-5xl font-bold text-cream sm:text-6xl">
              <span id="contact-heading">Contact us</span>
            </Reveal>
            <Reveal as="span" variant="line" delay={250} className="mt-5 block h-px w-16 bg-gold" />
            <Reveal as="p" variant="up" delay={300} className="mt-6 max-w-md text-lg leading-relaxed">
              Questions, feedback, or a place you think Tallee should know about? Send us a message and we’ll get back to you.
            </Reveal>

            <dl className="mt-10 space-y-6">
              <Reveal variant="left" delay={400}>
                <dt className="text-xs font-bold uppercase tracking-[0.2em] text-gold">Email</dt>
                <dd className="mt-1.5">
                  <a href={`mailto:${site.contactEmail}`} className="hover:text-gold">{site.contactEmail}</a>
                </dd>
              </Reveal>
              <Reveal variant="left" delay={520}>
                <dt className="text-xs font-bold uppercase tracking-[0.2em] text-gold">Address</dt>
                <dd className="mt-1.5">
                  <address className="not-italic leading-relaxed">
                    TALLEE L.L.C.
                    {site.address.map((line) => (
                      <span key={line} className="block">{line}</span>
                    ))}
                  </address>
                </dd>
              </Reveal>
              <Reveal variant="left" delay={640}>
                <dt className="text-xs font-bold uppercase tracking-[0.2em] text-gold">Follow</dt>
                <dd className="mt-1.5 flex gap-6">
                  <a href={site.social.instagram} target="_blank" rel="noopener noreferrer" className="hover:text-gold">Instagram</a>
                  <a href={site.social.tiktok} target="_blank" rel="noopener noreferrer" className="hover:text-gold">TikTok</a>
                </dd>
              </Reveal>
            </dl>
          </div>

          <Reveal variant="right" delay={200} className="rounded-2xl border border-gold/30 bg-ink p-6 shadow-[0_20px_60px_rgba(0,0,0,0.5)] sm:p-10">
            <ContactForm />
          </Reveal>
        </div>
      </section>
    </>
  );
}
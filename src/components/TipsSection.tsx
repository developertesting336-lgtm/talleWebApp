"use client";

import { motion, useReducedMotion } from "motion/react";

export type TipItem = {
  title: string;
  text: string;
};

export interface TipsSectionProps {
  id?: string;
  title?: string;
  eyebrow?: string;
  tips?: TipItem[];
  className?: string;
}

const DEFAULT_TIPS: TipItem[] = [
  {
    title: "Check the hours",
    text: "Opening hours are on each place's page. Confirm they're open for the game.",
  },
  {
    title: "Call ahead for big games",
    text: "Use the phone number on the place's page to ask about seating.",
  },
  {
    title: "Combine vibes",
    text: "Add Social Entertainment/Barcades or Chill to tune the atmosphere.",
  },
  {
    title: "Look for events",
    text: "Open Events Near Me to see what's on in your area.",
  },
];

const easeCurve = [0.16, 1, 0.3, 1] as const;

export function TipsSection({
  id = "tips",
  title = "Tips for the best night out",
  eyebrow,
  tips = DEFAULT_TIPS,
  className = "",
}: TipsSectionProps) {
  const prefersReduced = useReducedMotion();
  const reduce = !!prefersReduced;

  return (
    <section
      aria-labelledby={id}
      className={`relative isolate overflow-clip bg-[#0a0a0a] text-cream ${className}`}
    >
      <div className="section-y mx-auto max-w-6xl px-5 sm:px-6">
        {/* ========================================================= */}
        {/* HEADLINE & EXPANDING GOLD UNDERLINE BAR                   */}
        {/* ========================================================= */}
        <div className="text-center">
          {eyebrow && (
            <motion.p
              initial={reduce ? { opacity: 1, y: 0 } : { opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: false, amount: 0.2 }}
              transition={{ duration: 0.6, ease: easeCurve }}
              className="font-display text-lg font-bold uppercase tracking-[0.25em] text-[#c89d56]"
            >
              {eyebrow}
            </motion.p>
          )}

          {/* Headline: opacity: 0 -> 1, y: 22 -> 0 (0.7s) */}
          <motion.h2
            id={id}
            initial={reduce ? { opacity: 1, y: 0 } : { opacity: 0, y: 22 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: false, amount: 0.2 }}
            transition={{ duration: 0.7, ease: easeCurve }}
            className="mt-2 font-display text-4xl font-bold text-cream sm:text-5xl"
          >
            {title}
          </motion.h2>

          {/* Gold Underline Bar: expands from width 0 -> 48px (0.75s, delay: 0.15s) */}
          <motion.span
            aria-hidden="true"
            initial={reduce ? { width: 48, opacity: 1 } : { width: 0, opacity: 0 }}
            whileInView={{ width: 48, opacity: 1 }}
            viewport={{ once: false, amount: 0.2 }}
            transition={{ duration: 0.75, delay: 0.15, ease: easeCurve }}
            className="mx-auto mt-5 block h-0.5 bg-[#c89d56]"
          />
        </div>

        {/* ========================================================= */}
        {/* 2x2 GRID WITH STAGGERED SVG CHECKMARK DRAW CARDS          */}
        {/* ========================================================= */}
        <ul className="mx-auto mt-14 grid max-w-4xl gap-x-12 gap-y-9 sm:grid-cols-2">
          {tips.map((tip, i) => {
            // Snappy, deliberate stagger delay
            const delay = 0.1 + i * 0.12;

            return (
              <motion.li
                key={tip.title}
                initial={
                  reduce
                    ? { opacity: 1, y: 0, scale: 1 }
                    : { opacity: 0, y: 36, scale: 0.95 }
                }
                whileInView={{ opacity: 1, y: 0, scale: 1 }}
                viewport={{ once: false, amount: 0.15 }}
                transition={{
                  duration: 0.75,
                  delay,
                  ease: easeCurve,
                }}
                className="flex items-start gap-4 rounded-xl p-2 will-change-transform"
              >
                {/* Gold SVG Checkmark Icon with Path Draw Animation */}
                <span className="mt-1 flex h-7 w-7 flex-none items-center justify-center rounded-full border border-[#c89d56]/40 bg-[#c89d56]/10 text-[#c89d56] shadow-[0_0_12px_rgba(200,157,86,0.15)]">
                  <svg
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="#c89d56"
                    strokeWidth="2.6"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    className="h-4 w-4"
                    aria-hidden="true"
                  >
                    <motion.path
                      d="M4 12l5 5L20 6"
                      initial={
                        reduce
                          ? { pathLength: 1, opacity: 1 }
                          : { pathLength: 0, opacity: 0 }
                      }
                      whileInView={{ pathLength: 1, opacity: 1 }}
                      viewport={{ once: false, amount: 0.15 }}
                      transition={{
                        duration: 0.65,
                        delay: delay + 0.14,
                        ease: easeCurve,
                      }}
                    />
                  </svg>
                </span>

                {/* Card Content */}
                <div>
                  <h3 className="font-display text-2xl font-bold text-cream">
                    {tip.title}
                  </h3>
                  <p className="mt-2 leading-relaxed text-[#F6EFDF]/85">
                    {tip.text}
                  </p>
                </div>
              </motion.li>
            );
          })}
        </ul>
      </div>
    </section>
  );
}

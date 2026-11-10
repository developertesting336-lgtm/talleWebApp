"use client";

import Link from "next/link";
import { useRef, type ReactNode } from "react";
import {
  motion,
  useReducedMotion,
  useScroll,
  useSpring,
  useTransform,
  type MotionValue,
} from "motion/react";
import { PhoneShot } from "@/components/PhoneShot";
import { appScreens } from "@/lib/site";

export type StepItem = {
  title: string;
  text: string;
};

export type AppScreenKey = keyof typeof appScreens;

export interface ThreeStepsSectionProps {
  eyebrow?: string;
  title?: string;
  stepsList?: StepItem[];
  linkHref?: string;
  linkLabel?: string;
  shots?: [AppScreenKey, AppScreenKey];
  screenLabel?: string;
  children?: ReactNode;
  className?: string;
}

const DEFAULT_STEPS: StepItem[] = [
  {
    title: "Pick occasion or vibe",
    text: "Tell Tallee what you're planning — from low-key drinks to rooftop celebrations.",
  },
  {
    title: "Filter by whatever matters",
    text: "Narrow down by music, crowd, dietary preferences, or happy hour specials.",
  },
  {
    title: "Get directions and go",
    text: "One tap gets you instant directions, hours, menus, and verified spot details.",
  },
];

/**
 * Individual Step Item with smooth scroll-scrubbed lighting and activation
 */
function StepItemRow({
  step,
  index,
  total,
  progress,
  reduce,
}: {
  step: StepItem;
  index: number;
  total: number;
  progress: MotionValue<number>;
  reduce: boolean;
}) {
  const triggerPoint = index / Math.max(total - 1, 1);
  const startAt = Math.max(0, triggerPoint - 0.16);
  const endAt = Math.min(1, triggerPoint + 0.06);

  // Content opacity brightens as the line reaches this step
  const contentOpacity = useTransform(
    progress,
    index === 0 ? [0, 0.1] : [startAt, endAt],
    index === 0 ? [0.85, 1] : [0.38, 1],
    { clamp: true }
  );

  // Number circle styling transitions
  const borderColor = useTransform(
    progress,
    index === 0 ? [0, 0.1] : [startAt, endAt],
    index === 0
      ? ["rgba(223,179,96,0.8)", "rgba(223,179,96,1)"]
      : ["rgba(223,179,96,0.25)", "rgba(223,179,96,1)"],
    { clamp: true }
  );

  const textColor = useTransform(
    progress,
    index === 0 ? [0, 0.1] : [startAt, endAt],
    index === 0
      ? ["rgba(223,179,96,0.9)", "rgba(223,179,96,1)"]
      : ["rgba(246,239,223,0.45)", "rgba(223,179,96,1)"],
    { clamp: true }
  );

  const badgeShadow = useTransform(
    progress,
    index === 0 ? [0, 0.1] : [startAt, endAt],
    index === 0
      ? ["0 0 6px rgba(223,179,96,0.25)", "0 0 16px rgba(223,179,96,0.55)"]
      : ["0 0 0px rgba(223,179,96,0)", "0 0 16px rgba(223,179,96,0.55)"],
    { clamp: true }
  );

  const badgeScale = useTransform(
    progress,
    index === 0 ? [0, 0.1] : [startAt, endAt],
    index === 0 ? [0.98, 1] : [0.94, 1.04],
    { clamp: true }
  );

  return (
    <motion.li
      className="flex gap-5"
      style={{ opacity: reduce ? 1 : contentOpacity }}
    >
      <motion.span
        style={{
          borderColor: reduce ? "rgb(223, 179, 96)" : borderColor,
          color: reduce ? "rgb(223, 179, 96)" : textColor,
          boxShadow: reduce
            ? "0 0 16px rgba(223,179,96,0.45)"
            : badgeShadow,
          scale: reduce ? 1 : badgeScale,
        }}
        className="relative z-10 grid h-11 w-11 flex-none place-items-center rounded-full border bg-[#191919] font-display text-xl font-bold transition-transform duration-200"
      >
        {index + 1}
      </motion.span>
      <div className="pt-1.5">
        <h3 className="font-display text-2xl font-bold text-cream">
          {step.title}
        </h3>
        <p className="mt-2 leading-relaxed text-[#F6EFDF]/85">{step.text}</p>
      </div>
    </motion.li>
  );
}

export function ThreeStepsSection({
  eyebrow = "How Tallee works",
  title = "Three steps to the right place",
  stepsList = DEFAULT_STEPS,
  linkHref = "/how-it-works",
  linkLabel = "See how Tallee works →",
  shots,
  screenLabel = "Tallee app screens",
  children,
  className = "",
}: ThreeStepsSectionProps) {
  const stepsContainerRef = useRef<HTMLDivElement>(null);
  const prefersReduced = useReducedMotion();
  const reduce = !!prefersReduced;

  // Real-time Scroll Scrub: tracks the steps section passing through the viewport
  const { scrollYProgress } = useScroll({
    target: stepsContainerRef,
    offset: ["start 75%", "end 45%"],
  });

  // Spring physics for buttery-smooth scroll scrub response
  const smoothProgress = useSpring(scrollYProgress, {
    stiffness: 170,
    damping: 26,
    mass: 0.2,
  });

  // Strict [0, 1] clamp for progress line scale
  const lineScaleY = useTransform(smoothProgress, [0, 1], [0, 1], {
    clamp: true,
  });

  // Traveling glowing dot riding down the progress line tip
  const dotTop = useTransform(smoothProgress, [0, 1], ["0%", "100%"], {
    clamp: true,
  });
  const dotOpacity = useTransform(
    smoothProgress,
    [0, 0.05, 0.96, 1],
    [0, 1, 1, 0],
    { clamp: true }
  );

  // =========================================================================
  // ENHANCED IMAGE MOTION: Dynamic Scroll Parallax & 3D Tilt linked to Scroll
  // =========================================================================
  // Phone 1 (left mockup): 90px vertical range, dynamic tilt & subtle scale
  const phone1Y = useTransform(smoothProgress, [0, 1], [45, -45]);
  const phone1Rotate = useTransform(smoothProgress, [0, 0.5, 1], [-3.5, 0, 3]);
  const phone1Scale = useTransform(smoothProgress, [0, 0.5, 1], [0.95, 1.02, 0.98]);

  // Phone 2 (right mockup): 110px vertical range, counter-tilt & depth scale
  const phone2Y = useTransform(smoothProgress, [0, 1], [70, -40]);
  const phone2Rotate = useTransform(smoothProgress, [0, 0.5, 1], [3.5, 0, -3]);
  const phone2Scale = useTransform(smoothProgress, [0, 0.5, 1], [0.93, 1.03, 0.97]);

  const easeCurve = [0.16, 1, 0.3, 1] as const;

  return (
    <section
      aria-labelledby="how"
      className={`relative isolate overflow-clip bg-[#191919] text-cream ${className}`}
    >
      <div className="section-y mx-auto grid max-w-6xl items-center gap-14 px-5 sm:px-6 lg:grid-cols-2 lg:gap-16">
        {/* ========================================================= */}
        {/* LEFT COLUMN: Headline & Scroll-Scrubbed Steps Progress   */}
        {/* ========================================================= */}
        <div>
          {/* Header */}
          <motion.div
            initial={reduce ? { opacity: 1, y: 0 } : { opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: false, amount: 0.25 }}
            transition={{ duration: 0.6, ease: easeCurve }}
          >
            {eyebrow && (
              <p className="font-display text-lg font-bold uppercase tracking-[0.25em] text-gold">
                {eyebrow}
              </p>
            )}
            <h2
              id="how"
              className="mt-2 font-display text-4xl font-bold text-cream sm:text-5xl"
            >
              {title}
            </h2>
          </motion.div>

          {/* Steps Container with Real-Time Scroll Scrub Progress Line */}
          <div ref={stepsContainerRef} className="relative mt-10">
            {/* Background Muted Track Line (Center of Step 1 to Center of Step 3) */}
            <div
              aria-hidden="true"
              className="absolute left-[21px] top-[22px] bottom-[22px] w-[2px] bg-gold/20"
            />

            {/* Scroll-Scrubbed Active Gold Progress Line */}
            <motion.div
              aria-hidden="true"
              style={{
                scaleY: reduce ? 1 : lineScaleY,
                transformOrigin: "top",
              }}
              className="absolute left-[21px] top-[22px] bottom-[22px] w-[2px] bg-gradient-to-b from-gold via-gold to-gold/80 shadow-[0_0_10px_rgba(223,179,96,0.7)]"
            />

            {/* Glowing Traveling Dot at Line Head */}
            {!reduce && (
              <div
                aria-hidden="true"
                className="pointer-events-none absolute left-[21px] top-[22px] bottom-[22px] w-[2px]"
              >
                <motion.div
                  style={{
                    top: dotTop,
                    opacity: dotOpacity,
                  }}
                  className="absolute -left-[3px] -translate-y-1/2 h-2 w-2 rounded-full bg-[#FFE8A3] shadow-[0_0_10px_2px_rgba(223,179,96,0.9)]"
                />
              </div>
            )}

            {/* Steps List */}
            <ol className="relative space-y-8">
              {stepsList.map((s, i) => (
                <StepItemRow
                  key={s.title}
                  step={s}
                  index={i}
                  total={stepsList.length}
                  progress={smoothProgress}
                  reduce={reduce}
                />
              ))}
            </ol>
          </div>

          {/* Link Button */}
          <motion.div
            initial={reduce ? { opacity: 1, y: 0 } : { opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: false, amount: 0.25 }}
            transition={{
              duration: 0.5,
              delay: 0.2,
              ease: easeCurve,
            }}
            className="mt-10"
          >
            <Link
              href={linkHref}
              className="group inline-flex items-center gap-2 border-b border-gold pb-1 font-bold text-gold transition-colors hover:text-cream"
            >
              <span>{linkLabel.replace(" →", "")}</span>
              <span
                aria-hidden="true"
                className="inline-block transition-transform duration-300 group-hover:translate-x-1.5"
              >
                →
              </span>
            </Link>
          </motion.div>
        </div>

        {/* ========================================================= */}
        {/* RIGHT COLUMN: Two Mobile Device Mockups with High Motion */}
        {/* ========================================================= */}
        <div className="min-w-0">
          {children ? (
            children
          ) : shots ? (
            <div
              role="group"
              aria-label={screenLabel}
              tabIndex={0}
              className="flex snap-x justify-center items-center gap-4 sm:gap-6 py-10 overflow-visible [-ms-overflow-style:none] [scrollbar-width:none] [&::-webkit-scrollbar]:hidden"
            >
              {/* Phone 1 (left mockup): Dramatic Entrance + Scroll Parallax + Float */}
              <motion.div
                initial={reduce ? { opacity: 1, y: 0, scale: 1 } : { opacity: 0, y: 75, scale: 0.9 }}
                whileInView={{ opacity: 1, y: 0, scale: 1 }}
                viewport={{ once: false, amount: 0.2 }}
                transition={{
                  duration: 0.85,
                  delay: 0.2,
                  ease: easeCurve,
                }}
                className="flex-none"
              >
                <motion.div
                  style={
                    reduce
                      ? undefined
                      : {
                          y: phone1Y,
                          rotate: phone1Rotate,
                          scale: phone1Scale,
                          transformPerspective: 1000,
                        }
                  }
                  className="will-change-transform"
                >
                  <PhoneShot screen={appScreens[shots[0]]} />
                </motion.div>
              </motion.div>

              {/* Phone 2 (right mockup): Asymmetrical Entrance + Scroll Parallax + Float */}
              <motion.div
                initial={reduce ? { opacity: 1, y: 0, scale: 1 } : { opacity: 0, y: 90, scale: 0.88 }}
                whileInView={{ opacity: 1, y: 0, scale: 1 }}
                viewport={{ once: false, amount: 0.2 }}
                transition={{
                  duration: 0.85,
                  delay: 0.35,
                  ease: easeCurve,
                }}
                className="flex-none"
              >
                <motion.div
                  style={
                    reduce
                      ? undefined
                      : {
                          y: phone2Y,
                          rotate: phone2Rotate,
                          scale: phone2Scale,
                          transformPerspective: 1000,
                        }
                  }
                  className="will-change-transform"
                >
                  <PhoneShot screen={appScreens[shots[1]]} />
                </motion.div>
              </motion.div>
            </div>
          ) : (
            /* Standalone / Fallback Mockups with High Motion */
            <div
              role="group"
              aria-label={screenLabel}
              tabIndex={0}
              className="flex snap-x justify-center items-center gap-4 sm:gap-6 py-10 overflow-visible [-ms-overflow-style:none] [scrollbar-width:none] [&::-webkit-scrollbar]:hidden"
            >
              <motion.div
                initial={reduce ? { opacity: 1, y: 0, scale: 1 } : { opacity: 0, y: 75, scale: 0.9 }}
                whileInView={{ opacity: 1, y: 0, scale: 1 }}
                viewport={{ once: false, amount: 0.2 }}
                transition={{
                  duration: 0.85,
                  delay: 0.2,
                  ease: easeCurve,
                }}
                className="flex-none"
              >
                <motion.div
                  style={
                    reduce
                      ? undefined
                      : {
                          y: phone1Y,
                          rotate: phone1Rotate,
                          scale: phone1Scale,
                          transformPerspective: 1000,
                        }
                  }
                  className="will-change-transform"
                >
                  <div
                    className="float flex-none snap-center rounded-t-[1.75rem] border border-b-0 border-gold/40 bg-charcoal p-1.5 pb-0 w-[150px] sm:w-[200px]"
                    style={{
                      maskImage: "linear-gradient(to bottom, #000 82%, transparent)",
                      WebkitMaskImage: "linear-gradient(to bottom, #000 82%, transparent)",
                    }}
                  >
                    <div className="h-[280px] sm:h-[340px] w-full rounded-t-[1.35rem] bg-gradient-to-b from-[#2a2a2a] to-[#161616] p-4 flex flex-col justify-between">
                      <div>
                        <div className="h-3 w-16 rounded bg-gold/40 mb-3" />
                        <div className="h-5 w-28 rounded bg-white/20 mb-2" />
                        <div className="h-3 w-full rounded bg-white/10" />
                      </div>
                      <div className="rounded-xl border border-gold/20 bg-white/[0.04] p-3">
                        <div className="h-3 w-20 rounded bg-gold/60 mb-2" />
                        <div className="h-2 w-full rounded bg-white/15" />
                      </div>
                    </div>
                  </div>
                </motion.div>
              </motion.div>

              <motion.div
                initial={reduce ? { opacity: 1, y: 0, scale: 1 } : { opacity: 0, y: 90, scale: 0.88 }}
                whileInView={{ opacity: 1, y: 0, scale: 1 }}
                viewport={{ once: false, amount: 0.2 }}
                transition={{
                  duration: 0.85,
                  delay: 0.35,
                  ease: easeCurve,
                }}
                className="flex-none"
              >
                <motion.div
                  style={
                    reduce
                      ? undefined
                      : {
                          y: phone2Y,
                          rotate: phone2Rotate,
                          scale: phone2Scale,
                          transformPerspective: 1000,
                        }
                  }
                  className="will-change-transform"
                >
                  <div
                    className="float flex-none snap-center rounded-t-[1.75rem] border border-b-0 border-gold/40 bg-charcoal p-1.5 pb-0 w-[150px] sm:w-[200px]"
                    style={{
                      animationDelay: "-3.5s",
                      maskImage: "linear-gradient(to bottom, #000 82%, transparent)",
                      WebkitMaskImage: "linear-gradient(to bottom, #000 82%, transparent)",
                    }}
                  >
                    <div className="h-[280px] sm:h-[340px] w-full rounded-t-[1.35rem] bg-gradient-to-b from-[#232323] to-[#121212] p-4 flex flex-col justify-between">
                      <div>
                        <div className="h-3 w-20 rounded bg-gold/40 mb-3" />
                        <div className="h-5 w-32 rounded bg-white/20 mb-2" />
                        <div className="h-3 w-3/4 rounded bg-white/10" />
                      </div>
                      <div className="rounded-xl border border-gold/20 bg-white/[0.04] p-3">
                        <div className="h-3 w-16 rounded bg-gold/60 mb-2" />
                        <div className="h-2 w-full rounded bg-white/15" />
                      </div>
                    </div>
                  </div>
                </motion.div>
              </motion.div>
            </div>
          )}
        </div>
      </div>
    </section>
  );
}

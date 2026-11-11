"use client";

import React, { useEffect, useRef, useState } from "react";
import Image from "next/image";
import { images, site } from "@/lib/site";
import { FadeUp } from "@/components/Motion";
import { DemoStage } from "@/components/DemoStage";
import { motion, useAnimation, useInView, useReducedMotion, useScroll, useSpring, useTransform } from "motion/react";
import "./WhoWeAre.css";

const styles = {
  section: "tallee-diff-section",
  frameWrapper: "tallee-who-frame-wrapper",
  frameBacking: "tallee-who-frame-backing",
  bracketTopLeft: "tallee-who-bracket-top-left",
  bracketBottomRight: "tallee-who-bracket-bottom-right",
  panel: "tallee-who-panel",
  imageOverflowClip: "tallee-who-image-overflow-clip",
  imageLayer: "tallee-who-image-layer",
  image: "tallee-who-image",
  innerVignette: "tallee-who-inner-vignette",
  pointerGlow: "tallee-who-pointer-glow",
  sealBadge: "tallee-who-seal-badge",
  sealLetter: "tallee-who-seal-letter",
  caption: "tallee-who-caption",
} as const;

const defaultDifferentiators = [
  "Occasion-based suggestions — date night, celebrations, casual hangs, business meetups",
  "Hidden gems, not just popular picks: Tallee doesn’t recommend a place just because it’s popular, so you can find great spots that don’t show up on every “top 10” list",
  "Vibe matching based on your mood and preferences",
  "Personalized picks that get better over time",
  "Memory mode, so your favorites and preferences stay saved",
];

interface DifferenceSectionProps {
  differentiators?: string[];
  tagline?: string;
  imageSrc?: string;
}

export default function DifferenceSection({
  differentiators = defaultDifferentiators,
  tagline = site.tagline,
  imageSrc,
}: DifferenceSectionProps) {
  const sectionRef = useRef<HTMLElement>(null);
  const textColRef = useRef<HTMLDivElement>(null);
  const mediaColRef = useRef<HTMLDivElement>(null);
  const panelRef = useRef<HTMLDivElement>(null);
  const imageLayerRef = useRef<HTMLDivElement>(null);
  const glowRef = useRef<HTMLDivElement>(null);
  const rafIdRef = useRef<number | null>(null);

  const [isMobile, setIsMobile] = useState(false);
  useEffect(() => {
    const checkMobile = () => setIsMobile(window.innerWidth < 1024);
    checkMobile();
    window.addEventListener("resize", checkMobile);
    return () => window.removeEventListener("resize", checkMobile);
  }, []);

  const prefersReduced = useReducedMotion();
  const reduce = !!prefersReduced;

  const controls = useAnimation();

  // Section-level intersection observer: triggers reliably on both mobile & desktop
  const isSectionInView = useInView(sectionRef, {
    once: false,
    margin: "0px 0px -12% 0px",
  });

  // Desktop scroll tracking: spans entire section (side-by-side grid)
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start end", "end start"],
  });
  const smoothProgress = useSpring(scrollYProgress, {
    stiffness: 90,
    damping: 25,
    mass: 0.2,
  });
  // Once user scrolls down and elements appear into place, they stay stable at 0 (flat).
  // No backward drift as user continues scrolling down through the section.
  const desktopTextScrollX = useTransform(smoothProgress, [0, 0.38, 1], [-100, 0, 0]);
  const desktopImageScrollX = useTransform(smoothProgress, [0, 0.38, 1], [100, 0, 0]);

  // Mobile scroll tracking: each element tracks its own in-view window so the
  // left-to-right drift reaches its original flat position (0) exactly when
  // that element is centered in the mobile viewport, staying stable while scrolling down.
  const { scrollYProgress: mobileTextProgress } = useScroll({
    target: textColRef,
    offset: ["start end", "end start"],
  });
  const mobileTextSmooth = useSpring(mobileTextProgress, {
    stiffness: 90,
    damping: 25,
    mass: 0.2,
  });
  const mobileTextScrollX = useTransform(mobileTextSmooth, [0, 0.35, 1], [-35, 0, 0]);

  const { scrollYProgress: mobileMediaProgress } = useScroll({
    target: mediaColRef,
    offset: ["start end", "end start"],
  });
  const mobileMediaSmooth = useSpring(mobileMediaProgress, {
    stiffness: 90,
    damping: 25,
    mass: 0.2,
  });
  const mobileImageScrollX = useTransform(mobileMediaSmooth, [0, 0.35, 1], [35, 0, 0]);

  const textScrollX = isMobile ? mobileTextScrollX : desktopTextScrollX;
  const imageScrollX = isMobile ? mobileImageScrollX : desktopImageScrollX;

  useEffect(() => {
    if (reduce) {
      controls.set({ opacity: 0.08, x: 0 });
      return;
    }

    if (isSectionInView) {
      // Smoothly glide in from left behind the section at pure watermark opacity
      controls.start({
        x: ["-70vw", "0vw"],
        opacity: [0, 0.12, 0.08],
        transition: {
          duration: 1.1,
          ease: [0.16, 1, 0.3, 1],
        },
      });
    } else {
      // When scrolled out of view, reset offscreen so it glides in on next scroll
      controls.set({ x: "-70vw", opacity: 0 });
    }
  }, [isSectionInView, controls, reduce]);

  useEffect(() => {
    const sectionEl = sectionRef.current;
    if (!sectionEl) return;

    const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    if (!prefersReducedMotion && imageLayerRef.current) {
      imageLayerRef.current.style.transform = "scale(1.16) translateY(0px)";
    }

    // Passive vertical scroll parallax on media image
    const handleScroll = () => {
      if (prefersReducedMotion) return;
      if (rafIdRef.current !== null) return;

      rafIdRef.current = requestAnimationFrame(() => {
        rafIdRef.current = null;
        if (!sectionEl || !imageLayerRef.current) return;

        const rect = sectionEl.getBoundingClientRect();
        const winH = window.innerHeight;

        if (rect.bottom >= -50 && rect.top <= winH + 50) {
          const progress = (winH - rect.top) / (winH + rect.height);
          const clamped = Math.min(Math.max(progress, 0), 1);
          const translateY = (0.5 - clamped) * 2 * 24;
          imageLayerRef.current.style.transform = `scale(1.16) translateY(${translateY.toFixed(1)}px)`;
        }
      });
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    handleScroll();

    return () => {
      window.removeEventListener("scroll", handleScroll);
      if (rafIdRef.current !== null) {
        cancelAnimationFrame(rafIdRef.current);
      }
    };
  }, []);

  // Desktop Fine-Pointer 3D Tilt & Cursor Glow Handlers
  const handlePointerMove = (e: React.PointerEvent<HTMLDivElement>) => {
    const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const isFinePointer = window.matchMedia("(hover: hover) and (pointer: fine)").matches;
    if (prefersReducedMotion || !isFinePointer) return;

    const panel = panelRef.current;
    const glow = glowRef.current;
    if (!panel || !glow) return;

    const rect = panel.getBoundingClientRect();
    const px = (e.clientX - rect.left) / rect.width;
    const py = (e.clientY - rect.top) / rect.height;

    const tiltX = (0.5 - py) * 6.4;
    const tiltY = (px - 0.5) * 6.4;

    panel.style.transform = `perspective(1000px) rotateX(${tiltX.toFixed(2)}deg) rotateY(${tiltY.toFixed(2)}deg)`;
    glow.style.opacity = "1";
    glow.style.background = `radial-gradient(circle at ${(px * 100).toFixed(1)}% ${(py * 100).toFixed(1)}%, rgba(244, 223, 173, 0.22) 0%, rgba(216, 173, 99, 0.08) 35%, transparent 70%)`;
  };

  const handlePointerLeave = () => {
    const panel = panelRef.current;
    const glow = glowRef.current;
    if (!panel || !glow) return;

    panel.style.transform = "perspective(1000px) rotateX(0deg) rotateY(0deg)";
    glow.style.opacity = "0";
  };

  return (
    <section
      ref={sectionRef}
      id="the-difference"
      className={styles.section}
      aria-labelledby="difference-heading"
    >
      {/* Subtle Ambient Radial Backdrops */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute left-0 top-1/4 -z-10 h-[600px] w-[600px] -translate-x-1/2 rounded-full bg-gold/5 blur-[140px]"
      />
      <div
        aria-hidden="true"
        className="pointer-events-none absolute right-0 bottom-1/4 -z-10 h-[600px] w-[600px] translate-x-1/2 rounded-full bg-gold/5 blur-[140px]"
      />

      {/* Giant Luxury Watermark in Background - sweeps in from left glowing, then dims to watermark as content appears */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 z-0 flex items-center justify-center overflow-hidden select-none"
      >
        <motion.div
          animate={controls}
          initial={
            reduce
              ? { opacity: 0.08, x: 0 }
              : { opacity: 0, x: "-70vw" }
          }
          className="flex w-full items-center justify-center h-full sm:h-auto max-w-6xl mx-auto"
        >
          {/* Vertical layout on mobile screens */}
          <div className="flex sm:hidden flex-col items-center justify-between h-[82%] py-4">
            {["T", "A", "L", "L", "E", "E"].map((char, index) => (
              <span
                key={index}
                className="shrink-0 text-center font-display text-[18vw] font-bold uppercase leading-none text-gold"
              >
                {char}
              </span>
            ))}
          </div>

          {/* Horizontal layout on desktop & tablet screens matching original size */}
          <span className="hidden sm:inline-block whitespace-nowrap font-display text-[18vw] font-bold uppercase leading-none tracking-[0.1em] text-gold">
            TALLEE
          </span>
        </motion.div>
      </div>

      <div className="section-y relative z-10 mx-auto grid max-w-6xl items-center gap-10 px-5 sm:px-6 lg:grid-cols-2 lg:gap-16">
        {/* Left Column: Media Frame (How It Works Flip Transition) */}
        <FadeUp
          x={-40}
          y={0}
          delay={reduce ? 0 : 0.15}
          viewport={{ once: true, margin: "0px 0px -10% 0px" }}
          className="min-w-0 relative lg:order-1"
        >
          <motion.div ref={mediaColRef} style={{ x: reduce ? 0 : imageScrollX }}>
            <DemoStage reverse showScanLine={true}>
              <div
                className={styles.frameWrapper}
                onPointerMove={handlePointerMove}
                onPointerLeave={handlePointerLeave}
              >
                {/* Architectural Offset Backing Line */}
                <div aria-hidden="true" className={styles.frameBacking} />

                {/* Architectural Corner Brackets */}
                <div aria-hidden="true" className={styles.bracketTopLeft} />
                <div aria-hidden="true" className={styles.bracketBottomRight} />

                {/* Interactive 3D Tilt Panel */}
                <div ref={panelRef} className={styles.panel}>
                  <div className={styles.imageOverflowClip}>
                    <div ref={imageLayerRef} className={styles.imageLayer}>
                      <Image
                        src={imageSrc ?? images.about}
                        alt="Browsing a curated venue in the Tallee app"
                        fill
                        sizes="(max-width: 820px) 90vw, 380px"
                        className={styles.image}
                        priority={false}
                      />
                    </div>
                  </div>

                  {/* Inner Shadow Vignette */}
                  <div aria-hidden="true" className={styles.innerVignette} />

                  {/* Dynamic Cursor Radial Glow */}
                  <div ref={glowRef} aria-hidden="true" className={styles.pointerGlow} />
                </div>

                {/* Monogram Seal Badge in Bottom Right Corner */}
                <div aria-hidden="true" className={styles.sealBadge}>
                  <span className={styles.sealLetter}>T</span>
                </div>

                {/* Architectural Caption Underneath */}
                <p aria-hidden="true" className={styles.caption}>
                  02 / THE DIFFERENCE
                </p>
              </div>
            </DemoStage>
          </motion.div>
        </FadeUp>

        {/* Right Column: Differentiators Content (How It Works Slide-In Transition) */}
        <FadeUp
          x={40}
          y={0}
          delay={reduce ? 0 : 0.1}
          viewport={{ once: true, margin: "0px 0px -10% 0px" }}
          className="relative lg:order-2"
        >
          <motion.div ref={textColRef} style={{ x: reduce ? 0 : textScrollX }}>
            {/* Vertical Index Track 02 */}
            <div className="absolute -right-7 top-2 hidden sm:flex flex-col items-center gap-2.5 lg:-right-12">
              <span className="text-[10px] font-medium tracking-[0.25em] text-gold/70 [writing-mode:vertical-lr] rotate-180">
                02
              </span>
              <div className="h-16 w-[1px] bg-gradient-to-b from-gold/50 via-gold/25 to-transparent" />
            </div>

            {/* Eyebrow Label with Leading Line */}
            <div className="flex items-center gap-3">
              <span className="h-[1px] w-8 bg-gold/80" />
              <span className="text-xs font-semibold uppercase tracking-[0.25em] text-gold">
                The Difference
              </span>
            </div>

            {/* Large Serif Heading spanning 3 lines */}
            <h3
              id="difference-heading"
              className="mt-5 font-display text-5xl font-normal leading-[1.05] text-[#E8BA60] sm:text-6xl lg:text-[4.25rem]"
            >
              What makes
              <br />
              Tallee
              <br />
              different
            </h3>

            {/* Gold Expanding Underline matching How It Works */}
            <motion.span
              aria-hidden="true"
              className="mt-4 block h-0.5 w-24 origin-left bg-gradient-to-r from-gold to-transparent"
              initial={{ scaleX: 0 }}
              whileInView={{ scaleX: 1 }}
              viewport={{ once: true, margin: "0px 0px -10% 0px" }}
              transition={{ duration: 0.9, ease: "easeOut", delay: reduce ? 0 : 0.25 }}
            />

            {/* Architectural Sub-divider & Tagline */}
            <div className="mt-8 border-t border-gold/20 pt-6">
              <p className="text-[11px] font-semibold uppercase tracking-[0.22em] text-gold">
                Thoughtfully Intelligent
              </p>
            </div>

            {/* Feature List (Clean Gold Bullet Points) */}
            <ul className="mt-6 space-y-4">
              {differentiators.map((d) => (
                <li
                  key={d}
                  className="flex items-start gap-4 text-[15px] sm:text-base leading-[1.7] text-[#ECEBED] font-light"
                >
                  <span
                    aria-hidden="true"
                    className="mt-[0.55em] h-1.5 w-1.5 flex-none rounded-full bg-gold shadow-[0_0_8px_rgba(223,179,96,0.6)]"
                  />
                  <span>{d}</span>
                </li>
              ))}
            </ul>

            {/* Bottom Signature Tagline */}
            <div className="mt-10 border-t border-gold/20 pt-6">
              <p className="font-display text-3xl sm:text-4xl italic text-[#E8BA60]">
                {tagline}
              </p>
            </div>
          </motion.div>
        </FadeUp>
      </div>

      {/* Scroll Link to FAQ (Mobile) */}
      <a
        href="#faq"
        aria-label="Scroll to FAQ"
        className="mx-auto mt-16 grid h-10 w-10 place-items-center text-gold/60 transition-colors hover:text-gold md:hidden"
      >
        <svg
          viewBox="0 0 24 24"
          className="h-6 w-6"
          fill="none"
          stroke="currentColor"
          strokeWidth="1.5"
          aria-hidden="true"
        >
          <path d="M12 4v16M5 13l7 7 7-7" />
        </svg>
      </a>
    </section>
  );
}


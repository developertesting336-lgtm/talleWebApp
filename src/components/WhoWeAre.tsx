"use client";

import React, { useEffect, useRef, useState } from "react";
import Image from "next/image";
import { images } from "@/lib/site";
import { FadeUp } from "@/components/Motion";
import { DemoStage } from "@/components/DemoStage";
import { motion, useAnimation, useInView, useReducedMotion, useScroll, useSpring, useTransform } from "motion/react";
import "./WhoWeAre.css";

// =========================================================================
// SCOPED CLASSNAMES MAPPING
// Fully compatible with Next.js Turbopack and Tailwind v4 CSS pipeline
// =========================================================================
const styles = {
  section: "tallee-who-section",
  ambientGlow: "tallee-who-ambient-glow",
  ambientGlowRight: "tallee-who-ambient-glow-right",
  vignetteOverlay: "tallee-who-vignette-overlay",
  subtleTexture: "tallee-who-subtle-texture",
  scrollExplore: "tallee-who-scroll-explore",
  scrollLabel: "tallee-who-scroll-label",
  scrollLine: "tallee-who-scroll-line",
  container: "tallee-who-container",
  grid: "tallee-who-grid",
  copyCol: "tallee-who-copy-col",
  trackMarker: "tallee-who-track-marker",
  trackNumber: "tallee-who-track-number",
  trackLine: "tallee-who-track-line",
  kicker: "tallee-who-kicker",
  kickerLine: "tallee-who-kicker-line",
  kickerText: "tallee-who-kicker-text",
  heading: "tallee-who-heading",
  wordMask: "tallee-who-word-mask",
  word: "tallee-who-word",
  shimmerWord: "tallee-who-shimmer-word",
  headingUnderline: "tallee-who-heading-underline",
  eyebrow: "tallee-who-eyebrow",
  prose: "tallee-who-prose",
  paragraph: "tallee-who-paragraph",
  mediaCol: "tallee-who-media-col",
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

// =========================================================================
// LUXURY EDITORIAL MOTION TUNING CONSTANTS
// =========================================================================
export const REVEAL_THRESHOLD = 0.16;
export const REVEAL_ROOT_MARGIN = "0px 0px -8% 0px";
export const PARALLAX_MAX_PX = 24;
export const BASE_SCALE = 1.16;
export const MAX_TILT_DEG = 3.2;
export const WORD_STAGGER_MS = 95;

interface WhoWeAreProps {
  imageSrc?: string;
}

export default function WhoWeAre({ imageSrc }: WhoWeAreProps) {
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
  const desktopTextScrollX = useTransform(smoothProgress, [0, 0.38, 1], [-120, 0, 0]);
  const desktopImageScrollX = useTransform(smoothProgress, [0, 0.38, 1], [120, 0, 0]);

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

    // 1. Progressive Enhancement: Mark JavaScript as enabled on client mount
    sectionEl.setAttribute("data-js", "true");

    // 2. Check accessibility preferences
    const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    if (!prefersReducedMotion && imageLayerRef.current) {
      imageLayerRef.current.style.transform = `scale(${BASE_SCALE}) translateY(0px)`;
    }

    // 3. Fallback if IntersectionObserver is unsupported
    if (typeof IntersectionObserver === "undefined") {
      sectionEl.setAttribute("data-visible", "true");
      sectionEl.setAttribute("data-active", "true");
      return;
    }

    // 4. One-Time Section Reveal Observer (0.16 threshold, -8% rootMargin)
    const revealObserver = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            sectionEl.setAttribute("data-visible", "true");
            revealObserver.unobserve(sectionEl);
            revealObserver.disconnect();
          }
        });
      },
      {
        threshold: REVEAL_THRESHOLD,
        rootMargin: REVEAL_ROOT_MARGIN,
      }
    );
    revealObserver.observe(sectionEl);

    // 5. Passive Scroll Parallax via requestAnimationFrame (Zero React state re-renders)
    const handleScroll = () => {
      if (prefersReducedMotion) return;
      if (rafIdRef.current !== null) return;

      rafIdRef.current = requestAnimationFrame(() => {
        rafIdRef.current = null;
        if (!sectionEl || !imageLayerRef.current) return;

        const rect = sectionEl.getBoundingClientRect();
        const winH = window.innerHeight;

        // Only compute when the section is within or near the viewport
        if (rect.bottom >= -50 && rect.top <= winH + 50) {
          const progress = (winH - rect.top) / (winH + rect.height);
          const clamped = Math.min(Math.max(progress, 0), 1);
          // Progress 0 (entering from bottom) -> +24px; Progress 1 (exiting top) -> -24px
          const translateY = (0.5 - clamped) * 2 * PARALLAX_MAX_PX;
          imageLayerRef.current.style.transform = `scale(${BASE_SCALE}) translateY(${translateY.toFixed(1)}px)`;
        }
      });
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    handleScroll(); // Initial position calculation

    return () => {
      revealObserver.disconnect();
      window.removeEventListener("scroll", handleScroll);
      if (rafIdRef.current !== null) {
        cancelAnimationFrame(rafIdRef.current);
      }
    };
  }, []);

  // 7. Desktop Fine-Pointer 3D Tilt & Radial Cursor Glow Handlers
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

    // Subtle 3D tilt calculation (capped at ±MAX_TILT_DEG)
    const tiltX = (0.5 - py) * (MAX_TILT_DEG * 2);
    const tiltY = (px - 0.5) * (MAX_TILT_DEG * 2);

    panel.style.transform = `perspective(1000px) rotateX(${tiltX.toFixed(2)}deg) rotateY(${tiltY.toFixed(2)}deg)`;
    glow.style.opacity = "1";
    glow.style.background = `radial-gradient(circle at ${(px * 100).toFixed(1)}% ${(py * 100).toFixed(1)}%, rgba(244, 223, 173, 0.22) 0%, rgba(216, 173, 99, 0.08) 35%, transparent 70%)`;
  };

  const handlePointerLeave = () => {
    const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const isFinePointer = window.matchMedia("(hover: hover) and (pointer: fine)").matches;
    if (prefersReducedMotion || !isFinePointer) return;

    const panel = panelRef.current;
    const glow = glowRef.current;
    if (!panel || !glow) return;

    panel.style.transform = "perspective(1000px) rotateX(0deg) rotateY(0deg)";
    glow.style.opacity = "0";
  };

  return (
    <section
      ref={sectionRef}
      id="who-we-are"
      className={styles.section}
      aria-labelledby="who-we-are-heading"
    >
      {/* Background Atmosphere Layers */}
      <div aria-hidden="true" className={styles.ambientGlow} />
      <div aria-hidden="true" className={styles.ambientGlowRight} />
      <div aria-hidden="true" className={styles.vignetteOverlay} />
      <div aria-hidden="true" className={styles.subtleTexture} />

      {/* Giant Luxury Watermark in Background - moves behind the section as user scrolls */}
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

      {/* Transition: Scroll To Explore Indicator */}
      <div aria-hidden="true" className={styles.scrollExplore}>
        <span className={styles.scrollLabel}>Scroll to Explore</span>
        <div className={styles.scrollLine} />
      </div>

      {/* Content Container */}
      <div className="section-y relative z-10 mx-auto grid max-w-6xl items-center gap-10 px-5 sm:px-6 lg:grid-cols-2 lg:gap-16">
        {/* =========================================================
              LEFT COLUMN: EDITORIAL COPY (How It Works Slide-In Transition)
             ========================================================= */}
        <FadeUp
          x={-40}
          y={0}
          delay={reduce ? 0 : 0.1}
          viewport={{ once: true, margin: "0px 0px -10% 0px" }}
          className={styles.copyCol}
        >
          <motion.div ref={textColRef} style={{ x: reduce ? 0 : textScrollX }}>
            {/* Vertical Index Track 01 */}
            <div aria-hidden="true" className={styles.trackMarker}>
              <span className={styles.trackNumber}>01</span>
              <div className={styles.trackLine} />
            </div>

            {/* Micro-label / Kicker with Leading Gold Accent Line */}
            <div aria-hidden="true" className={styles.kicker}>
              <span className={styles.kickerLine} />
              <span className={styles.kickerText}>About Tallee</span>
            </div>

            {/* Word-Split Heading with 3D Rise Masks */}
            <h2 id="who-we-are-heading" className={styles.heading}>
              <span className={styles.wordMask}>
                <span
                  className={styles.word}
                  style={{ "--word-delay": `${0 * WORD_STAGGER_MS}ms` } as React.CSSProperties}
                >
                  Who&nbsp;
                </span>
              </span>
              <span className={styles.wordMask}>
                <span
                  className={styles.word}
                  style={{ "--word-delay": `${1 * WORD_STAGGER_MS}ms` } as React.CSSProperties}
                >
                  We&nbsp;
                </span>
              </span>
              <span className={styles.wordMask}>
                <span
                  className={`${styles.word} ${styles.shimmerWord}`}
                  style={{ "--word-delay": `${2 * WORD_STAGGER_MS}ms` } as React.CSSProperties}
                >
                  Are
                </span>
              </span>
            </h2>

            {/* Gold Expanding Underline matching How It Works */}
            <motion.span
              aria-hidden="true"
              className="mt-4 block h-0.5 w-24 origin-left bg-gradient-to-r from-gold to-transparent"
              initial={{ scaleX: 0 }}
              whileInView={{ scaleX: 1 }}
              viewport={{ once: true, margin: "0px 0px -10% 0px" }}
              transition={{ duration: 0.9, ease: "easeOut", delay: reduce ? 0 : 0.25 }}
            />

            {/* Sub-tagline / Eyebrow */}
            <p aria-hidden="true" className={styles.eyebrow}>
              A SMARTER WAY TO FIND WHAT FITS
            </p>


            {/* Preserved Main Editorial Copy */}
            <div className={styles.prose}>
              <p className={styles.paragraph}>
                Tallee is an AI-powered recommendation app that helps you discover bars, restaurants, stores, and service providers suited to your needs. Tell Tallee what you’re looking for, share your preferences, and search by voice or refine your request as you go. It researches options and matches you with recommendations based on what matters to you.
              </p>
              <p className={styles.paragraph}>
                Whether you’re planning date night, meeting friends for brunch, shopping for something special, or looking for a service, Tallee helps you skip the endless scrolling. Explore curated recommendations with AI summaries that make it easier to compare and decide. Premium can also remember your preferences and suggest ideas for important dates. Always in the Know.
              </p>
            </div>
          </motion.div>
        </FadeUp>

        {/* =========================================================
              RIGHT COLUMN: ARCHITECTURAL PORTRAIT MEDIA FRAME (How It Works Flip Transition)
             ========================================================= */}
        {/* Left Column: Media Frame (How It Works Flip Transition) */}
        <FadeUp
          x={40}
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
                        src={imageSrc ?? images.ourApp}
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
                  1 / ABOUT TALLEE
                </p>
              </div>
            </DemoStage>
          </motion.div>
        </FadeUp>

      </div>
    </section>
  );
}

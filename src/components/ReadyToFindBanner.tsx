"use client";

import React, { useEffect, useRef } from "react";
import { motion, useAnimation, useInView, useReducedMotion } from "motion/react";
import { PatternBackground } from "@/components/PatternBackground";
import { StoreButtons } from "@/components/StoreButtons";
import { Reveal } from "@/components/Reveal";

interface ReadyToFindBannerProps {
  id?: string;
  className?: string;
}

export function ReadyToFindBanner({ id = "ready-download", className = "" }: ReadyToFindBannerProps) {
  const sectionRef = useRef<HTMLElement>(null);
  const controls = useAnimation();
  const prefersReduced = useReducedMotion();
  const reduce = !!prefersReduced;

  const isSectionInView = useInView(sectionRef, {
    once: false,
    margin: "0px 0px -12% 0px",
  });

  useEffect(() => {
    if (reduce) {
      controls.set({ opacity: 0.08, x: 0 });
      return;
    }

    if (isSectionInView) {
      // Smoothly glide in from left behind the section at pure watermark opacity,
      // glowing on entry and settling to original watermark opacity
      controls.start({
        x: ["-70vw", "0vw"],
        opacity: [0, 0.14, 0.08],
        transition: {
          duration: 1.15,
          ease: [0.16, 1, 0.3, 1],
        },
      });
    } else {
      // When scrolled out of view, reset offscreen so it glides in on next scroll
      controls.set({ x: "-70vw", opacity: 0 });
    }
  }, [isSectionInView, controls, reduce]);

  return (
    <section
      ref={sectionRef}
      aria-labelledby={id}
      className={`relative isolate overflow-clip ${className}`}
    >
      <PatternBackground />

      {/* Giant Luxury Watermark in Background - sweeps in from left, then dims to original watermark */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 z-0 flex items-center justify-center overflow-hidden select-none"
      >
        <motion.div
          animate={controls}
          initial={reduce ? { opacity: 0.08, x: 0 } : { opacity: 0, x: "-70vw" }}
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

      <div className="section-y relative z-10 mx-auto flex max-w-4xl flex-col items-center px-5 text-center sm:px-6">
        <Reveal variant="zoom" className="w-full flex flex-col items-center">
          <Reveal as="h2" variant="blur" delay={100} className="font-display text-4xl font-bold uppercase leading-tight text-gold sm:text-5xl">
            <span id={id}>Ready to find your next favorite spot?</span>
          </Reveal>
          <Reveal as="p" variant="up" delay={200} className="mt-6 text-lg text-cream/90">
            Download Tallee and search “Tallee Knows” in your app store.
          </Reveal>
          <Reveal variant="up" delay={320} className="mt-10">
            <StoreButtons />
          </Reveal>
        </Reveal>
      </div>
    </section>
  );
}


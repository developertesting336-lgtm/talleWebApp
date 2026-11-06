"use client";

import { useEffect, useRef, useState, type PointerEvent, type ReactNode } from "react";
import {
  motion,
  useMotionTemplate,
  useMotionValue,
  useReducedMotion,
  useScroll,
  useSpring,
  useTransform,
} from "motion/react";

// Fixed values (not random) so server and client render the same markup
const particles = [
  { left: 5, size: 3, dur: 10, delay: 0 },
  { left: 13, size: 4, dur: 13, delay: 3 },
  { left: 21, size: 3, dur: 11, delay: 6 },
  { left: 29, size: 5, dur: 14, delay: 1 },
  { left: 37, size: 3, dur: 10, delay: 4 },
  { left: 46, size: 4, dur: 12, delay: 7 },
  { left: 54, size: 3, dur: 11, delay: 2 },
  { left: 62, size: 5, dur: 15, delay: 5 },
  { left: 70, size: 3, dur: 10, delay: 0.5 },
  { left: 78, size: 4, dur: 13, delay: 8 },
  { left: 86, size: 3, dur: 12, delay: 3.5 },
  { left: 94, size: 4, dur: 11, delay: 6.5 },
];

export function ScrollZoomHero({
  children,
  background,
  emblem,
  contentClassName,
  compact = false,
}: {
  children: ReactNode;
  background?: ReactNode;
  emblem?: ReactNode;
  contentClassName?: string;
  /** Short hero: below lg it is only as tall as its content instead of the full screen height. */
  compact?: boolean;
}) {
  const ref = useRef<HTMLElement>(null);
  const prefersReduced = useReducedMotion();
  const reduce = !!prefersReduced;

  // Decorative, continuously animated layers only render after mount.
  // This avoids server/client markup mismatches from useReducedMotion.
  const [mounted, setMounted] = useState(false);
  useEffect(() => setMounted(true), []);
  const decor = mounted && !reduce;

  // 0 at the top of the page, 1 when the hero has scrolled fully out of view
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start start", "end start"] });
  const p = useSpring(scrollYProgress, { stiffness: 110, damping: 28, mass: 0.35 });

  // Content: tilts back, flies up, blurs, fades
  const contentY = useTransform(p, [0, 1], [0, reduce ? 0 : -180]);
  const contentScale = useTransform(p, [0, 1], [1, reduce ? 1 : 0.82]);
  const contentRotate = useTransform(p, [0, 1], [0, reduce ? 0 : 22]);
  const contentOpacity = useTransform(p, [0, 0.7], [1, reduce ? 1 : 0]);


  // Background: zooms and drifts for depth
  const bgY = useTransform(p, [0, 1], [0, reduce ? 0 : 160]);
  const bgScale = useTransform(p, [0, 1], [1, reduce ? 1 : 1.3]);

  // Emblem: drifts slower than the page, shrinks slightly, fades out
  const emblemY = useTransform(p, [0, 1], [0, reduce ? 0 : 120]);
  const emblemScale = useTransform(p, [0, 1], [1, reduce ? 1 : 0.9]);
  const emblemOpacity = useTransform(p, [0, 0.8], [1, reduce ? 1 : 0]);

  // Rings: turn with scroll, grow, and fade
  const ringScroll = useTransform(p, [0, 1], [0, reduce ? 0 : 140]);
  const ringScale = useTransform(p, [0, 1], [1, reduce ? 1 : 1.4]);
  const ringOpacity = useTransform(p, [0, 0.8], [1, reduce ? 1 : 0]);

  // Scroll cue fades as you scroll
  const cueOpacity = useTransform(p, [0, 0.15], [1, 0]);

  // Mouse: spotlight + ring parallax (desktop only)
  const mx = useMotionValue(50);
  const my = useMotionValue(40);
  const spotlight = useMotionTemplate`radial-gradient(420px circle at ${mx}% ${my}%, rgba(255,255,255,0.10), transparent 70%)`;
  const px = useSpring(useTransform(mx, [0, 100], [-24, 24]), { stiffness: 60, damping: 20 });
  const py = useSpring(useTransform(my, [0, 100], [-16, 16]), { stiffness: 60, damping: 20 });

  const onMove = (e: PointerEvent<HTMLElement>) => {
    if (reduce || e.pointerType !== "mouse") return;
    const r = e.currentTarget.getBoundingClientRect();
    mx.set(((e.clientX - r.left) / r.width) * 100);
    my.set(((e.clientY - r.top) / r.height) * 100);
  };

  return (
    <section
      ref={ref}
      onPointerMove={onMove}
      className={`relative isolate overflow-clip ${compact ? "lg:min-h-[100svh]" : "min-h-[100svh]"}`}
    >
      {/* pattern background */}
      {background && (
        <motion.div className="absolute inset-0 -z-10" style={{ y: bgY, scale: bgScale }}>
          {background}
        </motion.div>
      )}

      {/* 3D emblem layer */}
      {emblem && (
        <motion.div
          aria-hidden="true"
          className="absolute inset-0 -z-10"
          style={{ y: emblemY, scale: emblemScale, opacity: emblemOpacity }}
        >
          {emblem}
        </motion.div>
      )}

      {/* drifting glows */}
      {decor && (
        <>
          <motion.div
            aria-hidden="true"
            className="pointer-events-none absolute -left-24 top-10 -z-10 h-80 w-80 rounded-full bg-gold/20 blur-3xl"
            animate={{ x: [0, 90, 0], y: [0, 50, 0], scale: [1, 1.2, 1] }}
            transition={{ duration: 12, ease: "easeInOut", repeat: Infinity }}
          />
          <motion.div
            aria-hidden="true"
            className="pointer-events-none absolute -right-24 bottom-0 -z-10 h-96 w-96 rounded-full bg-gold/15 blur-3xl"
            animate={{ x: [0, -100, 0], y: [0, -60, 0], scale: [1.1, 0.9, 1.1] }}
            transition={{ duration: 16, ease: "easeInOut", repeat: Infinity }}
          />
        </>
      )}

      {/* rotating rings (hidden when the emblem is used).
          A plain grid wrapper does the centering so motion's inline
          transform never fights Tailwind's translate classes. */}
      {!emblem && (
        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-0 -z-10 grid place-items-center"
        >
          <motion.div
            className="aspect-square w-[min(46rem,140%)]"
            style={{ x: px, y: py, scale: ringScale, opacity: ringOpacity }}
          >
            <motion.div className="relative h-full w-full" style={{ rotate: ringScroll }}>
              <motion.div
                className="absolute inset-0 rounded-full border border-dashed border-gold/30"
                animate={decor ? { rotate: 360 } : undefined}
                transition={{ duration: 60, ease: "linear", repeat: Infinity }}
              />
              <motion.div
                className="absolute inset-[12%] rounded-full border border-gold/20"
                animate={decor ? { rotate: -360 } : undefined}
                transition={{ duration: 40, ease: "linear", repeat: Infinity }}
              >
                <span className="absolute -top-1 left-1/2 h-2 w-2 -translate-x-1/2 rounded-full bg-gold shadow-[0_0_12px_3px] shadow-gold/70" />
                <span className="absolute -bottom-1 left-1/2 h-1.5 w-1.5 -translate-x-1/2 rounded-full bg-gold/70" />
              </motion.div>
              <motion.div
                className="absolute inset-[28%] rounded-full border border-gold/15"
                animate={decor ? { rotate: 360 } : undefined}
                transition={{ duration: 28, ease: "linear", repeat: Infinity }}
              >
                <span className="absolute left-0 top-1/2 h-1.5 w-1.5 -translate-x-1/2 -translate-y-1/2 rounded-full bg-gold/80" />
              </motion.div>
            </motion.div>
          </motion.div>
        </div>
      )}

      {/* rising particles */}
      {decor && (
        <div aria-hidden="true" className="pointer-events-none absolute inset-0 -z-10">
          {particles.map((d, i) => (
            <motion.span
              key={i}
              className="absolute bottom-0 rounded-full bg-gold shadow-[0_0_10px_2px] shadow-gold/60"
              style={{ left: `${d.left}%`, width: d.size, height: d.size }}
              initial={{ y: 0, opacity: 0 }}
              animate={{ y: [0, -520], opacity: [0, 0.9, 0] }}
              transition={{ duration: d.dur, ease: "easeOut", repeat: Infinity, delay: d.delay }}
            />
          ))}
        </div>
      )}

      {/* scan line sweeping down */}
      {/* {decor && (
        <motion.div
          aria-hidden="true"
          className="pointer-events-none absolute inset-x-0 -z-10 h-px bg-gradient-to-r from-transparent via-gold to-transparent shadow-[0_0_16px_2px] shadow-gold/50"
          initial={{ top: "0%", opacity: 0 }}
          animate={{ top: ["0%", "100%"], opacity: [0, 1, 1, 0] }}
          transition={{ duration: 6, ease: "linear", repeat: Infinity, repeatDelay: 2 }}
        />
      )} */}

      {/* mouse spotlight */}
      <motion.div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 -z-10"
        style={{ background: spotlight }}
      />

      {/* content, vertically centered in the taller hero */}
      <div className={`relative flex items-center justify-center ${compact ? "lg:min-h-[100svh]" : "min-h-[100svh]"}`}>
        <motion.div
          className={`relative mx-auto flex ${contentClassName || "max-w-4xl"} flex-col items-center px-5 text-center sm:px-6 ${compact ? "pb-16 pt-10 sm:pb-24 sm:pt-12 lg:pb-32 lg:pt-14" : "pb-24 pt-10 sm:pb-32 sm:pt-14"}`}
          style={{
            y: contentY,
            scale: contentScale,
            rotateX: contentRotate,
            transformPerspective: 1000, // perspective applied directly to this element
            opacity: contentOpacity,
            transformOrigin: "50% 100%",
          }}
        >
          {children}

          {/* light sweep gliding across the content */}


        </motion.div>
      </div>
      {/* full-hero light sweep */}
      {decor && (
        <motion.div
          aria-hidden="true"
          className="pointer-events-none absolute inset-0 z-10 overflow-clip"
          style={{ opacity: contentOpacity }}
        >
          <motion.div
            className="absolute inset-y-0 w-1/3"
            initial={{ x: "-150%" }}
            animate={{ x: ["-150%", "450%"] }}
            transition={{ duration: 2.4, ease: "easeInOut", repeat: Infinity, repeatDelay: 5 }}
          >
            {/* skew on a plain inner div so motion's transform doesn't override it */}
            <div className="h-full w-full -skew-x-12 bg-gradient-to-r from-transparent via-white/[0.07] to-transparent" />
          </motion.div>
        </motion.div>
      )}
      {/* scroll cue */}
      {/* {decor && (
        <motion.div
          aria-hidden="true"
          style={{ opacity: cueOpacity }}
          className="pointer-events-none absolute bottom-6 left-1/2 flex -translate-x-1/2 flex-col items-center gap-2 text-xs uppercase tracking-[0.3em] text-gold/80"
        >
          Scroll
          <span className="relative block h-10 w-px overflow-clip bg-gold/20">
            <motion.span
              className="absolute inset-x-0 h-4 bg-gold"
              animate={{ y: ["-100%", "250%"] }}
              transition={{ duration: 1.6, ease: "easeInOut", repeat: Infinity }}
            />
          </span>
        </motion.div>
      )} */}
    </section>
  );
}
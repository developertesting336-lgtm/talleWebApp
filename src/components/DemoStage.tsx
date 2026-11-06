"use client";

import { useEffect, useRef, useState, type PointerEvent, type ReactNode } from "react";
import { motion, useMotionValue, useReducedMotion, useScroll, useSpring, useTransform } from "motion/react";

export function DemoStage({
  children,
  className = "",
  reverse = false,
  showScanLine = true,
  circleClassName = "w-[min(38rem,130%)]",
}: {
  children: ReactNode;
  className?: string;
  reverse?: boolean;
  showScanLine?: boolean;
  circleClassName?: string;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const prefersReduced = useReducedMotion();

  // While a video inside the stage is playing, everything holds still: the floating,
  // the tilt and the background rings. A moving video looks unstable, and the
  // animated blur competes with video decoding, which makes playback stutter.
  const [playing, setPlaying] = useState(false);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const on = () => setPlaying(true);
    const off = () => setPlaying(false);
    // media events do not bubble, so listen in the capture phase
    const events: [string, () => void][] = [["play", on], ["playing", on], ["pause", off], ["ended", off], ["emptied", off]];
    events.forEach(([name, fn]) => el.addEventListener(name, fn, true));
    return () => events.forEach(([name, fn]) => el.removeEventListener(name, fn, true));
  }, []);
  const reduce = !!prefersReduced;
  const still = reduce || playing; // continuous motion stops while playing; the scroll entrance is left alone

  const [isMobile, setIsMobile] = useState(false);
  useEffect(() => {
    const check = () => setIsMobile(window.innerWidth < 1024);
    check();
    window.addEventListener("resize", check);
    return () => window.removeEventListener("resize", check);
  }, []);

  // Scroll: on desktop, the phone swings in from a turned angle and settles.
  // On mobile, 3D rotation/flipping is disabled so images stay flat and never flip on backward scroll.
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start 95%", "center 60%"] });
  const p = useSpring(scrollYProgress, { stiffness: 110, damping: 26, mass: 0.3 });
  const startY = reverse ? 40 : -40;
  const enterY = useTransform(p, [0, 1], [reduce ? 0 : startY, 0]);
  const enterX = useTransform(p, [0, 1], [reduce ? 0 : 18, 0]);
  const scale = useTransform(p, [0, 1], [reduce ? 1 : 0.88, 1]);
  const opacity = useTransform(p, [0, 0.4], [reduce ? 1 : 0, 1]);
  const ringScale = useTransform(p, [0, 1], [reduce ? 1 : 0.6, 1]);

  // Mouse: gentle tilt (desktop fine pointer only)
  const mx = useMotionValue(0);
  const my = useMotionValue(0);
  const tiltY = useSpring(useTransform(mx, [-0.5, 0.5], [-10, 10]), { stiffness: 140, damping: 18 });
  const tiltX = useSpring(useTransform(my, [-0.5, 0.5], [8, -8]), { stiffness: 140, damping: 18 });

  const onMove = (e: PointerEvent<HTMLDivElement>) => {
    if (still || isMobile || e.pointerType !== "mouse") return;

    // Don't tilt while the mouse is over the video, so the controls stay still
    if ((e.target as HTMLElement).closest("video")) {
      mx.set(0);
      my.set(0);
      return;
    }

    const r = e.currentTarget.getBoundingClientRect();
    mx.set((e.clientX - r.left) / r.width - 0.5);
    my.set((e.clientY - r.top) / r.height - 0.5);
  };
  const onLeave = () => {
    mx.set(0);
    my.set(0);
  };
  // settle flat when playback starts
  useEffect(() => {
    if (playing) {
      mx.set(0);
      my.set(0);
    }
  }, [playing, mx, my]);

  return (
    <div
      ref={ref}
      onPointerMove={onMove}
      onPointerLeave={onLeave}
      className={`relative flex items-center justify-center py-6 ${className}`}
      style={{ perspective: isMobile || reduce ? undefined : 1200 }}
    >
      {/* BACKGROUND EFFECTS (behind the phone) */}
      <motion.div
        aria-hidden="true"
        style={{ scale: isMobile ? 1 : ringScale, opacity: isMobile ? 1 : opacity }}
        className={`pointer-events-none absolute left-1/2 top-1/2 aspect-square -translate-x-1/2 -translate-y-1/2 ${circleClassName}`}
      >
        {/* pulsing glow */}
        <motion.div
          className="absolute inset-[10%] rounded-full bg-gold/25 blur-3xl"
          animate={still ? undefined : { opacity: [0.5, 1, 0.5], scale: [0.9, 1.1, 0.9] }}
          transition={{ duration: 4, ease: "easeInOut", repeat: Infinity }}
        />
        {/* outer dashed ring */}
        <motion.div
          className="absolute inset-0 rounded-full border border-dashed border-gold/40"
          animate={still ? undefined : { rotate: 360 }}
          transition={{ duration: 40, ease: "linear", repeat: Infinity }}
        />
        {/* inner ring, opposite direction, with an orbiting dot */}
        <motion.div
          className="absolute inset-[12%] rounded-full border border-gold/25"
          animate={still ? undefined : { rotate: -360 }}
          transition={{ duration: 26, ease: "linear", repeat: Infinity }}
        >
          <span className="absolute -top-1 left-1/2 h-2 w-2 -translate-x-1/2 rounded-full bg-gold shadow-[0_0_12px_3px] shadow-gold/70" />
          <span className="absolute -bottom-1 left-1/2 h-1.5 w-1.5 -translate-x-1/2 rounded-full bg-gold/70" />
        </motion.div>
        {/* innermost ring */}
        <motion.div
          className="absolute inset-[26%] rounded-full border border-gold/20"
          animate={still ? undefined : { rotate: 360 }}
          transition={{ duration: 18, ease: "linear", repeat: Infinity }}
        >
          <span className="absolute left-0 top-1/2 h-1.5 w-1.5 -translate-x-1/2 -translate-y-1/2 rounded-full bg-gold/80" />
        </motion.div>
        {/* scan line sweeping top to bottom */}
        {!still && showScanLine && (
          <motion.div
            className="absolute inset-x-0 h-px bg-gradient-to-r from-transparent via-gold to-transparent shadow-[0_0_14px_2px] shadow-gold/50"
            initial={{ top: "0%" }}
            animate={{ top: ["0%", "100%"], opacity: [0, 1, 1, 0] }}
            transition={{ duration: 4.5, ease: "linear", repeat: Infinity }}
          />
        )}
      </motion.div>

      {/* THE PHONE */}
      {/* THE PHONE */}
      <motion.div
        style={{
          rotateY: isMobile || reduce ? 0 : enterY,
          rotateX: isMobile || reduce ? 0 : enterX,
          scale: isMobile || reduce ? 1 : scale,
          opacity: isMobile || reduce ? 1 : opacity,
          // transformStyle line deleted
        }}
        className="relative z-10 w-full flex justify-center"
      >
        <motion.div
          style={{
            rotateX: isMobile || reduce ? 0 : tiltX,
            rotateY: isMobile || reduce ? 0 : tiltY,
            // transformStyle line deleted
          }}
          className="w-full flex justify-center"
        >
          <motion.div
            animate={still ? { y: 0 } : { y: [0, -10, 0] }}
            transition={still ? { duration: 0.3, ease: "easeOut" } : { duration: 5, ease: "easeInOut", repeat: Infinity }}
            className="w-full flex justify-center"
          >
            {children}
          </motion.div>
        </motion.div>
      </motion.div>
    </div>
  );
}
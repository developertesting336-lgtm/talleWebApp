"use client";

import { useRef, type PointerEvent, type ReactNode } from "react";
import { motion, useMotionTemplate, useMotionValue, useReducedMotion } from "motion/react";

// Fixed values (not random) so server and client render the same markup
const particles = [
  { left: 6, size: 4, dur: 9, delay: 0 },
  { left: 14, size: 3, dur: 12, delay: 2 },
  { left: 22, size: 5, dur: 10, delay: 5 },
  { left: 31, size: 3, dur: 13, delay: 1 },
  { left: 40, size: 4, dur: 9, delay: 6 },
  { left: 48, size: 3, dur: 11, delay: 3 },
  { left: 57, size: 5, dur: 14, delay: 0.5 },
  { left: 65, size: 3, dur: 10, delay: 4 },
  { left: 73, size: 4, dur: 12, delay: 7 },
  { left: 81, size: 3, dur: 9, delay: 2.5 },
  { left: 88, size: 5, dur: 13, delay: 5.5 },
  { left: 95, size: 3, dur: 11, delay: 1.5 },
];

export function DownloadStage({
  id,
  title,
  text,
  background,
  children,
}: {
  id: string;
  title: string;
  text: string;
  background?: ReactNode;
  children: ReactNode; // the store buttons
}) {
  const ref = useRef<HTMLElement>(null);
  const reduce = useReducedMotion();

  // Mouse spotlight (desktop only)
  const mx = useMotionValue(50);
  const my = useMotionValue(50);
  const spotlight = useMotionTemplate`radial-gradient(420px circle at ${mx}% ${my}%, rgba(255,255,255,0.10), transparent 70%)`;
  const onMove = (e: PointerEvent<HTMLElement>) => {
    if (reduce || e.pointerType !== "mouse") return;
    const r = e.currentTarget.getBoundingClientRect();
    mx.set(((e.clientX - r.left) / r.width) * 100);
    my.set(((e.clientY - r.top) / r.height) * 100);
  };

  const words = title.split(" ");

  return (
    <section
      ref={ref}
      onPointerMove={onMove}
      className="relative isolate overflow-clip"
      aria-labelledby={id}
    >
      {background}

      {/* spotlight */}
      <motion.div aria-hidden="true" className="pointer-events-none absolute inset-0 -z-10" style={{ background: spotlight }} />

      {/* sonar ripples */}
      {!reduce && (
        <div
          aria-hidden="true"
          className="pointer-events-none absolute left-1/2 top-1/2 -z-10 aspect-square w-[min(48rem,150%)] -translate-x-1/2 -translate-y-1/2"
        >
          {[0, 1, 2].map((i) => (
            <motion.span
              key={i}
              className="absolute inset-0 rounded-full border border-gold/50"
              initial={{ scale: 0.15, opacity: 0 }}
              animate={{ scale: [0.15, 1], opacity: [0.55, 0] }}
              transition={{ duration: 6, ease: "easeOut", repeat: Infinity, delay: i * 2 }}
            />
          ))}
        </div>
      )}

      {/* rising particles */}
      {!reduce && (
        <div aria-hidden="true" className="pointer-events-none absolute inset-0 -z-10">
          {particles.map((d, i) => (
            <motion.span
              key={i}
              className="absolute bottom-0 rounded-full bg-gold shadow-[0_0_10px_2px] shadow-gold/60"
              style={{ left: `${d.left}%`, width: d.size, height: d.size }}
              initial={{ y: 0, opacity: 0 }}
              animate={{ y: [0, -420], opacity: [0, 0.9, 0] }}
              transition={{ duration: d.dur, ease: "easeOut", repeat: Infinity, delay: d.delay }}
            />
          ))}
        </div>
      )}

      {/* content */}
      <motion.div
        initial={reduce ? false : { opacity: 0, y: 60, scale: 0.95 }}
        whileInView={{ opacity: 1, y: 0, scale: 1 }}
        viewport={{ once: true, amount: 0.2 }}
        transition={{ duration: 0.8, ease: "easeOut" }}
        className="section-y mx-auto flex max-w-4xl flex-col items-center px-5 text-center sm:px-6"
      >
        {/* heading: the trigger is on the h2, the words follow it */}
        <motion.h2
          id={id}
          aria-label={title}
          initial={reduce ? false : "hidden"}
          whileInView="show"
          viewport={{ once: true, amount: 0.3 }}
          variants={{ hidden: {}, show: { transition: { staggerChildren: 0.08 } } }}
          className="font-display text-4xl font-bold uppercase leading-tight text-gold sm:text-5xl"
        >
          {words.map((w, i) => (
            <span key={i} aria-hidden="true" className="inline-block overflow-clip pb-1 align-bottom">
              <motion.span
                className="inline-block"
                variants={{
                  hidden: { y: "110%" },
                  show: { y: 0, transition: { duration: 0.7, ease: [0.22, 1, 0.36, 1] } },
                }}
              >
                {w}
                {i < words.length - 1 ? "\u00A0" : ""}
              </motion.span>
            </span>
          ))}
        </motion.h2>

        <p className="mt-6 text-lg">{text}</p>

        {/* glow behind the buttons */}
        <div className="relative mt-10">
          {!reduce && (
            <motion.div
              aria-hidden="true"
              className="pointer-events-none absolute inset-x-[-10%] inset-y-[-30%] -z-10 rounded-full bg-gold/25 blur-3xl"
              animate={{ opacity: [0.4, 1, 0.4], scale: [0.9, 1.1, 0.9] }}
              transition={{ duration: 3.5, ease: "easeInOut", repeat: Infinity }}
            />
          )}
          {children}
        </div>
      </motion.div>
    </section>
  );
}
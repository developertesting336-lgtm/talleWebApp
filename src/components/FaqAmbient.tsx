"use client";

import { motion, useReducedMotion } from "motion/react";

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

export function FaqAmbient() {
  const reduce = useReducedMotion();

  return (
    <>
      {/* RINGS (same system as DemoStage, without the glow orb) */}
      <motion.div
        aria-hidden="true"
        initial={reduce ? false : { scale: 0.6, opacity: 0 }}
        whileInView={{ scale: 1, opacity: 1 }}
        viewport={{ once: true, amount: 0.1 }}
        transition={{ duration: 1.2, ease: [0.22, 1, 0.36, 1] }}
        className="pointer-events-none absolute left-1/2 top-1/2 -z-10 aspect-square w-[min(44rem,140%)] -translate-x-1/2 -translate-y-1/2"
      >
        {/* outer dashed ring */}
        <motion.div
          className="absolute inset-0 rounded-full border border-dashed border-gold/40"
          animate={reduce ? undefined : { rotate: 360 }}
          transition={{ duration: 40, ease: "linear", repeat: Infinity }}
        />

        {/* inner ring, opposite direction, with orbiting dots */}
        <motion.div
          className="absolute inset-[12%] rounded-full border border-gold/25"
          animate={reduce ? undefined : { rotate: -360 }}
          transition={{ duration: 26, ease: "linear", repeat: Infinity }}
        >
          <span className="absolute -top-1 left-1/2 h-2 w-2 -translate-x-1/2 rounded-full bg-gold shadow-[0_0_12px_3px] shadow-gold/70" />
          <span className="absolute -bottom-1 left-1/2 h-1.5 w-1.5 -translate-x-1/2 rounded-full bg-gold/70" />
        </motion.div>

        {/* innermost ring */}
        <motion.div
          className="absolute inset-[26%] rounded-full border border-gold/20"
          animate={reduce ? undefined : { rotate: 360 }}
          transition={{ duration: 18, ease: "linear", repeat: Infinity }}
        >
          <span className="absolute left-0 top-1/2 h-1.5 w-1.5 -translate-x-1/2 -translate-y-1/2 rounded-full bg-gold/80" />
        </motion.div>

      
      </motion.div>

      {/* PARTICLES rising from bottom to top */}
      {!reduce && (
        <div aria-hidden="true" className="pointer-events-none absolute inset-0 -z-10">
          {particles.map((d, i) => (
            <motion.span
              key={i}
              className="absolute bottom-0 rounded-full bg-gold shadow-[0_0_10px_2px] shadow-gold/60"
              style={{ left: `${d.left}%`, width: d.size, height: d.size }}
              initial={{ y: "0vh", opacity: 0 }}
              animate={{ y: ["0vh", "-85vh"], opacity: [0, 0.9, 0] }}
              transition={{ duration: d.dur, ease: "easeOut", repeat: Infinity, delay: d.delay }}
            />
          ))}
        </div>
      )}
    </>
  );
}
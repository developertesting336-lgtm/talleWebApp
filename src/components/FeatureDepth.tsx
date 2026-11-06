"use client";

import { useRef, type PointerEvent, type ReactNode } from "react";
import { motion, useReducedMotion, useScroll, useSpring, useTransform, useMotionValue } from "motion/react";

export function FeatureDepth({ children, delay = 0 }: { children: ReactNode; delay?: number }) {
  const ref = useRef<HTMLDivElement>(null);
  const reduce = useReducedMotion();

  // Scroll: the item tips up from a tilted position into place
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start 95%", "center 60%"] });
  const p = useSpring(scrollYProgress, { stiffness: 110, damping: 26, mass: 0.3 });
  const rotateX = useTransform(p, [0, 1], [reduce ? 0 : 50, 0]);
  const y = useTransform(p, [0, 1], [reduce ? 0 : 90 + delay * 60, 0]);
  const scale = useTransform(p, [0, 1], [reduce ? 1 : 0.88, 1]);
  const opacity = useTransform(p, [0, 0.4], [reduce ? 1 : 0, 1]);
  const glow = useTransform(p, [0.3, 1], [0, 1]);

  // Mouse: gentle 3D tilt
  const mx = useMotionValue(0);
  const my = useMotionValue(0);
  const tiltY = useSpring(useTransform(mx, [-0.5, 0.5], [-10, 10]), { stiffness: 140, damping: 18 });
  const tiltX = useSpring(useTransform(my, [-0.5, 0.5], [8, -8]), { stiffness: 140, damping: 18 });

  const onMove = (e: PointerEvent<HTMLDivElement>) => {
    if (reduce || e.pointerType !== "mouse") return;
    const r = e.currentTarget.getBoundingClientRect();
    mx.set((e.clientX - r.left) / r.width - 0.5);
    my.set((e.clientY - r.top) / r.height - 0.5);
  };
  const onLeave = () => {
    mx.set(0);
    my.set(0);
  };

  return (
    <div ref={ref} style={{ perspective: 1200 }}>
      <motion.div style={{ rotateX, y, scale, opacity, transformOrigin: "50% 100%", transformStyle: "preserve-3d" }}>
        <motion.div
          onPointerMove={onMove}
          onPointerLeave={onLeave}
          style={{ rotateX: tiltX, rotateY: tiltY, transformStyle: "preserve-3d" }}
          className="relative"
        >
          {/* soft gold glow behind the phone, same gold as your theme */}
          <motion.div
            aria-hidden="true"
            style={{ opacity: glow }}
            className="pointer-events-none absolute left-1/2 top-1/3 -z-10 h-72 w-72 -translate-x-1/2 -translate-y-1/2 rounded-full bg-gold/20 blur-3xl"
          />
          {children}
        </motion.div>
      </motion.div>
    </div>
  );
}
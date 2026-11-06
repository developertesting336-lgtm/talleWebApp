"use client";

import { useRef } from "react";
import {
  motion,
  useReducedMotion,
  useScroll,
  useSpring,
  useTransform,
} from "motion/react";

/* The big card: rises, scales up and tilts into place while scrolling */
export function FaqCard({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: string;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const reduce = useReducedMotion();

  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "center center"], // starts entering -> centered
  });
  const progress = useSpring(scrollYProgress, {
    stiffness: 90,
    damping: 25,
    mass: 0.2,
  });

  const scale = useTransform(progress, [0, 1], [0.88, 1]);
  const y = useTransform(progress, [0, 1], [80, 0]);
  const rotateX = useTransform(progress, [0, 1], [12, 0]);
  const opacity = useTransform(progress, [0, 0.6], [0, 1]);

  // Respect users who turned off animations
  if (reduce) {
    return <div className={className}>{children}</div>;
  }

  return (
    <motion.div
      ref={ref}
      className={className}
      style={{ scale, y, rotateX, opacity, transformPerspective: 1000 }}
    >
      {children}
    </motion.div>
  );
}

/* Each FAQ item: slides in from left or right alternately */
export function FaqItem({
  children,
  index,
}: {
  children: React.ReactNode;
  index: number;
}) {
  const reduce = useReducedMotion();
  const fromX = index % 2 === 0 ? -60 : 60; // even = left, odd = right

  if (reduce) return <div>{children}</div>;

  return (
    <motion.div
      initial={{ opacity: 0, x: fromX }}
      whileInView={{ opacity: 1, x: 0 }}
      viewport={{ once: true, amount: 0.3 }}
      transition={{ duration: 0.7, delay: index * 0.15, ease: [0.16, 1, 0.3, 1] }}
      whileHover={{ y: -4 }}
    >
      {children}
    </motion.div>
  );
}
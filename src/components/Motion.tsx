"use client";

import { motion, MotionConfig, type HTMLMotionProps } from "motion/react";
import type { ReactNode } from "react";

// Respects the visitor's "reduce motion" OS setting for every animation below
export function MotionProvider({ children }: { children: ReactNode }) {
  return <MotionConfig reducedMotion="user">{children}</MotionConfig>;
}

// Fade + slide in when scrolled into view (once)
export function FadeUp({
  delay = 0,
  x = 0,
  y = 32,
  ...props
}: HTMLMotionProps<"div"> & { delay?: number; x?: number; y?: number }) {
  return (
    <motion.div
      initial={{ opacity: 0, x, y }}
      whileInView={{ opacity: 1, x: 0, y: 0 }}
      viewport={{ once: false, margin: "-80px" }}
      transition={{ duration: 0.7, ease: "easeOut", delay }}
      {...props}
    />
  );
}

// Parent that staggers its <StaggerItem> children
export function Stagger({ gap = 0.15, ...props }: HTMLMotionProps<"div"> & { gap?: number }) {
  return (
    <motion.div
      initial="hidden"
      whileInView="show"
      viewport={{ once: false, margin: "-80px" }}
      variants={{ hidden: {}, show: { transition: { staggerChildren: gap } } }}
      {...props}
    />
  );
}

export function StaggerItem(props: HTMLMotionProps<"div">) {
  return (
    <motion.div
      variants={{
        hidden: { opacity: 0, y: 32 },
        show: { opacity: 1, y: 0, transition: { duration: 0.6, ease: "easeOut" } },
      }}
      {...props}
    />
  );
}

// Gentle idle bobbing
export function Float({ delay = 0, ...props }: HTMLMotionProps<"div"> & { delay?: number }) {
  return (
    <motion.div
      animate={{ y: [0, -10, 0] }}
      transition={{ duration: 6, ease: "easeInOut", repeat: Infinity, delay }}
      {...props}
    />
  );
}

// Link row that nudges right on hover
export function HoverNudge(props: HTMLMotionProps<"li">) {
  return <motion.li whileHover={{ x: 6 }} transition={{ type: "spring", stiffness: 300, damping: 20 }} {...props} />;
}
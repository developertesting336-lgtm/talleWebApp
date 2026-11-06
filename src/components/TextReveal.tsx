"use client";

import { useEffect, useRef, useState } from "react";

type TextRevealProps = {
  text: string;
  /** Delay before the first word appears (ms) */
  delay?: number;
  /** Extra delay between each word (ms) */
  stagger?: number;
  className?: string;
};

/**
 * Text that fades + slides in word by word when it scrolls into view.
 * Plays once. Shows instantly if the user prefers reduced motion.
 */
export function TextReveal({ text, delay = 0, stagger = 40, className }: TextRevealProps) {
  const ref = useRef<HTMLSpanElement>(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      setVisible(true);
      return;
    }

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setVisible(true);
          observer.disconnect(); // play only once
        }
      },
      { threshold: 0.2 }
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  const words = text.split(" ");

  return (
    <span ref={ref} className={className} aria-label={text}>
      {words.map((word, i) => (
        <span
          key={i}
          aria-hidden="true"
          style={{
            display: "inline-block",
            opacity: visible ? 1 : 0,
            transform: visible ? "translateY(0)" : "translateY(0.6em)",
            filter: visible ? "blur(0)" : "blur(4px)",
            transition: "opacity 600ms ease, transform 600ms ease, filter 600ms ease",
            transitionDelay: `${delay + i * stagger}ms`,
            willChange: "opacity, transform",
          }}
        >
          {word}
          {i < words.length - 1 ? "\u00A0" : ""}
        </span>
      ))}
    </span>
  );
}

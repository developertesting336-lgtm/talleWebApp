"use client";

import { useEffect, useRef, useState, type CSSProperties, type ReactNode } from "react";
import { motion, useMotionTemplate, useScroll, useSpring, useTransform } from "motion/react";

// Keep in sync with --header-h in globals.css (the sticky header is 120px tall)
const HEADER_H = 120;

// mobileShots (optional): a smaller set of phones used below 1024px, so each one can be bigger
export type BoxStep = { n: number; title: string; body: ReactNode; shots: ReactNode; mobileShots?: ReactNode };

function useMedia(query: string) {
  const [match, setMatch] = useState(false);
  useEffect(() => {
    const mq = window.matchMedia(query);
    const update = () => setMatch(mq.matches);
    update();
    mq.addEventListener("change", update);
    return () => mq.removeEventListener("change", update);
  }, [query]);
  return match;
}

export function StepsBox({ steps, fallback }: { steps: BoxStep[]; fallback: ReactNode }) {
  // Works on every screen size; only turned off for reduced-motion users
  const enabled = useMedia("(prefers-reduced-motion: no-preference)");
  if (!enabled) return <>{fallback}</>;
  return <Box steps={steps} />;
}

/** Scales content to fit the space it is given (down always, up to maxScale). */
function FitBox({ children, maxScale = 1, className = "" }: { children: ReactNode; maxScale?: number; className?: string }) {
  const outer = useRef<HTMLDivElement>(null);
  const inner = useRef<HTMLDivElement>(null);
  const [scale, setScale] = useState(1);

  useEffect(() => {
    const o = outer.current;
    const i = inner.current;
    if (!o || !i) return;

    const fit = () => {
      // offsetWidth/offsetHeight ignore transforms, so this can't feed back on itself
      const ch = o.clientHeight;
      const cw = o.clientWidth;
      const ih = i.offsetHeight;
      const iw = i.offsetWidth;
      if (!ch || !cw || !ih || !iw) return;
      const s = Math.min(maxScale, ch / ih, cw / iw);
      // Ensure scale is finite and never collapses below a readable minimum (0.45)
      setScale(Number.isFinite(s) && s > 0 ? Math.max(0.45, s) : 1);
    };

    const ro = new ResizeObserver(fit);
    ro.observe(o);
    ro.observe(i);
    fit();
    return () => ro.disconnect();
  }, [maxScale]);

  return (
    <div ref={outer} className={`flex min-h-0 min-w-0 items-center justify-center ${className}`}>
      <div ref={inner} className="w-max shrink-0" style={{ transform: `scale(${scale})`, transformOrigin: "center" }}>
        {children}
      </div>
    </div>
  );
}

function Box({ steps }: { steps: BoxStep[] }) {
  const isSmall = useMedia("(max-width: 1023px)");
  const N = steps.length;
  const angle = 360 / N;
  const apothem = 1 / (2 * Math.tan(Math.PI / N));
  const ref = useRef<HTMLDivElement>(null);

  // The box is pinned just under the sticky header (--header-h in globals.css), so the
  // scroll range starts when the section reaches that line, not the top of the screen.
  const { scrollYProgress } = useScroll({ target: ref, offset: [`start ${HEADER_H}px`, "end end"] });

  const input: number[] = [];
  const output: number[] = [];
  steps.forEach((_, i) => {
    const start = i / N;
    input.push(start);
    output.push(i * angle);
    if (i < N - 1) {
      input.push(start + (1 / N) * 0.7);
      output.push(i * angle);
    }
  });
  input.push(1);
  output.push((N - 1) * angle);

  const rot = useSpring(useTransform(scrollYProgress, input, output), { stiffness: 120, damping: 24, mass: 0.4 });
  // --steps-h = the visible screen height below the header (svh ignores the collapsing mobile address bar)
  const transform = useMotionTemplate`translateZ(calc(var(--steps-h) * ${-apothem})) rotateX(${rot}deg)`;

  return (
    <section
      ref={ref}
      aria-label="How it works, step by step"
      className="relative"
      style={{ "--steps-h": "calc(100svh - var(--header-h))", height: `calc(${N} * var(--steps-h))` } as CSSProperties}
    >
      <div className="sticky w-full overflow-clip" style={{ top: "var(--header-h)", height: "var(--steps-h)", perspective: "2400px", WebkitPerspective: "2400px" } as CSSProperties}>
        <motion.div
          className="relative w-full"
          style={{ height: "var(--steps-h)", transformStyle: "preserve-3d", WebkitTransformStyle: "preserve-3d", transform }}
        >
          {steps.map((s, i) => (
            <div
              key={s.n}
              className="absolute inset-0"
              style={{
                transform: `rotateX(${-i * angle}deg) translateZ(calc(var(--steps-h) * ${apothem}))`,
                backfaceVisibility: "hidden",
                WebkitBackfaceVisibility: "hidden",
              } as CSSProperties}
            >
              <div className="mx-auto grid h-full w-full max-w-6xl grid-rows-[auto_minmax(0,1fr)] gap-3 px-5 py-4 sm:px-6 lg:grid-cols-2 lg:grid-rows-1 lg:items-center lg:gap-16 lg:py-0">
                <div className={`self-center ${i % 2 ? "lg:order-2" : ""}`}>
                  <p className="font-display text-sm font-bold uppercase tracking-widest text-gold sm:text-xl">Step {s.n}</p>
                  <h2 className="mt-1 font-display text-2xl font-bold leading-tight text-cream sm:text-4xl lg:mt-2 lg:text-5xl">{s.title}</h2>
                  {/* small screens: only the first paragraph, max 3 lines, so the phones get the space */}
                  <div className="mt-2 space-y-2 text-sm leading-relaxed sm:text-base lg:mt-6 lg:space-y-4">                    {s.body}
                  </div>
                </div>
                <FitBox maxScale={isSmall ? 1.5 : 1} className={i % 2 ? "lg:order-1" : ""}>
                  {isSmall && s.mobileShots ? s.mobileShots : s.shots}
                </FitBox>
              </div>
            </div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
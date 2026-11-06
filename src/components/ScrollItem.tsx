"use client";

import { useEffect, useRef, useState, type ReactNode } from "react";
import { motion, useReducedMotion, useScroll, useSpring, useTransform } from "motion/react";

type Props = {
  children: ReactNode;
  y?: number;       // starting offset in px
  x?: number;       // starting sideways offset in px
  rotate?: number;  // starting tilt in degrees
  className?: string;
};

export function ScrollItem({ children, y: yProp = 120, x: xProp = 0, rotate: rotateProp = 0, className = "" }: Props) {
  const ref = useRef<HTMLDivElement>(null);
  const reduce = useReducedMotion();

  // On phones the items are stacked and each one is nearly full width, so the big
  // desktop offsets would leave long empty gaps and push items off the screen edge.
  const [small, setSmall] = useState(false);
  useEffect(() => {
    const mq = window.matchMedia("(max-width: 1023px)");
    const update = () => setSmall(mq.matches);
    update();
    mq.addEventListener("change", update);
    return () => mq.removeEventListener("change", update);
  }, []);
  const y = small ? yProp * 0.3 : yProp;
  const x = small ? 0 : xProp;
  const rotate = small ? rotateProp * 0.4 : rotateProp;

  // 0 when the item enters the bottom of the screen, 1 when it reaches the middle
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start end", "center center"] });
  const p = useSpring(scrollYProgress, { stiffness: 120, damping: 26, mass: 0.3 });

  const ty = useTransform(p, [0, 1], [reduce ? 0 : y, 0]);
  const tx = useTransform(p, [0, 1], [reduce ? 0 : x, 0]);
  const r = useTransform(p, [0, 1], [reduce ? 0 : rotate, 0]);
  const scale = useTransform(p, [0, 1], [reduce ? 1 : 0.85, 1]);
  const opacity = useTransform(p, [0, 0.5], [reduce ? 1 : 0, 1]);

  return (
    <motion.div ref={ref} style={{ y: ty, x: tx, rotate: r, scale, opacity }} className={className}>
      {children}
    </motion.div>
  );
}
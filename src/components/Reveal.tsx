"use client";

import {
  useEffect,
  useRef,
  useState,
  useSyncExternalStore,
  type CSSProperties,
  type ElementType,
  type ReactNode,
} from "react";

type Variant = "up" | "down" | "left" | "right" | "zoom" | "blur" | "fade" | "line";

const D = "clamp(24px, 5vw, 64px)"; // scales from phone to big screens

const hiddenStyle: Record<Variant, CSSProperties> = {
  up: { transform: `translate3d(0, ${D}, 0)` },
  down: { transform: `translate3d(0, calc(${D} * -1), 0)` },
  left: { transform: `translate3d(calc(${D} * -1), 0, 0)` },
  right: { transform: `translate3d(${D}, 0, 0)` },
  zoom: { transform: `scale(0.94) translate3d(0, ${D}, 0)` },
  blur: { transform: `translate3d(0, ${D}, 0)`, filter: "blur(8px)" },
  fade: {},
  line: { transform: "scaleX(0)", transformOrigin: "left center" },
};

/* ---- reads "no animation possible/wanted" without setState in an effect ---- */
const REDUCE_QUERY = "(prefers-reduced-motion: reduce)";

function subscribeReduce(callback: () => void) {
  const mq = window.matchMedia(REDUCE_QUERY);
  mq.addEventListener("change", callback);
  return () => mq.removeEventListener("change", callback);
}

function getReduceSnapshot() {
  return (
    window.matchMedia(REDUCE_QUERY).matches || !("IntersectionObserver" in window)
  );
}

// On the server we render hidden-state markup, same as the first client render.
const getReduceServerSnapshot = () => false;

type Props = {
  as?: ElementType;
  variant?: Variant;
  delay?: number; // ms
  className?: string;
  style?: CSSProperties;
  children?: ReactNode;
  id?: string;
};

export function Reveal({
  as: Tag = "div",
  variant = "up",
  delay = 0,
  className,
  style,
  children,
  id,
}: Props) {
  const ref = useRef<HTMLElement>(null);
  const [inView, setInView] = useState(false);

  const skipAnimation = useSyncExternalStore(
    subscribeReduce,
    getReduceSnapshot,
    getReduceServerSnapshot
  );

  const shown = skipAnimation || inView;

  useEffect(() => {
    const el = ref.current;
    if (!el || skipAnimation) return;

    const io = new IntersectionObserver(
      ([entry]) => {
        // setState inside an observer callback is fine (external event)
        setInView(entry.isIntersecting);
      },
      { threshold: 0.1, rootMargin: "0px 0px -6% 0px" }
    );
    io.observe(el);

    // re-arm when coming back via the browser back/forward cache
    const onPageShow = (e: PageTransitionEvent) => {
      if (e.persisted) setInView(false);
    };
    window.addEventListener("pageshow", onPageShow);

    return () => {
      io.disconnect();
      window.removeEventListener("pageshow", onPageShow);
    };
  }, [skipAnimation]);

  const ease = "cubic-bezier(0.22, 1, 0.36, 1)";
  const animStyle: CSSProperties = shown
    ? {
        opacity: 1,
        transform: "none",
        filter: "none",
        transition: `opacity 900ms ${ease} ${delay}ms, transform 900ms ${ease} ${delay}ms, filter 900ms ${ease} ${delay}ms`,
      }
    : {
        opacity: variant === "line" ? 1 : 0,
        ...hiddenStyle[variant],
        transition: "none",
      };

  return (
    <Tag ref={ref} id={id} className={className} style={{ ...animStyle, ...style }}>
      {children}
    </Tag>
  );
}
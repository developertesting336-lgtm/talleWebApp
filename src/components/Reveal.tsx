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

export type RevealVariant =
  | "up"
  | "down"
  | "left"
  | "right"
  | "zoom"
  | "blur"
  | "fade"
  | "line"
  | "card";

const D = "clamp(36px, 6vw, 60px)";

// Hidden styles before entering viewport
const hiddenStyle: Record<RevealVariant, CSSProperties> = {
  up: {
    transform: `perspective(1000px) translate3d(0, ${D}, 0) scale(0.95)`,
  },
  down: {
    transform: `perspective(1000px) translate3d(0, calc(${D} * -1), 0)`,
  },
  left: {
    transform: `perspective(1000px) translate3d(calc(${D} * -1), 0, 0)`,
  },
  right: {
    transform: `perspective(1000px) translate3d(${D}, 0, 0)`,
  },
  zoom: {
    transform: `perspective(1000px) scale(0.90) translate3d(0, ${D}, 0)`,
  },
  blur: {
    transform: `perspective(1000px) translate3d(0, ${D}, 0)`,
    filter: "blur(8px)",
  },
  fade: {},
  line: {
    transform: "scaleX(0)",
    transformOrigin: "left center",
  },
  // Dedicated tactile 3D card reveal: noticeable vertical lift + 3D tilt + scale
  card: {
    transform:
      "perspective(1000px) rotateX(8deg) translate3d(0, clamp(44px, 8vw, 68px), 0) scale(0.92)",
    filter: "brightness(0.88)",
    transformOrigin: "center bottom",
  },
};

// Shown transform styles once revealed (matching transform functions for fluid GPU interpolation)
const shownTransform: Record<RevealVariant, string | undefined> = {
  up: "perspective(1000px) translate3d(0, 0, 0) scale(1)",
  down: "perspective(1000px) translate3d(0, 0, 0)",
  left: "perspective(1000px) translate3d(0, 0, 0)",
  right: "perspective(1000px) translate3d(0, 0, 0)",
  zoom: "perspective(1000px) scale(1) translate3d(0, 0, 0)",
  blur: "perspective(1000px) translate3d(0, 0, 0)",
  fade: undefined,
  line: "scaleX(1)",
  card: "perspective(1000px) rotateX(0deg) translate3d(0, 0, 0) scale(1)",
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
  variant?: RevealVariant;
  delay?: number; // ms
  duration?: number; // ms
  className?: string;
  style?: CSSProperties;
  children?: ReactNode;
  id?: string;
  once?: boolean;
};

export function Reveal({
  as: Tag = "div",
  variant = "up",
  delay = 0,
  duration,
  className,
  style,
  children,
  id,
  once = false,
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
        if (entry.isIntersecting) {
          // Element entered viewport (scrolling down into it) -> reveal it
          setInView(true);
          if (once) {
            io.unobserve(el);
          }
        } else if (!once) {
          const rootBottom = entry.rootBounds
            ? entry.rootBounds.bottom
            : window.innerHeight;

          if (entry.boundingClientRect.top >= rootBottom) {
            // Element exited through the bottom (user scrolled UP above it).
            // Reset offscreen so it will animate again on downward scroll!
            setInView(false);
          } else if (
            entry.boundingClientRect.bottom <= 0 ||
            entry.boundingClientRect.top < 0
          ) {
            // Element exited through the top (user scrolled DOWN past it).
            // Keep it fully revealed so scrolling back UP shows it in place with NO animation!
            setInView(true);
          }
        }
      },
      {
        threshold: 0.05,
        rootMargin: "0px 0px -25px 0px",
      }
    );
    io.observe(el);

    // re-arm when coming back via the browser back/forward cache
    const onPageShow = (e: PageTransitionEvent) => {
      if (e.persisted) {
        setInView(false);
        io.observe(el);
      }
    };
    window.addEventListener("pageshow", onPageShow);

    return () => {
      io.disconnect();
      window.removeEventListener("pageshow", onPageShow);
    };
  }, [skipAnimation, once]);

  const isCard = variant === "card";
  const ease = isCard
    ? "cubic-bezier(0.16, 1, 0.3, 1)"
    : "cubic-bezier(0.22, 1, 0.36, 1)";
  const dur = duration ?? (isCard ? 650 : 850);

  const shownStyle: CSSProperties = {
    opacity: 1,
    transform: shownTransform[variant] ?? "none",
    filter: "none",
    transition: `opacity ${dur}ms ${ease} ${delay}ms, transform ${dur}ms ${ease} ${delay}ms, filter ${dur}ms ${ease} ${delay}ms`,
    willChange: "auto",
  };

  const initialStyle: CSSProperties = {
    opacity: variant === "line" ? 1 : 0,
    ...hiddenStyle[variant],
    transition: "none",
    willChange: "transform, opacity",
  };

  const animStyle: CSSProperties = shown ? shownStyle : initialStyle;

  return (
    <Tag
      ref={ref}
      id={id}
      className={className}
      style={{ ...animStyle, ...style }}
    >
      {children}
    </Tag>
  );
}

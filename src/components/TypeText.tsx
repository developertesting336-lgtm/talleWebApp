"use client";

import { useEffect, useState, useSyncExternalStore } from "react";

const REDUCE_QUERY = "(prefers-reduced-motion: reduce)";

function subscribeReduce(cb: () => void) {
  const mq = window.matchMedia(REDUCE_QUERY);
  mq.addEventListener("change", cb);
  return () => mq.removeEventListener("change", cb);
}
const getReduce = () => window.matchMedia(REDUCE_QUERY).matches;
const getReduceServer = () => false;

/** Returns how many characters should be visible right now. */
export function useTyper(text: string, start: boolean, delay = 0, speed = 35) {
  const [count, setCount] = useState(0);
  const reduce = useSyncExternalStore(subscribeReduce, getReduce, getReduceServer);

  useEffect(() => {
    if (!start || reduce) return;

    let i = 0;
    let interval: ReturnType<typeof setInterval> | undefined;

    const timeout = setTimeout(() => {
      interval = setInterval(() => {
        i += 1;
        setCount(i); // runs in a timer callback, not synchronously in the effect
        if (i >= text.length && interval) clearInterval(interval);
      }, speed);
    }, delay);

    return () => {
      clearTimeout(timeout);
      if (interval) clearInterval(interval);
    };
  }, [start, reduce, text, delay, speed]);

  return reduce ? text.length : Math.min(count, text.length);
}

/** Typed string, handy for placeholders. */
export function useTypedString(text: string, start: boolean, delay = 0, speed = 35) {
  const count = useTyper(text, start, delay, speed);
  return text.slice(0, count);
}

/** Typed text that keeps its final width reserved, so nothing shifts. */
export function TypeText({
  text,
  start,
  delay = 0,
  speed = 35,
  className,
}: {
  text: string;
  start: boolean;
  delay?: number;
  speed?: number;
  className?: string;
}) {
  const count = useTyper(text, start, delay, speed);

  return (
    <>
      <span className="sr-only">{text}</span>
      <span aria-hidden="true" className={className}>
        {text.slice(0, count)}
        <span className="invisible">{text.slice(count)}</span>
      </span>
    </>
  );
}
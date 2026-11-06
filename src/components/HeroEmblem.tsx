"use client";

import dynamic from "next/dynamic";

// three.js loads only in the browser and stays out of the initial bundle
const Hero3DEmblem = dynamic(
  () => import("@/components/Hero3DEmblem").then((m) => m.Hero3DEmblem),
  { ssr: false }
);

export function HeroEmblem() {
  return <Hero3DEmblem />;
}
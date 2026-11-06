import type { Metadata } from "next";
import Link from "next/link";
import { PatternBackground } from "@/components/PatternBackground";

export const metadata: Metadata = {
  title: "Page Not Found",
  robots: { index: false },
};

export default function NotFound() {
  return (
    <section className="relative isolate overflow-clip">
      <PatternBackground />
      <div className="mx-auto flex min-h-[70vh] max-w-3xl flex-col items-center justify-center px-5 py-20 text-center sm:px-6">
        <p className="hero-in font-display text-lg font-bold uppercase tracking-[0.3em] text-gold">Error 404</p>
        <h1 className="hero-in mt-4 font-display text-5xl font-bold uppercase leading-tight text-gold sm:text-7xl" style={{ "--d": 1 } as React.CSSProperties}>
          This spot doesn’t exist
        </h1>
        <p className="hero-in mt-6 text-lg" style={{ "--d": 2 } as React.CSSProperties}>
          The page you’re looking for has moved or never existed. Let’s get you somewhere good.
        </p>
        <div className="hero-in mt-10 flex flex-wrap justify-center gap-4" style={{ "--d": 3 } as React.CSSProperties}>
          <Link href="/" className="rounded-full bg-gold px-7 py-3 font-bold text-ink transition-colors hover:bg-cream">
            Go home
          </Link>
          <Link href="/how-it-works" className="rounded-full border border-gold px-7 py-3 font-bold text-gold transition-colors hover:bg-gold hover:text-ink">
            How Tallee works
          </Link>
          <Link href="/occasion" className="rounded-full border border-gold/50 px-7 py-3 font-bold text-cream transition-colors hover:border-gold hover:text-gold">
            Browse occasions
          </Link>
        </div>
      </div>
    </section>
  );
}

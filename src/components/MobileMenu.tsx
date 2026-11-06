"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { isActive, isHashLink } from "@/components/DesktopNav";
import { StoreButtons } from "@/components/StoreButtons";
import { navLinks } from "@/lib/site";

const rowClass = "block w-full py-[18px] text-center text-xl leading-6";

export function MobileMenu() {
  const [open, setOpen] = useState(false);
  const [exploreOpen, setExploreOpen] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && setOpen(false);
    document.addEventListener("keydown", onKey);
    document.body.style.overflow = "hidden";
    return () => {
      document.removeEventListener("keydown", onKey);
      document.body.style.overflow = "";
    };
  }, [open]);

  const close = () => setOpen(false);

  return (
    <div className="lg:hidden">
      <button
        type="button"
        aria-label="Open menu"
        aria-expanded={open}
        aria-controls="mobile-menu"
        onClick={() => setOpen(true)}
        className="absolute right-4 top-1/2 grid h-10 w-10 -translate-y-1/2 place-items-center"
      >
        <svg viewBox="0 0 24 24" className="h-6 w-6" fill="none" stroke="currentColor" strokeWidth="1.5" aria-hidden="true">
          <path d="M3 6h18M3 12h18M3 18h18" />
        </svg>
      </button>

      {open && (
        <div id="mobile-menu" role="dialog" aria-modal="true" aria-label="Menu" className="fixed inset-0 z-50 overflow-y-auto bg-ink">
          <button
            type="button"
            aria-label="Close menu"
            onClick={close}
            className="absolute right-4 top-5 grid h-10 w-10 place-items-center"
          >
            <svg viewBox="0 0 24 24" className="h-6 w-6" fill="none" stroke="currentColor" strokeWidth="1.5" aria-hidden="true">
              <path d="M4 4l16 16M20 4L4 20" />
            </svg>
          </button>

          <nav aria-label="Main" className="mx-auto mt-[74px] w-[60%] min-w-[220px] max-w-[320px]">
            <ul>
              {navLinks.map((item) =>
                "children" in item ? (
                  <li key={item.label} className="border-b border-cream/40">
                    <button
                      type="button"
                      aria-expanded={exploreOpen}
                      aria-controls="mobile-explore"
                      onClick={() => setExploreOpen((o) => !o)}
                      className={`${rowClass} flex items-center justify-center gap-2 ${
                        item.prefixes.some((p) => pathname === p || pathname.startsWith(`${p}/`)) ? "text-cream/60" : "text-cream"
                      }`}
                    >
                      {item.label}
                      <svg
                        viewBox="0 0 12 12"
                        aria-hidden="true"
                        className={`h-3 w-3 transition-transform duration-200 ${exploreOpen ? "rotate-180" : ""}`}
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="1.6"
                      >
                        <path d="M2 4.5l4 4 4-4" />
                      </svg>
                    </button>
                    <ul id="mobile-explore" hidden={!exploreOpen} className="pb-3">
                      {item.children.map((c) => (
                        <li key={c.href}>
                          <Link
                            href={c.href}
                            onClick={close}
                            aria-current={pathname === c.href ? "page" : undefined}
                            className={`block py-2.5 text-center text-lg leading-6 ${pathname === c.href ? "text-gold" : "text-gold/80"}`}
                          >
                            {c.label}
                          </Link>
                        </li>
                      ))}
                    </ul>
                  </li>
                ) : (
                  <li key={item.label} className="border-b border-cream/40">
                    {(() => {
                      const current = isActive(pathname, item.href, item.match);
                      if (isHashLink(item.href))
                        return (
                          <a href={item.href} onClick={close} className={`${rowClass} text-cream`}>
                            {item.label}
                          </a>
                        );
                      return (
                        <Link
                          href={item.href}
                          onClick={close}
                          aria-current={current ? "page" : undefined}
                          className={`${rowClass} ${current ? "text-cream/60" : "text-cream"}`}
                        >
                          {item.label}
                        </Link>
                      );
                    })()}
                  </li>
                ),
              )}
            </ul>
          </nav>

          <div className="mx-auto mb-10 mt-8 flex max-w-[320px] flex-col items-center">
            <p className="font-display text-lg font-bold uppercase tracking-[0.25em] text-gold">Download App</p>
            <StoreButtons className="mt-4 !gap-4" />
          </div>
        </div>
      )}
    </div>
  );
}

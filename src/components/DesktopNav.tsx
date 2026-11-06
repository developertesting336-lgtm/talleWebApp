"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useId, useRef, useState, type ReactNode } from "react";
import { navLinks, site } from "@/lib/site";

// Links to a section of the home page (like /#faq) are plain anchors. Opened from
// another page, the browser then loads the page and scrolls to the section itself,
// which is more dependable than a client-side navigation.
export const isHashLink = (href: string) => href.includes("#");

export const isActive = (pathname: string, href: string, match: "exact" | "prefix" | undefined) =>
  !href.includes("#") && (match === "exact" ? pathname === href : pathname === href || (match === "prefix" && pathname.startsWith(`${href}/`)));

const chevron = (
  <svg viewBox="0 0 12 12" aria-hidden="true" className="h-3 w-3 transition-transform duration-200 group-aria-expanded:rotate-180" fill="none" stroke="currentColor" strokeWidth="1.6">
    <path d="M2 4.5l4 4 4-4" />
  </svg>
);

// A button that opens a small panel of links. It opens on hover (mouse only), on
// click or tap, and with the keyboard. Escape, a click elsewhere, moving focus
// away, or choosing a link closes it.
function Dropdown({ label, buttonClass, panelClass = "", align = "left", children }: { label: ReactNode; buttonClass: string; panelClass?: string; align?: "left" | "right"; children: ReactNode }) {
  const [open, setOpen] = useState(false);
  const root = useRef<HTMLDivElement>(null);
  const button = useRef<HTMLButtonElement>(null);
  const panelId = useId();

  useEffect(() => {
    if (!open) return;
    const onDown = (e: PointerEvent) => !root.current?.contains(e.target as Node) && setOpen(false);
    const onKey = (e: KeyboardEvent) => {
      if (e.key !== "Escape") return;
      setOpen(false);
      button.current?.focus();
    };
    document.addEventListener("pointerdown", onDown);
    document.addEventListener("keydown", onKey);
    return () => {
      document.removeEventListener("pointerdown", onDown);
      document.removeEventListener("keydown", onKey);
    };
  }, [open]);

  return (
    <div
      ref={root}
      className="relative"
      onPointerEnter={(e) => e.pointerType === "mouse" && setOpen(true)}
      onPointerLeave={(e) => e.pointerType === "mouse" && setOpen(false)}
      onBlur={(e) => !e.currentTarget.contains(e.relatedTarget) && setOpen(false)}
    >
      <button ref={button} type="button" aria-expanded={open} aria-controls={panelId} onClick={(e) => {
          // With a mouse, hover has already opened it, so a click keeps it open.
          const mouse = (e.nativeEvent as PointerEvent).pointerType === "mouse";
          setOpen((o) => mouse || !o);
        }}
        className={`group ${buttonClass}`}
      >
        {label}
        {chevron}
      </button>
      {/* The panel starts at the button's edge (pt-3 is an invisible bridge) so the pointer can travel into it. */}
      <div
        id={panelId}
        hidden={!open}
        onClick={(e) => (e.target as Element).closest("a") && setOpen(false)}
        className={`absolute top-full z-50 pt-3 ${align === "right" ? "right-0" : "left-0"}`}
      >
        <ul className={`min-w-44 rounded-xl border border-gold/30 bg-ink p-2 shadow-[0_12px_40px_rgba(0,0,0,0.7)] ${panelClass}`}>{children}</ul>
      </div>
    </div>
  );
}

const itemClass = "block rounded-lg px-4 py-2.5 hover:bg-gold/10 hover:text-gold focus-visible:bg-gold/10 focus-visible:text-gold";

export function DesktopNav() {
  const pathname = usePathname();
  const linkClass = (active: boolean) => `py-2 hover:text-gold ${active ? "text-gold" : ""}`;

  return (
    <nav aria-label="Main" className="ml-auto hidden items-center gap-7 lg:flex">
      {navLinks.map((item) =>
        "children" in item ? (
          <Dropdown
            key={item.label}
            label={item.label}
            buttonClass={`flex items-center gap-1.5 py-2 hover:text-gold ${item.prefixes.some((p) => pathname === p || pathname.startsWith(`${p}/`)) ? "text-gold" : ""}`}
          >
            {item.children.map((c) => (
              <li key={c.href}>
                <Link href={c.href} aria-current={pathname === c.href ? "page" : undefined} className={itemClass}>
                  {c.label}
                </Link>
              </li>
            ))}
          </Dropdown>
        ) : (
          (isHashLink(item.href) ? (
            <a key={item.label} href={item.href} className={linkClass(false)}>
              {item.label}
            </a>
          ) : (
            <Link key={item.label} href={item.href} aria-current={isActive(pathname, item.href, item.match) ? "page" : undefined} className={linkClass(isActive(pathname, item.href, item.match))}>
              {item.label}
            </Link>
          ))
        ),
      )}

      <Dropdown
        align="right"
        label="Download App"
        buttonClass="flex items-center gap-2 rounded-full bg-gold px-5 py-2.5 font-bold text-ink transition-colors hover:bg-cream"
      >
        <li>
          <a href={site.stores.googlePlay} target="_blank" rel="noopener noreferrer" data-store="google-play" className={itemClass}>
            Google Play
          </a>
        </li>
        <li>
          <a href={site.stores.appStore} target="_blank" rel="noopener noreferrer" data-store="app-store" className={itemClass}>
            App Store
          </a>
        </li>
      </Dropdown>
    </nav>
  );
}

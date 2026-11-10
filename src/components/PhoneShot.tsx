import Image from "next/image";

type Screen = { src: string; h: number; alt: string };

// An app screenshot in a phone-style frame that fades out at the bottom, so
// screens of different heights (and scrolled screens) all look intentional.
export function PhoneShot({ screen, compact = false }: { screen: Screen; compact?: boolean }) {
  const fade = "linear-gradient(to bottom, #000 82%, transparent)";
  return (
    <div
      className={`float flex-none snap-center rounded-t-[1.75rem] border border-b-0 border-gold/40 bg-charcoal p-1.5 pb-0 ${compact ? "w-[140px] sm:w-[160px]" : "w-[150px] sm:w-[220px]"
        }`}
      style={{ maskImage: fade, WebkitMaskImage: fade }}
    >
      <Image
        src={screen.src}
        alt={screen.alt}
        width={720}
        height={screen.h}
        sizes="220px"
        className="h-auto w-full rounded-t-[1.35rem]"
      />
    </div>
  );
}

// A short silent screen recording in the same frame. It has controls and never
// autoplays; the poster is the first frame.
// export function PhoneVideo({ src, poster, label }: { src: string; poster: string; label: string }) {
//   return (
//     <div className="mx-auto w-[260px] rounded-[2rem] border border-gold/40 bg-charcoal p-1.5 sm:w-[300px]">
//       <video
//         src={src}
//         poster={poster}
//         controls
//         muted
//         playsInline
//         preload="metadata"
//         aria-label={label}
//         className="aspect-[540/932] w-full rounded-[1.6rem] bg-black"
//       />
//     </div>
//   );
// }

// A short silent screen recording in a phone-style frame. It has controls and
// plays inline. The frame is locked to standard 9:16 aspect ratio (1080x1920),
// perfectly matching the demo recording, and uses hardware-stabilized width
// so it never causes layout shifts or jitter on mobile scroll.
export function PhoneVideo({ src, poster, label }: { src: string; poster?: string; label: string }) {
  return (
    <div className="relative mx-auto w-[270px] xs:w-[295px] sm:w-[320px] md:w-[340px] max-w-[88vw] rounded-[2.4rem] sm:rounded-[2.75rem] border-2 border-gold/45 bg-[#151515] p-2 sm:p-2.5 shadow-[0_20px_50px_rgba(0,0,0,0.9),0_0_30px_rgba(223,179,96,0.18)] [transform:translateZ(0)] [backface-visibility:hidden]">
      {/* Dynamic island / speaker pill */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute left-1/2 top-3 sm:top-3.5 z-20 h-3 w-16 sm:h-3.5 sm:w-20 -translate-x-1/2 rounded-full border border-white/10 bg-black/90 shadow-sm"
      />

      {/* Screen container locked strictly to 9:16 */}
      <div className="relative aspect-[9/16] w-full overflow-hidden rounded-[1.8rem] sm:rounded-[2.1rem] bg-black shadow-inner [transform:translateZ(0)]">
        <video
          src={src}
          poster={poster}
          controls
          muted
          playsInline
          preload="metadata"
          aria-label={label}
          className="relative z-10 block h-full w-full rounded-[1.8rem] sm:rounded-[2.1rem] bg-black object-cover [transform:translateZ(0)]"
        />
      </div>
    </div>
  );
}

// Phones in a row: centered when they fit, swipeable on small screens. The
// scrollbar is hidden (it looks heavy on phones); on small screens the next
// phone peeks in from the edge to show there is more to swipe.
export function PhoneRow({ children, label }: { children: React.ReactNode; label: string }) {
  return (
    <div
      role="group"
      aria-label={label}
      tabIndex={0}
      className="flex snap-x gap-3 overflow-x-auto pt-3 sm:gap-4 [-ms-overflow-style:none] [scrollbar-width:none] [&::-webkit-scrollbar]:hidden [&>:first-child]:ml-auto [&>:last-child]:mr-auto"
    >
      {children}
    </div>
  );
}

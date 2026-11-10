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

// A short silent screen recording in the same frame. It has controls and never
// autoplays; the poster is the first frame. The frame adapts to whatever
// size/aspect ratio the video has.
// The video and its poster share one crop (540x1092), and the box has that fixed ratio, so
// the frame never changes size between the poster, loading and playing.
export function PhoneVideo({ src, poster, label }: { src: string; poster: string; label: string }) {
  return (
    <div className="mx-auto w-fit max-w-full rounded-[2rem] border border-gold/40 bg-charcoal p-1.5">
      <video
        src={src}
        poster={poster}
        controls
        muted
        playsInline
        preload="metadata"
        aria-label={label}
        className="block aspect-[540/1092] h-[min(70svh,640px)] w-auto max-w-full rounded-[1.6rem] bg-black object-cover"
      />
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

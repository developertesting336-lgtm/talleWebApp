// A slow ticker of the vibes in the app. Decorative only (aria-hidden); it
// pauses on hover and does not move for people who prefer reduced motion.
const vibes = [
  "Romantic",
  "Fancy",
  "Chill",
  "Craft Cocktail Bar",
  "Brunch Party",
  "Quiet & Private",
  "Small Plates/Tapas",
  "Whiskey Bar",
  "Sports Bar",
  "Chef’s Tasting Menu",
  "Café/Bistro",
  "Just Drinks",
  "Social Entertainment/Barcades",
  "Breakfast",
];

export function VibeMarquee() {
  const mask = "linear-gradient(to right, transparent, #000 10%, #000 90%, transparent)";
  const items = [...vibes, ...vibes];
  return (
    <div
      aria-hidden="true"
      className="marquee overflow-hidden border-y border-gold/20 bg-ink py-5"
      style={{ maskImage: mask, WebkitMaskImage: mask }}
    >
      <div className="marquee-track flex w-max whitespace-nowrap">
        {items.map((v, i) => (
          <span key={i} className="flex items-center font-display text-xl font-bold uppercase tracking-[0.22em] text-gold/80 sm:text-2xl">
            <span className="px-6 sm:px-8">{v}</span>
            <span className="text-sm text-gold/50">✦</span>
          </span>
        ))}
      </div>
    </div>
  );
}

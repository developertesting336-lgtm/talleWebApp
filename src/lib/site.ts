// Central place for site-wide settings, links and assets. Images live in
// /public/images (full-size masters are in /design-assets).

export const site = {
  name: "Tallee",
  url: "https://www.talleeknows.com",
  title: "Tallee | AI-Powered Restaurant, Bar & Event Discovery App",
  description:
    "Tallee is an AI-powered worldwide restaurant, bar, and event discovery app helping users find the best places to eat, drink, and experience based on vibe, mood, and occasion.",
  tagline: "Always in the Know.",
  contactEmail: "contact@talleeknows.com",
  address: ["PO Box 447", "Clinton MD, 20735"],
  stores: {
    googlePlay: "https://play.google.com/store/apps/details?id=com.hotelslist",
    appStore: "https://apps.apple.com/us/app/tallee-knows/id6754320379",
  },
  social: {
    instagram: "https://www.instagram.com/talleeknows",
    tiktok: "https://www.tiktok.com/@talleeknows",
  },
} as const;

export const images = {
  headerLogo: "/images/header-logo.webp",
  footerLogo: "/images/footer-logo.webp",
  pattern: "/images/pattern.webp",
  googlePlayBadge: "/images/google-play-badge.webp",
  appStoreBadge: "/images/app-store-badge.webp",
  ourApp: "/images/our-app.webp",
  about: "/images/about.webp",
} as const;

// iOS screenshots, cropped below the status bar. `h` is the image height at 720px wide.
export const appScreens = {
  home: { src: "/images/app/home.webp", h: 1244, alt: "Tallee home screen with location, travel distance and Eat & Drink or Goods & Services" },
  occasion: { src: "/images/app/occasion.webp", h: 1244, alt: "Choosing an occasion such as date night or girls and guys night out in Tallee" },
  vibe: { src: "/images/app/vibe.webp", h: 1244, alt: "Choosing an experience and vibe such as breakfast or brunch party in Tallee" },
  results: { src: "/images/app/results.webp", h: 1244, alt: "Tallee’s filtered results showing matched venues with ratings" },
  favorites: { src: "/images/app/favorites.webp", h: 1244, alt: "My Favorites list of saved places in Tallee" },
  venue: { src: "/images/app/venue.webp", h: 1244, alt: "A venue page with rating, address, website, opening hours and photo gallery" },
  venueMap: { src: "/images/app/venue-map.webp", h: 796, alt: "A venue page with description, map location and Get Directions link" },
  events: { src: "/images/app/events.webp", h: 1244, alt: "Events Near Me screen listing upcoming events with dates" },
  goods: { src: "/images/app/goods-services.webp", h: 1244, alt: "Goods & Services screen with distance filter, AI voice search and categories" },
  premium: { src: "/images/app/premium.webp", h: 1244, alt: "Tallee Free and Premium plans" },
  planFree: { src: "/images/app/plan-free.webp", h: 1498, alt: "The Free plan in Tallee: 15 searches per month and basic features" },
  planPremium: { src: "/images/app/plan-premium.webp", h: 1498, alt: "The Premium plan in Tallee: unlimited searches and every feature" },
} as const;

export const exploreLinks = [
  { href: "/occasion", label: "Occasions" },
  { href: "/category", label: "Vibes" },
  { href: "/city", label: "Cities" },
  { href: "/blog", label: "Blog" },
] as const;

// Main menu, in the order the SEO team asked for. Cities is not in the menu (it is
// still reachable from the footer and the Explore links on How It Works); Blog sits
// where the SEO team had Guides.
// About and Help point at sections of the home page until they get their own pages.
export type NavItem =
  | { label: string; href: string; match?: "exact" | "prefix" }
  | { label: string; children: { label: string; href: string }[]; prefixes: string[] };

export const navLinks: NavItem[] = [
  { label: "Home", href: "/", match: "exact" },
  { label: "How It Works", href: "/how-it-works" },
  {
    label: "Explore",
    prefixes: ["/occasion", "/category"],
    children: [
      { label: "Occasions", href: "/occasion" },
      { label: "Vibes", href: "/category" },
    ],
  },
  { label: "Blog", href: "/blog", match: "prefix" },
  { label: "About", href: "/#who-we-are" },
  { label: "Help", href: "/#faq" },
];

export const footerLinks = [
  { href: "/how-it-works", label: "How It Works" },
  { href: "/english-privacy-policy", label: "Privacy Policy" },
  { href: "/accessibility-statement", label: "Accessibility Statement" },
  { href: "/term-conditions", label: "Term & Conditions" },
  { href: "/delete-account", label: "Delete Account" },
] as const;

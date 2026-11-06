# CLAUDE.md — Tallee website (talleeknows.com)

@AGENTS.md

## What this project is
- Client: **Tallee** ("Tallee Knows: AI Venue Finder"), by TALLEE L.L.C., Clinton, MD, USA.
- Tallee is an AI venue recommendation **mobile app** (iOS + Android) for bars, restaurants, lounges and events, matched to vibe, mood and occasion. Free to download, with an in-app premium subscription.
- This repo is the **new marketing website** in Next.js. It replaces the current **Wix** site at https://www.talleeknows.com.
- Why we are moving off Wix: the client's SEO team has a 90-day growth plan (ASO, website SEO, Google/Apple Ads, analytics) that needs many SEO landing pages. Wix limits speed, control and page generation. Next.js also lets us add web versions of the app's features later.

## Phases
- **Phase 1 (current):**
  1. ✅ Rebuild all current Wix pages with the **same URLs** (done, first commit).
  2. ⏳ Build the SEO landing page templates: occasion, category, city, and city + category pages.
  3. ⏳ Technical SEO and tracking (GA4, download-button click tracking).
  4. ⏳ Deploy and switch the domain from Wix to the new host.
- **Phase 2 (later, optional):** web version of the app's features (venue search, AI recommendations, login, saved places), using the mobile app's existing backend. **Do not build Phase 2 work unless asked.**

## Stack and conventions
- **Next.js 16** (App Router, `src/` dir, TypeScript, Turbopack) with `cacheComponents: true`. This Next.js version has breaking changes. Read `node_modules/next/dist/docs/` before using an API you are unsure of.
  - Under cacheComponents, `new Date()` or other unstable values in render break prerendering. Use `"use cache"`, a client component, or `await connection()`. See `CopyrightYear` in `Footer.tsx`.
- **Tailwind CSS v4.** Theme tokens are in `src/app/globals.css` (`@theme`): `ink #000`, `charcoal #242424`, `gold #DFB360`, `cream #FDFCF9`, `font-display` (Cormorant Garamond via `@fontsource`), and `font-sans` (Helvetica stack).
- **Brand look:** black background, gold serif headings (often uppercase), light cream body text, a gold logo-pattern background image on the hero and FAQ, and a dark contact section (info on the left, form card on the right).
- **No Google Fonts fetch at build time.** Fonts come from `@fontsource/cormorant-garamond`.
- Site-wide settings, store links, social links, contact info and **all image URLs** are in `src/lib/site.ts`. Change them there, not in individual pages.
- Use the shared components in `src/components/`: `Header`, `Footer`, `StoreButtons` (has `data-store` attributes for GA4), `ContactForm`, `LegalPage`, and `JsonLd` (escapes `<`).
- Every page exports `metadata` with a title, description and `alternates.canonical`. The title template is `%s | Tallee`.
- Every new route must also be added to `src/app/sitemap.ts`.
- Keep pages static (prerendered). Check with `npm run build`; every route should show `○ (Static)`.
- Commit messages end with the Co-Authored-By / Claude-Session lines when Claude commits.

## Routes (must keep these exact URLs, they match the old Wix site)
| URL | File |
|---|---|
| `/` | `src/app/page.tsx` (hero, Who We Are, FAQ + FAQPage schema, contact form) |
| `/how-it-works` | `src/app/how-it-works/page.tsx` (new page, not on Wix: steps with iOS screenshots, demo video) |
| `/blog`, `/blog/[slug]` | `src/app/blog/` (static preview with SAMPLE posts from `src/lib/blog.ts`; noindex and out of the sitemap until `blogPublished` is set to true; the "Post a blog" form is disabled until Phase 2) |
| `/english-privacy-policy` | `src/app/english-privacy-policy/page.tsx` |
| `/accessibility-statement` | `src/app/accessibility-statement/page.tsx` |
| `/term-conditions` | `src/app/term-conditions/page.tsx` |
| `/delete-account` | `src/app/delete-account/page.tsx` |
| `/sitemap.xml`, `/robots.txt` | `src/app/sitemap.ts`, `src/app/robots.ts` |

The App Store listing links to `/english-privacy-policy`. Never change or remove that URL.

## Navigation and breadcrumbs
- The main menu is `navLinks` in `src/lib/site.ts`. Desktop (`lg` and up) is `DesktopNav.tsx` (Explore dropdown, Download App dropdown with Google Play and App Store, both with `data-store`). Below `lg` it is `MobileMenu.tsx`, with the same links and the store buttons at the bottom.
- Menu order: Home, How It Works, Explore (Occasions, Vibes), Blog, About, Help, then Download App. Cities is not in the menu on purpose (still in the footer and on How It Works). About and Help point at `/#who-we-are` and `/#faq`. They are plain `<a>` tags on purpose: a client-side `Link` to a hash on another page scrolled to the wrong place.
- Breadcrumbs are `Breadcrumbs.tsx`, which also writes the BreadcrumbList schema. Pass the trail without Home. Every inner page uses it (landing pages and hubs, How It Works, the four legal pages). The home page and 404 do not.
- Do not use `overflow-hidden` on a full-width section: it makes the section a scroll container, and anchor jumps then scroll its contents. Use `overflow-clip`.

## Key links
- Google Play: https://play.google.com/store/apps/details?id=com.hotelslist (the package name is a template leftover; leave it as is)
- App Store: https://apps.apple.com/us/app/tallee-knows/id6754320379 (app id `6754320379`, used for the iOS Smart App Banner meta tag)
- Instagram: https://www.instagram.com/talleeknows · TikTok: https://www.tiktok.com/@talleeknows
- Contact: contact@talleeknows.com · PO Box 447, Clinton MD, 20735

## Contact form
- Server Action: `src/app/actions/contact.ts`. It validates input, has a honeypot field (`company`), and sends through the Resend HTTP API.
- Env vars: `RESEND_API_KEY` (required to send), `CONTACT_TO` and `CONTACT_FROM` (optional). Without a key, submissions are only logged on the server.

## Open items / known issues (confirm with client)
- Images are now local (`public/images`, full-size masters in `design-assets/`) and `public/logo.png` exists. The favicon and app icons are generated from the logo mark (`src/app/icon.png`, `apple-icon.png`, `favicon.ico`); `public/og-image.png` is the share image. Have the client approve both.
- **The Privacy Policy is Wix placeholder text, not a real policy**, and the App Store links to it. The **Accessibility Statement** is an unfilled Wix template. Both were mirrored as-is and need real content from the client.
- The Delete Account and Terms pages use a personal Gmail address (`stylelynn@gmail.com`) and template wording ("saved properties, listings"). Kept identical until the client approves changes.
- The Terms page has no section 8 (same as the live site).
- The contact address shows as "Contact @TalleeKnows.com" in the footer, the same as the live site.

## Motion, analytics, env
- Animations are CSS only and live in `globals.css` (`.reveal`, `.reveal-i`, `.hero-in`, `.float`, `.card-lift`, `.marquee`, `.scroll-progress`). They are wrapped in `prefers-reduced-motion` and `@supports`, so content is visible without them. Never put `.reveal` inside a horizontal scroller.
- Analytics: set `NEXT_PUBLIC_GA_ID` (see `.env.example`) to turn on GA4; store-button clicks send a `download_click` event. Add a cookie consent banner before enabling it for EU visitors.
- Each page must set its own title, description and canonical; the layout deliberately does not set `openGraph.title/url`.

## App screenshots and video
- Screenshots live in `public/images/app/` (cropped below the iOS status bar, 720px wide) and are registered in `appScreens` in `src/lib/site.ts`. The demo video is `public/video/tallee-demo.mp4` (silent, 540x932, cropped and trimmed from the client's iOS recording; it stops before the reviews so no reviewer names show). Components: `PhoneShot`, `PhoneRow`, `PhoneVideo`.
- Keep real reviewer names and photos out of screenshots (the venue-map image is cropped above "Reviews" for this reason).
- Open question for the client: screenshots show Google Places venue photos and the Events screen shows UFC and Knicks logos. Confirm these are fine to show publicly.

## SEO landing pages (built)
- Content lives in `src/lib/seo-content.ts` (occasions, categories, cities, city + category). Add or edit a page there; the route, sitemap entry and related links follow automatically. Occasion and vibe names match the app.
- Routes: `/occasion/[slug]`, `/category/[slug]`, `/city/[city]`, `/city/[city]/[category]`. Template: `src/components/SeoLanding.tsx`. Unknown slugs return a real 404 (the pages set `instant = false` instead of wrapping `params` in Suspense, which would cause soft-404s).
- Current pages: 7 occasions, 8 vibes, 6 cities, 14 city + category guides, plus index pages at `/occasion`, `/category` and `/city`. Copy is a first draft for the SEO team to review (neighborhood descriptions especially).
- Only add a city + category page when it has its own specific copy; templated duplicates are thin content.
- There are no venue cards: no venue data source was agreed, and Google Places content can't be stored or copied. If venue lists are added later, fetch them live and show Google attribution.

## Original SEO plan (kept for reference)
- Page types and URL patterns:
  - `/occasion/[slug]` (date-night, girls-and-guys-night-out, birthday, solo…)
  - `/category/[slug]` (rooftop-bars, lounges, brunch, live-music…)
  - `/city/[city]`
  - `/city/[city]/[category]`
  - `/blog/[slug]` later
- Template sections, in order:
  1. H1 and intro, with store buttons
  2. Venue cards (name, area, vibe, short description, photo)
  3. "How Tallee works" (choose a vibe or occasion → AI suggests venues → open directions and go)
  4. App screenshots or video
  5. Tips
  6. FAQs (with FAQPage schema)
  7. Related pages (internal links)
  8. A final download banner
- The pages are **content pages, not app functionality**: no search, login or AI on the web in Phase 1.
- Content should be editable by the SEO team without a developer, through a headless CMS or data files. Still undecided: where venue data comes from (the app's backend API vs. manual entry).
- Use `generateStaticParams` so the pages are prerendered. Start with a small number of high-quality pages, not hundreds of thin ones.
- The SEO team owns the keywords, cities and copy. We own the templates, schema, speed and tracking.

## Commands
```bash
npm install
npm run dev            # http://localhost:3000
npm run lint
npm run build && npm start
```

# Tallee website (Next.js)

Replacement for the Wix site at https://www.talleeknows.com. Phase 1: the current pages rebuilt, with the same URLs, ready for the new SEO pages.

## Run locally

```bash
npm install
npm run dev      # http://localhost:3000
npm run build && npm start   # production check
```

## Pages (same URLs as the Wix site, so no redirects are needed)

| URL | File |
|---|---|
| `/` | `src/app/page.tsx`: hero, Who We Are, FAQ (with FAQ schema), contact form |
| `/english-privacy-policy` | `src/app/english-privacy-policy/page.tsx` |
| `/accessibility-statement` | `src/app/accessibility-statement/page.tsx` |
| `/term-conditions` | `src/app/term-conditions/page.tsx` |
| `/delete-account` | `src/app/delete-account/page.tsx` |
| `/sitemap.xml`, `/robots.txt` | `src/app/sitemap.ts`, `src/app/robots.ts` |

Site settings, store links, social links and image URLs live in `src/lib/site.ts`.

## Contact form

Uses a Server Action (`src/app/actions/contact.ts`). It sends email through [Resend](https://resend.com) when these env vars are set:

```
RESEND_API_KEY=...
CONTACT_TO=contact@talleeknows.com        # optional
CONTACT_FROM="Tallee Website <noreply@talleeknows.com>"   # optional, domain must be verified in Resend
```

Without a key, submissions are only logged on the server.

## Before go-live

1. **Images**: they still load from Wix's CDN (`static.wixstatic.com`). Download them into `public/images/`, update `images` in `src/lib/site.ts`, then remove `images.remotePatterns` from `next.config.ts`. Also add `public/logo.png`, which the Organization schema references, and a favicon.
2. **Content to confirm with the client** (marked `TODO`/`IMPORTANT` in code):
   - The Privacy Policy and Accessibility Statement on the live site are unfilled Wix templates. They need real text. The App Store listing links to the privacy page.
   - The Delete Account and Terms pages use a personal Gmail address and template wording ("saved properties, listings").
   - The Terms page skips section 8.
3. **Deploy** to Vercel (or similar), add the env vars, and test.
4. **Domain switch**: add `talleeknows.com` and `www.talleeknows.com` in the hosting dashboard. Point DNS from Wix to the new host, keeping any existing email (MX) records. Keep `www` as the main domain, the same as now.
5. After the switch: submit `/sitemap.xml` in Google Search Console and check that every old URL returns 200.

## Next (Phase 1 SEO pages)

Add the occasion, category and city page templates under `src/app/`, then list the new routes in `src/app/sitemap.ts`.

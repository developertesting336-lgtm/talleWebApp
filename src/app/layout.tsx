import type { Metadata, Viewport } from "next";
import "@fontsource/cormorant-garamond/400.css";
import "@fontsource/cormorant-garamond/700.css";
import "./globals.css";
import { Analytics } from "@/components/Analytics";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { JsonLd } from "@/components/JsonLd";
import { site } from "@/lib/site";

export const metadata: Metadata = {
  metadataBase: new URL(site.url),
  title: {
    default: site.title,
    template: "%s | Tallee",
  },
  description: site.description,
  applicationName: site.name,
  alternates: { canonical: "/" },
  // Title, description and URL are left out on purpose so each page supplies its
  // own. Setting them here would give every page the home page's share preview.
  openGraph: {
    type: "website",
    siteName: site.name,
    images: [{ url: "/og-image.png", width: 1200, height: 630, alt: "Tallee: Always in the Know" }],
  },
  twitter: {
    card: "summary_large_image",
    images: ["/og-image.png"],
  },
  other: {
    // Smart App Banner on iPhone Safari
    "apple-itunes-app": "app-id=6754320379",
  },
};

export const viewport: Viewport = {
  themeColor: "#000000",
};

const orgJsonLd = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "Organization",
      "@id": `${site.url}/#organization`,
      name: site.name,
      url: site.url,
      logo: `${site.url}/logo.png`,
      sameAs: [site.social.instagram, site.social.tiktok],
    },
    {
      "@type": "WebSite",
      "@id": `${site.url}/#website`,
      name: site.name,
      url: site.url,
      publisher: { "@id": `${site.url}/#organization` },
      description:
        "Tallee is an AI-powered worldwide restaurant, bar, and event recommendation app that helps users find the best places to eat, drink, and experience based on their desired vibe, mood, or occasion.",
    },
    {
      "@type": "MobileApplication",
      "@id": `${site.url}/#app`,
      name: site.name,
      applicationCategory: "LifestyleApplication",
      operatingSystem: "iOS, Android",
      url: site.url,
      description:
        "Tallee helps users discover restaurants, bars, lounges, events, and experiences worldwide using AI-powered recommendations based on vibe, mood, occasion, and desired experience.",
      offers: { "@type": "Offer", price: "0", priceCurrency: "USD" },
      creator: { "@id": `${site.url}/#organization` },
    },
  ],
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html lang="en" className="h-full antialiased">
      <body className="flex min-h-full flex-col">
        <a
          href="#main"
          className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-50 focus:bg-gold focus:px-4 focus:py-2 focus:text-ink"
        >
          Skip to Main Content
        </a>
        <JsonLd data={orgJsonLd} />
        <div aria-hidden="true" className="scroll-progress fixed inset-x-0 top-0 z-[60] h-0.5 bg-gold" />
        <Header />
        <main id="main" className="flex-1">
         {children}
        </main>
        <Footer />
        <Analytics />
      </body>
    </html>
  );
}

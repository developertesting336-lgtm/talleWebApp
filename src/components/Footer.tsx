import Image from "next/image";
import Link from "next/link";
import { exploreLinks, footerLinks, images, site } from "@/lib/site";

function InstagramIcon() {
  return (
    <svg viewBox="0 0 24 24" className="h-3 w-3" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true">
      <rect x="3" y="3" width="18" height="18" rx="5" />
      <circle cx="12" cy="12" r="4" />
      <circle cx="17.5" cy="6.5" r="1" fill="currentColor" stroke="none" />
    </svg>
  );
}

function TikTokIcon() {
  return (
    <svg viewBox="0 0 24 24" className="h-3 w-3" fill="currentColor" aria-hidden="true">
      <path d="M16.6 5.82A4.28 4.28 0 0 1 15.54 3h-3.09v12.4a2.59 2.59 0 1 1-2.59-2.59c.27 0 .53.04.77.12V9.79a5.7 5.7 0 1 0 4.91 5.64V9.01a7.3 7.3 0 0 0 4.27 1.37V7.3a4.28 4.28 0 0 1-3.21-1.48Z" />
    </svg>
  );
}

// Cached at build time; refreshed on every deploy.
async function CopyrightYear() {
  "use cache";
  return <>{new Date().getFullYear()}</>;
}

export function Footer() {
  return (
    <footer className="bg-ink text-[15px] leading-6">
      <div className="grid gap-10 px-6 pt-12 md:grid-cols-[1fr_auto_auto] md:items-start md:gap-x-[14vw] md:pl-[8vw] md:pr-11">
        <Link href="/" aria-label="Tallee home" className="justify-self-center md:justify-self-start">
          <Image src={images.footerLogo} alt="Tallee — Always in the Know" width={800} height={343} className="w-[160px] md:w-[clamp(200px,calc(156px+7.68vw),320px)]" />
        </Link>

        <div className="md:w-[183px]">
          <p>
            <span className="md:block">Contact</span>{" "}
            <a href={`mailto:${site.contactEmail}`} className="hover:text-gold">
              @TalleeKnows.com
            </a>
          </p>
          <address className="mt-4 not-italic">
            {site.address.map((line) => (
              <span key={line} className="block">
                {line}
              </span>
            ))}
          </address>

          <hr className="my-6 border-cream/70 md:mt-12" />

          <div className="flex gap-4 md:pl-0.5">
            <a href={site.social.instagram} target="_blank" rel="noopener noreferrer" aria-label="Tallee on Instagram" className="grid h-[22px] w-[22px] place-items-center rounded-full bg-cream text-ink hover:bg-gold">
              <InstagramIcon />
            </a>
            <a href={site.social.tiktok} target="_blank" rel="noopener noreferrer" aria-label="Tallee on TikTok" className="grid h-[22px] w-[22px] place-items-center rounded-full bg-cream text-ink hover:bg-gold">
              <TikTokIcon />
            </a>
          </div>
        </div>

        <div className="md:pt-1">
          <nav aria-label="Legal">
            <ul>
              {footerLinks.map((l) => (
                <li key={l.href}>
                  <Link href={l.href} className="hover:text-gold">
                    {l.label}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>
          <nav aria-label="Explore" className="mt-6">
            <ul>
              {exploreLinks.map((l) => (
                <li key={l.href}>
                  <Link href={l.href} className="text-gold hover:text-cream">
                    {l.label}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>
        </div>
      </div>

      <p className="px-6 pb-8 pt-10 text-sm md:pl-[31vw] md:pt-24">
        © <CopyrightYear /> by Tallee
      </p>
    </footer>
  );
}

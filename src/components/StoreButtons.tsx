import Image from "next/image";
import { images, site } from "@/lib/site";

// `data-store` makes it easy to track download clicks in GA4 later
// (click event on [data-store]).
export function StoreButtons({ className = "" }: { className?: string }) {
  return (
    <div className={`flex flex-wrap items-center justify-center gap-6 sm:gap-10 ${className}`}>
      <a
        href={site.stores.googlePlay}
        target="_blank"
        rel="noopener noreferrer"
        data-store="google-play"
        aria-label="Get Tallee on Google Play"
        className="transition-transform duration-300 hover:opacity-90 motion-safe:hover:-translate-y-1 motion-safe:hover:scale-[1.04]"
      >
        <Image src={images.googlePlayBadge} alt="Get it on Google Play" width={540} height={160} className="h-[52px] w-auto sm:h-[69px]" />
      </a>
      <a
        href={site.stores.appStore}
        target="_blank"
        rel="noopener noreferrer"
        data-store="app-store"
        aria-label="Download Tallee on the App Store"
        className="transition-transform duration-300 hover:opacity-90 motion-safe:hover:-translate-y-1 motion-safe:hover:scale-[1.04]"
      >
        <Image src={images.appStoreBadge} alt="Download on the App Store" width={540} height={160} className="h-[52px] w-auto sm:h-[69px]" />
      </a>
    </div>
  );
}

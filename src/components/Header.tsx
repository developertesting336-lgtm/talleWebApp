import Image from "next/image";
import Link from "next/link";
import { images } from "@/lib/site";
import { DesktopNav } from "./DesktopNav";
import { MobileMenu } from "./MobileMenu";

export function Header() {
  return (
    <header className="header-line sticky top-0 z-40 bg-ink">
      <div className="relative mx-auto flex h-[120px] max-w-6xl items-center justify-center px-4 sm:px-6 lg:justify-start">
        <Link href="/" aria-label="Tallee home" className="block">
          <Image
            src={images.headerLogo}
            alt="Tallee"
            width={128}
            height={128}
            priority
            className="h-28 w-28 object-cover"
          />
        </Link>
        <DesktopNav />
        <MobileMenu />
      </div>
    </header>
  );
}

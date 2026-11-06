import Image from "next/image";
import { images } from "@/lib/site";

// The gold logo pattern behind a section. The parent needs `relative isolate
// overflow-clip`. `drift` adds a very slow pan and zoom.
export function PatternBackground({ drift = true }: { drift?: boolean }) {
  return (
    <Image
      src={images.pattern}
      alt=""
      fill
      sizes="100vw"
      className={`-z-10 object-cover ${drift ? "pattern-drift" : ""}`}
      aria-hidden="true"
    />
  );
}

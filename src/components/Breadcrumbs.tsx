import Link from "next/link";
import { JsonLd } from "@/components/JsonLd";
import { site } from "@/lib/site";

export type Crumb = { name: string; href?: string };

// Shows the path from Home to the current page. Parents are links and the last
// item (the current page) is plain text. `items` leaves out Home, which is always
// added. The same trail is sent to search engines as BreadcrumbList schema.
export function Breadcrumbs({ items, path, className = "" }: { items: Crumb[]; path: string; className?: string }) {
  const trail: Crumb[] = [{ name: "Home", href: "/" }, ...items];
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: trail.map((c, i) => ({
      "@type": "ListItem",
      position: i + 1,
      name: c.name,
      item: `${site.url}${i === trail.length - 1 ? path : c.href}`,
    })),
  };

  return (
    <nav aria-label="Breadcrumb" className={`text-sm text-cream/70 ${className}`}>
      <JsonLd data={jsonLd} />
      <ol className="flex flex-wrap items-center gap-x-2 gap-y-1">
        {trail.map((c, i) => (
          <li key={c.name} className="flex items-center gap-x-2">
            {i > 0 && <span aria-hidden="true">›</span>}
            {i < trail.length - 1 && c.href ? (
              <Link href={c.href} className="hover:text-gold">
                {c.name}
              </Link>
            ) : (
              <span aria-current="page" className="text-cream">
                {c.name}
              </span>
            )}
          </li>
        ))}
      </ol>
    </nav>
  );
}

import type { ReactNode } from "react";
import { Breadcrumbs } from "@/components/Breadcrumbs";

// `titleSize="sm"` is for the Terms page, whose title is smaller on mobile on Wix.
// `name` and `path` describe the page for the breadcrumb trail above the text.
export function LegalPage({ children, titleSize, name, path }: { children: ReactNode; titleSize?: "sm"; name: string; path: string }) {
  return (
    <>
      <div className="mx-auto max-w-3xl px-5 pt-8 sm:px-6">
        <Breadcrumbs items={[{ name }]} path={path} />
      </div>
      <article data-title={titleSize} className="prose-tallee mx-auto max-w-3xl px-5 pb-14 pt-8 sm:px-6 sm:pb-20 sm:pt-10">
        {children}
      </article>
    </>
  );
}

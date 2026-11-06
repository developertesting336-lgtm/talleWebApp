import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { Breadcrumbs } from "@/components/Breadcrumbs";
import { PatternBackground } from "@/components/PatternBackground";
import { StoreButtons } from "@/components/StoreButtons";
import { blogPosts, blogPublished, findPost, formatDate, postUrl } from "@/lib/blog";

// Every post is prerendered, and unknown slugs return a real 404 (see the SEO pages).
export const instant = false;

export function generateStaticParams() {
  return blogPosts.map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({ params }: PageProps<"/blog/[slug]">): Promise<Metadata> {
  const { slug } = await params;
  const post = findPost(slug);
  if (!post) return {};
  return {
    title: post.title,
    description: post.excerpt,
    alternates: { canonical: postUrl(slug) },
    robots: blogPublished ? undefined : { index: false, follow: false },
  };
}

export default async function BlogPostPage({ params }: PageProps<"/blog/[slug]">) {
  const { slug } = await params;
  const post = findPost(slug);
  if (!post) notFound();
  const more = blogPosts.filter((p) => p.slug !== slug).slice(0, 3);

  return (
    <>
      <section className="relative isolate overflow-clip">
        <PatternBackground />
        <div className="mx-auto flex max-w-3xl flex-col items-center px-5 pb-16 pt-10 text-center sm:px-6 sm:pb-20 sm:pt-12 lg:pb-24">
          <Breadcrumbs items={[{ name: "Blog", href: "/blog" }, { name: post.title }]} path={postUrl(slug)} className="text-center" />
          <p className="mt-8 rounded-full border border-gold/40 px-5 py-1.5 text-xs font-bold uppercase tracking-[0.25em] text-gold">
            {post.category}
          </p>
          <h1 className="mt-6 font-display text-[2.4rem] font-bold leading-[1.05] text-gold sm:text-6xl">{post.title}</h1>
          <p className="mt-6 text-sm text-cream/70">
            By {post.author} · {formatDate(post.date)} · {post.readMinutes} min read
          </p>
        </div>
      </section>

      <article className="section-y mx-auto max-w-3xl px-5 sm:px-6">
        <p className="mb-10 rounded-lg border border-gold/40 bg-gold/10 px-4 py-3 text-sm">
          <strong className="text-gold">Sample post.</strong> This is placeholder content while the blog is being set up.
        </p>
        <div className="space-y-6 text-lg leading-relaxed">
          {post.sections.map((s, i) => (
            <div key={s.heading ?? i} className="space-y-4">
              {s.heading && <h2 className="pt-4 font-display text-3xl font-bold text-cream sm:text-4xl">{s.heading}</h2>}
              {s.paragraphs.map((p) => (
                <p key={p}>{p}</p>
              ))}
            </div>
          ))}
        </div>
      </article>

      <section className="bg-charcoal" aria-labelledby="more-posts">
        <div className="section-y mx-auto max-w-6xl px-5 sm:px-6">
          <h2 id="more-posts" className="font-display text-3xl font-bold text-cream sm:text-4xl">
            More from the blog
          </h2>
          <ul className="mt-8 grid gap-5 md:grid-cols-3">
            {more.map((p) => (
              <li key={p.slug}>
                <Link href={postUrl(p.slug)} className="card-lift flex h-full flex-col rounded-2xl border border-gold/20 p-6 hover:border-gold/70">
                  <span className="text-xs font-bold uppercase tracking-[0.2em] text-gold">{p.category}</span>
                  <span className="mt-2 font-display text-2xl font-bold text-cream">{p.title}</span>
                </Link>
              </li>
            ))}
          </ul>
          <p className="mt-8">
            <Link href="/blog" className="font-bold text-gold hover:text-cream">
              ← All posts
            </Link>
          </p>
        </div>
      </section>

      <section className="relative isolate overflow-clip" aria-labelledby="post-download">
        <PatternBackground />
        <div className="section-y mx-auto flex max-w-4xl flex-col items-center px-5 text-center sm:px-6">
          <h2 id="post-download" className="font-display text-4xl font-bold uppercase leading-tight text-gold sm:text-5xl">
            Ready to find your next favorite spot?
          </h2>
          <p className="mt-6 text-lg">Download Tallee and search “Tallee Knows” in your app store.</p>
          <StoreButtons className="mt-10" />
        </div>
      </section>
    </>
  );
}

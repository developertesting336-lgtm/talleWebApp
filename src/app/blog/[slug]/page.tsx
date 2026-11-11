import type { Metadata } from "next";
import Link from "next/link";
import { BlogPostDetail } from "@/components/BlogPostDetail";
import { Breadcrumbs } from "@/components/Breadcrumbs";
import { HeroEmblem } from "@/components/HeroEmblem";
import { PatternBackground } from "@/components/PatternBackground";
import { ReadyToFindBanner } from "@/components/ReadyToFindBanner";
import { Reveal } from "@/components/Reveal";
import { ScrollZoomHero } from "@/components/ScrollZoomHero";
import { blogPosts, blogPublished, findPost, formatDate, postUrl } from "@/lib/blog";

// Known sample slugs are prerendered, and dynamic backend post IDs render cleanly.
export const instant = false;

export function generateStaticParams() {
  return blogPosts.map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({ params }: PageProps<"/blog/[slug]">): Promise<Metadata> {
  const { slug } = await params;
  const post = findPost(slug);
  if (!post) {
    return {
      title: "Blog Post",
      description: "Read stories, guides, and venue tips from the Tallee community.",
      alternates: { canonical: postUrl(slug) },
      robots: blogPublished ? undefined : { index: false, follow: false },
    };
  }
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

  if (!post) {
    return (
      <>
        <BlogPostDetail id={slug} />
        <ReadyToFindBanner id="post-download" />
      </>
    );
  }

  const more = blogPosts.filter((p) => p.slug !== slug).slice(0, 3);

  return (
    <>
      <ScrollZoomHero compact background={<PatternBackground />} emblem={<HeroEmblem />} contentClassName="max-w-3xl">
        <div className="hero-in flex justify-center">
          <Breadcrumbs items={[{ name: "Blog", href: "/blog" }, { name: post.title }]} path={postUrl(slug)} className="text-center" />
        </div>
        <p
          className="hero-in mt-8 rounded-full border border-gold/40 bg-[rgba(0,0,0,0.67)] px-5 py-1.5 text-xs font-bold uppercase tracking-[0.25em] text-gold shadow-[0_2px_12px_rgba(0,0,0,0.7)] backdrop-blur-sm"
          style={{ textShadow: "0 1px 3px rgba(0, 0, 0, 1)" }}
        >
          {post.category}
        </p>
        <h1 className="hero-in mt-6 font-display text-[2.4rem] font-bold leading-[1.05] text-gold sm:text-6xl">{post.title}</h1>
        <div
          className="hero-in relative mt-6 max-w-xl px-6 py-3 text-sm text-[#F6EFDF]"
          style={{ textShadow: "0 1px 3px rgba(0, 0, 0, 1)" }}
        >
          {/* Feathered dark text scrim vignette */}
          <div
            aria-hidden="true"
            className="pointer-events-none absolute inset-0 -z-10 rounded-[12px] bg-[rgba(0,0,0,0.67)] blur-[8px]"
          />
          <p>
            By {post.author} · {formatDate(post.date)} · {post.readMinutes} min read
          </p>
        </div>
      </ScrollZoomHero>

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
            {more.map((p, i) => (
              <Reveal as="li" key={p.slug} variant="card" delay={i * 60}>
                <Link href={postUrl(p.slug)} className="card-lift flex h-full flex-col rounded-2xl border border-gold/20 p-6 hover:border-gold/70">
                  <span className="text-xs font-bold uppercase tracking-[0.2em] text-gold">{p.category}</span>
                  <span className="mt-2 font-display text-2xl font-bold text-cream">{p.title}</span>
                </Link>
              </Reveal>
            ))}
          </ul>
          <p className="mt-8">
            <Link href="/blog" className="font-bold text-gold hover:text-cream">
              ← All posts
            </Link>
          </p>
        </div>
      </section>

      <ReadyToFindBanner id="post-download" />
    </>
  );
}

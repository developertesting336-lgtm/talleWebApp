import type { Metadata } from "next";
import Link from "next/link";
import type { CSSProperties } from "react";
import { BlogComposer } from "@/components/BlogComposer";
import { Breadcrumbs } from "@/components/Breadcrumbs";
import { PatternBackground } from "@/components/PatternBackground";
import { StoreButtons } from "@/components/StoreButtons";
import { ScrollZoomHero } from "@/components/ScrollZoomHero";
import { HeroEmblem } from "@/components/HeroEmblem";
import { blogPosts, blogPublished, formatDate, postUrl, type BlogPost } from "@/lib/blog";

export const metadata: Metadata = {
  title: "Tallee Blog",
  description: "Guides, tips and news for finding the right bar, restaurant or event for your vibe, mood and occasion.",
  alternates: { canonical: "/blog" },
  // Sample posts should not be indexed. Set `blogPublished` in src/lib/blog.ts when real posts are in.
  robots: blogPublished ? undefined : { index: false, follow: false },
};

const step = (n: number) => ({ "--i": n }) as CSSProperties;

function PostMeta({ post }: { post: BlogPost }) {
  return (
    <p className="text-sm text-cream/70">
      {formatDate(post.date)} · {post.readMinutes} min read
    </p>
  );
}

function PostCard({ post, index }: { post: BlogPost; index: number }) {
  return (
    <li className="reveal-i" style={step(index % 3)}>
      <Link
        href={postUrl(post.slug)}
        className="card-lift group flex h-full flex-col rounded-2xl border border-gold/20 bg-gradient-to-b from-white/[0.05] to-transparent p-7 hover:border-gold/70"
      >
        <span className="text-xs font-bold uppercase tracking-[0.2em] text-gold">{post.category}</span>
        <span className="mt-3 font-display text-3xl font-bold leading-tight text-cream">{post.title}</span>
        <span className="mt-3 flex-1 leading-relaxed">{post.excerpt}</span>
        <span className="mt-6 flex items-center justify-between">
          <PostMeta post={post} />
          <span className="font-bold text-gold" aria-hidden="true">
            Read{" "}
            <span className="inline-block transition-transform duration-300 group-hover:translate-x-1.5">→</span>
          </span>
        </span>
      </Link>
    </li>
  );
}

export default function BlogPage() {
  const [featured, ...rest] = blogPosts;

  return (
    <>
      <ScrollZoomHero
        compact
        background={<PatternBackground />}
        emblem={<HeroEmblem />}
        contentClassName="max-w-4xl"
      >
        <div className="hero-in flex justify-center">
          <Breadcrumbs items={[{ name: "Blog" }]} path="/blog" />
        </div>
        <p className="hero-in mt-8 rounded-full border border-gold/40 px-5 py-1.5 text-xs font-bold uppercase tracking-[0.25em] text-gold">
          The Tallee Blog
        </p>
        <h1 className="hero-in mt-6 font-display text-[2.5rem] font-bold uppercase leading-[1.05] text-gold sm:text-6xl lg:text-7xl" style={{ "--d": 1 } as CSSProperties}>
          Ideas for your next night out
        </h1>
        <div
          className="hero-in relative mt-8 max-w-2xl px-8 py-6 sm:px-10 text-lg leading-relaxed text-[#F6EFDF]"
          style={{
            "--d": 2,
            textShadow: "0 1px 3px rgba(0, 0, 0, 1)",
          } as CSSProperties}
        >
          {/* Feathered dark text scrim vignette */}
          <div
            aria-hidden="true"
            className="pointer-events-none absolute inset-0 -z-10 rounded-[16px] bg-[rgba(0,0,0,0.67)] blur-[10px]"
          />
          <p>
            Guides, tips and news from the team behind Tallee. These are sample posts while the blog is being set up.
          </p>
        </div>
      </ScrollZoomHero>

      <section aria-labelledby="latest" className="bg-ink">
        <div className="mx-auto max-w-6xl px-5 pb-16 pt-4 sm:px-6 sm:pb-20 lg:pb-24">
          <h2 id="latest" className="reveal mb-10 border-b border-gold/30 pb-4 font-display text-3xl font-bold text-cream sm:text-4xl">
            Latest posts
          </h2>

          <Link
            href={postUrl(featured.slug)}
            className="card-lift reveal group mb-5 grid gap-6 rounded-2xl border border-gold/30 bg-gradient-to-br from-gold/[0.12] to-transparent p-7 hover:border-gold/70 sm:p-10 lg:grid-cols-[1fr_auto] lg:items-end"
          >
            <span>
              <span className="text-xs font-bold uppercase tracking-[0.2em] text-gold">Featured · {featured.category}</span>
              <span className="mt-4 block font-display text-4xl font-bold leading-tight text-cream sm:text-5xl">{featured.title}</span>
              <span className="mt-4 block max-w-2xl text-lg leading-relaxed">{featured.excerpt}</span>
              <span className="mt-6 block">
                <PostMeta post={featured} />
              </span>
            </span>
            <span className="font-bold text-gold" aria-hidden="true">
              Read the post <span className="inline-block transition-transform duration-300 group-hover:translate-x-1.5">→</span>
            </span>
          </Link>

          <ul className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {rest.map((post, i) => (
              <PostCard key={post.slug} post={post} index={i} />
            ))}
          </ul>
        </div>
      </section>

      <section id="post-a-blog" aria-labelledby="post-heading" className="relative isolate overflow-clip bg-charcoal">
        <div
          aria-hidden="true"
          className="glow-pulse absolute inset-0 -z-10 bg-[radial-gradient(ellipse_at_top_left,rgba(223,179,96,0.14),transparent_60%)]"
        />
        <div className="section-y mx-auto grid max-w-6xl gap-12 px-5 sm:px-6 lg:grid-cols-[5fr_7fr] lg:items-center lg:gap-16">
          <div className="reveal">
            <p className="font-display text-xl font-bold uppercase tracking-widest text-gold">Share your story</p>
            <h2 id="post-heading" className="mt-2 font-display text-5xl font-bold text-cream sm:text-6xl">
              Post a blog
            </h2>
            <span aria-hidden="true" className="line-grow mt-5 block h-px w-16 bg-gold" />
            <p className="mt-6 max-w-md text-lg leading-relaxed">
              Have a favorite spot, a night out worth telling, or a tip other people would like? Soon you will be able to write it up
              here and share it with the Tallee community.
            </p>
          </div>
          <div className="reveal">
            <BlogComposer />
          </div>
        </div>
      </section>

      <section className="relative isolate overflow-clip" aria-labelledby="blog-download">
        <PatternBackground />
        <div className="section-y reveal mx-auto flex max-w-4xl flex-col items-center px-5 text-center sm:px-6">
          <h2 id="blog-download" className="font-display text-4xl font-bold uppercase leading-tight text-gold sm:text-5xl">
            Ready to find your next favorite spot?
          </h2>
          <p className="mt-6 text-lg">Download Tallee and search “Tallee Knows” in your app store.</p>
          <StoreButtons className="mt-10" />
        </div>
      </section>
    </>
  );
}

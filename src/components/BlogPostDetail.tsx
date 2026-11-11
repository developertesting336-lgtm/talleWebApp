"use client";

import Link from "next/link";
import { useCallback, useEffect, useState } from "react";
import { Breadcrumbs } from "@/components/Breadcrumbs";
import { HeroEmblem } from "@/components/HeroEmblem";
import { PatternBackground } from "@/components/PatternBackground";
import { Reveal } from "@/components/Reveal";
import { ScrollZoomHero } from "@/components/ScrollZoomHero";
import { formatDate, postUrl } from "@/lib/blog";
import {
  estimateReadMinutes,
  fetchBlogById,
  getApiErrorMessage,
  isHtmlContent,
  splitParagraphs,
  type ApiBlogPost,
} from "@/lib/blog-api";
import { sanitizeBlogHtml } from "@/lib/sanitize-html";

export function BlogPostDetail({ id }: { id: string }) {
  const [post, setPost] = useState<ApiBlogPost | null>(null);
  const [related, setRelated] = useState<ApiBlogPost[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const loadPost = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      const result = await fetchBlogById(id);
      setPost(result.post);
      setRelated(result.related);
    } catch (err) {
      setError(getApiErrorMessage(err, "Unable to load this blog post right now."));
    } finally {
      setLoading(false);
    }
  }, [id]);

  useEffect(() => {
    let cancelled = false;
    fetchBlogById(id)
      .then((result) => {
        if (cancelled) return;
        setPost(result.post);
        setRelated(result.related);
        setError(null);
      })
      .catch((err) => {
        if (!cancelled) {
          setError(getApiErrorMessage(err, "Unable to load this blog post right now."));
        }
      })
      .finally(() => {
        if (!cancelled) setLoading(false);
      });
    return () => {
      cancelled = true;
    };
  }, [id]);

  if (loading) {
    return (
      <>
        <ScrollZoomHero compact background={<PatternBackground />} emblem={<HeroEmblem />} contentClassName="max-w-3xl">
          <div className="h-6 w-40 animate-pulse rounded-full bg-gold/20" />
          <div className="mt-8 h-14 w-full max-w-xl animate-pulse rounded-xl bg-white/10" />
          <div className="mt-6 h-8 w-56 animate-pulse rounded-lg bg-white/10" />
        </ScrollZoomHero>
        <div className="section-y mx-auto max-w-3xl space-y-4 px-5 sm:px-6" aria-busy="true">
          <div className="h-5 w-full animate-pulse rounded bg-white/10" />
          <div className="h-5 w-11/12 animate-pulse rounded bg-white/10" />
          <div className="h-5 w-4/5 animate-pulse rounded bg-white/10" />
        </div>
      </>
    );
  }

  if (error) {
    return (
      <section className="relative isolate overflow-clip">
        <PatternBackground />
        <div className="mx-auto flex min-h-[60vh] max-w-3xl flex-col items-center justify-center px-5 py-20 text-center sm:px-6">
          <p className="font-display text-lg font-bold uppercase tracking-[0.3em] text-gold">Tallee Blog</p>
          <h1 className="mt-4 font-display text-4xl font-bold text-cream sm:text-5xl">Unable to load post</h1>
          <p role="alert" className="mt-4 text-red-200">
            {error}
          </p>
          <div className="mt-8 flex flex-wrap justify-center gap-4">
            <button
              type="button"
              onClick={() => void loadPost()}
              className="rounded-full bg-gold px-7 py-3 font-bold text-ink transition-colors hover:bg-cream"
            >
              Try again
            </button>
            <Link
              href="/blog"
              className="rounded-full border border-gold/50 px-7 py-3 font-bold text-cream transition-colors hover:border-gold hover:text-gold"
            >
              ← All posts
            </Link>
          </div>
        </div>
      </section>
    );
  }

  if (!post) {
    return (
      <section className="relative isolate overflow-clip">
        <PatternBackground />
        <div className="mx-auto flex min-h-[60vh] max-w-3xl flex-col items-center justify-center px-5 py-20 text-center sm:px-6">
          <p className="font-display text-lg font-bold uppercase tracking-[0.3em] text-gold">Tallee Blog</p>
          <h1 className="mt-4 font-display text-4xl font-bold uppercase text-gold sm:text-6xl">Post not found</h1>
          <p className="mt-4 text-lg text-cream/80">This post may have been removed or is not available.</p>
          <Link href="/blog" className="mt-8 rounded-full bg-gold px-7 py-3 font-bold text-ink transition-colors hover:bg-cream">
            ← Back to all posts
          </Link>
        </div>
      </section>
    );
  }

  const hasHtml = isHtmlContent(post.blogPost);
  const safeHtml = hasHtml ? sanitizeBlogHtml(post.blogPost) : "";
  const paragraphs = hasHtml ? [] : splitParagraphs(post.blogPost);
  const readMinutes = estimateReadMinutes(post.blogPost);

  return (
    <>
      <ScrollZoomHero compact background={<PatternBackground />} emblem={<HeroEmblem />} contentClassName="max-w-3xl">
        <div className="hero-in flex justify-center">
          <Breadcrumbs items={[{ name: "Blog", href: "/blog" }, { name: post.title }]} path={postUrl(id)} className="text-center" />
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
          <div
            aria-hidden="true"
            className="pointer-events-none absolute inset-0 -z-10 rounded-[12px] bg-[rgba(0,0,0,0.67)] blur-[8px]"
          />
          <p>
            By {post.userName} · {formatDate(post.createdAt)} · {readMinutes} min read
          </p>
        </div>
      </ScrollZoomHero>

      <article className="section-y mx-auto max-w-3xl px-5 sm:px-6">
        {hasHtml ? (
          <div className="tallee-prose text-lg" dangerouslySetInnerHTML={{ __html: safeHtml }} />
        ) : (
          <div className="tallee-prose text-lg">
            {paragraphs.map((p, idx) => (
              <p key={idx}>{p}</p>
            ))}
          </div>
        )}
      </article>

      {related.length > 0 && (
        <section className="bg-charcoal" aria-labelledby="more-posts">
          <div className="section-y mx-auto max-w-6xl px-5 sm:px-6">
            <h2 id="more-posts" className="font-display text-3xl font-bold text-cream sm:text-4xl">
              More from the blog
            </h2>
            <ul className="mt-8 grid gap-5 md:grid-cols-3">
              {related.map((p, i) => (
                <Reveal as="li" key={p._id} variant="card" delay={i * 60}>
                  <Link href={postUrl(p._id)} className="card-lift flex h-full flex-col rounded-2xl border border-gold/20 p-6 hover:border-gold/70">
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
      )}

      {related.length === 0 && (
        <div className="mx-auto max-w-3xl px-5 pb-12 sm:px-6">
          <Link href="/blog" className="font-bold text-gold hover:text-cream">
            ← All posts
          </Link>
        </div>
      )}
    </>
  );
}

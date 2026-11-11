"use client";

import Link from "next/link";
import { useCallback, useEffect, useState } from "react";
import { BlogComposer } from "@/components/BlogComposer";
import { Reveal } from "@/components/Reveal";
import { formatDate, postUrl } from "@/lib/blog";
import {
  buildExcerpt,
  estimateReadMinutes,
  fetchBlogs,
  filterApprovedBlogs,
  getApiErrorMessage,
  type ApiBlogPost,
} from "@/lib/blog-api";

function PostMeta({ post }: { post: ApiBlogPost }) {
  const minutes = estimateReadMinutes(post.blogPost);
  return (
    <p className="text-sm text-cream/70">
      By {post.userName} · {formatDate(post.createdAt)} · {minutes} min read
    </p>
  );
}

function LoadingSkeleton() {
  return (
    <div aria-busy="true" aria-label="Loading blog posts">
      <div className="mb-5 h-56 animate-pulse rounded-2xl border border-gold/20 bg-white/[0.04]" />
      <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
        {[0, 1, 2].map((i) => (
          <div key={i} className="h-64 animate-pulse rounded-2xl border border-gold/15 bg-white/[0.03]" />
        ))}
      </div>
    </div>
  );
}

export function BlogSection() {
  const [blogs, setBlogs] = useState<ApiBlogPost[]>([]);
  const [page, setPage] = useState(1);
  const [pages, setPages] = useState(1);
  const [total, setTotal] = useState(0);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const applyResponse = useCallback((res: Awaited<ReturnType<typeof fetchBlogs>>, fallbackPage: number) => {
    const approved = filterApprovedBlogs(res.blogs);
    setBlogs(approved);
    setPage(res.page || fallbackPage);
    setPages(res.pages || 1);
    setTotal(res.total ?? approved.length);
  }, []);

  const loadBlogs = useCallback(
    async (targetPage: number) => {
      setLoading(true);
      setError(null);
      try {
        const res = await fetchBlogs(targetPage);
        applyResponse(res, targetPage);
      } catch (err) {
        setError(getApiErrorMessage(err, "Unable to load blog posts right now."));
      } finally {
        setLoading(false);
      }
    },
    [applyResponse],
  );

  useEffect(() => {
    let cancelled = false;
    fetchBlogs(1)
      .then((res) => {
        if (cancelled) return;
        applyResponse(res, 1);
        setError(null);
      })
      .catch((err) => {
        if (!cancelled) {
          setError(getApiErrorMessage(err, "Unable to load blog posts right now."));
        }
      })
      .finally(() => {
        if (!cancelled) setLoading(false);
      });
    return () => {
      cancelled = true;
    };
  }, [applyResponse]);

  const featured = page === 1 ? blogs[0] : undefined;
  const gridPosts = page === 1 ? blogs.slice(1) : blogs;

  return (
    <>
      <section aria-labelledby="latest" className="bg-ink">
        <div className="mx-auto max-w-6xl px-5 pb-16 pt-4 sm:px-6 sm:pb-20 lg:pb-24">
          <div className="mb-10 flex flex-wrap items-end justify-between gap-4 border-b border-gold/30 pb-4">
            <Reveal as="h2" id="latest" variant="blur" delay={60} className="font-display text-3xl font-bold text-cream sm:text-4xl">
              Latest posts
            </Reveal>
            {!loading && !error && (
              <p className="text-sm text-cream/70">
                {total} {total === 1 ? "post" : "posts"}
              </p>
            )}
          </div>

          {loading ? (
            <LoadingSkeleton />
          ) : error ? (
            <div role="alert" className="rounded-2xl border border-red-400/40 bg-red-500/10 p-6 text-center sm:p-10">
              <p className="text-base text-red-200">{error}</p>
              <button
                type="button"
                onClick={() => void loadBlogs(page)}
                className="mt-5 inline-flex items-center justify-center rounded-full border border-gold px-6 py-2.5 text-sm font-bold text-gold transition-colors hover:bg-gold hover:text-ink"
              >
                Try again
              </button>
            </div>
          ) : blogs.length === 0 ? (
            <div className="rounded-2xl border border-gold/25 bg-white/[0.03] p-8 text-center sm:p-12">
              <p className="font-display text-3xl font-bold text-cream">No blog posts yet</p>
              <p className="mt-3 text-cream/80">Be the first to share your favorite spot or tip below.</p>
              <a
                href="#post-a-blog"
                className="mt-6 inline-flex items-center justify-center rounded-full bg-gold px-7 py-3 text-sm font-bold text-ink transition-colors hover:bg-cream"
              >
                Write a post
              </a>
            </div>
          ) : (
            <>
              {featured && (
                <Reveal variant="card" delay={80}>
                  <Link
                    href={postUrl(featured._id)}
                    className="card-lift group mb-5 grid gap-6 rounded-2xl border border-gold/30 bg-gradient-to-br from-gold/[0.12] to-transparent p-7 hover:border-gold/70 sm:p-10 lg:grid-cols-[1fr_auto] lg:items-end"
                  >
                    <span>
                      <span className="text-xs font-bold uppercase tracking-[0.2em] text-gold">
                        Featured · {featured.category}
                      </span>
                      <span className="mt-4 block font-display text-4xl font-bold leading-tight text-cream sm:text-5xl">
                        {featured.title}
                      </span>
                      <span className="mt-4 block max-w-2xl text-lg leading-relaxed">
                        {buildExcerpt(featured.blogPost)}
                      </span>
                      <span className="mt-6 block">
                        <PostMeta post={featured} />
                      </span>
                    </span>
                    <span className="font-bold text-gold" aria-hidden="true">
                      Read the post{" "}
                      <span className="inline-block transition-transform duration-300 group-hover:translate-x-1.5">→</span>
                    </span>
                  </Link>
                </Reveal>
              )}

              {gridPosts.length > 0 && (
                <ul className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
                  {gridPosts.map((post, i) => (
                    <Reveal as="li" key={post._id} variant="card" delay={(i % 3) * 60}>
                      <Link
                        href={postUrl(post._id)}
                        className="card-lift group flex h-full flex-col rounded-2xl border border-gold/20 bg-gradient-to-b from-white/[0.05] to-transparent p-7 hover:border-gold/70"
                      >
                        <span className="text-xs font-bold uppercase tracking-[0.2em] text-gold">{post.category}</span>
                        <span className="mt-3 font-display text-3xl font-bold leading-tight text-cream">{post.title}</span>
                        <span className="mt-3 flex-1 leading-relaxed">{buildExcerpt(post.blogPost)}</span>
                        <span className="mt-6 flex items-center justify-between gap-3">
                          <PostMeta post={post} />
                          <span className="shrink-0 font-bold text-gold" aria-hidden="true">
                            Read{" "}
                            <span className="inline-block transition-transform duration-300 group-hover:translate-x-1.5">→</span>
                          </span>
                        </span>
                      </Link>
                    </Reveal>
                  ))}
                </ul>
              )}

              {pages > 1 && (
                <nav aria-label="Blog pagination" className="mt-12 flex items-center justify-center gap-4">
                  <button
                    type="button"
                    disabled={page <= 1}
                    onClick={() => void loadBlogs(page - 1)}
                    className="rounded-full border border-gold/40 px-5 py-2 text-sm font-bold text-cream transition-colors hover:border-gold hover:text-gold disabled:cursor-not-allowed disabled:opacity-40"
                  >
                    ← Previous
                  </button>
                  <span className="text-sm text-cream/80">
                    Page {page} of {pages}
                  </span>
                  <button
                    type="button"
                    disabled={page >= pages}
                    onClick={() => void loadBlogs(page + 1)}
                    className="rounded-full border border-gold/40 px-5 py-2 text-sm font-bold text-cream transition-colors hover:border-gold hover:text-gold disabled:cursor-not-allowed disabled:opacity-40"
                  >
                    Next →
                  </button>
                </nav>
              )}
            </>
          )}
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
              Have a favorite spot, a night out worth telling, or a tip other people would like? Write it up here and share it with
              the Tallee community.
            </p>
          </div>
          <div className="reveal">
            <BlogComposer
              onPostCreated={() => {
                void loadBlogs(1);
              }}
            />
          </div>
        </div>
      </section>
    </>
  );
}

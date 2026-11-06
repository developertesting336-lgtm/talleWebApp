import { blogCategories } from "@/lib/blog";

const field =
  "mt-2 w-full rounded-lg border border-cream/20 bg-white/[0.04] px-4 py-3 text-cream placeholder:text-cream/40 disabled:cursor-not-allowed disabled:opacity-60";
const label = "text-sm font-bold tracking-wide text-cream";

// The look of the "post a blog" form. It is switched off on purpose: posting
// needs accounts and a backend, which arrive with the Phase 2 web app. When that
// is built, remove `disabled` and connect the form to a Server Action.
export function BlogComposer() {
  return (
    <div className="rounded-2xl border border-gold/30 bg-ink p-6 shadow-[0_20px_60px_rgba(0,0,0,0.5)] sm:p-10">
      <p role="note" className="mb-8 rounded-lg border border-gold/40 bg-gold/10 px-4 py-3 text-sm leading-relaxed">
        <strong className="text-gold">Coming soon.</strong> Posting opens when the Tallee web app launches. This form is a preview and
        does not send anything yet.
      </p>

      <form className="grid gap-6 sm:grid-cols-2" aria-label="Post a blog (coming soon)">
        <fieldset disabled className="contents">
          <div>
            <label htmlFor="bp-name" className={label}>
              Your name
            </label>
            <input id="bp-name" placeholder="How you want to be credited" className={field} />
          </div>

          <div>
            <label htmlFor="bp-category" className={label}>
              Category
            </label>
            <select id="bp-category" defaultValue="" className={field}>
              <option value="" disabled>
                Choose a category
              </option>
              {blogCategories.map((c) => (
                <option key={c}>{c}</option>
              ))}
            </select>
          </div>

          <div className="sm:col-span-2">
            <label htmlFor="bp-title" className={label}>
              Title
            </label>
            <input id="bp-title" placeholder="Give your post a title" className={field} />
          </div>

          <div className="sm:col-span-2">
            <label htmlFor="bp-body" className={label}>
              Your post
            </label>
            <textarea
              id="bp-body"
              rows={7}
              placeholder="Share your tips, favorite spots or a night out worth telling."
              className={`${field} resize-y`}
            />
          </div>

          <div className="sm:col-span-2">
            <button
              type="submit"
              className="inline-flex w-full cursor-not-allowed items-center justify-center rounded-full bg-gold px-9 py-3.5 font-bold text-ink opacity-50 sm:w-auto"
            >
              Post blog
            </button>
          </div>
        </fieldset>
      </form>
    </div>
  );
}

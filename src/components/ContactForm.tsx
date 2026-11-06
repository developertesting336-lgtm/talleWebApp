"use client";

import { useActionState } from "react";
import { submitContact, type ContactState } from "@/app/actions/contact";

const initial: ContactState = { status: "idle" };

const field =
  "mt-2 w-full rounded-lg border border-cream/20 bg-white/[0.04] px-4 py-3 text-cream placeholder:text-cream/40 transition-colors hover:border-cream/40 focus:border-gold focus:outline-none focus:ring-2 focus:ring-gold/30 aria-[invalid=true]:border-red-400";
const label = "text-sm font-bold tracking-wide text-cream";
const error = "mt-2 block text-sm text-red-300";

export function ContactForm() {
  const [state, action, pending] = useActionState(submitContact, initial);

  if (state.status === "success") {
    return (
      <div role="status" className="flex flex-col items-center py-12 text-center">
        <span className="grid h-16 w-16 place-items-center rounded-full border border-gold/60 text-gold">
          <svg viewBox="0 0 24 24" aria-hidden="true" className="h-8 w-8" fill="none" stroke="currentColor" strokeWidth="2">
            <path d="M5 12.5l4.5 4.5L19 7.5" />
          </svg>
        </span>
        <p className="mt-6 font-display text-3xl font-bold text-gold">{state.message}</p>
        <p className="mt-3 max-w-xs leading-relaxed text-cream/80">
          We’ll reply to the email address you gave us.
        </p>
      </div>
    );
  }

  return (
    <form action={action} className="grid gap-6 sm:grid-cols-2" noValidate>
      {/* honeypot */}
      <input type="text" name="company" tabIndex={-1} autoComplete="off" className="hidden" aria-hidden="true" />

      <div>
        <label htmlFor="cf-first" className={label}>
          First name <span className="text-gold">*</span>
        </label>
        <input
          id="cf-first"
          name="firstName"
          required
          autoComplete="given-name"
          placeholder="Your first name"
          className={field}
          aria-invalid={!!state.fieldErrors?.firstName}
          aria-describedby={state.fieldErrors?.firstName ? "cf-first-error" : undefined}
        />
        {state.fieldErrors?.firstName && (
          <span id="cf-first-error" className={error}>
            {state.fieldErrors.firstName}
          </span>
        )}
      </div>

      <div>
        <label htmlFor="cf-last" className={label}>
          Last name
        </label>
        <input
          id="cf-last"
          name="lastName"
          autoComplete="family-name"
          placeholder="Your last name"
          className={field}
        />
      </div>

      <div className="sm:col-span-2">
        <label htmlFor="cf-email" className={label}>
          Email <span className="text-gold">*</span>
        </label>
        <input
          id="cf-email"
          name="email"
          type="email"
          required
          autoComplete="email"
          placeholder="you@example.com"
          className={field}
          aria-invalid={!!state.fieldErrors?.email}
          aria-describedby={state.fieldErrors?.email ? "cf-email-error" : undefined}
        />
        {state.fieldErrors?.email && (
          <span id="cf-email-error" className={error}>
            {state.fieldErrors.email}
          </span>
        )}
      </div>

      <div className="sm:col-span-2">
        <label htmlFor="cf-message" className={label}>
          Message
        </label>
        <textarea
          id="cf-message"
          name="message"
          rows={5}
          placeholder="How can we help?"
          className={`${field} resize-y`}
        />
      </div>

      {state.status === "error" && state.message && (
        <p role="alert" className="text-sm text-red-300 sm:col-span-2">
          {state.message}
        </p>
      )}

      <div className="sm:col-span-2">
        <button
          type="submit"
          disabled={pending}
          className="group inline-flex w-full items-center justify-center gap-2 rounded-full bg-gold px-9 py-3.5 font-bold text-ink transition-all duration-300 hover:bg-cream focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-gold disabled:opacity-60 sm:w-auto motion-safe:hover:-translate-y-0.5"
        >
          {pending ? "Sending…" : "Send message"}
          {!pending && (
            <span aria-hidden="true" className="transition-transform duration-300 group-hover:translate-x-1">
              →
            </span>
          )}
        </button>
      </div>
    </form>
  );
}
"use server";

import { site } from "@/lib/site";

export type ContactState = {
  status: "idle" | "success" | "error";
  message?: string;
  fieldErrors?: Partial<Record<"firstName" | "email", string>>;
};

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

function clean(v: FormDataEntryValue | null, max: number) {
  return String(v ?? "").trim().slice(0, max);
}

function escapeHtml(s: string) {
  return s.replace(/[&<>"']/g, (c) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" })[c]!);
}

/**
 * Handles the "Contact us" form.
 * Sends an email through Resend when RESEND_API_KEY is set
 * (CONTACT_TO / CONTACT_FROM are optional overrides). Without a key the
 * message is logged on the server so the form still works in development.
 */
export async function submitContact(_prev: ContactState, formData: FormData): Promise<ContactState> {
  // Honeypot field — real visitors never fill it.
  if (clean(formData.get("company"), 200)) return { status: "success", message: "Thanks for submitting!" };

  const firstName = clean(formData.get("firstName"), 100);
  const lastName = clean(formData.get("lastName"), 100);
  const email = clean(formData.get("email"), 200);
  const message = clean(formData.get("message"), 5000);

  const fieldErrors: ContactState["fieldErrors"] = {};
  if (!firstName) fieldErrors.firstName = "Please enter your first name.";
  if (!EMAIL_RE.test(email)) fieldErrors.email = "Please enter a valid email.";
  if (Object.keys(fieldErrors).length) return { status: "error", fieldErrors };

  const apiKey = process.env.RESEND_API_KEY;
  if (!apiKey) {
    console.info("[contact] RESEND_API_KEY not set — submission:", { firstName, lastName, email, message });
    return { status: "success", message: "Thanks for submitting!" };
  }

  const res = await fetch("https://api.resend.com/emails", {
    method: "POST",
    headers: { Authorization: `Bearer ${apiKey}`, "Content-Type": "application/json" },
    body: JSON.stringify({
      from: process.env.CONTACT_FROM ?? "Tallee Website <noreply@talleeknows.com>",
      to: [process.env.CONTACT_TO ?? site.contactEmail],
      reply_to: email,
      subject: `New contact form message from ${firstName} ${lastName}`.trim(),
      html: `<p><b>Name:</b> ${escapeHtml(`${firstName} ${lastName}`)}</p>
             <p><b>Email:</b> ${escapeHtml(email)}</p>
             <p><b>Message:</b><br>${escapeHtml(message).replace(/\n/g, "<br>")}</p>`,
    }),
  });

  if (!res.ok) {
    console.error("[contact] Resend error", res.status, await res.text());
    return { status: "error", message: "Something went wrong. Please try again or email us directly." };
  }
  return { status: "success", message: "Thanks for submitting!" };
}

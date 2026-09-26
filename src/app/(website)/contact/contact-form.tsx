"use client";

import { useState, type FormEvent } from "react";
import { z } from "zod";
import { ArrowUpRight } from "lucide-react";
import apiUtil from "@/utils/api";
import { ApiContactEnquiry } from "@/utils/api.constant";
import { CONTACT, toTelHref, toWhatsAppHref } from "@/utils/constants";

/**
 * The enquiry form is a Client Component because it holds validation, loading
 * and success state. Next.js resolves `metadata` on the server before render,
 * so a `'use client'` page cannot export it — page.tsx stays a Server
 * Component and the interactive part lives here. Same split as
 * (auth)/login/LoginForm.tsx.
 */

const schema = z.object({
  name: z.string().trim().min(1, "Please enter your name").max(100),
  email: z.string().trim().email("Please enter a valid email address").max(255),
  phone: z.string().trim().max(30, "That phone number looks too long").optional().or(z.literal("")),
  businessType: z.string().trim().max(80).optional().or(z.literal("")),
  message: z
    .string()
    .trim()
    .min(1, "Please tell us how we can help")
    .max(2000, "Please keep this under 2000 characters"),
  companyWebsite: z.string().max(200).optional().or(z.literal("")),
});

const FIELD_CLASS =
  "mt-2 w-full rounded-xl bg-surface px-4 py-3 text-sm outline-none ring-1 ring-line transition-shadow focus:ring-2 focus:ring-brass";
const LABEL_CLASS = "font-mono text-[11px] uppercase tracking-[0.2em] text-muted-foreground";

const WHATSAPP_MESSAGE = "Hello Fyncho, I would like to know more.";

const BUSINESS_TYPES = [
  "Hair salon",
  "Barbershop",
  "Spa or wellness",
  "Nail studio",
  "Beauty / makeup",
  "Multi-location group",
  "Something else",
];

export function ContactForm() {
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [notice, setNotice] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState(false);

  async function onSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setNotice(null);

    const parsed = schema.safeParse(Object.fromEntries(new FormData(event.currentTarget)));

    if (!parsed.success) {
      const next: Record<string, string> = {};
      for (const issue of parsed.error.issues) {
        const key = String(issue.path[0] ?? "form");
        if (!next[key]) next[key] = issue.message;
      }
      setErrors(next);
      return;
    }

    setErrors({});
    setLoading(true);

    // Honeypot: a real visitor never sees or fills this field. Bots that do
    // get a neutral outcome, so they do not learn to retry.
    if (parsed.data.companyWebsite) {
      setLoading(false);
      return;
    }

    try {
      // `apiUtil` returns undefined when the request never reaches the API, so
      // a falsy result is treated as a failure and the visitor is given the
      // direct contact channels rather than a false confirmation.
      const response = await apiUtil.post(ApiContactEnquiry, parsed.data);

      if (!response) {
        setNotice(
          "We could not reach our servers just now. Please call or email us using the details on this page, and we will pick it straight up.",
        );
        return;
      }

      // Surface a server-side validation message when the API sends one.
      const message = response.description ?? response.error ?? response.message;
      if (response.success === false || response.ok === false) {
        setNotice(
          typeof message === "string"
            ? message
            : "Something went wrong sending that. Please try again, or call us directly.",
        );
        return;
      }

      setResult(true);
      event.currentTarget.reset();
    } catch {
      setNotice(
        "We could not send that. Please call or email us using the details on this page, and we will pick it up.",
      );
    } finally {
      setLoading(false);
    }
  }

  if (result) {
    return (
      <div className="rounded-2xl border border-line bg-surface p-6 sm:p-8">
        <span className="rule-brass" />
        <h2 className="mt-6 font-display text-2xl leading-tight sm:text-3xl">
          Message received.
        </h2>
        <p className="mt-3 max-w-[44ch] leading-relaxed text-muted-foreground">
          Thank you for getting in touch. We read every enquiry ourselves and will reply to the
          address you gave us.
        </p>

        <div className="mt-6 rounded-xl bg-background p-5 ring-1 ring-line">
          <p className="text-sm leading-relaxed text-muted-foreground">
            Need it sooner? You can skip the wait and reach the team directly.
          </p>
          <div className="mt-4 flex flex-wrap gap-x-6 gap-y-3">
            {CONTACT.phone && (
              <a
                href={toTelHref(CONTACT.phone)}
                className="text-sm font-semibold text-brass-soft underline underline-offset-4 transition-colors hover:text-brass"
              >
                Call {CONTACT.phone}
              </a>
            )}
            {CONTACT.email && (
              <a
                href={`mailto:${CONTACT.email}`}
                className="text-sm font-semibold text-brass-soft underline underline-offset-4 transition-colors hover:text-brass"
              >
                Email {CONTACT.email}
              </a>
            )}
            {CONTACT.whatsapp && (
              <a
                href={toWhatsAppHref(CONTACT.whatsapp, WHATSAPP_MESSAGE)}
                className="text-sm font-semibold text-brass-soft underline underline-offset-4 transition-colors hover:text-brass"
              >
                WhatsApp us
              </a>
            )}
          </div>
        </div>

        <button
          type="button"
          onClick={() => setResult(false)}
          className="mt-8 text-sm font-semibold text-brass-soft transition-colors hover:text-brass"
        >
          Send another message →
        </button>
      </div>
    );
  }

  return (
    <form onSubmit={onSubmit} noValidate className="card-lux relative bg-background p-6 sm:p-8">
      <span className="rule-brass" />
      <p className="eyebrow mt-6">Send a message</p>
      <h2 className="mt-3 font-display text-2xl leading-tight sm:text-3xl">
        Tell us about your business.
      </h2>
      <p className="mt-3 max-w-[46ch] text-sm leading-relaxed text-muted-foreground">
        The more you tell us, the more useful our first reply can be. Everything here goes
        directly to the team.
      </p>

      <div className="mt-7 grid gap-4 sm:grid-cols-2">
        <label className="block">
          <span className={LABEL_CLASS}>Name</span>
          <input
            name="name"
            type="text"
            autoComplete="name"
            aria-invalid={Boolean(errors.name)}
            className={FIELD_CLASS}
          />
          {errors.name && <span className="mt-1 block text-xs text-destructive">{errors.name}</span>}
        </label>

        <label className="block">
          <span className={LABEL_CLASS}>Email</span>
          <input
            name="email"
            type="email"
            autoComplete="email"
            aria-invalid={Boolean(errors.email)}
            className={FIELD_CLASS}
          />
          {errors.email && (
            <span className="mt-1 block text-xs text-destructive">{errors.email}</span>
          )}
        </label>

        <label className="block">
          <span className={LABEL_CLASS}>Phone (optional)</span>
          <input
            name="phone"
            type="tel"
            autoComplete="tel"
            aria-invalid={Boolean(errors.phone)}
            className={FIELD_CLASS}
          />
          {errors.phone && <span className="mt-1 block text-xs text-destructive">{errors.phone}</span>}
        </label>

        <label className="block">
          <span className={LABEL_CLASS}>Business type</span>
          <select name="businessType" defaultValue="" className={FIELD_CLASS}>
            <option value="">Select one</option>
            {BUSINESS_TYPES.map((type) => (
              <option key={type} value={type}>
                {type}
              </option>
            ))}
          </select>
        </label>
      </div>

      <label className="mt-5 block">
        <span className={LABEL_CLASS}>Message</span>
        <textarea
          name="message"
          rows={5}
          maxLength={2000}
          aria-invalid={Boolean(errors.message)}
          className={`${FIELD_CLASS} resize-y`}
        />
        {errors.message && (
          <span className="mt-1 block text-xs text-destructive">{errors.message}</span>
        )}
      </label>

      <input
        name="companyWebsite"
        type="text"
        tabIndex={-1}
        autoComplete="off"
        aria-hidden="true"
        className="absolute h-0 w-0 opacity-0"
      />

      {notice && (
        <p className="mt-6 rounded-xl bg-surface p-4 text-sm leading-relaxed text-muted-foreground ring-1 ring-line">
          {notice}
        </p>
      )}

      <button
        type="submit"
        disabled={loading}
        className="group mt-7 flex w-full items-center justify-center gap-3 rounded-full bg-primary px-6 py-3.5 text-sm font-semibold text-primary-foreground transition-colors hover:bg-brass-soft focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brass focus-visible:ring-offset-2 focus-visible:ring-offset-background disabled:opacity-60"
      >
        {loading ? "Sending…" : "Send message"}
        {!loading && (
          <ArrowUpRight
            aria-hidden="true"
            className="size-4 transition-transform duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5"
          />
        )}
      </button>

      <p className="mt-4 text-center font-mono text-[11px] leading-relaxed text-muted-foreground">
        No account needed. We only use this to reply to you.
      </p>
    </form>
  );
}

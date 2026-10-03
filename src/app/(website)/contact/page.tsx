import type { Metadata } from "next";
import {
  Mail,
  Phone,
  MapPin,
  Clock,
  MessageCircle,
  ArrowUpRight,
} from "lucide-react";
import {
  SiteShell,
  PageHero,
} from "@/components/admin/admin-website/site-shell";
import { ClosingCta } from "@/components/admin/admin-website/marketing-sections";
import { ContactForm } from "./contact-form";
import { CONTACT, toTelHref, toWhatsAppHref } from "@/utils/constants";

const TITLE = "Contact Fyncho — Talk to the Fyncho Team";

const DESCRIPTION =
  "Get in touch with Fyncho about your service business, business software, bookings, payments, or getting started. Call, message, or email the team.";

export const metadata: Metadata = {
  title: TITLE,
  description: DESCRIPTION,
  openGraph: { title: TITLE, description: DESCRIPTION, type: "website" },
  twitter: { card: "summary_large_image" },
};

const WHATSAPP_MESSAGE = "Hello Fyncho, I would like to know more.";

/**
 * The two primary ways a visitor can reach the team directly.
 */
const primaryChannels = [
  {
    icon: Phone,
    label: "Call us",
    value: CONTACT.phone,
    href: CONTACT.phone ? toTelHref(CONTACT.phone) : null,
    action: "Tap to call",
  },
  {
    icon: Mail,
    label: "Email us",
    value: CONTACT.email,
    href: CONTACT.email ? `mailto:${CONTACT.email}` : null,
    action: "Write to us",
  },
].filter((channel) => Boolean(channel.value && channel.href));

/**
 * Additional contact information.
 * Omitted entirely unless a real value is configured.
 */
const otherChannels = [
  {
    icon: MessageCircle,
    label: "WhatsApp",
    value: CONTACT.whatsapp,
    href: CONTACT.whatsapp
      ? toWhatsAppHref(CONTACT.whatsapp, WHATSAPP_MESSAGE)
      : null,
    note: "Send a quick message without filling in a form.",
  },
  {
    icon: MapPin,
    label: "Office",
    value: CONTACT.addressLines.join(", "),
    href: null,
    note: "Visits by appointment.",
  },
  {
    icon: Clock,
    label: "Hours",
    value: CONTACT.hours,
    href: null,
    note: "Our usual business hours.",
  },
].filter((channel) => Boolean(channel.value));

/**
 * What happens after an enquiry is submitted.
 */
const expectations = [
  {
    n: "01",
    title: "You reach us",
    detail:
      "Use the form, phone number, email, or WhatsApp — whichever is easiest for you. No account is needed to get started.",
  },
  {
    n: "02",
    title: "We review your enquiry",
    detail:
      "Your message is reviewed by someone on the Fyncho team so we can understand what you need and respond appropriately.",
  },
  {
    n: "03",
    title: "We come back to you",
    detail: CONTACT.responseTime
      ? `${CONTACT.responseTime} We reply by email or phone, whichever you prefer.`
      : "We reply by email or phone, whichever you prefer, with a clear answer to your question.",
  },
];

export default function ContactPage() {
  return (
    <SiteShell>
      <PageHero
        eyebrow="Contact"
        title={<>Let's talk about your business.</>}
        intro="Have a question about Fyncho, getting started, bookings, or managing your business? Send us a message, call us, or reach out directly."
        image="/assets/admin-website/avivane-banner-craft.jpg"
        imageAlt="Professional service business preparing for a customer appointment"
      />

      <section className="border-y border-line bg-surface py-20 sm:py-28">
        <div className="mx-auto max-w-6xl px-6">
          <div className="grid gap-10 lg:grid-cols-12">
            <div className="lg:col-span-7">
              <ContactForm />
            </div>

            <div className="lg:col-span-5">
              <div className="lg:sticky lg:top-28">
                <div className="closing-glow relative overflow-hidden rounded-2xl bg-primary p-6 text-primary-foreground shadow-lift ring-1 ring-brass/30 sm:p-7">
                  <p className="eyebrow text-brass">Reach us directly</p>

                  <p className="mt-3 max-w-[38ch] text-sm leading-relaxed text-primary-foreground/70">
                    Choose the way that works best for you. All enquiries reach
                    the Fyncho team.
                  </p>

                  {primaryChannels.length > 0 && (
                    <div className="mt-6 divide-y divide-primary-foreground/15 border-y border-primary-foreground/15">
                      {primaryChannels.map((channel) => {
                        const Icon = channel.icon;

                        return (
                          <a
                            key={channel.label}
                            href={channel.href!}
                            className="group flex items-center gap-4 py-5 transition-colors hover:bg-primary-foreground/5 focus-visible:outline-none focus-visible:bg-primary-foreground/5"
                          >
                            <span className="flex size-10 shrink-0 items-center justify-center rounded-full bg-brass text-accent-foreground transition-transform duration-300 group-hover:scale-105">
                              <Icon aria-hidden="true" className="size-4" />
                            </span>

                            <span className="min-w-0 flex-1">
                              <span className="eyebrow text-brass">
                                {channel.label}
                              </span>

                              <span className="mt-1.5 block font-display text-lg leading-tight break-words sm:text-xl">
                                {channel.value}
                              </span>

                              <span className="mt-2 block font-mono text-[10px] uppercase tracking-[0.2em] text-primary-foreground/45">
                                {channel.action}
                              </span>
                            </span>

                            <ArrowUpRight
                              aria-hidden="true"
                              className="size-4 shrink-0 text-brass/60 transition-all duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-hover:text-brass"
                            />
                          </a>
                        );
                      })}
                    </div>
                  )}

                  {CONTACT.responseTime && (
                    <p className="mt-5 font-mono text-[11px] leading-relaxed text-primary-foreground/50">
                      {CONTACT.responseTime}
                    </p>
                  )}
                </div>

                {otherChannels.length > 0 && (
                  <ul className="mt-8 divide-y divide-line border-y border-line">
                    {otherChannels.map((channel) => {
                      const Icon = channel.icon;

                      const content = (
                        <>
                          <span className="flex size-10 shrink-0 items-center justify-center rounded-full bg-background ring-1 ring-line">
                            <Icon
                              aria-hidden="true"
                              className="size-4 text-brass"
                            />
                          </span>

                          <span className="min-w-0 flex-1">
                            <span className="font-mono text-[10px] uppercase tracking-[0.2em] text-muted-foreground">
                              {channel.label}
                            </span>

                            <span className="mt-1 block break-words font-medium text-foreground">
                              {channel.value}
                            </span>

                            <span className="mt-1 block text-sm text-muted-foreground">
                              {channel.note}
                            </span>
                          </span>

                          {channel.href && (
                            <ArrowUpRight
                              aria-hidden="true"
                              className="size-4 shrink-0 text-brass/60 transition-colors group-hover:text-brass"
                            />
                          )}
                        </>
                      );

                      return (
                        <li key={channel.label}>
                          {channel.href ? (
                            <a
                              href={channel.href}
                              className="group flex items-start gap-4 py-5 transition-colors hover:bg-surface focus-visible:outline-none focus-visible:bg-surface"
                            >
                              {content}
                            </a>
                          ) : (
                            <div className="flex items-start gap-4 py-5">
                              {content}
                            </div>
                          )}
                        </li>
                      );
                    })}
                  </ul>
                )}
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-6xl px-6 py-20 sm:py-28">
        <div className="max-w-3xl">
          <span className="rule-brass" />

          <p className="eyebrow mt-7">After you send it</p>

          <h2 className="mt-5 font-display text-4xl leading-tight sm:text-5xl">
            You will hear back from the Fyncho team.
          </h2>

          <p className="mt-5 max-w-[54ch] leading-relaxed text-muted-foreground">
            We keep the process simple. Send your question, tell us what you
            need, and we will get back to you with the information that is
            relevant to your business.
          </p>
        </div>

        <ol className="mt-14 grid gap-8 sm:grid-cols-3">
          {expectations.map((item) => (
            <li key={item.n} className="border-t border-line pt-7">
              <span className="numeral">{item.n}</span>

              <h3 className="mt-4 text-2xl">{item.title}</h3>

              <p className="mt-3 max-w-[40ch] text-sm leading-relaxed text-muted-foreground">
                {item.detail}
              </p>
            </li>
          ))}
        </ol>
      </section>

      <ClosingCta
        title="Ready to get started?"
        description="Create your Fyncho business software, choose your unique business address, and start building your online presence."
        primary={{ label: "Start with Fyncho", to: "/register" }}
        secondary={{ label: "Log in", to: "/login" }}
      />
    </SiteShell>
  );
}
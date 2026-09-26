import type { Metadata } from "next";
import { Mail, Phone, MapPin, Clock, MessageCircle, ArrowUpRight } from "lucide-react";
import { SiteShell, PageHero } from "@/components/admin/admin-website/site-shell";
import { ClosingCta } from "@/components/admin/admin-website/marketing-sections";
import { ContactForm } from "./contact-form";
import { CONTACT, toTelHref, toWhatsAppHref } from "@/utils/constants";

const TITLE = "Contact Fyncho — Call, Message or Email the Team";
const DESCRIPTION =
  "Reach the Fyncho team about your salon, spa or wellness business. Call us on our official mobile number, send a message, or email us — whichever is easiest.";

export const metadata: Metadata = {
  title: TITLE,
  description: DESCRIPTION,
  openGraph: { title: TITLE, description: DESCRIPTION, type: "website" },
  twitter: { card: "summary_large_image" },
};

const WHATSAPP_MESSAGE = "Hello Fyncho, I would like to know more.";

/**
 * The two ways a visitor can reach the team directly, shown as a matched pair
 * so neither reads as secondary. Phone is first so it still leads on mobile.
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

/** Everything else. Omitted entirely unless a real value is configured. */
const otherChannels = [
  {
    icon: MessageCircle,
    label: "WhatsApp",
    value: CONTACT.whatsapp,
    href: CONTACT.whatsapp ? toWhatsAppHref(CONTACT.whatsapp, WHATSAPP_MESSAGE) : null,
    note: "Send a quick note without filling in a form.",
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
    note: "We answer around salon working hours.",
  },
].filter((channel) => Boolean(channel.value));

/** What happens to an enquiry once it is sent. Sets expectations, not promises. */
const expectations = [
  {
    n: "01",
    title: "You reach us",
    detail:
      "Through the form, the number above, or email — whichever is quickest for you. No account needed to get started.",
  },
  {
    n: "02",
    title: "A person reads it",
    detail:
      "Every enquiry is read by someone on the team who knows the product. There is no ticket queue and no chatbot in between.",
  },
  {
    n: "03",
    title: "We come back to you",
    detail: CONTACT.responseTime
      ? `${CONTACT.responseTime} We reply by email or phone, whichever you prefer.`
      : "By email or phone, whichever you prefer, with a straight answer rather than a brochure.",
  },
];

export default function ContactPage() {
  return (
    <SiteShell>
      <PageHero
        eyebrow="Contact"
        title={<>Let&rsquo;s talk about your business.</>}
        intro="A real person reads every message. Call us, send a note, or tell us what you are building — and we will come back to you with a straight answer."
        image="/assets/admin-website/avivane-banner-craft.jpg"
        imageAlt="Beauty professional preparing a treatment room for a client"
      />

      <section className="border-y border-line bg-surface py-20 sm:py-28">
        <div className="mx-auto max-w-6xl px-6">
          <div className="grid gap-10 lg:grid-cols-12">
            <div className="lg:col-span-7">
              <ContactForm />
            </div>

            <div className="lg:col-span-5">
              <div className="lg:sticky lg:top-28">
                {/* One card, two routes. Keeping them in a single unit makes the
                    choice obvious instead of making one look secondary. */}
                <div className="closing-glow relative overflow-hidden rounded-2xl bg-primary p-6 text-primary-foreground shadow-lift ring-1 ring-brass/30 sm:p-7">
                  <p className="eyebrow text-brass">Reach us directly</p>
                  <p className="mt-3 max-w-[38ch] text-sm leading-relaxed text-primary-foreground/70">
                    Both reach the same small team. Pick whichever suits the moment.
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
                              <span className="eyebrow text-brass">{channel.label}</span>
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
                            <Icon aria-hidden="true" className="size-4 text-brass" />
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
                            <div className="flex items-start gap-4 py-5">{content}</div>
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

      {/* What happens to an enquiry */}
      <section className="mx-auto max-w-6xl px-6 py-20 sm:py-28">
        <div className="max-w-3xl">
          <span className="rule-brass" />
          <p className="eyebrow mt-7">After you send it</p>
          <h2 className="mt-5 font-display text-4xl leading-tight sm:text-5xl">
            You will hear back from a person.
          </h2>
          <p className="mt-5 max-w-[54ch] leading-relaxed text-muted-foreground">
            No automated sales sequence, and nothing that needs unsubscribing from. Here is simply
            what happens next.
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
        title="Prefer to skip the conversation?"
        description="You can create your Fyncho business and start taking bookings straight away. Nothing is charged until customers book through your site."
        primary={{ label: "Start with Fyncho", to: "/register" }}
        secondary={{ label: "Log in", to: "/login" }}
      />
    </SiteShell>
  );
}

import type { Metadata } from "next";
import Link from "next/link";
import { SiteShell, PageHero } from "@/components/admin/admin-website/site-shell";
import { ClosingCta, SectionHeading } from "@/components/admin/admin-website/marketing-sections";

const TITLE = "How It Works — From Sign Up to Live Salon Website | Avivane";
const DESCRIPTION =
  "Four steps: create your account, choose your salon URL, set up your salon, and go live with your own website.";

export const metadata: Metadata = {
  title: TITLE,
  description: DESCRIPTION,
  openGraph: { title: TITLE, description: DESCRIPTION, type: "website" },
  twitter: { card: "summary_large_image" },
};

const steps = [
  {
    n: "01",
    t: "Create your account",
    d: "Register your salon business with your name, email and phone. It takes about a minute.",
  },
  {
    n: "02",
    t: "Choose your salon URL",
    d: "Pick a unique slug. Glam Studio becomes avivane.com/glam-studio — checked for availability as you type.",
  },
  {
    n: "03",
    t: "Set up your salon",
    d: "Add your services, team, opening hours, business information and branding.",
  },
  {
    n: "04",
    t: "Go live",
    d: "Share your salon website with customers and start taking bookings the same day.",
  },
];

export default function HowItWorksPage() {
  return (
    <SiteShell>
      <PageHero
        eyebrow="How it works"
        title={<>Four steps between here and your own salon website.</>}
        intro="No developers, no migration project, no waiting on an agency. You leave this website with a live address and a dashboard behind it."
        image="/assets/admin-website/avivane-banner-business.jpg"
        imageAlt="Salon business workspace prepared for a new day"
      />

      <section className="mx-auto max-w-6xl px-6 pb-16">
        <ol className="border-t border-line">
          {steps.map((s) => (
            <li
              key={s.n}
              className="group grid grid-cols-1 gap-4 border-b border-line py-10 transition-colors duration-300 hover:bg-surface sm:grid-cols-12"
            >
              <span className="font-display text-4xl text-brass/70 transition-colors duration-300 group-hover:text-brass sm:col-span-2">
                {s.n}
              </span>
              <h2 className="text-3xl sm:col-span-4">{s.t}</h2>
              <p className="max-w-[56ch] text-pretty text-muted-foreground sm:col-span-6">{s.d}</p>
            </li>
          ))}
        </ol>
      </section>

      <section className="mx-auto max-w-6xl px-6 py-20 sm:py-28">
        <SectionHeading eyebrow="What you prepare" title="A polished launch starts with the details clients already ask for." description="Bring your service menu, team information, opening hours and a few strong images. Avivane turns those essentials into a structured salon presence." />
        <div className="mt-12 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {[
            ["Your identity", "Salon name, logo, colours and a short introduction."],
            ["Your services", "Prices, durations, categories and booking rules."],
            ["Your team", "Profiles, skills, working hours and availability."],
            ["Your policies", "Deposits, cancellations and client information."],
          ].map(([title, copy], i) => <div key={title} className="card-lux p-7"><span className="numeral">0{i + 1}</span><h3 className="mt-4 text-2xl">{title}</h3><p className="mt-3 text-sm leading-relaxed text-muted-foreground">{copy}</p></div>)}
        </div>
      </section>

      <section className="border-y border-line bg-surface py-16">
        <div className="mx-auto max-w-3xl px-6 text-center">
          <p className="eyebrow">And after that</p>
          <h2 className="mt-4 text-4xl text-balance sm:text-5xl">
            Your salon ecosystem takes over.
          </h2>
          <p className="mx-auto mt-4 max-w-[52ch] text-pretty text-muted-foreground">
            Your public salon website, your salon dashboard and your customer portal all live at
            your address from day one.
          </p>
          <Link
            href="/register"
            className="mt-8 inline-block rounded-full bg-primary px-7 py-3.5 text-sm font-semibold text-primary-foreground transition-colors hover:bg-brass-soft"
          >
            Get Started
          </Link>
        </div>
      </section>

      <section className="mx-auto max-w-6xl px-6 py-20 sm:py-28">
        <div className="grid gap-12 lg:grid-cols-12">
          <div className="lg:col-span-5"><SectionHeading eyebrow="After launch" title="Your address becomes the front door to the whole client relationship." /></div>
          <div className="divide-y divide-line border-y border-line lg:col-span-7">
            {[
              ["Be discovered", "Share one memorable address across search, social profiles, messages and printed material."],
              ["Take bookings", "Let clients choose the right service, professional and time without waiting for a reply."],
              ["Build loyalty", "Use client history, memberships and thoughtful follow-up to encourage the next visit."],
              ["Understand growth", "Read revenue, retention, utilisation and service performance from the same system."],
            ].map(([title, copy]) => <div key={title} className="grid gap-3 py-6 sm:grid-cols-3"><h3 className="text-2xl">{title}</h3><p className="sm:col-span-2 leading-relaxed text-muted-foreground">{copy}</p></div>)}
          </div>
        </div>
      </section>

      <ClosingCta title="Your salon can be live before the day is over." description="Create your account, claim your address and build a professional destination for every new and returning client." secondary={{ label: "View Pricing", to: "/pricing" }} />
    </SiteShell>
  );
}
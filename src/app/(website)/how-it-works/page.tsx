import type { Metadata } from "next";
import Link from "next/link";
import { SiteShell, PageHero } from "@/components/admin/admin-website/site-shell";
import { ClosingCta, SectionHeading } from "@/components/admin/admin-website/marketing-sections";

const TITLE = "How It Works — Get Your Business Live with Fyncho";
const DESCRIPTION =
  "Create your Fyncho account, choose your unique business address, add your services and team, and start managing bookings, customers and payments from one platform.";

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
    d: "Register your business and create your Fyncho account with your basic business information.",
  },
  {
    n: "02",
    t: "Choose your business address",
    d: "Choose a unique name for your business and get your own easy-to-remember address, such as fyncho.com/glam-studio.",
  },
  {
    n: "03",
    t: "Set up your business",
    d: "Add your business information, services, pricing, durations, team members, availability and gallery.",
  },
  {
    n: "04",
    t: "Start taking bookings",
    d: "Once your business is ready, share your Fyncho address and let customers explore your services and book online.",
  },
];

export default function HowItWorksPage() {
  return (
    <SiteShell>
      <PageHero
        eyebrow="How it works"
        title={<>Four simple steps to your own business platform.</>}
        intro="Fyncho brings your business presence, services, team, customers, bookings and payments together in one place, so you can get started without managing separate systems."
        image="/assets/admin-website/avivane-banner-business.jpg"
        imageAlt="Professional service business workspace"
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

              <p className="max-w-[56ch] text-pretty text-muted-foreground sm:col-span-6">
                {s.d}
              </p>
            </li>
          ))}
        </ol>
      </section>

      <section className="mx-auto max-w-6xl px-6 py-20 sm:py-28">
        <SectionHeading
          eyebrow="What you prepare"
          title="Start with the information your customers already need."
          description="Bring together your business details, services, team information and images. Fyncho turns those essentials into a clear professional business presence."
        />

        <div className="mt-12 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {[
            [
              "Your business",
              "Business name, contact details, introduction and gallery images.",
            ],
            [
              "Your services",
              "Service descriptions, prices and durations.",
            ],
            [
              "Your team",
              "Team member profiles, working hours and availability.",
            ],
            [
              "Your booking settings",
              "Deposits, cancellation requirements and appointment settings.",
            ],
          ].map(([title, copy], i) => (
            <div key={title} className="card-lux p-7">
              <span className="numeral">0{i + 1}</span>

              <h3 className="mt-4 text-2xl">{title}</h3>

              <p className="mt-3 text-sm leading-relaxed text-muted-foreground">
                {copy}
              </p>
            </div>
          ))}
        </div>
      </section>

      <section className="border-y border-line bg-surface py-16">
        <div className="mx-auto max-w-3xl px-6 text-center">
          <p className="eyebrow">Once you're ready</p>

          <h2 className="mt-4 text-4xl text-balance sm:text-5xl">
            Your business has a place customers can return to.
          </h2>

          <p className="mx-auto mt-4 max-w-[52ch] text-pretty text-muted-foreground">
            Share your Fyncho business address, let customers explore your services and
            make appointments online, while you manage the business from your dashboard.
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
          <div className="lg:col-span-5">
            <SectionHeading
              eyebrow="After launch"
              title="Your business address becomes the place customers return to."
            />
          </div>

          <div className="divide-y divide-line border-y border-line lg:col-span-7">
            {[
              [
                "Be discovered",
                "Share one memorable business address across search, social profiles, messages and printed material.",
              ],
              [
                "Take bookings",
                "Let customers explore services, see available times and book without waiting for a reply.",
              ],
              [
                "Build relationships",
                "Use customer accounts, appointment history, memberships and loyalty to support repeat visits.",
              ],
              [
                "Manage your business",
                "Keep appointments, customers, services, team members, payments and business activity together.",
              ],
            ].map(([title, copy]) => (
              <div key={title} className="grid gap-3 py-6 sm:grid-cols-3">
                <h3 className="text-2xl">{title}</h3>

                <p className="sm:col-span-2 leading-relaxed text-muted-foreground">
                  {copy}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <ClosingCta
        title="Give your business a place of its own."
        description="Create your account, choose your business address and bring your services, team, customers and bookings together with Fyncho."
        secondary={{ label: "View Pricing", to: "/pricing" }}
      />
    </SiteShell>
  );
}
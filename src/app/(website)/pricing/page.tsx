'use client';

import Link from "next/link";
import { useState } from "react";
import { SiteShell, PageHero } from "@/components/admin/admin-website/site-shell";
import { ClosingCta, SectionHeading } from "@/components/admin/admin-website/marketing-sections";

const plans = [
  {
    name: "Starter",
    blurb: "For independent stylists",
    monthly: 29,
    yearly: 24,
    features: [
      "Your own salon website",
      "Unique salon URL",
      "Online booking",
      "Up to 2 staff",
      "Customer management",
      "Email support",
    ],
    cta: "Get Started",
    featured: false,
  },
  {
    name: "Professional",
    blurb: "For growing salons",
    monthly: 79,
    yearly: 63,
    features: [
      "Everything in Starter",
      "Up to 10 staff",
      "Payments & memberships",
      "Custom domain",
      "Analytics & reports",
      "Priority email support",
    ],
    cta: "Get Your Salon Website",
    featured: true,
  },
  {
    name: "Business",
    blurb: "For multi-location groups",
    monthly: 149,
    yearly: 119,
    features: [
      "Everything in Professional",
      "Unlimited staff",
      "Marketing & loyalty",
      "Advanced reporting",
      "Multi-location management",
      "Priority support",
    ],
    cta: "Get Started",
    featured: false,
  },
  {
    name: "Enterprise",
    blurb: "For salon groups & franchises",
    monthly: 0,
    yearly: 0,
    features: [
      "Everything in Business",
      "Custom onboarding",
      "SSO & advanced permissions",
      "Dedicated account manager",
      "Custom SLAs",
      "Bespoke integrations",
    ],
    cta: "Contact Sales",
    featured: false,
  },
];

export default function PricingPage() {
  const [yearly, setYearly] = useState(true);

  return (
    <SiteShell>
      <PageHero
        eyebrow="Pricing"
        title={<>A plan for every salon.</>}
        intro="Every plan includes your own salon website, your unique URL and unlimited online bookings. Change or cancel any time."
        image="/assets/admin-website/avivane-banner-interior.jpg"
        imageAlt="Elegant modern salon interior with brass details"
      />

      <section className="mx-auto max-w-6xl px-6 pb-20">
        <div className="mb-10 flex items-center gap-3">
          <span className="text-sm">Monthly</span>
          <button
            type="button"
            role="switch"
            aria-checked={yearly}
            aria-label="Toggle yearly billing"
            onClick={() => setYearly((v) => !v)}
            className="relative h-6 w-11 rounded-full bg-primary"
          >
            <span
              className={`absolute top-0.5 size-5 rounded-full bg-surface transition-all ${
                yearly ? "right-0.5" : "left-0.5"
              }`}
            />
          </button>
          <span className="text-sm font-semibold">Yearly</span>
          <span className="rounded-full bg-brass/10 px-2.5 py-1 font-mono text-[11px] text-brass-soft">
            Save 20%
          </span>
        </div>

        <div className="grid grid-cols-1 gap-5 md:grid-cols-2 xl:grid-cols-4">
          {plans.map((plan) => (
            <div
              key={plan.name}
              className={`relative flex flex-col rounded-2xl p-8 transition-all duration-500 hover:-translate-y-1 ${
                plan.featured
                  ? "bg-primary text-primary-foreground shadow-lift ring-1 ring-brass/40 lg:scale-[1.02]"
                  : "card-lux"
              }`}
            >
              {plan.featured && (
                <span className="absolute -top-3 left-7 rounded-full bg-brass px-3 py-1 font-mono text-[11px] uppercase tracking-wide text-accent-foreground">
                  Most popular
                </span>
              )}
              <h2 className="text-2xl">{plan.name}</h2>
              <p
                className={`mt-1 text-sm ${plan.featured ? "text-primary-foreground/60" : "text-muted-foreground"}`}
              >
                {plan.blurb}
              </p>
              <div className="mt-5 flex items-baseline gap-1">
                {plan.monthly === 0 ? (
                  <span className="font-display text-4xl font-semibold">Custom</span>
                ) : (
                  <>
                    <span className="font-display text-5xl font-semibold">
                      ${yearly ? plan.yearly : plan.monthly}
                    </span>
                    <span
                      className={`text-sm ${plan.featured ? "text-primary-foreground/60" : "text-muted-foreground"}`}
                    >
                      /mo
                    </span>
                  </>
                )}
              </div>
              <p
                className={`mt-1 font-mono text-xs ${plan.featured ? "text-primary-foreground/50" : "text-muted-foreground"}`}
              >
                {plan.monthly === 0
                  ? "Tailored to your group"
                  : yearly
                    ? `billed yearly · $${plan.monthly}/mo monthly`
                    : "billed monthly"}
              </p>
              <ul className="mt-6 space-y-3 text-sm">
                {plan.features.map((f) => (
                  <li key={f} className="flex gap-2">
                    <span className="text-brass">✓</span>
                    {f}
                  </li>
                ))}
              </ul>
              <Link
                href="/register"
                className={`mt-8 rounded-full px-5 py-3 text-center text-sm font-semibold transition-colors ${
                  plan.featured
                    ? "bg-brass text-accent-foreground hover:bg-brass-soft"
                    : "text-foreground ring-1 ring-line hover:bg-background"
                }`}
              >
                {plan.cta}
              </Link>
            </div>
          ))}
        </div>
      </section>

      <section className="border-y border-line bg-surface py-20 sm:py-28">
        <div className="mx-auto max-w-6xl px-6">
          <SectionHeading eyebrow="Included from day one" title="The essentials are not reserved for the most expensive plan." description="Every Avivane salon begins with a professional website, a direct booking journey and the operational foundation needed to serve clients well." />
          <div className="mt-12 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {[
              ["Your digital home", "A responsive salon website and a memorable Avivane address."],
              ["Unlimited bookings", "No per-booking platform fee and no marketplace commission."],
              ["Client records", "Visit history and preferences stay connected to appointments."],
              ["Guided setup", "A clear path from account creation to a complete live website."],
            ].map(([title, copy], i) => <div key={title} className="card-lux bg-background p-7"><span className="numeral">0{i + 1}</span><h3 className="mt-4 text-2xl">{title}</h3><p className="mt-3 text-sm leading-relaxed text-muted-foreground">{copy}</p></div>)}
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-6xl px-6 py-20 sm:py-28">
        <div className="grid gap-12 lg:grid-cols-12">
          <div className="lg:col-span-4"><SectionHeading eyebrow="Choose with confidence" title="Match the plan to the way you operate today." /></div>
          <div className="divide-y divide-line border-y border-line lg:col-span-8">
            {[
              ["Starter", "Choose this when one or two professionals need a polished website and dependable online booking."],
              ["Professional", "Choose this when payments, memberships, reporting and a custom domain matter to growth."],
              ["Business", "Choose this when several teams or locations need shared control and a wider performance view."],
              ["Enterprise", "Choose this when rollout, governance, integrations and service commitments need to be tailored."],
            ].map(([name, copy]) => <div key={name} className="grid gap-3 py-6 sm:grid-cols-3"><h3 className="text-2xl">{name}</h3><p className="sm:col-span-2 leading-relaxed text-muted-foreground">{copy}</p></div>)}
          </div>
        </div>
      </section>

      <section className="border-y border-line bg-surface py-20">
        <div className="mx-auto max-w-3xl px-6">
          <SectionHeading eyebrow="Pricing questions" title="Straight answers before you decide." />
          <div className="mt-8 divide-y divide-line border-y border-line">
            {[
              ["Can I change plans later?", "Yes. Move up or down as your team and operating needs change. Your salon website remains available throughout."],
              ["Is online booking usage limited?", "No. Every plan includes unlimited online bookings without a per-booking platform fee."],
              ["Can I use my own domain?", "Custom domains are included from the Professional plan. Your Avivane address continues to work as well."],
              ["What does yearly billing mean?", "The discounted monthly equivalent is billed for the full year, giving you a 20% saving compared with monthly billing."],
            ].map(([question, answer]) => <details key={question} className="group py-6"><summary className="flex cursor-pointer list-none justify-between gap-6 font-display text-2xl transition-colors duration-300 group-hover:text-brass-soft">{question}<span className="font-mono text-brass transition-transform duration-300 group-open:rotate-45">+</span></summary><p className="mt-3 max-w-[68ch] text-sm leading-relaxed text-muted-foreground">{answer}</p></details>)}
          </div>
        </div>
      </section>

      <ClosingCta title="Every plan ends the same way: your salon, online." description="Start with the plan that fits today, then grow without rebuilding your website or client experience." secondary={{ label: "Explore Features", to: "/features" }} />
    </SiteShell>
  );
}
import type { Metadata } from "next";
import { SiteShell, PageHero } from "@/components/admin/admin-website/site-shell";
import { ClosingCta, SectionHeading } from "@/components/admin/admin-website/marketing-sections";

/**
 * Fyncho uses a percentage-based platform fee rather than monthly plans.
 * Keep the percentage configurable so it can be changed from one place.
 */
const configured = Number.parseFloat(process.env.NEXT_PUBLIC_PLATFORM_FEE_PERCENTAGE ?? "");
const PLATFORM_FEE_PERCENTAGE = Number.isFinite(configured) ? configured : 1;

const PLATFORM_FEE_LABEL = `${PLATFORM_FEE_PERCENTAGE}%`;
const PLATFORM_FEE_LONG_LABEL = `${PLATFORM_FEE_PERCENTAGE} percent`;

const TITLE = "Pricing — Simple Percentage-Based Pricing | Fyncho";
const DESCRIPTION = `Fyncho has no monthly subscription, setup fee or feature tiers. Businesses pay ${PLATFORM_FEE_LONG_LABEL} on eligible booking and payment value processed through Fyncho, plus any applicable payment gateway processing fees.`;

export const metadata: Metadata = {
  title: `${TITLE} | Fyncho`,
  description: DESCRIPTION,
  openGraph: {
    title: `${TITLE} | Fyncho`,
    description: DESCRIPTION,
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
  },
};

const GATEWAY_LABEL = "Payment gateway processing fee";
const GATEWAY_VALUE = "Applicable";
const GATEWAY_DETAIL =
  "A separate fee may apply to online payments depending on the payment gateway and payment method.";

const chargeTone = {
  onDark: {
    rule: "border-primary-foreground/15",
    label: "text-primary-foreground/80",
    value: "text-brass",
    body: "text-primary-foreground/60",
  },
  onLight: {
    rule: "border-line",
    label: "text-foreground",
    value: "text-brass-soft",
    body: "text-muted-foreground",
  },
} as const;

function GatewayCharge({ tone }: { tone: keyof typeof chargeTone }) {
  const t = chargeTone[tone];

  return (
    <div className={`mt-8 border-t ${t.rule} pt-6`}>
      <p className={`font-mono text-[10px] uppercase tracking-[0.2em] ${t.label}`}>
        <span className="text-brass">+</span> {GATEWAY_LABEL}
      </p>

      <p className={`mt-3 max-w-[42ch] text-sm leading-relaxed ${t.body}`}>
        <span className={`font-semibold ${t.value}`}>{GATEWAY_VALUE}</span> —{" "}
        {GATEWAY_DETAIL}
      </p>
    </div>
  );
}

const assurances = [
  {
    title: "No monthly subscription",
    description:
      "There is no fixed monthly software subscription. Your Fyncho platform fee follows the eligible booking and payment value processed through the platform.",
  },
  {
    title: "No setup fee",
    description:
      "Creating your business and setting up your Fyncho business software does not require a separate setup fee.",
  },
  {
    title: "No feature tiers",
    description:
      "There are no Starter, Professional or Business plans. The Fyncho platform is available without feature-based subscription tiers.",
  },
];

const steps = [
  {
    n: "01",
    t: "Set up your business",
    d: "Create your Fyncho business software, add your services and team, configure your booking settings and publish your business presence.",
  },
  {
    n: "02",
    t: "Accept bookings",
    d: "Customers explore your services, see available appointment times and book through your Fyncho business presence.",
  },
  {
    n: "03",
    t: "Pay as you grow",
    d: `Fyncho charges ${PLATFORM_FEE_LABEL} on eligible booking and payment value processed through the platform. Your platform fee therefore follows the activity coming through Fyncho.`,
  },
];

const included = [
  {
    title: "Your business presence",
    points: [
      "Professional business software",
      "Unique business address",
      "Services, gallery and team profiles",
      "Business information and contact details",
      "Business content management",
    ],
  },
  {
    title: "The booking journey",
    points: [
      "Online booking",
      "Service availability",
      "Appointment management",
      "Booking status and queue visibility",
      "Appointment reminders and notifications",
    ],
  },
  {
    title: "Services and team",
    points: [
      "Service management",
      "Service descriptions, durations and pricing",
      "Team management",
      "Working hours and availability",
      "Staff roles and permissions",
    ],
  },
  {
    title: "Customers",
    points: [
      "Customer management",
      "Customer accounts",
      "Appointment history",
      "Memberships and loyalty",
    ],
  },
  {
    title: "Payments",
    points: [
      "Online payment collection",
      "Booking deposits",
      "Payment requirements",
      "Payment and booking information",
    ],
  },
  {
    title: "Business management",
    points: [
      "Business management dashboard",
      "Revenue reporting",
      "Booking reporting",
      "Business activity overview",
    ],
  },
];

const audiences = [
  {
    title: "Independent",
    description:
      "For independent professionals and business owners who want professional tools to manage services, customers, bookings and daily operations.",
  },
  {
    title: "Growing Team",
    description:
      "For businesses with a growing team that need to manage staff, services, schedules, appointments and customers in one place.",
  },
  {
    title: "Specialist Studio",
    description:
      "For focused service businesses where specialised services, customer relationships and a smooth booking experience matter most.",
  },
  {
    title: "Multi-location Group",
    description:
      "For businesses operating across multiple locations that want to manage their business activity through one platform.",
  },
];

const faqs = [
  {
    q: "Is there a monthly subscription?",
    a: "No. Fyncho uses a percentage-based platform fee instead of a fixed monthly subscription.",
  },
  {
    q: "What percentage does Fyncho charge?",
    a: `The Fyncho platform fee is ${PLATFORM_FEE_LABEL} on eligible booking and payment value processed through Fyncho.`,
  },
  {
    q: "Are features restricted by plan?",
    a: "No. Fyncho does not use feature-based subscription tiers. The platform is available without separate feature plans.",
  },
  {
    q: "Is there a setup fee?",
    a: "No. Fyncho does not charge a separate setup fee for creating and setting up your business software.",
  },
  {
    q: "Are payment gateway fees included in the Fyncho fee?",
    a: `No. The ${PLATFORM_FEE_LABEL} Fyncho platform fee is separate from any payment gateway processing fee that may apply to online payments.`,
  },
  {
    q: "How much is the payment gateway fee?",
    a: "Payment gateway processing fees vary by gateway, payment method and market. They are separate from the Fyncho platform fee and are not included in the percentage shown above.",
  },
  {
    q: "What happens if I have fewer bookings?",
    a: `Because the Fyncho platform fee is percentage-based, the fee applied to your eligible processed value decreases when the value processed through Fyncho decreases.`,
  },
  {
    q: "What happens as my business grows?",
    a: `The platform fee remains ${PLATFORM_FEE_LABEL}. As more eligible booking and payment value is processed through Fyncho, the amount paid in platform fees increases proportionally.`,
  },
];

type ChargeLine = {
  label: string;
  detail: string;
  rate?: string;
  rateNote?: string;
};

const charges: ChargeLine[] = [
  {
    label: "Fyncho platform fee",
    detail: `${PLATFORM_FEE_LABEL} on eligible booking and payment value processed through your Fyncho software.`,
    rate: PLATFORM_FEE_LABEL,
  },
  {
    label: "Payment gateway processing fee",
    detail:
      "A separate third-party processing fee may apply to online payments. The applicable amount depends on the payment gateway and payment method.",
    rateNote: "Applicable",
  },
];

const modelComparison = {
  traditional: {
    label: "Subscription model",
    headline: "Fixed monthly payment",
    detail:
      "A recurring software charge that remains due regardless of how much booking activity your business has.",
    formula: "Monthly subscription → fixed software cost",
  },
  fyncho: {
    label: "Fyncho model",
    headline: `${PLATFORM_FEE_LABEL} on eligible processed value`,
    detail:
      "A percentage-based platform fee that follows the eligible booking and payment value processed through Fyncho.",
    formula: "Processed booking value → platform fee → usage-based cost",
  },
};

export default function PricingPage() {
  return (
    <SiteShell>
      <PageHero
        eyebrow="Pricing"
        title={<>Pay as your business grows.</>}
        intro={`No monthly subscription. No feature tiers. Fyncho charges ${PLATFORM_FEE_LABEL} on eligible booking and payment value processed through the platform. Online payments may also carry a separate payment gateway processing fee.`}
        image="/assets/admin-website/avivane-banner-interior.jpg"
        imageAlt="Elegant modern service business interior"
      />

      <section className="mx-auto max-w-6xl px-6 pb-20">
        <div className="relative overflow-hidden rounded-3xl bg-primary px-8 py-14 shadow-lift ring-1 ring-brass/30 sm:px-14 sm:py-20">
          <div className="grid gap-12 lg:grid-cols-12 lg:items-end">
            <div className="lg:col-span-6">
              <span className="rule-brass" />

              <p className="eyebrow mt-7">One clear platform fee</p>

              <p className="mt-5 font-display text-7xl leading-[0.85] text-brass sm:text-8xl lg:text-9xl">
                {PLATFORM_FEE_LABEL}
              </p>

              <p className="mt-6 max-w-[34ch] text-lg leading-relaxed text-pretty text-primary-foreground/70">
                on eligible booking and payment value processed through your Fyncho
                business software.
              </p>

              <GatewayCharge tone="onDark" />
            </div>

            <ul className="divide-y divide-primary-foreground/15 border-y border-primary-foreground/15 lg:col-span-6">
              {assurances.map((item, i) => (
                <li
                  key={item.title}
                  className="grid grid-cols-[auto_1fr] gap-x-5 py-6"
                >
                  <span className="font-mono text-[11px] tracking-[0.18em] text-brass/70">
                    {String(i + 1).padStart(2, "0")}
                  </span>

                  <div>
                    <h2 className="text-2xl text-primary-foreground">
                      {item.title}
                    </h2>

                    <p className="mt-2 max-w-[44ch] text-sm leading-relaxed text-primary-foreground/60">
                      {item.description}
                    </p>
                  </div>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </section>

      <section className="border-y border-line bg-surface py-20 sm:py-28">
        <div className="mx-auto max-w-6xl px-6">
          <SectionHeading
            eyebrow="Why it works differently"
            title="A pricing model that follows your booking activity."
            description="Instead of paying a fixed software subscription every month, your Fyncho platform fee is based on the eligible booking and payment value processed through the platform."
          />

          <div className="mt-12 grid gap-5 lg:grid-cols-2">
            <div className="card-lux bg-background p-8 sm:p-10">
              <p className="font-mono text-[10px] uppercase tracking-[0.2em] text-muted-foreground">
                {modelComparison.traditional.label}
              </p>

              <p className="mt-5 font-display text-3xl leading-tight sm:text-4xl">
                {modelComparison.traditional.headline}
              </p>

              <p className="mt-3 max-w-[44ch] text-sm leading-relaxed text-muted-foreground">
                {modelComparison.traditional.detail}
              </p>

              <p className="mt-6 border-t border-line pt-5 font-mono text-xs leading-relaxed text-muted-foreground">
                {modelComparison.traditional.formula}
              </p>
            </div>

            <div className="rounded-2xl bg-primary p-8 text-primary-foreground shadow-lift ring-1 ring-brass/40 sm:p-10">
              <p className="font-mono text-[10px] uppercase tracking-[0.2em] text-brass">
                {modelComparison.fyncho.label}
              </p>

              <p className="mt-5 font-display text-3xl leading-tight sm:text-4xl">
                {modelComparison.fyncho.headline}
              </p>

              <p className="mt-3 max-w-[44ch] text-sm leading-relaxed text-primary-foreground/70">
                {modelComparison.fyncho.detail}
              </p>

              <p className="mt-6 border-t border-primary-foreground/20 pt-5 font-mono text-xs leading-relaxed text-primary-foreground/60">
                {modelComparison.fyncho.formula}
              </p>
            </div>
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-6xl px-6 py-20 sm:py-28">
        <SectionHeading
          eyebrow="How it works"
          title="Three steps, and the platform fee follows the value processed."
          description="Set up your business, start accepting bookings and let the percentage-based platform fee follow the eligible booking and payment value processed through Fyncho."
        />

        <ol className="mt-12 border-t border-line">
          {steps.map((step) => (
            <li
              key={step.n}
              className="group grid grid-cols-1 gap-4 border-b border-line py-10 transition-colors duration-300 hover:bg-surface sm:grid-cols-12"
            >
              <span className="font-display text-4xl text-brass/70 transition-colors duration-300 group-hover:text-brass sm:col-span-2">
                {step.n}
              </span>

              <h3 className="text-3xl sm:col-span-4">{step.t}</h3>

              <p className="max-w-[56ch] text-pretty text-muted-foreground sm:col-span-6">
                {step.d}
              </p>
            </li>
          ))}
        </ol>
      </section>

      <section className="border-y border-line bg-surface py-20 sm:py-28">
        <div className="mx-auto max-w-6xl px-6">
          <SectionHeading
            eyebrow="No feature restrictions"
            title="Everything you need. One platform."
            description="Every capability below is part of the standard Fyncho platform. There are no feature-based subscription tiers."
          />

          <img
            src="/assets/admin-website/dashboard-preview.jpg"
            alt="Fyncho business management dashboard showing appointments, revenue and customers"
            loading="lazy"
            width={1408}
            height={912}
            className="mt-10 w-full rounded-2xl border border-line bg-background shadow-lift"
          />

          <div className="mt-12 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {included.map((group, i) => (
              <div key={group.title} className="card-lux bg-background p-7">
                <span className="numeral">
                  {String(i + 1).padStart(2, "0")}
                </span>

                <h3 className="mt-4 text-2xl">{group.title}</h3>

                <ul className="mt-5 space-y-3 text-sm">
                  {group.points.map((point) => (
                    <li
                      key={point}
                      className="flex gap-3 text-muted-foreground"
                    >
                      <span aria-hidden="true" className="text-brass">
                        ✓
                      </span>
                      {point}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-6xl px-6 py-20 sm:py-28">
        <SectionHeading
          eyebrow="Who Fyncho is for"
          title="The same platform, whichever kind of service business you run."
          description="These are business types, not pricing tiers. The platform and percentage-based pricing model remain the same."
        />

        <div className="mt-12 divide-y divide-line border-y border-line">
          {audiences.map((audience, i) => (
            <article
              key={audience.title}
              className="group grid grid-cols-1 gap-3 py-7 transition-colors duration-300 hover:bg-surface sm:grid-cols-12 sm:items-baseline sm:gap-8 sm:px-4"
            >
              <span className="font-mono text-xs text-brass transition-colors duration-300 group-hover:text-brass-soft sm:col-span-1">
                {String(i + 1).padStart(2, "0")}
              </span>

              <h3 className="text-2xl transition-colors duration-300 group-hover:text-brass-soft sm:col-span-3">
                {audience.title}
              </h3>

              <p className="max-w-[62ch] leading-relaxed text-muted-foreground sm:col-span-8">
                {audience.description}
              </p>
            </article>
          ))}
        </div>
      </section>

      <section className="border-y border-line bg-surface py-20 sm:py-28">
        <div className="mx-auto max-w-6xl px-6">
          <div className="grid gap-12 lg:grid-cols-12">
            <div className="lg:col-span-5">
              <SectionHeading
                eyebrow="Payment transparency"
                title="Your platform fee and payment gateway fee are separate."
                description="When customers pay online through Fyncho, the Fyncho platform fee and any payment gateway processing fee are separate charges."
              />
            </div>

            <div className="lg:col-span-7">
              <div className="overflow-hidden rounded-2xl border border-line bg-background shadow-card">
                <dl className="divide-y divide-line">
                  {charges.map((charge, i) => (
                    <div
                      key={charge.label}
                      className="grid grid-cols-1 gap-3 px-7 py-7 sm:grid-cols-[1fr_auto] sm:items-baseline sm:gap-8 sm:py-8"
                    >
                      <div>
                        <dt className="flex items-center gap-3 text-lg font-semibold">
                          <span
                            aria-hidden="true"
                            className="font-mono text-xs text-brass/60"
                          >
                            {String(i + 1).padStart(2, "0")}
                          </span>

                          {charge.label}
                        </dt>

                        <dd className="mt-2 max-w-[46ch] pl-7 text-sm leading-relaxed text-muted-foreground">
                          {charge.detail}
                        </dd>
                      </div>

                      {charge.rate ? (
                        <p className="font-display text-5xl leading-none sm:text-6xl">
                          {charge.rate}
                        </p>
                      ) : (
                        <p className="font-mono text-[11px] uppercase tracking-[0.18em] text-muted-foreground sm:pb-1">
                          {charge.rateNote}
                        </p>
                      )}
                    </div>
                  ))}
                </dl>

                <div className="border-t border-line bg-surface px-7 py-6">
                  <p className="text-sm leading-relaxed text-pretty text-muted-foreground">
                    Fyncho's platform fee remains {PLATFORM_FEE_LABEL}. Any payment
                    gateway processing fee is separate and depends on the gateway and
                    payment method used.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-3xl px-6 py-20 sm:py-28">
        <SectionHeading
          eyebrow="Pricing questions"
          title="Straight answers before you decide."
        />

        <div className="mt-8 divide-y divide-line border-y border-line">
          {faqs.map((faq) => (
            <details key={faq.q} className="group py-6">
              <summary className="flex cursor-pointer list-none justify-between gap-6 font-display text-2xl transition-colors duration-300 group-hover:text-brass-soft">
                {faq.q}

                <span className="font-mono text-brass transition-transform duration-300 group-open:rotate-45">
                  +
                </span>
              </summary>

              <p className="mt-3 max-w-[68ch] text-sm leading-relaxed text-muted-foreground">
                {faq.a}
              </p>
            </details>
          ))}
        </div>
      </section>

      <ClosingCta
        title="Your business, online — at one clear platform rate."
        description={`Create your Fyncho business software, start taking bookings and pay ${PLATFORM_FEE_LABEL} on eligible booking and payment value processed through the platform. Any payment gateway processing fee is separate.`}
        primary={{ label: "Start with Fyncho", to: "/register" }}
        secondary={{ label: "Talk to us", to: "/contact" }}
      />
    </SiteShell>
  );
}
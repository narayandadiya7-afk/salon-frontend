import type { Metadata } from "next";
import { SiteShell, PageHero } from "@/components/admin/admin-website/site-shell";
import { ClosingCta, SectionHeading } from "@/components/admin/admin-website/marketing-sections";

/**
 * Fyncho charges a single platform fee on the eligible booking and payment
 * value processed through it, not a monthly subscription. Components must not
 * hardcode the percentage — import these so one change updates the whole site.
 */
const configured = Number.parseFloat(process.env.NEXT_PUBLIC_PLATFORM_FEE_PERCENTAGE ?? "");
const PLATFORM_FEE_PERCENTAGE = Number.isFinite(configured) ? configured : 1;

/** The fee as it appears in headings, e.g. "1%". */
const PLATFORM_FEE_LABEL = `${PLATFORM_FEE_PERCENTAGE}%`;

/** The fee written out, for body copy and structured data. */
const PLATFORM_FEE_LONG_LABEL = `${PLATFORM_FEE_PERCENTAGE} percent`;

const TITLE = "Pricing — Pay Only on Bookings Processed Through Fyncho";
const DESCRIPTION = `One clear rate. Fyncho has no monthly plans, no setup fee and no feature tiers — every salon gets the full platform and pays ${PLATFORM_FEE_LONG_LABEL} of the booking value processed through it.`;

export const metadata: Metadata = {
  title: `${TITLE} | Fyncho`,
  description: DESCRIPTION,
  openGraph: { title: `${TITLE} | Fyncho`, description: DESCRIPTION, type: "website" },
  twitter: { card: "summary_large_image" },
};

const GATEWAY_LABEL = "Payment gateway processing fee";
const GATEWAY_VALUE = "Applicable";
const GATEWAY_DETAIL =
  "charged on online payments and varying by payment method. Fyncho configures the payment gateway for your business.";

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

/**
 * The second charge that can apply to a booking, always presented directly
 * beneath the Fyncho platform fee so the two are read together. The amount is
 * deliberately not a number: payment gateways set their own rates and Fyncho
 * configures the gateway for each business, so it is labelled as applicable
 * rather than estimated.
 */
function GatewayCharge({ tone }: { tone: keyof typeof chargeTone }) {
  const t = chargeTone[tone];

  return (
    <div className={`mt-8 border-t ${t.rule} pt-6`}>
      <p className={`font-mono text-[10px] uppercase tracking-[0.2em] ${t.label}`}>
        <span className="text-brass">+</span> {GATEWAY_LABEL}
      </p>
      <p className={`mt-3 max-w-[42ch] text-sm leading-relaxed ${t.body}`}>
        <span className={`font-semibold ${t.value}`}>{GATEWAY_VALUE}</span> — {GATEWAY_DETAIL}
      </p>
    </div>
  );
}

const assurances = [
  {
    title: "No monthly subscription",
    description: "There is no fixed amount to keep your software online, and no bill waiting at the end of the month.",
  },
  {
    title: "No setup fee",
    description: "Creating your business, claiming your address and publishing your first listings costs nothing.",
  },
  {
    title: "No feature-based plans",
    description: "The whole platform is standard from day one. Every capability is included as part of it.",
  },
];

const steps = [
  {
    n: "01",
    t: "Set up your business",
    d: "Create your Fyncho business software, services, team, booking experience, and business profile. Your unique business address is ready from the moment you go live.",
  },
  {
    n: "02",
    t: "Accept bookings",
    d: "Customers discover your services and book appointments through your Fyncho-powered booking experience, and pay online where you enable it.",
  },
  {
    n: "03",
    t: "Pay as you grow",
    d: `Fyncho charges ${PLATFORM_FEE_LABEL} of eligible booking and payment value processed through the platform. A quieter month simply costs less.`,
  },
];

const included = [
  {
    title: "Your business presence",
    points: [
      "Professional business software",
      "Unique business URL",
      "Services, gallery and team profiles",
      "Business profile and information",
      "Content management for your pages",
    ],
  },
  {
    title: "The booking journey",
    points: [
      "Online booking",
      "Real-time availability",
      "Appointment management",
      "Booking status and queue visibility",
      "Customer notifications",
    ],
  },
  {
    title: "Services and team",
    points: [
      "Service management",
      "Team and staff management",
      "Rosters, working hours and availability",
      "Roles and permissions for your staff",
    ],
  },
  {
    title: "Customers",
    points: [
      "Customer management",
      "Customer portal for your customers",
      "Visit history and preferences",
      "Membership and loyalty capabilities",
    ],
  },
  {
    title: "Payments and reporting",
    points: [
      "Payment collection",
      "Revenue analytics",
      "Booking analytics",
      "Finance and reporting views",
    ],
  },
  {
    title: "Running the business",
    points: [
      "Business Management Dashboard",
      "Customer insights",
      "Marketing and follow-up",
      "Guided setup from account to live site",
    ],
  },
];

const audiences = [
  {
    title: "Independent",
    description:
      "For independent professionals and business owners who want professional tools to manage customers, services, bookings, and daily operations.",
  },

  {
    title: "Growing Team",
    description:
      "For businesses with a growing team that need to manage staff, services, schedules, appointments, and customers in one place.",
  },

  {
    title: "Specialist Studio",
    description:
      "For focused service businesses where specialized services, customer relationships, and a smooth booking experience matter most.",
  },

  {
    title: "Multi-location Group",
    description:
      "For businesses operating across multiple locations, with the tools to manage teams, services, customers, bookings, and operations across each location.",
  },
];


const faqs = [
  {
    q: "Is there a monthly subscription?",
    a: "No. Fyncho's pricing is based on the eligible booking and payment value processed through the platform, rather than a fixed monthly subscription.",
  },
  {
    q: "Are features restricted by plan?",
    a: `No. Fyncho does not use feature-based subscription tiers. Every business receives the same platform capabilities and the same ${PLATFORM_FEE_LABEL} rate.`,
  },
  {
    q: "What percentage does Fyncho charge?",
    a: `Fyncho charges ${PLATFORM_FEE_LABEL} of the eligible booking and payment value processed through your Fyncho software. That single figure is the complete platform charge, and it never changes.`,
  },
  {
    q: "How will I know what this costs me each month?",
    a: `The fee follows the booking value your customers bring through Fyncho, so your figure is ${PLATFORM_FEE_LABEL} of whatever you actually take — visible against real bookings rather than a fixed monthly bill. Because the rate never changes, only the value it applies to moves.`,
  },
  {
    q: "Is there a setup fee?",
    a: "No. Creating your business, claiming your Fyncho address and publishing your software carry no setup fee.",
  },
  {
    q: "Do payment gateways charge separately?",
    a: `A payment gateway processing fee applies to online payments where applicable, and it is a separate amount from the Fyncho platform fee. Fyncho configures the payment gateway for your business, so there is nothing for you to set up or research. Your Fyncho fee remains ${PLATFORM_FEE_LABEL} as stated — the two amounts are never combined.`,
  },
  {
    q: "What happens if I have fewer bookings?",
    a: "A lighter period carries a lighter fee. Because the platform fee is calculated on booking and payment volume, it follows your calendar down as readily as it follows it up.",
  },
  {
    q: "What happens as my business grows?",
    a: "Your platform cost scales with your booking activity, so the pricing model grows with the business. The rate itself never changes — only the booking value it applies to.",
  },
];

type ChargeLine = {
  label: string;
  detail: string;
  /** A rate Fyncho can state outright. */
  rate?: string;
  /** Used when the rate belongs to a third party and cannot be stated. */
  rateNote?: string;
};

const charges: ChargeLine[] = [
  {
    label: "Fyncho platform fee",
    detail: `${PLATFORM_FEE_LABEL} of the eligible booking and payment value processed through your Fyncho software. One rate, the same for every business, covering the entire platform.`,
    rate: PLATFORM_FEE_LABEL,
  },
  {
    label: "Payment gateway processing fee",
    detail:
      "Where applicable, charged on each online transaction and varying by payment method. Fyncho configures the payment gateway for your business, so this is handled as part of your setup.",
    rateNote: "Applicable",
  },
];

const modelComparison = {
  traditional: {
    label: "Traditional model",
    headline: "Fixed monthly subscription",
    detail: "A flat figure that stays the same whether bookings are low or high.",
    formula: "Fixed monthly fee → the same amount regardless of volume",
  },
  fyncho: {
    label: "Fyncho model",
    headline: `${PLATFORM_FEE_LABEL} on bookings processed`,
    detail: "A single rate that settles in proportion to the business you run.",
    formula: "Booking activity → small platform fee → cost scales with usage",
  },
};

export default function PricingPage() {
  return (
    <SiteShell>
      <PageHero
        eyebrow="Pricing"
        title={<>Pay as you grow.</>}
        intro={`No monthly plans. No feature restrictions. Just a simple fee of ${PLATFORM_FEE_LABEL} on bookings processed through Fyncho — a single rate that stays clear, steady and easy to forecast. Online payments also carry a payment gateway processing fee, stated separately as applicable.`}
        image="/assets/admin-website/avivane-banner-interior.jpg"
        imageAlt="Elegant modern beauty studio interior with brass details"
      />

      {/* Pricing model — the percentage is the focal point, not a plan card. */}
      <section className="mx-auto max-w-6xl px-6 pb-20">
        <div className="relative overflow-hidden rounded-3xl bg-primary px-8 py-14 shadow-lift ring-1 ring-brass/30 sm:px-14 sm:py-20">
          <div className="grid gap-12 lg:grid-cols-12 lg:items-end">
            <div className="lg:col-span-6">
              <span className="rule-brass" />
              <p className="eyebrow mt-7">A simple fee on bookings</p>
              <p className="mt-5 font-display text-7xl leading-[0.85] text-brass sm:text-8xl lg:text-9xl">
                {PLATFORM_FEE_LABEL}
              </p>
              <p className="mt-6 max-w-[34ch] text-lg leading-relaxed text-pretty text-primary-foreground/70">
                of eligible booking and payment value processed through your Fyncho software.
              </p>
              <GatewayCharge tone="onDark" />
            </div>
            <ul className="divide-y divide-primary-foreground/15 border-y border-primary-foreground/15 lg:col-span-6">
              {assurances.map((item, i) => (
                <li key={item.title} className="grid grid-cols-[auto_1fr] gap-x-5 py-6">
                  <span className="font-mono text-[11px] tracking-[0.18em] text-brass/70">
                    {String(i + 1).padStart(2, "0")}
                  </span>
                  <div>
                    <h2 className="text-2xl text-primary-foreground">{item.title}</h2>
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

      {/* Traditional vs Fyncho */}
      <section className="border-y border-line bg-surface py-20 sm:py-28">
        <div className="mx-auto max-w-6xl px-6">
          <SectionHeading
            eyebrow="Why it works differently"
            title="Fyncho grows with your business, not against it."
            description="With a booking-based fee, the amount settles where the work is. A lighter week costs proportionately less and a full one proportionately more, which keeps the figure easy to read and easy to plan around."
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

      {/* How it works */}
      <section className="mx-auto max-w-6xl px-6 py-20 sm:py-28">
        <SectionHeading
          eyebrow="How it works"
          title="Three steps, and the fee follows the bookings."
          description="The fee settles alongside the bookings you actually take, which keeps your monthly figure proportionate and straightforward to anticipate."
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
              <p className="max-w-[56ch] text-pretty text-muted-foreground sm:col-span-6">{step.d}</p>
            </li>
          ))}
        </ol>
      </section>

      {/* Everything included */}
      <section className="border-y border-line bg-surface py-20 sm:py-28">
        <div className="mx-auto max-w-6xl px-6">
          <SectionHeading
            eyebrow="No feature restrictions"
            title="Everything you need. One platform."
            description="Every capability below is part of the standard Fyncho platform, available to your business from the first day. There are no tiers to choose between and nothing to upgrade in order to use it."
          />
          <img
            src="/assets/admin-website/dashboard-preview.jpg"
            alt="The Fyncho owner dashboard showing appointments, revenue and customers"
            loading="lazy"
            width={1408}
            height={912}
            className="mt-10 w-full rounded-2xl border border-line bg-background shadow-lift"
          />
          <div className="mt-12 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {included.map((group, i) => (
              <div key={group.title} className="card-lux bg-background p-7">
                <span className="numeral">{String(i + 1).padStart(2, "0")}</span>
                <h3 className="mt-4 text-2xl">{group.title}</h3>
                <ul className="mt-5 space-y-3 text-sm">
                  {group.points.map((point) => (
                    <li key={point} className="flex gap-3 text-muted-foreground">
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

      {/* Who Fyncho is for */}
      <section className="mx-auto max-w-6xl px-6 py-20 sm:py-28">
        <SectionHeading
          eyebrow="Who Fyncho is for"
          title="The same platform, whichever kind of business you run."
          description="These are business types, not pricing tiers. Each one runs on the same platform with the same capabilities and the same booking-based fee — Fyncho simply scales with whichever you are."
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

      {/* Payment transparency */}
      <section className="border-y border-line bg-surface py-20 sm:py-28">
        <div className="mx-auto max-w-6xl px-6">
          <div className="grid gap-12 lg:grid-cols-12">
            <div className="lg:col-span-5">
              <SectionHeading
                eyebrow="Payment transparency"
                title="Payment processing is separate."
                description="When a customer pays you through Fyncho, two clearly labelled amounts can apply to the same booking. Both are stated here as rates, so there is nothing further to work out before you start."
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
                          <span aria-hidden="true" className="font-mono text-xs text-brass/60">
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
                    The two are shown separately and are never combined, so your Fyncho platform fee
                    stays at {PLATFORM_FEE_LABEL}. Gateway processing rates vary by payment method,
                    which is why Fyncho does not quote a figure here — the rate that applies to your
                    business is confirmed when we configure the gateway as part of your setup.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="mx-auto max-w-3xl px-6 py-20 sm:py-28">
        <SectionHeading eyebrow="Pricing questions" title="Straight answers before you decide." />
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
        title="Your business, online — at one clear rate."
        description={`Create your business software, start taking bookings, and pay a single ${PLATFORM_FEE_LABEL} platform fee on the bookings that come through it. Online payments also carry a payment gateway processing fee, shown separately as applicable.`}
        primary={{ label: "Start with Fyncho", to: "/register" }}
        secondary={{ label: "Talk to us", to: "/contact" }}
      />
    </SiteShell>
  );
}

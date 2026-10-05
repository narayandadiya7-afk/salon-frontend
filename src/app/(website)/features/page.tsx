import type { Metadata } from "next";
import { SiteShell, PageHero } from "@/components/admin/admin-website/site-shell";
import { ClosingCta, MetricBand, SectionHeading } from "@/components/admin/admin-website/marketing-sections";
import { features } from "@/data/fyncho-website";

const TITLE = "Features — Business Management & Booking Software | Fyncho";
const DESCRIPTION =
  "Manage services, teams, customers, bookings, payments, memberships, loyalty and business performance from one professional platform with Fyncho.";

export const metadata: Metadata = {
  title: TITLE,
  description: DESCRIPTION,
  openGraph: { title: TITLE, description: DESCRIPTION, type: "website" },
  twitter: { card: "summary_large_image" },
};

const chapters = [
  {
    number: "01",
    eyebrow: "Present your business",
    title: "Give your business a professional place customers can return to.",
    description:
      "Fyncho brings your business information, services, team, gallery and contact details together in one professional online presence. Customers have a clear place to understand what you offer and move into booking.",
    points: [
      "Unique business address",
      "Professional business presence",
      "Service and team profiles",
      "Gallery and contact details",
    ],
  },
  {
    number: "02",
    eyebrow: "Make booking easier",
    title: "Let customers book around your real services and team availability.",
    description:
      "Fyncho connects services, durations, team availability and appointments so customers can find bookable times without relying on messages or manual coordination.",
    points: [
      "Online booking",
      "Service durations and pricing",
      "Team availability",
      "Deposits and booking requirements",
    ],
  },
  {
    number: "03",
    eyebrow: "Manage every customer",
    title: "Keep customer and appointment information together.",
    description:
      "Customer profiles and appointment history give your business a clear view of its customer relationships. Your team can manage bookings and customer information without keeping separate records across different systems.",
    points: [
      "Customer profiles",
      "Appointment history",
      "Customer accounts",
      "Membership and loyalty information",
    ],
  },
];

export default function FeaturesPage() {
  return (
    <SiteShell>
      <PageHero
        eyebrow="Platform features"
        title={<>Everything your service business needs to run in one place.</>}
        intro="Fyncho brings your business presence, services, team, customers, bookings, payments and day-to-day management together in one connected platform."
        image="/assets/admin-website/feature-banner.jpg"
        imageAlt="Professional service business workspace"
      />

      <section className="mx-auto max-w-6xl px-6 pb-20">
        <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {features.map((f, i) => (
            <div key={f.t} className="card-lux p-7">
              <span className="numeral">{String(i + 1).padStart(2, "0")}</span>
              <h2 className="mt-4 text-2xl">{f.t}</h2>
              <p className="mt-3 text-sm leading-relaxed text-muted-foreground">{f.d}</p>
            </div>
          ))}
        </div>
      </section>

      <section className="border-y border-line bg-surface py-20">
        <div className="mx-auto max-w-6xl px-6">
          <SectionHeading
            eyebrow="Built as one system"
            title="Your business information and daily operations stay connected."
            description="Services, team availability, customers, bookings and payments work together so you can manage the business from one place instead of relying on disconnected tools."
          />

          <div className="mt-12">
            <MetricBand
              items={[
                {
                  value: "24/7",
                  label: "Online booking",
                  detail: "Customers can explore services and book when it suits them.",
                },
                {
                  value: "1",
                  label: "Business platform",
                  detail: "Services, team, customers and bookings in one place.",
                },
                {
                  value: "1%",
                  label: "Fyncho fee",
                  detail: "A simple percentage-based model as your business grows.",
                },
                {
                  value: "1",
                  label: "Business address",
                  detail: "A professional place customers can easily find and share.",
                },
              ]}
            />
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-6xl px-6 py-20 sm:py-28">
        <div className="divide-y divide-line border-y border-line">
          {chapters.map((chapter, index) => (
            <article
              key={chapter.number}
              className="grid gap-8 py-12 lg:grid-cols-12 lg:gap-12 lg:py-16"
            >
              <div className="lg:col-span-2">
                <span className="font-mono text-xs text-brass">{chapter.number}</span>
              </div>

              <div className="lg:col-span-6">
                <p className="eyebrow">{chapter.eyebrow}</p>

                <h2 className="mt-4 text-3xl leading-tight text-balance sm:text-4xl">
                  {chapter.title}
                </h2>

                <p className="mt-5 leading-relaxed text-pretty text-muted-foreground">
                  {chapter.description}
                </p>
              </div>

              <ul className="space-y-4 lg:col-span-4 lg:pt-8">
                {chapter.points.map((point) => (
                  <li
                    key={point}
                    className="flex items-start gap-3 border-b border-line pb-4 text-sm last:border-b-0"
                  >
                    <span className="font-mono text-brass">0{index + 1}</span>
                    <span>{point}</span>
                  </li>
                ))}
              </ul>
            </article>
          ))}
        </div>
      </section>

      <section className="border-y border-line bg-surface py-20">
        <div className="mx-auto max-w-6xl px-6">
          <div className="max-w-xl">
            <p className="eyebrow">Business management dashboard</p>

            <h2 className="mt-3 text-4xl leading-tight text-balance sm:text-5xl">
              A clear view of your business, every day.
            </h2>

            <p className="mt-4 text-pretty text-muted-foreground">
              See appointments, customers, services, team activity, revenue and business
              performance from the same management dashboard.
            </p>
          </div>

          <img
            src="/assets/admin-website/dashboard-preview.jpg"
            alt="Fyncho business management dashboard"
            loading="lazy"
            width={1408}
            height={912}
            className="mt-10 w-full rounded-2xl border border-line shadow-lift"
          />
        </div>
      </section>

      <section className="mx-auto grid max-w-6xl grid-cols-1 items-center gap-12 px-6 py-20 lg:grid-cols-2 lg:py-28">
        <img
          src="/assets/admin-website/mobile-booking.jpg"
          alt="Customer booking an appointment on a mobile phone"
          loading="lazy"
          width={912}
          height={1104}
          className="aspect-4/5 w-full rounded-2xl object-cover"
        />

        <div>
          <p className="eyebrow">The customer side</p>

          <h2 className="mt-4 text-4xl leading-tight text-balance sm:text-5xl">
            Make it simple for customers to discover, book and return.
          </h2>

          <p className="mt-5 leading-relaxed text-pretty text-muted-foreground">
            Customers can explore your services, see available times, choose a team member
            where applicable, complete the booking and manage their appointments through
            your Fyncho business presence.
          </p>

          <dl className="mt-8 divide-y divide-line border-y border-line">
            {[
              [
                "Explore",
                "Clear services, prices, durations, team information and business details.",
              ],
              [
                "Book",
                "Available appointment times based on your services and team availability.",
              ],
              [
                "Return",
                "Customer accounts, appointment history and an easier path to book again.",
              ],
            ].map(([term, detail]) => (
              <div key={term} className="grid grid-cols-3 gap-4 py-5">
                <dt className="font-display text-xl">{term}</dt>
                <dd className="col-span-2 text-sm leading-relaxed text-muted-foreground">
                  {detail}
                </dd>
              </div>
            ))}
          </dl>
        </div>
      </section>

      <ClosingCta
        title="Bring your business together in one platform."
        description="Manage your services, team, customers, bookings and payments from professional business software built for service businesses."
        secondary={{ label: "View Pricing", to: "/pricing" }}
      />
    </SiteShell>
  );
}
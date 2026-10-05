import type { Metadata } from "next";
import Link from "next/link";
import {
  SiteShell,
  PageHero,
} from "@/components/admin/admin-website/site-shell";
import {
  ClosingCta,
  SectionHeading,
} from "@/components/admin/admin-website/marketing-sections";

const TITLE = "Solutions — Beauty, Wellness, Grooming & Personal-Care Software | Fyncho";

const DESCRIPTION =
  "Fyncho fits hair salons, barbershops, spas, nail studios, massage therapists, skin care studios, makeup artists, wellness centers, and independent professionals.";

export const metadata: Metadata = {
  title: TITLE,
  description: DESCRIPTION,
  openGraph: { title: TITLE, description: DESCRIPTION, type: "website" },
  twitter: { card: "summary_large_image" },
};

const solutionGroups = [
  {
    group: "Salons & Studios",
    solutions: [
      {
        t: "Hair Salons",
        d: "Manage hair services, durations, stylist schedules, online bookings, customers, and payments in one place.",
        to: "/solutions/hair-salon",
      },
      {
        t: "Beauty Salons",
        d: "Manage a wide range of beauty services, team schedules, customers, bookings, memberships, and payments.",
        to: "/solutions/beauty-salon",
      },
      {
        t: "Nail Salons",
        d: "Manage nail services, team availability, online bookings, customer information, and payments with ease.",
        to: "/solutions/nail-salon",
      },
      {
        t: "Lash & Brow Studios",
        d: "Manage lash and brow services, team schedules, customer appointments, gallery content, and online bookings.",
        to: "/solutions/lash-brow",
      },
      {
        t: "Makeup Artists",
        d: "Manage makeup services, online bookings, customers, deposits, payments, and your professional gallery.",
        to: "/solutions/makeup-artist",
      },
      {
        t: "Bridal Services",
        d: "Manage bridal beauty services, important appointments, customers, deposits, payments, and your professional presence.",
        to: "/solutions/bridal",
      },
    ],
  },
  {
    group: "Wellness, Skin & Body",
    solutions: [
      {
        t: "Spa",
        d: "Manage spa services, team schedules, online bookings, customers, memberships, and payments in one place.",
        to: "/solutions/spa",
      },
      {
        t: "Massage Therapy",
        d: "Manage massage services, practitioner availability, online bookings, customers, deposits, and payments.",
        to: "/solutions/massage-therapy",
      },
      {
        t: "Wellness Centers",
        d: "Bring wellness services, team schedules, customers, bookings, memberships, and payments together in one platform.",
        to: "/solutions/wellness",
      },
      {
        t: "Skin Care & Facials",
        d: "Manage skin care services, appointment scheduling, team availability, customers, memberships, and payments.",
        to: "/solutions/skincare",
      },
      {
        t: "Waxing & Hair Removal",
        d: "Manage waxing services, team schedules, repeat bookings, customers, deposits, and payments from one place.",
        to: "/solutions/waxing",
      },
    ],
  },
  {
    group: "Grooming & Solo Professionals",
    solutions: [
      {
        t: "Barbershops",
        d: "Manage grooming services, barber schedules, online bookings, customers, loyalty, and payments.",
        to: "/solutions/barbershop",
      },
      {
        t: "Men's Grooming",
        d: "Manage grooming services, memberships, loyalty, customer relationships, bookings, and payments.",
        to: "/solutions/mens-grooming",
      },
      {
        t: "Freelancers",
        d: "Professional business software for independent beauty and wellness professionals with online booking and customer management.",
        to: "/solutions/freelancers",
      },
    ],
  },
];

export default function SolutionsPage() {
  return (
    <SiteShell>
      <PageHero
        eyebrow="Solutions"
        title={<>Built for the way your business actually runs.</>}
        intro="The platform is the same. The fit is not. Fyncho adapts to the needs of service-based businesses — from an independent professional to a growing team or multi-location business."
        image="/assets/admin-website/solution-banner.png"
        imageAlt="Beauty professional styling a customer in a premium studio"
      />

      {solutionGroups.map((group, gi) => (
        <section
          key={group.group}
          className={`py-16 sm:py-20 ${
            gi % 2 === 1 ? "border-y border-line bg-surface" : ""
          }`}
        >
          <div className="mx-auto max-w-6xl px-6">
            <div className="mb-10">
              <p className="eyebrow">{group.group}</p>
            </div>

            <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
              {group.solutions.map((s, i) => (
                <Link
                  key={s.t}
                  href={s.to}
                  className="card-lux block p-8 transition-all duration-300 hover:-translate-y-0.5 hover:shadow-lift"
                >
                  <span className="numeral">
                    {String(i + 1).padStart(2, "0")}
                  </span>

                  <h2 className="mt-4 text-2xl">{s.t}</h2>

                  <p className="mt-3 text-sm leading-relaxed text-muted-foreground">
                    {s.d}
                  </p>

                  <span className="mt-5 block font-mono text-xs uppercase tracking-[0.18em] text-brass">
                    Learn more →
                  </span>
                </Link>
              ))}
            </div>
          </div>
        </section>
      ))}

      <section className="mx-auto max-w-6xl px-6 py-16 text-center">
        <Link
          href="/register"
          className="rounded-full bg-primary px-7 py-3.5 text-sm font-semibold text-primary-foreground transition-colors hover:bg-brass-soft"
        >
          Get Started Free
        </Link>
      </section>

      <section className="border-y border-line bg-surface py-20 sm:py-28">
        <div className="mx-auto max-w-6xl px-6">
          <SectionHeading
            eyebrow="A platform that fits the trade"
            title="Different businesses need different services — not different systems."
            description="Fyncho brings services, team management, customers, bookings, payments, memberships, and loyalty together in one business platform."
          />

          <div className="mt-12 divide-y divide-line border-y border-line">
            {[
              [
                "Services",
                "Manage your services with clear descriptions, durations, and pricing so customers know exactly what they are booking.",
              ],
              [
                "People",
                "Manage team members, availability, schedules, services, and appointments in one place.",
              ],
              [
                "Customers",
                "Keep customer profiles and appointment history organized so your team can provide a consistent experience.",
              ],
              [
                "Growth",
                "Use online booking, deposits, payments, memberships, loyalty, and business reports to support your day-to-day operations and customer relationships.",
              ],
            ].map(([title, copy], index) => (
              <div
                key={title}
                className="grid gap-4 py-7 sm:grid-cols-12"
              >
                <span className="font-mono text-xs text-brass sm:col-span-1">
                  0{index + 1}
                </span>

                <h3 className="text-2xl sm:col-span-3">{title}</h3>

                <p className="leading-relaxed text-muted-foreground sm:col-span-8">
                  {copy}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-6xl px-6 py-20 sm:py-28">
        <div className="grid gap-12 lg:grid-cols-2">
          <SectionHeading
            eyebrow="From independent professionals to growing businesses"
            title="Your business can grow without changing the platform."
            description="Start with the tools you need today and manage more customers, team members, services, and locations as your business grows."
          />

          <div className="grid gap-4 sm:grid-cols-2">
            {[
              [
                "Independent",
                "Everything you need to manage your services, customers, bookings, payments, and daily business operations.",
              ],
              [
                "Growing Team",
                "Bring your team, appointments, services, schedules, and customers together in one place.",
              ],
              [
                "Specialist Studio",
                "Present your services professionally, manage bookings, and build lasting customer relationships.",
              ],
              [
                "Multi-Location Group",
                "Manage multiple locations, teams, services, customers, and bookings from one platform.",
              ],
            ].map(([title, copy], index) => (
              <div key={title} className="card-lux p-7">
                <span className="numeral">0{index + 1}</span>

                <h3 className="mt-4 text-2xl">{title}</h3>

                <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
                  {copy}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <ClosingCta
        title="Choose a platform that fits the business you are building."
        description="Launch your business software with the tools you need today and grow with Fyncho as your business evolves."
        secondary={{ label: "Explore Features", to: "/features" }}
      />
    </SiteShell>
  );
}
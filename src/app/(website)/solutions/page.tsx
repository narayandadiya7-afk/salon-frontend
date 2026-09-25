import type { Metadata } from "next";
import Link from "next/link";
import { SiteShell, PageHero } from "@/components/admin/admin-website/site-shell";
import { ClosingCta, SectionHeading } from "@/components/admin/admin-website/marketing-sections";

const TITLE = "Solutions — Beauty, Wellness, Grooming & Personal-Care Software | Fyncho";
const DESCRIPTION =
  "Fyncho fits hair salons, barbershops, spas, nail studios, massage therapists, skin care clinics, makeup artists, wellness centres and independent professionals.";

export const metadata: Metadata = {
  title: TITLE,
  description: DESCRIPTION,
  openGraph: { title: TITLE, description: DESCRIPTION, type: "website" },
  twitter: { card: "summary_large_image" },
};

const solutionGroups = [
  {
    group: "Beauty",
    solutions: [
      {
        t: "Hair Salons",
        d: "Colour timings, multi-stage services and stylist-level booking rules built into the calendar.",
        to: "/solutions/hair-salon",
      },
      {
        t: "Beauty Salons",
        d: "Full-service booking, service menus with add-ons, and a customer-facing software that matches your brand.",
        to: "/solutions/beauty-salon",
      },
      {
        t: "Nail Salons",
        d: "Short-service menus, technician scheduling, add-ons and a gallery that shows the work clearly.",
        to: "/solutions/nail-salon",
      },
      {
        t: "Makeup Artists",
        d: "Bridal, event and party bookings with packages, deposits and a polished professional profile.",
        to: "/solutions/makeup-artist",
      },
      {
        t: "Lash & Brow Studios",
        d: "Appointment-based scheduling with precise treatment durations and customer patch-test records.",
        to: "/solutions/lash-brow",
      },
      {
        t: "Bridal Services",
        d: "Trial appointments, wedding-day bookings, packages and the detailed planning that bridal customers expect.",
        to: "/solutions/bridal",
      },
    ],
  },
  {
    group: "Grooming",
    solutions: [
      {
        t: "Barbershops",
        d: "Fast rebooking, walk-in management and loyalty for customers who return every few weeks.",
        to: "/solutions/barbershop",
      },
      {
        t: "Men's Grooming",
        d: "Grooming packages, memberships and a modern booking experience built for today's grooming customer.",
        to: "/solutions/mens-grooming",
      },
    ],
  },
  {
    group: "Wellness",
    solutions: [
      {
        t: "Spa",
        d: "Room-based scheduling, spa packages and treatment series with a calm, editorial software.",
        to: "/solutions/spa",
      },
      {
        t: "Massage Therapy",
        d: "Therapist availability, treatment types, intake forms and series bookings managed from one place.",
        to: "/solutions/massage-therapy",
      },
      {
        t: "Wellness Centers",
        d: "Multi-practitioner scheduling, memberships and a clean customer journey for mind-and-body businesses.",
        to: "/solutions/wellness",
      },
      {
        t: "Yoga & Pilates Studios",
        d: "Class scheduling, memberships, packages and a booking flow that works for both regular and drop-in customers.",
        to: "/solutions/yoga-pilates",
      },
    ],
  },
  {
    group: "Aesthetics & Skin",
    solutions: [
      {
        t: "Skin Care & Facials",
        d: "Consultation flows, treatment records and a customer-facing booking experience suited to aesthetic services.",
        to: "/solutions/skincare",
      },
      {
        t: "Aesthetic Clinics",
        d: "Deposits, consent records and appointment management for higher-value clinical treatments.",
        to: "/solutions/aesthetic-clinic",
      },
      {
        t: "Med-Spa",
        d: "The operational depth of a clinic with the customer experience of a luxury spa — in one platform.",
        to: "/solutions/med-spa",
      },
    ],
  },
  {
    group: "Independent Professionals",
    solutions: [
      {
        t: "Freelancers",
        d: "A professional software, direct bookings and customer management for beauty and wellness freelancers.",
        to: "/solutions/freelancers",
      },
      {
        t: "Home-Service Professionals",
        d: "Manage appointments, travel logistics and customer records as a mobile beauty or wellness professional.",
        to: "/solutions/home-services",
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
        intro="The platform is the same. The fit is not. Fyncho adapts to the rhythm of your trade — from a single-chair studio to a multi-location group."
        image="/assets/admin-website/avivane-banner-craft.jpg"
        imageAlt="Beauty professional styling a customer in a premium studio"
      />

      {solutionGroups.map((group, gi) => (
        <section
          key={group.group}
          className={`py-16 sm:py-20 ${gi % 2 === 1 ? "border-y border-line bg-surface" : ""}`}
        >
          <div className="mx-auto max-w-6xl px-6">
            <div className="mb-10">
              <p className="eyebrow">{group.group}</p>
            </div>
            <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
              {group.solutions.map((s, i) => (
                <Link key={s.t} href={s.to} className="card-lux block p-8 transition-all duration-300 hover:-translate-y-0.5 hover:shadow-lift">
                  <span className="numeral">{String(i + 1).padStart(2, "0")}</span>
                  <h2 className="mt-4 text-2xl">{s.t}</h2>
                  <p className="mt-3 text-sm leading-relaxed text-muted-foreground">{s.d}</p>
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
            title="Different businesses need different rules — not different systems."
            description="Fyncho adapts scheduling, service structure and customer journeys to the operating model behind your brand."
          />
          <div className="mt-12 divide-y divide-line border-y border-line">
            {[
              ["Time", "Control service duration, processing time, buffers, simultaneous appointments and room availability."],
              ["People", "Set working hours, skills, pricing levels and booking eligibility for every professional on your team."],
              ["Value", "Support deposits, packages, memberships, add-ons and repeat-booking incentives."],
              ["Scale", "Keep each location distinct while seeing performance across the whole business."],
            ].map(([title, copy], index) => (
              <div key={title} className="grid gap-4 py-7 sm:grid-cols-12">
                <span className="font-mono text-xs text-brass sm:col-span-1">0{index + 1}</span>
                <h3 className="text-2xl sm:col-span-3">{title}</h3>
                <p className="leading-relaxed text-muted-foreground sm:col-span-8">{copy}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-6xl px-6 py-20 sm:py-28">
        <div className="grid gap-12 lg:grid-cols-2">
          <SectionHeading
            eyebrow="From one chair to many locations"
            title="Your operating model can change without rebuilding your digital presence."
            description="Begin with the essentials, then introduce more staff, rooms, membership programmes or locations when the business is ready."
          />
          <div className="grid gap-4 sm:grid-cols-2">
            {[
              [
                "Independent",
                "Everything you need to run your business, manage customers, and stay in control.",
              ],
              [
                "Growing Team",
                "Bring your team, appointments, services, and customers together in one place.",
              ],
              [
                "Specialist Studio",
                "Showcase your expertise, manage bookings, and build lasting customer relationships.",
              ],
              [
                "Multi-Location Group",
                "Manage multiple locations, teams, and day-to-day operations from one platform.",
              ],
            ].map(([title, copy], index) => (
              <div key={title} className="card-lux p-7">
                <span className="numeral">0{index + 1}</span>
                <h3 className="mt-4 text-2xl">{title}</h3>
                <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{copy}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <ClosingCta
        title="Choose a platform that fits the business you are building."
        description="Launch your software now and add the operational depth your business needs as it grows."
        secondary={{ label: "Explore Features", to: "/features" }}
      />
    </SiteShell>
  );
}

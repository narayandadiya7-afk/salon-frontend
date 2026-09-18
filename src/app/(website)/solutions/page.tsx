import type { Metadata } from "next";
import Link from "next/link";
import { SiteShell, PageHero } from "@/components/admin/admin-website/site-shell";
import { ClosingCta, SectionHeading } from "@/components/admin/admin-website/marketing-sections";

const TITLE = "Solutions — Salons, Spas, Barbershops & Clinics | Avivane";
const DESCRIPTION =
  "Avivane fits hair salons, spas, barbershops, nail studios, wellness businesses and multi-location beauty groups.";

export const metadata: Metadata = {
  title: TITLE,
  description: DESCRIPTION,
  openGraph: { title: TITLE, description: DESCRIPTION, type: "website" },
  twitter: { card: "summary_large_image" },
};

const solutions = [
  {
    t: "Hair Salons",
    d: "Colour timings, multi-stage services and stylist-level booking rules built into the calendar.",
  },
  {
    t: "Spas & Wellness",
    d: "Room-based scheduling, packages and treatment series with a calm, editorial website to match.",
  },
  {
    t: "Barbershops",
    d: "Fast rebooking, walk-in queues and loyalty for clients who come back every three weeks.",
  },
  {
    t: "Nail Studios",
    d: "Short-service menus, add-ons and a gallery that shows the work as clearly as a portfolio.",
  },
  {
    t: "Beauty Clinics",
    d: "Consultation flows, deposits and client records suited to higher-value treatments.",
  },
  {
    t: "Multi-location Groups",
    d: "One brand, several locations, one platform — with reporting across the whole group.",
  },
];

export default function SolutionsPage() {
  return (
    <SiteShell>
      <PageHero
        eyebrow="Solutions"
        title={<>Built for the way your business actually runs.</>}
        intro="The platform is the same. The fit is not. Avivane adapts to the rhythm of your trade, from a single chair to a group of studios."
        image="/assets/admin-website/avivane-banner-craft.jpg"
        imageAlt="Salon professional styling a client in a premium studio"
      />

      <section className="mx-auto max-w-6xl px-6 pb-20">
        <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {solutions.map((s, i) => (
            <div key={s.t} className="card-lux p-8">
              <span className="numeral">{String(i + 1).padStart(2, "0")}</span>
              <h2 className="mt-4 text-2xl">{s.t}</h2>
              <p className="mt-3 text-sm leading-relaxed text-muted-foreground">{s.d}</p>
            </div>
          ))}
        </div>

        <div className="mt-16 text-center">
          <Link
            href="/register"
            className="rounded-full bg-primary px-7 py-3.5 text-sm font-semibold text-primary-foreground transition-colors hover:bg-brass-soft"
          >
            Get Your Salon Website
          </Link>
        </div>
      </section>

      <section className="border-y border-line bg-surface py-20 sm:py-28">
        <div className="mx-auto max-w-6xl px-6">
          <SectionHeading eyebrow="A platform that fits the trade" title="Different businesses need different rules — not different systems." description="Avivane adapts scheduling, service structure and client journeys to the operating model behind your brand." />
          <div className="mt-12 divide-y divide-line border-y border-line">
            {[
              ["Time", "Control service duration, processing time, buffers, simultaneous appointments and room availability."],
              ["People", "Set working hours, skills, pricing levels and booking eligibility for every professional."],
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
          <SectionHeading eyebrow="From one chair to many locations" title="Your operating model can change without rebuilding your digital presence." description="Begin with the essentials, then introduce more staff, rooms, membership programmes or locations when the business is ready." />
          <div className="grid gap-4 sm:grid-cols-2">
            {["Independent", "Growing team", "Specialist studio", "Multi-location group"].map((item, index) => (
              <div key={item} className="card-lux p-7"><span className="numeral">0{index + 1}</span><h3 className="mt-4 text-2xl">{item}</h3><p className="mt-2 text-sm leading-relaxed text-muted-foreground">One identity, clear controls and the right level of operational visibility.</p></div>
            ))}
          </div>
        </div>
      </section>

      <ClosingCta title="Choose a platform that fits the salon you are building." description="Launch your website now and add the operating depth your business needs as it grows." secondary={{ label: "Explore Features", to: "/features" }} />
    </SiteShell>
  );
}
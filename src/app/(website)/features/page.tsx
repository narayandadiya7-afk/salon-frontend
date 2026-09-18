import type { Metadata } from "next";
import { SiteShell, PageHero } from "@/components/admin/admin-website/site-shell";
import { ClosingCta, MetricBand, SectionHeading } from "@/components/admin/admin-website/marketing-sections";

const TITLE = "Features — One Platform for Your Whole Salon | Avivane";
const DESCRIPTION =
  "Salon website, online booking, customers, staff, services, payments, memberships, loyalty, analytics and marketing — all in one salon platform.";

export const metadata: Metadata = {
  title: TITLE,
  description: DESCRIPTION,
  openGraph: { title: TITLE, description: DESCRIPTION, type: "website" },
  twitter: { card: "summary_large_image" },
};

const features = [
  { t: "Salon Website", d: "A branded, responsive website at your own URL, with services, team and gallery." },
  { t: "Online Booking", d: "Customers pick a service, a stylist and a time — around the clock." },
  { t: "Customer Management", d: "Profiles, visit history, notes and preferences in one tidy record." },
  { t: "Staff Management", d: "Rosters, working hours, availability and per-stylist performance." },
  { t: "Services", d: "Menus, durations, pricing tiers and add-ons for every treatment you offer." },
  { t: "Appointments", d: "A calendar built for the floor — reschedules, no-shows and walk-ins." },
  { t: "Payments", d: "Deposits, card payments and tipping handled at checkout." },
  { t: "Memberships", d: "Recurring plans that turn occasional visitors into monthly regulars." },
  { t: "Loyalty", d: "Points, rewards and referral perks that bring clients back." },
  { t: "Analytics", d: "Revenue, retention and utilisation, read at a glance." },
  { t: "Marketing", d: "Campaigns, reminders and win-back messages sent from your salon." },
  { t: "Reports", d: "Exportable reporting across staff, services and locations." },
];

const chapters = [
  {
    number: "01",
    eyebrow: "Attract and convert",
    title: "A website that makes your salon look as considered as the work you do.",
    description:
      "Your Avivane website brings your services, team, portfolio, policies and booking journey into one branded destination. It gives new clients the confidence to choose you and existing clients the shortest route back to your chair.",
    points: ["Unique salon URL", "Responsive page system", "Service and team profiles", "Gallery and contact details"],
  },
  {
    number: "02",
    eyebrow: "Book with confidence",
    title: "Availability, deposits and reminders work together behind every booking.",
    description:
      "Clients see only the services and times they can actually book. Duration, staff eligibility, preparation time and working hours are resolved before a slot appears, while confirmations keep everyone aligned.",
    points: ["Real-time availability", "Stylist and resource rules", "Deposits and cancellation terms", "Automatic confirmations"],
  },
  {
    number: "03",
    eyebrow: "Know every client",
    title: "Turn appointment history into thoughtful, consistent service.",
    description:
      "Keep preferences, notes, visit history, spend and membership status in one client record. Your team gets the useful context before the appointment without searching through messages or separate systems.",
    points: ["Client profiles and notes", "Visit and purchase history", "Membership and loyalty status", "Consent-aware communications"],
  },
];

export default function FeaturesPage() {
  return (
    <SiteShell>
      <PageHero
        eyebrow="Platform features"
        title={<>Everything unlocks the moment your salon goes live.</>}
        intro="Avivane isn't a dozen separate apps. Create your salon once, and every capability below is part of the same platform, behind the same address."
        image="/assets/admin-website/avivane-banner-business.jpg"
        imageAlt="Premium salon workspace with professional tools and appointment book"
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
            title="Each part understands the rest of your salon."
            description="A booking updates the calendar, the client record and the business view at once. That shared foundation is what keeps Avivane simple as your team, menu and locations grow."
          />
          <div className="mt-12">
            <MetricBand items={[
              { value: "24/7", label: "Booking", detail: "Clients book while you focus on the floor." },
              { value: "1", label: "Client record", detail: "History, notes and value in one place." },
              { value: "0", label: "Marketplace commission", detail: "Direct bookings stay direct." },
              { value: "100%", label: "Your identity", detail: "Your name leads every interaction." },
            ]} />
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-6xl px-6 py-20 sm:py-28">
        <div className="divide-y divide-line border-y border-line">
          {chapters.map((chapter, index) => (
            <article key={chapter.number} className="grid gap-8 py-12 lg:grid-cols-12 lg:gap-12 lg:py-16">
              <div className="lg:col-span-2">
                <span className="font-mono text-xs text-brass">{chapter.number}</span>
              </div>
              <div className="lg:col-span-6">
                <p className="eyebrow">{chapter.eyebrow}</p>
                <h2 className="mt-4 text-3xl leading-tight text-balance sm:text-4xl">{chapter.title}</h2>
                <p className="mt-5 leading-relaxed text-pretty text-muted-foreground">{chapter.description}</p>
              </div>
              <ul className="space-y-4 lg:col-span-4 lg:pt-8">
                {chapter.points.map((point) => (
                  <li key={point} className="flex items-start gap-3 border-b border-line pb-4 text-sm last:border-b-0">
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
            <p className="eyebrow">Salon management preview</p>
            <h2 className="mt-3 text-4xl leading-tight text-balance sm:text-5xl">
              A dashboard that reads like your morning briefing.
            </h2>
            <p className="mt-4 text-pretty text-muted-foreground">
              Appointments, revenue, customers, staff, services and analytics — the salon dashboard
              opens the moment your salon is created.
            </p>
          </div>
          <img
            src="/assets/admin-website/dashboard-preview.jpg"
            alt="Salon dashboard with appointments calendar and revenue chart"
            loading="lazy"
            width={1408}
            height={912}
            className="mt-10 w-full rounded-2xl border border-line shadow-lift"
          />
        </div>
      </section>

      <section className="mx-auto grid max-w-6xl grid-cols-1 items-center gap-12 px-6 py-20 lg:grid-cols-2 lg:py-28">
        <img src="/assets/admin-website/mobile-booking.jpg" alt="Client booking journey on a mobile phone" loading="lazy" width={912} height={1104} className="aspect-4/5 w-full rounded-2xl object-cover" />
        <div>
          <p className="eyebrow">The client side</p>
          <h2 className="mt-4 text-4xl leading-tight text-balance sm:text-5xl">Fast enough for a repeat booking. Beautiful enough for a first impression.</h2>
          <p className="mt-5 leading-relaxed text-pretty text-muted-foreground">Clients move from service discovery to confirmation without leaving your branded website. Returning clients can manage appointments and rebook with less friction.</p>
          <dl className="mt-8 divide-y divide-line border-y border-line">
            {[["Discover", "Clear services, prices, durations and team expertise."], ["Decide", "Live availability and policies presented before checkout."], ["Return", "Accounts, appointment history and simple rebooking."]].map(([term, detail]) => (
              <div key={term} className="grid grid-cols-3 gap-4 py-5"><dt className="font-display text-xl">{term}</dt><dd className="col-span-2 text-sm leading-relaxed text-muted-foreground">{detail}</dd></div>
            ))}
          </dl>
        </div>
      </section>

      <ClosingCta title="Start with the website. Grow into the whole platform." description="Create your salon once, then manage every booking, client, service and decision from the same connected place." secondary={{ label: "View Pricing", to: "/pricing" }} />
    </SiteShell>
  );
}
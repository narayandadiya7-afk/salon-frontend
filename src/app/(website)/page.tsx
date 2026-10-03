import type { Metadata } from "next";
import Link from "next/link";
import { SiteShell } from "@/components/admin/admin-website/site-shell";
import { ClosingCta } from "@/components/admin/admin-website/marketing-sections";
import { homePageFeatures } from "@/data/fyncho-website";

const TITLE =
  "Fyncho — Business Management & Booking Software for Beauty & Wellness";

const DESCRIPTION =
  "Fyncho helps beauty, wellness, grooming, and other service-based businesses manage bookings, services, teams, customers, payments, and daily operations from one platform.";

export const metadata: Metadata = {
  title: TITLE,
  description: DESCRIPTION,
  openGraph: {
    title: TITLE,
    description: DESCRIPTION,
    type: "website",
  },
  twitter: { card: "summary_large_image" },
};

const steps = [
  {
    n: "01",
    t: "Create your account",
    d: "Register your business and get started in minutes.",
  },
  {
    n: "02",
    t: "Choose your URL",
    d: "Choose a unique business address for your Fyncho software.",
  },
  {
    n: "03",
    t: "Set up your business",
    d: "Add your services, team, business information, and gallery.",
  },
  {
    n: "04",
    t: "Go live",
    d: "Share your business address and start accepting bookings.",
  },
];

const bookingFlow = [
  "Visits fyncho.com/glam-studio",
  "Explores your services",
  "Selects a service",
  "Selects a team member",
  "Chooses an available time",
  "Logs in & confirms",
  "Receives confirmation",
];

const businessCategories = [
  {
    group: "Salons & Studios",
    items: [
      { label: "Hair Salons", to: "/solutions/hair-salon" },
      { label: "Beauty Salons", to: "/solutions/beauty-salon" },
      { label: "Nail Salons", to: "/solutions/nail-salon" },
      { label: "Lash & Brow", to: "/solutions/lash-brow" },
      { label: "Makeup Artists", to: "/solutions/makeup-artist" },
      { label: "Bridal", to: "/solutions/bridal" },
    ],
  },
  {
    group: "Wellness, Skin & Body",
    items: [
      { label: "Spa", to: "/solutions/spa" },
      { label: "Massage Therapy", to: "/solutions/massage-therapy" },
      { label: "Wellness Centers", to: "/solutions/wellness" },
      { label: "Skin Care", to: "/solutions/skincare" },
      { label: "Waxing", to: "/solutions/waxing" },
    ],
  },
  {
    group: "Grooming & Solo Professionals",
    items: [
      { label: "Barbershops", to: "/solutions/barbershop" },
      { label: "Men's Grooming", to: "/solutions/mens-grooming" },
      { label: "Freelancers", to: "/solutions/freelancers" },
    ],
  },
];

const faqs = [
  {
    q: "Do I get my own business software?",
    a: "Yes. Every business on Fyncho gets its own professional business software with tools for services, team management, customer management, bookings, payments, memberships, and more.",
  },
  {
    q: "How does my business URL work?",
    a: "Choose a unique name for your business, and Fyncho gives you your own easy-to-remember address, such as fyncho.com/glam-studio, ready to share with your customers.",
  },
  {
    q: "Can customers book and manage appointments online?",
    a: "Yes. Customers can book directly with your business, create an account, view their appointments, and easily return to book again.",
  },
  {
    q: "Can I manage my team, services, and customers?",
    a: "Yes. Fyncho brings your appointments, team members, services, customers, schedules, and business information together in one place.",
  },
  {
    q: "Can I accept payments and offer memberships?",
    a: "Yes. Fyncho supports online payments, deposits, memberships, and loyalty programs to help you manage transactions and build lasting customer relationships.",
  },
  {
    q: "Can I manage my business from anywhere?",
    a: "Yes. Fyncho brings your essential business operations together in one place, making it easy to manage your business wherever you are.",
  },
  {
    q: "What types of businesses does Fyncho support?",
    a: "Fyncho is built for service-based businesses including salons, barbershops, spas, wellness businesses, beauty professionals, studios, and independent professionals.",
  },
];

export default function HomePage() {
  return (
    <SiteShell>
      {/* HERO */}
      <section className="page-banner relative isolate min-h-[calc(100svh-4.5rem)] overflow-hidden bg-primary">
        <img
          src="/assets/admin-website/avivane-banner-interior.jpg"
          alt="Premium modern salon interior with warm light and brass details"
          width={1920}
          height={1088}
          className="banner-image absolute inset-0 h-full w-full object-cover"
        />
        <div className="banner-shade absolute inset-0" />

        <div className="relative mx-auto flex min-h-[calc(100svh-4.5rem)] max-w-6xl flex-col justify-end px-6 py-14 sm:py-20">
          <div className="max-w-4xl">
            <p className="anim-rise eyebrow text-brass">
              Business management &amp; booking software
            </p>

            <h1 className="anim-rise-2 mt-5 font-display text-6xl leading-[0.88] text-balance text-primary-foreground sm:text-8xl lg:text-9xl">
              Your business.{" "}
              <em className="italic text-brass">Your platform.</em>
            </h1>

            <p className="anim-rise-3 mt-6 max-w-[55ch] text-base leading-relaxed text-pretty text-primary-foreground/75 sm:text-lg">
              Fyncho gives beauty, wellness, grooming, and other service-based
              businesses professional business software, online booking, and
              the tools to manage services, teams, customers, and daily
              operations — all from one connected platform.
            </p>

            <div className="anim-rise-3 mt-8 flex flex-wrap items-center gap-3">
              <Link
                href="/register"
                className="rounded-full bg-brass px-7 py-3.5 text-sm font-semibold text-accent-foreground transition-all duration-300 hover:-translate-y-0.5 hover:bg-surface hover:shadow-lift"
              >
                Get Started Free
              </Link>

              <Link
                href="/how-it-works"
                className="rounded-full px-7 py-3.5 text-sm font-semibold text-primary-foreground ring-1 ring-primary-foreground/35 transition-colors hover:bg-primary-foreground/10"
              >
                See how it works
              </Link>
            </div>

            <div className="anim-rise-4 mt-10 flex flex-wrap gap-x-8 gap-y-2 border-t border-primary-foreground/20 pt-5 font-mono text-[10px] uppercase tracking-[0.18em] text-primary-foreground/60">
              <span>No card required</span>
              <span>Live in minutes</span>
              <span>Your address · Your customers · Your business</span>
            </div>
          </div>
        </div>
      </section>

      {/* BUSINESS ADDRESS */}
      <section className="border-y border-line bg-surface py-16">
        <div className="mx-auto max-w-2xl px-6 text-center">
          <p className="eyebrow">Your business address</p>

          <h2 className="mt-4 text-4xl leading-tight text-balance sm:text-5xl">
            Every business gets its own address.
          </h2>

          <p className="mx-auto mt-4 max-w-[52ch] text-pretty text-muted-foreground">
            Give your business its own professional online presence with a
            unique, memorable business address that is ready to share with
            your customers.
          </p>

          <div className="mt-8 flex flex-col items-stretch gap-3 sm:flex-row">
            <div className="flex flex-1 items-center rounded-full bg-background px-5 py-3 ring-1 ring-line">
              <span className="font-mono text-sm text-muted-foreground">
                fyncho.com/
              </span>

              <span className="ml-1 font-mono text-sm text-foreground">
                glam-studio
                <span className="caret text-brass" />
              </span>
            </div>

            <Link
              href="/register"
              className="flex items-center justify-center gap-2 rounded-full bg-primary px-6 py-3 transition-colors hover:bg-brass-soft"
            >
              <span className="text-sm font-semibold text-primary-foreground">
                ✓ Available
              </span>

              <span className="rounded-full bg-brass px-3 py-1 text-xs font-semibold text-accent-foreground">
                Claim it
              </span>
            </Link>
          </div>

          <p className="mt-5 font-mono text-xs text-muted-foreground">
            Your business. Its own address. Bookings from day one.
          </p>
        </div>
      </section>

      {/* WHO IS FYNCHO FOR */}
      <section className="mx-auto max-w-6xl px-6 py-20">
        <div className="mb-12 max-w-xl">
          <p className="eyebrow">Built for your business</p>

          <h2 className="mt-3 text-4xl leading-tight text-balance sm:text-5xl">
            One platform for beauty, wellness, grooming, and beyond.
          </h2>

          <p className="mt-4 text-pretty text-muted-foreground">
            Whether you run a hair salon, barbershop, spa, nail studio, or
            work independently, Fyncho adapts to the way your service business
            operates.
          </p>
        </div>

        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {businessCategories.map((cat) => (
            <div key={cat.group} className="card-lux p-6">
              <p className="font-mono text-[10px] uppercase tracking-[0.2em] text-brass">
                {cat.group}
              </p>

              <ul className="mt-4 space-y-2">
                {cat.items.map((item) => (
                  <li key={item.to}>
                    <Link
                      href={item.to}
                      className="flex items-center gap-2 text-sm text-muted-foreground transition-colors hover:text-foreground"
                    >
                      <span className="text-xs text-brass">→</span>
                      {item.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <div className="mt-8">
          <Link
            href="/solutions"
            className="font-mono text-xs uppercase tracking-[0.2em] text-brass-soft hover:text-brass"
          >
            View all solutions →
          </Link>
        </div>
      </section>

      {/* PRODUCT CONCEPT */}
      <section className="border-y border-line bg-surface py-20">
        <div className="mx-auto max-w-6xl px-6">
          <div className="max-w-xl">
            <p className="eyebrow">The concept</p>

            <h2 className="mt-3 text-4xl leading-tight text-balance sm:text-5xl">
              One platform. Your own business software.
            </h2>

            <p className="mt-4 text-pretty text-muted-foreground">
              Fyncho gives every business its own professional business
              software and online presence, with the tools behind it managed
              from one connected platform.
            </p>
          </div>

          <ol className="mt-10 grid grid-cols-2 gap-4 lg:grid-cols-5">
            {[
              "Your Business",
              "Your Software",
              "Your Customers",
              "Your Bookings",
              "Your Growth",
            ].map((label, i) => (
              <li key={label} className="card-lux px-6 py-8">
                <span className="numeral">{`0${i + 1}`}</span>
                <p className="mt-3 font-display text-2xl">{label}</p>
              </li>
            ))}
          </ol>
        </div>
      </section>

      {/* YOUR OWN BUSINESS SOFTWARE */}
      <section className="mx-auto max-w-6xl px-6 py-20">
        <div className="grid grid-cols-1 items-center gap-12 lg:grid-cols-2">
          <div>
            <p className="eyebrow">Your own business software</p>

            <h2 className="mt-3 text-4xl leading-tight text-balance sm:text-5xl">
              Get your own business software in minutes.
            </h2>

            <p className="mt-4 max-w-[48ch] text-pretty text-muted-foreground">
              Every business gets a professional business presence with the
              essential tools to showcase services, manage customers, and
              accept bookings from day one.
            </p>

            <ul className="mt-8 grid grid-cols-2 gap-x-6 gap-y-3 text-sm">
              {[
                "Home",
                "Services",
                "Team",
                "Gallery",
                "About",
                "Contact",
                "Booking",
                "Customer login",
              ].map((item) => (
                <li key={item} className="flex gap-2 text-foreground">
                  <span className="text-brass">✓</span>
                  {item}
                </li>
              ))}
            </ul>

            <Link
              href="/register"
              className="mt-9 inline-block rounded-full bg-primary px-6 py-3 text-sm font-semibold text-primary-foreground transition-colors hover:bg-brass-soft"
            >
              Create My Business Software
            </Link>
          </div>

          <div className="rounded-2xl border border-line bg-background p-4 shadow-lift">
            <p className="px-2 pb-3 font-mono text-xs text-muted-foreground">
              fyncho.com/glam-studio
            </p>

            <img
              src="/assets/admin-website/salon-hero.jpg"
              alt="Preview of a business software profile on Fyncho"
              loading="lazy"
              width={1200}
              height={800}
              className="aspect-4/3 w-full rounded-xl object-cover"
            />
          </div>
        </div>
      </section>

      {/* HOW IT WORKS */}
      <section className="border-y border-line bg-surface py-20">
        <div className="mx-auto max-w-6xl px-6">
          <div className="mb-12 flex items-end justify-between">
            <h2 className="text-4xl text-balance sm:text-5xl">
              How it works
            </h2>

            <span className="font-mono text-xs uppercase tracking-[0.2em] text-muted-foreground">
              (01 – 04)
            </span>
          </div>

          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {steps.map((s) => (
              <div key={s.n} className="card-lux p-7">
                <span className="font-display text-4xl text-brass/70">
                  {s.n}
                </span>

                <h3 className="mt-4 text-2xl">{s.t}</h3>

                <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
                  {s.d}
                </p>
              </div>
            ))}
          </div>

          <Link
            href="/register"
            className="mt-8 inline-block rounded-full bg-primary px-6 py-3 text-sm font-semibold text-primary-foreground transition-colors hover:bg-brass-soft"
          >
            Get Started
          </Link>
        </div>
      </section>

      {/* FEATURES */}
      <section className="mx-auto max-w-6xl px-6 py-20">
        <div className="mb-10 max-w-xl">
          <p className="eyebrow">One platform</p>

          <h2 className="mt-3 text-4xl leading-tight text-balance sm:text-5xl">
            Everything your business needs, in one place.
          </h2>
        </div>

        <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {homePageFeatures.map((f, i) => (
            <div key={f.t} className="card-lux p-7">
              <span className="numeral">
                {String(i + 1).padStart(2, "0")}
              </span>

              <h3 className="mt-4 text-2xl">{f.t}</h3>

              <p className="mt-3 text-sm leading-relaxed text-muted-foreground">
                {f.d}
              </p>
            </div>
          ))}
        </div>

        <div className="mt-8">
          <Link
            href="/features"
            className="font-mono text-xs uppercase tracking-[0.2em] text-brass-soft hover:text-brass"
          >
            Explore all features →
          </Link>
        </div>
      </section>

      {/* ONLINE BOOKING */}
      <section className="border-y border-line bg-surface py-20">
        <div className="mx-auto grid max-w-6xl grid-cols-1 gap-12 px-6 lg:grid-cols-12">
          <div className="lg:col-span-5">
            <p className="eyebrow">Online booking</p>

            <h2 className="mt-3 text-4xl leading-tight text-balance sm:text-5xl">
              Turn your business software into your 24/7 booking channel.
            </h2>

            <p className="mt-4 max-w-[46ch] text-pretty text-muted-foreground">
              Customers can book directly from your own business address,
              giving them a simple way to discover your services and schedule
              appointments.
            </p>
          </div>

          <ol className="lg:col-span-7">
            {bookingFlow.map((step, i) => (
              <li
                key={step}
                className="flex items-center gap-5 border-b border-line py-4 last:border-b-0"
              >
                <span className="font-mono text-xs text-brass">
                  {`0${i + 1}`}
                </span>

                <span className="font-display text-2xl">{step}</span>
              </li>
            ))}
          </ol>
        </div>
      </section>

      {/* BUSINESS MANAGEMENT */}
      <section className="mx-auto max-w-6xl px-6 py-20">
        <div className="grid grid-cols-1 items-center gap-12 lg:grid-cols-12">
          <div className="lg:col-span-4">
            <p className="eyebrow">Business management</p>

            <h2 className="mt-3 text-4xl leading-tight text-balance sm:text-5xl">
              Run your business from one dashboard.
            </h2>

            <ul className="mt-8 space-y-3 text-sm">
              {[
                "Appointments",
                "Revenue",
                "Customers",
                "Team",
                "Services",
                "Reports",
              ].map((item) => (
                <li key={item} className="flex gap-2">
                  <span className="text-brass">✓</span>
                  {item}
                </li>
              ))}
            </ul>
          </div>

          <div className="lg:col-span-8">
            <img
              src="/assets/admin-website/dashboard-preview.jpg"
              alt="Fyncho business dashboard showing appointments, revenue, customers, and services"
              loading="lazy"
              width={1408}
              height={912}
              className="w-full rounded-2xl border border-line shadow-lift"
            />
          </div>
        </div>
      </section>

      {/* CUSTOMER EXPERIENCE */}
      <section className="border-y border-line bg-surface py-20">
        <div className="mx-auto grid max-w-6xl grid-cols-1 items-center gap-12 px-6 lg:grid-cols-2">
          <div>
            <p className="eyebrow">Customer experience</p>

            <h2 className="mt-3 text-4xl leading-tight text-balance sm:text-5xl">
              A simple experience for your customers, wherever they are.
            </h2>

            <p className="mt-4 max-w-[46ch] text-pretty text-muted-foreground">
              From discovering your business to booking, managing appointments,
              and returning again, Fyncho keeps the customer experience simple
              and connected.
            </p>

            <ol className="mt-8 space-y-3 font-display text-2xl">
              {[
                "Discover business",
                "View services",
                "Book appointment",
                "Manage appointment",
                "Return & book again",
              ].map((s) => (
                <li
                  key={s}
                  className="border-b border-line pb-3 last:border-b-0"
                >
                  {s}
                </li>
              ))}
            </ol>
          </div>

          <img
            src="/assets/admin-website/mobile-booking.jpg"
            alt="Fyncho business booking experience shown on a mobile phone"
            loading="lazy"
            width={912}
            height={1104}
            className="w-full rounded-2xl object-cover"
          />
        </div>
      </section>

      {/* TRUST */}
      <section className="mx-auto max-w-6xl px-6 py-20">
        <div className="rounded-2xl border border-line bg-surface p-8 text-center sm:p-12">
          <p className="eyebrow">Built for service businesses</p>

          <h2 className="mx-auto mt-4 max-w-3xl text-4xl leading-tight text-balance sm:text-5xl">
            Everything you need to present your business, manage your
            operations, and serve your customers.
          </h2>

          <p className="mx-auto mt-5 max-w-2xl leading-relaxed text-muted-foreground">
            Fyncho brings your business presence, services, team, customers,
            bookings, payments, memberships, loyalty, and reports together in
            one platform.
          </p>
        </div>
      </section>

      {/* FAQ */}
      <section className="border-t border-line bg-surface py-20">
        <div className="mx-auto max-w-3xl px-6">
          <h2 className="text-4xl text-balance sm:text-5xl">
            Questions, answered.
          </h2>

          <div className="mt-8 divide-y divide-line border-y border-line">
            {faqs.map((f) => (
              <details key={f.q} className="group py-5">
                <summary className="flex cursor-pointer list-none items-center justify-between gap-6 font-display text-2xl">
                  {f.q}

                  <span className="font-mono text-brass transition-transform group-open:rotate-45">
                    +
                  </span>
                </summary>

                <p className="mt-3 max-w-[68ch] text-sm leading-relaxed text-muted-foreground">
                  {f.a}
                </p>
              </details>
            ))}
          </div>
        </div>
      </section>

      <ClosingCta
        title="Ready to give your business its own software?"
        description="Create your account, choose your unique business address, and start building your professional business presence today."
        secondary={{ label: "View Pricing", to: "/pricing" }}
      />
    </SiteShell>
  );
}
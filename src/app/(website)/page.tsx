import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import {
  CalendarCheck2,
  CalendarClock,
  Check,
  Globe2,
  Link2,
  Rocket,
  Settings2,
  Sparkles,
  UserCog,
  UserPlus,
  Users,
} from "lucide-react";
import { SiteShell } from "@/components/admin/admin-website/site-shell";
import {
  ClosingCta,
  MetricBand,
} from "@/components/admin/admin-website/marketing-sections";
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

const metrics = [
  {
    value: "24/7",
    label: "Online booking",
    detail: "Customers book at the moment that suits them.",
  },
  {
    value: "1",
    label: "Business address",
    detail: "A professional home for your business online.",
  },
  {
    value: "1",
    label: "Connected platform",
    detail: "Services, team, customers, and payments together.",
  },
  {
    value: "1%",
    label: "Fyncho fee",
    detail: "A simple percentage-based model as you grow.",
  },
];

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
  {
    t: "Discover your business",
    d: "Customers arrive at your own address, ready to explore what you offer.",
  },
  {
    t: "Choose a service",
    d: "Clear descriptions, durations, and pricing help them choose with confidence.",
  },
  {
    t: "Pick a professional and time",
    d: "Availability reflects your real services, team, and working hours.",
  },
  {
    t: "Confirm and pay",
    d: "Customers log in, complete the booking, and pay a deposit or the full amount when needed.",
  },
  {
    t: "Return and book again",
    d: "Confirmations, reminders, and appointment history make the next visit easy.",
  },
];

const solutions = [
  {
    label: "Hair Salons",
    group: "Salons & Studios",
    to: "/solutions/hair-salon",
    image: "/assets/admin-website/hair-salon-banner.png",
    alt: "Hair salon interior with styling stations",
  },
  {
    label: "Beauty Salons",
    group: "Salons & Studios",
    to: "/solutions/beauty-salon",
    image: "/assets/admin-website/beauty-salon-banner.png",
    alt: "Beauty salon treatment space",
  },
  {
    label: "Nail Salons",
    group: "Salons & Studios",
    to: "/solutions/nail-salon",
    image: "/assets/admin-website/nail-salon-banner.png",
    alt: "Nail studio service detail",
  },
  {
    label: "Spa & Massage",
    group: "Wellness, Skin & Body",
    to: "/solutions/spa",
    image: "/assets/admin-website/spa-banner.png",
    alt: "Spa treatment room prepared for a guest",
  },
  {
    label: "Barbershops",
    group: "Grooming & Solo",
    to: "/solutions/barbershop",
    image: "/assets/admin-website/barbershop-banner.png",
    alt: "Barbershop interior with grooming chairs",
  },
  {
    label: "Bridal",
    group: "Salons & Studios",
    to: "/solutions/bridal",
    image: "/assets/admin-website/bridal-banner.png",
    alt: "Bridal styling session",
  },
];

const softwareIncludes = [
  "Home",
  "Services",
  "Team",
  "Gallery",
  "About",
  "Contact",
  "Booking",
  "Customer login",
];

const gallery = [
  {
    label: "Hair & styling",
    image: "/assets/owner-website/service-hair.jpg",
    alt: "Hair styling service in progress",
  },
  {
    label: "Skin & facials",
    image: "/assets/owner-website/service-skin.jpg",
    alt: "Skin care treatment in a calm studio",
  },
  {
    label: "Nails & detail",
    image: "/assets/owner-website/service-nails.jpg",
    alt: "Nail service detail",
  },
  {
    label: "Bridal & occasion",
    image: "/assets/owner-website/service-bridal.jpg",
    alt: "Bridal beauty preparation",
  },
];

const featureIcons = [
  Globe2,
  CalendarCheck2,
  Users,
  UserCog,
  Sparkles,
  CalendarClock,
];

const stepIcons = [UserPlus, Link2, Settings2, Rocket];

const dashboardHighlights = [
  "Appointments",
  "Revenue",
  "Customers",
  "Team",
  "Services",
  "Reports",
];

const businessTypes = [
  "Hair Salons",
  "Beauty Salons",
  "Nail Studios",
  "Spas & Wellness",
  "Barbershops",
  "Bridal Studios",
  "Massage Therapy",
  "Skin & Facials",
  "Lash & Brow",
  "Makeup Artists",
  "Tattoo Studios",
  "Holistic Therapies",
];

const faqs = [
  {
    q: "Do I get my own business software?",
    a: "Yes. Every business on Fyncho gets its own professional business software with tools for services, team management, customer management, bookings, payments, memberships, and more.",
  },
  {
    q: "How does my business URL work?",
    a: "Choose a unique name for your business, and Fyncho gives you your own easy-to-remember address, such as glam-studio.fyncho.com, ready to share with your customers.",
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
      {/* ── HERO ───────────────────────────────────────────────────────── */}
      <section className="page-banner relative isolate min-h-[calc(100svh-4.5rem)] overflow-hidden bg-primary">
        <video
          autoPlay
          muted
          loop
          playsInline
          poster="/assets/admin-website/home-banner.png"
          aria-label="Premium modern salon interior with warm light and brass details"
          className="banner-image absolute inset-0 h-full w-full object-cover"
        >
          <source
            src="/assets/admin-website/home-banner.mp4"
            type="video/mp4"
          />
        </video>
        <div className="banner-shade absolute inset-0" />
        <div className="pointer-events-none absolute inset-4 border border-primary-foreground/15 sm:inset-6" />

        <div className="relative mx-auto flex min-h-[calc(100svh-4.5rem)] max-w-6xl flex-col justify-end px-6 py-14 sm:px-8 sm:py-18">
          <div className="grid items-end gap-10 lg:grid-cols-12 lg:gap-12">
            <div className="lg:col-span-12 xl:col-span-8">
              <p className="anim-rise eyebrow text-brass">
                Business management &amp; booking software
              </p>

              <h1 className="anim-rise-2 mt-5 max-w-4xl font-display text-5xl leading-[0.88] text-balance text-primary-foreground sm:text-7xl lg:text-8xl">
                Your business.{" "}
                <em className="italic text-brass">Your platform.</em>
              </h1>

              <p className="anim-rise-3 mt-6 max-w-[54ch] text-base leading-relaxed text-pretty text-primary-foreground/75 sm:text-lg">
                Fyncho gives beauty, wellness, grooming, and other
                service-based businesses professional business software, online
                booking, and the tools to manage services, teams, customers,
                and daily operations — all from one connected platform.
              </p>

              <div className="anim-rise-3 mt-8 flex flex-wrap items-center gap-3">
                <Link
                  href="/register"
                  className="btn-shine rounded-full bg-brass px-7 py-3.5 text-sm font-semibold text-accent-foreground transition-all duration-300 hover:-translate-y-0.5 hover:bg-surface hover:shadow-lift"
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

            {/* Small product moment keeps the hero from feeling like a poster. */}
            <aside className="anim-rise-4 hidden xl:col-span-4 xl:block">
              <div className="float-soft rounded-2xl border border-primary-foreground/15 bg-primary/35 p-5 shadow-lift backdrop-blur-md">
                <div className="flex items-center justify-between gap-4">
                  <p className="font-mono text-[9px] uppercase tracking-[0.18em] text-primary-foreground/55">
                    Live booking preview
                  </p>
                  <span className="flex items-center gap-1.5 rounded-full bg-brass/15 px-2.5 py-1 font-mono text-[9px] uppercase tracking-[0.14em] text-brass">
                    <span className="pulse-dot size-1.5 rounded-full bg-brass" />
                    Open
                  </span>
                </div>

                <p className="mt-4 font-display text-2xl leading-tight text-primary-foreground">
                  Signature cut &amp; finish
                </p>
                <p className="mt-1 text-xs text-primary-foreground/55">
                  Glam Studio · 60 min
                </p>

                <dl className="mt-5 grid grid-cols-2 gap-3">
                  <div className="rounded-xl border border-primary-foreground/10 bg-primary-foreground/5 px-3 py-2.5">
                    <dt className="font-mono text-[9px] uppercase tracking-[0.14em] text-primary-foreground/45">
                      Date
                    </dt>
                    <dd className="mt-1 text-xs text-primary-foreground/90">
                      Friday, 24 May
                    </dd>
                  </div>
                  <div className="rounded-xl border border-primary-foreground/10 bg-primary-foreground/5 px-3 py-2.5">
                    <dt className="font-mono text-[9px] uppercase tracking-[0.14em] text-primary-foreground/45">
                      Time
                    </dt>
                    <dd className="mt-1 text-xs text-primary-foreground/90">
                      10:30 AM
                    </dd>
                  </div>
                </dl>

                <div className="mt-4 flex items-center justify-between rounded-xl bg-brass px-4 py-3 text-primary">
                  <span className="text-xs font-semibold">
                    Appointment confirmed
                  </span>
                  <Check size={16} strokeWidth={2.5} />
                </div>

                <p className="mt-3 text-center font-mono text-[9px] uppercase tracking-[0.16em] text-primary-foreground/35">
                  Illustrative preview
                </p>
              </div>
            </aside>
          </div>
        </div>
      </section>

      {/* ── BUSINESS TYPES MARQUEE ────────────────────────────────────── */}
      <section
        aria-label="Business types supported by Fyncho"
        className="border-b border-line bg-surface py-4"
      >
        <div className="marquee-mask overflow-hidden">
          <div className="marquee-track">
            {[0, 1].map((copy) => (
              <ul
                key={copy}
                aria-hidden={copy === 1 ? "true" : undefined}
                className="flex shrink-0 items-center"
              >
                {businessTypes.map((type) => (
                  <li key={type} className="flex items-center">
                    <span className="whitespace-nowrap px-6 font-mono text-[10px] uppercase tracking-[0.24em] text-muted-foreground">
                      {type}
                    </span>
                    <span
                      aria-hidden="true"
                      className="size-1 rotate-45 bg-brass/60"
                    />
                  </li>
                ))}
              </ul>
            ))}
          </div>
        </div>
      </section>

      {/* ── PROOF POINTS ──────────────────────────────────────────────── */}
      <section className="bg-background py-10 sm:py-12">
        <div className="scroll-reveal mx-auto max-w-6xl px-6">
          <MetricBand items={metrics} />
        </div>
      </section>

      {/* ── SOLUTIONS ─────────────────────────────────────────────────── */}
      <section className="mx-auto max-w-6xl px-6 py-20 sm:py-24">
        <div className="scroll-reveal flex flex-wrap items-end justify-between gap-6">
          <div className="max-w-2xl">
            <span className="rule-brass mb-5" />
            <p className="eyebrow">Built for your business</p>
            <h2 className="mt-4 text-4xl leading-tight text-balance sm:text-5xl">
              One platform for beauty, wellness, grooming, and beyond.
            </h2>
            <p className="mt-4 text-pretty text-muted-foreground">
              Whether you run a hair salon, barbershop, spa, nail studio, or
              work independently, Fyncho adapts to the way your service
              business operates.
            </p>
          </div>

          <Link
            href="/solutions"
            className="group inline-flex items-center gap-2 font-mono text-xs uppercase tracking-[0.2em] text-brass-soft transition-colors hover:text-brass"
          >
            View all solutions
            <span className="transition-transform duration-300 group-hover:translate-x-1">
              →
            </span>
          </Link>
        </div>

        <div className="scroll-reveal mt-12 grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {solutions.map((solution) => (
            <Link
              key={solution.to}
              href={solution.to}
              className="group overflow-hidden rounded-2xl border border-primary-foreground/15 bg-primary shadow-card transition-transform duration-300 hover:-translate-y-1"
            >
              <div className="relative aspect-video bg-background">
                <Image
                  src={solution.image}
                  alt={solution.alt}
                  fill
                  sizes="(min-width: 1024px) 30vw, (min-width: 640px) 45vw, 92vw"
                  className="object-contain transition-transform duration-700 group-hover:scale-[1.02]"
                />
              </div>

              <div className="flex items-end justify-between gap-3 border-t border-primary-foreground/10 px-5 py-5 sm:px-6">
                <div>
                  <p className="font-mono text-[10px] uppercase tracking-[0.18em] text-brass">
                    {solution.group}
                  </p>
                  <h3 className="mt-1 font-display text-xl leading-tight text-primary-foreground sm:text-2xl">
                    {solution.label}
                  </h3>
                </div>

                <span className="flex size-9 shrink-0 items-center justify-center rounded-full border border-primary-foreground/25 text-primary-foreground transition-colors duration-300 group-hover:border-brass group-hover:bg-brass group-hover:text-primary">
                  →
                </span>
              </div>
            </Link>
          ))}
        </div>
      </section>

      {/* ── BUSINESS ADDRESS ──────────────────────────────────────────── */}
      <section className="border-y border-line bg-surface py-20 sm:py-24">
        <div className="mx-auto grid max-w-6xl items-center gap-14 px-6 lg:grid-cols-12 lg:gap-16">
          <div className="scroll-reveal lg:col-span-6 xl:col-span-5">
            <span className="rule-brass mb-5" />
            <p className="eyebrow">Your business address</p>

            <h2 className="mt-4 text-4xl leading-tight text-balance sm:text-5xl">
              Every business gets its own address.
            </h2>

            <p className="mt-4 max-w-[48ch] text-pretty text-muted-foreground">
              Give your business its own professional online presence with a
              unique, memorable address that is ready to share with your
              customers.
            </p>

            <div className="mt-8 rounded-2xl border border-line bg-background p-2 shadow-card">
              <div className="flex flex-col gap-2">
                <div className="flex min-w-0 flex-1 items-center overflow-hidden rounded-full bg-surface px-4 py-3 ring-1 ring-line sm:px-5">
                  <span className="whitespace-nowrap font-mono text-xs text-muted-foreground sm:text-sm">
                    <span className="text-foreground">glam-studio</span>.fyncho.com
                    <span className="caret text-brass" />
                  </span>
                </div>

                <Link
                  href="/register"
                  className="flex w-full shrink-0 items-center justify-center gap-2 rounded-full bg-primary px-6 py-3 transition-colors hover:bg-brass-soft"
                >
                  <span className="text-sm font-semibold text-primary-foreground">
                    ✓ Available
                  </span>
                  <span className="rounded-full bg-brass px-3 py-1 text-xs font-semibold text-accent-foreground">
                    Claim it
                  </span>
                </Link>
              </div>
            </div>

            <p className="mt-4 font-mono text-xs text-muted-foreground">
              Your business. Its own address. Bookings from day one.
            </p>
          </div>

          <div className="scroll-reveal relative lg:col-span-6 xl:col-span-7">
            <div
              aria-hidden="true"
              className="glow-pulse absolute -inset-4 rounded-[2rem] bg-brass/10 blur-2xl"
            />

            <div className="relative overflow-hidden rounded-2xl border border-line bg-background shadow-lift">
              <div className="flex items-center gap-1.5 border-b border-primary px-4 py-3">
                <span className="size-2 rounded-full bg-muted-foreground/25" />
                <span className="size-2 rounded-full bg-muted-foreground/25" />
                <span className="size-2 rounded-full bg-muted-foreground/25" />
                <span className="ml-3 flex-1 truncate rounded-full border border-line bg-muted px-3 py-1 font-mono text-[10px] text-muted-foreground">
                  glam-studio.fyncho.com
                </span>
                <span className="ml-2 hidden rounded-full border border-line bg-surface px-2.5 py-1 font-mono text-[9px] uppercase tracking-[0.14em] text-brass sm:block">
                  Live
                </span>
              </div>

              <div className="relative overflow-hidden">
                <Image
                  src="/assets/admin-website/home-business.png"
                  alt="Preview of a business software profile on Fyncho"
                  width={1024}
                  height={572}
                  sizes="(min-width: 1024px) 640px, 92vw"
                  className="ken-burns h-auto w-full"
                />
              </div>

              <div className="flex flex-wrap items-center gap-x-5 gap-y-2 border-t border-primary px-5 py-4">
                <span className="font-mono text-[9px] uppercase tracking-[0.16em] text-brass">
                  Glam Studio
                </span>
                {["Home", "Services", "Team", "Gallery"].map((item) => (
                  <span
                    key={item}
                    className="font-mono text-[9px] uppercase tracking-[0.14em] text-muted-foreground"
                  >
                    {item}
                  </span>
                ))}
                <span className="ml-auto rounded-full bg-primary px-4 py-1.5 text-[10px] font-semibold text-primary-foreground">
                  Book now
                </span>
              </div>
            </div>

            <div className="float-soft absolute -bottom-12 right-3 hidden items-center gap-2 rounded-full border border-line bg-surface px-4 py-2 shadow-card xl:flex">
              <span className="pulse-dot size-2 rounded-full bg-brass" />
              <span className="font-mono text-[10px] uppercase tracking-[0.14em] text-muted-foreground">
                Online booking enabled
              </span>
            </div>
          </div>
        </div>
      </section>

      {/* ── BUSINESS SOFTWARE SHOWCASE ────────────────────────────────── */}
      {/* Image: /assets/admin-website/salon-hero.jpg (existing asset).
          A bespoke replacement prompt is in docs/homepage-image-prompts.md. */}
      <section className="mx-auto max-w-6xl px-6 py-20 sm:py-24">
        <div className="grid items-center gap-12 lg:grid-cols-12 lg:gap-16">
          <div className="scroll-reveal lg:col-span-7">
            <figure className="overflow-hidden rounded-2xl border border-line bg-primary shadow-card">
              <Image
                src="/assets/admin-website/salon-hero.jpg"
                alt="A modern service business in warm daylight"
                width={1200}
                height={800}
                sizes="(min-width: 1024px) 640px, 92vw"
                className="ken-burns aspect-4/3 w-full object-cover"
              />
              <figcaption className="border-t border-line px-5 py-5 text-primary-foreground sm:px-6 sm:py-6">
                <div className="flex items-start gap-4">
                  <span aria-hidden="true" className="mt-1 h-10 w-px shrink-0 bg-brass" />
                  <div>
                    <p className="font-mono text-[9px] uppercase tracking-[0.18em] text-brass sm:text-[10px]">
                      Your business, online
                    </p>
                    <p className="mt-1.5 max-w-[32ch] font-display text-xl leading-tight text-primary-foreground sm:text-2xl">
                      A presence that feels as considered as your service.
                    </p>
                  </div>
                </div>
              </figcaption>
            </figure>
          </div>

          <div className="scroll-reveal lg:col-span-5">
            <span className="rule-brass mb-5" />
            <p className="eyebrow">Your own business software</p>

            <h2 className="mt-4 text-4xl leading-tight text-balance sm:text-5xl">
              Get your own business software in minutes.
            </h2>

            <p className="mt-4 text-pretty text-muted-foreground">
              Every business gets a professional business presence with the
              essential tools to showcase services, manage customers, and
              accept bookings from day one.
            </p>

            <ul className="mt-8 grid grid-cols-2 gap-x-6 gap-y-3 text-sm">
              {softwareIncludes.map((item) => (
                <li key={item} className="flex items-center gap-2 text-foreground">
                  <Check
                    size={14}
                    strokeWidth={2.5}
                    aria-hidden="true"
                    className="text-brass"
                  />
                  {item}
                </li>
              ))}
            </ul>

            <Link
              href="/register"
              className="btn-shine mt-9 inline-block rounded-full bg-primary px-6 py-3 text-sm font-semibold text-primary-foreground transition-all duration-300 hover:-translate-y-0.5 hover:bg-brass-soft hover:shadow-card"
            >
              Create My Business Software
            </Link>
          </div>
        </div>
      </section>

      {/* ── HOW IT WORKS ──────────────────────────────────────────────── */}
      <section className="border-y border-line bg-surface py-20 sm:py-24">
        <div className="mx-auto max-w-6xl px-6">
          <div className="scroll-reveal flex flex-wrap items-end justify-between gap-8">
            <div className="max-w-2xl">
              <span className="rule-brass mb-5" />
              <p className="eyebrow">How it works</p>

              <h2 className="mt-4 text-4xl leading-tight text-balance sm:text-5xl">
                Live in four considered steps.
              </h2>

              <p className="mt-4 max-w-[52ch] text-pretty text-muted-foreground">
                From creating your account to taking your first booking, setup
                is guided, quick, and entirely yours.
              </p>
            </div>

            <Link
              href="/register"
              className="btn-shine inline-block rounded-full bg-primary px-6 py-3 text-sm font-semibold text-primary-foreground transition-all duration-300 hover:-translate-y-0.5 hover:bg-brass-soft hover:shadow-card"
            >
              Get Started
            </Link>
          </div>

          <div className="scroll-reveal mt-12 grid gap-6">
            <figure className="overflow-hidden rounded-3xl border border-line bg-primary shadow-lift">
              <Image
                src="/assets/admin-website/how-it-works-banner.png"
                alt="Business owner setting up a professional online presence"
                width={2048}
                height={1152}
                sizes="(min-width: 1024px) 1152px, 92vw"
                className="ken-burns aspect-4/3 w-full object-cover sm:aspect-16/9"
              />
              <figcaption className="border-t border-line bg-primary px-5 py-5 text-primary-foreground sm:px-7 sm:py-6">
                <div className="flex items-start gap-4">
                  <span aria-hidden="true" className="mt-1 h-10 w-px shrink-0 bg-brass" />
                  <div>
                    <p className="font-mono text-[9px] uppercase tracking-[0.18em] text-brass sm:text-[10px]">
                      From sign-up to live
                    </p>
                    <p className="mt-1.5 max-w-[48ch] font-display text-xl leading-tight text-primary-foreground sm:text-2xl">
                      Create your account, add your business, and go live — no
                      technical setup required.
                    </p>
                  </div>
                </div>
              </figcaption>
            </figure>

            <ol className="grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
              {steps.map((step, index) => {
                const Icon = stepIcons[index] ?? Sparkles;

                return (
                  <li
                    key={step.n}
                    className="group rounded-2xl border border-line bg-background p-5 transition-colors duration-300 sm:p-6"
                  >
                    <div className="flex items-center justify-between gap-4">
                      <div className="flex size-11 items-center justify-center rounded-full border border-brass/30 bg-brass/10 text-brass transition-colors duration-300 group-hover:bg-brass group-hover:text-accent-foreground">
                        <Icon size={19} strokeWidth={1.75} aria-hidden="true" />
                      </div>
                      <span className="numeral">{step.n}</span>
                    </div>
                    <h3 className="mt-5 text-xl leading-snug">{step.t}</h3>
                    <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
                      {step.d}
                    </p>
                  </li>
                );
              })}
            </ol>
          </div>
        </div>
      </section>

      {/* ── FEATURES ──────────────────────────────────────────────────── */}
      <section className="mx-auto max-w-6xl px-6 py-20 sm:py-24">
        <div className="scroll-reveal flex flex-wrap items-end justify-between gap-6">
          <div className="max-w-xl">
            <span className="rule-brass mb-5" />
            <p className="eyebrow">One platform</p>
            <h2 className="mt-4 text-4xl leading-tight text-balance sm:text-5xl">
              Everything your business needs, in one place.
            </h2>
          </div>

          <Link
            href="/features"
            className="group inline-flex items-center gap-2 font-mono text-xs uppercase tracking-[0.2em] text-brass-soft transition-colors hover:text-brass"
          >
            Explore all features
            <span className="transition-transform duration-300 group-hover:translate-x-1">
              →
            </span>
          </Link>
        </div>

        <div className="scroll-reveal mt-12 grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {homePageFeatures.map((feature, index) => {
            const Icon = featureIcons[index] ?? Sparkles;

            return (
              <div
                key={feature.t}
                className="group relative min-h-72 rounded-2xl border border-line bg-background p-7 transition-colors duration-300 sm:p-8"
              >
                <div className="flex items-start justify-between gap-4 border-b border-line pb-5">
                  <span className="flex size-12 items-center justify-center rounded-full border border-brass/30 bg-brass/10 text-brass transition-all duration-300 group-hover:border-brass group-hover:bg-brass group-hover:text-accent-foreground">
                    <Icon size={19} strokeWidth={1.75} aria-hidden="true" />
                  </span>

                  <span className="font-mono text-xs tracking-[0.18em] text-muted-foreground/70">
                    {String(index + 1).padStart(2, "0")}
                  </span>
                </div>

                <h3 className="mt-7 font-display text-2xl leading-tight">
                  {feature.t}
                </h3>

                <p className="mt-3 max-w-[38ch] text-sm leading-relaxed text-muted-foreground">
                  {feature.d}
                </p>

                <span
                  aria-hidden="true"
                  className="pointer-events-none absolute inset-0 origin-left scale-x-0 rounded-2xl border-b-4 border-brass transition-transform duration-500 group-hover:scale-x-100"
                />
              </div>
            );
          })}
        </div>
      </section>

      {/* ── GALLERY ───────────────────────────────────────────────────── */}
      <section className="bg-primary py-20 text-primary-foreground sm:py-24">
        <div className="mx-auto max-w-6xl px-6">
          <div className="scroll-reveal flex flex-wrap items-end justify-between gap-6">
            <div className="max-w-2xl">
              <span className="rule-brass mb-5" />
              <p className="eyebrow">Your gallery</p>

              <h2 className="mt-4 text-4xl leading-tight text-balance sm:text-5xl">
                Let the work speak before the first appointment.
              </h2>

              <p className="mt-4 max-w-[52ch] text-pretty text-primary-foreground/65">
                Build a gallery that reflects the quality of your service and
                the atmosphere of your space — then make it effortless for
                customers to book what they see.
              </p>
            </div>

            <Link
              href="/features"
              className="group inline-flex items-center gap-2 font-mono text-xs uppercase tracking-[0.2em] text-brass transition-colors hover:text-primary-foreground"
            >
              Explore the platform
              <span className="transition-transform duration-300 group-hover:translate-x-1">
                →
              </span>
            </Link>
          </div>

          <div className="scroll-reveal mt-12 grid grid-cols-2 gap-4 lg:grid-cols-4">
            {gallery.map((item, index) => (
              <figure
                key={item.label}
                className={
                  "group relative overflow-hidden rounded-2xl border border-line" +
                  (index % 2 === 1 ? " lg:translate-y-8" : "")
                }
              >
                <Image
                  src={item.image}
                  alt={item.alt}
                  width={900}
                  height={1100}
                  sizes="(min-width: 1024px) 22vw, 45vw"
                  className="aspect-3/4 w-full object-cover transition-transform duration-700 group-hover:scale-105"
                />

                <div className="absolute inset-0 bg-linear-to-t from-primary/85 via-transparent to-transparent" />

                <figcaption className="absolute inset-x-0 bottom-0 p-5">
                  <p className="font-mono text-[10px] uppercase tracking-[0.18em] text-brass">
                    {String(index + 1).padStart(2, "0")}
                  </p>
                  <p className="mt-1 text-sm font-semibold text-primary-foreground">
                    {item.label}
                  </p>
                </figcaption>
              </figure>
            ))}
          </div>
        </div>
      </section>

      {/* ── ONLINE BOOKING ────────────────────────────────────────────── */}
      <section className="mx-auto max-w-6xl px-6 py-20 sm:py-24">
        <div className="grid items-center gap-14 lg:grid-cols-12 lg:gap-16">
          <div className="scroll-reveal lg:col-span-5">
            <span className="rule-brass mb-5" />
            <p className="eyebrow">Online booking</p>

            <h2 className="mt-4 text-4xl leading-tight text-balance sm:text-5xl">
              Turn your business software into your 24/7 booking channel.
            </h2>

            <p className="mt-4 max-w-[46ch] text-pretty text-muted-foreground">
              Customers book directly from your own business address — choosing
              a service, a professional, and a time that works for them.
            </p>

            <div className="mt-8 flex flex-wrap items-center gap-3">
              <Link
                href="/register"
                className="btn-shine inline-block rounded-full bg-primary px-6 py-3 text-sm font-semibold text-primary-foreground transition-all duration-300 hover:-translate-y-0.5 hover:bg-brass-soft hover:shadow-card"
              >
                Get Started Free
              </Link>

              <Link
                href="/how-it-works"
                className="rounded-full px-5 py-3 text-sm font-semibold text-foreground ring-1 ring-line transition-colors hover:bg-surface"
              >
                See how booking works
              </Link>
            </div>

            <div className="mt-8 flex flex-wrap gap-x-6 gap-y-2 border-t border-line pt-5 font-mono text-[10px] uppercase tracking-[0.16em] text-muted-foreground">
              <span>Deposits</span>
              <span>Reminders</span>
              <span>Customer accounts</span>
            </div>
          </div>

          <div className="scroll-reveal lg:col-span-7">
            <div className="relative mx-auto max-w-xl">
              <div
                aria-hidden="true"
                className="glow-pulse absolute -inset-6 rounded-[3rem] bg-brass/10 blur-2xl"
              />

              <div className="relative overflow-hidden rounded-[2rem] border border-line bg-surface shadow-lift">
                <Image
                  src="/assets/admin-website/mobile-booking.jpg"
                  alt="Fyncho customer booking experience on a mobile device"
                  width={912}
                  height={1104}
                  sizes="(min-width: 1024px) 576px, 92vw"
                  className="h-auto w-full"
                />
              </div>
            </div>
          </div>
        </div>

        <div className="scroll-reveal mt-16 border-t border-line pt-10">
          <div className="flex flex-wrap items-end justify-between gap-4">
            <p className="eyebrow">The customer journey</p>
            <p className="text-sm text-muted-foreground">
              Five steps from discovery to repeat booking.
            </p>
          </div>

          <ol className="mt-8 grid gap-x-6 gap-y-8 sm:grid-cols-2 lg:grid-cols-5">
            {bookingFlow.map((step, index) => (
              <li key={step.t}>
                <div className="flex items-center gap-3">
                  <span className="flex size-9 shrink-0 items-center justify-center rounded-full border border-brass/40 bg-surface font-mono text-[10px] text-brass">
                    {String(index + 1).padStart(2, "0")}
                  </span>
                  <span aria-hidden="true" className="h-px flex-1 bg-line" />
                </div>

                <p className="mt-4 font-display text-xl leading-snug">
                  {step.t}
                </p>
                <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
                  {step.d}
                </p>
              </li>
            ))}
          </ol>
        </div>
      </section>

      {/* ── DASHBOARD ─────────────────────────────────────────────────── */}
      <section className="border-y border-line bg-surface py-20 sm:py-24">
        <div className="mx-auto max-w-6xl px-6">
          <div className="scroll-reveal grid items-end gap-8 lg:grid-cols-12 lg:gap-12">
            <div className="lg:col-span-7">
              <span className="rule-brass mb-5" />
              <p className="eyebrow">Business management</p>

              <h2 className="mt-4 text-4xl leading-tight text-balance sm:text-5xl">
                Run your business from one dashboard.
              </h2>
            </div>

            <div className="lg:col-span-5">
              <p className="text-pretty text-muted-foreground">
                Appointments, revenue, customers, team activity, services, and
                reports stay connected — so you always have a clear view of the
                day ahead.
              </p>

              <Link
                href="/features"
                className="mt-5 inline-flex items-center gap-2 font-mono text-xs uppercase tracking-[0.2em] text-brass-soft transition-colors hover:text-brass"
              >
                See the full feature set →
              </Link>
            </div>
          </div>

          <div className="scroll-reveal relative mt-12">
            <div className="relative overflow-hidden rounded-2xl border border-line bg-background shadow-lift">
              <Image
                src="/assets/admin-website/dashboard-preview.jpg"
                alt="Fyncho business dashboard showing appointments, revenue, customers, and services"
                width={1408}
                height={912}
                sizes="(min-width: 1024px) 1152px, 92vw"
                className="h-auto w-full"
              />
            </div>

            <div className="mt-6 grid grid-cols-2 gap-x-5 gap-y-3 sm:grid-cols-3 lg:grid-cols-6">
              {dashboardHighlights.map((item) => (
                <div
                  key={item}
                  className="flex items-center gap-2 border-t border-line pt-3 text-sm text-muted-foreground"
                >
                  <Check
                    size={13}
                    strokeWidth={2.5}
                    aria-hidden="true"
                    className="shrink-0 text-brass"
                  />
                  {item}
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ── TRUST ─────────────────────────────────────────────────────── */}
      <section className="relative isolate overflow-clip bg-primary py-24 sm:py-28">
        <Image
          src="/assets/admin-website/avivane-banner-craft.jpg"
          alt=""
          aria-hidden="true"
          fill
          sizes="100vw"
          className="ken-burns object-cover opacity-25"
        />
        <div className="absolute inset-0 bg-linear-to-b from-primary/75 via-primary/85 to-primary" />

        <div className="scroll-reveal relative mx-auto max-w-4xl px-6 text-center">
          <span className="rule-brass mx-auto mb-6" />
          <p className="eyebrow">Built for service businesses</p>

          <h2 className="mt-5 font-display text-4xl leading-tight text-balance text-primary-foreground sm:text-5xl lg:text-6xl">
            Everything you need to present your business, manage your
            operations, and serve your customers.
          </h2>

          <p className="mx-auto mt-5 max-w-2xl leading-relaxed text-pretty text-primary-foreground/70">
            Fyncho brings your business presence, services, team, customers,
            bookings, payments, memberships, loyalty, and reports together in
            one platform.
          </p>

          <div className="mt-8 flex flex-wrap justify-center gap-2.5">
            {[
              "Your business presence",
              "Your daily operations",
              "Your customer relationships",
            ].map((item) => (
              <span
                key={item}
                className="rounded-full border border-primary-foreground/20 px-4 py-2 font-mono text-[10px] uppercase tracking-[0.14em] text-primary-foreground/75"
              >
                {item}
              </span>
            ))}
          </div>
        </div>
      </section>

      {/* ── FAQ ───────────────────────────────────────────────────────── */}
      <section className="border-t border-line bg-surface py-20 sm:py-24">
        <div className="mx-auto grid max-w-6xl gap-12 px-6 lg:grid-cols-12 lg:gap-16">
          <div className="scroll-reveal lg:col-span-5">
            <span className="rule-brass mb-5" />
            <p className="eyebrow">Questions</p>

            <h2 className="mt-4 text-4xl leading-tight text-balance sm:text-5xl">
              Questions, answered.
            </h2>

            <p className="mt-4 max-w-[38ch] text-pretty text-muted-foreground">
              Everything you need to know before giving your business its own
              software.
            </p>

            <Link
              href="/contact"
              className="mt-6 inline-flex items-center gap-2 font-mono text-xs uppercase tracking-[0.2em] text-brass-soft transition-colors hover:text-brass"
            >
              Talk to us →
            </Link>
          </div>

          <div className="scroll-reveal lg:col-span-7">
            <div className="divide-y divide-line border-y border-line">
              {faqs.map((faq) => (
                <details key={faq.q} className="group py-5">
                  <summary className="flex cursor-pointer list-none items-center justify-between gap-6 font-display text-2xl leading-snug">
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

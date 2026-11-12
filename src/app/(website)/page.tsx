import type { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import {
  CalendarCheck2,
  CalendarClock,
  Check,
  CreditCard,
  Globe2,
  Link2,
  Rocket,
  Settings2,
  Sparkles,
  UserCog,
  UserPlus,
  Users,
  ArrowRight,
} from "lucide-react";
import { SiteShell, HeroShell } from "@/components/admin/admin-website/site-shell";
import { FaqItem } from "@/components/admin/admin-website/faq-item";
import { LoopRail } from "@/components/admin/admin-website/looping-rail";
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
    value: "✓",
    label: "Payments",
    detail: "Deposits and online payments built into booking.",
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
    image: "/assets/admin-website/hair-salon-banner.png",
    alt: "Hair styling service in progress",
  },
  {
    label: "Skin & facials",
    image: "/assets/admin-website/skincare-banner.png",
    alt: "Skin care treatment in a calm studio",
  },
  {
    label: "Nails & detail",
    image: "/assets/admin-website/nail-salon-banner.png",
    alt: "Nail service detail",
  },
  {
    label: "Bridal & occasion",
    image: "/assets/admin-website/bridal-banner.png",
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

const bookingFlowIcons = [Globe2, Sparkles, CalendarClock, Check, CalendarCheck2];

const heroIncludes = [
  { icon: Globe2, label: "Your own address" },
  { icon: CalendarCheck2, label: "24/7 booking" },
  { icon: Sparkles, label: "Services & pricing" },
  { icon: Users, label: "Team & schedules" },
  { icon: UserCog, label: "Customers & loyalty" },
  { icon: CreditCard, label: "Payments & deposits" },
];

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
  "Nail Salons",
  "Lash & Brow Studios",
  "Makeup Artists",
  "Bridal Services",
  "Spa",
  "Massage Therapy",
  "Wellness Centers",
  "Skin Care & Facials",
  "Waxing & Hair Removal",
  "Barbershops",
  "Freelancers",
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

function SolutionCard({ item }: { item: (typeof solutions)[number] }) {
  return (
    <Link
      href={item.to}
      className="group block h-full overflow-hidden rounded-2xl bg-primary shadow-card transition-all duration-300 hover:-translate-y-1 hover:shadow-lift"
    >
      <div className="relative aspect-[4/3] overflow-hidden bg-background sm:aspect-[16/10]">
        <Image
          src={item.image}
          alt={item.alt}
          fill
          sizes="(min-width: 1024px) 33vw, (min-width: 640px) 50vw, 78vw"
          className="object-cover transition-transform duration-700 group-hover:scale-105"
          unoptimized
        />
      </div>

      <div className="flex items-center justify-between gap-3 border-t border-primary-foreground/10 px-5 py-4">
        <div>
          <p className="font-mono text-[9px] uppercase tracking-[0.16em] text-brass">
            {item.group}
          </p>
          <h3 className="mt-1 font-display text-xl leading-tight text-primary-foreground">
            {item.label}
          </h3>
        </div>

        <span className="flex size-8 shrink-0 items-center justify-center rounded-full border border-primary-foreground/25 text-primary-foreground transition-colors duration-300 group-hover:border-brass group-hover:bg-brass group-hover:text-primary">
          <ArrowRight size={14} aria-hidden="true" />
        </span>
      </div>
    </Link>
  );
}

function GalleryFigure({
  item,
  index,
}: {
  item: (typeof gallery)[number];
  index: number;
}) {
  return (
    <figure
      className={
        "group relative overflow-hidden rounded-xl border border-primary-foreground/15 shadow-card transition-all duration-300 hover:-translate-y-1 hover:shadow-lift sm:col-span-6 " +
        (index === 0 || index === 3 ? "lg:col-span-5" : "lg:col-span-7")
      }
    >
      <Image
        src={item.image}
        alt={item.alt}
        width={900}
        height={1100}
        sizes="(min-width: 1024px) 42vw, (min-width: 640px) 50vw, 78vw"
        className="aspect-square w-full object-cover transition-transform duration-700 group-hover:scale-105 sm:aspect-[16/9] 2xl:aspect-[16/8.5]"
        unoptimized
      />

      <div className="absolute inset-0 bg-linear-to-t from-primary/85 via-transparent to-transparent" />

      <figcaption className="absolute inset-x-0 bottom-0 p-4 sm:p-5">
        <p className="font-mono text-[9px] uppercase tracking-[0.18em] text-brass sm:text-[10px]">
          {String(index + 1).padStart(2, "0")}
        </p>
        <p className="mt-1 text-sm font-semibold leading-snug text-primary-foreground">
          {item.label}
        </p>
      </figcaption>
    </figure>
  );
}

export default function HomePage() {
  return (
    <SiteShell>
      {/* ── HERO ───────────────────────────────────────────────────────── */}
      <HeroShell
        eyebrow="Home"
        flushBottom
        videoSrc="/assets/admin-website/home-banner.mp4"
        poster="/assets/admin-website/home-banner.png"
        imageAlt="Premium modern salon interior with warm light and brass details"
        bottom={
          <div className="flex flex-wrap gap-x-8 gap-y-2 font-mono text-[10px] uppercase tracking-[0.18em] text-primary-foreground/60">
            <span>No card required</span>
            <span>Live in minutes</span>
            <span>Your address · Your customers · Your business</span>
          </div>
        }
      >
        <div className="grid gap-10 lg:grid-cols-12 lg:gap-6 sm:gap-8 lg:gap-12 items-end">
          <div className="lg:col-span-8">
            <p className="anim-rise eyebrow text-brass">
              Business management &amp; booking software
            </p>

            <h1 className="anim-rise-2 mt-5 max-w-5xl font-display text-5xl leading-[0.88] text-balance text-primary-foreground sm:text-7xl lg:text-8xl">
              Your business.{" "}
              <em className="italic text-brass">Your platform.</em>
            </h1>

            <p className="anim-rise-3 mt-6 max-w-[62ch] text-base leading-relaxed text-pretty text-primary-foreground/75 sm:text-lg">
              Fyncho gives beauty, wellness, grooming, and other
              service-based businesses professional business software, online
              booking, and the tools to manage services, teams, customers,
              and daily operations — all from one connected platform.
            </p>

            <div className="anim-rise-3 mt-8 flex flex-wrap items-center gap-3">
              <Link
                href="/register"
                className="btn-shine rounded-full bg-brass px-7 py-3.5 text-sm font-semibold text-accent-foreground transition-all duration-300 hover:-translate-y-0.5 hover:bg-surface hover:text-foreground hover:shadow-lift"
              >
                Get Your Business Software
              </Link>

              <Link
                href="/how-it-works"
                className="rounded-full px-7 py-3.5 text-sm font-semibold text-primary-foreground ring-1 ring-primary-foreground/35 transition-colors hover:bg-primary-foreground/10"
              >
                See how it works
              </Link>
            </div>
          </div>

          {/* What the platform actually hands over — six things a business
              owner wants, with no sample business data. */}
          <aside className="anim-rise-4 hidden lg:col-span-4 lg:block">
            <div className="float-soft rounded-2xl border border-primary-foreground/15 bg-primary/35 p-5 shadow-lift backdrop-blur-md">
              <div className="flex items-center justify-between gap-4">
                <p className="font-mono text-[9px] uppercase tracking-[0.18em] text-primary-foreground/55">
                  Everything included
                </p>
                <span className="rounded-full bg-brass/15 px-2.5 py-1 font-mono text-[9px] uppercase tracking-[0.14em] text-brass">
                  One login
                </span>
              </div>

              <ul className="mt-4 grid grid-cols-2 gap-2">
                {heroIncludes.map(({ icon: Icon, label }) => (
                  <li
                    key={label}
                    className="flex items-center gap-2.5 rounded-xl border border-primary-foreground/10 bg-primary-foreground/5 px-3 py-2.5"
                  >
                    <span className="flex size-7 shrink-0 items-center justify-center rounded-full border border-brass/30 bg-brass/10 text-brass">
                      <Icon size={13} strokeWidth={1.75} aria-hidden="true" />
                    </span>
                    <span className="text-[11px] font-medium leading-snug text-primary-foreground/90">
                      {label}
                    </span>
                  </li>
                ))}
              </ul>

              <Link
                href="/features"
                className="group mt-4 inline-flex items-center gap-2 font-mono text-[10px] uppercase tracking-[0.18em] text-brass transition-colors hover:text-primary-foreground"
              >
                See everything included
                <ArrowRight
                  size={14}
                  className="transition-transform duration-300 group-hover:translate-x-1"
                  aria-hidden="true"
                />
              </Link>
            </div>
          </aside>
        </div>
      </HeroShell>

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
        <div className="mx-auto w-full max-w-7xl px-6">
          <MetricBand items={metrics} />
        </div>
      </section>

      {/* ── SOLUTIONS ─────────────────────────────────────────────────── */}
      <section className="mx-auto max-w-7xl px-6 py-12 sm:py-16 lg:py-20 xl:py-24">
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
            className="group inline-flex items-center gap-2 whitespace-nowrap font-mono text-xs uppercase tracking-[0.2em] text-brass-soft transition-colors hover:text-brass"
          >
            View all solutions
            <ArrowRight
              size={14}
              className="transition-transform duration-300 group-hover:translate-x-1"
              aria-hidden="true"
            />
          </Link>
        </div>

        {/* Mobile: a looping swipe rail keeps six image tiles to one screen
            instead of a long stacked column. Desktop keeps the grid. */}
        <LoopRail
          ariaLabel="Business solutions — swipe to browse"
          className="mt-10"
        >
          {solutions.map((item) => (
            <SolutionCard key={item.to} item={item} />
          ))}
        </LoopRail>

        <div className="scroll-reveal mt-12 hidden gap-5 sm:grid sm:grid-cols-2 lg:grid-cols-3">
          {solutions.map((item) => (
            <SolutionCard key={item.to} item={item} />
          ))}
        </div>
      </section>

      {/* ── BUSINESS ADDRESS ──────────────────────────────────────────── */}
      <section className="border-y border-line bg-surface py-12 sm:py-16 lg:py-20 xl:py-24">
        <div className="mx-auto grid max-w-7xl items-center gap-6 sm:gap-8 lg:gap-12 px-6 lg:grid-cols-12 lg:gap-8 sm:gap-12 lg:gap-16">
          <div className="scroll-reveal lg:col-span-5">
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

            <div className="mt-8 rounded-xl border border-line bg-background p-2 shadow-card">
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

          <div className="scroll-reveal relative lg:col-span-7">
            <div
              aria-hidden="true"
              className="glow-pulse absolute -inset-4 rounded-[2rem] bg-brass/10 blur-2xl"
            />

            <div className="relative w-full overflow-hidden rounded-xl border border-line bg-background shadow-lift">
              <div className="flex items-center gap-1.5 border-b border-line px-4 py-3">
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

              <Image
                src="/assets/admin-website/home-business.png"
                alt="Preview of a business software profile on Fyncho"
                width={1024}
                height={572}
                sizes="(min-width: 1024px) 640px, 92vw"
                className="aspect-[16/9] w-full object-cover"
              unoptimized
              />

              <div className="flex flex-wrap items-center gap-x-5 gap-y-2 border-t border-line bg-primary px-5 py-4 text-primary-foreground">
                <span className="font-mono text-[9px] uppercase tracking-[0.16em] text-brass">
                  glam-studio.fyncho.com
                </span>
                <span className="font-mono text-[9px] uppercase tracking-[0.14em] text-primary-foreground/55">
                  Your business · Your address
                </span>
                <span className="ml-auto inline-flex items-center gap-1.5 rounded-full bg-brass/15 px-3 py-1.5 font-mono text-[9px] uppercase tracking-[0.14em] text-brass">
                  <span className="size-1.5 rounded-full bg-brass" />
                  Live
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
      <section className="mx-auto max-w-7xl px-6 py-12 sm:py-16 lg:py-20 xl:py-24">
        <div className="grid items-center gap-6 sm:gap-8 lg:gap-12 lg:grid-cols-12 lg:gap-8 sm:gap-12 lg:gap-16">
          <div className="scroll-reveal order-2 lg:order-none lg:col-span-7">
            <figure className="mx-auto w-full overflow-hidden rounded-xl bg-primary shadow-card">
              <Image
                src="/assets/admin-website/salon-hero.png"
                alt="A modern service business in warm daylight"
                width={1200}
                height={800}
                sizes="(min-width: 1024px) 640px, 92vw"
                unoptimized
                className="aspect-[16/9] w-full object-cover"
              />
              <figcaption className="flex min-h-24 items-end gap-4 border-t border-line bg-primary px-5 py-4 text-primary-foreground sm:px-7">
                <span aria-hidden="true" className="mb-1 h-10 w-px shrink-0 bg-brass" />
                <div className="min-w-0 flex-1">
                  <p className="font-mono text-[9px] uppercase tracking-[0.18em] text-brass sm:text-[10px]">
                    Your business, online
                  </p>
                  <p className="mt-1 w-full font-display text-xl leading-tight sm:text-2xl">
                    A presence that feels as considered as your service.
                  </p>
                </div>
              </figcaption>
            </figure>
          </div>

          <div className="scroll-reveal order-1 lg:order-none lg:col-span-5">
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
              className="btn-shine mt-9 flex w-full items-center justify-center rounded-full bg-primary px-5 py-3 text-center text-sm font-semibold text-primary-foreground transition-all duration-300 hover:-translate-y-0.5 hover:bg-brass-soft hover:shadow-card sm:inline-flex sm:w-auto"
            >
              <span className="block sm:inline">Get Your Business Software</span>
            </Link>
          </div>
        </div>
      </section>

      {/* ── HOW IT WORKS ──────────────────────────────────────────────── */}
      <section className="border-y border-line bg-surface py-12 sm:py-16 lg:py-20 xl:py-24">
        <div className="mx-auto max-w-7xl px-6">
          <div className="scroll-reveal max-w-2xl">
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

          <div className="scroll-reveal mt-12 grid gap-6 sm:gap-8 lg:gap-12 lg:grid-cols-12 lg:gap-8 sm:gap-12 lg:gap-16 lg:items-center">
            <figure className="mx-auto w-full overflow-hidden rounded-xl border border-line bg-background shadow-lift order-2 lg:order-2 lg:col-span-7">
              <Image
                src="/assets/admin-website/launch-plan-banner.png"
                alt="Business owner setting up a professional online presence"
                width={2048}
                height={1152}
                sizes="(min-width: 1024px) 66vw, 92vw"
                className="aspect-[16/9] w-full object-cover"
              unoptimized
              />
              <figcaption className="flex min-h-24 items-end gap-4 border-t border-line bg-primary px-5 py-4 text-primary-foreground sm:px-7">
                <span aria-hidden="true" className="mb-1 h-10 w-px shrink-0 bg-brass" />
                <div className="min-w-0 flex-1">
                  <p className="font-mono text-[9px] uppercase tracking-[0.18em] text-brass sm:text-[10px]">
                    Guided setup
                  </p>
                  <p className="mt-1 w-full font-display text-xl leading-tight sm:text-2xl">
                    From sign-up to accepting your first booking.
                  </p>
                </div>
              </figcaption>
            </figure>

            <div className="flex min-h-full flex-col justify-between rounded-xl border border-line bg-background p-6 shadow-card sm:p-8 order-1 lg:order-1 lg:col-span-5">
              <div>
                <span className="font-mono text-[9px] uppercase tracking-[0.18em] text-brass">Your launch plan</span>
                <p className="mt-4 font-display text-2xl leading-tight sm:text-3xl">
                  One guided setup. No technical work.
                </p>
                <p className="mt-4 text-sm leading-relaxed text-muted-foreground">
                  Create your account, shape your business software, add services, and open your booking calendar — all in one guided flow.
                </p>

                <div className="mt-6 rounded-xl border border-line bg-surface/60 p-4">
                  <div className="flex items-center justify-between gap-3">
                    <p className="font-mono text-[9px] uppercase tracking-[0.18em] text-muted-foreground">
                      What you&apos;ll have at the end
                    </p>
                    <span className="rounded-full bg-brass/15 px-2.5 py-1 font-mono text-[9px] uppercase tracking-[0.14em] text-brass">
                      ~10 min
                    </span>
                  </div>

                  <ul className="mt-4 grid gap-2.5">
                    {[
                      "Your own professional business address",
                      "Services, pricing, and team configured",
                      "A live booking calendar customers can use",
                      "Payments and deposits ready to accept",
                      "A polished presence that reflects your brand",
                    ].map((item) => (
                      <li
                        key={item}
                        className="flex items-start gap-2.5 text-sm text-foreground"
                      >
                        <span className="mt-0.5 flex size-5 shrink-0 items-center justify-center rounded-full bg-brass/15 text-brass">
                          <Check size={12} strokeWidth={3} aria-hidden="true" />
                        </span>
                        <span className="leading-snug">{item}</span>
                      </li>
                    ))}
                  </ul>
                </div>

              </div>

              <Link
                href="/register"
                className="btn-shine mt-8 inline-flex w-full items-center justify-center rounded-full bg-primary px-5 py-3 text-center text-sm font-semibold text-primary-foreground transition-all duration-300 hover:-translate-y-0.5 hover:bg-brass-soft hover:shadow-card"
              >
                Get Your Business Software
              </Link>
            </div>

            <ol className="order-3 grid gap-5 sm:grid-cols-2 lg:order-none lg:col-span-12 lg:grid-cols-4">
              {steps.map((step, index) => {
                const Icon = stepIcons[index] ?? Sparkles;

                return (
                  <li
                    key={step.n}
                    className="group relative min-h-72 overflow-hidden rounded-xl border border-line bg-background p-7 shadow-card transition-all duration-300 hover:-translate-y-1 hover:border-brass/40 hover:shadow-lift sm:p-8"
                  >
                    <div className="flex items-start justify-between gap-4 border-b border-line pb-5">
                      <span className="flex size-12 items-center justify-center rounded-full border border-brass/30 bg-brass/10 text-brass transition-all duration-300 group-hover:border-brass group-hover:bg-brass group-hover:text-accent-foreground">
                        <Icon size={19} strokeWidth={1.75} aria-hidden="true" />
                      </span>
                      <span className="font-mono text-xs tracking-[0.18em] text-muted-foreground/70">
                        {String(index + 1).padStart(2, "0")}
                      </span>
                    </div>
                    <h3 className="mt-7 font-display text-2xl leading-tight">{step.t}</h3>
                    <p className="mt-3 text-sm leading-relaxed text-muted-foreground">
                      {step.d}
                    </p>
                    <span
                      aria-hidden="true"
                      className="pointer-events-none absolute inset-0 rounded-xl border-b-4 border-brass [clip-path:inset(0_100%_0_0)] transition-[clip-path] duration-400 group-hover:[clip-path:inset(0)]"
                    />
                  </li>
                );
              })}
            </ol>
          </div>
        </div>
      </section>

      {/* ── FEATURES ──────────────────────────────────────────────────── */}
      <section className="mx-auto max-w-7xl px-6 py-12 sm:py-16 lg:py-20 xl:py-24">
        <div className="scroll-reveal flex flex-wrap items-end justify-between gap-6">
          <div className="max-w-xl">
            <span className="rule-brass mb-5" />
            <p className="eyebrow">One platform</p>
            <h2 className="mt-4 text-4xl leading-tight text-balance sm:text-5xl">
              Everything your business needs, in one place.
            </h2>
            <p className="mt-4 max-w-[52ch] text-pretty text-muted-foreground">
              From your business presence and online booking to team, customers,
              payments, and reports — everything you need to run your business,
              connected in one platform.
            </p>
          </div>

          <Link
            href="/features"
            className="group inline-flex items-center gap-2 whitespace-nowrap font-mono text-xs uppercase tracking-[0.2em] text-brass-soft transition-colors hover:text-brass"
          >
            Explore all features
            <ArrowRight
              size={14}
              className="transition-transform duration-300 group-hover:translate-x-1"
              aria-hidden="true"
            />
          </Link>
        </div>

        <div className="scroll-reveal mt-12 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {homePageFeatures.map((feature, index) => {
            const Icon = featureIcons[index] ?? Sparkles;

            return (
              <div
                key={feature.t}
                className="group relative min-h-72 overflow-hidden rounded-xl border border-line bg-surface p-7 shadow-card transition-all duration-300 hover:-translate-y-1 hover:border-brass/40 hover:shadow-lift sm:p-8"
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
                  className="pointer-events-none absolute inset-0 rounded-xl border-b-4 border-brass [clip-path:inset(0_100%_0_0)] transition-[clip-path] duration-400 group-hover:[clip-path:inset(0)]"
                />
              </div>
            );
          })}
        </div>
      </section>

      {/* ── GALLERY ───────────────────────────────────────────────────── */}
      <section className="bg-primary py-20 text-primary-foreground sm:py-24">
        <div className="mx-auto max-w-7xl px-6">
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
              <ArrowRight
                size={14}
                className="transition-transform duration-300 group-hover:translate-x-1"
                aria-hidden="true"
              />
            </Link>
          </div>

          <LoopRail ariaLabel="Gallery — swipe to browse" className="mt-8">
            {gallery.map((item, index) => (
              <GalleryFigure key={item.label} item={item} index={index} />
            ))}
          </LoopRail>

          <div className="scroll-reveal mt-12 hidden gap-5 sm:grid sm:grid-cols-12">
            {gallery.map((item, index) => (
              <GalleryFigure key={item.label} item={item} index={index} />
            ))}
          </div>
        </div>
      </section>

      {/* ── ONLINE BOOKING ────────────────────────────────────────────── */}
      <section className="mx-auto max-w-7xl px-6 py-12 sm:py-16 lg:py-20 xl:py-24">
        <div className="scroll-reveal max-w-2xl">
          <span className="rule-brass mb-5" />
          <p className="eyebrow">The customer journey</p>

          <h2 className="mt-4 text-4xl leading-tight text-balance sm:text-5xl">
            Five steps from discovery to repeat booking.
          </h2>
          <p className="mt-4 max-w-[52ch] text-pretty text-muted-foreground">
            A seamless path from first visit to loyal customer — discover,
            book, confirm, and return with ease.
          </p>
        </div>

        <ol className="scroll-reveal mt-10 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {bookingFlow.map((step, index) => {
            const Icon = bookingFlowIcons[index] ?? Sparkles;

            return (
              <li
                key={step.t}
                className="group relative flex min-h-72 flex-col overflow-hidden rounded-xl border border-line bg-surface p-6 shadow-card transition-all duration-300 hover:-translate-y-1 hover:border-brass/40 hover:shadow-lift sm:p-8"
              >
                <div className="flex items-start justify-between gap-4 border-b border-line pb-5">
                  <span className="flex size-12 items-center justify-center rounded-full border border-brass/30 bg-brass/10 text-brass transition-all duration-300 group-hover:border-brass group-hover:bg-brass group-hover:text-accent-foreground">
                    <Icon size={19} strokeWidth={1.75} aria-hidden="true" />
                  </span>
                  <span className="font-mono text-xs tracking-[0.18em] text-muted-foreground/70">
                    {String(index + 1).padStart(2, "0")}
                  </span>
                </div>

                <h3 className="mt-6 font-display text-xl leading-tight sm:text-2xl">
                  {step.t}
                </h3>
                <p className="mt-3 text-sm leading-relaxed text-muted-foreground">
                  {step.d}
                </p>

                <span
                  aria-hidden="true"
                  className="pointer-events-none absolute inset-0 rounded-xl border-b-4 border-brass [clip-path:inset(0_100%_0_0)] transition-[clip-path] duration-400 group-hover:[clip-path:inset(0)]"
                />
              </li>
            );
          })}
        </ol>

        <div className="mt-16 grid items-center gap-6 sm:gap-8 lg:gap-12 border-t border-line pt-10 lg:grid-cols-12 lg:gap-8 sm:gap-12 lg:gap-16">
          <div className="scroll-reveal order-1 lg:order-2 lg:col-span-5">
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
                className="btn-shine inline-flex w-full items-center justify-center rounded-full bg-primary px-5 py-3 text-center text-sm font-semibold text-primary-foreground transition-all duration-300 hover:-translate-y-0.5 hover:bg-brass-soft hover:shadow-card sm:w-auto sm:px-6"
              >
                Get Your Business Software
              </Link>

              <Link
                href="/how-it-works"
                className="flex w-full items-center justify-center rounded-full px-5 py-3 text-sm font-semibold text-foreground ring-1 ring-line transition-colors hover:bg-surface sm:w-auto"
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

          <div className="scroll-reveal order-2 lg:order-1 lg:col-span-7">
            <div className="overflow-hidden rounded-xl border border-line bg-background shadow-lift">
              <Image
                src="/assets/admin-website/mobile-booking.png"
                alt="Fyncho customer booking experience"
                width={1600}
                height={900}
                sizes="(min-width: 1024px) 58vw, 92vw"
                className="aspect-[16/9] w-full object-cover"
              unoptimized
              />
              <div className="flex min-h-24 items-end gap-4 border-t border-line bg-primary px-5 py-4 text-primary-foreground sm:px-7">
                <span aria-hidden="true" className="mb-1 h-10 w-px shrink-0 bg-brass" />
                <div className="min-w-0">
                  <p className="font-mono text-[9px] uppercase tracking-[0.18em] text-brass sm:text-[10px]">
                    Online booking
                  </p>
                  <p className="mt-1 w-full text-balance font-display text-xl leading-tight sm:text-2xl">
                    A complete booking experience, available around the clock.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── DASHBOARD ─────────────────────────────────────────────────── */}
      <section className="border-y border-line bg-surface py-12 sm:py-16 lg:py-20 xl:py-24">
        <div className="mx-auto max-w-7xl px-6">
          <div className="scroll-reveal grid items-end gap-8 lg:grid-cols-12 lg:gap-6 sm:gap-8 lg:gap-12">
            <div className="lg:col-span-7">
              <span className="rule-brass mb-5" />
              <p className="eyebrow">Business management</p>

              <h2 className="mt-4 text-4xl leading-tight text-balance sm:text-5xl">
                Run your business from one dashboard.
              </h2>

              <p className="mt-4 max-w-[52ch] text-pretty text-muted-foreground">
                Appointments, revenue, customers, team activity, services, and
                reports stay connected — so you always have a clear view of the
                day ahead.
              </p>
            </div>

            <div className="flex justify-start lg:col-span-5 lg:justify-end lg:self-end">
              <Link
                href="/features"
                className="group inline-flex items-center gap-2 whitespace-nowrap font-mono text-xs uppercase tracking-[0.2em] text-brass-soft transition-colors hover:text-brass"
              >
                See the full feature set
                <ArrowRight
                  size={14}
                  className="transition-transform duration-300 group-hover:translate-x-1"
                  aria-hidden="true"
                />
              </Link>
            </div>
          </div>

          <div className="scroll-reveal mt-12 grid gap-6 sm:gap-8 lg:gap-12 lg:grid-cols-12 lg:gap-8 sm:gap-12 lg:gap-16 lg:items-stretch">
            <div className="order-2 mx-auto w-full overflow-hidden rounded-xl border border-line bg-background shadow-lift lg:order-2 lg:col-span-7">
              <div className="flex items-center gap-1.5 border-b border-line px-4 py-3">
                <span className="size-2 rounded-full bg-muted-foreground/25" />
                <span className="size-2 rounded-full bg-muted-foreground/25" />
                <span className="size-2 rounded-full bg-muted-foreground/25" />
                <span className="ml-3 min-w-0 flex-1 truncate rounded-full border border-line bg-muted px-3 py-1 font-mono text-[9px] text-muted-foreground sm:text-[10px]">
                  Fyncho business dashboard
                </span>
              </div>
              <Image
                src="/assets/admin-website/dashboard-preview.jpg"
                alt="Fyncho business dashboard showing appointments, revenue, customers, and services"
                width={1408}
                height={912}
                sizes="(min-width: 1024px) 72vw, 92vw"
                className="aspect-[16/10] w-full object-cover"
              unoptimized
              />
            </div>

            <div className="order-1 min-h-full rounded-xl border border-line bg-background p-6 shadow-card sm:p-8 lg:order-1 lg:col-span-5">
              <p className="font-mono text-[9px] uppercase tracking-[0.18em] text-brass">
                One clear overview
              </p>
              <p className="mt-4 font-display text-2xl leading-tight sm:text-3xl">
                Everything important, connected.
              </p>

              <div className="mt-6 grid grid-cols-2 gap-px overflow-hidden rounded-lg border border-line bg-line lg:grid-cols-1">
                {dashboardHighlights.map((item) => (
                  <div
                    key={item}
                    className="flex items-center gap-2 bg-background px-3 py-3 text-sm text-muted-foreground"
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
        </div>
      </section>

      {/* ── TRUST ─────────────────────────────────────────────────────── */}
      <section className="relative isolate overflow-clip bg-primary py-12 sm:py-16 lg:py-20 xl:py-24">
        <Image
          src="/assets/admin-website/avivane-banner-craft.jpg"
          alt=""
          aria-hidden="true"
          fill
          sizes="100vw"
          className="object-cover opacity-20"
        unoptimized
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
      <section className="border-t border-line bg-surface py-12 sm:py-16 lg:py-20 xl:py-24">
        <div className="mx-auto grid max-w-7xl gap-6 sm:gap-8 lg:gap-12 px-6 lg:grid-cols-12 lg:gap-8 sm:gap-12 lg:gap-16">
          <div className="scroll-reveal lg:col-span-5">
            <span className="rule-brass mb-5" />
            <p className="eyebrow">Frequently asked</p>

            <h2 className="mt-4 text-4xl leading-tight text-balance sm:text-5xl">
              Frequently asked questions.
            </h2>

            <p className="mt-4 max-w-[38ch] text-pretty text-muted-foreground">
              Everything you need to know before giving your business its own
              software — answered clearly, in one place.
            </p>

            <Link
              href="/contact"
              className="group mt-6 inline-flex items-center gap-2 whitespace-nowrap font-mono text-xs uppercase tracking-[0.2em] text-brass-soft transition-colors hover:text-brass"
            >
              Talk to us
              <ArrowRight
                size={14}
                className="transition-transform duration-300 group-hover:translate-x-1"
                aria-hidden="true"
              />
            </Link>
          </div>

          <div className="scroll-reveal lg:col-span-7">
            <div className="grid gap-3">
              {faqs.map((faq, index) => (
                <FaqItem key={faq.q} index={index} question={faq.q} answer={faq.a} />
              ))}
            </div>

            <div className="mt-6 flex flex-col items-start gap-3 rounded-xl border border-dashed border-brass/40 bg-brass/5 p-5 sm:flex-row sm:items-center sm:justify-between sm:p-6">
              <div>
                <p className="font-display text-lg leading-tight">
                  Still have a question?
                </p>
                <p className="mt-1 text-sm text-muted-foreground">
                  Our team is happy to help you get started.
                </p>
              </div>
              <Link
                href="/contact"
                className="group btn-shine inline-flex items-center justify-center gap-1.5 rounded-full bg-primary px-5 py-2.5 text-sm font-semibold text-primary-foreground transition-all duration-300 hover:-translate-y-0.5 hover:bg-brass-soft hover:shadow-card"
              >
                Talk to us
                <ArrowRight
                  size={14}
                  className="transition-transform duration-300 group-hover:translate-x-1"
                  aria-hidden="true"
                />
              </Link>
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
import type { Metadata } from 'next';
import Link from 'next/link';
import { SiteShell } from '@/components/admin/admin-website/site-shell';
import { ClosingCta } from '@/components/admin/admin-website/marketing-sections';

const TITLE = 'Avivane — Your Salon Deserves Its Own Digital Home';
const DESCRIPTION =
  'Create your professional salon website, accept online bookings, and manage customers, staff and services from one platform.';

export const metadata: Metadata = {
  title: TITLE,
  description: DESCRIPTION,
  openGraph: {
    title: TITLE,
    description: DESCRIPTION,
    type: 'website',
  },
  twitter: { card: 'summary_large_image' },
};

const steps = [
  { n: '01', t: 'Create your account', d: 'Register your salon business in under a minute.' },
  { n: '02', t: 'Choose your URL', d: 'Select the unique slug that becomes your address.' },
  { n: '03', t: 'Set up your salon', d: 'Add services, team, branding and business details.' },
  { n: '04', t: 'Go live', d: 'Share your salon website and start booking.' },
];

const features = [
  { t: 'Salon Website', d: "A branded, responsive website built around your salon's identity." },
  { t: 'Online Booking', d: 'Customers book services, staff and times — any hour of the day.' },
  { t: 'Customer Management', d: 'Profiles, visit history and preferences in one tidy record.' },
  { t: 'Staff & Services', d: 'Manage your team, schedules and the services you offer.' },
  { t: 'Payments & Memberships', d: 'Card payments, memberships and loyalty that keep clients returning.' },
  { t: 'Analytics & Reports', d: 'See bookings, revenue and growth as your business scales.' },
];

const bookingFlow = [
  'Visits avivane.com/glam-studio',
  'Chooses a service',
  'Selects a stylist',
  'Picks date & time',
  'Logs in & confirms',
  'Receives confirmation',
];

const faqs = [
  {
    q: 'Do I get my own salon website?',
    a: 'Yes. Every salon on Avivane receives a complete, responsive website with home, services, team, gallery, about, contact, booking and customer login.',
  },
  {
    q: 'How does my salon URL work?',
    a: "You choose a unique slug during setup — say glam-studio — and your salon lives at avivane.com/glam-studio from the moment you go live.",
  },
  {
    q: 'Can I use my own domain?',
    a: 'Yes. Connect a custom domain on the Professional plan and above; your Avivane URL keeps working alongside it.',
  },
  {
    q: 'Can customers book online and create accounts?',
    a: 'Customers book directly from your website, create an account to manage appointments, and return to rebook in a couple of taps.',
  },
  {
    q: 'Can I manage staff, services and payments?',
    a: 'Your salon dashboard covers appointments, staff schedules, services, customers, payments, memberships, loyalty and reports.',
  },
  {
    q: 'What happens after I create my salon?',
    a: 'You receive your live website URL and enter your salon dashboard, where everything else is managed. You can change your branding and content any time.',
  },
  {
    q: 'Can I upgrade my plan later?',
    a: 'Switch plans whenever your salon grows — pricing adjusts on your next billing cycle with no interruption to your website.',
  },
];

const stats = [
  { v: '10,000+', l: 'salons' },
  { v: '1M+', l: 'bookings' },
  { v: '50,000+', l: 'professionals' },
  { v: '25+', l: 'countries' },
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
            <p className="anim-rise eyebrow text-brass">The digital home for modern salons</p>
            <h1 className="anim-rise-2 mt-5 font-display text-6xl leading-[0.88] text-balance text-primary-foreground sm:text-8xl lg:text-9xl">
              Your name belongs <em className="italic text-brass">above the door.</em>
            </h1>
            <p className="anim-rise-3 mt-6 max-w-[55ch] text-base leading-relaxed text-pretty text-primary-foreground/75 sm:text-lg">
              Launch a professional salon website, accept bookings around the clock, and run every client relationship from one beautifully connected platform.
            </p>
            <div className="anim-rise-3 mt-8 flex flex-wrap items-center gap-3">
              <Link href="/register" className="rounded-full bg-brass px-7 py-3.5 text-sm font-semibold text-accent-foreground transition-all duration-300 hover:-translate-y-0.5 hover:bg-surface hover:shadow-lift">
                Get Your Salon Website
              </Link>
              <Link href="/how-it-works" className="rounded-full px-7 py-3.5 text-sm font-semibold text-primary-foreground ring-1 ring-primary-foreground/35 transition-colors hover:bg-primary-foreground/10">
                See how it works
              </Link>
            </div>
            <div className="anim-rise-4 mt-10 flex flex-wrap gap-x-8 gap-y-2 border-t border-primary-foreground/20 pt-5 font-mono text-[10px] uppercase tracking-[0.18em] text-primary-foreground/60">
              <span>No card required</span><span>Live in minutes</span><span>Your URL · Your clients · Your brand</span>
            </div>
          </div>
        </div>
      </section>

      {/* SLUG CLAIM */}
      <section className="border-y border-line bg-surface py-16">
        <div className="mx-auto max-w-2xl px-6 text-center">
          <p className="eyebrow">Claim your address</p>
          <h2 className="mt-4 text-4xl leading-tight text-balance sm:text-5xl">
            Every salon gets its own lit sign.
          </h2>
          <p className="mx-auto mt-4 max-w-[52ch] text-pretty text-muted-foreground">
            Pick a unique slug and your salon lives at its own URL — simple, memorable, and yours.
          </p>

          <div className="mt-8 flex flex-col items-stretch gap-3 sm:flex-row">
            <div className="flex flex-1 items-center rounded-full bg-background px-5 py-3 ring-1 ring-line">
              <span className="font-mono text-sm text-muted-foreground">avivane.com/</span>
              <span className="ml-1 font-mono text-sm text-foreground">
                glam-studio
                <span className="caret text-brass" />
              </span>
            </div>
            <Link
              href="/register"
              className="flex items-center justify-center gap-2 rounded-full bg-primary px-6 py-3 transition-colors hover:bg-brass-soft"
            >
              <span className="text-sm font-semibold text-primary-foreground">✓ Available</span>
              <span className="rounded-full bg-brass px-3 py-1 text-xs font-semibold text-accent-foreground">
                Claim it
              </span>
            </Link>
          </div>
          <p className="mt-5 font-mono text-xs text-muted-foreground">
            This is the promise: your salon, its own door on the avenue.
          </p>
        </div>
      </section>

      {/* PRODUCT CONCEPT */}
      <section className="mx-auto max-w-6xl px-6 py-20">
        <div className="max-w-xl">
          <p className="eyebrow">The concept</p>
          <h2 className="mt-3 text-4xl leading-tight text-balance sm:text-5xl">
            One platform. Your own salon website.
          </h2>
          <p className="mt-4 text-pretty text-muted-foreground">
            Avivane gives every salon a complete digital presence — and everything behind it flows
            from that single address.
          </p>
        </div>
        <ol className="mt-10 grid grid-cols-2 gap-4 lg:grid-cols-5">
          {["Your Salon", "Your Website", "Your Customers", "Your Bookings", "Your Business"].map(
            (label, i) => (
              <li key={label} className="card-lux px-6 py-8">
                <span className="numeral">{`0${i + 1}`}</span>
                <p className="mt-3 font-display text-2xl">{label}</p>
              </li>
            ),
          )}
        </ol>
      </section>

      {/* YOUR OWN SALON WEBSITE */}
      <section className="border-y border-line bg-surface py-20">
        <div className="mx-auto grid max-w-6xl grid-cols-1 items-center gap-12 px-6 lg:grid-cols-2">
          <div>
            <p className="eyebrow">Your own salon website</p>
            <h2 className="mt-3 text-4xl leading-tight text-balance sm:text-5xl">
              Get your own salon website in minutes.
            </h2>
            <p className="mt-4 max-w-[48ch] text-pretty text-muted-foreground">
              Every salon receives a unique website URL based on its slug — and a full site behind
              it, ready for customers on the day you launch.
            </p>
            <ul className="mt-8 grid grid-cols-2 gap-x-6 gap-y-3 text-sm">
              {["Home", "Services", "Team", "Gallery", "About", "Contact", "Booking", "Customer login"].map(
                (item) => (
                  <li key={item} className="flex gap-2 text-foreground">
                    <span className="text-brass">✓</span>
                    {item}
                  </li>
                ),
              )}
            </ul>
            <Link
              href="/register"
              className="mt-9 inline-block rounded-full bg-primary px-6 py-3 text-sm font-semibold text-primary-foreground transition-colors hover:bg-brass-soft"
            >
              Create My Salon Website
            </Link>
          </div>
          <div className="rounded-2xl border border-line bg-background p-4 shadow-lift">
            <p className="px-2 pb-3 font-mono text-xs text-muted-foreground">
              avivane.com/glam-studio
            </p>
            <img
              src="/assets/admin-website/salon-hero.jpg"
              alt="Preview of the Glam Studio salon website"
              loading="lazy"
              width={1200}
              height={800}
              className="aspect-4/3 w-full rounded-xl object-cover"
            />
          </div>
        </div>
      </section>

      {/* HOW IT WORKS */}
      <section className="mx-auto max-w-6xl px-6 py-20">
        <div className="mb-12 flex items-end justify-between">
          <h2 className="text-4xl text-balance sm:text-5xl">How it works</h2>
          <span className="font-mono text-xs uppercase tracking-[0.2em] text-muted-foreground">
            (01 – 04)
          </span>
        </div>
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {steps.map((s) => (
            <div key={s.n} className="card-lux p-7">
              <span className="font-display text-4xl text-brass/70">{s.n}</span>
              <h3 className="mt-4 text-2xl">{s.t}</h3>
              <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{s.d}</p>
            </div>
          ))}
        </div>
        <Link
          href="/register"
          className="mt-8 inline-block rounded-full bg-primary px-6 py-3 text-sm font-semibold text-primary-foreground transition-colors hover:bg-brass-soft"
        >
          Get Started
        </Link>
      </section>

      {/* FEATURES */}
      <section className="mx-auto max-w-6xl px-6 pb-20">
        <div className="mb-10 max-w-xl">
          <p className="eyebrow">One platform</p>
          <h2 className="mt-3 text-4xl leading-tight text-balance sm:text-5xl">
            Everything your salon needs, in one place.
          </h2>
        </div>
        <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {features.map((f, i) => (
            <div key={f.t} className="card-lux p-7">
              <span className="numeral">{String(i + 1).padStart(2, "0")}</span>
              <h3 className="mt-4 text-2xl">{f.t}</h3>
              <p className="mt-3 text-sm leading-relaxed text-muted-foreground">{f.d}</p>
            </div>
          ))}
        </div>
        <p className="mt-6 font-mono text-xs text-muted-foreground">
          Also included: appointments, memberships, loyalty, marketing and reports.
        </p>
      </section>

      {/* ONLINE BOOKING */}
      <section className="border-y border-line bg-surface py-20">
        <div className="mx-auto grid max-w-6xl grid-cols-1 gap-12 px-6 lg:grid-cols-12">
          <div className="lg:col-span-5">
            <p className="eyebrow">Online booking</p>
            <h2 className="mt-3 text-4xl leading-tight text-balance sm:text-5xl">
              Turn your salon website into your 24/7 booking channel.
            </h2>
            <p className="mt-4 max-w-[46ch] text-pretty text-muted-foreground">
              Customers book from your own address — no marketplace, no competing listings, no
              commission on your regulars.
            </p>
          </div>
          <ol className="lg:col-span-7">
            {bookingFlow.map((step, i) => (
              <li
                key={step}
                className="flex items-center gap-5 border-b border-line py-4 last:border-b-0"
              >
                <span className="font-mono text-xs text-brass">{`0${i + 1}`}</span>
                <span className="font-display text-2xl">{step}</span>
              </li>
            ))}
          </ol>
        </div>
      </section>

      {/* SALON MANAGEMENT */}
      <section className="mx-auto max-w-6xl px-6 py-20">
        <div className="grid grid-cols-1 items-center gap-12 lg:grid-cols-12">
          <div className="lg:col-span-4">
            <p className="eyebrow">Salon management</p>
            <h2 className="mt-3 text-4xl leading-tight text-balance sm:text-5xl">
              Run the whole floor from one dashboard.
            </h2>
            <ul className="mt-8 space-y-3 text-sm">
              {["Appointments", "Revenue", "Customers", "Staff", "Services", "Analytics"].map((i) => (
                <li key={i} className="flex gap-2">
                  <span className="text-brass">✓</span>
                  {i}
                </li>
              ))}
            </ul>
            <Link
              href="/features"
              className="mt-8 inline-block font-mono text-xs uppercase tracking-[0.2em] text-brass-soft hover:text-brass"
            >
              Explore Salon Management →
            </Link>
          </div>
          <div className="lg:col-span-8">
            <img
              src="/assets/admin-website/dashboard-preview.jpg"
              alt="Salon admin dashboard showing appointments, revenue and customers"
              loading="lazy"
              width={1408}
              height={912}
              className="w-full rounded-2xl border border-line shadow-lift"
            />
          </div>
        </div>
      </section>

      {/* CUSTOMER EXPERIENCE + MOBILE */}
      <section className="border-y border-line bg-surface py-20">
        <div className="mx-auto grid max-w-6xl grid-cols-1 items-center gap-12 px-6 lg:grid-cols-2">
          <div>
            <p className="eyebrow">Customer experience</p>
            <h2 className="mt-3 text-4xl leading-tight text-balance sm:text-5xl">
              Beautiful on every screen your clients hold.
            </h2>
            <p className="mt-4 max-w-[46ch] text-pretty text-muted-foreground">
              Every salon website is fully responsive — discovery, booking, accounts and rebooking
              all feel effortless on mobile.
            </p>
            <ol className="mt-8 space-y-3 font-display text-2xl">
              {[
                'Discover salon',
                'View services',
                'Book appointment',
                'Manage appointment',
                'Return & book again',
              ].map((s) => (
                <li key={s} className="border-b border-line pb-3 last:border-b-0">
                  {s}
                </li>
              ))}
            </ol>
          </div>
          <img
            src="/assets/admin-website/mobile-booking.jpg"
            alt="Salon website booking flow shown on a mobile phone"
            loading="lazy"
            width={912}
            height={1104}
            className="w-full rounded-2xl object-cover"
          />
        </div>
      </section>

      {/* TRUST */}
      <section className="mx-auto max-w-6xl px-6 py-20">
        <div className="grid grid-cols-2 gap-4 lg:grid-cols-4">
          {stats.map((s) => (
            <div key={s.l} className="card-lux px-6 py-9 text-center">
              <p className="font-display text-5xl leading-none">{s.v}</p>
              <p className="mt-1 font-mono text-xs uppercase tracking-[0.2em] text-muted-foreground">
                {s.l}
              </p>
            </div>
          ))}
        </div>

        <div className="mt-12 grid grid-cols-1 items-center gap-10 lg:grid-cols-12">
          <img
            src="/assets/admin-website/owner-portrait.jpg"
            alt="Salon owner standing in her studio"
            loading="lazy"
            width={912}
            height={1104}
            className="aspect-4/5 w-full rounded-2xl object-cover lg:col-span-4"
          />
          <blockquote className="lg:col-span-8">
            <p className="font-display text-3xl leading-snug text-balance sm:text-4xl">
              “Glam Studio increased online bookings by 38% within three months of launching its
              Avivane website. Clients finally have one place that feels like us.”
            </p>
            <footer className="mt-6 font-mono text-xs uppercase tracking-[0.2em] text-muted-foreground">
              Marielle Okonkwo · Owner, Glam Studio · Lisbon
            </footer>
            <Link
              href="/customers"
              className="mt-6 inline-block font-mono text-xs uppercase tracking-[0.2em] text-brass-soft hover:text-brass"
            >
              Read customer story →
            </Link>
          </blockquote>
        </div>
      </section>

      {/* FAQ */}
      <section className="border-t border-line bg-surface py-20">
        <div className="mx-auto max-w-3xl px-6">
          <h2 className="text-4xl text-balance sm:text-5xl">Questions, answered.</h2>
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
        title="Ready to give your salon its own website?"
        description="Create your salon, choose your unique URL, and start building your digital presence today."
        secondary={{ label: 'View Pricing', to: '/pricing' }}
      />
    </SiteShell>
  );
}
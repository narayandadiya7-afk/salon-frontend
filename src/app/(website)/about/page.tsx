import type { Metadata } from "next";
import Link from "next/link";
import { SiteShell, PageHero } from "@/components/admin/admin-website/site-shell";
import { ClosingCta, SectionHeading } from "@/components/admin/admin-website/marketing-sections";

const TITLE = "About Fyncho — Business Management & Booking Platform for Beauty & Wellness";
const DESCRIPTION =
  "Fyncho gives beauty salons, barbershops, spas, wellness centres and personal-care professionals their own website, their own address and the tools to run the business behind it.";

export const metadata: Metadata = {
  title: TITLE,
  description: DESCRIPTION,
  openGraph: { title: TITLE, description: DESCRIPTION, type: "website" },
  twitter: { card: "summary_large_image" },
};

const stats = [
  { v: "10,000+", l: "businesses" },
  { v: "1M+", l: "bookings" },
  { v: "50,000+", l: "professionals" },
  { v: "25+", l: "countries" },
];

export default function AboutPage() {
  return (
    <SiteShell>
      <PageHero
        eyebrow="About"
        title={<>We think every beauty and wellness business deserves a door of its own.</>}
        intro="Beauty, wellness and grooming businesses spent a decade renting their customers from marketplaces. Fyncho exists so a business's digital presence belongs to the business."
        image="/assets/admin-website/avivane-banner-interior.jpg"
        imageAlt="Sunlit premium salon interior designed around the client experience"
      />

      <section className="mx-auto max-w-6xl px-6 pb-16">
        <img
          src="/assets/admin-website/salon-hero.jpg"
          alt="A modern beauty studio in warm daylight"
          loading="lazy"
          width={1200}
          height={800}
          className="aspect-21/9 w-full rounded-2xl object-cover"
        />
      </section>

      <section className="border-y border-line bg-surface py-16">
        <div className="mx-auto grid max-w-6xl grid-cols-2 gap-4 px-6 lg:grid-cols-4">
          {stats.map((s) => (
            <div key={s.l} className="card-lux bg-background px-6 py-9 text-center">
              <p className="font-display text-5xl leading-none">{s.v}</p>
              <p className="mt-1 font-mono text-xs uppercase tracking-[0.2em] text-muted-foreground">
                {s.l}
              </p>
            </div>
          ))}
        </div>
      </section>

      <section className="mx-auto max-w-3xl px-6 py-20">
        <h2 className="text-4xl text-balance sm:text-5xl">What we build toward</h2>
        <p className="mt-6 text-lg leading-relaxed text-pretty text-muted-foreground">
          One platform, many businesses — each with its own identity, its own customers, and its own place online. Whether you run a salon, barbershop, spa, nail studio, massage practice, wellness business, clinic, studio, or another service-based business, Fyncho gives you the tools to manage your business while keeping your brand at the center.
        </p>
        <p className="mt-4 text-lg leading-relaxed text-pretty text-muted-foreground">
          We’re building Fyncho to make running a service business simpler — from bookings and customers to payments, memberships, loyalty, teams, and day-to-day operations.
        </p>
        <Link
          href="/register"
          className="mt-9 inline-block rounded-full bg-primary px-7 py-3.5 text-sm font-semibold text-primary-foreground transition-colors hover:bg-brass-soft"
        >
          Get Started Free
        </Link>
      </section>

      <section className="border-y border-line bg-surface py-20 sm:py-28">
        <div className="mx-auto max-w-6xl px-6">
          <SectionHeading
            eyebrow="Our point of view"
            title="The platform should be recognised by what it enables — not by how much space it occupies."
            description="Business owners invest years in a name, reputation and customer experience. The technology beneath it should reinforce that identity rather than replace it."
          />
          <div className="mt-12 grid gap-10 lg:grid-cols-3">
            {[
              ["Ownership", "Your software, audience and customer relationships should remain centred on your business brand."],
              ["Clarity", "Powerful operations should feel understandable to the people running a busy floor."],
              ["Hospitality", "Every digital interaction should carry the same care as the welcome at reception."],
            ].map(([title, copy], i) => (
              <article key={title} className="border-t border-brass pt-6">
                <span className="font-mono text-xs text-brass">0{i + 1}</span>
                <h3 className="mt-4 text-3xl">{title}</h3>
                <p className="mt-3 leading-relaxed text-muted-foreground">{copy}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-6xl px-6 py-20 sm:py-28">
        <div className="grid gap-12 lg:grid-cols-2">
          <SectionHeading
            eyebrow="Global by design"
            title="Built for local businesses, wherever local happens to be."
            description="From independent studios to international groups, Fyncho is designed around different service menus, teams, currencies and ways of working — without losing the simplicity of one platform."
          />
          <blockquote className="border-l border-brass pl-8">
            <p className="font-display text-3xl leading-snug text-balance sm:text-4xl">
              "The best business software disappears into the experience. The customer remembers the business, not the software."
            </p>
            <footer className="mt-6 font-mono text-xs uppercase tracking-[0.18em] text-muted-foreground">
              The principle behind Fyncho
            </footer>
          </blockquote>
        </div>
      </section>

      <ClosingCta
        title="Give your business a digital home worthy of its name."
        description="Join beauty and wellness owners building stronger direct relationships with the people they serve."
        secondary={{ label: "How It Works", to: "/how-it-works" }}
      />
    </SiteShell>
  );
}

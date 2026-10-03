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

const TITLE =
  "About Fyncho — Business Management & Booking Software for Service Businesses";

const DESCRIPTION =
  "Fyncho gives service-based businesses their own professional business software, business address, booking experience, and tools to manage customers, teams, services, payments, and daily operations.";

export const metadata: Metadata = {
  title: TITLE,
  description: DESCRIPTION,
  openGraph: { title: TITLE, description: DESCRIPTION, type: "website" },
  twitter: { card: "summary_large_image" },
};

export default function AboutPage() {
  return (
    <SiteShell>
      <PageHero
        eyebrow="About"
        title={
          <>
            We believe every service business deserves a place of its own.
          </>
        }
        intro="Fyncho exists to give service-based businesses their own professional business software — bringing their services, customers, bookings, team, and daily operations together in one place."
        image="/assets/admin-website/avivane-banner-interior.jpg"
        imageAlt="Sunlit premium service business interior designed around the customer experience"
      />

      <section className="mx-auto max-w-6xl px-6 pb-16">
        <img
          src="/assets/admin-website/salon-hero.jpg"
          alt="A modern service business in warm daylight"
          loading="lazy"
          width={1200}
          height={800}
          className="aspect-21/9 w-full rounded-2xl object-cover"
        />
      </section>

      <section className="mx-auto max-w-3xl px-6 py-20">
        <h2 className="text-4xl text-balance sm:text-5xl">
          What we are building
        </h2>

        <p className="mt-6 text-lg leading-relaxed text-pretty text-muted-foreground">
          One platform, many businesses — each with its own identity, its own
          customers, and its own place online. Whether you run a salon,
          barbershop, spa, nail studio, massage practice, wellness business,
          beauty studio, or another service-based business, Fyncho gives you
          the tools to manage the business while keeping your brand at the
          center.
        </p>

        <p className="mt-4 text-lg leading-relaxed text-pretty text-muted-foreground">
          We are building Fyncho to make running a service business simpler —
          from services and bookings to customers, payments, memberships,
          loyalty, team management, and everyday operations.
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
            title="Your business should remain at the center of the experience."
            description="Business owners invest years in building a name, reputation, and customer relationships. The technology behind the business should support that identity rather than get in the way."
          />

          <div className="mt-12 grid gap-10 lg:grid-cols-3">
            {[
              [
                "Ownership",
                "Your business software, customer relationships, and online presence should remain centred on your business.",
              ],
              [
                "Clarity",
                "Powerful business tools should feel simple and understandable for the people using them every day.",
              ],
              [
                "Experience",
                "Every interaction should make it easier for customers to discover your business, book, return, and stay connected.",
              ],
            ].map(([title, copy], i) => (
              <article key={title} className="border-t border-brass pt-6">
                <span className="font-mono text-xs text-brass">
                  0{i + 1}
                </span>

                <h3 className="mt-4 text-3xl">{title}</h3>

                <p className="mt-3 leading-relaxed text-muted-foreground">
                  {copy}
                </p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-6xl px-6 py-20 sm:py-28">
        <div className="grid gap-12 lg:grid-cols-2">
          <SectionHeading
            eyebrow="Built to grow with you"
            title="Start with what your business needs today."
            description="Fyncho is designed for independent professionals, growing teams, specialist studios, and businesses operating across multiple locations — all within one platform."
          />

          <div className="border-l border-brass pl-8">
            <p className="font-display text-3xl leading-snug text-balance sm:text-4xl">
              Your business should be remembered for the experience you create,
              not the technology behind it.
            </p>

            <p className="mt-6 font-mono text-xs uppercase tracking-[0.18em] text-muted-foreground">
              The principle behind Fyncho
            </p>
          </div>
        </div>
      </section>

      <ClosingCta
        title="Give your business a place of its own."
        description="Create your business software, choose your unique business address, and bring your customers, bookings, services, and daily operations together."
        secondary={{ label: "How It Works", to: "/how-it-works" }}
      />
    </SiteShell>
  );
}
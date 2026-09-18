import type { Metadata } from "next";
import Link from "next/link";
import { SiteShell, PageHero } from "@/components/admin/admin-website/site-shell";
import { ClosingCta, SectionHeading } from "@/components/admin/admin-website/marketing-sections";

const TITLE = "About Avivane — The Platform for Modern Salons";
const DESCRIPTION =
  "Avivane gives every salon its own website, its own address and the tools to run the business behind it.";

export const metadata: Metadata = {
  title: TITLE,
  description: DESCRIPTION,
  openGraph: { title: TITLE, description: DESCRIPTION, type: "website" },
  twitter: { card: "summary_large_image" },
};

const stats = [
  { v: "10,000+", l: "salons" },
  { v: "1M+", l: "bookings" },
  { v: "50,000+", l: "professionals" },
  { v: "25+", l: "countries" },
];

export default function AboutPage() {
  return (
    <SiteShell>
      <PageHero
        eyebrow="About"
        title={<>We think every salon deserves a door of its own.</>}
        intro="Beauty businesses spent a decade renting their customers from marketplaces. Avivane exists so a salon's digital presence belongs to the salon."
        image="/assets/admin-website/avivane-banner-interior.jpg"
        imageAlt="Sunlit premium salon interior designed around the client experience"
      />

      <section className="mx-auto max-w-6xl px-6 pb-16">
        <img
          src="/assets/admin-website/salon-hero.jpg"
          alt="A modern salon interior in warm daylight"
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
          One platform, many salons — each with its own identity, its own clients and its own URL.
          We keep the platform out of the way so the brand on the sign is the one your customers
          remember.
        </p>
        <p className="mt-4 text-lg leading-relaxed text-pretty text-muted-foreground">
          Avivane is built by a distributed team across Europe, working with salon owners in 25
          countries. If you want to talk to us, we answer.
        </p>
        <Link
          href="/register"
          className="mt-9 inline-block rounded-full bg-primary px-7 py-3.5 text-sm font-semibold text-primary-foreground transition-colors hover:bg-brass-soft"
        >
          Get Your Salon Website
        </Link>
      </section>

      <section className="border-y border-line bg-surface py-20 sm:py-28">
        <div className="mx-auto max-w-6xl px-6">
          <SectionHeading eyebrow="Our point of view" title="The platform should be recognised by what it enables — not by how much space it occupies." description="Salon owners invest years in a name, reputation and client experience. The technology beneath it should reinforce that identity rather than replace it." />
          <div className="mt-12 grid gap-10 lg:grid-cols-3">
            {[
              ["Ownership", "Your website, audience and client relationships should remain centred on your salon brand."],
              ["Clarity", "Powerful operations should feel understandable to the people running a busy floor."],
              ["Hospitality", "Every digital interaction should carry the same care as the welcome at reception."],
            ].map(([title, copy], i) => <article key={title} className="border-t border-brass pt-6"><span className="font-mono text-xs text-brass">0{i + 1}</span><h3 className="mt-4 text-3xl">{title}</h3><p className="mt-3 leading-relaxed text-muted-foreground">{copy}</p></article>)}
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-6xl px-6 py-20 sm:py-28">
        <div className="grid gap-12 lg:grid-cols-2">
          <SectionHeading eyebrow="Global by design" title="Built for local salons, wherever local happens to be." description="From independent studios to international groups, Avivane is designed around different service menus, teams, currencies and ways of working — without losing the simplicity of one platform." />
          <blockquote className="border-l border-brass pl-8"><p className="font-display text-3xl leading-snug text-balance sm:text-4xl">“The best salon technology disappears into the experience. The client remembers the salon, not the software.”</p><footer className="mt-6 font-mono text-xs uppercase tracking-[0.18em] text-muted-foreground">The principle behind Avivane</footer></blockquote>
        </div>
      </section>

      <ClosingCta title="Give your salon a digital home worthy of its name." description="Join salon owners building stronger direct relationships with the people they serve." secondary={{ label: "How It Works", to: "/how-it-works" }} />
    </SiteShell>
  );
}
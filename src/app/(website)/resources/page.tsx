import type { Metadata } from "next";
import Link from "next/link";
import { SiteShell, PageHero } from "@/components/admin/admin-website/site-shell";
import { ClosingCta, SectionHeading } from "@/components/admin/admin-website/marketing-sections";

const TITLE = "Resources — Guides & Help for Salon Owners | Avivane";
const DESCRIPTION =
  "Guides, articles and help centre resources on launching a salon website, filling your calendar and growing retention.";

export const metadata: Metadata = {
  title: TITLE,
  description: DESCRIPTION,
  openGraph: { title: TITLE, description: DESCRIPTION, type: "website" },
  twitter: { card: "summary_large_image" },
};

const groups = [
  {
    title: "Guides",
    items: [
      "Naming your salon slug well",
      "Writing a service menu that sells",
      "Photographing your salon on a phone",
    ],
  },
  {
    title: "Blog",
    items: [
      "Why marketplaces cost you your regulars",
      "Deposits without scaring clients away",
      "The quiet economics of memberships",
    ],
  },
  {
    title: "Help centre",
    items: ["Setting up staff and hours", "Connecting a custom domain", "Refunds and cancellations"],
  },
];

export default function ResourcesPage() {
  return (
    <SiteShell>
      <PageHero
        eyebrow="Resources"
        title={<>Everything we know about filling a salon calendar.</>}
        intro="Practical writing for owners — short, specific and free of platform jargon."
        image="/assets/admin-website/avivane-banner-business.jpg"
        imageAlt="Professional salon tools and business notebook"
      />

      <section className="mx-auto max-w-6xl px-6 pb-20">
        <div className="grid grid-cols-1 gap-5 lg:grid-cols-3">
          {groups.map((g) => (
            <div key={g.title} className="card-lux p-8">
              <h2 className="font-mono text-[11px] uppercase tracking-[0.2em] text-brass">
                {g.title}
              </h2>
              <ul className="mt-6 space-y-4">
                {g.items.map((item) => (
                  <li
                    key={item}
                    className="group flex items-start justify-between gap-4 border-b border-line pb-4 last:border-b-0 last:pb-0"
                  >
                    <span className="font-display text-xl leading-snug transition-colors duration-300 group-hover:text-brass-soft">
                      {item}
                    </span>
                    <span className="mt-2 font-mono text-xs text-brass opacity-0 transition-opacity duration-300 group-hover:opacity-100">
                      →
                    </span>
                  </li>
                ))}
              </ul>
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
          <SectionHeading eyebrow="Start with the essentials" title="A practical library for building a salon clients can understand and trust." description="Use these topics to sharpen your offer, improve the booking journey and make each client touchpoint more consistent." />
          <div className="mt-12 divide-y divide-line border-y border-line">
            {[
              ["01", "Build your digital home", "Choose a memorable address, define your salon story, select useful imagery and organise information around the questions new clients ask first."],
              ["02", "Design a service menu", "Name services clearly, explain who they are for, set realistic durations and show pricing without making clients decode the details."],
              ["03", "Create better booking rules", "Balance client flexibility with deposits, cancellation windows, processing time and the real capacity of your team and space."],
              ["04", "Encourage the next visit", "Use rebooking, memberships, loyalty and thoughtful communication to turn a successful appointment into a lasting relationship."],
            ].map(([number, title, copy]) => <article key={number} className="grid gap-4 py-8 sm:grid-cols-12"><span className="font-mono text-xs text-brass sm:col-span-1">{number}</span><h3 className="text-2xl sm:col-span-4">{title}</h3><p className="leading-relaxed text-muted-foreground sm:col-span-7">{copy}</p></article>)}
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-6xl px-6 py-20 sm:py-28">
        <div className="grid gap-12 lg:grid-cols-2">
          <SectionHeading eyebrow="For owners and teams" title="Useful guidance should lead to a better working day." description="The library is organised around real moments in salon life: preparing to launch, training the front desk, refining policies, reading reports and planning growth." />
          <div className="grid gap-4 sm:grid-cols-2">
            {["Launching", "Operating", "Retaining", "Growing"].map((item, index) => <div key={item} className="card-lux p-7"><span className="numeral">0{index + 1}</span><h3 className="mt-4 text-2xl">{item}</h3><p className="mt-2 text-sm leading-relaxed text-muted-foreground">Focused advice, examples and checklists for this stage of the salon journey.</p></div>)}
          </div>
        </div>
      </section>

      <ClosingCta title="Put the guidance into practice with your own salon website." description="Create your address, bring your business details together and turn what you know into a clearer client experience." secondary={{ label: "How It Works", to: "/how-it-works" }} />
    </SiteShell>
  );
}
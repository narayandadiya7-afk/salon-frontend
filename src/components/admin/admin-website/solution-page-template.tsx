import type { ReactNode } from "react";
import Link from "next/link";
import { SiteShell, PageHero } from "@/components/admin/admin-website/site-shell";
import { ClosingCta, SectionHeading } from "@/components/admin/admin-website/marketing-sections";

export interface SolutionFeature {
  title: string;
  description: string;
}

export interface SolutionChallenge {
  title: string;
  description: string;
}

export interface RelatedSolution {
  label: string;
  to: string;
}

export interface SolutionPageProps {
  eyebrow: string;
  heroTitle: ReactNode;
  heroIntro: string;
  heroImage: string;
  heroImageAlt: string;
  /** 3–5 key business challenges this type faces */
  challenges: SolutionChallenge[];
  /** How Fyncho addresses them — map to real implemented features */
  howFynchoHelps: SolutionFeature[];
  /** Category-specific use case examples */
  useCases: string[];
  /** 3 benefit statements */
  benefits: string[];
  /** Internal links to related solution pages */
  relatedSolutions: RelatedSolution[];
}

export function SolutionPageTemplate({
  eyebrow,
  heroTitle,
  heroIntro,
  heroImage,
  heroImageAlt,
  challenges,
  howFynchoHelps,
  useCases,
  benefits,
  relatedSolutions,
}: SolutionPageProps) {
  return (
    <SiteShell>
      <PageHero
        eyebrow={eyebrow}
        title={heroTitle}
        intro={heroIntro}
        image={heroImage}
        imageAlt={heroImageAlt}
      />

      {/* CHALLENGES */}
      <section className="mx-auto max-w-6xl px-6 pb-20">
        <SectionHeading
          eyebrow="The challenges"
          title="Running this type of business has its own complexity."
        />
        <div className="mt-10 grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {challenges.map((c, i) => (
            <div key={c.title} className="card-lux p-7">
              <span className="numeral">{String(i + 1).padStart(2, "0")}</span>
              <h3 className="mt-4 text-2xl">{c.title}</h3>
              <p className="mt-3 text-sm leading-relaxed text-muted-foreground">{c.description}</p>
            </div>
          ))}
        </div>
      </section>

      {/* HOW FYNCHO HELPS */}
      <section className="border-y border-line bg-surface py-20">
        <div className="mx-auto max-w-6xl px-6">
          <SectionHeading
            eyebrow="How Fyncho helps"
            title="One platform covering every part of the operation."
          />
          <div className="mt-10 divide-y divide-line border-y border-line">
            {howFynchoHelps.map((item, index) => (
              <div key={item.title} className="grid gap-4 py-7 sm:grid-cols-12">
                <span className="font-mono text-xs text-brass sm:col-span-1">
                  {String(index + 1).padStart(2, "0")}
                </span>
                <h3 className="text-2xl sm:col-span-3">{item.title}</h3>
                <p className="leading-relaxed text-muted-foreground sm:col-span-8">
                  {item.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* USE CASES */}
      <section className="mx-auto max-w-6xl px-6 py-20">
        <div className="grid gap-12 lg:grid-cols-2">
          <SectionHeading
            eyebrow="Use cases"
            title="Typical services and scenarios Fyncho handles."
          />
          <ul className="space-y-3">
            {useCases.map((uc) => (
              <li
                key={uc}
                className="flex items-start gap-3 border-b border-line pb-3 text-sm last:border-b-0"
              >
                <span className="mt-0.5 text-brass">✓</span>
                <span>{uc}</span>
              </li>
            ))}
          </ul>
        </div>
      </section>

      {/* BENEFITS */}
      <section className="border-y border-line bg-surface py-20">
        <div className="mx-auto max-w-6xl px-6">
          <SectionHeading eyebrow="Benefits" title="What changes when you run on Fyncho." />
          <div className="mt-10 grid gap-8 sm:grid-cols-3">
            {benefits.map((b, i) => (
              <article key={b} className="border-t border-brass pt-6">
                <span className="font-mono text-xs text-brass">0{i + 1}</span>
                <p className="mt-4 font-display text-2xl leading-snug">{b}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* DASHBOARD PREVIEW */}
      <section className="mx-auto max-w-6xl px-6 py-20">
        <div className="grid gap-12 lg:grid-cols-2">
          <div>
            <p className="eyebrow">Business dashboard</p>
            <h2 className="mt-3 text-4xl leading-tight text-balance sm:text-5xl">
              One view of your whole operation.
            </h2>
            <p className="mt-4 text-pretty text-muted-foreground">
              Appointments, revenue, customers, staff, services and reports — accessible from the
              moment your business goes live on Fyncho.
            </p>
            <Link
              href="/features"
              className="mt-8 inline-block font-mono text-xs uppercase tracking-[0.2em] text-brass-soft hover:text-brass"
            >
              Explore all features →
            </Link>
          </div>
          <img
            src="/assets/admin-website/dashboard-preview.jpg"
            alt="Fyncho business dashboard"
            loading="lazy"
            width={1408}
            height={912}
            className="w-full rounded-2xl border border-line shadow-lift"
          />
        </div>
      </section>

      {/* RELATED SOLUTIONS */}
      {relatedSolutions.length > 0 && (
        <section className="border-y border-line bg-surface py-16">
          <div className="mx-auto max-w-6xl px-6">
            <p className="eyebrow mb-8">Related solutions</p>
            <div className="flex flex-wrap gap-3">
              {relatedSolutions.map((r) => (
                <Link
                  key={r.to}
                  href={r.to}
                  className="rounded-full border border-line bg-background px-5 py-2.5 text-sm text-muted-foreground transition-colors hover:border-brass hover:text-foreground"
                >
                  {r.label}
                </Link>
              ))}
              <Link
                href="/solutions"
                className="rounded-full border border-brass/40 bg-background px-5 py-2.5 text-sm text-brass-soft transition-colors hover:border-brass hover:text-brass"
              >
                All solutions →
              </Link>
            </div>
          </div>
        </section>
      )}

      <ClosingCta
        title="Ready to take your business online?"
        description="Create your account, choose your unique business address, and manage bookings, customers, and daily operations from one connected platform."
        secondary={{ label: "View Pricing", to: "/pricing" }}
      />
    </SiteShell>
  );
}

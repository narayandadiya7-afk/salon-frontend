'use client';

import Link from 'next/link';
import { Check, ArrowRight } from 'lucide-react';
import { PageHero, usePageMeta } from '../../../../components/owner/owner-website/ui';
import { packages } from '../../../../data/salon';
import { useSite } from '../../../../components/owner/owner-website/site-context';

export default function PackagesPage() {
  const { slug } = useSite();
  usePageMeta(
    'Curated Packages — Maison Lumière',
    'Bridal suites, spa days and hair transformations bundled into considered packages with real savings.',
  );

  return (
    <>
      <PageHero
        eyebrow="Packages"
        title="Occasions, considered end to end"
        copy="Multi-service experiences designed around a moment — a wedding, a reset, a transformation — priced below their parts."
      />

      <section className="shell pb-28">
        <div className="grid gap-10 lg:grid-cols-2">
          {packages.map((p) => (
            <article key={p.id} className="surface-card lift overflow-hidden">
              <div className="relative aspect-16/10 overflow-hidden">
                <img src={p.image} alt={p.name} loading="lazy" className="size-full object-cover" />
                <span className="absolute right-5 top-5 rounded-full bg-gold px-4 py-1.5 text-[0.65rem] uppercase tracking-[0.2em] text-primary-foreground">
                  Save ${p.saving}
                </span>
              </div>
              <div className="p-8">
                <p className="eyebrow">{p.duration}</p>
                <h2 className="display mt-3 text-4xl">{p.name}</h2>
                <ul className="mt-6 space-y-3">
                  {p.includes.map((i) => (
                    <li key={i} className="flex items-center gap-3 text-sm text-muted-foreground">
                      <Check className="size-4 shrink-0 text-gold" /> {i}
                    </li>
                  ))}
                </ul>
                <div className="mt-8 flex items-end justify-between gap-4">
                  <p className="display text-4xl">${p.price}</p>
                  <Link
                    href={`/${slug}/book`}
                    className="inline-flex items-center gap-2 rounded-full bg-primary px-6 py-3.5 text-xs uppercase tracking-[0.2em] text-primary-foreground transition-transform hover:-translate-y-0.5"
                  >
                    Book now <ArrowRight className="size-4" />
                  </Link>
                </div>
              </div>
            </article>
          ))}
        </div>
      </section>
    </>
  );
}

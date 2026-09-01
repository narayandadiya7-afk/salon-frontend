'use client';

import Link from 'next/link';
import { ArrowRight } from 'lucide-react';
import { PageHero, SectionHead, usePageMeta } from '../../../../components/owner/owner-website/ui';
import { stylists, stats } from '../../../../data/salon';
import { useSite } from '../../../../components/owner/owner-website/site-context';
import aboutImg from '../../../../assets/about.jpg';
import heroImg from '../../../../assets/hero.jpg';

const values = [
  { t: 'Craft over speed', d: 'One guest per specialist, always. No double-booking, no rushed finishes.' },
  { t: 'Honest counsel', d: 'We recommend the smallest change that gets you the result you want.' },
  { t: 'Considered sourcing', d: 'Cruelty-free, refillable and low-waste across every back bar.' },
  { t: 'Warmth as standard', d: 'Luxury without stiffness. You should feel at ease the moment you arrive.' },
];

const timeline = [
  { y: '2008', t: 'Two chairs on Fillmore', d: 'Founded as a colour-only studio above a florist.' },
  { y: '2013', t: 'The skin room opens', d: 'Clinical facials join the menu under our first lead aesthetician.' },
  { y: '2018', t: 'Ivory hammam', d: 'A dedicated spa wing brings slow ritual bathing to the house.' },
  { y: '2024', t: 'The atelier today', d: 'Fourteen specialists, nine awards, and the same one-chair philosophy.' },
];

export default function AboutPage() {
  const { slug } = useSite();
  usePageMeta(
    'Our Story — Maison Lumière',
    'The story, values and craft behind Maison Lumière — an unhurried luxury salon atelier in San Francisco.',
  );

  return (
    <>
      <PageHero
        eyebrow="About"
        title="Eighteen years of unhurried craft"
        copy="Maison Lumière exists for people who would rather be looked after properly than processed quickly."
        image={heroImg.src}
      />

      <section className="shell pb-24">
        <div className="grid items-center gap-14 lg:grid-cols-2">
          <img
            src={aboutImg.src}
            alt="Brass tools on marble"
            loading="lazy"
            className="aspect-4/5 w-full rounded-3xl object-cover"
          />
          <div>
            <SectionHead eyebrow="Mission" title="Beauty work that respects your time and your hair" />
            <p className="mt-6 text-base leading-relaxed text-muted-foreground">
              Our mission is simple: deliver technically excellent work in an environment that feels calm. Our vision
              is a salon where the consultation matters as much as the service, and where guests leave knowing
              exactly how to maintain the result at home.
            </p>
            <div className="mt-10 grid gap-8 sm:grid-cols-2">
              {values.map((v) => (
                <div key={v.t}>
                  <div className="gold-rule w-10" />
                  <p className="mt-4 text-sm font-medium">{v.t}</p>
                  <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{v.d}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section className="section bg-secondary/40">
        <div className="shell">
          <SectionHead eyebrow="History" title="How the house grew" />
          <div className="mt-14 grid gap-10 md:grid-cols-4">
            {timeline.map((t) => (
              <div key={t.y} className="border-t border-border pt-6">
                <p className="display text-4xl gold-text">{t.y}</p>
                <p className="mt-3 text-sm font-medium">{t.t}</p>
                <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{t.d}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="section">
        <div className="shell">
          <SectionHead eyebrow="The people" title="Meet the atelier" align="center" />
          <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {stylists.map((s) => (
              <div key={s.id}>
                <img src={s.image} alt={s.name} loading="lazy" className="aspect-4/5 w-full rounded-2xl object-cover" />
                <p className="display mt-4 text-2xl">{s.name}</p>
                <p className="text-xs uppercase tracking-[0.18em] text-muted-foreground">{s.role}</p>
              </div>
            ))}
          </div>
          <div className="mt-16 grid gap-10 border-y border-border py-14 sm:grid-cols-2 lg:grid-cols-4">
            {stats.map((s) => (
              <div key={s.label}>
                <p className="display text-5xl">{s.value}</p>
                <p className="mt-2 text-xs uppercase tracking-[0.2em] text-muted-foreground">{s.label}</p>
              </div>
            ))}
          </div>
          <div className="mt-14 text-center">
            <Link
              href={`/${slug}/book`}
              className="inline-flex items-center gap-2 rounded-full bg-primary px-8 py-4 text-xs uppercase tracking-[0.2em] text-primary-foreground"
            >
              Book an appointment <ArrowRight className="size-4" />
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}

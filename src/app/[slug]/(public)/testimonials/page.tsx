'use client';

import Link from 'next/link';
import { Star, Play, ArrowRight } from 'lucide-react';
import { PageHero, SectionHead, usePageMeta } from '../../../../components/site/ui';
import { testimonials, galleryItems, stats } from '../../../../data/salon';
import { useSite } from '../../../../components/site/site-context';

export default function TestimonialsPage() {
  const { slug } = useSite();
  usePageMeta(
    'Client Reviews — Maison Lumière',
    'Read written and video reviews from Maison Lumière guests, with a 4.9 average across 2,400+ ratings.',
  );

  return (
    <>
      <PageHero
        eyebrow="Reviews"
        title="Twelve thousand regulars, and counting"
        copy="Every review below is left by a verified guest after a completed appointment."
      />

      <section className="shell pb-16">
        <div className="surface-card flex flex-wrap items-center justify-between gap-8 p-10">
          <div>
            <p className="display text-6xl gold-text">4.9</p>
            <div className="mt-2 flex gap-1 text-gold">
              {Array.from({ length: 5 }).map((_, i) => (
                <Star key={i} className="size-4 fill-gold" />
              ))}
            </div>
            <p className="mt-2 text-xs uppercase tracking-[0.2em] text-muted-foreground">2,412 verified reviews</p>
          </div>
          {stats.slice(1).map((s) => (
            <div key={s.label}>
              <p className="display text-4xl">{s.value}</p>
              <p className="mt-1 text-xs uppercase tracking-[0.2em] text-muted-foreground">{s.label}</p>
            </div>
          ))}
          <div className="grid h-24 w-40 place-items-center rounded-2xl border border-dashed border-border text-[0.65rem] uppercase tracking-[0.2em] text-muted-foreground">
            Google reviews
          </div>
        </div>
      </section>

      <section className="shell pb-20">
        <div className="columns-1 gap-6 md:columns-2 lg:columns-3 [&>*]:mb-6">
          {[...testimonials, ...testimonials].map((t, i) => (
            <blockquote key={i} className="surface-card break-inside-avoid p-8">
              <div className="flex gap-1 text-gold">
                {Array.from({ length: t.rating }).map((_, j) => (
                  <Star key={j} className="size-3.5 fill-gold" />
                ))}
              </div>
              <p className="display mt-5 text-2xl leading-snug">“{t.quote}”</p>
              <footer className="mt-6 text-xs uppercase tracking-[0.18em] text-muted-foreground">
                {t.name} · {t.role}
              </footer>
            </blockquote>
          ))}
        </div>
      </section>

      <section className="section bg-secondary/40">
        <div className="shell">
          <SectionHead eyebrow="Video reviews" title="Hear it from our guests" align="center" />
          <div className="mt-12 grid gap-6 md:grid-cols-3">
            {galleryItems.slice(0, 3).map((g, i) => (
              <div key={i} className="group relative overflow-hidden rounded-3xl">
                <img src={g.image} alt="" loading="lazy" className="aspect-4/5 w-full object-cover" />
                <span className="absolute inset-0 grid place-items-center bg-[oklch(0.24_0.012_60/0.3)]">
                  <span className="grid size-14 place-items-center rounded-full bg-[oklch(0.98_0.006_85/0.9)] text-[oklch(0.24_0.012_60)] transition-transform group-hover:scale-110">
                    <Play className="size-5" />
                  </span>
                </span>
              </div>
            ))}
          </div>
          <div className="mt-14 text-center">
            <Link
              href={`/${slug}/book`}
              className="inline-flex items-center gap-2 rounded-full bg-primary px-8 py-4 text-xs uppercase tracking-[0.2em] text-primary-foreground"
            >
              Book your visit <ArrowRight className="size-4" />
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}

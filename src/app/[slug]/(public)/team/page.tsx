'use client';

import Link from 'next/link';
import { Star, ArrowRight } from 'lucide-react';
import { Instagram } from '../../../../components/site/brand-icons';
import { PageHero, usePageMeta } from '../../../../components/site/ui';
import { stylists } from '../../../../data/salon';
import { useSite } from '../../../../components/site/site-context';

const slots = ['09:30', '11:00', '13:15', '15:45', '17:30'];
const days = ['Mon 3', 'Tue 4', 'Wed 5', 'Thu 6', 'Fri 7'];

export default function TeamPage() {
  const { slug } = useSite();
  usePageMeta(
    'Our Team of Specialists — Maison Lumière',
    'Meet the colourists, barbers, aestheticians and nail artists behind Maison Lumière and book directly with them.',
  );

  return (
    <>
      <PageHero
        eyebrow="The atelier"
        title="The hands behind the work"
        copy="Each specialist trains for years in a single discipline. Read their story, then book the chair you trust."
      />

      <section className="shell space-y-20 pb-28">
        {stylists.map((s, idx) => (
          <article key={s.id} className={`grid gap-10 lg:grid-cols-2 ${idx % 2 ? 'lg:[&>figure]:order-2' : ''}`}>
            <figure className="overflow-hidden rounded-3xl">
              <img
                src={s.image}
                alt={s.name}
                loading="lazy"
                width={800}
                height={1000}
                className="aspect-4/5 w-full object-cover"
              />
            </figure>
            <div className="flex flex-col justify-center">
              <div className="flex flex-wrap items-center gap-4">
                <h2 className="display text-4xl md:text-5xl">{s.name}</h2>
                <span className="flex items-center gap-1 text-sm text-gold">
                  <Star className="size-4 fill-gold" /> {s.rating.toFixed(1)}
                </span>
              </div>
              <p className="mt-2 text-xs uppercase tracking-[0.22em] text-muted-foreground">{s.role}</p>
              <p className="mt-6 text-base leading-relaxed text-muted-foreground">{s.bio}</p>

              <dl className="mt-8 grid gap-6 sm:grid-cols-2">
                <div>
                  <dt className="eyebrow">Experience</dt>
                  <dd className="mt-2 text-sm">{s.experience}</dd>
                </div>
                <div>
                  <dt className="eyebrow">Languages</dt>
                  <dd className="mt-2 text-sm">{s.languages.join(', ')}</dd>
                </div>
                <div className="sm:col-span-2">
                  <dt className="eyebrow">Specialities</dt>
                  <dd className="mt-3 flex flex-wrap gap-2">
                    {s.specialties.map((sp) => (
                      <span key={sp} className="rounded-full border border-border px-3.5 py-1.5 text-xs">
                        {sp}
                      </span>
                    ))}
                  </dd>
                </div>
              </dl>

              <div className="surface-card mt-8 p-6">
                <p className="eyebrow">Next availability</p>
                <div className="mt-4 grid grid-cols-5 gap-2 text-center text-xs">
                  {days.map((d) => (
                    <span key={d} className="text-muted-foreground">
                      {d}
                    </span>
                  ))}
                  {days.map((d) =>
                    slots.slice(0, 3).map((t, i) => (
                      <span
                        key={d + t}
                        className={`rounded-lg border px-1 py-2 ${
                          (d.length + i) % 3 === 0
                            ? 'border-border/50 text-muted-foreground/40 line-through'
                            : 'border-gold/40 text-gold'
                        }`}
                      >
                        {t}
                      </span>
                    )),
                  )}
                </div>
              </div>

              <div className="mt-8 flex flex-wrap items-center gap-4">
                <Link
                  href={`/${slug}/book?stylist=${s.id}`}
                  className="inline-flex items-center gap-2 rounded-full bg-primary px-6 py-3.5 text-xs uppercase tracking-[0.2em] text-primary-foreground transition-transform hover:-translate-y-0.5"
                >
                  Book with {s.name.split(' ')[0]} <ArrowRight className="size-4" />
                </Link>
                <a href="#" className="inline-flex items-center gap-2 text-xs uppercase tracking-[0.2em] text-gold">
                  <Instagram className="size-4" /> Instagram
                </a>
              </div>
            </div>
          </article>
        ))}
      </section>
    </>
  );
}

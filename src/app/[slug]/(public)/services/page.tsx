'use client';

import Link from 'next/link';
import { useMemo, useState } from 'react';
import { PageHero, ServiceCard, usePageMeta } from '../../../../components/owner/owner-website/ui';
import { services, categories, stylists } from '../../../../data/salon';
import { Slider } from '../../../../components/owner/owner-website/slider';
import { ArrowRight } from 'lucide-react';
import { useSite } from '../../../../components/owner/owner-website/site-context';

export default function ServicesPage() {
  const { slug } = useSite();
  usePageMeta(
    'Services & Pricing — Maison Lumière',
    'Explore hair, skin, nails, spa, bridal and grooming services with transparent pricing, duration and instant online booking.',
  );

  const [cat, setCat] = useState<string>('All');
  const [maxPrice, setMaxPrice] = useState(400);
  const [maxDuration, setMaxDuration] = useState(200);
  const [staff, setStaff] = useState('Any');

  const filtered = useMemo(
    () =>
      services.filter(
        (s) =>
          (cat === 'All' || s.category === cat) &&
          s.price <= maxPrice &&
          s.duration <= maxDuration &&
          (staff === 'Any' ||
            stylists.find((st) => st.id === staff)?.specialties.some(() => true) === true),
      ),
    [cat, maxPrice, maxDuration, staff],
  );

  return (
    <>
      <PageHero
        eyebrow="Services"
        title="Every service, transparently priced"
        copy="No hidden add-ons. Each treatment lists its duration, price and the specialists who perform it."
      />

      <section className="shell pb-24">
        <div className="grid gap-10 lg:grid-cols-[260px_minmax(0,1fr)]">
          <aside className="surface-card h-fit p-7 lg:sticky lg:top-28">
            <p className="eyebrow">Filters</p>

            <p className="mt-6 text-xs uppercase tracking-[0.18em] text-muted-foreground">Category</p>
            <div className="mt-3 flex flex-wrap gap-2">
              {categories.map((c) => (
                <button
                  key={c}
                  onClick={() => setCat(c)}
                  className={`rounded-full border px-3.5 py-1.5 text-xs transition-colors ${
                    cat === c ? 'border-gold bg-gold text-primary-foreground' : 'border-border hover:border-gold'
                  }`}
                >
                  {c}
                </button>
              ))}
            </div>

            <p className="mt-8 flex justify-between text-xs uppercase tracking-[0.18em] text-muted-foreground">
              <span>Max price</span> <span className="text-foreground">${maxPrice}</span>
            </p>
            <Slider
              className="mt-4"
              value={[maxPrice]}
              min={80}
              max={400}
              step={10}
              onValueChange={(v) => setMaxPrice(v[0])}
            />

            <p className="mt-8 flex justify-between text-xs uppercase tracking-[0.18em] text-muted-foreground">
              <span>Max duration</span> <span className="text-foreground">{maxDuration} min</span>
            </p>
            <Slider
              className="mt-4"
              value={[maxDuration]}
              min={45}
              max={200}
              step={15}
              onValueChange={(v) => setMaxDuration(v[0])}
            />

            <p className="mt-8 text-xs uppercase tracking-[0.18em] text-muted-foreground">Specialist</p>
            <div className="mt-3 space-y-2">
              {['Any', ...stylists.map((s) => s.id)].map((id) => {
                const label = id === 'Any' ? 'Any specialist' : stylists.find((s) => s.id === id)!.name;
                return (
                  <button
                    key={id}
                    onClick={() => setStaff(id)}
                    className={`block w-full rounded-full border px-4 py-2 text-left text-xs transition-colors ${
                      staff === id ? 'border-gold text-gold' : 'border-border hover:border-gold'
                    }`}
                  >
                    {label}
                  </button>
                );
              })}
            </div>
          </aside>

          <div>
            <p className="text-sm text-muted-foreground">{filtered.length} services</p>
            {filtered.length === 0 ? (
              <div className="surface-card mt-6 p-16 text-center">
                <p className="display text-3xl">Nothing matches those filters</p>
                <p className="mt-3 text-sm text-muted-foreground">Try widening the price or duration range.</p>
              </div>
            ) : (
              <div className="mt-6 grid gap-8 sm:grid-cols-2">
                {filtered.map((s) => (
                  <ServiceCard key={s.id} service={s} />
                ))}
              </div>
            )}

            <div className="surface-card mt-12 flex flex-wrap items-center justify-between gap-6 p-8">
              <div>
                <p className="display text-2xl">Not sure what to book?</p>
                <p className="mt-2 text-sm text-muted-foreground">
                  A complimentary 15-minute consultation will point you in the right direction.
                </p>
              </div>
              <Link
                href={`/${slug}/contact`}
                className="inline-flex items-center gap-2 rounded-full border border-border px-6 py-3 text-xs uppercase tracking-[0.2em] hover:border-gold hover:text-gold"
              >
                Ask the concierge <ArrowRight className="size-4" />
              </Link>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}

'use client';

import Link from 'next/link';
import { useParams, notFound } from 'next/navigation';
import { Clock, Star, ArrowRight, Check } from 'lucide-react';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '../../../../../components/owner/owner-website/accordion';
import { services, stylists, faqs, testimonials } from '../../../../../data/salon';
import { ServiceCard, SectionHead, usePageMeta } from '../../../../../components/owner/owner-website/ui';
import { useSite } from '../../../../../components/owner/owner-website/site-context';

export default function ServiceDetail() {
  const { slug } = useSite();
  const { id } = useParams<{ id: string }>();
  const service = services.find((s) => s.id === id);

  usePageMeta(
    service ? `${service.name} — Maison Lumière` : 'Service not found — Maison Lumière',
    service ? `${service.description} ${service.duration} minutes, from $${service.price}. Book online.` : undefined,
  );

  if (!service) notFound();

  const related = services.filter((s) => s.category === service.category && s.id !== service.id).slice(0, 3);

  return (
    <>
      <section className="relative h-[62vh] min-h-100 overflow-hidden">
        <img src={service.image} alt={service.name} className="absolute inset-0 size-full object-cover" />
        <div className="absolute inset-0 bg-[linear-gradient(100deg,rgba(28,24,20,0.75),rgba(28,24,20,0.2))]" />
        <div className="shell relative flex h-full flex-col justify-end pb-14 text-[oklch(0.98_0.006_85)]">
          <p className="text-[0.7rem] uppercase tracking-[0.34em] opacity-80">{service.category}</p>
          <h1 className="display mt-4 max-w-3xl text-5xl md:text-7xl">{service.name}</h1>
          <div className="mt-6 flex flex-wrap gap-6 text-sm opacity-90">
            <span className="flex items-center gap-2">
              <Clock className="size-4" /> {service.duration} minutes
            </span>
            <span className="flex items-center gap-2">
              <Star className="size-4 fill-current" /> {service.rating.toFixed(1)} rating
            </span>
            <span>From ${service.price}</span>
          </div>
        </div>
      </section>

      <section className="section">
        <div className="shell grid gap-14 lg:grid-cols-[minmax(0,1fr)_360px]">
          <div>
            <p className="display text-3xl leading-snug">{service.description}</p>
            <p className="mt-6 text-base leading-relaxed text-muted-foreground">
              Your appointment begins with a consultation in our library room, where we discuss maintenance,
              lifestyle and the result you actually want to live with. The treatment itself is unhurried, and we
              finish with a written home-care plan so the result lasts well beyond the chair.
            </p>

            <h2 className="display mt-14 text-3xl">What's included</h2>
            <ul className="mt-6 grid gap-3 sm:grid-cols-2">
              {[
                'Personal consultation',
                'Scalp or skin analysis',
                'Premium product ritual',
                'Finishing style or dressing',
                'Home-care plan',
                'Refreshments',
              ].map((i) => (
                <li key={i} className="flex items-center gap-3 text-sm text-muted-foreground">
                  <Check className="size-4 text-gold" /> {i}
                </li>
              ))}
            </ul>

            <h2 className="display mt-14 text-3xl">Specialists offering this</h2>
            <div className="mt-6 grid gap-5 sm:grid-cols-2">
              {stylists.slice(0, 2).map((s) => (
                <div key={s.id} className="surface-card flex items-center gap-4 p-5">
                  <img src={s.image} alt={s.name} loading="lazy" className="size-16 rounded-full object-cover" />
                  <div className="min-w-0">
                    <p className="display truncate text-xl">{s.name}</p>
                    <p className="text-xs uppercase tracking-[0.16em] text-muted-foreground">{s.experience}</p>
                  </div>
                </div>
              ))}
            </div>

            <h2 className="display mt-14 text-3xl">Guest reviews</h2>
            <div className="mt-6 grid gap-5 sm:grid-cols-2">
              {testimonials.slice(0, 2).map((t) => (
                <blockquote key={t.name} className="surface-card p-6">
                  <div className="flex gap-1 text-gold">
                    {Array.from({ length: t.rating }).map((_, i) => (
                      <Star key={i} className="size-3.5 fill-gold" />
                    ))}
                  </div>
                  <p className="mt-4 text-sm leading-relaxed text-muted-foreground">“{t.quote}”</p>
                  <footer className="mt-4 text-xs uppercase tracking-[0.16em]">{t.name}</footer>
                </blockquote>
              ))}
            </div>

            <h2 className="display mt-14 text-3xl">FAQ</h2>
            <Accordion type="single" collapsible className="mt-4">
              {faqs.slice(0, 4).map((f) => (
                <AccordionItem key={f.q} value={f.q}>
                  <AccordionTrigger className="text-left text-base">{f.q}</AccordionTrigger>
                  <AccordionContent className="text-sm text-muted-foreground">{f.a}</AccordionContent>
                </AccordionItem>
              ))}
            </Accordion>
          </div>

          <aside className="surface-card h-fit p-8 lg:sticky lg:top-28">
            <p className="eyebrow">Book this service</p>
            <p className="display mt-4 text-5xl">${service.price}</p>
            <p className="mt-2 text-sm text-muted-foreground">{service.duration} minutes · from</p>
            <Link
              href={`/${slug}/book?service=${service.id}`}
              className="mt-8 flex items-center justify-center gap-2 rounded-full bg-primary px-6 py-4 text-xs uppercase tracking-[0.2em] text-primary-foreground transition-transform hover:-translate-y-0.5"
            >
              Book appointment <ArrowRight className="size-4" />
            </Link>
            <Link
              href={`/${slug}/memberships`}
              className="mt-3 flex items-center justify-center rounded-full border border-border px-6 py-4 text-xs uppercase tracking-[0.2em] hover:border-gold hover:text-gold"
            >
              Save with membership
            </Link>
          </aside>
        </div>
      </section>

      {related.length > 0 && (
        <section className="section bg-secondary/40">
          <div className="shell">
            <SectionHead eyebrow="You may also like" title="Related services" />
            <div className="mt-12 grid gap-8 md:grid-cols-2 lg:grid-cols-3">
              {related.map((s) => (
                <ServiceCard key={s.id} service={s} />
              ))}
            </div>
          </div>
        </section>
      )}
    </>
  );
}

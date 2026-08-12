'use client';

import Link from 'next/link';
import { Clock, Star } from 'lucide-react';
import { useEffect, type ReactNode } from 'react';
import type { Service } from '@/data/salon';
import { cn } from '@/lib/utils';
import { useSite } from './site-context';

export function usePageMeta(title?: string, description?: string) {
  useEffect(() => {
    if (title) document.title = title;
    if (description) {
      const el = document.querySelector('meta[name="description"]');
      if (el) el.setAttribute('content', description);
      else if (document.head) {
        const meta = document.createElement('meta');
        meta.name = 'description';
        meta.content = description;
        document.head.appendChild(meta);
      }
    }
  }, [title, description]);
}

export function SectionHead({
  eyebrow,
  title,
  copy,
  align = 'left',
}: {
  eyebrow: string;
  title: ReactNode;
  copy?: string;
  align?: 'left' | 'center';
}) {
  return (
    <div className={cn('max-w-2xl', align === 'center' && 'mx-auto text-center')}>
      <p className="eyebrow">{eyebrow}</p>
      <h2 className="display mt-4 text-4xl leading-[1.08] md:text-5xl">{title}</h2>
      {copy && <p className="mt-5 text-base leading-relaxed text-muted-foreground">{copy}</p>}
    </div>
  );
}

export function PageHero({
  eyebrow,
  title,
  copy,
  image,
}: {
  eyebrow: string;
  title: string;
  copy: string;
  image?: string;
}) {
  return (
    <section className="relative overflow-hidden pt-36 pb-16 md:pt-48 md:pb-24">
      {image && (
        <img
          src={image}
          alt=""
          aria-hidden
          className="absolute inset-0 size-full object-cover opacity-[0.14]"
          loading="lazy"
        />
      )}
      <div className="shell relative reveal">
        <p className="eyebrow">{eyebrow}</p>
        <h1 className="display mt-5 max-w-3xl text-5xl leading-[1.03] md:text-7xl">{title}</h1>
        <p className="mt-6 max-w-xl text-base leading-relaxed text-muted-foreground">{copy}</p>
      </div>
    </section>
  );
}

export function ServiceCard({ service }: { service: Service }) {
  const { slug } = useSite();
  return (
    <article className="surface-card lift group overflow-hidden">
      <div className="relative aspect-4/3 overflow-hidden">
        <img
          src={service.image}
          alt={service.name}
          loading="lazy"
          className="size-full object-cover transition-transform duration-700 group-hover:scale-105"
        />
      </div>
      <div className="p-6">
        <div className="flex flex-wrap items-center gap-2">
          <span className="rounded-full border border-border px-3 py-1 text-[0.65rem] uppercase tracking-[0.2em] text-muted-foreground">
            {service.category}
          </span>
          {service.popular && (
            <span className="rounded-full bg-gold px-3 py-1 text-[0.65rem] uppercase tracking-[0.2em] text-primary-foreground">
              Popular
            </span>
          )}
        </div>
        <h3 className="display mt-3 text-2xl leading-tight">{service.name}</h3>
        <p className="mt-3 text-sm leading-relaxed text-muted-foreground">{service.description}</p>
        <div className="mt-3 flex items-center gap-4 text-xs text-muted-foreground">
          <span className="flex items-center gap-1.5">
            <Clock className="size-3.5" />
            {service.duration} min
          </span>
          <span className="flex items-center gap-1.5">
            <Star className="size-3.5 fill-gold text-gold" />
            {service.rating.toFixed(1)}
          </span>
        </div>
        <div className="mt-5 border-t border-border pt-3">
          <p className="flex gap-[10px]">
            <span className="display block text-3xl">${service.price}</span>
            <span className="mt-1.5 flex items-center gap-2.5 text-xs">
              <span className="text-muted-foreground line-through">${service.price + service.saving}</span>
              <span className="rounded-full bg-gold/15 px-2.5 py-0.5 text-[0.6rem] uppercase tracking-[0.18em] text-gold">
                Save ${service.saving}
              </span>
            </span>
          </p>
          <div className="mt-5 flex items-center gap-3">
            <Link
              href={`/${slug}/book?service=${service.id}`}
              className="flex-1 rounded-full bg-primary px-4 py-2.5 text-center text-xs tracking-widest uppercase text-primary-foreground transition-transform duration-300 hover:-translate-y-0.5"
            >
              Book now
            </Link>
            <Link
              href={`/${slug}/services/${service.id}`}
              className="rounded-full border border-border px-4 py-2.5 text-xs uppercase tracking-widest transition-colors hover:border-gold hover:text-gold"
            >
              Details
            </Link>
          </div>
        </div>
      </div>
    </article>
  );
}

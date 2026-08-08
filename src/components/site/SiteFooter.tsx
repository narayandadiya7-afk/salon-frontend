'use client';

import Link from 'next/link';
import { ArrowRight, Mail, MapPin, Phone, Clock, MessageCircle } from 'lucide-react';
import { Instagram, Facebook, Youtube } from './brand-icons';
import { salon } from '@/data/salon';
import { useSite } from './site-context';

export function SiteFooter() {
  const { slug } = useSite();

  return (
    <footer className="border-t border-border bg-secondary/50">
      <div className="shell grid gap-12 py-16 sm:grid-cols-2 lg:grid-cols-[1.4fr_1fr_1fr_1.2fr] lg:py-20">
        <div className="min-[375px]:col-span-2 lg:col-span-1">
          <div className="flex items-center gap-3">
            <span className="grid size-10 shrink-0 place-items-center rounded-full border border-gold/40 text-gold">
              <span className="display text-xl leading-none">M</span>
            </span>
            <div>
              <p className="display text-2xl leading-tight">{salon.name}</p>
              <p className="text-[0.6rem] uppercase tracking-[0.3em] text-muted-foreground">Hair · Skin · Spa</p>
            </div>
          </div>
          <p className="mt-5 max-w-xs text-sm leading-relaxed text-muted-foreground">{salon.tagline}. An atelier of specialists, one guest at a time.</p>

          <ul className="mt-6 space-y-3 text-sm text-muted-foreground">
            <li className="flex items-start gap-3">
              <MapPin className="mt-0.5 size-4 shrink-0 text-gold" />
              {salon.address}
            </li>
            <li className="flex items-center gap-3">
              <Phone className="size-4 shrink-0 text-gold" />
              <a href={`tel:${salon.phone.replace(/[^+\d]/g, '')}`} className="transition-colors hover:text-foreground">
                {salon.phone}
              </a>
            </li>
            <li className="flex items-center gap-3">
              <Mail className="size-4 shrink-0 text-gold" />
              <a href={`mailto:${salon.email}`} className="transition-colors hover:text-foreground">
                {salon.email}
              </a>
            </li>
          </ul>

          <div className="mt-7 flex gap-3">
            {[
              { icon: Instagram, label: 'Instagram' },
              { icon: Facebook, label: 'Facebook' },
              { icon: Youtube, label: 'YouTube' },
              { icon: MessageCircle, label: 'WhatsApp' },
            ].map(({ icon: Icon, label }) => (
              <a
                key={label}
                href="#"
                aria-label={label}
                className="grid size-10 place-items-center rounded-full border border-border transition-all duration-300 hover:-translate-y-0.5 hover:border-gold hover:text-gold"
              >
                <Icon className="size-4" />
              </a>
            ))}
          </div>
        </div>

        <FooterCol
          title="Explore"
          items={[
            { label: 'Services', to: '/services' },
            { label: 'Packages', to: '/packages' },
            { label: 'Memberships', to: '/memberships' },
            { label: 'Gallery', to: '/gallery' },
            { label: 'Our Team', to: '/team' },
            { label: 'Journal', to: '/blog' },
          ]}
        />
        <FooterCol
          title="Company"
          items={[
            { label: 'About us', to: '/about' },
            { label: 'Contact', to: '/contact' },
            { label: 'Reviews', to: '/testimonials' },
            { label: 'Book appointment', to: '/book' },
          ]}
        />

        <div className="min-[375px]:col-span-2 lg:col-span-1">
          <p className="eyebrow">Opening hours</p>
          <ul className="mt-5 space-y-2.5 text-sm text-muted-foreground">
            {salon.hours.map((h) => (
              <li key={h.day} className="flex items-center justify-between gap-4 border-b border-border/60 pb-2.5">
                <span>{h.day}</span>
                <span className="text-foreground">{h.time}</span>
              </li>
            ))}
          </ul>

          <p className="eyebrow mt-8">Newsletter</p>
          <form
            className="mt-3"
            onSubmit={(e) => {
              e.preventDefault();
              (e.currentTarget as HTMLFormElement).reset();
            }}
          >
            <div className="flex items-center gap-2 border-b border-border pb-2 transition-colors focus-within:border-gold">
              <input
                id="newsletter"
                type="email"
                required
                maxLength={255}
                placeholder="your@email.com"
                className="w-full bg-transparent text-sm outline-none placeholder:text-muted-foreground"
              />
              <button type="submit" aria-label="Subscribe" className="grid size-8 shrink-0 place-items-center rounded-full bg-gold text-primary-foreground transition-transform duration-300 hover:-translate-y-0.5">
                <ArrowRight className="size-4" />
              </button>
            </div>
            <p className="mt-2 flex items-center gap-2 text-xs text-muted-foreground">
              <Clock className="size-3.5" /> One thoughtful email a month. No spam, ever.
            </p>
          </form>
        </div>
      </div>

      <div className="border-t border-border">
        <div className="shell flex flex-col gap-4 py-7 text-xs text-muted-foreground sm:flex-row sm:items-center sm:justify-between">
          <p>
            © {new Date().getFullYear()} {salon.name}. All rights reserved.
          </p>
          <p className="flex flex-wrap gap-x-6 gap-y-2">
            {['Privacy Policy', 'Terms of Service', 'Refund Policy', 'Cancellation', 'Cookies'].map((l) => (
              <a key={l} href="#" className="transition-colors hover:text-gold">
                {l}
              </a>
            ))}
          </p>
        </div>
      </div>
    </footer>
  );
}

function FooterCol({ title, items }: { title: string; items: { label: string; to: string }[] }) {
  const { slug } = useSite();
  return (
    <div>
      <p className="eyebrow">{title}</p>
      <ul className="mt-5 space-y-3 text-sm text-muted-foreground">
        {items.map((i) => (
          <li key={i.label}>
            <Link
              href={`/${slug}${i.to}`}
              className="group inline-flex items-center gap-1.5 transition-colors hover:text-foreground"
            >
              {i.label}
              <ArrowRight className="size-3 opacity-0 transition-all duration-300 group-hover:translate-x-0.5 group-hover:opacity-100" />
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}

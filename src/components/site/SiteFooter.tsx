'use client';

import Link from 'next/link';
import { MessageCircle, ArrowRight } from 'lucide-react';
import { Instagram, Facebook, Youtube } from './brand-icons';
import { salon } from '@/data/salon';
import { useSite } from './site-context';

export function SiteFooter() {
  const { slug } = useSite();

  return (
    <footer className="border-t border-border bg-secondary/50">
      <div className="shell grid gap-14 py-20 lg:grid-cols-[1.3fr_1fr_1fr_1fr]">
        <div className="max-w-sm">
          <p className="display text-3xl">{salon.name}</p>
          <p className="mt-3 text-sm leading-relaxed text-muted-foreground">{salon.tagline}</p>

          <form
            className="mt-8"
            onSubmit={(e) => {
              e.preventDefault();
              (e.currentTarget as HTMLFormElement).reset();
            }}
          >
            <label className="eyebrow" htmlFor="newsletter">
              Newsletter
            </label>
            <div className="mt-3 flex items-center gap-2 border-b border-border pb-2">
              <input
                id="newsletter"
                type="email"
                required
                maxLength={255}
                placeholder="your@email.com"
                className="w-full bg-transparent text-sm outline-none placeholder:text-muted-foreground"
              />
              <button type="submit" aria-label="Subscribe" className="text-gold">
                <ArrowRight className="size-4" />
              </button>
            </div>
          </form>

          <div className="mt-8 flex gap-3">
            {[Instagram, Facebook, Youtube, MessageCircle].map((Icon, i) => (
              <a
                key={i}
                href="#"
                aria-label="Social link"
                className="grid size-10 place-items-center rounded-full border border-border transition-colors hover:border-gold hover:text-gold"
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
          title="Visit"
          items={[
            { label: 'About', to: '/about' },
            { label: 'Contact', to: '/contact' },
            { label: 'Reviews', to: '/testimonials' },
            { label: 'Book Appointment', to: '/book' },
          ]}
        />

        <div>
          <p className="eyebrow">Hours</p>
          <ul className="mt-5 space-y-2 text-sm text-muted-foreground">
            {salon.hours.map((h) => (
              <li key={h.day} className="flex justify-between gap-4">
                <span>{h.day}</span>
                <span className="text-foreground">{h.time}</span>
              </li>
            ))}
          </ul>
          <p className="mt-6 text-sm text-muted-foreground">{salon.address}</p>
          <p className="text-sm text-muted-foreground">{salon.phone}</p>
        </div>
      </div>

      <div className="border-t border-border">
        <div className="shell flex flex-col gap-3 py-6 text-xs text-muted-foreground sm:flex-row sm:items-center sm:justify-between">
          <p>
            © {new Date().getFullYear()} {salon.name}. All rights reserved.
          </p>
          <p className="flex flex-wrap gap-x-5 gap-y-2">
            {['Privacy Policy', 'Terms', 'Refund Policy', 'Cancellation', 'Cookies'].map((l) => (
              <a key={l} href="#" className="transition-colors hover:text-foreground">
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
            <Link href={`/${slug}${i.to}`} className="transition-colors hover:text-foreground">
              {i.label}
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}

'use client';

import Link from 'next/link';
import { useState, type FormEvent } from 'react';
import { MapPin, Phone, Mail, MessageCircle, ArrowRight, Check } from 'lucide-react';
import { Instagram, Facebook } from '../../../../components/owner/owner-website/brand-icons';
import { z } from 'zod';
import { PageHero, usePageMeta } from '../../../../components/owner/owner-website/ui';
import { salon } from '../../../../data/salon';
import { useSite } from '../../../../components/owner/owner-website/site-context';

const schema = z.object({
  name: z.string().trim().min(1, 'Please enter your name').max(100),
  email: z.string().trim().email('Enter a valid email').max(255),
  phone: z.string().trim().max(30).optional(),
  message: z.string().trim().min(1, 'Please add a message').max(1000),
});

export default function ContactPage() {
  const { slug } = useSite();
  usePageMeta(
    'Contact & Visit — Maison Lumière',
    'Find Maison Lumière on Fillmore Street, San Francisco. Opening hours, phone, WhatsApp and enquiry form.',
  );

  const [errors, setErrors] = useState<Record<string, string>>({});
  const [sent, setSent] = useState(false);

  function onSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const form = new FormData(e.currentTarget);
    const parsed = schema.safeParse(Object.fromEntries(form));
    if (!parsed.success) {
      const next: Record<string, string> = {};
      for (const issue of parsed.error.issues) next[String(issue.path[0])] = issue.message;
      setErrors(next);
      return;
    }
    setErrors({});
    setSent(true);
    e.currentTarget.reset();
  }

  return (
    <>
      <PageHero
        eyebrow="Contact"
        title="Come and see us"
        copy="Our concierge answers every message personally, usually within the hour during opening times."
      />

      <section className="shell pb-28">
        <div className="grid gap-12 lg:grid-cols-[minmax(0,1fr)_400px]">
          <div>
            <div className="surface-card overflow-hidden">
              <div className="grid aspect-16/9 place-items-center bg-muted text-xs uppercase tracking-[0.2em] text-muted-foreground">
                <span className="flex items-center gap-2">
                  <MapPin className="size-4 text-gold" /> Map preview — {salon.address}
                </span>
              </div>
            </div>

            <div className="mt-10 grid gap-5 sm:grid-cols-2">
              {[
                { icon: MapPin, label: 'Studio', value: salon.address },
                { icon: Phone, label: 'Telephone', value: salon.phone },
                { icon: Mail, label: 'Email', value: salon.email },
                { icon: MessageCircle, label: 'WhatsApp', value: salon.whatsapp },
              ].map((c) => (
                <div key={c.label} className="surface-card p-6">
                  <c.icon className="size-5 text-gold" />
                  <p className="mt-4 text-xs uppercase tracking-[0.2em] text-muted-foreground">{c.label}</p>
                  <p className="mt-1 text-sm">{c.value}</p>
                </div>
              ))}
            </div>

            <div className="surface-card mt-5 p-6">
              <p className="eyebrow">Opening hours</p>
              <ul className="mt-4 space-y-2 text-sm">
                {salon.hours.map((h) => (
                  <li key={h.day} className="flex justify-between text-muted-foreground">
                    <span>{h.day}</span>
                    <span className="text-foreground">{h.time}</span>
                  </li>
                ))}
              </ul>
              <div className="mt-6 flex gap-3">
                {[Instagram, Facebook, MessageCircle].map((Icon, i) => (
                  <a
                    key={i}
                    href="#"
                    aria-label="Social"
                    className="grid size-10 place-items-center rounded-full border border-border hover:border-gold hover:text-gold"
                  >
                    <Icon className="size-4" />
                  </a>
                ))}
              </div>
            </div>
          </div>

          <aside className="surface-card h-fit p-8 lg:sticky lg:top-28">
            <p className="eyebrow">Enquiry</p>
            <h2 className="display mt-3 text-3xl">Send us a note</h2>

            {sent ? (
              <div className="mt-8 rounded-2xl border border-gold/40 p-6 text-center">
                <Check className="mx-auto size-6 text-gold" />
                <p className="display mt-3 text-2xl">Message received</p>
                <p className="mt-2 text-sm text-muted-foreground">We&apos;ll reply shortly to your inbox.</p>
              </div>
            ) : (
              <form onSubmit={onSubmit} className="mt-6 space-y-5" noValidate>
                {[
                  { name: 'name', label: 'Name', type: 'text' },
                  { name: 'email', label: 'Email', type: 'email' },
                  { name: 'phone', label: 'Phone (optional)', type: 'tel' },
                ].map((f) => (
                  <div key={f.name}>
                    <label htmlFor={f.name} className="eyebrow">
                      {f.label}
                    </label>
                    <input
                      id={f.name}
                      name={f.name}
                      type={f.type}
                      className="mt-2 w-full border-b border-border bg-transparent pb-2 text-sm outline-none focus:border-gold"
                    />
                    {errors[f.name] && <p className="mt-1 text-xs text-destructive">{errors[f.name]}</p>}
                  </div>
                ))}
                <div>
                  <label htmlFor="message" className="eyebrow">
                    Message
                  </label>
                  <textarea
                    id="message"
                    name="message"
                    rows={4}
                    maxLength={1000}
                    className="mt-2 w-full resize-none border-b border-border bg-transparent pb-2 text-sm outline-none focus:border-gold"
                  />
                  {errors.message && <p className="mt-1 text-xs text-destructive">{errors.message}</p>}
                </div>
                <button
                  type="submit"
                  className="w-full rounded-full bg-primary px-6 py-3.5 text-xs uppercase tracking-[0.2em] text-primary-foreground transition-transform hover:-translate-y-0.5"
                >
                  Send enquiry
                </button>
              </form>
            )}

            <Link
              href={`/${slug}/book`}
              className="mt-4 flex items-center justify-center gap-2 rounded-full border border-border px-6 py-3.5 text-xs uppercase tracking-[0.2em] hover:border-gold hover:text-gold"
            >
              Or book instantly <ArrowRight className="size-4" />
            </Link>
          </aside>
        </div>
      </section>
    </>
  );
}

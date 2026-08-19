'use client';

import Link from 'next/link';
import { useState } from 'react';
import {
  ArrowRight,
  Star,
  Sparkles,
  ShieldCheck,
  Leaf,
  Award,
  MapPin,
  Phone,
  Mail,
  Clock,
  Check,
} from 'lucide-react';
import { Instagram } from '../../../components/owner/owner-website/brand-icons';
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '../../../components/ui/accordion';
import { SectionHead, ServiceCard, usePageMeta } from '../../../components/owner/owner-website/ui';
import {
  salon,
  services,
  stylists,
  memberships,
  packages,
  testimonials,
  stats,
  faqs,
  galleryItems,
} from '../../../data/salon';
import { useSite } from '../../../components/owner/owner-website/site-context';
import heroImg from '../../../assets/hero.jpg';
import aboutImg from '../../../assets/about.jpg';

export default function Home() {
  const { slug } = useSite();
  usePageMeta(
    'Maison Lumière — Luxury Hair, Skin & Spa Atelier',
    'A luxury salon atelier for hair, skin, nails and spa. Browse services, meet the team and book your appointment in under a minute.',
  );

  const featured = services.filter((s) => s.popular).slice(0, 3);
  const [galleryFilter, setGalleryFilter] = useState('All');
  const galleryCats = ['All', ...Array.from(new Set(galleryItems.map((g) => g.category)))];
  const shownGallery = galleryItems.filter((g) => galleryFilter === 'All' || g.category === galleryFilter);

  return (
    <>
      {/* Hero */}
      <section className="relative min-h-[92vh] overflow-hidden">
        <img
          src={heroImg.src}
          alt="Interior of the Maison Lumière salon"
          width={1600}
          height={1200}
          className="absolute inset-0 size-full object-cover"
        />
        <div className="absolute inset-0 bg-[linear-gradient(100deg,rgba(28,24,20,0.72),rgba(28,24,20,0.25)_55%,transparent)]" />
        <div className="shell relative flex min-h-[92vh] flex-col justify-end pb-20 pt-40 md:justify-center md:pb-24">
          <div className="reveal max-w-2xl text-[oklch(0.98_0.006_85)]">
            <p className="text-[0.7rem] uppercase tracking-[0.34em] opacity-80">Fillmore Street · San Francisco</p>
            <h1 className="display mt-6 text-[3.2rem] leading-[0.98] md:text-[5.5rem]">
              The art of looking
              <span className="block italic gold-text">effortlessly yourself</span>
            </h1>
            <p className="mt-7 max-w-lg text-base leading-relaxed opacity-85">
              {salon.tagline}. Hand-painted colour, clinical skin care and slow spa rituals, delivered by an atelier
              of specialists.
            </p>
            <div className="mt-10 flex flex-wrap gap-3">
              <Link
                href={`/${slug}/book`}
                className="inline-flex items-center gap-2 rounded-full bg-[oklch(0.98_0.006_85)] px-6 py-2.5 text-xs uppercase tracking-[0.2em] text-[oklch(0.24_0.012_60)] transition-transform duration-300 hover:-translate-y-0.5"
              >
                Book appointment <ArrowRight className="size-4" />
              </Link>
              <Link
                href={`/${slug}/services`}
                className="inline-flex items-center gap-2 rounded-full border border-[oklch(0.98_0.006_85/0.4)] px-6 py-2.5 text-xs uppercase tracking-[0.2em] transition-colors hover:bg-[oklch(0.98_0.006_85/0.12)]"
              >
                Explore services
              </Link>
            </div>
            <div className="mt-12 flex flex-wrap items-center gap-8 text-xs opacity-85">
              <span className="flex items-center gap-2">
                <Star className="size-4 fill-current" /> 4.9 · 2,400+ reviews
              </span>
              <span className="flex items-center gap-2">
                <Clock className="size-4" /> Open today until 20:00
              </span>
            </div>
          </div>
        </div>
      </section>

      {/* Marquee */}
      <div className="overflow-hidden border-y border-border bg-secondary/40 py-4">
        <div className="marquee flex w-max gap-12 whitespace-nowrap text-xs uppercase tracking-[0.3em] text-muted-foreground">
          {Array.from({ length: 2 }).map((_, r) => (
            <span key={r} className="flex gap-12">
              {[
                'Balayage specialists',
                'Clinical facials',
                'Bridal atelier',
                'Hammam ceremony',
                "Members' priority booking",
                'Cruelty-free products',
              ].map((t) => (
                <span key={t} className="flex items-center gap-12">
                  {t} <span className="text-gold">✦</span>
                </span>
              ))}
            </span>
          ))}
        </div>
      </div>

      {/* About preview */}
      <section className="section">
        <div className="shell grid items-center gap-14 lg:grid-cols-2">
          <div className="relative">
            <img
              src={aboutImg.src}
              alt="Brass salon tools on marble"
              loading="lazy"
              width={1200}
              height={1400}
              className="aspect-4/5 w-full rounded-3xl object-cover"
            />
            <div className="surface-card absolute -bottom-8 -right-4 hidden w-56 p-6 sm:block">
              <p className="display text-4xl text-gold">18</p>
              <p className="mt-1 text-xs uppercase tracking-[0.2em] text-muted-foreground">Years of craft</p>
            </div>
          </div>
          <div>
            <SectionHead
              eyebrow="Our story"
              title={<>A quiet atelier, built around one chair at a time</>}
              copy="Maison Lumière began as a two-chair studio with a simple belief: the best beauty work is unhurried. Today our specialists still take one guest at a time, in a space designed to feel more like a private residence than a salon floor."
            />
            <div className="mt-10 grid gap-6 min-[375px]:grid-cols-2">
              {[
                { icon: Sparkles, t: 'Master specialists', d: 'Every stylist trains for a minimum of eight years.' },
                { icon: Leaf, t: 'Cruelty-free only', d: 'Refillable, responsibly sourced product houses.' },
                { icon: ShieldCheck, t: 'Honest consultation', d: 'We will tell you when less is the better answer.' },
                { icon: Award, t: 'Award-winning', d: 'Nine industry awards across colour and skin.' },
              ].map((f) => (
                <div key={f.t}>
                  <f.icon className="size-5 text-gold" />
                  <p className="mt-3 text-sm font-medium">{f.t}</p>
                  <p className="mt-1 text-sm leading-relaxed text-muted-foreground">{f.d}</p>
                </div>
              ))}
            </div>
            <Link href={`/${slug}/about`} className="mt-10 inline-flex items-center gap-2 text-sm text-gold">
              Read our story <ArrowRight className="size-4" />
            </Link>
          </div>
        </div>
      </section>

      {/* Featured services */}
      <section className="section bg-secondary/40">
        <div className="shell">
          <div className="flex flex-wrap items-end justify-between gap-6">
            <SectionHead eyebrow="Signature services" title="Most requested this season" />
            <Link href={`/${slug}/services`} className="inline-flex items-center gap-2 text-sm text-gold">
              All services <ArrowRight className="size-4" />
            </Link>
          </div>
          <div className="mt-14 grid gap-8 md:grid-cols-2 lg:grid-cols-3">
            {featured.map((s) => (
              <ServiceCard key={s.id} service={s} />
            ))}
          </div>
        </div>
      </section>

      {/* Stylists */}
      <section className="section">
        <div className="shell">
          <SectionHead
            eyebrow="The atelier"
            title="Specialists, not generalists"
            copy="Choose the hands you trust. Every profile shows experience, specialities and live availability."
            align="center"
          />
          <div className="mt-14 grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
            {stylists.map((s) => (
              <article key={s.id} className="group">
                <div className="overflow-hidden rounded-3xl">
                  <img
                    src={s.image}
                    alt={s.name}
                    loading="lazy"
                    width={800}
                    height={1000}
                    className="aspect-4/5 w-full object-cover transition-transform duration-700 group-hover:scale-105"
                  />
                </div>
                <div className="mt-5 flex items-start justify-between gap-3">
                  <div className="min-w-0">
                    <h3 className="display truncate text-2xl">{s.name}</h3>
                    <p className="text-xs uppercase tracking-[0.18em] text-muted-foreground">{s.role}</p>
                  </div>
                  <span className="flex shrink-0 items-center gap-1 text-xs text-gold">
                    <Star className="size-3.5 fill-gold" />
                    {s.rating.toFixed(1)}
                  </span>
                </div>
                <p className="mt-3 text-sm text-muted-foreground">
                  {s.experience} · {s.specialties[0]}
                </p>
                <Link
                  href={`/${slug}/book?stylist=${s.id}`}
                  className="mt-4 inline-flex items-center gap-2 text-xs uppercase tracking-[0.2em] text-gold"
                >
                  Book with {s.name.split(' ')[0]} <ArrowRight className="size-3.5" />
                </Link>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* Gallery */}
      <section className="section bg-secondary/40">
        <div className="shell">
          <SectionHead eyebrow="Portfolio" title="Recent work from the floor" align="center" />
          <div className="mt-10 flex flex-wrap justify-center gap-2">
            {galleryCats.map((c) => (
              <button
                key={c}
                onClick={() => setGalleryFilter(c)}
                className={`rounded-full border px-5 py-2 text-xs uppercase tracking-[0.18em] transition-colors ${
                  galleryFilter === c ? 'border-gold bg-gold text-primary-foreground' : 'border-border hover:border-gold'
                }`}
              >
                {c}
              </button>
            ))}
          </div>
          <div className="mt-12 columns-2 gap-5 lg:columns-3 [&>*]:mb-5">
            {shownGallery.map((g, i) => (
              <figure key={i} className="group relative overflow-hidden rounded-2xl break-inside-avoid">
                <img
                  src={g.image}
                  alt={g.title}
                  loading="lazy"
                  className={`w-full object-cover transition-transform duration-700 group-hover:scale-105 ${
                    i % 3 === 1 ? 'aspect-3/4' : 'aspect-square'
                  }`}
                />
                <figcaption className="absolute inset-x-0 bottom-0 bg-[var(--gradient-veil)] p-4 text-xs uppercase tracking-[0.2em] text-[oklch(0.98_0.006_85)] opacity-0 transition-opacity duration-500 group-hover:opacity-100">
                  {g.title}
                </figcaption>
              </figure>
            ))}
          </div>
          <div className="mt-12 text-center">
            <Link href={`/${slug}/gallery`} className="inline-flex items-center gap-2 text-sm text-gold">
              View full gallery <ArrowRight className="size-4" />
            </Link>
          </div>
        </div>
      </section>

      {/* Memberships */}
      <section className="section">
        <div className="shell">
          <SectionHead
            eyebrow="Memberships"
            title="Beauty on a rhythm, not a whim"
            copy="Members save on every visit, book before everyone else and earn double loyalty points."
            align="center"
          />
          <div className="mt-14 grid gap-6 lg:grid-cols-3">
            {memberships.map((m) => (
              <article key={m.id} className={`surface-card lift p-8 ${m.featured ? 'ring-1 ring-gold' : ''}`}>
                {m.featured && (
                  <span className="mb-4 inline-block rounded-full bg-gold px-3 py-1 text-[0.6rem] uppercase tracking-[0.2em] text-primary-foreground">
                    Most chosen
                  </span>
                )}
                <h3 className="display text-3xl">{m.name}</h3>
                <p className="mt-2 text-sm text-muted-foreground">{m.description}</p>
                <p className="display mt-6 text-5xl">
                  ${m.monthly}
                  <span className="text-base text-muted-foreground"> /month</span>
                </p>
                <ul className="mt-7 space-y-3 text-sm text-muted-foreground">
                  {m.perks.map((p) => (
                    <li key={p} className="flex gap-3">
                      <span className="text-gold">✦</span>
                      {p}
                    </li>
                  ))}
                </ul>
                <Link
                  href={`/${slug}/memberships`}
                  className={`mt-8 block rounded-full px-6 py-2.5 text-center text-xs uppercase tracking-[0.2em] transition-transform duration-300 hover:-translate-y-0.5 ${
                    m.featured ? 'bg-primary text-primary-foreground' : 'border border-border'
                  }`}
                >
                  Join {m.name}
                </Link>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* Packages */}
      <section className="section bg-secondary/40">
        <div className="shell">
          <div className="flex flex-wrap items-end justify-between gap-6">
            <SectionHead eyebrow="Curated packages" title="Occasions, considered" />
            <Link href={`/${slug}/packages`} className="inline-flex items-center gap-2 text-sm text-gold">
              All packages <ArrowRight className="size-4" />
            </Link>
          </div>
          <div className="mt-14 grid gap-8 md:grid-cols-2">
            {packages.slice(0, 2).map((p) => (
              <article key={p.id} className="surface-card lift group overflow-hidden">
                <div className="relative aspect-16/10 overflow-hidden">
                  <img
                    src={p.image}
                    alt={p.name}
                    loading="lazy"
                    className="size-full object-cover transition-transform duration-700 group-hover:scale-105"
                  />
                </div>
                <div className="flex h-full flex-col p-8">
                  <p className="eyebrow">{p.duration}</p>
                  <h3 className="display mt-2 text-3xl">{p.name}</h3>
                  <ul className="mt-5 space-y-2.5">
                    {p.includes.slice(0, 3).map((i) => (
                      <li key={i} className="flex items-center gap-3 text-sm text-muted-foreground">
                        <Check className="size-4 shrink-0 text-gold" /> {i}
                      </li>
                    ))}
                  </ul>
                  <div className="mt-7 border-t border-border pt-3">
                    <p className="flex gap-[10px]">
                      <span className="display block text-3xl">${p.price}</span>
                      <span className="mt-1.5 flex items-center gap-2.5 text-xs">
                        <span className="text-muted-foreground line-through">${p.price + p.saving}</span>
                        <span className="rounded-full bg-gold/15 px-2.5 py-0.5 text-[0.6rem] uppercase tracking-[0.18em] text-gold">
                          Save ${p.saving}
                        </span>
                      </span>
                    </p>
                    <Link
                      href={`/${slug}/book`}
                      className="mt-5 flex w-full items-center justify-center gap-2 rounded-full bg-primary px-6 py-2.5 text-xs uppercase tracking-[0.2em] text-primary-foreground transition-transform hover:-translate-y-0.5"
                    >
                      Book now <ArrowRight className="size-4" />
                    </Link>
                  </div>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="section">
        <div className="shell">
          <SectionHead eyebrow="Guest reviews" title="Trusted by twelve thousand regulars" align="center" />
          <div className="mt-14 grid gap-6 md:grid-cols-2 lg:grid-cols-4">
            {testimonials.map((t) => (
              <blockquote key={t.name} className="surface-card p-7">
                <div className="flex gap-1 text-gold">
                  {Array.from({ length: t.rating }).map((_, i) => (
                    <Star key={i} className="size-3.5 fill-gold" />
                  ))}
                </div>
                <p className="display mt-5 text-xl leading-snug">“{t.quote}”</p>
                <footer className="mt-6 text-xs uppercase tracking-[0.18em] text-muted-foreground">
                  {t.name} · {t.role}
                </footer>
              </blockquote>
            ))}
          </div>
        </div>
      </section>

      {/* Promotion */}
      <section className="shell">
        <div className="relative overflow-hidden rounded-4xl bg-primary px-8 py-16 text-primary-foreground md:px-16">
          <div className="relative z-10 max-w-xl">
            <p className="text-[0.7rem] uppercase tracking-[0.34em] opacity-70">Seasonal offer</p>
            <h2 className="display mt-5 text-4xl md:text-5xl">Autumn gloss ritual — 20% off through October</h2>
            <p className="mt-5 text-sm opacity-80">
              Add a bond-building gloss to any colour service and leave with mirror shine. Limited weekday slots.
            </p>
            <Link
              href={`/${slug}/book`}
              className="mt-9 inline-flex items-center gap-2 rounded-full bg-[oklch(0.98_0.006_85)] px-6 py-2.5 text-xs uppercase tracking-[0.2em] text-[oklch(0.24_0.012_60)]"
            >
              Claim offer <ArrowRight className="size-4" />
            </Link>
          </div>
          <div className="pointer-events-none absolute -right-24 -top-24 size-96 rounded-full bg-[var(--gradient-gold)] opacity-25 blur-3xl" />
        </div>
      </section>

      {/* Stats */}
      <section className="section">
        <div className="shell grid gap-10 border-y border-border py-14 min-[375px]:grid-cols-2 lg:grid-cols-4">
          {stats.map((s) => (
            <div key={s.label}>
              <p className="display text-6xl gold-text">{s.value}</p>
              <p className="mt-2 text-xs uppercase tracking-[0.2em] text-muted-foreground">{s.label}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Instagram */}
      <section className="pb-20">
        <div className="shell">
          <div className="flex flex-wrap items-end justify-between gap-4">
            <SectionHead eyebrow="Instagram" title="@maisonlumiere" />
            <a href="#" className="inline-flex items-center gap-2 text-sm text-gold">
              <Instagram className="size-4" /> Follow
            </a>
          </div>
          <div className="mt-10 grid grid-cols-3 gap-3 md:grid-cols-6">
            {galleryItems.slice(0, 6).map((g, i) => (
              <img
                key={i}
                src={g.image}
                alt={g.title}
                loading="lazy"
                className="aspect-square w-full rounded-xl object-cover transition-opacity hover:opacity-80"
              />
            ))}
          </div>
        </div>
      </section>

      {/* FAQ + contact */}
      <section className="section bg-secondary/40">
        <div className="shell grid gap-16 lg:grid-cols-2">
          <div>
            <SectionHead eyebrow="Questions" title="Good to know" />
            <Accordion type="single" collapsible className="mt-8">
              {faqs.map((f) => (
                <AccordionItem key={f.q} value={f.q}>
                  <AccordionTrigger className="text-left text-base">{f.q}</AccordionTrigger>
                  <AccordionContent className="text-sm leading-relaxed text-muted-foreground">{f.a}</AccordionContent>
                </AccordionItem>
              ))}
            </Accordion>
          </div>
          <div>
            <SectionHead eyebrow="Visit us" title="Fillmore Street" />
            <div className="surface-card mt-8 overflow-hidden">
              <div className="grid aspect-16/9 place-items-center bg-muted text-xs uppercase tracking-[0.2em] text-muted-foreground">
                <span className="flex items-center gap-2">
                  <MapPin className="size-4 text-gold" /> Map preview
                </span>
              </div>
              <div className="space-y-4 p-7 text-sm">
                <p className="flex items-center gap-3">
                  <MapPin className="size-4 text-gold" /> {salon.address}
                </p>
                <p className="flex items-center gap-3">
                  <Phone className="size-4 text-gold" /> {salon.phone}
                </p>
                <p className="flex items-center gap-3">
                  <Mail className="size-4 text-gold" /> {salon.email}
                </p>
                <div className="gold-rule" />
                {salon.hours.map((h) => (
                  <p key={h.day} className="flex justify-between text-muted-foreground">
                    <span>{h.day}</span>
                    <span className="text-foreground">{h.time}</span>
                  </p>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}

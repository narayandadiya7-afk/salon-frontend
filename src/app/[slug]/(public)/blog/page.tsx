'use client';

import { useState } from 'react';
import { Search, ArrowRight } from 'lucide-react';
import { PageHero, usePageMeta } from '../../../../components/owner/owner-website/ui';
import { posts } from '../../../../data/salon';

export default function BlogPage() {
  usePageMeta(
    'The Journal — Maison Lumière',
    'Beauty tips, hair care, skin care and lifestyle notes written by the specialists at Maison Lumière.',
  );

  const [q, setQ] = useState('');
  const [cat, setCat] = useState('All');
  const cats = ['All', ...Array.from(new Set(posts.map((p) => p.category)))];
  const [featured, ...rest] = posts;
  const list = rest.filter(
    (p) => (cat === 'All' || p.category === cat) && p.title.toLowerCase().includes(q.toLowerCase()),
  );

  return (
    <>
      <PageHero
        eyebrow="Journal"
        title="Notes from the atelier"
        copy="Practical guidance from the people who do the work — no trend chasing, no filler."
      />

      <section className="shell pb-24">
        <article className="group grid gap-10 lg:grid-cols-2">
          <div className="overflow-hidden rounded-3xl">
            <img
              src={featured.image}
              alt={featured.title}
              loading="lazy"
              className="aspect-4/3 w-full object-cover transition-transform duration-700 group-hover:scale-105"
            />
          </div>
          <div className="flex flex-col justify-center">
            <p className="eyebrow">Featured · {featured.category}</p>
            <h2 className="display mt-4 text-4xl leading-tight md:text-5xl">{featured.title}</h2>
            <p className="mt-5 text-base leading-relaxed text-muted-foreground">{featured.excerpt}</p>
            <p className="mt-6 text-xs uppercase tracking-[0.18em] text-muted-foreground">
              {featured.date} · {featured.read} read
            </p>
            <a href="#" className="mt-8 inline-flex items-center gap-2 text-sm text-gold">
              Read article <ArrowRight className="size-4" />
            </a>
          </div>
        </article>

        <div className="mt-20 flex flex-wrap items-center justify-between gap-6">
          <div className="flex flex-wrap gap-2">
            {cats.map((c) => (
              <button
                key={c}
                onClick={() => setCat(c)}
                className={`rounded-full border px-5 py-2 text-xs uppercase tracking-[0.18em] transition-colors ${
                  cat === c ? 'border-gold bg-gold text-primary-foreground' : 'border-border hover:border-gold'
                }`}
              >
                {c}
              </button>
            ))}
          </div>
          <label className="flex w-full items-center gap-3 border-b border-border pb-2 sm:w-64">
            <Search className="size-4 text-muted-foreground" />
            <input
              value={q}
              onChange={(e) => setQ(e.target.value.slice(0, 60))}
              placeholder="Search articles"
              className="w-full bg-transparent text-sm outline-none placeholder:text-muted-foreground"
            />
          </label>
        </div>

        {list.length === 0 ? (
          <p className="mt-16 text-center text-sm text-muted-foreground">No articles match that search yet.</p>
        ) : (
          <div className="mt-12 grid gap-8 md:grid-cols-3">
            {list.map((p) => (
              <article key={p.slug} className="group">
                <div className="overflow-hidden rounded-2xl">
                  <img
                    src={p.image}
                    alt={p.title}
                    loading="lazy"
                    className="aspect-4/3 w-full object-cover transition-transform duration-700 group-hover:scale-105"
                  />
                </div>
                <p className="mt-5 text-xs uppercase tracking-[0.2em] text-gold">{p.category}</p>
                <h3 className="display mt-2 text-2xl leading-snug">{p.title}</h3>
                <p className="mt-3 text-sm leading-relaxed text-muted-foreground">{p.excerpt}</p>
                <p className="mt-4 text-xs uppercase tracking-[0.18em] text-muted-foreground">
                  {p.date} · {p.read}
                </p>
              </article>
            ))}
          </div>
        )}

        <div className="surface-card mt-20 flex flex-wrap items-center justify-between gap-8 p-10">
          <div className="max-w-md">
            <p className="display text-3xl">One letter a month</p>
            <p className="mt-2 text-sm text-muted-foreground">
              Seasonal care notes and early access to members-only offers. No noise.
            </p>
          </div>
          <form
            className="flex w-full max-w-sm items-center gap-2 border-b border-border pb-2"
            onSubmit={(e) => {
              e.preventDefault();
              (e.currentTarget as HTMLFormElement).reset();
            }}
          >
            <input
              type="email"
              required
              maxLength={255}
              placeholder="your@email.com"
              className="w-full bg-transparent text-sm outline-none placeholder:text-muted-foreground"
            />
            <button type="submit" className="text-gold" aria-label="Subscribe">
              <ArrowRight className="size-4" />
            </button>
          </form>
        </div>
      </section>
    </>
  );
}

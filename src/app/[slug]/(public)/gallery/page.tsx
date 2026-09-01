'use client';

import { useState } from 'react';
import { X, Play } from 'lucide-react';
import { PageHero, usePageMeta } from '../../../../components/owner/owner-website/ui';
import { galleryItems } from '../../../../data/salon';

export default function GalleryPage() {
  usePageMeta(
    'Gallery & Before After — Maison Lumière',
    'Browse hair, skin, spa, nails and bridal transformations from the Maison Lumière floor.',
  );

  const cats = ['All', ...Array.from(new Set(galleryItems.map((g) => g.category))), 'Before & After'];
  const [cat, setCat] = useState('All');
  const [lightbox, setLightbox] = useState<null | { image: string; title: string }>(null);

  const items = galleryItems.filter((g) => cat === 'All' || cat === 'Before & After' || g.category === cat);

  return (
    <>
      <PageHero
        eyebrow="Portfolio"
        title="Work we are proud to sign"
        copy="Unretouched results photographed in salon light. Tap any image to view it larger."
      />

      <section className="shell pb-28">
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

        <div className="mt-12 columns-2 gap-5 lg:columns-3 [&>*]:mb-5">
          {items.map((g, i) => (
            <figure
              key={i}
              onClick={() => setLightbox(g)}
              className="group relative cursor-pointer overflow-hidden rounded-2xl break-inside-avoid"
            >
              <img
                src={g.image}
                alt={g.title}
                loading="lazy"
                className={`w-full object-cover transition-transform duration-700 group-hover:scale-105 ${
                  i % 4 === 1 ? 'aspect-3/4' : i % 4 === 2 ? 'aspect-square' : 'aspect-4/5'
                }`}
              />
              <figcaption className="absolute inset-x-0 bottom-0 bg-[var(--gradient-veil)] p-5 text-xs uppercase tracking-[0.2em] text-[oklch(0.98_0.006_85)] opacity-0 transition-opacity duration-500 group-hover:opacity-100">
                {g.title} · {g.category}
              </figcaption>
            </figure>
          ))}
        </div>

        <h2 className="display mt-24 text-4xl">Video stories</h2>
        <div className="mt-8 grid gap-5 md:grid-cols-3">
          {galleryItems.slice(0, 3).map((g, i) => (
            <div key={i} className="group relative overflow-hidden rounded-2xl">
              <img src={g.image} alt={g.title} loading="lazy" className="aspect-video w-full object-cover" />
              <span className="absolute inset-0 grid place-items-center bg-[oklch(0.24_0.012_60/0.35)]">
                <span className="grid size-14 place-items-center rounded-full bg-[oklch(0.98_0.006_85/0.9)] text-[oklch(0.24_0.012_60)] transition-transform group-hover:scale-110">
                  <Play className="size-5" />
                </span>
              </span>
            </div>
          ))}
        </div>
      </section>

      {lightbox && (
        <div
          onClick={() => setLightbox(null)}
          className="fixed inset-0 z-60 grid place-items-center bg-[oklch(0.16_0.008_60/0.92)] p-6"
        >
          <button aria-label="Close" className="absolute right-6 top-6 text-[oklch(0.98_0.006_85)]">
            <X className="size-6" />
          </button>
          <figure className="max-h-[85vh]">
            <img src={lightbox.image} alt={lightbox.title} className="max-h-[80vh] rounded-2xl object-contain" />
            <figcaption className="mt-4 text-center text-xs uppercase tracking-[0.25em] text-[oklch(0.98_0.006_85)]">
              {lightbox.title}
            </figcaption>
          </figure>
        </div>
      )}
    </>
  );
}

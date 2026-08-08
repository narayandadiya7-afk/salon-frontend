/* Site data access + normalization for the public salon website.
 * Server components call getSalon(slug); client components consume it
 * via the SiteContext provided by SiteRoot. */

import {
  services as fallbackServices,
  img,
  fallbackHours,
} from '@/data/site-data';

export type SiteService = {
  id: string;
  name: string;
  category: string;
  description: string;
  price: number;
  duration: number;
  rating: number;
  reviews: number;
  image: string;
  popular?: boolean;
  benefits?: string[];
  included?: string[];
  staff?: string[];
  faqs?: { q: string; a: string }[];
};

export type SiteHours = { day: string; time: string };

export type SiteSalon = {
  slug: string;
  name: string;
  tagline: string;
  description: string;
  address: string;
  city: string;
  state: string;
  phone: string;
  email: string;
  services: SiteService[];
  hours: SiteHours[];
};

const API_BASE = process.env.NEXT_PUBLIC_API_BASEURL || 'http://localhost:3005/api/';

function fallbackSalon(slug: string): SiteSalon {
  return {
    slug,
    name: 'Maison Lumière',
    tagline: 'Hair · Skin · Spa — a quiet atelier for people who care how they look',
    description:
      'A luxury salon atelier for hair, skin, nails and spa. Hand-painted colour, clinical skin care and slow spa rituals, delivered by a team of specialists.',
    address: 'Fillmore Street, San Francisco, CA 90210',
    city: 'San Francisco',
    state: 'CA',
    phone: '+1 (415) 555-0123',
    email: 'hello@maisonlumiere.com',
    services: fallbackServices,
    hours: fallbackHours,
  };
}

function defaultImageFor(category: string, index: number): string {
  const pool = [
    'https://images.unsplash.com/photo-1560066984-138dadb4c035?w=600&h=450&fit=crop',
    'https://images.unsplash.com/photo-1562322140-8baeececf3df?w=600&h=450&fit=crop',
    'https://images.unsplash.com/photo-1570172619644-dfd03ed5d881?w=600&h=450&fit=crop',
    'https://images.unsplash.com/photo-1604654894610-df63bc536371?w=600&h=450&fit=crop',
    'https://images.unsplash.com/photo-1544161515-4ab6ce6db874?w=600&h=450&fit=crop',
    'https://images.unsplash.com/photo-1522337360788-8b13dee7a37e?w=600&h=450&fit=crop',
  ];
  return pool[index % pool.length];
}

function mapApiService(s: any, index: number): SiteService {
  const category = (s.category || 'Service') as string;
  const fallback = fallbackServices.find(
    (f) => f.name.toLowerCase() === (s.name || '').toLowerCase(),
  );
  return {
    id: String(s.id),
    name: s.name || 'Service',
    category,
    description: s.description || fallback?.description || '',
    price: typeof s.price === 'number' ? s.price : 0,
    duration: typeof s.duration === 'number' ? s.duration : 60,
    rating: fallback?.rating ?? 4.9,
    reviews: fallback?.reviews ?? 0,
    image: s.imageUrl || fallback?.image || defaultImageFor(category, index),
    popular: fallback?.popular,
    benefits: fallback?.benefits,
    included: fallback?.included,
    staff: fallback?.staff,
    faqs: fallback?.faqs,
  };
}

const DAY_NAMES = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];

function to12h(t: string): string {
  const [h, m] = t.split(':').map(Number);
  if (Number.isNaN(h)) return t;
  const suffix = h >= 12 ? 'PM' : 'AM';
  const hr = h % 12 || 12;
  return `${hr}:${String(m ?? 0).padStart(2, '0')} ${suffix}`;
}

function buildHours(timeSlots: any[] | undefined): SiteHours[] {
  if (!Array.isArray(timeSlots) || timeSlots.length === 0) return fallbackHours;
  const slots = timeSlots
    .filter((s: any) => s.isAvailable !== false && s.startTime && s.endTime)
    .sort((a: any, b: any) => a.dayOfWeek - b.dayOfWeek);
  if (slots.length === 0) return fallbackHours;

  const grouped: { day: string; time: string }[] = [];
  let i = 0;
  while (i < slots.length) {
    const start = slots[i];
    let j = i + 1;
    while (
      j < slots.length &&
      slots[j].startTime === start.startTime &&
      slots[j].endTime === start.endTime
    ) {
      j++;
    }
    const slice = slots.slice(i, j);
    const dayLabel =
      slice.length === 1
        ? DAY_NAMES[slice[0].dayOfWeek]
        : `${DAY_NAMES[slice[0].dayOfWeek]} — ${DAY_NAMES[slice[j - 1].dayOfWeek]}`;
    grouped.push({ day: dayLabel, time: `${to12h(start.startTime)} — ${to12h(start.endTime)}` });
    i = j;
  }
  return grouped.length ? grouped : fallbackHours;
}

export async function getSalon(slug: string): Promise<SiteSalon> {
  const fallback = fallbackSalon(slug);
  let raw: any = null;

  try {
    const res = await fetch(`${API_BASE}salons/slug/${encodeURIComponent(slug)}`, {
      cache: 'no-store',
    });
    if (res.ok) {
      const payload = await res.json();
      raw = payload?.data ?? null;
    }
  } catch (e) {
    console.error('[getSalon] fetch failed, using fallback', e);
  }

  if (!raw) return fallback;

  const apiServices = Array.isArray(raw.services)
    ? raw.services.map((s: any, i: number) => mapApiService(s, i))
    : [];

  return {
    slug,
    name: raw.name || fallback.name,
    tagline: raw.tagline || fallback.tagline,
    description: raw.description || fallback.description,
    address: raw.address || fallback.address,
    city: raw.city || fallback.city,
    state: raw.state || fallback.state,
    phone: raw.phone || fallback.phone,
    email: raw.email || fallback.email,
    services: apiServices.length ? apiServices : fallback.services,
    hours: buildHours(raw.timeSlots),
  };
}

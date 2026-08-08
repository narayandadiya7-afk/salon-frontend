import hairImg from '@/assets/service-hair.jpg';
import skinImg from '@/assets/service-skin.jpg';
import nailsImg from '@/assets/service-nails.jpg';
import bridalImg from '@/assets/service-bridal.jpg';
import spaImg from '@/assets/service-spa.jpg';
import groomingImg from '@/assets/service-grooming.jpg';
import stylist1Img from '@/assets/stylist-1.jpg';
import stylist2Img from '@/assets/stylist-2.jpg';
import stylist3Img from '@/assets/stylist-3.jpg';
import stylist4Img from '@/assets/stylist-4.jpg';
import type { StaticImageData } from 'next/image';

const src = (m: StaticImageData) => m.src;

const hair = src(hairImg);
const skin = src(skinImg);
const nails = src(nailsImg);
const bridal = src(bridalImg);
const spa = src(spaImg);
const grooming = src(groomingImg);
const stylist1 = src(stylist1Img);
const stylist2 = src(stylist2Img);
const stylist3 = src(stylist3Img);
const stylist4 = src(stylist4Img);

export const salon = {
  name: 'Maison Lumière',
  tagline: 'Atelier of hair, skin & quiet luxury',
  phone: '+1 (415) 555 0142',
  whatsapp: '+1 (415) 555 0142',
  email: 'concierge@maisonlumiere.com',
  address: '218 Fillmore Street, San Francisco, CA',
  hours: [
    { day: 'Monday — Thursday', time: '09:00 — 20:00' },
    { day: 'Friday', time: '09:00 — 21:00' },
    { day: 'Saturday', time: '08:30 — 19:00' },
    { day: 'Sunday', time: '10:00 — 17:00' },
  ],
};

export type Service = {
  id: string;
  name: string;
  category: 'Hair' | 'Skin' | 'Nails' | 'Spa' | 'Bridal' | 'Grooming';
  description: string;
  price: number;
  duration: number;
  rating: number;
  image: string;
  popular?: boolean;
};

export const services: Service[] = [
  {
    id: 'signature-cut',
    name: 'Signature Cut & Finish',
    category: 'Hair',
    description: 'Consultation, precision cut and a couture blow-dry finish.',
    price: 145,
    duration: 75,
    rating: 4.9,
    image: hair,
    popular: true,
  },
  {
    id: 'balayage',
    name: 'Hand-Painted Balayage',
    category: 'Hair',
    description: 'Dimensional colour painted freehand, gloss and bond repair.',
    price: 320,
    duration: 180,
    rating: 5.0,
    image: hair,
    popular: true,
  },
  {
    id: 'radiance-facial',
    name: 'Radiance Ritual Facial',
    category: 'Skin',
    description: 'Enzyme resurfacing, lymphatic massage and LED light therapy.',
    price: 210,
    duration: 90,
    rating: 4.9,
    image: skin,
    popular: true,
  },
  {
    id: 'microneedling',
    name: 'Collagen Microneedling',
    category: 'Skin',
    description: 'Clinical firming protocol with peptide infusion.',
    price: 380,
    duration: 75,
    rating: 4.8,
    image: skin,
  },
  {
    id: 'luxe-manicure',
    name: 'Luxe Structured Manicure',
    category: 'Nails',
    description: 'Russian shaping, cuticle care and long-wear gloss.',
    price: 95,
    duration: 60,
    rating: 4.9,
    image: nails,
  },
  {
    id: 'pedicure-ritual',
    name: 'Warm Stone Pedicure',
    category: 'Nails',
    description: 'Mineral soak, exfoliation and heated stone massage.',
    price: 120,
    duration: 70,
    rating: 4.8,
    image: nails,
  },
  {
    id: 'aroma-massage',
    name: 'Aroma Deep Tissue',
    category: 'Spa',
    description: 'Bespoke oil blend, deep pressure, full-body release.',
    price: 185,
    duration: 90,
    rating: 5.0,
    image: spa,
    popular: true,
  },
  {
    id: 'hammam',
    name: 'Ivory Hammam Ceremony',
    category: 'Spa',
    description: 'Black soap cleanse, kessa exfoliation, argan wrap.',
    price: 240,
    duration: 105,
    rating: 4.9,
    image: spa,
  },
  {
    id: 'bridal-trial',
    name: 'Bridal Hair & Makeup Trial',
    category: 'Bridal',
    description: 'Two full looks, photography test and timeline planning.',
    price: 290,
    duration: 150,
    rating: 5.0,
    image: bridal,
  },
  {
    id: 'beard-sculpt',
    name: 'Beard Sculpt & Hot Towel',
    category: 'Grooming',
    description: 'Razor detailing, hot towel ritual and conditioning oil.',
    price: 85,
    duration: 45,
    rating: 4.8,
    image: grooming,
  },
  {
    id: 'gents-cut',
    name: "Gentlemen's Precision Cut",
    category: 'Grooming',
    description: 'Scissor-over-comb tailoring with scalp treatment.',
    price: 110,
    duration: 60,
    rating: 4.9,
    image: grooming,
  },
  {
    id: 'keratin',
    name: 'Silk Keratin Smoothing',
    category: 'Hair',
    description: 'Frizz-free finish that lasts up to twelve weeks.',
    price: 350,
    duration: 165,
    rating: 4.7,
    image: hair,
  },
];

export const categories = ['All', 'Hair', 'Skin', 'Nails', 'Spa', 'Bridal', 'Grooming'] as const;

export type Stylist = {
  id: string;
  name: string;
  role: string;
  image: string;
  experience: string;
  rating: number;
  specialties: string[];
  languages: string[];
  bio: string;
};

export const stylists: Stylist[] = [
  {
    id: 'amara',
    name: 'Amara Léon',
    role: 'Creative Director · Colour',
    image: stylist1,
    experience: '14 years',
    rating: 5.0,
    specialties: ['Balayage', 'Editorial styling', 'Colour correction'],
    languages: ['English', 'French'],
    bio: 'Trained in Paris, Amara built her reputation on lived-in colour that grows out beautifully.',
  },
  {
    id: 'julien',
    name: 'Julien Marsh',
    role: 'Master Barber',
    image: stylist2,
    experience: '11 years',
    rating: 4.9,
    specialties: ['Precision cutting', 'Beard design', 'Scalp care'],
    languages: ['English', 'Spanish'],
    bio: "A tailor's eye for proportion, applied to classic and modern gentlemen's cuts.",
  },
  {
    id: 'noor',
    name: 'Noor Fadel',
    role: 'Lead Aesthetician',
    image: stylist3,
    experience: '9 years',
    rating: 4.9,
    specialties: ['Clinical facials', 'Microneedling', 'Barrier repair'],
    languages: ['English', 'Arabic'],
    bio: 'Noor designs results-driven skin programmes rooted in dermatological science.',
  },
  {
    id: 'priya',
    name: 'Priya Raman',
    role: 'Nail & Bridal Artist',
    image: stylist4,
    experience: '8 years',
    rating: 5.0,
    specialties: ['Structured manicure', 'Bridal looks', 'Nail art'],
    languages: ['English', 'Hindi', 'Tamil'],
    bio: 'Known for immaculate structured manicures and serene wedding-morning energy.',
  },
];

export const packages = [
  {
    id: 'bridal',
    name: 'The Bridal Suite',
    image: bridal,
    price: 1450,
    saving: 320,
    duration: 'Full day',
    includes: ['Trial session', 'Wedding-day hair & makeup', 'Two guest looks', 'Skin prep facial', 'On-site touch-ups'],
  },
  {
    id: 'transformation',
    name: 'Hair Transformation',
    image: hair,
    price: 690,
    saving: 145,
    duration: '5 hours',
    includes: ['Colour consultation', 'Full balayage', 'Bond treatment', 'Precision cut', 'Home care duo'],
  },
  {
    id: 'spa-day',
    name: 'Ivory Spa Day',
    image: spa,
    price: 520,
    saving: 110,
    duration: '4 hours',
    includes: ['Hammam ceremony', 'Aroma deep tissue', 'Radiance facial', 'Champagne lunch'],
  },
  {
    id: 'glow',
    name: 'Glow Reset',
    image: skin,
    price: 380,
    saving: 75,
    duration: '2.5 hours',
    includes: ['Radiance facial', 'LED therapy', 'Structured manicure', 'Skin plan'],
  },
];

export const memberships = [
  {
    id: 'essential',
    name: 'Essential',
    monthly: 89,
    annual: 890,
    description: 'For the every-six-weeks ritual.',
    perks: ['1 signature service monthly', '10% off all add-ons', 'Priority weekday booking', 'Birthday treatment'],
  },
  {
    id: 'atelier',
    name: 'Atelier',
    monthly: 189,
    annual: 1890,
    featured: true,
    description: 'Our most-loved membership.',
    perks: [
      '2 signature services monthly',
      '15% off all services & retail',
      'Priority weekend booking',
      'Complimentary gloss & blow-dry',
      '2x loyalty points',
    ],
  },
  {
    id: 'maison',
    name: 'Maison Private',
    monthly: 389,
    annual: 3890,
    description: 'Unlimited access, concierge-led.',
    perks: [
      'Unlimited blow-dry & grooming',
      '4 premium treatments monthly',
      '20% off everything',
      'Dedicated concierge line',
      'Private after-hours suite',
      'Guest passes each quarter',
    ],
  },
];

export const testimonials = [
  {
    name: 'Eleanor Vance',
    role: 'Client since 2019',
    quote:
      'The only place my colour has ever looked expensive. Amara understands hair the way a tailor understands cloth.',
    rating: 5,
  },
  {
    name: 'Marcus Hale',
    role: 'Atelier member',
    quote: 'Booking takes twenty seconds and the chair is always ready. It has become the calmest hour of my month.',
    rating: 5,
  },
  {
    name: 'Sofia Marchetti',
    role: 'Bride, Spring 2026',
    quote: 'They ran my wedding morning like a private atelier. Every guest asked who did our hair.',
    rating: 5,
  },
  {
    name: 'Dahlia Okafor',
    role: 'Client since 2021',
    quote: 'Noor rebuilt my skin barrier in three visits. Honest advice, no upselling, remarkable results.',
    rating: 5,
  },
];

export const stats = [
  { value: '18', label: 'Years of craft' },
  { value: '42k', label: 'Appointments completed' },
  { value: '12k', label: 'Happy clients' },
  { value: '9', label: 'Industry awards' },
];

export const faqs = [
  {
    q: 'How far in advance should I book?',
    a: 'Two to three weeks for colour and bridal, a few days for cuts and grooming. Members receive priority slots.',
  },
  {
    q: 'What is your cancellation policy?',
    a: 'Reschedule free of charge up to 24 hours before your appointment. Later changes are charged at 50%.',
  },
  {
    q: 'Can I pay at the salon?',
    a: 'Yes. Card, wallet, gift card and membership credit are accepted online, and cash at the front desk.',
  },
  {
    q: 'Do you offer consultations?',
    a: 'Complimentary 15-minute consultations are available in person or by video for any colour or clinical service.',
  },
  {
    q: 'Are your products cruelty-free?',
    a: 'Every product on our shelves and in our back bar is cruelty-free, and most lines are refillable.',
  },
];

export const galleryItems = [
  { image: hair, category: 'Hair', title: 'Lived-in bronde' },
  { image: bridal, category: 'Bridal', title: 'Veil & soft chignon' },
  { image: skin, category: 'Skin', title: 'Post-facial glow' },
  { image: spa, category: 'Spa', title: 'Hammam suite' },
  { image: nails, category: 'Nails', title: 'Structured almond' },
  { image: grooming, category: 'Grooming', title: 'Sculpted fade' },
  { image: hair, category: 'Hair', title: 'Copper gloss' },
  { image: skin, category: 'Skin', title: 'Barrier repair' },
  { image: bridal, category: 'Bridal', title: 'Wedding morning' },
];

export const posts = [
  {
    slug: 'colour-that-grows-out-beautifully',
    title: 'Colour that grows out beautifully',
    category: 'Hair care',
    excerpt: 'Why hand-painted colour outlives foils, and how to stretch six weeks into twelve.',
    date: '12 July 2026',
    read: '6 min',
    image: hair,
  },
  {
    slug: 'the-five-step-evening-ritual',
    title: 'The five-step evening ritual',
    category: 'Skin care',
    excerpt: 'Our lead aesthetician on the shortest routine that still repairs your barrier.',
    date: '28 June 2026',
    read: '4 min',
    image: skin,
  },
  {
    slug: 'planning-a-calm-wedding-morning',
    title: 'Planning a calm wedding morning',
    category: 'Bridal',
    excerpt: 'A minute-by-minute timeline used by our bridal team for parties of two to twelve.',
    date: '9 June 2026',
    read: '8 min',
    image: bridal,
  },
  {
    slug: 'what-a-hammam-actually-does',
    title: 'What a hammam actually does',
    category: 'Lifestyle',
    excerpt: 'The centuries-old ceremony behind our most requested spa booking.',
    date: '21 May 2026',
    read: '5 min',
    image: spa,
  },
];

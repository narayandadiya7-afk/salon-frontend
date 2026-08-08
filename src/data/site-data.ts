/* Static fallback content for the public salon website.
 * Where the backend provides real data (salon info, services) we prefer it;
 * everything else falls back to the curated content below. */

export type Service = {
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

export type Stylist = {
  id: string;
  name: string;
  role: string;
  experience: string;
  bio: string;
  specialties: string[];
  rating: number;
  reviews: number;
  image: string;
  languages: string[];
  instagram?: string;
};

export const img = {
  hero: 'https://images.unsplash.com/photo-1560066984-138dadb4c035?w=1920&h=1280&fit=crop',
  hero2: 'https://images.unsplash.com/photo-1605497788044-5a32c7078486?w=1920&h=1280&fit=crop',
  about: 'https://images.unsplash.com/photo-1600334089648-b0d9d3028eb2?w=1200&h=1400&fit=crop',
  interior: 'https://images.unsplash.com/photo-1522337360788-8b13dee7a37e?w=1200&h=900&fit=crop',
  bridal: 'https://images.unsplash.com/photo-1596462502278-27bfdc403348?w=1200&h=900&fit=crop',
  spa: 'https://images.unsplash.com/photo-1544161515-4ab6ce6db874?w=1200&h=900&fit=crop',
  blog: 'https://images.unsplash.com/photo-1499750310107-5fef28a66643?w=1920&h=1080&fit=crop',
  gallery: 'https://images.unsplash.com/photo-1512290923902-8a9f81dc236c?w=1920&h=1080&fit=crop',
  contact: 'https://images.unsplash.com/photo-1487412947147-5cebf100ffc2?w=1920&h=1080&fit=crop',
  team: 'https://images.unsplash.com/photo-1522337360788-8b13dee7a37e?w=1920&h=1080&fit=crop',
  testimonials: 'https://images.unsplash.com/photo-1489424731084-a5d8b219a5bb?w=1920&h=1080&fit=crop',
  services: 'https://images.unsplash.com/photo-1560066984-138dadb4c035?w=1920&h=1080&fit=crop',
};

export const formatINR = (n: number) => `₹${n.toLocaleString('en-IN')}`;

export const services: Service[] = [
  {
    id: '1',
    category: 'Hair',
    name: 'Signature Haircut',
    description: 'Precision cut tailored to your face shape and hair texture with a relaxing shampoo and blow-dry.',
    price: 2500,
    duration: 60,
    rating: 4.9,
    reviews: 128,
    image: 'https://images.unsplash.com/photo-1560066984-138dadb4c035?w=600&h=450&fit=crop',
    popular: true,
    benefits: ['Personalized consultation', 'Shampoo & conditioning', 'Precision cutting', 'Blow-dry & styling', 'Product recommendations'],
    included: ['Hair wash', 'Styling products', 'Refreshments'],
    staff: ['Priya Sharma', 'Rohit Verma'],
    faqs: [
      { q: 'How long does a haircut take?', a: 'A signature haircut typically takes 60 minutes, including consultation, wash, cut, and style.' },
      { q: 'How often should I get a haircut?', a: 'We recommend every 4-6 weeks to maintain your style and keep your hair healthy.' },
    ],
  },
  {
    id: '2',
    category: 'Hair',
    name: 'Keratin Treatment',
    description: 'Professional smoothing treatment that eliminates frizz and adds incredible shine for up to 3 months.',
    price: 5500,
    duration: 120,
    rating: 4.8,
    reviews: 96,
    image: 'https://images.unsplash.com/photo-1595476108010-b4d1f102b1b1?w=600&h=450&fit=crop',
    popular: true,
    benefits: ['Frizz-free results', 'Up to 3 months lasting', 'Improved shine', 'Reduced styling time'],
    included: ['Hair analysis', 'Deep cleanse', 'Keratin application', 'Blow-dry & flat iron'],
    staff: ['Priya Sharma'],
    faqs: [
      { q: 'How long does the treatment last?', a: 'Results typically last 2-3 months depending on your hair type and maintenance routine.' },
      { q: 'Can I wash my hair after treatment?', a: 'We recommend waiting 72 hours before washing to allow the keratin to fully bond.' },
    ],
  },
  {
    id: '3',
    category: 'Hair',
    name: 'Hair Color & Highlights',
    description: 'Professional color application for vibrant, long-lasting results.',
    price: 4500,
    duration: 150,
    rating: 4.7,
    reviews: 203,
    image: 'https://images.unsplash.com/photo-1562322140-8baeececf3df?w=600&h=450&fit=crop',
    benefits: ['Color consultation', 'Precision application', 'Toner & gloss', 'Home care advice'],
    included: ['Color consultation', 'Application', 'Shampoo & blow-dry'],
    staff: ['Vikram Singh'],
  },
  {
    id: '4',
    category: 'Hair',
    name: 'Hair Spa Treatment',
    description: 'Deep conditioning treatment with hot oil massage for damaged and dry hair.',
    price: 1800,
    duration: 45,
    rating: 4.8,
    reviews: 167,
    image: 'https://images.unsplash.com/photo-1595475884562-073c30d45670?w=600&h=450&fit=crop',
    benefits: ['Hot oil massage', 'Deep conditioning mask', 'Scalp therapy', 'Steam treatment'],
    included: ['Oil massage', 'Steam', 'Conditioning mask'],
    staff: ['Priya Sharma'],
  },
  {
    id: '5',
    category: 'Hair',
    name: 'Blow-Dry & Styling',
    description: 'Professional blow-dry with volumizing products and heat protection.',
    price: 1200,
    duration: 45,
    rating: 4.9,
    reviews: 342,
    image: 'https://images.unsplash.com/photo-1567894340315-735d7c361db7?w=600&h=450&fit=crop',
    benefits: ['Volume & shine', 'Heat protection', 'Long-lasting hold'],
    included: ['Wash', 'Blow-dry', 'Finishing products'],
    staff: ['Sophia D\u2019Souza'],
  },
  {
    id: '6',
    category: 'Skin',
    name: 'Luxury Facial',
    description: 'Deep-cleansing facial tailored to your skin type.',
    price: 3200,
    duration: 75,
    rating: 4.9,
    reviews: 214,
    image: 'https://images.unsplash.com/photo-1570172619644-dfd03ed5d881?w=600&h=450&fit=crop',
    popular: true,
    benefits: ['Deep cleansing', 'Exfoliation', 'Extraction', 'Hydrating mask', 'Face & neck massage'],
    included: ['Skin analysis', 'Double cleanse', 'Steam & extraction', 'Mask & massage', 'SPF application'],
    staff: ['Ananya Patel', 'Maya Krishnan'],
    faqs: [{ q: 'How often should I get a facial?', a: 'For best results, we recommend a facial every 4-6 weeks to maintain healthy, glowing skin.' }],
  },
  {
    id: '7',
    category: 'Skin',
    name: 'Chemical Peel',
    description: 'Medical-grade chemical peel to reduce fine lines, acne scars, and hyperpigmentation.',
    price: 4000,
    duration: 60,
    rating: 4.8,
    reviews: 89,
    image: 'https://images.unsplash.com/photo-1512290923902-8a9f81dc236c?w=600&h=450&fit=crop',
    benefits: ['Even tone', 'Reduced fine lines', 'Clearer pores', 'Brighter complexion'],
    included: ['Skin analysis', 'Peel application', 'Soothing mask'],
    staff: ['Ananya Patel'],
  },
  {
    id: '8',
    category: 'Skin',
    name: 'Microdermabrasion',
    description: 'Non-invasive exfoliation treatment for smoother, brighter skin.',
    price: 2800,
    duration: 45,
    rating: 4.7,
    reviews: 156,
    image: 'https://images.unsplash.com/photo-1616394584738-fc6e612e71b9?w=600&h=450&fit=crop',
    benefits: ['Smoother texture', 'Minimized pores', 'Radiant glow'],
    included: ['Cleanse', 'Microdermabrasion', 'Moisturizer'],
    staff: ['Ananya Patel'],
  },
  {
    id: '9',
    category: 'Nails',
    name: 'Manicure & Pedicure',
    description: 'Luxury nail care with paraffin wax treatment and essential oil massage.',
    price: 1800,
    duration: 90,
    rating: 4.7,
    reviews: 342,
    image: 'https://images.unsplash.com/photo-1610992015732-2449b76344bc?w=600&h=450&fit=crop',
    benefits: ['Paraffin wax', 'Cuticle care', 'Essential oil massage', 'Long-wear polish'],
    included: ['Soak', 'Exfoliation', 'Paraffin', 'Polish'],
    staff: ['Maya Krishnan'],
  },
  {
    id: '10',
    category: 'Nails',
    name: 'Gel Extension',
    description: 'Professional gel nail extensions with custom art and design.',
    price: 2500,
    duration: 120,
    rating: 4.8,
    reviews: 198,
    image: 'https://images.unsplash.com/photo-1604654894610-df63bc536371?w=600&h=450&fit=crop',
    benefits: ['Custom design', 'Durable finish', 'Natural look'],
    included: ['Nail prep', 'Extension application', 'Design', 'Top coat'],
    staff: ['Maya Krishnan'],
  },
  {
    id: '11',
    category: 'Makeup',
    name: 'Bridal Makeup',
    description: 'Complete bridal look with trial session, HD makeup, and touch-up kit.',
    price: 12000,
    duration: 180,
    rating: 5.0,
    reviews: 67,
    image: 'https://images.unsplash.com/photo-1522337360788-8b13dee7a37e?w=600&h=450&fit=crop',
    popular: true,
    benefits: ['Trial session included', 'HD airbrush makeup', 'False lashes', 'Touch-up kit', 'Lip & brow services'],
    included: ['Consultation', 'Skin prep', 'Full face makeup', 'Hair styling', 'Touch-up kit'],
    staff: ['Priya Sharma', 'Ananya Patel'],
    faqs: [{ q: 'Should I bring inspiration photos?', a: 'Yes! We encourage you to bring photos of makeup looks you love for reference.' }],
  },
  {
    id: '12',
    category: 'Makeup',
    name: 'Party Makeup',
    description: 'Glamorous evening makeup with long-wear products.',
    price: 3500,
    duration: 60,
    rating: 4.9,
    reviews: 234,
    image: 'https://images.unsplash.com/photo-1487412947147-5cebf100ffc2?w=600&h=450&fit=crop',
    benefits: ['Long-wear formula', 'False lashes', 'Finishing spray'],
    included: ['Skin prep', 'Full face makeup', 'Setting spray'],
    staff: ['Sophia D\u2019Souza'],
  },
  {
    id: '13',
    category: 'Spa',
    name: 'Aromatherapy Massage',
    description: 'Full-body massage with essential oils to relieve stress and tension.',
    price: 4000,
    duration: 90,
    rating: 4.9,
    reviews: 178,
    image: 'https://images.unsplash.com/photo-1544161515-4ab6ce6db874?w=600&h=450&fit=crop',
    popular: true,
    benefits: ['Stress relief', 'Improved circulation', 'Muscle release', 'Aromatherapy oils'],
    included: ['Consultation', 'Full body massage', 'Warm towels'],
    staff: ['Ananya Patel'],
  },
  {
    id: '14',
    category: 'Spa',
    name: 'Body Scrub & Wrap',
    description: 'Exfoliating body treatment with seaweed wrap and hydrating mask.',
    price: 3500,
    duration: 75,
    rating: 4.8,
    reviews: 123,
    image: 'https://images.unsplash.com/photo-1600334089648-b0d9d3028eb2?w=600&h=450&fit=crop',
    benefits: ['Exfoliation', 'Detoxifying wrap', 'Deep hydration'],
    included: ['Dry brushing', 'Scrub', 'Seaweed wrap'],
    staff: ['Maya Krishnan'],
  },
];

export const categories = ['All', 'Hair', 'Skin', 'Nails', 'Makeup', 'Spa'] as const;

export const team: Stylist[] = [
  {
    id: '1',
    name: 'Priya Sharma',
    role: 'Master Stylist & Founder',
    experience: '12 years',
    bio: 'Priya is the visionary behind the salon. With extensive training and a passion for precision cutting, she brings a refined approach to every guest.',
    specialties: ['Hair Cutting', 'Color', 'Bridal', 'Editorial'],
    rating: 4.9,
    reviews: 412,
    image: 'https://images.unsplash.com/photo-1580618672591-eb180b1a973f?w=400&h=500&fit=crop',
    languages: ['English', 'Hindi', 'French'],
    instagram: '@priyasharma',
  },
  {
    id: '2',
    name: 'Ananya Patel',
    role: 'Lead Esthetician',
    experience: '8 years',
    bio: 'Ananya specializes in advanced skincare treatments and creates personalized regimens tailored to each guest\u2019s unique needs.',
    specialties: ['Facials', 'Chemical Peel', 'Microdermabrasion', 'Skin Analysis'],
    rating: 4.8,
    reviews: 289,
    image: 'https://images.unsplash.com/photo-1598346762291-aee88549193f?w=400&h=500&fit=crop',
    languages: ['English', 'Hindi', 'Kannada'],
    instagram: '@ananya.skin',
  },
  {
    id: '3',
    name: 'Rohit Verma',
    role: 'Master Barber',
    experience: '15 years',
    bio: 'With 15 years of experience, Rohit is a master of classic and contemporary barbering. His precision fades and straight-razor shaves are legendary.',
    specialties: ['Classic Cuts', 'Beard Styling', 'Straight Razor', 'Hot Towel Shave'],
    rating: 4.9,
    reviews: 534,
    image: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&h=500&fit=crop',
    languages: ['English', 'Hindi'],
    instagram: '@rohitbarber',
  },
  {
    id: '4',
    name: 'Maya Krishnan',
    role: 'Nail Artist',
    experience: '6 years',
    bio: 'Maya is a talented nail artist known for her intricate designs and meticulous attention to detail, from gel extensions to 3D art.',
    specialties: ['Nail Art', 'Gel Extensions', 'Paraffin', '3D Design'],
    rating: 4.7,
    reviews: 198,
    image: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=400&h=500&fit=crop',
    languages: ['English', 'Tamil', 'Kannada'],
    instagram: '@maya.nails',
  },
  {
    id: '5',
    name: 'Vikram Singh',
    role: 'Hair Color Specialist',
    experience: '10 years',
    bio: 'Vikram is a skilled colorist who creates beautiful transformations using balayage, ombre and precision foiling.',
    specialties: ['Balayage', 'Ombre', 'Color Correction', 'Highlights'],
    rating: 4.8,
    reviews: 267,
    image: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=400&h=500&fit=crop',
    languages: ['English', 'Hindi'],
    instagram: '@vikramcolor',
  },
  {
    id: '6',
    name: 'Sophia D\u2019Souza',
    role: 'Makeup Artist',
    experience: '9 years',
    bio: 'Sophia brings bridal and editorial experience to every look, with meticulous attention to detail and a gentle touch.',
    specialties: ['Bridal', 'Editorial', 'Airbrush', 'Special Effects'],
    rating: 4.9,
    reviews: 178,
    image: 'https://images.unsplash.com/photo-1489424731084-a5d8b219a5bb?w=400&h=500&fit=crop',
    languages: ['English', 'Hindi', 'Konkani'],
    instagram: '@sophiamakeup',
  },
];

export const testimonials = [
  { id: 'r1', name: 'Neha Gupta', text: 'Absolutely stunning results! The team transformed my look completely. The attention to detail is remarkable. I have never felt more confident.', rating: 5, service: 'Signature Haircut', date: '2 weeks ago', avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=100&q=80' },
  { id: 'r2', name: 'Sneha Reddy', text: 'I have been coming here for years. The consistency in quality and service is unmatched. Best salon in the city. Priya is a magician with scissors!', rating: 5, service: 'Hair Color & Highlights', date: '1 month ago', avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=100&q=80' },
  { id: 'r3', name: 'Arjun Mehta', text: 'As a groom, I wanted to look my best on my wedding day. Rohit gave me the perfect cut and beard style. The hot towel shave was incredible.', rating: 5, service: 'Classic Cut & Shave', date: '3 weeks ago', avatar: 'https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=100&q=80' },
  { id: 'r4', name: 'Kavita Desai', text: 'The bridal package was worth every penny. My makeup lasted all day and I felt like a queen. Sophia understood exactly what I wanted.', rating: 5, service: 'Bridal Makeup', date: '2 months ago', avatar: 'https://images.unsplash.com/photo-1489424731084-a5d8b219a5bb?w=100&q=80' },
  { id: 'r5', name: 'Ritu Agarwal', text: 'The keratin treatment changed my hair completely. So smooth and manageable now. The staff is incredibly professional and the ambiance is top-notch.', rating: 5, service: 'Keratin Treatment', date: '1 month ago', avatar: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=100&q=80' },
  { id: 'r6', name: 'Divya Kumar', text: 'Ananya gave me the best facial I have ever had. My skin was glowing for weeks. The organic products they use make a noticeable difference.', rating: 5, service: 'Luxury Facial', date: '3 weeks ago', avatar: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=100&q=80' },
  { id: 'r7', name: 'Vikram Joshi', text: 'Great barber shop experience. Rohit really knows his craft. The attention to detail in the beard shaping is exceptional.', rating: 5, service: 'Beard Styling', date: '1 week ago', avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=100&q=80' },
  { id: 'r8', name: 'Pooja Sharma', text: 'Maya did incredible nail art for my sister\u2019s wedding. Everyone was asking where I got them done. The gel extensions lasted for weeks.', rating: 5, service: 'Gel Extensions', date: '2 weeks ago', avatar: 'https://images.unsplash.com/photo-1580618672591-eb180b1a973f?w=100&q=80' },
  { id: 'r9', name: 'Anita Menon', text: 'The spa escape package was exactly what I needed. A full day of pure relaxation. The massage was heavenly and the facial left my skin radiant.', rating: 5, service: 'Spa Escape Package', date: '1 month ago', avatar: 'https://images.unsplash.com/photo-1598346762291-aee88549193f?w=100&q=80' },
  { id: 'r10', name: 'Rahul Kapoor', text: 'I am particular about my hair and Vikram exceeded my expectations. The balayage looks natural and the color is perfect. Finally found my go-to salon.', rating: 5, service: 'Balayage', date: '3 weeks ago', avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&q=80' },
];

export const galleryItems = [
  { id: '1', category: 'Hair', image: 'https://images.unsplash.com/photo-1562322140-8baeececf3df?w=600&q=80', title: 'Balayage Transformation' },
  { id: '2', category: 'Hair', image: 'https://images.unsplash.com/photo-1560066984-138dadb4c035?w=600&q=80', title: 'Precision Haircut' },
  { id: '3', category: 'Skin', image: 'https://images.unsplash.com/photo-1570172619644-dfd03ed5d881?w=600&q=80', title: 'Glowing Skin Facial' },
  { id: '4', category: 'Nails', image: 'https://images.unsplash.com/photo-1604654894610-df63bc536371?w=600&q=80', title: 'Artistic Nail Design' },
  { id: '5', category: 'Bridal', image: 'https://images.unsplash.com/photo-1596462502278-27bfdc403348?w=600&q=80', title: 'Bridal Elegance' },
  { id: '6', category: 'Spa', image: 'https://images.unsplash.com/photo-1544161515-4ab6ce6db874?w=600&q=80', title: 'Luxury Spa Treatment' },
  { id: '7', category: 'Hair', image: 'https://images.unsplash.com/photo-1567894340315-735d7c361db7?w=600&q=80', title: 'Voluminous Blow-Dry' },
  { id: '8', category: 'Skin', image: 'https://images.unsplash.com/photo-1512290923902-8a9f81dc236c?w=600&q=80', title: 'Skincare Results' },
  { id: '9', category: 'Nails', image: 'https://images.unsplash.com/photo-1610992015732-2449b76344bc?w=600&q=80', title: 'Gel Extension Art' },
  { id: '10', category: 'Hair', image: 'https://images.unsplash.com/photo-1595475884562-073c30d45670?w=600&q=80', title: 'Hair Spa Treatment' },
  { id: '11', category: 'Bridal', image: 'https://images.unsplash.com/photo-1522337360788-8b13dee7a37e?w=600&q=80', title: 'Bridal Makeup Look' },
  { id: '12', category: 'Spa', image: 'https://images.unsplash.com/photo-1600334089648-b0d9d3028eb2?w=600&q=80', title: 'Wellness Retreat' },
];

export const galleryCategories = ['All', 'Hair', 'Skin', 'Nails', 'Bridal', 'Spa'];

export type Post = {
  id: string;
  title: string;
  excerpt: string;
  category: string;
  date: string;
  author: string;
  readTime: string;
  image: string;
  featured?: boolean;
  content?: string;
  tags?: string[];
};

export const posts: Post[] = [
  {
    id: '1',
    title: 'Summer Hair Care: Essential Tips for Healthy, Glowing Hair',
    excerpt: 'Protect your hair from sun damage with our expert guide to summer hair care routines and products.',
    category: 'Hair Care',
    date: 'Jun 28, 2026',
    author: 'Priya Sharma',
    readTime: '5 min read',
    image: 'https://images.unsplash.com/photo-1562322140-8baeececf3df?w=800&q=80',
    featured: true,
    tags: ['Hair Care', 'Summer', 'Beauty Tips'],
    content: `Summer is here, and while we love the sunshine, our hair often bears the brunt of UV rays, humidity, and heat styling. Here are our top tips for keeping your hair healthy and beautiful all season long.

First, invest in a good UV protectant spray for your hair. Just like your skin, your hair needs protection from the sun's harmful rays. Look for products with SPF protection specifically formulated for hair.

Second, adjust your washing routine. In summer, you might be tempted to wash your hair more frequently, but this can strip natural oils. Try using a dry shampoo between washes to absorb excess oil.

Third, deep condition regularly. The combination of sun, salt water, and chlorine can leave hair dry and brittle. A weekly deep conditioning treatment will help restore moisture and maintain shine.`,
  },
  {
    id: '2',
    title: 'The Complete Guide to Bridal Beauty: Hair, Makeup & Skincare',
    excerpt: 'Everything you need to know about preparing for your wedding day beauty routine.',
    category: 'Bridal',
    date: 'Jun 25, 2026',
    author: 'Sophia D\u2019Souza',
    readTime: '8 min read',
    image: 'https://images.unsplash.com/photo-1596462502278-27bfdc403348?w=800&q=80',
    featured: true,
    tags: ['Bridal', 'Wedding', 'Makeup', 'Hair'],
    content: `Your wedding day is one of the most photographed days of your life, and you deserve to look and feel absolutely radiant. In this comprehensive guide, we walk you through everything you need to know about bridal beauty.

Start your skincare routine at least 3 months before the wedding. Consistency is key. Regular facials, a good home skincare routine, and staying hydrated will ensure your skin is glowing on the big day.

Schedule your bridal makeup trial 4-6 weeks before the wedding. Bring photos of looks you love, and don't be afraid to speak up about what you like or don't like. The trial is the time to experiment.

For your hair, consider the style that will complement your dress and veil. A trial run with your hairstylist is essential to ensure everything stays in place throughout the day.`,
  },
  {
    id: '3',
    title: 'Skincare Routine: Why Professional Facials Matter',
    excerpt: 'Discover the benefits of professional facial treatments and how they complement your daily skincare routine.',
    category: 'Skin Care',
    date: 'Jun 20, 2026',
    author: 'Ananya Patel',
    readTime: '6 min read',
    image: 'https://images.unsplash.com/photo-1570172619644-dfd03ed5d881?w=800&q=80',
    tags: ['Skincare', 'Facials', 'Beauty'],
    content: `While a good home skincare routine is essential, professional facials offer benefits that you simply cannot achieve at home. Here is why incorporating regular facials into your beauty regimen is worth it.

Professional estheticians have the training and tools to properly analyze your skin and recommend treatments tailored to your specific concerns. They can perform extractions safely and effectively.

Medical-grade products used in professional facials contain higher concentrations of active ingredients than over-the-counter products. This means more visible results in less time.

Regular monthly facials help maintain skin health, prevent issues before they start, and give your complexion a radiant boost that no amount of at-home products can replicate.`,
  },
  {
    id: '4',
    title: '5 Nail Art Trends Taking Over This Season',
    excerpt: 'From minimalist designs to bold statements, explore the hottest nail art trends of the season.',
    category: 'Nails',
    date: 'Jun 18, 2026',
    author: 'Maya Krishnan',
    readTime: '4 min read',
    image: 'https://images.unsplash.com/photo-1604654894610-df63bc536371?w=800&q=80',
    tags: ['Nails', 'Trends'],
    content: `Nail art has never been more expressive. This season is all about personal, wearable statements — from subtle chrome finishes to bold, painterly designs.

Chrome and metallic finishes are everywhere, catching the light with a liquid-metal sheen that pairs beautifully with minimal styling.

French reimagined remains a favourite: negative-space tips, coloured fades, and micro-details that keep the classic silhouette fresh.

Finally, textured effects — velvet, caviar, and 3D accents — are making a comeback for evenings and events. Book a consultation and we will design the set that suits you.`,
  },
  {
    id: '5',
    title: 'Beard Grooming 101: A Complete Guide for Modern Gentlemen',
    excerpt: 'Master the art of beard grooming with professional tips from our master barber.',
    category: 'Grooming',
    date: 'Jun 15, 2026',
    author: 'Rohit Verma',
    readTime: '5 min read',
    image: 'https://images.unsplash.com/photo-1503951914875-452cb67b3cbe?w=800&q=80',
    tags: ['Grooming', 'Beard'],
    content: `A great beard starts below the surface. Consistent skincare, the right tools, and regular shaping are the pillars of a beard that looks intentional rather than neglected.

Wash and condition the beard two to three times a week with a dedicated beard wash. Daily oiling keeps the hair soft and the skin beneath calm.

Visit your barber every three to four weeks for a sculpt. A professional will maintain your neckline, cheek line, and shape so it grows in cleanly.

And above all, be patient. A beard takes time to settle into its final shape — resist the urge to over-trim early on.`,
  },
  {
    id: '6',
    title: 'The Benefits of Keratin Treatments for All Hair Types',
    excerpt: 'Learn how keratin treatments can transform your hair, regardless of your hair type or texture.',
    category: 'Hair Care',
    date: 'Jun 12, 2026',
    author: 'Priya Sharma',
    readTime: '6 min read',
    image: 'https://images.unsplash.com/photo-1595476108010-b4d1f102b1b1?w=800&q=80',
    tags: ['Hair Care', 'Keratin'],
    content: `Keratin is the protein that makes up your hair, so a smoothing treatment is less a style change and more a restoration. Formaldehyde-free formulas bond the protein back into the hair shaft.

The result is hair that resists humidity, dries faster, and stays smooth between washes — a genuine time-saver for textured and curly hair alike.

Treatments last between two and four months depending on care. Use sulphate-free products and avoid tight elastics to make yours last.

Not sure if keratin is right for you? Book a free consultation and we will assess your hair honestly — sometimes the answer is less, not more.`,
  },
  {
    id: '7',
    title: 'Stress Relief Through Aromatherapy Massage',
    excerpt: 'Explore how aromatherapy massage can help reduce stress and improve your overall well-being.',
    category: 'Wellness',
    date: 'Jun 10, 2026',
    author: 'Ananya Patel',
    readTime: '4 min read',
    image: 'https://images.unsplash.com/photo-1544161515-4ab6ce6db874?w=800&q=80',
    tags: ['Wellness', 'Massage'],
    content: `Aromatherapy pairs therapeutic massage with plant essences chosen for their effect on the nervous system. Lavender, chamomile, and ylang-ylang are our most calming blends.

Beyond relaxation, regular massage reduces cortisol, improves sleep, and eases tension held in the neck, shoulders, and lower back.

We tailor the oil blend and pressure to you during a short consultation at the start of each session.

Half an hour of quiet can reset a whole week. Consider it an appointment with yourself rather than a luxury.`,
  },
  {
    id: '8',
    title: 'Winter Skincare: Adjusting Your Routine for Cold Weather',
    excerpt: 'Protect and nourish your skin during the colder months with these expert skincare tips.',
    category: 'Skin Care',
    date: 'Jun 5, 2026',
    author: 'Ananya Patel',
    readTime: '5 min read',
    image: 'https://images.unsplash.com/photo-1512290923902-8a9f81dc236c?w=800&q=80',
    tags: ['Skincare', 'Winter'],
    content: `Cold air holds less moisture, and indoor heating draws it out further. Your skin barrier works harder in winter, so the routine should lean into protection and repair.

Swap foaming cleansers for cream or oil-based ones that cleanse without stripping. Follow with a richer moisturiser while skin is still damp to lock in hydration.

Incorporate a barrier-repair serum with ceramides or peptides, and never skip SPF — UV reaches you even on grey days.

Once a month, treat yourself to a professional facial. Extractions and deeper exfoliation keep winter skin clear when home routines are doing the bare minimum.`,
  },
];

export const blogCategories = ['All', 'Hair Care', 'Skin Care', 'Bridal', 'Nails', 'Grooming', 'Wellness'];

export const packages = [
  {
    id: 'p1',
    name: 'Bridal Glow Package',
    category: 'Bridal',
    desc: 'Everything you need for your special day. From hair and makeup to skincare, we ensure you look absolutely radiant.',
    price: '₹25,000',
    originalPrice: '₹32,000',
    savings: '22%',
    duration: 'Full Day',
    image: 'https://images.unsplash.com/photo-1596462502278-27bfdc403348?w=800&q=80',
    includes: ['Bridal Makeup Trial', 'HD Airbrush Makeup', 'Hair Styling', 'Luxury Facial', 'Manicure & Pedicure', 'Touch-up Kit', 'Fresh Flower Arrangement'],
  },
  {
    id: 'p2',
    name: 'Spa Escape Package',
    category: 'Spa',
    desc: 'A full day of relaxation and rejuvenation. Unwind with our most luxurious spa treatments in a serene environment.',
    price: '₹8,500',
    originalPrice: '₹11,000',
    savings: '23%',
    duration: '4 Hours',
    image: 'https://images.unsplash.com/photo-1544161515-4ab6ce6db874?w=800&q=80',
    includes: ['Aromatherapy Massage', 'Luxury Facial', 'Body Scrub & Wrap', 'Manicure & Pedicure', 'Herbal Tea & Refreshments'],
  },
  {
    id: 'p3',
    name: 'Hair Transformation',
    category: 'Hair',
    desc: 'Complete hair makeover for those looking to dramatically change their look.',
    price: '₹9,999',
    originalPrice: '₹13,500',
    savings: '26%',
    duration: '3-4 Hours',
    image: 'https://images.unsplash.com/photo-1562322140-8baeececf3df?w=800&q=80',
    includes: ['Consultation', 'Hair Color/Highlights', 'Keratin Treatment', 'Signature Haircut', 'Blow-Dry & Styling', 'Hair Care Products'],
  },
  {
    id: 'p4',
    name: 'Beauty Essentials',
    category: 'Beauty',
    desc: 'Curated collection of our most popular beauty services. Perfect for a complete pampering session.',
    price: '₹5,500',
    originalPrice: '₹7,000',
    savings: '21%',
    duration: '2 Hours',
    image: 'https://images.unsplash.com/photo-1610992015732-2449b76344bc?w=800&q=80',
    includes: ['Luxury Facial', 'Manicure', 'Pedicure', 'Eyebrow Shaping', 'Makeup Touch-up'],
  },
  {
    id: 'p5',
    name: 'Grooming Package',
    category: 'Grooming',
    desc: 'Designed for the modern gentleman. Grooming services for a polished, confident look.',
    price: '₹3,500',
    originalPrice: '₹4,800',
    savings: '27%',
    duration: '90 min',
    image: 'https://images.unsplash.com/photo-1503951914875-452cb67b3cbe?w=800&q=80',
    includes: ['Signature Haircut', 'Beard Styling', 'Facial', 'Head Massage', 'Shoe Shine'],
  },
  {
    id: 'p6',
    name: 'Wellness Retreat',
    category: 'Wellness',
    desc: 'Holistic wellness package combining body treatments, relaxation therapies, and mindfulness.',
    price: '₹12,000',
    originalPrice: '₹15,500',
    savings: '23%',
    duration: '5 Hours',
    image: 'https://images.unsplash.com/photo-1600334089648-b0d9d3028eb2?w=800&q=80',
    includes: ['Full Body Massage', 'Body Scrub', 'Body Wrap', 'Luxury Facial', 'Scalp Treatment', 'Herbal Steam', 'Wellness Tea & Snacks'],
  },
];

export const packageCategories = ['All', 'Bridal', 'Spa', 'Hair', 'Beauty', 'Grooming', 'Wellness'];

export const memberships = [
  {
    id: 'silver',
    name: 'Silver',
    price: 999,
    period: 'month',
    desc: 'Perfect for occasional visits. Enjoy great savings and priority access.',
    featured: false,
    perks: ['10% off all services', 'Priority booking', 'Free annual consultation', 'Birthday bonus treatment', 'Exclusive member offers'],
  },
  {
    id: 'gold',
    name: 'Gold',
    price: 1999,
    period: 'month',
    desc: 'Our most popular plan. Significant savings for regular customers with added perks.',
    featured: true,
    perks: ['20% off all services', 'VIP priority booking', 'Free haircut every quarter', 'Free facial every quarter', 'Birthday bonus + gift', 'Exclusive events access', 'Guest pass (1/year)'],
  },
  {
    id: 'platinum',
    name: 'Platinum',
    price: 3999,
    period: 'month',
    desc: 'The ultimate luxury experience. Unlimited benefits for our most valued customers.',
    featured: false,
    perks: ['30% off all services', 'VIP priority booking', 'Unlimited express services', 'Free treatment monthly', 'Free haircut monthly', 'Birthday bonus + gift', 'Exclusive events + previews', 'Guest pass (2/year)', 'Complimentary add-ons', 'Dedicated concierge'],
  },
];

export const membershipComparison = [
  { label: 'Monthly Fee', silver: '₹999', gold: '₹1,999', platinum: '₹3,999' },
  { label: 'Service Discount', silver: '10%', gold: '20%', platinum: '30%' },
  { label: 'Priority Booking', silver: true, gold: true, platinum: true },
  { label: 'Free Haircut', silver: false, gold: 'Quarterly', platinum: 'Monthly' },
  { label: 'Free Facial', silver: false, gold: 'Quarterly', platinum: 'Monthly' },
  { label: 'Free Treatment', silver: false, gold: false, platinum: 'Monthly' },
  { label: 'Birthday Bonus', silver: 'Treatment', gold: 'Treatment + Gift', platinum: 'Gift' },
  { label: 'Guest Pass', silver: false, gold: '1/year', platinum: '2/year' },
  { label: 'Events Access', silver: false, gold: true, platinum: true },
  { label: 'Dedicated Concierge', silver: false, gold: false, platinum: true },
];

export const faqs = [
  { q: 'What should I bring to my appointment?', a: 'Just bring yourself! We provide all products and equipment. If you have specific product preferences or allergies, please let us know when booking.' },
  { q: 'How early should I arrive?', a: 'We recommend arriving 10-15 minutes early to check in, complete any paperwork, and discuss your preferences with your stylist over complimentary refreshments.' },
  { q: 'What is your cancellation policy?', a: 'We kindly request 24-hour notice for cancellations or rescheduling. Late cancellations may result in a 50% service fee.' },
  { q: 'Do you offer gift certificates?', a: 'Yes! We offer digital and physical gift certificates in any denomination, beautifully packaged and perfect for any occasion.' },
  { q: 'Are your products cruelty-free?', a: 'Yes, we carefully select products that align with our commitment to quality and responsible practices.' },
  { q: 'Do you offer parking?', a: 'Yes, we offer complimentary valet parking for all our customers. There is also a public parking garage adjacent to our building.' },
];

export const stats = [
  { value: '15+', label: 'Years of craft' },
  { value: '25K+', label: 'Happy clients' },
  { value: '50K+', label: 'Appointments completed' },
  { value: '4.9', label: 'Average rating' },
];

export const fallbackHours = [
  { day: 'Monday — Saturday', time: '9:00 AM — 8:00 PM' },
  { day: 'Sunday', time: '10:00 AM — 6:00 PM' },
];

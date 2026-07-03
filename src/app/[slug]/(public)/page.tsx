'use client';

import React, { useEffect, useState, useRef, useCallback } from 'react';
import { useParams, useRouter } from 'next/navigation';
import { Typography, Spin, Alert, Form, Modal } from 'antd';
import apiUtil from '../../../utils/api';
import { ApiGetSalonBySlug } from '../../../utils/api.constant';
import { eResultCode } from '../../../utils/enum';
import LuxuryNavbar from '../../../components/website/luxury/LuxuryNavbar';
import LuxuryFooter from '../../../components/website/luxury/LuxuryFooter';

const { Text, Paragraph } = Typography;

/* ── Data ── */
const servicesData = [
  { id: 's1', name: 'Classic Haircut', price: 45, duration: 45, description: 'Precision cut tailored to your face shape and style preferences.', rating: 4.8, reviews: 124, image: 'https://images.unsplash.com/photo-1560066984-138dadb4c035?w=600&h=450&fit=crop' },
  { id: 's2', name: 'Color & Highlights', price: 120, duration: 120, description: 'Professional color services with premium products for vibrant, long-lasting results.', rating: 4.9, reviews: 89, image: 'https://images.unsplash.com/photo-1563241527-3004b7be0ffd?w=600&h=450&fit=crop' },
  { id: 's3', name: 'Luxury Facial', price: 85, duration: 60, description: 'Rejuvenating facial treatment using organic products for radiant skin.', rating: 4.7, reviews: 156, image: 'https://images.unsplash.com/photo-1570172619644-dfd03ed5d881?w=600&h=450&fit=crop' },
  { id: 's4', name: 'Spa Manicure', price: 55, duration: 45, description: 'Luxurious hand treatment with exfoliation, mask, and premium polish.', rating: 4.6, reviews: 203, image: 'https://images.unsplash.com/photo-1604654894610-df63bc536371?w=600&h=450&fit=crop' },
  { id: 's5', name: 'Blowout & Styling', price: 65, duration: 50, description: 'Professional blow-dry and styling for any occasion.', rating: 4.8, reviews: 178, image: 'https://images.unsplash.com/photo-1522337360788-8b13dee7a37e?w=600&h=450&fit=crop' },
  { id: 's6', name: 'Keratin Treatment', price: 200, duration: 150, description: 'Smoothing treatment that eliminates frizz and adds shine for weeks.', rating: 4.9, reviews: 67, image: 'https://images.unsplash.com/photo-1527668752968-14dc70a27c95?w=600&h=450&fit=crop' },
];

const popularData = [
  { id: 'p1', name: 'VIP Bridal Package', price: 450, duration: 240, description: 'Complete bridal transformation including hair, makeup, facial, and trial session.', rating: 5.0, reviews: 42, image: 'https://images.unsplash.com/photo-1465495976277-4387d4b0b4c6?w=600&h=450&fit=crop', badge: 'Most Popular' },
  { id: 'p2', name: 'Hair & Scalp Therapy', price: 95, duration: 75, description: 'Deep cleansing and nourishing treatment for healthy, vibrant hair.', rating: 4.8, reviews: 91, image: 'https://images.unsplash.com/photo-1521590832167-6bcbf5b1e0e0?w=600&h=450&fit=crop', badge: 'Best Seller' },
  { id: 'p3', name: 'Signature Massage', price: 110, duration: 60, description: 'Full-body relaxation massage using essential oils and hot stones.', rating: 4.9, reviews: 134, image: 'https://images.unsplash.com/photo-1544161515-4ab6ce6db874?w=600&h=450&fit=crop', badge: 'New' },
];

const teamData = [
  { id: 't1', name: 'Sophia Williams', role: 'Master Stylist', experience: '15 years', rating: 4.9, reviews: 312, specialties: ['Precision Cuts', 'Creative Color', 'Editorial Styling'], avatar: 'https://images.unsplash.com/photo-1580618672591-eb180b1a973f?w=300&h=300&fit=crop', bio: 'Award-winning stylist with a passion for transformative haircuts.' },
  { id: 't2', name: 'James Rodriguez', role: 'Senior Colorist', experience: '12 years', rating: 4.8, reviews: 267, specialties: ['Balayage', 'Ombre', 'Color Correction'], avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=300&h=300&fit=crop', bio: 'Known for innovative color techniques and balayage mastery.' },
  { id: 't3', name: 'Emily Chen', role: 'Lead Esthetician', experience: '10 years', rating: 4.7, reviews: 198, specialties: ['Advanced Facials', 'Skin Care', 'Waxing'], avatar: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=300&h=300&fit=crop', bio: 'Holistic skincare expertise from top spas worldwide.' },
  { id: 't4', name: 'Marcus Johnson', role: 'Barber & Grooming', experience: '8 years', rating: 4.8, reviews: 145, specialties: ['Beard Styling', 'Hot Towel Shave', 'Men\'s Cuts'], avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=300&h=300&fit=crop', bio: 'Specializing in precision barbering and traditional grooming.' },
];

const testimonialsData = [
  { id: 'rev1', name: 'Sarah Mitchell', text: 'Absolutely stunning results! The team transformed my look completely. I\'ve never felt more confident. The attention to detail and genuine care made the experience unforgettable.', rating: 5, service: 'Color & Highlights', avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=100&h=100&fit=crop' },
  { id: 'rev2', name: 'David Chen', text: 'Best barber experience I\'ve ever had. Marcus is a true artist. The hot towel shave is absolutely worth every penny and then some.', rating: 5, service: 'Classic Haircut', avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&h=100&fit=crop' },
  { id: 'rev3', name: 'Jessica Kim', text: 'The facial was heavenly. You can tell they use only the highest quality products. My skin has never looked better. I\'m already booked for next month.', rating: 5, service: 'Luxury Facial', avatar: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=100&h=100&fit=crop' },
  { id: 'rev4', name: 'Michael Roberts', text: 'I drive 45 minutes just to come here. That says everything about the quality. World-class service every single time without fail.', rating: 5, service: 'Keratin Treatment', avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=100&h=100&fit=crop' },
  { id: 'rev5', name: 'Amanda Foster', text: 'The VIP Bridal Package was perfection. Every detail was meticulously planned and executed. Made my wedding day absolutely magical.', rating: 5, service: 'VIP Bridal Package', avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=100&h=100&fit=crop' },
];

const galleryData = [
  { id: 'g1', src: 'https://images.unsplash.com/photo-1560066984-138dadb4c035?w=600&h=600&fit=crop', alt: 'Precision Haircut' },
  { id: 'g2', src: 'https://images.unsplash.com/photo-1563241527-3004b7be0ffd?w=600&h=600&fit=crop', alt: 'Color Transformation' },
  { id: 'g3', src: 'https://images.unsplash.com/photo-1570172619644-dfd03ed5d881?w=600&h=600&fit=crop', alt: 'Luxury Facial' },
  { id: 'g4', src: 'https://images.unsplash.com/photo-1604654894610-df63bc536371?w=600&h=600&fit=crop', alt: 'Spa Manicure' },
  { id: 'g5', src: 'https://images.unsplash.com/photo-1522337360788-8b13dee7a37e?w=600&h=600&fit=crop', alt: 'Editorial Styling' },
  { id: 'g6', src: 'https://images.unsplash.com/photo-1527668752968-14dc70a27c95?w=600&h=600&fit=crop', alt: 'Keratin Treatment' },
  { id: 'g7', src: 'https://images.unsplash.com/photo-1487412912498-0447578fcca8?w=600&h=600&fit=crop', alt: 'Makeup Artistry' },
  { id: 'g8', src: 'https://images.unsplash.com/photo-1519699047748-de8e457a634e?w=600&h=600&fit=crop', alt: 'Nail Art' },
];

const blogData = [
  { id: 'b1', title: 'Spring Hair Trends 2024: What\'s In This Season', category: 'Hair', excerpt: 'Discover the hottest hair trends for the spring season, from lived-in color to textured cuts.', image: 'https://images.unsplash.com/photo-1527799820374-dcf8d9d4a388?w=600&h=400&fit=crop', date: 'Mar 15, 2024', author: 'Sophia Williams' },
  { id: 'b2', title: 'The Ultimate Skincare Routine for Glowing Skin', category: 'Skincare', excerpt: 'Expert tips and product recommendations for achieving radiant, healthy-looking skin.', image: 'https://images.unsplash.com/photo-1570172619644-dfd03ed5d881?w=600&h=400&fit=crop', date: 'Mar 10, 2024', author: 'Emily Chen' },
  { id: 'b3', title: 'Bridal Beauty Prep: Your Week-By-Week Guide', category: 'Weddings', excerpt: 'Everything you need to know about preparing your hair, skin and nails for the big day.', image: 'https://images.unsplash.com/photo-1465495976277-4387d4b0b4c6?w=600&h=400&fit=crop', date: 'Mar 5, 2024', author: 'Beauty Team' },
];

const membershipsData = [
  { id: 'm1', name: 'Silver', price: 49, per: 'month', perks: ['10% off all services', 'Free blow-dry (monthly)', 'Priority booking', 'Birthday treat'], popular: false },
  { id: 'm2', name: 'Gold', price: 89, per: 'month', perks: ['20% off all services', 'Free blow-dry (weekly)', 'Free add-on service', 'Birthday month special', 'Exclusive event access'], popular: true },
  { id: 'm3', name: 'Platinum', price: 149, per: 'month', perks: ['30% off all services', 'Unlimited blow-dries', 'Free premium treatment (yearly)', 'Exclusive event invites', 'Complimentary products', 'Guest passes'], popular: false },
];

const packagesData = [
  { id: 'pk1', name: 'Date Night Ready', price: 175, original: 210, items: ['Blowout & Styling', 'Gel Manicure', 'Lip & Brow Wax'], popular: false },
  { id: 'pk2', name: 'Total Transformation', price: 320, original: 395, items: ['Haircut & Color', 'Luxury Facial', 'Spa Manicure & Pedicure'], popular: true },
  { id: 'pk3', name: 'Ultimate Spa Day', price: 495, original: 620, items: ['Signature Massage', 'Luxury Facial', 'Spa Pedicure', 'Scalp Treatment', 'Champagne Service'], popular: false },
];

const faqData = [
  { q: 'What should I bring to my appointment?', a: 'Just bring yourself! We provide all products and equipment. If you have specific product preferences or allergies, please let us know when booking.' },
  { q: 'How early should I arrive?', a: 'We recommend arriving 10-15 minutes early to check in, complete any paperwork, and discuss your preferences with your stylist over complimentary refreshments.' },
  { q: 'What is your cancellation policy?', a: 'We kindly request 24-hour notice for cancellations or rescheduling. Late cancellations may result in a 50% service fee.' },
  { q: 'Do you offer gift certificates?', a: 'Yes! We offer digital and physical gift certificates in any denomination, beautifully packaged and perfect for any occasion.' },
  { q: 'Are your products cruelty-free?', a: 'Absolutely. We are committed to using only cruelty-free, ethically sourced, and environmentally responsible professional products.' },
  { q: 'Do you offer parking?', a: 'Yes, we offer complimentary valet parking for all our clients. There is also a public parking garage adjacent to our building.' },
];

const whyChooseData = [
  { icon: '✦', title: 'Expert Artisans', desc: 'Our team comprises award-winning professionals with decades of combined experience in the beauty industry.', color: '#f0ebe3' },
  { icon: '✧', title: 'Premium Products', desc: 'We use only the finest cruelty-free products from leading luxury brands worldwide.', color: '#e8e0d5' },
  { icon: '◈', title: 'Personalized Experience', desc: 'Every service is tailored to your unique needs, preferences, and beauty goals.', color: '#f0ebe3' },
];

const statsData = [
  { value: '15+', label: 'Years of Excellence' },
  { value: '25K+', label: 'Happy Clients' },
  { value: '50K+', label: 'Appointments' },
  { value: '8', label: 'Industry Awards' },
];

const instagramData = galleryData.slice(0, 6);

/* ── Star Component ── */
const Stars = ({ rating, size = 14 }: { rating: number; size?: number }) => (
  <span className="luxe-rating" style={{ fontSize: size }}>
    {[1, 2, 3, 4, 5].map((i) => (
      <svg key={i} width={size} height={size} viewBox="0 0 24 24" fill={i <= Math.round(rating) ? 'currentColor' : 'none'} stroke="currentColor" strokeWidth="2">
        <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" />
      </svg>
    ))}
  </span>
);

/* ── Service Card ── */
const ServiceCard = ({ service, onBook }: { service: typeof servicesData[0]; onBook: () => void }) => (
  <div className="luxe-service-card">
    <div className="card-image-wrap">
      <img src={service.image} alt={service.name} loading="lazy" />
      <div className="card-price-badge">${service.price}</div>
      <div className="card-quick-book">
        <button onClick={onBook} className="luxe-btn luxe-btn-primary luxe-btn-sm" style={{ boxShadow: 'var(--shadow-modal)', whiteSpace: 'nowrap' }}>
          Quick Book
        </button>
      </div>
    </div>
    <div className="luxe-card-body">
      <h4 className="luxe-heading-4" style={{ margin: '0 0 var(--space-1)' }}>{service.name}</h4>
      <div style={{ display: 'flex', alignItems: 'center', gap: 'var(--space-3)', marginBottom: 'var(--space-2)' }}>
        <span className="luxe-card-duration">
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><circle cx="12" cy="12" r="10"/><polyline points="12 6 12 12 16 14"/></svg>
          {service.duration} min
        </span>
        <Stars rating={service.rating} />
        <span style={{ fontSize: 'var(--text-xs)', color: 'var(--luxe-text-tertiary)' }}>({service.reviews})</span>
      </div>
      <p className="luxe-body-text" style={{ margin: 0, fontSize: 'var(--text-sm)' }}>{service.description}</p>
    </div>
  </div>
);

/* ── Popular Treatment Card ── */
const PopularCard = ({ item, onBook }: { item: typeof popularData[0]; onBook: () => void }) => (
  <div className="luxe-service-card" style={{ position: 'relative' }}>
    {item.badge && (
      <span style={{ position: 'absolute', top: 'var(--space-3)', left: 'var(--space-3)', zIndex: 2 }}>
        <span className={`luxe-badge ${item.badge === 'Most Popular' ? 'luxe-badge-gold' : item.badge === 'Best Seller' ? 'luxe-badge-emerald' : 'luxe-badge-purple'}`}>
          {item.badge}
        </span>
      </span>
    )}
    <div className="card-image-wrap">
      <img src={item.image} alt={item.name} loading="lazy" />
      <div className="card-price-badge">${item.price}</div>
      <div className="card-quick-book">
        <button onClick={onBook} className="luxe-btn luxe-btn-primary luxe-btn-sm" style={{ boxShadow: 'var(--shadow-modal)', whiteSpace: 'nowrap' }}>
          Quick Book
        </button>
      </div>
    </div>
    <div className="luxe-card-body">
      <h4 className="luxe-heading-4" style={{ margin: '0 0 var(--space-1)' }}>{item.name}</h4>
      <div style={{ display: 'flex', alignItems: 'center', gap: 'var(--space-3)', marginBottom: 'var(--space-2)' }}>
        <span className="luxe-card-duration">
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><circle cx="12" cy="12" r="10"/><polyline points="12 6 12 12 16 14"/></svg>
          {item.duration} min
        </span>
        <Stars rating={item.rating} />
        <span style={{ fontSize: 'var(--text-xs)', color: 'var(--luxe-text-tertiary)' }}>({item.reviews})</span>
      </div>
      <p className="luxe-body-text" style={{ margin: 0, fontSize: 'var(--text-sm)' }}>{item.description}</p>
    </div>
  </div>
);

/* ── Stylist Card ── */
const StylistCard = ({ stylist, onBook }: { stylist: typeof teamData[0]; onBook: () => void }) => (
  <div className="luxe-stylist-card" style={{ paddingBottom: 'var(--space-6)' }}>
    <img src={stylist.avatar} alt={stylist.name} className="stylist-image" loading="lazy" />
    <h4 className="luxe-heading-4" style={{ margin: '0 0 var(--space-1)' }}>{stylist.name}</h4>
    <p style={{ fontSize: 'var(--text-sm)', color: 'var(--luxe-gold)', fontWeight: 600, margin: '0 0 var(--space-1)' }}>{stylist.role}</p>
    <p style={{ fontSize: 'var(--text-xs)', color: 'var(--luxe-text-tertiary)', margin: '0 0 var(--space-3)' }}>{stylist.experience} • {stylist.reviews} reviews</p>
    <div style={{ display: 'flex', justifyContent: 'center', marginBottom: 'var(--space-3)' }}>
      <Stars rating={stylist.rating} />
    </div>
    <div className="stylist-specialties">
      {stylist.specialties.map((s) => (
        <span key={s} className="stylist-specialty-tag">{s}</span>
      ))}
    </div>
    <p className="luxe-body-text" style={{ padding: '0 var(--space-6)', margin: 'var(--space-3) 0 var(--space-4)', fontSize: 'var(--text-sm)' }}>{stylist.bio}</p>
    <button onClick={onBook} className="luxe-btn luxe-btn-gold-outline luxe-btn-sm">Book with {stylist.name.split(' ')[0]}</button>
  </div>
);

/* ── Review Card ── */
const ReviewCard = ({ review }: { review: typeof testimonialsData[0] }) => (
  <div className="luxe-review-card">
    <div className="review-stars">
      {[1, 2, 3, 4, 5].map((i) => (
        <svg key={i} width="16" height="16" viewBox="0 0 24 24" fill="currentColor" stroke="currentColor" strokeWidth="2">
          <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" />
        </svg>
      ))}
    </div>
    <p className="review-text">"{review.text}"</p>
    <div className="review-author">
      <img src={review.avatar} alt={review.name} className="review-avatar" loading="lazy" />
      <div>
        <p className="review-name">{review.name}</p>
        <p className="review-service">{review.service}</p>
      </div>
    </div>
  </div>
);

/* ── Package Card ── */
const PackageCard = ({ pkg, onSelect }: { pkg: typeof packagesData[0]; onSelect: () => void }) => (
  <div className="luxe-package-card" style={{ textAlign: 'left', ...(pkg.popular ? { borderColor: 'var(--luxe-gold)' } : {}) }}>
    {pkg.popular && <span className="package-badge"><span className="luxe-badge luxe-badge-gold">Best Value</span></span>}
    <h4 className="luxe-heading-4" style={{ margin: '0 0 var(--space-1)' }}>{pkg.name}</h4>
    <div style={{ display: 'flex', alignItems: 'baseline', gap: 'var(--space-2)', marginBottom: 'var(--space-4)' }}>
      <span className="package-price" style={{ fontSize: 'var(--text-4xl)' }}>${pkg.price}</span>
      {pkg.original && (
        <span style={{ fontSize: 'var(--text-base)', color: 'var(--luxe-text-tertiary)', textDecoration: 'line-through' }}>${pkg.original}</span>
      )}
    </div>
    <ul className="package-perks">
      {pkg.items.map((item, i) => (
        <li key={i}>
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="var(--luxe-gold)" strokeWidth="2.5"><polyline points="20 6 9 17 4 12"/></svg>
          {item}
        </li>
      ))}
    </ul>
    <button onClick={onSelect} className="luxe-btn luxe-btn-primary luxe-btn-md" style={{ width: '100%' }}>Select Package</button>
  </div>
);

/* ── Membership Card ── */
const MembershipCard = ({ plan, onJoin }: { plan: typeof membershipsData[0]; onJoin: () => void }) => (
  <div className="luxe-package-card" style={plan.popular ? { borderColor: 'var(--luxe-gold)', boxShadow: 'var(--shadow-glow-gold)' } : {}}>
    {plan.popular && <span className="package-badge"><span className="luxe-badge luxe-badge-gold">Popular</span></span>}
    <h4 className="luxe-heading-3" style={{ margin: '0 0 var(--space-1)', color: 'var(--luxe-gold)' }}>{plan.name}</h4>
    <div className="package-price" style={{ margin: 'var(--space-4) 0' }}>
      ${plan.price}
      <span> / {plan.per}</span>
    </div>
    <div className="luxe-divider" style={{ margin: 'var(--space-6) auto' }} />
    <ul className="package-perks">
      {plan.perks.map((perk, i) => (
        <li key={i}>
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="var(--luxe-emerald)" strokeWidth="2.5"><polyline points="20 6 9 17 4 12"/></svg>
          {perk}
        </li>
      ))}
    </ul>
    <button onClick={onJoin} className={`luxe-btn ${plan.popular ? 'luxe-btn-secondary' : 'luxe-btn-outline'} luxe-btn-md`} style={{ width: '100%' }}>
      {plan.popular ? 'Join Gold' : `Join ${plan.name}`}
    </button>
  </div>
);

/* ── Blog Card ── */
const BlogCard = ({ post }: { post: typeof blogData[0] }) => (
  <div className="luxe-blog-card">
    <img src={post.image} alt={post.title} loading="lazy" />
    <div className="blog-body">
      <div className="blog-category">{post.category}</div>
      <h3 className="blog-title">{post.title}</h3>
      <p className="blog-excerpt">{post.excerpt}</p>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginTop: 'var(--space-4)' }}>
        <span style={{ fontSize: 'var(--text-xs)', color: 'var(--luxe-text-tertiary)' }}>{post.date}</span>
        <span style={{ fontSize: 'var(--text-xs)', color: 'var(--luxe-gold)', fontWeight: 600 }}>Read More →</span>
      </div>
    </div>
  </div>
);

/* ── Main Page ── */
export default function SalonLuxuryPage() {
  const router = useRouter();
  const params = useParams();
  const slug = params?.slug as string;
  const [salon, setSalon] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [testimonialIndex, setTestimonialIndex] = useState(0);
  const [quickBookOpen, setQuickBookOpen] = useState(false);
  const [quickForm] = Form.useForm();
  const [activeTab, setActiveTab] = useState('services');
  const intervalRef = useRef<any>(null);
  const sectionRefs = useRef<Record<string, HTMLElement | null>>({});

  const startAutoRotate = useCallback(() => {
    if (intervalRef.current) clearInterval(intervalRef.current);
    intervalRef.current = setInterval(() => {
      setTestimonialIndex((prev) => (prev + 1) % testimonialsData.length);
    }, 5000);
  }, []);

  useEffect(() => {
    if (!slug) return;
    setLoading(true);
    apiUtil.get(ApiGetSalonBySlug(slug)).then((res: any) => {
      if (res?.dataResponse?.returnCode === eResultCode.SUCCESS || res?.dataResponse?.returnCode === eResultCode.CREATED) {
        setSalon(res.data || res);
      } else {
        setError('Salon not found');
      }
    }).catch(() => setError('Failed to load salon')).finally(() => setLoading(false));
    startAutoRotate();
    return () => { if (intervalRef.current) clearInterval(intervalRef.current); };
  }, [slug, startAutoRotate]);

  const handleQuickBook = () => {
    quickForm.validateFields().then(() => {
      setQuickBookOpen(false);
      quickForm.resetFields();
      Modal.success({ title: 'Request Sent', content: 'We will contact you shortly to confirm your appointment.' });
    }).catch(() => {});
  };

  const handleBook = useCallback(() => router.push(`/${slug}/book`), [router, slug]);

  const scrollToSection = (id: string) => {
    const el = document.getElementById(id);
    if (el) el.scrollIntoView({ behavior: 'smooth', block: 'start' });
  };

  if (loading) return <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', minHeight: '100vh', background: 'var(--luxe-ivory)' }}><Spin size="large" /></div>;
  if (error) return <div style={{ maxWidth: 1100, margin: '100px auto', padding: '0 16px' }}><Alert title={error} type="error" showIcon /></div>;

  const salonName = salon?.name || 'Luxury Salon';
  const salonTagline = salon?.tagline || 'Where beauty meets excellence';

  return (
    <div style={{ background: 'var(--luxe-bg)' }}>
      {/* Import luxury design system */}
      <link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=Playfair+Display:ital,wght@0,400;0,500;0,600;0,700;0,800;1,400;1,500&family=Inter:wght@300;400;500;600;700&display=swap" />

      {/* =============================================
          01 — STICKY HEADER
          ============================================= */}
      <LuxuryNavbar />

      {/* =============================================
          02 — HERO BANNER
          ============================================= */}
      <section className="luxe-hero" id="hero">
        <div className="luxe-hero-bg">
          <img
            src="https://images.unsplash.com/photo-1560066984-138dadb4c035?w=1920&h=1080&fit=crop"
            alt="Luxury Salon"
          />
        </div>
        <div className="luxe-hero-overlay" />
        <div className="luxe-hero-content">
          <div className="luxe-hero-tagline animate-fade-in-up">Premium Beauty & Wellness</div>
          <h1 className="luxe-hero-title animate-fade-in-up" style={{ animationDelay: '0.1s' }}>
            {salonName}
          </h1>
          <p className="luxe-hero-subtitle animate-fade-in-up" style={{ animationDelay: '0.2s' }}>
            {salonTagline}
          </p>
          <div className="luxe-hero-actions animate-fade-in-up" style={{ animationDelay: '0.3s' }}>
            <button onClick={handleBook} className="luxe-btn luxe-btn-secondary luxe-btn-xl">
              Book Appointment
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><line x1="5" y1="12" x2="19" y2="12"/><polyline points="12 5 19 12 12 19"/></svg>
            </button>
            <button onClick={() => scrollToSection('services')} className="luxe-btn luxe-btn-light luxe-btn-xl">
              Explore Services
            </button>
          </div>
        </div>
        <div className="luxe-hero-scroll animate-float">
          <span>Scroll</span>
          <svg width="16" height="24" viewBox="0 0 16 24" fill="none" stroke="currentColor" strokeWidth="1.5"><rect x="1" y="1" width="14" height="22" rx="7"/><line x1="8" y1="8" x2="8" y2="12"/></svg>
        </div>
      </section>

      {/* =============================================
          03 — FEATURED SERVICES
          ============================================= */}
      <section className="luxe-section" id="services" style={{ background: 'var(--luxe-surface)' }}>
        <div className="luxe-container">
          <div className="luxe-section-header">
            <span className="luxe-section-overline">Our Services</span>
            <h2 className="luxe-section-title">Premium Experiences</h2>
            <p className="luxe-section-subtitle">Discover our curated selection of luxury beauty services designed to pamper and transform.</p>
            <div className="luxe-divider" />
          </div>

          {/* Tabs */}
          <div className="luxe-tabs" style={{ justifyContent: 'center', marginBottom: 'var(--space-10)' }}>
            {['services', 'popular', 'packages'].map((tab) => (
              <button
                key={tab}
                className={`luxe-tab ${activeTab === tab ? 'active' : ''}`}
                onClick={() => setActiveTab(tab)}
              >
                {tab === 'services' ? 'All Services' : tab === 'popular' ? 'Popular Treatments' : 'Luxury Packages'}
              </button>
            ))}
          </div>

          {activeTab === 'services' && (
            <div className="luxe-grid-3" style={{ gap: 'var(--space-6)' }}>
              {servicesData.map((svc) => (
                <ServiceCard key={svc.id} service={svc} onBook={handleBook} />
              ))}
            </div>
          )}

          {activeTab === 'popular' && (
            <div className="luxe-grid-3" style={{ gap: 'var(--space-6)' }}>
              {popularData.map((item) => (
                <PopularCard key={item.id} item={item} onBook={handleBook} />
              ))}
            </div>
          )}

          {activeTab === 'packages' && (
            <div className="luxe-grid-3" style={{ gap: 'var(--space-6)' }}>
              {packagesData.map((pkg) => (
                <PackageCard key={pkg.id} pkg={pkg} onSelect={handleBook} />
              ))}
            </div>
          )}

          <div style={{ textAlign: 'center', marginTop: 'var(--space-10)' }}>
            <button onClick={() => router.push(`/${slug}/services`)} className="luxe-btn luxe-btn-gold-outline luxe-btn-md">
              View All Services →
            </button>
          </div>
        </div>
      </section>

      {/* =============================================
          04 — ABOUT PREVIEW
          ============================================= */}
      <section className="luxe-section" id="about" style={{ background: 'var(--luxe-ivory)' }}>
        <div className="luxe-container">
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 'var(--space-16)', alignItems: 'center' }}>
            <div>
              <div style={{ position: 'relative' }}>
                <div style={{ borderRadius: 'var(--radius-4xl)', overflow: 'hidden' }}>
                  <img
                    src="https://images.unsplash.com/photo-1633681926033-0cb4eef1b864?w=700&h=500&fit=crop"
                    alt="Salon interior"
                    style={{ width: '100%', display: 'block', aspectRatio: '7/5', objectFit: 'cover' }}
                  />
                </div>
                <div style={{
                  position: 'absolute', bottom: '-var(--space-6)', right: '-var(--space-6)',
                  width: 120, height: 120, borderRadius: 'var(--radius-3xl)',
                  background: 'var(--luxe-gold)', display: 'flex', alignItems: 'center', justifyContent: 'center',
                  flexDirection: 'column', color: 'var(--luxe-charcoal)'
                }}>
                  <span style={{ fontSize: 'var(--text-2xl)', fontWeight: 800, lineHeight: 1 }}>2010</span>
                  <span style={{ fontSize: 'var(--text-xs)', fontWeight: 600, letterSpacing: '0.05em' }}>EST.</span>
                </div>
              </div>
            </div>
            <div>
              <span className="luxe-section-overline">Our Story</span>
              <h2 className="luxe-section-title" style={{ margin: 'var(--space-3) 0 var(--space-6)' }}>Where Beauty <br />Meets Artistry</h2>
              <div className="luxe-divider-left" />
              <p className="luxe-body-text" style={{ fontSize: 'var(--text-base)', marginBottom: 'var(--space-6)', lineHeight: 'var(--leading-loose)' }}>
                Founded with a passion for beauty and a commitment to excellence, we have been transforming looks and boosting confidence for over a decade. Our team of skilled professionals combines artistry with the latest techniques to deliver exceptional results in an environment of unparalleled luxury.
              </p>
              <button onClick={() => router.push(`/${slug}/about`)} className="luxe-btn luxe-btn-gold-outline luxe-btn-md">
                Learn More →
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* =============================================
          05 — FEATURED STYLISTS
          ============================================= */}
      <section className="luxe-section" id="team" style={{ background: 'var(--luxe-surface)' }}>
        <div className="luxe-container">
          <div className="luxe-section-header">
            <span className="luxe-section-overline">Our Team</span>
            <h2 className="luxe-section-title">Meet Your Stylists</h2>
            <p className="luxe-section-subtitle">Talented professionals dedicated to bringing your beauty vision to life.</p>
            <div className="luxe-divider" />
          </div>
          <div className="luxe-grid-4" style={{ gap: 'var(--space-6)' }}>
            {teamData.map((member) => (
              <StylistCard key={member.id} stylist={member} onBook={handleBook} />
            ))}
          </div>
          <div style={{ textAlign: 'center', marginTop: 'var(--space-10)' }}>
            <button onClick={() => router.push(`/${slug}/team`)} className="luxe-btn luxe-btn-gold-outline luxe-btn-md">
              View Full Team →
            </button>
          </div>
        </div>
      </section>

      {/* =============================================
          06 — BEFORE & AFTER GALLERY
          ============================================= */}
      <section className="luxe-section" id="gallery" style={{ background: 'var(--luxe-ivory)' }}>
        <div className="luxe-container">
          <div className="luxe-section-header">
            <span className="luxe-section-overline">Gallery</span>
            <h2 className="luxe-section-title">Before & After</h2>
            <p className="luxe-section-subtitle">Real transformations from our talented team.</p>
            <div className="luxe-divider" />
          </div>
          <div className="luxe-ba-grid" style={{ marginBottom: 'var(--space-6)' }}>
            {galleryData.slice(0, 4).map((img, i) => (
              <div key={img.id} className={`luxe-ba-card ${i % 2 === 0 ? 'luxe-ba-before' : 'luxe-ba-after'}`}>
                <img src={img.src} alt={img.alt} loading="lazy" />
                <span className="luxe-ba-label">{i % 2 === 0 ? 'Before' : 'After'}</span>
              </div>
            ))}
          </div>
          <div style={{ textAlign: 'center' }}>
            <button onClick={() => router.push(`/${slug}/gallery`)} className="luxe-btn luxe-btn-gold-outline luxe-btn-md">
              View Full Gallery →
            </button>
          </div>
        </div>
      </section>

      {/* =============================================
          07 — MEMBERSHIP PLANS
          ============================================= */}
      <section className="luxe-section" id="memberships" style={{ background: 'var(--luxe-charcoal)', color: 'var(--luxe-white)' }}>
        <div className="luxe-container">
          <div className="luxe-section-header">
            <span className="luxe-section-overline" style={{ color: 'var(--luxe-gold)' }}>Memberships</span>
            <h2 className="luxe-section-title" style={{ color: 'var(--luxe-white)' }}>Exclusive Benefits</h2>
            <p className="luxe-section-subtitle" style={{ color: 'rgba(255,255,255,0.5)' }}>Join our loyalty program and unlock premium perks and savings.</p>
            <div className="luxe-divider" />
          </div>
          <div className="luxe-grid-3" style={{ gap: 'var(--space-6)', alignItems: 'start' }}>
            {membershipsData.map((plan) => (
              <MembershipCard key={plan.id} plan={plan} onJoin={handleBook} />
            ))}
          </div>
        </div>
      </section>

      {/* =============================================
          08 — LUXURY PACKAGES
          ============================================= */}
      <section className="luxe-section" id="packages" style={{ background: 'var(--luxe-surface)' }}>
        <div className="luxe-container">
          <div className="luxe-section-header">
            <span className="luxe-section-overline">Curated Collections</span>
            <h2 className="luxe-section-title">Luxury Packages</h2>
            <p className="luxe-section-subtitle">Handpicked combinations for the ultimate salon experience.</p>
            <div className="luxe-divider" />
          </div>
          <div className="luxe-grid-3" style={{ gap: 'var(--space-6)', alignItems: 'start' }}>
            {packagesData.map((pkg) => (
              <PackageCard key={pkg.id} pkg={pkg} onSelect={handleBook} />
            ))}
          </div>
        </div>
      </section>

      {/* =============================================
          09 — TESTIMONIALS CAROUSEL
          ============================================= */}
      <section className="luxe-section" id="testimonials" style={{ background: 'var(--luxe-ivory)' }}>
        <div className="luxe-container-sm">
          <div className="luxe-section-header">
            <span className="luxe-section-overline">Testimonials</span>
            <h2 className="luxe-section-title">Client Stories</h2>
            <p className="luxe-section-subtitle">Hear from our cherished clients about their experiences.</p>
            <div className="luxe-divider" />
          </div>
          <div className="luxe-testimonials">
            <div key={testimonialsData[testimonialIndex].id} className="luxe-testimonial-card animate-fade-in-up">
              <p className="luxe-testimonial-text">"{testimonialsData[testimonialIndex].text}"</p>
              <div className="review-author" style={{ justifyContent: 'center' }}>
                <img src={testimonialsData[testimonialIndex].avatar} alt={testimonialsData[testimonialIndex].name} className="review-avatar" loading="lazy" />
                <div>
                  <p className="review-name" style={{ textAlign: 'left' }}>{testimonialsData[testimonialIndex].name}</p>
                  <p className="review-service" style={{ textAlign: 'left' }}>{testimonialsData[testimonialIndex].service}</p>
                </div>
              </div>
            </div>
            <div className="luxe-testimonial-dots">
              {testimonialsData.map((_, i) => (
                <button
                  key={i}
                  className={`luxe-testimonial-dot ${i === testimonialIndex ? 'active' : ''}`}
                  onClick={() => setTestimonialIndex(i)}
                />
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* =============================================
          10 — WHY CHOOSE US
          ============================================= */}
      <section className="luxe-section" style={{ background: 'var(--luxe-surface)' }}>
        <div className="luxe-container">
          <div className="luxe-section-header">
            <span className="luxe-section-overline">Why Choose Us</span>
            <h2 className="luxe-section-title">The LuxeStudio Difference</h2>
            <p className="luxe-section-subtitle">What sets us apart from the rest.</p>
            <div className="luxe-divider" />
          </div>
          <div className="luxe-why-grid">
            {whyChooseData.map((item, i) => (
              <div key={i} className="luxe-why-item">
                <div className="luxe-why-icon" style={{ background: item.color }}>
                  <span style={{ fontSize: 'var(--text-3xl)', color: 'var(--luxe-gold)' }}>{item.icon}</span>
                </div>
                <h3 className="luxe-why-item-title">{item.title}</h3>
                <p className="luxe-why-item-desc">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* =============================================
          11 — STATISTICS
          ============================================= */}
      <section className="luxe-stats" id="stats">
        <div className="luxe-container">
          <div className="luxe-stats-grid">
            {statsData.map((stat, i) => (
              <div key={i} className="animate-fade-in-up" style={{ animationDelay: `${i * 0.1}s` }}>
                <div className="luxe-stat-value">{stat.value}</div>
                <div className="luxe-stat-label">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* =============================================
          12 — INSTAGRAM FEED
          ============================================= */}
      <section className="luxe-section" style={{ background: 'var(--luxe-surface)', padding: '0' }}>
        <div style={{ textAlign: 'center', padding: 'var(--space-12) var(--space-6) var(--space-8)' }}>
          <span className="luxe-section-overline">Follow Us</span>
          <h2 className="luxe-section-title" style={{ margin: 'var(--space-2) 0 0' }}>@LuxeStudio</h2>
        </div>
        <div className="luxe-instagram-grid">
          {instagramData.map((img) => (
            <div key={img.id} className="luxe-instagram-item">
              <img src={img.src} alt={img.alt} loading="lazy" />
              <div className="ig-overlay">
                <svg className="ig-icon" width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <rect x="2" y="2" width="20" height="20" rx="5" /><path d="M16 11.37A4 4 0 1112.63 8 4 4 0 0116 11.37z" /><line x1="17.5" y1="6.5" x2="17.51" y2="6.5" />
                </svg>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* =============================================
          13 — LATEST BLOG
          ============================================= */}
      <section className="luxe-section" id="blog" style={{ background: 'var(--luxe-ivory)' }}>
        <div className="luxe-container">
          <div className="luxe-section-header">
            <span className="luxe-section-overline">Journal</span>
            <h2 className="luxe-section-title">Latest from Our Blog</h2>
            <p className="luxe-section-subtitle">Beauty tips, trends, and insights from our experts.</p>
            <div className="luxe-divider" />
          </div>
          <div className="luxe-grid-3" style={{ gap: 'var(--space-6)' }}>
            {blogData.map((post) => (
              <BlogCard key={post.id} post={post} />
            ))}
          </div>
          <div style={{ textAlign: 'center', marginTop: 'var(--space-10)' }}>
            <button className="luxe-btn luxe-btn-gold-outline luxe-btn-md">Read More Articles →</button>
          </div>
        </div>
      </section>

      {/* =============================================
          14 — FAQ
          ============================================= */}
      <section className="luxe-section" id="faq" style={{ background: 'var(--luxe-surface)' }}>
        <div className="luxe-container-sm">
          <div className="luxe-section-header">
            <span className="luxe-section-overline">FAQ</span>
            <h2 className="luxe-section-title">Frequently Asked Questions</h2>
            <p className="luxe-section-subtitle">Everything you need to know before your visit.</p>
            <div className="luxe-divider" />
          </div>
          <div className="luxe-faq-grid">
            {faqData.map((faq, i) => (
              <div key={i} className="luxe-accordion-item">
                <details className="luxe-accordion-details" style={{ listStyle: 'none' }}>
                  <summary className="luxe-accordion-trigger" style={{ cursor: 'pointer', listStyle: 'none' }}>
                    {faq.q}
                    <svg className="chevron" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><polyline points="6 9 12 15 18 9"/></svg>
                  </summary>
                  <div className="luxe-accordion-content-inner">
                    {faq.a}
                  </div>
                </details>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* =============================================
          15 — CONTACT PREVIEW
          ============================================= */}
      <section className="luxe-section" id="contact" style={{ background: 'var(--luxe-ivory)' }}>
        <div className="luxe-container">
          <div className="luxe-contact-preview">
            <div>
              <span className="luxe-section-overline">Get in Touch</span>
              <h2 className="luxe-section-title" style={{ margin: 'var(--space-3) 0 var(--space-6)' }}>We'd Love to <br />Hear from You</h2>
              <div className="luxe-divider-left" />
              <div style={{ marginTop: 'var(--space-8)' }}>
                {[
                  { icon: '📍', label: 'Address', value: '123 Luxury Avenue, Beverly Hills, CA 90210' },
                  { icon: '📞', label: 'Phone', value: '+1 (310) 555-0123' },
                  { icon: '✉️', label: 'Email', value: 'hello@luxestudio.com' },
                  { icon: '🕐', label: 'Hours', value: 'Mon-Sat: 9am-8pm, Sun: 10am-6pm' },
                ].map((item, i) => (
                  <div key={i} className="luxe-contact-info-item">
                    <div className="luxe-contact-info-icon">{item.icon}</div>
                    <div>
                      <p style={{ fontSize: 'var(--text-xs)', fontWeight: 600, color: 'var(--luxe-gold)', margin: '0 0 2px', textTransform: 'uppercase', letterSpacing: '0.1em' }}>{item.label}</p>
                      <p style={{ fontSize: 'var(--text-sm)', color: 'var(--luxe-text)', margin: 0 }}>{item.value}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
            <div style={{ background: 'var(--luxe-surface)', borderRadius: 'var(--radius-4xl)', padding: 'var(--space-10)', border: 'var(--border-subtle)' }}>
              <h3 className="luxe-heading-3" style={{ marginBottom: 'var(--space-6)' }}>Send a Message</h3>
              <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--space-4)' }}>
                <div className="luxe-input-group">
                  <label className="luxe-input-label">Name</label>
                  <input type="text" className="luxe-input" placeholder="Your name" />
                </div>
                <div className="luxe-input-group">
                  <label className="luxe-input-label">Email</label>
                  <input type="email" className="luxe-input" placeholder="your@email.com" />
                </div>
                <div className="luxe-input-group">
                  <label className="luxe-input-label">Message</label>
                  <textarea className="luxe-input" rows={4} placeholder="How can we help you?" style={{ resize: 'vertical', minHeight: 100 }} />
                </div>
                <button className="luxe-btn luxe-btn-primary luxe-btn-lg" style={{ alignSelf: 'flex-start', marginTop: 'var(--space-2)' }}>
                  Send Message
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* =============================================
          16 — NEWSLETTER
          ============================================= */}
      <section className="luxe-newsletter">
        <div className="luxe-newsletter-content">
          <h2 className="luxe-newsletter-title">Stay Inspired</h2>
          <p className="luxe-newsletter-subtitle">Subscribe to receive exclusive offers, beauty tips, and early access to new services.</p>
          <form className="luxe-newsletter-form" onSubmit={(e) => e.preventDefault()}>
            <input type="email" placeholder="Enter your email address" required />
            <button type="submit" className="luxe-btn luxe-btn-secondary luxe-btn-lg">Subscribe</button>
          </form>
        </div>
      </section>

      {/* =============================================
          17 — LUXURY FOOTER
          ============================================= */}
      <LuxuryFooter />

      {/* =============================================
          FLOATING BOOK BUTTON
          ============================================= */}
      <div style={{ position: 'fixed', bottom: 'var(--space-8)', right: 'var(--space-8)', zIndex: 999 }}>
        <button
          onClick={() => setQuickBookOpen(true)}
          style={{
            width: 60, height: 60, borderRadius: 'var(--radius-full)',
            background: 'var(--luxe-gold)', border: 'none',
            boxShadow: '0 4px 24px rgba(200,164,107,0.4)',
            cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center',
            transition: 'transform 0.2s',
            animation: 'float 3s ease-in-out infinite',
          }}
          aria-label="Quick book"
        >
          <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="var(--luxe-charcoal)" strokeWidth="2.5">
            <line x1="12" y1="5" x2="12" y2="19"/><line x1="5" y1="12" x2="19" y2="12"/>
          </svg>
        </button>
      </div>

      {/* =============================================
          QUICK BOOK MODAL
          ============================================= */}
      <Modal
        title={<span className="luxe-modal-title" style={{ fontSize: 'var(--text-xl)' }}>Quick Appointment Request</span>}
        open={quickBookOpen}
        onCancel={() => setQuickBookOpen(false)}
        footer={null}
        width={480}
        style={{ borderRadius: 'var(--radius-3xl)' }}
        className="luxe-modal-antd"
      >
        <Form form={quickForm} layout="vertical" style={{ marginTop: 'var(--space-4)' }}>
          <Form.Item name="name" label={<span className="luxe-input-label">Name</span>} rules={[{ required: true, message: 'Please enter your name' }]}>
            <input className="luxe-input" placeholder="Your name" />
          </Form.Item>
          <Form.Item name="email" label={<span className="luxe-input-label">Email</span>} rules={[{ required: true, type: 'email', message: 'Please enter a valid email' }]}>
            <input className="luxe-input" placeholder="your@email.com" />
          </Form.Item>
          <Form.Item name="phone" label={<span className="luxe-input-label">Phone</span>} rules={[{ required: true, message: 'Please enter your phone' }]}>
            <input className="luxe-input" placeholder="Phone number" />
          </Form.Item>
          <Form.Item name="service" label={<span className="luxe-input-label">Service Preference</span>}>
            <select className="luxe-select">
              <option value="">Select a service</option>
              {servicesData.map((svc) => (
                <option key={svc.id} value={svc.name}>{svc.name}</option>
              ))}
            </select>
          </Form.Item>
          <Form.Item name="notes" label={<span className="luxe-input-label">Notes</span>}>
            <textarea className="luxe-input" rows={3} placeholder="Preferred date, time, or special requests" style={{ resize: 'vertical' }} />
          </Form.Item>
          <div style={{ display: 'flex', gap: 'var(--space-3)', justifyContent: 'flex-end', marginTop: 'var(--space-6)' }}>
            <button onClick={() => setQuickBookOpen(false)} className="luxe-btn luxe-btn-ghost luxe-btn-md">Cancel</button>
            <button onClick={handleQuickBook} className="luxe-btn luxe-btn-primary luxe-btn-md">Send Request</button>
          </div>
        </Form>
      </Modal>

      <style>{`
        details summary::-webkit-details-marker { display: none; }
        details summary { list-style: none; }
        details[open] .chevron { transform: rotate(180deg); }
        .luxe-modal-antd .ant-modal-content { border-radius: 24px; overflow: hidden; }
        .luxe-modal-antd .ant-modal-header { border-bottom: 1px solid var(--luxe-border); padding: 24px 32px; }
        .luxe-modal-antd .ant-modal-body { padding: 24px 32px; }
        .luxe-modal-antd .ant-modal-close { top: 20px; right: 24px; }
        .scroll-lock { overflow: hidden; }
        @media (max-width: 768px) {
          .luxe-hero-title { font-size: var(--text-5xl); }
          .luxe-contact-preview > div:first-child > div:last-child .luxe-contact-info-item { flex-direction: column; }
        }
      `}</style>
    </div>
  );
}

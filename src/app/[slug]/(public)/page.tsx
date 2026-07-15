'use client';

import React, { useEffect, useState, useRef, useCallback } from 'react';
import { useParams, useRouter } from 'next/navigation';
import Link from 'next/link';
import { Typography, Spin, Alert, Form, Modal, Image, Button as AntButton } from 'antd';
import { FiEye, FiCalendar, FiClock, FiStar, FiArrowRight, FiChevronDown, FiMapPin, FiPhone, FiMail, FiMessageCircle, FiPlus } from 'react-icons/fi';
import Button from '../../../components/button/button';
import apiUtil from '../../../utils/api';
import { ApiGetSalonBySlug } from '../../../utils/api.constant';
import { eResultCode } from '../../../utils/enum';
import styles from './home.module.css';

const { Text, Paragraph } = Typography;

/* ── Data ── */
const servicesData = [
  { id: 's1', name: 'Classic Haircut', price: 45, duration: 45, description: 'Precision cut tailored to your face shape and style preferences.', rating: 4.8, reviews: 124, image: 'https://images.unsplash.com/photo-1560066984-138dadb4c035?w=600&h=450&fit=crop' },
  { id: 's2', name: 'Color & Highlights', price: 120, duration: 120, description: 'Professional color services for vibrant, long-lasting results.', rating: 4.9, reviews: 89, image: 'https://images.unsplash.com/photo-1563241527-3004b7be0ffd?w=600&h=450&fit=crop' },
  { id: 's3', name: 'Luxury Facial', price: 85, duration: 60, description: 'Rejuvenating facial treatment using organic products for radiant skin.', rating: 4.7, reviews: 156, image: 'https://images.unsplash.com/photo-1570172619644-dfd03ed5d881?w=600&h=450&fit=crop' },
  { id: 's4', name: 'Spa Manicure', price: 55, duration: 45, description: 'Luxurious hand treatment with exfoliation, mask, and polish.', rating: 4.6, reviews: 203, image: 'https://images.unsplash.com/photo-1604654894610-df63bc536371?w=600&h=450&fit=crop' },
  { id: 's5', name: 'Blowout & Styling', price: 65, duration: 50, description: 'Professional blow-dry and styling for any occasion.', rating: 4.8, reviews: 178, image: 'https://images.unsplash.com/photo-1522337360788-8b13dee7a37e?w=600&h=450&fit=crop' },
  { id: 's6', name: 'Keratin Treatment', price: 200, duration: 150, description: 'Smoothing treatment that eliminates frizz and adds shine for weeks.', rating: 4.9, reviews: 67, image: 'https://images.unsplash.com/photo-1527668752968-14dc70a27c95?w=600&h=450&fit=crop' },
];



const teamData = [
  { id: 't1', name: 'Sophia Williams', role: 'Master Stylist', experience: '15 years', rating: 4.9, reviews: 312, specialties: ['Precision Cuts', 'Creative Color', 'Editorial Styling'], avatar: 'https://images.unsplash.com/photo-1580618672591-eb180b1a973f?w=300&h=300&fit=crop', bio: 'Experienced stylist with a passion for transformative haircuts.' },
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
  { id: 'g7', src: 'https://images.unsplash.com/photo-1487412912498-0447578fcca8?w=600&h=600&fit=crop', alt: 'Makeup' },
  { id: 'g8', src: 'https://images.unsplash.com/photo-1519699047748-de8e457a634e?w=600&h=600&fit=crop', alt: 'Nail Art' },
];

const blogData = [
  { id: 'b1', title: 'Spring Hair Trends 2024: What\'s In This Season', category: 'Hair', excerpt: 'Discover the hottest hair trends for the spring season, from lived-in color to textured cuts.', image: 'https://images.unsplash.com/photo-1527799820374-dcf8d9d4a388?w=600&h=400&fit=crop', date: 'Mar 15, 2024', author: 'Sophia Williams' },
  { id: 'b2', title: 'The Ultimate Skincare Routine for Glowing Skin', category: 'Skincare', excerpt: 'Expert tips and product recommendations for achieving radiant, healthy-looking skin.', image: 'https://images.unsplash.com/photo-1570172619644-dfd03ed5d881?w=600&h=400&fit=crop', date: 'Mar 10, 2024', author: 'Emily Chen' },
  { id: 'b3', title: 'Bridal Beauty Prep: Your Week-By-Week Guide', category: 'Weddings', excerpt: 'Everything you need to know about preparing your hair, skin and nails for the big day.', image: 'https://images.unsplash.com/photo-1465495976277-4387d4b0b4c6?w=600&h=400&fit=crop', date: 'Mar 5, 2024', author: 'Beauty Team' },
];

const faqData = [
  { q: 'What should I bring to my appointment?', a: 'Just bring yourself! We provide all products and equipment. If you have specific product preferences or allergies, please let us know when booking.' },
  { q: 'How early should I arrive?', a: 'We recommend arriving 10-15 minutes early to check in, complete any paperwork, and discuss your preferences with your stylist over complimentary refreshments.' },
  { q: 'What is your cancellation policy?', a: 'We kindly request 24-hour notice for cancellations or rescheduling. Late cancellations may result in a 50% service fee.' },
  { q: 'Do you offer gift certificates?', a: 'Yes! We offer digital and physical gift certificates in any denomination, beautifully packaged and perfect for any occasion.' },
  { q: 'Are your products cruelty-free?', a: 'Yes, we carefully select products that align with our commitment to quality and responsible practices.' },
  { q: 'Do you offer parking?', a: 'Yes, we offer complimentary valet parking for all our customers. There is also a public parking garage adjacent to our building.' },
];

const whyChooseData = [
  { icon: '✦', title: 'Expert Team', desc: 'Our team comprises skilled professionals dedicated to providing exceptional beauty services.', color: '#f0ebe3' },
  { icon: '✧', title: 'Quality Products', desc: 'We use carefully selected products to ensure the best results for our customers.', color: '#e8e0d5' },
  { icon: '◈', title: 'Personalized Experience', desc: 'Every service is tailored to your unique needs, preferences, and beauty goals.', color: '#f0ebe3' },
];

const statsData = [
  { value: '15+', label: 'Years of Experience' },
  { value: '25K+', label: 'Happy Customers' },
  { value: '50K+', label: 'Appointments' },
];

const instagramData = galleryData.slice(0, 6);

/* ── Star Component ── */
const Stars = ({ rating, size = 14 }: { rating: number; size?: number }) => (
  <span className={`luxe-rating ${styles.stars}`}>
    {[1, 2, 3, 4, 5].map((i) => (
      <FiStar key={i} size={size} fill={i <= Math.round(rating) ? 'currentColor' : 'none'} color="currentColor" strokeWidth={2} />
    ))}
  </span>
);

/* ── Service Card ── */
const ServiceCard = ({ service, onBook }: { service: typeof servicesData[0]; onBook: () => void }) => (
  <div className={styles.serviceCard}>
    <div className={styles.serviceCardImageWrap}>
      <img src={service.image} alt={service.name} loading="lazy" />
      <div className={styles.serviceCardImageOverlay} />
      <div className={styles.serviceCardPrice}>${service.price}</div>
      <div className={styles.serviceCardQuickBook}>
        <AntButton onClick={onBook} className={styles.serviceCardQuickBookBtn} icon={<FiCalendar size={15} />}>
          Book Now
        </AntButton>
      </div>
    </div>
    <div className={styles.serviceCardBody}>
      <h4 className={styles.serviceCardTitle}>{service.name}</h4>
      <div className={styles.serviceCardMeta}>
        <span className={styles.serviceCardDuration}>
          <FiClock size={13} />
          {service.duration} min
        </span>
        <span className={styles.serviceCardStars}>
          {[1, 2, 3, 4, 5].map((s) => (
            <FiStar key={s} size={12} fill={s <= Math.round(service.rating) ? '#d4a853' : 'none'} color="#d4a853" strokeWidth={2} />
          ))}
          <span className={styles.serviceCardRating}>{service.rating}</span>
        </span>
        <span className={styles.serviceCardReviewCount}>({service.reviews})</span>
      </div>
      <p className={styles.serviceCardDesc}>{service.description}</p>
      <div className={styles.serviceCardFooter}>
        <Button variant="gold-outline" size="md" onClick={onBook}>
          Book Now <FiArrowRight size={14} />
        </Button>
      </div>
    </div>
  </div>
);

/* ── Stylist Card ── */
const StylistCard = ({ stylist, onBook }: { stylist: typeof teamData[0]; onBook: () => void }) => (
  <div className={`luxe-stylist-card ${styles.stylistCard}`}>
    <img src={stylist.avatar} alt={stylist.name} className="stylist-image" loading="lazy" />
    <h4 className={`luxe-heading-4 ${styles.stylistCardTitle}`}>{stylist.name}</h4>
    <p className={styles.stylistRole}>{stylist.role}</p>
    <p className={styles.stylistMeta}>{stylist.experience} • {stylist.reviews} reviews</p>
    <div className={styles.stylistStars}>
      <Stars rating={stylist.rating} />
    </div>
    <div className="stylist-specialties">
      {stylist.specialties.map((s) => (
        <span key={s} className="stylist-specialty-tag">{s}</span>
      ))}
    </div>
    <p className={`luxe-body-text ${styles.stylistBio}`}>{stylist.bio}</p>
    <Button variant="gold-outline" size="sm" onClick={onBook}>Book with {stylist.name.split(' ')[0]} <FiArrowRight size={12} /></Button>
  </div>
);

/* ── Review Card ── */
const ReviewCard = ({ review }: { review: typeof testimonialsData[0] }) => (
  <div className="luxe-review-card">
    <div className="review-stars">
      {[1, 2, 3, 4, 5].map((i) => (
        <FiStar key={i} size={16} fill="currentColor" color="currentColor" strokeWidth={2} />
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



/* ── Blog Card ── */
const BlogCard = ({ post, slug }: { post: typeof blogData[0]; slug: string }) => (
  <div className={styles.blogCard}>
    <div className={styles.blogCardImageWrap}>
      <img src={post.image} alt={post.title} loading="lazy" />
      <span className={styles.blogCardCategory}>{post.category}</span>
    </div>
      <div className={styles.blogCardBody}>
        <h3 className={styles.blogCardTitle}>{post.title}</h3>
        <p className={styles.blogCardExcerpt}>{post.excerpt}</p>
        <div className={styles.blogCardMeta}>
          <div className={styles.blogCardMetaLeft}>
            <span className={styles.blogCardAuthor}>{post.author}</span>
            <span className={styles.blogCardMetaDot}>·</span>
            <span className={styles.blogCardDate}>{post.date}</span>
          </div>
          <Button variant="gold-outline" size="sm" href={`/${slug}/blog/${post.id}`}>              Read More <FiArrowRight size={14} /></Button>
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
  const [openIndex, setOpenIndex] = useState<number | null>(null);
  const [quickBookOpen, setQuickBookOpen] = useState(false);
  const [quickForm] = Form.useForm();
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

  const heroSlides = [
    { src: 'https://images.unsplash.com/photo-1560066984-138dadb4c035?w=1920&h=1080&fit=crop', alt: 'Luxury salon interior' },
    { src: 'https://images.unsplash.com/photo-1605497788044-5a32c7078486?w=1920&h=1080&fit=crop', alt: 'Salon wash station' },
    { src: 'https://images.unsplash.com/photo-1522337360788-8b13dee7a37e?w=1920&h=1080&fit=crop', alt: 'Professional hairstyling' },
    { src: 'https://images.unsplash.com/photo-1563241527-3004b7be0ffd?w=1920&h=1080&fit=crop', alt: 'Hair color treatment' },
  ];
  const [heroSlide, setHeroSlide] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => setHeroSlide((s) => (s + 1) % heroSlides.length), 5000);
    return () => clearInterval(timer);
  }, [heroSlides.length]);

  if (loading) return <div className={styles.loadingContainer}><Spin size="large" /></div>;
  if (error) return <div className={styles.errorContainer}><Alert title={error} type="error" showIcon /></div>;

  const salonName = salon?.name || 'Luxury Salon';
  const salonTagline = salon?.tagline || 'Where beauty meets style';

  /* ── Hero content from CMS (with *accent* convention) ── */
  const heroOverline    = salon?.heroOverline    || 'Beauty & Wellness';
  const heroHeading     = salon?.heroHeading     || 'Where Luxury Meets Your Style';
  const heroDescription = salon?.heroDescription || 'Experience exceptional care in a space designed to help you look and feel your best.';

  function renderHeading(text: string) {
    const words = text.split(' ');
    if (words.length <= 2) return text;
    const first = words.slice(0, -2).join(' ');
    const lastTwo = words.slice(-2).join(' ');
    return <>{first} <span className={styles.heroTitleAccent}>{lastTwo}</span></>;
  }

  return (
    <div className={styles.pageRoot}>
      {/* =============================================
          01 — HERO BANNER
           ============================================= */}
      <section className={styles.hero} id="hero">
        <div className={styles.heroCarousel}>
          {heroSlides.map((slide, i) => (
            <img
              key={i}
              src={slide.src}
              alt={slide.alt}
              className={`${styles.heroCarouselImg} ${i === heroSlide ? styles.heroCarouselImgActive : ''}`}
            />
          ))}
        </div>
        <div className={styles.heroOverlay} />
        <div className={styles.heroGradient} />
        <div className={styles.heroContent}>
          <div className={styles.heroSlideCounter}>
            <span className={styles.heroSlideCurrent}>{String(heroSlide + 1).padStart(2, '0')}</span>
            <span className={styles.heroSlideSep}>/</span>
            <span className={styles.heroSlideTotal}>{String(heroSlides.length).padStart(2, '0')}</span>
          </div>
          <div className={styles.heroInner}>
            <div className={styles.heroAccentBar} />
            <div className={styles.heroTextBlock}>
              <div className={styles.heroOverline}>{heroOverline}</div>
              <h1 className={styles.heroTitle}>{renderHeading(heroHeading)}</h1>
              <p className={styles.heroDesc}>{heroDescription}</p>
              <div className={styles.heroActions}>
                <Button variant="secondary" size="lg" onClick={handleBook}>
                  Book Appointment <FiArrowRight size={16} />
                </Button>
                <Button variant="gold-outline" size="lg" onClick={() => scrollToSection('services')}>
                  Explore Services
                </Button>
              </div>
            </div>
          </div>
          <div className={styles.heroStats}>
            <div className={styles.heroStat}>
              <span className={styles.heroStatValue}>15+</span>
              <span className={styles.heroStatLabel}>Years of Experience</span>
            </div>
            <div className={styles.heroStatSep} />
            <div className={styles.heroStat}>
              <span className={styles.heroStatValue}>25K</span>
              <span className={styles.heroStatLabel}>Happy Customers</span>
            </div>
            <div className={styles.heroStatSep} />
            <div className={styles.heroStat}>
              <span className={styles.heroStatValue}>50K</span>
              <span className={styles.heroStatLabel}>Appointments</span>
            </div>
        </div>
        </div>
      </section>

      {/* =============================================
           02 — FEATURED SERVICES
          ============================================= */}
      <section className={`luxe-section ${styles.sectionSurface}`} id="services">
        <div className="luxe-container">
          <div className="luxe-section-header">
            <span className="luxe-section-overline">Our Services</span>
            <div className={styles.servicesOrnament}>
              <span className={styles.servicesOrnamentLine} />
              <span className={styles.servicesOrnamentIcon}>✦</span>
              <span className={styles.servicesOrnamentLine} />
            </div>
            <h2 className="luxe-section-title">Our Services</h2>
            <p className="luxe-section-subtitle">Explore our range of beauty services designed to help you look and feel your best.</p>
          </div>

          <div className={`luxe-grid-3 ${styles.gridGap6}`}>
            {servicesData.map((svc) => (
              <ServiceCard key={svc.id} service={svc} onBook={handleBook} />
            ))}
          </div>

          <div className={styles.sectionCenterCta}>
            <Button variant="gold-outline" size="md" onClick={() => router.push(`/${slug}/services`)}>
              View All Services <FiArrowRight size={14} />
            </Button>
          </div>
        </div>
      </section>

      {/* =============================================
           03 — OUR STORY
           ============================================= */}
      <section className={`luxe-section ${styles.sectionIvory}`} id="about">
        <div className="luxe-container">
          <div className={styles.aboutGrid}>
            <div className={styles.aboutImageCol}>
              <div className={styles.aboutImageFrame}>
                <img
                  src="https://images.unsplash.com/photo-1522337360788-8b13dee7a37e?w=700&h=500&fit=crop"
                  alt="Salon interior"
                  className={styles.aboutImage}
                />
              </div>
            </div>
            <div className={styles.aboutContent}>
              <span className="luxe-section-overline">Our Story</span>
              <h2 className={`luxe-section-title ${styles.aboutTitle}`}>
                {renderHeading('Where Beauty Meets Style')}
              </h2>
              <div className={styles.aboutDivider} />
              <p className={styles.aboutText}>
                Founded with a passion for beauty, we have been helping our customers look and feel their best for over a decade. Our team of skilled professionals combines technical expertise with personalized attention to deliver results that exceed expectations.
              </p>
              <Button variant="gold-outline" size="md" onClick={() => router.push(`/${slug}/about`)}>
                Learn More <FiArrowRight size={14} />
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* =============================================
          04 — FEATURED STYLISTS
          ============================================= */}
      <section className={`luxe-section ${styles.sectionSurface}`} id="team">
        <div className="luxe-container">
          <div className="luxe-section-header">
            <span className="luxe-section-overline">Our Team</span>
            <h2 className="luxe-section-title">Meet Your Stylists</h2>
            <p className="luxe-section-subtitle">Talented professionals dedicated to bringing your beauty vision to life.</p>
            <div className="luxe-divider" />
          </div>
          <div className={`luxe-grid-4 ${styles.teamGrid}`}>
            {teamData.map((member) => (
              <StylistCard key={member.id} stylist={member} onBook={handleBook} />
            ))}
          </div>
          <div className={styles.sectionCenterCta}>
            <Button variant="gold-outline" size="md" onClick={() => router.push(`/${slug}/team`)}>
              View All Team <FiArrowRight size={14} />
            </Button>
          </div>
        </div>
      </section>

      {/* =============================================
           05 — SALON PORTFOLIO
           ============================================= */}
      <section className={`luxe-section ${styles.sectionIvory}`} id="gallery">
        <div className="luxe-container">
          <div className="luxe-section-header">
            <span className="luxe-section-overline">Portfolio</span>
            <div className={styles.servicesOrnament}>
              <span className={styles.servicesOrnamentLine} />
              <span className={styles.servicesOrnamentIcon}>✦</span>
              <span className={styles.servicesOrnamentLine} />
            </div>
            <h2 className="luxe-section-title">Our Work</h2>
            <p className="luxe-section-subtitle">A look inside our salon and some of the work we've done.</p>
          </div>
          <Image.PreviewGroup>
            <div className={styles.portfolioGrid}>
              {galleryData.slice(0, 6).map((img, i) => (
                <div key={img.id} className={`${styles.portfolioItem} ${i === 0 || i === 3 ? styles.portfolioItemWide : ''}`}>
                  <Image src={img.src} alt={img.alt} loading="lazy" preview={{ cover: <div className={styles.portfolioPreviewMask}><FiEye size={22} /></div> }} />
                </div>
              ))}
            </div>
          </Image.PreviewGroup>
          <div className={styles.sectionCenter}>
            <Button variant="gold-outline" size="md" onClick={() => router.push(`/${slug}/gallery`)}>
              View All Gallery <FiArrowRight size={14} />
            </Button>
          </div>
        </div>
      </section>

      {/* =============================================
           06 — TESTIMONIALS
           ============================================= */}
      <section className={`luxe-section ${styles.sectionSurface}`} id="testimonials">
        <div className="luxe-container-sm">
          <div className="luxe-section-header">
            <span className="luxe-section-overline">Testimonials</span>
            <div className={styles.servicesOrnament}>
              <span className={styles.servicesOrnamentLine} />
              <span className={styles.servicesOrnamentIcon}>✦</span>
              <span className={styles.servicesOrnamentLine} />
            </div>
            <h2 className="luxe-section-title">Customer Stories</h2>
            <p className="luxe-section-subtitle">Hear from our customers about their experiences.</p>
          </div>
          <div className={styles.testimonialCard}>
            <div className={styles.testimonialQuoteIcon}>"</div>
            <p className={styles.testimonialText}>{testimonialsData[testimonialIndex].text}</p>
            <div className={styles.testimonialDivider} />
            <div className={styles.testimonialAuthor}>
              <img
                src={testimonialsData[testimonialIndex].avatar}
                alt={testimonialsData[testimonialIndex].name}
                className={styles.testimonialAvatar}
              />
              <div className={styles.testimonialAuthorInfo}>
                <span className={styles.testimonialName}>{testimonialsData[testimonialIndex].name}</span>
                <span className={styles.testimonialService}>{testimonialsData[testimonialIndex].service}</span>
              </div>
              <div className={styles.testimonialStars}>
                {[1,2,3,4,5].map(s => (
                  <FiStar key={s} size={12} fill="#d4a853" color="#d4a853" strokeWidth={2} />
                ))}
              </div>
            </div>
          </div>
          <div className={styles.testimonialDots}>
            {testimonialsData.map((_, i) => (
              <button
                key={i}
                className={`${styles.testimonialDot} ${i === testimonialIndex ? styles.testimonialDotActive : ''}`}
                onClick={() => setTestimonialIndex(i)}
              />
            ))}
          </div>
          <div className={styles.sectionCenterCta}>
            <Button variant="gold-outline" size="md" onClick={() => router.push(`/${slug}/testimonials`)}>
              View All Testimonials <FiArrowRight size={14} />
            </Button>
          </div>
        </div>
      </section>

      {/* =============================================
          07 — WHY CHOOSE US
          ============================================= */}
      <section className={`luxe-section ${styles.sectionIvory}`}>
        <div className="luxe-container">
          <div className="luxe-section-header">
            <span className="luxe-section-overline">Why Choose Us</span>
            <h2 className="luxe-section-title">Why We Stand Out</h2>
            <p className="luxe-section-subtitle">What sets us apart from the rest.</p>
            <div className="luxe-divider" />
          </div>
          <div className="luxe-why-grid">
            {whyChooseData.map((item, i) => (
              <div key={i} className="luxe-why-item">
                <div className="luxe-why-icon" style={{ background: item.color }}>
                  <span className={styles.whyIconSymbol}>{item.icon}</span>
                </div>
                <h3 className="luxe-why-item-title">{item.title}</h3>
                <p className="luxe-why-item-desc">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* =============================================
          08 — STATISTICS
          ============================================= */}
      <section className="luxe-stats" id="stats">
        <div className="luxe-container">
          <div className="luxe-stats-grid">
            {statsData.map((stat, i) => {
              const delayClasses = [styles.statsDelay0, styles.statsDelay1, styles.statsDelay2, styles.statsDelay3];
              return (
                <div key={i} className={`animate-fade-in-up ${delayClasses[i]}`}>
                  <div className="luxe-stat-value">{stat.value}</div>
                  <div className="luxe-stat-label">{stat.label}</div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* =============================================
           10 — LATEST BLOG
          ============================================= */}
      <section className={`luxe-section ${styles.sectionSurface}`} id="blog">
        <div className="luxe-container">
          <div className="luxe-section-header">
            <span className="luxe-section-overline">Journal</span>
            <div className={styles.servicesOrnament}>
              <span className={styles.servicesOrnamentLine} />
              <span className={styles.servicesOrnamentIcon}>✦</span>
              <span className={styles.servicesOrnamentLine} />
            </div>
            <h2 className="luxe-section-title">Latest from Our Blog</h2>
            <p className="luxe-section-subtitle">Beauty tips, trends, and insights from our experts.</p>
          </div>
          <div className={`luxe-grid-3 ${styles.gridGap6}`}>
            {blogData.map((post) => (
              <BlogCard key={post.id} post={post} slug={slug} />
            ))}
          </div>
          <div className={styles.sectionCenterCta}>
            <Button variant="gold-outline" size="md" onClick={() => router.push(`/${slug}/blog`)}>Read More Articles <FiArrowRight size={14} /></Button>
          </div>
        </div>
      </section>

      {/* =============================================
          11 — FAQ
          ============================================= */}
      <section className={`luxe-section ${styles.sectionIvory}`} id="faq">
        <div className="luxe-container-sm">
          <div className="luxe-section-header">
            <span className="luxe-section-overline">FAQ</span>
            <div className={styles.faqOrnament}>
              <span className={styles.faqOrnamentLine} />
              <span className={styles.faqOrnamentIcon}>✦</span>
              <span className={styles.faqOrnamentLine} />
            </div>
            <h2 className="luxe-section-title">Frequently Asked Questions</h2>
            <p className="luxe-section-subtitle">Everything you need to know before your visit.</p>
          </div>
          <div className={styles.faqContainer}>
            {faqData.map((faq, i) => (
              <div key={i} className={`${styles.faqItem} ${openIndex === i ? styles.faqItemOpen : ''}`}>
                <button
                  className={styles.faqTrigger}
                  onClick={() => setOpenIndex(openIndex === i ? null : i)}
                  aria-expanded={openIndex === i}
                >
                  <span className={styles.faqQuestion}>{faq.q}</span>
                  <FiChevronDown className={`${styles.faqChevron} ${openIndex === i ? styles.faqChevronOpen : ''}`} size={18} />
                </button>
                <div className={`${styles.faqAnswerWrapper} ${openIndex === i ? styles.faqAnswerOpen : ''}`}>
                  <div className={styles.faqAnswerInner}>
                    <div className={styles.faqAnswerContent}>
                      <span className={styles.faqAnswerDecor}>—</span>
                      {faq.a}
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
          
        </div>
      </section>

      {/* =============================================
          12 — CONTACT PREVIEW
          ============================================= */}
      <section className={`luxe-section ${styles.sectionSurface}`} id="contact">
        <div className="luxe-container">
          <div className="luxe-contact-preview">
            <div className={styles.contactInfoCol}>
              <span className="luxe-section-overline">Get in Touch</span>
              <div className={styles.contactOrnament}>
                <span className={styles.contactOrnamentLine} />
                <span className={styles.contactOrnamentIcon}>✦</span>
                <span className={styles.contactOrnamentLine} />
              </div>
              <h2 className={`luxe-section-title ${styles.contactTitle}`}>We'd Love to Hear from You</h2>
              <p className={styles.contactDesc}>
                Our team is here to help with any questions or to schedule your next appointment.
              </p>
              <div className={styles.contactInfoList}>
                {[
                  { icon: <FiMapPin size={18} />, label: 'Address', value: '123 Luxury Avenue, Beverly Hills, CA 90210' },
                  { icon: <FiPhone size={18} />, label: 'Phone', value: '+1 (310) 555-0123' },
                  { icon: <FiMail size={18} />, label: 'Email', value: 'hello@luxestudio.com' },
                  { icon: <FiClock size={18} />, label: 'Hours', value: 'Mon–Sat: 9am–8pm · Sun: 10am–6pm' },
                ].map((item, i) => (
                  <div key={i} className={styles.contactInfoItem}>
                    <div className={styles.contactInfoIcon}>
                      {item.icon}
                    </div>
                    <div>
                      <p className={styles.contactLabel}>{item.label}</p>
                      <p className={styles.contactValue}>{item.value}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
            <div className={styles.contactCtaCard}>
              <div className={styles.contactCtaGlow} />
              <div className={styles.contactCtaIcon}>
                <FiMessageCircle size={36} stroke="var(--luxe-gold)" />
              </div>
              <h3 className={styles.contactCtaHeading}>Have a Question?</h3>
              <p className={styles.contactCtaText}>
                We'd love to hear from you. Reach out and our team will get back to you promptly.
              </p>
              <Button variant="secondary" size="lg" onClick={() => router.push(`/${slug}/contact`)}>
                Get in Touch <FiArrowRight size={16} />
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* =============================================
          13 — NEWSLETTER
          ============================================= */}
      <section className="luxe-newsletter">
        <div className="luxe-newsletter-content">
          <h2 className="luxe-newsletter-title">Stay Inspired</h2>
          <p className="luxe-newsletter-subtitle">Subscribe to receive exclusive offers, beauty tips, and early access to new services.</p>
          <form className="luxe-newsletter-form" onSubmit={(e) => e.preventDefault()}>
            <input type="email" placeholder="Enter your email address" required />
            <Button variant="secondary" size="lg" htmlType="submit">Subscribe</Button>
          </form>
        </div>
      </section>

      {/* =============================================
          FLOATING BOOK BUTTON
          ============================================= */}
      <div className={styles.floatingBookBtn}>
        <AntButton
          onClick={() => setQuickBookOpen(true)}
          className={styles.floatingBtn}
          aria-label="Quick book"
          icon={<FiPlus size={28} />}
        />
      </div>

      {/* =============================================
          QUICK BOOK MODAL
          ============================================= */}
      <Modal
        title={<span className={`luxe-modal-title ${styles.modalTitle}`}>Quick Appointment Request</span>}
        open={quickBookOpen}
        onCancel={() => setQuickBookOpen(false)}
        footer={null}
        width={480}
        style={{ maxWidth: 'calc(100vw - 32px)' }}
        className={styles.modalStyle}
        rootClassName="luxe-modal-antd"
      >
        <Form form={quickForm} layout="vertical" className={styles.modalForm}>
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
            <textarea className={`luxe-input ${styles.modalTextarea}`} rows={3} placeholder="Preferred date, time, or special requests" />
          </Form.Item>
          <div className={styles.modalButtons}>
            <AntButton onClick={() => setQuickBookOpen(false)} type="text">Cancel</AntButton>
            <Button variant="secondary" size="md" onClick={handleQuickBook}>Send Request</Button>
          </div>
        </Form>
      </Modal>
    </div>
  );
}

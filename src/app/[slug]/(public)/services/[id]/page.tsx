'use client';

import React from 'react';
import { Button } from 'antd';
import { useParams, useRouter } from 'next/navigation';
import Link from 'next/link';
import styles from './service-detail.module.css';

const services = [
  { id: '1', category: 'Hair', name: 'Signature Haircut', desc: 'Precision cut tailored to your face shape and hair texture with a relaxing shampoo and blow-dry. Our master stylists take the time to understand your preferences and lifestyle to create a look that perfectly suits you.', duration: '60 min', price: '₹2,500', rating: 4.9, reviews: 128, image: 'https://images.unsplash.com/photo-1560066984-138dadb4c035?w=800&q=80', benefits: ['Personalized consultation', 'Shampoo & conditioning', 'Precision cutting', 'Blow-dry & styling', 'Product recommendations'], included: ['Hair wash', 'Styling products', 'Refreshments'], staff: ['Priya Sharma', 'Rohit Verma'], faqs: [{ q: 'How long does a haircut take?', a: 'A signature haircut typically takes 60 minutes, including consultation, wash, cut, and style.' }, { q: 'How often should I get a haircut?', a: 'We recommend every 4-6 weeks to maintain your style and keep your hair healthy.' }] },
  { id: '2', category: 'Hair', name: 'Keratin Treatment', desc: 'Professional smoothing treatment that eliminates frizz and adds incredible shine for up to 3 months. Our keratin treatments use formaldehyde-free formulas that are safe for all hair types.', duration: '120 min', price: '₹5,500', rating: 4.8, reviews: 96, image: 'https://images.unsplash.com/photo-1595476108010-b4d1f102b1b1?w=800&q=80', benefits: ['Frizz-free results', 'Up to 3 months lasting', 'Improved shine', 'Reduced styling time'], included: ['Hair analysis', 'Deep cleanse', 'Keratin application', 'Blow-dry & flat iron'], staff: ['Priya Sharma'], faqs: [{ q: 'How long does the treatment last?', a: 'Results typically last 2-3 months depending on your hair type and maintenance routine.' }, { q: 'Can I wash my hair after treatment?', a: 'We recommend waiting 72 hours before washing to allow the keratin to fully bond.' }] },
  { id: '3', category: 'Skin', name: 'Luxury Facial', desc: 'Deep-cleansing facial tailored to your skin type. Our estheticians use a multi-step approach to cleanse, exfoliate, extract, and hydrate for radiant results.', duration: '75 min', price: '₹3,200', rating: 4.9, reviews: 214, image: 'https://images.unsplash.com/photo-1570172619644-dfd03ed5d881?w=800&q=80', benefits: ['Deep cleansing', 'Exfoliation', 'Extraction', 'Hydrating mask', 'Face & neck massage'], included: ['Skin analysis', 'Double cleanse', 'Steam & extraction', 'Mask & massage', 'SPF application'], staff: ['Ananya Patel', 'Maya Krishnan'], faqs: [{ q: 'How often should I get a facial?', a: 'For best results, we recommend a facial every 4-6 weeks to maintain healthy, glowing skin.' }] },
  { id: '4', category: 'Makeup', name: 'Bridal Makeup', desc: 'Complete bridal look with trial session, HD makeup, and touch-up kit. Our bridal package includes a pre-wedding consultation and trial to ensure your perfect look.', duration: '180 min', price: '₹12,000', rating: 5.0, reviews: 67, image: 'https://images.unsplash.com/photo-1522337360788-8b13dee7a37e?w=800&q=80', benefits: ['Trial session included', 'HD airbrush makeup', 'False lashes', 'Touch-up kit', 'Lip & brow services'], included: ['Consultation', 'Skin prep', 'Full face makeup', 'Hair styling', 'Touch-up kit'], staff: ['Priya Sharma', 'Ananya Patel'], faqs: [{ q: 'Should I bring inspiration photos?', a: 'Yes! We encourage you to bring photos of makeup looks you love for reference.' }] },
];

const relatedServices = [
  { id: '5', name: 'Blow-Dry & Styling', price: '₹1,200', image: 'https://images.unsplash.com/photo-1567894340315-735d7c361db7?w=400&q=80' },
  { id: '9', name: 'Manicure & Pedicure', price: '₹1,800', image: 'https://images.unsplash.com/photo-1610992015732-2449b76344bc?w=400&q=80' },
  { id: '13', name: 'Aromatherapy Massage', price: '₹4,000', image: 'https://images.unsplash.com/photo-1544161515-4ab6ce6db874?w=400&q=80' },
];

export default function ServiceDetailPage() {
  const params = useParams();
  const router = useRouter();
  const slug = params?.slug as string;
  const service = services.find((s) => s.id === params?.id);

  if (!service) {
    return (
      <div className="luxe-404">
        <div className="luxe-404-code">404</div>
        <h1 className="luxe-404-title">Service Not Found</h1>
        <p className="luxe-404-desc">The service you are looking for does not exist or has been removed.</p>
        <Link href={`/${slug}/services`} className="luxe-btn luxe-btn-primary luxe-btn-lg">View All Services</Link>
      </div>
    );
  }

  return (
    <>
      {/* Hero */}
      <section className={`luxe-hero ${styles.hero}`}>
        <div className="luxe-hero-bg"><img src={service.image} alt={service.name} /></div>
        <div className="luxe-hero-overlay" />
        <div className="luxe-hero-content">
          <div className="animate-fade-in-up delay-1">
            <span className="luxe-hero-tagline">{service.category}</span>
          </div>
          <h1 className="luxe-hero-title animate-fade-in-up delay-2">{service.name}</h1>
          <p className="luxe-hero-subtitle animate-fade-in-up delay-3">{service.desc}</p>
          <div className="luxe-hero-actions animate-fade-in-up delay-4">
            <Button onClick={() => router.push(`/${slug}/book?service=${service.id}`)} className="luxe-btn luxe-btn-secondary luxe-btn-xl">Book Now — {service.price}</Button>
            <div className={styles.heroDuration}>
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><circle cx="12" cy="12" r="10"/><path d="M12 6v6l4 2"/></svg>
              {service.duration}
            </div>
          </div>
        </div>
      </section>

      {/* Content */}
      <section className="luxe-section">
        <div className="luxe-container-lg">
          <div className={styles.contentGrid}>
            {/* Left */}
            <div>
              <h2 className={`luxe-heading-3 ${styles.headingGap}`}>Service Details</h2>
              <p className={`luxe-body-text ${styles.bodyText}`}>{service.desc}</p>

              <h3 className={styles.sectionTitle}>Benefits</h3>
              <ul className={styles.benefitsList}>
                {service.benefits.map((b) => (
                  <li key={b} className={styles.benefitItem}>
                    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="var(--luxe-emerald)" strokeWidth="2.5"><path d="M20 6L9 17l-5-5"/></svg>
                    {b}
                  </li>
                ))}
              </ul>

              <h3 className={styles.sectionTitle}>What&apos;s Included</h3>
              <ul className={styles.benefitsList}>
                {service.included.map((inc) => (
                  <li key={inc} className={styles.benefitItem}>
                    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="var(--luxe-gold)" strokeWidth="2.5"><path d="M22 11.08V12a10 10 0 11-5.93-9.14"/><path d="M22 4L12 14.01l-3-3"/></svg>
                    {inc}
                  </li>
                ))}
              </ul>

              <h3 className={styles.sectionTitle}>Available With</h3>
              <div className={styles.staffRow}>
                {service.staff.map((name) => (
                  <span key={name} className="luxe-tag luxe-tag-gold">{name}</span>
                ))}
              </div>

              {/* FAQ */}
              <h3 className={styles.sectionTitle}>FAQs</h3>
              {service.faqs.map((faq, i) => (
                <FAQItem key={i} question={faq.q} answer={faq.a} />
              ))}
            </div>

            {/* Right - Sidebar */}
            <div>
              <div className={styles.stickySidebar}>
                <div className={`luxe-booking-summary ${styles.bookingSummary}`}>
                  <div className="luxe-booking-summary-row">
                    <span className="luxe-booking-summary-label">Service</span>
                    <span className="luxe-booking-summary-value">{service.name}</span>
                  </div>
                  <div className="luxe-booking-summary-row">
                    <span className="luxe-booking-summary-label">Duration</span>
                    <span className="luxe-booking-summary-value">{service.duration}</span>
                  </div>
                  <div className="luxe-booking-summary-row">
                    <span className="luxe-booking-summary-label">Category</span>
                    <span className="luxe-booking-summary-value">{service.category}</span>
                  </div>
                  <div className="luxe-booking-summary-row">
                    <span className="luxe-booking-summary-label">Rating</span>
                    <span className="luxe-booking-summary-value">{service.rating} ★ ({service.reviews})</span>
                  </div>
                  <div className={`luxe-booking-summary-row ${styles.bookingSummaryRowLast}`}>
                    <span className="luxe-booking-summary-label">Price</span>
                    <span className="luxe-booking-summary-total">{service.price}</span>
                  </div>
                </div>

                <Button onClick={() => router.push(`/${slug}/book?service=${service.id}`)} className={`luxe-btn luxe-btn-secondary luxe-btn-xl ${styles.fullWidthBtn} ${styles.bookBtnMargin}`}>
                  Book Appointment
                </Button>
                <Button onClick={() => router.push(`/${slug}/services`)} className={`luxe-btn luxe-btn-lg ${styles.fullWidthBtn}`}>
                  View All Services
                </Button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Related Services */}
      <section className={`luxe-section ${styles.relatedSection}`}>
        <div className="luxe-container-lg">
          <div className="luxe-section-header">
            <h2 className="luxe-section-title">Related Services</h2>
          </div>
          <div className="luxe-grid-3">
            {relatedServices.map((rs) => (
              <div key={rs.id} className="luxe-service-card" onClick={() => router.push(`/${slug}/services/${rs.id}`)}>
                <div className="card-image-wrap">
                  <img src={rs.image} alt={rs.name} />
                  <div className="card-price-badge">{rs.price}</div>
                </div>
                <div className="luxe-card-body">
                  <h3 className={styles.relatedCardTitle}>{rs.name}</h3>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}

function FAQItem({ question, answer }: { question: string; answer: string }) {
  const [open, setOpen] = React.useState(false);
  return (
    <div className="luxe-accordion-item">
      <Button className={`luxe-accordion-trigger ${open ? 'open' : ''}`} onClick={() => setOpen(!open)}>
        {question}
        <svg className="chevron" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M6 9l6 6 6-6"/></svg>
      </Button>
      <div className={`luxe-accordion-content ${open ? 'open' : ''}`}>
        <div className="luxe-accordion-content-inner">{answer}</div>
      </div>
    </div>
  );
}

'use client';

import React, { useState } from 'react';
import { Button } from 'antd';
import { useParams, useRouter } from 'next/navigation';
import Link from 'next/link';
import styles from './services.module.css';

const allServices = [
  { id: '1', category: 'Hair', name: 'Signature Haircut', desc: 'Precision cut tailored to your face shape and hair texture with a relaxing shampoo and blow-dry.', duration: '60 min', price: '₹2,500', rating: 4.9, reviews: 128, image: 'https://images.unsplash.com/photo-1560066984-138dadb4c035?w=600&q=80' },
  { id: '2', category: 'Hair', name: 'Keratin Treatment', desc: 'Professional smoothing treatment that eliminates frizz and adds incredible shine for up to 3 months.', duration: '120 min', price: '₹5,500', rating: 4.8, reviews: 96, image: 'https://images.unsplash.com/photo-1595476108010-b4d1f102b1b1?w=600&q=80' },
  { id: '3', category: 'Hair', name: 'Hair Color & Highlights', desc: 'Professional color application for vibrant, long-lasting results.', duration: '150 min', price: '₹4,500', rating: 4.7, reviews: 203, image: 'https://images.unsplash.com/photo-1562322140-8baeececf3df?w=600&q=80' },
  { id: '4', category: 'Hair', name: 'Hair Spa Treatment', desc: 'Deep conditioning treatment with hot oil massage for damaged and dry hair.', duration: '45 min', price: '₹1,800', rating: 4.8, reviews: 167, image: 'https://images.unsplash.com/photo-1595475884562-073c30d45670?w=600&q=80' },
  { id: '5', category: 'Hair', name: 'Blow-Dry & Styling', desc: 'Professional blow-dry with volumizing products and heat protection.', duration: '45 min', price: '₹1,200', rating: 4.9, reviews: 342, image: 'https://images.unsplash.com/photo-1567894340315-735d7c361db7?w=600&q=80' },
  { id: '6', category: 'Skin', name: 'Luxury Facial', desc: 'Deep-cleansing facial tailored to your skin type.', duration: '75 min', price: '₹3,200', rating: 4.9, reviews: 214, image: 'https://images.unsplash.com/photo-1570172619644-dfd03ed5d881?w=600&q=80' },
  { id: '7', category: 'Skin', name: 'Chemical Peel', desc: 'Medical-grade chemical peel to reduce fine lines, acne scars, and hyperpigmentation.', duration: '60 min', price: '₹4,000', rating: 4.8, reviews: 89, image: 'https://images.unsplash.com/photo-1512290923902-8a9f81dc236c?w=600&q=80' },
  { id: '8', category: 'Skin', name: 'Microdermabrasion', desc: 'Non-invasive exfoliation treatment for smoother, brighter skin.', duration: '45 min', price: '₹2,800', rating: 4.7, reviews: 156, image: 'https://images.unsplash.com/photo-1616394584738-fc6e612e71b9?w=600&q=80' },
  { id: '9', category: 'Nails', name: 'Manicure & Pedicure', desc: 'Luxury nail care with paraffin wax treatment and essential oil massage.', duration: '90 min', price: '₹1,800', rating: 4.7, reviews: 342, image: 'https://images.unsplash.com/photo-1610992015732-2449b76344bc?w=600&q=80' },
  { id: '10', category: 'Nails', name: 'Gel Extension', desc: 'Professional gel nail extensions with custom art and design.', duration: '120 min', price: '₹2,500', rating: 4.8, reviews: 198, image: 'https://images.unsplash.com/photo-1604654894610-df63bc536371?w=600&q=80' },
  { id: '11', category: 'Makeup', name: 'Bridal Makeup', desc: 'Complete bridal look with trial session, HD makeup, and touch-up kit.', duration: '180 min', price: '₹12,000', rating: 5.0, reviews: 67, image: 'https://images.unsplash.com/photo-1522337360788-8b13dee7a37e?w=600&q=80' },
  { id: '12', category: 'Makeup', name: 'Party Makeup', desc: 'Glamorous evening makeup with long-wear products.', duration: '60 min', price: '₹3,500', rating: 4.9, reviews: 234, image: 'https://images.unsplash.com/photo-1487412947147-5cebf100ffc2?w=600&q=80' },
  { id: '13', category: 'Spa', name: 'Aromatherapy Massage', desc: 'Full-body massage with essential oils to relieve stress and tension.', duration: '90 min', price: '₹4,000', rating: 4.9, reviews: 178, image: 'https://images.unsplash.com/photo-1544161515-4ab6ce6db874?w=600&q=80' },
  { id: '14', category: 'Spa', name: 'Body Scrub & Wrap', desc: 'Exfoliating body treatment with seaweed wrap and hydrating mask.', duration: '75 min', price: '₹3,500', rating: 4.8, reviews: 123, image: 'https://images.unsplash.com/photo-1600334089648-b0d9d3028eb2?w=600&q=80' },
];

const categories = ['All', 'Hair', 'Skin', 'Nails', 'Makeup', 'Spa'];

const packagesData = [
  {
    id: 'pk1', name: 'Date Night Ready', price: 175, original: 210, popular: false,
    services: [
      { name: 'Blowout & Styling', duration: '50 min', price: 65, image: 'https://images.unsplash.com/photo-1522337360788-8b13dee7a37e?w=200&h=200&fit=crop' },
      { name: 'Gel Manicure', duration: '45 min', price: 55, image: 'https://images.unsplash.com/photo-1604654894610-df63bc536371?w=200&h=200&fit=crop' },
      { name: 'Lip & Brow Wax', duration: '20 min', price: 35, image: 'https://images.unsplash.com/photo-1519699047748-de8e457a634e?w=200&h=200&fit=crop' },
    ],
  },
  {
    id: 'pk2', name: 'Total Transformation', price: 320, original: 395, popular: true,
    services: [
      { name: 'Haircut & Color', duration: '150 min', price: 165, image: 'https://images.unsplash.com/photo-1563241527-3004b7be0ffd?w=200&h=200&fit=crop' },
      { name: 'Luxury Facial', duration: '60 min', price: 85, image: 'https://images.unsplash.com/photo-1570172619644-dfd03ed5d881?w=200&h=200&fit=crop' },
      { name: 'Spa Manicure & Pedicure', duration: '90 min', price: 95, image: 'https://images.unsplash.com/photo-1610992015732-2449b76344bc?w=200&h=200&fit=crop' },
    ],
  },
  {
    id: 'pk3', name: 'Ultimate Spa Day', price: 495, original: 620, popular: false,
    services: [
      { name: 'Signature Massage', duration: '60 min', price: 110, image: 'https://images.unsplash.com/photo-1544161515-4ab6ce6db874?w=200&h=200&fit=crop' },
      { name: 'Luxury Facial', duration: '60 min', price: 85, image: 'https://images.unsplash.com/photo-1570172619644-dfd03ed5d881?w=200&h=200&fit=crop' },
      { name: 'Spa Pedicure', duration: '60 min', price: 75, image: 'https://images.unsplash.com/photo-1600334089648-b0d9d3028eb2?w=200&h=200&fit=crop' },
      { name: 'Scalp Treatment', duration: '45 min', price: 65, image: 'https://images.unsplash.com/photo-1595475884562-073c30d45670?w=200&h=200&fit=crop' },
      { name: 'Champagne Service', duration: '30 min', price: 45, image: 'https://images.unsplash.com/photo-1514362545857-3bc16c4c1fce?w=200&h=200&fit=crop' },
    ],
  },
];

export default function ServicesPage() {
  const params = useParams();
  const router = useRouter();
  const slug = params?.slug as string;
  const [activeCategory, setActiveCategory] = useState('All');
  const [searchQuery, setSearchQuery] = useState('');

  const filtered = allServices.filter((s) => {
    const matchCategory = activeCategory === 'All' || s.category === activeCategory;
    const matchSearch = s.name.toLowerCase().includes(searchQuery.toLowerCase()) || s.desc.toLowerCase().includes(searchQuery.toLowerCase());
    return matchCategory && matchSearch;
  });

  return (
    <>
      {/* Hero */}
      <section className={`luxe-hero ${styles.hero}`}>
        <div className="luxe-hero-bg">
          <img src="https://images.unsplash.com/photo-1560066984-138dadb4c035?w=1920&q=85" alt="Services" />
        </div>
        <div className="luxe-hero-overlay" />
        <div className={`luxe-hero-content ${styles.heroContent}`}>
          <h1 className={`luxe-hero-title ${styles.heroTitle}`}>Our Services</h1>
          <p className={`luxe-hero-subtitle ${styles.heroSubtitle}`}>Discover our comprehensive range of beauty services</p>
        </div>
      </section>

      {/* Filters */}
      <section className={`luxe-section ${styles.filters}`}>
        <div className="luxe-container-lg">
          <div className={styles.filterBar}>
            <div className={styles.filterChips}>
              {categories.map((cat) => (
                <Button key={cat} className={`luxe-chip ${activeCategory === cat ? 'active' : ''}`} onClick={() => setActiveCategory(cat)}>
                  {cat}
                </Button>
              ))}
            </div>
            <div className={`luxe-search ${styles.searchWrapper}`}>
              <svg className="search-icon" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><circle cx="11" cy="11" r="8"/><path d="M21 21l-4.35-4.35"/></svg>
              <input className={`luxe-input ${styles.searchInputField}`} placeholder="Search services..." value={searchQuery} onChange={(e) => setSearchQuery(e.target.value)} />
            </div>
          </div>
        </div>
      </section>

      {/* Services Grid */}
      <section className="luxe-section">
        <div className="luxe-container-lg">
          {filtered.length > 0 ? (
            <div className="luxe-grid-3">
              {filtered.map((s) => (
                <div key={s.id} className="luxe-service-card" onClick={() => router.push(`/${slug}/services/${s.id}`)}>
                  <div className="card-image-wrap">
                    <img src={s.image} alt={s.name} />
                    <div className="card-price-badge">{s.price}</div>
                    <div className="card-quick-book">
                      <Button onClick={(e) => { e.stopPropagation(); router.push(`/${slug}/book?service=${s.id}`); }} type="primary" className="luxe-btn luxe-btn-sm">
                        Book Now
                      </Button>
                    </div>
                  </div>
                  <div className="luxe-card-body">
                    <span className={`luxe-badge luxe-badge-light ${styles.cardBadge}`}>{s.category}</span>
                    <h3 className={styles.cardTitle}>{s.name}</h3>
                    <p className={`luxe-body-text ${styles.cardDesc}`}>{s.desc}</p>
                    <div className={styles.cardFooter}>
                      <span className="luxe-card-duration">
                        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><circle cx="12" cy="12" r="10"/><path d="M12 6v6l4 2"/></svg>
                        {s.duration}
                      </span>
                      <span className="luxe-card-rating">
                        <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor"><path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"/></svg>
                        {s.rating} <span className={styles.reviewCount}>({s.reviews})</span>
                      </span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="luxe-empty">
              <div className="luxe-empty-icon">
                <svg width="64" height="64" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"><circle cx="11" cy="11" r="8"/><path d="M21 21l-4.35-4.35"/></svg>
              </div>
              <h3 className="luxe-empty-title">No services found</h3>
              <p className="luxe-empty-desc">Try adjusting your search or filter to find what you are looking for.</p>
              <Button className="luxe-btn" onClick={() => { setActiveCategory('All'); setSearchQuery(''); }}>Clear Filters</Button>
            </div>
          )}
        </div>
      </section>

      {/* Packages */}
      <section className={`luxe-section ${styles.sectionAlt}`}>
        <div className="luxe-container-lg">
          <div className="luxe-section-header">
            <span className="luxe-section-overline">Curated Collections</span>
            <h2 className="luxe-section-title">Luxury Packages</h2>
            <p className="luxe-section-subtitle">Handpicked combinations for the ultimate salon experience. Save more when you bundle.</p>
            <div className="luxe-divider" />
          </div>
          <div className="luxe-grid-3">
            {packagesData.map((pkg) => {
              const savings = Math.round((1 - pkg.price / pkg.original) * 100);
              return (
                <div key={pkg.id} className="luxe-package-card" style={{ textAlign: 'left', display: 'flex', flexDirection: 'column' }}>
                  {pkg.popular && <span className="package-badge"><span className="luxe-badge luxe-badge-gold">Best Value</span></span>}

                  <div style={{ marginBottom: 'var(--space-5)' }}>
                    <h4 style={{ fontFamily: 'var(--font-display)', fontSize: 'var(--text-2xl)', fontWeight: 600, margin: 0 }}>{pkg.name}</h4>
                  </div>

                  <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--space-2)', marginBottom: 'var(--space-4)' }}>
                    {pkg.services.map((svc, i) => (
                      <div key={i} style={{
                        display: 'flex', alignItems: 'center', gap: 'var(--space-3)',
                        padding: 'var(--space-2) var(--space-3)', borderRadius: 'var(--radius-xl)',
                        background: 'var(--luxe-ivory)',
                      }}>
                        <div style={{ width: 40, height: 40, borderRadius: 'var(--radius-lg)', overflow: 'hidden', flexShrink: 0 }}>
                          <img src={svc.image} alt={svc.name} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                        </div>
                        <div style={{ flex: 1, minWidth: 0 }}>
                          <div style={{ fontSize: 'var(--text-sm)', fontWeight: 500, color: 'var(--luxe-text)', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>{svc.name}</div>
                          <div style={{ fontSize: 'var(--text-xs)', color: 'var(--luxe-text-tertiary)', display: 'inline-flex', alignItems: 'center', gap: 3 }}>
                            <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><circle cx="12" cy="12" r="10"/><path d="M12 6v6l4 2"/></svg>
                            {svc.duration}
                          </div>
                        </div>
                        <span style={{ fontSize: 'var(--text-sm)', fontWeight: 600, color: 'var(--luxe-text)', flexShrink: 0 }}>${svc.price}</span>
                      </div>
                    ))}
                  </div>

                  <div style={{
                    display: 'flex', alignItems: 'center', gap: 'var(--space-2)', justifyContent: 'flex-end',
                    padding: 'var(--space-2) var(--space-3)', marginBottom: 'var(--space-4)',
                    fontSize: 'var(--text-sm)', color: 'var(--luxe-text-tertiary)',
                    borderTop: '1px solid var(--luxe-border-light)',
                    marginTop: 'auto',
                  }}>
                    <span>Total value</span>
                    <span style={{ textDecoration: 'line-through', color: 'var(--luxe-text-tertiary)' }}>${pkg.original}</span>
                    <span style={{ fontSize: 'var(--text-lg)', fontWeight: 700, color: 'var(--luxe-gold)' }}>${pkg.price}</span>
                    <span style={{ fontSize: 'var(--text-xs)', fontWeight: 600, color: '#fff', background: 'var(--luxe-emerald)', padding: '2px 8px', borderRadius: 'var(--radius-full)' }}>Save {savings}%</span>
                  </div>

                  <Button onClick={() => router.push(`/${slug}/book`)} type="primary" className="luxe-btn luxe-btn-md" style={{ width: '100%' }}>
                    Select Package
                  </Button>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className={`luxe-section ${styles.ctaSection}`}>
        <div className={`luxe-container-sm ${styles.ctaContent}`}>
          <h2 className="luxe-section-title">Ready to Transform?</h2>
          <p className={`luxe-section-subtitle ${styles.ctaSubtitle}`}>Book your appointment today and experience the difference.</p>
          <Button onClick={() => router.push(`/${slug}/book`)} className="luxe-btn luxe-btn-secondary luxe-btn-xl">
            Book Appointment
          </Button>
        </div>
      </section>
    </>
  );
}

'use client';

import React, { useState } from 'react';
import { Button } from 'antd';
import { useParams, useRouter } from 'next/navigation';
import Link from 'next/link';
import styles from './packages.module.css';

const packages = [
  {
    id: 'p1', name: 'Bridal Glow Package', category: 'Bridal',
    desc: 'Everything you need for your special day. From hair and makeup to skincare, we ensure you look absolutely radiant.',
    price: '₹25,000', originalPrice: '₹32,000', savings: '22%',
    duration: 'Full Day', image: 'https://images.unsplash.com/photo-1596462502278-27bfdc403348?w=800&q=80',
    includes: ['Bridal Makeup Trial', 'HD Airbrush Makeup', 'Hair Styling', 'Luxury Facial', 'Manicure & Pedicure', 'Touch-up Kit', 'Fresh Flower Arrangement'],
  },
  {
    id: 'p2', name: 'Spa Escape Package', category: 'Spa',
    desc: 'A full day of relaxation and rejuvenation. Unwind with our most luxurious spa treatments in a serene environment.',
    price: '₹8,500', originalPrice: '₹11,000', savings: '23%',
    duration: '4 Hours', image: 'https://images.unsplash.com/photo-1544161515-4ab6ce6db874?w=800&q=80',
    includes: ['Aromatherapy Massage', 'Luxury Facial', 'Body Scrub & Wrap', 'Manicure & Pedicure', 'Herbal Tea & Refreshments'],
  },
  {
    id: 'p3', name: 'Hair Transformation', category: 'Hair',
    desc: 'Complete hair makeover for those looking to dramatically change their look.',
    price: '₹9,999', originalPrice: '₹13,500', savings: '26%',
    duration: '3-4 Hours', image: 'https://images.unsplash.com/photo-1562322140-8baeececf3df?w=800&q=80',
    includes: ['Consultation', 'Hair Color/Highlights', 'Keratin Treatment', 'Signature Haircut', 'Blow-Dry & Styling', 'Hair Care Products'],
  },
  {
    id: 'p4', name: 'Beauty Essentials', category: 'Beauty',
    desc: 'Curated collection of our most popular beauty services. Perfect for a complete pampering session.',
    price: '₹5,500', originalPrice: '₹7,000', savings: '21%',
    duration: '2 Hours', image: 'https://images.unsplash.com/photo-1610992015732-2449b76344bc?w=800&q=80',
    includes: ['Luxury Facial', 'Manicure', 'Pedicure', 'Eyebrow Shaping', 'Makeup Touch-up'],
  },
  {
    id: 'p5', name: 'Grooming Package', category: 'Grooming',
    desc: 'Designed for the modern gentleman. Grooming services for a polished, confident look.',
    price: '₹3,500', originalPrice: '₹4,800', savings: '27%',
    duration: '90 min', image: 'https://images.unsplash.com/photo-1503951914875-452cb67b3cbe?w=800&q=80',
    includes: ['Signature Haircut', 'Beard Styling', 'Facial', 'Head Massage', 'Shoe Shine'],
  },
  {
    id: 'p6', name: 'Wellness Retreat', category: 'Wellness',
    desc: 'Holistic wellness package combining body treatments, relaxation therapies, and mindfulness.',
    price: '₹12,000', originalPrice: '₹15,500', savings: '23%',
    duration: '5 Hours', image: 'https://images.unsplash.com/photo-1600334089648-b0d9d3028eb2?w=800&q=80',
    includes: ['Full Body Massage', 'Body Scrub', 'Body Wrap', 'Luxury Facial', 'Scalp Treatment', 'Herbal Steam', 'Wellness Tea & Snacks'],
  },
];

const categories = ['All', 'Bridal', 'Spa', 'Hair', 'Beauty', 'Grooming', 'Wellness'];

export default function PackagesPage() {
  const params = useParams();
  const router = useRouter();
  const slug = params?.slug as string;
  const [activeCategory, setActiveCategory] = useState('All');

  const filtered = activeCategory === 'All' ? packages : packages.filter((p) => p.category === activeCategory);

  return (
    <>
      <section className={`luxe-hero ${styles.hero}`}>
        <div className="luxe-hero-bg"><img src="https://images.unsplash.com/photo-1596462502278-27bfdc403348?w=1920&q=85" alt="Packages" /></div>
        <div className="luxe-hero-overlay" />
        <div className={`luxe-hero-content ${styles.heroContent}`}>
          <h1 className={`luxe-hero-title ${styles.heroTitle}`}>Our Packages</h1>
          <p className={`luxe-hero-subtitle ${styles.heroSubtitle}`}>Curated experiences designed to give you the ultimate luxury treatment at exceptional value.</p>
        </div>
      </section>

      <section className={`luxe-section ${styles.categoriesSection}`}>
        <div className="luxe-container-lg">
          <div className={styles.filterRow}>
            {categories.map((cat) => (
              <Button key={cat} className={`luxe-chip ${activeCategory === cat ? 'active' : ''}`} onClick={() => setActiveCategory(cat)}>{cat}</Button>
            ))}
          </div>
        </div>
      </section>

      <section className="luxe-section">
        <div className="luxe-container-lg">
          <div className="luxe-grid-3">
            {filtered.map((pkg) => (
              <div key={pkg.id} className={`luxe-package-card ${styles.card}`}>
                <img src={pkg.image} alt={pkg.name} className={styles.cardImage} />
                <div className={styles.cardBody}>
                  {pkg.savings && <span className={`luxe-badge luxe-badge-discount ${styles.badge}`}>Save {pkg.savings}</span>}
                  <h3 className={styles.cardTitle}>{pkg.name}</h3>
                  <p className={`luxe-body-text ${styles.cardDesc}`}>{pkg.desc}</p>
                  <div className={styles.priceRow}>
                    <span className={`package-price ${styles.price}`}>₹{pkg.price.replace('₹', '')}<span>/{pkg.duration}</span></span>
                    {pkg.originalPrice && <span className={styles.originalPrice}>{pkg.originalPrice}</span>}
                  </div>
                  <ul className={`package-perks ${styles.perksList}`}>
                    {pkg.includes.slice(0, 4).map((item) => (
                      <li key={item}>
                        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="var(--luxe-emerald)" strokeWidth="2.5"><path d="M20 6L9 17l-5-5"/></svg>
                        {item}
                      </li>
                    ))}
                    {pkg.includes.length > 4 && <li className={styles.moreItems}>+{pkg.includes.length - 4} more items</li>}
                  </ul>
                  <Button onClick={() => router.push(`/${slug}/book?package=${pkg.id}`)} type="primary" className={`luxe-btn luxe-btn-lg ${styles.bookBtn}`}>Book This Package</Button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className={`luxe-section ${styles.ctaSection}`}>
        <div className="luxe-container-sm">
          <h2 className="luxe-newsletter-title">Looking for a Custom Package?</h2>
          <p className="luxe-newsletter-subtitle">Contact us for personalized packages tailored to your specific needs and preferences.</p>
          <Link href={`/${slug}/contact`} className="luxe-btn luxe-btn-secondary luxe-btn-lg">Get in Touch</Link>
        </div>
      </section>
    </>
  );
}

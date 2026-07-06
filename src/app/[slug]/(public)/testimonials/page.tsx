'use client';

import React, { useState } from 'react';
import { Button } from 'antd';
import Link from 'next/link';
import styles from './testimonials.module.css';

const reviews = [
  { id: 'r1', name: 'Neha Gupta', text: 'Absolutely stunning results! The team at LuxeStudio transformed my look completely. The attention to detail is remarkable. I have never felt more confident.', rating: 5, service: 'Signature Haircut', date: '2 weeks ago', avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=100&q=80' },
  { id: 'r2', name: 'Sneha Reddy', text: 'I have been coming here for years. The consistency in quality and service is unmatched. Best salon in the city. Priya is a magician with scissors!', rating: 5, service: 'Hair Color & Highlights', date: '1 month ago', avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=100&q=80' },
  { id: 'r3', name: 'Arjun Mehta', text: 'As a groom, I wanted to look my best on my wedding day. Rohit gave me the perfect cut and beard style. The hot towel shave was incredible. Highly recommend!', rating: 5, service: 'Classic Cut & Shave', date: '3 weeks ago', avatar: 'https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=100&q=80' },
  { id: 'r4', name: 'Kavita Desai', text: 'The bridal package was worth every penny. My makeup lasted all day and I felt like a queen. Sophia understood exactly what I wanted. Thank you, LuxeStudio!', rating: 5, service: 'Bridal Makeup', date: '2 months ago', avatar: 'https://images.unsplash.com/photo-1489424731084-a5d8b219a5bb?w=100&q=80' },
  { id: 'r5', name: 'Ritu Agarwal', text: 'The keratin treatment changed my hair completely. So smooth and manageable now. The staff is incredibly professional and the salon ambiance is top-notch.', rating: 5, service: 'Keratin Treatment', date: '1 month ago', avatar: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=100&q=80' },
  { id: 'r6', name: 'Divya Kumar', text: 'Ananya gave me the best facial I have ever had. My skin was glowing for weeks. The organic products they use make a noticeable difference.', rating: 5, service: 'Luxury Facial', date: '3 weeks ago', avatar: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=100&q=80' },
  { id: 'r7', name: 'Vikram Joshi', text: 'Great barber shop experience. Rohit really knows his craft. The attention to detail in the beard shaping is exceptional. Will definitely be coming back.', rating: 5, service: 'Beard Styling', date: '1 week ago', avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=100&q=80' },
  { id: 'r8', name: 'Pooja Sharma', text: 'Maya did incredible nail art for my sister\'s wedding. Everyone was asking where I got them done. The gel extensions looked so natural and lasted for weeks.', rating: 5, service: 'Gel Extensions', date: '2 weeks ago', avatar: 'https://images.unsplash.com/photo-1580618672591-eb180b1a973f?w=100&q=80' },
  { id: 'r9', name: 'Anita Menon', text: 'The spa escape package was exactly what I needed. A full day of pure relaxation. The massage was heavenly and the facial left my skin radiant.', rating: 5, service: 'Spa Escape Package', date: '1 month ago', avatar: 'https://images.unsplash.com/photo-1598346762291-aee88549193f?w=100&q=80' },
  { id: 'r10', name: 'Rahul Kapoor', text: 'I am particular about my hair and Vikram exceeded my expectations. The balayage looks natural and the color is perfect. Finally found my go-to salon.', rating: 5, service: 'Balayage', date: '3 weeks ago', avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&q=80' },
];

export default function TestimonialsPage() {
  const [showAll, setShowAll] = useState(false);
  const displayed = showAll ? reviews : reviews.slice(0, 6);

  return (
    <>
      <section className={`luxe-hero ${styles.hero}`}>
        <div className="luxe-hero-bg"><img src="https://images.unsplash.com/photo-1489424731084-a5d8b219a5bb?w=1920&q=85" alt="Testimonials" /></div>
        <div className="luxe-hero-overlay" />
        <div className={`luxe-hero-content ${styles.heroContent}`}>
          <h1 className={`luxe-hero-title ${styles.heroTitle}`}>Customer Testimonials</h1>
          <p className={`luxe-hero-subtitle ${styles.heroSubtitle}`}>Hear from our customers about their LuxeStudio experience.</p>
        </div>
      </section>

      <section className="luxe-section">
        <div className="luxe-container-lg">
          <div className={styles.grid}>
            {displayed.map((review) => (
              <div key={review.id} className="luxe-review-card">
                <div className="review-stars">
                  {Array.from({ length: review.rating }).map((_, i) => (
                    <svg key={i} width="16" height="16" viewBox="0 0 24 24" fill="currentColor"><path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"/></svg>
                  ))}
                </div>
                <div className="review-text">&ldquo;{review.text}&rdquo;</div>
                <div className="review-author">
                  <img src={review.avatar} alt={review.name} className="review-avatar" />
                  <div>
                    <div className="review-name">{review.name}</div>
                    <div className="review-service">{review.service} • {review.date}</div>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {!showAll && reviews.length > 6 && (
            <div className={styles.showAllWrapper}>
              <Button className="luxe-btn luxe-btn-lg" onClick={() => setShowAll(true)}>
                Show All Reviews ({reviews.length})
              </Button>
            </div>
          )}

          {/* Stats */}
          <div className={styles.statsGrid}>
            <div>
              <div className={styles.statNumber}>4.9★</div>
              <div className="luxe-caption">Average Rating</div>
            </div>
            <div>
              <div className={styles.statNumber}>2.5K+</div>
              <div className="luxe-caption">Verified Reviews</div>
            </div>
            <div>
              <div className={styles.statNumber}>98%</div>
              <div className="luxe-caption">Would Recommend</div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}

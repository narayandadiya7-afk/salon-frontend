'use client';

import React from 'react';
import { useParams, useRouter } from 'next/navigation';
import Link from 'next/link';
import styles from './about.module.css';

const team = [
  { name: 'Priya Sharma', role: 'Founder & Master Stylist', image: 'https://images.unsplash.com/photo-1580618672591-eb180b1a973f?w=400&q=80' },
  { name: 'Ananya Patel', role: 'Lead Esthetician', image: 'https://images.unsplash.com/photo-1598346762291-aee88549193f?w=400&q=80' },
  { name: 'Rohit Verma', role: 'Master Barber', image: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&q=80' },
];

const values = [
  { icon: '🎯', title: 'Quality', desc: 'We are dedicated to providing quality service with attention to every detail.' },
  { icon: '🤝', title: 'Integrity', desc: 'Honest consultations, transparent pricing, and genuine care for our customers.' },
  { icon: '💡', title: 'Innovation', desc: 'Continuous learning and adoption of the latest trends and technologies in beauty.' },
  { icon: '❤️', title: 'Passion', desc: 'A genuine love for what we do, reflected in every haircut, facial, and treatment.' },
  { icon: '🌿', title: 'Sustainability', desc: 'Mindful practices and responsible choices in our daily operations.' },
  { icon: '👥', title: 'Community', desc: 'Building lasting relationships with our customers and supporting local initiatives.' },
];

const milestones = [
  { year: '2010', event: 'LuxeStudio founded by Priya Sharma in Bengaluru' },
  { year: '2013', event: 'Expanded to a 2,000 sq ft premium salon space' },
  { year: '2016', event: 'Expanded services to include advanced skincare treatments' },
  { year: '2018', event: 'Launched LuxeClub membership program' },
  { year: '2020', event: 'Introduced advanced skincare treatments' },
  { year: '2023', event: 'Opened second location, expanded team to 25+ experts' },
];

export default function AboutPage() {
  const params = useParams();
  const router = useRouter();
  const slug = params?.slug as string;

  return (
    <>
      <section className={`luxe-hero ${styles.heroMinHeight}`}>
        <div className="luxe-hero-bg"><img src="https://images.unsplash.com/photo-1600334089648-b0d9d3028eb2?w=1920&q=85" alt="About" /></div>
        <div className="luxe-hero-overlay" />
        <div className={`luxe-hero-content ${styles.heroContentCenter}`}>
          <h1 className={`luxe-hero-title ${styles.heroTitleMargin}`}>Our Story</h1>
          <p className={`luxe-hero-subtitle ${styles.heroSubtitleMargin}`}>A journey of passion and dedication to the art of beauty.</p>
        </div>
      </section>

      {/* Story */}
      <section className="luxe-section">
        <div className="luxe-container-lg">
          <div className={styles.storyGrid}>
            <div>
              <span className="luxe-section-overline">Since 2010</span>
              <h2 className={`luxe-section-title ${styles.sectionTitleLeft}`}>Our Journey</h2>
              <div className="luxe-divider-left" />
              <p className={`luxe-body-text ${styles.bodyMarginBottom}`}>
                LuxeStudio was born from a simple belief: that everyone deserves to look and feel their best.
                Founded by Priya Sharma, a trained stylist with a vision to bring quality beauty
                services to Bengaluru, our salon has grown steadily through the years.
              </p>
              <p className={`luxe-body-text ${styles.bodyMarginBottom}`}>
                Over the past 15 years, we have built a team of talented professionals who share
                our commitment to customer satisfaction. Each member of the LuxeStudio family is carefully selected for
                their skill, creativity, and dedication.
              </p>
              <p className="luxe-body-text">
                Today, LuxeStudio continues to grow, serving our community with a focus on
                quality service and genuine care for every customer.
              </p>
            </div>
            <div className={styles.imageGrid}>
              <img src="https://images.unsplash.com/photo-1600334089648-b0d9d3028eb2?w=400&q=80" alt="Salon" className={styles.imageFull} />
              <div className={styles.imageGridOffset}>
                <img src="https://images.unsplash.com/photo-1560066984-138dadb4c035?w=400&q=80" alt="Salon" className={styles.imageSquareMargin} />
                <img src="https://images.unsplash.com/photo-1512290923902-8a9f81dc236c?w=400&q=80" alt="Salon" className={styles.imageSquare} />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Mission & Vision */}
      <section className={`luxe-section ${styles.sectionWhiteBg}`}>
        <div className="luxe-container-lg">
          <div className={styles.missionVisionGrid}>
            <div className={styles.cardIvory}>
              <div className={styles.iconLarge}>🎯</div>
              <h3 className={styles.cardTitle}>Our Mission</h3>
              <p className="luxe-body-text">To help every customer feel confident and cared for through quality beauty services tailored to their needs.</p>
            </div>
            <div className={styles.cardIvory}>
              <div className={styles.iconLarge}>👁️</div>
              <h3 className={styles.cardTitle}>Our Vision</h3>
              <p className="luxe-body-text">To be a trusted beauty destination known for quality, consistency, and genuine care in everything we do.</p>
            </div>
          </div>
        </div>
      </section>

      {/* Timeline */}
      <section className="luxe-section">
        <div className="luxe-container-sm">
          <div className="luxe-section-header">
            <span className="luxe-section-overline">Timeline</span>
            <h2 className="luxe-section-title">Our Milestones</h2>
          </div>
          <div className={styles.timelineWrapper}>
            {milestones.map((m, i) => (
              <div key={m.year} className={styles.timelineItem}>
                <div className={`${styles.timelineDotBase} ${i === milestones.length - 1 ? styles.timelineDotActive : styles.timelineDotInactive}`} />
                {i < milestones.length - 1 && <div className={styles.timelineLine} />}
                <div className={styles.timelineYear}>{m.year}</div>
                <p className="luxe-body-text">{m.event}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Values */}
      <section className={`luxe-section ${styles.sectionDarkBg}`}>
        <div className="luxe-container-lg">
          <div className="luxe-section-header">
            <span className={`luxe-section-overline ${styles.overlineGold}`}>The LuxeStudio Way</span>
            <h2 className={`luxe-section-title ${styles.titleWhite}`}>Our Core Values</h2>
          </div>
          <div className="luxe-why-grid">
            {values.map((v) => (
              <div key={v.title} className="luxe-why-item">
                <div className={styles.valueIcon}>{v.icon}</div>
                <h3 className={`luxe-why-item-title ${styles.titleWhite}`}>{v.title}</h3>
                <p className={`luxe-why-item-desc ${styles.valueDesc}`}>{v.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Team Preview */}
      <section className="luxe-section">
        <div className="luxe-container-lg">
          <div className="luxe-section-header">
            <span className="luxe-section-overline">Leadership</span>
            <h2 className="luxe-section-title">Meet the Team</h2>
          </div>
          <div className={`luxe-grid-3 ${styles.teamGrid}`}>
            {team.map((t) => (
              <div key={t.name} className="luxe-stylist-card">
                <img src={t.image} alt={t.name} className="stylist-image" />
                <div className={`luxe-card-body ${styles.cardBodyNoPadding}`}>
                  <h3 className={styles.teamMemberName}>{t.name}</h3>
                  <p className={styles.teamMemberRole}>{t.role}</p>
                </div>
              </div>
            ))}
          </div>
          <div className={styles.ctaCenter}>
            <Link href={`/${slug}/team`} className="luxe-btn luxe-btn-outline luxe-btn-lg">View Full Team</Link>
          </div>
        </div>
      </section>
    </>
  );
}

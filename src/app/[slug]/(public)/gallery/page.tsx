'use client';

import React, { useState } from 'react';
import { useParams } from 'next/navigation';
import styles from './gallery.module.css';

const galleryItems = [
  { id: '1', category: 'Hair', image: 'https://images.unsplash.com/photo-1562322140-8baeececf3df?w=600&q=80', title: 'Balayage Transformation', type: 'image' },
  { id: '2', category: 'Hair', image: 'https://images.unsplash.com/photo-1560066984-138dadb4c035?w=600&q=80', title: 'Precision Haircut', type: 'image' },
  { id: '3', category: 'Skin', image: 'https://images.unsplash.com/photo-1570172619644-dfd03ed5d881?w=600&q=80', title: 'Glowing Skin Facial', type: 'image' },
  { id: '4', category: 'Nails', image: 'https://images.unsplash.com/photo-1604654894610-df63bc536371?w=600&q=80', title: 'Artistic Nail Design', type: 'image' },
  { id: '5', category: 'Bridal', image: 'https://images.unsplash.com/photo-1596462502278-27bfdc403348?w=600&q=80', title: 'Bridal Elegance', type: 'image' },
  { id: '6', category: 'Spa', image: 'https://images.unsplash.com/photo-1544161515-4ab6ce6db874?w=600&q=80', title: 'Luxury Spa Treatment', type: 'image' },
  { id: '7', category: 'Hair', image: 'https://images.unsplash.com/photo-1567894340315-735d7c361db7?w=600&q=80', title: 'Voluminous Blow-Dry', type: 'image' },
  { id: '8', category: 'Skin', image: 'https://images.unsplash.com/photo-1512290923902-8a9f81dc236c?w=600&q=80', title: 'Skincare Results', type: 'image' },
  { id: '9', category: 'Nails', image: 'https://images.unsplash.com/photo-1610992015732-2449b76344bc?w=600&q=80', title: 'Gel Extension Art', type: 'image' },
  { id: '10', category: 'Hair', image: 'https://images.unsplash.com/photo-1595475884562-073c30d45670?w=600&q=80', title: 'Hair Spa Treatment', type: 'image' },
  { id: '11', category: 'Bridal', image: 'https://images.unsplash.com/photo-1522337360788-8b13dee7a37e?w=600&q=80', title: 'Bridal Makeup Look', type: 'image' },
  { id: '12', category: 'Spa', image: 'https://images.unsplash.com/photo-1600334089648-b0d9d3028eb2?w=600&q=80', title: 'Wellness Retreat', type: 'image' },
];

const categories = ['All', 'Hair', 'Skin', 'Nails', 'Bridal', 'Spa'];

export default function GalleryPage() {
  const params = useParams();
  const slug = params?.slug as string;
  const [activeCategory, setActiveCategory] = useState('All');
  const [lightbox, setLightbox] = useState<string | null>(null);

  const filtered = activeCategory === 'All' ? galleryItems : galleryItems.filter((g) => g.category === activeCategory);

  return (
    <>
      <section className={`luxe-hero ${styles.hero}`}>
        <div className="luxe-hero-bg"><img src="https://images.unsplash.com/photo-1512290923902-8a9f81dc236c?w=1920&q=85" alt="Gallery" /></div>
        <div className="luxe-hero-overlay" />
        <div className={`luxe-hero-content ${styles.heroContent}`}>
          <h1 className={`luxe-hero-title ${styles.heroTitle}`}>Our Gallery</h1>
          <p className={`luxe-hero-subtitle ${styles.heroSubtitle}`}>Explore our portfolio of transformations, creative work, and the LuxeStudio experience.</p>
        </div>
      </section>

      <section className={`luxe-section ${styles.sectionNoPadding}`}>
        <div className="luxe-container-lg">
          <div className={styles.filterRow}>
            {categories.map((cat) => (
              <button key={cat} className={`luxe-chip ${activeCategory === cat ? 'active' : ''}`} onClick={() => setActiveCategory(cat)}>{cat}</button>
            ))}
          </div>
        </div>
      </section>

      <section className="luxe-section">
        <div className="luxe-container-lg">
          <div className={styles.masonry}>
            {filtered.map((item) => (
              <div
                key={item.id}
                className={`luxe-gallery-card ${styles.galleryCard}`}
                onClick={() => setLightbox(item.image)}
              >
                <img src={item.image} alt={item.title} className={`${styles.galleryImage} ${item.id === '2' || item.id === '7' ? styles.galleryImagePortrait : styles.galleryImageSquare}`} />
                <div className="gallery-overlay">
                  <div className={styles.overlayText}>
                    <p className={styles.overlayTitle}>{item.title}</p>
                    <span className="luxe-badge luxe-badge-gold">{item.category}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Lightbox */}
      {lightbox && (
        <div className={`luxe-modal-overlay ${styles.modalOverlay}`} onClick={() => setLightbox(null)}>
          <div className={styles.modalContent} onClick={(e) => e.stopPropagation()}>
            <img src={lightbox} alt="Gallery preview" className={styles.modalImage} />
            <button onClick={() => setLightbox(null)} className={styles.modalClose}>
              ✕
            </button>
          </div>
        </div>
      )}
    </>
  );
}

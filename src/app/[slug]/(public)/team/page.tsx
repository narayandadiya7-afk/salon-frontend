'use client';

import React, { useState } from 'react';
import { Button } from 'antd';
import styles from './team.module.css';
import { useParams, useRouter } from 'next/navigation';
import Link from 'next/link';

const teamMembers = [
  { id: '1', name: 'Priya Sharma', role: 'Master Stylist & Founder', experience: '12 years', bio: 'Priya is the visionary behind LuxeStudio. With extensive training and a passion for precision cutting, she brings a refined approach to every customer.', specialties: ['Hair Cutting', 'Color', 'Bridal', 'Editorial'], rating: 4.9, reviews: 412, image: 'https://images.unsplash.com/photo-1580618672591-eb180b1a973f?w=400&q=80', languages: ['English', 'Hindi', 'French'], instagram: '@priyasharma' },
  { id: '2', name: 'Ananya Patel', role: 'Lead Esthetician', experience: '8 years', bio: 'Ananya specializes in advanced skincare treatments. She creates personalized skincare regimens tailored to each customer\'s unique needs.', specialties: ['Facials', 'Chemical Peel', 'Microdermabrasion', 'Skin Analysis'], rating: 4.8, reviews: 289, image: 'https://images.unsplash.com/photo-1598346762291-aee88549193f?w=400&q=80', languages: ['English', 'Hindi', 'Kannada'], instagram: '@ananya.skin' },
  { id: '3', name: 'Rohit Verma', role: 'Master Barber', experience: '15 years', bio: 'With 15 years of experience, Rohit is a master of classic and contemporary barbering. His precision fades and traditional straight-razor shaves have made him a favorite among our customers.', specialties: ['Classic Cuts', 'Beard Styling', 'Straight Razor', 'Hot Towel Shave'], rating: 4.9, reviews: 534, image: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&q=80', languages: ['English', 'Hindi'], instagram: '@rohitbarber' },
  { id: '4', name: 'Maya Krishnan', role: 'Nail Artist', experience: '6 years', bio: 'Maya is a talented nail artist known for her intricate designs and attention to detail. She specializes in gel extensions, nail art, and paraffin treatments.', specialties: ['Nail Art', 'Gel Extensions', 'Paraffin', '3D Design'], rating: 4.7, reviews: 198, image: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=400&q=80', languages: ['English', 'Tamil', 'Kannada'], instagram: '@maya.nails' },
  { id: '5', name: 'Vikram Singh', role: 'Hair Color Specialist', experience: '10 years', bio: 'Vikram is a skilled colorist who creates beautiful color transformations using techniques like balayage, ombre, and foiling.', specialties: ['Balayage', 'Ombre', 'Color Correction', 'Highlights'], rating: 4.8, reviews: 267, image: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=400&q=80', languages: ['English', 'Hindi'], instagram: '@vikramcolor' },
  { id: '6', name: 'Sophia D\'Souza', role: 'Makeup Artist', experience: '9 years', bio: 'Sophia has extensive experience in bridal and editorial makeup. She creates stunning looks for every occasion with meticulous attention to detail.', specialties: ['Bridal', 'Editorial', 'Airbrush', 'Special Effects'], rating: 4.9, reviews: 178, image: 'https://images.unsplash.com/photo-1489424731084-a5d8b219a5bb?w=400&q=80', languages: ['English', 'Hindi', 'Konkani'], instagram: '@sophiamakeup' },
];

export default function TeamPage() {
  const params = useParams();
  const router = useRouter();
  const slug = params?.slug as string;
  const [selectedMember, setSelectedMember] = useState<string | null>(null);
  const member = selectedMember ? teamMembers.find((m) => m.id === selectedMember) : null;

  return (
    <>
      <section className={`luxe-hero ${styles.hero}`}>
        <div className="luxe-hero-bg"><img src="https://images.unsplash.com/photo-1600334089648-b0d9d3028eb2?w=1920&q=85" alt="Our Team" /></div>
        <div className="luxe-hero-overlay" />
        <div className={`luxe-hero-content ${styles.heroContent}`}>
          <h1 className={`luxe-hero-title ${styles.heroTitle}`}>Meet Our Experts</h1>
          <p className={`luxe-hero-subtitle ${styles.heroSubtitle}`}>Talented professionals dedicated to bringing out your best. Each member of our team is carefully selected for their expertise, creativity, and passion.</p>
        </div>
      </section>

      <section className="luxe-section">
        <div className="luxe-container-lg">
          <div className="luxe-grid-3">
            {teamMembers.map((st) => (
              <div key={st.id} className={`luxe-stylist-card ${styles.stylistCard}`} onClick={() => setSelectedMember(st.id)}>
                <img src={st.image} alt={st.name} className={`stylist-image ${styles.stylistImage}`} />
                <div className={`luxe-card-body ${styles.cardBody}`}>
                  <h3 className={styles.memberName}>{st.name}</h3>
                  <p className={styles.memberRole}>{st.role}</p>
                  <p className={styles.memberMeta}>{st.experience} • {st.reviews} reviews</p>
                  <div className="stylist-specialties">
                    {st.specialties.slice(0, 3).map((sp) => (
                      <span key={sp} className="stylist-specialty-tag">{sp}</span>
                    ))}
                    {st.specialties.length > 3 && <span className="stylist-specialty-tag">+{st.specialties.length - 3}</span>}
                  </div>
                  <div className={styles.cardActions}>
                    <Button onClick={(e) => { e.stopPropagation(); router.push(`/${slug}/book?staff=${st.id}`); }} type="primary" className="luxe-btn luxe-btn-sm">
                      Book {st.name.split(' ')[0]}
                    </Button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Modal */}
      {member && (
        <div className="luxe-modal-overlay" onClick={() => setSelectedMember(null)}>
          <div className={`luxe-modal ${styles.modal}`} onClick={(e) => e.stopPropagation()}>
            <div className="luxe-modal-header">
              <h3 className="luxe-modal-title">{member.name}</h3>
              <Button className="luxe-modal-close" onClick={() => setSelectedMember(null)}>
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M18 6L6 18M6 6l12 12"/></svg>
              </Button>
            </div>
            <div className="luxe-modal-body">
              <div className={styles.modalGrid}>
                <div>
                  <img src={member.image} alt={member.name} className={styles.modalImage} />
                  <div className={styles.modalRatingWrapper}>
                    <div className={`luxe-rating ${styles.modalRating}`}>
                      {Array.from({ length: 5 }).map((_, i) => (
                        <svg key={i} width="16" height="16" viewBox="0 0 24 24" fill={i < Math.floor(member.rating) ? 'currentColor' : 'none'} stroke="currentColor" strokeWidth="2"><path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"/></svg>
                      ))}
                      <span className="luxe-rating-value">{member.rating}</span>
                      <span className="luxe-rating-count">({member.reviews})</span>
                    </div>
                  </div>
                </div>
                <div>
                  <p className={styles.modalRole}>{member.role}</p>
                  <p className={styles.modalExperience}>{member.experience}</p>
                  <p className={`luxe-body-text ${styles.modalBio}`}>{member.bio}</p>
                  <div className={styles.sectionBlock}>
                    <p className={styles.sectionLabel}>Specialties</p>
                    <div className={styles.tagGroup}>
                      {member.specialties.map((sp) => (
                        <span key={sp} className="luxe-tag luxe-tag-gold">{sp}</span>
                      ))}
                    </div>
                  </div>
                  <div className={styles.sectionBlock}>
                    <p className={styles.sectionLabel}>Languages</p>
                    <div className={styles.tagGroup}>
                      {member.languages.map((l) => (
                        <span key={l} className="luxe-tag">{l}</span>
                      ))}
                    </div>
                  </div>
                  <div className={styles.modalBookWrapper}>
                    <Button onClick={() => { setSelectedMember(null); router.push(`/${slug}/book?staff=${member.id}`); }} type="primary" className={`luxe-btn luxe-btn-lg ${styles.bookButton}`}>
                      Book with {member.name.split(' ')[0]}
                    </Button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
}

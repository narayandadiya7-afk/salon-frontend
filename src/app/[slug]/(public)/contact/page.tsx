'use client';

import React, { useState } from 'react';
import { useParams, useRouter } from 'next/navigation';
import Link from 'next/link';
import styles from './contact.module.css';

export default function ContactPage() {
  const params = useParams();
  const router = useRouter();
  const slug = params?.slug as string;
  const [formData, setFormData] = useState({ name: '', email: '', phone: '', service: '', message: '' });
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
  };

  return (
    <>
      <section className={`luxe-hero ${styles.heroMinHeight}`}>
        <div className="luxe-hero-bg"><img src="https://images.unsplash.com/photo-1487412947147-5cebf100ffc2?w=1920&q=85" alt="Contact" /></div>
        <div className="luxe-hero-overlay" />
        <div className={`luxe-hero-content ${styles.heroContentCenter}`}>
          <h1 className={`luxe-hero-title ${styles.heroTitleMargin}`}>Get in Touch</h1>
          <p className={`luxe-hero-subtitle ${styles.heroSubtitleMargin}`}>We would love to hear from you. Reach out for appointments, inquiries, or feedback.</p>
        </div>
      </section>

      <section className="luxe-section">
        <div className="luxe-container-lg">
          <div className={styles.gridTwoCol}>
            {/* Contact Info */}
            <div>
              <span className="luxe-section-overline">Contact Information</span>
              <h2 className={`luxe-section-title ${styles.sectionTitleLeft}`}>Visit Us</h2>
              <div className="luxe-divider-left" />

              <div className="luxe-contact-info-item">
                <div className="luxe-contact-info-icon">
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0118 0z"/><circle cx="12" cy="10" r="3"/></svg>
                </div>
                <div>
                  <p className={styles.infoLabel}>Address</p>
                  <p className="luxe-body-text">42, MG Road, Indiranagar<br />Bengaluru, Karnataka 560038</p>
                </div>
              </div>

              <div className="luxe-contact-info-item">
                <div className="luxe-contact-info-icon">
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M22 16.92v3a2 2 0 01-2.18 2 19.79 19.79 0 01-8.63-3.07 19.5 19.5 0 01-6-6 19.79 19.79 0 01-3.07-8.67A2 2 0 014.11 2h3a2 2 0 012 1.72c.127.96.361 1.903.7 2.81a2 2 0 01-.45 2.11L8.09 9.91a16 16 0 006 6l1.27-1.27a2 2 0 012.11-.45c.907.339 1.85.573 2.81.7A2 2 0 0122 16.92z"/></svg>
                </div>
                <div>
                  <p className={styles.infoLabel}>Phone</p>
                  <p className="luxe-body-text">+91 98765 43210<br />+91 87654 32100</p>
                </div>
              </div>

              <div className="luxe-contact-info-item">
                <div className="luxe-contact-info-icon">
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"/><polyline points="22,6 12,13 2,6"/></svg>
                </div>
                <div>
                  <p className={styles.infoLabel}>Email</p>
                  <p className="luxe-body-text">hello@luxestudio.com<br />bookings@luxestudio.com</p>
                </div>
              </div>

              <div className="luxe-contact-info-item">
                <div className="luxe-contact-info-icon">
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><circle cx="12" cy="12" r="10"/><path d="M12 6v6l4 2"/></svg>
                </div>
                <div>
                  <p className={styles.infoLabel}>Business Hours</p>
                  <p className="luxe-body-text">
                    Monday – Saturday: 9:00 AM – 8:00 PM<br />
                    Sunday: 10:00 AM – 6:00 PM
                  </p>
                </div>
              </div>

              <div className={styles.socialButtons}>
                <a href="https://wa.me/919876543210" target="_blank" rel="noopener noreferrer" className="luxe-btn luxe-btn-primary luxe-btn-md">
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/></svg>
                  WhatsApp
                </a>
                <a href="https://instagram.com" target="_blank" rel="noopener noreferrer" className="luxe-btn luxe-btn-outline luxe-btn-md">Instagram</a>
              </div>
            </div>

            {/* Contact Form */}
            <div>
              {submitted ? (
                <div className={styles.submittedContainer}>
                  <div className={styles.submittedEmoji}>✉️</div>
                  <h2 className={`luxe-section-title ${styles.sectionTitleCenter}`}>Thank You!</h2>
                  <p className={`luxe-section-subtitle ${styles.subtitleMargin}`}>We have received your message and will get back to you within 24 hours.</p>
                  <button onClick={() => setSubmitted(false)} className="luxe-btn luxe-btn-outline luxe-btn-lg">Send Another Message</button>
                </div>
              ) : (
                <form onSubmit={handleSubmit}>
                  <h3 className={styles.formHeading}>Send Us a Message</h3>
                  <div className={styles.formRow}>
                    <div className="luxe-input-group">
                      <label className="luxe-input-label">Full Name</label>
                      <input className="luxe-input" placeholder="Your name" value={formData.name} onChange={(e) => setFormData({ ...formData, name: e.target.value })} required />
                    </div>
                    <div className="luxe-input-group">
                      <label className="luxe-input-label">Email</label>
                      <input className="luxe-input" type="email" placeholder="your@email.com" value={formData.email} onChange={(e) => setFormData({ ...formData, email: e.target.value })} required />
                    </div>
                  </div>
                  <div className={styles.formRow}>
                    <div className="luxe-input-group">
                      <label className="luxe-input-label">Phone</label>
                      <input className="luxe-input" placeholder="+91 98765 43210" value={formData.phone} onChange={(e) => setFormData({ ...formData, phone: e.target.value })} />
                    </div>
                    <div className="luxe-input-group">
                      <label className="luxe-input-label">Service Interested In</label>
                      <select className="luxe-select" value={formData.service} onChange={(e) => setFormData({ ...formData, service: e.target.value })}>
                        <option value="">Select a service</option>
                        <option value="Haircut">Signature Haircut</option>
                        <option value="Keratin">Keratin Treatment</option>
                        <option value="Facial">Luxury Facial</option>
                        <option value="Bridal">Bridal Makeup</option>
                        <option value="Nails">Manicure & Pedicure</option>
                        <option value="Massage">Aromatherapy Massage</option>
                        <option value="Other">Other</option>
                      </select>
                    </div>
                  </div>
                  <div className={`luxe-input-group ${styles.messageGroup}`}>
                    <label className="luxe-input-label">Message</label>
                    <textarea className={`luxe-input ${styles.textareaVertical}`} rows={5} placeholder="Tell us how we can help..." value={formData.message} onChange={(e) => setFormData({ ...formData, message: e.target.value })} required />
                  </div>
                  <button type="submit" className={`luxe-btn luxe-btn-primary luxe-btn-xl ${styles.submitFullWidth}`}>Send Message</button>
                </form>
              )}
            </div>
          </div>
        </div>
      </section>

      {/* Map */}
      <section className={`luxe-section ${styles.mapSection}`}>
        <div className="luxe-container-lg">
          <div className={styles.mapContainer}>
            <div className={styles.mapPlaceholder}>
              <svg width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className={styles.mapSvgIcon}><path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0118 0z"/><circle cx="12" cy="10" r="3"/></svg>
              <p>Google Maps Integration</p>
              <p className={styles.mapAddress}>42, MG Road, Indiranagar, Bengaluru</p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="luxe-newsletter">
        <div className="luxe-newsletter-content">
          <h2 className="luxe-newsletter-title">Ready to Experience Luxury?</h2>
          <p className="luxe-newsletter-subtitle">Book your appointment today and discover the LuxeStudio difference.</p>
          <button onClick={() => router.push(`/${slug}/book`)} className="luxe-btn luxe-btn-secondary luxe-btn-xl">Book Appointment</button>
        </div>
      </section>
    </>
  );
}

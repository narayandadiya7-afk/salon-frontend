'use client';

import React from 'react';
import Link from 'next/link';
import { InstagramOutlined, FacebookOutlined, WhatsAppOutlined, YoutubeOutlined } from '@ant-design/icons';
import styles from './OwnerFooter.module.css';

export default function OwnerFooter({ salon }: { salon?: any }) {
  const slug = salon?.slug || '';
  return (
    <footer className={styles.footer}>
      <div className={styles.container}>
        <div className={styles.grid}>
          <div className={styles.brand}>
            <Link href={`/${slug}`} className={styles.logo}>
              {salon?.name || 'Salon'}
            </Link>
            <p className={styles.tagline}>
              {salon?.tagline || 'Where beauty meets excellence. Experience premium salon services crafted with passion and precision.'}
            </p>
            <div className={styles.socials}>
              <a href="#" className={styles.socialLink} aria-label="Instagram"><InstagramOutlined /></a>
              <a href="#" className={styles.socialLink} aria-label="Facebook"><FacebookOutlined /></a>
              <a href="#" className={styles.socialLink} aria-label="WhatsApp"><WhatsAppOutlined /></a>
              <a href="#" className={styles.socialLink} aria-label="YouTube"><YoutubeOutlined /></a>
            </div>
          </div>

          <div className={styles.column}>
            <h4>Quick Links</h4>
            <ul>
              <li><Link href={`/${slug}`}>Home</Link></li>
              <li><Link href={`/${slug}/services`}>Services</Link></li>
              <li><Link href={`/${slug}/team`}>Our Team</Link></li>
              <li><Link href={`/${slug}/packages`}>Packages</Link></li>
              <li><Link href={`/${slug}/gallery`}>Gallery</Link></li>
              <li><Link href={`/${slug}/about`}>About Us</Link></li>
            </ul>
          </div>

          <div className={styles.column}>
            <h4>More</h4>
            <ul>
              <li><Link href={`/${slug}/memberships`}>Memberships</Link></li>
              <li><Link href={`/${slug}/testimonials`}>Testimonials</Link></li>
              <li><Link href={`/${slug}/blog`}>Blog</Link></li>
              <li><Link href={`/${slug}/contact`}>Contact</Link></li>
              <li><Link href={`/${slug}/book`}>Book Now</Link></li>
            </ul>
          </div>

          <div className={styles.newsletter}>
            <h4>Stay Updated</h4>
            <p>Subscribe for exclusive offers, beauty tips, and salon updates.</p>
            <form className={styles.newsletterForm} onSubmit={e => e.preventDefault()}>
              <input type="email" placeholder="Your email address" />
              <button type="submit">Subscribe</button>
            </form>
          </div>
        </div>

        <div className={styles.bottom}>
          <span>&copy; {new Date().getFullYear()} {salon?.name || 'Salon'}. All rights reserved.</span>
          <div className={styles.bottomLinks}>
            <a href="#">Privacy Policy</a>
            <a href="#">Terms of Service</a>
            <a href="#">Refund Policy</a>
            <a href="#">Cancellation Policy</a>
          </div>
        </div>
      </div>
    </footer>
  );
}

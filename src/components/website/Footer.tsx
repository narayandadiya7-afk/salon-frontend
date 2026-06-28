import React from 'react';
import Link from 'next/link';
import styles from './Footer.module.css';

const footerLinks = {
  Product: [
    { label: 'Features', href: '/#features' },
    { label: 'Pricing', href: '/pricing' },
    { label: 'Demo Salon', href: '/demo-salon' },
  ],
  Company: [
    { label: 'About', href: '/about' },
    { label: 'Blog', href: '#' },
    { label: 'Contact', href: '/contact' },
  ],
  Legal: [
    { label: 'Privacy Policy', href: '#' },
    { label: 'Terms of Service', href: '#' },
    { label: 'Refund Policy', href: '#' },
  ],
};

export default function Footer() {
  return (
    <footer className={styles.footer}>
      <div className={styles.container}>
        <div className={styles.top}>
          <div className={styles.brand}>
            <Link href="/" className={styles.logo}>✂️ SalonSaaS</Link>
            <p className={styles.tagline}>
              The all-in-one platform for salon businesses. Launch your salon website, manage bookings, and grow your clientele.
            </p>
          </div>

          <div className={styles.links}>
            {Object.entries(footerLinks).map(([group, items]) => (
              <div key={group} className={styles.linkGroup}>
                <h4 className={styles.groupTitle}>{group}</h4>
                <ul className={styles.linkList}>
                  {items.map((item) => (
                    <li key={item.label}>
                      <Link href={item.href} className={styles.link}>{item.label}</Link>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>

        <div className={styles.bottom}>
          <p className={styles.copyright}>
            © {new Date().getFullYear()} SalonSaaS. All rights reserved. Powered by Razorpay.
          </p>
          <div className={styles.socials}>
            <a href="#" className={styles.social} aria-label="Twitter">𝕏</a>
            <a href="#" className={styles.social} aria-label="Instagram">Instagram</a>
            <a href="#" className={styles.social} aria-label="LinkedIn">LinkedIn</a>
          </div>
        </div>
      </div>
    </footer>
  );
}

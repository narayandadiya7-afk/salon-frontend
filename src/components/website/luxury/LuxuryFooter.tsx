import React from 'react';
import Link from 'next/link';

const footerLinks = {
  Services: [
    { label: 'Hair Styling', href: '#services' },
    { label: 'Skin Care', href: '#services' },
    { label: 'Nail Art', href: '#services' },
    { label: 'Makeup', href: '#services' },
    { label: 'Spa Treatments', href: '#services' },
  ],
  Company: [
    { label: 'About Us', href: '#about' },
    { label: 'Our Team', href: '#team' },
    { label: 'Gallery', href: '#gallery' },
    { label: 'Blog', href: '#' },
    { label: 'Careers', href: '#' },
  ],
  Support: [
    { label: 'Contact Us', href: '#contact' },
    { label: 'FAQ', href: '#faq' },
    { label: 'Privacy Policy', href: '#' },
    { label: 'Terms of Service', href: '#' },
    { label: 'Gift Cards', href: '#' },
  ],
};

export default function LuxuryFooter() {
  return (
    <footer className="luxe-footer">
      <div className="luxe-footer-container">
        <div className="luxe-footer-grid">
          <div className="luxe-footer-brand">
            <Link href="/" className="luxe-footer-logo">
              <span>Luxe</span>Studio
            </Link>
            <p className="luxe-footer-desc">
              Where beauty meets excellence. Experience premium salon services crafted just for you in an environment of unparalleled luxury and sophistication.
            </p>
            <div className="luxe-footer-social">
              <a href="#" aria-label="Instagram">
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <rect x="2" y="2" width="20" height="20" rx="5" /><path d="M16 11.37A4 4 0 1112.63 8 4 4 0 0116 11.37z" /><line x1="17.5" y1="6.5" x2="17.51" y2="6.5" />
                </svg>
              </a>
              <a href="#" aria-label="Facebook">
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M18 2h-3a5 5 0 00-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 011-1h3z" />
                </svg>
              </a>
              <a href="#" aria-label="Pinterest">
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M12 2C6.477 2 2 6.477 2 12c0 4.237 2.636 7.855 6.356 9.312-.087-.791-.167-2.005.035-2.868.182-.78 1.172-4.971 1.172-4.971s-.299-.599-.299-1.484c0-1.39.806-2.428 1.81-2.428.853 0 1.265.641 1.265 1.409 0 .858-.546 2.141-.828 3.33-.236.995.5 1.807 1.48 1.807 1.778 0 3.144-1.874 3.144-4.579 0-2.394-1.72-4.068-4.177-4.068-2.845 0-4.515 2.134-4.515 4.34 0 .859.331 1.78.744 2.282a.3.3 0 01.069.287c-.076.316-.245.994-.278 1.133-.044.183-.145.222-.335.134-1.247-.581-2.027-2.405-2.027-3.871 0-3.152 2.29-6.047 6.602-6.047 3.466 0 6.16 2.47 6.16 5.77 0 3.444-2.17 6.213-5.183 6.213-1.012 0-1.964-.525-2.29-1.147l-.623 2.374c-.226.87-.835 1.958-1.244 2.622.936.29 1.931.447 2.958.447 5.523 0 10-4.477 10-10S17.523 2 12 2z" />
                </svg>
              </a>
              <a href="#" aria-label="YouTube">
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M22.54 6.42a2.78 2.78 0 00-1.94-2C18.88 4 12 4 12 4s-6.88 0-8.6.46a2.78 2.78 0 00-1.94 2A29 29 0 001 11.75a29 29 0 00.46 5.33A2.78 2.78 0 003.4 19c1.72.46 8.6.46 8.6.46s6.88 0 8.6-.46a2.78 2.78 0 001.94-2 29 29 0 00.46-5.25 29 29 0 00-.46-5.33z" /><polygon points="9.75 15.02 15.5 11.75 9.75 8.48 9.75 15.02" />
                </svg>
              </a>
            </div>
          </div>

          {Object.entries(footerLinks).map(([group, items]) => (
            <div key={group}>
              <h4 className="luxe-footer-column-title">{group}</h4>
              <ul className="luxe-footer-links">
                {items.map((item) => (
                  <li key={item.label}>
                    <Link href={item.href}>{item.label}</Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <div className="luxe-footer-bottom">
          <span>© {new Date().getFullYear()} LuxeStudio. All rights reserved.</span>
          <div className="luxe-footer-bottom-links">
            <a href="#">Privacy</a>
            <a href="#">Terms</a>
            <a href="#">Sitemap</a>
          </div>
        </div>
      </div>
    </footer>
  );
}

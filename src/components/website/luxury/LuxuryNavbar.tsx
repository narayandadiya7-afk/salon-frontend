'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { useParams, useRouter } from 'next/navigation';

const navLinks = [
  { label: 'Services', href: '#services' },
  { label: 'Gallery', href: '#gallery' },
  { label: 'Team', href: '#team' },
  { label: 'Memberships', href: '#memberships' },
  { label: 'Reviews', href: '#testimonials' },
  { label: 'Contact', href: '#contact' },
];

export default function LuxuryNavbar() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const params = useParams();
  const router = useRouter();
  const slug = params?.slug as string;

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 60);
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  useEffect(() => {
    document.body.style.overflow = menuOpen ? 'hidden' : '';
    return () => { document.body.style.overflow = ''; };
  }, [menuOpen]);

  const handleNav = (href: string) => {
    setMenuOpen(false);
    if (href.startsWith('#')) {
      const el = document.querySelector(href);
      if (el) el.scrollIntoView({ behavior: 'smooth' });
    } else {
      router.push(href);
    }
  };

  return (
    <>
      <header className={`luxe-header ${scrolled ? 'scrolled' : ''}`}>
        <div className="luxe-header-inner">
          <Link href={`/${slug}`} className="luxe-header-logo">
            <span>Luxe</span>Studio
          </Link>

          <nav className="luxe-header-nav">
            {navLinks.map((link) => (
              <button
                key={link.href}
                onClick={() => handleNav(link.href)}
                className="luxe-header-link"
              >
                {link.label}
              </button>
            ))}
          </nav>

          <div className="luxe-header-actions">
            <button
              onClick={() => router.push(`/${slug}/book`)}
              className="luxe-btn luxe-btn-secondary luxe-btn-sm"
            >
              Book Now
            </button>
            <button
              className="luxe-header-mobile-toggle"
              onClick={() => setMenuOpen(!menuOpen)}
              aria-label="Toggle menu"
            >
              {menuOpen ? (
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M18 6L6 18M6 6l12 12" />
                </svg>
              ) : (
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M3 12h18M3 6h18M3 18h18" />
                </svg>
              )}
            </button>
          </div>
        </div>
      </header>

      <div className={`luxe-mobile-menu ${menuOpen ? 'open' : ''}`}>
        {navLinks.map((link) => (
          <button
            key={link.href}
            onClick={() => handleNav(link.href)}
            className="luxe-mobile-link"
          >
            {link.label}
          </button>
        ))}
        <div className="luxe-mobile-actions">
          <button
            onClick={() => { setMenuOpen(false); router.push(`/${slug}/book`); }}
            className="luxe-btn luxe-btn-primary luxe-btn-lg"
            style={{ width: '100%' }}
          >
            Book Appointment
          </button>
          <button
            onClick={() => { setMenuOpen(false); router.push(`/${slug}/services`); }}
            className="luxe-btn luxe-btn-outline luxe-btn-lg"
            style={{ width: '100%' }}
          >
            Explore Services
          </button>
        </div>
      </div>
    </>
  );
}

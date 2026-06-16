'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { Button } from 'antd';
import { MenuOutlined, CloseOutlined } from '@ant-design/icons';
import styles from './Navbar.module.css';

const navLinks = [
  { label: 'Home', href: '/' },
  { label: 'Features', href: '/#features' },
  { label: 'Pricing', href: '/pricing' },
  { label: 'About', href: '/about' },
  { label: 'Contact', href: '/contact' },
];

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener('scroll', onScroll);
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  return (
    <header className={`${styles.navbar} ${scrolled ? styles.scrolled : ''}`}>
      <div className={styles.container}>
        <Link href="/" className={styles.logo}>
          ✂️ SalonSaaS
        </Link>

        <nav className={`${styles.nav} ${menuOpen ? styles.open : ''}`}>
          {navLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className={styles.navLink}
              onClick={() => setMenuOpen(false)}
            >
              {link.label}
            </Link>
          ))}
        </nav>

        <div className={styles.actions}>
          <Link href="/login">
            <Button variant="outlined" className={styles.loginBtn}>Sign In</Button>
          </Link>
          <Link href="/register">
            <Button type="primary" className={styles.ctaBtn}>Get Your Salon Website</Button>
          </Link>
        </div>

        <button
          className={styles.menuToggle}
          onClick={() => setMenuOpen(!menuOpen)}
          aria-label="Toggle menu"
        >
          {menuOpen ? <CloseOutlined /> : <MenuOutlined />}
        </button>
      </div>

      {menuOpen && (
        <div className={styles.mobileMenu}>
          {navLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className={styles.mobileLink}
              onClick={() => setMenuOpen(false)}
            >
              {link.label}
            </Link>
          ))}
          <div className={styles.mobileActions}>
            <Link href="/login" onClick={() => setMenuOpen(false)}>
              <Button variant="outlined" block>Sign In</Button>
            </Link>
            <Link href="/register" onClick={() => setMenuOpen(false)}>
              <Button type="primary" block>Get Your Salon Website</Button>
            </Link>
          </div>
        </div>
      )}
    </header>
  );
}

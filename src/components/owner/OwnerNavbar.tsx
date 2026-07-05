"use client";

import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import { useParams, useRouter, usePathname } from 'next/navigation';
import { MenuOutlined, CloseOutlined, UserOutlined } from '@ant-design/icons';
import { Button } from 'antd';
import Utils from '../../utils';
import styles from './OwnerNavbar.module.css';

export default function OwnerNavbar({ salon }: { salon?: any }) {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [role, setRole] = useState<string | null>(null);
  const params = useParams();
  const router = useRouter();
  const pathname = usePathname();
  const slug = (params?.slug as string) || salon?.slug || '';

  useEffect(() => {
    const decoded = Utils.decodeToken();
    setRole(decoded?.role || null);
  }, []);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 40);
    handleScroll();
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { label: 'Home', href: `/${slug}` },
    { label: 'About', href: `/${slug}/about` },
    { label: 'Services', href: `/${slug}/services` },
    { label: 'Team', href: `/${slug}/team` },
    { label: 'Gallery', href: `/${slug}/gallery` },
    { label: 'Testimonials', href: `/${slug}/testimonials` },
    { label: 'Blog', href: `/${slug}/blog` },
    { label: 'Contact', href: `/${slug}/contact` },
  ];

  const isOwner = role === 'SALON_OWNER' || role === 'SALON_STAFF' || role === 'ADMIN' || role === 'SUPER_ADMIN';

  return (
    <header className={`${styles.navbar} ${scrolled ? styles.scrolled : ''}`}>
      <div className={styles.container}>
        <Link href={`/${slug}`} className={styles.logo}>
          <span className={styles.logoMark}>✦</span>
          {salon?.name || 'Salon'}
        </Link>

        <nav className={styles.nav}>
          {navLinks.map((l) => {
            const isActive = pathname === l.href;
            return (
              <Link
                key={l.href}
                href={l.href}
                className={`${styles.navLink} ${isActive ? styles.navLinkActive : ''}`}
                onClick={() => setOpen(false)}
              >
                {l.label}
              </Link>
            );
          })}
        </nav>

        <div className={styles.actions}>
          {isOwner ? (
            <Button type="default" icon={<UserOutlined />} className={styles.dashBtn} onClick={() => router.push(`/${slug}/owner/dashboard`)}>
              Dashboard
            </Button>
          ) : (
            <Button type="default" className={styles.loginBtn} onClick={() => router.push(`/${slug}/owner/login`)}>
              Owner Login
            </Button>
          )}
          <Link href={`/${slug}/book`}>
            <Button className={styles.bookBtn}>Book Now</Button>
          </Link>
        </div>

        <button className={styles.toggle} onClick={() => setOpen(!open)} aria-label="Toggle menu">
          {open ? <CloseOutlined /> : <MenuOutlined />}
        </button>
      </div>

      {open && (
        <div className={`${styles.mobileMenu} ${styles.open}`}>
          {navLinks.map((l) => {
            const isActive = pathname === l.href;
            return (
              <Link
                key={l.href}
                href={l.href}
                className={`${styles.mobileLink} ${isActive ? styles.mobileLinkActive : ''}`}
                onClick={() => setOpen(false)}
              >
                {l.label}
              </Link>
            );
          })}
          <div className={styles.mobileActions}>
            {isOwner ? (
              <Button
                block
                type="default"
                icon={<UserOutlined />}
                style={{ height: 44, borderRadius: 100, borderColor: 'rgba(0,0,0,0.15)', color: '#333' }}
                onClick={() => { setOpen(false); router.push(`/${slug}/owner/dashboard`); }}
              >
                Dashboard
              </Button>
            ) : (
              <Button
                block
                type="default"
                style={{ height: 44, borderRadius: 100, borderColor: 'rgba(0,0,0,0.15)', color: '#333' }}
                onClick={() => { setOpen(false); router.push(`/${slug}/owner/login`); }}
              >
                Owner Login
              </Button>
            )}
            <Link href={`/${slug}/book`} onClick={() => setOpen(false)}>
              <Button
                block
                style={{
                  height: 44, borderRadius: 100,
                  background: 'linear-gradient(135deg, #d4a853, #c9953f)',
                  border: 'none', color: '#fff',
                  fontFamily: 'LexendMedium, sans-serif',
                  boxShadow: '0 4px 16px rgba(201,149,63,0.3)',
                }}
              >
                Book Now
              </Button>
            </Link>
          </div>
        </div>
      )}
    </header>
  );
}

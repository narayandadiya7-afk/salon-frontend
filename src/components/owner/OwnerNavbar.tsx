"use client";

import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import { useParams, useRouter } from 'next/navigation';
import { MenuOutlined, CloseOutlined, UserOutlined } from '@ant-design/icons';
import { Button } from 'antd';
import Utils from '../../utils';
import styles from './OwnerNavbar.module.css';

export default function OwnerNavbar({ salon }: { salon?: any }) {
  const [open, setOpen] = useState(false);
  const [role, setRole] = useState<string | null>(null);
  const params = useParams();
  const router = useRouter();
  const slug = (params?.slug as string) || salon?.slug || '';


  useEffect(() => {
    const decoded = Utils.decodeToken();
    setRole(decoded?.role || null);
  }, []);

  const navLinks = [
    { label: 'Home', href: `/${slug}` },
    { label: 'Services', href: `/${slug}/services` },
    { label: 'Team', href: `/${slug}/team` },
    { label: 'Gallery', href: `/${slug}/gallery` },
    { label: 'Packages', href: `/${slug}/packages` },
    { label: 'About', href: `/${slug}/about` },
    { label: 'Contact', href: `/${slug}/contact` },
    { label: 'Book', href: `/${slug}/book` },
  ];

  const headerLinks = navLinks.slice(0, 6);
  const isOwner = role === 'SALON_OWNER' || role === 'SALON_STAFF' || role === 'ADMIN' || role === 'SUPER_ADMIN';

  return (
    <header className={styles.navbar}>
      <div className={styles.container}>
        <Link href={`/${slug}`} className={styles.logo}>
          {salon?.name || 'Salon'}
        </Link>

        <nav className={styles.nav}>
          {headerLinks.map((l) => (
            <Link key={l.href} href={l.href} className={styles.navLink} onClick={() => setOpen(false)}>
              {l.label}
            </Link>
          ))}
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
          {navLinks.map((l) => (
            <Link
              key={l.href}
              href={l.href}
              className={styles.mobileLink}
              onClick={() => setOpen(false)}
            >
              {l.label}
            </Link>
          ))}
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

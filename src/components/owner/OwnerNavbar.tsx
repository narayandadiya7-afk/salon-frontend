"use client";

import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import { useParams, useRouter } from 'next/navigation';
import { MenuOutlined, CloseOutlined, UserOutlined } from '@ant-design/icons';
import { Button } from 'antd';
import Utils from '../../utils';
import styles from './OwnerNavbar.module.css';

export default function OwnerNavbar({ salon }: { salon: any }) {
  const [open, setOpen] = useState(false);
  const [role, setRole] = useState<string | null>(null);
  const params = useParams();
  const router = useRouter();
  const slug = (params?.slug as string) || salon?.slug || '';

  useEffect(() => {
    const decoded = Utils.decodeToken();
    setRole(decoded?.role || null);
  }, []);

  const links = [
    { label: 'Home', href: `/salon/${slug}` },
    { label: 'About', href: `/salon/${slug}/about` },
    { label: 'Services', href: `/salon/${slug}/services` },
    { label: 'Team', href: `/salon/${slug}/team` },
    { label: 'Book', href: `/salon/${slug}/book` },
  ];

  const isOwner = role === 'SALON_OWNER' || role === 'SALON_STAFF' || role === 'ADMIN' || role === 'SUPER_ADMIN';

  return (
    <header className={styles.navbar}>
      <div className={styles.container}>
        <Link href={`/salon/${slug}`} className={styles.logo}>{salon?.name || 'Salon'}</Link>

        <nav className={`${styles.nav} ${open ? styles.open : ''}`}>
          {links.map((l) => (
            <Link key={l.href} href={l.href} className={styles.navLink} onClick={() => setOpen(false)}>
              {l.label}
            </Link>
          ))}
        </nav>

        <div className={styles.actions}>
          {isOwner ? (
            <Button type="default" icon={<UserOutlined />} onClick={() => router.push(`/salon/${slug}/dashboard`)}>
              Dashboard
            </Button>
          ) : (
            <Button type="default" onClick={() => router.push(`/salon/${slug}/portal/login`)}>
              Owner Login
            </Button>
          )}
          <Link href={`/salon/${slug}/book`}>
            <Button type="primary">Book Now</Button>
          </Link>
        </div>

        <button className={styles.toggle} onClick={() => setOpen(!open)} aria-label="Toggle menu">
          {open ? <CloseOutlined /> : <MenuOutlined />}
        </button>
      </div>

      {open && (
        <div className={styles.mobileMenu}>
          {links.map((l) => (
            <Link key={l.href} href={l.href} className={styles.mobileLink} onClick={() => setOpen(false)}>
              {l.label}
            </Link>
          ))}
          <div style={{ padding: '12px 20px' }}>
            {isOwner ? (
              <Button block type="default" icon={<UserOutlined />} onClick={() => { setOpen(false); router.push(`/salon/${slug}/dashboard`); }}>
                Dashboard
              </Button>
            ) : (
              <Button block type="default" onClick={() => { setOpen(false); router.push(`/salon/${slug}/portal/login`); }}>
                Owner Login
              </Button>
            )}
          </div>
        </div>
      )}
    </header>
  );
}

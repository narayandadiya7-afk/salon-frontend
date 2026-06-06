"use client";

import React, { useState } from 'react';
import Link from 'next/link';
import { useParams } from 'next/navigation';
import { MenuOutlined, CloseOutlined } from '@ant-design/icons';
import { Button } from 'antd';
import styles from './OwnerNavbar.module.css';

export default function OwnerNavbar({ salon }: { salon: any }) {
  const [open, setOpen] = useState(false);
  const params = useParams();
  const slug = (params?.slug as string) || salon?.slug || '';

  const links = [
    { label: 'Home', href: `/salon/${slug}` },
    { label: 'About', href: `/salon/${slug}/about` },
    { label: 'Services', href: `/salon/${slug}/services` },
    { label: 'Team', href: `/salon/${slug}/team` },
    { label: 'Book', href: `/salon/${slug}/book` },
  ];

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
        </div>
      )}
    </header>
  );
}

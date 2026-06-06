import React from 'react';
import Link from 'next/link';
import styles from './OwnerFooter.module.css';

export default function OwnerFooter({ salon }: { salon?: any }) {
  const slug = salon?.slug || '';
  return (
    <footer className={styles.footer}>
      <div className={styles.container}>
        <div className={styles.brand}>
          <Link href={`/salon/${slug}`} className={styles.logo}>{salon?.name || 'Salon'}</Link>
          <p>{salon?.tagline || 'Professional salon services.'}</p>
        </div>

        <div className={styles.links}>
          <div>
            <h4>Visit</h4>
            <ul>
              <li><Link href={`/salon/${slug}`}>Home</Link></li>
              <li><Link href={`/salon/${slug}/services`}>Services</Link></li>
              <li><Link href={`/salon/${slug}/book`}>Book</Link></li>
            </ul>
          </div>
          <div>
            <h4>Contact</h4>
            <ul>
              <li>{salon?.phone || '—'}</li>
              <li>{salon?.email || '—'}</li>
            </ul>
          </div>
        </div>

        <div className={styles.bottom}>
          <div>© {new Date().getFullYear()} {salon?.name || 'Salon'}</div>
          <div>Powered by SalonSaaS</div>
        </div>
      </div>
    </footer>
  );
}

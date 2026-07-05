'use client';

import React from 'react';
import { useParams, useRouter } from 'next/navigation';
import Link from 'next/link';
import styles from './memberships.module.css';

const plans = [
  {
    name: 'Silver',
    price: '999',
    period: 'month',
    desc: 'Perfect for occasional visits. Enjoy great savings and priority access.',
    featured: false,
    perks: ['10% off all services', 'Priority booking', 'Free annual consultation', 'Birthday bonus treatment', 'Exclusive member offers'],
  },
  {
    name: 'Gold',
    price: '1,999',
    period: 'month',
    desc: 'Our most popular plan. Significant savings for regular clients with premium perks.',
    featured: true,
    perks: ['20% off all services', 'VIP priority booking', 'Free haircut every quarter', 'Free facial every quarter', 'Birthday bonus + gift', 'Exclusive events access', 'Guest pass (1/year)'],
  },
  {
    name: 'Platinum',
    price: '3,999',
    period: 'month',
    desc: 'The ultimate luxury experience. Unlimited benefits for our most valued clients.',
    featured: false,
    perks: ['30% off all services', 'VIP priority booking', 'Unlimited express services', 'Free premium treatment monthly', 'Free haircut monthly', 'Birthday bonus + premium gift', 'Exclusive events + previews', 'Guest pass (2/year)', 'Complimentary add-ons', 'Dedicated concierge'],
  },
];

const comparisonRows = [
  { label: 'Monthly Fee', silver: '₹999', gold: '₹1,999', platinum: '₹3,999' },
  { label: 'Service Discount', silver: '10%', gold: '20%', platinum: '30%' },
  { label: 'Priority Booking', silver: true, gold: true, platinum: true },
  { label: 'Free Haircut', silver: false, gold: 'Quarterly', platinum: 'Monthly' },
  { label: 'Free Facial', silver: false, gold: 'Quarterly', platinum: 'Monthly' },
  { label: 'Free Premium Treatment', silver: false, gold: false, platinum: 'Monthly' },
  { label: 'Birthday Bonus', silver: 'Treatment', gold: 'Treatment + Gift', platinum: 'Premium Gift' },
  { label: 'Guest Pass', silver: false, gold: '1/year', platinum: '2/year' },
  { label: 'Events Access', silver: false, gold: true, platinum: true },
  { label: 'Dedicated Concierge', silver: false, gold: false, platinum: true },
];

export default function MembershipsPage() {
  const params = useParams();
  const router = useRouter();
  const slug = params?.slug as string;

  return (
    <>
      <section className={`luxe-hero ${styles.hero}`}>
        <div className="luxe-hero-bg"><img src="https://images.unsplash.com/photo-1600334089648-b0d9d3028eb2?w=1920&q=85" alt="Memberships" /></div>
        <div className="luxe-hero-overlay" />
        <div className={`luxe-hero-content ${styles.heroContent}`}>
          <h1 className={`luxe-hero-title ${styles.heroTitle}`}>LuxeClub Membership</h1>
          <p className={`luxe-hero-subtitle ${styles.heroSubtitle}`}>Join the most exclusive beauty membership. Enjoy premium benefits, exclusive discounts, and VIP treatment all year round.</p>
        </div>
      </section>

      <section className="luxe-section">
        <div className="luxe-container-lg">
          <div className="luxe-section-header">
            <span className="luxe-section-overline">Choose Your Plan</span>
            <h2 className="luxe-section-title">Find Your Perfect Membership</h2>
            <p className="luxe-section-subtitle">All plans include priority booking and exclusive member benefits. Cancel anytime.</p>
          </div>
          <div className={`luxe-grid-3 ${styles.cardGrid}`}>
            {plans.map((plan) => (
              <div key={plan.name} className={`luxe-package-card ${plan.featured ? 'featured' : ''} ${styles.packageCard}`}>
                {plan.featured && <div className="package-badge"><span className="luxe-badge luxe-badge-gold">Most Popular</span></div>}
                <h3 className={styles.cardName}>{plan.name}</h3>
                <p className={`luxe-body-text ${styles.cardDesc}`}>{plan.desc}</p>
                <div className="package-price">₹{plan.price}<span>/{plan.period}</span></div>
                <p className={styles.cardCancelText}>Cancel anytime • No hidden fees</p>
                <ul className={`package-perks ${styles.cardPerks}`}>
                  {plan.perks.map((p) => (
                    <li key={p}>
                      <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="var(--luxe-emerald)" strokeWidth="2.5"><path d="M20 6L9 17l-5-5"/></svg>
                      {p}
                    </li>
                  ))}
                </ul>
                <button onClick={() => router.push(`/${slug}/book?membership=${plan.name.toLowerCase()}`)} className={`luxe-btn luxe-btn-lg ${plan.featured ? 'luxe-btn-secondary' : 'luxe-btn-outline'} ${styles.cardBtn}`}>
                  {plan.featured ? 'Start Gold Free Trial' : `Start ${plan.name} Free Trial`}
                </button>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Comparison Table */}
      <section className={`luxe-section ${styles.tableSection}`}>
        <div className="luxe-container-lg">
          <div className="luxe-section-header">
            <span className="luxe-section-overline">Compare Plans</span>
            <h2 className="luxe-section-title">Detailed Comparison</h2>
          </div>
          <div className={styles.tableWrapper}>
            <table className={styles.table}>
              <thead>
                <tr className={styles.tableHeaderRow}>
                  <th className={styles.tableHeaderCell}>Benefits</th>
                  <th className={styles.tableHeaderCellCenter}>Silver</th>
                  <th className={styles.tableHeaderCellGold}>Gold</th>
                  <th className={styles.tableHeaderCellCenter}>Platinum</th>
                </tr>
              </thead>
              <tbody>
                {comparisonRows.map((row, i) => (
                  <tr key={row.label} className={styles.tableRow}>
                    <td className={styles.tableLabelCell}>{row.label}</td>
                    <td className={styles.tableDataCell}>{renderCell(row.silver)}</td>
                    <td className={styles.tableDataCellGold}>{renderCell(row.gold)}</td>
                    <td className={styles.tableDataCell}>{renderCell(row.platinum)}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </section>

      {/* Benefits */}
      <section className={`luxe-section ${styles.benefitsSection}`}>
        <div className="luxe-container-lg">
          <div className="luxe-section-header">
            <span className="luxe-section-overline">Why Join?</span>
            <h2 className="luxe-section-title">Membership Benefits</h2>
          </div>
          <div className="luxe-why-grid">
            {[
              { icon: '💰', title: 'Save Big', desc: 'Members save up to 30% on every service. The more you visit, the more you save.' },
              { icon: '⭐', title: 'Priority Booking', desc: 'Skip the wait. Members get priority access to appointments including weekends and peak hours.' },
              { icon: '🎁', title: 'Exclusive Rewards', desc: 'Birthday treats, seasonal gifts, and exclusive members-only events throughout the year.' },
              { icon: '🆓', title: 'Free Services', desc: 'Depending on your plan, enjoy complimentary haircuts, facials, and premium treatments.' },
              { icon: '👤', title: 'Dedicated Concierge', desc: 'Platinum members receive a personal concierge for effortless booking and personalized recommendations.' },
              { icon: '📱', title: 'App Benefits', desc: 'Manage your membership, track loyalty points, and book appointments directly from your phone.' },
            ].map((b) => (
              <div key={b.title} className={`luxe-why-item ${styles.benefitItem}`}>
                <div className={`luxe-why-icon ${styles.benefitIcon}`}>{b.icon}</div>
                <div>
                  <h3 className={`luxe-why-item-title ${styles.benefitTitle}`}>{b.title}</h3>
                  <p className="luxe-why-item-desc">{b.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="luxe-newsletter">
        <div className="luxe-newsletter-content">
          <h2 className="luxe-newsletter-title">Ready to Elevate Your Experience?</h2>
          <p className="luxe-newsletter-subtitle">Start your free trial today. No commitment, cancel anytime.</p>
          <button onClick={() => router.push(`/${slug}/book`)} className="luxe-btn luxe-btn-secondary luxe-btn-xl">Start Free Trial</button>
        </div>
      </section>
    </>
  );
}

function renderCell(value: string | boolean) {
  if (typeof value === 'boolean') {
    return value
      ? <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="var(--luxe-emerald)" strokeWidth="2.5" className={styles.cellIcon}><path d="M20 6L9 17l-5-5"/></svg>
      : <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="var(--luxe-text-tertiary)" strokeWidth="2" className={styles.cellIcon}><path d="M18 6L6 18M6 6l12 12"/></svg>;
  }
  return value;
}

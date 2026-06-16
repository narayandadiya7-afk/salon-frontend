import React from 'react';
import Link from 'next/link';
import { Button } from 'antd';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Pricing — SalonSaaS',
  description: 'Simple, transparent pricing for salon businesses. Start with Basic or go Pro.',
};

const plans = [
  {
    plan: 'Basic',
    price: '₹499',
    period: '/month',
    planType: 'BASIC',
    desc: 'Perfect for small salons just getting started.',
    features: [
      'Your own salon website',
      'Online appointment booking',
      'Up to 10 services',
      'Working hours management',
      'Basic analytics',
      'Email support',
    ],
    cta: 'Start Free Trial',
    href: '/register',
    featured: false,
  },
  {
    plan: 'Pro',
    price: '₹999',
    period: '/month',
    planType: 'PRO',
    desc: 'For growing salons that need more power.',
    features: [
      'Everything in Basic',
      'Unlimited services',
      'Custom salon branding',
      'Priority support',
      'Advanced booking management',
      'Appointment reminders',
      'Revenue analytics',
      'Custom domain support',
    ],
    cta: 'Start Free Trial',
    href: '/register',
    featured: true,
    badge: 'Most Popular',
  },
  {
    plan: 'Pro Yearly',
    price: '₹8,999',
    period: '/year',
    planType: 'PRO_YEARLY',
    desc: 'Best value — save 25% with annual billing.',
    features: [
      'Everything in Pro',
      'Save ₹2,989/year',
      'Priority onboarding',
      'Dedicated account manager',
      'Custom integrations',
      'White-label option',
    ],
    cta: 'Start Free Trial',
    href: '/register',
    featured: false,
    badge: 'Best Value',
  },
];

const faqs = [
  {
    q: 'Can I change my plan later?',
    a: 'Yes, you can upgrade or renew your plan at any time from your owner dashboard.',
  },
  {
    q: 'What payment methods are accepted?',
    a: 'We use Razorpay which supports UPI, credit/debit cards, net banking, and wallets.',
  },
  {
    q: 'Is there a free trial?',
    a: 'New accounts get a 1-month free trial with full access. No payment required at signup.',
  },
  {
    q: 'What happens when my subscription expires?',
    a: 'Your salon website will be temporarily suspended. You can renew from your dashboard to reactivate it.',
  },
];

export default function PricingPage() {
  return (
    <>
      <section className="section" style={{ background: 'var(--theme-background)' }}>
        <div className="section-container">
          <div className="section-header">
            <span className="section-label">Pricing</span>
            <h1 className="section-title">Simple, transparent pricing</h1>
            <p className="section-subtitle">
              No hidden fees. Pay once, get your salon website live. Cancel anytime.
            </p>
          </div>

          <div className="pricing-grid">
            {plans.map((p) => (
              <div key={p.plan} className={`pricing-card ${p.featured ? 'featured' : ''}`}>
                {p.badge && <div className="pricing-badge">{p.badge}</div>}
                <div className="pricing-plan">{p.plan}</div>
                <div className="pricing-price">
                  {p.price}
                  {p.period && <span>{p.period}</span>}
                </div>
                <p className="pricing-desc">{p.desc}</p>
                <ul className="pricing-features">
                  {p.features.map((f) => <li key={f}>✓ {f}</li>)}
                </ul>
                <Link href={p.href}>
                  <Button
                    type={p.featured ? 'primary' : 'default'}
                    block
                    size="large"
                  >
                    {p.cta}
                  </Button>
                </Link>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="section" style={{ background: 'var(--theme-surface)' }}>
        <div className="section-container" style={{ maxWidth: 720 }}>
          <div className="section-header">
            <span className="section-label">FAQ</span>
            <h2 className="section-title">Common questions</h2>
          </div>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 24 }}>
            {faqs.map((faq) => (
              <div key={faq.q} style={{ padding: '20px 24px', background: 'var(--theme-background)', borderRadius: 12, border: '1px solid var(--theme-border)' }}>
                <div style={{ fontWeight: 600, marginBottom: 8, fontSize: 16 }}>{faq.q}</div>
                <div style={{ color: 'var(--theme-text-secondary)', lineHeight: 1.6 }}>{faq.a}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <div className="cta-band">
        <h2 className="cta-title">Ready to launch your salon website?</h2>
        <p className="cta-subtitle">Join 500+ salon owners. Get started in minutes.</p>
        <div className="cta-actions">
          <Link href="/register">
            <Button size="large" style={{ background: '#fff', color: '#1890ff', border: 'none', fontWeight: 600 }}>
              Create Free Account
            </Button>
          </Link>
          <Link href="/contact">
            <Button size="large" style={{ background: 'transparent', color: '#fff', border: '1px solid rgba(255,255,255,0.5)' }}>
              Talk to Sales
            </Button>
          </Link>
        </div>
      </div>
    </>
  );
}

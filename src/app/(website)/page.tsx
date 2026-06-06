import React from 'react';
import Link from 'next/link';
import { Button } from 'antd';
import type { Metadata } from 'next';
import './website.css';

export const metadata: Metadata = {
  title: 'SalonSaaS — Launch Your Salon Website in Minutes',
  description: 'The all-in-one SaaS platform for salon businesses. Online booking, subscription management, and a beautiful website — all in one place.',
};

const features = [
  {
    icon: '✂️',
    color: '#fff7e6',
    iconColor: '#fa8c16',
    title: 'Your Own Salon Website',
    desc: 'Get a professional, branded website for your salon instantly. Showcase services, accept bookings, and grow your business online.',
  },
  {
    icon: '📅',
    color: '#f6ffed',
    iconColor: '#52c41a',
    title: 'Smart Appointment Booking',
    desc: 'Customers book slots in real-time. Automatic conflict prevention, working hours management, and instant confirmations.',
  },
  {
    icon: '💳',
    color: '#f0f7ff',
    iconColor: '#1890ff',
    title: 'Razorpay Payments',
    desc: 'Secure subscription payments via Razorpay. Monthly and yearly plans with automatic renewal and webhook verification.',
  },
  {
    icon: '📊',
    color: '#fff0f6',
    iconColor: '#eb2f96',
    title: 'Owner Dashboard',
    desc: 'Manage services, view bookings, set availability, and track your subscription — all from one powerful dashboard.',
  },
  {
    icon: '🔐',
    color: '#f9f0ff',
    iconColor: '#722ed1',
    title: 'Multi-Tenant & Secure',
    desc: 'Each salon is fully isolated. JWT authentication, role-based access, and encrypted data keep your business safe.',
  },
  {
    icon: '📱',
    color: '#e6fffb',
    iconColor: '#13c2c2',
    title: 'Mobile-First Design',
    desc: 'Beautiful on every device. Your customers can book appointments from their phone in seconds.',
  },
];

const stats = [
  { number: '500+', label: 'Salons Onboarded' },
  { number: '50K+', label: 'Appointments Booked' },
  { number: '99.9%', label: 'Uptime SLA' },
  { number: '4.9★', label: 'Owner Rating' },
];

const testimonials = [
  {
    quote: 'SalonSaaS transformed my business. I went from a paper appointment book to a fully automated online booking system in one day.',
    name: 'Priya Sharma',
    role: 'Owner, Glow Beauty Studio',
    initials: 'PS',
    color: '#eb2f96',
  },
  {
    quote: 'My clients love being able to book online. The website looks so professional and the payment system just works.',
    name: 'Rahul Mehta',
    role: 'Owner, The Barber Co.',
    initials: 'RM',
    color: '#1890ff',
  },
  {
    quote: 'The dashboard gives me everything I need. I can see all my bookings, manage services, and renew my plan in one place.',
    name: 'Anita Patel',
    role: 'Owner, Luxe Hair Lounge',
    initials: 'AP',
    color: '#52c41a',
  },
];

const steps = [
  { step: '01', title: 'Sign Up & Choose a Plan', desc: 'Create your account and pick the plan that fits your salon.' },
  { step: '02', title: 'Pay via Razorpay', desc: 'Secure checkout in seconds. Your salon is activated immediately.' },
  { step: '03', title: 'Customize Your Salon', desc: 'Add your services, set working hours, and personalize your page.' },
  { step: '04', title: 'Share & Start Booking', desc: 'Share your unique salon link. Customers book appointments 24/7.' },
];

export default function HomePage() {
  return (
    <>
      {/* Hero */}
      <section className="hero">
        <div className="hero-container">
          <div className="hero-content">
            <div className="hero-badge">✨ Trusted by 500+ Salons Across India</div>
            <h1 className="hero-title">
              Launch Your Salon Website <span>in Minutes</span>
            </h1>
            <p className="hero-subtitle">
              The complete SaaS platform for salon businesses. Get your own booking website, manage appointments, and grow your clientele — all powered by one subscription.
            </p>
            <div className="hero-actions">
              <Link href="/pricing">
                <Button type="primary" size="large">Get Your Salon Website →</Button>
              </Link>
              <Link href="/salon/demo-salon">
                <Button size="large">See Live Demo</Button>
              </Link>
            </div>
          </div>

          <div className="hero-visual">
            <div className="hero-card">
              <div className="hero-card-header">
                <div className="hero-card-dot" style={{ background: '#ff5f57' }} />
                <div className="hero-card-dot" style={{ background: '#febc2e' }} />
                <div className="hero-card-dot" style={{ background: '#28c840' }} />
                <span style={{ marginLeft: 8, fontSize: 12, color: '#999' }}>salon.salonsaas.com</span>
              </div>
              <div style={{ padding: '12px 0' }}>
                <div style={{ fontWeight: 700, fontSize: 16, marginBottom: 4 }}>✂️ Glow Beauty Studio</div>
                <div style={{ fontSize: 12, color: '#666', marginBottom: 12 }}>Mumbai, Maharashtra</div>
              </div>
              <div className="hero-stat-row">
                <div className="hero-stat">
                  <div className="hero-stat-value">24</div>
                  <div className="hero-stat-label">Bookings Today</div>
                </div>
                <div className="hero-stat">
                  <div className="hero-stat-value">₹18K</div>
                  <div className="hero-stat-label">This Week</div>
                </div>
              </div>
              <div style={{ marginTop: 12 }}>
                {[
                  { label: 'Hair Cut', time: '10:00 AM', status: '✅' },
                  { label: 'Facial', time: '11:30 AM', status: '✅' },
                  { label: 'Manicure', time: '02:00 PM', status: '🕐' },
                ].map((item, i) => (
                  <div key={i} style={{ display: 'flex', justifyContent: 'space-between', padding: '6px 0', borderBottom: '1px solid #f0f0f0', fontSize: 13 }}>
                    <span>{item.label}</span>
                    <span style={{ color: '#666' }}>{item.time} {item.status}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Stats Band */}
      <div className="stats-band">
        <div className="stats-grid">
          {stats.map((s) => (
            <div key={s.label}>
              <div className="stat-number">{s.number}</div>
              <div className="stat-label">{s.label}</div>
            </div>
          ))}
        </div>
      </div>

      {/* How It Works */}
      <section className="section" style={{ background: 'var(--theme-surface)' }}>
        <div className="section-container">
          <div className="section-header">
            <span className="section-label">How It Works</span>
            <h2 className="section-title">Up and running in 4 steps</h2>
            <p className="section-subtitle">No technical skills needed. Your salon website is live in minutes.</p>
          </div>
          <div className="features-grid">
            {steps.map((s) => (
              <div key={s.step} className="feature-card" style={{ textAlign: 'center' }}>
                <div style={{ fontSize: 32, fontWeight: 800, color: '#1890ff', marginBottom: 8 }}>{s.step}</div>
                <h3 className="feature-title">{s.title}</h3>
                <p className="feature-desc">{s.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Features */}
      <section className="section" id="features" style={{ background: 'var(--theme-background)' }}>
        <div className="section-container">
          <div className="section-header">
            <span className="section-label">Features</span>
            <h2 className="section-title">Everything your salon needs</h2>
            <p className="section-subtitle">
              A complete toolkit built specifically for salon businesses — from booking to billing.
            </p>
          </div>
          <div className="features-grid">
            {features.map((f) => (
              <div key={f.title} className="feature-card">
                <div className="feature-icon" style={{ background: f.color, color: f.iconColor }}>
                  {f.icon}
                </div>
                <h3 className="feature-title">{f.title}</h3>
                <p className="feature-desc">{f.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="section" style={{ background: 'var(--theme-surface)' }}>
        <div className="section-container">
          <div className="section-header">
            <span className="section-label">Testimonials</span>
            <h2 className="section-title">Loved by salon owners</h2>
          </div>
          <div className="testimonials-grid">
            {testimonials.map((t) => (
              <div key={t.name} className="testimonial-card">
                <p className="testimonial-quote">&ldquo;{t.quote}&rdquo;</p>
                <div className="testimonial-author">
                  <div className="testimonial-avatar" style={{ background: t.color }}>
                    {t.initials}
                  </div>
                  <div>
                    <p className="testimonial-name">{t.name}</p>
                    <p className="testimonial-role">{t.role}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <div className="cta-band">
        <h2 className="cta-title">Ready to grow your salon?</h2>
        <p className="cta-subtitle">Join 500+ salon owners already using SalonSaaS. Start your free trial today.</p>
        <div className="cta-actions">
          <Link href="/pricing">
            <Button size="large" style={{ background: '#fff', color: '#1890ff', border: 'none', fontWeight: 600 }}>
              View Pricing Plans
            </Button>
          </Link>
          <Link href="/register">
            <Button size="large" style={{ background: 'transparent', color: '#fff', border: '1px solid rgba(255,255,255,0.5)' }}>
              Create Free Account
            </Button>
          </Link>
        </div>
      </div>
    </>
  );
}

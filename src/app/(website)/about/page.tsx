import React from 'react';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'About — WebaniX',
  description: 'Learn about the team and mission behind WebaniX.',
};

const team = [
  { name: 'Alex Morgan', role: 'CEO & Co-founder', initials: 'AM', color: '#1890ff' },
  { name: 'Jordan Lee', role: 'CTO & Co-founder', initials: 'JL', color: '#52c41a' },
  { name: 'Taylor Kim', role: 'Head of Design', initials: 'TK', color: '#722ed1' },
  { name: 'Riley Patel', role: 'Lead Engineer', initials: 'RP', color: '#fa8c16' },
  { name: 'Casey Wu', role: 'Product Manager', initials: 'CW', color: '#eb2f96' },
  { name: 'Dana Osei', role: 'DevOps Lead', initials: 'DO', color: '#13c2c2' },
  { name: 'Sam Torres', role: 'Frontend Engineer', initials: 'ST', color: '#f5222d' },
  { name: 'Quinn Zhao', role: 'Backend Engineer', initials: 'QZ', color: '#2f54eb' },
];

const values = [
  { icon: '🚀', title: 'Move Fast', desc: 'We ship quickly and iterate based on real user feedback.' },
  { icon: '🤝', title: 'Build Trust', desc: 'Transparency and reliability are at the core of everything we do.' },
  { icon: '🌱', title: 'Keep Growing', desc: 'We invest in our team and our product every single day.' },
  { icon: '💡', title: 'Stay Curious', desc: 'We challenge assumptions and explore better ways to solve problems.' },
];

export default function AboutPage() {
  return (
    <>
      {/* Hero */}
      <section className="about-hero section">
        <div className="about-content">
          <span className="section-label">About Us</span>
          <h1 className="section-title" style={{ marginTop: 8 }}>
            We&apos;re building the future of project management
          </h1>
          <p className="section-subtitle" style={{ margin: '0 auto' }}>
            WebaniX was founded in 2023 with a simple mission: give every team the tools they need to build great software, without the complexity.
          </p>
        </div>
      </section>

      {/* Values */}
      <section className="section" style={{ background: 'var(--theme-background)' }}>
        <div className="section-container">
          <div className="section-header">
            <span className="section-label">Our Values</span>
            <h2 className="section-title">What drives us</h2>
          </div>
          <div className="features-grid">
            {values.map((v) => (
              <div key={v.title} className="feature-card">
                <div className="feature-icon" style={{ background: 'var(--theme-hover)', fontSize: 24 }}>
                  {v.icon}
                </div>
                <h3 className="feature-title">{v.title}</h3>
                <p className="feature-desc">{v.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Team */}
      <section className="section" style={{ background: 'var(--theme-surface)' }}>
        <div className="section-container">
          <div className="section-header">
            <span className="section-label">The Team</span>
            <h2 className="section-title">Meet the people behind WebaniX</h2>
            <p className="section-subtitle">
              A small, passionate team distributed across the globe.
            </p>
          </div>
          <div className="team-grid">
            {team.map((member) => (
              <div key={member.name} className="team-card">
                <div className="team-avatar" style={{ background: member.color }}>
                  {member.initials}
                </div>
                <p className="team-name">{member.name}</p>
                <p className="team-role">{member.role}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}

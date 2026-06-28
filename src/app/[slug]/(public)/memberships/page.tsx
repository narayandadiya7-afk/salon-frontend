'use client';

import React, { useEffect, useState } from 'react';
import { useParams } from 'next/navigation';
import Link from 'next/link';
import { Typography, Row, Col, Button, Spin, Alert, Tag } from 'antd';
import apiUtil from '../../../../utils/api';
import { ApiGetSalonBySlug } from '../../../../utils/api.constant';
import { eResultCode } from '../../../../utils/enum';

const { Title, Paragraph, Text } = Typography;

const GOLD = '#d4a853';
const BURGUNDY = '#7C1D3E';

const tiers = [
  {
    name: 'Silver', price: '₹999', period: '/month', color: '#8a9ba8',
    features: ['2 free services/month', '10% off all treatments', 'Free consultation', 'Priority scheduling'],
    popular: false,
  },
  {
    name: 'Gold', price: '₹1,999', period: '/month', color: GOLD,
    features: ['5 free services/month', '20% off all treatments', 'Free consultation', 'Priority scheduling', 'Exclusive event invites', 'Free add-ons'],
    popular: true,
  },
  {
    name: 'Platinum', price: '₹3,999', period: '/month', color: '#e8e8e8',
    features: ['Unlimited services', '30% off all treatments', 'Free consultation', 'VIP scheduling', 'Exclusive event invites', 'Free add-ons', 'Monthly gift', 'Dedicated stylist'],
    popular: false,
  },
];

const comparisonRows = [
  { label: 'Free Services', silver: '2/mo', gold: '5/mo', platinum: 'Unlimited' },
  { label: 'Discount on Treatments', silver: '10%', gold: '20%', platinum: '30%' },
  { label: 'Free Consultation', silver: 'Yes', gold: 'Yes', platinum: 'Yes' },
  { label: 'Priority Scheduling', silver: 'No', gold: 'Yes', platinum: 'Yes' },
  { label: 'Event Invites', silver: 'No', gold: 'Yes', platinum: 'Yes' },
  { label: 'Monthly Gift', silver: 'No', gold: 'No', platinum: 'Yes' },
  { label: 'Dedicated Stylist', silver: 'No', gold: 'No', platinum: 'Yes' },
];

export default function MembershipsPage() {
  const { slug } = useParams() as { slug: string };
  const [salon, setSalon] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    (async () => {
      try {
        const res = await apiUtil.get(ApiGetSalonBySlug(slug));
        if (res?.dataResponse?.returnCode === eResultCode.SUCCESS) setSalon(res.data);
        else setError('Salon not found');
      } catch { setError('Failed to load'); }
      finally { setLoading(false); }
    })();
  }, [slug]);

  if (loading) return <div style={{ textAlign: 'center', padding: 100 }}><Spin size="large" /></div>;
  if (error) return <div style={{ maxWidth: 1100, margin: '50px auto', padding: '0 16px' }}><Alert title={error} type="error" showIcon /></div>;

  const cellStyle = (isHeader = false) => ({
    padding: '12px 16px', fontSize: 14,
    borderBottom: '1px solid rgba(212,168,83,0.2)',
    fontWeight: isHeader ? 700 : 400,
    color: isHeader ? BURGUNDY : '#333',
    background: isHeader ? 'rgba(212,168,83,0.08)' : 'transparent',
  });

  return (
    <div>
      {/* Hero */}
      <div style={{
        background: `linear-gradient(135deg, ${BURGUNDY} 0%, #4a0d25 50%, ${GOLD} 100%)`,
        padding: '80px 16px', textAlign: 'center',
      }}>
        <Title style={{ color: '#fff', fontSize: 48, margin: 0, fontWeight: 700 }}>Memberships</Title>
        <Paragraph style={{ color: 'rgba(255,255,255,0.85)', fontSize: 18, maxWidth: 600, margin: '16px auto 0' }}>
          Join our exclusive membership program and enjoy premium benefits all year round.
        </Paragraph>
      </div>

      <div style={{ maxWidth: 1200, margin: '0 auto', padding: '60px 16px' }}>
        {/* Tier Cards */}
        <Row gutter={[24, 24]} justify="center">
          {tiers.map(tier => (
            <Col xs={24} md={8} key={tier.name}>
              <div style={{
                background: '#fff', borderRadius: 16, overflow: 'hidden',
                boxShadow: tier.popular ? '0 8px 40px rgba(212,168,83,0.25)' : '0 4px 20px rgba(0,0,0,0.08)',
                border: tier.popular ? `2px solid ${GOLD}` : '1px solid rgba(0,0,0,0.06)',
                position: 'relative', transition: 'transform 0.3s, box-shadow 0.3s',
                height: '100%', display: 'flex', flexDirection: 'column',
              }}
                onMouseEnter={e => { e.currentTarget.style.transform = 'translateY(-8px)'; e.currentTarget.style.boxShadow = '0 12px 40px rgba(212,168,83,0.35)'; }}
                onMouseLeave={e => { e.currentTarget.style.transform = 'translateY(0)'; e.currentTarget.style.boxShadow = tier.popular ? '0 8px 40px rgba(212,168,83,0.25)' : '0 4px 20px rgba(0,0,0,0.08)'; }}
              >
                {tier.popular && (
                  <div style={{
                    position: 'absolute', top: 16, right: -30,
                    background: GOLD, color: '#fff', padding: '4px 36px',
                    transform: 'rotate(45deg)', fontSize: 12, fontWeight: 700, letterSpacing: 1,
                  }}>
                    POPULAR
                  </div>
                )}
                <div style={{ padding: '40px 24px', textAlign: 'center', borderBottom: `1px solid rgba(212,168,83,0.15)` }}>
                  <Title level={3} style={{ color: tier.color, margin: 0 }}>{tier.name}</Title>
                  <div style={{ margin: '16px 0' }}>
                    <span style={{ fontSize: 36, fontWeight: 700, color: BURGUNDY }}>{tier.price}</span>
                    <span style={{ color: '#888', fontSize: 14 }}>{tier.period}</span>
                  </div>
                </div>
                <div style={{ padding: '24px', flex: 1, display: 'flex', flexDirection: 'column' }}>
                  {tier.features.map((f, i) => (
                    <div key={i} style={{ padding: '8px 0', borderBottom: '1px solid rgba(0,0,0,0.04)', display: 'flex', alignItems: 'center', gap: 8 }}>
                      <span style={{ color: GOLD }}>✓</span>
                      <span style={{ fontSize: 14, color: '#555' }}>{f}</span>
                    </div>
                  ))}
                  <div style={{ marginTop: 'auto', paddingTop: 24 }}>
                    <Link href={`/${slug}/book`}>
                      <Button type="primary" size="large" block style={{
                        height: 48, fontSize: 15, fontWeight: 600, borderRadius: 8,
                        background: tier.popular ? `linear-gradient(135deg, ${GOLD}, ${BURGUNDY})` : BURGUNDY,
                        border: 'none',
                      }}>
                        Get {tier.name}
                      </Button>
                    </Link>
                  </div>
                </div>
              </div>
            </Col>
          ))}
        </Row>

        {/* Comparison Table */}
        <div style={{ marginTop: 60 }}>
          <Title level={2} style={{ textAlign: 'center', color: BURGUNDY, marginBottom: 32 }}>Compare Plans</Title>
          <div style={{ overflowX: 'auto' }}>
            <table style={{ width: '100%', borderCollapse: 'collapse', minWidth: 500 }}>
              <thead>
                <tr>
                  <th style={cellStyle(true)}>Feature</th>
                  <th style={cellStyle(true)}>Silver</th>
                  <th style={cellStyle(true)}>Gold</th>
                  <th style={cellStyle(true)}>Platinum</th>
                </tr>
              </thead>
              <tbody>
                {comparisonRows.map(row => (
                  <tr key={row.label}>
                    <td style={cellStyle()}>{row.label}</td>
                    <td style={cellStyle()}>{row.silver}</td>
                    <td style={cellStyle()}>{row.gold}</td>
                    <td style={cellStyle()}>{row.platinum}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>

      {/* CTA */}
      <div style={{
        background: `linear-gradient(135deg, ${BURGUNDY}, ${GOLD})`,
        textAlign: 'center', padding: '60px 16px',
      }}>
        <Title level={2} style={{ color: '#fff', margin: 0 }}>Start Saving Today</Title>
        <Paragraph style={{ color: 'rgba(255,255,255,0.85)', fontSize: 16, margin: '12px 0 24px' }}>
          Choose the plan that fits your lifestyle and unlock premium salon benefits.
        </Paragraph>
        <Link href={`/${slug}/book`}>
          <Button type="primary" size="large" style={{
            height: 50, padding: '0 40px', fontSize: 16, fontWeight: 600,
            background: '#fff', color: BURGUNDY, border: 'none', borderRadius: 6,
          }}>
            Join Now
          </Button>
        </Link>
      </div>
    </div>
  );
}

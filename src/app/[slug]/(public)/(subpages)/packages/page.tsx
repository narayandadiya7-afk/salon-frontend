'use client';

import React, { useEffect, useState } from 'react';
import { useParams } from 'next/navigation';
import Link from 'next/link';
import { Typography, Row, Col, Button, Spin, Alert, Tag } from 'antd';
import apiUtil from '../../../../../utils/api';
import { ApiGetSalonBySlug } from '../../../../../utils/api.constant';
import { eResultCode } from '../../../../../utils/enum';

const { Title, Paragraph } = Typography;

const GOLD = '#d4a853';
const BURGUNDY = '#7C1D3E';

const packages = [
  {
    name: 'Glow Essentials', desc: 'A perfect start for healthy, glowing skin.',
    items: ['Facial Cleansing', 'Hydrating Mask', 'Basic Manicure', 'Hair Spa'],
    price: '₹1,499', savings: 'Save ₹600', duration: '90 mins',
    gradient: 'linear-gradient(135deg, #7C1D3E, #a52a5a)',
  },
  {
    name: 'Bridal Glow', desc: 'Everything you need for your special day.',
    items: ['Bridal Facial', 'Hairstyling', 'Manicure & Pedicure', 'Makeup', 'Hair Treatment'],
    price: '₹4,999', savings: 'Save ₹2,000', duration: '3 hours',
    gradient: 'linear-gradient(135deg, #d4a853, #e8c47a)',
  },
  {
    name: 'Mens Grooming', desc: 'Complete grooming package for the modern man.',
    items: ['Haircut & Styling', 'Facial', 'Beard Trim', 'Manicure', 'Head Massage'],
    price: '₹1,999', savings: 'Save ₹800', duration: '2 hours',
    gradient: 'linear-gradient(135deg, #2d5a4b, #4a9e7f)',
  },
  {
    name: 'Spa Retreat', desc: 'Unwind and rejuvenate with our premium spa treatments.',
    items: ['Aromatherapy Massage', 'Body Scrub', 'Steam Bath', 'Facial', 'Foot Reflexology'],
    price: '₹3,499', savings: 'Save ₹1,500', duration: '3 hours',
    gradient: 'linear-gradient(135deg, #4a0d25, #7C1D3E)',
  },
  {
    name: 'Party Ready', desc: 'Get red-carpet ready for your next event.',
    items: ['Hairstyling', 'Makeup Application', 'Nail Art', 'False Lashes'],
    price: '₹2,999', savings: 'Save ₹1,000', duration: '2.5 hours',
    gradient: 'linear-gradient(135deg, #b83a6b, #d4a853)',
  },
  {
    name: 'Wellness Combo', desc: 'Nourish your body and mind from head to toe.',
    items: ['Full Body Massage', 'Facial', 'Pedicure', 'Hair Mask', 'Steam'],
    price: '₹3,999', savings: 'Save ₹1,800', duration: '3 hours',
    gradient: 'linear-gradient(135deg, #1a3a5c, #2d6a8f)',
  },
];

export default function PackagesPage() {
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

  return (
    <div>
      {/* Hero */}
      <div style={{
        background: `linear-gradient(135deg, ${BURGUNDY} 0%, #4a0d25 50%, ${GOLD} 100%)`,
        padding: '80px 16px', textAlign: 'center',
      }}>
        <Title style={{ color: '#fff', fontSize: 48, margin: 0, fontWeight: 700 }}>Packages</Title>
        <Paragraph style={{ color: 'rgba(255,255,255,0.85)', fontSize: 18, maxWidth: 600, margin: '16px auto 0' }}>
          Carefully curated packages designed to give you the ultimate salon experience at unbeatable value.
        </Paragraph>
      </div>

      <div style={{ maxWidth: 1200, margin: '0 auto', padding: '60px 16px' }}>
        <Row gutter={[24, 24]}>
          {packages.map(pkg => (
            <Col xs={24} md={8} key={pkg.name}>
              <div style={{
                background: '#fff', borderRadius: 16, overflow: 'hidden',
                boxShadow: '0 4px 20px rgba(0,0,0,0.08)', height: '100%',
                display: 'flex', flexDirection: 'column',
                transition: 'transform 0.3s, box-shadow 0.3s',
              }}
                onMouseEnter={e => { e.currentTarget.style.transform = 'translateY(-8px)'; e.currentTarget.style.boxShadow = '0 12px 40px rgba(212,168,83,0.3)'; }}
                onMouseLeave={e => { e.currentTarget.style.transform = 'translateY(0)'; e.currentTarget.style.boxShadow = '0 4px 20px rgba(0,0,0,0.08)'; }}
              >
                {/* Gradient Top Bar */}
                <div style={{ height: 8, background: pkg.gradient }} />

                <div style={{ padding: '24px', flex: 1, display: 'flex', flexDirection: 'column' }}>
                  <Title level={3} style={{ color: BURGUNDY, margin: 0 }}>{pkg.name}</Title>
                  <Paragraph style={{ color: '#666', fontSize: 14, margin: '8px 0 16px' }}>{pkg.desc}</Paragraph>

                  <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 4 }}>
                    <Tag color="gold" style={{ borderRadius: 4 }}>{pkg.savings}</Tag>
                    <Tag style={{ borderRadius: 4, border: `1px solid ${GOLD}`, color: BURGUNDY }}>{pkg.duration}</Tag>
                  </div>

                  <div style={{ flex: 1, margin: '16px 0' }}>
                    {pkg.items.map((item, i) => (
                      <div key={i} style={{ padding: '6px 0', borderBottom: '1px solid rgba(0,0,0,0.04)', display: 'flex', alignItems: 'center', gap: 8 }}>
                        <span style={{ color: GOLD, fontSize: 12 }}>●</span>
                        <span style={{ fontSize: 14, color: '#555' }}>{item}</span>
                      </div>
                    ))}
                  </div>

                  <div style={{ borderTop: '1px solid rgba(212,168,83,0.15)', paddingTop: 16, display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                    <span style={{ fontSize: 28, fontWeight: 700, color: BURGUNDY }}>{pkg.price}</span>
                    <Link href={`/${slug}/book`}>
                      <Button type="primary" style={{
                        background: `linear-gradient(135deg, ${GOLD}, ${BURGUNDY})`,
                        border: 'none', borderRadius: 6, fontWeight: 600,
                      }}>
                        Book Now
                      </Button>
                    </Link>
                  </div>
                </div>
              </div>
            </Col>
          ))}
        </Row>
      </div>

      {/* CTA */}
      <div style={{
        background: `linear-gradient(135deg, ${BURGUNDY}, ${GOLD})`,
        textAlign: 'center', padding: '60px 16px',
      }}>
        <Title level={2} style={{ color: '#fff', margin: 0 }}>Customize Your Own Package</Title>
        <Paragraph style={{ color: 'rgba(255,255,255,0.85)', fontSize: 16, margin: '12px 0 24px' }}>
          Can't find what you're looking for? We'll create a bespoke package just for you.
        </Paragraph>
        <Link href={`/${slug}/book`}>
          <Button type="primary" size="large" style={{
            height: 50, padding: '0 40px', fontSize: 16, fontWeight: 600,
            background: '#fff', color: BURGUNDY, border: 'none', borderRadius: 6,
          }}>
            Get Started
          </Button>
        </Link>
      </div>
    </div>
  );
}

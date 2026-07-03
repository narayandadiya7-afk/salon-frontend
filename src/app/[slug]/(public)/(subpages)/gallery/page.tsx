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
const categories = ['All', 'Hair', 'Skin', 'Nails', 'Spa', 'Bridal'];
const galleryImages = [
  { id: 1, cat: 'Hair', h: 360 },
  { id: 2, cat: 'Skin', h: 280 },
  { id: 3, cat: 'Nails', h: 320 },
  { id: 4, cat: 'Spa', h: 260 },
  { id: 5, cat: 'Bridal', h: 380 },
  { id: 6, cat: 'Hair', h: 300 },
  { id: 7, cat: 'Skin', h: 340 },
  { id: 8, cat: 'Nails', h: 270 },
  { id: 9, cat: 'Spa', h: 350 },
  { id: 10, cat: 'Bridal', h: 290 },
  { id: 11, cat: 'Hair', h: 310 },
  { id: 12, cat: 'Skin', h: 370 },
];

const catGradients: Record<string, string> = {
  Hair: 'linear-gradient(135deg, #7C1D3E, #a52a5a)',
  Skin: 'linear-gradient(135deg, #d4a853, #e8c47a)',
  Nails: 'linear-gradient(135deg, #7C1D3E, #b83a6b)',
  Spa: 'linear-gradient(135deg, #2d5a4b, #4a9e7f)',
  Bridal: 'linear-gradient(135deg, #d4a853, #f0d68a)',
};

export default function GalleryPage() {
  const { slug } = useParams() as { slug: string };
  const [salon, setSalon] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [activeCat, setActiveCat] = useState('All');

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

  const filtered = activeCat === 'All' ? galleryImages : galleryImages.filter(i => i.cat === activeCat);

  return (
    <div>
      {/* Hero */}
      <div style={{
        background: `linear-gradient(135deg, ${BURGUNDY} 0%, #4a0d25 50%, ${GOLD} 100%)`,
        padding: '80px 16px', textAlign: 'center',
      }}>
        <Title style={{ color: '#fff', fontSize: 48, margin: 0, fontWeight: 700 }}>Our Gallery</Title>
        <Paragraph style={{ color: 'rgba(255,255,255,0.85)', fontSize: 18, maxWidth: 600, margin: '16px auto 0' }}>
          Explore the artistry and elegance behind every style we create.
        </Paragraph>
      </div>

      <div style={{ maxWidth: 1200, margin: '0 auto', padding: '40px 16px' }}>
        {/* Category Filter */}
        <Row gutter={[12, 12]} justify="center" style={{ marginBottom: 40 }}>
          {categories.map(cat => (
            <Col key={cat}>
              <Tag
                onClick={() => setActiveCat(cat)}
                style={{
                  padding: '8px 24px', fontSize: 15, borderRadius: 24, cursor: 'pointer',
                  border: activeCat === cat ? 'none' : `1px solid ${GOLD}`,
                  background: activeCat === cat ? GOLD : 'transparent',
                  color: activeCat === cat ? '#fff' : GOLD,
                  fontWeight: 500, transition: 'all 0.3s',
                }}
              >
                {cat}
              </Tag>
            </Col>
          ))}
        </Row>

        {/* Masonry Grid */}
        <Row gutter={[16, 16]}>
          {filtered.map(img => (
            <Col xs={24} sm={12} md={8} lg={6} key={img.id} style={{ display: 'flex' }}>
              <div style={{
                width: '100%', height: img.h, borderRadius: 12,
                background: catGradients[img.cat] || `linear-gradient(135deg, ${BURGUNDY}, ${GOLD})`,
                display: 'flex', alignItems: 'center', justifyContent: 'center',
                position: 'relative', overflow: 'hidden', cursor: 'pointer',
                transition: 'transform 0.4s, box-shadow 0.4s',
              }}
                onMouseEnter={e => { e.currentTarget.style.transform = 'scale(1.03)'; e.currentTarget.style.boxShadow = '0 12px 32px rgba(0,0,0,0.3)'; }}
                onMouseLeave={e => { e.currentTarget.style.transform = 'scale(1)'; e.currentTarget.style.boxShadow = 'none'; }}
              >
                <div style={{
                  position: 'absolute', inset: 0,
                  background: 'rgba(0,0,0,0.4)', opacity: 0,
                  transition: 'opacity 0.3s', display: 'flex', alignItems: 'center', justifyContent: 'center', flexDirection: 'column', gap: 8,
                }}
                  className="hover-overlay"
                  onMouseEnter={e => (e.currentTarget.style.opacity = '1')}
                  onMouseLeave={e => (e.currentTarget.style.opacity = '0')}
                >
                  <span style={{ color: '#fff', fontSize: 24, fontWeight: 600 }}>{img.cat}</span>
                  <span style={{ color: GOLD, fontSize: 14 }}>View Gallery</span>
                </div>
                <span style={{ color: 'rgba(255,255,255,0.15)', fontSize: 48, fontWeight: 700, userSelect: 'none' }}>{img.cat}</span>
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
        <Title level={2} style={{ color: '#fff', margin: 0 }}>Ready to Create Your Look?</Title>
        <Paragraph style={{ color: 'rgba(255,255,255,0.85)', fontSize: 16, margin: '12px 0 24px' }}>
          Book an appointment today and let our experts craft your perfect style.
        </Paragraph>
        <Link href={`/${slug}/book`}>
          <Button type="primary" size="large" style={{
            height: 50, padding: '0 40px', fontSize: 16, fontWeight: 600,
            background: '#fff', color: BURGUNDY, border: 'none', borderRadius: 6,
          }}>
            Book Now
          </Button>
        </Link>
      </div>
    </div>
  );
}

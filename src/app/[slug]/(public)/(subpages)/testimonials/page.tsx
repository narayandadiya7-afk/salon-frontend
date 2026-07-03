'use client';

import React, { useEffect, useState } from 'react';
import { useParams } from 'next/navigation';
import Link from 'next/link';
import { Typography, Row, Col, Button, Spin, Alert, Rate, Tag, Avatar } from 'antd';
import apiUtil from '../../../../../utils/api';
import { ApiGetSalonBySlug } from '../../../../../utils/api.constant';
import { eResultCode } from '../../../../../utils/enum';

const { Title, Paragraph } = Typography;

const GOLD = '#d4a853';
const BURGUNDY = '#7C1D3E';

const reviews = [
  { name: 'Priya Sharma', rating: 5, text: 'Absolutely stunning service! The stylist understood exactly what I wanted. My new haircut has received so many compliments.', service: 'Haircut & Styling', avatar: 'PS' },
  { name: 'Ananya Patel', rating: 5, text: 'The bridal package was incredible. From the facial to the makeup, everything was perfect. Made me feel like a queen on my big day!', service: 'Bridal Package', avatar: 'AP' },
  { name: 'Rahul Verma', rating: 4, text: 'Great grooming experience. The beard trim and facial were top-notch. Will definitely come back for the full grooming package.', service: 'Mens Grooming', avatar: 'RV' },
  { name: 'Neha Gupta', rating: 5, text: 'Best spa experience in town! The aromatherapy massage was incredibly relaxing. The ambiance is so peaceful and calming.', service: 'Spa Retreat', avatar: 'NG' },
  { name: 'Kavita Reddy', rating: 4, text: 'Loved the nail art! The artist was very creative and patient. My nails looked gorgeous for weeks. Highly recommend!', service: 'Nail Art', avatar: 'KR' },
  { name: 'Arjun Mehta', rating: 5, text: 'Professional, punctual, and premium service. The attention to detail is remarkable. This is now my go-to salon.', service: 'Hair Treatment', avatar: 'AM' },
  { name: 'Sneha Kapoor', rating: 4, text: 'Great facial that left my skin glowing for days. The esthetician recommended a perfect skincare routine for my skin type.', service: 'Facial', avatar: 'SK' },
  { name: 'Vikram Singh', rating: 5, text: 'The membership program is fantastic value. I save so much every month and the priority scheduling is a game-changer.', service: 'Membership', avatar: 'VS' },
];

const ratingDistribution = [
  { stars: 5, count: 45, pct: 56 },
  { stars: 4, count: 22, pct: 28 },
  { stars: 3, count: 8, pct: 10 },
  { stars: 2, count: 3, pct: 4 },
  { stars: 1, count: 2, pct: 2 },
];

const videoTestimonials = [
  { name: 'Client Story 1', desc: '"I found my forever salon!"', color: BURGUNDY },
  { name: 'Client Story 2', desc: '"The bridal team is magical"', color: GOLD },
  { name: 'Client Story 3', desc: '"Best grooming experience"', color: '#2d5a4b' },
];

const totalReviews = 80;
const avgRating = 4.6;

export default function TestimonialsPage() {
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
      {/* Hero with Stats */}
      <div style={{
        background: `linear-gradient(135deg, ${BURGUNDY} 0%, #4a0d25 50%, ${GOLD} 100%)`,
        padding: '80px 16px', textAlign: 'center',
      }}>
        <Title style={{ color: '#fff', fontSize: 48, margin: 0, fontWeight: 700 }}>Testimonials</Title>
        <Paragraph style={{ color: 'rgba(255,255,255,0.85)', fontSize: 18, maxWidth: 600, margin: '16px auto 32px' }}>
          Hear what our clients have to say about their salon experience.
        </Paragraph>
        <Row gutter={48} justify="center">
          <Col>
            <div style={{ fontSize: 40, fontWeight: 700, color: GOLD }}>{totalReviews}</div>
            <div style={{ color: 'rgba(255,255,255,0.8)', fontSize: 14 }}>Total Reviews</div>
          </Col>
          <Col>
            <div style={{ fontSize: 40, fontWeight: 700, color: GOLD }}>{avgRating}</div>
            <Rate disabled value={Math.round(avgRating)} style={{ fontSize: 16, color: GOLD }} />
            <div style={{ color: 'rgba(255,255,255,0.8)', fontSize: 14 }}>Average Rating</div>
          </Col>
          <Col>
            <div style={{ fontSize: 40, fontWeight: 700, color: GOLD }}>98%</div>
            <div style={{ color: 'rgba(255,255,255,0.8)', fontSize: 14 }}>Satisfaction Rate</div>
          </Col>
        </Row>
      </div>

      <div style={{ maxWidth: 1200, margin: '0 auto', padding: '60px 16px' }}>
        {/* Rating Summary */}
        <Row gutter={[48, 32]} style={{ marginBottom: 48 }}>
          <Col xs={24} md={10}>
            <Title level={2} style={{ color: BURGUNDY }}>Rating Breakdown</Title>
            {ratingDistribution.map(r => (
              <div key={r.stars} style={{ display: 'flex', alignItems: 'center', gap: 12, marginBottom: 8 }}>
                <span style={{ width: 40, fontSize: 14, color: '#555' }}>{r.stars} ★</span>
                <div style={{ flex: 1, height: 10, background: '#f0f0f0', borderRadius: 5, overflow: 'hidden' }}>
                  <div style={{ width: `${r.pct}%`, height: '100%', background: GOLD, borderRadius: 5 }} />
                </div>
                <span style={{ width: 40, fontSize: 13, color: '#888', textAlign: 'right' }}>{r.count}</span>
              </div>
            ))}
          </Col>
          <Col xs={24} md={14}>
            <div style={{ background: 'rgba(212,168,83,0.08)', borderRadius: 16, padding: 32, height: '100%', display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
              <Title level={3} style={{ color: BURGUNDY, margin: 0 }}>What Our Clients Say</Title>
              <Paragraph style={{ color: '#555', fontSize: 16, fontStyle: 'italic', margin: '16px 0 8px' }}>
                "The attention to detail and quality of service is unmatched. Every visit leaves me feeling pampered and refreshed. I wouldn't trust anyone else with my hair and skincare needs."
              </Paragraph>
              <div style={{ color: GOLD, fontWeight: 600 }}>— Verified Client</div>
            </div>
          </Col>
        </Row>

        {/* Review Cards Grid */}
        <Title level={2} style={{ color: BURGUNDY, textAlign: 'center', marginBottom: 32 }}>Client Reviews</Title>
        <Row gutter={[24, 24]}>
          {reviews.map((review, i) => (
            <Col xs={24} md={12} lg={6} key={i}>
              <div style={{
                background: '#fff', borderRadius: 12, padding: 24,
                boxShadow: '0 2px 12px rgba(0,0,0,0.06)', height: '100%',
                border: '1px solid rgba(212,168,83,0.1)',
                transition: 'transform 0.3s, box-shadow 0.3s',
              }}
                onMouseEnter={e => { e.currentTarget.style.transform = 'translateY(-4px)'; e.currentTarget.style.boxShadow = '0 8px 24px rgba(212,168,83,0.2)'; }}
                onMouseLeave={e => { e.currentTarget.style.transform = 'translateY(0)'; e.currentTarget.style.boxShadow = '0 2px 12px rgba(0,0,0,0.06)'; }}
              >
                <div style={{ display: 'flex', alignItems: 'center', gap: 12, marginBottom: 12 }}>
                  <Avatar style={{ background: GOLD, color: '#fff', fontWeight: 700 }}>{review.avatar}</Avatar>
                  <div>
                    <div style={{ fontWeight: 600, color: BURGUNDY, fontSize: 14 }}>{review.name}</div>
                    <Rate disabled value={review.rating} style={{ fontSize: 12, color: GOLD }} />
                  </div>
                </div>
                <Paragraph style={{ color: '#555', fontSize: 13, margin: '8px 0', lineHeight: 1.6 }}>
                  "{review.text}"
                </Paragraph>
                <Tag style={{ borderRadius: 4, border: `1px solid ${GOLD}`, color: BURGUNDY, fontSize: 11 }}>{review.service}</Tag>
              </div>
            </Col>
          ))}
        </Row>

        {/* Video Testimonials */}
        <div style={{ marginTop: 60 }}>
          <Title level={2} style={{ color: BURGUNDY, textAlign: 'center', marginBottom: 32 }}>Video Testimonials</Title>
          <Row gutter={[24, 24]} justify="center">
            {videoTestimonials.map((v, i) => (
              <Col xs={24} md={8} key={i}>
                <div style={{
                  height: 220, borderRadius: 16, display: 'flex',
                  flexDirection: 'column', alignItems: 'center', justifyContent: 'center',
                  background: v.color, cursor: 'pointer', position: 'relative',
                  transition: 'transform 0.3s',
                }}
                  onMouseEnter={e => { e.currentTarget.style.transform = 'scale(1.03)'; }}
                  onMouseLeave={e => { e.currentTarget.style.transform = 'scale(1)'; }}
                >
                  <div style={{
                    width: 60, height: 60, borderRadius: '50%',
                    background: 'rgba(255,255,255,0.25)', display: 'flex',
                    alignItems: 'center', justifyContent: 'center', marginBottom: 16,
                  }}>
                    <span style={{ color: '#fff', fontSize: 24 }}>▶</span>
                  </div>
                  <div style={{ color: '#fff', fontWeight: 600, fontSize: 16 }}>{v.name}</div>
                  <div style={{ color: 'rgba(255,255,255,0.8)', fontSize: 13, marginTop: 4 }}>{v.desc}</div>
                </div>
              </Col>
            ))}
          </Row>
        </div>
      </div>

      {/* Google Reviews CTA */}
      <div style={{
        background: `linear-gradient(135deg, ${BURGUNDY}, ${GOLD})`,
        textAlign: 'center', padding: '60px 16px',
      }}>
        <Title level={2} style={{ color: '#fff', margin: 0 }}>Leave Us a Review</Title>
        <Paragraph style={{ color: 'rgba(255,255,255,0.85)', fontSize: 16, margin: '12px 0 24px' }}>
          Loved your experience? Share it on Google and help others discover us!
        </Paragraph>
        <Button type="primary" size="large" style={{
          height: 50, padding: '0 40px', fontSize: 16, fontWeight: 600,
          background: '#fff', color: BURGUNDY, border: 'none', borderRadius: 6,
        }}>
          Write a Google Review
        </Button>
      </div>
    </div>
  );
}

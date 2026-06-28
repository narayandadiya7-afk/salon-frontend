'use client';

import React, { useEffect, useState, useMemo } from 'react';
import { useParams, useRouter } from 'next/navigation';
import { Typography, Row, Col, Button, Spin, Alert, Rate, Tag, Divider, Card, Space } from 'antd';
import { RightOutlined, ClockCircleOutlined, ShoppingCartOutlined, StarFilled } from '@ant-design/icons';
import apiUtil from '../../../../utils/api';
import { ApiGetSalonBySlug } from '../../../../utils/api.constant';
import { eResultCode } from '../../../../utils/enum';

const { Title, Text, Paragraph } = Typography;
const gold = '#d4a853';
const burgundy = '#7C1D3E';

const servicesData = [
  { id: 's1', name: 'Classic Haircut', price: 45, duration: 45, description: 'Precision cut tailored to your face shape and style preferences. Includes consultation, wash, and styling.', rating: 4.8, category: 'Hair', image: 'https://images.unsplash.com/photo-1560066984-138dadb4c035?w=600&h=400&fit=crop' },
  { id: 's2', name: 'Color & Highlights', price: 120, duration: 120, description: 'Professional color services with premium products for vibrant, long-lasting results.', rating: 4.9, category: 'Color', image: 'https://images.unsplash.com/photo-1563241527-3004b7be0ffd?w=600&h=400&fit=crop' },
  { id: 's3', name: 'Luxury Facial', price: 85, duration: 60, description: 'Rejuvenating facial treatment using organic products for radiant, glowing skin.', rating: 4.7, category: 'Skin', image: 'https://images.unsplash.com/photo-1570172619644-dfd03ed5d881?w=600&h=400&fit=crop' },
  { id: 's4', name: 'Spa Manicure', price: 55, duration: 45, description: 'Luxurious hand treatment with exfoliation, mask, and premium polish finish.', rating: 4.6, category: 'Nails', image: 'https://images.unsplash.com/photo-1604654894610-df63bc536371?w=600&h=400&fit=crop' },
  { id: 's5', name: 'Blowout & Styling', price: 65, duration: 50, description: 'Professional blow-dry and styling for any occasion — from everyday chic to red carpet glam.', rating: 4.8, category: 'Hair', image: 'https://images.unsplash.com/photo-1522337360788-8b13dee7a37e?w=600&h=400&fit=crop' },
  { id: 's6', name: 'Keratin Treatment', price: 200, duration: 150, description: 'Smoothing treatment that eliminates frizz, reduces volume, and adds brilliant shine for weeks.', rating: 4.9, category: 'Hair', image: 'https://images.unsplash.com/photo-1527668752968-14dc70a27c95?w=600&h=400&fit=crop' },
  { id: 's7', name: 'Deep Tissue Massage', price: 110, duration: 60, description: 'Therapeutic massage targeting muscle tension and stress relief for total relaxation.', rating: 4.8, category: 'Wellness', image: 'https://images.unsplash.com/photo-1544161515-4ab6ce6db874?w=600&h=400&fit=crop' },
  { id: 's8', name: 'Bridal Package', price: 350, duration: 240, description: 'Complete bridal package including trial, hair, makeup, and nail services for your special day.', rating: 5.0, category: 'Packages', image: 'https://images.unsplash.com/photo-1505236858219-8359eb29e329?w=600&h=400&fit=crop' },
];

export default function ServicesPage() {
  const router = useRouter();
  const params = useParams();
  const slug = params?.slug as string;
  const [salon, setSalon] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [activeCategory, setActiveCategory] = useState('All');

  useEffect(() => {
    if (!slug) return;
    setLoading(true);
    apiUtil.get(ApiGetSalonBySlug(slug)).then((res: any) => {
      if (res?.dataResponse?.returnCode === eResultCode.SUCCESS || res?.dataResponse?.returnCode === eResultCode.CREATED) {
        setSalon(res.data || res);
      } else {
        setError('Salon not found');
      }
    }).catch(() => setError('Failed to load page')).finally(() => setLoading(false));
  }, [slug]);

  const categories = useMemo(() => {
    return ['All', ...new Set(servicesData.map((s) => s.category))];
  }, []);

  const filteredServices = useMemo(() => {
    if (activeCategory === 'All') return servicesData;
    return servicesData.filter((s) => s.category === activeCategory);
  }, [activeCategory]);

  if (loading) return <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', minHeight: '100vh' }}><Spin size="large" /></div>;
  if (error) return <div style={{ maxWidth: 1100, margin: '100px auto', padding: '0 16px' }}><Alert title={error} type="error" showIcon /></div>;
  if (!salon) return <div style={{ maxWidth: 1100, margin: '100px auto', padding: '0 16px' }}><Alert title="Salon not found" type="warning" showIcon /></div>;

  return (
    <div>
      {/* HERO */}
      <section style={{ padding: '120px 20px 80px', background: 'linear-gradient(135deg, #0a0a1a 0%, #1a1a3e 50%, #0d0d2b 100%)', textAlign: 'center' }}>
        <div style={{ maxWidth: 800, margin: '0 auto' }}>
          <Title style={{ color: '#fff', fontSize: 48, fontWeight: 800, margin: 0 }}>Our Services</Title>
          <div style={{ width: 60, height: 3, background: gold, margin: '20px auto' }} />
          <Text style={{ color: 'rgba(255,255,255,0.8)', fontSize: 18, display: 'block', marginBottom: 32 }}>
            Premium beauty and grooming services tailored to your needs
          </Text>
          <Button type="primary" size="large" onClick={() => router.push(`/${slug}/book`)}
            style={{ height: 48, paddingInline: 36, fontSize: 16, fontWeight: 600, background: gold, borderColor: gold, color: '#1a1a2e', borderRadius: 30 }}>
            Book Appointment
          </Button>
        </div>
      </section>

      {/* CATEGORY FILTER */}
      <section style={{ padding: '40px 20px', background: '#fff' }}>
        <div style={{ maxWidth: 1100, margin: '0 auto', textAlign: 'center' }}>
          <Space wrap>
            {categories.map((cat) => (
              <Tag key={cat} onClick={() => setActiveCategory(cat)}
                style={{
                  padding: '6px 20px',
                  borderRadius: 20,
                  fontSize: 14,
                  fontWeight: 600,
                  cursor: 'pointer',
                  background: activeCategory === cat ? gold : '#f5f5f5',
                  color: activeCategory === cat ? '#1a1a2e' : '#666',
                  border: 'none',
                }}>
                {cat}
              </Tag>
            ))}
          </Space>
        </div>
      </section>

      {/* SERVICES GRID */}
      <section style={{ padding: '40px 20px 100px', background: '#faf8f5' }}>
        <div style={{ maxWidth: 1100, margin: '0 auto' }}>
          <Row gutter={[24, 24]}>
            {filteredServices.map((svc) => (
              <Col key={svc.id} xs={24} sm={12} md={6}>
                <Card
                  hoverable
                  style={{ borderRadius: 16, overflow: 'hidden', border: 'none', boxShadow: '0 4px 20px rgba(0,0,0,0.06)', height: '100%' }}
                  cover={
                    <div style={{ height: 180, background: `url(${svc.image}) center/cover`, position: 'relative' }}>
                      <div style={{ position: 'absolute', top: 12, right: 12, background: gold, color: '#1a1a2e', padding: '4px 14px', borderRadius: 20, fontSize: 14, fontWeight: 700 }}>${svc.price}</div>
                      <div style={{ position: 'absolute', top: 12, left: 12, background: 'rgba(0,0,0,0.6)', color: '#fff', padding: '4px 10px', borderRadius: 20, fontSize: 12 }}>
                        <ClockCircleOutlined /> {svc.duration} min
                      </div>
                    </div>
                  }
                >
                  <div style={{ marginBottom: 6 }}>
                    <Tag style={{ borderRadius: 12, fontSize: 11, border: 'none', background: '#f0f0f0', color: '#666' }}>{svc.category}</Tag>
                  </div>
                  <Title level={5} style={{ margin: '0 0 4px' }}>{svc.name}</Title>
                  <div style={{ marginBottom: 6 }}>
                    <Rate disabled value={svc.rating} style={{ fontSize: 13 }} />
                    <Text style={{ color: '#999', fontSize: 12, marginLeft: 4 }}>{svc.rating}</Text>
                  </div>
                  <Paragraph style={{ color: '#666', fontSize: 13, margin: '0 0 12px' }} ellipsis={{ rows: 2 }}>
                    {svc.description}
                  </Paragraph>
                  <Button type="primary" block onClick={() => router.push(`/${slug}/book?service=${svc.id}`)}
                    style={{ background: gold, borderColor: gold, color: '#1a1a2e', borderRadius: 30, fontWeight: 600, display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 4 }}>
                    Book Now <RightOutlined />
                  </Button>
                </Card>
              </Col>
            ))}
          </Row>
          {filteredServices.length === 0 && (
            <div style={{ textAlign: 'center', padding: 60 }}>
              <Text style={{ color: '#999', fontSize: 16 }}>No services found in this category.</Text>
            </div>
          )}
        </div>
      </section>

      {/* CTA */}
      <section style={{ padding: '80px 20px', background: `linear-gradient(135deg, ${burgundy} 0%, #a02d52 100%)`, textAlign: 'center' }}>
        <div style={{ maxWidth: 600, margin: '0 auto' }}>
          <Title level={2} style={{ color: '#fff', margin: 0, fontSize: 32 }}>Ready to Experience Luxury?</Title>
          <Text style={{ color: 'rgba(255,255,255,0.8)', fontSize: 16, display: 'block', margin: '16px 0 32px' }}>
            Book your appointment today and let our experts take care of the rest.
          </Text>
          <Button type="primary" size="large" onClick={() => router.push(`/${slug}/book`)}
            style={{ height: 48, paddingInline: 36, fontSize: 16, fontWeight: 600, background: gold, borderColor: gold, color: '#1a1a2e', borderRadius: 30 }}>
            Book Appointment
          </Button>
        </div>
      </section>

      <style>{`
        .ant-card-hoverable:hover { transform: translateY(-4px); box-shadow: 0 12px 40px rgba(0,0,0,0.1) !important; }
      `}</style>
    </div>
  );
}

'use client';

import React, { useEffect, useState, useRef, useCallback } from 'react';
import { useParams, useRouter } from 'next/navigation';
import { Typography, Row, Col, Button, Spin, Alert, Rate, Tag, Avatar, Divider, Card, Modal, Form, Input, Select, Collapse, Space } from 'antd';
import { 
  RightOutlined, StarFilled, StarOutlined, ClockCircleOutlined, TeamOutlined, 
  TrophyOutlined, CalendarOutlined, EnvironmentOutlined, CheckCircleOutlined,
  PhoneOutlined, MailOutlined, ShoppingCartOutlined, PlusOutlined
} from '@ant-design/icons';
import apiUtil from '../../../utils/api';
import { ApiGetSalonBySlug } from '../../../utils/api.constant';
import { eResultCode } from '../../../utils/enum';

const { Title, Text, Paragraph } = Typography;

const gold = '#d4a853';
const burgundy = '#7C1D3E';

const fadeInUp = {
  '@keyframes fadeInUp': {
    '0%': { opacity: 0, transform: 'translateY(30px)' },
    '100%': { opacity: 1, transform: 'translateY(0)' },
  },
};

const bounce = {
  '@keyframes bounce': {
    '0%, 100%': { transform: 'translateY(0)' },
    '50%': { transform: 'translateY(-8px)' },
  },
};

const SectionHeading = ({ title, subtitle }: { title: string; subtitle?: string }) => (
  <div style={{ textAlign: 'center', marginBottom: 48 }}>
    <Divider style={{ borderColor: gold, width: 60, minWidth: 60, margin: '0 auto 16px', borderWidth: 2 }} />
    <Title level={2} style={{ color: '#1a1a2e', margin: 0, fontSize: 36, fontWeight: 700 }}>
      {title}
    </Title>
    {subtitle && (
      <Text style={{ color: '#666', fontSize: 16, marginTop: 8, display: 'block' }}>
        {subtitle}
      </Text>
    )}
  </div>
);

const servicesData = [
  { id: 's1', name: 'Classic Haircut', price: 45, duration: 45, description: 'Precision cut tailored to your face shape and style preferences.', rating: 4.8, image: 'https://images.unsplash.com/photo-1560066984-138dadb4c035?w=400&h=300&fit=crop' },
  { id: 's2', name: 'Color & Highlights', price: 120, duration: 120, description: 'Professional color services with premium products for vibrant, long-lasting results.', rating: 4.9, image: 'https://images.unsplash.com/photo-1563241527-3004b7be0ffd?w=400&h=300&fit=crop' },
  { id: 's3', name: 'Luxury Facial', price: 85, duration: 60, description: 'Rejuvenating facial treatment using organic products for radiant skin.', rating: 4.7, image: 'https://images.unsplash.com/photo-1570172619644-dfd03ed5d881?w=400&h=300&fit=crop' },
  { id: 's4', name: 'Spa Manicure', price: 55, duration: 45, description: 'Luxurious hand treatment with exfoliation, mask, and premium polish.', rating: 4.6, image: 'https://images.unsplash.com/photo-1604654894610-df63bc536371?w=400&h=300&fit=crop' },
  { id: 's5', name: 'Blowout & Styling', price: 65, duration: 50, description: 'Professional blow-dry and styling for any occasion.', rating: 4.8, image: 'https://images.unsplash.com/photo-1522337360788-8b13dee7a37e?w=400&h=300&fit=crop' },
  { id: 's6', name: 'Keratin Treatment', price: 200, duration: 150, description: 'Smoothing treatment that eliminates frizz and adds shine for weeks.', rating: 4.9, image: 'https://images.unsplash.com/photo-1527668752968-14dc70a27c95?w=400&h=300&fit=crop' },
];

const teamData = [
  { id: 't1', name: 'Sophia Williams', role: 'Master Stylist', rating: 4.9, bio: 'With 15+ years of experience, Sophia specializes in precision cuts and creative coloring.', specialties: ['Precision Cuts', 'Color', 'Styling'], avatar: 'https://images.unsplash.com/photo-1580618672591-eb180b1a973f?w=200&h=200&fit=crop' },
  { id: 't2', name: 'James Rodriguez', role: 'Senior Colorist', rating: 4.8, bio: 'James is an award-winning colorist known for his innovative techniques and balayage mastery.', specialties: ['Balayage', 'Ombre', 'Color Correction'], avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=200&h=200&fit=crop' },
  { id: 't3', name: 'Emily Chen', role: 'Esthetician', rating: 4.7, bio: 'Emily brings holistic skincare expertise with training from top spas worldwide.', specialties: ['Facials', 'Waxing', 'Skin Care'], avatar: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=200&h=200&fit=crop' },
];

const testimonialsData = [
  { id: 'rev1', name: 'Sarah M.', text: 'Absolutely stunning results! The team at this salon transformed my look completely. I\'ve never felt more confident.', rating: 5, service: 'Color & Highlights' },
  { id: 'rev2', name: 'David L.', text: 'Professional, talented, and incredibly welcoming. Best haircut I\'ve had in years. Highly recommend!', rating: 5, service: 'Classic Haircut' },
  { id: 'rev3', name: 'Jessica K.', text: 'The facial was heavenly. You can tell they use only the highest quality products. My skin has never looked better.', rating: 5, service: 'Luxury Facial' },
  { id: 'rev4', name: 'Michael R.', text: 'I drive 45 minutes just to come here. That says everything. World-class service every single time.', rating: 5, service: 'Keratin Treatment' },
];

const galleryData = [
  { id: 'g1', src: 'https://images.unsplash.com/photo-1560066984-138dadb4c035?w=600&h=400&fit=crop', alt: 'Haircut' },
  { id: 'g2', src: 'https://images.unsplash.com/photo-1563241527-3004b7be0ffd?w=600&h=400&fit=crop', alt: 'Color' },
  { id: 'g3', src: 'https://images.unsplash.com/photo-1570172619644-dfd03ed5d881?w=600&h=400&fit=crop', alt: 'Facial' },
  { id: 'g4', src: 'https://images.unsplash.com/photo-1604654894610-df63bc536371?w=600&h=400&fit=crop', alt: 'Nails' },
  { id: 'g5', src: 'https://images.unsplash.com/photo-1522337360788-8b13dee7a37e?w=600&h=400&fit=crop', alt: 'Styling' },
  { id: 'g6', src: 'https://images.unsplash.com/photo-1527668752968-14dc70a27c95?w=600&h=400&fit=crop', alt: 'Treatment' },
];

const faqData = [
  { q: 'What should I bring to my appointment?', a: 'Just bring yourself! We provide all products and equipment. If you have any specific product preferences or allergies, please let us know.' },
  { q: 'How early should I arrive?', a: 'We recommend arriving 10-15 minutes early to check in and discuss your preferences with your stylist.' },
  { q: 'What is your cancellation policy?', a: 'We require 24-hour notice for cancellations. Late cancellations may result in a 50% service fee.' },
  { q: 'Do you offer gift certificates?', a: 'Yes! We offer digital and physical gift certificates in any denomination. Perfect for any occasion.' },
  { q: 'Are your products cruelty-free?', a: 'Absolutely. We are committed to using only cruelty-free, ethically sourced professional products.' },
];

const membershipsData = [
  { id: 'm1', name: 'Silver', price: 49, per: 'month', perks: ['10% off all services', 'Free blow-dry (monthly)', 'Priority booking'] },
  { id: 'm2', name: 'Gold', price: 89, per: 'month', perks: ['20% off all services', 'Free blow-dry (weekly)', 'Free add-on service', 'Birthday month special'] },
  { id: 'm3', name: 'Platinum', price: 149, per: 'month', perks: ['30% off all services', 'Unlimited blow-dries', 'Free premium treatment yearly', 'Exclusive event invites', 'Complimentary products'] },
];

export default function SalonHomePage() {
  const router = useRouter();
  const params = useParams();
  const slug = params?.slug as string;
  const [salon, setSalon] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [testimonialIndex, setTestimonialIndex] = useState(0);
  const [quickBookOpen, setQuickBookOpen] = useState(false);
  const [quickForm] = Form.useForm();
  const intervalRef = useRef<any>(null);

  const startAutoRotate = useCallback(() => {
    if (intervalRef.current) clearInterval(intervalRef.current);
    intervalRef.current = setInterval(() => {
      setTestimonialIndex((prev) => (prev + 1) % testimonialsData.length);
    }, 4000);
  }, []);

  useEffect(() => {
    if (!slug) return;
    setLoading(true);
    apiUtil.get(ApiGetSalonBySlug(slug)).then((res: any) => {
      if (res?.dataResponse?.returnCode === eResultCode.SUCCESS || res?.dataResponse?.returnCode === eResultCode.CREATED) {
        setSalon(res.data || res);
      } else {
        setError('Salon not found');
      }
    }).catch(() => setError('Failed to load salon')).finally(() => setLoading(false));
    startAutoRotate();
    return () => { if (intervalRef.current) clearInterval(intervalRef.current); };
  }, [slug, startAutoRotate]);

  const handleQuickBook = () => {
    quickForm.validateFields().then(() => {
      setQuickBookOpen(false);
      quickForm.resetFields();
      Modal.success({ title: 'Request Sent', content: 'We will contact you shortly to confirm your appointment.' });
    }).catch(() => {});
  };

  if (loading) return <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', minHeight: '100vh' }}><Spin size="large" /></div>;
  if (error) return <div style={{ maxWidth: 1100, margin: '100px auto', padding: '0 16px' }}><Alert title={error} type="error" showIcon /></div>;
  if (!salon) return <div style={{ maxWidth: 1100, margin: '100px auto', padding: '0 16px' }}><Alert title="Salon not found" type="warning" showIcon /></div>;

  const heroStyle: React.CSSProperties = {
    minHeight: '100vh',
    background: 'linear-gradient(135deg, #0a0a1a 0%, #1a1a3e 50%, #0d0d2b 100%)',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    textAlign: 'center',
    padding: '0 20px',
    position: 'relative',
    overflow: 'hidden',
  };

  const cardHover = {
    transition: 'all 0.3s ease',
    cursor: 'pointer',
  };

  return (
    <div>
      {/* 🎬 HERO */}
      <section style={heroStyle}>
        <div style={{ position: 'absolute', top: '-50%', left: '-50%', width: '200%', height: '200%', background: 'radial-gradient(circle at 30% 50%, rgba(212,168,83,0.08) 0%, transparent 50%)', pointerEvents: 'none' }} />
        <div style={{ position: 'relative', zIndex: 1, maxWidth: 800 }}>
          <Title style={{ color: '#fff', fontSize: 64, fontWeight: 800, margin: 0, letterSpacing: -1, lineHeight: 1.1 }}>
            {salon?.name || 'Luxury Salon'}
          </Title>
          <div style={{ width: 80, height: 3, background: gold, margin: '24px auto' }} />
          <Text style={{ color: 'rgba(255,255,255,0.8)', fontSize: 20, display: 'block', marginBottom: 40, maxWidth: 600, margin: '0 auto 40px', lineHeight: 1.6 }}>
            {salon?.tagline || 'Where beauty meets excellence. Experience premium grooming and styling services crafted just for you.'}
          </Text>
          <Space size="large">
            <Button type="primary" size="large" onClick={() => router.push(`/${slug}/book`)} 
              style={{ height: 52, paddingInline: 36, fontSize: 16, fontWeight: 600, background: gold, borderColor: gold, color: '#1a1a2e', borderRadius: 30, boxShadow: '0 4px 20px rgba(212,168,83,0.4)' }}>
              Book Appointment
            </Button>
            <Button size="large" onClick={() => router.push(`/${slug}/services`)}
              style={{ height: 52, paddingInline: 36, fontSize: 16, fontWeight: 600, color: '#fff', borderColor: 'rgba(255,255,255,0.3)', background: 'transparent', borderRadius: 30 }}>
              Explore Services
            </Button>
          </Space>
        </div>
      </section>

      {/* 📖 ABOUT PREVIEW */}
      <section style={{ padding: '100px 20px', background: '#fff' }}>
        <div style={{ maxWidth: 1200, margin: '0 auto' }}>
          <Row gutter={[60, 40]} align="middle">
            <Col xs={24} md={12}>
              <div style={{ position: 'relative' }}>
                <div style={{ width: '100%', height: 400, borderRadius: 16, background: '#f5f0eb', overflow: 'hidden' }}>
                  <div style={{ width: '100%', height: '100%', background: 'linear-gradient(135deg, #7C1D3E 0%, #d4a853 100%)', opacity: 0.1 }} />
                </div>
                <div style={{ position: 'absolute', bottom: -20, right: -20, width: 120, height: 120, background: gold, borderRadius: 16, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                  <Text style={{ color: '#fff', fontSize: 14, fontWeight: 700, textAlign: 'center' }}>Est. 2010</Text>
                </div>
              </div>
            </Col>
            <Col xs={24} md={12}>
              <Title level={2} style={{ color: '#1a1a2e', fontSize: 36, marginBottom: 16 }}>Our Story</Title>
              <Divider style={{ borderColor: gold, width: 60, minWidth: 60, margin: '0 0 24px', borderWidth: 2 }} />
              <Paragraph style={{ color: '#666', fontSize: 16, lineHeight: 1.8 }}>
                Founded with a passion for beauty and a commitment to excellence, we have been transforming looks and boosting confidence for over a decade. Our team of skilled professionals combines artistry with the latest techniques to deliver exceptional results.
              </Paragraph>
              <Button type="link" onClick={() => router.push(`/${slug}/about`)} style={{ color: gold, padding: 0, fontSize: 16, fontWeight: 600 }}>
                Learn More &nbsp;<RightOutlined />
              </Button>
            </Col>
          </Row>
        </div>
      </section>

      {/* 📊 STATS */}
      <section style={{ padding: '80px 20px', background: '#1a1a2e' }}>
        <div style={{ maxWidth: 1200, margin: '0 auto' }}>
          <Row gutter={[32, 32]} justify="center">
            {[
              { icon: <TrophyOutlined />, value: '12+', label: 'Years of Excellence' },
              { icon: <TeamOutlined />, value: '15K+', label: 'Happy Customers' },
              { icon: <CalendarOutlined />, value: '50K+', label: 'Appointments' },
              { icon: <StarFilled />, value: '8', label: 'Industry Awards' },
            ].map((stat, i) => (
              <Col key={i} xs={12} md={6} style={{ textAlign: 'center' }}>
                <div style={{ color: gold, fontSize: 36, marginBottom: 12 }}>{stat.icon}</div>
                <Title level={2} style={{ color: '#fff', margin: 0, fontSize: 40, fontWeight: 800 }}>{stat.value}</Title>
                <Text style={{ color: 'rgba(255,255,255,0.6)', fontSize: 14, textTransform: 'uppercase', letterSpacing: 1 }}>{stat.label}</Text>
              </Col>
            ))}
          </Row>
        </div>
      </section>

      {/* 💇 SERVICES PREVIEW */}
      <section style={{ padding: '100px 20px', background: '#faf8f5' }}>
        <div style={{ maxWidth: 1200, margin: '0 auto' }}>
          <SectionHeading title="Our Services" subtitle="Premium grooming experiences tailored to you" />
          <Row gutter={[24, 24]}>
            {servicesData.slice(0, 3).map((svc) => (
              <Col key={svc.id} xs={24} md={8}>
                <Card
                  hoverable
                  style={{ borderRadius: 16, overflow: 'hidden', border: 'none', boxShadow: '0 4px 20px rgba(0,0,0,0.06)', height: '100%' }}
                  cover={
                    <div style={{ height: 200, background: `url(${svc.image}) center/cover`, position: 'relative' }}>
                      <div style={{ position: 'absolute', top: 12, right: 12, background: gold, color: '#fff', padding: '4px 12px', borderRadius: 20, fontSize: 13, fontWeight: 600 }}>${svc.price}</div>
                    </div>
                  }
                >
                  <Title level={4} style={{ margin: '0 0 4px' }}>{svc.name}</Title>
                  <Space><ClockCircleOutlined style={{ color: '#999' }} /><Text style={{ color: '#999', fontSize: 13 }}>{svc.duration} min</Text></Space>
                  <div style={{ margin: '8px 0' }}><Rate disabled value={svc.rating} style={{ fontSize: 14 }} /></div>
                  <Paragraph style={{ color: '#666', fontSize: 14, margin: 0 }} ellipsis={{ rows: 2 }}>{svc.description}</Paragraph>
                </Card>
              </Col>
            ))}
          </Row>
          <div style={{ textAlign: 'center', marginTop: 40 }}>
            <Button type="link" onClick={() => router.push(`/${slug}/services`)} style={{ color: gold, fontSize: 16, fontWeight: 600 }}>
              View All Services &nbsp;<RightOutlined />
            </Button>
          </div>
        </div>
      </section>

      {/* 👥 TEAM PREVIEW */}
      <section style={{ padding: '100px 20px', background: '#fff' }}>
        <div style={{ maxWidth: 1200, margin: '0 auto' }}>
          <SectionHeading title="Meet Our Team" subtitle="Talented professionals dedicated to your beauty" />
          <Row gutter={[24, 24]}>
            {teamData.map((member) => (
              <Col key={member.id} xs={24} md={8}>
                <Card style={{ borderRadius: 16, textAlign: 'center', border: 'none', boxShadow: '0 4px 20px rgba(0,0,0,0.06)', height: '100%' }}>
                  <Avatar src={member.avatar} size={100} style={{ border: `3px solid ${gold}`, marginBottom: 16 }} />
                  <Title level={4} style={{ margin: 0 }}>{member.name}</Title>
                  <Text style={{ color: gold, fontWeight: 600, display: 'block', marginBottom: 8 }}>{member.role}</Text>
                  <Rate disabled value={member.rating} style={{ fontSize: 14 }} />
                  <Paragraph style={{ color: '#666', fontSize: 14, margin: '12px 0 0' }} ellipsis={{ rows: 2 }}>{member.bio}</Paragraph>
                </Card>
              </Col>
            ))}
          </Row>
          <div style={{ textAlign: 'center', marginTop: 40 }}>
            <Button type="link" onClick={() => router.push(`/${slug}/team`)} style={{ color: gold, fontSize: 16, fontWeight: 600 }}>
              View Full Team &nbsp;<RightOutlined />
            </Button>
          </div>
        </div>
      </section>

      {/* 💎 MEMBERSHIPS PREVIEW */}
      <section style={{ padding: '100px 20px', background: '#faf8f5' }}>
        <div style={{ maxWidth: 1200, margin: '0 auto' }}>
          <SectionHeading title="Memberships" subtitle="Exclusive perks for our loyal clients" />
          <Row gutter={[24, 24]} justify="center">
            {membershipsData.map((plan) => (
              <Col key={plan.id} xs={24} md={8}>
                <Card style={{ borderRadius: 16, textAlign: 'center', border: plan.name === 'Gold' ? `2px solid ${gold}` : '1px solid #eee', boxShadow: plan.name === 'Gold' ? '0 8px 30px rgba(212,168,83,0.2)' : '0 4px 20px rgba(0,0,0,0.06)', height: '100%', position: 'relative' }}>
                  {plan.name === 'Gold' && <Tag color={gold} style={{ position: 'absolute', top: 12, right: 12 }}>Popular</Tag>}
                  <Title level={3} style={{ color: '#1a1a2e', marginBottom: 4 }}>{plan.name}</Title>
                  <Title level={2} style={{ color: gold, margin: '8px 0' }}>${plan.price}<Text style={{ fontSize: 14, color: '#999' }}>/{plan.per}</Text></Title>
                  <Divider style={{ borderColor: '#eee' }} />
                  {plan.perks.map((perk, i) => (
                    <div key={i} style={{ marginBottom: 8 }}>
                      <CheckCircleOutlined style={{ color: gold, marginRight: 8 }} />
                      <Text>{perk}</Text>
                    </div>
                  ))}
                  <Button type="primary" onClick={() => router.push(`/${slug}/memberships`)} style={{ marginTop: 16, background: gold, borderColor: gold, color: '#1a1a2e', borderRadius: 30, fontWeight: 600 }}>
                    Join Now
                  </Button>
                </Card>
              </Col>
            ))}
          </Row>
        </div>
      </section>

      {/* 📝 TESTIMONIALS CAROUSEL */}
      <section style={{ padding: '100px 20px', background: '#1a1a2e' }}>
        <div style={{ maxWidth: 800, margin: '0 auto', textAlign: 'center' }}>
          <SectionHeading title="What Our Clients Say" />
          <div style={{ minHeight: 160, position: 'relative' }}>
            <div key={testimonialsData[testimonialIndex].id} style={{ animation: 'fadeInUp 0.5s ease' }}>
              <Rate disabled value={testimonialsData[testimonialIndex].rating} style={{ fontSize: 20, color: gold }} />
              <Paragraph style={{ color: 'rgba(255,255,255,0.85)', fontSize: 18, lineHeight: 1.8, fontStyle: 'italic', margin: '20px 0' }}>
                "{testimonialsData[testimonialIndex].text}"
              </Paragraph>
              <Text strong style={{ color: '#fff', fontSize: 16 }}>{testimonialsData[testimonialIndex].name}</Text>
              <br />
              <Text style={{ color: gold, fontSize: 14 }}>{testimonialsData[testimonialIndex].service}</Text>
            </div>
          </div>
          <Space style={{ marginTop: 24 }}>
            {testimonialsData.map((_, i) => (
              <div key={i} onClick={() => setTestimonialIndex(i)} style={{ width: 10, height: 10, borderRadius: '50%', background: i === testimonialIndex ? gold : 'rgba(255,255,255,0.3)', cursor: 'pointer', transition: 'all 0.3s' }} />
            ))}
          </Space>
          <div style={{ marginTop: 32 }}>
            <Button type="link" onClick={() => router.push(`/${slug}/testimonials`)} style={{ color: gold, fontSize: 16, fontWeight: 600 }}>
              Read All Reviews &nbsp;<RightOutlined />
            </Button>
          </div>
        </div>
      </section>

      {/* 🖼 GALLERY PREVIEW */}
      <section style={{ padding: '100px 20px', background: '#fff' }}>
        <div style={{ maxWidth: 1200, margin: '0 auto' }}>
          <SectionHeading title="Our Gallery" subtitle="A glimpse into our world of beauty" />
          <Row gutter={[12, 12]}>
            {galleryData.slice(0, 4).map((img) => (
              <Col key={img.id} xs={12} md={6}>
                <div style={{ borderRadius: 12, overflow: 'hidden', height: 250, background: `url(${img.src}) center/cover`, transition: 'transform 0.3s', cursor: 'pointer' }}
                  onMouseEnter={(e) => (e.currentTarget.style.transform = 'scale(1.05)')}
                  onMouseLeave={(e) => (e.currentTarget.style.transform = 'scale(1)')}
                />
              </Col>
            ))}
          </Row>
          <div style={{ textAlign: 'center', marginTop: 32 }}>
            <Button type="link" onClick={() => router.push(`/${slug}/gallery`)} style={{ color: gold, fontSize: 16, fontWeight: 600 }}>
              View Full Gallery &nbsp;<RightOutlined />
            </Button>
          </div>
        </div>
      </section>

      {/* ❓ FAQ */}
      <section style={{ padding: '100px 20px', background: '#faf8f5' }}>
        <div style={{ maxWidth: 800, margin: '0 auto' }}>
          <SectionHeading title="Frequently Asked Questions" />
          <Collapse bordered={false} style={{ background: 'transparent' }} expandIconPlacement="end"
            items={faqData.map((faq, i) => ({
              key: i,
              label: <Text strong style={{ fontSize: 16 }}>{faq.q}</Text>,
              children: <Paragraph style={{ color: '#666', fontSize: 15, margin: 0 }}>{faq.a}</Paragraph>,
              style: { marginBottom: 8, background: '#fff', borderRadius: 12, border: '1px solid #eee' },
            }))}
          />
        </div>
      </section>

      {/* 🎯 CTA BAND */}
      <section style={{ padding: '80px 20px', background: `linear-gradient(135deg, ${burgundy} 0%, #a02d52 100%)` }}>
        <div style={{ maxWidth: 800, margin: '0 auto', textAlign: 'center' }}>
          <Title level={2} style={{ color: '#fff', fontSize: 36, margin: 0 }}>Ready to Transform Your Look?</Title>
          <Text style={{ color: 'rgba(255,255,255,0.8)', fontSize: 18, display: 'block', margin: '16px 0 32px' }}>
            Book your appointment today and experience the difference.
          </Text>
          <Button type="primary" size="large" onClick={() => router.push(`/${slug}/book`)}
            style={{ height: 52, paddingInline: 40, fontSize: 16, fontWeight: 600, background: gold, borderColor: gold, color: '#1a1a2e', borderRadius: 30, boxShadow: '0 4px 20px rgba(212,168,83,0.4)' }}>
            Book Appointment
          </Button>
        </div>
      </section>

      {/* 🔵 QUICK BOOK FLOATING BUTTON */}
      <div style={{ position: 'fixed', bottom: 30, right: 30, zIndex: 999 }}>
        <Button type="primary" shape="circle" size="large" onClick={() => setQuickBookOpen(true)}
          style={{ width: 60, height: 60, background: gold, borderColor: gold, boxShadow: '0 4px 20px rgba(212,168,83,0.4)', animation: 'bounce 2s infinite' }}>
          <PlusOutlined style={{ fontSize: 24, color: '#1a1a2e' }} />
        </Button>
      </div>

      {/* 📋 QUICK BOOK MODAL */}
      <Modal title="Quick Appointment Request" open={quickBookOpen} onCancel={() => setQuickBookOpen(false)} onOk={handleQuickBook} okText="Send Request" okButtonProps={{ style: { background: gold, borderColor: gold, color: '#1a1a2e' } }}>
        <Form form={quickForm} layout="vertical" style={{ marginTop: 16 }}>
          <Form.Item name="name" label="Name" rules={[{ required: true }]}><Input placeholder="Your name" /></Form.Item>
          <Form.Item name="email" label="Email" rules={[{ required: true, type: 'email' }]}><Input placeholder="your@email.com" /></Form.Item>
          <Form.Item name="phone" label="Phone" rules={[{ required: true }]}><Input placeholder="Phone number" /></Form.Item>
          <Form.Item name="notes" label="Notes"><Input.TextArea rows={3} placeholder="Service preference, date, etc." /></Form.Item>
        </Form>
      </Modal>

      <style>{`
        @keyframes fadeInUp {
          0% { opacity: 0; transform: translateY(30px); }
          100% { opacity: 1; transform: translateY(0); }
        }
        @keyframes bounce {
          0%, 100% { transform: translateY(0); }
          50% { transform: translateY(-8px); }
        }
        .ant-card-hoverable:hover { transform: translateY(-4px); box-shadow: 0 12px 40px rgba(0,0,0,0.1) !important; }
      `}</style>
    </div>
  );
}

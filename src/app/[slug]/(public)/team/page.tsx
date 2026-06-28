'use client';

import React, { useEffect, useState } from 'react';
import { useParams, useRouter } from 'next/navigation';
import { Typography, Row, Col, Button, Spin, Alert, Rate, Tag, Avatar, Divider, Card, Space } from 'antd';
import { RightOutlined, TeamOutlined, StarFilled, TrophyOutlined, UserOutlined, HeartOutlined } from '@ant-design/icons';
import apiUtil from '../../../../utils/api';
import { ApiGetSalonBySlug } from '../../../../utils/api.constant';
import { eResultCode } from '../../../../utils/enum';

const { Title, Text, Paragraph } = Typography;
const gold = '#d4a853';
const burgundy = '#7C1D3E';

const teamData = [
  {
    id: 't1', name: 'Sophia Williams', role: 'Master Stylist', rating: 4.9,
    bio: 'With 15+ years of experience, Sophia specializes in precision cuts and creative coloring. Her artistic eye and meticulous attention to detail have made her one of the most sought-after stylists in the city.',
    specialties: ['Precision Cuts', 'Creative Color', 'Editorial Styling'],
    avatar: 'https://images.unsplash.com/photo-1580618672591-eb180b1a973f?w=300&h=300&fit=crop',
  },
  {
    id: 't2', name: 'James Rodriguez', role: 'Senior Colorist', rating: 4.8,
    bio: 'James is an award-winning colorist known for his innovative techniques and balayage mastery. He stays at the forefront of global color trends and brings fresh perspectives to every client.',
    specialties: ['Balayage', 'Ombre', 'Color Correction', ' fashion colors'],
    avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=300&h=300&fit=crop',
  },
  {
    id: 't3', name: 'Emily Chen', role: 'Lead Esthetician', rating: 4.7,
    bio: 'Emily brings holistic skincare expertise with training from top luxury spas worldwide. Her customized facials and treatments deliver visible, lasting results.',
    specialties: ['Custom Facials', 'Chemical Peels', 'Microdermabrasion', 'Waxing'],
    avatar: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=300&h=300&fit=crop',
  },
  {
    id: 't4', name: 'Marcus Johnson', role: 'Master Barber', rating: 4.9,
    bio: 'Marcus has been perfecting his craft for over a decade, specializing in precision fades, traditional hot towel shaves, and modern barbering techniques.',
    specialties: ['Fade Cuts', 'Beard Sculpting', 'Hot Towel Shave', 'Clipper Work'],
    avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=300&h=300&fit=crop',
  },
  {
    id: 't5', name: 'Olivia Martinez', role: 'Nail Artist', rating: 4.8,
    bio: 'Olivia is a creative nail artist who transforms fingertips into works of art. She specializes in intricate nail art, gel extensions, and luxury manicures.',
    specialties: ['Nail Art', 'Gel Extensions', 'Spa Manicure', '3D Design'],
    avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=300&h=300&fit=crop',
  },
  {
    id: 't6', name: 'David Kim', role: 'Massage Therapist', rating: 4.7,
    bio: 'David is a licensed massage therapist with expertise in deep tissue, sports massage, and aromatherapy. He helps clients find relief from tension and stress.',
    specialties: ['Deep Tissue', 'Sports Massage', 'Aromatherapy', 'Hot Stone'],
    avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=300&h=300&fit=crop',
  },
  {
    id: 't7', name: 'Amara Okafor', role: 'Makeup Artist', rating: 4.9,
    bio: 'Amara is a professional makeup artist with experience in bridal, editorial, and special effects makeup. Her ability to enhance natural beauty is unmatched.',
    specialties: ['Bridal Makeup', 'Airbrush', 'Editorial', 'Skincare Prep'],
    avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=300&h=300&fit=crop',
  },
  {
    id: 't8', name: 'Ryan Thompson', role: 'Stylist & Educator', rating: 4.8,
    bio: 'Ryan combines his passion for teaching with his love for styling. He leads our education program and specializes in transformative haircuts for all hair types.',
    specialties: ['Transformative Cuts', 'Texture Specialist', 'Education', 'Men\'s Grooming'],
    avatar: 'https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=300&h=300&fit=crop',
  },
];

export default function TeamPage() {
  const router = useRouter();
  const params = useParams();
  const slug = params?.slug as string;
  const [salon, setSalon] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

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

  if (loading) return <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', minHeight: '100vh' }}><Spin size="large" /></div>;
  if (error) return <div style={{ maxWidth: 1100, margin: '100px auto', padding: '0 16px' }}><Alert title={error} type="error" showIcon /></div>;
  if (!salon) return <div style={{ maxWidth: 1100, margin: '100px auto', padding: '0 16px' }}><Alert title="Salon not found" type="warning" showIcon /></div>;

  return (
    <div>
      {/* HERO */}
      <section style={{ padding: '120px 20px 80px', background: 'linear-gradient(135deg, #0a0a1a 0%, #1a1a3e 50%, #0d0d2b 100%)', textAlign: 'center' }}>
        <div style={{ maxWidth: 800, margin: '0 auto' }}>
          <Title style={{ color: '#fff', fontSize: 48, fontWeight: 800, margin: 0 }}>Meet Our Team</Title>
          <div style={{ width: 60, height: 3, background: gold, margin: '20px auto' }} />
          <Text style={{ color: 'rgba(255,255,255,0.8)', fontSize: 18, display: 'block' }}>
            Talented professionals dedicated to making you look and feel your absolute best
          </Text>
        </div>
      </section>

      {/* STATS BAR */}
      <section style={{ padding: '60px 20px', background: '#fff' }}>
        <div style={{ maxWidth: 1100, margin: '0 auto' }}>
          <Row gutter={[24, 24]} justify="center">
            {[
              { icon: <TeamOutlined />, value: '8', label: 'Team Members' },
              { icon: <StarFilled />, value: '4.8', label: 'Avg. Rating' },
              { icon: <TrophyOutlined />, value: '85+', label: 'Years Combined Exp.' },
              { icon: <HeartOutlined />, value: '15K+', label: 'Happy Clients' },
            ].map((stat, i) => (
              <Col key={i} xs={12} md={6} style={{ textAlign: 'center' }}>
                <div style={{ fontSize: 36, color: gold, marginBottom: 8 }}>{stat.icon}</div>
                <Title level={2} style={{ color: '#1a1a2e', margin: 0, fontSize: 36, fontWeight: 800 }}>{stat.value}</Title>
                <Text style={{ color: '#999', fontSize: 14, textTransform: 'uppercase', letterSpacing: 1 }}>{stat.label}</Text>
              </Col>
            ))}
          </Row>
        </div>
      </section>

      {/* TEAM GRID */}
      <section style={{ padding: '40px 20px 100px', background: '#faf8f5' }}>
        <div style={{ maxWidth: 1100, margin: '0 auto' }}>
          <Row gutter={[24, 24]}>
            {teamData.map((member) => (
              <Col key={member.id} xs={24} sm={12} md={6}>
                <Card
                  hoverable
                  style={{ borderRadius: 16, textAlign: 'center', border: 'none', boxShadow: '0 4px 20px rgba(0,0,0,0.06)', height: '100%', overflow: 'hidden' }}
                >
                  <div style={{ position: 'relative', marginBottom: 16 }}>
                    <Avatar src={member.avatar} size={100} style={{ border: `3px solid ${gold}`, boxShadow: '0 4px 14px rgba(0,0,0,0.15)' }} />
                  </div>
                  <Title level={5} style={{ margin: '0 0 2px' }}>{member.name}</Title>
                  <Text style={{ color: gold, fontWeight: 600, fontSize: 13, display: 'block', marginBottom: 8 }}>{member.role}</Text>
                  <Rate disabled value={member.rating} style={{ fontSize: 14, marginBottom: 8 }} />
                  <Paragraph style={{ color: '#666', fontSize: 13, margin: '0 0 12px', lineHeight: 1.6 }} ellipsis={{ rows: 3 }}>
                    {member.bio}
                  </Paragraph>
                  <div style={{ marginBottom: 16 }}>
                    {member.specialties.map((sp, i) => (
                      <Tag key={i} style={{ borderRadius: 12, fontSize: 11, margin: 2, border: 'none', background: '#f0e8e0', color: '#666' }}>{sp}</Tag>
                    ))}
                  </div>
                  <Button type="primary" block onClick={() => router.push(`/${slug}/book`)}
                    style={{ background: gold, borderColor: gold, color: '#1a1a2e', borderRadius: 30, fontWeight: 600 }}>
                    Book {member.name.split(' ')[0]}
                  </Button>
                </Card>
              </Col>
            ))}
          </Row>
        </div>
      </section>

      {/* CTA */}
      <section style={{ padding: '80px 20px', background: `linear-gradient(135deg, ${burgundy} 0%, #a02d52 100%)`, textAlign: 'center' }}>
        <div style={{ maxWidth: 600, margin: '0 auto' }}>
          <Title level={2} style={{ color: '#fff', margin: 0, fontSize: 32 }}>Work With Our Experts</Title>
          <Text style={{ color: 'rgba(255,255,255,0.8)', fontSize: 16, display: 'block', margin: '16px 0 32px' }}>
            Book an appointment with your preferred team member today.
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

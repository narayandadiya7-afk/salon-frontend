'use client';

import React, { useEffect, useState } from 'react';
import { useParams, useRouter } from 'next/navigation';
import { Typography, Row, Col, Button, Spin, Alert, Rate, Tag, Avatar, Divider, Card, Space } from 'antd';
import { RightOutlined, StarFilled, EnvironmentOutlined, PhoneOutlined, MailOutlined, TrophyOutlined, TeamOutlined, HeartOutlined, SafetyOutlined, ThunderboltOutlined, BulbOutlined, HolderOutlined } from '@ant-design/icons';
import apiUtil from '../../../../utils/api';
import { ApiGetSalonBySlug } from '../../../../utils/api.constant';
import { eResultCode } from '../../../../utils/enum';

const { Title, Text, Paragraph } = Typography;

const gold = '#d4a853';
const burgundy = '#7C1D3E';

const milestones = [
  { year: '2010', title: 'Our Beginning', desc: 'Founded with a vision to redefine salon experiences with a focus on quality and artistry.' },
  { year: '2013', title: 'Expansion', desc: 'Moved to a larger flagship location with state-of-the-art facilities and expanded our team.' },
  { year: '2016', title: 'Award Winners', desc: 'Recognized as "Best Salon" at the National Beauty Awards for excellence in service.' },
  { year: '2019', title: 'Innovation Hub', desc: 'Launched our training academy to nurture the next generation of beauty professionals.' },
  { year: '2023', title: 'Digital Transformation', desc: 'Introduced online booking, virtual consultations, and a premium membership program.' },
];

const values = [
  { icon: <StarFilled />, title: 'Excellence', desc: 'We pursue perfection in every service, using premium products and advanced techniques.' },
  { icon: <HeartOutlined />, title: 'Passion', desc: 'Our love for beauty drives us to continuously learn, innovate, and inspire.' },
  { icon: <TeamOutlined />, title: 'Teamwork', desc: 'Collaboration and mutual respect create an environment where creativity thrives.' },
  { icon: <SafetyOutlined />, title: 'Integrity', desc: 'Honesty, transparency, and ethical practices are the foundation of everything we do.' },
  { icon: <ThunderboltOutlined />, title: 'Innovation', desc: 'We embrace new trends, technologies, and techniques to stay ahead of the curve.' },
  { icon: <HolderOutlined />, title: 'Inclusivity', desc: 'Everyone is welcome. We celebrate diversity and tailor experiences for all.' },
];

const teamData = [
  { id: 't1', name: 'Sophia Williams', role: 'Master Stylist', avatar: 'https://images.unsplash.com/photo-1580618672591-eb180b1a973f?w=200&h=200&fit=crop', rating: 4.9 },
  { id: 't2', name: 'James Rodriguez', role: 'Senior Colorist', avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=200&h=200&fit=crop', rating: 4.8 },
  { id: 't3', name: 'Emily Chen', role: 'Esthetician', avatar: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=200&h=200&fit=crop', rating: 4.7 },
  { id: 't4', name: 'Marcus Johnson', role: 'Barber Specialist', avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=200&h=200&fit=crop', rating: 4.9 },
];

const awards = [
  'Best Luxury Salon — National Beauty Awards 2023',
  'Excellence in Customer Service — Salon Today 2022',
  'Top Color Studio — Hair Magazine 2021',
  'Innovator of the Year — Beauty Industry Awards 2020',
  'Best Salon Design — Interior Design Awards 2019',
];

export default function AboutPage() {
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
          <Title style={{ color: '#fff', fontSize: 48, fontWeight: 800, margin: 0 }}>{salon?.name || 'About Us'}</Title>
          <div style={{ width: 60, height: 3, background: gold, margin: '20px auto' }} />
          <Text style={{ color: 'rgba(255,255,255,0.8)', fontSize: 18, display: 'block', lineHeight: 1.6 }}>
            {salon?.tagline || 'Discover the story behind our passion for beauty and excellence.'}
          </Text>
        </div>
      </section>

      {/* OUR STORY */}
      <section style={{ padding: '100px 20px', background: '#fff' }}>
        <div style={{ maxWidth: 1100, margin: '0 auto' }}>
          <Row gutter={[60, 40]} align="middle">
            <Col xs={24} md={6}>
              <div style={{ background: `linear-gradient(135deg, ${burgundy}, ${gold})`, borderRadius: 16, padding: 32, color: '#fff', textAlign: 'center' }}>
                <Title level={3} style={{ color: '#fff', margin: 0 }}>Our Story</Title>
                <div style={{ width: 40, height: 2, background: 'rgba(255,255,255,0.5)', margin: '12px auto' }} />
                <Text style={{ color: 'rgba(255,255,255,0.9)', fontSize: 14 }}>Since 2010</Text>
              </div>
            </Col>
            <Col xs={24} md={18}>
              <Paragraph style={{ color: '#666', fontSize: 16, lineHeight: 1.9, margin: 0 }}>
                Founded in 2010, our salon was born from a simple belief: everyone deserves to look and feel their absolute best. What started as a intimate two-chair studio has blossomed into a premier destination for beauty and wellness.
              </Paragraph>
              <Paragraph style={{ color: '#666', fontSize: 16, lineHeight: 1.9, marginTop: 16 }}>
                Over the years, we've cultivated a team of extraordinary talent, invested in cutting-edge techniques, and built a space where creativity and hospitality converge. Every service we deliver is a reflection of our commitment to artistry, integrity, and genuine care.
              </Paragraph>
              <Paragraph style={{ color: '#666', fontSize: 16, lineHeight: 1.9, marginTop: 16 }}>
                Today, we're proud to serve thousands of loyal guests who trust us with their beauty journey — and we're just getting started.
              </Paragraph>
            </Col>
          </Row>
        </div>
      </section>

      {/* MISSION & VISION */}
      <section style={{ padding: '80px 20px', background: '#faf8f5' }}>
        <div style={{ maxWidth: 1100, margin: '0 auto' }}>
          <Row gutter={[32, 32]}>
            <Col xs={24} md={12}>
              <Card style={{ borderRadius: 16, height: '100%', border: 'none', boxShadow: '0 4px 20px rgba(0,0,0,0.06)' }}>
                <Title level={3} style={{ color: burgundy }}>Our Mission</Title>
                <Paragraph style={{ color: '#666', fontSize: 15, lineHeight: 1.8 }}>
                  To empower every guest with confidence through exceptional beauty services in a warm, inclusive environment. We strive to exceed expectations with every visit.
                </Paragraph>
              </Card>
            </Col>
            <Col xs={24} md={12}>
              <Card style={{ borderRadius: 16, height: '100%', border: 'none', boxShadow: '0 4px 20px rgba(0,0,0,0.06)' }}>
                <Title level={3} style={{ color: gold }}>Our Vision</Title>
                <Paragraph style={{ color: '#666', fontSize: 15, lineHeight: 1.8 }}>
                  To be the most trusted and celebrated salon brand, setting the standard for beauty excellence while fostering a community where talent flourishes and guests feel at home.
                </Paragraph>
              </Card>
            </Col>
          </Row>
        </div>
      </section>

      {/* CORE VALUES */}
      <section style={{ padding: '100px 20px', background: '#fff' }}>
        <div style={{ maxWidth: 1100, margin: '0 auto' }}>
          <div style={{ textAlign: 'center', marginBottom: 48 }}>
            <Divider style={{ borderColor: gold, width: 60, minWidth: 60, margin: '0 auto 16px', borderWidth: 2 }} />
            <Title level={2} style={{ color: '#1a1a2e', margin: 0, fontSize: 36, fontWeight: 700 }}>Core Values</Title>
            <Text style={{ color: '#666', fontSize: 16, marginTop: 8, display: 'block' }}>The principles that guide everything we do</Text>
          </div>
          <Row gutter={[24, 24]}>
            {values.map((v, i) => (
              <Col key={i} xs={24} sm={12} md={8}>
                <Card hoverable style={{ borderRadius: 16, textAlign: 'center', height: '100%', border: '1px solid #f0f0f0', boxShadow: '0 2px 12px rgba(0,0,0,0.04)' }}>
                  <div style={{ fontSize: 40, color: gold, marginBottom: 16 }}>{v.icon}</div>
                  <Title level={4} style={{ margin: '0 0 8px' }}>{v.title}</Title>
                  <Paragraph style={{ color: '#666', fontSize: 14, margin: 0 }}>{v.desc}</Paragraph>
                </Card>
              </Col>
            ))}
          </Row>
        </div>
      </section>

      {/* MILESTONES TIMELINE */}
      <section style={{ padding: '100px 20px', background: '#faf8f5' }}>
        <div style={{ maxWidth: 900, margin: '0 auto' }}>
          <div style={{ textAlign: 'center', marginBottom: 48 }}>
            <Divider style={{ borderColor: gold, width: 60, minWidth: 60, margin: '0 auto 16px', borderWidth: 2 }} />
            <Title level={2} style={{ color: '#1a1a2e', margin: 0, fontSize: 36, fontWeight: 700 }}>Our Journey</Title>
            <Text style={{ color: '#666', fontSize: 16, marginTop: 8, display: 'block' }}>Milestones that shaped who we are</Text>
          </div>
          {milestones.map((m, i) => (
            <div key={i} style={{ display: 'flex', gap: 24, marginBottom: 32, position: 'relative', paddingLeft: 40 }}>
              <div style={{ position: 'absolute', left: 0, top: 0, bottom: 0, width: 2, background: i === milestones.length - 1 ? 'transparent' : gold }} />
              <div style={{ position: 'absolute', left: -6, top: 4, width: 14, height: 14, borderRadius: '50%', background: gold, border: '3px solid #faf8f5' }} />
              <div style={{ minWidth: 80 }}>
                <Text style={{ color: gold, fontSize: 20, fontWeight: 800 }}>{m.year}</Text>
              </div>
              <div>
                <Title level={4} style={{ margin: 0 }}>{m.title}</Title>
                <Paragraph style={{ color: '#666', margin: '4px 0 0' }}>{m.desc}</Paragraph>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* TEAM */}
      <section style={{ padding: '100px 20px', background: '#fff' }}>
        <div style={{ maxWidth: 1100, margin: '0 auto' }}>
          <div style={{ textAlign: 'center', marginBottom: 48 }}>
            <Divider style={{ borderColor: gold, width: 60, minWidth: 60, margin: '0 auto 16px', borderWidth: 2 }} />
            <Title level={2} style={{ color: '#1a1a2e', margin: 0, fontSize: 36, fontWeight: 700 }}>Our Team</Title>
            <Text style={{ color: '#666', fontSize: 16, marginTop: 8, display: 'block' }}>The talented people behind every transformation</Text>
          </div>
          <Row gutter={[24, 24]}>
            {teamData.map((member) => (
              <Col key={member.id} xs={24} sm={12} md={6}>
                <Card hoverable style={{ borderRadius: 16, textAlign: 'center', border: 'none', boxShadow: '0 4px 20px rgba(0,0,0,0.06)' }}>
                  <Avatar src={member.avatar} size={90} style={{ border: `3px solid ${gold}`, marginBottom: 12 }} />
                  <Title level={5} style={{ margin: 0 }}>{member.name}</Title>
                  <Text style={{ color: gold, fontWeight: 600, display: 'block', marginBottom: 6 }}>{member.role}</Text>
                  <Rate disabled value={member.rating} style={{ fontSize: 13 }} />
                </Card>
              </Col>
            ))}
          </Row>
          <div style={{ textAlign: 'center', marginTop: 32 }}>
            <Button type="link" onClick={() => router.push(`/${slug}/team`)} style={{ color: gold, fontSize: 16, fontWeight: 600 }}>
              View Full Team &nbsp;<RightOutlined />
            </Button>
          </div>
        </div>
      </section>

      {/* AWARDS */}
      <section style={{ padding: '80px 20px', background: '#1a1a2e' }}>
        <div style={{ maxWidth: 900, margin: '0 auto' }}>
          <div style={{ textAlign: 'center', marginBottom: 48 }}>
            <Divider style={{ borderColor: gold, width: 60, minWidth: 60, margin: '0 auto 16px', borderWidth: 2 }} />
            <Title level={2} style={{ color: '#fff', margin: 0, fontSize: 36, fontWeight: 700 }}>Awards & Recognition</Title>
          </div>
          <Row gutter={[16, 16]}>
            {awards.map((award, i) => (
              <Col key={i} xs={24} sm={12}>
                <div style={{ display: 'flex', alignItems: 'center', gap: 12, background: 'rgba(255,255,255,0.05)', padding: '16px 20px', borderRadius: 12 }}>
                  <TrophyOutlined style={{ color: gold, fontSize: 24 }} />
                  <Text style={{ color: 'rgba(255,255,255,0.85)', fontSize: 15 }}>{award}</Text>
                </div>
              </Col>
            ))}
          </Row>
        </div>
      </section>

      {/* CTA */}
      <section style={{ padding: '80px 20px', background: `linear-gradient(135deg, ${burgundy} 0%, #a02d52 100%)`, textAlign: 'center' }}>
        <div style={{ maxWidth: 600, margin: '0 auto' }}>
          <Title level={2} style={{ color: '#fff', margin: 0, fontSize: 32 }}>Experience the Difference</Title>
          <Text style={{ color: 'rgba(255,255,255,0.8)', fontSize: 16, display: 'block', margin: '16px 0 32px' }}>
            Book your appointment and discover why our clients trust us with their beauty.
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

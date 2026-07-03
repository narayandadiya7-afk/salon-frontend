'use client';

import React, { useEffect, useState } from 'react';
import { useParams } from 'next/navigation';
import Link from 'next/link';
import { Typography, Row, Col, Button, Spin, Alert, Tag, Input } from 'antd';
import apiUtil from '../../../../../utils/api';
import { ApiGetSalonBySlug } from '../../../../../utils/api.constant';
import { eResultCode } from '../../../../../utils/enum';

const { Title, Paragraph, Text } = Typography;
const { Search } = Input;

const GOLD = '#d4a853';
const BURGUNDY = '#7C1D3E';

const categories = ['All', 'Hair Care', 'Skincare', 'Nail Art', 'Bridal', 'Wellness'];

const featuredPost = {
  title: '10 Essential Hair Care Tips for Healthy, Shiny Hair This Season',
  excerpt: 'Discover the secrets to maintaining luscious, healthy hair throughout the changing seasons. Our expert stylists share their top professional tips.',
  date: 'June 15, 2026', author: 'Priya Sharma', readTime: '5 min read',
  cat: 'Hair Care', gradient: 'linear-gradient(135deg, #7C1D3E, #d4a853)',
};

const posts = [
  { title: 'The Ultimate Guide to Bridal Makeup in 2026', excerpt: 'From trending styles to timeless classics, everything you need to know for your big day.', date: 'June 10, 2026', cat: 'Bridal', readTime: '4 min read' },
  { title: 'Winter Skincare Routine: Keep Your Skin Glowing', excerpt: 'Combat dry winter air with these essential skincare steps recommended by our estheticians.', date: 'June 5, 2026', cat: 'Skincare', readTime: '6 min read' },
  { title: 'Nail Art Trends That Are Taking Over Salons', excerpt: 'From minimalist designs to bold patterns, discover the hottest nail art trends.', date: 'May 28, 2026', cat: 'Nail Art', readTime: '3 min read' },
  { title: 'Benefits of Regular Scalp Treatments', excerpt: 'A healthy scalp is the foundation of beautiful hair. Learn why regular treatments matter.', date: 'May 20, 2026', cat: 'Hair Care', readTime: '4 min read' },
  { title: '5 Reasons to Try Our Signature Facial', excerpt: 'Experience the difference that premium ingredients and expert techniques can make.', date: 'May 12, 2026', cat: 'Skincare', readTime: '3 min read' },
  { title: 'Managing Stress Through Spa Therapy', excerpt: 'How regular spa visits can improve your mental and physical well-being.', date: 'May 5, 2026', cat: 'Wellness', readTime: '5 min read' },
  { title: 'Choosing the Perfect Hair Color for Your Skin Tone', excerpt: 'Our colorists guide you through finding the shade that complements you best.', date: 'April 28, 2026', cat: 'Hair Care', readTime: '7 min read' },
  { title: 'Pre-Wedding Skincare Timeline', excerpt: 'Follow this timeline to ensure radiant, flawless skin on your wedding day.', date: 'April 20, 2026', cat: 'Bridal', readTime: '6 min read' },
];

export default function BlogPage() {
  const { slug } = useParams() as { slug: string };
  const [salon, setSalon] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [activeCat, setActiveCat] = useState('All');
  const [search, setSearch] = useState('');

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

  const filtered = posts.filter(p => {
    const catMatch = activeCat === 'All' || p.cat === activeCat;
    const searchMatch = !search || p.title.toLowerCase().includes(search.toLowerCase()) || p.excerpt.toLowerCase().includes(search.toLowerCase());
    return catMatch && searchMatch;
  });

  return (
    <div>
      {/* Hero */}
      <div style={{
        background: `linear-gradient(135deg, ${BURGUNDY} 0%, #4a0d25 50%, ${GOLD} 100%)`,
        padding: '80px 16px', textAlign: 'center',
      }}>
        <Title style={{ color: '#fff', fontSize: 48, margin: 0, fontWeight: 700 }}>Our Blog</Title>
        <Paragraph style={{ color: 'rgba(255,255,255,0.85)', fontSize: 18, maxWidth: 600, margin: '16px auto 0' }}>
          Style tips, beauty trends, and expert advice straight from our salon professionals.
        </Paragraph>
      </div>

      <div style={{ maxWidth: 1200, margin: '0 auto', padding: '60px 16px' }}>
        {/* Featured Article */}
        <div style={{
          borderRadius: 16, overflow: 'hidden', marginBottom: 48, 
          boxShadow: '0 8px 32px rgba(0,0,0,0.12)',
          transition: 'transform 0.3s, box-shadow 0.3s',
        }}
          onMouseEnter={e => { e.currentTarget.style.transform = 'translateY(-4px)'; e.currentTarget.style.boxShadow = '0 12px 40px rgba(212,168,83,0.25)'; }}
          onMouseLeave={e => { e.currentTarget.style.transform = 'translateY(0)'; e.currentTarget.style.boxShadow = '0 8px 32px rgba(0,0,0,0.12)'; }}
        >
          <div style={{
            height: 240, background: featuredPost.gradient,
            display: 'flex', alignItems: 'flex-end', padding: 32,
          }}>
            <Tag style={{ background: GOLD, color: '#fff', border: 'none', borderRadius: 4, fontSize: 12 }}>FEATURED</Tag>
          </div>
          <div style={{ padding: 32, background: '#fff' }}>
            <Title level={2} style={{ color: BURGUNDY, margin: 0 }}>{featuredPost.title}</Title>
            <div style={{ display: 'flex', gap: 16, color: '#888', fontSize: 13, margin: '8px 0 12px' }}>
              <span>{featuredPost.date}</span>
              <span>•</span>
              <span>{featuredPost.author}</span>
              <span>•</span>
              <span>{featuredPost.readTime}</span>
            </div>
            <Paragraph style={{ color: '#555', fontSize: 15, lineHeight: 1.7 }}>{featuredPost.excerpt}</Paragraph>
            <Button type="primary" style={{
              background: BURGUNDY, border: 'none', borderRadius: 6, fontWeight: 600,
            }}>
              Read Full Article
            </Button>
          </div>
        </div>

        {/* Search & Filter */}
        <div style={{ marginBottom: 32 }}>
          <Search
            placeholder="Search articles..."
            onChange={e => setSearch(e.target.value)}
            style={{ maxWidth: 400, marginBottom: 16 }}
            size="large"
          />
          <Row gutter={[12, 12]}>
            {categories.map(cat => (
              <Col key={cat}>
                <Tag
                  onClick={() => setActiveCat(cat)}
                  style={{
                    padding: '8px 24px', fontSize: 14, borderRadius: 24, cursor: 'pointer',
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
        </div>

        {/* Blog Cards Grid */}
        <Row gutter={[24, 24]}>
          {filtered.map((post, i) => (
            <Col xs={24} md={12} lg={6} key={i}>
              <div style={{
                background: '#fff', borderRadius: 12, overflow: 'hidden', height: '100%',
                boxShadow: '0 2px 12px rgba(0,0,0,0.06)', border: '1px solid rgba(212,168,83,0.1)',
                display: 'flex', flexDirection: 'column',
                transition: 'transform 0.3s, box-shadow 0.3s',
              }}
                onMouseEnter={e => { e.currentTarget.style.transform = 'translateY(-4px)'; e.currentTarget.style.boxShadow = '0 8px 24px rgba(212,168,83,0.2)'; }}
                onMouseLeave={e => { e.currentTarget.style.transform = 'translateY(0)'; e.currentTarget.style.boxShadow = '0 2px 12px rgba(0,0,0,0.06)'; }}
              >
                <div style={{
                  height: 160,
                  background: `linear-gradient(135deg, ${i % 2 === 0 ? BURGUNDY : GOLD}, ${i % 2 === 0 ? GOLD : BURGUNDY})`,
                  display: 'flex', alignItems: 'center', justifyContent: 'center',
                }}>
                  <Tag style={{ background: 'rgba(255,255,255,0.2)', color: '#fff', border: 'none', borderRadius: 4, fontSize: 11 }}>
                    {post.cat}
                  </Tag>
                </div>
                <div style={{ padding: 20, flex: 1, display: 'flex', flexDirection: 'column' }}>
                  <Title level={5} style={{ color: BURGUNDY, margin: 0, fontSize: 16, lineHeight: 1.4 }}>{post.title}</Title>
                  <Paragraph style={{ color: '#666', fontSize: 13, margin: '8px 0', flex: 1, lineHeight: 1.6 }} ellipsis={{ rows: 3 }}>
                    {post.excerpt}
                  </Paragraph>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', paddingTop: 12, borderTop: '1px solid rgba(0,0,0,0.04)' }}>
                    <span style={{ color: '#888', fontSize: 12 }}>{post.date} · {post.readTime}</span>
                    <span style={{ color: GOLD, fontSize: 13, fontWeight: 600, cursor: 'pointer' }}>Read More →</span>
                  </div>
                </div>
              </div>
            </Col>
          ))}
        </Row>

        {filtered.length === 0 && (
          <div style={{ textAlign: 'center', padding: 40, color: '#888' }}>
            No articles found matching your criteria.
          </div>
        )}
      </div>

      {/* Newsletter CTA */}
      <div style={{
        background: `linear-gradient(135deg, ${BURGUNDY}, ${GOLD})`,
        textAlign: 'center', padding: '60px 16px',
      }}>
        <Title level={2} style={{ color: '#fff', margin: 0 }}>Stay Inspired</Title>
        <Paragraph style={{ color: 'rgba(255,255,255,0.85)', fontSize: 16, margin: '12px 0 24px' }}>
          Subscribe to our newsletter for the latest beauty tips, trends, and exclusive offers.
        </Paragraph>
        <div style={{ display: 'flex', justifyContent: 'center', gap: 12, flexWrap: 'wrap' }}>
          <Input placeholder="Enter your email" size="large" style={{ maxWidth: 360, borderRadius: 6 }} />
          <Button type="primary" size="large" style={{
            height: 40, padding: '0 32px', fontSize: 15, fontWeight: 600,
            background: '#fff', color: BURGUNDY, border: 'none', borderRadius: 6,
          }}>
            Subscribe
          </Button>
        </div>
      </div>
    </div>
  );
}

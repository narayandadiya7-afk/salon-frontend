'use client';

import React, { useEffect, useState } from 'react';
import { useParams } from 'next/navigation';
import { Row, Col, Card, Tag, Typography, Button, Space, Avatar, Divider, Spin, Alert } from 'antd';
import {
  InfoCircleOutlined, EnvironmentOutlined, PhoneOutlined, MailOutlined,
  CalendarOutlined, StarOutlined, TeamOutlined, CrownOutlined,
  ClockCircleOutlined, SafetyOutlined, ScissorOutlined,
} from '@ant-design/icons';
import OwnerLayout from '../../../../components/layout/OwnerLayout';
import apiUtil from '../../../../utils/api';
import { ApiGetSalonBySlug } from '../../../../utils/api.constant';
import { eResultCode } from '../../../../utils/enum';

const { Text } = Typography;

interface Salon {
  id: string;
  name: string;
  slug: string;
  description?: string;
  address?: string;
  city?: string;
  state?: string;
  phone?: string;
  email?: string;
  owner?: { name: string; email: string };
}

const highlights = [
  { icon: <StarOutlined />, label: '4.9 Rating', sub: '158 verified reviews', color: '#C9953F' },
  { icon: <TeamOutlined />, label: '8 Team Members', sub: 'Expert professionals', color: '#7C1D3E' },
  { icon: <CalendarOutlined />, label: '5+ Years', sub: 'Serving the community', color: '#7C1D3E' },
  { icon: <SafetyOutlined />, label: 'Premium Products', sub: 'Top beauty brands', color: '#7C1D3E' },
];

function AboutContent() {
  const params = useParams();
  const slug = params?.slug as string;

  const [salon, setSalon] = useState<Salon | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!slug) return;
    fetchSalon();
  }, [slug]);

  const fetchSalon = async () => {
    try {
      setLoading(true);
      const response = await apiUtil.get(ApiGetSalonBySlug(slug));
      const returnCode = response?.dataResponse?.returnCode;
      if (returnCode === eResultCode.SUCCESS || returnCode === eResultCode.CREATED) {
        setSalon(response.data);
      } else {
        setError(response?.dataResponse?.description || 'Salon not found');
      }
    } catch {
      setError('Failed to load salon');
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', minHeight: '60vh' }}>
        <Spin size="large" />
      </div>
    );
  }

  if (error) {
    return (
      <div style={{ maxWidth: 600, margin: '80px auto', padding: '0 24px' }}>
        <Alert type="error" title="Error" description={error} showIcon />
      </div>
    );
  }

  return (
    <div>
      <div className="page-header-row">
        <div>
          <h1 className="page-header-title">About {salon?.name || 'Salon'}</h1>
          <p className="page-header-subtitle">Salon overview, contact details, and highlights</p>
        </div>
        <Button icon={<InfoCircleOutlined />} style={{ borderRadius: 10, border: '1px solid var(--theme-border)' }}>
          View Public Page
        </Button>
      </div>

      <Row gutter={[20, 20]} style={{ marginBottom: 24 }}>
        {highlights.map((h, i) => (
          <Col xs={12} sm={6} key={i}>
            <div className="stat-widget" style={{ borderTop: `3px solid ${h.color}` }}>
              <div className="stat-widget-header">
                <div className="stat-widget-icon" style={{ background: `${h.color}12`, color: h.color }}>
                  {h.icon}
                </div>
              </div>
              <div className="stat-widget-label">{h.label}</div>
              <div className="stat-widget-value" style={{ fontSize: 13, fontWeight: 400, color: 'var(--theme-text-secondary)' }}>
                {h.sub}
              </div>
            </div>
          </Col>
        ))}
      </Row>

      <Row gutter={[20, 20]}>
        <Col xs={24} lg={16}>
          <Card className="premium-card" bodyStyle={{ padding: 24 }}>
            <Space size={14} style={{ marginBottom: 20 }}>
              <div style={{
                width: 48, height: 48, borderRadius: 14,
                background: 'linear-gradient(135deg, #7C1D3E, #C9953F)',
                display: 'flex', alignItems: 'center', justifyContent: 'center',
                color: '#fff', fontSize: 20, flexShrink: 0,
              }}>
                <ScissorOutlined />
              </div>
              <div>
                <Text strong style={{ fontSize: 20, display: 'block' }}>{salon?.name || 'Salon'}</Text>
                <Tag style={{ borderRadius: 6, margin: '2px 0 0', fontSize: 10, fontWeight: 600, border: 'none', background: 'rgba(124,29,62,0.08)', color: '#7C1D3E' }}>
                  Verified
                </Tag>
              </div>
            </Space>

            {salon?.description && (
              <>
                <Text style={{ fontSize: 13, color: 'var(--theme-text-secondary)', lineHeight: 1.8, display: 'block' }}>
                  {salon.description}
                </Text>
                <Divider style={{ margin: '20px 0' }} />
              </>
            )}

            <Text strong style={{ fontSize: 14, display: 'block', marginBottom: 14 }}>Contact Information</Text>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
              {salon?.phone && (
                <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
                  <div style={{ width: 32, height: 32, borderRadius: 8, background: 'rgba(201,149,63,0.08)', color: '#C9953F', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
                    <PhoneOutlined />
                  </div>
                  <div>
                    <Text style={{ fontSize: 11, color: 'var(--theme-text-tertiary)', display: 'block' }}>Phone</Text>
                    <Text style={{ fontSize: 13 }}>{salon.phone}</Text>
                  </div>
                </div>
              )}
              {salon?.email && (
                <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
                  <div style={{ width: 32, height: 32, borderRadius: 8, background: 'rgba(201,149,63,0.08)', color: '#C9953F', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
                    <MailOutlined />
                  </div>
                  <div>
                    <Text style={{ fontSize: 11, color: 'var(--theme-text-tertiary)', display: 'block' }}>Email</Text>
                    <Text style={{ fontSize: 13 }}>{salon.email}</Text>
                  </div>
                </div>
              )}
              {(salon?.address || salon?.city) && (
                <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
                  <div style={{ width: 32, height: 32, borderRadius: 8, background: 'rgba(124,29,62,0.08)', color: '#7C1D3E', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
                    <EnvironmentOutlined />
                  </div>
                  <div>
                    <Text style={{ fontSize: 11, color: 'var(--theme-text-tertiary)', display: 'block' }}>Location</Text>
                    <Text style={{ fontSize: 13 }}>
                      {salon?.address}{salon?.city ? `, ${salon.city}` : ''}{salon?.state ? `, ${salon.state}` : ''}
                    </Text>
                  </div>
                </div>
              )}
            </div>
          </Card>
        </Col>

        <Col xs={24} lg={8}>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
            {salon?.owner && (
              <Card className="premium-card" bodyStyle={{ padding: 20 }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: 12, marginBottom: 12 }}>
                  <Avatar size={44} style={{ background: 'linear-gradient(135deg, #7C1D3E, #C9953F)', borderRadius: 12, fontSize: 18, fontWeight: 600 }}>
                    {salon.owner.name.charAt(0)}
                  </Avatar>
                  <div>
                    <Text strong style={{ fontSize: 14 }}>Salon Owner</Text>
                    <div style={{ fontSize: 13, color: 'var(--theme-text-secondary)' }}>{salon.owner.name}</div>
                    <div style={{ fontSize: 11, color: 'var(--theme-text-tertiary)' }}>{salon.owner.email}</div>
                  </div>
                </div>
              </Card>
            )}

            <Card className="premium-card" bodyStyle={{ padding: 20 }}>
              <Space size={10} style={{ marginBottom: 12 }}>
                <CrownOutlined style={{ color: '#C9953F', fontSize: 16 }} />
                <Text strong style={{ fontSize: 14 }}>Business Details</Text>
              </Space>
              <Divider style={{ margin: '0 0 12px' }} />
              <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                  <Text style={{ fontSize: 12, color: 'var(--theme-text-secondary)' }}>Established</Text>
                  <Text strong style={{ fontSize: 13 }}>2018</Text>
                </div>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                  <Text style={{ fontSize: 12, color: 'var(--theme-text-secondary)' }}>Staff Size</Text>
                  <Text strong style={{ fontSize: 13 }}>8</Text>
                </div>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                  <Text style={{ fontSize: 12, color: 'var(--theme-text-secondary)' }}>Total Customers</Text>
                  <Text strong style={{ fontSize: 13, color: '#7C1D3E' }}>1,284+</Text>
                </div>
              </div>
            </Card>
          </div>
        </Col>
      </Row>
    </div>
  );
}

export default function AboutPage() {
  return (
    <OwnerLayout>
      <AboutContent />
    </OwnerLayout>
  );
}

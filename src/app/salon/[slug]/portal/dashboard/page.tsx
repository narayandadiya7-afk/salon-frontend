'use client';

import React, { useEffect, useState } from 'react';
import { useParams, useRouter } from 'next/navigation';
import { Card, Row, Col, Typography, Button, Statistic, Spin, Alert } from 'antd';
import {
  CalendarOutlined,
  TeamOutlined,
  ScissorOutlined,
  SettingOutlined,
  LogoutOutlined,
} from '@ant-design/icons';
import Utils from '../../../../../utils';
import AuthUtil from '../../../../../utils/auth';

const { Title, Text } = Typography;

export default function PortalDashboard() {
  const params = useParams();
  const router = useRouter();
  const slug = params?.slug as string;
  const [authenticated, setAuthenticated] = useState(false);
  const [checking, setChecking] = useState(true);

  useEffect(() => {
    const decoded = Utils.decodeToken();
    const role = decoded?.role;
    if (role === 'SALON_OWNER' || role === 'SALON_STAFF' || role === 'ADMIN' || role === 'SUPER_ADMIN') {
      setAuthenticated(true);
    }
    setChecking(false);
  }, []);

  const handleLogout = () => {
    AuthUtil.logout();
  };

  if (checking) {
    return (
      <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', minHeight: '60vh' }}>
        <Spin size="large" />
      </div>
    );
  }

  if (!authenticated) {
    return (
      <div style={{ maxWidth: 400, margin: '80px auto', padding: '0 16px' }}>
        <Alert
          type="warning"
          message="Access Denied"
          description="Please log in to access the portal."
          showIcon
          action={<Button onClick={() => router.push(`/salon/${slug}/portal/login`)}>Login</Button>}
        />
      </div>
    );
  }

  return (
    <div style={{ maxWidth: 1000, margin: '40px auto', padding: '0 24px' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 32 }}>
        <div>
          <Title level={3} style={{ margin: 0 }}>Salon Portal</Title>
          <Text type="secondary">Manage your salon from here</Text>
        </div>
        <Button icon={<LogoutOutlined />} onClick={handleLogout}>Logout</Button>
      </div>

      <Row gutter={[16, 16]} style={{ marginBottom: 32 }}>
        <Col xs={12} sm={6}>
          <Card hoverable onClick={() => router.push(`/salon/${slug}`)}>
            <Statistic title="View Website" value="Live" prefix={<ScissorOutlined />} />
          </Card>
        </Col>
        <Col xs={12} sm={6}>
          <Card hoverable onClick={() => router.push(`/owner/dashboard`)}>
            <Statistic title="Full Dashboard" value="Open" prefix={<SettingOutlined />} />
          </Card>
        </Col>
        <Col xs={12} sm={6}>
          <Card hoverable onClick={() => router.push(`/salon/${slug}/book`)}>
            <Statistic title="Bookings" value="Manage" prefix={<CalendarOutlined />} />
          </Card>
        </Col>
        <Col xs={12} sm={6}>
          <Card hoverable onClick={() => router.push(`/salon/${slug}/team`)}>
            <Statistic title="Staff" value="View" prefix={<TeamOutlined />} />
          </Card>
        </Col>
      </Row>

      <Card title="Quick Links">
        <Row gutter={[16, 16]}>
          <Col span={12}>
            <Button type="link" block style={{ textAlign: 'left' }} onClick={() => router.push(`/owner/dashboard`)}>
              Go to Owner Dashboard →
            </Button>
          </Col>
          <Col span={12}>
            <Button type="link" block style={{ textAlign: 'left' }} onClick={() => router.push(`/salon/${slug}`)}>
              View Public Salon Page →
            </Button>
          </Col>
        </Row>
      </Card>
    </div>
  );
}

'use client';

import React, { useState } from 'react';
import { Row, Col, Card, Typography, Space, Slider, Switch, Tag } from 'antd';
import {
  FlagOutlined, BookOutlined, DollarOutlined, BarChartOutlined,
  ApiOutlined, AppstoreOutlined, SettingOutlined,
} from '@ant-design/icons';
import ToggleCard from '../../../../components/super-admin/ToggleCard';
import DataTable from '../../../../components/super-admin/DataTable';
import StatusBadge from '../../../../components/super-admin/StatusBadge';
import './FeatureFlags.css';

const { Text, Title } = Typography;

const features = [
  { key: 'online-booking', title: 'Online Booking', description: 'Allow tenants to accept online bookings through the booking widget', category: 'Booking', enabled: true, enabledCount: 1120, totalCount: 1247, color: '#3b82f6', icon: <BookOutlined /> },
  { key: 'payment-processing', title: 'Payment Processing', description: 'Enable in-platform payment collection via Stripe/Razorpay', category: 'Payments', enabled: true, enabledCount: 890, totalCount: 1247, color: '#10b981', icon: <DollarOutlined /> },
  { key: 'marketing-tools', title: 'Marketing Tools', description: 'Email campaigns, SMS notifications, and promo code engine', category: 'Marketing', enabled: true, enabledCount: 654, totalCount: 1247, color: '#d4a853', icon: <BarChartOutlined /> },
  { key: 'advanced-analytics', title: 'Advanced Analytics', description: 'In-depth business intelligence with custom reports and dashboards', category: 'Analytics', enabled: false, enabledCount: 342, totalCount: 1247, color: '#8b5cf6', icon: <BarChartOutlined /> },
  { key: 'api-access', title: 'API Access', description: 'REST API access for third-party integrations and custom development', category: 'Integrations', enabled: true, enabledCount: 218, totalCount: 1247, color: '#f43f5e', icon: <ApiOutlined /> },
  { key: 'custom-domain', title: 'Custom Domain', description: 'Allow tenants to use their own domain name for their salon page', category: 'Customization', enabled: true, enabledCount: 186, totalCount: 1247, color: '#14b8a6', icon: <AppstoreOutlined /> },
  { key: 'inventory-management', title: 'Inventory Management', description: 'Track product inventory, stock levels, and supplier management', category: 'Booking', enabled: false, enabledCount: 145, totalCount: 1247, color: '#f59e0b', icon: <SettingOutlined /> },
  { key: 'loyalty-program', title: 'Loyalty Program', description: 'Points-based loyalty system with rewards and referral bonuses', category: 'Marketing', enabled: false, enabledCount: 98, totalCount: 1247, color: '#ec4899', icon: <FlagOutlined /> },
];

const tenantOverrides = [
  { key: '1', tenant: 'Bloom Beauty Spa', feature: 'Advanced Analytics', status: 'enabled' as const },
  { key: '2', tenant: 'The Barbershop Co.', feature: 'Custom Domain', status: 'enabled' as const },
  { key: '3', tenant: 'Luxury Nails', feature: 'Inventory Management', status: 'disabled' as const },
  { key: '4', tenant: 'Elite Styles', feature: 'API Access', status: 'enabled' as const },
  { key: '5', tenant: 'Divine Cuts', feature: 'Loyalty Program', status: 'disabled' as const },
];

const overrideColumns = [
  { title: 'Tenant', dataIndex: 'tenant', key: 'tenant' },
  { title: 'Feature', dataIndex: 'feature', key: 'feature' },
  { title: 'Status', dataIndex: 'status', key: 'status', render: (s: string) => <StatusBadge status={s} /> },
];

export default function FeatureFlagsPage() {
  const [rollout, setRollout] = useState(80);

  return (
    <div className="super-page">
      <div className="super-page-header">
        <div>
          <Title level={4} className="super-page-title">
            <FlagOutlined className="super-page-icon" /> Feature Flags
          </Title>
          <Text type="secondary">Manage platform-wide features and per-tenant overrides</Text>
        </div>
      </div>

      {/* Global Rollout */}
      <Card className="super-page-card" variant="borderless" style={{ marginBottom: 16 }}>
        <div className="rollout-section">
          <div className="rollout-header">
            <Space>
              <FlagOutlined style={{ color: '#d4a853' }} />
              <Text strong style={{ color: 'var(--theme-text)' }}>Global Rollout Percentage</Text>
            </Space>
            <Tag color="gold" style={{ fontSize: 13, fontWeight: 600 }}>{rollout}%</Tag>
          </div>
          <Slider
            value={rollout}
            onChange={setRollout}
            min={0}
            max={100}
            marks={{ 0: '0%', 25: '25%', 50: '50%', 75: '75%', 100: '100%' }}
            tooltip={{ open: true }}
            className="rollout-slider"
          />
          <Text type="secondary" style={{ fontSize: 12 }}>
            New features are rolled out to {rollout}% of tenants gradually
          </Text>
        </div>
      </Card>

      {/* Feature Toggle Cards */}
      <Row gutter={[16, 16]} style={{ marginBottom: 16 }}>
        {features.map((f) => (
          <Col xs={24} sm={12} lg={8} key={f.key}>
            <ToggleCard
              title={f.title}
              description={f.description}
              category={f.category}
              enabled={f.enabled}
              enabledCount={f.enabledCount}
              totalCount={f.totalCount}
              color={f.color}
            />
          </Col>
        ))}
      </Row>

      {/* Tenant-Level Overrides */}
      <Card className="super-page-card" variant="borderless" title={<span className="card-title">Tenant-Level Overrides</span>}>
        <DataTable columns={overrideColumns} dataSource={tenantOverrides} pagination={false} />
      </Card>
    </div>
  );
}

'use client';

import React, { useState } from 'react';
import { Row, Col, Card, Typography, Space, Button, Tag, Drawer, Descriptions, Switch } from 'antd';
import {
  BuildOutlined, PlusOutlined, DownloadOutlined, UserOutlined,
  GlobalOutlined, TeamOutlined, DollarOutlined, StopOutlined,
  CheckCircleOutlined, DeleteOutlined, EyeOutlined,
} from '@ant-design/icons';
import DataTable from '../../../../components/super-admin/DataTable';
import FilterBar from '../../../../components/super-admin/FilterBar';
import StatusBadge from '../../../../components/super-admin/StatusBadge';
import StatCard from '../../../../components/super-admin/StatCard';
import ProfileDrawer, { TenantOverview, SubscriptionDetails, TenantQuickStats } from '../../../../components/super-admin/ProfileDrawer';
import './Tenants.css';

const { Text, Title } = Typography;

const tenantsData = [
  { key: '1', name: 'Bloom Beauty Spa', domain: 'bloombeauty.com', plan: 'Growth', status: 'active' as const, created: '2026-01-15', revenue: '$5,988' },
  { key: '2', name: 'Glamour Studio', domain: 'glamour.studio', plan: 'Growth', status: 'active' as const, created: '2026-02-03', revenue: '$5,988' },
  { key: '3', name: 'Luxury Nails', domain: 'luxurynails.com', plan: 'Professional', status: 'active' as const, created: '2026-02-20', revenue: '$11,976' },
  { key: '4', name: 'Elite Styles', domain: 'elitestyles.co', plan: 'Starter', status: 'suspended' as const, created: '2026-03-10', revenue: '$594' },
  { key: '5', name: 'Serenity Day Spa', domain: 'serenityspa.com', plan: 'Trial', status: 'trial' as const, created: '2026-06-01', revenue: '$0' },
  { key: '6', name: 'QuickCuts Salon', domain: 'quickcuts.com', plan: 'Growth', status: 'suspended' as const, created: '2026-03-22', revenue: '$2,394' },
  { key: '7', name: 'The Barbershop Co.', domain: 'barbershop.co', plan: 'Enterprise', status: 'active' as const, created: '2026-04-05', revenue: '$19,980' },
  { key: '8', name: 'Nail Artistry', domain: 'nailartistry.com', plan: 'Starter', status: 'active' as const, created: '2026-04-18', revenue: '$594' },
  { key: '9', name: 'Style Studio', domain: 'stylestudio.com', plan: 'Growth', status: 'active' as const, created: '2026-05-01', revenue: '$4,192' },
  { key: '10', name: 'Divine Cuts', domain: 'divinecuts.com', plan: 'Professional', status: 'active' as const, created: '2026-05-15', revenue: '$8,982' },
  { key: '11', name: 'Golden Touch Spa', domain: 'goldentouch.com', plan: 'Enterprise', status: 'trial' as const, created: '2026-06-10', revenue: '$0' },
  { key: '12', name: 'Prestige Barber', domain: 'prestigebarber.com', plan: 'Growth', status: 'active' as const, created: '2026-05-28', revenue: '$2,990' },
];

const columns = [
  { title: 'Tenant Name', dataIndex: 'name', key: 'name' },
  { title: 'Domain', dataIndex: 'domain', key: 'domain' },
  {
    title: 'Plan', dataIndex: 'plan', key: 'plan',
    render: (p: string) => <Tag>{p}</Tag>,
  },
  {
    title: 'Status', dataIndex: 'status', key: 'status',
    render: (s: string) => <StatusBadge status={s} />,
  },
  { title: 'Created', dataIndex: 'created', key: 'created' },
  { title: 'Revenue', dataIndex: 'revenue', key: 'revenue' },
  {
    title: 'Actions', key: 'actions', width: 120,
    render: () => (
      <Space size={4}>
        <Button type="link" size="small" icon={<EyeOutlined />} className="super-action-btn" />
        <Button type="link" size="small" icon={<StopOutlined />} className="super-action-btn" danger />
      </Space>
    ),
  },
];

export default function TenantsPage() {
  const [drawerOpen, setDrawerOpen] = useState(false);
  const [selectedTenant, setSelectedTenant] = useState<any>(null);

  const showDrawer = (tenant: any) => {
    setSelectedTenant(tenant);
    setDrawerOpen(true);
  };

  return (
    <div className="super-page">
      <div className="super-page-header">
        <div>
          <Title level={4} className="super-page-title">
            <BuildOutlined className="super-page-icon" /> Tenant Management
          </Title>
          <Text type="secondary">Manage all salon tenants across the platform</Text>
        </div>
        <Space>
          <Button icon={<DownloadOutlined />}>Export</Button>
          <Button type="primary" icon={<PlusOutlined />} style={{ background: '#d4a853', borderColor: '#d4a853' }}>
            Add Tenant
          </Button>
        </Space>
      </div>

      <Row gutter={[16, 16]} style={{ marginBottom: 16 }}>
        <Col xs={12} sm={6} lg={3}>
          <StatCard label="Total Tenants" value="1,247" icon={<BuildOutlined />} color="#3b82f6" />
        </Col>
        <Col xs={12} sm={6} lg={3}>
          <StatCard label="Active" value="1,024" icon={<CheckCircleOutlined />} color="#10b981" />
        </Col>
        <Col xs={12} sm={6} lg={3}>
          <StatCard label="Suspended" value="86" icon={<StopOutlined />} color="#ef4444" />
        </Col>
        <Col xs={12} sm={6} lg={3}>
          <StatCard label="Trial" value="137" icon={<TeamOutlined />} color="#f59e0b" />
        </Col>
        <Col xs={12} sm={6} lg={3}>
          <StatCard label="Total Revenue" value="$847K" icon={<DollarOutlined />} color="#d4a853" />
        </Col>
      </Row>

      <Card className="super-page-card" variant="borderless">
        <FilterBar
          searchPlaceholder="Search tenants..."
          statusOptions={[
            { label: 'Active', value: 'active' },
            { label: 'Suspended', value: 'suspended' },
            { label: 'Trial', value: 'trial' },
          ]}
          planOptions={[
            { label: 'Starter', value: 'Starter' },
            { label: 'Growth', value: 'Growth' },
            { label: 'Professional', value: 'Professional' },
            { label: 'Enterprise', value: 'Enterprise' },
          ]}
        />
        <DataTable
          columns={columns}
          dataSource={tenantsData}
          pagination={{ pageSize: 10, showSizeChanger: true }}
          onRow={(record) => ({
            style: { cursor: 'pointer' },
            onClick: () => showDrawer(record),
          })}
        />
      </Card>

      <ProfileDrawer
        open={drawerOpen}
        onClose={() => setDrawerOpen(false)}
        title={selectedTenant?.name || 'Tenant Profile'}
        tabs={selectedTenant ? [
          {
            key: 'overview',
            label: 'Overview',
            content: (
              <>
                <TenantOverview
                  name={selectedTenant.name}
                  domain={selectedTenant.domain}
                  created={selectedTenant.created}
                  status={selectedTenant.status === 'active' ? 'Active' : 'Suspended'}
                />
                <div style={{ marginTop: 16 }}>
                  <Text strong style={{ color: 'var(--theme-text)' }}>Quick Stats</Text>
                  <div style={{ marginTop: 8 }}>
                    <TenantQuickStats users={24} bookings={156} revenue={selectedTenant.revenue} />
                  </div>
                </div>
              </>
            ),
          },
          {
            key: 'subscription',
            label: 'Subscription',
            content: (
              <SubscriptionDetails
                plan={selectedTenant.plan}
                cycle="Monthly"
                nextBilling="2026-07-15"
                amount={selectedTenant.revenue}
              />
            ),
          },
          {
            key: 'actions',
            label: 'Actions',
            content: (
              <Space direction="vertical" size={12} style={{ width: '100%' }}>
                <Button block icon={<CheckCircleOutlined />}>Activate Tenant</Button>
                <Button block icon={<StopOutlined />} danger>Suspend Tenant</Button>
                <Button block icon={<UserOutlined />}>Impersonate</Button>
                <Button block icon={<DeleteOutlined />} danger>Delete Tenant</Button>
              </Space>
            ),
          },
        ] : undefined}
      />
    </div>
  );
}

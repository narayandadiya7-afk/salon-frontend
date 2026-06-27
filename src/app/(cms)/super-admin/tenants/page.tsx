'use client';

import React, { useState } from 'react';
import { Row, Col, Card, Typography, Space, Button, Tag, Drawer, Descriptions, Divider, Timeline as AntTimeline } from 'antd';
import {
  BuildOutlined, PlusOutlined, DownloadOutlined, UserOutlined,
  GlobalOutlined, TeamOutlined, DollarOutlined, StopOutlined,
  CheckCircleOutlined, DeleteOutlined, EyeOutlined,
  MailOutlined, PhoneOutlined, CalendarOutlined,
  EditOutlined, KeyOutlined, SwapOutlined,
} from '@ant-design/icons';
import DataTable from '../../../../components/super-admin/DataTable';
import FilterBar from '../../../../components/super-admin/FilterBar';
import StatusBadge from '../../../../components/super-admin/StatusBadge';
import StatCard from '../../../../components/super-admin/StatCard';
import './Tenants.css';

const { Text, Title } = Typography;

const tenantsData = [
  { key: '1', name: 'Bloom Beauty Spa', domain: 'bloombeauty.com', owner: 'Emma Bloom', email: 'emma@bloombeauty.com', plan: 'Growth', status: 'active' as const, users: 8, created: '2026-01-15', revenue: '$5,988', lastLogin: '2 min ago' },
  { key: '2', name: 'Glamour Studio', domain: 'glamour.studio', owner: 'Sarah Glam', email: 'sarah@glamour.studio', plan: 'Growth', status: 'active' as const, users: 6, created: '2026-02-03', revenue: '$5,988', lastLogin: '15 min ago' },
  { key: '3', name: 'Luxury Nails', domain: 'luxurynails.com', owner: 'James Lux', email: 'james@luxurynails.com', plan: 'Professional', status: 'active' as const, users: 12, created: '2026-02-20', revenue: '$11,976', lastLogin: '1 hour ago' },
  { key: '4', name: 'Elite Styles', domain: 'elitestyles.co', owner: 'Mike Elite', email: 'mike@elitestyles.co', plan: 'Starter', status: 'suspended' as const, users: 3, created: '2026-03-10', revenue: '$594', lastLogin: '2 days ago' },
  { key: '5', name: 'Serenity Day Spa', domain: 'serenityspa.com', owner: 'Lisa Calm', email: 'lisa@serenityspa.com', plan: 'Trial', status: 'trial' as const, users: 5, created: '2026-06-01', revenue: '$0', lastLogin: '5 min ago' },
  { key: '6', name: 'QuickCuts Salon', domain: 'quickcuts.com', owner: 'Tom Quick', email: 'tom@quickcuts.com', plan: 'Growth', status: 'suspended' as const, users: 4, created: '2026-03-22', revenue: '$2,394', lastLogin: '3 days ago' },
  { key: '7', name: 'The Barbershop Co.', domain: 'barbershop.co', owner: 'Alex Barber', email: 'alex@barbershop.co', plan: 'Enterprise', status: 'active' as const, users: 20, created: '2026-04-05', revenue: '$19,980', lastLogin: '10 min ago' },
  { key: '8', name: 'Nail Artistry', domain: 'nailartistry.com', owner: 'Nina Art', email: 'nina@nailartistry.com', plan: 'Starter', status: 'active' as const, users: 3, created: '2026-04-18', revenue: '$594', lastLogin: '1 day ago' },
  { key: '9', name: 'Style Studio', domain: 'stylestudio.com', owner: 'Chris Style', email: 'chris@stylestudio.com', plan: 'Growth', status: 'active' as const, users: 7, created: '2026-05-01', revenue: '$4,192', lastLogin: '3 hours ago' },
  { key: '10', name: 'Divine Cuts', domain: 'divinecuts.com', owner: 'Divine D.', email: 'divine@divinecuts.com', plan: 'Professional', status: 'active' as const, users: 10, created: '2026-05-15', revenue: '$8,982', lastLogin: '30 min ago' },
  { key: '11', name: 'Golden Touch Spa', domain: 'goldentouch.com', owner: 'Grace Gold', email: 'grace@goldentouch.com', plan: 'Enterprise', status: 'trial' as const, users: 15, created: '2026-06-10', revenue: '$0', lastLogin: '1 hour ago' },
  { key: '12', name: 'Prestige Barber', domain: 'prestigebarber.com', owner: 'Paul Prestige', email: 'paul@prestigebarber.com', plan: 'Growth', status: 'active' as const, users: 5, created: '2026-05-28', revenue: '$2,990', lastLogin: '2 hours ago' },
];

const tenantTimeline = [
  { time: '2 min ago', title: 'Subscription renewed', description: 'Growth plan renewed — $299', type: 'success' as const },
  { time: '1 day ago', title: 'Staff member added', description: 'Jessica Davis joined as stylist', type: 'info' as const },
  { time: '3 days ago', title: 'Payment received', description: 'Monthly subscription payment of $299', type: 'success' as const },
  { time: '1 week ago', title: 'Service updated', description: '5 new services added to catalog', type: 'info' as const },
  { time: '2 weeks ago', title: 'Tenant created', description: 'Account setup completed', type: 'info' as const },
];

const columns = [
  { title: 'Salon Name', dataIndex: 'name', key: 'name', render: (n: string) => <Text strong>{n}</Text> },
  { title: 'Owner', dataIndex: 'owner', key: 'owner' },
  { title: 'Plan', dataIndex: 'plan', key: 'plan', render: (p: string) => <Tag>{p}</Tag> },
  { title: 'Status', dataIndex: 'status', key: 'status', render: (s: string) => <StatusBadge status={s} /> },
  { title: 'Users', dataIndex: 'users', key: 'users', render: (u: number) => <Tag>{u}</Tag> },
  { title: 'Revenue', dataIndex: 'revenue', key: 'revenue' },
  { title: 'Last Login', dataIndex: 'lastLogin', key: 'lastLogin' },
  { title: 'Actions', key: 'actions', width: 120,
    render: () => (
      <Space size={4}>
        <Button type="link" size="small" icon={<EyeOutlined />} className="super-action-btn" />
        <Button type="link" size="small" icon={<EditOutlined />} className="super-action-btn" />
        <Button type="link" size="small" icon={<StopOutlined />} className="super-action-btn" danger />
      </Space>
    ),
  },
];

export default function TenantsPage() {
  const [drawerOpen, setDrawerOpen] = useState(false);
  const [selectedTenant, setSelectedTenant] = useState<any>(null);

  const showDrawer = (tenant: any) => { setSelectedTenant(tenant); setDrawerOpen(true); };

  return (
    <div className="super-page">
      <div className="super-page-header">
        <div>
          <Title level={4} className="super-page-title"><BuildOutlined className="super-page-icon" /> Tenant Management</Title>
          <Text type="secondary">Manage all salon tenants across the platform</Text>
        </div>
        <Space>
          <Button icon={<DownloadOutlined />}>Export</Button>
          <Button type="primary" icon={<PlusOutlined />} style={{ background: '#d4a853', borderColor: '#d4a853' }}>Add Tenant</Button>
        </Space>
      </div>

      <Row gutter={[16, 16]} style={{ marginBottom: 16 }}>
        <Col xs={12} sm={6} lg={3}><StatCard label="Total Tenants" value="1,247" icon={<BuildOutlined />} color="#3b82f6" /></Col>
        <Col xs={12} sm={6} lg={3}><StatCard label="Active" value="1,024" icon={<CheckCircleOutlined />} color="#10b981" /></Col>
        <Col xs={12} sm={6} lg={3}><StatCard label="Suspended" value="86" icon={<StopOutlined />} color="#ef4444" /></Col>
        <Col xs={12} sm={6} lg={3}><StatCard label="Trial" value="137" icon={<TeamOutlined />} color="#f59e0b" /></Col>
        <Col xs={12} sm={6} lg={3}><StatCard label="Total Revenue" value="$847K" icon={<DollarOutlined />} color="#d4a853" /></Col>
      </Row>

      <Card className="super-page-card" variant="borderless">
        <FilterBar
          searchPlaceholder="Search tenants..."
          statusOptions={[
            { label: 'All Status', value: 'all' },
            { label: 'Active', value: 'active' },
            { label: 'Suspended', value: 'suspended' },
            { label: 'Trial', value: 'trial' },
            { label: 'Expired', value: 'expired' },
          ]}
          planOptions={[
            { label: 'All Plans', value: 'all' },
            { label: 'Starter', value: 'starter' },
            { label: 'Growth', value: 'growth' },
            { label: 'Professional', value: 'professional' },
            { label: 'Enterprise', value: 'enterprise' },
            { label: 'Trial', value: 'trial' },
          ]}
        />
        <DataTable
          columns={columns}
          dataSource={tenantsData}
          pagination={{ pageSize: 10, showSizeChanger: true, showTotal: (t: number) => `Total ${t} tenants` }}
          onRow={(record) => ({ style: { cursor: 'pointer' }, onClick: () => showDrawer(record) })}
        />
      </Card>

      <Drawer
        title={selectedTenant?.name || 'Tenant Profile'}
        placement="right"
        open={drawerOpen}
        onClose={() => setDrawerOpen(false)}
        width={520}
        styles={{ body: { padding: 24 } }}
        extra={
          <Space>
            <Button type="primary" size="small" style={{ background: '#d4a853', borderColor: '#d4a853' }} icon={<EditOutlined />}>Edit</Button>
          </Space>
        }
      >
        {selectedTenant && (
          <div className="tenant-drawer-content">
            <div className="tenant-drawer-header">
              <div className="tenant-drawer-avatar">
                {selectedTenant.name.charAt(0)}
              </div>
              <div>
                <Text strong style={{ fontSize: 18, display: 'block' }}>{selectedTenant.name}</Text>
                <Space>
                  <StatusBadge status={selectedTenant.status} />
                  <Tag>{selectedTenant.plan}</Tag>
                </Space>
              </div>
            </div>

            <Divider />

            <Descriptions column={2} size="small" bordered>
              <Descriptions.Item label="Owner">{selectedTenant.owner}</Descriptions.Item>
              <Descriptions.Item label="Email">{selectedTenant.email}</Descriptions.Item>
              <Descriptions.Item label="Domain">{selectedTenant.domain}</Descriptions.Item>
              <Descriptions.Item label="Plan">{selectedTenant.plan}</Descriptions.Item>
              <Descriptions.Item label="Users"><Tag>{selectedTenant.users} staff</Tag></Descriptions.Item>
              <Descriptions.Item label="Revenue">{selectedTenant.revenue}</Descriptions.Item>
              <Descriptions.Item label="Created">{selectedTenant.created}</Descriptions.Item>
              <Descriptions.Item label="Last Login">{selectedTenant.lastLogin}</Descriptions.Item>
            </Descriptions>

            <Divider />

            <Text strong style={{ display: 'block', marginBottom: 12 }}>Activity Timeline</Text>
            <AntTimeline
              items={tenantTimeline.map((e) => ({
                color: e.type === 'success' ? '#10b981' : e.type === 'info' ? '#3b82f6' : '#6b7280',
                children: (
                  <div>
                    <Text strong style={{ fontSize: 12 }}>{e.title}</Text>
                    <Text type="secondary" style={{ fontSize: 11, display: 'block' }}>{e.description}</Text>
                    <Text type="secondary" style={{ fontSize: 10 }}>{e.time}</Text>
                  </div>
                ),
              }))}
            />

            <Divider />

            <Text strong style={{ display: 'block', marginBottom: 12 }}>Actions</Text>
            <Space direction="vertical" size={10} style={{ width: '100%' }}>
              <Button block icon={<CheckCircleOutlined />}>Activate Tenant</Button>
              <Button block icon={<StopOutlined />} danger>Suspend Tenant</Button>
              <Button block icon={<SwapOutlined />}>Upgrade Plan</Button>
              <Button block icon={<KeyOutlined />}>Reset Password</Button>
              <Button block icon={<UserOutlined />}>Impersonate (Secure Access)</Button>
              <Button block icon={<DeleteOutlined />} danger>Delete Tenant</Button>
            </Space>
          </div>
        )}
      </Drawer>
    </div>
  );
}

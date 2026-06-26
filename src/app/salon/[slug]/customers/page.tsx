'use client';

import React, { useState } from 'react';
import { useParams } from 'next/navigation';
import {
  Row, Col, Card, Tag, Typography, Button, Space, Avatar, Input,
  Table, Progress, Tabs, Modal, Statistic, Divider, Rate, Tooltip, Badge,
} from 'antd';
import {
  UserOutlined, PlusOutlined, SearchOutlined, FilterOutlined,
  MoreOutlined, StarOutlined, GiftOutlined, MailOutlined,
  PhoneOutlined, CalendarOutlined, RightOutlined,
  WalletOutlined, RiseOutlined, CrownOutlined,
  TeamOutlined, DownloadOutlined, MessageOutlined,
  HeartOutlined, GoldOutlined,
} from '@ant-design/icons';
import OwnerLayout from '../../../../components/layout/OwnerLayout';

const { Text } = Typography;

const customers = [
  { id: 'C001', name: 'Sarah Johnson', email: 'sarah.j@email.com', phone: '+91 98765 43210', visits: 24, totalSpent: 72000, lastVisit: '2024-01-15', segment: 'vip', birthday: '15 Mar', notes: 'Prefers morning appointments. Allergic to certain fragrances.', avatar: 'SJ', color: '#8B5CF6', points: 2400, tier: 'Gold' },
  { id: 'C002', name: 'Priya Sharma', email: 'priya.s@email.com', phone: '+91 98765 43211', visits: 18, totalSpent: 54000, lastVisit: '2024-01-14', segment: 'regular', birthday: '22 Jul', notes: 'Likes the same stylist every time.', avatar: 'PS', color: '#EC4899', points: 1800, tier: 'Silver' },
  { id: 'C003', name: 'Amrita Singh', email: 'amrita.s@email.com', phone: '+91 98765 43212', visits: 32, totalSpent: 96000, lastVisit: '2024-01-15', segment: 'vip', birthday: '5 Jan', notes: 'VIP client. Prefers weekend slots.', avatar: 'AS', color: '#3B82F6', points: 3200, tier: 'Platinum' },
  { id: 'C004', name: 'Neha Gupta', email: 'neha.g@email.com', phone: '+91 98765 43213', visits: 6, totalSpent: 18000, lastVisit: '2024-01-10', segment: 'new', birthday: '12 Sep', notes: 'New customer. Introduced by Priya.', avatar: 'NG', color: '#F59E0B', points: 600, tier: 'Bronze' },
  { id: 'C005', name: 'Ritu Patel', email: 'ritu.p@email.com', phone: '+91 98765 43214', visits: 15, totalSpent: 45000, lastVisit: '2024-01-13', segment: 'regular', birthday: '3 Nov', notes: 'Loyal customer. Books monthly facials.', avatar: 'RP', color: '#10B981', points: 1500, tier: 'Silver' },
  { id: 'C006', name: 'Deepa Verma', email: 'deepa.v@email.com', phone: '+91 98765 43215', visits: 2, totalSpent: 7000, lastVisit: '2024-01-08', segment: 'new', birthday: '28 Feb', notes: 'Came for bridal trial. Potential wedding booking.', avatar: 'DV', color: '#8B5CF6', points: 200, tier: 'Bronze' },
  { id: 'C007', name: 'Kavita Reddy', email: 'kavita.r@email.com', phone: '+91 98765 43216', visits: 42, totalSpent: 126000, lastVisit: '2024-01-12', segment: 'vip', birthday: '19 Aug', notes: 'Highest spender. Books family packages.', avatar: 'KR', color: '#EC4899', points: 4200, tier: 'Platinum' },
  { id: 'C008', name: 'Meera Nair', email: 'meera.n@email.com', phone: '+91 98765 43217', visits: 9, totalSpent: 27000, lastVisit: '2024-01-09', segment: 'regular', birthday: '7 Jun', notes: '', avatar: 'MN', color: '#3B82F6', points: 900, tier: 'Silver' },
];

const segmentColors: Record<string, string> = { vip: '#8B5CF6', regular: '#3B82F6', new: '#10B981' };
const tierColors: Record<string, string> = { Platinum: '#8B5CF6', Gold: '#F59E0B', Silver: '#6B7280', Bronze: '#B45309' };
const segments = [
  { key: 'all', label: 'All Customers', count: 1284 },
  { key: 'vip', label: 'VIP', count: 86 },
  { key: 'regular', label: 'Regular', count: 542 },
  { key: 'new', label: 'New', count: 656 },
  { key: 'at-risk', label: 'At Risk', count: 124 },
];

function CustomerProfileModal({ customer, open, onClose }: { customer: typeof customers[0] | null; open: boolean; onClose: () => void }) {
  if (!customer) return null;
  return (
    <Modal
      title={null}
      open={open}
      onCancel={onClose}
      footer={null}
      width={600}
      styles={{ body: { padding: 0 } }}
    >
      <div style={{
        background: 'linear-gradient(135deg, #8B5CF6, #EC4899)',
        padding: '32px 24px', textAlign: 'center', position: 'relative', overflow: 'hidden',
      }}>
        <div style={{ position: 'absolute', top: -40, right: -40, width: 200, height: 200, borderRadius: '50%', background: 'rgba(255,255,255,0.05)' }} />
        <div style={{ position: 'absolute', bottom: -60, left: -60, width: 300, height: 300, borderRadius: '50%', background: 'rgba(255,255,255,0.03)' }} />
        <Avatar size={64} style={{ background: 'rgba(255,255,255,0.2)', fontSize: 24, fontWeight: 600, border: '3px solid rgba(255,255,255,0.4)' }}>
          {customer.avatar}
        </Avatar>
        <div style={{ marginTop: 12 }}>
          <Text strong style={{ fontSize: 20, color: '#fff' }}>{customer.name}</Text>
          <div style={{ display: 'flex', justifyContent: 'center', gap: 8, marginTop: 4 }}>
            <Tag style={{ borderRadius: 12, border: '1px solid rgba(255,255,255,0.3)', background: 'rgba(255,255,255,0.1)', color: '#fff', fontSize: 11 }}>{customer.tier} Member</Tag>
            <Tag style={{ borderRadius: 12, border: '1px solid rgba(255,255,255,0.3)', background: 'rgba(255,255,255,0.1)', color: '#fff', fontSize: 11 }}>{customer.segment.toUpperCase()}</Tag>
          </div>
        </div>
      </div>
      <div style={{ padding: 24 }}>
        <Row gutter={[16, 16]}>
          <Col span={8}>
            <div style={{ textAlign: 'center', padding: '12px 0', background: 'var(--theme-hover)', borderRadius: 12 }}>
              <Text style={{ fontSize: 11, color: 'var(--theme-text-secondary)' }}>Total Visits</Text>
              <div style={{ fontSize: 24, fontWeight: 700, color: '#8B5CF6' }}>{customer.visits}</div>
            </div>
          </Col>
          <Col span={8}>
            <div style={{ textAlign: 'center', padding: '12px 0', background: 'var(--theme-hover)', borderRadius: 12 }}>
              <Text style={{ fontSize: 11, color: 'var(--theme-text-secondary)' }}>Total Spent</Text>
              <div style={{ fontSize: 24, fontWeight: 700, color: '#10B981' }}>₹{customer.totalSpent.toLocaleString()}</div>
            </div>
          </Col>
          <Col span={8}>
            <div style={{ textAlign: 'center', padding: '12px 0', background: 'var(--theme-hover)', borderRadius: 12 }}>
              <Text style={{ fontSize: 11, color: 'var(--theme-text-secondary)' }}>Loyalty Points</Text>
              <div style={{ fontSize: 24, fontWeight: 700, color: '#F59E0B' }}>{customer.points}</div>
            </div>
          </Col>
        </Row>
        <Divider style={{ margin: '16px 0' }} />
        <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
            <MailOutlined style={{ color: 'var(--theme-text-secondary)', width: 16 }} />
            <Text style={{ fontSize: 13 }}>{customer.email}</Text>
          </div>
          <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
            <PhoneOutlined style={{ color: 'var(--theme-text-secondary)', width: 16 }} />
            <Text style={{ fontSize: 13 }}>{customer.phone}</Text>
          </div>
          <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
            <CalendarOutlined style={{ color: 'var(--theme-text-secondary)', width: 16 }} />
            <Text style={{ fontSize: 13 }}>Birthday: {customer.birthday}</Text>
          </div>
          <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
            <HeartOutlined style={{ color: 'var(--theme-text-secondary)', width: 16 }} />
            <Text style={{ fontSize: 13 }}>Last Visit: {customer.lastVisit}</Text>
          </div>
        </div>
        {customer.notes && (
          <>
            <Divider style={{ margin: '16px 0' }} />
            <div>
              <Text style={{ fontSize: 12, color: 'var(--theme-text-secondary)', display: 'block', marginBottom: 4 }}>Notes</Text>
              <Text style={{ fontSize: 13 }}>{customer.notes}</Text>
            </div>
          </>
        )}
        <Divider style={{ margin: '16px 0' }} />
        <Row gutter={8}>
          <Col span={8}><Button block icon={<MessageOutlined />} style={{ borderRadius: 8 }}>Message</Button></Col>
          <Col span={8}><Button block icon={<CalendarOutlined />} style={{ borderRadius: 8 }}>Book Now</Button></Col>
          <Col span={8}><Button block type="primary" style={{ borderRadius: 8, background: 'linear-gradient(135deg, #8B5CF6, #EC4899)', border: 'none' }} icon={<GiftOutlined />}>Send Offer</Button></Col>
        </Row>
      </div>
    </Modal>
  );
}

function CustomerContent() {
  const params = useParams();
  const slug = params?.slug as string;
  const [search, setSearch] = useState('');
  const [segmentFilter, setSegmentFilter] = useState('all');
  const [selectedCustomer, setSelectedCustomer] = useState<typeof customers[0] | null>(null);

  const filtered = customers.filter(c => {
    if (segmentFilter !== 'all' && c.segment !== segmentFilter) return false;
    if (search && !c.name.toLowerCase().includes(search.toLowerCase()) && !c.email.toLowerCase().includes(search.toLowerCase())) return false;
    return true;
  });

  const columns = [
    {
      title: 'Customer', dataIndex: 'name', key: 'name',
      render: (name: string, r: typeof customers[0]) => (
        <Space>
          <Avatar size={34} style={{ background: r.color, borderRadius: 10, fontSize: 12, fontWeight: 600 }}>{r.avatar}</Avatar>
          <div>
            <Text strong style={{ fontSize: 13, cursor: 'pointer' }} onClick={() => setSelectedCustomer(r)}>{name}</Text>
            <div style={{ fontSize: 11, color: 'var(--theme-text-secondary)' }}>{r.email}</div>
          </div>
        </Space>
      ),
    },
    { title: 'Phone', dataIndex: 'phone', key: 'phone', render: (p: string) => <Text style={{ fontSize: 13 }}>{p}</Text> },
    {
      title: 'Visits', dataIndex: 'visits', key: 'visits',
      render: (v: number) => <Text strong style={{ fontSize: 13 }}>{v}</Text>,
    },
    {
      title: 'Total Spent', dataIndex: 'totalSpent', key: 'totalSpent',
      render: (v: number) => <Text strong style={{ fontSize: 13, color: '#059669' }}>₹{v.toLocaleString()}</Text>,
    },
    {
      title: 'Segment', dataIndex: 'segment', key: 'segment',
      render: (s: string) => (
        <span style={{
          padding: '2px 10px', borderRadius: 20, fontSize: 11, fontWeight: 600,
          background: `${segmentColors[s] || '#6b7280'}12`, color: segmentColors[s] || '#6b7280',
        }}>{s.toUpperCase()}</span>
      ),
    },
    {
      title: 'Tier', dataIndex: 'tier', key: 'tier',
      render: (t: string) => (
        <Space size={4}>
          <CrownOutlined style={{ color: t === 'Platinum' ? '#8B5CF6' : t === 'Gold' ? '#F59E0B' : t === 'Silver' ? '#6B7280' : '#B45309', fontSize: 12 }} />
          <Text style={{ fontSize: 12, fontWeight: 600, color: tierColors[t] || '#6b7280' }}>{t}</Text>
        </Space>
      ),
    },
    {
      title: 'Points', dataIndex: 'points', key: 'points',
      render: (p: number) => (
        <Space size={4}>
          <GoldOutlined style={{ color: '#F59E0B', fontSize: 12 }} />
          <Text style={{ fontSize: 13 }}>{p}</Text>
        </Space>
      ),
    },
    {
      key: 'actions', width: 48,
      render: (_: any, r: typeof customers[0]) => (
        <Button type="text" size="small" icon={<MoreOutlined />} style={{ borderRadius: 6 }} onClick={() => setSelectedCustomer(r)} />
      ),
    },
  ];

  return (
    <div>
      <div className="page-header-row">
        <div>
          <h1 className="page-header-title">Customers</h1>
          <p className="page-header-subtitle">Manage your client relationships and loyalty programs</p>
        </div>
        <Space>
          <Input prefix={<SearchOutlined />} placeholder="Search customers..." style={{ width: 240, borderRadius: 10 }} value={search} onChange={e => setSearch(e.target.value)} />
          <Button icon={<DownloadOutlined />} style={{ borderRadius: 10, border: '1px solid var(--theme-border)' }}>Export</Button>
          <Button type="primary" icon={<PlusOutlined />} style={{ borderRadius: 10, background: 'linear-gradient(135deg, #8B5CF6, #EC4899)', border: 'none', boxShadow: '0 4px 14px rgba(139,92,246,0.3)' }}>
            Add Customer
          </Button>
        </Space>
      </div>

      <Row gutter={[16, 16]} style={{ marginBottom: 24 }}>
        {[
          { label: 'Total Customers', value: '1,284', icon: <TeamOutlined />, color: '#8B5CF6', bg: 'rgba(139,92,246,0.1)', change: '+12 this week' },
          { label: 'Active (30 days)', value: '842', icon: <RiseOutlined />, color: '#10B981', bg: 'rgba(16,185,129,0.1)', change: '65.6% retention' },
          { label: 'Avg. Spend', value: '₹3,200', icon: <WalletOutlined />, color: '#3B82F6', bg: 'rgba(59,130,246,0.1)', change: '+8% vs last month' },
          { label: 'VIP Customers', value: '86', icon: <CrownOutlined />, color: '#F59E0B', bg: 'rgba(245,158,11,0.1)', change: '6.7% of total' },
        ].map((stat, i) => (
          <Col xs={12} sm={6} key={i}>
            <div className="stat-widget" style={{ borderTop: 'none' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: 12 }}>
                <div>
                  <div className="stat-widget-label">{stat.label}</div>
                  <div className="stat-widget-value">{stat.value}</div>
                </div>
                <div style={{ width: 40, height: 40, borderRadius: 12, background: stat.bg, color: stat.color, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 18 }}>{stat.icon}</div>
              </div>
              <div style={{ fontSize: 12, color: '#10B981' }}>{stat.change}</div>
            </div>
          </Col>
        ))}
      </Row>

      <Row gutter={[16, 16]} style={{ marginBottom: 20 }}>
        {segments.map(s => (
          <Col key={s.key}>
            <div
              onClick={() => setSegmentFilter(s.key)}
              style={{
                display: 'flex', alignItems: 'center', gap: 8,
                padding: '6px 14px', borderRadius: 20, cursor: 'pointer',
                background: segmentFilter === s.key ? (segmentColors[s.key] || 'var(--theme-primary)') : 'var(--theme-surface)',
                border: `1px solid ${segmentFilter === s.key ? 'transparent' : 'var(--theme-border-light)'}`,
                transition: 'all 0.2s ease',
              }}
            >
              <Text style={{ fontSize: 12, fontWeight: 600, color: segmentFilter === s.key ? '#fff' : 'var(--theme-text)' }}>{s.label}</Text>
              <span style={{
                fontSize: 11, fontWeight: 600, borderRadius: 10,
                padding: '0 6px', minWidth: 18, textAlign: 'center',
                background: segmentFilter === s.key ? 'rgba(255,255,255,0.2)' : 'var(--theme-hover)',
                color: segmentFilter === s.key ? '#fff' : 'var(--theme-text-secondary)',
              }}>{s.count}</span>
            </div>
          </Col>
        ))}
      </Row>

      <Card className="premium-card" bodyStyle={{ padding: 0 }}>
        <Table
          columns={columns}
          dataSource={filtered}
          rowKey="id"
          pagination={{ pageSize: 10, showSizeChanger: false }}
          size="middle"
        />
      </Card>

      <CustomerProfileModal customer={selectedCustomer} open={!!selectedCustomer} onClose={() => setSelectedCustomer(null)} />
    </div>
  );
}

export default function CustomerPage() {
  return (
    <OwnerLayout>
      <CustomerContent />
    </OwnerLayout>
  );
}

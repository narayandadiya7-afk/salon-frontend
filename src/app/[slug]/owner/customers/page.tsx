'use client';

import React, { useState } from 'react';
import { useParams } from 'next/navigation';
import {
  Row, Col, Card, Tag, Typography, Button, Space, Avatar, Input,
  Table, Progress, Modal, Statistic, Divider, Rate, Tooltip, Badge,
} from 'antd';
import {
  UserOutlined, PlusOutlined, SearchOutlined, FilterOutlined,
  MoreOutlined, StarOutlined, GiftOutlined, MailOutlined,
  PhoneOutlined, CalendarOutlined, RightOutlined,
  WalletOutlined, RiseOutlined, CrownOutlined,
  TeamOutlined, DownloadOutlined, MessageOutlined,
  HeartOutlined, GoldOutlined,
} from '@ant-design/icons';
import PillFilter from '@/components/pill-filter';

const { Text } = Typography;

const customers = [
  { id: 'C001', name: 'Sarah Johnson', email: 'sarah.j@email.com', phone: '+91 98765 43210', visits: 24, totalSpent: 72000, lastVisit: '2024-01-15', segment: 'vip', birthday: '15 Mar', notes: 'Prefers morning appointments. Allergic to certain fragrances.', avatar: 'SJ', color: 'var(--salon-primary)', points: 2400, tier: 'Gold' },
  { id: 'C002', name: 'Priya Sharma', email: 'priya.s@email.com', phone: '+91 98765 43211', visits: 18, totalSpent: 54000, lastVisit: '2024-01-14', segment: 'regular', birthday: '22 Jul', notes: 'Likes the same stylist every time.', avatar: 'PS', color: '#B8986B', points: 1800, tier: 'Silver' },
  { id: 'C003', name: 'Amrita Singh', email: 'amrita.s@email.com', phone: '+91 98765 43212', visits: 32, totalSpent: 96000, lastVisit: '2024-01-15', segment: 'vip', birthday: '5 Jan', notes: 'VIP client. Prefers weekend slots.', avatar: 'AS', color: '#8B7D6B', points: 3200, tier: 'Platinum' },
  { id: 'C004', name: 'Neha Gupta', email: 'neha.g@email.com', phone: '+91 98765 43213', visits: 6, totalSpent: 18000, lastVisit: '2024-01-10', segment: 'new', birthday: '12 Sep', notes: 'New customer. Introduced by Priya.', avatar: 'NG', color: '#5B7A6B', points: 600, tier: 'Bronze' },
  { id: 'C005', name: 'Ritu Patel', email: 'ritu.p@email.com', phone: '+91 98765 43214', visits: 15, totalSpent: 45000, lastVisit: '2024-01-13', segment: 'regular', birthday: '3 Nov', notes: 'Loyal customer. Books monthly facials.', avatar: 'RP', color: '#A0886B', points: 1500, tier: 'Silver' },
  { id: 'C006', name: 'Deepa Verma', email: 'deepa.v@email.com', phone: '+91 98765 43215', visits: 2, totalSpent: 7000, lastVisit: '2024-01-08', segment: 'new', birthday: '28 Feb', notes: 'Came for bridal trial. Potential wedding booking.', avatar: 'DV', color: '#7A6B5A', points: 200, tier: 'Bronze' },
  { id: 'C007', name: 'Kavita Reddy', email: 'kavita.r@email.com', phone: '+91 98765 43216', visits: 42, totalSpent: 126000, lastVisit: '2024-01-12', segment: 'vip', birthday: '19 Aug', notes: 'Highest spender. Books family packages.', avatar: 'KR', color: '#5B8C5A', points: 4200, tier: 'Platinum' },
  { id: 'C008', name: 'Meera Nair', email: 'meera.n@email.com', phone: '+91 98765 43217', visits: 9, totalSpent: 27000, lastVisit: '2024-01-09', segment: 'regular', birthday: '7 Jun', notes: '', avatar: 'MN', color: '#8B7A6B', points: 900, tier: 'Silver' },
];

const segmentColors: Record<string, string> = { vip: 'var(--salon-primary)', regular: '#8B7D6B', new: '#5B8C5A', 'at-risk': '#7A6B5A' };
const tierColors: Record<string, string> = { Platinum: 'var(--salon-primary)', Gold: '#B8986B', Silver: '#8B7D6B', Bronze: '#A0886B' };
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
        background: 'var(--salon-primary)',
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
              <div style={{ fontSize: 24, fontWeight: 700, color: 'var(--salon-primary)' }}>{customer.visits}</div>
            </div>
          </Col>
          <Col span={8}>
            <div style={{ textAlign: 'center', padding: '12px 0', background: 'var(--theme-hover)', borderRadius: 12 }}>
              <Text style={{ fontSize: 11, color: 'var(--theme-text-secondary)' }}>Total Spent</Text>
              <div style={{ fontSize: 24, fontWeight: 700, color: '#5B7A6B' }}>₹{customer.totalSpent.toLocaleString()}</div>
            </div>
          </Col>
          <Col span={8}>
            <div style={{ textAlign: 'center', padding: '12px 0', background: 'var(--theme-hover)', borderRadius: 12 }}>
              <Text style={{ fontSize: 11, color: 'var(--theme-text-secondary)' }}>Loyalty Points</Text>
              <div style={{ fontSize: 24, fontWeight: 700, color: 'var(--salon-secondary)' }}>{customer.points}</div>
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
          <Col span={8}><Button block type="primary" style={{ borderRadius: 8 }} icon={<GiftOutlined />}>Send Offer</Button></Col>
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
      render: (v: number) => <Text strong style={{ fontSize: 13, color: '#5B7A6B' }}>₹{v.toLocaleString()}</Text>,
    },
    {
      title: 'Segment', dataIndex: 'segment', key: 'segment',
      render: (s: string) => (
        <span style={{
          padding: '2px 10px', borderRadius: 20, fontSize: 11, fontWeight: 600,
          background: `${segmentColors[s] || '#7A6B5A'}12`, color: segmentColors[s] || '#7A6B5A',
        }}>{s.toUpperCase()}</span>
      ),
    },
    {
      title: 'Tier', dataIndex: 'tier', key: 'tier',
      render: (t: string) => (
        <Space size={4}>
          <CrownOutlined style={{ color: t === 'Platinum' ? 'var(--salon-primary)' : t === 'Gold' ? '#B8986B' : t === 'Silver' ? '#8B7D6B' : '#A0886B', fontSize: 12 }} />
          <Text style={{ fontSize: 12, fontWeight: 600, color: tierColors[t] || '#7A6B5A' }}>{t}</Text>
        </Space>
      ),
    },
    {
      title: 'Points', dataIndex: 'points', key: 'points',
      render: (p: number) => (
        <Space size={4}>
          <GoldOutlined style={{ color: 'var(--salon-secondary)', fontSize: 12 }} />
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
          <Button type="primary" icon={<PlusOutlined />} style={{ borderRadius: 10 }}>
            Add Customer
          </Button>
        </Space>
      </div>

      <Row gutter={[16, 16]} style={{ marginBottom: 24 }}>
        {[
          { label: 'Total Customers', value: '1,284', icon: <TeamOutlined />, color: 'var(--salon-primary)', bg: 'color-mix(in srgb, var(--salon-primary) 10%, transparent)', change: '+12 this week' },
          { label: 'Active (30 days)', value: '842', icon: <RiseOutlined />, color: 'var(--salon-primary)', bg: 'color-mix(in srgb, var(--salon-primary) 10%, transparent)', change: '65.6% retention' },
          { label: 'Avg. Spend', value: '₹3,200', icon: <WalletOutlined />, color: 'var(--salon-primary)', bg: 'color-mix(in srgb, var(--salon-primary) 10%, transparent)', change: '+8% vs last month' },
          { label: 'VIP Customers', value: '86', icon: <CrownOutlined />, color: 'var(--salon-secondary)', bg: 'color-mix(in srgb, var(--salon-secondary) 10%, transparent)', change: '6.7% of total' },
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
              <div style={{ fontSize: 12, color: '#5B8C5A' }}>{stat.change}</div>
            </div>
          </Col>
        ))}
      </Row>

      <PillFilter
        options={segments}
        value={segmentFilter}
        onChange={setSegmentFilter}
        style={{ marginBottom: 20 }}
      />

      <Card className="premium-card" styles={{ body: { padding: 0 } }}>
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
  return <CustomerContent />;
}

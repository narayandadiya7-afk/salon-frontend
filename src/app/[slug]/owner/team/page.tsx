'use client';

import React, { useState } from 'react';
import {
  Row, Col, Card, Tag, Typography, Button, Space, Avatar, Input, Select, Switch,
  Progress, Rate, Tooltip, Modal, Table, Badge, Divider, Dropdown,
} from 'antd';
import type { MenuProps } from 'antd';
import {
  UserOutlined, PlusOutlined, SearchOutlined, FilterOutlined, MoreOutlined,
  StarOutlined, ClockCircleOutlined, CalendarOutlined, PhoneOutlined, MailOutlined,
  CheckCircleOutlined, CloseCircleOutlined, RightOutlined, RiseOutlined, TeamOutlined, SettingOutlined,
} from '@ant-design/icons';
import PillFilter from '@/components/pill-filter';
import dayjs from 'dayjs';

const { Text } = Typography;

interface StaffMember {
  id: number;
  name: string;
  role: string;
  rating: number;
  bookings: number;
  revenue: number;
  utilization: number;
  status: 'Active' | 'Offline';
  avatar: string;
  color: string;
  phone: string;
  email: string;
  specialty: string;
  reviews: number;
}

const staffMembers: StaffMember[] = [
  { id: 1, name: 'Ananya Sharma', role: 'Senior Stylist', rating: 4.9, bookings: 45, revenue: 67500, utilization: 85, status: 'Active', avatar: 'AS', color: 'var(--salon-primary)', phone: '+91 98765 43210', email: 'ananya@salon.com', specialty: 'Haircut & Styling', reviews: 128 },
  { id: 2, name: 'Rahul Verma', role: 'Master Barber', rating: 4.7, bookings: 38, revenue: 45600, utilization: 72, status: 'Active', avatar: 'RV', color: '#B8986B', phone: '+91 98765 43211', email: 'rahul@salon.com', specialty: 'Beard & Shave', reviews: 96 },
  { id: 3, name: 'Priya Patel', role: 'Esthetician', rating: 4.8, bookings: 32, revenue: 51200, utilization: 68, status: 'Active', avatar: 'PP', color: '#8B7D6B', phone: '+91 98765 43212', email: 'priya@salon.com', specialty: 'Facial Treatments', reviews: 84 },
  { id: 4, name: 'Vikram Singh', role: 'Colorist', rating: 4.6, bookings: 28, revenue: 50400, utilization: 60, status: 'Active', avatar: 'VS', color: '#5B7A6B', phone: '+91 98765 43213', email: 'vikram@salon.com', specialty: 'Hair Coloring', reviews: 72 },
  { id: 5, name: 'Meera Kapoor', role: 'Nail Technician', rating: 4.9, bookings: 24, revenue: 28800, utilization: 55, status: 'Offline', avatar: 'MK', color: '#A0886B', phone: '+91 98765 43214', email: 'meera@salon.com', specialty: 'Manicure & Pedicure', reviews: 62 },
  { id: 6, name: 'Amit Joshi', role: 'Massage Therapist', rating: 4.5, bookings: 18, revenue: 32400, utilization: 45, status: 'Active', avatar: 'AJ', color: '#7A6B5A', phone: '+91 98765 43215', email: 'amit@salon.com', specialty: 'Massage Therapy', reviews: 48 },
  { id: 7, name: 'Neha Gupta', role: 'Hair Stylist', rating: 4.7, bookings: 35, revenue: 45500, utilization: 78, status: 'Active', avatar: 'NG', color: '#5B8C5A', phone: '+91 98765 43216', email: 'neha@salon.com', specialty: 'Blow-dry & Styling', reviews: 92 },
  { id: 8, name: 'Raj Khanna', role: 'Barber', rating: 4.4, bookings: 15, revenue: 18000, utilization: 38, status: 'Active', avatar: 'RK', color: '#8B7A6B', phone: '+91 98765 43217', email: 'raj@salon.com', specialty: 'Classic Cuts', reviews: 36 },
];

const todayStaff = staffMembers.filter(s => s.status === 'Active').slice(0, 6);
const avgRating = (staffMembers.reduce((sum, s) => sum + s.rating, 0) / staffMembers.length);

function getStatusColor(status: string) {
  return status === 'Active' ? '#5B8C5A' : '#7A6B5A';
}

function getStatusBg(status: string) {
  return status === 'Active' ? 'color-mix(in srgb, #5B8C5A 10%, transparent)' : 'color-mix(in srgb, #7A6B5A 10%, transparent)';
}

function getUtilizationColor(val: number) {
  if (val >= 80) return '#5B8C5A';
  if (val >= 60) return 'var(--salon-primary)';
  if (val >= 40) return '#B8986B';
  return 'var(--salon-primary)';
}

function StaffContent() {
  const [searchQuery, setSearchQuery] = useState('');
  const [activeTab, setActiveTab] = useState('all');
  const [selectedStaff, setSelectedStaff] = useState<StaffMember | null>(null);
  const [profileModalOpen, setProfileModalOpen] = useState(false);

  const filteredStaff = staffMembers.filter(s => {
    const matchesSearch = s.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      s.role.toLowerCase().includes(searchQuery.toLowerCase());
    if (activeTab === 'all') return matchesSearch;
    if (activeTab === 'active') return matchesSearch && s.status === 'Active';
    if (activeTab === 'offline') return matchesSearch && s.status === 'Offline';
    return matchesSearch;
  });

  const handleViewProfile = (staff: StaffMember) => {
    setSelectedStaff(staff);
    setProfileModalOpen(true);
  };

  const getActionMenuItems = (staff: StaffMember): MenuProps['items'] => [
    { key: 'profile', icon: <UserOutlined />, label: 'View Profile', onClick: () => handleViewProfile(staff) },
    { key: 'schedule', icon: <CalendarOutlined />, label: 'Manage Schedule' },
    { key: 'commission', icon: <RiseOutlined />, label: 'Commission Settings' },
    { type: 'divider' },
    { key: 'status', icon: staff.status === 'Active' ? <CloseCircleOutlined /> : <CheckCircleOutlined />, label: staff.status === 'Active' ? 'Set Offline' : 'Set Active' },
  ];

  const performanceColumns = [
    {
      title: 'Staff', dataIndex: 'name', key: 'name',
      render: (name: string, record: StaffMember) => (
        <Space>
          <Avatar size={32} style={{ background: `linear-gradient(135deg, ${record.color}, ${record.color}88)`, borderRadius: 10, fontSize: 12, fontWeight: 600, flexShrink: 0 }}>
            {record.avatar}
          </Avatar>
          <div>
            <Text strong style={{ fontSize: 13 }}>{name}</Text>
            <div style={{ fontSize: 11, color: 'var(--theme-text-tertiary)' }}>{record.specialty}</div>
          </div>
        </Space>
      ),
    },
    { title: 'Role', dataIndex: 'role', key: 'role', render: (r: string) => <Text style={{ fontSize: 13, color: 'var(--theme-text-secondary)' }}>{r}</Text> },
    {
      title: 'Appointments', dataIndex: 'bookings', key: 'bookings',
      render: (val: number) => <Text strong style={{ fontSize: 13 }}>{val}</Text>,
    },
    {
      title: 'Revenue', dataIndex: 'revenue', key: 'revenue',
      render: (val: number) => <Text strong style={{ fontSize: 13, color: '#5B7A6B' }}>₹{val.toLocaleString()}</Text>,
    },
    {
      title: 'Rating', dataIndex: 'rating', key: 'rating',
      render: (val: number) => (
        <Space size={4}>
          <StarOutlined style={{ fontSize: 12, color: 'var(--salon-secondary)' }} />
          <Text style={{ fontSize: 13, fontWeight: 600 }}>{val}</Text>
        </Space>
      ),
    },
    {
      title: 'Status', dataIndex: 'status', key: 'status',
      render: (status: string) => (
        <span style={{
          display: 'inline-flex', alignItems: 'center', gap: 5,
          padding: '2px 10px', borderRadius: 20,
          fontSize: 11, fontWeight: 600,
          background: getStatusBg(status),
          color: getStatusColor(status),
        }}>
          <span style={{ width: 5, height: 5, borderRadius: '50%', background: 'currentColor' }} />
          {status}
        </span>
      ),
    },
    {
      key: 'actions', width: 48,
      render: (_: unknown, record: StaffMember) => (
        <Dropdown menu={{ items: getActionMenuItems(record) }} trigger={['click']} placement="bottomRight">
          <Button type="text" size="small" icon={<MoreOutlined />} style={{ borderRadius: 8 }} />
        </Dropdown>
      ),
    },
  ];

  return (
    <div>
      {/* Page Header */}
      <div className="page-header-row">
        <div>
          <h1 className="page-header-title">Staff Management</h1>
          <p className="page-header-subtitle">Manage your team, schedules, and performance</p>
        </div>
        <Space wrap>
          <Input
            placeholder="Search staff..."
            prefix={<SearchOutlined style={{ color: 'var(--theme-text-tertiary)' }} />}
            value={searchQuery}
            onChange={e => setSearchQuery(e.target.value)}
            style={{
              width: 220, borderRadius: 10,
              border: '1px solid var(--theme-border-light)',
              background: 'var(--theme-surface)',
            }}
          />
          <Button icon={<FilterOutlined />} style={{ borderRadius: 10, border: '1px solid var(--theme-border-light)' }}>
            Filters
          </Button>
          <Button
            type="primary"
            icon={<PlusOutlined />}
            style={{
              borderRadius: 10,
            }}
          >
            Add Staff Member
          </Button>
        </Space>
      </div>

      {/* KPI Row */}
      <Row gutter={[20, 20]} style={{ marginBottom: 24 }}>
        <Col xs={12} lg={6}>
          <div className="stat-widget stat-widget-staff">
            <div className="stat-widget-header">
              <div className="stat-widget-icon stat-widget-icon-staff"><TeamOutlined /></div>
              <Tag style={{ borderRadius: 6, margin: 0, fontSize: 11, border: 'none', background: 'color-mix(in srgb, var(--salon-secondary) 8%, transparent)', color: 'var(--salon-secondary)' }}>Total</Tag>
            </div>
            <div className="stat-widget-label">Active Staff</div>
            <div className="stat-widget-value">{staffMembers.filter(s => s.status === 'Active').length}</div>
            <div className="stat-widget-trend stat-widget-trend-up">
              <CheckCircleOutlined /> {staffMembers.filter(s => s.status === 'Active').length} currently active
            </div>
          </div>
        </Col>
        <Col xs={12} lg={6}>
          <div className="stat-widget stat-widget-bookings">
            <div className="stat-widget-header">
              <div className="stat-widget-icon stat-widget-icon-bookings"><CalendarOutlined /></div>
              <Tag style={{ borderRadius: 6, margin: 0, fontSize: 11, border: 'none', background: 'color-mix(in srgb, var(--salon-primary) 8%, transparent)', color: 'var(--salon-primary)' }}>Today</Tag>
            </div>
            <div className="stat-widget-label">Today&apos;s Staff</div>
            <div className="stat-widget-value">{todayStaff.length}</div>
            <div className="stat-widget-trend stat-widget-trend-up">
              <CalendarOutlined /> Scheduled for today
            </div>
          </div>
        </Col>
        <Col xs={12} lg={6}>
          <div className="stat-widget stat-widget-customers">
            <div className="stat-widget-header">
              <div className="stat-widget-icon stat-widget-icon-customers"><ClockCircleOutlined /></div>
              <Tag style={{ borderRadius: 6, margin: 0, fontSize: 11, border: 'none', background: 'color-mix(in srgb, var(--salon-primary) 8%, transparent)', color: 'var(--salon-primary)' }}>Pending</Tag>
            </div>
            <div className="stat-widget-label">Pending Leave</div>
            <div className="stat-widget-value">1</div>
            <div className="stat-widget-trend stat-widget-trend-up">
              <CloseCircleOutlined /> Needs coverage
            </div>
          </div>
        </Col>
        <Col xs={12} lg={6}>
          <div className="stat-widget stat-widget-revenue">
            <div className="stat-widget-header">
              <div className="stat-widget-icon stat-widget-icon-revenue"><StarOutlined /></div>
              <Tag style={{ borderRadius: 6, margin: 0, fontSize: 11, border: 'none', background: 'color-mix(in srgb, var(--salon-primary) 8%, transparent)', color: 'var(--salon-primary)' }}>Overall</Tag>
            </div>
            <div className="stat-widget-label">Avg. Rating</div>
            <div className="stat-widget-value">{avgRating.toFixed(1)}★</div>
            <div className="stat-widget-trend stat-widget-trend-up">
              <RiseOutlined /> Excellent team
            </div>
          </div>
        </Col>
      </Row>

      {/* Staff Profiles */}
      <Card
        className="premium-card"
        style={{ marginBottom: 24 }}
        title={
          <Space>
            <TeamOutlined style={{ color: 'var(--salon-primary)' }} />
            <span>Team Members</span>
          </Space>
        }
        extra={
          <PillFilter
            options={[{ key: 'all', label: 'All Staff' }, { key: 'active', label: 'Active' }, { key: 'offline', label: 'Offline' }]}
            value={activeTab}
            onChange={setActiveTab}
          />
        }
      >
        <Row gutter={[20, 20]}>
          {filteredStaff.map((staff) => (
            <Col key={staff.id} xs={24} sm={12} lg={6}>
              <div style={{
                background: 'var(--theme-surface)',
                borderRadius: 14,
                border: '1px solid var(--theme-border-light)',
                padding: 20,
                transition: 'all 0.3s ease',
                cursor: 'pointer',
                position: 'relative',
                overflow: 'hidden',
              }}
                  onMouseEnter={e => { e.currentTarget.style.borderColor = 'color-mix(in srgb, var(--salon-primary) 20%, transparent)'; e.currentTarget.style.boxShadow = '0 8px 32px rgba(0,0,0,0.06)'; e.currentTarget.style.transform = 'translateY(-2px)'; }}
                onMouseLeave={e => { e.currentTarget.style.borderColor = 'var(--theme-border-light)'; e.currentTarget.style.boxShadow = 'none'; e.currentTarget.style.transform = 'none'; }}
                onClick={() => handleViewProfile(staff)}
              >
                {/* Status dot */}
                <div style={{
                  position: 'absolute', top: 16, right: 16,
                  width: 8, height: 8, borderRadius: '50%',
                  background: getStatusColor(staff.status),
                  boxShadow: `0 0 8px ${getStatusColor(staff.status)}`,
                }} />

                {/* Avatar */}
                <div style={{ textAlign: 'center', marginBottom: 12 }}>
                  <Avatar size={56} style={{
                    background: `linear-gradient(135deg, ${staff.color}, ${staff.color}88)`,
                    borderRadius: 14,
                    fontSize: 20,
                    fontWeight: 700,
                    color: '#fff',
                    boxShadow: `0 4px 16px ${staff.color}33`,
                  }}>
                    {staff.avatar}
                  </Avatar>
                </div>

                {/* Name & Role */}
                <div style={{ textAlign: 'center', marginBottom: 10 }}>
                  <Text strong style={{ fontSize: 14, display: 'block' }}>{staff.name}</Text>
                  <Text style={{ fontSize: 12, color: 'var(--theme-text-secondary)' }}>{staff.role}</Text>
                </div>

                {/* Rating */}
                <div style={{ textAlign: 'center', marginBottom: 12 }}>
                  <Rate disabled allowHalf value={staff.rating} style={{ fontSize: 12 }} />
                  <Text style={{ fontSize: 11, color: 'var(--theme-text-secondary)', marginLeft: 6 }}>({staff.reviews})</Text>
                </div>

                {/* Status Tag */}
                <div style={{ textAlign: 'center', marginBottom: 12 }}>
                  <span style={{
                    display: 'inline-flex', alignItems: 'center', gap: 4,
                    padding: '2px 10px', borderRadius: 20,
                    fontSize: 11, fontWeight: 600,
                    background: getStatusBg(staff.status),
                    color: getStatusColor(staff.status),
                  }}>
                    <span style={{ width: 4, height: 4, borderRadius: '50%', background: 'currentColor' }} />
                    {staff.status}
                  </span>
                </div>

                <Divider style={{ margin: '8px 0' }} />

                {/* Stats */}
                <div style={{ display: 'flex', justifyContent: 'space-around', marginBottom: 10 }}>
                  <div style={{ textAlign: 'center' }}>
                    <Text style={{ fontSize: 11, color: 'var(--theme-text-secondary)', display: 'block' }}>Bookings</Text>
                    <Text strong style={{ fontSize: 15 }}>{staff.bookings}</Text>
                  </div>
                  <div style={{ textAlign: 'center' }}>
                    <Text style={{ fontSize: 11, color: 'var(--theme-text-secondary)', display: 'block' }}>Revenue</Text>
                    <Text strong style={{ fontSize: 15, color: '#5B7A6B' }}>₹{staff.revenue.toLocaleString()}</Text>
                  </div>
                </div>

                {/* Utilization */}
                <div>
                  <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 4 }}>
                    <Text style={{ fontSize: 10, color: 'var(--theme-text-tertiary)' }}>Utilization</Text>
                    <Text style={{ fontSize: 10, fontWeight: 600, color: getUtilizationColor(staff.utilization) }}>{staff.utilization}%</Text>
                  </div>
                  <Progress
                    percent={staff.utilization}
                    showInfo={false}
                    size="small"
                    strokeColor={getUtilizationColor(staff.utilization)}
                    trailColor="var(--theme-border-light)"
                    style={{ margin: 0 }}
                  />
                </div>

                {/* Actions */}
                <div style={{ marginTop: 12, display: 'flex', justifyContent: 'center' }}>
                  <Dropdown menu={{ items: getActionMenuItems(staff) }} trigger={['click']} placement="bottomCenter">
                    <Button
                      type="default"
                      size="small"
                      icon={<SettingOutlined />}
                      style={{ borderRadius: 8, fontSize: 12, border: '1px solid var(--theme-border-light)' }}
                    >
                      Manage
                    </Button>
                  </Dropdown>
                </div>
              </div>
            </Col>
          ))}
        </Row>
      </Card>

      {/* Performance Table */}
      <Card
        className="premium-card"
        title={
          <Space>
            <RiseOutlined style={{ color: 'var(--salon-primary)' }} />
            <span>Performance Overview</span>
          </Space>
        }
        extra={
          <Space>
            <Select
              defaultValue="all"
              size="small"
              style={{ width: 130, borderRadius: 8 }}
              options={[
                { value: 'all', label: 'All Roles' },
                { value: 'stylist', label: 'Stylists' },
                { value: 'barber', label: 'Barbers' },
                { value: 'esthetician', label: 'Estheticians' },
              ]}
            />
          </Space>
        }
      >
        <Table
          columns={performanceColumns}
          dataSource={filteredStaff}
          rowKey="id"
          pagination={false}
          size="middle"
          style={{ fontSize: 13 }}
        />
      </Card>

      {/* Profile Modal */}
      <Modal
        title={null}
        open={profileModalOpen}
        onCancel={() => setProfileModalOpen(false)}
        footer={null}
        width={480}
        style={{ borderRadius: 16, overflow: 'hidden' }}
        destroyOnClose
      >
        {selectedStaff && (
          <div>
            {/* Profile Header */}
            <div style={{
              background: `linear-gradient(135deg, ${selectedStaff.color}22, ${selectedStaff.color}11)`,
              margin: -24, marginBottom: 0,
              padding: '32px 24px 24px',
              textAlign: 'center',
              borderBottom: '1px solid var(--theme-border-light)',
            }}>
              <Avatar size={72} style={{
                background: `linear-gradient(135deg, ${selectedStaff.color}, ${selectedStaff.color}88)`,
                borderRadius: 16,
                fontSize: 28,
                fontWeight: 700,
                color: '#fff',
                boxShadow: `0 6px 24px ${selectedStaff.color}44`,
                marginBottom: 12,
              }}>
                {selectedStaff.avatar}
              </Avatar>
              <Text strong style={{ fontSize: 20, display: 'block' }}>{selectedStaff.name}</Text>
              <Text style={{ fontSize: 14, color: 'var(--theme-text-secondary)' }}>{selectedStaff.role}</Text>
              <div style={{ marginTop: 8 }}>
                <span style={{
                  display: 'inline-flex', alignItems: 'center', gap: 4,
                  padding: '2px 12px', borderRadius: 20,
                  fontSize: 11, fontWeight: 600,
                  background: getStatusBg(selectedStaff.status),
                  color: getStatusColor(selectedStaff.status),
                }}>
                  <span style={{ width: 4, height: 4, borderRadius: '50%', background: 'currentColor' }} />
                  {selectedStaff.status}
                </span>
              </div>
            </div>

            {/* Contact Info */}
            <div style={{ padding: '20px 0', display: 'flex', flexDirection: 'column', gap: 10 }}>
              <Space>
                <div style={{ width: 32, height: 32, borderRadius: 8, background: 'color-mix(in srgb, var(--salon-primary) 8%, transparent)', display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'var(--salon-primary)', fontSize: 14, flexShrink: 0 }}>
                  <PhoneOutlined />
                </div>
                <div>
                  <Text style={{ fontSize: 11, color: 'var(--theme-text-tertiary)', display: 'block' }}>Phone</Text>
                  <Text style={{ fontSize: 13 }}>{selectedStaff.phone}</Text>
                </div>
              </Space>
              <Space>
                <div style={{ width: 32, height: 32, borderRadius: 8, background: 'color-mix(in srgb, var(--salon-secondary) 8%, transparent)', display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'var(--salon-secondary)', fontSize: 14, flexShrink: 0 }}>
                  <MailOutlined />
                </div>
                <div>
                  <Text style={{ fontSize: 11, color: 'var(--theme-text-tertiary)', display: 'block' }}>Email</Text>
                  <Text style={{ fontSize: 13 }}>{selectedStaff.email}</Text>
                </div>
              </Space>
              <Space>
                <div style={{ width: 32, height: 32, borderRadius: 8, background: 'color-mix(in srgb, var(--salon-secondary) 8%, transparent)', display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'var(--salon-secondary)', fontSize: 14, flexShrink: 0 }}>
                  <StarOutlined />
                </div>
                <div>
                  <Text style={{ fontSize: 11, color: 'var(--theme-text-tertiary)', display: 'block' }}>Specialty</Text>
                  <Text style={{ fontSize: 13 }}>{selectedStaff.specialty}</Text>
                </div>
              </Space>
            </div>

            <Divider style={{ margin: '0 0 16px' }} />

            {/* Stats Grid */}
            <Row gutter={[12, 12]}>
              <Col span={8}>
                <div style={{ textAlign: 'center', padding: '8px 0', background: 'var(--theme-hover)', borderRadius: 10 }}>
                  <Text style={{ fontSize: 11, color: 'var(--theme-text-tertiary)', display: 'block' }}>Bookings</Text>
                  <Text strong style={{ fontSize: 22 }}>{selectedStaff.bookings}</Text>
                </div>
              </Col>
              <Col span={8}>
                <div style={{ textAlign: 'center', padding: '8px 0', background: 'var(--theme-hover)', borderRadius: 10 }}>
                  <Text style={{ fontSize: 11, color: 'var(--theme-text-tertiary)', display: 'block' }}>Revenue</Text>
                  <Text strong style={{ fontSize: 22, color: '#5B7A6B' }}>₹{(selectedStaff.revenue / 1000).toFixed(1)}k</Text>
                </div>
              </Col>
              <Col span={8}>
                <div style={{ textAlign: 'center', padding: '8px 0', background: 'var(--theme-hover)', borderRadius: 10 }}>
                  <Text style={{ fontSize: 11, color: 'var(--theme-text-tertiary)', display: 'block' }}>Rating</Text>
                  <Text strong style={{ fontSize: 22 }}>{selectedStaff.rating}</Text>
                </div>
              </Col>
            </Row>

            {/* Utilization in Modal */}
            <div style={{ marginTop: 16 }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 6 }}>
                <Text style={{ fontSize: 12, color: 'var(--theme-text-secondary)' }}>Utilization Rate</Text>
                <Text style={{ fontSize: 12, fontWeight: 600, color: getUtilizationColor(selectedStaff.utilization) }}>{selectedStaff.utilization}%</Text>
              </div>
              <Progress
                percent={selectedStaff.utilization}
                showInfo={false}
                strokeColor={getUtilizationColor(selectedStaff.utilization)}
                trailColor="var(--theme-border-light)"
              />
            </div>

            {/* Actions */}
            <div style={{ marginTop: 20, display: 'flex', gap: 8 }}>
              <Button type="primary" icon={<CalendarOutlined />} block style={{ borderRadius: 10 }}>
                Manage Schedule
              </Button>
              <Button icon={<SettingOutlined />} style={{ borderRadius: 10, border: '1px solid var(--theme-border-light)' }}>
                Settings
              </Button>
            </div>
          </div>
        )}
      </Modal>
    </div>
  );
}

export default function StaffManagementPage() {
  return <StaffContent />;
}

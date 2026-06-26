'use client';

import React, { useState } from 'react';
import { useParams } from 'next/navigation';
import {
  Row, Col, Card, Tag, Typography, Button, Space, Avatar, Tabs, Badge,
  Calendar, List, Select, Input, Modal, Drawer, Divider, Timeline, Tooltip,
} from 'antd';
import {
  CalendarOutlined, PlusOutlined, RightOutlined, LeftOutlined,
  UserOutlined, ClockCircleOutlined, ScissorOutlined,
  CheckCircleOutlined, CloseCircleOutlined, MoreOutlined,
  SearchOutlined, FilterOutlined, DownloadOutlined,
  ArrowLeftOutlined, ArrowRightOutlined,
  ReloadOutlined, FileTextOutlined,
} from '@ant-design/icons';
import OwnerLayout from '../../../../components/layout/OwnerLayout';
import dayjs from 'dayjs';

const { Text } = Typography;

const STATUSES = [
  { key: 'all', label: 'All Appointments', count: 48 },
  { key: 'pending', label: 'Pending', count: 12, color: '#8B5CF6' },
  { key: 'confirmed', label: 'Confirmed', count: 18, color: '#3B82F6' },
  { key: 'in-progress', label: 'In Progress', count: 6, color: '#F59E0B' },
  { key: 'completed', label: 'Completed', count: 8, color: '#10B981' },
  { key: 'cancelled', label: 'Cancelled', count: 4, color: '#EF4444' },
];

const bookings = [
  { id: 'B001', customer: 'Sarah Johnson', service: 'Haircut & Styling', staff: 'Ananya', time: '09:00 AM', date: '2024-01-15', status: 'confirmed', amount: 1500, avatar: 'SJ', color: '#8B5CF6' },
  { id: 'B002', customer: 'Priya Sharma', service: 'Facial Treatment', staff: 'Priya', time: '10:00 AM', date: '2024-01-15', status: 'confirmed', amount: 2200, avatar: 'PS', color: '#EC4899' },
  { id: 'B003', customer: 'Amrita Singh', service: 'Manicure & Pedicure', staff: 'Ananya', time: '10:30 AM', date: '2024-01-15', status: 'in-progress', amount: 1800, avatar: 'AS', color: '#3B82F6' },
  { id: 'B004', customer: 'Neha Gupta', service: 'Hair Coloring', staff: 'Vikram', time: '11:30 AM', date: '2024-01-15', status: 'pending', amount: 3500, avatar: 'NG', color: '#F59E0B' },
  { id: 'B005', customer: 'Ritu Patel', service: 'Massage Therapy', staff: 'Priya', time: '01:00 PM', date: '2024-01-15', status: 'pending', amount: 2500, avatar: 'RP', color: '#10B981' },
  { id: 'B006', customer: 'Deepa Verma', service: 'Bridal Makeup', staff: 'Ananya', time: '02:00 PM', date: '2024-01-15', status: 'confirmed', amount: 5000, avatar: 'DV', color: '#8B5CF6' },
  { id: 'B007', customer: 'Kavita Reddy', service: 'Haircut & Styling', staff: 'Rahul', time: '03:00 PM', date: '2024-01-15', status: 'pending', amount: 1200, avatar: 'KR', color: '#EC4899' },
  { id: 'B008', customer: 'Meera Nair', service: 'Facial Treatment', staff: 'Priya', time: '04:00 PM', date: '2024-01-15', status: 'confirmed', amount: 2000, avatar: 'MN', color: '#3B82F6' },
];

const statusStyles: Record<string, { label: string; color: string; bg: string; dot: string }> = {
  confirmed: { label: 'Confirmed', color: '#2563eb', bg: 'rgba(37,99,235,0.08)', dot: '#3B82F6' },
  pending: { label: 'Pending', color: '#7c3aed', bg: 'rgba(124,58,237,0.08)', dot: '#8B5CF6' },
  'in-progress': { label: 'In Progress', color: '#d97706', bg: 'rgba(217,119,6,0.08)', dot: '#F59E0B' },
  completed: { label: 'Completed', color: '#16a34a', bg: 'rgba(22,163,74,0.08)', dot: '#10B981' },
  cancelled: { label: 'Cancelled', color: '#dc2626', bg: 'rgba(220,38,38,0.08)', dot: '#EF4444' },
};

function BookingCard({ booking }: { booking: typeof bookings[0] }) {
  const [showDrawer, setShowDrawer] = useState(false);
  const st = statusStyles[booking.status] || statusStyles.pending;

  return (
    <>
      <div
        onClick={() => setShowDrawer(true)}
        style={{
          background: 'var(--theme-surface)', borderRadius: 14,
          border: '1px solid var(--theme-border-light)',
          padding: 16, cursor: 'pointer',
          transition: 'all 0.2s ease',
        }}
        onMouseEnter={e => { e.currentTarget.style.borderColor = st.color; e.currentTarget.style.boxShadow = `0 4px 20px ${st.color}15`; }}
        onMouseLeave={e => { e.currentTarget.style.borderColor = 'var(--theme-border-light)'; e.currentTarget.style.boxShadow = 'none'; }}
      >
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: 12 }}>
          <Space>
            <Avatar size={36} style={{ background: booking.color, borderRadius: 10, fontSize: 12, fontWeight: 600 }}>
              {booking.avatar}
            </Avatar>
            <div>
              <Text strong style={{ fontSize: 14 }}>{booking.customer}</Text>
              <div style={{ fontSize: 12, color: 'var(--theme-text-secondary)' }}>{booking.service}</div>
            </div>
          </Space>
          <span style={{
            padding: '2px 10px', borderRadius: 20, fontSize: 11, fontWeight: 600,
            background: st.bg, color: st.color, display: 'inline-flex', alignItems: 'center', gap: 4,
          }}>
            <span style={{ width: 5, height: 5, borderRadius: '50%', background: st.dot }} />
            {st.label}
          </span>
        </div>
        <div style={{ display: 'flex', gap: 16, fontSize: 12, color: 'var(--theme-text-secondary)' }}>
          <span><ClockCircleOutlined style={{ marginRight: 4 }} />{booking.time}</span>
          <span><UserOutlined style={{ marginRight: 4 }} />{booking.staff}</span>
          <span><strong style={{ color: '#8B5CF6' }}>₹{booking.amount.toLocaleString()}</strong></span>
        </div>
      </div>

      <Drawer
        title={
          <Space>
            <Avatar size={40} style={{ background: booking.color, borderRadius: 10, fontSize: 14, fontWeight: 600 }}>
              {booking.avatar}
            </Avatar>
            <div>
              <Text strong style={{ fontSize: 16 }}>{booking.customer}</Text>
              <div style={{ fontSize: 12, color: 'var(--theme-text-secondary)' }}>Booking #{booking.id}</div>
            </div>
          </Space>
        }
        placement="right"
        width={440}
        open={showDrawer}
        onClose={() => setShowDrawer(false)}
        styles={{ body: { padding: '20px 24px' } }}
      >
        <div style={{ display: 'flex', flexDirection: 'column', gap: 20 }}>
          <div style={{
            background: st.bg, borderRadius: 12, padding: '12px 16px',
            display: 'flex', justifyContent: 'space-between', alignItems: 'center',
          }}>
            <div>
              <Text style={{ fontSize: 11, color: 'var(--theme-text-secondary)' }}>Status</Text>
              <div style={{ display: 'flex', alignItems: 'center', gap: 6, marginTop: 2 }}>
                <span style={{ width: 6, height: 6, borderRadius: '50%', background: st.dot }} />
                <Text strong style={{ color: st.color, fontSize: 14 }}>{st.label}</Text>
              </div>
            </div>
            <Select defaultValue={booking.status} size="small" style={{ width: 130 }}
              options={STATUSES.filter(s => s.key !== 'all').map(s => ({ value: s.key, label: s.label }))}
            />
          </div>

          <Divider style={{ margin: '4px 0' }} />

          <div>
            <Text style={{ fontSize: 12, color: 'var(--theme-text-secondary)', display: 'block', marginBottom: 8 }}>Booking Details</Text>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
              {[
                { icon: <CalendarOutlined />, label: 'Date', value: dayjs(booking.date).format('DD MMM YYYY') },
                { icon: <ClockCircleOutlined />, label: 'Time', value: booking.time },
                { icon: <ScissorOutlined />, label: 'Service', value: booking.service },
                { icon: <UserOutlined />, label: 'Staff', value: booking.staff },
                { icon: <FileTextOutlined />, label: 'Amount', value: `₹${booking.amount.toLocaleString()}` },
              ].map((item, i) => (
                <div key={i} style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
                  <div style={{ width: 28, color: '#8B5CF6', display: 'flex', justifyContent: 'center' }}>{item.icon}</div>
                  <div style={{ flex: 1 }}><Text style={{ fontSize: 12, color: 'var(--theme-text-secondary)' }}>{item.label}</Text></div>
                  <Text strong style={{ fontSize: 13 }}>{item.value}</Text>
                </div>
              ))}
            </div>
          </div>

          <Divider style={{ margin: '4px 0' }} />

          <div>
            <Text style={{ fontSize: 12, color: 'var(--theme-text-secondary)', display: 'block', marginBottom: 8 }}>Actions</Text>
            <Row gutter={8}>
              <Col span={12}><Button block type="primary" style={{ borderRadius: 8, background: 'linear-gradient(135deg, #8B5CF6, #EC4899)', border: 'none' }}>Confirm</Button></Col>
              <Col span={12}><Button block style={{ borderRadius: 8 }}>Reschedule</Button></Col>
              <Col span={24} style={{ marginTop: 8 }}><Button block danger style={{ borderRadius: 8 }}>Cancel Booking</Button></Col>
            </Row>
          </div>

          <Divider style={{ margin: '4px 0' }} />

          <div>
            <Text style={{ fontSize: 12, color: 'var(--theme-text-secondary)', display: 'block', marginBottom: 8 }}>Timeline</Text>
            <Timeline
              items={[
                { color: '#10B981', children: <><Text strong style={{ fontSize: 13 }}>Confirmed</Text><div style={{ fontSize: 11, color: 'var(--theme-text-secondary)' }}>2 hours ago</div></> },
                { color: '#8B5CF6', children: <><Text strong style={{ fontSize: 13 }}>Payment Verified</Text><div style={{ fontSize: 11, color: 'var(--theme-text-secondary)' }}>3 hours ago</div></> },
                { color: '#3B82F6', children: <><Text strong style={{ fontSize: 13 }}>Booking Created</Text><div style={{ fontSize: 11, color: 'var(--theme-text-secondary)' }}>Yesterday at 4:30 PM</div></> },
              ]}
            />
          </div>
        </div>
      </Drawer>
    </>
  );
}

function AppointmentContent() {
  const params = useParams();
  const slug = params?.slug as string;
  const [view, setView] = useState<'kanban' | 'calendar'>('kanban');
  const [selectedStatus, setSelectedStatus] = useState('all');
  const [calDate, setCalDate] = useState(dayjs());

  const filtered = selectedStatus === 'all' ? bookings : bookings.filter(b => b.status === selectedStatus);

  const kanbanStatuses = ['pending', 'confirmed', 'in-progress', 'completed', 'cancelled'];

  return (
    <div>
      <div className="page-header-row">
        <div>
          <h1 className="page-header-title">Appointments</h1>
          <p className="page-header-subtitle">Manage and track all your salon bookings</p>
        </div>
        <Space>
          <Input prefix={<SearchOutlined />} placeholder="Search bookings..." style={{ width: 200, borderRadius: 10 }} />
          <Button icon={<FilterOutlined />} style={{ borderRadius: 10, border: '1px solid var(--theme-border)' }}>Filters</Button>
          <div style={{
            display: 'flex', background: 'var(--theme-hover)', borderRadius: 10, padding: 2,
          }}>
            <Button type={view === 'kanban' ? 'primary' : 'text'} size="small"
              style={{ borderRadius: 8, border: 'none', background: view === 'kanban' ? 'var(--theme-surface)' : 'transparent' }}
              onClick={() => setView('kanban')}>Kanban</Button>
            <Button type={view === 'calendar' ? 'primary' : 'text'} size="small"
              style={{ borderRadius: 8, border: 'none', background: view === 'calendar' ? 'var(--theme-surface)' : 'transparent' }}
              onClick={() => setView('calendar')}>Calendar</Button>
          </div>
          <Button type="primary" icon={<PlusOutlined />} style={{ borderRadius: 10, background: 'linear-gradient(135deg, #8B5CF6, #EC4899)', border: 'none', boxShadow: '0 4px 14px rgba(139,92,246,0.3)' }}>
            New Booking
          </Button>
        </Space>
      </div>

      {view === 'kanban' ? (
        <>
          <Row gutter={[12, 12]} style={{ marginBottom: 20 }}>
            {STATUSES.map(s => (
              <Col key={s.key}>
                <div
                  onClick={() => setSelectedStatus(s.key)}
                  style={{
                    display: 'flex', alignItems: 'center', gap: 8,
                    padding: '6px 14px', borderRadius: 20, cursor: 'pointer',
                    background: selectedStatus === s.key ? (s.color || 'var(--theme-primary)') : 'var(--theme-surface)',
                    border: `1px solid ${selectedStatus === s.key ? 'transparent' : 'var(--theme-border-light)'}`,
                    transition: 'all 0.2s ease',
                  }}
                >
                  {s.color && <span style={{ width: 6, height: 6, borderRadius: '50%', background: s.color }} />}
                  <Text style={{
                    fontSize: 12, fontWeight: 600,
                    color: selectedStatus === s.key ? '#fff' : 'var(--theme-text)',
                  }}>{s.label}</Text>
                  <span style={{
                    fontSize: 11, fontWeight: 600, borderRadius: 10,
                    padding: '0 6px', minWidth: 18, textAlign: 'center',
                    background: selectedStatus === s.key ? 'rgba(255,255,255,0.2)' : 'var(--theme-hover)',
                    color: selectedStatus === s.key ? '#fff' : 'var(--theme-text-secondary)',
                  }}>{s.count}</span>
                </div>
              </Col>
            ))}
          </Row>

          <Row gutter={[16, 16]}>
            {kanbanStatuses.map(status => {
              const items = bookings.filter(b => b.status === status);
              const st = statusStyles[status] || statusStyles.pending;
              return (
                <Col xs={24} sm={12} lg={status === 'cancelled' ? 24 : 6} key={status}>
                  <div style={{
                    background: 'var(--theme-surface)', borderRadius: 16,
                    border: '1px solid var(--theme-border-light)', padding: 16,
                    minHeight: 300,
                  }}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 16, paddingBottom: 12, borderBottom: '1px solid var(--theme-border-light)' }}>
                      <Space>
                        <span style={{ width: 8, height: 8, borderRadius: '50%', background: st.color }} />
                        <Text strong style={{ fontSize: 13 }}>{st.label}</Text>
                      </Space>
                      <span style={{
                        background: st.bg, color: st.color, fontSize: 11, fontWeight: 600,
                        padding: '1px 8px', borderRadius: 10,
                      }}>{items.length}</span>
                    </div>
                    <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
                      {items.map(b => <BookingCard key={b.id} booking={b} />)}
                      {items.length === 0 && (
                        <div style={{ textAlign: 'center', padding: '24px 0', color: 'var(--theme-text-tertiary)', fontSize: 13 }}>
                          No {st.label.toLowerCase()} bookings
                        </div>
                      )}
                    </div>
                  </div>
                </Col>
              );
            })}
          </Row>
        </>
      ) : (
        <Row gutter={[20, 20]}>
          <Col xs={24} lg={16}>
            <Card className="premium-card" bodyStyle={{ padding: 16 }}>
              <Calendar
                fullscreen={false}
                style={{ borderRadius: 12 }}
                cellRender={(date) => {
                  const count = bookings.filter(b => dayjs(b.date).isSame(date, 'day')).length;
                  return count > 0 ? (
                    <div style={{ textAlign: 'center', background: 'rgba(139,92,246,0.1)', borderRadius: '50%', width: 24, height: 24, lineHeight: '24px', margin: 'auto', color: '#8B5CF6', fontWeight: 600, fontSize: 12 }}>{count}</div>
                  ) : null;
                }}
              />
            </Card>
          </Col>
          <Col xs={24} lg={8}>
            <Card className="premium-card" title={<Space><ClockCircleOutlined style={{ color: '#F59E0B' }} /><span>Day Schedule</span></Space>}>
              <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
                {bookings.filter(b => b.date === '2024-01-15').map(b => (
                  <div key={b.id} style={{ display: 'flex', alignItems: 'center', gap: 10, padding: '8px 0', borderBottom: '1px solid var(--theme-border-light)' }}>
                    <Text style={{ fontSize: 12, fontWeight: 600, width: 50, flexShrink: 0 }}>{b.time}</Text>
                    <Avatar size={28} style={{ background: b.color, borderRadius: 8, fontSize: 10 }}>{b.avatar}</Avatar>
                    <div style={{ flex: 1, minWidth: 0 }}>
                      <Text style={{ fontSize: 12 }} strong>{b.customer}</Text>
                      <div style={{ fontSize: 11, color: 'var(--theme-text-secondary)' }}>{b.service}</div>
                    </div>
                    <span style={{ width: 6, height: 6, borderRadius: '50%', background: statusStyles[b.status]?.dot }} />
                  </div>
                ))}
              </div>
            </Card>
          </Col>
        </Row>
      )}
    </div>
  );
}

export default function AppointmentPage() {
  return (
    <OwnerLayout>
      <AppointmentContent />
    </OwnerLayout>
  );
}

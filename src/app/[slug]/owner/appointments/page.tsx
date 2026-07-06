'use client';

import React, { useState } from 'react';
import { useParams } from 'next/navigation';
import {
  Row, Col, Card, Tag, Typography, Button, Space, Avatar,
  Calendar, Select, Input, Drawer, Divider, Timeline, Tooltip, Badge,
} from 'antd';
import PillFilter from '@/components/pill-filter';
import {
  CalendarOutlined, PlusOutlined,
  ClockCircleOutlined, UserOutlined, ScissorOutlined,
  CheckCircleOutlined, CloseCircleOutlined, MoreOutlined,
  SearchOutlined, FilterOutlined,
  ArrowLeftOutlined, ArrowRightOutlined,
  FileTextOutlined, WalletOutlined, TeamOutlined,
  StarOutlined, PhoneOutlined, MailOutlined,
} from '@ant-design/icons';
import dayjs from 'dayjs';

const { Text } = Typography;

const STATUSES = [
  { key: 'all', label: 'All', count: 48 },
  { key: 'pending', label: 'Pending', count: 12 },
  { key: 'confirmed', label: 'Confirmed', count: 18 },
  { key: 'in-progress', label: 'In Progress', count: 6 },
  { key: 'completed', label: 'Completed', count: 8 },
  { key: 'cancelled', label: 'Cancelled', count: 4 },
];

const bookings = [
  { id: 'B001', customer: 'Sarah Johnson', service: 'Haircut & Styling', staff: 'Ananya', time: '09:00', endTime: '10:00', date: '2024-01-15', status: 'confirmed', amount: 1500, avatar: 'SJ', color: 'var(--salon-primary)', phone: '+91 98765 43210', email: 'sarah@email.com' },
  { id: 'B002', customer: 'Priya Sharma', service: 'Facial Treatment', staff: 'Priya', time: '10:00', endTime: '11:30', date: '2024-01-15', status: 'confirmed', amount: 2200, avatar: 'PS', color: '#B8986B', phone: '+91 98765 43211', email: 'priya@email.com' },
  { id: 'B003', customer: 'Amrita Singh', service: 'Manicure & Pedicure', staff: 'Ananya', time: '10:30', endTime: '11:30', date: '2024-01-15', status: 'in-progress', amount: 1800, avatar: 'AS', color: '#8B7D6B', phone: '+91 98765 43212', email: 'amrita@email.com' },
  { id: 'B004', customer: 'Neha Gupta', service: 'Hair Coloring', staff: 'Vikram', time: '11:30', endTime: '13:30', date: '2024-01-15', status: 'pending', amount: 3500, avatar: 'NG', color: '#5B7A6B', phone: '+91 98765 43213', email: 'neha@email.com' },
  { id: 'B005', customer: 'Ritu Patel', service: 'Massage Therapy', staff: 'Priya', time: '13:00', endTime: '14:00', date: '2024-01-15', status: 'pending', amount: 2500, avatar: 'RP', color: '#A0886B', phone: '+91 98765 43214', email: 'ritu@email.com' },
  { id: 'B006', customer: 'Deepa Verma', service: 'Bridal Makeup', staff: 'Ananya', time: '14:00', endTime: '16:00', date: '2024-01-15', status: 'confirmed', amount: 5000, avatar: 'DV', color: '#7A6B5A', phone: '+91 98765 43215', email: 'deepa@email.com' },
  { id: 'B007', customer: 'Kavita Reddy', service: 'Haircut & Styling', staff: 'Rahul', time: '15:00', endTime: '16:00', date: '2024-01-15', status: 'pending', amount: 1200, avatar: 'KR', color: '#5B8C5A', phone: '+91 98765 43216', email: 'kavita@email.com' },
  { id: 'B008', customer: 'Meera Nair', service: 'Facial Treatment', staff: 'Priya', time: '16:00', endTime: '17:00', date: '2024-01-15', status: 'confirmed', amount: 2000, avatar: 'MN', color: '#8B7A6B', phone: '+91 98765 43217', email: 'meera@email.com' },
  { id: 'B011', customer: 'Rohit Malhotra', service: 'Beard Trim', staff: 'Rahul', time: '14:30', endTime: '15:00', date: '2024-01-15', status: 'cancelled', amount: 400, avatar: 'RM', color: '#8B7D6B', phone: '+91 98765 43220', email: 'rohit@email.com' },
  { id: 'B012', customer: 'Pooja Mehta', service: 'Facial & Cleanup', staff: 'Priya', time: '17:00', endTime: '18:30', date: '2024-01-15', status: 'in-progress', amount: 2800, avatar: 'PM', color: '#5B7A6B', phone: '+91 98765 43221', email: 'pooja@email.com' },
];

const statusStyles: Record<string, { label: string; color: string; bg: string }> = {
  pending: { label: 'Pending', color: 'var(--salon-primary)', bg: 'color-mix(in srgb, var(--salon-primary) 8%, transparent)' },
  confirmed: { label: 'Confirmed', color: '#8B7D6B', bg: 'color-mix(in srgb, #8B7D6B 8%, transparent)' },
  'in-progress': { label: 'In Progress', color: '#B8986B', bg: 'color-mix(in srgb, #B8986B 8%, transparent)' },
  completed: { label: 'Completed', color: '#5B7A6B', bg: 'color-mix(in srgb, #5B7A6B 8%, transparent)' },
  cancelled: { label: 'Cancelled', color: '#7A6B5A', bg: 'color-mix(in srgb, #7A6B5A 8%, transparent)' },
};

const staffList = ['All Staff', 'Ananya', 'Rahul', 'Priya', 'Vikram'];
const serviceList = ['All Services', 'Haircut & Styling', 'Facial Treatment', 'Manicure & Pedicure', 'Hair Coloring', 'Massage Therapy', 'Bridal Makeup'];

function BookingCard({ booking, compact }: { booking: typeof bookings[0]; compact?: boolean }) {
  const [showDrawer, setShowDrawer] = useState(false);
  const st = statusStyles[booking.status] || statusStyles.pending;

  return (
    <>
      <div onClick={() => setShowDrawer(true)} style={{
        background: 'var(--theme-surface)', borderRadius: 12,
        border: '1px solid var(--theme-border-light)', padding: compact ? 12 : 14, cursor: 'pointer',
        transition: 'all 0.2s ease',
      }}
        onMouseEnter={e => { e.currentTarget.style.borderColor = st.color; e.currentTarget.style.boxShadow = `0 4px 16px ${st.color}15`; }}
        onMouseLeave={e => { e.currentTarget.style.borderColor = 'var(--theme-border-light)'; e.currentTarget.style.boxShadow = 'none'; }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: compact ? 8 : 10 }}>
          <Space>
            <Avatar size={compact ? 28 : 34} style={{ background: booking.color, borderRadius: 8, fontSize: compact ? 10 : 12, fontWeight: 600 }}>{booking.avatar}</Avatar>
            <div>
              <Text strong style={{ fontSize: compact ? 12 : 13 }}>{booking.customer}</Text>
              <div style={{ fontSize: compact ? 10 : 11, color: 'var(--theme-text-secondary)' }}>{booking.service}</div>
            </div>
          </Space>
          <span style={{ padding: '1px 8px', borderRadius: 20, fontSize: 10, fontWeight: 600, background: st.bg, color: st.color, display: 'inline-flex', alignItems: 'center', gap: 3 }}>
            <span style={{ width: 4, height: 4, borderRadius: '50%', background: st.color }} />
            {st.label}
          </span>
        </div>
        <div style={{ display: 'flex', gap: compact ? 8 : 12, fontSize: 11, color: 'var(--theme-text-secondary)', flexWrap: 'wrap' }}>
          <span><ClockCircleOutlined style={{ marginRight: 3 }} />{booking.time} - {booking.endTime}</span>
          {!compact && <span><UserOutlined style={{ marginRight: 3 }} />{booking.staff}</span>}
          {!compact && <span style={{ color: 'var(--salon-primary)', fontWeight: 600 }}>₹{booking.amount.toLocaleString()}</span>}
        </div>
      </div>

      <Drawer title={
        <Space>
          <Avatar size={40} style={{ background: booking.color, borderRadius: 10, fontSize: 14, fontWeight: 600 }}>{booking.avatar}</Avatar>
          <div><Text strong style={{ fontSize: 16 }}>{booking.customer}</Text><div style={{ fontSize: 11, color: 'var(--theme-text-secondary)' }}>Booking #{booking.id}</div></div>
        </Space>
      } placement="right" width={460} open={showDrawer} onClose={() => setShowDrawer(false)} styles={{ body: { padding: '20px 24px' } }}>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 20 }}>
          <div style={{ background: st.bg, borderRadius: 12, padding: '12px 16px', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <div>
              <Text style={{ fontSize: 11, color: 'var(--theme-text-secondary)' }}>Status</Text>
              <div style={{ display: 'flex', alignItems: 'center', gap: 6, marginTop: 2 }}>
                <span style={{ width: 6, height: 6, borderRadius: '50%', background: st.color }} />
                <Text strong style={{ color: st.color, fontSize: 14 }}>{st.label}</Text>
              </div>
            </div>
            <Select defaultValue={booking.status} size="small" style={{ width: 130 }}
              options={STATUSES.filter(s => s.key !== 'all').map(s => ({ value: s.key, label: s.label }))} />
          </div>

          <Divider style={{ margin: '4px 0' }} />

          <div>
            <Text style={{ fontSize: 11, color: 'var(--theme-text-secondary)', display: 'block', marginBottom: 10, textTransform: 'uppercase', letterSpacing: 0.5 }}>Customer Info</Text>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
              {[
                { icon: <PhoneOutlined />, label: 'Phone', value: booking.phone },
                { icon: <MailOutlined />, label: 'Email', value: booking.email },
                { icon: <UserOutlined />, label: 'Staff', value: booking.staff },
              ].map((item, i) => (
                <div key={i} style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
                  <div style={{ width: 24, color: 'var(--salon-primary)', fontSize: 13 }}>{item.icon}</div>
                  <Text style={{ fontSize: 12, color: 'var(--theme-text-secondary)', width: 50 }}>{item.label}</Text>
                  <Text style={{ fontSize: 13 }}>{item.value}</Text>
                </div>
              ))}
            </div>
          </div>

          <Divider style={{ margin: '4px 0' }} />

          <div>
            <Text style={{ fontSize: 11, color: 'var(--theme-text-secondary)', display: 'block', marginBottom: 10, textTransform: 'uppercase', letterSpacing: 0.5 }}>Booking Details</Text>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
              {[
                { icon: <CalendarOutlined />, label: 'Date', value: dayjs(booking.date).format('DD MMM YYYY') },
                { icon: <ClockCircleOutlined />, label: 'Time', value: `${booking.time} - ${booking.endTime}` },
                { icon: <ScissorOutlined />, label: 'Service', value: booking.service },
                { icon: <WalletOutlined />, label: 'Amount', value: `₹${booking.amount.toLocaleString()}` },
              ].map((item, i) => (
                <div key={i} style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
                  <div style={{ width: 24, color: 'var(--salon-primary)', fontSize: 13 }}>{item.icon}</div>
                  <Text style={{ fontSize: 12, color: 'var(--theme-text-secondary)', width: 50 }}>{item.label}</Text>
                  <Text strong style={{ fontSize: 13 }}>{item.value}</Text>
                </div>
              ))}
            </div>
          </div>

          <Divider style={{ margin: '4px 0' }} />

          <div>
            <Text style={{ fontSize: 11, color: 'var(--theme-text-secondary)', display: 'block', marginBottom: 10, textTransform: 'uppercase', letterSpacing: 0.5 }}>Actions</Text>
            <Row gutter={8}>
              <Col span={12}>              <Button block type="primary" style={{ borderRadius: 8 }}>Confirm</Button></Col>
              <Col span={12}><Button block style={{ borderRadius: 8 }}>Reschedule</Button></Col>
              <Col span={24} style={{ marginTop: 8 }}><Button block danger style={{ borderRadius: 8 }} icon={<CloseCircleOutlined />}>Cancel Booking</Button></Col>
            </Row>
          </div>

          <Divider style={{ margin: '4px 0' }} />

          <div>
            <Text style={{ fontSize: 11, color: 'var(--theme-text-secondary)', display: 'block', marginBottom: 10, textTransform: 'uppercase', letterSpacing: 0.5 }}>Timeline</Text>
            <Timeline items={[
              { color: '#5B8C5A', children: <><Text strong style={{ fontSize: 13 }}>Confirmed</Text><div style={{ fontSize: 11, color: 'var(--theme-text-secondary)' }}>2 hours ago</div></> },
              { color: 'var(--salon-primary)', children: <><Text strong style={{ fontSize: 13 }}>Payment Verified</Text><div style={{ fontSize: 11, color: 'var(--theme-text-secondary)' }}>3 hours ago</div></> },
              { color: 'var(--salon-primary)', children: <><Text strong style={{ fontSize: 13 }}>Booking Created</Text><div style={{ fontSize: 11, color: 'var(--theme-text-secondary)' }}>Yesterday at 4:30 PM</div></> },
            ]} />
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
  const [staffFilter, setStaffFilter] = useState('All Staff');
  const [serviceFilter, setServiceFilter] = useState('All Services');

  const filtered = bookings.filter(b => {
    if (selectedStatus !== 'all' && b.status !== selectedStatus) return false;
    if (staffFilter !== 'All Staff' && b.staff !== staffFilter) return false;
    if (serviceFilter !== 'All Services' && b.service !== serviceFilter) return false;
    return true;
  });

  const kanbanStatuses = ['pending', 'confirmed', 'in-progress', 'completed', 'cancelled'];
  const todayTotal = bookings.reduce((s, b) => s + b.amount, 0);

  return (
    <div>
      <div className="page-header-row">
        <div>
          <h1 className="page-header-title">Appointments</h1>
          <p className="page-header-subtitle">Manage and track all your salon bookings</p>
        </div>
        <Space>
          <Input prefix={<SearchOutlined />} placeholder="Search bookings..." style={{ width: 200, borderRadius: 10 }} />
          <Select value={staffFilter} onChange={setStaffFilter} style={{ width: 120, borderRadius: 10 }}
            options={staffList.map(s => ({ value: s, label: s }))} />
          <Select value={serviceFilter} onChange={setServiceFilter} style={{ width: 150, borderRadius: 10 }}
            options={serviceList.map(s => ({ value: s, label: s }))} />
          <div style={{ display: 'flex', background: 'var(--theme-hover)', borderRadius: 10, padding: 2 }}>
            <Button size="small"
              style={{ borderRadius: 8, border: 'none', background: view === 'kanban' ? 'var(--salon-primary)' : 'transparent', color: view === 'kanban' ? '#fff' : 'var(--theme-text-secondary)' }}
              onClick={() => setView('kanban')}>Kanban</Button>
            <Button size="small"
              style={{ borderRadius: 8, border: 'none', background: view === 'calendar' ? 'var(--salon-primary)' : 'transparent', color: view === 'calendar' ? '#fff' : 'var(--theme-text-secondary)' }}
              onClick={() => setView('calendar')}>Calendar</Button>
          </div>
          <Button type="primary" icon={<PlusOutlined />}
            style={{ borderRadius: 10 }}>
            New Booking
          </Button>
        </Space>
      </div>

      <Row gutter={[16, 16]} style={{ marginBottom: 24 }}>
        {[
          { value: `₹${todayTotal.toLocaleString()}`, label: 'Today\'s Revenue', icon: <WalletOutlined />, color: 'var(--salon-primary)', bg: 'color-mix(in srgb, var(--salon-primary) 10%, transparent)' },
          { value: bookings.length.toString(), label: 'Total Bookings', icon: <CalendarOutlined />, color: 'var(--salon-primary)', bg: 'color-mix(in srgb, var(--salon-primary) 10%, transparent)' },
          { value: bookings.filter(b => b.status === 'completed').length.toString(), label: 'Completed', icon: <CheckCircleOutlined />, color: 'var(--salon-primary)', bg: 'color-mix(in srgb, var(--salon-primary) 10%, transparent)' },
          { value: bookings.filter(b => b.status === 'pending').length.toString(), label: 'Awaiting', icon: <ClockCircleOutlined />, color: 'var(--salon-secondary)', bg: 'color-mix(in srgb, var(--salon-secondary) 10%, transparent)' },
        ].map((kpi, i) => (
          <Col xs={12} sm={6} lg={3} key={i}>
            <div className="stat-widget" style={{ borderTop: `3px solid ${kpi.color}` }}>
              <div className="stat-widget-header">
                <div className="stat-widget-icon" style={{ background: kpi.bg, color: kpi.color }}>{kpi.icon}</div>
              </div>
              <div className="stat-widget-label">{kpi.label}</div>
              <div className="stat-widget-value">{kpi.value}</div>
            </div>
          </Col>
        ))}
      </Row>

      {view === 'kanban' ? (
        <>
          <PillFilter
            options={STATUSES}
            value={selectedStatus}
            onChange={setSelectedStatus}
            style={{ marginBottom: 20 }}
          />

          <Row gutter={[16, 16]}>
            {kanbanStatuses.map(status => {
              const items = filtered.filter(b => b.status === status);
              const st = statusStyles[status] || statusStyles.pending;
              return (
                <Col xs={24} sm={12} lg={status === 'cancelled' ? 24 : 6} key={status}>
                  <div style={{ background: 'var(--theme-surface)', borderRadius: 16, border: '1px solid var(--theme-border-light)', padding: 16, minHeight: 300 }}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 14, paddingBottom: 10, borderBottom: '1px solid var(--theme-border-light)' }}>
                      <Space>
                        <span style={{ width: 8, height: 8, borderRadius: '50%', background: st.color }} />
                        <Text strong style={{ fontSize: 13 }}>{st.label}</Text>
                      </Space>
                      <Badge count={items.length} style={{ background: st.bg, color: st.color, fontSize: 10, fontWeight: 600, border: 'none', boxShadow: 'none' }} />
                    </div>
                    <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
                      {items.map(b => <BookingCard key={b.id} booking={b} />)}
                      {items.length === 0 && (
                        <div style={{ textAlign: 'center', padding: '32px 0', color: 'var(--theme-text-tertiary)', fontSize: 13 }}>
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
              <Calendar fullscreen={false} style={{ borderRadius: 12 }}
                cellRender={(date) => {
                  const count = bookings.filter(b => dayjs(b.date).isSame(date, 'day')).length;
                  return count > 0 ? (
                    <div style={{ textAlign: 'center', background: 'color-mix(in srgb, var(--salon-primary) 10%, transparent)', borderRadius: '50%', width: 24, height: 24, lineHeight: '24px', margin: 'auto', color: 'var(--salon-primary)', fontWeight: 600, fontSize: 12 }}>{count}</div>
                  ) : null;
                }} />
            </Card>
          </Col>
          <Col xs={24} lg={8}>
            <Card className="premium-card" title={<Space><ClockCircleOutlined style={{ color: 'var(--salon-secondary)' }} /><span>Day Schedule</span></Space>}>
              <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
                {bookings
                  .sort((a, b) => a.time.localeCompare(b.time))
                  .map(b => (
                    <div key={b.id} style={{ display: 'flex', alignItems: 'center', gap: 8, padding: '6px 0', borderBottom: '1px solid var(--theme-border-light)' }}>
                      <div style={{ width: 44, flexShrink: 0 }}>
                        <Text style={{ fontSize: 11, fontWeight: 600, color: 'var(--theme-text)' }}>{b.time}</Text>
                        <div style={{ fontSize: 10, color: 'var(--theme-text-tertiary)' }}>{b.endTime}</div>
                      </div>
                      <Avatar size={26} style={{ background: b.color, borderRadius: 6, fontSize: 9, flexShrink: 0 }}>{b.avatar}</Avatar>
                      <div style={{ flex: 1, minWidth: 0 }}>
                        <Text style={{ fontSize: 12, fontWeight: 600 }}>{b.customer}</Text>
                        <div style={{ fontSize: 10, color: 'var(--theme-text-secondary)' }}>{b.service}</div>
                      </div>
                      <span style={{ width: 6, height: 6, borderRadius: '50%', background: statusStyles[b.status]?.color, flexShrink: 0 }} />
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
  return <AppointmentContent />;
}

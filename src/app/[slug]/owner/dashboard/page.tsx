'use client';

import React, { useEffect, useState } from 'react';
import { useParams, useRouter } from 'next/navigation';
import {
  Row, Col, Card, Tag, Typography, Alert, Spin, Table, Space, Button, Avatar, Dropdown,
  Tooltip, Progress,
} from 'antd';
import {
  CalendarOutlined, ScissorOutlined,
  GlobalOutlined, ArrowUpOutlined, ArrowDownOutlined,
  ClockCircleOutlined, UserOutlined, StarOutlined,
  TeamOutlined, RiseOutlined, WalletOutlined,
  CloseCircleOutlined, MoreOutlined,
  ExclamationCircleOutlined, GiftOutlined,
  PlusOutlined, RightOutlined,
  ShoppingCartOutlined, TrophyOutlined, PercentageOutlined,
  ReloadOutlined, SkinOutlined, CoffeeOutlined,
  ShopOutlined, CheckCircleOutlined, AlertOutlined,
} from '@ant-design/icons';
import Link from 'next/link';
import OwnerLayout from '../../../../components/layout/OwnerLayout';
import apiUtil from '../../../../utils/api';
import { ApiOwnerSalon, ApiOwnerAppointments, ApiAuthProfile } from '../../../../utils/api.constant';
import { eResultCode } from '../../../../utils/enum';
import PillFilter from '@/components/pill-filter';
import Utils from '../../../../utils';
import dayjs from 'dayjs';

const { Text } = Typography;

interface Salon {
  id: string; name: string; slug: string; city?: string;
  planType: string; subscriptionStatus: string; subscriptionExpiry: string;
  _count?: { appointments: number }; services?: any[];
}

interface Appointment {
  id: string; customerName: string; startTime: string; endTime?: string;
  appointmentDate: string; status: string;
  service: { name: string; price: number }; staffName?: string;
}

const STATUS_STYLE: Record<string, { color: string; bg: string; label: string }> = {
  BOOKED: { color: '#4A2D5E', bg: 'rgba(74,45,94,0.08)', label: 'Booked' },
  CONFIRMED: { color: '#7C1D3E', bg: 'rgba(124,29,62,0.08)', label: 'Confirmed' },
  COMPLETED: { color: '#2D5E3A', bg: 'rgba(45,94,58,0.08)', label: 'Completed' },
  CANCELLED: { color: '#5C3A1E', bg: 'rgba(92,58,30,0.08)', label: 'Cancelled' },
  NO_SHOW: { color: '#C9953F', bg: 'rgba(201,149,63,0.08)', label: 'No Show' },
  IN_PROGRESS: { color: '#C9953F', bg: 'rgba(201,149,63,0.08)', label: 'In Progress' },
};

const weeklyData = [
  { day: 'Mon', bookings: 12, revenue: 14400 },
  { day: 'Tue', bookings: 18, revenue: 21600 },
  { day: 'Wed', bookings: 15, revenue: 18000 },
  { day: 'Thu', bookings: 22, revenue: 26400 },
  { day: 'Fri', bookings: 28, revenue: 33600 },
  { day: 'Sat', bookings: 35, revenue: 42000 },
  { day: 'Sun', bookings: 20, revenue: 24000 },
];

const staffPerformance = [
  { name: 'Ananya', role: 'Senior Stylist', bookings: 45, revenue: 67500, rating: 4.9, avatar: 'A', color: '#7C1D3E' },
  { name: 'Rahul', role: 'Barber', bookings: 38, revenue: 45600, rating: 4.7, avatar: 'R', color: '#C9953F' },
  { name: 'Priya', role: 'Esthetician', bookings: 32, revenue: 51200, rating: 4.8, avatar: 'P', color: '#4A2D5E' },
  { name: 'Vikram', role: 'Colorist', bookings: 28, revenue: 50400, rating: 4.6, avatar: 'V', color: '#1A5C5C' },
];

const popularServices = [
  { name: 'Haircut & Styling', bookings: 128, revenue: 38400, growth: 12 },
  { name: 'Facial Treatment', bookings: 94, revenue: 37600, growth: 8 },
  { name: 'Manicure & Pedicure', bookings: 76, revenue: 22800, growth: -3 },
  { name: 'Hair Coloring', bookings: 62, revenue: 31000, growth: 15 },
  { name: 'Massage Therapy', bookings: 48, revenue: 28800, growth: 5 },
];

const recentActivities = [
  { time: '2 min ago', text: 'Sarah Johnson booked Haircut & Styling', type: 'booking' },
  { time: '15 min ago', text: 'Payment of ₹1,200 received from Priya Sharma', type: 'payment' },
  { time: '1 hour ago', text: 'New customer Amrita Singh registered', type: 'customer' },
  { time: '2 hours ago', text: 'Staff schedule updated for next week', type: 'staff' },
  { time: '3 hours ago', text: 'Appointment cancelled: Meera Patel', type: 'cancel' },
];

const quickActions = [
  { icon: <PlusOutlined />, label: 'New Booking', href: '#', color: '#7C1D3E', bg: 'rgba(124,29,62,0.1)' },
  { icon: <UserOutlined />, label: 'Add Customer', href: '#', color: '#C9953F', bg: 'rgba(201,149,63,0.1)' },
  { icon: <ScissorOutlined />, label: 'Add Service', href: '#', color: '#7C1D3E', bg: 'rgba(124,29,62,0.1)' },
  { icon: <GiftOutlined />, label: 'Promotions', href: '#', color: '#C9953F', bg: 'rgba(201,149,63,0.1)' },
];

function StatusBadge({ status }: { status: string }) {
  const s = STATUS_STYLE[status] || { color: '#5C3A4A', bg: 'rgba(92,58,74,0.08)', label: status };
  return (
    <span style={{ display: 'inline-flex', alignItems: 'center', gap: 4, padding: '2px 10px', borderRadius: 20, fontSize: 11, fontWeight: 600, background: s.bg, color: s.color }}>
      <span style={{ width: 5, height: 5, borderRadius: '50%', background: s.color }} />
      {s.label}
    </span>
  );
}

function DashboardContent() {
  const params = useParams();
  const router = useRouter();
  const slug = params?.slug as string;

  const [salon, setSalon] = useState<Salon | null>(null);
  const [appointments, setAppointments] = useState<Appointment[]>([]);
  const [userName, setUserName] = useState('');
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState('today');
  const [chartView, setChartView] = useState<'weekly' | 'monthly'>('weekly');

  useEffect(() => {
    const decoded = Utils.decodeToken();
    const role = decoded?.role;
    if (role !== 'SALON_OWNER' && role !== 'SALON_STAFF' && role !== 'ADMIN' && role !== 'SUPER_ADMIN') {
      router.push(`/${slug}/owner/login`);
      return;
    }
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      setLoading(true);
      const [salonRes, profileRes] = await Promise.all([
        apiUtil.get(ApiOwnerSalon),
        apiUtil.get(ApiAuthProfile).catch(() => null),
      ]);
      if (profileRes?.data?.name) setUserName(profileRes.data.name);
      const salonCode = salonRes?.dataResponse?.returnCode;
      if (salonCode === eResultCode.SUCCESS || salonCode === eResultCode.CREATED) {
        const data = salonRes.data;
        if (data.slug !== slug) { router.push('/owner/dashboard'); return; }
        setSalon(data);
        const today = dayjs().format('YYYY-MM-DD');
        const apptRes = await apiUtil.get(`${ApiOwnerAppointments(data.id)}?date=${today}&pageSize=10`);
        const apptCode = apptRes?.dataResponse?.returnCode;
        if (apptCode === eResultCode.SUCCESS || apptCode === eResultCode.CREATED) {
          setAppointments(apptRes.data?.appointments || apptRes.data || []);
        }
      }
    } catch { /* silent */ } finally { setLoading(false); }
  };

  if (loading) {
    return (
      <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', minHeight: '60vh' }}>
        <Spin size="large" />
      </div>
    );
  }

  if (!salon) return null;

  const isExpired = salon.subscriptionExpiry && new Date(salon.subscriptionExpiry) < new Date();
  const daysLeft = salon.subscriptionExpiry ? Math.max(0, dayjs(salon.subscriptionExpiry).diff(dayjs(), 'day')) : 0;
  const totalRevenue = appointments.reduce((sum, a) => sum + (a.service?.price || 0), 0);
  const completedCount = appointments.filter(a => a.status === 'COMPLETED').length;

  const appointmentColumns = [
    { title: 'Customer', dataIndex: 'customerName', key: 'customerName',
        render: (name: string) => (
          <Space><Avatar size={28} style={{ background: 'linear-gradient(135deg, #7C1D3E, #C9953F)', fontSize: 11, flexShrink: 0 }}>{name?.charAt(0) || '?'}</Avatar><Text strong style={{ fontSize: 13 }}>{name}</Text></Space>
        ),
    },
    { title: 'Service', dataIndex: ['service', 'name'], key: 'service', render: (n: string) => <Text style={{ fontSize: 13 }}>{n}</Text> },
    { title: 'Time', dataIndex: 'startTime', key: 'startTime', render: (t: string) => <Text style={{ fontSize: 13 }}>{t}</Text> },
    { title: 'Status', dataIndex: 'status', key: 'status', render: (s: string) => <StatusBadge status={s} /> },
    { title: 'Price', dataIndex: ['service', 'price'], key: 'price', render: (p: number) => <Text strong style={{ fontSize: 13, color: '#1A5C5C' }}>₹{p?.toLocaleString() || 0}</Text> },
    { key: 'actions', width: 48, render: () => <Button type="text" size="small" icon={<MoreOutlined />} style={{ borderRadius: 6 }} /> },
  ];

  return (
    <div>
      {isExpired && (
        <Alert type="error" title={<Space><ExclamationCircleOutlined /><span><strong>Subscription Expired</strong> — Renew to reactivate your salon website.</span></Space>}
          action={<Link href={`/${slug}/subscription`}><Button type="primary" danger size="small" ghost>Renew Now</Button></Link>}
          showIcon={false} style={{ marginBottom: 20, borderRadius: 12, border: '1px solid rgba(124,29,62,0.25)', background: 'rgba(124,29,62,0.05)' }} />
      )}
      {!isExpired && daysLeft <= 7 && daysLeft > 0 && (
        <Alert type="warning" title={<Space><ClockCircleOutlined /><span>Subscription expires in <strong>{daysLeft} days</strong></span></Space>}
          action={<Link href={`/${slug}/subscription`}><Button size="small" type="primary" ghost>Renew Plan</Button></Link>}
          showIcon={false} style={{ marginBottom: 20, borderRadius: 12, border: '1px solid rgba(201,149,63,0.3)', background: 'rgba(201,149,63,0.06)' }} />
      )}

      <div className="page-header-row">
        <div>
          <h1 className="page-header-title">Welcome back, {userName || salon?.name?.split(' ')[0] || 'Guest'}</h1>
          <p className="page-header-subtitle">{dayjs().format('dddd, D MMMM YYYY')} · {salon.city || 'Your Salon'}</p>
        </div>
        <Space>
          <Link href={`/${salon.slug}`} target="_blank">
            <Button icon={<GlobalOutlined />} style={{ borderRadius: 10, border: '1px solid var(--theme-border)' }}>View Salon</Button>
          </Link>
          <Link href={`/${slug}/appointments`}>
            <Button type="primary" icon={<CalendarOutlined />} style={{ borderRadius: 10, background: 'linear-gradient(135deg, #7C1D3E, #C9953F)', border: 'none', boxShadow: '0 4px 14px rgba(124,29,62,0.3)' }}>
              Manage Bookings
            </Button>
          </Link>
        </Space>
      </div>

      <Row gutter={[16, 16]} style={{ marginBottom: 24 }}>
        {[
          { value: `₹${totalRevenue.toLocaleString()}`, label: 'Today\'s Revenue', icon: <WalletOutlined />, color: '#7C1D3E', bg: 'rgba(124,29,62,0.1)', trend: '+12%', accent: '#7C1D3E' },
          { value: appointments.length.toString(), label: 'Appointments', icon: <CalendarOutlined />, color: '#C9953F', bg: 'rgba(201,149,63,0.1)', trend: `${completedCount} completed`, accent: '#C9953F' },
          { value: '3', label: 'Walk-ins', icon: <UserOutlined />, color: '#2D5E3A', bg: 'rgba(45,94,58,0.1)', trend: '+2 today', accent: '#2D5E3A' },
          { value: '₹350', label: 'Avg. Ticket', icon: <ShoppingCartOutlined />, color: '#7C1D3E', bg: 'rgba(124,29,62,0.1)', trend: '+8%', accent: '#7C1D3E' },
          { value: '1,284', label: 'Total Customers', icon: <TeamOutlined />, color: '#C9953F', bg: 'rgba(201,149,63,0.1)', trend: '+12 this week', accent: '#C9953F' },
          { value: '68%', label: 'Retention Rate', icon: <PercentageOutlined />, color: '#7C1D3E', bg: 'rgba(124,29,62,0.1)', trend: '+5%', accent: '#7C1D3E' },
          { value: '₹10.2K', label: 'Monthly Revenue', icon: <RiseOutlined />, color: '#C9953F', bg: 'rgba(201,149,63,0.1)', trend: '+18% vs last month', accent: '#C9953F' },
          { value: '42', label: 'Memberships', icon: <GiftOutlined />, color: '#7C1D3E', bg: 'rgba(124,29,62,0.1)', trend: '+3 this month', accent: '#7C1D3E' },
        ].map((kpi, i) => (
          <Col xs={12} sm={12} md={6} lg={3} key={i}>
            <div className="stat-widget" style={{ borderTop: `3px solid ${kpi.accent}` }}>
              <div className="stat-widget-header">
                <div className="stat-widget-icon" style={{ background: kpi.bg, color: kpi.color }}>{kpi.icon}</div>
              </div>
              <div className="stat-widget-label">{kpi.label}</div>
              <div className="stat-widget-value">{kpi.value}</div>
              <div className="stat-widget-trend" style={{ color: kpi.trend.startsWith('+') ? '#2D5E3A' : '#7C1D3E', background: kpi.trend.startsWith('+') ? 'rgba(45,94,58,0.1)' : 'rgba(124,29,62,0.1)', marginTop: 6 }}>{kpi.trend}</div>
            </div>
          </Col>
        ))}
      </Row>

      <Row gutter={[20, 20]} style={{ marginBottom: 24 }}>
        <Col xs={24} lg={16}>
          <Card className="premium-card" bodyStyle={{ padding: 0 }}>
            <div style={{ padding: '18px 20px', borderBottom: '1px solid var(--theme-border-light)', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <div>
                <Text strong style={{ fontSize: 15 }}>Revenue Overview</Text>
                <div style={{ fontSize: 12, color: 'var(--theme-text-secondary)', marginTop: 2 }}>
                  {chartView === 'weekly' ? 'This week vs last week' : 'This month vs last month'}
                </div>
              </div>
              <PillFilter
                options={[{ key: 'weekly', label: 'Weekly' }, { key: 'monthly', label: 'Monthly' }]}
                value={chartView}
                onChange={v => setChartView(v as 'weekly' | 'monthly')}
              />
            </div>
            <div style={{ padding: '20px' }}>
              <div style={{ display: 'flex', alignItems: 'flex-end', gap: 8, height: 140 }}>
                {weeklyData.map((d, i) => {
                  const max = Math.max(...weeklyData.map(x => x.revenue));
                  const heightPct = (d.revenue / max) * 100;
                  const isToday = i === weeklyData.length - 1;
                  return (
                    <Tooltip key={i} title={`${d.day}: ₹${d.revenue.toLocaleString()} · ${d.bookings} bookings`}>
                      <div style={{ flex: 1, display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 6, height: '100%', justifyContent: 'flex-end' }}>
                        <div style={{
                          width: '100%', maxWidth: 40, height: `${heightPct}%`, minHeight: 6,
                          borderRadius: '8px 8px 4px 4px',
                          background: isToday ? 'linear-gradient(180deg, #7C1D3E 0%, #C9953F 100%)' : 'linear-gradient(180deg, rgba(124,29,62,0.35) 0%, rgba(124,29,62,0.12) 100%)',
                          transition: 'height 0.3s ease', position: 'relative',
                        }}>
                          {isToday && <div style={{ position: 'absolute', top: -22, left: '50%', transform: 'translateX(-50%)', background: '#7C1D3E', color: '#fff', fontSize: 9, padding: '2px 6px', borderRadius: 4, whiteSpace: 'nowrap', fontWeight: 600 }}>₹{d.revenue.toLocaleString()}</div>}
                        </div>
                        <Text style={{ fontSize: 10, color: 'var(--theme-text-secondary)', fontWeight: isToday ? 600 : 400 }}>{d.day}</Text>
                      </div>
                    </Tooltip>
                  );
                })}
              </div>
              <div style={{ marginTop: 20, display: 'flex', gap: 28 }}>
                <div><Text style={{ fontSize: 11, color: 'var(--theme-text-secondary)' }}>Total Revenue</Text><br /><Text strong style={{ fontSize: 20, fontFamily: 'LexendSemiBold, sans-serif' }}>₹{weeklyData.reduce((s, d) => s + d.revenue, 0).toLocaleString()}</Text></div>
                <div><Text style={{ fontSize: 11, color: 'var(--theme-text-secondary)' }}>Total Bookings</Text><br /><Text strong style={{ fontSize: 20 }}>{weeklyData.reduce((s, d) => s + d.bookings, 0)}</Text></div>
                <div><Text style={{ fontSize: 11, color: 'var(--theme-text-secondary)' }}>Avg. Daily</Text><br /><Text strong style={{ fontSize: 20 }}>₹{Math.round(weeklyData.reduce((s, d) => s + d.revenue, 0) / 7).toLocaleString()}</Text></div>
              </div>
            </div>
          </Card>
        </Col>

        <Col xs={24} lg={8}>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
            <Text strong style={{ fontSize: 15, color: 'var(--theme-text)' }}>Quick Actions</Text>
            <Row gutter={[12, 12]}>
              {quickActions.map((action, i) => (
                <Col span={12} key={i}>
                  <div style={{ background: 'var(--theme-surface)', borderRadius: 14, border: '1px solid var(--theme-border-light)', padding: 16, textAlign: 'center', cursor: 'pointer', transition: 'all 0.2s ease' }}
                    onMouseEnter={e => { e.currentTarget.style.borderColor = action.color; e.currentTarget.style.boxShadow = `0 4px 20px ${action.color}15`; }}
                    onMouseLeave={e => { e.currentTarget.style.borderColor = 'var(--theme-border-light)'; e.currentTarget.style.boxShadow = 'none'; }}>
                    <div style={{ width: 36, height: 36, borderRadius: 10, background: action.bg, color: action.color, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 16, margin: '0 auto 8px' }}>{action.icon}</div>
                    <Text style={{ fontSize: 12, fontWeight: 600 }}>{action.label}</Text>
                  </div>
                </Col>
              ))}
            </Row>
          </div>
        </Col>
      </Row>

      <Row gutter={[20, 20]} style={{ marginBottom: 24 }}>
        <Col xs={24} lg={16}>
          <Card className="premium-card" title={<Space><CalendarOutlined style={{ color: '#7C1D3E' }} /><span>Today's Schedule</span></Space>}
            extra={
              <PillFilter
                options={[{ key: 'today', label: 'All' }, { key: 'upcoming', label: 'Upcoming' }, { key: 'completed', label: 'Completed' }]}
                value={activeTab}
                onChange={setActiveTab}
              />
            }>
            {appointments.length === 0 ? (
              <div style={{ textAlign: 'center', padding: '32px 0' }}>
                <CalendarOutlined style={{ fontSize: 36, color: 'var(--theme-text-tertiary)', marginBottom: 12 }} />
                <div style={{ color: 'var(--theme-text-secondary)', fontSize: 14, marginBottom: 16 }}>No appointments today</div>
                <Button type="primary" icon={<PlusOutlined />} style={{ borderRadius: 10, background: 'linear-gradient(135deg, #7C1D3E, #C9953F)', border: 'none' }}>Create Booking</Button>
              </div>
            ) : (
              <Table columns={appointmentColumns} dataSource={appointments} rowKey="id" pagination={false} size="small" />
            )}
          </Card>
        </Col>

        <Col xs={24} lg={8}>
          <Card className="premium-card" title={<Space><UserOutlined style={{ color: '#C9953F' }} /><span>Staff Performance</span></Space>}>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
              {staffPerformance.map((staff, i) => (
                <div key={i} style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
                  <Avatar size={36} style={{ background: staff.color, borderRadius: 10, fontSize: 14, fontWeight: 600, flexShrink: 0 }}>{staff.avatar}</Avatar>
                  <div style={{ flex: 1, minWidth: 0 }}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                      <Text strong style={{ fontSize: 13 }}>{staff.name}</Text>
                      <Space size={4}><StarOutlined style={{ fontSize: 11, color: '#C9953F' }} /><Text style={{ fontSize: 11, color: 'var(--theme-text-secondary)' }}>{staff.rating}</Text></Space>
                    </div>
                    <Text style={{ fontSize: 11, color: 'var(--theme-text-secondary)' }}>{staff.role}</Text>
                    <div style={{ marginTop: 6, display: 'flex', gap: 12 }}>
                      <Text style={{ fontSize: 11, color: '#2D5E3A' }}>{staff.bookings} bookings</Text>
                      <Text style={{ fontSize: 11, color: '#2D5E3A' }}>₹{staff.revenue.toLocaleString()}</Text>
                    </div>
                  </div>
                </div>
              ))}
            </div>
            <div style={{ marginTop: 12, paddingTop: 12, borderTop: '1px solid var(--theme-border-light)' }}>
              <Link href={`/${slug}/owner/dashboard/team`}><Button type="link" style={{ padding: 0, fontSize: 13, color: '#7C1D3E' }}>View All Staff <RightOutlined /></Button></Link>
            </div>
          </Card>
        </Col>
      </Row>

      <Row gutter={[20, 20]} style={{ marginBottom: 24 }}>
        <Col xs={24} lg={8}>
          <Card className="premium-card" title={<Space><ScissorOutlined style={{ color: '#C9953F' }} /><span>Popular Services</span></Space>}
            extra={<Link href={`/${slug}/owner/dashboard/services`}><Button type="link" style={{ fontSize: 12, color: '#7C1D3E' }}>View All</Button></Link>}>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
              {popularServices.map((svc, i) => (
                <div key={i} style={{ display: 'flex', alignItems: 'center', gap: 12, padding: '8px 0', borderBottom: i < popularServices.length - 1 ? '1px solid var(--theme-border-light)' : 'none' }}>
                  <div style={{ flex: 1 }}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                      <Text strong style={{ fontSize: 13 }}>{svc.name}</Text>
                      <Space size={4}>
                        {svc.growth >= 0 ? <ArrowUpOutlined style={{ fontSize: 10, color: '#2D5E3A' }} /> : <ArrowDownOutlined style={{ fontSize: 10, color: '#7C1D3E' }} />}
                        <Text style={{ fontSize: 11, color: svc.growth >= 0 ? '#2D5E3A' : '#7C1D3E' }}>{Math.abs(svc.growth)}%</Text>
                      </Space>
                    </div>
                    <div style={{ display: 'flex', gap: 16, marginTop: 2 }}>
                      <Text style={{ fontSize: 11, color: 'var(--theme-text-secondary)' }}>{svc.bookings} bookings</Text>
                      <Text style={{ fontSize: 11, color: svc.growth >= 0 ? '#2D5E3A' : '#7C1D3E', fontWeight: 600 }}>₹{svc.revenue.toLocaleString()}</Text>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </Card>
        </Col>

        <Col xs={24} lg={8}>
          <Card className="premium-card" title={<Space><GiftOutlined style={{ color: '#C9953F' }} /><span>Membership & Packages</span></Space>}
            extra={<Button type="link" style={{ fontSize: 12, color: '#7C1D3E' }}>View All</Button>}>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
              {[
                { name: 'Gold Membership', active: 18, revenue: 54000, growth: 12 },
                { name: 'Silver Package', active: 24, revenue: 36000, growth: 8 },
                { name: 'Hair Care Pass', active: 12, revenue: 14400, growth: -2 },
              ].map((item, i) => (
                <div key={i} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '8px 0', borderBottom: i < 2 ? '1px solid var(--theme-border-light)' : 'none' }}>
                  <div>
                    <Text strong style={{ fontSize: 13 }}>{item.name}</Text>
                    <div style={{ display: 'flex', gap: 12, marginTop: 2 }}>
                      <Text style={{ fontSize: 11, color: 'var(--theme-text-secondary)' }}>{item.active} active</Text>
                    </div>
                  </div>
                    <div style={{ textAlign: 'right' }}>
                      <Text strong style={{ fontSize: 13, color: item.growth >= 0 ? '#2D5E3A' : '#7C1D3E' }}>₹{item.revenue.toLocaleString()}</Text>
                      <div><Text style={{ fontSize: 11, color: item.growth >= 0 ? '#2D5E3A' : '#7C1D3E' }}>{item.growth >= 0 ? '+' : ''}{item.growth}%</Text></div>
                  </div>
                </div>
              ))}
            </div>
          </Card>
        </Col>

        <Col xs={24} lg={8}>
          <Card className="premium-card" title={<Space><AlertOutlined style={{ color: '#7C1D3E' }} /><span>Low Stock Alerts</span></Space>}
            extra={<Button type="link" style={{ fontSize: 12, color: '#7C1D3E' }}>Manage</Button>}>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
              {[
                { name: 'Shampoo Pro Series', stock: 3, min: 10, unit: 'bottles' },
                { name: 'Hair Color - Brown', stock: 2, min: 8, unit: 'boxes' },
                { name: 'Styling Gel', stock: 5, min: 15, unit: 'tubes' },
              ].map((item, i) => (
                <div key={i}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 4 }}>
                    <Text style={{ fontSize: 13 }}>{item.name}</Text>
                    <Text style={{ fontSize: 12, color: '#7C1D3E', fontWeight: 600 }}>{item.stock}/{item.min} {item.unit}</Text>
                  </div>
                  <Progress percent={Math.round((item.stock / item.min) * 100)} size="small" strokeColor="#7C1D3E" trailColor="rgba(124,29,62,0.08)" showInfo={false} />
                </div>
              ))}
            </div>
          </Card>
        </Col>
      </Row>

      <Row gutter={[20, 20]}>
        <Col xs={24} lg={12}>
          <Card className="premium-card" title={<Space><ClockCircleOutlined style={{ color: '#7C1D3E' }} /><span>Recent Activity</span></Space>}>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 0 }}>
              {recentActivities.map((act, i) => {
                const colors: Record<string, string> = { booking: '#7C1D3E', payment: '#2D5E3A', customer: '#C9953F', staff: '#C9953F', cancel: '#7C1D3E' };
                const icons: Record<string, React.ReactNode> = { booking: <CalendarOutlined />, payment: <WalletOutlined />, customer: <UserOutlined />, staff: <TeamOutlined />, cancel: <CloseCircleOutlined /> };
                return (
                  <div key={i} style={{ display: 'flex', alignItems: 'flex-start', gap: 12, padding: '10px 0', borderBottom: i < recentActivities.length - 1 ? '1px solid var(--theme-border-light)' : 'none' }}>
                    <div style={{ width: 30, height: 30, borderRadius: 8, background: `${colors[act.type] || '#5C3A4A'}15`, color: colors[act.type] || '#5C3A4A', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 13, flexShrink: 0 }}>
                      {icons[act.type] || <ClockCircleOutlined />}
                    </div>
                    <div style={{ flex: 1 }}>
                      <Text style={{ fontSize: 13 }}>{act.text}</Text>
                      <div style={{ fontSize: 11, color: 'var(--theme-text-tertiary)', marginTop: 1 }}>{act.time}</div>
                    </div>
                  </div>
                );
              })}
            </div>
          </Card>
        </Col>

        <Col xs={24} lg={12}>
          <Card className="premium-card" title={<Space><TeamOutlined style={{ color: '#7C1D3E' }} /><span>Customer Insights</span></Space>}
            extra={<Button type="link" style={{ fontSize: 12, color: '#7C1D3E' }}>View All</Button>}>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
              {[
                { name: 'Sarah Johnson', visits: 24, spent: 28800, lastVisit: 'Today', avatar: 'S', color: '#7C1D3E' },
                { name: 'Priya Sharma', visits: 18, spent: 21600, lastVisit: 'Yesterday', avatar: 'P', color: '#C9953F' },
                { name: 'Amrita Singh', visits: 3, spent: 5400, lastVisit: '2 days ago', avatar: 'A', color: '#4A2D5E' },
                { name: 'Meera Patel', visits: 12, spent: 15600, lastVisit: '1 week ago', avatar: 'M', color: '#1A5C5C' },
                { name: 'Ravi Kumar', visits: 8, spent: 9600, lastVisit: '3 days ago', avatar: 'R', color: '#8B6F47' },
              ].map((c, i) => (
                <div key={i} style={{ display: 'flex', alignItems: 'center', gap: 10, padding: '6px 0', borderBottom: i < 4 ? '1px solid var(--theme-border-light)' : 'none' }}>
                  <Avatar size={32} style={{ background: c.color, borderRadius: 8, fontSize: 12, fontWeight: 600, flexShrink: 0 }}>{c.avatar}</Avatar>
                  <div style={{ flex: 1, minWidth: 0 }}>
                    <Text strong style={{ fontSize: 13 }}>{c.name}</Text>
                    <div style={{ display: 'flex', gap: 12, fontSize: 11, color: 'var(--theme-text-secondary)' }}>
                      <span>{c.visits} visits</span>
                      <span>₹{c.spent.toLocaleString()}</span>
                    </div>
                  </div>
                  <Tag style={{ borderRadius: 6, fontSize: 10, border: 'none', margin: 0, padding: '1px 8px' }}>{c.lastVisit}</Tag>
                </div>
              ))}
            </div>
          </Card>
        </Col>
      </Row>
    </div>
  );
}

export default function SalonDashboardPage() {
  return (
    <OwnerLayout>
      <DashboardContent />
    </OwnerLayout>
  );
}

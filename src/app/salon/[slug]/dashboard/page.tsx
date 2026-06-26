'use client';

import React, { useEffect, useState } from 'react';
import { useParams, useRouter } from 'next/navigation';
import {
  Row, Col, Card, Tag, Typography, Alert, Spin, Table, Space, Button, Avatar, Progress, Dropdown,
  Tabs, Badge, List, Tooltip,
} from 'antd';
import {
  CalendarOutlined, ScissorOutlined,
  GlobalOutlined, ArrowUpOutlined, ArrowDownOutlined,
  ClockCircleOutlined, UserOutlined, StarOutlined,
  TeamOutlined, RiseOutlined, WalletOutlined,
  CheckCircleOutlined, CloseCircleOutlined, MoreOutlined,
  EyeOutlined, ExclamationCircleOutlined,
  CustomerServiceOutlined, GiftOutlined, MessageOutlined,
  PlusOutlined, RightOutlined, BarChartOutlined,
  PieChartOutlined, ShoppingCartOutlined, TrophyOutlined,
} from '@ant-design/icons';
import Link from 'next/link';
import OwnerLayout from '../../../../components/layout/OwnerLayout';
import apiUtil from '../../../../utils/api';
import { ApiOwnerSalon, ApiOwnerAppointments } from '../../../../utils/api.constant';
import { eResultCode } from '../../../../utils/enum';
import Utils from '../../../../utils';
import dayjs from 'dayjs';

const { Text } = Typography;

interface Salon {
  id: string;
  name: string;
  slug: string;
  city?: string;
  planType: string;
  subscriptionStatus: string;
  subscriptionExpiry: string;
  _count?: { appointments: number };
  services?: any[];
}

interface Appointment {
  id: string;
  customerName: string;
  startTime: string;
  endTime?: string;
  appointmentDate: string;
  status: string;
  service: { name: string; price: number };
  staffName?: string;
}

const STATUS_COLORS: Record<string, string> = {
  BOOKED: 'processing',
  CONFIRMED: 'blue',
  COMPLETED: 'success',
  CANCELLED: 'error',
  NO_SHOW: 'warning',
  IN_PROGRESS: 'orange',
};

const STATUS_BG: Record<string, string> = {
  BOOKED: 'rgba(24,144,255,0.08)',
  CONFIRMED: 'rgba(24,144,255,0.12)',
  COMPLETED: 'rgba(82,196,26,0.08)',
  CANCELLED: 'rgba(255,77,79,0.08)',
  NO_SHOW: 'rgba(250,173,20,0.08)',
  IN_PROGRESS: 'rgba(250,140,22,0.08)',
};

const PLAN_LABELS: Record<string, string> = {
  BASIC: 'Basic',
  PRO: 'Pro',
  PRO_YEARLY: 'Pro Yearly',
};

const quickActions = [
  { icon: <PlusOutlined />, label: 'New Booking', href: '#', color: '#8B5CF6', bg: 'rgba(139,92,246,0.1)' },
  { icon: <UserOutlined />, label: 'Add Customer', href: '#', color: '#3B82F6', bg: 'rgba(59,130,246,0.1)' },
  { icon: <ScissorOutlined />, label: 'Add Service', href: '#', color: '#EC4899', bg: 'rgba(236,72,153,0.1)' },
  { icon: <GiftOutlined />, label: 'Promotions', href: '#', color: '#F59E0B', bg: 'rgba(245,158,11,0.1)' },
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
  { name: 'Ananya', role: 'Senior Stylist', bookings: 45, revenue: 67500, rating: 4.9, avatar: 'A', color: '#8B5CF6' },
  { name: 'Rahul', role: 'Barber', bookings: 38, revenue: 45600, rating: 4.7, avatar: 'R', color: '#3B82F6' },
  { name: 'Priya', role: 'Esthetician', bookings: 32, revenue: 51200, rating: 4.8, avatar: 'P', color: '#EC4899' },
  { name: 'Vikram', role: 'Colorist', bookings: 28, revenue: 50400, rating: 4.6, avatar: 'V', color: '#F59E0B' },
];

function MiniBarChart({ data }: { data: typeof weeklyData }) {
  const max = Math.max(...data.map(d => d.revenue));
  return (
    <div style={{ display: 'flex', alignItems: 'flex-end', gap: 4, height: 48, paddingTop: 8 }}>
      {data.map((d, i) => (
        <Tooltip key={i} title={`${d.day}: ₹${d.revenue.toLocaleString()}`}>
          <div style={{
            flex: 1, height: `${(d.revenue / max) * 100}%`, minHeight: 4,
            borderRadius: '4px 4px 0 0',
            background: `linear-gradient(180deg, rgba(139,92,246,0.6) 0%, rgba(139,92,246,0.2) 100%)`,
            transition: 'height 0.3s ease',
            cursor: 'pointer',
          }} />
        </Tooltip>
      ))}
    </div>
  );
}

function DashboardContent() {
  const params = useParams();
  const router = useRouter();
  const slug = params?.slug as string;

  const [salon, setSalon] = useState<Salon | null>(null);
  const [appointments, setAppointments] = useState<Appointment[]>([]);
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState('today');

  useEffect(() => {
    const decoded = Utils.decodeToken();
    const role = decoded?.role;
    if (role !== 'SALON_OWNER' && role !== 'SALON_STAFF' && role !== 'ADMIN' && role !== 'SUPER_ADMIN') {
      router.push(`/salon/${slug}/portal/login`);
      return;
    }
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      setLoading(true);
      const salonRes = await apiUtil.get(ApiOwnerSalon);
      const salonCode = salonRes?.dataResponse?.returnCode;

      if (salonCode === eResultCode.SUCCESS || salonCode === eResultCode.CREATED) {
        const data = salonRes.data;
        if (data.slug !== slug) {
          router.push(`/owner/dashboard`);
          return;
        }
        setSalon(data);
        const today = dayjs().format('YYYY-MM-DD');
        const apptResponse = await apiUtil.get(`${ApiOwnerAppointments(data.id)}?date=${today}&pageSize=10`);
        const apptCode = apptResponse?.dataResponse?.returnCode;
        if (apptCode === eResultCode.SUCCESS || apptCode === eResultCode.CREATED) {
          setAppointments(apptResponse.data?.appointments || apptResponse.data || []);
        }
      }
    } catch {
      // handle error silently
    } finally {
      setLoading(false);
    }
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
  const daysLeft = salon.subscriptionExpiry
    ? Math.max(0, dayjs(salon.subscriptionExpiry).diff(dayjs(), 'day'))
    : 0;

  const appointmentColumns = [
    {
      title: 'Customer', dataIndex: 'customerName', key: 'customerName',
      render: (name: string) => (
        <Space>
          <Avatar size={28} style={{ background: 'linear-gradient(135deg, #8B5CF6, #EC4899)', fontSize: 11, flexShrink: 0 }}>
            {name?.charAt(0) || '?'}
          </Avatar>
          <Text strong style={{ fontSize: 13 }}>{name}</Text>
        </Space>
      ),
    },
    { title: 'Service', dataIndex: ['service', 'name'], key: 'service', render: (n: string) => <Text style={{ fontSize: 13 }}>{n}</Text> },
    { title: 'Time', dataIndex: 'startTime', key: 'startTime', render: (t: string) => <Text style={{ fontSize: 13 }}>{t}</Text> },
    {
      title: 'Status', dataIndex: 'status', key: 'status',
      render: (status: string) => (
        <span style={{
          display: 'inline-flex', alignItems: 'center', gap: 4,
          padding: '2px 10px', borderRadius: 20,
          fontSize: 11, fontWeight: 600,
          background: STATUS_BG[status] || 'rgba(0,0,0,0.04)',
          color: STATUS_COLORS[status] === 'success' ? '#16a34a'
            : STATUS_COLORS[status] === 'error' ? '#dc2626'
            : STATUS_COLORS[status] === 'warning' ? '#d97706'
            : STATUS_COLORS[status] === 'processing' ? '#2563eb'
            : '#6b7280',
        }}>
          <span style={{ width: 5, height: 5, borderRadius: '50%', background: 'currentColor' }} />
          {status?.replace('_', ' ')}
        </span>
      ),
    },
    {
      title: 'Price', dataIndex: ['service', 'price'], key: 'price',
      render: (price: number) => (
        <Text strong style={{ fontSize: 13, color: '#059669' }}>₹{price?.toLocaleString() || 0}</Text>
      ),
    },
    {
      key: 'actions', width: 48,
      render: () => (
        <Button type="text" size="small" icon={<MoreOutlined />} style={{ borderRadius: 6 }} />
      ),
    },
  ];

  const totalRevenue = appointments.reduce((sum, a) => sum + (a.service?.price || 0), 0);
  const completedCount = appointments.filter(a => a.status === 'COMPLETED').length;
  const growth = appointments.length > 0 ? Math.round((completedCount / Math.max(appointments.length, 1)) * 100) : 0;

  return (
    <div>
      {/* Alerts */}
      {isExpired && (
        <Alert
          type="error"
          message={
            <Space>
              <ExclamationCircleOutlined />
              <span><strong>Subscription Expired</strong> — Your salon website is suspended. Renew to reactivate.</span>
            </Space>
          }
          action={<Link href={`/salon/${slug}/subscription`}><Button type="primary" danger size="small" ghost>Renew Now</Button></Link>}
          showIcon={false}
          style={{ marginBottom: 20, borderRadius: 12, border: '1px solid #fecaca', background: '#fef2f2' }}
        />
      )}
      {!isExpired && daysLeft <= 7 && daysLeft > 0 && (
        <Alert
          type="warning"
          message={
            <Space>
              <ClockCircleOutlined />
              <span>Subscription expires in <strong>{daysLeft} days</strong></span>
            </Space>
          }
          action={<Link href={`/salon/${slug}/subscription`}><Button size="small" type="primary" ghost>Renew Plan</Button></Link>}
          showIcon={false}
          style={{ marginBottom: 20, borderRadius: 12, border: '1px solid #fde68a', background: '#fffbeb' }}
        />
      )}

      {/* Page Header */}
      <div className="page-header-row">
        <div>
          <h1 className="page-header-title">Welcome back, {salon.name.split(' ')[0]} ✂️</h1>
          <p className="page-header-subtitle">{dayjs().format('dddd, D MMMM YYYY')} · {salon.city || 'Your Salon'}</p>
        </div>
        <Space>
          <Link href={`/salon/${salon.slug}`} target="_blank">
            <Button icon={<GlobalOutlined />} style={{ borderRadius: 10, border: '1px solid var(--theme-border)' }}>
              View Salon
            </Button>
          </Link>
          <Link href={`/salon/${slug}/appointments`}>
            <Button type="primary" icon={<CalendarOutlined />} style={{
              borderRadius: 10, background: 'linear-gradient(135deg, #8B5CF6, #EC4899)',
              border: 'none', boxShadow: '0 4px 14px rgba(139,92,246,0.3)',
            }}>
              Manage Bookings
            </Button>
          </Link>
        </Space>
      </div>

      {/* KPI Row */}
      <Row gutter={[20, 20]} style={{ marginBottom: 24 }}>
        <Col xs={24} sm={12} lg={6}>
          <div className="stat-widget stat-widget-revenue">
            <div className="stat-widget-header">
              <div className="stat-widget-icon stat-widget-icon-revenue"><WalletOutlined /></div>
              <Tag style={{ borderRadius: 6, margin: 0, fontSize: 11, border: 'none', background: 'rgba(139,92,246,0.08)', color: '#8B5CF6' }}>Today</Tag>
            </div>
            <div className="stat-widget-label">Daily Revenue</div>
            <div className="stat-widget-value">₹{totalRevenue.toLocaleString()}</div>
            <div className="stat-widget-trend stat-widget-trend-up">
              <ArrowUpOutlined /> {growth}% vs yesterday
            </div>
          </div>
        </Col>
        <Col xs={24} sm={12} lg={6}>
          <div className="stat-widget stat-widget-bookings">
            <div className="stat-widget-header">
              <div className="stat-widget-icon stat-widget-icon-bookings"><CalendarOutlined /></div>
              <Tag style={{ borderRadius: 6, margin: 0, fontSize: 11, border: 'none', background: 'rgba(59,130,246,0.08)', color: '#3B82F6' }}>Today</Tag>
            </div>
            <div className="stat-widget-label">Appointments</div>
            <div className="stat-widget-value">{appointments.length}</div>
            <div className="stat-widget-trend stat-widget-trend-up">
              <ArrowUpOutlined /> {completedCount} completed
            </div>
          </div>
        </Col>
        <Col xs={24} sm={12} lg={6}>
          <div className="stat-widget stat-widget-customers">
            <div className="stat-widget-header">
              <div className="stat-widget-icon stat-widget-icon-customers"><TeamOutlined /></div>
              <Tag style={{ borderRadius: 6, margin: 0, fontSize: 11, border: 'none', background: 'rgba(16,185,129,0.08)', color: '#10B981' }}>Total</Tag>
            </div>
            <div className="stat-widget-label">Customers</div>
            <div className="stat-widget-value">1,284</div>
            <div className="stat-widget-trend stat-widget-trend-up">
              <RiseOutlined /> +12 this week
            </div>
          </div>
        </Col>
        <Col xs={24} sm={12} lg={6}>
          <div className="stat-widget stat-widget-staff">
            <div className="stat-widget-header">
              <div className="stat-widget-icon stat-widget-icon-staff"><UserOutlined /></div>
              <Tag style={{ borderRadius: 6, margin: 0, fontSize: 11, border: 'none', background: 'rgba(245,158,11,0.08)', color: '#F59E0B' }}>Active</Tag>
            </div>
            <div className="stat-widget-label">Staff</div>
            <div className="stat-widget-value">{staffPerformance.length}</div>
            <div className="stat-widget-trend stat-widget-trend-up">
              <TrophyOutlined /> {staffPerformance.reduce((s, p) => s + p.bookings, 0)} bookings
            </div>
          </div>
        </Col>
      </Row>

      {/* Quick Actions & Mini Charts Row */}
      <Row gutter={[20, 20]} style={{ marginBottom: 24 }}>
        <Col xs={24} lg={16}>
          <Card className="premium-card" bodyStyle={{ padding: 0 }}>
            <div style={{ padding: '18px 20px', borderBottom: '1px solid var(--theme-border-light)', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <div>
                <Text strong style={{ fontSize: 15 }}>Weekly Overview</Text>
                <div style={{ fontSize: 12, color: 'var(--theme-text-secondary)', marginTop: 2 }}>Revenue & bookings trend</div>
              </div>
              <Space>
                {['Revenue', 'Bookings'].map(t => (
                  <Tag key={t} style={{
                    borderRadius: 6, cursor: 'pointer', fontSize: 11, padding: '2px 10px',
                    border: '1px solid var(--theme-border-light)',
                  }}>{t}</Tag>
                ))}
              </Space>
            </div>
            <div style={{ padding: '16px 20px' }}>
              <Row gutter={16}>
                {weeklyData.slice(0, 7).map((d, i) => (
                  <Col span={0} key={i} />
                ))}
              </Row>
              <div style={{ display: 'flex', alignItems: 'flex-end', gap: 8, height: 120 }}>
                {weeklyData.map((d, i) => (
                  <Tooltip key={i} title={`${d.day}: ₹${d.revenue.toLocaleString()}`}>
                    <div style={{ flex: 1, display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 6, height: '100%', justifyContent: 'flex-end' }}>
                      <div style={{
                        width: '100%', maxWidth: 36,
                        height: `${(d.revenue / Math.max(...weeklyData.map(x => x.revenue)) * 100)}%`,
                        borderRadius: '8px 8px 4px 4px',
                        background: i === weeklyData.length - 1
                          ? 'linear-gradient(180deg, #8B5CF6 0%, #EC4899 100%)'
                          : 'linear-gradient(180deg, rgba(139,92,246,0.4) 0%, rgba(139,92,246,0.15) 100%)',
                        transition: 'height 0.3s ease',
                        minHeight: 8,
                        position: 'relative',
                      }}>
                        {i === weeklyData.length - 1 && (
                          <div style={{
                            position: 'absolute', top: -20, left: '50%', transform: 'translateX(-50%)',
                            background: '#8B5CF6', color: '#fff', fontSize: 9, padding: '1px 6px',
                            borderRadius: 4, whiteSpace: 'nowrap', fontWeight: 600,
                          }}>₹{d.revenue.toLocaleString()}</div>
                        )}
                      </div>
                      <Text style={{ fontSize: 11, color: 'var(--theme-text-secondary)' }}>{d.day}</Text>
                    </div>
                  </Tooltip>
                ))}
              </div>
              <div style={{ marginTop: 16, display: 'flex', gap: 20 }}>
                <div><Text style={{ fontSize: 12, color: 'var(--theme-text-secondary)' }}>Total Revenue</Text><br /><Text strong style={{ fontSize: 18 }}>₹{weeklyData.reduce((s, d) => s + d.revenue, 0).toLocaleString()}</Text></div>
                <div><Text style={{ fontSize: 12, color: 'var(--theme-text-secondary)' }}>Total Bookings</Text><br /><Text strong style={{ fontSize: 18 }}>{weeklyData.reduce((s, d) => s + d.bookings, 0)}</Text></div>
                <div><Text style={{ fontSize: 12, color: 'var(--theme-text-secondary)' }}>Avg. Daily</Text><br /><Text strong style={{ fontSize: 18 }}>₹{Math.round(weeklyData.reduce((s, d) => s + d.revenue, 0) / 7).toLocaleString()}</Text></div>
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
                  <div style={{
                    background: 'var(--theme-surface)', borderRadius: 14,
                    border: '1px solid var(--theme-border-light)',
                    padding: 16, textAlign: 'center', cursor: 'pointer',
                    transition: 'all 0.2s ease',
                  }}
                    onMouseEnter={e => { e.currentTarget.style.borderColor = action.color; e.currentTarget.style.boxShadow = `0 4px 20px ${action.color}15`; }}
                    onMouseLeave={e => { e.currentTarget.style.borderColor = 'var(--theme-border-light)'; e.currentTarget.style.boxShadow = 'none'; }}
                  >
                    <div style={{
                      width: 36, height: 36, borderRadius: 10,
                      background: action.bg, color: action.color,
                      display: 'flex', alignItems: 'center', justifyContent: 'center',
                      fontSize: 16, margin: '0 auto 8px',
                    }}>{action.icon}</div>
                    <Text style={{ fontSize: 12, fontWeight: 600 }}>{action.label}</Text>
                  </div>
                </Col>
              ))}
            </Row>
          </div>
        </Col>
      </Row>

      {/* Appointments + Staff Performance */}
      <Row gutter={[20, 20]} style={{ marginBottom: 24 }}>
        <Col xs={24} lg={16}>
          <Card
            className="premium-card"
            title={
              <Space>
                <CalendarOutlined style={{ color: '#8B5CF6' }} />
                <span>Today's Schedule</span>
              </Space>
            }
            extra={
              <Tabs
                activeKey={activeTab}
                onChange={setActiveTab}
                size="small"
                style={{ marginBottom: 0 }}
                items={[
                  { key: 'today', label: 'All' },
                  { key: 'upcoming', label: 'Upcoming' },
                  { key: 'completed', label: 'Completed' },
                ]}
              />
            }
          >
            {appointments.length === 0 ? (
              <div style={{ textAlign: 'center', padding: '32px 0' }}>
                <CalendarOutlined style={{ fontSize: 36, color: 'var(--theme-text-tertiary)', marginBottom: 12 }} />
                <div style={{ color: 'var(--theme-text-secondary)', fontSize: 14, marginBottom: 16 }}>No appointments today</div>
                <Button type="primary" icon={<PlusOutlined />} style={{ borderRadius: 10, background: 'linear-gradient(135deg, #8B5CF6, #EC4899)', border: 'none' }}>
                  Create Booking
                </Button>
              </div>
            ) : (
              <Table
                columns={appointmentColumns}
                dataSource={appointments}
                rowKey="id"
                pagination={false}
                size="small"
                style={{ fontSize: 13 }}
              />
            )}
          </Card>
        </Col>

        <Col xs={24} lg={8}>
          <Card className="premium-card" title={<Space><UserOutlined style={{ color: '#F59E0B' }} /><span>Staff Performance</span></Space>}>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
              {staffPerformance.map((staff, i) => (
                <div key={i} style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
                  <Avatar size={36} style={{ background: staff.color, borderRadius: 10, fontSize: 14, fontWeight: 600, flexShrink: 0 }}>
                    {staff.avatar}
                  </Avatar>
                  <div style={{ flex: 1, minWidth: 0 }}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                      <Text strong style={{ fontSize: 13 }}>{staff.name}</Text>
                      <Space size={4}>
                        <StarOutlined style={{ fontSize: 11, color: '#F59E0B' }} />
                        <Text style={{ fontSize: 11, color: 'var(--theme-text-secondary)' }}>{staff.rating}</Text>
                      </Space>
                    </div>
                    <Text style={{ fontSize: 11, color: 'var(--theme-text-secondary)' }}>{staff.role}</Text>
                    <div style={{ marginTop: 6, display: 'flex', gap: 12 }}>
                      <Text style={{ fontSize: 11, color: '#10B981' }}>{staff.bookings} bookings</Text>
                      <Text style={{ fontSize: 11, color: '#8B5CF6' }}>₹{staff.revenue.toLocaleString()}</Text>
                    </div>
                  </div>
                </div>
              ))}
            </div>
            <div style={{ marginTop: 12, paddingTop: 12, borderTop: '1px solid var(--theme-border-light)' }}>
              <Link href={`/salon/${slug}/team`}>
                <Button type="link" style={{ padding: 0, fontSize: 13 }}>View All Staff <RightOutlined /></Button>
              </Link>
            </div>
          </Card>
        </Col>
      </Row>

      {/* Popular Services + Recent Activity */}
      <Row gutter={[20, 20]}>
        <Col xs={24} lg={12}>
          <Card className="premium-card" title={<Space><ScissorOutlined style={{ color: '#EC4899' }} /><span>Popular Services</span></Space>}
            extra={<Link href={`/salon/${slug}/services`}><Button type="link" style={{ fontSize: 12 }}>View All</Button></Link>}>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
              {popularServices.map((svc, i) => (
                <div key={i} style={{
                  display: 'flex', alignItems: 'center', gap: 12,
                  padding: '8px 0', borderBottom: i < popularServices.length - 1 ? '1px solid var(--theme-border-light)' : 'none',
                }}>
                  <div style={{ flex: 1 }}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                      <Text strong style={{ fontSize: 13 }}>{svc.name}</Text>
                      <Space size={4}>
                        <ArrowUpOutlined style={{ fontSize: 10, color: svc.growth >= 0 ? '#10B981' : '#EF4444' }} />
                        <Text style={{ fontSize: 11, color: svc.growth >= 0 ? '#10B981' : '#EF4444' }}>{Math.abs(svc.growth)}%</Text>
                      </Space>
                    </div>
                    <div style={{ display: 'flex', gap: 16, marginTop: 2 }}>
                      <Text style={{ fontSize: 11, color: 'var(--theme-text-secondary)' }}>{svc.bookings} bookings</Text>
                      <Text style={{ fontSize: 11, color: '#8B5CF6', fontWeight: 600 }}>₹{svc.revenue.toLocaleString()}</Text>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </Card>
        </Col>

        <Col xs={24} lg={12}>
          <Card className="premium-card" title={<Space><ClockCircleOutlined style={{ color: '#3B82F6' }} /><span>Recent Activity</span></Space>}>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 0 }}>
              {recentActivities.map((act, i) => {
                const typeColors: Record<string, string> = {
                  booking: '#8B5CF6', payment: '#10B981', customer: '#3B82F6', staff: '#F59E0B', cancel: '#EF4444',
                };
                const typeIcons: Record<string, React.ReactNode> = {
                  booking: <CalendarOutlined />, payment: <WalletOutlined />, customer: <UserOutlined />,                   staff: <TeamOutlined />, cancel: <CloseCircleOutlined />,
                };
                return (
                  <div key={i} style={{
                    display: 'flex', alignItems: 'flex-start', gap: 12,
                    padding: '10px 0', borderBottom: i < recentActivities.length - 1 ? '1px solid var(--theme-border-light)' : 'none',
                  }}>
                    <div style={{
                      width: 30, height: 30, borderRadius: 8,
                      background: `${typeColors[act.type] || '#6b7280'}15`,
                      color: typeColors[act.type] || '#6b7280',
                      display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 13, flexShrink: 0,
                    }}>
                      {typeIcons[act.type] || <ClockCircleOutlined />}
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

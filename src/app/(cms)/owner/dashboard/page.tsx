'use client';

import React, { useEffect, useState } from 'react';
import { Row, Col, Card, Statistic, Button, Tag, Typography, Alert, Spin, Table, Space } from 'antd';
import {
  CalendarOutlined, ScissorOutlined, CreditCardOutlined,
  GlobalOutlined, ArrowUpOutlined, ClockCircleOutlined,
} from '@ant-design/icons';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import apiUtil from '../../../../utils/api';
import { ApiOwnerSalon, ApiOwnerAppointments } from '../../../../utils/api.constant';
import { eResultCode } from '../../../../utils/enum';
import dayjs from 'dayjs';

const { Title, Text } = Typography;

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
  appointmentDate: string;
  status: string;
  service: { name: string; price: number };
}

const STATUS_COLORS: Record<string, string> = {
  BOOKED: 'blue',
  COMPLETED: 'green',
  CANCELLED: 'red',
  NO_SHOW: 'orange',
};

const PLAN_LABELS: Record<string, string> = {
  BASIC: 'Basic',
  PRO: 'Pro',
  PRO_YEARLY: 'Pro Yearly',
};

export default function OwnerDashboardPage() {
  const [salon, setSalon] = useState<Salon | null>(null);
  const [appointments, setAppointments] = useState<Appointment[]>([]);
  const [loading, setLoading] = useState(true);
  const router = useRouter();

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      setLoading(true);
      const salonRes = await apiUtil.get(ApiOwnerSalon);
      const salonCode = salonRes?.dataResponse?.returnCode;

      if (salonCode === eResultCode.SUCCESS || salonCode === eResultCode.CREATED) {
        setSalon(salonRes.data);
        const today = dayjs().format('YYYY-MM-DD');
        const apptResponse = await apiUtil.get(`${ApiOwnerAppointments(salonRes.data.id)}?date=${today}&pageSize=10`);
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
        <Spin size="large" description="Loading dashboard..." />
      </div>
    );
  }

  if (!salon) return null;

  const isExpired = salon.subscriptionExpiry && new Date(salon.subscriptionExpiry) < new Date();
  const daysLeft = salon.subscriptionExpiry
    ? Math.max(0, dayjs(salon.subscriptionExpiry).diff(dayjs(), 'day'))
    : 0;

  const appointmentColumns = [
    { title: 'Customer', dataIndex: 'customerName', key: 'customerName' },
    { title: 'Service', dataIndex: ['service', 'name'], key: 'service' },
    { title: 'Time', dataIndex: 'startTime', key: 'startTime' },
    {
      title: 'Status', dataIndex: 'status', key: 'status',
      render: (status: string) => <Tag color={STATUS_COLORS[status] || 'default'}>{status}</Tag>,
    },
    {
      title: 'Price', dataIndex: ['service', 'price'], key: 'price',
      render: (price: number) => `₹${price}`,
    },
  ];

  return (
    <div>
      {/* Subscription Alert */}
      {isExpired && (
        <Alert
          type="error"
          title="Subscription Expired"
          description="Your salon website is currently suspended. Renew your plan to reactivate it."
          action={<Link href="/owner/subscription"><Button type="primary" danger size="small">Renew Now</Button></Link>}
          showIcon
          style={{ marginBottom: 24 }}
        />
      )}

      {!isExpired && daysLeft <= 7 && (
        <Alert
          type="warning"
          title={`Subscription expires in ${daysLeft} day${daysLeft !== 1 ? 's' : ''}`}
          description="Renew your plan to avoid interruption."
          action={<Link href="/owner/subscription"><Button size="small">Renew Plan</Button></Link>}
          showIcon
          style={{ marginBottom: 24 }}
        />
      )}

      {/* Header */}
      <div style={{ marginBottom: 24, display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', flexWrap: 'wrap', gap: 12 }}>
        <div>
          <Title level={2} style={{ margin: 0 }}>Welcome back! ✂️</Title>
          <Text type="secondary">{salon.name} · {salon.city || 'Your Salon'}</Text>
        </div>
        <Space>
          <Link href={`/salon/${salon.slug}`} target="_blank">
            <Button icon={<GlobalOutlined />}>View My Salon</Button>
          </Link>
          <Link href="/owner/appointments">
            <Button type="primary" icon={<CalendarOutlined />}>Manage Bookings</Button>
          </Link>
        </Space>
      </div>

      {/* Stats */}
      <Row gutter={[16, 16]} style={{ marginBottom: 24 }}>
        <Col xs={24} sm={12} lg={6}>
          <Card style={{ borderRadius: 12 }}>
            <Statistic
              title="Today's Appointments"
              value={appointments.length}
              prefix={<CalendarOutlined style={{ color: '#1890ff' }} />}
            />
          </Card>
        </Col>
        <Col xs={24} sm={12} lg={6}>
          <Card style={{ borderRadius: 12 }}>
            <Statistic
              title="Active Services"
              value={salon.services?.length || 0}
              prefix={<ScissorOutlined style={{ color: '#52c41a' }} />}
            />
          </Card>
        </Col>
        <Col xs={24} sm={12} lg={6}>
          <Card style={{ borderRadius: 12 }}>
            <Statistic
              title="Total Bookings"
              value={salon._count?.appointments || 0}
              prefix={<ArrowUpOutlined style={{ color: '#722ed1' }} />}
            />
          </Card>
        </Col>
        <Col xs={24} sm={12} lg={6}>
          <Card style={{ borderRadius: 12 }}>
            <div style={{ marginBottom: 4 }}>
              <Text type="secondary">Subscription</Text>
            </div>
            <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
              <Tag color={isExpired ? 'red' : 'green'} style={{ margin: 0 }}>
                {isExpired ? 'EXPIRED' : salon.subscriptionStatus}
              </Tag>
              <Text strong>{PLAN_LABELS[salon.planType] || salon.planType}</Text>
            </div>
            <div style={{ marginTop: 4 }}>
              <Text type="secondary" style={{ fontSize: 12 }}>
                <ClockCircleOutlined style={{ marginRight: 4 }} />
                {isExpired ? 'Expired' : `${daysLeft} days left`}
              </Text>
            </div>
          </Card>
        </Col>
      </Row>

      {/* Quick Actions */}
      <Row gutter={[16, 16]} style={{ marginBottom: 24 }}>
        {[
          { icon: '✂️', label: 'Add Service', href: '/owner/services', color: '#1890ff' },
          { icon: '📅', label: 'View Bookings', href: '/owner/appointments', color: '#52c41a' },
          { icon: '🕐', label: 'Set Availability', href: '/owner/availability', color: '#fa8c16' },
          { icon: '💳', label: 'Manage Plan', href: '/owner/subscription', color: '#722ed1' },
        ].map((action) => (
          <Col xs={12} sm={6} key={action.label}>
            <Link href={action.href}>
              <Card
                hoverable
                style={{ borderRadius: 12, textAlign: 'center', cursor: 'pointer' }}
                styles={{ body: { padding: 20 } }}
              >
                <div style={{ fontSize: 28, marginBottom: 8 }}>{action.icon}</div>
                <Text strong style={{ color: action.color }}>{action.label}</Text>
              </Card>
            </Link>
          </Col>
        ))}
      </Row>

      {/* Today's Appointments */}
      <Card
        title={`Today's Appointments (${dayjs().format('DD MMM YYYY')})`}
        style={{ borderRadius: 12 }}
        extra={<Link href="/owner/appointments"><Button type="link">View All</Button></Link>}
      >
        {appointments.length === 0 ? (
          <div style={{ textAlign: 'center', padding: '32px 0', color: '#999' }}>
            <CalendarOutlined style={{ fontSize: 32, marginBottom: 8 }} />
            <div>No appointments today</div>
          </div>
        ) : (
          <Table
            columns={appointmentColumns}
            dataSource={appointments}
            rowKey="id"
            pagination={false}
            size="small"
          />
        )}
      </Card>
    </div>
  );
}

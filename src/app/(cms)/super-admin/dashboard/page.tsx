'use client';

import React from 'react';
import { Row, Col, Typography, Space, Card, Button, Tag } from 'antd';
import {
  BuildOutlined, DollarOutlined, UserAddOutlined, FallOutlined,
  RiseOutlined, BankOutlined, PlusOutlined, FileTextOutlined,
  SettingOutlined, CustomerServiceOutlined, DownloadOutlined,
  UserOutlined, ShoppingCartOutlined, CreditCardOutlined, CheckCircleOutlined,
} from '@ant-design/icons';
import AnalyticsCard from '../../../../components/super-admin/AnalyticsCard';
import AreaChart from '../../../../components/super-admin/AreaChart';
import BarChart from '../../../../components/super-admin/BarChart';
import DonutChart from '../../../../components/super-admin/DonutChart';
import DataTable from '../../../../components/super-admin/DataTable';
import StatusBadge from '../../../../components/super-admin/StatusBadge';
import Timeline from '../../../../components/super-admin/Timeline';
import './Dashboard.css';

const { Text, Title } = Typography;

const revenueData = [
  { label: 'Jan', value: 62000 }, { label: 'Feb', value: 68000 }, { label: 'Mar', value: 71500 },
  { label: 'Apr', value: 74200 }, { label: 'May', value: 78300 }, { label: 'Jun', value: 81000 },
  { label: 'Jul', value: 84200 }, { label: 'Aug', value: 87900 }, { label: 'Sep', value: 92300 },
  { label: 'Oct', value: 95800 }, { label: 'Nov', value: 100200 }, { label: 'Dec', value: 104500 },
];

const growthData = [
  { label: 'Jul', value: 18, color: '#d4a853' },
  { label: 'Aug', value: 24, color: '#d4a853' },
  { label: 'Sep', value: 31, color: '#d4a853' },
  { label: 'Oct', value: 27, color: '#d4a853' },
  { label: 'Nov', value: 35, color: '#d4a853' },
  { label: 'Dec', value: 42, color: '#d4a853' },
];

const subscriptionData = [
  { label: 'Starter', value: 45, color: '#3b82f6' },
  { label: 'Growth', value: 30, color: '#10b981' },
  { label: 'Professional', value: 18, color: '#d4a853' },
  { label: 'Enterprise', value: 7, color: '#8b5cf6' },
];

const activities = [
  { time: '2 min ago', title: 'New tenant registered', description: 'Bloom Beauty Spa joined the platform', type: 'success' as const },
  { time: '15 min ago', title: 'Payment received', description: '$299 from Glamour Studio (Growth plan)', type: 'success' as const },
  { time: '1 hour ago', title: 'Tenant suspended', description: 'QuickCuts Salon — payment overdue', type: 'error' as const },
  { time: '2 hours ago', title: 'Plan upgraded', description: 'Luxury Nails upgraded to Professional', type: 'info' as const },
  { time: '4 hours ago', title: 'Support ticket opened', description: 'Elite Styles reported billing issue #1024', type: 'warning' as const },
  { time: '6 hours ago', title: 'Trial started', description: 'Serenity Day Spa started 14-day trial', type: 'info' as const },
];

const recentPayments = [
  { key: '1', tenant: 'Bloom Beauty Spa', amount: '$299', plan: 'Growth', status: 'success', date: '2026-06-18' },
  { key: '2', tenant: 'Glamour Studio', amount: '$299', plan: 'Growth', status: 'success', date: '2026-06-18' },
  { key: '3', tenant: 'Luxury Nails', amount: '$599', plan: 'Professional', status: 'success', date: '2026-06-17' },
  { key: '4', tenant: 'Elite Styles', amount: '$99', plan: 'Starter', status: 'pending', date: '2026-06-17' },
  { key: '5', tenant: 'Serenity Day Spa', amount: '$0', plan: 'Trial', status: 'pending', date: '2026-06-16' },
  { key: '6', tenant: 'QuickCuts Salon', amount: '$299', plan: 'Growth', status: 'error', date: '2026-06-16' },
  { key: '7', tenant: 'The Barbershop Co.', amount: '$999', plan: 'Enterprise', status: 'success', date: '2026-06-15' },
  { key: '8', tenant: 'Nail Artistry', amount: '$99', plan: 'Starter', status: 'success', date: '2026-06-15' },
];

const supportTickets = [
  { key: '1', subject: 'Billing discrepancy', tenant: 'Elite Styles', priority: 'urgent', status: 'open', assignee: '—' },
  { key: '2', subject: 'Feature request: API access', tenant: 'The Barbershop Co.', priority: 'medium', status: 'open', assignee: 'Mike' },
  { key: '3', subject: 'Login issue', tenant: 'Nail Artistry', priority: 'high', status: 'pending', assignee: 'Sarah' },
  { key: '4', subject: 'Integration help', tenant: 'Bloom Beauty Spa', priority: 'low', status: 'resolved', assignee: 'Alex' },
  { key: '5', subject: 'Account upgrade', tenant: 'Luxury Nails', priority: 'medium', status: 'closed', assignee: '—' },
];

const paymentColumns = [
  { title: 'Tenant', dataIndex: 'tenant', key: 'tenant' },
  { title: 'Amount', dataIndex: 'amount', key: 'amount' },
  { title: 'Plan', dataIndex: 'plan', key: 'plan' },
  {
    title: 'Status', dataIndex: 'status', key: 'status',
    render: (s: string) => <StatusBadge status={s} />,
  },
  { title: 'Date', dataIndex: 'date', key: 'date' },
];

const ticketColumns = [
  { title: 'Subject', dataIndex: 'subject', key: 'subject' },
  { title: 'Tenant', dataIndex: 'tenant', key: 'tenant' },
  {
    title: 'Priority', dataIndex: 'priority', key: 'priority',
    render: (p: string) => <StatusBadge status={p} />,
  },
  {
    title: 'Status', dataIndex: 'status', key: 'status',
    render: (s: string) => <StatusBadge status={s} />,
  },
  { title: 'Assignee', dataIndex: 'assignee', key: 'assignee' },
];

export default function SuperAdminDashboardPage() {
  const today = new Date().toLocaleDateString('en-US', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' });

  return (
    <div className="super-dashboard">
      {/* Welcome Header */}
      <div className="super-dash-welcome">
        <div className="super-dash-welcome-left">
          <Title level={4} className="super-dash-greeting">Good morning, Super Admin</Title>
          <Text className="super-dash-date">{today}</Text>
        </div>
        <div className="super-dash-welcome-right">
          <Space>
            <span className="health-indicator">
              <span className="health-dot" />
              <Text className="health-text">All Systems Operational</Text>
            </span>
          </Space>
        </div>
      </div>

      {/* KPI Cards */}
      <Row gutter={[16, 16]} className="super-kpi-row">
        <Col xs={12} sm={8} lg={4}>
          <AnalyticsCard
            title="Total Tenants"
            value="1,247"
            trend={12.3}
            icon={<BuildOutlined />}
            color="#3b82f6"
            sparklineData={[5, 8, 6, 10, 7, 12, 9, 14, 11, 15, 13, 18]}
          />
        </Col>
        <Col xs={12} sm={8} lg={4}>
          <AnalyticsCard
            title="MRR"
            value="$84,293"
            trend={8.7}
            icon={<DollarOutlined />}
            color="#10b981"
            sparklineData={[45, 52, 48, 58, 55, 62, 60, 68, 65, 72, 70, 84]}
          />
        </Col>
        <Col xs={12} sm={8} lg={4}>
          <AnalyticsCard
            title="Active Subscriptions"
            value="1,892"
            trend={5.2}
            icon={<CreditCardOutlined />}
            color="#d4a853"
            sparklineData={[20, 25, 22, 28, 26, 32, 30, 35, 33, 38, 36, 42]}
          />
        </Col>
        <Col xs={12} sm={8} lg={4}>
          <AnalyticsCard
            title="New Signups Today"
            value="18"
            trend={-2.1}
            icon={<UserAddOutlined />}
            color="#8b5cf6"
            sparklineData={[3, 5, 2, 6, 4, 7, 5, 8, 6, 9, 7, 10]}
          />
        </Col>
        <Col xs={12} sm={8} lg={4}>
          <AnalyticsCard
            title="Churn Rate"
            value="3.2%"
            trend={-0.8}
            icon={<FallOutlined />}
            color="#f59e0b"
            sparklineData={[8, 7, 6, 7, 5, 6, 4, 5, 3, 4, 3, 2]}
          />
        </Col>
        <Col xs={12} sm={8} lg={4}>
          <AnalyticsCard
            title="Platform Revenue"
            value="$1.2M"
            trend={15.3}
            icon={<BankOutlined />}
            color="#f43f5e"
            sparklineData={[12, 15, 13, 17, 16, 20, 19, 23, 22, 26, 25, 30]}
          />
        </Col>
      </Row>

      {/* Charts Row */}
      <Row gutter={[16, 16]} style={{ marginTop: 8 }}>
        <Col xs={24} lg={14}>
          <Card className="super-dash-card" variant="borderless" title={<span className="card-title">Revenue Analytics</span>}>
            <AreaChart data={revenueData} height={220} color="#d4a853" formatValue={(v) => `$${(v / 1000).toFixed(1)}k`} />
          </Card>
        </Col>
        <Col xs={24} lg={10}>
          <Card className="super-dash-card" variant="borderless" title={<span className="card-title">Platform Growth</span>}>
            <BarChart data={growthData} height={220} formatValue={(v) => `${v}`} />
          </Card>
        </Col>
      </Row>

      {/* Middle Row */}
      <Row gutter={[16, 16]} style={{ marginTop: 16 }}>
        <Col xs={24} lg={8}>
          <Card className="super-dash-card" variant="borderless" title={<span className="card-title">Subscription Distribution</span>}>
            <DonutChart
              data={subscriptionData}
              size={180}
              innerRadius={60}
              centerText="1,247"
              centerSubtext="Total"
            />
          </Card>
        </Col>
        <Col xs={24} lg={8}>
          <Card className="super-dash-card" variant="borderless" title={<span className="card-title">Recent Payments</span>}>
            <DataTable
              columns={paymentColumns}
              dataSource={recentPayments}
              pagination={false}
              scroll={{ x: true }}
            />
          </Card>
        </Col>
        <Col xs={24} lg={8}>
          <Card className="super-dash-card" variant="borderless" title={<span className="card-title">Support Tickets</span>}>
            <DataTable
              columns={ticketColumns}
              dataSource={supportTickets}
              pagination={false}
              scroll={{ x: true }}
            />
          </Card>
        </Col>
      </Row>

      {/* Activity + Quick Actions */}
      <Row gutter={[16, 16]} style={{ marginTop: 16 }}>
        <Col xs={24} lg={14}>
          <Card className="super-dash-card" variant="borderless" title={<span className="card-title">Tenant Activity</span>}>
            <Timeline events={activities} />
          </Card>
        </Col>
        <Col xs={24} lg={10}>
          <Card className="super-dash-card" variant="borderless" title={<span className="card-title">Quick Actions</span>}>
            <div className="quick-actions-grid">
              <Button type="default" icon={<PlusOutlined />} block className="quick-action-btn">
                Invite Tenant
              </Button>
              <Button type="default" icon={<FileTextOutlined />} block className="quick-action-btn">
                View Reports
              </Button>
              <Button type="default" icon={<SettingOutlined />} block className="quick-action-btn">
                Platform Settings
              </Button>
              <Button type="default" icon={<CustomerServiceOutlined />} block className="quick-action-btn">
                Support Queue
              </Button>
              <Button type="default" icon={<DownloadOutlined />} block className="quick-action-btn">
                Export Data
              </Button>
              <Button type="default" icon={<DollarOutlined />} block className="quick-action-btn">
                Revenue Report
              </Button>
            </div>
          </Card>
        </Col>
      </Row>
    </div>
  );
}

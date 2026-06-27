'use client';

import React from 'react';
import { Row, Col, Typography, Space, Card, Button, Tag } from 'antd';
import {
  BuildOutlined, DollarOutlined, UserAddOutlined, FallOutlined,
  RiseOutlined, BankOutlined, PlusOutlined, FileTextOutlined,
  SettingOutlined, CustomerServiceOutlined, DownloadOutlined,
  UserOutlined, ShoppingCartOutlined, CreditCardOutlined, CheckCircleOutlined,
  BookOutlined, ArrowUpOutlined, ArrowDownOutlined,
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

const dailyActiveUsers = [
  { label: 'Mon', value: 423, color: '#3b82f6' },
  { label: 'Tue', value: 478, color: '#3b82f6' },
  { label: 'Wed', value: 512, color: '#3b82f6' },
  { label: 'Thu', value: 489, color: '#3b82f6' },
  { label: 'Fri', value: 534, color: '#3b82f6' },
  { label: 'Sat', value: 612, color: '#d4a853' },
  { label: 'Sun', value: 445, color: '#d4a853' },
];

const activities = [
  { time: '2 min ago', title: 'New tenant registered', description: 'Bloom Beauty Spa joined the platform', type: 'success' as const },
  { time: '15 min ago', title: 'Payment received', description: '$299 from Glamour Studio (Growth plan)', type: 'success' as const },
  { time: '1 hour ago', title: 'Tenant suspended', description: 'QuickCuts Salon — payment overdue', type: 'error' as const },
  { time: '2 hours ago', title: 'Plan upgraded', description: 'Luxury Nails upgraded to Professional', type: 'info' as const },
  { time: '4 hours ago', title: 'Support ticket opened', description: 'Elite Styles reported billing issue #1024', type: 'warning' as const },
  { time: '6 hours ago', title: 'Trial started', description: 'Serenity Day Spa started 14-day trial', type: 'info' as const },
];

const newTenants = [
  { key: '1', name: 'Bloom Beauty Spa', plan: 'Growth', status: 'trial' as const, date: 'Today' },
  { key: '2', name: 'Serenity Day Spa', plan: 'Trial', status: 'trial' as const, date: 'Today' },
  { key: '3', name: 'Golden Touch Spa', plan: 'Enterprise', status: 'trial' as const, date: 'Yesterday' },
  { key: '4', name: 'Style Studio', plan: 'Growth', status: 'active' as const, date: 'Yesterday' },
  { key: '5', name: 'Divine Cuts', plan: 'Professional', status: 'active' as const, date: '2 days ago' },
];

const recentPayments = [
  { key: '1', tenant: 'Bloom Beauty Spa', amount: '$299', plan: 'Growth', status: 'success' as const, date: '2026-06-18' },
  { key: '2', tenant: 'Glamour Studio', amount: '$299', plan: 'Growth', status: 'success' as const, date: '2026-06-18' },
  { key: '3', tenant: 'Luxury Nails', amount: '$599', plan: 'Professional', status: 'success' as const, date: '2026-06-17' },
  { key: '4', tenant: 'Elite Styles', amount: '$99', plan: 'Starter', status: 'pending' as const, date: '2026-06-17' },
  { key: '5', tenant: 'Serenity Day Spa', amount: '$0', plan: 'Trial', status: 'pending' as const, date: '2026-06-16' },
  { key: '6', tenant: 'QuickCuts Salon', amount: '$299', plan: 'Growth', status: 'failed' as const, date: '2026-06-16' },
  { key: '7', tenant: 'The Barbershop Co.', amount: '$999', plan: 'Enterprise', status: 'success' as const, date: '2026-06-15' },
  { key: '8', tenant: 'Nail Artistry', amount: '$99', plan: 'Starter', status: 'success' as const, date: '2026-06-15' },
];

const expiringTrials = [
  { key: '1', tenant: 'Serenity Day Spa', startDate: 'Jun 1', endDate: 'Jun 15', daysLeft: 2 },
  { key: '2', tenant: 'Golden Touch Spa', startDate: 'Jun 10', endDate: 'Jun 24', daysLeft: 11 },
  { key: '3', tenant: 'Bloom Beauty Spa', startDate: 'Jun 5', endDate: 'Jun 19', daysLeft: 6 },
];

const supportTickets = [
  { key: '1', subject: 'Billing discrepancy', tenant: 'Elite Styles', priority: 'urgent' as const, status: 'open' as const, assignee: '—' },
  { key: '2', subject: 'Feature request: API access', tenant: 'The Barbershop Co.', priority: 'medium' as const, status: 'open' as const, assignee: 'Mike' },
  { key: '3', subject: 'Login issue', tenant: 'Nail Artistry', priority: 'high' as const, status: 'pending' as const, assignee: 'Sarah' },
  { key: '4', subject: 'Integration help', tenant: 'Bloom Beauty Spa', priority: 'low' as const, status: 'resolved' as const, assignee: 'Alex' },
  { key: '5', subject: 'Account upgrade', tenant: 'Luxury Nails', priority: 'medium' as const, status: 'closed' as const, assignee: '—' },
];

const paymentColumns = [
  { title: 'Tenant', dataIndex: 'tenant', key: 'tenant' },
  { title: 'Amount', dataIndex: 'amount', key: 'amount' },
  { title: 'Plan', dataIndex: 'plan', key: 'plan', render: (p: string) => <Tag>{p}</Tag> },
  { title: 'Status', dataIndex: 'status', key: 'status', render: (s: string) => <StatusBadge status={s} /> },
  { title: 'Date', dataIndex: 'date', key: 'date' },
];

const newTenantColumns = [
  { title: 'Salon Name', dataIndex: 'name', key: 'name' },
  { title: 'Plan', dataIndex: 'plan', key: 'plan', render: (p: string) => <Tag>{p}</Tag> },
  { title: 'Status', dataIndex: 'status', key: 'status', render: (s: string) => <StatusBadge status={s} /> },
  { title: 'Date', dataIndex: 'date', key: 'date' },
];

const ticketColumns = [
  { title: 'Subject', dataIndex: 'subject', key: 'subject' },
  { title: 'Tenant', dataIndex: 'tenant', key: 'tenant' },
  { title: 'Priority', dataIndex: 'priority', key: 'priority', render: (p: string) => <StatusBadge status={p} /> },
  { title: 'Status', dataIndex: 'status', key: 'status', render: (s: string) => <StatusBadge status={s} /> },
  { title: 'Assignee', dataIndex: 'assignee', key: 'assignee' },
];

export default function AdminDashboardPage() {
  const today = new Date().toLocaleDateString('en-US', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' });

  return (
    <div className="super-dashboard">
      <div className="super-dash-welcome">
        <div className="super-dash-welcome-left">
          <Title level={4} className="super-dash-greeting">Good morning, Admin</Title>
          <Text className="super-dash-date">{today}</Text>
        </div>
        <div className="super-dash-welcome-right">
          <Space>
            <span className="health-indicator">
              <span className="health-dot" />
              <Text className="health-text">All Systems Operational</Text>
            </span>
            <Button type="primary" icon={<PlusOutlined />} style={{ background: '#d4a853', borderColor: '#d4a853' }}>Quick Invite</Button>
          </Space>
        </div>
      </div>

      <Row gutter={[16, 16]} className="super-kpi-row">
        <Col xs={12} sm={8} lg={4}>
          <AnalyticsCard title="Total Tenants" value="1,247" trend={12.3} icon={<BuildOutlined />} color="#3b82f6" sparklineData={[5, 8, 6, 10, 7, 12, 9, 14, 11, 15, 13, 18]} />
        </Col>
        <Col xs={12} sm={8} lg={4}>
          <AnalyticsCard title="MRR" value="$84.3K" trend={8.7} icon={<DollarOutlined />} color="#10b981" sparklineData={[45, 52, 48, 58, 55, 62, 60, 68, 65, 72, 70, 84]} />
        </Col>
        <Col xs={12} sm={8} lg={4}>
          <AnalyticsCard title="ARR" value="$1.01M" trend={15.3} icon={<BankOutlined />} color="#d4a853" sparklineData={[60, 68, 65, 72, 70, 78, 76, 82, 80, 88, 86, 95]} />
        </Col>
        <Col xs={12} sm={8} lg={4}>
          <AnalyticsCard title="Active Users" value="18.2K" trend={5.2} icon={<UserOutlined />} color="#8b5cf6" sparklineData={[20, 25, 22, 28, 26, 32, 30, 35, 33, 38, 36, 42]} />
        </Col>
        <Col xs={12} sm={8} lg={4}>
          <AnalyticsCard title="Churn Rate" value="2.5%" trend={-0.8} icon={<FallOutlined />} color="#f59e0b" sparklineData={[8, 7, 6, 7, 5, 6, 4, 5, 3, 4, 3, 2]} />
        </Col>
        <Col xs={12} sm={8} lg={4}>
          <AnalyticsCard title="Platform Revenue" value="$1.2M" trend={15.3} icon={<BankOutlined />} color="#f43f5e" sparklineData={[12, 15, 13, 17, 16, 20, 19, 23, 22, 26, 25, 30]} />
        </Col>
      </Row>

      <Row gutter={[16, 16]} style={{ marginTop: 8 }}>
        <Col xs={24} lg={14}>
          <Card className="super-dash-card" variant="borderless" title={<span className="card-title">Revenue Analytics</span>}>
            <AreaChart data={revenueData} height={220} color="#d4a853" formatValue={(v) => `$${(v / 1000).toFixed(1)}k`} />
          </Card>
        </Col>
        <Col xs={24} lg={10}>
          <Card className="super-dash-card" variant="borderless" title={<span className="card-title">New Registrations (7 days)</span>}>
            <BarChart data={growthData} height={220} formatValue={(v) => `${v}`} />
          </Card>
        </Col>
      </Row>

      <Row gutter={[16, 16]} style={{ marginTop: 16 }}>
        <Col xs={24} lg={8}>
          <Card className="super-dash-card" variant="borderless" title={<span className="card-title">Subscription Distribution</span>}>
            <DonutChart data={subscriptionData} size={180} innerRadius={60} centerText="1,247" centerSubtext="Total" />
          </Card>
        </Col>
        <Col xs={24} lg={8}>
          <Card className="super-dash-card" variant="borderless" title={<span className="card-title">Daily Active Users</span>}>
            <BarChart data={dailyActiveUsers} height={200} barWidth={28} formatValue={(v) => `${v}`} />
          </Card>
        </Col>
        <Col xs={24} lg={8}>
          <Card className="super-dash-card" variant="borderless" title={<span className="card-title">Recent Payments</span>}>
            <DataTable columns={paymentColumns} dataSource={recentPayments} pagination={false} scroll={{ x: true }} />
          </Card>
        </Col>
      </Row>

      <Row gutter={[16, 16]} style={{ marginTop: 16 }}>
        <Col xs={24} lg={8}>
          <Card className="super-dash-card" variant="borderless" title={<span className="card-title">New Tenant Registrations</span>}>
            <DataTable columns={newTenantColumns} dataSource={newTenants} pagination={false} />
          </Card>
        </Col>
        <Col xs={24} lg={6}>
          <Card className="super-dash-card" variant="borderless" title={<span className="card-title">Expiring Trials</span>}>
            <div className="trial-list">
              {expiringTrials.map((t) => (
                <div key={t.key} className="trial-item">
                  <div className="trial-item-info">
                    <Text strong style={{ fontSize: 13 }}>{t.tenant}</Text>
                    <Text type="secondary" style={{ fontSize: 11 }}>{t.startDate} — {t.endDate}</Text>
                  </div>
                  <Tag color={t.daysLeft <= 3 ? 'red' : t.daysLeft <= 7 ? 'orange' : 'blue'}>{t.daysLeft} days</Tag>
                </div>
              ))}
            </div>
          </Card>
        </Col>
        <Col xs={24} lg={10}>
          <Card className="super-dash-card" variant="borderless" title={<span className="card-title">Support Tickets</span>}>
            <DataTable columns={ticketColumns} dataSource={supportTickets} pagination={false} scroll={{ x: true }} />
          </Card>
        </Col>
      </Row>

      <Row gutter={[16, 16]} style={{ marginTop: 16 }}>
        <Col xs={24} lg={14}>
          <Card className="super-dash-card" variant="borderless" title={<span className="card-title">Activity Feed</span>}>
            <Timeline events={activities} />
          </Card>
        </Col>
        <Col xs={24} lg={10}>
          <Card className="super-dash-card" variant="borderless" title={<span className="card-title">Quick Actions</span>}>
            <div className="quick-actions-grid">
              <Button type="default" icon={<PlusOutlined />} block className="quick-action-btn">Invite Tenant</Button>
              <Button type="default" icon={<FileTextOutlined />} block className="quick-action-btn">View Reports</Button>
              <Button type="default" icon={<SettingOutlined />} block className="quick-action-btn">Platform Settings</Button>
              <Button type="default" icon={<CustomerServiceOutlined />} block className="quick-action-btn">Support Queue</Button>
              <Button type="default" icon={<DownloadOutlined />} block className="quick-action-btn">Export Data</Button>
              <Button type="default" icon={<DollarOutlined />} block className="quick-action-btn">Revenue Report</Button>
            </div>
          </Card>
        </Col>
      </Row>
    </div>
  );
}

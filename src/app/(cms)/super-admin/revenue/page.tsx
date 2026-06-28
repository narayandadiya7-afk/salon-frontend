'use client';

import React from 'react';
import { Row, Col, Card, Typography, Space, Tag, Tabs, Button } from 'antd';
import {
  DollarOutlined, RiseOutlined, FallOutlined, BankOutlined,
  UserOutlined, ArrowUpOutlined, ArrowDownOutlined,
  WalletOutlined, BarChartOutlined, DownloadOutlined,
} from '@ant-design/icons';
import AreaChart from '../../../../components/super-admin/AreaChart';
import BarChart from '../../../../components/super-admin/BarChart';
import DataTable from '../../../../components/super-admin/DataTable';
import StatusBadge from '../../../../components/super-admin/StatusBadge';
import StatCard from '../../../../components/super-admin/StatCard';
import DonutChart from '../../../../components/super-admin/DonutChart';
import './Revenue.css';

const { Text, Title } = Typography;

interface BarData {
  label: string;
  value: number;
  color?: string;
}

const revenueChartData = [
  { label: 'Jan', value: 62000 }, { label: 'Feb', value: 68000 }, { label: 'Mar', value: 71500 },
  { label: 'Apr', value: 74200 }, { label: 'May', value: 78300 }, { label: 'Jun', value: 81000 },
  { label: 'Jul', value: 84200 }, { label: 'Aug', value: 87900 }, { label: 'Sep', value: 92300 },
  { label: 'Oct', value: 95800 }, { label: 'Nov', value: 100200 }, { label: 'Dec', value: 104500 },
  { label: 'Proj', value: 108000 },
];

const churnData: BarData[] = [
  { label: 'Jan', value: 5.2, color: '#f59e0b' }, { label: 'Feb', value: 4.8, color: '#f59e0b' },
  { label: 'Mar', value: 4.5, color: '#f59e0b' }, { label: 'Apr', value: 4.1, color: '#f59e0b' },
  { label: 'May', value: 3.8, color: '#f59e0b' }, { label: 'Jun', value: 3.6, color: '#f59e0b' },
  { label: 'Jul', value: 3.4, color: '#f59e0b' }, { label: 'Aug', value: 3.2, color: '#f59e0b' },
  { label: 'Sep', value: 3.3, color: '#f59e0b' }, { label: 'Oct', value: 3.0, color: '#f59e0b' },
  { label: 'Nov', value: 2.8, color: '#f59e0b' }, { label: 'Dec', value: 2.5, color: '#10b981' },
];

const planRevenue: BarData[] = [
  { label: 'Enterprise', value: 89000, color: '#8b5cf6' },
  { label: 'Professional', value: 130000, color: '#d4a853' },
  { label: 'Growth', value: 111000, color: '#10b981' },
  { label: 'Starter', value: 48000, color: '#3b82f6' },
];

const mrrBreakdown = [
  { label: 'Enterprise', value: 89000, color: '#8b5cf6' },
  { label: 'Professional', value: 130000, color: '#d4a853' },
  { label: 'Growth', value: 111000, color: '#10b981' },
  { label: 'Starter', value: 48000, color: '#3b82f6' },
  { label: 'Add-ons', value: 15000, color: '#ec4899' },
];

const paymentsData = [
  { key: '1', tenant: 'The Barbershop Co.', amount: '$999', plan: 'Enterprise', status: 'success' as const, date: '2026-06-18', method: 'Stripe' },
  { key: '2', tenant: 'Bloom Beauty Spa', amount: '$299', plan: 'Growth', status: 'success' as const, date: '2026-06-18', method: 'Stripe' },
  { key: '3', tenant: 'Luxury Nails', amount: '$599', plan: 'Professional', status: 'success' as const, date: '2026-06-17', method: 'Razorpay' },
  { key: '4', tenant: 'Glamour Studio', amount: '$299', plan: 'Growth', status: 'success' as const, date: '2026-06-17', method: 'Stripe' },
  { key: '5', tenant: 'Elite Styles', amount: '$99', plan: 'Starter', status: 'pending' as const, date: '2026-06-16', method: 'Razorpay' },
  { key: '6', tenant: 'Style Studio', amount: '$299', plan: 'Growth', status: 'success' as const, date: '2026-06-15', method: 'Stripe' },
  { key: '7', tenant: 'QuickCuts Salon', amount: '$299', plan: 'Growth', status: 'failed' as const, date: '2026-06-14', method: 'Stripe' },
  { key: '8', tenant: 'Divine Cuts', amount: '$599', plan: 'Professional', status: 'success' as const, date: '2026-06-14', method: 'Razorpay' },
  { key: '9', tenant: 'Nail Artistry', amount: '$99', plan: 'Starter', status: 'success' as const, date: '2026-06-13', method: 'Stripe' },
  { key: '10', tenant: 'Prestige Barber', amount: '$299', plan: 'Growth', status: 'pending' as const, date: '2026-06-12', method: 'Razorpay' },
];

const paymentColumns = [
  { title: 'Tenant', dataIndex: 'tenant', key: 'tenant' },
  { title: 'Amount', dataIndex: 'amount', key: 'amount' },
  { title: 'Plan', dataIndex: 'plan', key: 'plan', render: (p: string) => <Tag>{p}</Tag> },
  { title: 'Method', dataIndex: 'method', key: 'method' },
  { title: 'Status', dataIndex: 'status', key: 'status', render: (s: string) => <StatusBadge status={s} /> },
  { title: 'Date', dataIndex: 'date', key: 'date' },
];

const geoData = [
  { key: '1', country: 'United States', revenue: '$485,000', percentage: 38, tenants: 486 },
  { key: '2', country: 'United Kingdom', revenue: '$195,000', percentage: 15, tenants: 198 },
  { key: '3', country: 'Canada', revenue: '$168,000', percentage: 13, tenants: 172 },
  { key: '4', country: 'Australia', revenue: '$142,000', percentage: 11, tenants: 145 },
  { key: '5', country: 'Germany', revenue: '$96,000', percentage: 7, tenants: 98 },
  { key: '6', country: 'Other', revenue: '$206,000', percentage: 16, tenants: 148 },
];

const geoColumns = [
  { title: 'Country', dataIndex: 'country', key: 'country' },
  { title: 'Revenue', dataIndex: 'revenue', key: 'revenue' },
  { title: '%', dataIndex: 'percentage', key: 'percentage', render: (v: number) => {
    const color = v >= 20 ? '#10b981' : v >= 10 ? '#d4a853' : '#3b82f6';
    return <Tag color={color}>{v}%</Tag>;
  }},
  { title: 'Tenants', dataIndex: 'tenants', key: 'tenants' },
];

export default function RevenuePage() {
  return (
    <div className="super-page">
      <div className="super-page-header">
        <div>
          <Title level={4} className="super-page-title">
            <DollarOutlined className="super-page-icon" /> Revenue Analytics
          </Title>
          <Text type="secondary">Platform-wide revenue metrics, financial insights, and projections</Text>
        </div>
        <Button icon={<DownloadOutlined />}>Export Report</Button>
      </div>

      <Row gutter={[16, 16]} style={{ marginBottom: 16 }}>
        <Col xs={12} sm={8} lg={4}><StatCard label="MRR" value="$84.3K" icon={<DollarOutlined />} color="#10b981" /></Col>
        <Col xs={12} sm={8} lg={4}><StatCard label="ARR" value="$1.01M" icon={<BankOutlined />} color="#d4a853" /></Col>
        <Col xs={12} sm={8} lg={4}><StatCard label="ARPU" value="$68" icon={<UserOutlined />} color="#3b82f6" /></Col>
        <Col xs={12} sm={8} lg={4}><StatCard label="LTV" value="$1,240" icon={<RiseOutlined />} color="#8b5cf6" /></Col>
        <Col xs={12} sm={8} lg={4}><StatCard label="CAC" value="$320" icon={<FallOutlined />} color="#f59e0b" /></Col>
        <Col xs={12} sm={8} lg={4}><StatCard label="Churn" value="2.5%" icon={<ArrowDownOutlined />} color="#10b981" /></Col>
      </Row>

      <Row gutter={[16, 16]}>
        <Col xs={24} lg={14}>
          <Card className="super-page-card" variant="borderless" title={<span className="card-title">MRR Over Time</span>}>
            <AreaChart data={revenueChartData} height={240} color="#d4a853" formatValue={(v) => `$${(v / 1000).toFixed(1)}k`} />
          </Card>
        </Col>
        <Col xs={24} lg={10}>
          <Card className="super-page-card" variant="borderless" title={<span className="card-title">MRR Breakdown</span>}>
            <DonutChart data={mrrBreakdown} size={180} innerRadius={60} centerText="$393K" centerSubtext="Total MRR" />
          </Card>
        </Col>
      </Row>

      <Row gutter={[16, 16]} style={{ marginTop: 16 }}>
        <Col xs={24} lg={12}>
          <Card className="super-page-card" variant="borderless" title={<span className="card-title">Revenue by Plan</span>}>
            <BarChart data={planRevenue} height={220} formatValue={(v) => `$${(v / 1000).toFixed(0)}k`} />
          </Card>
        </Col>
        <Col xs={24} lg={12}>
          <Card className="super-page-card" variant="borderless" title={<span className="card-title">Geographic Revenue Distribution</span>}>
            <DataTable columns={geoColumns} dataSource={geoData} pagination={false} />
          </Card>
        </Col>
      </Row>

      <Row gutter={[16, 16]} style={{ marginTop: 16 }}>
        <Col xs={24} lg={12}>
          <Card className="super-page-card" variant="borderless" title={<span className="card-title">Monthly Churn Rate</span>}>
            <AreaChart data={churnData} height={220} color="#f59e0b" formatValue={(v) => `${v}%`} />
          </Card>
        </Col>
        <Col xs={24} lg={12}>
          <Card className="super-page-card" variant="borderless" title={<span className="card-title">Payment History</span>}>
            <DataTable columns={paymentColumns} dataSource={paymentsData} pagination={{ pageSize: 8 }} />
          </Card>
        </Col>
      </Row>
    </div>
  );
}

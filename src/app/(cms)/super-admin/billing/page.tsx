'use client';

import React, { useState } from 'react';
import { Row, Col, Card, Typography, Space, Button, Tag, Tabs, Modal, Descriptions, Statistic } from 'antd';
import {
  CreditCardOutlined, DollarOutlined, FileTextOutlined,
  BankOutlined, CheckCircleOutlined, CloseCircleOutlined,
  ClockCircleOutlined, DownloadOutlined, SearchOutlined,
  FilterOutlined, ArrowUpOutlined, ArrowDownOutlined,
  ExclamationCircleOutlined, ReloadOutlined,
} from '@ant-design/icons';
import DataTable from '../../../../components/super-admin/DataTable';
import StatusBadge from '../../../../components/super-admin/StatusBadge';
import StatCard from '../../../../components/super-admin/StatCard';
import FilterBar from '../../../../components/super-admin/FilterBar';
import './Billing.css';

const { Text, Title } = Typography;

const transactionsData = [
  { key: '1', id: 'TXN-001', tenant: 'Bloom Beauty Spa', amount: '$299.00', plan: 'Growth', method: 'Stripe', status: 'success' as const, date: '2026-06-18', invoice: 'INV-001' },
  { key: '2', id: 'TXN-002', tenant: 'The Barbershop Co.', amount: '$999.00', plan: 'Enterprise', method: 'Stripe', status: 'success' as const, date: '2026-06-18', invoice: 'INV-002' },
  { key: '3', id: 'TXN-003', tenant: 'Luxury Nails', amount: '$599.00', plan: 'Professional', method: 'Razorpay', status: 'success' as const, date: '2026-06-17', invoice: 'INV-003' },
  { key: '4', id: 'TXN-004', tenant: 'Glamour Studio', amount: '$299.00', plan: 'Growth', method: 'Stripe', status: 'success' as const, date: '2026-06-17', invoice: 'INV-004' },
  { key: '5', id: 'TXN-005', tenant: 'Elite Styles', amount: '$99.00', plan: 'Starter', method: 'Razorpay', status: 'pending' as const, date: '2026-06-16', invoice: 'INV-005' },
  { key: '6', id: 'TXN-006', tenant: 'QuickCuts Salon', amount: '$299.00', plan: 'Growth', method: 'Stripe', status: 'failed' as const, date: '2026-06-16', invoice: 'INV-006' },
  { key: '7', id: 'TXN-007', tenant: 'Divine Cuts', amount: '$599.00', plan: 'Professional', method: 'Stripe', status: 'success' as const, date: '2026-06-15', invoice: 'INV-007' },
  { key: '8', id: 'TXN-008', tenant: 'Style Studio', amount: '$299.00', plan: 'Growth', method: 'Razorpay', status: 'success' as const, date: '2026-06-15', invoice: 'INV-008' },
  { key: '9', id: 'TXN-009', tenant: 'Nail Artistry', amount: '$99.00', plan: 'Starter', method: 'Stripe', status: 'failed' as const, date: '2026-06-14', invoice: 'INV-009' },
  { key: '10', id: 'TXN-010', tenant: 'Prestige Barber', amount: '$299.00', plan: 'Growth', method: 'Razorpay', status: 'success' as const, date: '2026-06-14', invoice: 'INV-010' },
  { key: '11', id: 'TXN-011', tenant: 'Golden Touch Spa', amount: '$0.00', plan: 'Trial', method: '—', status: 'pending' as const, date: '2026-06-13', invoice: '—' },
  { key: '12', id: 'TXN-012', tenant: 'Serenity Day Spa', amount: '$0.00', plan: 'Trial', method: '—', status: 'pending' as const, date: '2026-06-12', invoice: '—' },
];

const invoicesData = [
  { key: '1', id: 'INV-001', tenant: 'Bloom Beauty Spa', amount: '$299.00', status: 'paid' as const, issued: '2026-06-18', due: '2026-07-02' },
  { key: '2', id: 'INV-002', tenant: 'The Barbershop Co.', amount: '$999.00', status: 'paid' as const, issued: '2026-06-18', due: '2026-07-02' },
  { key: '3', id: 'INV-003', tenant: 'Luxury Nails', amount: '$599.00', status: 'paid' as const, issued: '2026-06-17', due: '2026-07-01' },
  { key: '4', id: 'INV-004', tenant: 'Glamour Studio', amount: '$299.00', status: 'paid' as const, issued: '2026-06-17', due: '2026-07-01' },
  { key: '5', id: 'INV-005', tenant: 'Elite Styles', amount: '$99.00', status: 'pending' as const, issued: '2026-06-16', due: '2026-06-30' },
  { key: '6', id: 'INV-006', tenant: 'QuickCuts Salon', amount: '$299.00', status: 'overdue' as const, issued: '2026-06-16', due: '2026-06-30' },
  { key: '7', id: 'INV-007', tenant: 'Divine Cuts', amount: '$599.00', status: 'paid' as const, issued: '2026-06-15', due: '2026-06-29' },
  { key: '8', id: 'INV-008', tenant: 'Style Studio', amount: '$299.00', status: 'paid' as const, issued: '2026-06-15', due: '2026-06-29' },
];

const refundsData = [
  { key: '1', id: 'RFD-001', tenant: 'QuickCuts Salon', amount: '$299.00', reason: 'Service cancellation', status: 'completed' as const, requested: '2026-06-10', processed: '2026-06-11' },
  { key: '2', id: 'RFD-002', tenant: 'Nail Artistry', amount: '$99.00', reason: 'Duplicate charge', status: 'pending' as const, requested: '2026-06-12', processed: '—' },
  { key: '3', id: 'RFD-003', tenant: 'Elite Styles', amount: '$99.00', reason: 'Customer dispute', status: 'completed' as const, requested: '2026-06-08', processed: '2026-06-09' },
];

const transactionColumns = [
  { title: 'ID', dataIndex: 'id', key: 'id', width: 100 },
  { title: 'Tenant', dataIndex: 'tenant', key: 'tenant' },
  { title: 'Amount', dataIndex: 'amount', key: 'amount' },
  { title: 'Plan', dataIndex: 'plan', key: 'plan', render: (p: string) => <Tag>{p}</Tag> },
  { title: 'Method', dataIndex: 'method', key: 'method' },
  { title: 'Status', dataIndex: 'status', key: 'status', render: (s: string) => <StatusBadge status={s} /> },
  { title: 'Date', dataIndex: 'date', key: 'date' },
  { title: 'Invoice', dataIndex: 'invoice', key: 'invoice' },
];

const invoiceColumns = [
  { title: 'ID', dataIndex: 'id', key: 'id', width: 100 },
  { title: 'Tenant', dataIndex: 'tenant', key: 'tenant' },
  { title: 'Amount', dataIndex: 'amount', key: 'amount' },
  { title: 'Status', dataIndex: 'status', key: 'status', render: (s: string) => {
    const colors: Record<string, string> = { paid: '#10b981', pending: '#f59e0b', overdue: '#ef4444', cancelled: '#6b7280' };
    return <Tag color={colors[s] || 'default'}>{s.toUpperCase()}</Tag>;
  }},
  { title: 'Issued', dataIndex: 'issued', key: 'issued' },
  { title: 'Due Date', dataIndex: 'due', key: 'due' },
  { title: 'Actions', key: 'actions', width: 80, render: () => <Button type="link" size="small" icon={<DownloadOutlined />} /> },
];

const refundColumns = [
  { title: 'ID', dataIndex: 'id', key: 'id', width: 100 },
  { title: 'Tenant', dataIndex: 'tenant', key: 'tenant' },
  { title: 'Amount', dataIndex: 'amount', key: 'amount' },
  { title: 'Reason', dataIndex: 'reason', key: 'reason' },
  { title: 'Status', dataIndex: 'status', key: 'status', render: (s: string) => <StatusBadge status={s} /> },
  { title: 'Requested', dataIndex: 'requested', key: 'requested' },
  { title: 'Processed', dataIndex: 'processed', key: 'processed' },
];

export default function BillingPage() {
  const [invoiceModal, setInvoiceModal] = useState(false);
  const [selectedInvoice, setSelectedInvoice] = useState<any>(null);

  const showInvoice = (record: any) => {
    setSelectedInvoice(record);
    setInvoiceModal(true);
  };

  const tabItems = [
    { key: 'transactions', label: 'Transactions', children: (
      <Card className="super-page-card" variant="borderless">
        <FilterBar searchPlaceholder="Search transactions..." />
        <DataTable columns={transactionColumns.map(c => c.key === 'invoice' ? { ...c, render: (v: string) => v !== '—' ? <Button type="link" size="small" onClick={() => showInvoice({ id: v })}>{v}</Button> : v } : c)} dataSource={transactionsData} pagination={{ pageSize: 10 }} />
      </Card>
    )},
    { key: 'invoices', label: 'Invoices', children: (
      <Card className="super-page-card" variant="borderless">
        <FilterBar searchPlaceholder="Search invoices..." />
        <DataTable columns={invoiceColumns} dataSource={invoicesData} pagination={{ pageSize: 10 }} onRow={(r) => ({ style: { cursor: 'pointer' }, onClick: () => showInvoice(r) })} />
      </Card>
    )},
    { key: 'refunds', label: 'Refunds', children: (
      <Card className="super-page-card" variant="borderless">
        <FilterBar searchPlaceholder="Search refunds..." />
        <DataTable columns={refundColumns} dataSource={refundsData} pagination={{ pageSize: 10 }} />
      </Card>
    )},
  ];

  return (
    <div className="super-page">
      <div className="super-page-header">
        <div>
          <Title level={4} className="super-page-title">
            <CreditCardOutlined className="super-page-icon" /> Billing & Payments
          </Title>
          <Text type="secondary">Manage platform billing, invoices, payments, and refunds</Text>
        </div>
        <Space>
          <Button icon={<ReloadOutlined />}>Sync Payments</Button>
          <Button icon={<DownloadOutlined />}>Export Report</Button>
        </Space>
      </div>

      <Row gutter={[16, 16]} style={{ marginBottom: 16 }}>
        <Col xs={12} sm={6}>
          <Card className="billing-stat-card" variant="borderless">
            <Statistic title="Today's Revenue" value="$4,496" prefix={<DollarOutlined />} valueStyle={{ color: '#10b981', fontWeight: 700 }} />
            <Text type="secondary" style={{ fontSize: 12 }}><ArrowUpOutlined /> 12.3% vs yesterday</Text>
          </Card>
        </Col>
        <Col xs={12} sm={6}>
          <Card className="billing-stat-card" variant="borderless">
            <Statistic title="Monthly Revenue" value="$84.3K" prefix={<BankOutlined />} valueStyle={{ color: '#d4a853', fontWeight: 700 }} />
            <Text type="secondary" style={{ fontSize: 12 }}><ArrowUpOutlined /> 8.7% vs last month</Text>
          </Card>
        </Col>
        <Col xs={12} sm={6}>
          <Card className="billing-stat-card" variant="borderless">
            <Statistic title="Pending Payments" value="24" prefix={<ClockCircleOutlined />} valueStyle={{ color: '#f59e0b', fontWeight: 700 }} />
            <Text type="secondary" style={{ fontSize: 12 }}>Total: $4,176</Text>
          </Card>
        </Col>
        <Col xs={12} sm={6}>
          <Card className="billing-stat-card" variant="borderless">
            <Statistic title="Failed Transactions" value="8" prefix={<ExclamationCircleOutlined />} valueStyle={{ color: '#ef4444', fontWeight: 700 }} />
            <Text type="secondary" style={{ fontSize: 12 }}>Last 30 days</Text>
          </Card>
        </Col>
      </Row>

      <Row gutter={[16, 16]} style={{ marginBottom: 16 }}>
        <Col xs={12} sm={6} lg={3}>
          <StatCard label="Total Revenue" value="$1.2M" icon={<DollarOutlined />} color="#d4a853" />
        </Col>
        <Col xs={12} sm={6} lg={3}>
          <StatCard label="Transactions" value="1,892" icon={<BankOutlined />} color="#3b82f6" />
        </Col>
        <Col xs={12} sm={6} lg={3}>
          <StatCard label="Invoices" value="1,847" icon={<FileTextOutlined />} color="#10b981" />
        </Col>
        <Col xs={12} sm={6} lg={3}>
          <StatCard label="Refunds" value="23" icon={<CloseCircleOutlined />} color="#f59e0b" />
        </Col>
        <Col xs={12} sm={6} lg={3}>
          <StatCard label="Success Rate" value="98.7%" icon={<CheckCircleOutlined />} color="#10b981" />
        </Col>
      </Row>

      <Card className="super-page-card" variant="borderless">
        <Tabs defaultActiveKey="transactions" items={tabItems} className="billing-tabs" />
      </Card>

      <Modal title={`Invoice ${selectedInvoice?.id || ''}`} open={invoiceModal} onCancel={() => setInvoiceModal(false)} footer={null} width={600}>
        {selectedInvoice && (
          <Descriptions column={2} bordered size="small">
            <Descriptions.Item label="Invoice ID">{selectedInvoice.id}</Descriptions.Item>
            <Descriptions.Item label="Tenant">{selectedInvoice.tenant || 'Bloom Beauty Spa'}</Descriptions.Item>
            <Descriptions.Item label="Amount">{selectedInvoice.amount || '$299.00'}</Descriptions.Item>
            <Descriptions.Item label="Status">
              <StatusBadge status={selectedInvoice.status || 'paid'} />
            </Descriptions.Item>
            <Descriptions.Item label="Issued">{selectedInvoice.issued || '2026-06-18'}</Descriptions.Item>
            <Descriptions.Item label="Due Date">{selectedInvoice.due || '2026-07-02'}</Descriptions.Item>
          </Descriptions>
        )}
        <div style={{ marginTop: 20, textAlign: 'right' }}>
          <Space>
            <Button icon={<DownloadOutlined />}>Download PDF</Button>
            <Button type="primary" style={{ background: '#d4a853', borderColor: '#d4a853' }}>Send Invoice</Button>
          </Space>
        </div>
      </Modal>
    </div>
  );
}

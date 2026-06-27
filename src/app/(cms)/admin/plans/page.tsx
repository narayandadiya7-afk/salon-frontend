'use client';

import React, { useState } from 'react';
import { Row, Col, Card, Typography, Space, Button, Tag, Switch, Modal, Form, Input, Select, InputNumber, Divider } from 'antd';
import {
  GiftOutlined, PlusOutlined, CheckOutlined, TeamOutlined,
  DollarOutlined, EditOutlined, ThunderboltOutlined, CrownOutlined, StarOutlined,
  CloseOutlined, BarChartOutlined, ArrowUpOutlined,
} from '@ant-design/icons';
import DataTable from '../../../../components/super-admin/DataTable';
import StatusBadge from '../../../../components/super-admin/StatusBadge';
import StatCard from '../../../../components/super-admin/StatCard';
import BarChart from '../../../../components/super-admin/BarChart';
import './Plans.css';

const { Text, Title } = Typography;

const plans = [
  { key: 'starter', name: 'Starter', price: '$99', cycle: '/month', yearlyPrice: '$999', icon: <StarOutlined />, color: '#3b82f6', subscribers: 485, status: true, trialDays: 14,
    features: ['Up to 3 staff', 'Basic analytics', 'Email support', '1 salon location', 'Booking widget'] },
  { key: 'growth', name: 'Growth', price: '$299', cycle: '/month', yearlyPrice: '$2,999', icon: <ThunderboltOutlined />, color: '#10b981', subscribers: 372, status: true, trialDays: 14,
    features: ['Up to 10 staff', 'Advanced analytics', 'Priority support', '3 salon locations', 'Marketing tools', 'API access'] },
  { key: 'professional', name: 'Professional', price: '$599', cycle: '/month', yearlyPrice: '$5,999', icon: <CrownOutlined />, color: '#d4a853', subscribers: 218, status: true, trialDays: 14,
    features: ['Unlimited staff', 'Full analytics suite', '24/7 phone support', 'Unlimited locations', 'Marketing automation', 'API access', 'Custom domain', 'White-label option'] },
  { key: 'enterprise', name: 'Enterprise', price: '$999', cycle: '/month', yearlyPrice: '$9,999', icon: <DollarOutlined />, color: '#8b5cf6', subscribers: 89, status: true, trialDays: 30,
    features: ['Everything in Professional', 'Dedicated account manager', 'Custom integrations', 'SLA guarantee', 'On-premise option', 'Advanced security', 'Multi-region deployment'] },
];

const allFeatures = [
  'Up to 3 staff', 'Up to 10 staff', 'Unlimited staff', 'Basic analytics', 'Advanced analytics',
  'Full analytics suite', 'Email support', 'Priority support', '24/7 phone support',
  '1 salon location', '3 salon locations', 'Unlimited locations', 'Booking widget',
  'Marketing tools', 'Marketing automation', 'API access', 'Custom domain',
  'White-label option', 'Dedicated account manager', 'Custom integrations',
  'SLA guarantee', 'On-premise option', 'Advanced security', 'Multi-region deployment',
];

const planRevenueData = [
  { label: 'Enterprise', value: 89000, color: '#8b5cf6' },
  { label: 'Professional', value: 130000, color: '#d4a853' },
  { label: 'Growth', value: 111000, color: '#10b981' },
  { label: 'Starter', value: 48000, color: '#3b82f6' },
];

const upgradeTrends = [
  { key: '1', from: 'Starter', to: 'Growth', count: 28 },
  { key: '2', from: 'Growth', to: 'Professional', count: 15 },
  { key: '3', from: 'Professional', to: 'Enterprise', count: 7 },
  { key: '4', from: 'Starter', to: 'Professional', count: 5 },
];

export default function PlansPage() {
  const [modalOpen, setModalOpen] = useState(false);
  const [editingPlan, setEditingPlan] = useState<any>(null);

  const openEdit = (plan: any) => { setEditingPlan(plan); setModalOpen(true); };
  const openCreate = () => { setEditingPlan(null); setModalOpen(true); };

  return (
    <div className="super-page">
      <div className="super-page-header">
        <div>
          <Title level={4} className="super-page-title"><GiftOutlined className="super-page-icon" /> Subscription Plans</Title>
          <Text type="secondary">Manage platform subscription plans, pricing, and feature tiers</Text>
        </div>
        <Button type="primary" icon={<PlusOutlined />} style={{ background: '#d4a853', borderColor: '#d4a853' }} onClick={openCreate}>Create Plan</Button>
      </div>

      <div className="plans-stats-row">
        <Row gutter={[16, 16]}>
          <Col xs={12} sm={6}><Card className="plans-stat-card" variant="borderless"><Text className="plans-stat-value">$1.2M</Text><Text className="plans-stat-label">Total MRR</Text></Card></Col>
          <Col xs={12} sm={6}><Card className="plans-stat-card" variant="borderless"><Text className="plans-stat-value">1,164</Text><Text className="plans-stat-label">Active Subscribers</Text></Card></Col>
          <Col xs={12} sm={6}><Card className="plans-stat-card" variant="borderless"><Text className="plans-stat-value">4</Text><Text className="plans-stat-label">Active Plans</Text></Card></Col>
          <Col xs={12} sm={6}><Card className="plans-stat-card" variant="borderless"><Text className="plans-stat-value">$291</Text><Text className="plans-stat-label">Avg. Revenue/User</Text></Card></Col>
        </Row>
      </div>

      <Row gutter={[16, 16]}>
        {plans.map((plan) => (
          <Col xs={24} sm={12} lg={6} key={plan.key}>
            <Card className={`plans-card ${plan.key}`} variant="borderless">
              <div className="plans-card-header">
                <div className="plans-card-icon" style={{ background: `${plan.color}15`, color: plan.color }}>{plan.icon}</div>
                <Space>
                  <Switch defaultChecked={plan.status} size="small" />
                  <Button type="text" size="small" icon={<EditOutlined />} onClick={() => openEdit(plan)} />
                </Space>
              </div>
              <Title level={4} className="plans-card-name">{plan.name}</Title>
              <div className="plans-card-price">
                <Text className="plans-price">{plan.price}</Text>
                <Text className="plans-cycle">{plan.cycle}</Text>
              </div>
              <Text type="secondary" style={{ fontSize: 12, display: 'block', marginBottom: 12 }}>{plan.yearlyPrice}/year</Text>
              <div className="plans-card-subscribers"><TeamOutlined /> {plan.subscribers} subscribers</div>
              <div className="plans-card-features">
                {plan.features.map((f, i) => (
                  <div key={i} className="plans-card-feature"><CheckOutlined style={{ color: '#10b981', fontSize: 12 }} /> {f}</div>
                ))}
              </div>
              <Tag style={{ marginTop: 8 }}>{plan.trialDays}-day trial</Tag>
            </Card>
          </Col>
        ))}
      </Row>

      <Row gutter={[16, 16]} style={{ marginTop: 24 }}>
        <Col xs={24} lg={12}>
          <Card className="super-page-card" variant="borderless" title={<span className="card-title">Revenue by Plan</span>}>
            <BarChart data={planRevenueData} height={240} formatValue={(v) => `$${(v / 1000).toFixed(0)}k`} />
          </Card>
        </Col>

        <Col xs={24} lg={12}>
          <Card className="super-page-card" variant="borderless" title={<span className="card-title">Upgrade Trends</span>}>
            <DataTable columns={[
              { title: 'From', dataIndex: 'from', key: 'from', render: (f: string) => <Tag>{f}</Tag> },
              { title: 'To', dataIndex: 'to', key: 'to', render: (t: string) => <Tag color="gold">{t}</Tag> },
              { title: 'Upgrades', dataIndex: 'count', key: 'count', render: (c: number) => <Text strong>{c}</Text> },
              { title: 'Trend', key: 'trend', render: () => <ArrowUpOutlined style={{ color: '#10b981' }} /> },
            ]} dataSource={upgradeTrends} pagination={false} />
          </Card>
        </Col>
      </Row>

      <Modal
        title={editingPlan ? `Edit ${editingPlan.name} Plan` : 'Create New Plan'}
        open={modalOpen}
        onCancel={() => setModalOpen(false)}
        footer={null}
        width={640}
      >
        <Form layout="vertical">
          <Row gutter={16}>
            <Col span={12}>
              <Form.Item label="Plan Name" required>
                <Input defaultValue={editingPlan?.name} placeholder="e.g., Professional" />
              </Form.Item>
            </Col>
            <Col span={12}>
              <Form.Item label="Status">
                <Switch defaultChecked={editingPlan?.status !== false} />
              </Form.Item>
            </Col>
          </Row>

          <Divider>Pricing</Divider>

          <Row gutter={16}>
            <Col span={12}>
              <Form.Item label="Monthly Price ($)" required>
                <InputNumber defaultValue={parseInt(editingPlan?.price?.replace('$', '') || '0')} min={0} style={{ width: '100%' }} prefix="$" />
              </Form.Item>
            </Col>
            <Col span={12}>
              <Form.Item label="Yearly Price ($)">
                <InputNumber defaultValue={parseInt(editingPlan?.yearlyPrice?.replace(/[$,]/g, '') || '0')} min={0} style={{ width: '100%' }} prefix="$" />
              </Form.Item>
            </Col>
          </Row>

          <Form.Item label="Trial Days">
            <InputNumber defaultValue={editingPlan?.trialDays || 14} min={0} max={90} style={{ width: 200 }} />
          </Form.Item>

          <Divider>Features</Divider>

          <Form.Item label="Included Features">
            <Select
              mode="multiple"
              defaultValue={editingPlan?.features || []}
              style={{ width: '100%' }}
              placeholder="Select features"
              options={allFeatures.map((f) => ({ label: f, value: f }))}
            />
          </Form.Item>

          <Divider />

          <div style={{ textAlign: 'right' }}>
            <Space>
              <Button onClick={() => setModalOpen(false)}>Cancel</Button>
              <Button type="primary" style={{ background: '#d4a853', borderColor: '#d4a853' }}>
                {editingPlan ? 'Save Changes' : 'Create Plan'}
              </Button>
            </Space>
          </div>
        </Form>
      </Modal>
    </div>
  );
}

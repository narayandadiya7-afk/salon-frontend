'use client';

import React, { useState } from 'react';
import { Row, Col, Card, Typography, Space, Button, Tag, Switch, Modal, Form, Input, Select, Checkbox, Slider } from 'antd';
import {
  GiftOutlined, PlusOutlined, CheckOutlined, CloseOutlined, TeamOutlined,
  DollarOutlined, EditOutlined, ThunderboltOutlined, CrownOutlined, StarOutlined,
} from '@ant-design/icons';
import StatusBadge from '../../../../components/super-admin/StatusBadge';
import './Plans.css';

const { Text, Title } = Typography;

const plans = [
  {
    key: 'starter', name: 'Starter', price: '$99', cycle: '/month', icon: <StarOutlined />,
    color: '#3b82f6', subscribers: 485, status: true,
    features: ['Up to 3 staff', 'Basic analytics', 'Email support', '1 salon location', 'Booking widget'],
  },
  {
    key: 'growth', name: 'Growth', price: '$299', cycle: '/month', icon: <ThunderboltOutlined />,
    color: '#10b981', subscribers: 372, status: true,
    features: ['Up to 10 staff', 'Advanced analytics', 'Priority support', '3 salon locations', 'Marketing tools', 'API access'],
  },
  {
    key: 'professional', name: 'Professional', price: '$599', cycle: '/month', icon: <CrownOutlined />,
    color: '#d4a853', subscribers: 218, status: true,
    features: ['Unlimited staff', 'Full analytics suite', '24/7 phone support', 'Unlimited locations', 'Marketing automation', 'API access', 'Custom domain', 'White-label option'],
  },
  {
    key: 'enterprise', name: 'Enterprise', price: '$999', cycle: '/month', icon: <DollarOutlined />,
    color: '#8b5cf6', subscribers: 89, status: true,
    features: ['Everything in Professional', 'Dedicated account manager', 'Custom integrations', 'SLA guarantee', 'On-premise option', 'Advanced security', 'Multi-region deployment'],
  },
];

const allFeatures = [
  'Up to 3 staff', 'Up to 10 staff', 'Unlimited staff',
  'Basic analytics', 'Advanced analytics', 'Full analytics suite',
  'Email support', 'Priority support', '24/7 phone support',
  '1 salon location', '3 salon locations', 'Unlimited locations',
  'Booking widget', 'Marketing tools', 'Marketing automation',
  'API access', 'Custom domain', 'White-label option',
  'Dedicated account manager', 'Custom integrations', 'SLA guarantee',
  'On-premise option', 'Advanced security', 'Multi-region deployment',
];

export default function PlansPage() {
  const [modalOpen, setModalOpen] = useState(false);
  const [editingPlan, setEditingPlan] = useState<any>(null);

  const openEdit = (plan: any) => {
    setEditingPlan(plan);
    setModalOpen(true);
  };

  const openCreate = () => {
    setEditingPlan(null);
    setModalOpen(true);
  };

  return (
    <div className="super-page">
      <div className="super-page-header">
        <div>
          <Title level={4} className="super-page-title">
            <GiftOutlined className="super-page-icon" /> Subscription Plans
          </Title>
          <Text type="secondary">Manage platform subscription plans and feature tiers</Text>
        </div>
        <Button type="primary" icon={<PlusOutlined />} style={{ background: '#d4a853', borderColor: '#d4a853' }} onClick={openCreate}>
          Create Plan
        </Button>
      </div>

      <div className="plans-stats-row">
        <Row gutter={[16, 16]}>
          <Col xs={12} sm={6}>
            <Card className="plans-stat-card" variant="borderless">
              <Text className="plans-stat-value">$1.2M</Text>
              <Text className="plans-stat-label">Total MRR</Text>
            </Card>
          </Col>
          <Col xs={12} sm={6}>
            <Card className="plans-stat-card" variant="borderless">
              <Text className="plans-stat-value">1,164</Text>
              <Text className="plans-stat-label">Active Subscribers</Text>
            </Card>
          </Col>
          <Col xs={12} sm={6}>
            <Card className="plans-stat-card" variant="borderless">
              <Text className="plans-stat-value">4</Text>
              <Text className="plans-stat-label">Active Plans</Text>
            </Card>
          </Col>
          <Col xs={12} sm={6}>
            <Card className="plans-stat-card" variant="borderless">
              <Text className="plans-stat-value">$291</Text>
              <Text className="plans-stat-label">Avg. Revenue/User</Text>
            </Card>
          </Col>
        </Row>
      </div>

      <Row gutter={[16, 16]}>
        {plans.map((plan) => (
          <Col xs={24} sm={12} lg={6} key={plan.key}>
            <Card className={`plans-card ${plan.key}`} variant="borderless">
              <div className="plans-card-header">
                <div className="plans-card-icon" style={{ background: `${plan.color}15`, color: plan.color }}>
                  {plan.icon}
                </div>
                <Switch defaultChecked={plan.status} size="small" />
              </div>
              <Title level={4} className="plans-card-name">{plan.name}</Title>
              <div className="plans-card-price">
                <Text className="plans-price">{plan.price}</Text>
                <Text className="plans-cycle">{plan.cycle}</Text>
              </div>
              <div className="plans-card-subscribers">
                <TeamOutlined /> {plan.subscribers} subscribers
              </div>
              <div className="plans-card-features">
                {plan.features.map((f, i) => (
                  <div key={i} className="plans-feature-item">
                    <CheckOutlined style={{ color: '#10b981', fontSize: 12 }} />
                    <Text className="plans-feature-text">{f}</Text>
                  </div>
                ))}
              </div>
              <Button block className="plans-edit-btn" icon={<EditOutlined />} onClick={() => openEdit(plan)}>
                Edit Plan
              </Button>
            </Card>
          </Col>
        ))}
      </Row>

      {/* Plan feature comparison hint */}
      <Card className="super-page-card" variant="borderless" style={{ marginTop: 16 }}>
        <div style={{ textAlign: 'center', padding: '12px 0' }}>
          <Text type="secondary">View detailed feature comparison across all plans</Text>
          <Button type="link" style={{ color: '#d4a853' }}>Compare Plans</Button>
        </div>
      </Card>

      <Modal
        title={editingPlan ? `Edit ${editingPlan.name} Plan` : 'Create New Plan'}
        open={modalOpen}
        onCancel={() => setModalOpen(false)}
        width={600}
        footer={[
          <Button key="cancel" onClick={() => setModalOpen(false)}>Cancel</Button>,
          <Button key="save" type="primary" style={{ background: '#d4a853', borderColor: '#d4a853' }}>
            {editingPlan ? 'Save Changes' : 'Create Plan'}
          </Button>,
        ]}
      >
        <Form layout="vertical">
          <Row gutter={16}>
            <Col span={12}>
              <Form.Item label="Plan Name" required>
                <Input defaultValue={editingPlan?.name} />
              </Form.Item>
            </Col>
            <Col span={12}>
              <Form.Item label="Price" required>
                <Input prefix="$" defaultValue={editingPlan?.price?.replace('$', '')} />
              </Form.Item>
            </Col>
          </Row>
          <Form.Item label="Description">
            <Input.TextArea rows={3} placeholder="Describe this plan..." />
          </Form.Item>
          <Row gutter={16}>
            <Col span={12}>
              <Form.Item label="Billing Cycle">
                <Select defaultValue="monthly" options={[{ label: 'Monthly', value: 'monthly' }, { label: 'Yearly', value: 'yearly' }]} />
              </Form.Item>
            </Col>
            <Col span={12}>
              <Form.Item label="Trial Period (days)">
                <Input defaultValue={14} type="number" />
              </Form.Item>
            </Col>
          </Row>
          <Form.Item label="Features">
            <Checkbox.Group>
              <Row gutter={[8, 8]}>
                {allFeatures.map((f) => (
                  <Col span={12} key={f}>
                    <Checkbox value={f} checked={editingPlan?.features.includes(f)}>{f}</Checkbox>
                  </Col>
                ))}
              </Row>
            </Checkbox.Group>
          </Form.Item>
        </Form>
      </Modal>
    </div>
  );
}

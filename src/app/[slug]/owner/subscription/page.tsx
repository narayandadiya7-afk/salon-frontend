'use client';

import React from 'react';
import {
  Row, Col, Card, Tag, Button, Space, Table, Typography, Divider, Tooltip, Badge, Progress, Steps, List, Alert,
} from 'antd';
import {
  CreditCardOutlined, CrownOutlined, CheckCircleOutlined, CloseCircleOutlined, RightOutlined,
  ArrowRightOutlined, ClockCircleOutlined, FileTextOutlined, DownloadOutlined, GiftOutlined,
  SafetyOutlined, RocketOutlined, StarOutlined, TeamOutlined, SettingOutlined, MoreOutlined,
} from '@ant-design/icons';

const { Text } = Typography;

const planFeatures = [
  'Unlimited bookings',
  'Staff management',
  'Website CMS',
  'Analytics',
  'Marketing tools',
  'Priority support',
];

const plans = [
  {
    name: 'Basic',
    price: '₹999',
    period: '/month',
    description: 'Perfect for small salons getting started',
    features: ['100 bookings/mo', '3 staff members', 'Basic analytics', 'Email support'],
    color: 'var(--salon-primary)',
    gradient: 'none',
  },
  {
    name: 'Pro',
    price: '₹2,499',
    period: '/month',
    description: 'Best for growing salons',
    features: ['Unlimited bookings', '10 staff members', 'Full analytics', 'Website CMS', 'Marketing tools', 'Priority support'],
    color: 'var(--salon-primary)',
    gradient: 'none',
    highlighted: true,
  },
  {
    name: 'Enterprise',
    price: '₹4,999',
    period: '/month',
    description: 'For multi-location chains',
    features: ['Everything in Pro', 'Unlimited staff', 'Custom branding', 'Dedicated manager', 'API access', 'White-label solution'],
    color: '#F59E0B',
    gradient: 'linear-gradient(135deg, #F59E0B, #F97316)',
  },
];

const billingHistory = [
  { key: '1', invoice: 'INV-2024-001', date: 'Jan 15, 2024', amount: '₹2,499', status: 'Paid', plan: 'Pro Plan' },
  { key: '2', invoice: 'INV-2023-012', date: 'Dec 15, 2023', amount: '₹2,499', status: 'Paid', plan: 'Pro Plan' },
  { key: '3', invoice: 'INV-2023-011', date: 'Nov 15, 2023', amount: '₹2,499', status: 'Paid', plan: 'Pro Plan' },
  { key: '4', invoice: 'INV-2023-010', date: 'Oct 15, 2023', amount: '₹2,499', status: 'Paid', plan: 'Pro Plan' },
  { key: '5', invoice: 'INV-2023-009', date: 'Sep 15, 2023', amount: '₹2,499', status: 'Pending', plan: 'Pro Plan' },
  { key: '6', invoice: 'INV-2023-008', date: 'Aug 15, 2023', amount: '₹2,499', status: 'Failed', plan: 'Pro Plan' },
];

const statusConfig: Record<string, { color: string; bg: string; icon: React.ReactNode }> = {
  Paid: { color: '#10B981', bg: 'rgba(16,185,129,0.1)', icon: <CheckCircleOutlined /> },
  Pending: { color: '#F59E0B', bg: 'rgba(245,158,11,0.1)', icon: <ClockCircleOutlined /> },
  Failed: { color: '#EF4444', bg: 'rgba(239,68,68,0.1)', icon: <CloseCircleOutlined /> },
};

const columns = [
  {
    title: 'Invoice',
    dataIndex: 'invoice',
    key: 'invoice',
    render: (val: string) => (
      <Space>
        <FileTextOutlined style={{ color: 'var(--salon-primary)', fontSize: 13 }} />
        <Text style={{ fontSize: 13, fontWeight: 600 }}>{val}</Text>
      </Space>
    ),
  },
  { title: 'Date', dataIndex: 'date', key: 'date', render: (val: string) => <Text style={{ fontSize: 13, color: 'var(--theme-text-secondary)' }}>{val}</Text> },
  {
    title: 'Amount',
    dataIndex: 'amount',
    key: 'amount',
    render: (val: string) => <Text style={{ fontSize: 13, fontWeight: 600, color: '#059669' }}>{val}</Text>,
  },
  {
    title: 'Status',
    dataIndex: 'status',
    key: 'status',
    render: (status: string) => {
      const cfg = statusConfig[status] || statusConfig.Paid;
      return (
        <span style={{
          display: 'inline-flex', alignItems: 'center', gap: 4,
          padding: '2px 10px', borderRadius: 20, fontSize: 11, fontWeight: 600,
          background: cfg.bg, color: cfg.color,
        }}>
          {cfg.icon}
          {status}
        </span>
      );
    },
  },
  { title: 'Plan', dataIndex: 'plan', key: 'plan', render: (val: string) => <Text style={{ fontSize: 13 }}>{val}</Text> },
  {
    key: 'download',
    width: 60,
    render: () => (
      <Tooltip title="Download Invoice">
        <Button type="text" size="small" icon={<DownloadOutlined />} style={{ borderRadius: 6, color: 'var(--theme-text-secondary)' }} />
      </Tooltip>
    ),
  },
];

function SubscriptionContent() {
  const billingPeriodDays = 31;
  const daysUsed = 18;

  return (
    <div>
      {/* Page Header */}
      <div className="page-header-row">
        <div>
          <h1 className="page-header-title">Subscription & Billing</h1>
          <p className="page-header-subtitle">Manage your plan, payments, and billing details</p>
        </div>
        <Space>
          <Button icon={<GiftOutlined />} style={{ borderRadius: 10, border: '1px solid var(--theme-border)' }}>
            Refer & Earn
          </Button>
          <Button type="primary" icon={<RocketOutlined />} style={{
            borderRadius: 10,
          }}>
            Upgrade Plan
          </Button>
        </Space>
      </div>

      {/* Current Plan Card */}
      <Row gutter={[20, 20]} style={{ marginBottom: 28 }}>
        <Col xs={24} lg={16}>
          <Card
            className="premium-card"
            style={{
            background: 'linear-gradient(135deg, color-mix(in srgb, var(--salon-primary) 3%, transparent), color-mix(in srgb, var(--salon-secondary) 3%, transparent))',
            border: '1px solid color-mix(in srgb, var(--salon-primary) 12%, transparent)',
            }}
          >
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', flexWrap: 'wrap', gap: 16 }}>
              <div style={{ flex: 1, minWidth: 200 }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 8 }}>
                  <div style={{
                    width: 40, height: 40, borderRadius: 12,
                    background: 'var(--salon-primary)',
                    display: 'flex', alignItems: 'center', justifyContent: 'center',
                    color: '#fff', fontSize: 20,
                  }}>
                    <CrownOutlined />
                  </div>
                  <div>
                    <Space align="center">
                      <Text style={{ fontSize: 20, fontWeight: 700 }}>Pro Plan</Text>
                      <Badge count="Active" style={{
                        backgroundColor: '#10B981', fontSize: 10, fontWeight: 600,
                        padding: '0 8px', lineHeight: '18px', height: 18, boxShadow: 'none',
                        borderRadius: 10,
                      }} />
                    </Space>
                  </div>
                </div>
                <div style={{ display: 'flex', alignItems: 'baseline', gap: 4, marginBottom: 4 }}>
                  <Text style={{ fontSize: 28, fontWeight: 700, color: 'var(--salon-primary)' }}>₹2,499</Text>
                  <Text style={{ fontSize: 14, color: 'var(--theme-text-secondary)' }}>/month</Text>
                </div>
                <Text style={{ fontSize: 12, color: 'var(--theme-text-secondary)' }}>
                  Billing period: Jan 15, 2024 - Feb 14, 2024
                </Text>
              </div>

              <Space style={{ alignSelf: 'flex-end' }}>
                <Button icon={<RocketOutlined />} type="primary" style={{
                  borderRadius: 10,
                }}>
                  Upgrade Plan
                </Button>
                <Button icon={<CloseCircleOutlined />} danger style={{ borderRadius: 10 }}>
                  Cancel Subscription
                </Button>
              </Space>
            </div>

            <Divider style={{ margin: '16px 0', borderColor: 'var(--theme-border-light)' }} />

            <Row gutter={[16, 16]}>
              <Col xs={24} sm={12}>
                <div style={{ marginBottom: 8 }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 6 }}>
                    <Text style={{ fontSize: 12, color: 'var(--theme-text-secondary)' }}>Billing cycle progress</Text>
                    <Text style={{ fontSize: 12, fontWeight: 600 }}>{daysUsed}/{billingPeriodDays} days</Text>
                  </div>
                  <Progress
                    percent={Math.round((daysUsed / billingPeriodDays) * 100)}
                    showInfo={false}
                    strokeColor={{
                      from: 'var(--salon-primary)',
                      to: 'var(--salon-secondary)',
                    }}
                    trailColor="color-mix(in srgb, var(--salon-primary) 8%, transparent)"
                    size="small"
                    style={{ margin: 0 }}
                  />
                </div>
              </Col>
              <Col xs={24} sm={12}>
                <div style={{ display: 'flex', gap: 24 }}>
                  <div>
                    <Text style={{ fontSize: 11, color: 'var(--theme-text-secondary)', display: 'block' }}>Next billing</Text>
                    <Text style={{ fontSize: 14, fontWeight: 600 }}>Feb 14, 2024</Text>
                  </div>
                  <div>
                    <Text style={{ fontSize: 11, color: 'var(--theme-text-secondary)', display: 'block' }}>Amount</Text>
                    <Text style={{ fontSize: 14, fontWeight: 600, color: 'var(--salon-primary)' }}>₹2,499</Text>
                  </div>
                </div>
              </Col>
            </Row>

            <Divider style={{ margin: '16px 0', borderColor: 'var(--theme-border-light)' }} />

            <div>
              <Text style={{ fontSize: 13, fontWeight: 600, display: 'block', marginBottom: 10 }}>Plan Features</Text>
              <Row gutter={[8, 8]}>
                {planFeatures.map((feature, i) => (
                  <Col xs={12} sm={8} key={i}>
                    <Space size={6}>
                      <CheckCircleOutlined style={{ color: '#10B981', fontSize: 12 }} />
                      <Text style={{ fontSize: 12, color: 'var(--theme-text-secondary)' }}>{feature}</Text>
                    </Space>
                  </Col>
                ))}
              </Row>
            </div>
          </Card>
        </Col>

        {/* Quick Stats Panel */}
        <Col xs={24} lg={8}>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
            <div className="stat-widget">
              <div className="stat-widget-header">
                <div className="stat-widget-icon" style={{ background: 'color-mix(in srgb, var(--salon-primary) 10%, transparent)', color: 'var(--salon-primary)', borderRadius: 10 }}>
                  <SafetyOutlined />
                </div>
                <Tag style={{ borderRadius: 6, margin: 0, fontSize: 11, border: 'none', background: 'rgba(16,185,129,0.08)', color: '#10B981' }}>Secure</Tag>
              </div>
              <div className="stat-widget-label">Payment Method</div>
                <div className="stat-widget-value" style={{ fontSize: 14, fontWeight: 600, display: 'flex', alignItems: 'center', gap: 8 }}>
                <CreditCardOutlined style={{ color: 'var(--salon-primary)' }} />
                •••• 4242
              </div>
              <Button type="link" style={{ padding: 0, fontSize: 12, color: 'var(--theme-text-secondary)' }}>
                Update Payment Method <RightOutlined style={{ fontSize: 10 }} />
              </Button>
            </div>

            <div className="stat-widget">
              <div className="stat-widget-header">
                <div className="stat-widget-icon" style={{ background: 'rgba(245,158,11,0.1)', color: '#F59E0B', borderRadius: 10 }}>
                  <GiftOutlined />
                </div>
                <Tag style={{ borderRadius: 6, margin: 0, fontSize: 11, border: 'none', background: 'rgba(245,158,11,0.08)', color: '#F59E0B' }}>Referral</Tag>
              </div>
              <div className="stat-widget-label">Referral Credits</div>
              <div className="stat-widget-value">₹0</div>
              <div style={{ fontSize: 11, color: 'var(--theme-text-tertiary)', marginTop: 2 }}>
                Refer a friend to earn ₹500 credit
              </div>
            </div>

            <div className="stat-widget">
              <div className="stat-widget-header">
                <div className="stat-widget-icon" style={{ background: 'color-mix(in srgb, var(--salon-primary) 10%, transparent)', color: 'var(--salon-primary)', borderRadius: 10 }}>
                  <StarOutlined />
                </div>
                <Tag style={{ borderRadius: 6, margin: 0, fontSize: 11, border: 'none', background: 'color-mix(in srgb, var(--salon-primary) 8%, transparent)', color: 'var(--salon-primary)' }}>Account</Tag>
              </div>
              <div className="stat-widget-label">Account Age</div>
              <div className="stat-widget-value">8 months</div>
              <div style={{ fontSize: 11, color: 'var(--theme-text-tertiary)', marginTop: 2 }}>
                Member since Jun 2023
              </div>
            </div>
          </div>
        </Col>
      </Row>

      {/* Plan Comparison */}
      <div style={{ marginBottom: 28 }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 16 }}>
          <div>
            <Text style={{ fontSize: 16, fontWeight: 600 }}>Compare Plans</Text>
            <div style={{ fontSize: 12, color: 'var(--theme-text-secondary)', marginTop: 2 }}>Choose the plan that fits your business</div>
          </div>
        </div>

        <Row gutter={[20, 20]}>
          {plans.map((plan, i) => (
            <Col xs={24} md={8} key={i}>
              <div style={{
                background: plan.highlighted
                  ? 'color-mix(in srgb, var(--salon-primary) 4%, transparent)'
                  : 'var(--theme-surface)',
                borderRadius: 16,
                border: plan.highlighted
                  ? '2px solid transparent'
                  : '1px solid var(--theme-border-light)',
                padding: 24,
                position: 'relative',
                overflow: 'hidden',
                transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
                boxShadow: plan.highlighted ? '0 8px 32px color-mix(in srgb, var(--salon-primary) 12%, transparent)' : 'none',
                ...(plan.highlighted ? {
                  borderColor: 'var(--salon-primary)',
                } : {}),
              }}>
                {plan.highlighted && (
                  <div style={{
                    position: 'absolute', top: 16, right: -32,
                    background: 'var(--salon-primary)',
                    color: '#fff', fontSize: 10, fontWeight: 700,
                    padding: '2px 36px', transform: 'rotate(45deg)',
                    textTransform: 'uppercase',
                    letterSpacing: 0.5,
                  }}>
                    Popular
                  </div>
                )}

                <div style={{
                  width: 44, height: 44, borderRadius: 12, marginBottom: 12,
                  background: plan.highlighted
                    ? 'var(--salon-primary)'
                    : `color-mix(in srgb, ${plan.color} 12%, transparent)`,
                  display: 'flex', alignItems: 'center', justifyContent: 'center',
                  color: plan.highlighted ? '#fff' : plan.color,
                  fontSize: 20,
                }}>
                  {i === 0 ? <TeamOutlined /> : i === 1 ? <CrownOutlined /> : <RocketOutlined />}
                </div>

                <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 4 }}>
                  <Text style={{ fontSize: 18, fontWeight: 700 }}>{plan.name}</Text>
                  {plan.highlighted && (
              <Tag style={{
                    borderRadius: 6, fontSize: 9, fontWeight: 600, border: 'none',
                    background: 'color-mix(in srgb, var(--salon-primary) 10%, transparent)', color: 'var(--salon-primary)', margin: 0,
                    padding: '0 6px', lineHeight: '18px',
                  }}>
                    Current Plan
                  </Tag>
                  )}
                </div>

                <Text style={{ fontSize: 12, color: 'var(--theme-text-secondary)', display: 'block', marginBottom: 12 }}>
                  {plan.description}
                </Text>

                <div style={{ display: 'flex', alignItems: 'baseline', gap: 4, marginBottom: 16 }}>
                  <Text style={{ fontSize: 28, fontWeight: 700, color: plan.highlighted ? 'var(--salon-primary)' : 'var(--theme-text)' }}>
                    {plan.price}
                  </Text>
                  <Text style={{ fontSize: 13, color: 'var(--theme-text-secondary)' }}>{plan.period}</Text>
                </div>

                <Divider style={{ margin: '0 0 16px', borderColor: 'var(--theme-border-light)' }} />

                <List
                  dataSource={plan.features}
                  split={false}
                  renderItem={(feature) => (
                    <List.Item style={{ padding: '5px 0', border: 'none' }}>
                      <Space size={8}>
                        <CheckCircleOutlined style={{ color: plan.highlighted ? 'var(--salon-primary)' : '#10B981', fontSize: 12 }} />
                        <Text style={{ fontSize: 12, color: 'var(--theme-text-secondary)' }}>{feature}</Text>
                      </Space>
                    </List.Item>
                  )}
                  style={{ marginBottom: 20 }}
                />

                {plan.highlighted ? (
                  <Button
                    type="primary"
                    icon={<SettingOutlined />}
                    block
                    style={{
                      borderRadius: 10,
                      height: 40,
                    }}
                  >
                    Manage Plan
                  </Button>
                ) : (
                  <Button
                    icon={<ArrowRightOutlined />}
                    block
                    style={{
                      borderRadius: 10,
                      border: `1.5px solid color-mix(in srgb, ${plan.color} 30%, transparent)`,
                      color: plan.color,
                      height: 40,
                    }}
                  >
                    Upgrade to {plan.name}
                  </Button>
                )}
              </div>
            </Col>
          ))}
        </Row>
      </div>

      {/* Billing History & Payment Method */}
      <Row gutter={[20, 20]} style={{ marginBottom: 28 }}>
        <Col xs={24} lg={16}>
          <Card
            className="premium-card"
            title={
              <Space>
                <FileTextOutlined style={{ color: 'var(--salon-primary)' }} />
                <span>Billing History</span>
              </Space>
            }
          >
            <Table
              columns={columns}
              dataSource={billingHistory}
              pagination={false}
              size="small"
              style={{ fontSize: 13 }}
            />
          </Card>
        </Col>

        <Col xs={24} lg={8}>
          <Card
            className="premium-card"
            title={
              <Space>
                <CreditCardOutlined style={{ color: 'var(--salon-primary)' }} />
                <span>Payment Method</span>
              </Space>
            }
          >
            <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
              <div style={{
                display: 'flex', alignItems: 'center', gap: 14,
                padding: 14, borderRadius: 12,
                background: 'color-mix(in srgb, var(--salon-primary) 4%, transparent)',
                border: '1px solid color-mix(in srgb, var(--salon-primary) 10%, transparent)',
              }}>
                <div style={{
                  width: 44, height: 30, borderRadius: 6,
                  background: 'linear-gradient(135deg, #1a1a2e, #16213e)',
                  display: 'flex', alignItems: 'center', justifyContent: 'center',
                  color: '#fff', fontSize: 10, fontWeight: 700, letterSpacing: 0.5,
                  flexShrink: 0,
                }}>
                  VISA
                </div>
                <div style={{ flex: 1 }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                    <Text style={{ fontSize: 13, fontWeight: 600 }}>Visa •••• 4242</Text>
                    <CheckCircleOutlined style={{ color: '#10B981', fontSize: 14 }} />
                  </div>
                  <Text style={{ fontSize: 11, color: 'var(--theme-text-secondary)' }}>Expires 12/26</Text>
                </div>
              </div>

              <Button icon={<SettingOutlined />} style={{ borderRadius: 10, border: '1px solid var(--theme-border)' }}>
                Update Payment Method
              </Button>

              <Divider style={{ margin: '4px 0', borderColor: 'var(--theme-border-light)' }} />

              <div>
                <Space size={8} style={{ marginBottom: 8 }}>
                  <SafetyOutlined style={{ color: '#10B981', fontSize: 12 }} />
                  <Text style={{ fontSize: 12, color: 'var(--theme-text-secondary)' }}>Payments are secure and encrypted</Text>
                </Space>
                <br />
                <Space size={8}>
                  <SafetyOutlined style={{ color: 'var(--salon-primary)', fontSize: 12 }} />
                  <Text style={{ fontSize: 12, color: 'var(--theme-text-secondary)' }}>Powered by Stripe</Text>
                </Space>
              </div>
            </div>
          </Card>
        </Col>
      </Row>
    </div>
  );
}

export default function SubscriptionPage() {
  return <SubscriptionContent />;
}

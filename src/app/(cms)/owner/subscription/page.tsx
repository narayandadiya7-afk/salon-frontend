'use client';

import React, { useEffect, useState } from 'react';
import { Card, Button, Tag, Typography, Spin, Row, Col, Alert, Divider, Table } from 'antd';
import { CreditCardOutlined, CheckCircleOutlined, ClockCircleOutlined } from '@ant-design/icons';
import dayjs from 'dayjs';
import apiUtil from '../../../../utils/api';
import { ApiOwnerSalon, ApiCreateOrder, ApiVerifyPayment, ApiPaymentHistory } from '../../../../utils/api.constant';
import { notification } from '../../../../utils/notification';
import { eResultCode } from '../../../../utils/enum';

const { Title, Text } = Typography;

declare global {
  interface Window {
    Razorpay: any;
  }
}

const PLANS = [
  {
    planType: 'BASIC',
    label: 'Basic',
    price: '₹499',
    period: '/month',
    amount: 49900,
    features: ['Your own salon website', 'Online booking', 'Up to 10 services', 'Email support'],
    color: '#1890ff',
  },
  {
    planType: 'PRO',
    label: 'Pro',
    price: '₹999',
    period: '/month',
    amount: 99900,
    features: ['Everything in Basic', 'Unlimited services', 'Custom branding', 'Priority support', 'Advanced analytics'],
    color: '#722ed1',
    popular: true,
  },
  {
    planType: 'PRO_YEARLY',
    label: 'Pro Yearly',
    price: '₹8,999',
    period: '/year',
    amount: 899900,
    features: ['Everything in Pro', 'Save ₹2,989/year', 'Dedicated support', 'Custom integrations'],
    color: '#52c41a',
    badge: 'Best Value',
  },
];

interface Salon {
  id: string;
  planType: string;
  subscriptionStatus: string;
  subscriptionExpiry: string;
}

interface Payment {
  id: string;
  amount: number;
  planType: string;
  status: string;
  createdAt: string;
  razorpayPaymentId?: string;
}

export default function SubscriptionPage() {
  const [salon, setSalon] = useState<Salon | null>(null);
  const [payments, setPayments] = useState<Payment[]>([]);
  const [loading, setLoading] = useState(true);
  const [processingPlan, setProcessingPlan] = useState<string | null>(null);

  useEffect(() => {
    fetchData();
    loadRazorpay();
  }, []);

  const loadRazorpay = () => {
    if (typeof window !== 'undefined' && !window.Razorpay) {
      const script = document.createElement('script');
      script.src = 'https://checkout.razorpay.com/v1/checkout.js';
      document.body.appendChild(script);
    }
  };

  const fetchData = async () => {
    try {
      setLoading(true);
      const [salonRes, paymentsRes] = await Promise.all([
        apiUtil.get(ApiOwnerSalon),
        apiUtil.get(ApiPaymentHistory),
      ]);

      const salonRc = salonRes?.dataResponse?.returnCode;
      if (salonRc === eResultCode.SUCCESS || salonRc === eResultCode.CREATED) {
        setSalon(salonRes.data);
      }

      const paymentsRc = paymentsRes?.dataResponse?.returnCode;
      if (paymentsRc === eResultCode.SUCCESS || paymentsRc === eResultCode.CREATED) {
        setPayments(paymentsRes.data || []);
      }
    } catch {
      notification.error('Failed to load subscription data');
    } finally {
      setLoading(false);
    }
  };

  const handleSubscribe = async (planType: string) => {
    if (!salon) return;
    try {
      setProcessingPlan(planType);

      // Create Razorpay order
      const orderRes = await apiUtil.post(ApiCreateOrder, {
        planType,
        salonId: salon.id,
      });

      const orderRc = orderRes?.dataResponse?.returnCode;
      if (orderRc !== eResultCode.SUCCESS && orderRc !== eResultCode.CREATED) {
        notification.error(orderRes?.dataResponse?.description || 'Failed to create order');
        return;
      }

      const { orderId, amount, currency, keyId, paymentId, description } = orderRes.data;

      // Open Razorpay checkout
      const options = {
        key: keyId,
        amount,
        currency,
        name: 'SalonSaaS',
        description,
        order_id: orderId,
        handler: async (response: any) => {
          // Verify payment
          const verifyRes = await apiUtil.post(ApiVerifyPayment, {
            razorpayOrderId: response.razorpay_order_id,
            razorpayPaymentId: response.razorpay_payment_id,
            razorpaySignature: response.razorpay_signature,
            paymentId,
          });

          const verifyRc = verifyRes?.dataResponse?.returnCode;
          if (verifyRc === eResultCode.SUCCESS || verifyRc === eResultCode.CREATED) {
            notification.success(verifyRes?.dataResponse?.description || 'Payment successful! Subscription activated.');
            fetchData();
          } else {
            notification.error(verifyRes?.dataResponse?.description || 'Payment verification failed. Please contact support.');
          }
        },
        prefill: {
          name: 'Salon Owner',
          email: '',
        },
        theme: { color: '#1890ff' },
        modal: {
          ondismiss: () => setProcessingPlan(null),
        },
      };

      const rzp = new window.Razorpay(options);
      rzp.open();
    } catch {
      notification.error('Payment failed. Please try again.');
    } finally {
      setProcessingPlan(null);
    }
  };

  const paymentColumns = [
    { title: 'Date', dataIndex: 'createdAt', key: 'date', render: (d: string) => dayjs(d).format('DD MMM YYYY') },
    { title: 'Plan', dataIndex: 'planType', key: 'plan', render: (p: string) => <Tag>{p}</Tag> },
    { title: 'Amount', dataIndex: 'amount', key: 'amount', render: (a: number) => `₹${a}` },
    {
      title: 'Status', dataIndex: 'status', key: 'status',
      render: (s: string) => <Tag color={s === 'COMPLETED' ? 'green' : s === 'FAILED' ? 'red' : 'orange'}>{s}</Tag>,
    },
    { title: 'Payment ID', dataIndex: 'razorpayPaymentId', key: 'paymentId', render: (id: string) => id ? <Text copyable style={{ fontSize: 12 }}>{id}</Text> : '—' },
  ];

  if (loading) {
    return (
      <div style={{ display: 'flex', justifyContent: 'center', padding: 60 }}>
        <Spin size="large" />
      </div>
    );
  }

  const isExpired = salon?.subscriptionExpiry && new Date(salon.subscriptionExpiry) < new Date();
  const daysLeft = salon?.subscriptionExpiry ? Math.max(0, dayjs(salon.subscriptionExpiry).diff(dayjs(), 'day')) : 0;

  return (
    <div>
      <div style={{ marginBottom: 24 }}>
        <Title level={2} style={{ margin: 0 }}>
          <CreditCardOutlined style={{ marginRight: 8 }} />
          Subscription
        </Title>
        <Text type="secondary">Manage your SalonSaaS subscription plan</Text>
      </div>

      {/* Current Plan Status */}
      {salon && (
        <Card style={{ borderRadius: 12, marginBottom: 24 }}>
          <Row align="middle" gutter={[16, 16]}>
            <Col xs={24} sm={16}>
              <div style={{ display: 'flex', alignItems: 'center', gap: 12, flexWrap: 'wrap' }}>
                <div>
                  <Text type="secondary">Current Plan</Text>
                  <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginTop: 4 }}>
                    <Title level={3} style={{ margin: 0 }}>{salon.planType}</Title>
                    <Tag color={isExpired ? 'red' : 'green'}>
                      {isExpired ? 'EXPIRED' : salon.subscriptionStatus}
                    </Tag>
                  </div>
                </div>
                <Divider type="vertical" style={{ height: 40 }} />
                <div>
                  <Text type="secondary">
                    <ClockCircleOutlined style={{ marginRight: 4 }} />
                    {isExpired ? 'Expired on' : 'Renews on'}
                  </Text>
                  <div style={{ marginTop: 4 }}>
                    <Text strong>{salon.subscriptionExpiry ? dayjs(salon.subscriptionExpiry).format('DD MMM YYYY') : 'N/A'}</Text>
                    {!isExpired && <Text type="secondary" style={{ marginLeft: 8 }}>({daysLeft} days left)</Text>}
                  </div>
                </div>
              </div>
            </Col>
          </Row>

          {isExpired && (
            <Alert
              type="error"
              title="Your subscription has expired. Your salon website is currently suspended."
              style={{ marginTop: 16 }}
              showIcon
            />
          )}
        </Card>
      )}

      {/* Plans */}
      <Title level={4} style={{ marginBottom: 16 }}>
        {isExpired ? 'Reactivate Your Subscription' : 'Upgrade or Renew Your Plan'}
      </Title>

      <Row gutter={[16, 16]} style={{ marginBottom: 32 }}>
        {PLANS.map((plan) => (
          <Col xs={24} sm={8} key={plan.planType}>
            <Card
              style={{
                borderRadius: 12,
                border: plan.popular ? `2px solid ${plan.color}` : '1px solid #f0f0f0',
                position: 'relative',
              }}
              styles={{ body: { padding: 24 } }}
            >
              {plan.badge && (
                <div style={{
                  position: 'absolute', top: -12, left: '50%', transform: 'translateX(-50%)',
                  background: plan.color, color: '#fff', padding: '2px 16px', borderRadius: 20, fontSize: 12, fontWeight: 600,
                }}>
                  {plan.badge}
                </div>
              )}

              <div style={{ marginBottom: 8 }}>
                <Text strong style={{ fontSize: 18 }}>{plan.label}</Text>
              </div>
              <div style={{ marginBottom: 16 }}>
                <Text style={{ fontSize: 28, fontWeight: 700, color: plan.color }}>{plan.price}</Text>
                <Text type="secondary">{plan.period}</Text>
              </div>

              <ul style={{ paddingLeft: 0, listStyle: 'none', marginBottom: 20 }}>
                {plan.features.map((f) => (
                  <li key={f} style={{ marginBottom: 6, display: 'flex', alignItems: 'center', gap: 8 }}>
                    <CheckCircleOutlined style={{ color: plan.color }} />
                    <Text style={{ fontSize: 13 }}>{f}</Text>
                  </li>
                ))}
              </ul>

              <Button
                type={plan.popular ? 'primary' : 'default'}
                block
                size="large"
                loading={processingPlan === plan.planType}
                onClick={() => handleSubscribe(plan.planType)}
                style={plan.popular ? { background: plan.color, borderColor: plan.color } : {}}
              >
                {salon?.planType === plan.planType ? 'Renew Plan' : 'Subscribe'}
              </Button>
            </Card>
          </Col>
        ))}
      </Row>

      {/* Payment History */}
      <Card title="Payment History" style={{ borderRadius: 12 }}>
        <Table
          columns={paymentColumns}
          dataSource={payments}
          rowKey="id"
          pagination={{ pageSize: 10 }}
          size="small"
        />
      </Card>
    </div>
  );
}

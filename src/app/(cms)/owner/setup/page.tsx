'use client';

import React, { useState, Suspense } from 'react';
import { Card, Form, Input, Button, Steps, Typography, Alert, Row, Col } from 'antd';
import { ShopOutlined, CreditCardOutlined, CheckCircleOutlined } from '@ant-design/icons';
import { useRouter, useSearchParams } from 'next/navigation';
import apiUtil from '../../../../utils/api';
import { ApiTestPaymentSuccess } from '../../../../utils/api.constant';
import { notification } from '../../../../utils/notification';
import { eResultCode } from '../../../../utils/enum';

const { Title, Text } = Typography;

const PLAN_LABELS: Record<string, { label: string; price: string; amount: number }> = {
  BASIC: { label: 'Basic', price: '₹499/month', amount: 49900 },
  PRO: { label: 'Pro', price: '₹999/month', amount: 99900 },
  PRO_YEARLY: { label: 'Pro Yearly', price: '₹8,999/year', amount: 899900 },
};

function SetupForm() {
  const [currentStep, setCurrentStep] = useState(0);
  const [salonData, setSalonData] = useState<any>(null);
  const [loading, setLoading] = useState(false);
  const [form] = Form.useForm();
  const router = useRouter();
  const searchParams = useSearchParams();
  const planType = searchParams.get('plan') || 'BASIC';
  const plan = PLAN_LABELS[planType] || PLAN_LABELS.BASIC;

  const handleSalonDetails = (values: any) => {
    setSalonData(values);
    setCurrentStep(1);
  };

  const handlePayment = async () => {
    try {
      setLoading(true);

      const paymentRes = await apiUtil.post(ApiTestPaymentSuccess, {
        planType,
        salonData,
      });

      const returnCode = paymentRes?.dataResponse?.returnCode;
      if (returnCode === eResultCode.SUCCESS || returnCode === eResultCode.CREATED) {
        setCurrentStep(2);
        notification.success(paymentRes?.dataResponse?.description || 'Payment marked successful! Your salon is live!');
        return;
      }

      notification.error(paymentRes?.dataResponse?.description || 'Failed to activate test payment');
    } catch {
      notification.error('Payment failed. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={{ maxWidth: 640, margin: '0 auto', padding: '40px 24px' }}>
      <div style={{ textAlign: 'center', marginBottom: 32 }}>
        <Title level={2}>Launch Your Salon Website ✂️</Title>
        <Text type="secondary">Complete these steps to get your salon online</Text>
      </div>

      <Steps
        current={currentStep}
        style={{ marginBottom: 32 }}
        items={[
          { title: 'Salon Details', icon: <ShopOutlined /> },
          { title: 'Payment', icon: <CreditCardOutlined /> },
          { title: 'Live!', icon: <CheckCircleOutlined /> },
        ]}
      />

      {/* Step 1: Salon Details */}
      {currentStep === 0 && (
        <Card style={{ borderRadius: 12 }}>
          <Title level={4} style={{ marginBottom: 20 }}>Tell us about your salon</Title>
          <Form form={form} layout="vertical" onFinish={handleSalonDetails}>
            <Form.Item
              name="name"
              label="Salon Name"
              rules={[{ required: true, message: 'Please enter your salon name' }]}
            >
              <Input placeholder="e.g. Glow Beauty Studio" size="large" />
            </Form.Item>

            <Form.Item
              name="slug"
              label="Your Salon URL"
              rules={[
                { required: true, message: 'Please enter a URL slug' },
                { pattern: /^[a-z0-9-]+$/, message: 'Only lowercase letters, numbers, and hyphens' },
              ]}
              extra="Your salon will be at: salonsaas.com/your-slug"
            >
              <Input
                prefix="salonsaas.com/"
                placeholder="glow-beauty-studio"
                size="large"
                onChange={(e) => {
                  const val = e.target.value.toLowerCase().replace(/[^a-z0-9-]/g, '-');
                  form.setFieldValue('slug', val);
                }}
              />
            </Form.Item>

            <Row gutter={16}>
              <Col xs={24} sm={12}>
                <Form.Item name="city" label="City">
                  <Input placeholder="Mumbai" size="large" />
                </Form.Item>
              </Col>
              <Col xs={24} sm={12}>
                <Form.Item name="phone" label="Phone Number">
                  <Input placeholder="+91 98765 43210" size="large" />
                </Form.Item>
              </Col>
            </Row>

            <Form.Item name="description" label="Description">
              <Input.TextArea
                placeholder="Brief description of your salon..."
                rows={3}
              />
            </Form.Item>

            <Button type="primary" htmlType="submit" block size="large">
              Continue to Payment →
            </Button>
          </Form>
        </Card>
      )}

      {/* Step 2: Payment */}
      {currentStep === 1 && (
        <Card style={{ borderRadius: 12 }}>
          <Title level={4} style={{ marginBottom: 20 }}>Complete Payment</Title>

          <div style={{ background: '#f8f9fa', borderRadius: 8, padding: 20, marginBottom: 24 }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 8 }}>
              <Text>Salon Name</Text>
              <Text strong>{salonData?.name}</Text>
            </div>
            <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 8 }}>
              <Text>URL</Text>
              <Text strong>salonsaas.com/{salonData?.slug}</Text>
            </div>
            <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 8 }}>
              <Text>Plan</Text>
              <Text strong>{plan.label}</Text>
            </div>
            <div style={{ display: 'flex', justifyContent: 'space-between', borderTop: '1px solid #e8e8e8', paddingTop: 12, marginTop: 8 }}>
              <Text strong style={{ fontSize: 16 }}>Total</Text>
              <Text strong style={{ fontSize: 18, color: '#1890ff' }}>{plan.price}</Text>
            </div>
          </div>

          <Alert
            type="info"
            title="Testing mode: payment will be marked successful"
            description="No real payment will be collected. Your salon will be activated immediately."
            showIcon
            style={{ marginBottom: 20 }}
          />

          <div style={{ display: 'flex', gap: 12 }}>
            <Button size="large" onClick={() => setCurrentStep(0)} style={{ flex: 1 }}>
              ← Back
            </Button>
            <Button
              type="primary"
              size="large"
              loading={loading}
              onClick={handlePayment}
              style={{ flex: 2 }}
              icon={<CreditCardOutlined />}
            >
              Complete Setup
            </Button>
          </div>
        </Card>
      )}

      {/* Step 3: Success */}
      {currentStep === 2 && (
        <Card style={{ borderRadius: 12, textAlign: 'center' }}>
          <div style={{ fontSize: 64, marginBottom: 16 }}>🎉</div>
          <Title level={3} style={{ color: '#52c41a' }}>Your Salon is Live!</Title>
          <Text type="secondary" style={{ display: 'block', marginBottom: 24 }}>
            Congratulations! Your salon website is now active and ready to accept bookings.
          </Text>

          <div style={{ background: '#f6ffed', border: '1px solid #b7eb8f', borderRadius: 8, padding: 16, marginBottom: 24 }}>
            <Text strong>Your salon URL:</Text>
            <div style={{ marginTop: 8 }}>
              <Text style={{ color: '#1890ff', fontSize: 16 }}>
                salonsaas.com/{salonData?.slug}
              </Text>
            </div>
          </div>

          <div style={{ display: 'flex', gap: 12, justifyContent: 'center', flexWrap: 'wrap' }}>
            <Button type="primary" size="large" onClick={() => router.push('/owner/dashboard')}>
              Go to Dashboard
            </Button>
            <Button size="large" onClick={() => router.push(`/${salonData?.slug}`)}>
              View My Salon
            </Button>
          </div>
        </Card>
      )}
    </div>
  );
}

export default function SetupPage() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <SetupForm />
    </Suspense>
  );
}

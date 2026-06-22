'use client';

import React from 'react';
import { Card, Typography, Space, Button, Tabs, Form, Input, Select, Switch, InputNumber, Tag } from 'antd';
import {
  SettingOutlined, SkinOutlined, MailOutlined, CreditCardOutlined,
  SafetyOutlined, BellOutlined, UploadOutlined,
} from '@ant-design/icons';
import './Settings.css';

const { Text, Title } = Typography;

const FlexRow = ({ gutter, style, children }: any) => (
  <div style={{ display: 'flex', gap: gutter ?? 16, ...style }}>
    {React.Children.map(children, (child) => child)}
  </div>
);

const FlexCol = ({ span, children }: any) => (
  <div style={{ flex: span / 24 || 1, minWidth: 0 }}>
    {children}
  </div>
);

const settingsTabs = [
  {
    key: 'branding',
    label: <span><SkinOutlined /> Branding</span>,
    children: (
      <div className="settings-tab-content">
        <Form layout="vertical" className="settings-form">
          <div className="settings-section-title">
            <Text strong>Brand Identity</Text>
          </div>
          <Form.Item label="Platform Name">
            <Input defaultValue="SalonPro" style={{ maxWidth: 360 }} />
          </Form.Item>
          <Form.Item label="Small Logo (40x40)">
            <Space>
              <Button icon={<UploadOutlined />}>Upload</Button>
              <Tag>logo-small.png</Tag>
            </Space>
          </Form.Item>
          <Form.Item label="Large Logo (200x60)">
            <Space>
              <Button icon={<UploadOutlined />}>Upload</Button>
              <Tag>logo-large.png</Tag>
            </Space>
          </Form.Item>
          <Form.Item label="Favicon">
            <Space>
              <Button icon={<UploadOutlined />}>Upload</Button>
              <Tag>favicon.ico</Tag>
            </Space>
          </Form.Item>
          <Form.Item label="Brand Color">
            <Input defaultValue="#d4a853" prefix={<span style={{ display: 'inline-block', width: 16, height: 16, background: '#d4a853', borderRadius: 4, marginRight: 4 }} />} style={{ maxWidth: 200 }} />
          </Form.Item>
        </Form>
      </div>
    ),
  },
  {
    key: 'smtp',
    label: <span><MailOutlined /> SMTP</span>,
    children: (
      <div className="settings-tab-content">
        <Form layout="vertical" className="settings-form">
          <div className="settings-section-title">
            <Text strong>Email Server Configuration</Text>
          </div>
          <FlexRow gutter={16}>
            <FlexCol span={12}>
              <Form.Item label="SMTP Host">
                <Input defaultValue="smtp.salonpro.com" />
              </Form.Item>
            </FlexCol>
            <FlexCol span={12}>
              <Form.Item label="SMTP Port">
                <InputNumber defaultValue={587} style={{ width: '100%' }} />
              </Form.Item>
            </FlexCol>
          </FlexRow>
          <FlexRow gutter={16}>
            <FlexCol span={12}>
              <Form.Item label="Username">
                <Input defaultValue="noreply@salonpro.com" />
              </Form.Item>
            </FlexCol>
            <FlexCol span={12}>
              <Form.Item label="Password">
                <Input.Password defaultValue="••••••••" />
              </Form.Item>
            </FlexCol>
          </FlexRow>
          <Form.Item label="From Email">
            <Input defaultValue="noreply@salonpro.com" style={{ maxWidth: 360 }} />
          </Form.Item>
          <Form.Item>
            <Space>
              <Button type="primary" style={{ background: '#d4a853', borderColor: '#d4a853' }}>Save Settings</Button>
              <Button icon={<MailOutlined />}>Test Email</Button>
            </Space>
          </Form.Item>
        </Form>
      </div>
    ),
  },
  {
    key: 'payment',
    label: <span><CreditCardOutlined /> Payment Gateway</span>,
    children: (
      <div className="settings-tab-content">
        <Form layout="vertical" className="settings-form">
          <div className="settings-section-title">
            <Text strong>Payment Gateway Configuration</Text>
          </div>
          <Form.Item label="Gateway Provider">
            <Select defaultValue="stripe" style={{ maxWidth: 360 }} options={[
              { label: 'Stripe', value: 'stripe' },
              { label: 'Razorpay', value: 'razorpay' },
              { label: 'PayPal', value: 'paypal' },
            ]} />
          </Form.Item>
          <Form.Item label="Publishable Key">
            <Input defaultValue="pk_live_••••••••••••••••" />
          </Form.Item>
          <Form.Item label="Secret Key">
            <Input.Password defaultValue="sk_live_••••••••••••••••" />
          </Form.Item>
          <Form.Item label="Webhook URL">
            <Input defaultValue="https://api.salonpro.com/webhooks/stripe" />
          </Form.Item>
          <Form.Item label="Test Mode">
            <Switch defaultChecked />
          </Form.Item>
        </Form>
      </div>
    ),
  },
  {
    key: 'security',
    label: <span><SafetyOutlined /> Security</span>,
    children: (
      <div className="settings-tab-content">
        <Form layout="vertical" className="settings-form">
          <div className="settings-section-title">
            <Text strong>Security Policies</Text>
          </div>
          <Form.Item label="Minimum Password Length">
            <InputNumber defaultValue={8} min={6} max={32} style={{ maxWidth: 200 }} />
          </Form.Item>
          <Form.Item label="Password Complexity">
            <Select defaultValue="medium" style={{ maxWidth: 360 }} options={[
              { label: 'Low (letters + numbers)', value: 'low' },
              { label: 'Medium (upper + lower + numbers)', value: 'medium' },
              { label: 'High (upper + lower + numbers + symbols)', value: 'high' },
            ]} />
          </Form.Item>
          <Form.Item label="Session Timeout (minutes)">
            <InputNumber defaultValue={60} min={5} max={1440} style={{ maxWidth: 200 }} />
          </Form.Item>
          <Form.Item label="Two-Factor Authentication">
            <Switch defaultChecked />
            <Text type="secondary" style={{ display: 'block', fontSize: 12, marginTop: 4 }}>Require 2FA for all admin accounts</Text>
          </Form.Item>
          <Form.Item label="Rate Limiting">
            <Switch defaultChecked />
            <Text type="secondary" style={{ display: 'block', fontSize: 12, marginTop: 4 }}>Limit login attempts to 5 per minute per IP</Text>
          </Form.Item>
        </Form>
      </div>
    ),
  },
  {
    key: 'notifications',
    label: <span><BellOutlined /> Notifications</span>,
    children: (
      <div className="settings-tab-content">
        <Form layout="vertical" className="settings-form">
          <div className="settings-section-title">
            <Text strong>Notification Channels</Text>
          </div>
          <Form.Item label="Email Notifications">
            <Switch defaultChecked />
            <Text type="secondary" style={{ display: 'block', fontSize: 12, marginTop: 4 }}>Send email notifications for platform events</Text>
          </Form.Item>
          <Form.Item label="Webhook URL">
            <Input placeholder="https://hooks.salonpro.com/notify" style={{ maxWidth: 480 }} />
          </Form.Item>
          <Form.Item label="Email Templates">
            <Select defaultValue="default" style={{ maxWidth: 360 }} options={[
              { label: 'Default Template', value: 'default' },
              { label: 'Minimal Template', value: 'minimal' },
              { label: 'Branded Template', value: 'branded' },
            ]} />
          </Form.Item>
          <Form.Item>
            <Button type="primary" style={{ background: '#d4a853', borderColor: '#d4a853' }}>Save Notification Settings</Button>
          </Form.Item>
        </Form>
      </div>
    ),
  },
];

export default function SettingsPage() {
  return (
    <div className="super-page">
      <div className="super-page-header">
        <div>
          <Title level={4} className="super-page-title">
            <SettingOutlined className="super-page-icon" /> Platform Settings
          </Title>
          <Text type="secondary">Configure global platform settings and preferences</Text>
        </div>
      </div>

      <Card className="super-page-card" variant="borderless">
        <Tabs defaultActiveKey="branding" items={settingsTabs} className="settings-tabs" />
      </Card>
    </div>
  );
}

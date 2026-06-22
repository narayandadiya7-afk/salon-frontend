'use client';

import React from 'react';
import { Form, Input, Button, Checkbox, Typography, Space } from 'antd';
import { MailOutlined, LockOutlined } from '@ant-design/icons';
import './Login.css';

const { Text, Title } = Typography;

export default function SuperAdminLoginPage() {
  return (
    <div className="super-login-page">
      <div className="super-login-brand">
        <div className="super-login-brand-inner">
          <div className="super-login-logo">
            <svg viewBox="0 0 48 48" width="56" height="56" fill="none">
              <rect width="48" height="48" rx="12" fill="#d4a853" />
              <text x="24" y="33" textAnchor="middle" fill="#fff" fontSize="28" fontWeight="bold">S</text>
            </svg>
          </div>
          <Title level={1} className="super-login-brand-name">SalonPro</Title>
          <Text className="super-login-tagline">Enterprise Salon Management Platform</Text>
          <div className="super-login-decoration">
            <div className="decoration-circle c1" />
            <div className="decoration-circle c2" />
            <div className="decoration-circle c3" />
          </div>
        </div>
      </div>

      <div className="super-login-form-wrap">
        <div className="super-login-card">
          <div className="super-login-card-header">
            <Title level={3} className="super-login-title">Welcome back</Title>
            <Text className="super-login-subtitle">Sign in to your super admin account</Text>
          </div>

          <Form layout="vertical" size="large" className="super-login-form">
            <Form.Item name="email" label="Email" rules={[{ required: true, type: 'email' }]}>
              <Input prefix={<MailOutlined />} placeholder="admin@salonpro.com" />
            </Form.Item>

            <Form.Item name="password" label="Password" rules={[{ required: true }]}>
              <Input.Password prefix={<LockOutlined />} placeholder="••••••••" />
            </Form.Item>

            <Form.Item>
              <div className="super-login-options">
                <Checkbox>Remember me</Checkbox>
                <Button type="link" className="super-forgot-link">Forgot password?</Button>
              </div>
            </Form.Item>

            <Form.Item>
              <Button type="primary" htmlType="submit" block className="super-login-btn">
                Sign In
              </Button>
            </Form.Item>
          </Form>

          <div className="super-login-footer">
            <Text type="secondary">Secure super admin access only</Text>
          </div>
        </div>
      </div>
    </div>
  );
}

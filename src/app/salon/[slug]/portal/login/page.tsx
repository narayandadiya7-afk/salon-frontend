'use client';

import React, { useState } from 'react';
import { useParams, useRouter } from 'next/navigation';
import { Form, Input, Button, Typography, Card } from 'antd';
import { LockOutlined, MailOutlined } from '@ant-design/icons';
import { notification } from '../../../../../utils/notification';
import apiUtil from '../../../../../utils/api';
import AuthUtil from '../../../../../utils/auth';
import EncryptUtils from '../../../../../utils/encrypt';
import { ApiAuthLogin } from '../../../../../utils/api.constant';
import { eResultCode } from '../../../../../utils/enum';

const { Title, Text } = Typography;

export default function PortalLoginPage() {
  const [loading, setLoading] = useState(false);
  const [form] = Form.useForm();
  const router = useRouter();
  const params = useParams();
  const slug = params?.slug as string;

  const onFinish = async (values: { emailId: string; password: string }) => {
    try {
      setLoading(true);

      const encryptedPassword = EncryptUtils.encrypt(values.password);

      const response = await apiUtil.post(ApiAuthLogin, {
        email: values.emailId,
        password: encryptedPassword,
        tenantSlug: slug,
      });

      const { dataResponse, data } = response || {};
      const returnCode = dataResponse?.returnCode;

      if (returnCode === eResultCode.SUCCESS || returnCode === eResultCode.CREATED) {
        const token = data?.accessToken || data?.token;
        if (token) AuthUtil.setToken(token);

        const role = data?.user?.role;
        notification.success('Login successful!');

        if (role === 'SALON_OWNER' || role === 'SALON_STAFF') {
          router.push(`/salon/${slug}/dashboard`);
        } else {
          router.push(`/salon/${slug}`);
        }
      } else {
        notification.error(dataResponse?.description || 'Invalid email or password.');
      }
    } catch {
      notification.error('An error occurred. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={{ maxWidth: 400, margin: '80px auto', padding: '0 16px' }}>
      <Card style={{ borderRadius: 12, boxShadow: '0 2px 8px rgba(0,0,0,0.08)' }}>
        <div style={{ textAlign: 'center', marginBottom: 32 }}>
          <Title level={3} style={{ margin: 0 }}>Owner Portal</Title>
          <Text type="secondary">Sign in to manage your salon</Text>
        </div>

        <Form form={form} layout="vertical" onFinish={onFinish} size="large">
          <Form.Item
            name="emailId"
            rules={[{ required: true, message: 'Please enter your email' }]}
          >
            <Input prefix={<MailOutlined />} placeholder="Email" />
          </Form.Item>

          <Form.Item
            name="password"
            rules={[{ required: true, message: 'Please enter your password' }]}
          >
            <Input.Password prefix={<LockOutlined />} placeholder="Password" />
          </Form.Item>

          <Form.Item>
            <Button type="primary" htmlType="submit" loading={loading} block>
              Sign In
            </Button>
          </Form.Item>
        </Form>

        <div style={{ textAlign: 'center' }}>
          <Text type="secondary">
            <a href={`/salon/${slug}`} style={{ color: '#1890ff' }}>Back to salon website</a>
          </Text>
        </div>
      </Card>
    </div>
  );
}

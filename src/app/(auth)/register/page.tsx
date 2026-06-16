'use client';

import React, { useState } from 'react';
import { Form, Input, Button, Typography } from 'antd';
import { UserOutlined, LockOutlined, MailOutlined, PhoneOutlined, ShopOutlined } from '@ant-design/icons';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { notification } from '../../../utils/notification';
import apiUtil from '../../../utils/api';
import AuthUtil from '../../../utils/auth';
import EncryptUtils from '../../../utils/encrypt';
import { ApiAuthRegister } from '../../../utils/api.constant';
import { eResultCode } from '../../../utils/enum';
import styles from './Register.module.css';

const { Title, Text } = Typography;

function RegisterForm() {
  const [loading, setLoading] = useState(false);
  const [form] = Form.useForm();
  const router = useRouter();

  const onFinish = async (values: { name: string; email: string; password: string; phone?: string; salonName: string }) => {
    try {
      setLoading(true);

      const encryptedPassword = EncryptUtils.encrypt(values.password);

      const response = await apiUtil.post(ApiAuthRegister, {
        name: values.name,
        email: values.email,
        password: encryptedPassword,
        phone: values.phone,
        role: 'SALON_OWNER',
        salonName: values.salonName,
      });

      const { dataResponse, data } = response || {};
      const returnCode = dataResponse?.returnCode;

      if (returnCode === eResultCode.CREATED || returnCode === eResultCode.SUCCESS) {
        const token = data?.accessToken || data?.token;
        if (token) AuthUtil.setToken(token);

        const slug = data?.salon?.slug;
        notification.success('Your salon is ready! Get started with your 1-month free trial.');

        if (slug) {
          router.push(`/salon/${slug}/welcome`);
        } else {
          router.push('/salon');
        }
      } else if (returnCode === eResultCode.DUPLICATE_DATA) {
        notification.error(dataResponse?.description || 'Email or phone already registered.');
      } else {
        notification.error(dataResponse?.description || 'Registration failed. Please try again.');
      }
    } catch {
      notification.error('An error occurred. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className={styles.formWrapper}>
      <div className={styles.formContainer}>
        <div className={styles.formHeader}>
          <Title level={2} style={{ margin: 0 }}>Create your salon</Title>
          <Text type="secondary">Get your salon website free for 1 month — no payment needed</Text>
        </div>

        <Form form={form} layout="vertical" onFinish={onFinish}>
          <Form.Item
            name="salonName"
            label="Salon Name"
            rules={[{ required: true, message: 'Please enter your salon name' }]}
          >
            <Input prefix={<ShopOutlined />} placeholder="e.g. Glow & Beauty Salon" size="large" />
          </Form.Item>

          <Form.Item
            name="name"
            label="Your Name"
            rules={[{ required: true, message: 'Please enter your name' }]}
          >
            <Input prefix={<UserOutlined />} placeholder="Your full name" size="large" />
          </Form.Item>

          <Form.Item
            name="email"
            label="Email Address"
            rules={[{ required: true, type: 'email', message: 'Please enter a valid email' }]}
          >
            <Input prefix={<MailOutlined />} placeholder="your@email.com" size="large" />
          </Form.Item>

          <Form.Item name="phone" label="Phone Number">
            <Input prefix={<PhoneOutlined />} placeholder="+91 98765 43210" size="large" />
          </Form.Item>

          <Form.Item
            name="password"
            label="Password"
            rules={[{ required: true, min: 6, message: 'Password must be at least 6 characters' }]}
          >
            <Input.Password prefix={<LockOutlined />} placeholder="Create a strong password" size="large" />
          </Form.Item>

          <Form.Item>
            <Button type="primary" htmlType="submit" loading={loading} block size="large">
              Create My Salon Website
            </Button>
          </Form.Item>
        </Form>

        <div className={styles.footer}>
          <Text type="secondary">Already have an account? </Text>
          <Link href="/login" className={styles.link}>Sign in</Link>
        </div>
      </div>
    </div>
  );
}

export default function RegisterPage() {
  return <RegisterForm />;
}

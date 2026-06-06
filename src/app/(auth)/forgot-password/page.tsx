'use client';

import React, { useState } from 'react';
import { Form, Input, Button } from 'antd';
import { MailOutlined } from '@ant-design/icons';
import Link from 'next/link';
import { notification } from '../../../utils/notification';
import styles from './ForgotPassword.module.css';

const ForgotPasswordPage: React.FC = () => {
  const [loading, setLoading] = useState(false);

  const onFinish = async (values: any) => {
    setLoading(true);
    notification.success('Reset link sent to your email!');
    setLoading(false);
  };

  return (
    <div className={styles.formWrapper}>
      <h2 className={styles.title}>Forgot Password</h2>
      <p className={styles.subtitle}>Enter your email address and we&apos;ll send you a link to reset your password.</p>

      <Form name="forgot-password" onFinish={onFinish} layout="vertical" size="large">
        <Form.Item name="emailId" rules={[{ required: true, type: 'email', message: 'Valid email required' }]}>
          <Input prefix={<MailOutlined />} placeholder="Email" />
        </Form.Item>
        <Form.Item>
          <Button type="primary" htmlType="submit" loading={loading} block className={styles.submitBtn}>
            Send Reset Link
          </Button>
        </Form.Item>
        <div className={styles.footer}>
          <Link href="/login" className={styles.link}>← Back to Login</Link>
        </div>
      </Form>
    </div>
  );
};

export default ForgotPasswordPage;

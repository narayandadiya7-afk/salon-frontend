'use client';

import React, { useState } from 'react';
import { Form, Input, Button, Checkbox } from 'antd';
import { LockOutlined, UserOutlined } from '@ant-design/icons';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { notification } from '../../../utils/notification';
import apiUtil from '../../../utils/api';
import AuthUtil from '../../../utils/auth';
import { ApiAuthLogin } from '../../../utils/api.constant';
import { eResultCode } from '../../../utils/enum';
import EncryptUtils from '../../../utils/encrypt';
import styles from './Login.module.css';

const LoginPage: React.FC = () => {
  const [loading, setLoading] = useState(false);
  const [form] = Form.useForm();
  const router = useRouter();

  const onFinish = async (values: { emailId: string; password: string; remember: boolean }) => {
    try {
      setLoading(true);

      const encryptedPassword = EncryptUtils.encrypt(values.password);

      const response = await apiUtil.post(ApiAuthLogin, {
        email: values.emailId,
        password: encryptedPassword,
      });

      const { dataResponse, data } = response || {};
      const returnCode = dataResponse?.returnCode;

      if (returnCode === eResultCode.SUCCESS || returnCode === eResultCode.CREATED) {
        // Store token from data.accessToken or data.token
        const token = data?.accessToken || data?.token;
        if (token) AuthUtil.setToken(token);

        const role = data?.user?.role;
        const tenantSlug = data?.user?.tenant?.slug || data?.user?.salon?.slug;
        notification.success(dataResponse?.description || 'Login successful!');

        if (role === 'SUPER_ADMIN' || role === 'ADMIN') router.push('/admin/dashboard');
        else if (role === 'OWNER' || role === 'SALON_OWNER' || role === 'TENANT_ADMIN' || role === 'STAFF') router.push('/owner/dashboard');
        else if (tenantSlug) router.push(`/tenant/${tenantSlug}/account`);
        else router.push('/account');
      } else {
        notification.error(dataResponse?.description || 'Login failed. Please check your credentials.');
      }
    } catch {
      notification.error('An error occurred. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className={styles.formWrapper}>
      <h2 className={styles.title}>Sign In</h2>
      <p className={styles.subtitle}>Welcome back! Please enter your details.</p>

      <Form form={form} name="login" onFinish={onFinish} layout="vertical" size="large">
        <Form.Item
          name="emailId"
          rules={[{ required: true, message: 'Please enter your email' }, { type: 'email', message: 'Please enter a valid email' }]}
        >
          <Input prefix={<UserOutlined />} placeholder="Email" />
        </Form.Item>

        <Form.Item name="password" rules={[{ required: true, message: 'Please enter your password' }]}>
          <Input.Password prefix={<LockOutlined />} placeholder="Password" />
        </Form.Item>

        <div className={styles.extras}>
          <Form.Item name="remember" valuePropName="checked" noStyle>
            <Checkbox>Remember me</Checkbox>
          </Form.Item>
          <Link href="/forgot-password" className={styles.link}>Forgot password?</Link>
        </div>

        <Form.Item>
          <Button type="primary" htmlType="submit" loading={loading} block className={styles.submitBtn}>
            Sign In
          </Button>
        </Form.Item>

        <div className={styles.footer}>
          Don&apos;t have an account?{' '}
          <Link href="/register" className={styles.link}>Sign up</Link>
        </div>
      </Form>
    </div>
  );
};

export default LoginPage;

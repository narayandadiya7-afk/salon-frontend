'use client';

import React, { useState, useEffect, useCallback, useRef } from 'react';
import { Form, Input, Button, Typography, Spin } from 'antd';
import { UserOutlined, LockOutlined, MailOutlined, PhoneOutlined, ShopOutlined, GlobalOutlined, CheckCircleFilled, CloseCircleFilled } from '@ant-design/icons';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { notification } from '../../../utils/notification';
import apiUtil from '../../../utils/api';
import AuthUtil from '../../../utils/auth';
import EncryptUtils from '../../../utils/encrypt';
import { ApiAuthRegister, ApiCheckSlugAvailability } from '../../../utils/api.constant';
import { eResultCode } from '../../../utils/enum';
import styles from './Register.module.css';

const { Title, Text } = Typography;

function RegisterForm() {
  const [loading, setLoading] = useState(false);
  const [slugStatus, setSlugStatus] = useState<{ available: boolean | null; suggestions: string[]; checking: boolean }>({
    available: null,
    suggestions: [],
    checking: false,
  });
  const [slugTouched, setSlugTouched] = useState(false);
  const debounceRef = useRef<ReturnType<typeof setTimeout> | undefined>(undefined);
  const [form] = Form.useForm();
  const router = useRouter();

  const checkSlug = useCallback(async (slug: string) => {
    if (!slug || slug.length < 2) {
      setSlugStatus({ available: null, suggestions: [], checking: false });
      return;
    }
    setSlugStatus((prev) => ({ ...prev, checking: true }));
    try {
      const res = await apiUtil.get(ApiCheckSlugAvailability(slug));
      const rc = res?.dataResponse?.returnCode;
      if (rc === eResultCode.SUCCESS || rc === eResultCode.CREATED) {
        setSlugStatus({
          available: res.data.available,
          suggestions: res.data.suggestions || [],
          checking: false,
        });
      }
    } catch {
      setSlugStatus({ available: null, suggestions: [], checking: false });
    }
  }, []);

  const handleSlugChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const val = e.target.value.toLowerCase().replace(/[^a-z0-9-]/g, '-');
    form.setFieldValue('slug', val);
    setSlugTouched(true);
    clearTimeout(debounceRef.current);
    if (val.length >= 2) {
      setSlugStatus((prev) => ({ ...prev, checking: true }));
      debounceRef.current = setTimeout(() => checkSlug(val), 400);
    } else {
      setSlugStatus({ available: null, suggestions: [], checking: false });
    }
  };

  useEffect(() => {
    if (!slugStatus.checking) {
      form.validateFields(['slug']).catch(() => {});
    }
  }, [slugStatus, form]);

  useEffect(() => {
    return () => clearTimeout(debounceRef.current);
  }, []);

  const onFinish = async (values: { name: string; email: string; password: string; phone?: string; salonName: string; slug: string }) => {
    if (!slugStatus.available) return;

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
        preferredSlug: values.slug,
      });

      const { dataResponse, data } = response || {};
      const returnCode = dataResponse?.returnCode;

      if (returnCode === eResultCode.CREATED || returnCode === eResultCode.SUCCESS) {
        const token = data?.accessToken || data?.token;
        if (token) AuthUtil.setToken(token);

        const slug = data?.salon?.slug;
        notification.success('Your salon is ready! Get started with your 1-month free trial.');

        if (slug) {
          router.push(`/${slug}/owner/welcome`);
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

          <Form.Item
            name="salonName"
            label="Salon Name"
            rules={[{ required: true, message: 'Please enter your salon name' }]}
          >
            <Input prefix={<ShopOutlined />} placeholder="e.g. Glow & Beauty Salon" size="large" />
          </Form.Item>

          <Form.Item
            name="slug"
            label="Your Salon URL"
            rules={[
              { required: true, message: 'Please enter a URL slug' },
              { pattern: /^[a-z0-9-]+$/, message: 'Only lowercase letters, numbers, and hyphens' },
              () => ({
                validator() {
                  if (slugTouched && slugStatus.available === false) {
                    return Promise.reject(new Error('This salon URL is already taken. Please choose another.'));
                  }
                  return Promise.resolve();
                },
              }),
            ]}
            extra="Your salon will be at: salonsaas.com/your-slug"
          >
            <Input
              prefix={<GlobalOutlined />}
              placeholder="glow-beauty-studio"
              size="large"
              onChange={handleSlugChange}
              suffix={
                slugStatus.checking ? (
                  <Spin size="small" />
                ) : slugStatus.available === true ? (
                  <CheckCircleFilled style={{ color: '#52c41a' }} />
                ) : slugStatus.available === false ? (
                  <CloseCircleFilled style={{ color: '#ff4d4f' }} />
                ) : undefined
              }
            />
          </Form.Item>

          {slugTouched && slugStatus.available === true && (
            <div style={{ marginTop: -16, marginBottom: 16, color: '#52c41a', fontSize: 13 }}>
              <CheckCircleFilled style={{ marginRight: 4 }} />
              <Text style={{ color: '#52c41a' }}>This URL is available!</Text>
            </div>
          )}



          <Form.Item>
            <Button
              type="primary"
              htmlType="submit"
              loading={loading}
              block
              size="large"
              disabled={slugTouched && slugStatus.available === false}
            >
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

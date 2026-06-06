'use client';

import React, { useEffect, useState } from 'react';
import { Card, Form, Input, Button, Typography, Spin, ColorPicker, Row, Col, Divider } from 'antd';
import { SettingOutlined, SaveOutlined, GlobalOutlined } from '@ant-design/icons';
import Link from 'next/link';
import apiUtil from '../../../../utils/api';
import { ApiOwnerSalon, ApiUpdateSalon } from '../../../../utils/api.constant';
import { notification } from '../../../../utils/notification';
import { eResultCode } from '../../../../utils/enum';

const { Title, Text } = Typography;

export default function SalonSettingsPage() {
  const [salonId, setSalonId] = useState<string | null>(null);
  const [slug, setSlug] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [form] = Form.useForm();

  useEffect(() => {
    fetchSalon();
  }, []);

  const fetchSalon = async () => {
    try {
      setLoading(true);
      const res = await apiUtil.get(ApiOwnerSalon);
      const rc = res?.dataResponse?.returnCode;
      if (rc === eResultCode.SUCCESS || rc === eResultCode.CREATED) {
        setSalonId(res.data.id);
        setSlug(res.data.slug);
        form.setFieldsValue({
          name: res.data.name,
          slug: res.data.slug,
          description: res.data.description,
          address: res.data.address,
          city: res.data.city,
          state: res.data.state,
          phone: res.data.phone,
          email: res.data.email,
          primaryColor: res.data.primaryColor || '#1890ff',
        });
      }
    } catch {
      notification.error('Failed to load salon settings');
    } finally {
      setLoading(false);
    }
  };

  const handleSave = async (values: any) => {
    if (!salonId) return;
    try {
      setSaving(true);
      const res = await apiUtil.put(ApiUpdateSalon(salonId), values);
      const rc = res?.dataResponse?.returnCode;
      if (rc === eResultCode.SUCCESS || rc === eResultCode.CREATED) {
        setSlug(values.slug);
        notification.success(res?.dataResponse?.description || 'Salon settings updated!');
      } else {
        notification.error(res?.dataResponse?.description || 'Failed to update settings');
      }
    } catch {
      notification.error('An error occurred');
    } finally {
      setSaving(false);
    }
  };

  if (loading) {
    return (
      <div style={{ display: 'flex', justifyContent: 'center', padding: 60 }}>
        <Spin size="large" />
      </div>
    );
  }

  return (
    <div>
      <div style={{ marginBottom: 24, display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', flexWrap: 'wrap', gap: 12 }}>
        <div>
          <Title level={2} style={{ margin: 0 }}>
            <SettingOutlined style={{ marginRight: 8 }} />
            Salon Settings
          </Title>
          <Text type="secondary">Customize your salon profile and branding</Text>
        </div>
        {slug && (
          <Link href={`/salon/${slug}`} target="_blank">
            <Button icon={<GlobalOutlined />}>View My Salon</Button>
          </Link>
        )}
      </div>

      <Form form={form} layout="vertical" onFinish={handleSave}>
        {/* Basic Info */}
        <Card title="Basic Information" style={{ borderRadius: 12, marginBottom: 20 }}>
          <Row gutter={16}>
            <Col xs={24} sm={12}>
              <Form.Item name="name" label="Salon Name" rules={[{ required: true }]}>
                <Input placeholder="Glow Beauty Studio" size="large" />
              </Form.Item>
            </Col>
            <Col xs={24} sm={12}>
              <Form.Item
                name="slug"
                label="Salon URL Slug"
                rules={[
                  { required: true },
                  { pattern: /^[a-z0-9-]+$/, message: 'Only lowercase letters, numbers, and hyphens' },
                ]}
                extra={slug ? `Current URL: /salon/${slug}` : ''}
              >
                <Input placeholder="glow-beauty-studio" size="large" />
              </Form.Item>
            </Col>
          </Row>

          <Form.Item name="description" label="Description">
            <Input.TextArea placeholder="Tell customers about your salon..." rows={3} />
          </Form.Item>
        </Card>

        {/* Contact Info */}
        <Card title="Contact Information" style={{ borderRadius: 12, marginBottom: 20 }}>
          <Row gutter={16}>
            <Col xs={24} sm={12}>
              <Form.Item name="phone" label="Phone Number">
                <Input placeholder="+91 98765 43210" size="large" />
              </Form.Item>
            </Col>
            <Col xs={24} sm={12}>
              <Form.Item name="email" label="Email Address" rules={[{ type: 'email' }]}>
                <Input placeholder="salon@example.com" size="large" />
              </Form.Item>
            </Col>
          </Row>

          <Form.Item name="address" label="Address">
            <Input placeholder="Street address" size="large" />
          </Form.Item>

          <Row gutter={16}>
            <Col xs={24} sm={12}>
              <Form.Item name="city" label="City">
                <Input placeholder="Mumbai" size="large" />
              </Form.Item>
            </Col>
            <Col xs={24} sm={12}>
              <Form.Item name="state" label="State">
                <Input placeholder="Maharashtra" size="large" />
              </Form.Item>
            </Col>
          </Row>
        </Card>

        {/* Branding */}
        <Card title="Branding" style={{ borderRadius: 12, marginBottom: 20 }}>
          <Form.Item
            name="primaryColor"
            label="Brand Color"
            extra="This color will be used as the primary color on your salon website"
          >
            <Input placeholder="#1890ff" size="large" prefix={
              <div style={{
                width: 20, height: 20, borderRadius: 4,
                background: form.getFieldValue('primaryColor') || '#1890ff',
                border: '1px solid #d9d9d9',
              }} />
            } />
          </Form.Item>
        </Card>

        <div style={{ display: 'flex', justifyContent: 'flex-end' }}>
          <Button
            type="primary"
            htmlType="submit"
            size="large"
            loading={saving}
            icon={<SaveOutlined />}
          >
            Save Settings
          </Button>
        </div>
      </Form>
    </div>
  );
}

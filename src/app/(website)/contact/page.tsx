'use client';

import React, { useState } from 'react';
import { Form, Input, Button, Select } from 'antd';
import { MailOutlined, PhoneOutlined, EnvironmentOutlined } from '@ant-design/icons';

const { TextArea } = Input;

const contactInfo = [
  {
    icon: <MailOutlined />,
    label: 'Email',
    value: 'hello@webanix.io',
  },
  {
    icon: <PhoneOutlined />,
    label: 'Phone',
    value: '+1 (555) 000-0000',
  },
  {
    icon: <EnvironmentOutlined />,
    label: 'Office',
    value: '123 Innovation Drive, San Francisco, CA 94105',
  },
];

export default function ContactPage() {
  const [loading, setLoading] = useState(false);
  const [form] = Form.useForm();

  const onFinish = async () => {
    setLoading(true);
    await new Promise((r) => setTimeout(r, 1000));
    form.resetFields();
    setLoading(false);
  };

  return (
    <section className="section" style={{ background: 'var(--theme-background)' }}>
      <div className="section-container">
        <div className="section-header">
          <span className="section-label">Contact</span>
          <h1 className="section-title">Get in touch</h1>
          <p className="section-subtitle">
            Have a question or want to learn more? We&apos;d love to hear from you.
          </p>
        </div>

        <div className="contact-grid">
          {/* Info */}
          <div className="contact-info">
            {contactInfo.map((item) => (
              <div key={item.label} className="contact-item">
                <div className="contact-icon">{item.icon}</div>
                <div>
                  <p className="contact-label">{item.label}</p>
                  <p className="contact-value">{item.value}</p>
                </div>
              </div>
            ))}
          </div>

          {/* Form */}
          <div className="contact-form-card">
            <Form form={form} layout="vertical" onFinish={onFinish} size="large">
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 12 }}>
                <Form.Item name="firstName" label="First Name" rules={[{ required: true }]}>
                  <Input placeholder="Alex" />
                </Form.Item>
                <Form.Item name="lastName" label="Last Name" rules={[{ required: true }]}>
                  <Input placeholder="Morgan" />
                </Form.Item>
              </div>

              <Form.Item
                name="email"
                label="Email"
                rules={[{ required: true }, { type: 'email' }]}
              >
                <Input placeholder="alex@company.com" />
              </Form.Item>

              <Form.Item name="subject" label="Subject" rules={[{ required: true }]}>
                <Select placeholder="Select a topic">
                  <Select.Option value="sales">Sales inquiry</Select.Option>
                  <Select.Option value="support">Technical support</Select.Option>
                  <Select.Option value="billing">Billing question</Select.Option>
                  <Select.Option value="other">Other</Select.Option>
                </Select>
              </Form.Item>

              <Form.Item name="message" label="Message" rules={[{ required: true }]}>
                <TextArea rows={5} placeholder="Tell us how we can help..." />
              </Form.Item>

              <Form.Item style={{ marginBottom: 0 }}>
                <Button type="primary" htmlType="submit" loading={loading} block>
                  Send Message
                </Button>
              </Form.Item>
            </Form>
          </div>
        </div>
      </div>
    </section>
  );
}

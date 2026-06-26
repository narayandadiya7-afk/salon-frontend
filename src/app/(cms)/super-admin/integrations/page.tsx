'use client';

import React, { useState } from 'react';
import { Row, Col, Card, Typography, Space, Button, Tag, Switch, Modal, Form, Input, Select, Descriptions, Badge } from 'antd';
import {
  ApiOutlined, CheckCircleOutlined, CloseCircleOutlined,
  EditOutlined, DeleteOutlined, PlusOutlined,
  KeyOutlined, LinkOutlined, GlobalOutlined,
} from '@ant-design/icons';
import DataTable from '../../../../components/super-admin/DataTable';
import StatusBadge from '../../../../components/super-admin/StatusBadge';
import './Integrations.css';

const { Text, Title } = Typography;

const integrations = [
  { key: 'stripe', name: 'Stripe', description: 'Payment processing for subscriptions', category: 'Payments', status: 'connected' as const, version: '2023-08', lastSync: 'Just now', color: '#635bff' },
  { key: 'razorpay', name: 'Razorpay', description: 'Indian payment gateway support', category: 'Payments', status: 'connected' as const, version: 'v2', lastSync: '2 min ago', color: '#3399ff' },
  { key: 'twilio', name: 'Twilio', description: 'SMS notifications and alerts', category: 'Communications', status: 'connected' as const, version: 'v1', lastSync: '5 min ago', color: '#f22f46' },
  { key: 'sendgrid', name: 'SendGrid', description: 'Email delivery for platform emails', category: 'Communications', status: 'connected' as const, version: 'v3', lastSync: '1 min ago', color: '#1a82e2' },
  { key: 'google-calendar', name: 'Google Calendar', description: 'Calendar sync for appointments', category: 'Calendar', status: 'connected' as const, version: 'v3', lastSync: '10 min ago', color: '#4285f4' },
  { key: 'outlook-calendar', name: 'Outlook Calendar', description: 'Microsoft calendar integration', category: 'Calendar', status: 'disconnected' as const, version: 'v1', lastSync: 'N/A', color: '#0078d4' },
  { key: 'whatsapp', name: 'WhatsApp Business', description: 'WhatsApp messaging for reminders', category: 'Communications', status: 'disconnected' as const, version: 'v15', lastSync: 'N/A', color: '#25d366' },
  { key: 'slack', name: 'Slack', description: 'Platform alerts and notifications', category: 'Notifications', status: 'connected' as const, version: 'v2', lastSync: '3 min ago', color: '#4a154b' },
];

const webhooksData = [
  { key: '1', name: 'Payment Events', url: 'https://api.salonpro.com/webhooks/stripe', events: 'charge.completed, charge.failed', status: 'active' as const, created: '2026-01-15' },
  { key: '2', name: 'Tenant Events', url: 'https://api.salonpro.com/webhooks/tenants', events: 'tenant.created, tenant.updated', status: 'active' as const, created: '2026-01-15' },
  { key: '3', name: 'Support Events', url: 'https://hooks.salonpro.com/support', events: 'ticket.created, ticket.updated', status: 'inactive' as const, created: '2026-03-10' },
];

const apiKeysData = [
  { key: '1', name: 'Production API Key', apiKey: 'sk_live_••••••••••••12ef', created: '2026-01-01', lastUsed: 'Just now', status: 'active' as const },
  { key: '2', name: 'Development API Key', apiKey: 'sk_test_••••••••••••34gh', created: '2026-02-15', lastUsed: '2 hours ago', status: 'active' as const },
  { key: '3', name: 'Partner Integration Key', apiKey: 'pk_partner_••••••••••56ij', created: '2026-04-01', lastUsed: '1 day ago', status: 'revoked' as const },
];

const integrationStatusBadge = (status: string) => {
  if (status === 'connected') return <Tag color="green" style={{ borderRadius: 20, padding: '0 10px' }}><CheckCircleOutlined /> Connected</Tag>;
  return <Tag color="default" style={{ borderRadius: 20, padding: '0 10px' }}><CloseCircleOutlined /> Disconnected</Tag>;
};

export default function IntegrationsPage() {
  const [webhookModal, setWebhookModal] = useState(false);
  const [apiKeyModal, setApiKeyModal] = useState(false);

  return (
    <div className="super-page">
      <div className="super-page-header">
        <div>
          <Title level={4} className="super-page-title">
            <ApiOutlined className="super-page-icon" /> Integrations
          </Title>
          <Text type="secondary">Manage third-party integrations, API keys, and webhooks</Text>
        </div>
      </div>

      <Row gutter={[16, 16]}>
        {integrations.map((integ) => (
          <Col xs={24} sm={12} lg={8} xl={6} key={integ.key}>
            <Card className="integ-card" variant="borderless" hoverable>
              <div className="integ-card-header">
                <div className="integ-card-icon" style={{ background: `${integ.color}15`, color: integ.color }}>
                  <svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor">
                    <circle cx="12" cy="12" r="10" fill="currentColor" opacity="0.2" />
                    <circle cx="12" cy="12" r="4" fill="currentColor" />
                  </svg>
                </div>
                <Switch
                  defaultChecked={integ.status === 'connected'}
                  size="small"
                  className="integ-switch"
                />
              </div>
              <Text strong className="integ-card-name">{integ.name}</Text>
              <Text className="integ-card-desc">{integ.description}</Text>
              <div className="integ-card-meta">
                <Tag>{integ.category}</Tag>
                {integrationStatusBadge(integ.status)}
              </div>
              <div className="integ-card-footer">
                <Text type="secondary" style={{ fontSize: 11 }}>Last sync: {integ.lastSync}</Text>
                <Button type="link" size="small" icon={<EditOutlined />}>Configure</Button>
              </div>
            </Card>
          </Col>
        ))}
      </Row>

      <Row gutter={[16, 16]} style={{ marginTop: 16 }}>
        <Col xs={24} lg={12}>
          <Card className="super-page-card" variant="borderless" title={<span className="card-title"><LinkOutlined /> Webhooks</span>}
            extra={<Button type="primary" size="small" icon={<PlusOutlined />} style={{ background: '#d4a853', borderColor: '#d4a853' }} onClick={() => setWebhookModal(true)}>Add Webhook</Button>}
          >
            <DataTable columns={[
              { title: 'Name', dataIndex: 'name', key: 'name' },
              { title: 'Events', dataIndex: 'events', key: 'events', render: (e: string) => <Text style={{ fontSize: 11 }}>{e}</Text> },
              { title: 'Status', dataIndex: 'status', key: 'status', render: (s: string) => <StatusBadge status={s} /> },
            ]} dataSource={webhooksData} pagination={false} />
          </Card>
        </Col>

        <Col xs={24} lg={12}>
          <Card className="super-page-card" variant="borderless" title={<span className="card-title"><KeyOutlined /> API Keys</span>}
            extra={<Button type="primary" size="small" icon={<PlusOutlined />} style={{ background: '#d4a853', borderColor: '#d4a853' }} onClick={() => setApiKeyModal(true)}>Generate Key</Button>}
          >
            <DataTable columns={[
              { title: 'Name', dataIndex: 'name', key: 'name' },
              { title: 'Key', dataIndex: 'apiKey', key: 'apiKey', render: (k: string) => <code style={{ fontSize: 11, background: 'var(--theme-hover)', padding: '2px 6px', borderRadius: 4 }}>{k}</code> },
              { title: 'Status', dataIndex: 'status', key: 'status', render: (s: string) => <StatusBadge status={s} /> },
            ]} dataSource={apiKeysData} pagination={false} />
          </Card>
        </Col>
      </Row>

      <Modal title="Add Webhook Endpoint" open={webhookModal} onCancel={() => setWebhookModal(false)} footer={null} width={520}>
        <Form layout="vertical">
          <Form.Item label="Webhook Name" required><Input placeholder="e.g., Payment Notifications" /></Form.Item>
          <Form.Item label="Endpoint URL" required><Input placeholder="https://api.example.com/webhooks" /></Form.Item>
          <Form.Item label="Events to Subscribe">
            <Select mode="multiple" placeholder="Select events" style={{ width: '100%' }} options={[
              { label: 'tenant.created', value: 'tenant.created' },
              { label: 'tenant.updated', value: 'tenant.updated' },
              { label: 'payment.completed', value: 'payment.completed' },
              { label: 'payment.failed', value: 'payment.failed' },
              { label: 'ticket.created', value: 'ticket.created' },
              { label: 'ticket.updated', value: 'ticket.updated' },
            ]} />
          </Form.Item>
          <Form.Item>
            <Space>
              <Button onClick={() => setWebhookModal(false)}>Cancel</Button>
              <Button type="primary" style={{ background: '#d4a853', borderColor: '#d4a853' }}>Create Webhook</Button>
            </Space>
          </Form.Item>
        </Form>
      </Modal>

      <Modal title="Generate API Key" open={apiKeyModal} onCancel={() => setApiKeyModal(false)} footer={null} width={520}>
        <Form layout="vertical">
          <Form.Item label="Key Name" required><Input placeholder="e.g., Production Key" /></Form.Item>
          <Form.Item label="Permissions">
            <Select mode="multiple" placeholder="Select permissions" style={{ width: '100%' }} options={[
              { label: 'Read Tenants', value: 'tenants:read' },
              { label: 'Write Tenants', value: 'tenants:write' },
              { label: 'Read Billing', value: 'billing:read' },
              { label: 'Write Billing', value: 'billing:write' },
              { label: 'Read Users', value: 'users:read' },
              { label: 'Write Users', value: 'users:write' },
              { label: 'Admin', value: 'admin:all' },
            ]} />
          </Form.Item>
          <Form.Item>
            <Space>
              <Button onClick={() => setApiKeyModal(false)}>Cancel</Button>
              <Button type="primary" style={{ background: '#d4a853', borderColor: '#d4a853' }}>Generate Key</Button>
            </Space>
          </Form.Item>
        </Form>
      </Modal>
    </div>
  );
}

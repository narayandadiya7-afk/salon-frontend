'use client';

import React, { useState } from 'react';
import { Row, Col, Card, Typography, Space, Button, Tag, Switch, Tabs, Badge, Empty, Timeline as AntTimeline } from 'antd';
import {
  NotificationOutlined, BellOutlined, MailOutlined,
  WarningOutlined, CheckCircleOutlined, InfoCircleOutlined,
  SecurityScanOutlined, SoundOutlined, SettingOutlined,
  DeleteOutlined, ReadOutlined, ClockCircleOutlined,
  DollarOutlined,
} from '@ant-design/icons';
import DataTable from '../../../../components/super-admin/DataTable';
import StatusBadge from '../../../../components/super-admin/StatusBadge';
import './Notifications.css';

const { Text, Title } = Typography;

const recentNotifications = [
  { key: '1', type: 'billing', title: 'Payment received from Bloom Beauty Spa', description: '$299.00 — Growth plan (Jun 2026)', time: '2 min ago', read: false },
  { key: '2', type: 'system', title: 'New tenant registered', description: 'Golden Touch Spa joined the platform on a 14-day trial', time: '15 min ago', read: false },
  { key: '3', type: 'alert', title: 'Tenant suspended: QuickCuts Salon', description: 'Payment overdue for 30 days — Growth plan suspended', time: '1 hour ago', read: false },
  { key: '4', type: 'security', title: 'Failed login attempt detected', description: '5 failed attempts for admin@salonpro.com from IP 203.0.113.42', time: '2 hours ago', read: false },
  { key: '5', type: 'support', title: 'Urgent ticket opened by Elite Styles', description: 'Billing discrepancy issue #1024 — priority: urgent', time: '3 hours ago', read: true },
  { key: '6', type: 'system', title: 'Plan upgraded: Luxury Nails', description: 'Upgraded from Growth to Professional plan', time: '5 hours ago', read: true },
  { key: '7', type: 'billing', title: 'Invoice generated for The Barbershop Co.', description: 'INV-002 — $999.00 for Enterprise plan', time: '6 hours ago', read: true },
  { key: '8', type: 'alert', title: 'Payment failed: Nail Artistry', description: 'Starter plan renewal failed — card declined', time: '1 day ago', read: true },
];

const typeIcons: Record<string, React.ReactNode> = {
  billing: <DollarOutlined style={{ color: '#10b981' }} />,
  system: <InfoCircleOutlined style={{ color: '#3b82f6' }} />,
  alert: <WarningOutlined style={{ color: '#f59e0b' }} />,
  security: <SecurityScanOutlined style={{ color: '#ef4444' }} />,
  support: <BellOutlined style={{ color: '#8b5cf6' }} />,
};

const typeColors: Record<string, string> = {
  billing: '#10b981',
  system: '#3b82f6',
  alert: '#f59e0b',
  security: '#ef4444',
  support: '#8b5cf6',
};

const notificationColumns = [
  { title: 'Type', dataIndex: 'type', key: 'type', width: 80, render: (t: string) => {
    const labels: Record<string, string> = { billing: 'Billing', system: 'System', alert: 'Alert', security: 'Security', support: 'Support' };
    return <Tag color={typeColors[t] || 'default'}>{labels[t] || t}</Tag>;
  }},
  { title: 'Title', dataIndex: 'title', key: 'title', render: (t: string, r: any) => (
    <Space>
      {!r.read && <span className="notif-unread-dot" />}
      <Text strong={!r.read} style={{ color: !r.read ? 'var(--theme-text)' : undefined }}>{t}</Text>
    </Space>
  )},
  { title: 'Description', dataIndex: 'description', key: 'description', render: (d: string) => <Text type="secondary">{d}</Text> },
  { title: 'Time', dataIndex: 'time', key: 'time', width: 120 },
  { title: 'Actions', key: 'actions', width: 80, render: () => <Button type="link" size="small" icon={<DeleteOutlined />} danger /> },
];

export default function NotificationsPage() {
  const [activeTab, setActiveTab] = useState('all');

  const filteredNotifications = activeTab === 'all'
    ? recentNotifications
    : activeTab === 'unread'
      ? recentNotifications.filter(n => !n.read)
      : recentNotifications.filter(n => n.type === activeTab);

  const tabItems = [
    { key: 'all', label: <Badge count={recentNotifications.length} size="small"><span>All</span></Badge> },
    { key: 'unread', label: <Badge count={recentNotifications.filter(n => !n.read).length} size="small"><span>Unread</span></Badge> },
    { key: 'billing', label: 'Billing' },
    { key: 'system', label: 'System' },
    { key: 'alert', label: 'Alerts' },
    { key: 'security', label: 'Security' },
    { key: 'support', label: 'Support' },
  ];

  return (
    <div className="super-page">
      <div className="super-page-header">
        <div>
          <Title level={4} className="super-page-title">
            <NotificationOutlined className="super-page-icon" /> Notification Center
          </Title>
          <Text type="secondary">Manage platform notifications, alerts, and communication preferences</Text>
        </div>
        <Space>
          <Button icon={<ReadOutlined />}>Mark All Read</Button>
          <Button icon={<SettingOutlined />}>Preferences</Button>
        </Space>
      </div>

      <Row gutter={[16, 16]} style={{ marginBottom: 16 }}>
        <Col xs={12} sm={6}>
          <Card className="notif-stat-card" variant="borderless">
            <Text className="notif-stat-value" style={{ color: '#3b82f6' }}>{recentNotifications.length}</Text>
            <Text className="notif-stat-label">Total Today</Text>
          </Card>
        </Col>
        <Col xs={12} sm={6}>
          <Card className="notif-stat-card" variant="borderless">
            <Text className="notif-stat-value" style={{ color: '#f59e0b' }}>{recentNotifications.filter(n => !n.read).length}</Text>
            <Text className="notif-stat-label">Unread</Text>
          </Card>
        </Col>
        <Col xs={12} sm={6}>
          <Card className="notif-stat-card" variant="borderless">
            <Text className="notif-stat-value" style={{ color: '#10b981' }}>156</Text>
            <Text className="notif-stat-label">This Week</Text>
          </Card>
        </Col>
        <Col xs={12} sm={6}>
          <Card className="notif-stat-card" variant="borderless">
            <Text className="notif-stat-value" style={{ color: '#8b5cf6' }}>842</Text>
            <Text className="notif-stat-label">This Month</Text>
          </Card>
        </Col>
      </Row>

      <Row gutter={[16, 16]}>
        <Col xs={24} lg={16}>
          <Card className="super-page-card" variant="borderless">
            <Tabs
              activeKey={activeTab}
              onChange={setActiveTab}
              items={tabItems.map(t => ({ ...t, children: (
                filteredNotifications.length > 0 ? (
                  <div className="notif-list">
                    {filteredNotifications.map((n) => (
                      <div key={n.key} className={`notif-item ${!n.read ? 'notif-unread' : ''}`}>
                        <div className="notif-item-icon" style={{ background: `${typeColors[n.type]}15` }}>
                          {typeIcons[n.type]}
                        </div>
                        <div className="notif-item-content">
                          <div className="notif-item-header">
                            <Text strong={!n.read} className="notif-item-title">{n.title}</Text>
                            <Text className="notif-item-time">{n.time}</Text>
                          </div>
                          <Text className="notif-item-desc">{n.description}</Text>
                        </div>
                        <div className="notif-item-actions">
                          <Button type="text" size="small" icon={<ReadOutlined />} />
                          <Button type="text" size="small" icon={<DeleteOutlined />} danger />
                        </div>
                      </div>
                    ))}
                  </div>
                ) : (
                  <Empty description="No notifications" style={{ padding: 40 }} />
                )
              )}))}
            />
          </Card>
        </Col>

        <Col xs={24} lg={8}>
          <Card className="super-page-card" variant="borderless" title={<span className="card-title">Notification Channels</span>}>
            <Space direction="vertical" style={{ width: '100%' }} size={12}>
              <div className="notif-channel-item">
                <Space>
                  <MailOutlined style={{ color: '#3b82f6', fontSize: 18 }} />
                  <div>
                    <Text strong style={{ display: 'block', fontSize: 13 }}>Email Notifications</Text>
                    <Text type="secondary" style={{ fontSize: 12 }}>Send email alerts for critical events</Text>
                  </div>
                </Space>
                <Switch defaultChecked />
              </div>
              <div className="notif-channel-item">
                <Space>
                  <BellOutlined style={{ color: '#f59e0b', fontSize: 18 }} />
                  <div>
                    <Text strong style={{ display: 'block', fontSize: 13 }}>In-App Notifications</Text>
                    <Text type="secondary" style={{ fontSize: 12 }}>Show notifications in the admin panel</Text>
                  </div>
                </Space>
                <Switch defaultChecked />
              </div>
              <div className="notif-channel-item">
                <Space>
                  <SoundOutlined style={{ color: '#8b5cf6', fontSize: 18 }} />
                  <div>
                    <Text strong style={{ display: 'block', fontSize: 13 }}>Slack / Webhook</Text>
                    <Text type="secondary" style={{ fontSize: 12 }}>Forward notifications via webhook</Text>
                  </div>
                </Space>
                <Switch />
              </div>
              <div className="notif-channel-item">
                <Space>
                  <SecurityScanOutlined style={{ color: '#ef4444', fontSize: 18 }} />
                  <div>
                    <Text strong style={{ display: 'block', fontSize: 13 }}>SMS Alerts</Text>
                    <Text type="secondary" style={{ fontSize: 12 }}>Critical alerts via SMS</Text>
                  </div>
                </Space>
                <Switch />
              </div>
            </Space>
          </Card>

          <Card className="super-page-card" variant="borderless" style={{ marginTop: 16 }} title={<span className="card-title">Notification Types</span>}>
            <Space direction="vertical" style={{ width: '100%' }} size={8}>
              <div className="notif-type-item">
                <Space><Tag color="#10b981">Billing</Tag><Text style={{ fontSize: 12 }}>Payment receipts, invoices, refunds</Text></Space>
                <Switch defaultChecked size="small" />
              </div>
              <div className="notif-type-item">
                <Space><Tag color="#3b82f6">System</Tag><Text style={{ fontSize: 12 }}>New tenants, upgrades, registrations</Text></Space>
                <Switch defaultChecked size="small" />
              </div>
              <div className="notif-type-item">
                <Space><Tag color="#f59e0b">Alerts</Tag><Text style={{ fontSize: 12 }}>Failed payments, expiring trials</Text></Space>
                <Switch defaultChecked size="small" />
              </div>
              <div className="notif-type-item">
                <Space><Tag color="#ef4444">Security</Tag><Text style={{ fontSize: 12 }}>Login attempts, permission changes</Text></Space>
                <Switch defaultChecked size="small" />
              </div>
              <div className="notif-type-item">
                <Space><Tag color="#8b5cf6">Support</Tag><Text style={{ fontSize: 12 }}>New tickets, assignments, replies</Text></Space>
                <Switch defaultChecked size="small" />
              </div>
            </Space>
          </Card>
        </Col>
      </Row>
    </div>
  );
}

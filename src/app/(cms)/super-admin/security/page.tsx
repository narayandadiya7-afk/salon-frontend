'use client';

import React, { useState } from 'react';
import { Row, Col, Card, Typography, Space, Button, Tag, Switch, Form, Input, InputNumber, Select, Divider, Slider, Progress } from 'antd';
import {
  SecurityScanOutlined, KeyOutlined, LockOutlined,
  CheckCircleOutlined, CloseCircleOutlined, GlobalOutlined,
  SafetyOutlined, UserOutlined, LaptopOutlined,
  PlusOutlined, DeleteOutlined, EditOutlined, EyeOutlined,
} from '@ant-design/icons';
import DataTable from '../../../../components/super-admin/DataTable';
import StatusBadge from '../../../../components/super-admin/StatusBadge';
import StatCard from '../../../../components/super-admin/StatCard';
import './Security.css';

const { Text, Title } = Typography;

const activeSessions = [
  { key: '1', user: 'John Doe (Super Admin)', device: 'MacBook Pro — Chrome', ip: '192.168.1.1', location: 'New York, US', lastActive: 'Now', status: 'active' as const },
  { key: '2', user: 'Sarah Smith (Admin)', device: 'Windows PC — Firefox', ip: '10.0.0.45', location: 'London, UK', lastActive: '5 min ago', status: 'active' as const },
  { key: '3', user: 'Mike Johnson (Support)', device: 'iPhone 15 — Safari', ip: '172.16.0.89', location: 'Toronto, CA', lastActive: '15 min ago', status: 'active' as const },
  { key: '4', user: 'Alex Brown (Viewer)', device: 'Linux — Chrome', ip: '203.0.113.42', location: 'Berlin, DE', lastActive: '2 hours ago', status: 'active' as const },
  { key: '5', user: 'Emily Davis (Admin)', device: 'MacBook Air — Safari', ip: '198.51.100.23', location: 'Sydney, AU', lastActive: '1 day ago', status: 'suspended' as const },
];

const loginAttempts = [
  { key: '1', user: 'admin@salonpro.com', ip: '203.0.113.42', location: 'Moscow, RU', time: '2 hours ago', status: 'failed' as const, reason: 'Invalid password' },
  { key: '2', user: 'john@salonpro.com', ip: '192.168.1.1', location: 'New York, US', time: '10 min ago', status: 'success' as const, reason: 'Valid login' },
  { key: '3', user: 'mike@salonpro.com', ip: '10.0.0.45', location: 'London, UK', time: '1 hour ago', status: 'success' as const, reason: 'Valid login' },
  { key: '4', user: 'unknown@test.com', ip: '45.33.32.156', location: 'Shanghai, CN', time: '30 min ago', status: 'failed' as const, reason: 'Account not found' },
  { key: '5', user: 'admin@salonpro.com', ip: '198.51.100.23', location: 'Sydney, AU', time: '1 day ago', status: 'success' as const, reason: 'Valid login' },
];

const whitelistedIps = [
  { key: '1', ip: '192.168.1.0/24', description: 'Office network', created: '2026-01-01', status: 'active' as const },
  { key: '2', ip: '10.0.0.0/8', description: 'VPN range', created: '2026-02-15', status: 'active' as const },
  { key: '3', ip: '203.0.113.42', description: 'Legacy server', created: '2026-03-10', status: 'inactive' as const },
];

const sessionColumns = [
  { title: 'User', dataIndex: 'user', key: 'user', render: (u: string) => <Space><UserOutlined /><Text style={{ fontSize: 12 }}>{u}</Text></Space> },
  { title: 'Device', dataIndex: 'device', key: 'device', render: (d: string) => <Space><LaptopOutlined /><Text style={{ fontSize: 12 }}>{d}</Text></Space> },
  { title: 'IP Address', dataIndex: 'ip', key: 'ip', render: (ip: string) => <code style={{ fontSize: 11 }}>{ip}</code> },
  { title: 'Location', dataIndex: 'location', key: 'location' },
  { title: 'Last Active', dataIndex: 'lastActive', key: 'lastActive' },
  { title: 'Status', dataIndex: 'status', key: 'status', render: (s: string) => <StatusBadge status={s} /> },
  { title: 'Actions', key: 'actions', width: 60, render: () => <Button type="link" size="small" danger icon={<CloseCircleOutlined />} /> },
];

const loginColumns = [
  { title: 'User', dataIndex: 'user', key: 'user' },
  { title: 'IP Address', dataIndex: 'ip', key: 'ip', render: (ip: string) => <code style={{ fontSize: 11 }}>{ip}</code> },
  { title: 'Location', dataIndex: 'location', key: 'location' },
  { title: 'Time', dataIndex: 'time', key: 'time' },
  { title: 'Status', dataIndex: 'status', key: 'status', render: (s: string) => <StatusBadge status={s} /> },
  { title: 'Reason', dataIndex: 'reason', key: 'reason' },
];

export default function SecurityPage() {
  const [passwordStrength, setPasswordStrength] = useState(75);

  return (
    <div className="super-page">
      <div className="super-page-header">
        <div>
          <Title level={4} className="super-page-title">
            <SecurityScanOutlined className="super-page-icon" /> Security Center
          </Title>
          <Text type="secondary">Manage platform security, authentication, and access control</Text>
        </div>
      </div>

      <Row gutter={[16, 16]} style={{ marginBottom: 16 }}>
        <Col xs={12} sm={6}><StatCard label="Active Sessions" value="12" icon={<LaptopOutlined />} color="#3b82f6" /></Col>
        <Col xs={12} sm={6}><StatCard label="MFA Enabled" value="18" icon={<SafetyOutlined />} color="#10b981" /></Col>
        <Col xs={12} sm={6}><StatCard label="API Keys" value="6" icon={<KeyOutlined />} color="#d4a853" /></Col>
        <Col xs={12} sm={6}><StatCard label="IP Whitelisted" value="3" icon={<GlobalOutlined />} color="#8b5cf6" /></Col>
      </Row>

      <Row gutter={[16, 16]}>
        <Col xs={24} lg={12}>
          <Card className="super-page-card" variant="borderless" title={<span className="card-title"><LockOutlined /> Password Policy</span>}>
            <Form layout="vertical" className="security-form">
              <Form.Item label="Minimum Password Length">
                <InputNumber defaultValue={8} min={6} max={32} style={{ maxWidth: 200 }} />
              </Form.Item>
              <Form.Item label="Password Complexity">
                <Select defaultValue="medium" style={{ maxWidth: 360 }} options={[
                  { label: 'Low (letters + numbers)', value: 'low' },
                  { label: 'Medium (upper + lower + numbers)', value: 'medium' },
                  { label: 'High (upper + lower + numbers + symbols)', value: 'high' },
                ]} />
              </Form.Item>
              <Form.Item label="Password Expiry (days)">
                <InputNumber defaultValue={90} min={30} max={365} style={{ maxWidth: 200 }} />
              </Form.Item>
              <Form.Item label="Session Timeout (minutes)">
                <InputNumber defaultValue={60} min={5} max={1440} style={{ maxWidth: 200 }} />
              </Form.Item>
              <Divider />
              <Form.Item label="Two-Factor Authentication (2FA)">
                <Switch defaultChecked />
                <Text type="secondary" style={{ display: 'block', fontSize: 12, marginTop: 4 }}>Require 2FA for all admin accounts</Text>
              </Form.Item>
              <Form.Item label="Rate Limiting">
                <Switch defaultChecked />
                <Text type="secondary" style={{ display: 'block', fontSize: 12, marginTop: 4 }}>Limit login attempts to 5 per minute per IP</Text>
              </Form.Item>
              <Form.Item>
                <Button type="primary" style={{ background: '#d4a853', borderColor: '#d4a853' }}>Save Policy</Button>
              </Form.Item>
            </Form>
          </Card>

          <Card className="super-page-card" variant="borderless" style={{ marginTop: 16 }} title={<span className="card-title"><GlobalOutlined /> IP Whitelist</span>}
            extra={<Button type="primary" size="small" icon={<PlusOutlined />} style={{ background: '#d4a853', borderColor: '#d4a853' }}>Add IP</Button>}
          >
            <DataTable columns={[
              { title: 'IP / CIDR', dataIndex: 'ip', key: 'ip', render: (ip: string) => <code style={{ fontSize: 12 }}>{ip}</code> },
              { title: 'Description', dataIndex: 'description', key: 'description' },
              { title: 'Created', dataIndex: 'created', key: 'created' },
              { title: 'Status', dataIndex: 'status', key: 'status', render: (s: string) => <StatusBadge status={s} /> },
            ]} dataSource={whitelistedIps} pagination={false} />
          </Card>
        </Col>

        <Col xs={24} lg={12}>
          <Card className="super-page-card" variant="borderless" title={<span className="card-title"><LaptopOutlined /> Active Sessions</span>}>
            <DataTable columns={sessionColumns} dataSource={activeSessions} pagination={false} scroll={{ x: true }} />
          </Card>

          <Card className="super-page-card" variant="borderless" style={{ marginTop: 16 }} title={<span className="card-title"><UserOutlined /> Recent Login Attempts</span>}>
            <DataTable columns={loginColumns} dataSource={loginAttempts} pagination={false} scroll={{ x: true }} />
          </Card>
        </Col>
      </Row>

      <Card className="super-page-card" variant="borderless" style={{ marginTop: 16 }} title={<span className="card-title">Security Overview</span>}>
        <Row gutter={[24, 24]}>
          <Col xs={24} md={8}>
            <div className="security-overview-item">
              <Text strong style={{ display: 'block', marginBottom: 8 }}>Password Strength Requirements</Text>
              <Progress percent={passwordStrength} strokeColor={passwordStrength >= 80 ? '#10b981' : passwordStrength >= 50 ? '#f59e0b' : '#ef4444'} size="small" />
              <Text type="secondary" style={{ fontSize: 12, marginTop: 4, display: 'block' }}>
                {passwordStrength >= 80 ? 'Strong' : passwordStrength >= 50 ? 'Moderate' : 'Weak'} — {passwordStrength}% compliant
              </Text>
            </div>
          </Col>
          <Col xs={24} md={8}>
            <div className="security-overview-item">
              <Text strong style={{ display: 'block', marginBottom: 8 }}>MFA Adoption</Text>
              <Progress percent={75} strokeColor="#8b5cf6" size="small" />
              <Text type="secondary" style={{ fontSize: 12, marginTop: 4, display: 'block' }}>18 of 24 admins have MFA enabled</Text>
            </div>
          </Col>
          <Col xs={24} md={8}>
            <div className="security-overview-item">
              <Text strong style={{ display: 'block', marginBottom: 8 }}>Security Score</Text>
              <Progress percent={88} strokeColor="#10b981" size="small" />
              <Text type="secondary" style={{ fontSize: 12, marginTop: 4, display: 'block' }}>Good — 2 issues need attention</Text>
            </div>
          </Col>
        </Row>
      </Card>
    </div>
  );
}

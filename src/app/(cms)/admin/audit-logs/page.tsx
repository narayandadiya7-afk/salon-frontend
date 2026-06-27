'use client';

import React, { useState } from 'react';
import { Card, Typography, Space, Button, Tag, Switch, DatePicker, Select, Input } from 'antd';
import {
  AuditOutlined, DownloadOutlined, UserOutlined,
  GlobalOutlined, SettingOutlined, KeyOutlined,
  LaptopOutlined, EnvironmentOutlined, ClockCircleOutlined,
  SearchOutlined, FilterOutlined,
} from '@ant-design/icons';
import DataTable from '../../../../components/super-admin/DataTable';
import StatusBadge from '../../../../components/super-admin/StatusBadge';
import FilterBar from '../../../../components/super-admin/FilterBar';
import './AuditLogs.css';

const { Text, Title } = Typography;
const { RangePicker } = DatePicker;

const auditLogsData = [
  { key: '1', time: '2 min ago', action: 'User Login', user: 'john.doe@salonpro.com', module: 'Auth', ip: '192.168.1.1', device: 'MacBook Pro', browser: 'Chrome 125', location: 'New York, US', status: 'success' as const },
  { key: '2', time: '5 min ago', action: 'Tenant Created', user: 'sarah@salonpro.com', module: 'Tenants', ip: '10.0.0.45', device: 'Windows PC', browser: 'Firefox 127', location: 'London, UK', status: 'success' as const },
  { key: '3', time: '15 min ago', action: 'Plan Modified', user: 'mike@salonpro.com', module: 'Plans', ip: '172.16.0.89', device: 'iPhone 15', browser: 'Safari 18', location: 'Toronto, CA', status: 'warning' as const },
  { key: '4', time: '30 min ago', action: 'Tenant Suspended', user: 'alex@salonpro.com', module: 'Tenants', ip: '203.0.113.42', device: 'Linux Desktop', browser: 'Chrome 124', location: 'Berlin, DE', status: 'error' as const },
  { key: '5', time: '1 hour ago', action: 'Feature Flag Toggled', user: 'sarah@salonpro.com', module: 'Features', ip: '10.0.0.45', device: 'Windows PC', browser: 'Firefox 127', location: 'London, UK', status: 'warning' as const },
  { key: '6', time: '2 hours ago', action: 'Support Ticket Updated', user: 'alex@salonpro.com', module: 'Support', ip: '198.51.100.23', device: 'MacBook Air', browser: 'Safari 18', location: 'Sydney, AU', status: 'success' as const },
  { key: '7', time: '3 hours ago', action: 'System Backup', user: 'System', module: 'Infra', ip: '—', device: 'Server', browser: '—', location: '—', status: 'success' as const },
  { key: '8', time: '5 hours ago', action: 'API Key Generated', user: 'john.doe@salonpro.com', module: 'Integrations', ip: '192.168.1.1', device: 'MacBook Pro', browser: 'Chrome 125', location: 'New York, US', status: 'warning' as const },
  { key: '9', time: '8 hours ago', action: 'User Role Changed', user: 'admin@salonpro.com', module: 'Users', ip: '10.0.0.1', device: 'MacBook Pro', browser: 'Chrome 125', location: 'New York, US', status: 'warning' as const },
  { key: '10', time: '12 hours ago', action: 'Payment Batch Processed', user: 'System', module: 'Billing', ip: '—', device: 'Server', browser: '—', location: '—', status: 'success' as const },
  { key: '11', time: '1 day ago', action: 'Trial Started', user: 'System', module: 'Tenants', ip: '—', device: '—', browser: '—', location: '—', status: 'info' as const },
  { key: '12', time: '2 days ago', action: 'SSL Renewal', user: 'System', module: 'Infra', ip: '—', device: 'Server', browser: '—', location: '—', status: 'success' as const },
  { key: '13', time: '3 days ago', action: 'Failed Login Attempt', user: 'unknown@test.com', module: 'Auth', ip: '45.33.32.156', device: '—', browser: '—', location: 'Shanghai, CN', status: 'error' as const },
  { key: '14', time: '4 days ago', action: 'Database Migration', user: 'System', module: 'Infra', ip: '—', device: 'Server', browser: '—', location: '—', status: 'success' as const },
];

const actionColors: Record<string, string> = {
  success: '#10b981', error: '#ef4444', warning: '#f59e0b', info: '#3b82f6',
};

const columns = [
  { title: 'Time', dataIndex: 'time', key: 'time', width: 100, render: (t: string) => <Text style={{ fontSize: 11 }}>{t}</Text> },
  { title: 'Action', dataIndex: 'action', key: 'action', render: (a: string, r: any) => <Space><span className="audit-action-dot" style={{ background: actionColors[r.status] }} /><Text strong style={{ fontSize: 12 }}>{a}</Text></Space> },
  { title: 'User', dataIndex: 'user', key: 'user', render: (u: string) => <Space><UserOutlined style={{ fontSize: 11, color: 'var(--theme-text-secondary)' }} /><Text style={{ fontSize: 12 }}>{u}</Text></Space> },
  { title: 'Module', dataIndex: 'module', key: 'module', render: (m: string) => <Tag style={{ fontSize: 10 }}>{m}</Tag> },
  { title: 'IP Address', dataIndex: 'ip', key: 'ip', render: (ip: string) => <code style={{ fontSize: 10, background: 'var(--theme-hover)', padding: '1px 4px', borderRadius: 3 }}>{ip}</code> },
  { title: 'Device', dataIndex: 'device', key: 'device', render: (d: string) => <Space><LaptopOutlined style={{ fontSize: 11 }} /><Text style={{ fontSize: 11 }}>{d}</Text></Space> },
  { title: 'Browser', dataIndex: 'browser', key: 'browser', render: (b: string) => <Text style={{ fontSize: 11 }}>{b || '—'}</Text> },
  { title: 'Location', dataIndex: 'location', key: 'location', render: (l: string) => <Text style={{ fontSize: 11 }}><EnvironmentOutlined style={{ fontSize: 10, marginRight: 4 }} />{l}</Text> },
];

export default function AuditLogsPage() {
  const [realtime, setRealtime] = useState(true);

  return (
    <div className="super-page">
      <div className="super-page-header">
        <div>
          <Title level={4} className="super-page-title">
            <AuditOutlined className="super-page-icon" /> Audit Logs
          </Title>
          <Text type="secondary">Comprehensive audit trail of all platform activity and administrative actions</Text>
        </div>
        <Space>
          <Space size={6}>
            <Switch checked={realtime} onChange={setRealtime} size="small" />
            <Text style={{ fontSize: 12, color: 'var(--theme-text-secondary)' }}>Real-time</Text>
          </Space>
          <Button icon={<DownloadOutlined />}>Export Logs</Button>
        </Space>
      </div>

      <Card className="super-page-card" variant="borderless">
        <div className="audit-filters">
          <Input
            prefix={<SearchOutlined />}
            placeholder="Search logs by action, user, module, or IP..."
            style={{ width: 320 }}
          />
          <Select placeholder="Module" allowClear style={{ minWidth: 140 }} options={[
            { label: 'All Modules', value: 'all' },
            { label: 'Auth', value: 'auth' },
            { label: 'Tenants', value: 'tenants' },
            { label: 'Plans', value: 'plans' },
            { label: 'Billing', value: 'billing' },
            { label: 'Users', value: 'users' },
            { label: 'Support', value: 'support' },
            { label: 'Features', value: 'features' },
            { label: 'Integrations', value: 'integrations' },
            { label: 'Infra', value: 'infra' },
          ]} />
          <Select placeholder="Action Type" allowClear style={{ minWidth: 140 }} options={[
            { label: 'All Actions', value: 'all' },
            { label: 'Create', value: 'create' },
            { label: 'Update', value: 'update' },
            { label: 'Delete', value: 'delete' },
            { label: 'Login', value: 'login' },
            { label: 'System', value: 'system' },
          ]} />
          <RangePicker />
        </div>

        <DataTable
          columns={columns}
          dataSource={auditLogsData}
          pagination={{ pageSize: 10, showSizeChanger: true, showTotal: (t: number) => `Showing ${t} of 3,842 events` }}
          scroll={{ x: 1200 }}
        />
      </Card>
    </div>
  );
}

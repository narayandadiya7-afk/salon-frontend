'use client';

import React from 'react';
import { Card, Typography, Space, Button, Tag, Switch } from 'antd';
import {
  AuditOutlined, DownloadOutlined, UserOutlined,
  GlobalOutlined, SettingOutlined, KeyOutlined,
} from '@ant-design/icons';
import FilterBar from '../../../../components/super-admin/FilterBar';
import Timeline from '../../../../components/super-admin/Timeline';
import './AuditLogs.css';

const { Text, Title } = Typography;

const auditEvents = [
  { time: '2 min ago', title: 'User login', description: 'john.doe@salonpro.com logged in from 192.168.1.1', type: 'info' as const },
  { time: '5 min ago', title: 'Tenant created', description: 'New tenant "Golden Touch Spa" created by sarah@salonpro.com', type: 'success' as const },
  { time: '15 min ago', title: 'Plan modified', description: 'Growth plan pricing updated from $249 to $299 by mike@salonpro.com', type: 'warning' as const },
  { time: '30 min ago', title: 'Tenant suspended', description: '"QuickCuts Salon" suspended by alex@salonpro.com — payment overdue', type: 'error' as const },
  { time: '1 hour ago', title: 'Feature flag toggled', description: '"Advanced Analytics" enabled for 80% of tenants by sarah@salonpro.com', type: 'warning' as const },
  { time: '2 hours ago', title: 'Support ticket updated', description: 'Ticket #1021 resolved by alex@salonpro.com', type: 'success' as const },
  { time: '3 hours ago', title: 'System backup completed', description: 'Daily backup completed successfully — 2.4GB', type: 'info' as const },
  { time: '5 hours ago', title: 'API key generated', description: 'New API key created for "The Barbershop Co." by john.doe@salonpro.com', type: 'warning' as const },
  { time: '8 hours ago', title: 'User role changed', description: 'emily.davis@salonpro.com role changed from Admin to Viewer by super admin', type: 'warning' as const },
  { time: '12 hours ago', title: 'Payment processed', description: 'Recurring payment batch processed — $84,293 collected', type: 'success' as const },
  { time: '1 day ago', title: 'Tenant trial started', description: '"Serenity Day Spa" started 14-day trial', type: 'info' as const },
  { time: '2 days ago', title: 'SSL certificate renewed', description: 'Automatic SSL renewal completed for 246 custom domains', type: 'success' as const },
  { time: '3 days ago', title: 'Failed login attempt', description: '5 failed login attempts for admin@salonpro.com from 203.0.113.42', type: 'error' as const },
  { time: '4 days ago', title: 'Database migration', description: 'Schema migration v2.4.1 applied successfully', type: 'info' as const },
];

export default function AuditLogsPage() {
  return (
    <div className="super-page">
      <div className="super-page-header">
        <div>
          <Title level={4} className="super-page-title">
            <AuditOutlined className="super-page-icon" /> Audit Logs
          </Title>
          <Text type="secondary">Track all platform activity and administrative actions</Text>
        </div>
        <Space>
          <Space size={6}>
            <Switch defaultChecked size="small" />
            <Text style={{ fontSize: 12, color: 'var(--theme-text-secondary)' }}>Real-time</Text>
          </Space>
          <Button icon={<DownloadOutlined />}>Export Logs</Button>
        </Space>
      </div>

      <Card className="super-page-card" variant="borderless">
        <FilterBar
          searchPlaceholder="Search logs..."
          statusOptions={[
            { label: 'All Actions', value: 'all' },
            { label: 'Login', value: 'login' },
            { label: 'Create', value: 'create' },
            { label: 'Update', value: 'update' },
            { label: 'Delete', value: 'delete' },
          ]}
          showDateRange
        />

        <div className="audit-timeline-container">
          <Timeline events={auditEvents} />
        </div>
      </Card>

      <Card className="super-page-card" variant="borderless" style={{ marginTop: 16 }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: 12 }}>
          <Text type="secondary" style={{ fontSize: 13 }}>
            Showing 14 of 3,842 events
          </Text>
          <Space>
            <Tag>Last 7 days</Tag>
            <Tag>All types</Tag>
          </Space>
        </div>
      </Card>
    </div>
  );
}

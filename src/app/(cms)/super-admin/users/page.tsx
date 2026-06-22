'use client';

import React, { useState } from 'react';
import { Row, Col, Card, Typography, Space, Button, Tag, Modal, Form, Input, Select, Switch } from 'antd';
import {
  TeamOutlined, PlusOutlined, UserOutlined, SafetyCertificateOutlined,
  MailOutlined, CrownOutlined, DeleteOutlined,
} from '@ant-design/icons';
import DataTable from '../../../../components/super-admin/DataTable';
import FilterBar from '../../../../components/super-admin/FilterBar';
import StatusBadge from '../../../../components/super-admin/StatusBadge';
import PermissionMatrix from '../../../../components/super-admin/PermissionMatrix';
import './Users.css';

const { Text, Title } = Typography;

const adminUsers = [
  { key: '1', name: 'John Doe', email: 'john@salonpro.com', role: 'Super Admin', status: 'active' as const, lastActive: 'Just now', mfa: true },
  { key: '2', name: 'Sarah Smith', email: 'sarah@salonpro.com', role: 'Admin', status: 'active' as const, lastActive: '5 min ago', mfa: true },
  { key: '3', name: 'Mike Johnson', email: 'mike@salonpro.com', role: 'Support', status: 'active' as const, lastActive: '1 hour ago', mfa: false },
  { key: '4', name: 'Alex Brown', email: 'alex@salonpro.com', role: 'Viewer', status: 'active' as const, lastActive: '3 hours ago', mfa: false },
  { key: '5', name: 'Emily Davis', email: 'emily@salonpro.com', role: 'Admin', status: 'suspended' as const, lastActive: '2 days ago', mfa: true },
  { key: '6', name: 'Chris Wilson', email: 'chris@salonpro.com', role: 'Support', status: 'active' as const, lastActive: '30 min ago', mfa: false },
];

const columns = [
  { title: 'Name', dataIndex: 'name', key: 'name' },
  { title: 'Email', dataIndex: 'email', key: 'email' },
  { title: 'Role', dataIndex: 'role', key: 'role', render: (r: string) => <Tag>{r}</Tag> },
  { title: 'Status', dataIndex: 'status', key: 'status', render: (s: string) => <StatusBadge status={s} /> },
  { title: 'Last Active', dataIndex: 'lastActive', key: 'lastActive' },
  {
    title: 'MFA', dataIndex: 'mfa', key: 'mfa',
    render: (m: boolean) => m ? <Tag color="green">Enabled</Tag> : <Tag>Disabled</Tag>,
  },
  {
    title: 'Actions', key: 'actions', width: 80,
    render: () => (
      <Button type="link" icon={<DeleteOutlined />} danger size="small" />
    ),
  },
];

const modules = ['Dashboard', 'Tenants', 'Plans', 'Revenue', 'Users', 'Feature Flags', 'Support', 'Audit Logs', 'Settings'];
const actions = ['create', 'read', 'update', 'delete'];

const initialPermissions: Record<string, Record<string, boolean>> = {
  Dashboard: { create: false, read: true, update: false, delete: false },
  Tenants: { create: true, read: true, update: true, delete: true },
  Plans: { create: true, read: true, update: true, delete: true },
  Revenue: { create: false, read: true, update: false, delete: false },
  Users: { create: true, read: true, update: true, delete: true },
  'Feature Flags': { create: true, read: true, update: true, delete: true },
  Support: { create: true, read: true, update: true, delete: true },
  'Audit Logs': { create: false, read: true, update: false, delete: false },
  Settings: { create: true, read: true, update: true, delete: true },
};

export default function UsersPage() {
  const [inviteModal, setInviteModal] = useState(false);
  const [roleModal, setRoleModal] = useState(false);

  return (
    <div className="super-page">
      <div className="super-page-header">
        <div>
          <Title level={4} className="super-page-title">
            <TeamOutlined className="super-page-icon" /> User & Role Management
          </Title>
          <Text type="secondary">Manage platform administrators and their permissions</Text>
        </div>
        <Space>
          <Button icon={<SafetyCertificateOutlined />} onClick={() => setRoleModal(true)}>Manage Roles</Button>
          <Button type="primary" icon={<PlusOutlined />} style={{ background: '#d4a853', borderColor: '#d4a853' }} onClick={() => setInviteModal(true)}>
            Invite Admin
          </Button>
        </Space>
      </div>

      <Row gutter={[16, 16]} style={{ marginBottom: 16 }}>
        <Col xs={12} sm={6}>
          <Card className="users-stat-card" variant="borderless">
            <Text className="users-stat-value">24</Text>
            <Text className="users-stat-label">Total Admins</Text>
          </Card>
        </Col>
        <Col xs={12} sm={6}>
          <Card className="users-stat-card" variant="borderless">
            <Text className="users-stat-value">22</Text>
            <Text className="users-stat-label">Active</Text>
          </Card>
        </Col>
        <Col xs={12} sm={6}>
          <Card className="users-stat-card" variant="borderless">
            <Text className="users-stat-value">4</Text>
            <Text className="users-stat-label">Roles</Text>
          </Card>
        </Col>
        <Col xs={12} sm={6}>
          <Card className="users-stat-card" variant="borderless">
            <Text className="users-stat-value">18</Text>
            <Text className="users-stat-label">MFA Enabled</Text>
          </Card>
        </Col>
      </Row>

      <Card className="super-page-card" variant="borderless">
        <FilterBar searchPlaceholder="Search admins..." />
        <DataTable columns={columns} dataSource={adminUsers} pagination={{ pageSize: 10 }} />
      </Card>

      {/* Invite Modal */}
      <Modal title="Invite Admin User" open={inviteModal} onCancel={() => setInviteModal(false)} footer={null} width={480}>
        <Form layout="vertical">
          <Form.Item label="Full Name" required>
            <Input placeholder="John Doe" />
          </Form.Item>
          <Form.Item label="Email" required>
            <Input prefix={<MailOutlined />} placeholder="john@salonpro.com" />
          </Form.Item>
          <Form.Item label="Role">
            <Select defaultValue="viewer" options={[
              { label: 'Super Admin', value: 'super_admin' },
              { label: 'Admin', value: 'admin' },
              { label: 'Support', value: 'support' },
              { label: 'Viewer', value: 'viewer' },
            ]} />
          </Form.Item>
          <Form.Item>
            <Space>
              <Button onClick={() => setInviteModal(false)}>Cancel</Button>
              <Button type="primary" icon={<MailOutlined />} style={{ background: '#d4a853', borderColor: '#d4a853' }}>
                Send Invitation
              </Button>
            </Space>
          </Form.Item>
        </Form>
      </Modal>

      {/* Roles Modal */}
      <Modal title="Role Permissions" open={roleModal} onCancel={() => setRoleModal(false)} width={700} footer={[
        <Button key="close" onClick={() => setRoleModal(false)}>Close</Button>,
      ]}>
        <div style={{ marginBottom: 16 }}>
          <Space direction="vertical" style={{ width: '100%' }}>
            <Text strong>Select Role:</Text>
            <Select defaultValue="admin" style={{ width: 200 }} options={[
              { label: 'Super Admin', value: 'super_admin' },
              { label: 'Admin', value: 'admin' },
              { label: 'Support', value: 'support' },
              { label: 'Viewer', value: 'viewer' },
            ]} />
          </Space>
        </div>
        <PermissionMatrix modules={modules} actions={actions} permissions={initialPermissions} />
      </Modal>
    </div>
  );
}

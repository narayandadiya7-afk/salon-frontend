'use client';

import React, { useState } from 'react';
import { Row, Col, Card, Typography, Space, Button, Tag, Modal, Form, Input, Select, Switch, Divider, Tree, Checkbox, Alert } from 'antd';
import {
  SafetyCertificateOutlined, PlusOutlined, EditOutlined,
  DeleteOutlined, TeamOutlined, UserOutlined, LockOutlined,
  CheckCircleOutlined, CloseCircleOutlined, CopyOutlined,
} from '@ant-design/icons';
import DataTable from '../../../../components/super-admin/DataTable';
import StatusBadge from '../../../../components/super-admin/StatusBadge';
import './Roles.css';

const { Text, Title } = Typography;

const rolesData = [
  { key: '1', name: 'Super Admin', description: 'Full platform access with all permissions', users: 2, status: 'active' as const, created: '2026-01-01' },
  { key: '2', name: 'Admin', description: 'Platform administration with configurable permissions', users: 8, status: 'active' as const, created: '2026-01-01' },
  { key: '3', name: 'Support Agent', description: 'Support ticket management and tenant assistance', users: 6, status: 'active' as const, created: '2026-01-15' },
  { key: '4', name: 'Viewer', description: 'Read-only access to platform data and reports', users: 4, status: 'active' as const, created: '2026-02-01' },
  { key: '5', name: 'Billing Admin', description: 'Billing and payment management permissions', users: 3, status: 'active' as const, created: '2026-03-01' },
  { key: '6', name: 'Auditor', description: 'Audit log access and compliance monitoring', users: 1, status: 'suspended' as const, created: '2026-04-01' },
];

const permissionModules = [
  {
    key: 'dashboard', name: 'Dashboard', permissions: [
      { key: 'dashboard.view', label: 'View Dashboard', desc: 'View analytics dashboard' },
      { key: 'dashboard.export', label: 'Export Reports', desc: 'Export dashboard data' },
    ]
  },
  {
    key: 'tenants', name: 'Tenants', permissions: [
      { key: 'tenants.view', label: 'View Tenants', desc: 'View tenant list and profiles' },
      { key: 'tenants.create', label: 'Create Tenants', desc: 'Create new tenant accounts' },
      { key: 'tenants.edit', label: 'Edit Tenants', desc: 'Modify tenant details' },
      { key: 'tenants.suspend', label: 'Suspend Tenants', desc: 'Suspend or activate tenants' },
      { key: 'tenants.delete', label: 'Delete Tenants', desc: 'Remove tenant accounts' },
      { key: 'tenants.impersonate', label: 'Impersonate', desc: 'Login as tenant for support' },
    ]
  },
  {
    key: 'billing', name: 'Billing & Payments', permissions: [
      { key: 'billing.view', label: 'View Billing', desc: 'View invoices and payments' },
      { key: 'billing.create', label: 'Create Invoices', desc: 'Generate invoices' },
      { key: 'billing.refund', label: 'Process Refunds', desc: 'Issue payment refunds' },
      { key: 'billing.export', label: 'Export Billing', desc: 'Export billing data' },
    ]
  },
  {
    key: 'users', name: 'Users', permissions: [
      { key: 'users.view', label: 'View Users', desc: 'View admin user list' },
      { key: 'users.create', label: 'Invite Users', desc: 'Invite new admin users' },
      { key: 'users.edit', label: 'Edit Users', desc: 'Modify user details and roles' },
      { key: 'users.delete', label: 'Delete Users', desc: 'Remove admin users' },
    ]
  },
  {
    key: 'plans', name: 'Subscription Plans', permissions: [
      { key: 'plans.view', label: 'View Plans', desc: 'View plan details' },
      { key: 'plans.create', label: 'Create Plans', desc: 'Create new subscription plans' },
      { key: 'plans.edit', label: 'Edit Plans', desc: 'Modify plan details and pricing' },
      { key: 'plans.delete', label: 'Delete Plans', desc: 'Remove subscription plans' },
    ]
  },
  {
    key: 'support', name: 'Support', permissions: [
      { key: 'support.view', label: 'View Tickets', desc: 'View support tickets' },
      { key: 'support.reply', label: 'Reply to Tickets', desc: 'Respond to support tickets' },
      { key: 'support.assign', label: 'Assign Tickets', desc: 'Assign tickets to agents' },
      { key: 'support.close', label: 'Close Tickets', desc: 'Resolve and close tickets' },
    ]
  },
  {
    key: 'settings', name: 'Settings', permissions: [
      { key: 'settings.view', label: 'View Settings', desc: 'View platform settings' },
      { key: 'settings.edit', label: 'Edit Settings', desc: 'Modify platform settings' },
      { key: 'settings.security', label: 'Security Settings', desc: 'Manage security policies' },
    ]
  },
];

const rolesColumns = [
  { title: 'Role Name', dataIndex: 'name', key: 'name', render: (n: string) => <Space><SafetyCertificateOutlined style={{ color: '#d4a853' }} /><Text strong>{n}</Text></Space> },
  { title: 'Description', dataIndex: 'description', key: 'description' },
  { title: 'Users', dataIndex: 'users', key: 'users', render: (u: number) => <Tag>{u} assigned</Tag> },
  { title: 'Status', dataIndex: 'status', key: 'status', render: (s: string) => <StatusBadge status={s} /> },
  { title: 'Created', dataIndex: 'created', key: 'created' },
  { title: 'Actions', key: 'actions', width: 160,
    render: () => (
      <Space size={4}>
        <Button type="link" size="small" icon={<EditOutlined />}>Edit</Button>
        <Button type="link" size="small" icon={<CopyOutlined />}>Duplicate</Button>
        <Button type="link" size="small" icon={<DeleteOutlined />} danger>Delete</Button>
      </Space>
    ),
  },
];

export default function RolesPage() {
  const [roleModal, setRoleModal] = useState(false);
  const [editModal, setEditModal] = useState(false);
  const [selectedRole, setSelectedRole] = useState('super_admin');
  const [checkedPermissions, setCheckedPermissions] = useState<Record<string, boolean>>({
    'dashboard.view': true, 'dashboard.export': true,
    'tenants.view': true, 'tenants.create': true, 'tenants.edit': true,
    'tenants.suspend': true, 'tenants.delete': false, 'tenants.impersonate': true,
    'billing.view': true, 'billing.create': true, 'billing.refund': true, 'billing.export': true,
    'users.view': true, 'users.create': true, 'users.edit': true, 'users.delete': false,
    'plans.view': true, 'plans.create': true, 'plans.edit': true, 'plans.delete': false,
    'support.view': true, 'support.reply': true, 'support.assign': true, 'support.close': true,
    'settings.view': true, 'settings.edit': true, 'settings.security': false,
  });

  return (
    <div className="super-page">
      <div className="super-page-header">
        <div>
          <Title level={4} className="super-page-title">
            <SafetyCertificateOutlined className="super-page-icon" /> Roles & Permissions
          </Title>
          <Text type="secondary">Define roles and configure granular permissions for platform administrators</Text>
        </div>
        <Button type="primary" icon={<PlusOutlined />} style={{ background: '#d4a853', borderColor: '#d4a853' }} onClick={() => setRoleModal(true)}>
          Create Role
        </Button>
      </div>

      <Row gutter={[16, 16]} style={{ marginBottom: 16 }}>
        <Col xs={12} sm={6}>
          <Card className="roles-stat-card" variant="borderless">
            <Text className="roles-stat-value">6</Text>
            <Text className="roles-stat-label">Total Roles</Text>
          </Card>
        </Col>
        <Col xs={12} sm={6}>
          <Card className="roles-stat-card" variant="borderless">
            <Text className="roles-stat-value">24</Text>
            <Text className="roles-stat-label">Total Users</Text>
          </Card>
        </Col>
        <Col xs={12} sm={6}>
          <Card className="roles-stat-card" variant="borderless">
            <Text className="roles-stat-value">28</Text>
            <Text className="roles-stat-label">Permissions</Text>
          </Card>
        </Col>
        <Col xs={12} sm={6}>
          <Card className="roles-stat-card" variant="borderless">
            <Text className="roles-stat-value" style={{ color: '#10b981' }}>All</Text>
            <Text className="roles-stat-label">Roles Active</Text>
          </Card>
        </Col>
      </Row>

      <Row gutter={[16, 16]}>
        <Col xs={24} lg={12}>
          <Card className="super-page-card" variant="borderless" title={<span className="card-title">Role Definitions</span>}>
            <DataTable columns={rolesColumns} dataSource={rolesData} pagination={false} />
          </Card>
        </Col>

        <Col xs={24} lg={12}>
          <Card className="super-page-card" variant="borderless" title={<span className="card-title">Permission Matrix</span>}>
            <div style={{ marginBottom: 16 }}>
              <Space direction="vertical" style={{ width: '100%' }}>
                <Text strong style={{ fontSize: 13, color: 'var(--theme-text)' }}>Select Role:</Text>
                <Select
                  value={selectedRole}
                  onChange={setSelectedRole}
                  style={{ width: '100%' }}
                  options={[
                    { label: 'Super Admin', value: 'super_admin' },
                    { label: 'Admin', value: 'admin' },
                    { label: 'Support Agent', value: 'support' },
                    { label: 'Viewer', value: 'viewer' },
                    { label: 'Billing Admin', value: 'billing' },
                    { label: 'Auditor', value: 'auditor' },
                  ]}
                />
              </Space>
            </div>

            <div className="roles-permission-tree">
              {permissionModules.map((mod) => (
                <div key={mod.key} className="roles-permission-module">
                  <div className="roles-permission-module-header">
                    <Text strong style={{ fontSize: 13 }}>{mod.name}</Text>
                    <Switch
                      size="small"
                      checked={mod.permissions.every((p) => checkedPermissions[p.key])}
                      onChange={(checked) => {
                        const updated = { ...checkedPermissions };
                        mod.permissions.forEach((p) => { updated[p.key] = checked; });
                        setCheckedPermissions(updated);
                      }}
                    />
                  </div>
                  <div className="roles-permission-items">
                    {mod.permissions.map((perm) => (
                      <div key={perm.key} className="roles-permission-item">
                        <Checkbox
                          checked={checkedPermissions[perm.key]}
                          onChange={(e) => setCheckedPermissions({ ...checkedPermissions, [perm.key]: e.target.checked })}
                        >
                          <Space size={4}>
                            <Text style={{ fontSize: 13 }}>{perm.label}</Text>
                            <Text type="secondary" style={{ fontSize: 11 }}>{perm.desc}</Text>
                          </Space>
                        </Checkbox>
                      </div>
                    ))}
                  </div>
                </div>
              ))}
            </div>

            <Divider />
            <div style={{ textAlign: 'right' }}>
              <Space>
                <Button>Reset</Button>
                <Button type="primary" style={{ background: '#d4a853', borderColor: '#d4a853' }}>Save Permissions</Button>
              </Space>
            </div>
          </Card>
        </Col>
      </Row>

      <Modal title="Create New Role" open={roleModal} onCancel={() => setRoleModal(false)} footer={null} width={520}>
        <Form layout="vertical">
          <Form.Item label="Role Name" required>
            <Input placeholder="e.g., Support Manager" />
          </Form.Item>
          <Form.Item label="Description" required>
            <Input.TextArea placeholder="Describe the role's purpose and responsibilities" rows={3} />
          </Form.Item>
          <Form.Item label="Base Permissions">
            <Select
              defaultValue="viewer"
              options={[
                { label: 'Copy from Super Admin', value: 'super_admin' },
                { label: 'Copy from Admin', value: 'admin' },
                { label: 'Copy from Viewer', value: 'viewer' },
                { label: 'Start from scratch', value: 'none' },
              ]}
            />
          </Form.Item>
          <Form.Item>
            <Space>
              <Button onClick={() => setRoleModal(false)}>Cancel</Button>
              <Button type="primary" style={{ background: '#d4a853', borderColor: '#d4a853' }}>Create Role</Button>
            </Space>
          </Form.Item>
        </Form>
      </Modal>
    </div>
  );
}

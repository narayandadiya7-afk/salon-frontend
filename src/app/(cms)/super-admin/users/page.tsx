'use client';

import React, { useState } from 'react';
import { Row, Col, Card, Typography, Space, Button, Tag, Modal, Form, Input, Select, Switch, Divider, Avatar } from 'antd';
import {
  TeamOutlined, PlusOutlined, UserOutlined, SafetyCertificateOutlined,
  MailOutlined, LockOutlined, DeleteOutlined, EditOutlined,
  CheckCircleOutlined, CloseCircleOutlined, KeyOutlined,
} from '@ant-design/icons';
import DataTable from '../../../../components/super-admin/DataTable';
import FilterBar from '../../../../components/super-admin/FilterBar';
import StatusBadge from '../../../../components/super-admin/StatusBadge';
import './Users.css';

const { Text, Title } = Typography;

const adminUsers = [
  { key: '1', name: 'John Doe', email: 'john@salonpro.com', role: 'Super Admin', status: 'active' as const, lastActive: 'Just now', mfa: true, avatar: 'JD' },
  { key: '2', name: 'Sarah Smith', email: 'sarah@salonpro.com', role: 'Admin', status: 'active' as const, lastActive: '5 min ago', mfa: true, avatar: 'SS' },
  { key: '3', name: 'Mike Johnson', email: 'mike@salonpro.com', role: 'Support Agent', status: 'active' as const, lastActive: '1 hour ago', mfa: false, avatar: 'MJ' },
  { key: '4', name: 'Alex Brown', email: 'alex@salonpro.com', role: 'Viewer', status: 'active' as const, lastActive: '3 hours ago', mfa: false, avatar: 'AB' },
  { key: '5', name: 'Emily Davis', email: 'emily@salonpro.com', role: 'Billing Admin', status: 'suspended' as const, lastActive: '2 days ago', mfa: true, avatar: 'ED' },
  { key: '6', name: 'Chris Wilson', email: 'chris@salonpro.com', role: 'Support Agent', status: 'active' as const, lastActive: '30 min ago', mfa: false, avatar: 'CW' },
  { key: '7', name: 'Lisa Anderson', email: 'lisa@salonpro.com', role: 'Admin', status: 'active' as const, lastActive: '20 min ago', mfa: true, avatar: 'LA' },
  { key: '8', name: 'David Taylor', email: 'david@salonpro.com', role: 'Viewer', status: 'active' as const, lastActive: '1 day ago', mfa: false, avatar: 'DT' },
];

const columns = [
  { title: 'User', dataIndex: 'name', key: 'name', render: (n: string, r: any) => (
    <Space>
      <Avatar size={28} style={{ background: '#d4a853', fontSize: 12, fontWeight: 600 }}>{r.avatar}</Avatar>
      <div>
        <Text strong style={{ fontSize: 13 }}>{n}</Text>
        <Text type="secondary" style={{ fontSize: 11, display: 'block' }}>{r.email}</Text>
      </div>
    </Space>
  )},
  { title: 'Role', dataIndex: 'role', key: 'role', render: (r: string) => <Tag>{r}</Tag> },
  { title: 'Status', dataIndex: 'status', key: 'status', render: (s: string) => <StatusBadge status={s} /> },
  { title: 'Last Active', dataIndex: 'lastActive', key: 'lastActive' },
  { title: 'MFA', dataIndex: 'mfa', key: 'mfa', render: (m: boolean) => m ? <Tag color="green" style={{ borderRadius: 20 }}><CheckCircleOutlined /> Enabled</Tag> : <Tag style={{ borderRadius: 20 }}><CloseCircleOutlined /> Disabled</Tag> },
  { title: 'Actions', key: 'actions', width: 120,
    render: () => (
      <Space size={4}>
        <Button type="link" size="small" icon={<EditOutlined />} className="super-action-btn" />
        <Button type="link" size="small" icon={<KeyOutlined />} className="super-action-btn" />
        <Button type="link" size="small" icon={<DeleteOutlined />} className="super-action-btn" danger />
      </Space>
    ),
  },
];

export default function UsersPage() {
  const [inviteModal, setInviteModal] = useState(false);

  return (
    <div className="super-page">
      <div className="super-page-header">
        <div>
          <Title level={4} className="super-page-title">
            <TeamOutlined className="super-page-icon" /> User Management
          </Title>
          <Text type="secondary">Manage platform administrators and their access</Text>
        </div>
        <Space>
          <Button onClick={() => setInviteModal(true)}>Invite Admin</Button>
          <Button type="primary" icon={<PlusOutlined />} style={{ background: '#d4a853', borderColor: '#d4a853' }}>Add User</Button>
        </Space>
      </div>

      <Row gutter={[16, 16]} style={{ marginBottom: 16 }}>
        <Col xs={12} sm={6}><Card className="users-stat-card" variant="borderless"><Text className="users-stat-value">24</Text><Text className="users-stat-label">Total Admins</Text></Card></Col>
        <Col xs={12} sm={6}><Card className="users-stat-card" variant="borderless"><Text className="users-stat-value">22</Text><Text className="users-stat-label">Active</Text></Card></Col>
        <Col xs={12} sm={6}><Card className="users-stat-card" variant="borderless"><Text className="users-stat-value">4</Text><Text className="users-stat-label">Roles</Text></Card></Col>
        <Col xs={12} sm={6}><Card className="users-stat-card" variant="borderless"><Text className="users-stat-value">18</Text><Text className="users-stat-label">MFA Enabled</Text></Card></Col>
      </Row>

      <Card className="super-page-card" variant="borderless">
        <FilterBar
          searchPlaceholder="Search admins by name or email..."
          statusOptions={[
            { label: 'All Status', value: 'all' },
            { label: 'Active', value: 'active' },
            { label: 'Suspended', value: 'suspended' },
          ]}
          extraFilters={
            <Select placeholder="Role" allowClear style={{ minWidth: 130 }} options={[
              { label: 'Super Admin', value: 'super_admin' },
              { label: 'Admin', value: 'admin' },
              { label: 'Support Agent', value: 'support' },
              { label: 'Viewer', value: 'viewer' },
              { label: 'Billing Admin', value: 'billing' },
            ]} />
          }
        />
        <DataTable columns={columns} dataSource={adminUsers} pagination={{ pageSize: 10 }} />
      </Card>

      <Modal title="Invite Admin User" open={inviteModal} onCancel={() => setInviteModal(false)} footer={null} width={480}>
        <Form layout="vertical">
          <Form.Item label="Full Name" required>
            <Input placeholder="John Doe" prefix={<UserOutlined />} />
          </Form.Item>
          <Form.Item label="Email Address" required>
            <Input placeholder="john@salonpro.com" prefix={<MailOutlined />} type="email" />
          </Form.Item>
          <Row gutter={16}>
            <Col span={12}>
              <Form.Item label="Role">
                <Select defaultValue="viewer" options={[
                  { label: 'Super Admin', value: 'super_admin' },
                  { label: 'Admin', value: 'admin' },
                  { label: 'Support Agent', value: 'support' },
                  { label: 'Viewer', value: 'viewer' },
                  { label: 'Billing Admin', value: 'billing' },
                ]} />
              </Form.Item>
            </Col>
            <Col span={12}>
              <Form.Item label="Send Invitation">
                <Switch defaultChecked />
              </Form.Item>
            </Col>
          </Row>
          <Divider />
          <Form.Item>
            <Space>
              <Button onClick={() => setInviteModal(false)}>Cancel</Button>
              <Button type="primary" icon={<MailOutlined />} style={{ background: '#d4a853', borderColor: '#d4a853' }}>Send Invitation</Button>
            </Space>
          </Form.Item>
        </Form>
      </Modal>
    </div>
  );
}

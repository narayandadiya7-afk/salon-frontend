'use client';

import React, { useState } from 'react';
import { Row, Col, Card, Typography, Space, Button, Tag, Select, Drawer } from 'antd';
import {
  CustomerServiceOutlined, FilterOutlined, MessageOutlined,
  UserOutlined, ClockCircleOutlined,
} from '@ant-design/icons';
import DataTable from '../../../../components/super-admin/DataTable';
import FilterBar from '../../../../components/super-admin/FilterBar';
import StatusBadge from '../../../../components/super-admin/StatusBadge';
import SupportChat from '../../../../components/super-admin/SupportChat';
import './Support.css';

const { Text, Title } = Typography;

const ticketsData = [
  { key: '1', id: '#1024', subject: 'Billing discrepancy on invoice', tenant: 'Elite Styles', priority: 'urgent' as const, status: 'open' as const, assignee: '—', updated: '10 min ago' },
  { key: '2', id: '#1023', subject: 'Feature request: API rate limits', tenant: 'The Barbershop Co.', priority: 'medium' as const, status: 'open' as const, assignee: 'Mike', updated: '1 hour ago' },
  { key: '3', id: '#1022', subject: 'Login issue after password reset', tenant: 'Nail Artistry', priority: 'high' as const, status: 'pending' as const, assignee: 'Sarah', updated: '3 hours ago' },
  { key: '4', id: '#1021', subject: 'Integration with Shopify', tenant: 'Bloom Beauty Spa', priority: 'low' as const, status: 'resolved' as const, assignee: 'Alex', updated: '1 day ago' },
  { key: '5', id: '#1020', subject: 'Account upgrade to Professional', tenant: 'Luxury Nails', priority: 'medium' as const, status: 'closed' as const, assignee: 'John', updated: '2 days ago' },
  { key: '6', id: '#1019', subject: 'Payment gateway not connecting', tenant: 'QuickCuts Salon', priority: 'urgent' as const, status: 'open' as const, assignee: '—', updated: '30 min ago' },
  { key: '7', id: '#1018', subject: 'Data export request', tenant: 'Glamour Studio', priority: 'low' as const, status: 'pending' as const, assignee: 'Sarah', updated: '5 hours ago' },
  { key: '8', id: '#1017', subject: 'Custom domain setup help', tenant: 'Divine Cuts', priority: 'medium' as const, status: 'resolved' as const, assignee: 'Alex', updated: '3 days ago' },
];

const columns = [
  { title: 'ID', dataIndex: 'id', key: 'id', width: 80 },
  { title: 'Subject', dataIndex: 'subject', key: 'subject' },
  { title: 'Tenant', dataIndex: 'tenant', key: 'tenant' },
  { title: 'Priority', dataIndex: 'priority', key: 'priority', render: (p: string) => <StatusBadge status={p} /> },
  { title: 'Status', dataIndex: 'status', key: 'status', render: (s: string) => <StatusBadge status={s} /> },
  { title: 'Assignee', dataIndex: 'assignee', key: 'assignee' },
  { title: 'Updated', dataIndex: 'updated', key: 'updated' },
];

const sampleMessages = [
  { id: '1', text: 'Hi, I noticed a discrepancy in my latest invoice. The amount charged is $599 instead of the usual $299.', sender: 'tenant' as const, time: '10:32 AM' },
  { id: '2', text: "I'll look into this right away. Could you share the invoice number?", sender: 'admin' as const, time: '10:35 AM' },
  { id: '3', text: 'Sure, it\'s INV-2026-0615.', sender: 'tenant' as const, time: '10:36 AM' },
  { id: '4', text: 'Thank you. I can see the issue — you were charged for the Professional plan upgrade. Let me process a refund for the difference and correct this.', sender: 'admin' as const, time: '10:40 AM' },
];

export default function SupportPage() {
  const [chatOpen, setChatOpen] = useState(false);
  const [selectedTicket, setSelectedTicket] = useState<any>(null);

  const openChat = (ticket: any) => {
    setSelectedTicket(ticket);
    setChatOpen(true);
  };

  return (
    <div className="super-page">
      <div className="super-page-header">
        <div>
          <Title level={4} className="super-page-title">
            <CustomerServiceOutlined className="super-page-icon" /> Support Tickets
          </Title>
          <Text type="secondary">Manage and respond to tenant support requests</Text>
        </div>
        <Space>
          <Select defaultValue="all" style={{ width: 140 }} options={[
            { label: 'All Tickets', value: 'all' },
            { label: 'My Tickets', value: 'mine' },
            { label: 'Unassigned', value: 'unassigned' },
          ]} />
        </Space>
      </div>

      <Row gutter={[16, 16]} style={{ marginBottom: 16 }}>
        <Col xs={12} sm={6}>
          <Card className="support-stat-card" variant="borderless">
            <Text className="support-stat-value" style={{ color: '#3b82f6' }}>12</Text>
            <Text className="support-stat-label">Open</Text>
          </Card>
        </Col>
        <Col xs={12} sm={6}>
          <Card className="support-stat-card" variant="borderless">
            <Text className="support-stat-value" style={{ color: '#f59e0b' }}>8</Text>
            <Text className="support-stat-label">Pending</Text>
          </Card>
        </Col>
        <Col xs={12} sm={6}>
          <Card className="support-stat-card" variant="borderless">
            <Text className="support-stat-value" style={{ color: '#10b981' }}>156</Text>
            <Text className="support-stat-label">Resolved</Text>
          </Card>
        </Col>
        <Col xs={12} sm={6}>
          <Card className="support-stat-card" variant="borderless">
            <Text className="support-stat-value" style={{ color: '#ef4444' }}>3</Text>
            <Text className="support-stat-label">Urgent</Text>
          </Card>
        </Col>
      </Row>

      <Card className="super-page-card" variant="borderless">
        <FilterBar
          searchPlaceholder="Search tickets..."
          statusOptions={[
            { label: 'Open', value: 'open' },
            { label: 'Pending', value: 'pending' },
            { label: 'Resolved', value: 'resolved' },
            { label: 'Closed', value: 'closed' },
          ]}
          extraFilters={
            <Select placeholder="Priority" allowClear style={{ minWidth: 130 }} options={[
              { label: 'Urgent', value: 'urgent' },
              { label: 'High', value: 'high' },
              { label: 'Medium', value: 'medium' },
              { label: 'Low', value: 'low' },
            ]} />
          }
        />
        <DataTable
          columns={columns}
          dataSource={ticketsData}
          pagination={{ pageSize: 10 }}
          onRow={(record) => ({
            style: { cursor: 'pointer' },
            onClick: () => openChat(record),
          })}
        />
      </Card>

      <Drawer
        title={selectedTicket ? `${selectedTicket.id} - ${selectedTicket.subject}` : 'Support Ticket'}
        placement="right"
        open={chatOpen}
        onClose={() => setChatOpen(false)}
        width={480}
      >
        {selectedTicket && (
          <div className="support-drawer-content">
            <div className="support-ticket-meta">
              <Space direction="vertical" size={4}>
                <Space>
                  <Text strong>Tenant:</Text>
                  <Text>{selectedTicket.tenant}</Text>
                </Space>
                <Space>
                  <Text strong>Priority:</Text>
                  <StatusBadge status={selectedTicket.priority} />
                </Space>
                <Space>
                  <Text strong>Status:</Text>
                  <StatusBadge status={selectedTicket.status} />
                </Space>
                <Space>
                  <Text strong>Assignee:</Text>
                  <Select defaultValue={selectedTicket.assignee || 'unassigned'} size="small" style={{ width: 130 }} options={[
                    { label: 'Unassigned', value: 'unassigned' },
                    { label: 'John Doe', value: 'John' },
                    { label: 'Sarah Smith', value: 'Sarah' },
                    { label: 'Mike Johnson', value: 'Mike' },
                    { label: 'Alex Brown', value: 'Alex' },
                  ]} />
                </Space>
              </Space>
            </div>
            <div className="support-chat-container">
              <SupportChat
                messages={sampleMessages}
                tenantName={selectedTicket.tenant}
              />
            </div>
          </div>
        )}
      </Drawer>
    </div>
  );
}

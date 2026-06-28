'use client';

import React, { useState } from 'react';
import { Row, Col, Card, Typography, Space, Button, Tag, Select, Drawer, Input, Badge, Alert, Progress } from 'antd';
import {
  CustomerServiceOutlined, MessageOutlined,
  UserOutlined, ClockCircleOutlined, AlertOutlined,
  PaperClipOutlined, SendOutlined, CloseCircleOutlined,
  CheckCircleOutlined, FilterOutlined,
} from '@ant-design/icons';
import DataTable from '../../../../components/super-admin/DataTable';
import FilterBar from '../../../../components/super-admin/FilterBar';
import StatusBadge from '../../../../components/super-admin/StatusBadge';
import './Support.css';

const { Text, Title } = Typography;

const ticketsData = [
  { key: '1', id: '#1024', subject: 'Billing discrepancy on invoice', tenant: 'Elite Styles', priority: 'urgent' as const, status: 'open' as const, assignee: '—', updated: '10 min ago', sla: '12 min remaining' },
  { key: '2', id: '#1023', subject: 'Feature request: API rate limits', tenant: 'The Barbershop Co.', priority: 'medium' as const, status: 'open' as const, assignee: 'Mike', updated: '1 hour ago', sla: '3 hours remaining' },
  { key: '3', id: '#1022', subject: 'Login issue after password reset', tenant: 'Nail Artistry', priority: 'high' as const, status: 'pending' as const, assignee: 'Sarah', updated: '3 hours ago', sla: '1 hour overdue' },
  { key: '4', id: '#1021', subject: 'Integration with Shopify', tenant: 'Bloom Beauty Spa', priority: 'low' as const, status: 'resolved' as const, assignee: 'Alex', updated: '1 day ago', sla: 'Resolved' },
  { key: '5', id: '#1020', subject: 'Account upgrade to Professional', tenant: 'Luxury Nails', priority: 'medium' as const, status: 'closed' as const, assignee: 'John', updated: '2 days ago', sla: 'Closed' },
  { key: '6', id: '#1019', subject: 'Payment gateway not connecting', tenant: 'QuickCuts Salon', priority: 'urgent' as const, status: 'open' as const, assignee: '—', updated: '30 min ago', sla: '8 min remaining' },
  { key: '7', id: '#1018', subject: 'Data export request', tenant: 'Glamour Studio', priority: 'low' as const, status: 'pending' as const, assignee: 'Sarah', updated: '5 hours ago', sla: '2 hours overdue' },
  { key: '8', id: '#1017', subject: 'Custom domain setup help', tenant: 'Divine Cuts', priority: 'medium' as const, status: 'resolved' as const, assignee: 'Alex', updated: '3 days ago', sla: 'Resolved' },
];

const slaColor = (sla: string) => {
  if (sla.includes('remaining')) return 'blue';
  if (sla.includes('overdue')) return 'red';
  return 'green';
};

const slaProgress = (sla: string) => {
  if (sla.includes('remaining')) {
    const match = sla.match(/(\d+)/);
    return match ? parseInt(match[1]) : 50;
  }
  if (sla.includes('overdue')) return 0;
  return 100;
};

const columns = [
  { title: 'ID', dataIndex: 'id', key: 'id', width: 80, render: (id: string) => <Text code style={{ fontSize: 11 }}>{id}</Text> },
  { title: 'Subject', dataIndex: 'subject', key: 'subject', render: (s: string) => <Text strong style={{ fontSize: 13 }}>{s}</Text> },
  { title: 'Tenant', dataIndex: 'tenant', key: 'tenant' },
  { title: 'Priority', dataIndex: 'priority', key: 'priority', render: (p: string) => <StatusBadge status={p} /> },
  { title: 'Status', dataIndex: 'status', key: 'status', render: (s: string) => <StatusBadge status={s} /> },
  { title: 'Assignee', dataIndex: 'assignee', key: 'assignee' },
  { title: 'SLA', dataIndex: 'sla', key: 'sla', render: (s: string) => (
    <Space size={6}>
      <Progress type="circle" percent={slaProgress(s)} size={24} strokeColor={slaColor(s)} format={() => ''} />
      <Tag color={slaColor(s)} style={{ fontSize: 10 }}>{s}</Tag>
    </Space>
  )},
  { title: 'Updated', dataIndex: 'updated', key: 'updated' },
];

const sampleMessages = [
  { id: '1', text: 'Hi, I noticed a discrepancy in my latest invoice. The amount charged is $599 instead of the usual $299.', sender: 'tenant' as const, time: '10:32 AM' },
  { id: '2', text: "I'll look into this right away. Could you share the invoice number?", sender: 'admin' as const, time: '10:35 AM' },
  { id: '3', text: 'Sure, it\'s INV-2026-0615.', sender: 'tenant' as const, time: '10:36 AM' },
  { id: '4', text: 'Thank you. I can see the issue — you were charged for the Professional plan upgrade. Let me process a refund for the difference and correct this.', sender: 'admin' as const, time: '10:40 AM' },
  { id: '5', text: 'I\'ve processed the refund of $300. You should see it in 3-5 business days. The correct amount of $299 will be charged going forward.', sender: 'admin' as const, time: '10:45 AM' },
];

export default function SupportPage() {
  const [chatOpen, setChatOpen] = useState(false);
  const [selectedTicket, setSelectedTicket] = useState<any>(null);
  const [newMessage, setNewMessage] = useState('');

  const openChat = (ticket: any) => {
    setSelectedTicket(ticket);
    setChatOpen(true);
  };

  return (
    <div className="super-page">
      <div className="super-page-header">
        <div>
          <Title level={4} className="super-page-title">
            <CustomerServiceOutlined className="super-page-icon" /> Support Center
          </Title>
          <Text type="secondary">Manage and respond to tenant support requests with SLA tracking</Text>
        </div>
        <Space>
          <Select defaultValue="all" style={{ width: 140 }} options={[
            { label: 'All Tickets', value: 'all' },
            { label: 'My Tickets', value: 'mine' },
            { label: 'Unassigned', value: 'unassigned' },
          ]} />
          <Button icon={<FilterOutlined />}>Filters</Button>
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
            <Text className="support-stat-label">SLA Breached</Text>
          </Card>
        </Col>
      </Row>

      {ticketsData.filter(t => t.sla.includes('overdue') || t.sla.includes('remaining')).slice(0, 1).map(t => (
        t.sla.includes('overdue') ? (
          <Alert
            key="sla-alert"
            type="error"
            showIcon
            icon={<AlertOutlined />}
            message="SLA Alert: 2 tickets are overdue and 3 tickets are approaching their SLA deadline"
            style={{ marginBottom: 16, borderRadius: 10 }}
            action={<Button size="small" danger>View Breached</Button>}
          />
        ) : null
      ))}

      <Card className="super-page-card" variant="borderless">
        <FilterBar
          searchPlaceholder="Search tickets by ID, subject, or tenant..."
          statusOptions={[
            { label: 'Open', value: 'open' },
            { label: 'Pending', value: 'pending' },
            { label: 'Resolved', value: 'resolved' },
            { label: 'Closed', value: 'closed' },
          ]}
          extraFilters={
            <Space size={8}>
              <Select placeholder="Priority" allowClear style={{ minWidth: 130 }} options={[
                { label: 'Urgent', value: 'urgent' },
                { label: 'High', value: 'high' },
                { label: 'Medium', value: 'medium' },
                { label: 'Low', value: 'low' },
              ]} />
              <Select placeholder="Assignee" allowClear style={{ minWidth: 130 }} options={[
                { label: 'Unassigned', value: 'unassigned' },
                { label: 'Mike', value: 'mike' },
                { label: 'Sarah', value: 'sarah' },
                { label: 'Alex', value: 'alex' },
              ]} />
            </Space>
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
        title={
          <Space>
            <Text>{selectedTicket?.id} — {selectedTicket?.subject}</Text>
            {selectedTicket?.priority === 'urgent' && <Badge count="URGENT" style={{ background: '#ef4444' }} />}
          </Space>
        }
        placement="right"
        open={chatOpen}
        onClose={() => setChatOpen(false)}
        width={500}
        styles={{ body: { padding: 0, display: 'flex', flexDirection: 'column', height: 'calc(100% - 55px)' } }}
      >
        {selectedTicket && (
          <>
            <div className="support-ticket-meta">
              <Space direction="vertical" size={6} style={{ width: '100%' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                  <Space><Text type="secondary" style={{ fontSize: 11 }}>Tenant:</Text><Text style={{ fontSize: 12 }}>{selectedTicket.tenant}</Text></Space>
                  <Space><StatusBadge status={selectedTicket.status} /></Space>
                </div>
                <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                  <Space><StatusBadge status={selectedTicket.priority} /></Space>
                  <Space>
                    <Text type="secondary" style={{ fontSize: 11 }}>Assignee:</Text>
                    <Select defaultValue={selectedTicket.assignee || 'unassigned'} size="small" style={{ width: 130 }} options={[
                      { label: 'Unassigned', value: 'unassigned' },
                      { label: 'John Doe', value: 'John' },
                      { label: 'Sarah Smith', value: 'Sarah' },
                      { label: 'Mike Johnson', value: 'Mike' },
                      { label: 'Alex Brown', value: 'Alex' },
                    ]} />
                  </Space>
                </div>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                  <Text type="secondary" style={{ fontSize: 11 }}>SLA: <Tag color={slaColor(selectedTicket.sla)}>{selectedTicket.sla}</Tag></Text>
                  <Space>
                    <Button size="small" icon={<CheckCircleOutlined />} type="text" />
                    <Button size="small" icon={<CloseCircleOutlined />} type="text" danger />
                  </Space>
                </div>
              </Space>
            </div>

            <div className="support-chat-messages">
              {sampleMessages.map((msg) => (
                <div key={msg.id} className={`support-chat-msg ${msg.sender === 'admin' ? 'msg-admin' : 'msg-tenant'}`}>
                  <div className="support-chat-bubble">
                    <Text style={{ fontSize: 13 }}>{msg.text}</Text>
                    <div className="support-chat-time">
                      <Text type="secondary" style={{ fontSize: 10 }}>{msg.time}</Text>
                      {msg.sender === 'admin' && <CheckCircleOutlined style={{ fontSize: 10, color: '#10b981' }} />}
                    </div>
                  </div>
                </div>
              ))}
            </div>

            <div className="support-chat-input">
              <Input.TextArea
                value={newMessage}
                onChange={(e) => setNewMessage(e.target.value)}
                placeholder="Type your reply..."
                autoSize={{ minRows: 2, maxRows: 4 }}
                style={{ borderRadius: 10 }}
              />
              <div className="support-chat-input-actions">
                <Space>
                  <Button type="text" icon={<PaperClipOutlined />} />
                </Space>
                <Button type="primary" icon={<SendOutlined />} style={{ background: '#d4a853', borderColor: '#d4a853' }}>
                  Send Reply
                </Button>
              </div>
            </div>
          </>
        )}
      </Drawer>
    </div>
  );
}

'use client';

import React from 'react';
import { Drawer, Tabs, Typography, Descriptions, Avatar, Tag, Space, Button } from 'antd';
import {
  UserOutlined, MailOutlined, PhoneOutlined, GlobalOutlined,
  CreditCardOutlined, TeamOutlined, DollarOutlined,
} from '@ant-design/icons';
import './ProfileDrawer.css';

const { Text } = Typography;

const CalendarOutlined = ({ style }: { style?: React.CSSProperties }) => (
  <svg viewBox="0 0 14 14" width={14} height={14} fill="none" style={style}>
    <rect x="1" y="2" width="12" height="11" rx="2" stroke="currentColor" strokeWidth="1.5" />
    <line x1="1" y1="5" x2="13" y2="5" stroke="currentColor" strokeWidth="1.5" />
    <line x1="4.5" y1="1" x2="4.5" y2="3" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
    <line x1="9.5" y1="1" x2="9.5" y2="3" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
  </svg>
);

interface ProfileDrawerProps {
  open: boolean;
  onClose: () => void;
  title: string;
  tabs?: {
    key: string;
    label: string;
    content: React.ReactNode;
  }[];
  children?: React.ReactNode;
}

const ProfileDrawer: React.FC<ProfileDrawerProps> = ({
  open,
  onClose,
  title,
  tabs,
  children,
}) => {
  return (
    <Drawer
      title={title}
      placement="right"
      open={open}
      onClose={onClose}
      width={480}
      className="super-profile-drawer"
    >
      {tabs ? (
        <Tabs
          items={tabs.map((tab) => ({
            key: tab.key,
            label: tab.label,
            children: tab.content,
          }))}
          className="profile-drawer-tabs"
        />
      ) : (
        children
      )}
    </Drawer>
  );
};

export default ProfileDrawer;

// Helper component for tenant profile overview
export const TenantOverview: React.FC<{
  name: string;
  domain: string;
  logo?: string;
  created: string;
  status: string;
}> = ({ name, domain, created, status }) => (
  <div className="tenant-overview">
    <div className="tenant-overview-header">
      <Avatar size={56} icon={<UserOutlined />} style={{ background: '#d4a853', fontSize: 24 }} />
      <div>
        <Text className="tenant-name">{name}</Text>
        <Text className="tenant-domain"><GlobalOutlined /> {domain}</Text>
      </div>
    </div>
    <Descriptions column={1} size="small" className="tenant-descriptions">
      <Descriptions.Item label={<><CalendarOutlined /> Created</>}>{created}</Descriptions.Item>
      <Descriptions.Item label="Status">
        <Tag color={status === 'Active' ? 'green' : 'orange'}>{status}</Tag>
      </Descriptions.Item>
    </Descriptions>
  </div>
);

export const SubscriptionDetails: React.FC<{
  plan: string;
  cycle: string;
  nextBilling: string;
  amount: string;
}> = ({ plan, cycle, nextBilling, amount }) => (
  <Descriptions column={1} size="small" className="tenant-descriptions">
    <Descriptions.Item label={<><CreditCardOutlined /> Plan</>}>{plan}</Descriptions.Item>
    <Descriptions.Item label="Billing Cycle">{cycle}</Descriptions.Item>
    <Descriptions.Item label="Next Billing">{nextBilling}</Descriptions.Item>
    <Descriptions.Item label="Amount"><Text strong style={{ color: '#10b981' }}>{amount}</Text></Descriptions.Item>
  </Descriptions>
);

export const TenantQuickStats: React.FC<{
  users: number;
  bookings: number;
  revenue: string;
}> = ({ users, bookings, revenue }) => (
  <Space size={16} wrap>
    <div className="quick-stat-item">
      <TeamOutlined style={{ color: '#3b82f6' }} />
      <Text className="quick-stat-value">{users}</Text>
      <Text className="quick-stat-label">Users</Text>
    </div>
    <div className="quick-stat-item">
      <CalendarOutlined style={{ color: '#d4a853' }} />
      <Text className="quick-stat-value">{bookings}</Text>
      <Text className="quick-stat-label">Bookings</Text>
    </div>
    <div className="quick-stat-item">
      <DollarOutlined style={{ color: '#10b981' }} />
      <Text className="quick-stat-value">{revenue}</Text>
      <Text className="quick-stat-label">Revenue</Text>
    </div>
  </Space>
);

'use client';

import React from 'react';
import { Row, Col, Card, Statistic, Table, Progress, Tag, Space, Typography } from 'antd';
import {
  UserOutlined, ShoppingCartOutlined, DollarOutlined,
  RiseOutlined, ArrowUpOutlined, ArrowDownOutlined,
} from '@ant-design/icons';
import './Dashboard.css';

const { Text } = Typography;

const stats = [
  { title: 'Total Users', value: 2845, prefix: <UserOutlined />, suffix: '', trend: 12.5, color: '#1890ff' },
  { title: 'Total Revenue', value: 84239, prefix: <DollarOutlined />, suffix: '', trend: 8.3, color: '#52c41a' },
  { title: 'Total Orders', value: 1438, prefix: <ShoppingCartOutlined />, suffix: '', trend: -3.2, color: '#faad14' },
  { title: 'Growth Rate', value: 23.4, prefix: <RiseOutlined />, suffix: '%', trend: 5.1, color: '#722ed1' },
];

const recentActivities = [
  { key: '1', user: 'John Doe', action: 'Created new account', status: 'success', time: '2 min ago' },
  { key: '2', user: 'Jane Smith', action: 'Updated profile', status: 'success', time: '15 min ago' },
  { key: '3', user: 'Bob Johnson', action: 'Failed login attempt', status: 'error', time: '1 hour ago' },
  { key: '4', user: 'Alice Williams', action: 'Completed purchase', status: 'success', time: '2 hours ago' },
  { key: '5', user: 'Charlie Brown', action: 'Pending verification', status: 'warning', time: '3 hours ago' },
];

const activityColumns = [
  { title: 'User', dataIndex: 'user', key: 'user' },
  { title: 'Action', dataIndex: 'action', key: 'action' },
  {
    title: 'Status', dataIndex: 'status', key: 'status',
    render: (status: string) => {
      const color = status === 'success' ? 'green' : status === 'error' ? 'red' : 'orange';
      return <Tag color={color}>{status.toUpperCase()}</Tag>;
    },
  },
  { title: 'Time', dataIndex: 'time', key: 'time' },
];

const tasks = [
  { name: 'User Management', progress: 85 },
  { name: 'API Integration', progress: 65 },
  { name: 'UI Design', progress: 90 },
  { name: 'Testing', progress: 45 },
];

export default function DashboardPage() {
  return (
    <div className="dashboard-container">
      {/* Stats Cards */}
      <Row gutter={[16, 16]} className="stats-row">
        {stats.map((stat, index) => (
          <Col xs={24} sm={12} lg={6} key={index}>
            <Card className="stat-card" variant="borderless">
              <div className="stat-icon" style={{ background: `${stat.color}20`, color: stat.color }}>
                {stat.prefix}
              </div>
              <Statistic
                title={stat.title}
                value={stat.value}
                suffix={stat.suffix}
                styles={{ content: { fontSize: '24px', fontWeight: 600 } }}
              />
              <div className="stat-trend">
                <Space>
                  {stat.trend > 0 ? (
                    <>
                      <ArrowUpOutlined style={{ color: '#52c41a' }} />
                      <Text style={{ color: '#52c41a' }}>+{stat.trend}%</Text>
                    </>
                  ) : (
                    <>
                      <ArrowDownOutlined style={{ color: '#ff4d4f' }} />
                      <Text style={{ color: '#ff4d4f' }}>{stat.trend}%</Text>
                    </>
                  )}
                  <Text type="secondary">vs last month</Text>
                </Space>
              </div>
            </Card>
          </Col>
        ))}
      </Row>

      <Row gutter={[16, 16]} style={{ marginTop: 24 }}>
        {/* Recent Activity */}
        <Col xs={24} lg={16}>
          <Card title="Recent Activity" variant="borderless" className="activity-card">
            <Table
              columns={activityColumns}
              dataSource={recentActivities}
              pagination={false}
              size="small"
            />
          </Card>
        </Col>

        {/* Tasks Progress */}
        <Col xs={24} lg={8}>
          <Card title="Tasks Progress" variant="borderless" className="tasks-card" style={{ height: '100%' }}>
            <div className="tasks-list">
              {tasks.map((task, index) => (
                <div key={index} className="task-item">
                  <div className="task-header">
                    <Text>{task.name}</Text>
                    <Text strong>{task.progress}%</Text>
                  </div>
                  <Progress
                    percent={task.progress}
                    showInfo={false}
                    strokeColor={
                      task.progress >= 80 ? '#52c41a'
                        : task.progress >= 50 ? '#1890ff'
                        : '#faad14'
                    }
                  />
                </div>
              ))}
            </div>
          </Card>
        </Col>
      </Row>

      {/* Quick Stats */}
      <Row gutter={[16, 16]} style={{ marginTop: 24 }}>
        <Col xs={24} sm={8}>
          <Card variant="borderless" className="quick-stat-card">
            <Statistic
              title="Active Users"
              value={1234}
              styles={{ content: { color: '#1890ff' } }}
              prefix={<UserOutlined />}
            />
          </Card>
        </Col>
        <Col xs={24} sm={8}>
          <Card variant="borderless" className="quick-stat-card">
            <Statistic
              title="Conversion Rate"
              value={68.5}
              precision={1}
              styles={{ content: { color: '#52c41a' } }}
              suffix="%"
            />
          </Card>
        </Col>
        <Col xs={24} sm={8}>
          <Card variant="borderless" className="quick-stat-card">
            <Statistic
              title="Avg. Session"
              value={8.2}
              precision={1}
              styles={{ content: { color: '#722ed1' } }}
              suffix="min"
            />
          </Card>
        </Col>
      </Row>
    </div>
  );
}

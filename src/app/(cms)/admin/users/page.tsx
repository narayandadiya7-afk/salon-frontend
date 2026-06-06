'use client';

import { useState } from 'react';
import {
  Table, Card, Input, Button, Space, Typography,
  Tag, Tooltip, Row, Col, Avatar, Drawer,
} from 'antd';
import type { ColumnsType, TablePaginationConfig } from 'antd/es/table';
import {
  PlusOutlined, EditOutlined, SearchOutlined,
  ReloadOutlined, UserOutlined, MailOutlined, PhoneOutlined,
} from '@ant-design/icons';
import { TFilterModel } from '../../../../types/config';
import { defaultFilterParams } from '../../../../utils/constants';
import UserForm from './form';

const { Title, Text } = Typography;
const { Search } = Input;

interface TUser {
  id: number; name: string; email: string; phone?: string;
  role: string; status: 'active' | 'inactive'; createdOn: string;
}

type TEditMode = { enable: boolean; data: TUser | null };

const mockData: TUser[] = [
  { id: 1, name: 'John Doe', email: 'john@example.com', phone: '9876543210', role: 'Admin', status: 'active', createdOn: '2024-01-15' },
  { id: 2, name: 'Jane Smith', email: 'jane@example.com', phone: '9876543211', role: 'User', status: 'active', createdOn: '2024-02-20' },
  { id: 3, name: 'Bob Johnson', email: 'bob@example.com', role: 'Manager', status: 'inactive', createdOn: '2024-03-10' },
  { id: 4, name: 'Alice Williams', email: 'alice@example.com', phone: '9876543213', role: 'User', status: 'active', createdOn: '2024-04-05' },
  { id: 5, name: 'Charlie Brown', email: 'charlie@example.com', role: 'User', status: 'active', createdOn: '2024-05-01' },
];

export default function UsersPage() {
  const [data] = useState<TUser[]>(mockData);
  const [loading] = useState(false);
  const [searchText, setSearchText] = useState('');
  const [filterParams, setFilterParams] = useState<TFilterModel>({ ...defaultFilterParams, totalRows: mockData.length });
  const [isEditing, setIsEditing] = useState<TEditMode>({ enable: false, data: null });
  const [addDrawerOpen, setAddDrawerOpen] = useState(false);

  const handleSearch = (value: string) => setFilterParams({ ...filterParams, searchText: value, currentPage: 1 });
  const handleTableChange = (pagination: TablePaginationConfig) =>
    setFilterParams({ ...filterParams, currentPage: pagination.current || 1, pageSize: pagination.pageSize || 10 });
  const handleReset = () => { setSearchText(''); setFilterParams({ ...defaultFilterParams, totalRows: mockData.length }); };

  const filtered = data.filter(u =>
    u.name.toLowerCase().includes(searchText.toLowerCase()) ||
    u.email.toLowerCase().includes(searchText.toLowerCase())
  );

  const columns: ColumnsType<TUser> = [
    {
      title: 'Sr. No.', key: 'index', width: 80, align: 'center',
      render: (_: any, __: TUser, index: number) =>
        index + 1 + (filterParams.currentPage - 1) * filterParams.pageSize,
    },
    {
      title: 'User', dataIndex: 'name', key: 'name', width: '25%',
      sorter: (a, b) => a.name.localeCompare(b.name),
      render: (text: string) => (
        <Space>
          <Avatar size="small" icon={<UserOutlined />} style={{ backgroundColor: 'var(--theme-primary)' }} />
          <Typography.Text strong>{text}</Typography.Text>
        </Space>
      ),
    },
    {
      title: 'Contact', key: 'contact', width: '25%',
      render: (_: any, record: TUser) => (
        <Space orientation="vertical" size={0}>
          <Space size="small">
            <MailOutlined style={{ color: 'var(--theme-text-secondary)' }} />
            <Text type="secondary">{record.email}</Text>
          </Space>
          {record.phone && (
            <Space size="small">
              <PhoneOutlined style={{ color: 'var(--theme-text-secondary)' }} />
              <Text type="secondary">{record.phone}</Text>
            </Space>
          )}
        </Space>
      ),
    },
    {
      title: 'Role', dataIndex: 'role', key: 'role', width: '15%',
      render: (role: string) => <Tag color="blue">{role}</Tag>,
    },
    {
      title: 'Status', dataIndex: 'status', key: 'status', width: '10%',
      render: (status: string) => (
        <Tag color={status === 'active' ? 'green' : 'red'}>{status.toUpperCase()}</Tag>
      ),
    },
    { title: 'Created On', dataIndex: 'createdOn', key: 'createdOn', width: '15%' },
    {
      title: 'Action', key: 'action', width: 100, align: 'center', fixed: 'right',
      render: (_: any, record: TUser) => (
        <Tooltip title="Edit">
          <Button type="text" icon={<EditOutlined />} className="action-btn"
            onClick={() => setIsEditing({ enable: true, data: record })} />
        </Tooltip>
      ),
    },
  ];

  return (
    <div className="user-list-container">
      <Card className="page-card" variant="borderless">
        <Row justify="space-between" align="middle" className="page-header">
          <Col>
            <Space>
              <UserOutlined className="page-icon" />
              <Title level={3} style={{ margin: 0 }}>Users Management</Title>
            </Space>
          </Col>
          <Col>
            <Button type="primary" icon={<PlusOutlined />} size="large" onClick={() => setAddDrawerOpen(true)}>
              Add User
            </Button>
          </Col>
        </Row>

        <Row gutter={[16, 16]} className="filter-section">
          <Col xs={24} sm={16} md={18}>
            <Search placeholder="Search by name, email, or role..." value={searchText}
              onChange={(e) => setSearchText(e.target.value)} onSearch={handleSearch}
              size="large" prefix={<SearchOutlined />} allowClear />
          </Col>
          <Col xs={24} sm={8} md={6}>
            <Button icon={<ReloadOutlined />} onClick={handleReset} size="large" block>Reset Filters</Button>
          </Col>
        </Row>

        <Table columns={columns} dataSource={filtered} rowKey="id" loading={loading}
          pagination={{
            current: filterParams.currentPage, pageSize: filterParams.pageSize,
            total: filtered.length, showSizeChanger: true,
            showTotal: (total) => `Total ${total} users`,
            pageSizeOptions: ['10', '20', '50', '100'],
          }}
          onChange={handleTableChange} className="config-table" scroll={{ x: 1100 }} />
      </Card>

      <Drawer title="Add New User" placement="right"
        open={addDrawerOpen} onClose={() => setAddDrawerOpen(false)} closable destroyOnClose
        styles={{ wrapper: { width: 600 }, body: { padding: 24, height: '100%', overflow: 'hidden', display: 'flex', flexDirection: 'column' } }}>
        <UserForm id={0} onCloseDrawer={() => setAddDrawerOpen(false)} onRefreshList={() => {}} />
      </Drawer>

      <Drawer title="Edit User" placement="right"
        open={isEditing.enable} onClose={() => setIsEditing({ enable: false, data: null })} closable destroyOnClose
        styles={{ wrapper: { width: 600 }, body: { padding: 24, height: '100%', overflow: 'hidden', display: 'flex', flexDirection: 'column' } }}>
        {isEditing.data && (
          <UserForm
            id={isEditing.data.id}
            onCloseDrawer={() => setIsEditing({ enable: false, data: null })}
            onRefreshList={() => {}}
          />
        )}
      </Drawer>
    </div>
  );
}

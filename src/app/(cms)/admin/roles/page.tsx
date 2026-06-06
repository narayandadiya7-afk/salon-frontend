'use client';

import { useState } from 'react';
import {
  Table, Card, Input, Button, Space, Typography,
  Tag, Tooltip, Row, Col, Badge, Drawer,
} from 'antd';
import type { ColumnsType, TablePaginationConfig } from 'antd/es/table';
import {
  PlusOutlined, EditOutlined, SearchOutlined,
  ReloadOutlined, SafetyOutlined,
} from '@ant-design/icons';
import { TFilterModel } from '@/types/config';
import { defaultFilterParams } from '@/utils/constants';
import RoleForm from './form';

const { Title, Text } = Typography;
const { Search } = Input;

interface TRole {
  id: number; name: string; description: string;
  userCount?: number; createdOn: string; isActive: boolean;
}

type TEditMode = { enable: boolean; data: TRole | null };

const mockData: TRole[] = [
  { id: 1, name: 'Super Admin', description: 'Full system access with all permissions', userCount: 2, createdOn: '2024-01-01', isActive: true },
  { id: 2, name: 'Admin', description: 'Administrative access to manage users and settings', userCount: 5, createdOn: '2024-01-05', isActive: true },
  { id: 3, name: 'Manager', description: 'Management access to view and manage reports', userCount: 12, createdOn: '2024-01-10', isActive: true },
  { id: 4, name: 'User', description: 'Standard user access with limited permissions', userCount: 48, createdOn: '2024-01-15', isActive: true },
  { id: 5, name: 'Viewer', description: 'Read-only access to view data', userCount: 20, createdOn: '2024-02-01', isActive: false },
];

export default function RolesPage() {
  const [data] = useState<TRole[]>(mockData);
  const [loading] = useState(false);
  const [searchText, setSearchText] = useState('');
  const [filterParams, setFilterParams] = useState<TFilterModel>({ ...defaultFilterParams, totalRows: mockData.length });
  const [isEditing, setIsEditing] = useState<TEditMode>({ enable: false, data: null });
  const [addDrawerOpen, setAddDrawerOpen] = useState(false);

  const handleSearch = (value: string) => setFilterParams({ ...filterParams, searchText: value, currentPage: 1 });
  const handleTableChange = (pagination: TablePaginationConfig) =>
    setFilterParams({ ...filterParams, currentPage: pagination.current || 1, pageSize: pagination.pageSize || 10 });
  const handleReset = () => { setSearchText(''); setFilterParams({ ...defaultFilterParams, totalRows: mockData.length }); };

  const filtered = data.filter(r =>
    r.name.toLowerCase().includes(searchText.toLowerCase()) ||
    r.description.toLowerCase().includes(searchText.toLowerCase())
  );

  const columns: ColumnsType<TRole> = [
    {
      title: 'Sr. No.', key: 'index', width: 80, align: 'center',
      render: (_: any, __: TRole, index: number) =>
        index + 1 + (filterParams.currentPage - 1) * filterParams.pageSize,
    },
    {
      title: 'Role Name', dataIndex: 'name', key: 'name', width: '25%',
      sorter: (a, b) => a.name.localeCompare(b.name),
      render: (text: string) => (
        <Space>
          <SafetyOutlined style={{ color: 'var(--theme-primary)' }} />
          <Typography.Text strong>{text}</Typography.Text>
        </Space>
      ),
    },
    {
      title: 'Description', dataIndex: 'description', key: 'description', width: '35%',
      ellipsis: { showTitle: false },
      render: (text: string) => (
        <Tooltip placement="topLeft" title={text}><Text type="secondary">{text}</Text></Tooltip>
      ),
    },
    {
      title: 'Users', dataIndex: 'userCount', key: 'userCount', width: '10%', align: 'center',
      render: (count: number = 0) => (
        <Badge count={count} showZero style={{ backgroundColor: 'var(--theme-primary)' }} />
      ),
    },
    {
      title: 'Status', dataIndex: 'isActive', key: 'isActive', width: '10%',
      render: (isActive: boolean) => (
        <Tag color={isActive ? 'green' : 'red'}>{isActive ? 'ACTIVE' : 'INACTIVE'}</Tag>
      ),
    },
    { title: 'Created On', dataIndex: 'createdOn', key: 'createdOn', width: '15%' },
    {
      title: 'Action', key: 'action', width: 100, align: 'center', fixed: 'right',
      render: (_: any, record: TRole) => (
        <Tooltip title="Edit">
          <Button type="text" icon={<EditOutlined />} className="action-btn"
            onClick={() => setIsEditing({ enable: true, data: record })} />
        </Tooltip>
      ),
    },
  ];

  return (
    <div className="role-list-container">
      <Card className="page-card" variant="borderless">
        <Row justify="space-between" align="middle" className="page-header">
          <Col>
            <Space>
              <SafetyOutlined className="page-icon" />
              <Title level={3} style={{ margin: 0 }}>Roles &amp; Permissions</Title>
            </Space>
          </Col>
          <Col>
            <Button type="primary" icon={<PlusOutlined />} size="large" onClick={() => setAddDrawerOpen(true)}>
              Add Role
            </Button>
          </Col>
        </Row>

        <Row gutter={[16, 16]} className="filter-section">
          <Col xs={24} sm={16} md={18}>
            <Search placeholder="Search by role name or description..." value={searchText}
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
            showTotal: (total) => `Total ${total} roles`,
            pageSizeOptions: ['10', '20', '50', '100'],
          }}
          onChange={handleTableChange} className="config-table" scroll={{ x: 1000 }} />
      </Card>

      <Drawer title="Add New Role" placement="right"
        open={addDrawerOpen} onClose={() => setAddDrawerOpen(false)} closable destroyOnClose
        styles={{ wrapper: { width: 600 }, body: { padding: 24, height: '100%', overflow: 'hidden', display: 'flex', flexDirection: 'column' } }}>
        <RoleForm id={0} onCloseDrawer={() => setAddDrawerOpen(false)} onRefreshList={() => {}} />
      </Drawer>

      <Drawer title="Edit Role" placement="right"
        open={isEditing.enable} onClose={() => setIsEditing({ enable: false, data: null })} closable destroyOnClose
        styles={{ wrapper: { width: 600 }, body: { padding: 24, height: '100%', overflow: 'hidden', display: 'flex', flexDirection: 'column' } }}>
        {isEditing.data && (
          <RoleForm
            id={isEditing.data.id}
            onCloseDrawer={() => setIsEditing({ enable: false, data: null })}
            onRefreshList={() => {}}
          />
        )}
      </Drawer>
    </div>
  );
}

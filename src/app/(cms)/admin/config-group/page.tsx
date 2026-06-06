'use client';

import { useState } from 'react';
import {
  Table, Card, Input, Button, Space, Typography,
  Tooltip, Row, Col, Badge, Drawer,
} from 'antd';
import type { ColumnsType, TablePaginationConfig } from 'antd/es/table';
import {
  PlusOutlined, EditOutlined, SearchOutlined,
  ReloadOutlined, GroupOutlined,
} from '@ant-design/icons';
import { TConfigGroup, TFilterModel } from '@/types/config';
import { defaultFilterParams } from '@/utils/constants';
import ConfigGroupForm from './form';

const { Title, Text } = Typography;
const { Search } = Input;

type TEditMode = { enable: boolean; data: TConfigGroup | null };

const mockData: TConfigGroup[] = [
  { id: 1, name: 'User Management', description: 'Handles user roles, permissions, and authentication settings', groupUniqueId: 'CFG-GRP-001' },
  { id: 2, name: 'Notification Settings', description: 'Controls email, SMS, and push notification preferences', groupUniqueId: 'CFG-GRP-002' },
  { id: 3, name: 'Payment Configuration', description: 'Manages payment gateways, currencies, and billing cycles', groupUniqueId: 'CFG-GRP-003' },
  { id: 4, name: 'Security Policies', description: 'Defines password rules, 2FA, and access restrictions', groupUniqueId: 'CFG-GRP-004' },
  { id: 5, name: 'UI Preferences', description: 'Customizes themes, layouts, and display settings', groupUniqueId: 'CFG-GRP-005' },
];

export default function ConfigGroupPage() {
  const [data, setData] = useState<TConfigGroup[]>(mockData);
  const [loading] = useState(false);
  const [searchText, setSearchText] = useState('');
  const [filterParams, setFilterParams] = useState<TFilterModel>({ ...defaultFilterParams, totalRows: mockData.length });
  const [isEditing, setIsEditing] = useState<TEditMode>({ enable: false, data: null });
  const [addDrawerOpen, setAddDrawerOpen] = useState(false);

  const handleSearch = (value: string) => setFilterParams({ ...filterParams, searchText: value, currentPage: 1 });
  const handleTableChange = (pagination: TablePaginationConfig) =>
    setFilterParams({ ...filterParams, currentPage: pagination.current || 1, pageSize: pagination.pageSize || 10 });
  const handleReset = () => { setSearchText(''); setFilterParams({ ...defaultFilterParams, totalRows: mockData.length }); };

  const filtered = data.filter(g =>
    g.name.toLowerCase().includes(searchText.toLowerCase()) ||
    g.description.toLowerCase().includes(searchText.toLowerCase())
  );

  const columns: ColumnsType<TConfigGroup> = [
    {
      title: 'Sr. No.', key: 'index', width: 80, align: 'center',
      render: (_: any, __: TConfigGroup, index: number) =>
        index + 1 + (filterParams.currentPage - 1) * filterParams.pageSize,
    },
    {
      title: 'Group Name', dataIndex: 'name', key: 'name', width: '40%',
      sorter: (a, b) => a.name.localeCompare(b.name),
      render: (text: string) => (
        <Space>
          <GroupOutlined style={{ color: 'var(--theme-primary)' }} />
          <Typography.Text strong>{text}</Typography.Text>
        </Space>
      ),
    },
    {
      title: 'Description', dataIndex: 'description', key: 'description', width: '50%',
      ellipsis: { showTitle: false },
      render: (text: string) => (
        <Tooltip placement="topLeft" title={text}><Text type="secondary">{text}</Text></Tooltip>
      ),
    },
    {
      title: 'Action', key: 'action', width: 100, align: 'center', fixed: 'right',
      render: (_: any, record: TConfigGroup) => (
        <Tooltip title="Edit">
          <Button type="text" icon={<EditOutlined />} className="action-btn"
            onClick={() => setIsEditing({ enable: true, data: record })} />
        </Tooltip>
      ),
    },
  ];

  return (
    <div className="config-group-container">
      <Card className="page-card" variant="borderless">
        <Row justify="space-between" align="middle" className="page-header">
          <Col>
            <Space>
              <GroupOutlined className="page-icon" />
              <Title level={3} style={{ margin: 0 }}>Config Groups</Title>
              <Badge count={filterParams.totalRows} showZero style={{ backgroundColor: 'var(--theme-primary)' }} />
            </Space>
          </Col>
          <Col>
            <Button type="primary" icon={<PlusOutlined />} size="large" onClick={() => setAddDrawerOpen(true)}>
              Add Group
            </Button>
          </Col>
        </Row>

        <Row gutter={[16, 16]} className="filter-section">
          <Col xs={24} sm={16} md={18}>
            <Search placeholder="Search by group name or description..." value={searchText}
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
            showTotal: (total) => `Total ${total} groups`,
            pageSizeOptions: ['10', '20', '50', '100'],
          }}
          onChange={handleTableChange} className="config-table" scroll={{ x: 800 }} />
      </Card>

      {/* Add Drawer */}
      <Drawer
        title="Add Config Group"
        placement="right"
        open={addDrawerOpen}
        onClose={() => setAddDrawerOpen(false)}
        closable={true}
        destroyOnClose
        styles={{ wrapper: { width: 520 }, body: { padding: 24, height: '100%', overflow: 'hidden', display: 'flex', flexDirection: 'column' } }}
      >
        <ConfigGroupForm
          id={0}
          onCloseDrawer={() => setAddDrawerOpen(false)}
          onRefreshList={() => setData([...mockData])}
        />
      </Drawer>

      {/* Edit Drawer */}
      <Drawer
        title="Edit Config Group"
        placement="right"
        open={isEditing.enable}
        onClose={() => setIsEditing({ enable: false, data: null })}
        closable={true}
        destroyOnClose
        styles={{ wrapper: { width: 520 }, body: { padding: 24, height: '100%', overflow: 'hidden', display: 'flex', flexDirection: 'column' } }}
      >
        {isEditing.data && (
          <ConfigGroupForm
            id={isEditing.data.id}
            initialValues={isEditing.data}
            onCloseDrawer={() => setIsEditing({ enable: false, data: null })}
            onRefreshList={() => setData([...mockData])}
          />
        )}
      </Drawer>
    </div>
  );
}

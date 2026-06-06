'use client';

import { useState } from 'react';
import {
  Table, Card, Input, Button, Space, Typography,
  Tag, Tooltip, Row, Col, Drawer,
} from 'antd';
import type { ColumnsType, TablePaginationConfig } from 'antd/es/table';
import {
  PlusOutlined, EditOutlined, SearchOutlined,
  ReloadOutlined, UnorderedListOutlined,
} from '@ant-design/icons';
import { TConfigParam, TFilterModel } from '@/types/config';
import { defaultFilterParams } from '@/utils/constants';
import ConfigParamForm from './form';

const { Title } = Typography;
const { Search } = Input;

type TEditMode = { enable: boolean; data: TConfigParam | null };

const mockData: TConfigParam[] = [
  { id: 221, name: 'μS', description: 'μS', groupId: 0, groupName: 'UOM', groupUniqueId: 'UOMTYPES', createdOn: '2024-07-02T14:48:09', organizationId: 0, paramUniqueId: 'US' },
  { id: 218, name: 'minutes', description: 'minutes', groupId: 0, groupName: 'UOM', groupUniqueId: 'UOMTYPES', createdOn: '2024-07-02T14:04:32', organizationId: 0, paramUniqueId: 'MINUTES' },
  { id: 215, name: 'mm', description: 'mm', groupId: 0, groupName: 'UOM', groupUniqueId: 'UOMTYPES', createdOn: '2024-07-02T14:04:08', organizationId: 0, paramUniqueId: 'MM' },
  { id: 212, name: '∘', description: '∘', groupId: 0, groupName: 'UOM', groupUniqueId: 'UOMTYPES', createdOn: '2024-07-02T14:03:45', organizationId: 0, paramUniqueId: 'DEGREE' },
  { id: 127, name: 'CPO', description: 'CPO', groupId: 0, groupName: 'ActionOwner', groupUniqueId: 'ACTIONOWNER', createdOn: '2024-06-21T16:57:13', organizationId: 0, paramUniqueId: 'CPO' },
];

export default function ConfigParamPage() {
  const [data] = useState<TConfigParam[]>(mockData);
  const [loading] = useState(false);
  const [searchText, setSearchText] = useState('');
  const [filterParams, setFilterParams] = useState<TFilterModel>({ ...defaultFilterParams, totalRows: mockData.length });
  const [isEditing, setIsEditing] = useState<TEditMode>({ enable: false, data: null });
  const [addDrawerOpen, setAddDrawerOpen] = useState(false);

  const handleSearch = (value: string) => setFilterParams({ ...filterParams, searchText: value, currentPage: 1 });
  const handleTableChange = (pagination: TablePaginationConfig) =>
    setFilterParams({ ...filterParams, currentPage: pagination.current || 1, pageSize: pagination.pageSize || 10 });
  const handleReset = () => { setSearchText(''); setFilterParams({ ...defaultFilterParams, totalRows: mockData.length }); };

  const filtered = data.filter(p =>
    p.name.toLowerCase().includes(searchText.toLowerCase()) ||
    p.description.toLowerCase().includes(searchText.toLowerCase()) ||
    p.groupName.toLowerCase().includes(searchText.toLowerCase())
  );

  const columns: ColumnsType<TConfigParam> = [
    {
      title: 'Sr. No.', key: 'index', width: 80, align: 'center',
      render: (_: any, __: TConfigParam, index: number) =>
        index + 1 + (filterParams.currentPage - 1) * filterParams.pageSize,
    },
    {
      title: 'Name', dataIndex: 'name', key: 'name', width: '20%',
      sorter: (a, b) => a.name.localeCompare(b.name),
      render: (text: string) => <Typography.Text strong>{text}</Typography.Text>,
    },
    { title: 'Description', dataIndex: 'description', key: 'description', width: '25%' },
    {
      title: 'Group Name', dataIndex: 'groupName', key: 'groupName', width: '20%',
      render: (text: string) => <Tag color="blue">{text}</Tag>,
    },
    {
      title: 'Created On', dataIndex: 'createdOn', key: 'createdOn', width: '20%',
      sorter: (a, b) => new Date(a.createdOn || 0).getTime() - new Date(b.createdOn || 0).getTime(),
      render: (date: string) => date ? new Date(date).toLocaleDateString('en-GB', { day: '2-digit', month: 'short', year: 'numeric' }) : '-',
    },
    {
      title: 'Action', key: 'action', width: 100, align: 'center', fixed: 'right',
      render: (_: any, record: TConfigParam) => (
        <Tooltip title="Edit">
          <Button type="text" icon={<EditOutlined />} className="action-btn"
            onClick={() => setIsEditing({ enable: true, data: record })} />
        </Tooltip>
      ),
    },
  ];

  return (
    <div className="config-param-container">
      <Card className="page-card" variant="borderless">
        <Row justify="space-between" align="middle" className="page-header">
          <Col>
            <Space>
              <UnorderedListOutlined className="page-icon" />
              <Title level={3} style={{ margin: 0 }}>Config Parameters</Title>
            </Space>
          </Col>
          <Col>
            <Button type="primary" icon={<PlusOutlined />} size="large" onClick={() => setAddDrawerOpen(true)}>
              Add New
            </Button>
          </Col>
        </Row>

        <Row gutter={[16, 16]} className="filter-section">
          <Col xs={24} sm={16} md={18}>
            <Search placeholder="Search by name, description, or group..." value={searchText}
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
            showTotal: (total) => `Total ${total} items`,
            pageSizeOptions: ['10', '20', '50', '100'],
          }}
          onChange={handleTableChange} className="config-table" scroll={{ x: 1000 }} />
      </Card>

      <Drawer title="Add Config Parameter" placement="right"
        styles={{ wrapper: { width: 520 }, body: { padding: 24, height: '100%', overflow: 'hidden', display: 'flex', flexDirection: 'column' } }}
        open={addDrawerOpen} onClose={() => setAddDrawerOpen(false)} closable destroyOnClose>
        <ConfigParamForm id={0} onCloseDrawer={() => setAddDrawerOpen(false)} onRefreshList={() => {}} />
      </Drawer>

      <Drawer title="Edit Config Parameter" placement="right"
        styles={{ wrapper: { width: 520 }, body: { padding: 24, height: '100%', overflow: 'hidden', display: 'flex', flexDirection: 'column' } }}
        open={isEditing.enable} onClose={() => setIsEditing({ enable: false, data: null })} closable destroyOnClose>
        {isEditing.data && (
          <ConfigParamForm
            id={isEditing.data.id}
            initialValues={isEditing.data}
            onCloseDrawer={() => setIsEditing({ enable: false, data: null })}
            onRefreshList={() => {}}
          />
        )}
      </Drawer>
    </div>
  );
}

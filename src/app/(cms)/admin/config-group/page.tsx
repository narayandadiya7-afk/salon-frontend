'use client';

import { useState, useEffect, useCallback } from 'react';
import {
  Table, Card, Input, Button, Space, Typography,
  Tooltip, Row, Col, Drawer, Popconfirm,
} from 'antd';
import type { ColumnsType, TablePaginationConfig } from 'antd/es/table';
import {
  PlusOutlined, EditOutlined, DeleteOutlined, SearchOutlined,
  ReloadOutlined, GroupOutlined,
} from '@ant-design/icons';
import useFetch from '@/hooks/useFetch';
import { TConfigGroup, TFilterModel } from '@/types/config';
import { defaultFilterParams } from '@/utils/constants';
import { eResultCode } from '@/utils/enum';
import notification from '@/utils/notification';
import ConfigGroupForm from './form';
import { GetConfigGroupList, DeleteConfigGroup } from '@/utils/api.constant';

const { Title, Text } = Typography;
const { Search } = Input;

type TEditMode = { enable: boolean; data: TConfigGroup | null };

export default function ConfigGroupPage() {
  const { post } = useFetch();
  const [data, setData] = useState<TConfigGroup[]>([]);
  const [loading, setLoading] = useState(false);
  const [filterParams, setFilterParams] = useState<TFilterModel>({ ...defaultFilterParams });
  const [isEditing, setIsEditing] = useState<TEditMode>({ enable: false, data: null });
  const [addDrawerOpen, setAddDrawerOpen] = useState(false);

  const fetchData = useCallback(async () => {
    setLoading(true);
    try {
      const response = await post(GetConfigGroupList, {
        data: { ...filterParams },
      });
      const { dataResponse, data: rows, filterModel } = response;
      if (dataResponse?.returnCode === eResultCode.SUCCESS) {
        setData(rows || []);
        if (filterModel) setFilterParams((prev) => ({ ...prev, ...filterModel }));
      }
    } catch {
      notification.error('Failed to load config groups');
    } finally {
      setLoading(false);
    }
  }, [post, filterParams]);

  useEffect(() => { fetchData(); }, [fetchData]);

  const handleSearch = (value: string) => setFilterParams((prev) => ({ ...prev, searchText: value, currentPage: 1 }));
  const handleTableChange = (pagination: TablePaginationConfig) =>
    setFilterParams((prev) => ({ ...prev, currentPage: pagination.current || 1, pageSize: pagination.pageSize || 10 }));
  const handleReset = () => setFilterParams({ ...defaultFilterParams });

  const handleDelete = async (id: number) => {
    try {
      const response = await post(DeleteConfigGroup, { data: { id } });
      if (response?.dataResponse?.returnCode === eResultCode.SUCCESS) {
        notification.success('Config group deleted successfully');
        fetchData();
      } else {
        notification.error(response?.dataResponse?.description || 'Failed to delete config group');
      }
    } catch {
      notification.error('Failed to delete config group');
    }
  };

  const columns: ColumnsType<TConfigGroup> = [
    {
      title: 'Sr. No.', key: 'index', width: 80, align: 'center',
      render: (_: any, __: TConfigGroup, index: number) =>
        index + 1 + (filterParams.currentPage - 1) * filterParams.pageSize,
    },
    {
      title: 'Group Name', dataIndex: 'name', key: 'name', width: '40%',
      render: (text: string) => (
        <Space>
          <GroupOutlined style={{ color: 'var(--theme-primary)' }} />
          <Typography.Text strong>{text}</Typography.Text>
        </Space>
      ),
    },
    {
      title: 'Description', dataIndex: 'description', key: 'description', width: '45%',
      ellipsis: { showTitle: false },
      render: (text: string) => (
        <Tooltip placement="topLeft" title={text}><Text type="secondary">{text}</Text></Tooltip>
      ),
    },
    {
      title: 'Action', key: 'action', width: 120, align: 'center', fixed: 'right',
      render: (_: any, record: TConfigGroup) => (
        <Space>
          <Tooltip title="Edit">
            <Button type="text" icon={<EditOutlined />} className="action-btn"
              onClick={() => setIsEditing({ enable: true, data: record })} />
          </Tooltip>
          <Popconfirm title="Delete this group?" onConfirm={() => handleDelete(record.id)} okText="Yes" cancelText="No">
            <Tooltip title="Delete">
              <Button type="text" danger icon={<DeleteOutlined />} className="action-btn" />
            </Tooltip>
          </Popconfirm>
        </Space>
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
            <Search placeholder="Search by group name or description..." value={filterParams.searchText}
              onChange={(e) => setFilterParams((prev) => ({ ...prev, searchText: e.target.value }))}
              onSearch={handleSearch} size="large" prefix={<SearchOutlined />} allowClear />
          </Col>
          <Col xs={24} sm={8} md={6}>
            <Button icon={<ReloadOutlined />} onClick={handleReset} size="large" block>Reset Filters</Button>
          </Col>
        </Row>

        <Table columns={columns} dataSource={data} rowKey="id" loading={loading}
          pagination={{
            current: filterParams.currentPage, pageSize: filterParams.pageSize,
            total: filterParams.totalRows, showSizeChanger: true,
            showTotal: (total) => `Total ${total} groups`,
            pageSizeOptions: ['10', '20', '50', '100'],
          }}
          onChange={handleTableChange} className="config-table" scroll={{ x: 800 }} />
      </Card>

      <Drawer title="Add Config Group" placement="right"
        open={addDrawerOpen} onClose={() => setAddDrawerOpen(false)} closable destroyOnClose
        styles={{ wrapper: { width: 520 }, body: { padding: 24, height: '100%', overflow: 'hidden', display: 'flex', flexDirection: 'column' } }}>
        <ConfigGroupForm id={0} onCloseDrawer={() => setAddDrawerOpen(false)} onRefreshList={fetchData} />
      </Drawer>

      <Drawer title="Edit Config Group" placement="right"
        open={isEditing.enable} onClose={() => setIsEditing({ enable: false, data: null })} closable destroyOnClose
        styles={{ wrapper: { width: 520 }, body: { padding: 24, height: '100%', overflow: 'hidden', display: 'flex', flexDirection: 'column' } }}>
        {isEditing.data && (
          <ConfigGroupForm
            id={isEditing.data.id}
            initialValues={isEditing.data}
            onCloseDrawer={() => setIsEditing({ enable: false, data: null })}
            onRefreshList={fetchData}
          />
        )}
      </Drawer>
    </div>
  );
}

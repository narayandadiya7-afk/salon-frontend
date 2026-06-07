'use client';

import { useState, useEffect, useCallback } from 'react';
import {
  Table, Card, Input, Button, Space, Typography,
  Tag, Tooltip, Row, Col, Drawer, Popconfirm,
} from 'antd';
import type { ColumnsType, TablePaginationConfig } from 'antd/es/table';
import {
  PlusOutlined, EditOutlined, DeleteOutlined, SearchOutlined,
  ReloadOutlined, UnorderedListOutlined,
} from '@ant-design/icons';
import useFetch from '@/hooks/useFetch';
import { TConfigParam, TFilterModel } from '@/types/config';
import { defaultFilterParams } from '@/utils/constants';
import { eResultCode } from '@/utils/enum';
import notification from '@/utils/notification';
import ConfigParamForm from './form';
import { GetConfigParamList, DeleteConfigParam } from '@/utils/api.constant';

const { Title } = Typography;
const { Search } = Input;

type TEditMode = { enable: boolean; data: TConfigParam | null };

export default function ConfigParamPage() {
  const { post } = useFetch();
  const [data, setData] = useState<TConfigParam[]>([]);
  const [loading, setLoading] = useState(false);
  const [filterParams, setFilterParams] = useState<TFilterModel>({ ...defaultFilterParams });
  const [isEditing, setIsEditing] = useState<TEditMode>({ enable: false, data: null });
  const [addDrawerOpen, setAddDrawerOpen] = useState(false);

  const fetchData = useCallback(async () => {
    setLoading(true);
    try {
      const response = await post(GetConfigParamList, {
        data: { ...filterParams },
      });
      const { dataResponse, data: rows, filterModel } = response;
      if (dataResponse?.returnCode === eResultCode.SUCCESS) {
        setData(rows?.rows || rows || []);
        if (filterModel) setFilterParams((prev) => ({ ...prev, ...filterModel }));
      }
    } catch {
      notification.error('Failed to load config params');
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
      const response = await post(DeleteConfigParam, { data: { id } });
      if (response?.dataResponse?.returnCode === eResultCode.SUCCESS) {
        notification.success('Config param deleted successfully');
        fetchData();
      } else {
        notification.error(response?.dataResponse?.description || 'Failed to delete config param');
      }
    } catch {
      notification.error('Failed to delete config param');
    }
  };

  const columns: ColumnsType<TConfigParam> = [
    {
      title: 'Sr. No.', key: 'index', width: 80, align: 'center',
      render: (_: any, __: TConfigParam, index: number) =>
        index + 1 + (filterParams.currentPage - 1) * filterParams.pageSize,
    },
    {
      title: 'Name', dataIndex: 'name', key: 'name', width: '20%',
      render: (text: string) => <Typography.Text strong>{text}</Typography.Text>,
    },
    { title: 'Description', dataIndex: 'description', key: 'description', width: '25%' },
    {
      title: 'Group Name', dataIndex: 'groupName', key: 'groupName', width: '20%',
      render: (text: string) => <Tag color="blue">{text}</Tag>,
    },
    {
      title: 'Action', key: 'action', width: 120, align: 'center', fixed: 'right',
      render: (_: any, record: TConfigParam) => (
        <Space>
          <Tooltip title="Edit">
            <Button type="text" icon={<EditOutlined />} className="action-btn"
              onClick={() => setIsEditing({ enable: true, data: record })} />
          </Tooltip>
          <Popconfirm title="Delete this parameter?" onConfirm={() => handleDelete(record.id)} okText="Yes" cancelText="No">
            <Tooltip title="Delete">
              <Button type="text" danger icon={<DeleteOutlined />} className="action-btn" />
            </Tooltip>
          </Popconfirm>
        </Space>
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
            <Search placeholder="Search by name, description, or group..." value={filterParams.searchText}
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
            showTotal: (total) => `Total ${total} items`,
            pageSizeOptions: ['10', '20', '50', '100'],
          }}
          onChange={handleTableChange} className="config-table" scroll={{ x: 1000 }} />
      </Card>

      <Drawer title="Add Config Parameter" placement="right"
        styles={{ wrapper: { width: 520 }, body: { padding: 24, height: '100%', overflow: 'hidden', display: 'flex', flexDirection: 'column' } }}
        open={addDrawerOpen} onClose={() => setAddDrawerOpen(false)} closable destroyOnClose>
        <ConfigParamForm id={0} onCloseDrawer={() => setAddDrawerOpen(false)} onRefreshList={fetchData} />
      </Drawer>

      <Drawer title="Edit Config Parameter" placement="right"
        styles={{ wrapper: { width: 520 }, body: { padding: 24, height: '100%', overflow: 'hidden', display: 'flex', flexDirection: 'column' } }}
        open={isEditing.enable} onClose={() => setIsEditing({ enable: false, data: null })} closable destroyOnClose>
        {isEditing.data && (
          <ConfigParamForm
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

'use client';

import { useState, useEffect, useCallback, useRef } from 'react';
import {
  Button, Space, Typography, Input, Card,
  Drawer, Tooltip, Popconfirm,
} from 'antd';
import type { TablePaginationConfig } from 'antd/es/table';
import {
  PlusOutlined, EditOutlined, DeleteOutlined, ReloadOutlined,
  UnorderedListOutlined,
} from '@ant-design/icons';
import DataTable from '@/components/super-admin/DataTable';
import useFetch from '@/hooks/useFetch';
import { TConfigParam, TFilterModel } from '@/types/config';
import { defaultFilterParams } from '@/utils/constants';
import { eResultCode } from '@/utils/enum';
import notification from '@/utils/notification';
import ConfigParamForm from './form';
import { GetConfigParamList, DeleteConfigParam } from '@/utils/api.constant';

const { Title, Text } = Typography;
const { Search } = Input;

type TEditMode = { enable: boolean; data: TConfigParam | null };

export default function ConfigParamPage() {
  const { post } = useFetch();
  const [data, setData] = useState<TConfigParam[]>([]);
  const [loading, setLoading] = useState(true);
  const [filterParams, setFilterParams] = useState<TFilterModel>({ ...defaultFilterParams });
  const filterParamsRef = useRef(filterParams);
  filterParamsRef.current = filterParams;
  const [fetchTrigger, setFetchTrigger] = useState(0);
  const [isEditing, setIsEditing] = useState<TEditMode>({ enable: false, data: null });
  const [addDrawerOpen, setAddDrawerOpen] = useState(false);

  const fetchData = useCallback(async () => {
    setLoading(true);
    try {
      const response = await post(GetConfigParamList, {
        data: { ...filterParamsRef.current },
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
  }, [post]);

  const initialFetchDone = useRef(false);

  useEffect(() => {
    if (initialFetchDone.current && fetchTrigger === 0) return;
    initialFetchDone.current = true;
    fetchData();
  }, [fetchTrigger]);

  const handleSearch = (value: string) => {
    setFilterParams((prev) => ({ ...prev, searchText: value, currentPage: 1 }));
    setFetchTrigger((t) => t + 1);
  };

  const handleTableChange = (pagination: TablePaginationConfig) => {
    setFilterParams((prev) => ({ ...prev, currentPage: pagination.current || 1, pageSize: pagination.pageSize || 10 }));
    setFetchTrigger((t) => t + 1);
  };

  const handleReset = () => {
    setFilterParams({ ...defaultFilterParams });
    setFetchTrigger((t) => t + 1);
  };

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

  const columns = [
    {
      title: 'Sr. No.', key: 'index', width: 80, align: 'center' as const,
      render: (_: any, __: TConfigParam, index: number) =>
        index + 1 + (filterParams.currentPage - 1) * filterParams.pageSize,
    },
    {
      title: 'Name', dataIndex: 'name', key: 'name',
      render: (text: string) => <Text strong>{text}</Text>,
    },
    { title: 'Description', dataIndex: 'description', key: 'description' },
    {
      title: 'Group', dataIndex: 'groupName', key: 'groupName',
      render: (text: string) => (
        <span style={{
          display: 'inline-block', padding: '2px 10px', borderRadius: 9999, fontSize: 12,
          fontWeight: 500, background: 'rgba(212,168,83,0.12)', color: '#b89447',
        }}>
          {text}
        </span>
      ),
    },
    {
      title: 'Actions', key: 'action', width: 100, align: 'center' as const,
      render: (_: any, record: TConfigParam) => (
        <Space>
          <Tooltip title="Edit">
            <Button type="text" size="small" icon={<EditOutlined />}
              onClick={() => setIsEditing({ enable: true, data: record })} />
          </Tooltip>
          <Popconfirm title="Delete this parameter?" onConfirm={() => handleDelete(record.id)} okText="Yes" cancelText="No">
            <Tooltip title="Delete">
              <Button type="text" size="small" danger icon={<DeleteOutlined />} />
            </Tooltip>
          </Popconfirm>
        </Space>
      ),
    },
  ];

  return (
    <div className="super-page">
      <Card className="super-page-card" variant="borderless">
        <div className="super-page-header" style={{ marginBottom: 0, paddingTop: 8, paddingBottom: 8 }}>
          <div>
            <Title level={4} className="super-page-title">
              <UnorderedListOutlined className="super-page-icon" /> Config Parameters
            </Title>
            <Text type="secondary">Manage system configuration parameters</Text>
          </div>
          <Space>
            <Button type="primary" icon={<PlusOutlined />}
              style={{ background: '#d4a853', borderColor: '#d4a853' }}
              onClick={() => setAddDrawerOpen(true)}>
              Add New
            </Button>
            <Search
              placeholder="Search by name, description, or group..."
              value={filterParams.searchText}
              onChange={(e) => setFilterParams((prev) => ({ ...prev, searchText: e.target.value }))}
              onSearch={handleSearch} allowClear style={{ width: 250 }} />
            <Tooltip title="Reset Filters">
              <Button icon={<ReloadOutlined />} onClick={handleReset} />
            </Tooltip>
          </Space>
        </div>

        <DataTable
          columns={columns}
          dataSource={data}
          rowKey="id"
          loading={loading}
          pagination={{
            current: filterParams.currentPage,
            pageSize: filterParams.pageSize,
            total: filterParams.totalRows,
            showSizeChanger: true,
            showTotal: (total: number) => `Total ${total} items`,
            pageSizeOptions: ['10', '20', '50', '100'],
          }}
          onChange={handleTableChange}
          scroll={{ x: 900 }}
        />
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

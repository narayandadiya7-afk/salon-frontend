'use client';

import { useState, useEffect, useCallback, useRef } from 'react';
import {
  Button, Space, Typography, Input, Card,
  Drawer, Tooltip, Popconfirm,
} from 'antd';
import type { TablePaginationConfig } from 'antd/es/table';
import {
  PlusOutlined, EditOutlined, DeleteOutlined, ReloadOutlined,
  GroupOutlined,
} from '@ant-design/icons';
import DataTable from '@/components/super-admin/DataTable';
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
      const response = await post(GetConfigGroupList, {
        data: { ...filterParamsRef.current },
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

  const columns = [
    {
      title: 'Sr. No.', key: 'index', width: 80, align: 'center' as const,
      render: (_: any, __: TConfigGroup, index: number) =>
        index + 1 + (filterParams.currentPage - 1) * filterParams.pageSize,
    },
    {
      title: 'Group Name', dataIndex: 'name', key: 'name',
      render: (text: string) => (
        <Space>
          <GroupOutlined style={{ color: '#d4a853' }} />
          <Text strong>{text}</Text>
        </Space>
      ),
    },
    {
      title: 'Description', dataIndex: 'description', key: 'description',
      render: (text: string) => <Text>{text || '-'}</Text>,
    },
    {
      title: 'Actions', key: 'action', width: 100, align: 'center' as const,
      render: (_: any, record: TConfigGroup) => (
        <Space>
          <Tooltip title="Edit">
            <Button type="text" size="small" icon={<EditOutlined />}
              onClick={() => setIsEditing({ enable: true, data: record })} />
          </Tooltip>
          <Popconfirm title="Delete this group?" onConfirm={() => handleDelete(record.id)} okText="Yes" cancelText="No">
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
              <GroupOutlined className="super-page-icon" /> Config Groups
            </Title>
            <Text type="secondary">Manage configuration parameter groups</Text>
          </div>
          <Space>
            <Button type="primary" icon={<PlusOutlined />}
              style={{ background: '#d4a853', borderColor: '#d4a853' }}
              onClick={() => setAddDrawerOpen(true)}>
              Add Group
            </Button>
            <Search
              placeholder="Search by group name or description..."
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
            showTotal: (total: number) => `Total ${total} groups`,
            pageSizeOptions: ['10', '20', '50', '100'],
          }}
          onChange={handleTableChange}
          scroll={{ x: 800 }}
        />
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

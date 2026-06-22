'use client';

import { useState, useEffect, useCallback, useRef } from 'react';
import {
  Button, Space, Typography, Input, Card,
  Drawer, Tooltip, Popconfirm,
} from 'antd';
import type { TablePaginationConfig } from 'antd/es/table';
import {
  PlusOutlined, EditOutlined, DeleteOutlined, ReloadOutlined,
  SafetyOutlined,
} from '@ant-design/icons';
import DataTable from '@/components/super-admin/DataTable';
import useFetch from '@/hooks/useFetch';
import { TFilterModel } from '@/types/config';
import { defaultFilterParams } from '@/utils/constants';
import { eResultCode } from '@/utils/enum';
import notification from '@/utils/notification';
import RoleForm from './form';
import { GetRolesList, DeleteRole } from '@/utils/api.constant';

const { Title, Text } = Typography;
const { Search } = Input;

interface TRoleRow {
  id: string; name: string; description: string;
  createdAt: string; isdeleted: number;
}

type TEditMode = { enable: boolean; data: TRoleRow | null };

export default function RolesPage() {
  const { post } = useFetch();
  const [data, setData] = useState<TRoleRow[]>([]);
  const [totalRows, setTotalRows] = useState(0);
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
      const response = await post(GetRolesList, {
        data: { ...filterParamsRef.current },
      });
      const { dataResponse, data: rows, filterModel } = response;
      if (dataResponse?.returnCode === eResultCode.SUCCESS) {
        setData(rows || []);
        if (filterModel?.totalRows !== undefined) setTotalRows(filterModel.totalRows);
      }
    } catch {
      notification.error('Failed to load roles');
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

  const handleDelete = async (id: string) => {
    try {
      const response = await post(DeleteRole, { data: { id } });
      if (response?.dataResponse?.returnCode === eResultCode.SUCCESS) {
        notification.success('Role deleted successfully');
        fetchData();
      } else {
        notification.error(response?.dataResponse?.description || 'Failed to delete role');
      }
    } catch {
      notification.error('Failed to delete role');
    }
  };

  const columns = [
    {
      title: 'Sr. No.', key: 'index', width: 80, align: 'center' as const,
      render: (_: any, __: TRoleRow, index: number) =>
        index + 1 + (filterParams.currentPage - 1) * filterParams.pageSize,
    },
    {
      title: 'Role Name', dataIndex: 'name', key: 'name',
      render: (text: string) => (
        <Space>
          <SafetyOutlined style={{ color: '#d4a853' }} />
          <Text strong>{text}</Text>
        </Space>
      ),
    },
    {
      title: 'Description', dataIndex: 'description', key: 'description',
      render: (text: string) => <Text>{text || '-'}</Text>,
    },
    {
      title: 'Created On', dataIndex: 'createdAt', key: 'createdAt',
      render: (text: string) => text ? new Date(text).toLocaleDateString('en-GB', { day: 'numeric', month: 'short', year: 'numeric' }) : '-',
    },
    {
      title: 'Actions', key: 'action', width: 100, align: 'center' as const,
      render: (_: any, record: TRoleRow) => (
        <Space>
          <Tooltip title="Edit">
            <Button type="text" size="small" icon={<EditOutlined />}
              onClick={() => setIsEditing({ enable: true, data: record })} />
          </Tooltip>
          <Popconfirm title="Delete this role?" onConfirm={() => handleDelete(record.id)} okText="Yes" cancelText="No">
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
              <SafetyOutlined className="super-page-icon" /> Roles
            </Title>
            <Text type="secondary">Manage platform roles and their permissions</Text>
          </div>
          <Space>
            <Button type="primary" icon={<PlusOutlined />}
              style={{ background: '#d4a853', borderColor: '#d4a853' }}
              onClick={() => setAddDrawerOpen(true)}>
              Add Role
            </Button>
            <Search
              placeholder="Search by role name or description..."
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
            total: totalRows,
            showSizeChanger: true,
            showTotal: (total: number) => `Total ${total} roles`,
            pageSizeOptions: ['10', '20', '50', '100'],
          }}
          onChange={handleTableChange}
          scroll={{ x: 900 }}
        />
      </Card>

      <Drawer title="Add New Role" placement="right"
        open={addDrawerOpen} onClose={() => setAddDrawerOpen(false)} closable destroyOnClose
        styles={{ wrapper: { width: 600 }, body: { padding: 24, height: '100%', overflow: 'hidden', display: 'flex', flexDirection: 'column' } }}>
        <RoleForm id={0} onCloseDrawer={() => setAddDrawerOpen(false)} onRefreshList={fetchData} />
      </Drawer>

      <Drawer title="Edit Role" placement="right"
        open={isEditing.enable} onClose={() => setIsEditing({ enable: false, data: null })} closable destroyOnClose
        styles={{ wrapper: { width: 600 }, body: { padding: 24, height: '100%', overflow: 'hidden', display: 'flex', flexDirection: 'column' } }}>
        <RoleForm id={isEditing.data?.id ?? 0} onCloseDrawer={() => setIsEditing({ enable: false, data: null })} onRefreshList={fetchData} />
      </Drawer>
    </div>
  );
}

'use client';

import { useState, useEffect, useCallback, useRef } from 'react';
import {
  Button, Space, Typography, Input, Card,
  Drawer, Tooltip, Popconfirm,
} from 'antd';
import type { TablePaginationConfig } from 'antd/es/table';
import {
  PlusOutlined, EditOutlined, DeleteOutlined, ReloadOutlined,
  UserOutlined, TeamOutlined,
} from '@ant-design/icons';
import DataTable from '@/components/super-admin/DataTable';
import useFetch from '@/hooks/useFetch';
import { TFilterModel } from '@/types/config';
import { defaultFilterParams } from '@/utils/constants';
import { eResultCode } from '@/utils/enum';
import notification from '@/utils/notification';
import UserForm from './form';
import { GetUserList, DeleteUser } from '@/utils/api.constant';

const { Title, Text } = Typography;
const { Search } = Input;

interface TUserRow {
  id: string; userName: string;
  emailId: string; mobileNumber?: string; roleName?: string;
  isdeleted: number; createdOn: string;
}

type TEditMode = { enable: boolean; data: TUserRow | null };

export default function UsersPage() {
  const { post } = useFetch();
  const [data, setData] = useState<TUserRow[]>([]);
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
      const response = await post(GetUserList, {
        data: { ...filterParamsRef.current },
      });
      const { dataResponse, data: rows, filterModel } = response;
      if (dataResponse?.returnCode === eResultCode.SUCCESS) {
        setData(rows || []);
        if (filterModel?.totalRows !== undefined) setTotalRows(filterModel.totalRows);
      }
    } catch {
      notification.error('Failed to load users');
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
      const response = await post(DeleteUser, { data: { id } });
      if (response?.dataResponse?.returnCode === eResultCode.SUCCESS) {
        notification.success('User deleted successfully');
        fetchData();
      } else {
        notification.error(response?.dataResponse?.description || 'Failed to delete user');
      }
    } catch {
      notification.error('Failed to delete user');
    }
  };

  const columns = [
    {
      title: 'Sr. No.', key: 'index', width: 80, align: 'center' as const,
      render: (_: any, __: TUserRow, index: number) =>
        index + 1 + (filterParams.currentPage - 1) * filterParams.pageSize,
    },
    {
      title: 'Name', key: 'user',
      render: (_: any, record: TUserRow) => (
        <Space>
          <span style={{ width: 28, height: 28, borderRadius: '50%', background: '#d4a853', color: '#fff', display: 'inline-flex', alignItems: 'center', justifyContent: 'center', fontSize: 12 }}>
            <UserOutlined />
          </span>
          <Text strong>{record.userName}</Text>
        </Space>
      ),
    },
    {
      title: 'Email', dataIndex: 'emailId', key: 'emailId',
    },
    {
      title: 'Mobile', dataIndex: 'mobileNumber', key: 'mobileNumber',
      render: (mobile: string) => mobile || '-',
    },
    {
      title: 'Role', dataIndex: 'roleName', key: 'roleName',
      render: (role: string) => (
        <span style={{
          display: 'inline-block', padding: '2px 10px', borderRadius: 9999, fontSize: 12,
          fontWeight: 500, background: 'rgba(212,168,83,0.12)', color: '#b89447',
        }}>
          {role || '-'}
        </span>
      ),
    },
    {
      title: 'Actions', key: 'action', width: 100, align: 'center' as const,
      render: (_: any, record: TUserRow) => (
        <Space>
          <Tooltip title="Edit">
            <Button type="text" size="small" icon={<EditOutlined />}
              onClick={() => setIsEditing({ enable: true, data: record })} />
          </Tooltip>
          <Popconfirm title="Delete this user?" onConfirm={() => handleDelete(record.id)} okText="Yes" cancelText="No">
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
              <TeamOutlined className="super-page-icon" /> Users
            </Title>
            <Text type="secondary">Manage platform users and their roles</Text>
          </div>
          <Space>
            <Button type="primary" icon={<PlusOutlined />}
              style={{ background: '#d4a853', borderColor: '#d4a853' }}
              onClick={() => setAddDrawerOpen(true)}>
              Add User
            </Button>
            <Search
              placeholder="Search by name or email..."
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
            showTotal: (total: number) => `Total ${total} users`,
            pageSizeOptions: ['10', '20', '50', '100'],
          }}
          onChange={handleTableChange}
          scroll={{ x: 900 }}
        />
      </Card>

      <Drawer title="Add New User" placement="right"
        open={addDrawerOpen} onClose={() => setAddDrawerOpen(false)} closable destroyOnClose
        styles={{ wrapper: { width: 600 }, body: { padding: 24, height: '100%', overflow: 'hidden', display: 'flex', flexDirection: 'column' } }}>
        <UserForm id={0} onCloseDrawer={() => setAddDrawerOpen(false)} onRefreshList={fetchData} />
      </Drawer>

      <Drawer title="Edit User" placement="right"
        open={isEditing.enable} onClose={() => setIsEditing({ enable: false, data: null })} closable destroyOnClose
        styles={{ wrapper: { width: 600 }, body: { padding: 24, height: '100%', overflow: 'hidden', display: 'flex', flexDirection: 'column' } }}>
        <UserForm id={isEditing.data?.id ?? 0} onCloseDrawer={() => setIsEditing({ enable: false, data: null })} onRefreshList={fetchData} />
      </Drawer>
    </div>
  );
}

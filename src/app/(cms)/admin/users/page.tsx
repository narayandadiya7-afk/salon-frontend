'use client';

import { useState, useEffect, useCallback, useRef } from 'react';
import {
  Button, Space, Typography, Card,
  Drawer, Tooltip, Popconfirm, Tag, Avatar, Input,
} from 'antd';
import type { TablePaginationConfig } from 'antd/es/table';
import {
  PlusOutlined, EditOutlined, DeleteOutlined, ReloadOutlined,
  TeamOutlined,
} from '@ant-design/icons';
import DataTable from '@/components/super-admin/DataTable';
import StatusBadge from '@/components/super-admin/StatusBadge';
import useFetch from '@/hooks/useFetch';
import { TFilterModel } from '@/types/config';
import { defaultFilterParams } from '@/utils/constants';
import { eResultCode } from '@/utils/enum';
import notification from '@/utils/notification';
import UserForm from './form';
import './Users.css';
import { GetUserList, DeleteUser } from '@/utils/api.constant';

const { Title, Text } = Typography;

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

  const getInitials = (name: string) => {
    return name.split(' ').map(n => n[0]).join('').toUpperCase().slice(0, 2) || 'U';
  };

  const columns = [
    {
      title: 'User', key: 'user',
      render: (_: any, record: TUserRow) => (
        <Space>
          <Avatar size={28} style={{ background: '#d4a853', fontSize: 12, fontWeight: 600 }}>
            {getInitials(record.userName)}
          </Avatar>
          <div>
            <Text strong style={{ fontSize: 13 }}>{record.userName}</Text>
            <Text type="secondary" style={{ fontSize: 11, display: 'block' }}>{record.emailId}</Text>
          </div>
        </Space>
      ),
    },
    {
      title: 'Mobile', dataIndex: 'mobileNumber', key: 'mobileNumber',
      render: (mobile: string) => mobile ? <Text style={{ fontSize: 12 }}>{mobile}</Text> : <Text type="secondary" style={{ fontSize: 12 }}>—</Text>,
    },
    {
      title: 'Role', dataIndex: 'roleName', key: 'roleName',
      render: (role: string) => <Tag>{role || '—'}</Tag>,
    },
    {
      title: 'Status', key: 'status',
      render: (_: any, record: TUserRow) => (
        <StatusBadge status={record.isdeleted === 1 ? 'suspended' : 'active'} />
      ),
    },
    {
      title: 'Actions', key: 'action', width: 140, align: 'center' as const,
      render: (_: any, record: TUserRow) => (
        <Space size={4}>
          <Tooltip title="Edit">
            <Button type="link" size="small" icon={<EditOutlined />} className="super-action-btn"
              onClick={() => setIsEditing({ enable: true, data: record })} />
          </Tooltip>
          <Popconfirm title="Delete this user?" onConfirm={() => handleDelete(record.id)} okText="Yes" cancelText="No">
            <Tooltip title="Delete">
              <Button type="link" size="small" icon={<DeleteOutlined />} className="super-action-btn" danger />
            </Tooltip>
          </Popconfirm>
        </Space>
      ),
    },
  ];

  return (
    <div className="super-page">
      <div className="super-page-header">
        <div>
          <Title level={4} className="super-page-title">
            <TeamOutlined className="super-page-icon" /> User Management
          </Title>
          <Text type="secondary">Manage platform administrators and their access</Text>
        </div>
        <Space>
          <Button type="primary" icon={<PlusOutlined />}
            style={{ background: '#d4a853', borderColor: '#d4a853' }}
            onClick={() => setAddDrawerOpen(true)}>
            Add User
          </Button>
          <Input.Search
            placeholder="Search users by name or email..."
            onSearch={handleSearch}
            allowClear
            style={{ width: 240 }}
          />
          <Tooltip title="Reset">
            <Button icon={<ReloadOutlined />} onClick={handleReset} />
          </Tooltip>
        </Space>
      </div>


      <Card className="super-page-card" variant="borderless">
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

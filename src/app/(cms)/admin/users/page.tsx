'use client';

import { useState, useEffect, useCallback, useRef, useContext } from 'react';
import {
  Table, Card, Input, Button, Space, Typography,
  Tag, Tooltip, Row, Col, Avatar, Drawer, Popconfirm,
} from 'antd';
import type { ColumnsType, TablePaginationConfig } from 'antd/es/table';
import {
  PlusOutlined, EditOutlined, DeleteOutlined, SearchOutlined,
  ReloadOutlined, UserOutlined,
} from '@ant-design/icons';
import { UserContext } from '@/context/user';
import useFetch from '@/hooks/useFetch';
import { TFilterModel } from '@/types/config';
import { defaultFilterParams } from '@/utils/constants';
import { eResultCode, ePrivileges } from '@/utils/enum';
import Utils from '@/utils/index';
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
  const context = useContext(UserContext);
  const [data, setData] = useState<TUserRow[]>([]);
  const [totalRows, setTotalRows] = useState(0);
  const [loading, setLoading] = useState(false);
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

  const columns: ColumnsType<TUserRow> = [
    {
      title: 'Sr. No.', key: 'index', width: 80, align: 'center',
      render: (_: any, __: TUserRow, index: number) =>
        index + 1 + (filterParams.currentPage - 1) * filterParams.pageSize,
    },
    {
      title: 'Name', key: 'user', width: '25%',
      render: (_: any, record: TUserRow) => (
        <Space>
          <Avatar size="small" icon={<UserOutlined />} style={{ backgroundColor: 'var(--theme-primary)' }} />
          <Typography.Text strong>{record.userName}</Typography.Text>
        </Space>
      ),
    },
    {
      title: 'Email', dataIndex: 'emailId', key: 'emailId', width: '20%',
    },
    {
      title: 'Mobile', dataIndex: 'mobileNumber', key: 'mobileNumber', width: '15%',
      render: (mobile: string) => mobile || '-',
    },
    {
      title: 'Role', dataIndex: 'roleName', key: 'roleName', width: '15%',
      render: (role: string) => <Tag color="blue">{role || '-'}</Tag>,
    },
    {
      title: 'Action', key: 'action', width: 120, align: 'center', fixed: 'right',
      render: (_: any, record: TUserRow) => (
        <Space>
          {Utils.isUserHasAccess(context.privilegeList as any, ePrivileges.ADD_EDIT_USERS) && (
            <Tooltip title="Edit">
              <Button type="text" icon={<EditOutlined />} className="action-btn"
                onClick={() => setIsEditing({ enable: true, data: record })} />
            </Tooltip>
          )}
          {Utils.isUserHasAccess(context.privilegeList as any, ePrivileges.DELETE_USERS) && (
            <Popconfirm title="Delete this user?" onConfirm={() => handleDelete(record.id)} okText="Yes" cancelText="No">
              <Tooltip title="Delete">
                <Button type="text" danger icon={<DeleteOutlined />} className="action-btn" />
              </Tooltip>
            </Popconfirm>
          )}
        </Space>
      ),
    },
  ];

  return (
    <div className="user-list-container">
      <Card className="page-card" variant="borderless">
        <Row justify="space-between" align="middle" className="page-header">
          <Col>
            <Space>
              <UserOutlined className="page-icon" />
              <Title level={3} style={{ margin: 0 }}>Users Management</Title>
            </Space>
          </Col>
          <Col>
            {Utils.isUserHasAccess(context.privilegeList as any, ePrivileges.ADD_EDIT_USERS) && (
              <Button type="primary" icon={<PlusOutlined />} size="large" onClick={() => setAddDrawerOpen(true)}>
                Add User
              </Button>
            )}
          </Col>
        </Row>

        <Row gutter={[16, 16]} className="filter-section">
          <Col xs={24} sm={16} md={18}>
            <Search placeholder="Search by name or email..." value={filterParams.searchText}
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
            total: totalRows, showSizeChanger: true,
            showTotal: (total) => `Total ${total} users`,
            pageSizeOptions: ['10', '20', '50', '100'],
          }}
          onChange={handleTableChange} className="config-table" scroll={{ x: 900 }} />
      </Card>

      {addDrawerOpen && (
        <Drawer title="Add New User" placement="right"
          open={addDrawerOpen} onClose={() => setAddDrawerOpen(false)} closable destroyOnClose
          styles={{ wrapper: { width: 600 }, body: { padding: 24, height: '100%', overflow: 'hidden', display: 'flex', flexDirection: 'column' } }}>
          <UserForm id={0} onCloseDrawer={() => setAddDrawerOpen(false)} onRefreshList={fetchData} />
        </Drawer>
      )}

      {isEditing.enable && (
        <Drawer title="Edit User" placement="right"
          open={isEditing.enable} onClose={() => setIsEditing({ enable: false, data: null })} closable destroyOnClose
          styles={{ wrapper: { width: 600 }, body: { padding: 24, height: '100%', overflow: 'hidden', display: 'flex', flexDirection: 'column' } }}>
          <UserForm id={isEditing.data?.id ?? 0} onCloseDrawer={() => setIsEditing({ enable: false, data: null })} onRefreshList={fetchData} />
        </Drawer>
      )}
    </div>
  );
}

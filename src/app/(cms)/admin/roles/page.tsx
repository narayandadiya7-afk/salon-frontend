'use client';

import { useState, useEffect, useCallback, useRef } from 'react';
import {
  Table, Card, Input, Button, Space, Typography,
  Tooltip, Row, Col, Drawer, Popconfirm,
} from 'antd';
import type { ColumnsType, TablePaginationConfig } from 'antd/es/table';
import {
  PlusOutlined, EditOutlined, DeleteOutlined, SearchOutlined,
  ReloadOutlined, SafetyOutlined,
} from '@ant-design/icons';
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

  const columns: ColumnsType<TRoleRow> = [
    {
      title: 'Sr. No.', key: 'index', width: 80, align: 'center',
      render: (_: any, __: TRoleRow, index: number) =>
        index + 1 + (filterParams.currentPage - 1) * filterParams.pageSize,
    },
    {
      title: 'Role Name', dataIndex: 'name', key: 'name', width: '25%',
      render: (text: string) => (
        <Space>
          <SafetyOutlined style={{ color: 'var(--theme-primary)' }} />
          <Typography.Text strong>{text}</Typography.Text>
        </Space>
      ),
    },
    {
      title: 'Description', dataIndex: 'description', key: 'description', width: '35%',
      ellipsis: { showTitle: false },
      render: (text: string) => (
        <Tooltip placement="topLeft" title={text}><Text type="secondary">{text}</Text></Tooltip>
      ),
    },
    {
      title: 'Created On', dataIndex: 'createdAt', key: 'createdAt', width: '15%',
      render: (text: string) => text ? new Date(text).toLocaleDateString('en-GB', { day: 'numeric', month: 'short', year: 'numeric' }) : '-',
    },
    {
      title: 'Action', key: 'action', width: 120, align: 'center', fixed: 'right',
      render: (_: any, record: TRoleRow) => (
        <Space>
          <Tooltip title="Edit">
            <Button type="text" icon={<EditOutlined />} className="action-btn"
              onClick={() => setIsEditing({ enable: true, data: record })} />
          </Tooltip>
          <Popconfirm title="Delete this role?" onConfirm={() => handleDelete(record.id)} okText="Yes" cancelText="No">
            <Tooltip title="Delete">
              <Button type="text" danger icon={<DeleteOutlined />} className="action-btn" />
            </Tooltip>
          </Popconfirm>
        </Space>
      ),
    },
  ];

  return (
    <div className="role-list-container">
      <Card className="page-card" variant="borderless">
        <Row justify="space-between" align="middle" className="page-header">
          <Col>
            <Space>
              <SafetyOutlined className="page-icon" />
              <Title level={3} style={{ margin: 0 }}>Roles &amp; Permissions</Title>
            </Space>
          </Col>
          <Col>
            <Button type="primary" icon={<PlusOutlined />} size="large" onClick={() => setAddDrawerOpen(true)}>
              Add Role
            </Button>
          </Col>
        </Row>

        <Row gutter={[16, 16]} className="filter-section">
          <Col xs={24} sm={16} md={18}>
            <Search placeholder="Search by role name or description..." value={filterParams.searchText}
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
            showTotal: (total) => `Total ${total} roles`,
            pageSizeOptions: ['10', '20', '50', '100'],
          }}
          onChange={handleTableChange} className="config-table" scroll={{ x: 1000 }} />
      </Card>

      {addDrawerOpen && (
        <Drawer title="Add New Role" placement="right"
          open={addDrawerOpen} onClose={() => setAddDrawerOpen(false)} closable destroyOnClose
          styles={{ wrapper: { width: 600 }, body: { padding: 24, height: '100%', overflow: 'hidden', display: 'flex', flexDirection: 'column' } }}>
          <RoleForm id={0} onCloseDrawer={() => setAddDrawerOpen(false)} onRefreshList={fetchData} />
        </Drawer>
      )}

      {isEditing.enable && (
        <Drawer title="Edit Role" placement="right"
          open={isEditing.enable} onClose={() => setIsEditing({ enable: false, data: null })} closable destroyOnClose
          styles={{ wrapper: { width: 600 }, body: { padding: 24, height: '100%', overflow: 'hidden', display: 'flex', flexDirection: 'column' } }}>
          <RoleForm id={isEditing.data?.id ?? 0} onCloseDrawer={() => setIsEditing({ enable: false, data: null })} onRefreshList={fetchData} />
        </Drawer>
      )}
    </div>
  );
}

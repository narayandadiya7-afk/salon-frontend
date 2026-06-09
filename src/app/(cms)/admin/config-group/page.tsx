'use client';

import { useState, useEffect, useCallback, useContext, useRef } from 'react';
import {
  Table, Card, Input, Button, Space, Typography,
  Tooltip, Row, Col, Drawer, Popconfirm,
} from 'antd';
import type { ColumnsType, TablePaginationConfig } from 'antd/es/table';
import {
  PlusOutlined, EditOutlined, DeleteOutlined, SearchOutlined,
  ReloadOutlined, GroupOutlined,
} from '@ant-design/icons';
import { UserContext } from '@/context/user';
import useFetch from '@/hooks/useFetch';
import { TConfigGroup, TFilterModel } from '@/types/config';
import { defaultFilterParams } from '@/utils/constants';
import { eResultCode, ePrivileges } from '@/utils/enum';
import Utils from '@/utils/index';
import notification from '@/utils/notification';
import ConfigGroupForm from './form';
import { GetConfigGroupList, DeleteConfigGroup } from '@/utils/api.constant';

const { Title, Text } = Typography;
const { Search } = Input;

type TEditMode = { enable: boolean; data: TConfigGroup | null };

export default function ConfigGroupPage() {
  const { post } = useFetch();
  const context = useContext(UserContext);
  const [data, setData] = useState<TConfigGroup[]>([]);
  const [loading, setLoading] = useState(false);
  const [filterParams, setFilterParams] = useState<TFilterModel>({ ...defaultFilterParams });
  const filterParamsRef = useRef(filterParams);
  filterParamsRef.current = filterParams;
  const initialFetchDone = useRef(false);
  const [isEditing, setIsEditing] = useState<TEditMode>({ enable: false, data: null });
  const [addDrawerOpen, setAddDrawerOpen] = useState(false);

  const fetchData = useCallback(async (overrideParams?: Partial<TFilterModel>) => {
    setLoading(true);
    try {
      const params = { ...filterParamsRef.current, ...overrideParams };
      const response = await post(GetConfigGroupList, {
        data: { ...params },
      });
      const { dataResponse, data: rows, filterModel } = response;
      if (dataResponse?.returnCode === eResultCode.SUCCESS) {
        const normalized = (rows || []).map((r: any) => ({ ...r, name: r.name || r.groupName }));
        setData(normalized);
        if (filterModel) setFilterParams((prev) => ({ ...prev, ...filterModel }));
      }
    } catch {
      notification.error('Failed to load config groups');
    } finally {
      setLoading(false);
    }
  }, [post]);

  useEffect(() => {
    if (initialFetchDone.current) return;
    initialFetchDone.current = true;
    fetchData();
  }, [fetchData]);

  const handleSearch = (value: string) => {
    setFilterParams((prev) => ({ ...prev, searchText: value, currentPage: 1 }));
    fetchData({ searchText: value, currentPage: 1 });
  };
  const handleTableChange = (pagination: TablePaginationConfig) => {
    const newParams = { currentPage: pagination.current || 1, pageSize: pagination.pageSize || 10 };
    setFilterParams((prev) => ({ ...prev, ...newParams }));
    fetchData(newParams);
  };
  const handleReset = () => {
    setFilterParams({ ...defaultFilterParams });
    fetchData(defaultFilterParams);
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
          {Utils.isUserHasAccess(context.privilegeList as any, ePrivileges.ADD_EDIT_CONFIG_GROUP) && (
            <Tooltip title="Edit">
              <Button type="text" icon={<EditOutlined />} className="action-btn"
                onClick={() => setIsEditing({ enable: true, data: record })} />
            </Tooltip>
          )}
          {Utils.isUserHasAccess(context.privilegeList as any, ePrivileges.DELETE_CONFIG_GROUP) && (
            <Popconfirm title="Delete this group?" onConfirm={() => handleDelete(record.id)} okText="Yes" cancelText="No">
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
            {Utils.isUserHasAccess(context.privilegeList as any, ePrivileges.ADD_EDIT_CONFIG_GROUP) && (
              <Button type="primary" icon={<PlusOutlined />} size="large" onClick={() => setAddDrawerOpen(true)}>
                Add Group
              </Button>
            )}
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

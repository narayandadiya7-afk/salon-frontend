'use client';

import { useState, useEffect, useCallback, useContext, useRef } from 'react';
import {
  Table, Card, Input, Button, Space, Typography,
  Tag, Tooltip, Row, Col, Drawer, Popconfirm, Tabs,
} from 'antd';
import type { ColumnsType, TablePaginationConfig } from 'antd/es/table';
import {
  PlusOutlined, EditOutlined, DeleteOutlined, SearchOutlined,
  ReloadOutlined, UnorderedListOutlined,
} from '@ant-design/icons';
import { UserContext } from '@/context/user';
import useFetch from '@/hooks/useFetch';
import { TConfigParam, TFilterModel } from '@/types/config';
import { defaultFilterParams } from '@/utils/constants';
import { eResultCode, ePrivileges } from '@/utils/enum';
import Utils from '@/utils/index';
import notification from '@/utils/notification';
import ConfigParamForm from './form';
import { GetConfigParamList, DeleteConfigParam, GetConfigGroupList } from '@/utils/api.constant';

const { Title } = Typography;
const { Search } = Input;

type TEditMode = { enable: boolean; data: TConfigParam | null };

export default function ConfigParamPage() {
  const { post } = useFetch();
  const context = useContext(UserContext);
  const [data, setData] = useState<TConfigParam[]>([]);
  const [loading, setLoading] = useState(false);
  const [filterParams, setFilterParams] = useState<TFilterModel>({ ...defaultFilterParams });
  const filterParamsRef = useRef(filterParams);
  filterParamsRef.current = filterParams;
  const initialFetchDone = useRef(false);
  const [isEditing, setIsEditing] = useState<TEditMode>({ enable: false, data: null });
  const [addDrawerOpen, setAddDrawerOpen] = useState(false);
  const [groupOptions, setGroupOptions] = useState<{ id: number; name: string; groupUniqueId: string }[]>([]);
  const [activeGroup, setActiveGroup] = useState('');

  const fetchData = useCallback(async (overrideParams?: Partial<TFilterModel>) => {
    setLoading(true);
    try {
      const params = { ...filterParamsRef.current, ...overrideParams };
      const response = await post(GetConfigParamList, {
        data: { ...params },
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

  useEffect(() => {
    if (initialFetchDone.current) return;
    initialFetchDone.current = true;
    fetchData();
  }, [fetchData]);

  useEffect(() => {
    const fetchGroups = async () => {
      try {
        const response = await post(GetConfigGroupList, {
          data: { currentPage: 1, pageSize: -1, searchText: '', orderType: '' },
        });
        if (response?.dataResponse?.returnCode === eResultCode.SUCCESS) {
          setGroupOptions((response.data || []).map((g: any) => ({
            id: g.id,
            name: g.name || g.groupName,
            groupUniqueId: g.groupUniqueId,
          })));
        }
      } catch {
        // silently fail
      }
    };
    fetchGroups();
  }, [post]);

  const handleSearch = (value: string) => {
    setFilterParams((prev) => ({ ...prev, searchText: value, currentPage: 1 }));
    fetchData({ searchText: value, currentPage: 1 });
  };
  const handleTableChange = (pagination: TablePaginationConfig) => {
    const newParams = { currentPage: pagination.current || 1, pageSize: pagination.pageSize || 10 };
    setFilterParams((prev) => ({ ...prev, ...newParams }));
    fetchData(newParams);
  };
  const handleTabChange = (key: string) => {
    setActiveGroup(key);
    const newParams = { ...defaultFilterParams, groupUniqueId: key || undefined };
    setFilterParams(newParams);
    fetchData(newParams);
  };

  const handleReset = () => {
    setActiveGroup('');
    setFilterParams({ ...defaultFilterParams });
    fetchData(defaultFilterParams);
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

  const columns: ColumnsType<TConfigParam> = [
    {
      title: 'Sr. No.', key: 'index', width: 80, align: 'center',
      render: (_: any, __: TConfigParam, index: number) =>
        index + 1 + (filterParams.currentPage - 1) * filterParams.pageSize,
    },
    {
      title: 'Parameter Name', dataIndex: 'name', key: 'name', width: '20%',
      render: (text: string) => <Typography.Text strong>{text}</Typography.Text>,
    },
    { title: 'Description', dataIndex: 'description', key: 'description', width: '25%' },
    {
      title: 'Group', dataIndex: 'groupName', key: 'groupName', width: '20%',
      render: (text: string) => <Tag color="blue">{text}</Tag>,
    },
    {
      title: 'Action', key: 'action', width: 120, align: 'center', fixed: 'right',
      render: (_: any, record: TConfigParam) => (
        <Space>
          {Utils.isUserHasAccess(context.privilegeList as any, ePrivileges.ADD_EDIT_CONFIG_PARAM) && (
            <Tooltip title="Edit">
              <Button type="text" icon={<EditOutlined />} className="action-btn"
                onClick={() => setIsEditing({ enable: true, data: record })} />
            </Tooltip>
          )}
          {Utils.isUserHasAccess(context.privilegeList as any, ePrivileges.DELETE_CONFIG_PARAM) && (
            <Popconfirm title="Delete this parameter?" onConfirm={() => handleDelete(record.id)} okText="Yes" cancelText="No">
              <Tooltip title="Delete">
                <Button type="text" danger icon={<DeleteOutlined />} className="action-btn" />
              </Tooltip>
            </Popconfirm>
          )}
        </Space>
      ),
    },
  ];

  const prefilledGroup = activeGroup ? groupOptions.find((g) => g.groupUniqueId === activeGroup) : null;

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
            {Utils.isUserHasAccess(context.privilegeList as any, ePrivileges.ADD_EDIT_CONFIG_PARAM) && (
              <Button type="primary" icon={<PlusOutlined />} size="large" onClick={() => setAddDrawerOpen(true)}>
                Add Param
              </Button>
            )}
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

        <Tabs activeKey={activeGroup} onChange={handleTabChange}
          items={[
            { key: '', label: 'All Groups' },
            ...groupOptions.map((g) => ({ key: g.groupUniqueId || `group-${g.id}`, label: g.name })),
          ]}
          style={{ marginBottom: 8 }} />

        <Table columns={columns}
          dataSource={data} rowKey="id" loading={loading}
          pagination={{
            current: filterParams.currentPage, pageSize: filterParams.pageSize,
            total: filterParams.totalRows, showSizeChanger: true,
            showTotal: (total) => `Total ${total} items`,
            pageSizeOptions: ['10', '20', '50', '100'],
          }}
          onChange={handleTableChange} className="config-table" scroll={{ x: 800 }} />
      </Card>

      <Drawer title="Add Config Parameter" placement="right"
        styles={{ wrapper: { width: 520 }, body: { padding: 24, height: '100%', overflow: 'hidden', display: 'flex', flexDirection: 'column' } }}
        open={addDrawerOpen} onClose={() => setAddDrawerOpen(false)} closable destroyOnClose>
        <ConfigParamForm
          id={0}
          prefilledGroupId={prefilledGroup?.id}
          disableGroup={!!prefilledGroup}
          onCloseDrawer={() => setAddDrawerOpen(false)}
          onRefreshList={fetchData}
        />
      </Drawer>

      <Drawer title="Edit Config Parameter" placement="right"
        styles={{ wrapper: { width: 520 }, body: { padding: 24, height: '100%', overflow: 'hidden', display: 'flex', flexDirection: 'column' } }}
        open={isEditing.enable} onClose={() => setIsEditing({ enable: false, data: null })} closable destroyOnClose>
        {isEditing.data && (
          <ConfigParamForm
            id={isEditing.data.id}
            initialValues={isEditing.data}
            disableGroup
            onCloseDrawer={() => setIsEditing({ enable: false, data: null })}
            onRefreshList={fetchData}
          />
        )}
      </Drawer>
    </div>
  );
}

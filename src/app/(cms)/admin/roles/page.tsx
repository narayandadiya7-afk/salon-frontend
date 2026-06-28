'use client';

import { useState, useEffect, useCallback, useRef } from 'react';
import {
  Button, Space, Typography, Card,
  Tooltip, Popconfirm, Row, Col, Tag, Modal, Form, Input, Select, Switch, Checkbox, Divider,
} from 'antd';
import type { TablePaginationConfig } from 'antd/es/table';
import {
  PlusOutlined, EditOutlined, DeleteOutlined,
  SafetyCertificateOutlined, SaveOutlined, CloseOutlined,
} from '@ant-design/icons';
import DataTable from '@/components/super-admin/DataTable';
import StatusBadge from '@/components/super-admin/StatusBadge';
import useFetch from '@/hooks/useFetch';
import { TFilterModel } from '@/types/config';
import { defaultFilterParams } from '@/utils/constants';
import { eResultCode } from '@/utils/enum';
import notification from '@/utils/notification';
import { GetRolesList, DeleteRole, GetSpecificRole, AddEditRole, GetMenuHierarchy } from '@/utils/api.constant';
import './Roles.css';

const { Title, Text } = Typography;

interface TRoleRow {
  id: string; name: string; description: string;
  createdAt: string; isdeleted: number;
}

interface TPrivilege {
  privilegeUniqueId: string;
  name: string;
  id: string | number;
}

interface TMenuNode {
  menuUniqueId: string;
  dispName: string;
  privileges?: TPrivilege[];
  children?: TMenuNode[];
}

export default function RolesPage() {
  const { post } = useFetch();
  const [data, setData] = useState<TRoleRow[]>([]);
  const [totalRows, setTotalRows] = useState(0);
  const [loading, setLoading] = useState(true);
  const [filterParams, setFilterParams] = useState<TFilterModel>({ ...defaultFilterParams });
  const filterParamsRef = useRef(filterParams);
  filterParamsRef.current = filterParams;
  const [fetchTrigger, setFetchTrigger] = useState(0);
  const [editModal, setEditModal] = useState<{ open: boolean; data: TRoleRow | null }>({ open: false, data: null });
  const [createModal, setCreateModal] = useState(false);

  const [menuHierarchy, setMenuHierarchy] = useState<TMenuNode[]>([]);
  const [selectedRoleId, setSelectedRoleId] = useState<string | undefined>(undefined);
  const [selectedPrivileges, setSelectedPrivileges] = useState<TPrivilege[]>([]);
  const [matrixLoading, setMatrixLoading] = useState(false);
  const [roleForm] = Form.useForm();
  const [savingMatrix, setSavingMatrix] = useState(false);
  const [savingRole, setSavingRole] = useState(false);

  const fetchData = useCallback(async () => {
    setLoading(true);
    try {
      const response = await post(GetRolesList, { data: { ...filterParamsRef.current } });
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

  useEffect(() => {
    if (data.length > 0 && !selectedRoleId) {
      const sa = data.find(r => r.name?.toLowerCase() === 'super_admin');
      if (sa) setSelectedRoleId(sa.id);
    }
  }, [data, selectedRoleId]);

  useEffect(() => {
    const fetchMenu = async () => {
      try {
        const response = await post(GetMenuHierarchy, { data: { renderMenuRoleWise: false } });
        if (response?.dataResponse?.returnCode === eResultCode.SUCCESS) {
          setMenuHierarchy(response.data ?? []);
        }
      } catch { /* silent */ }
    };
    fetchMenu();
  }, []);

  useEffect(() => {
    if (!selectedRoleId) { setSelectedPrivileges([]); return; }
    const fetchPrivileges = async () => {
      setMatrixLoading(true);
      try {
        const response = await post(GetSpecificRole, { data: { id: selectedRoleId } });
        if (response?.dataResponse?.returnCode === eResultCode.SUCCESS) {
          const role = Array.isArray(response.data) ? response.data[0] : response.data;
          const privileges = (role.permissions ?? []).map((rp: any) => ({
            privilegeUniqueId: rp.permission.key,
            name: rp.permission.name,
            id: rp.permission.id,
          }));
          setSelectedPrivileges(privileges);
        }
      } catch {
        notification.error('Failed to load role permissions');
      } finally {
        setMatrixLoading(false);
      }
    };
    fetchPrivileges();
  }, [selectedRoleId]);

  const handleTableChange = (pagination: TablePaginationConfig) => {
    setFilterParams((prev) => ({ ...prev, currentPage: pagination.current || 1, pageSize: pagination.pageSize || 10 }));
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

  const checkedPrivilegeKeys = new Set(selectedPrivileges.map(p => p.privilegeUniqueId));

  const handlePrivilegeToggle = (privilege: TPrivilege, checked: boolean) => {
    if (checked) {
      setSelectedPrivileges(prev => [...prev, privilege]);
    } else {
      setSelectedPrivileges(prev => prev.filter(p => p.privilegeUniqueId !== privilege.privilegeUniqueId));
    }
  };

  const handleModuleToggle = (privileges: TPrivilege[], checked: boolean) => {
    if (checked) {
      setSelectedPrivileges(prev => {
        const existing = new Set(prev.map(p => p.privilegeUniqueId));
        return [...prev, ...privileges.filter(p => !existing.has(p.privilegeUniqueId))];
      });
    } else {
      const keys = new Set(privileges.map(p => p.privilegeUniqueId));
      setSelectedPrivileges(prev => prev.filter(p => !keys.has(p.privilegeUniqueId)));
    }
  };

  const handleSavePermissions = async () => {
    if (!selectedRoleId) return;
    setSavingMatrix(true);
    try {
      const response = await post(AddEditRole, { data: { id: selectedRoleId, rolePrivileges: selectedPrivileges.map(p => ({ id: p.id })) } });
      if (response?.dataResponse?.returnCode === eResultCode.SUCCESS) {
        notification.success('Permissions updated successfully');
        fetchData();
      } else {
        notification.error(response?.dataResponse?.description || 'Failed to update permissions');
      }
    } catch {
      notification.error('Failed to save permissions');
    } finally {
      setSavingMatrix(false);
    }
  };

  const handleResetPermissions = () => {
    if (selectedRoleId) {
      setSelectedRoleId(id => id); // re-trigger fetch via useEffect
      // trick to refetch
      setSelectedRoleId(undefined);
      setTimeout(() => setSelectedRoleId(selectedRoleId), 0);
    }
  };

  const handleCreateRole = async (values: any) => {
    setSavingRole(true);
    try {
      const response = await post(AddEditRole, { data: { ...values, rolePrivileges: [] } });
      if (response?.dataResponse?.returnCode === eResultCode.SUCCESS) {
        notification.success('Role created successfully');
        setCreateModal(false);
        roleForm.resetFields();
        fetchData();
      } else {
        notification.error(response?.dataResponse?.description || 'Failed to create role');
      }
    } catch {
      notification.error('Failed to create role');
    } finally {
      setSavingRole(false);
    }
  };

  const handleEditRole = async (values: any) => {
    if (!editModal.data) return;
    setSavingRole(true);
    try {
      const response = await post(AddEditRole, { data: { ...values, rolePrivileges: selectedPrivileges.map(p => ({ id: p.id })) } });
      if (response?.dataResponse?.returnCode === eResultCode.SUCCESS) {
        notification.success('Role updated successfully');
        setEditModal({ open: false, data: null });
        roleForm.resetFields();
        setSelectedRoleId(undefined);
        setSelectedPrivileges([]);
        fetchData();
      } else {
        notification.error(response?.dataResponse?.description || 'Failed to update role');
      }
    } catch {
      notification.error('Failed to update role');
    } finally {
      setSavingRole(false);
    }
  };

  const openEditModal = (record: TRoleRow) => {
    setEditModal({ open: true, data: record });
    setSelectedRoleId(record.id);
    roleForm.setFieldsValue({ id: record.id, name: record.name, description: record.description });
  };

  const openCreateModal = () => {
    setCreateModal(true);
    roleForm.resetFields();
    setSelectedPrivileges([]);
  };

  const getModulePrivileges = (node: TMenuNode): TPrivilege[] => {
    const result: TPrivilege[] = [];
    if (node.privileges) result.push(...node.privileges);
    if (node.children) for (const child of node.children) result.push(...getModulePrivileges(child));
    return result;
  };

  const columns = [
    { title: 'Role Name', dataIndex: 'name', key: 'name', render: (text: string) => (
      <Space><SafetyCertificateOutlined style={{ color: '#d4a853' }} /><Text strong>{text}</Text></Space>
    )},
    { title: 'Description', dataIndex: 'description', key: 'description' },
    { title: 'Status', key: 'status', render: (_: any, record: TRoleRow) => (
      <StatusBadge status={record.isdeleted === 1 ? 'suspended' : 'active'} />
    )},
    { title: 'Created', dataIndex: 'createdAt', key: 'createdAt', render: (text: string) => text ? new Date(text).toLocaleDateString('en-GB', { day: 'numeric', month: 'short', year: 'numeric' }) : '-' },
    { title: 'Actions', key: 'actions', width: 100, render: (_: any, record: TRoleRow) => (
      <Space size={4}>
        <Tooltip title="Edit"><Button type="link" size="small" icon={<EditOutlined />} className="super-action-btn" onClick={() => openEditModal(record)} /></Tooltip>
        <Popconfirm title="Delete this role?" onConfirm={() => handleDelete(record.id)} okText="Yes" cancelText="No">
          <Tooltip title="Delete"><Button type="link" size="small" icon={<DeleteOutlined />} className="super-action-btn" danger /></Tooltip>
        </Popconfirm>
      </Space>
    )},
  ];

  const renderPermissionModule = (node: TMenuNode) => {
    const modulePrivileges = getModulePrivileges(node);
    if (!modulePrivileges.length && !node.children) return null;
    const allChecked = modulePrivileges.every(p => checkedPrivilegeKeys.has(p.privilegeUniqueId));
    const someChecked = modulePrivileges.some(p => checkedPrivilegeKeys.has(p.privilegeUniqueId));

    return (
      <div key={node.menuUniqueId} className="roles-permission-module">
        <div className="roles-permission-module-header">
          <Text strong style={{ fontSize: 13 }}>{node.dispName}</Text>
          <Switch size="small" checked={allChecked}
            onChange={(checked) => handleModuleToggle(modulePrivileges, checked)} />
        </div>
        <div className="roles-permission-items">
          {modulePrivileges.map(priv => (
            <div key={priv.privilegeUniqueId} className="roles-permission-item">
              <Checkbox checked={checkedPrivilegeKeys.has(priv.privilegeUniqueId)}
                onChange={(e) => handlePrivilegeToggle(priv, e.target.checked)}>
                <Text style={{ fontSize: 13 }}>{priv.name}</Text>
              </Checkbox>
            </div>
          ))}
        </div>
      </div>
    );
  };

  return (
    <div className="super-page">
      <div className="super-page-header">
        <div>
          <Title level={4} className="super-page-title">
            <SafetyCertificateOutlined className="super-page-icon" /> Roles & Permissions
          </Title>
          <Text type="secondary">Define roles and configure granular permissions for platform administrators</Text>
        </div>
        <Button type="primary" icon={<PlusOutlined />}
          style={{ background: '#d4a853', borderColor: '#d4a853' }} onClick={openCreateModal}>
          Create Role
        </Button>
      </div>


      <Row gutter={[16, 16]}>
        <Col xs={24} lg={12}>
          <Card className="super-page-card" variant="borderless" title={<span className="card-title">Role Definitions</span>}>
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
              scroll={{ x: 600 }}
            />
          </Card>
        </Col>

        <Col xs={24} lg={12}>
          <Card className="super-page-card" variant="borderless" title={<span className="card-title">Permission Matrix</span>}>
            <div style={{ marginBottom: 16 }}>
              <Space direction="vertical" style={{ width: '100%' }}>
                <Text strong style={{ fontSize: 13, color: 'var(--theme-text)' }}>Select Role:</Text>
                <Select
                  value={selectedRoleId}
                  onChange={setSelectedRoleId}
                  style={{ width: '100%' }}
                  placeholder="Choose a role to manage permissions"
                  loading={matrixLoading}
                  options={data.map(r => ({ label: r.name, value: r.id }))}
                />
              </Space>
            </div>

            {selectedRoleId ? (
              <>
                <div className="roles-permission-tree">
                  {matrixLoading ? (
                    <Text type="secondary" style={{ display: 'block', textAlign: 'center', padding: 24 }}>Loading permissions...</Text>
                  ) : menuHierarchy.length === 0 ? (
                    <Text type="secondary" style={{ display: 'block', textAlign: 'center', padding: 24 }}>No permission modules available</Text>
                  ) : (
                    menuHierarchy.map(node => renderPermissionModule(node))
                  )}
                </div>
                <Divider />
                <div style={{ textAlign: 'right' }}>
                  <Space>
                    <Button onClick={() => { setSelectedRoleId(undefined); setSelectedPrivileges([]); }}>Reset</Button>
                    <Button type="primary" icon={<SaveOutlined />}
                      style={{ background: '#d4a853', borderColor: '#d4a853' }}
                      loading={savingMatrix} onClick={handleSavePermissions}>
                      Save Permissions
                    </Button>
                  </Space>
                </div>
              </>
            ) : (
              <Text type="secondary" style={{ display: 'block', textAlign: 'center', padding: 40 }}>
                Select a role from the dropdown above to manage its permissions
              </Text>
            )}
          </Card>
        </Col>
      </Row>

      <Modal title="Create New Role" open={createModal} onCancel={() => setCreateModal(false)} footer={null} width={520} destroyOnClose>
        <Form form={roleForm} layout="vertical" onFinish={handleCreateRole}>
          <Form.Item name="name" label="Role Name" rules={[{ required: true, message: 'Please enter role name' }]}>
            <Input placeholder="e.g., Support Manager" />
          </Form.Item>
          <Form.Item name="description" label="Description">
            <Input.TextArea placeholder="Describe the role's purpose and responsibilities" rows={3} />
          </Form.Item>
          <Form.Item>
            <Space>
              <Button onClick={() => setCreateModal(false)} icon={<CloseOutlined />}>Cancel</Button>
              <Button type="primary" htmlType="submit" icon={<SaveOutlined />}
                style={{ background: '#d4a853', borderColor: '#d4a853' }} loading={savingRole}>
                Create Role
              </Button>
            </Space>
          </Form.Item>
        </Form>
      </Modal>

      <Modal title="Edit Role" open={editModal.open} onCancel={() => { setEditModal({ open: false, data: null }); setSelectedRoleId(undefined); setSelectedPrivileges([]); }} footer={null} width={640} destroyOnClose>
        <Form form={roleForm} layout="vertical" onFinish={handleEditRole}>
          <Form.Item name="id" hidden><Input /></Form.Item>
          <Form.Item name="name" label="Role Name" rules={[{ required: true, message: 'Please enter role name' }]}>
            <Input placeholder="Enter role name" />
          </Form.Item>
          <Form.Item name="description" label="Description">
            <Input.TextArea placeholder="Enter description (optional)" rows={3} />
          </Form.Item>
          <Divider />
          <Text strong style={{ fontSize: 13, color: 'var(--theme-text)', display: 'block', marginBottom: 12 }}>Permissions</Text>
          <div className="roles-permission-tree" style={{ maxHeight: 360 }}>
            {menuHierarchy.map(node => renderPermissionModule(node))}
          </div>
          <Divider />
          <Form.Item>
            <Space>
              <Button onClick={() => { setEditModal({ open: false, data: null }); setSelectedRoleId(undefined); setSelectedPrivileges([]); }} icon={<CloseOutlined />}>Cancel</Button>
              <Button type="primary" htmlType="submit" icon={<SaveOutlined />}
                style={{ background: '#d4a853', borderColor: '#d4a853' }} loading={savingRole}>
                Update Role
              </Button>
            </Space>
          </Form.Item>
        </Form>
      </Modal>
    </div>
  );
}

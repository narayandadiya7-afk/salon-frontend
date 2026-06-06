'use client';

import { useState } from 'react';
import { Button, Form, Input, Row, Col } from 'antd';
import { SaveOutlined, CloseOutlined } from '@ant-design/icons';
import { TPrivilege, TRole } from '@/types/config';
import { notification } from '@/utils/notification';
import PrivilegeMapper from '@/components/privilege-mapper';

const menuHierarchy = [
  {
    id: 1, name: 'Dashboard', dispName: 'Dashboard', parentId: 0, parentUniqueId: '0',
    entityUrl: '/dashboard', menuIcon: '', isActive: 0, enableForOthers: 0, iconName: 'home',
    displayOrder: 1, menuUniqueId: 'DASHBOARD_1', orgId: 0,
    requestDateTime: '0001-01-01T00:00:00', requestSource: 0, isDeleted: 0,
    privileges: [{ id: 16, name: 'View Dashboard', groupId: 1, menuId: 0, privilegeUniqueId: 'VIEWDASHBOARD', menuUniqueId: 'DASHBOARD_1' }],
  },
  {
    id: 2, name: 'Users', dispName: 'Users', parentId: 0, parentUniqueId: '0',
    entityUrl: '/users', menuIcon: '', isActive: 0, enableForOthers: 0, iconName: 'users',
    displayOrder: 2, menuUniqueId: 'USER_2', orgId: 0,
    requestDateTime: '0001-01-01T00:00:00', requestSource: 0, isDeleted: 0,
    privileges: [
      { id: 1, name: 'Add User', groupId: 1, menuId: 0, privilegeUniqueId: 'ADDUSER', menuUniqueId: 'USER_2' },
      { id: 2, name: 'Edit User', groupId: 1, menuId: 0, privilegeUniqueId: 'EDITUSER', menuUniqueId: 'USER_2' },
      { id: 3, name: 'Delete User', groupId: 1, menuId: 0, privilegeUniqueId: 'DELETEUSER', menuUniqueId: 'USER_2' },
      { id: 4, name: 'View User', groupId: 1, menuId: 0, privilegeUniqueId: 'VIEWUSER', menuUniqueId: 'USER_2' },
    ],
  },
  {
    id: 3, name: 'Roles', dispName: 'Roles', parentId: 0, parentUniqueId: '0',
    entityUrl: '/roles', menuIcon: '', isActive: 0, enableForOthers: 0, iconName: 'shield',
    displayOrder: 3, menuUniqueId: 'ROLE_3', orgId: 0,
    requestDateTime: '0001-01-01T00:00:00', requestSource: 0, isDeleted: 0,
    privileges: [
      { id: 5, name: 'Add Role', groupId: 1, menuId: 0, privilegeUniqueId: 'ADDROLE', menuUniqueId: 'ROLE_3' },
      { id: 6, name: 'Edit Role', groupId: 1, menuId: 0, privilegeUniqueId: 'EDITROLE', menuUniqueId: 'ROLE_3' },
      { id: 7, name: 'Delete Role', groupId: 1, menuId: 0, privilegeUniqueId: 'DELETEROLE', menuUniqueId: 'ROLE_3' },
      { id: 8, name: 'View Role', groupId: 1, menuId: 0, privilegeUniqueId: 'VIEWROLE', menuUniqueId: 'ROLE_3' },
    ],
  },
  {
    id: 4, name: 'Config Group', dispName: 'Config Group', parentId: 0, parentUniqueId: '0',
    entityUrl: '/config-group', menuIcon: '', isActive: 0, enableForOthers: 0, iconName: 'cog',
    displayOrder: 4, menuUniqueId: 'CONFIG_GROUP_4', orgId: 0,
    requestDateTime: '0001-01-01T00:00:00', requestSource: 0, isDeleted: 0,
    privileges: [
      { id: 9, name: 'Add Config Group', groupId: 1, menuId: 0, privilegeUniqueId: 'ADDCONFIGGROUP', menuUniqueId: 'CONFIG_GROUP_4' },
      { id: 10, name: 'Edit Config Group', groupId: 1, menuId: 0, privilegeUniqueId: 'EDITCONFIGGROUP', menuUniqueId: 'CONFIG_GROUP_4' },
      { id: 11, name: 'Delete Config Group', groupId: 1, menuId: 0, privilegeUniqueId: 'DELETECONFIGGROUP', menuUniqueId: 'CONFIG_GROUP_4' },
    ],
  },
  {
    id: 5, name: 'Config Param', dispName: 'Config Param', parentId: 0, parentUniqueId: '0',
    entityUrl: '/config-param', menuIcon: '', isActive: 0, enableForOthers: 0, iconName: 'sliders',
    displayOrder: 5, menuUniqueId: 'CONFIG_PARAM_5', orgId: 0,
    requestDateTime: '0001-01-01T00:00:00', requestSource: 0, isDeleted: 0,
    privileges: [
      { id: 13, name: 'Add Config Param', groupId: 1, menuId: 0, privilegeUniqueId: 'ADDCONFIGPARAM', menuUniqueId: 'CONFIG_PARAM_5' },
      { id: 14, name: 'Edit Config Param', groupId: 1, menuId: 0, privilegeUniqueId: 'EDITCONFIGPARAM', menuUniqueId: 'CONFIG_PARAM_5' },
      { id: 15, name: 'Delete Config Param', groupId: 1, menuId: 0, privilegeUniqueId: 'DELETECONFIGPARAM', menuUniqueId: 'CONFIG_PARAM_5' },
    ],
  },
];

const defaultPrivileges = [
  { id: 1, name: 'Add User', groupId: 1, menuId: 0, privilegeUniqueId: 'ADDUSER', menuUniqueId: 'USER_2' },
  { id: 2, name: 'Edit User', groupId: 1, menuId: 0, privilegeUniqueId: 'EDITUSER', menuUniqueId: 'USER_2' },
];

type DrawerProps = {
  id: number;
  onCloseDrawer: () => void;
  onRefreshList: () => void;
  initialValues?: TRole;
};

const defaultValues: TRole = { id: 0, name: '', description: '', roleUniqueId: '' };

export default function RoleForm(props: DrawerProps) {
  const [form] = Form.useForm();
  const [isLoading, setIsLoading] = useState(false);

  if (props.initialValues && props.id > 0) {
    form.setFieldsValue(props.initialValues);
  }

  const handlePrivilegesChange = (checkedPrivileges: TPrivilege[]) => {
    console.log('Checked privileges:', checkedPrivileges);
  };

  const onFinish = async (values: TRole) => {
    try {
      setIsLoading(true);
      notification.success('Role saved successfully');
      props.onRefreshList();
      props.onCloseDrawer();
    } catch {
      notification.error('Failed to save role');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div style={{ height: '100%', display: 'flex', flexDirection: 'column', overflow: 'hidden' }}>
      <Form
        form={form}
        name="roleForm"
        onFinish={onFinish}
        initialValues={props.initialValues || defaultValues}
        layout="vertical"
        style={{ flex: 1, display: 'flex', flexDirection: 'column', height: '100%', overflow: 'hidden' }}
      >
        <div style={{ flex: 1, overflowY: 'auto', overflowX: 'hidden', paddingRight: 4, marginBottom: 16 }}>
          <Row gutter={[16, 0]}>
            <Col xs={24} md={12}>
              <Form.Item
                name="name"
                label="Role Name"
                rules={[{ required: true, message: 'Please enter role name' }]}
              >
                <Input placeholder="Enter role name" />
              </Form.Item>
            </Col>
            <Col xs={24} md={12}>
              <Form.Item
                name="roleUniqueId"
                label="Role Unique ID"
                rules={[{ required: true, message: 'Please enter role unique ID' }]}
              >
                <Input placeholder="Enter unique ID" />
              </Form.Item>
            </Col>
          </Row>

          <Row gutter={[16, 0]}>
            <Col span={24}>
              <Form.Item name="description" label="Description">
                <Input.TextArea rows={3} placeholder="Enter description (optional)" />
              </Form.Item>
            </Col>
          </Row>

          <PrivilegeMapper
            menuHierarchy={menuHierarchy}
            preSelectedPrivileges={defaultPrivileges}
            onPrivilegesChange={handlePrivilegesChange}
          />
        </div>

        <div style={{
          borderTop: '1px solid var(--theme-border-light)',
          paddingTop: 16,
          marginTop: 16,
          display: 'flex',
          justifyContent: 'flex-end',
          gap: 8,
          flexShrink: 0,
        }}>
          <Button icon={<CloseOutlined />} onClick={props.onCloseDrawer} disabled={isLoading}>
            Cancel
          </Button>
          <Button type="primary" htmlType="submit" icon={<SaveOutlined />} loading={isLoading}>
            Save
          </Button>
        </div>
      </Form>
    </div>
  );
}

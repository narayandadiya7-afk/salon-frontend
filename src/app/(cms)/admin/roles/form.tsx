'use client';

import { useEffect, useState, useRef } from 'react';
import { Button, Form, Input, Row, Col } from 'antd';
import { SaveOutlined, CloseOutlined } from '@ant-design/icons';
import useFetch from '@/hooks/useFetch';
import { eResultCode } from '@/utils/enum';
import notification from '@/utils/notification';
import PrivilegeMapper from '@/components/privilege-mapper';
import { AddEditRole, GetSpecificRole, GetMenuHierarchy } from '@/utils/api.constant';

type DrawerProps = {
  id: string | number;
  onCloseDrawer: () => void;
  onRefreshList: () => void;
};

export default function RoleForm(props: DrawerProps) {
  const [form] = Form.useForm();
  const [isLoading, setIsLoading] = useState(false);
  const [selectedPrivileges, setSelectedPrivileges] = useState<any[]>([]);
  const [menuHierarchy, setMenuHierarchy] = useState<any[]>([]);
  const { post } = useFetch();
  const isEdit = !!props.id;
  const effectRan = useRef(false);

  useEffect(() => {
    if (effectRan.current) return;
    fetchMenuHierarchy();
    if (isEdit) fetchSpecificRole();
    return () => { effectRan.current = true; };
  }, [props.id]);

  const fetchMenuHierarchy = async () => {
    try {
      const response = await post(GetMenuHierarchy, { data: { renderMenuRoleWise: false } });
      if (response?.dataResponse?.returnCode === eResultCode.SUCCESS) {
        setMenuHierarchy(response.data ?? []);
      }
    } catch (error) {
      console.error('Error fetching menu hierarchy:', error);
    }
  };

  const fetchSpecificRole = async () => {
    try {
      setIsLoading(true);
      const response = await post(GetSpecificRole, { data: { id: props.id } });
      if (response.dataResponse.returnCode === eResultCode.SUCCESS) {
        const role = Array.isArray(response.data) ? response.data[0] : response.data;
        form.setFieldsValue({
          id: role.id,
          name: role.name,
          description: role.description,
        });
        const privileges = (role.permissions ?? []).map((rp: any) => ({
          privilegeUniqueId: rp.permission.key,
          name: rp.permission.name,
          id: rp.permission.id,
        }));
        if (privileges.length) {
          setSelectedPrivileges(privileges);
        }
      } else {
        notification.error(response.dataResponse.description);
      }
    } catch (error) {
      console.error('Error fetching role:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const handlePrivilegesChange = (checkedPrivileges: any[]) => {
    setSelectedPrivileges(checkedPrivileges);
  };

  const onFinish = async (values: any) => {
    try {
      setIsLoading(true);
      const payload = {
        data: {
          ...values,
          rolePrivileges: selectedPrivileges.map((p: any) => ({ id: p.id })),
        },
      };
      const response = await post(AddEditRole, payload);
      if (response.dataResponse.returnCode === eResultCode.SUCCESS) {
        notification.success(response.dataResponse.description);
        props.onRefreshList();
        props.onCloseDrawer();
      } else {
        notification.error(response.dataResponse.description);
      }
    } catch (error) {
      console.error('Error saving role:', error);
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
        initialValues={{ id: 0, name: '', description: '' }}
        layout="vertical"
        style={{ flex: 1, display: 'flex', flexDirection: 'column', height: '100%', overflow: 'hidden' }}
      >
        <div style={{ flex: 1, overflowY: 'auto', overflowX: 'hidden', paddingRight: 4, marginBottom: 16 }}>
          <Form.Item name="id" hidden>
            <Input />
          </Form.Item>

          <Row gutter={[16, 0]}>
            <Col xs={24}>
              <Form.Item
                name="name"
                label={<span style={{ color: 'var(--theme-text)' }}>Role Name</span>}
                rules={[{ required: true, message: 'Please enter role name' }]}
              >
                <Input placeholder="Enter role name" />
              </Form.Item>
            </Col>
          </Row>

          <Row gutter={[16, 0]}>
            <Col span={24}>
              <Form.Item name="description" label={<span style={{ color: 'var(--theme-text)' }}>Description</span>}>
                <Input.TextArea rows={3} placeholder="Enter description (optional)" />
              </Form.Item>
            </Col>
          </Row>

          <PrivilegeMapper
            menuHierarchy={menuHierarchy}
            preSelectedPrivileges={selectedPrivileges}
            onPrivilegesChange={handlePrivilegesChange}
          />
        </div>

        <div style={{ borderTop: '1px solid var(--theme-border)', paddingTop: 16, display: 'flex', justifyContent: 'flex-end', gap: 8, flexShrink: 0 }}>
          <Button icon={<CloseOutlined />} onClick={props.onCloseDrawer} disabled={isLoading}>
            Cancel
          </Button>
          <Button type="primary" htmlType="submit" icon={<SaveOutlined />} loading={isLoading}
            style={{ background: '#d4a853', borderColor: '#d4a853' }}>
            {isEdit ? 'Update' : 'Save'}
          </Button>
        </div>
      </Form>
    </div>
  );
}

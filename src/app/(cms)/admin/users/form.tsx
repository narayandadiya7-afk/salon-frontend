'use client';

import { useEffect, useState, useRef } from 'react';
import { Button, Form, Input, Select, Row, Col } from 'antd';
import { SaveOutlined, CloseOutlined } from '@ant-design/icons';
import useFetch from '@/hooks/useFetch';
import { eResultCode } from '@/utils/enum';
import notification from '@/utils/notification';
import EncryptUtils from '@/utils/encrypt';
import { AddEditUser, GetSpecificUser, GetRolesList } from '@/utils/api.constant';

type DrawerProps = {
  id: string | number;
  onCloseDrawer: () => void;
  onRefreshList: () => void;
};

export default function UserForm(props: DrawerProps) {
  const [form] = Form.useForm();
  const [isLoading, setIsLoading] = useState(false);
  const [roleOptions, setRoleOptions] = useState<{ label: string; value: string }[]>([]);
  const [rolesLoading, setRolesLoading] = useState(false);
  const { post } = useFetch();
  const isEdit = !!props.id;
  const effectRan = useRef(false);

  useEffect(() => {
    if (effectRan.current) return;
    fetchRoles();
    if (isEdit) fetchSpecificUser();
    return () => { effectRan.current = true; };
  }, [props.id]);

  const fetchRoles = async () => {
    try {
      setRolesLoading(true);
      const response = await post(GetRolesList, {
        data: { currentPage: 1, pageSize: 100, searchText: '' },
      });
      if (response.dataResponse.returnCode === eResultCode.SUCCESS) {
        const options = (response.data as { id: string; name: string }[]).map(
          (r) => ({ label: r.name, value: r.id })
        );
        setRoleOptions(options);
      }
    } catch (error) {
      console.error('Error fetching roles:', error);
    } finally {
      setRolesLoading(false);
    }
  };

  const fetchSpecificUser = async () => {
    try {
      setIsLoading(true);
      const response = await post(GetSpecificUser, { data: { id: props.id } });
      const { dataResponse, data } = response;
      if (dataResponse.returnCode === eResultCode.SUCCESS) {
        const user = Array.isArray(data) ? data[0] : data;
        form.setFieldsValue({
          fullName: user.name,
          emailId: user.email,
          mobileNumber: user.phone,
          roleId: user.roleId,
        });
      } else {
        notification.error(dataResponse.description);
      }
    } catch (error) {
      console.error('Error fetching user:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const onFinish = async (values: any) => {
    try {
      setIsLoading(true);
      const payload = {
        data: {
          id: props.id ?? 0,
          fullName: values.fullName,
          roleId: values.roleId,
          emailId: values.emailId,
          mobileNumber: values.mobileNumber,
          ...(values.password ? { password: EncryptUtils.encrypt(values.password) } : {}),
        },
      };
      const response = await post(AddEditUser, payload);
      const { dataResponse } = response;
      if (dataResponse.returnCode === eResultCode.SUCCESS) {
        notification.success(dataResponse.description || 'User saved successfully');
        props.onRefreshList();
        props.onCloseDrawer();
      } else {
        notification.error(dataResponse.description);
      }
    } catch (error) {
      console.error('Error saving user:', error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div style={{ height: '100%', display: 'flex', flexDirection: 'column', overflow: 'hidden' }}>
      <Form
        form={form}
        name="userForm"
        onFinish={onFinish}
        layout="vertical"
        style={{ flex: 1, display: 'flex', flexDirection: 'column', height: '100%', overflow: 'hidden' }}
      >
        <div style={{ flex: 1, overflowY: 'auto', overflowX: 'hidden', paddingRight: 4, marginBottom: 16 }}>
          <Row gutter={[16, 0]}>
            <Col xs={24} md={12}>
              <Form.Item
                name="fullName"
                label={<span style={{ color: 'var(--theme-text)' }}>Name</span>}
                rules={[{ required: true, message: 'Please enter full name' }]}
              >
                <Input placeholder="Enter full name" />
              </Form.Item>
            </Col>
            <Col xs={24} md={12}>
              <Form.Item
                name="emailId"
                label={<span style={{ color: 'var(--theme-text)' }}>Email</span>}
                rules={[
                  { required: true, message: 'Please enter email' },
                  { type: 'email', message: 'Please enter a valid email' },
                ]}
              >
                <Input placeholder="Enter email" />
              </Form.Item>
            </Col>
          </Row>

          <Row gutter={[16, 0]}>
            <Col xs={24} md={12}>
              <Form.Item
                name="roleId"
                label={<span style={{ color: 'var(--theme-text)' }}>Role</span>}
                rules={[{ required: true, message: 'Please select a role' }]}
              >
                <Select placeholder="Select role" options={roleOptions} loading={rolesLoading} />
              </Form.Item>
            </Col>
            <Col xs={24} md={12}>
              <Form.Item
                name="mobileNumber"
                label={<span style={{ color: 'var(--theme-text)' }}>Mobile</span>}
                rules={[{ required: true, message: 'Please enter mobile number' }]}
              >
                <Input placeholder="Enter mobile number" maxLength={15} />
              </Form.Item>
            </Col>
          </Row>

          <Row gutter={[16, 0]}>
            <Col xs={24}>
              <Form.Item
                name="password"
                label={<span style={{ color: 'var(--theme-text)' }}>{isEdit ? 'New Password (leave blank to keep current)' : 'Password'}</span>}
                rules={[
                  ...(!isEdit ? [{ required: true, message: 'Please enter password' }] : []),
                  { min: 6, message: 'Password must be at least 6 characters' },
                ]}
              >
                <Input.Password placeholder={isEdit ? 'Enter new password (optional)' : 'Enter password'} />
              </Form.Item>
            </Col>
          </Row>
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

'use client';

import { useState } from 'react';
import { Button, Form, Input, Select, Row, Col } from 'antd';
import { SaveOutlined, CloseOutlined } from '@ant-design/icons';
import { TUser } from '@/types/config';
import { notification } from '@/utils/notification';

const roleOptions = [
  { label: 'Admin', value: 1 },
  { label: 'User', value: 2 },
  { label: 'Guest', value: 3 },
];

type DrawerProps = {
  id: number;
  onCloseDrawer: () => void;
  onRefreshList: () => void;
  initialValues?: TUser;
};

const defaultValues: TUser = {
  id: 0, userName: '', displayName: '', emailId: '',
  mobileNo: '', password: '', roles: [],
};

export default function UserForm(props: DrawerProps) {
  const [form] = Form.useForm();
  const [isLoading, setIsLoading] = useState(false);

  if (props.initialValues && props.id > 0) {
    form.setFieldsValue(props.initialValues);
  }

  const onFinish = async (values: TUser) => {
    try {
      setIsLoading(true);
      notification.success('User saved successfully');
      props.onRefreshList();
      props.onCloseDrawer();
    } catch {
      notification.error('Failed to save user');
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
        initialValues={props.initialValues || defaultValues}
        layout="vertical"
        style={{ flex: 1, display: 'flex', flexDirection: 'column', height: '100%', overflow: 'hidden' }}
      >
        <div style={{ flex: 1, overflowY: 'auto', overflowX: 'hidden', paddingRight: 4, marginBottom: 16 }}>
          <Row gutter={[16, 0]}>
            <Col xs={24} md={12}>
              <Form.Item
                name="userName"
                label="Username"
                rules={[{ required: true, message: 'Please enter username' }]}
              >
                <Input placeholder="Enter username" />
              </Form.Item>
            </Col>
            <Col xs={24} md={12}>
              <Form.Item
                name="displayName"
                label="Display Name"
                rules={[{ required: true, message: 'Please enter display name' }]}
              >
                <Input placeholder="Enter display name" />
              </Form.Item>
            </Col>
          </Row>

          <Row gutter={[16, 0]}>
            <Col xs={24} md={12}>
              <Form.Item
                name="emailId"
                label="E-mail"
                rules={[
                  { required: true, message: 'Please enter email' },
                  { type: 'email', message: 'Please enter valid email' },
                ]}
              >
                <Input placeholder="Enter email" />
              </Form.Item>
            </Col>
            <Col xs={24} md={12}>
              <Form.Item
                name="mobileNo"
                label="Phone Number"
                rules={[{ required: true, message: 'Please enter phone number' }]}
              >
                <Input placeholder="Enter phone number" />
              </Form.Item>
            </Col>
          </Row>

          <Row gutter={[16, 0]}>
            <Col span={24}>
              <Form.Item
                name="roleId"
                label="Role"
                rules={[{ required: true, message: 'Please select a role' }]}
              >
                <Select placeholder="Select role" options={roleOptions} />
              </Form.Item>
            </Col>
          </Row>
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

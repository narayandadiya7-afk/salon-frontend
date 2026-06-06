'use client';

import { useState } from 'react';
import { Button, Form, Input, Row, Col } from 'antd';
import { SaveOutlined, CloseOutlined } from '@ant-design/icons';
import { TConfigGroup } from '@/types/config';
import { notification } from '@/utils/notification';

type DrawerProps = {
  id: number;
  onCloseDrawer: () => void;
  onRefreshList: () => void;
  initialValues?: TConfigGroup;
};

const defaultValues: TConfigGroup = { id: 0, name: '', description: '', groupUniqueId: '' };

export default function ConfigGroupForm(props: DrawerProps) {
  const [form] = Form.useForm();
  const [isLoading, setIsLoading] = useState(false);

  if (props.initialValues && props.id > 0) {
    form.setFieldsValue(props.initialValues);
  }

  const onFinish = async (values: TConfigGroup) => {
    try {
      setIsLoading(true);
      notification.success('Config group saved successfully');
      props.onRefreshList();
      props.onCloseDrawer();
    } catch {
      notification.error('Failed to save config group');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div style={{ height: '100%', display: 'flex', flexDirection: 'column', overflow: 'hidden' }}>
      <Form
        form={form}
        name="configGroupForm"
        onFinish={onFinish}
        initialValues={props.initialValues || defaultValues}
        layout="vertical"
        style={{ flex: 1, display: 'flex', flexDirection: 'column', height: '100%', overflow: 'hidden' }}
      >
        {/* Scrollable content area */}
        <div style={{ flex: 1, overflowY: 'auto', overflowX: 'hidden', paddingRight: 4, marginBottom: 16 }}>
          <Row gutter={[16, 0]}>
            <Col xs={24} md={12}>
              <Form.Item
                name="name"
                label="Group Name"
                rules={[{ required: true, message: 'Please enter group name' }]}
              >
                <Input placeholder="Enter group name" />
              </Form.Item>
            </Col>
            <Col xs={24} md={12}>
              <Form.Item
                name="groupUniqueId"
                label="Group Unique ID"
                rules={[{ required: true, message: 'Please enter group unique ID' }]}
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
        </div>

        {/* Sticky footer */}
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

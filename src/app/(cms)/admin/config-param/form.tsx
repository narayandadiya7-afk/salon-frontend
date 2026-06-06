'use client';

import { useState } from 'react';
import { Button, Form, Input, Select, Row, Col } from 'antd';
import { SaveOutlined, CloseOutlined } from '@ant-design/icons';
import { TConfigParam } from '@/types/config';
import { notification } from '@/utils/notification';

const groupOptions = [
  { label: 'UOM', value: 1 },
  { label: 'ActionOwner', value: 2 },
  { label: 'Security', value: 3 },
  { label: 'UI', value: 4 },
];

type DrawerProps = {
  id: number;
  onCloseDrawer: () => void;
  onRefreshList: () => void;
  initialValues?: TConfigParam;
};

const defaultValues: TConfigParam = {
  id: 0, name: '', description: '', groupName: '',
  groupId: null, groupUniqueId: '', paramUniqueId: '',
};

export default function ConfigParamForm(props: DrawerProps) {
  const [form] = Form.useForm();
  const [isLoading, setIsLoading] = useState(false);

  if (props.initialValues && props.id > 0) {
    form.setFieldsValue(props.initialValues);
  }

  const onFinish = async (values: TConfigParam) => {
    try {
      setIsLoading(true);
      notification.success('Config parameter saved successfully');
      props.onRefreshList();
      props.onCloseDrawer();
    } catch {
      notification.error('Failed to save config parameter');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div style={{ height: '100%', display: 'flex', flexDirection: 'column', overflow: 'hidden' }}>
      <Form
        form={form}
        name="configParamForm"
        onFinish={onFinish}
        initialValues={props.initialValues || defaultValues}
        layout="vertical"
        style={{ flex: 1, display: 'flex', flexDirection: 'column', height: '100%', overflow: 'hidden' }}
      >
        <div style={{ flex: 1, overflowY: 'auto', overflowX: 'hidden', paddingRight: 4, marginBottom: 16 }}>
          <Row gutter={[16, 16]}>
            <Col xs={24} md={12}>
              <Form.Item
                name="groupId"
                label="Config Group"
                rules={[{ required: true, message: 'Please select config group' }]}
              >
                <Select placeholder="Select config group" options={groupOptions} />
              </Form.Item>
            </Col>
            <Col xs={24} md={12}>
              <Form.Item
                name="paramUniqueId"
                label="Param Unique ID"
                rules={[{ required: true, message: 'Please enter param unique ID' }]}
              >
                <Input placeholder="Enter unique ID" />
              </Form.Item>
            </Col>
          </Row>

          <Row gutter={[16, 16]}>
            <Col xs={24}>
              <Form.Item
                name="name"
                label="Parameter Name"
                rules={[{ required: true, message: 'Please enter parameter name' }]}
              >
                <Input placeholder="Enter parameter name" />
              </Form.Item>
            </Col>
          </Row>

          <Row gutter={[16, 16]}>
            <Col xs={24}>
              <Form.Item name="description" label="Description">
                <Input.TextArea placeholder="Enter description (optional)" />
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

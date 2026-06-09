'use client';

import { useState, useEffect } from 'react';
import { Button, Form, Input, Row, Col } from 'antd';
import { SaveOutlined, CloseOutlined } from '@ant-design/icons';
import useFetch from '@/hooks/useFetch';
import { eResultCode } from '@/utils/enum';
import notification from '@/utils/notification';
import { AddEditConfigGroup, GetSpecificConfigGroup } from '@/utils/api.constant';

type DrawerProps = {
  id: number;
  onCloseDrawer: () => void;
  onRefreshList: () => void;
  initialValues?: any;
};

export default function ConfigGroupForm(props: DrawerProps) {
  const { post } = useFetch();
  const [form] = Form.useForm();
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    if (props.id > 0) {
      const fetchGroup = async () => {
        try {
          const response = await post(GetSpecificConfigGroup, { data: { id: props.id } });
          if (response?.dataResponse?.returnCode === eResultCode.SUCCESS && response.data) {
            form.setFieldsValue({
              name: response.data.name || response.data.groupName,
              description: response.data.description,
            });
          }
        } catch {
          // silently fail
        }
      };
      fetchGroup();
    }
  }, [props.id, post, form]);

  const onFinish = async (values: any) => {
    try {
      setIsLoading(true);
      const payload = {
        data: {
          id: props.id > 0 ? props.id : 0,
          name: values.name,
          description: values.description || '',
        },
      };
      const response = await post(AddEditConfigGroup, payload);
      if (response?.dataResponse?.returnCode === eResultCode.SUCCESS) {
        notification.success('Config group saved successfully');
        props.onRefreshList();
        props.onCloseDrawer();
      } else {
        notification.error(response?.dataResponse?.description || 'Failed to save config group');
      }
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
        initialValues={props.initialValues || { id: 0, name: '', description: '' }}
        layout="vertical"
        style={{ flex: 1, display: 'flex', flexDirection: 'column', height: '100%', overflow: 'hidden' }}
      >
        <div style={{ flex: 1, overflowY: 'auto', overflowX: 'hidden', paddingRight: 4, marginBottom: 16 }}>
          <Form.Item name="name" label="Group Name" rules={[{ required: true, message: 'Please enter group name' }]}>
            <Input placeholder="Enter group name" />
          </Form.Item>
          <Row gutter={[16, 0]}>
            <Col span={24}>
              <Form.Item name="description" label="Description">
                <Input.TextArea rows={3} placeholder="Enter description (optional)" />
              </Form.Item>
            </Col>
          </Row>
        </div>
        <div style={{ borderTop: '1px solid var(--theme-border-light)', paddingTop: 16, marginTop: 16, display: 'flex', justifyContent: 'flex-end', gap: 8, flexShrink: 0 }}>
          <Button icon={<CloseOutlined />} onClick={props.onCloseDrawer} disabled={isLoading}>Cancel</Button>
          <Button type="primary" htmlType="submit" icon={<SaveOutlined />} loading={isLoading}>Save</Button>
        </div>
      </Form>
    </div>
  );
}

'use client';

import { useState, useEffect } from 'react';
import { Button, Form, Input, Select, Row, Col } from 'antd';
import { SaveOutlined, CloseOutlined } from '@ant-design/icons';
import useFetch from '@/hooks/useFetch';
import { eResultCode } from '@/utils/enum';
import notification from '@/utils/notification';
import { AddEditConfigParam, GetSpecificConfigParam, GetConfigGroupList } from '@/utils/api.constant';

type DrawerProps = {
  id: number;
  onCloseDrawer: () => void;
  onRefreshList: () => void;
  initialValues?: any;
};

export default function ConfigParamForm(props: DrawerProps) {
  const { post } = useFetch();
  const [form] = Form.useForm();
  const [isLoading, setIsLoading] = useState(false);
  const [groupOptions, setGroupOptions] = useState<{ label: string; value: number }[]>([]);

  useEffect(() => {
    const fetchGroups = async () => {
      try {
        const response = await post(GetConfigGroupList, {
          data: { currentPage: 1, pageSize: 100, searchText: '', orderType: '' },
        });
        if (response?.dataResponse?.returnCode === eResultCode.SUCCESS) {
          const groups = (response.data || []).map((g: any) => ({
            label: g.name,
            value: g.id,
          }));
          setGroupOptions(groups);
        }
      } catch {
        // silently fail
      }
    };
    fetchGroups();
  }, [post]);

  useEffect(() => {
    if (props.id > 0) {
      const fetchParam = async () => {
        try {
          const response = await post(GetSpecificConfigParam, { data: { id: props.id } });
          if (response?.dataResponse?.returnCode === eResultCode.SUCCESS && response.data) {
            form.setFieldsValue(response.data);
          }
        } catch {
          // silently fail
        }
      };
      fetchParam();
    }
  }, [props.id, post, form]);

  const onFinish = async (values: any) => {
    try {
      setIsLoading(true);
      const payload = {
        data: {
          id: props.id > 0 ? props.id : 0,
          name: values.name,
          groupId: values.groupId,
          description: values.description || '',
        },
      };
      const response = await post(AddEditConfigParam, payload);
      if (response?.dataResponse?.returnCode === eResultCode.SUCCESS) {
        notification.success('Config parameter saved successfully');
        props.onRefreshList();
        props.onCloseDrawer();
      } else {
        notification.error(response?.dataResponse?.description || 'Failed to save config param');
      }
    } catch {
      notification.error('Failed to save config param');
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
        initialValues={props.initialValues || { id: 0, name: '', groupId: null, description: '' }}
        layout="vertical"
        style={{ flex: 1, display: 'flex', flexDirection: 'column', height: '100%', overflow: 'hidden' }}
      >
        <div style={{ flex: 1, overflowY: 'auto', overflowX: 'hidden', paddingRight: 4, marginBottom: 16 }}>
          <Row gutter={[16, 16]}>
            <Col xs={24} md={12}>
              <Form.Item name="groupId" label={<span style={{ color: 'var(--theme-text)' }}>Config Group</span>}
                rules={[{ required: true, message: 'Please select config group' }]}>
                <Select placeholder="Select config group" options={groupOptions} />
              </Form.Item>
            </Col>
            <Col xs={24} md={12}>
              <Form.Item name="name" label={<span style={{ color: 'var(--theme-text)' }}>Parameter Name</span>}
                rules={[{ required: true, message: 'Please enter parameter name' }]}>
                <Input placeholder="Enter parameter name" />
              </Form.Item>
            </Col>
          </Row>
          <Row gutter={[16, 16]}>
            <Col xs={24}>
              <Form.Item name="description" label={<span style={{ color: 'var(--theme-text)' }}>Description</span>}>
                <Input.TextArea placeholder="Enter description (optional)" />
              </Form.Item>
            </Col>
          </Row>
        </div>
        <div style={{ borderTop: '1px solid var(--theme-border)', paddingTop: 16, display: 'flex', justifyContent: 'flex-end', gap: 8, flexShrink: 0 }}>
          <Button icon={<CloseOutlined />} onClick={props.onCloseDrawer} disabled={isLoading}>Cancel</Button>
          <Button type="primary" htmlType="submit" icon={<SaveOutlined />} loading={isLoading}
            style={{ background: '#d4a853', borderColor: '#d4a853' }}>Save</Button>
        </div>
      </Form>
    </div>
  );
}

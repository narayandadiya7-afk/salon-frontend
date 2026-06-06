'use client';

import React, { useEffect, useState } from 'react';
import {
  Card, Button, Table, Tag, Modal, Form, Input, InputNumber,
  Select, Space, Typography, Popconfirm, Spin, Empty,
} from 'antd';
import { PlusOutlined, EditOutlined, DeleteOutlined, ScissorOutlined } from '@ant-design/icons';
import apiUtil from '../../../../utils/api';
import {
  ApiOwnerSalon, ApiCreateService, ApiOwnerServices,
  ApiUpdateService, ApiDeleteService,
} from '../../../../utils/api.constant';
import { notification } from '../../../../utils/notification';
import { eResultCode } from '../../../../utils/enum';

const { Title, Text } = Typography;

interface Service {
  id: string;
  name: string;
  description?: string;
  price: number;
  duration: number;
  category?: string;
  isActive: boolean;
}

const SERVICE_CATEGORIES = ['Hair', 'Skin', 'Nails', 'Makeup', 'Massage', 'Beard', 'Waxing', 'Other'];

export default function ServicesPage() {
  const [salonId, setSalonId] = useState<string | null>(null);
  const [services, setServices] = useState<Service[]>([]);
  const [loading, setLoading] = useState(true);
  const [modalOpen, setModalOpen] = useState(false);
  const [editingService, setEditingService] = useState<Service | null>(null);
  const [submitting, setSubmitting] = useState(false);
  const [form] = Form.useForm();

  useEffect(() => {
    fetchSalonAndServices();
  }, []);

  const fetchSalonAndServices = async () => {
    try {
      setLoading(true);
      const salonRes = await apiUtil.get(ApiOwnerSalon);
      const salonCode = salonRes?.dataResponse?.returnCode;
      if (salonCode === eResultCode.SUCCESS || salonCode === eResultCode.CREATED) {
        setSalonId(salonRes.data.id);
        const servicesRes = await apiUtil.get(ApiOwnerServices(salonRes.data.id));
        const svcCode = servicesRes?.dataResponse?.returnCode;
        if (svcCode === eResultCode.SUCCESS || svcCode === eResultCode.CREATED) {
          setServices(servicesRes.data || []);
        }
      }
    } catch {
      notification.error('Failed to load services');
    } finally {
      setLoading(false);
    }
  };

  const openAddModal = () => {
    setEditingService(null);
    form.resetFields();
    setModalOpen(true);
  };

  const openEditModal = (service: Service) => {
    setEditingService(service);
    form.setFieldsValue(service);
    setModalOpen(true);
  };

  const handleSubmit = async (values: any) => {
    if (!salonId) return;
    try {
      setSubmitting(true);
      let response;

      if (editingService) {
        response = await apiUtil.put(ApiUpdateService(salonId, editingService.id), values);
      } else {
        response = await apiUtil.post(ApiCreateService(salonId), values);
      }

      const rc = response?.dataResponse?.returnCode;
      if (rc === eResultCode.SUCCESS || rc === eResultCode.CREATED) {
        notification.success(editingService ? 'Service updated!' : 'Service created!');
        setModalOpen(false);
        fetchSalonAndServices();
      } else {
        notification.error(response?.dataResponse?.description || 'Failed to save service');
      }
    } catch {
      notification.error('An error occurred');
    } finally {
      setSubmitting(false);
    }
  };

  const handleDelete = async (serviceId: string) => {
    if (!salonId) return;
    try {
      const response = await apiUtil.delete(ApiDeleteService(salonId, serviceId));
      const rc = response?.dataResponse?.returnCode;
      if (rc === eResultCode.SUCCESS || rc === eResultCode.CREATED) {
        notification.success('Service deleted');
        fetchSalonAndServices();
      } else {
        notification.error(response?.dataResponse?.description || 'Failed to delete service');
      }
    } catch {
      notification.error('An error occurred');
    }
  };

  const columns = [
    {
      title: 'Service Name',
      dataIndex: 'name',
      key: 'name',
      render: (name: string, record: Service) => (
        <div>
          <Text strong>{name}</Text>
          {record.description && <div><Text type="secondary" style={{ fontSize: 12 }}>{record.description}</Text></div>}
        </div>
      ),
    },
    {
      title: 'Category',
      dataIndex: 'category',
      key: 'category',
      render: (cat: string) => cat ? <Tag>{cat}</Tag> : <Text type="secondary">—</Text>,
    },
    {
      title: 'Price',
      dataIndex: 'price',
      key: 'price',
      render: (price: number) => <Text strong style={{ color: '#1890ff' }}>₹{price}</Text>,
    },
    {
      title: 'Duration',
      dataIndex: 'duration',
      key: 'duration',
      render: (dur: number) => `${dur} min`,
    },
    {
      title: 'Status',
      dataIndex: 'isActive',
      key: 'isActive',
      render: (active: boolean) => <Tag color={active ? 'green' : 'red'}>{active ? 'Active' : 'Inactive'}</Tag>,
    },
    {
      title: 'Actions',
      key: 'actions',
      render: (_: any, record: Service) => (
        <Space>
          <Button icon={<EditOutlined />} size="small" onClick={() => openEditModal(record)}>Edit</Button>
          <Popconfirm
            title="Delete this service?"
            description="This will hide the service from your salon website."
            onConfirm={() => handleDelete(record.id)}
            okText="Delete"
            okButtonProps={{ danger: true }}
          >
            <Button icon={<DeleteOutlined />} size="small" danger>Delete</Button>
          </Popconfirm>
        </Space>
      ),
    },
  ];

  if (loading) {
    return (
      <div style={{ display: 'flex', justifyContent: 'center', padding: 60 }}>
        <Spin size="large" />
      </div>
    );
  }

  return (
    <div>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 24 }}>
        <div>
          <Title level={2} style={{ margin: 0 }}>
            <ScissorOutlined style={{ marginRight: 8 }} />
            Services
          </Title>
          <Text type="secondary">Manage the services your salon offers</Text>
        </div>
        <Button type="primary" icon={<PlusOutlined />} onClick={openAddModal} size="large">
          Add Service
        </Button>
      </div>

      <Card style={{ borderRadius: 12 }}>
        {services.length === 0 ? (
          <Empty
            image={Empty.PRESENTED_IMAGE_SIMPLE}
            description="No services yet. Add your first service to get started."
          >
            <Button type="primary" icon={<PlusOutlined />} onClick={openAddModal}>
              Add First Service
            </Button>
          </Empty>
        ) : (
          <Table
            columns={columns}
            dataSource={services}
            rowKey="id"
            pagination={{ pageSize: 10 }}
          />
        )}
      </Card>

      {/* Add/Edit Modal */}
      <Modal
        open={modalOpen}
        onCancel={() => setModalOpen(false)}
        title={editingService ? 'Edit Service' : 'Add New Service'}
        footer={null}
        width={520}
      >
        <Form form={form} layout="vertical" onFinish={handleSubmit} style={{ marginTop: 16 }}>
          <Form.Item name="name" label="Service Name" rules={[{ required: true, message: 'Required' }]}>
            <Input placeholder="e.g. Hair Cut, Facial, Manicure" size="large" />
          </Form.Item>

          <Form.Item name="description" label="Description">
            <Input.TextArea placeholder="Brief description of the service..." rows={2} />
          </Form.Item>

          <Form.Item name="category" label="Category">
            <Select placeholder="Select category" size="large" allowClear>
              {SERVICE_CATEGORIES.map((cat) => (
                <Select.Option key={cat} value={cat}>{cat}</Select.Option>
              ))}
            </Select>
          </Form.Item>

          <Form.Item label="Price & Duration" style={{ marginBottom: 0 }}>
            <Space style={{ width: '100%' }}>
              <Form.Item name="price" rules={[{ required: true, message: 'Required' }]} style={{ flex: 1, marginBottom: 0 }}>
                <InputNumber
                  prefix="₹"
                  placeholder="Price"
                  min={0}
                  style={{ width: '100%' }}
                  size="large"
                />
              </Form.Item>
              <Form.Item name="duration" rules={[{ required: true, message: 'Required' }]} style={{ flex: 1, marginBottom: 0 }}>
                <InputNumber
                  suffix="min"
                  placeholder="Duration"
                  min={5}
                  max={480}
                  style={{ width: '100%' }}
                  size="large"
                />
              </Form.Item>
            </Space>
          </Form.Item>

          <div style={{ display: 'flex', gap: 12, marginTop: 24 }}>
            <Button onClick={() => setModalOpen(false)} style={{ flex: 1 }}>Cancel</Button>
            <Button type="primary" htmlType="submit" loading={submitting} style={{ flex: 2 }}>
              {editingService ? 'Update Service' : 'Add Service'}
            </Button>
          </div>
        </Form>
      </Modal>
    </div>
  );
}

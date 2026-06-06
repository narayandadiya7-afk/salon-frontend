'use client';

import React, { useEffect, useState } from 'react';
import {
  Card, Table, Tag, Select, DatePicker, Button, Space, Typography,
  Spin, Modal, Descriptions, Badge,
} from 'antd';
import { CalendarOutlined, EyeOutlined, CheckOutlined, CloseOutlined } from '@ant-design/icons';
import dayjs, { Dayjs } from 'dayjs';
import apiUtil from '../../../../utils/api';
import { ApiOwnerSalon, ApiOwnerAppointments, ApiUpdateAppointmentStatus } from '../../../../utils/api.constant';
import { notification } from '../../../../utils/notification';
import { eResultCode } from '../../../../utils/enum';

const { Title, Text } = Typography;

interface Appointment {
  id: string;
  customerName: string;
  customerEmail: string;
  customerPhone: string;
  appointmentDate: string;
  startTime: string;
  endTime: string;
  status: string;
  notes?: string;
  service: { name: string; price: number };
}

const STATUS_COLORS: Record<string, string> = {
  BOOKED: 'blue',
  COMPLETED: 'green',
  CANCELLED: 'red',
  NO_SHOW: 'orange',
};

const STATUS_OPTIONS = [
  { value: '', label: 'All Status' },
  { value: 'BOOKED', label: 'Booked' },
  { value: 'COMPLETED', label: 'Completed' },
  { value: 'CANCELLED', label: 'Cancelled' },
  { value: 'NO_SHOW', label: 'No Show' },
];

export default function AppointmentsPage() {
  const [salonId, setSalonId] = useState<string | null>(null);
  const [appointments, setAppointments] = useState<Appointment[]>([]);
  const [total, setTotal] = useState(0);
  const [loading, setLoading] = useState(true);
  const [statusFilter, setStatusFilter] = useState('');
  const [dateFilter, setDateFilter] = useState<string | null>(null);
  const [page, setPage] = useState(1);
  const [selectedAppt, setSelectedAppt] = useState<Appointment | null>(null);
  const [updatingStatus, setUpdatingStatus] = useState(false);

  useEffect(() => {
    fetchSalon();
  }, []);

  useEffect(() => {
    if (salonId) fetchAppointments();
  }, [salonId, statusFilter, dateFilter, page]);

  const fetchSalon = async () => {
    const res = await apiUtil.get(ApiOwnerSalon);
    const rc = res?.dataResponse?.returnCode;
    if (rc === eResultCode.SUCCESS || rc === eResultCode.CREATED) setSalonId(res.data.id);
  };

  const fetchAppointments = async () => {
    if (!salonId) return;
    try {
      setLoading(true);
      let url = `${ApiOwnerAppointments(salonId)}?page=${page}&pageSize=20`;
      if (statusFilter) url += `&status=${statusFilter}`;
      if (dateFilter) url += `&date=${dateFilter}`;

      const res = await apiUtil.get(url);
      const rc = res?.dataResponse?.returnCode;
      if (rc === eResultCode.SUCCESS || rc === eResultCode.CREATED) {
        setAppointments(res.data?.appointments || res.data || []);
        setTotal(res.data?.total || 0);
      }
    } catch {
      notification.error('Failed to load appointments');
    } finally {
      setLoading(false);
    }
  };

  const updateStatus = async (appointmentId: string, status: string) => {
    if (!salonId) return;
    try {
      setUpdatingStatus(true);
      const res = await apiUtil.put(ApiUpdateAppointmentStatus(salonId, appointmentId), { status });
      const rc = res?.dataResponse?.returnCode;
      if (rc === eResultCode.SUCCESS || rc === eResultCode.CREATED) {
        notification.success(res?.dataResponse?.description || 'Status updated');
        setSelectedAppt(null);
        fetchAppointments();
      } else {
        notification.error(res?.dataResponse?.description || 'Failed to update status');
      }
    } catch {
      notification.error('An error occurred');
    } finally {
      setUpdatingStatus(false);
    }
  };

  const columns = [
    {
      title: 'Customer',
      key: 'customer',
      render: (_: any, record: Appointment) => (
        <div>
          <Text strong>{record.customerName}</Text>
          <div><Text type="secondary" style={{ fontSize: 12 }}>{record.customerEmail}</Text></div>
        </div>
      ),
    },
    {
      title: 'Service',
      dataIndex: ['service', 'name'],
      key: 'service',
      render: (name: string, record: Appointment) => (
        <div>
          <Text>{name}</Text>
          <div><Text type="secondary" style={{ fontSize: 12 }}>₹{record.service.price}</Text></div>
        </div>
      ),
    },
    {
      title: 'Date & Time',
      key: 'datetime',
      render: (_: any, record: Appointment) => (
        <div>
          <Text>{dayjs(record.appointmentDate).format('DD MMM YYYY')}</Text>
          <div><Text type="secondary" style={{ fontSize: 12 }}>{record.startTime} – {record.endTime}</Text></div>
        </div>
      ),
    },
    {
      title: 'Status',
      dataIndex: 'status',
      key: 'status',
      render: (status: string) => <Tag color={STATUS_COLORS[status] || 'default'}>{status}</Tag>,
    },
    {
      title: 'Actions',
      key: 'actions',
      render: (_: any, record: Appointment) => (
        <Space>
          <Button icon={<EyeOutlined />} size="small" onClick={() => setSelectedAppt(record)}>View</Button>
          {record.status === 'BOOKED' && (
            <>
              <Button
                icon={<CheckOutlined />}
                size="small"
                type="primary"
                onClick={() => updateStatus(record.id, 'COMPLETED')}
              >
                Complete
              </Button>
              <Button
                icon={<CloseOutlined />}
                size="small"
                danger
                onClick={() => updateStatus(record.id, 'CANCELLED')}
              >
                Cancel
              </Button>
            </>
          )}
        </Space>
      ),
    },
  ];

  return (
    <div>
      <div style={{ marginBottom: 24 }}>
        <Title level={2} style={{ margin: 0 }}>
          <CalendarOutlined style={{ marginRight: 8 }} />
          Appointments
        </Title>
        <Text type="secondary">Manage all your salon bookings</Text>
      </div>

      {/* Filters */}
      <Card style={{ borderRadius: 12, marginBottom: 16 }}>
        <Space wrap>
          <Select
            value={statusFilter}
            onChange={(val) => { setStatusFilter(val); setPage(1); }}
            options={STATUS_OPTIONS}
            style={{ width: 160 }}
            placeholder="Filter by status"
          />
          <DatePicker
            onChange={(date: Dayjs | null) => {
              setDateFilter(date ? date.format('YYYY-MM-DD') : null);
              setPage(1);
            }}
            placeholder="Filter by date"
            allowClear
          />
          <Button onClick={() => { setStatusFilter(''); setDateFilter(null); setPage(1); }}>
            Clear Filters
          </Button>
        </Space>
      </Card>

      <Card style={{ borderRadius: 12 }}>
        <Table
          columns={columns}
          dataSource={appointments}
          rowKey="id"
          loading={loading}
          pagination={{
            current: page,
            total,
            pageSize: 20,
            onChange: setPage,
            showTotal: (t) => `${t} appointments`,
          }}
        />
      </Card>

      {/* Appointment Detail Modal */}
      <Modal
        open={!!selectedAppt}
        onCancel={() => setSelectedAppt(null)}
        title="Appointment Details"
        footer={
          selectedAppt?.status === 'BOOKED' ? (
            <Space>
              <Button onClick={() => setSelectedAppt(null)}>Close</Button>
              <Button
                danger
                loading={updatingStatus}
                onClick={() => updateStatus(selectedAppt!.id, 'CANCELLED')}
              >
                Cancel Appointment
              </Button>
              <Button
                type="primary"
                loading={updatingStatus}
                onClick={() => updateStatus(selectedAppt!.id, 'COMPLETED')}
              >
                Mark Completed
              </Button>
            </Space>
          ) : (
            <Button onClick={() => setSelectedAppt(null)}>Close</Button>
          )
        }
      >
        {selectedAppt && (
          <Descriptions column={1} bordered size="small" style={{ marginTop: 16 }}>
            <Descriptions.Item label="Customer">{selectedAppt.customerName}</Descriptions.Item>
            <Descriptions.Item label="Email">{selectedAppt.customerEmail}</Descriptions.Item>
            <Descriptions.Item label="Phone">{selectedAppt.customerPhone}</Descriptions.Item>
            <Descriptions.Item label="Service">{selectedAppt.service.name}</Descriptions.Item>
            <Descriptions.Item label="Price">₹{selectedAppt.service.price}</Descriptions.Item>
            <Descriptions.Item label="Date">{dayjs(selectedAppt.appointmentDate).format('DD MMM YYYY')}</Descriptions.Item>
            <Descriptions.Item label="Time">{selectedAppt.startTime} – {selectedAppt.endTime}</Descriptions.Item>
            <Descriptions.Item label="Status">
              <Tag color={STATUS_COLORS[selectedAppt.status]}>{selectedAppt.status}</Tag>
            </Descriptions.Item>
            {selectedAppt.notes && (
              <Descriptions.Item label="Notes">{selectedAppt.notes}</Descriptions.Item>
            )}
          </Descriptions>
        )}
      </Modal>
    </div>
  );
}

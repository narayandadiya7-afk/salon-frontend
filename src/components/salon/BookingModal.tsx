'use client';

import React, { useState, useEffect } from 'react';
import { Modal, Form, Input, DatePicker, Select, Button, Alert, Steps, Typography, Tag, Spin } from 'antd';
import { CalendarOutlined, ClockCircleOutlined, UserOutlined, PhoneOutlined, MailOutlined } from '@ant-design/icons';
import dayjs, { Dayjs } from 'dayjs';
import apiUtil from '../../utils/api';
import { ApiGetAvailableSlots, ApiBookAppointment } from '../../utils/api.constant';
import { notification } from '../../utils/notification';
import { eResultCode } from '../../utils/enum';

const { Text, Title } = Typography;

interface Service {
  id: string;
  name: string;
  price: number;
  duration: number;
}

interface Salon {
  id: string;
  name: string;
}

interface TimeSlot {
  startTime: string;
  endTime: string;
  available: boolean;
}

interface BookingModalProps {
  salon: Salon;
  service: Service;
  primaryColor: string;
  onClose: () => void;
}

export default function BookingModal({ salon, service, primaryColor, onClose }: BookingModalProps) {
  const [form] = Form.useForm();
  const [currentStep, setCurrentStep] = useState(0);
  const [selectedDate, setSelectedDate] = useState<string | null>(null);
  const [selectedSlot, setSelectedSlot] = useState<TimeSlot | null>(null);
  const [availableSlots, setAvailableSlots] = useState<TimeSlot[]>([]);
  const [loadingSlots, setLoadingSlots] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [bookingSuccess, setBookingSuccess] = useState(false);
  const [bookingRef, setBookingRef] = useState<string | null>(null);

  const fetchSlots = async (date: string) => {
    try {
      setLoadingSlots(true);
      setSelectedSlot(null);
      const response = await apiUtil.get(`${ApiGetAvailableSlots(salon.id)}?date=${date}`);
      const returnCode = response?.dataResponse?.returnCode;
      if (returnCode === eResultCode.SUCCESS || returnCode === eResultCode.CREATED) {
        setAvailableSlots(response.data || []);
      } else {
        setAvailableSlots([]);
        notification.error(response?.dataResponse?.description || 'Failed to load slots');
      }
    } catch {
      setAvailableSlots([]);
    } finally {
      setLoadingSlots(false);
    }
  };

  const handleDateChange = (date: Dayjs | null) => {
    if (!date) return;
    const dateStr = date.format('YYYY-MM-DD');
    setSelectedDate(dateStr);
    fetchSlots(dateStr);
  };

  const handleSubmit = async (values: any) => {
    if (!selectedDate || !selectedSlot) {
      notification.error('Please select a date and time slot');
      return;
    }

    try {
      setSubmitting(true);
      const response = await apiUtil.post(ApiBookAppointment(salon.id), {
        salonId: salon.id,
        serviceId: service.id,
        customerName: values.customerName,
        customerEmail: values.customerEmail,
        customerPhone: values.customerPhone,
        appointmentDate: selectedDate,
        startTime: selectedSlot.startTime,
        notes: values.notes,
      });

      const rc = response?.dataResponse?.returnCode;
      if (rc === eResultCode.SUCCESS || rc === eResultCode.CREATED) {
        setBookingRef(response.data?.id);
        setBookingSuccess(true);
        notification.success(response?.dataResponse?.description || 'Appointment booked successfully!');
      } else {
        notification.error(response?.dataResponse?.description || 'Booking failed. Please try again.');
      }
    } catch {
      notification.error('An error occurred. Please try again.');
    } finally {
      setSubmitting(false);
    }
  };

  const disabledDate = (current: Dayjs) => {
    return current && current < dayjs().startOf('day');
  };

  if (bookingSuccess) {
    return (
      <Modal open onCancel={onClose} footer={null} centered width={480}>
        <div style={{ textAlign: 'center', padding: '24px 0' }}>
          <div style={{ fontSize: 64, marginBottom: 16 }}>🎉</div>
          <Title level={3} style={{ color: '#52c41a' }}>Booking Confirmed!</Title>
          <Text type="secondary" style={{ display: 'block', marginBottom: 16 }}>
            Your appointment has been booked successfully.
          </Text>
          <div style={{ background: '#f6ffed', border: '1px solid #b7eb8f', borderRadius: 8, padding: 16, marginBottom: 24 }}>
            <div><Text strong>Service:</Text> <Text>{service.name}</Text></div>
            <div><Text strong>Date:</Text> <Text>{selectedDate}</Text></div>
            <div><Text strong>Time:</Text> <Text>{selectedSlot?.startTime} – {selectedSlot?.endTime}</Text></div>
            <div><Text strong>Salon:</Text> <Text>{salon.name}</Text></div>
            {bookingRef && <div style={{ marginTop: 8 }}><Text type="secondary" style={{ fontSize: 12 }}>Ref: {bookingRef}</Text></div>}
          </div>
          <Button type="primary" onClick={onClose} style={{ background: primaryColor, borderColor: primaryColor }}>
            Done
          </Button>
        </div>
      </Modal>
    );
  }

  return (
    <Modal
      open
      onCancel={onClose}
      footer={null}
      centered
      width={560}
      title={
        <div>
          <div style={{ fontWeight: 700, fontSize: 18 }}>Book Appointment</div>
          <div style={{ fontWeight: 400, fontSize: 14, color: '#666' }}>
            {service.name} · ₹{service.price} · {service.duration} min
          </div>
        </div>
      }
    >
      <Steps
        current={currentStep}
        size="small"
        style={{ marginBottom: 24 }}
        items={[
          { title: 'Date & Time', icon: <CalendarOutlined /> },
          { title: 'Your Details', icon: <UserOutlined /> },
        ]}
      />

      {currentStep === 0 && (
        <div>
          <div style={{ marginBottom: 20 }}>
            <Text strong style={{ display: 'block', marginBottom: 8 }}>Select Date</Text>
            <DatePicker
              style={{ width: '100%' }}
              size="large"
              disabledDate={disabledDate}
              onChange={handleDateChange}
              format="YYYY-MM-DD"
            />
          </div>

          {selectedDate && (
            <div>
              <Text strong style={{ display: 'block', marginBottom: 12 }}>
                <ClockCircleOutlined style={{ marginRight: 6 }} />
                Available Slots for {selectedDate}
              </Text>

              {loadingSlots ? (
                <div style={{ textAlign: 'center', padding: 24 }}>
                  <Spin description="Loading slots..." />
                </div>
              ) : availableSlots.length === 0 ? (
                <Alert type="info" title="No slots available for this date. Please try another day." />
              ) : (
                <div style={{ display: 'flex', flexWrap: 'wrap', gap: 8 }}>
                  {availableSlots.map((slot) => (
                    <Tag
                      key={slot.startTime}
                      onClick={() => slot.available && setSelectedSlot(slot)}
                      style={{
                        cursor: slot.available ? 'pointer' : 'not-allowed',
                        padding: '6px 14px',
                        borderRadius: 8,
                        fontSize: 14,
                        background: !slot.available
                          ? '#f5f5f5'
                          : selectedSlot?.startTime === slot.startTime
                          ? primaryColor
                          : '#fff',
                        color: !slot.available
                          ? '#bbb'
                          : selectedSlot?.startTime === slot.startTime
                          ? '#fff'
                          : '#333',
                        border: selectedSlot?.startTime === slot.startTime
                          ? `1px solid ${primaryColor}`
                          : '1px solid #d9d9d9',
                        textDecoration: !slot.available ? 'line-through' : 'none',
                      }}
                    >
                      {slot.startTime}
                    </Tag>
                  ))}
                </div>
              )}
            </div>
          )}

          <div style={{ marginTop: 24, display: 'flex', justifyContent: 'flex-end' }}>
            <Button
              type="primary"
              size="large"
              disabled={!selectedDate || !selectedSlot}
              onClick={() => setCurrentStep(1)}
              style={{ background: primaryColor, borderColor: primaryColor }}
            >
              Continue →
            </Button>
          </div>
        </div>
      )}

      {currentStep === 1 && (
        <Form form={form} layout="vertical" onFinish={handleSubmit}>
          <Form.Item
            name="customerName"
            label="Full Name"
            rules={[{ required: true, message: 'Please enter your name' }]}
          >
            <Input prefix={<UserOutlined />} placeholder="Your full name" size="large" />
          </Form.Item>

          <Form.Item
            name="customerEmail"
            label="Email"
            rules={[{ required: true, type: 'email', message: 'Please enter a valid email' }]}
          >
            <Input prefix={<MailOutlined />} placeholder="your@email.com" size="large" />
          </Form.Item>

          <Form.Item
            name="customerPhone"
            label="Phone Number"
            rules={[{ required: true, message: 'Please enter your phone number' }]}
          >
            <Input prefix={<PhoneOutlined />} placeholder="+91 98765 43210" size="large" />
          </Form.Item>

          <Form.Item name="notes" label="Notes (optional)">
            <Input.TextArea placeholder="Any special requests or notes..." rows={3} />
          </Form.Item>

          {/* Summary */}
          <div style={{ background: '#f8f9fa', borderRadius: 8, padding: 16, marginBottom: 16 }}>
            <Text strong style={{ display: 'block', marginBottom: 8 }}>Booking Summary</Text>
            <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 4 }}>
              <Text type="secondary">Service</Text>
              <Text>{service.name}</Text>
            </div>
            <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 4 }}>
              <Text type="secondary">Date</Text>
              <Text>{selectedDate}</Text>
            </div>
            <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 4 }}>
              <Text type="secondary">Time</Text>
              <Text>{selectedSlot?.startTime} – {selectedSlot?.endTime}</Text>
            </div>
            <div style={{ display: 'flex', justifyContent: 'space-between' }}>
              <Text type="secondary">Price</Text>
              <Text strong style={{ color: primaryColor }}>₹{service.price}</Text>
            </div>
          </div>

          <div style={{ display: 'flex', gap: 12 }}>
            <Button size="large" onClick={() => setCurrentStep(0)} style={{ flex: 1 }}>
              ← Back
            </Button>
            <Button
              type="primary"
              size="large"
              htmlType="submit"
              loading={submitting}
              style={{ flex: 2, background: primaryColor, borderColor: primaryColor }}
            >
              Confirm Booking
            </Button>
          </div>
        </Form>
      )}
    </Modal>
  );
}

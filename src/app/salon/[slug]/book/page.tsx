'use client';

import React, { useEffect, useState } from 'react';
import { useParams } from 'next/navigation';
import { Spin, Alert, Card, Row, Col, Typography, Button, Select, Space, Divider, Form, Input } from 'antd';
import { CalendarOutlined, ClockCircleOutlined } from '@ant-design/icons';
import apiUtil from '../../../../utils/api';
import { ApiGetSalonBySlug } from '../../../../utils/api.constant';
import { eResultCode } from '../../../../utils/enum';

const { Title, Paragraph, Text } = Typography;

interface Service {
  id: string;
  name: string;
  description?: string;
  price: number;
  duration: number;
  category?: string;
}

interface TimeSlot {
  dayOfWeek: number;
  startTime: string;
  endTime: string;
  isAvailable: boolean;
}

interface Salon {
  id: string;
  name: string;
  slug: string;
  services: Service[];
  timeSlots: TimeSlot[];
}

export default function BookPage() {
  const params = useParams();
  const slug = params?.slug as string;

  const [salon, setSalon] = useState<Salon | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [selectedService, setSelectedService] = useState<string | null>(null);
  const [form] = Form.useForm();

  const DAY_NAMES = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];

  useEffect(() => {
    if (!slug) return;
    fetchSalon();
  }, [slug]);

  const fetchSalon = async () => {
    try {
      setLoading(true);
      const response = await apiUtil.get(ApiGetSalonBySlug(slug));
      const returnCode = response?.dataResponse?.returnCode;
      if (returnCode === eResultCode.SUCCESS || returnCode === eResultCode.CREATED) {
        setSalon(response.data);
      } else {
        setError(response?.dataResponse?.description || 'Salon not found');
      }
    } catch {
      setError('Failed to load salon');
    } finally {
      setLoading(false);
    }
  };

  const handleBook = async (values: any) => {
    // TODO: Implement booking logic
    console.log('Booking:', values);
    Alert.success('Booking request submitted!');
  };

  if (loading) {
    return (
      <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', minHeight: '60vh' }}>
        <Spin size="large" description="Loading booking..." />
      </div>
    );
  }

  if (error) {
    return (
      <div style={{ maxWidth: 600, margin: '80px auto', padding: '0 24px' }}>
        <Alert type="error" title="Error" description={error} showIcon />
      </div>
    );
  }

  const selectedServiceData = salon?.services?.find(s => s.id === selectedService);

  return (
    <div style={{ maxWidth: 1000, margin: '0 auto', padding: '40px 24px' }}>
      <Title level={2}>
        <CalendarOutlined /> Book an Appointment
      </Title>
      <Paragraph>Reserve your appointment at {salon?.name}</Paragraph>

      <Row gutter={[32, 32]} style={{ marginTop: '32px' }}>
        <Col xs={24} md={12}>
          <Card title="Select Service">
            <Form layout="vertical" form={form} onFinish={handleBook}>
              <Form.Item
                label="Service"
                name="service"
                rules={[{ required: true, message: 'Please select a service' }]}
              >
                <Select
                  placeholder="Choose a service"
                  onChange={setSelectedService}
                  options={salon?.services?.map(s => ({
                    label: `${s.name} - ₹${s.price}`,
                    value: s.id,
                  }))}
                />
              </Form.Item>

              {selectedServiceData && (
                <>
                  <Divider />
                  <Space direction="vertical" style={{ width: '100%' }}>
                    <div>
                      <Text strong>Service Details</Text>
                    </div>
                    <div>
                      <Text>Duration: {selectedServiceData.duration} minutes</Text>
                    </div>
                    <div>
                      <Text>Price: ₹{selectedServiceData.price}</Text>
                    </div>
                    {selectedServiceData.description && (
                      <div>
                        <Paragraph>{selectedServiceData.description}</Paragraph>
                      </div>
                    )}
                  </Space>
                </>
              )}
            </Form>
          </Card>
        </Col>

        <Col xs={24} md={12}>
          <Card title="Availability">
            {salon?.timeSlots && salon.timeSlots.length > 0 ? (
              <div>
                <Title level={5}>Working Hours</Title>
                <div style={{ maxHeight: '300px', overflowY: 'auto' }}>
                  {salon.timeSlots.map((slot, idx) => (
                    <div key={idx} style={{ marginBottom: '12px', paddingBottom: '8px', borderBottom: '1px solid #f0f0f0' }}>
                      <Text strong>{DAY_NAMES[slot.dayOfWeek]}</Text>
                      <br />
                      <Space>
                        <ClockCircleOutlined />
                        <Text>{slot.startTime}</Text>
                        <Text>-</Text>
                        <Text>{slot.endTime}</Text>
                      </Space>
                      <br />
                      <Text type={slot.isAvailable ? 'success' : 'danger'}>
                        {slot.isAvailable ? '✓ Available' : '✗ Closed'}
                      </Text>
                    </div>
                  ))}
                </div>
              </div>
            ) : (
              <Alert type="info" message="No availability information" showIcon />
            )}
          </Card>
        </Col>
      </Row>

      <Card style={{ marginTop: '32px' }} title="Your Details">
        <Form layout="vertical" form={form} onFinish={handleBook}>
          <Form.Item
            label="Full Name"
            name="name"
            rules={[{ required: true, message: 'Please enter your name' }]}
          >
            <Input placeholder="Your full name" />
          </Form.Item>

          <Form.Item
            label="Email"
            name="email"
            rules={[
              { required: true, message: 'Please enter your email' },
              { type: 'email', message: 'Please enter a valid email' },
            ]}
          >
            <Input type="email" placeholder="your@email.com" />
          </Form.Item>

          <Form.Item
            label="Phone"
            name="phone"
            rules={[{ required: true, message: 'Please enter your phone number' }]}
          >
            <Input placeholder="Your phone number" />
          </Form.Item>

          <Form.Item
            label="Preferred Date"
            name="date"
            rules={[{ required: true, message: 'Please select a date' }]}
          >
            <Input type="date" />
          </Form.Item>

          <Form.Item
            label="Preferred Time"
            name="time"
            rules={[{ required: true, message: 'Please select a time' }]}
          >
            <Input type="time" />
          </Form.Item>

          <Form.Item
            label="Notes (Optional)"
            name="notes"
          >
            <Input.TextArea placeholder="Any special requests?" rows={3} />
          </Form.Item>

          <Button type="primary" htmlType="submit" size="large" block>
            Confirm Booking
          </Button>
        </Form>
      </Card>
    </div>
  );
}

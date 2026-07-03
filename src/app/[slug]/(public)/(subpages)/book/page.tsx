'use client';

import React, { useEffect, useState, useMemo } from 'react';
import { useParams, useRouter, useSearchParams } from 'next/navigation';
import { Typography, Row, Col, Button, Spin, Alert, Rate, Tag, Avatar, Divider, Card, Modal, Form, Input, Select, Steps, message, Space } from 'antd';
import { LeftOutlined, RightOutlined, CheckCircleOutlined, ClockCircleOutlined, UserOutlined, CalendarOutlined, EnvironmentOutlined, PhoneOutlined, MailOutlined } from '@ant-design/icons';
import apiUtil from '../../../../../utils/api';
import { ApiGetSalonBySlug, ApiGetAvailableSlots, ApiBookAppointment } from '../../../../../utils/api.constant';
import { eResultCode } from '../../../../../utils/enum';

const { Title, Text, Paragraph } = Typography;
const { TextArea } = Input;
const gold = '#d4a853';
const burgundy = '#7C1D3E';

const servicesData = [
  { id: 's1', name: 'Classic Haircut', price: 45, duration: 45, description: 'Precision cut tailored to your face shape and style preferences.', rating: 4.8, image: 'https://images.unsplash.com/photo-1560066984-138dadb4c035?w=400&h=300&fit=crop', category: 'Hair' },
  { id: 's2', name: 'Color & Highlights', price: 120, duration: 120, description: 'Professional color services with premium products for vibrant, long-lasting results.', rating: 4.9, image: 'https://images.unsplash.com/photo-1563241527-3004b7be0ffd?w=400&h=300&fit=crop', category: 'Color' },
  { id: 's3', name: 'Luxury Facial', price: 85, duration: 60, description: 'Rejuvenating facial treatment using organic products for radiant skin.', rating: 4.7, image: 'https://images.unsplash.com/photo-1570172619644-dfd03ed5d881?w=400&h=300&fit=crop', category: 'Skin' },
  { id: 's4', name: 'Spa Manicure', price: 55, duration: 45, description: 'Luxurious hand treatment with exfoliation, mask, and premium polish.', rating: 4.6, image: 'https://images.unsplash.com/photo-1604654894610-df63bc536371?w=400&h=300&fit=crop', category: 'Nails' },
  { id: 's5', name: 'Blowout & Styling', price: 65, duration: 50, description: 'Professional blow-dry and styling for any occasion.', rating: 4.8, image: 'https://images.unsplash.com/photo-1522337360788-8b13dee7a37e?w=400&h=300&fit=crop', category: 'Hair' },
  { id: 's6', name: 'Keratin Treatment', price: 200, duration: 150, description: 'Smoothing treatment that eliminates frizz and adds shine for weeks.', rating: 4.9, image: 'https://images.unsplash.com/photo-1527668752968-14dc70a27c95?w=400&h=300&fit=crop', category: 'Hair' },
];

const staffData = [
  { id: 'st1', name: 'Sophia Williams', role: 'Master Stylist', rating: 4.9, avatar: 'https://images.unsplash.com/photo-1580618672591-eb180b1a973f?w=200&h=200&fit=crop', specialties: ['Precision Cuts', 'Color', 'Styling'] },
  { id: 'st2', name: 'James Rodriguez', role: 'Senior Colorist', rating: 4.8, avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=200&h=200&fit=crop', specialties: ['Balayage', 'Ombre', 'Color Correction'] },
  { id: 'st3', name: 'Emily Chen', role: 'Esthetician', rating: 4.7, avatar: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=200&h=200&fit=crop', specialties: ['Facials', 'Waxing', 'Skin Care'] },
  { id: 'st4', name: 'Marcus Johnson', role: 'Barber Specialist', rating: 4.9, avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=200&h=200&fit=crop', specialties: ['Cuts', 'Beard Grooming', 'Hot Towel'] },
];

const timeSlots = {
  morning: ['9:00 AM', '9:30 AM', '10:00 AM', '10:30 AM', '11:00 AM', '11:30 AM'],
  afternoon: ['12:00 PM', '12:30 PM', '1:00 PM', '1:30 PM', '2:00 PM', '2:30 PM', '3:00 PM', '3:30 PM'],
  evening: ['4:00 PM', '4:30 PM', '5:00 PM', '5:30 PM', '6:00 PM', '6:30 PM', '7:00 PM'],
};

export default function BookPage() {
  const router = useRouter();
  const params = useParams();
  const searchParams = useSearchParams();
  const slug = params?.slug as string;
  const [form] = Form.useForm();
  const [salon, setSalon] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [currentStep, setCurrentStep] = useState(0);
  const [selectedService, setSelectedService] = useState<any>(null);
  const [selectedStaff, setSelectedStaff] = useState<any>(null);
  const [selectedDate, setSelectedDate] = useState('');
  const [selectedTime, setSelectedTime] = useState('');
  const [serviceSearch, setServiceSearch] = useState('');
  const [bookingSuccess, setBookingSuccess] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [availableSlots, setAvailableSlots] = useState<string[]>([]);
  const [customerDetails, setCustomerDetails] = useState<any>({});

  const preSelectedServiceId = searchParams?.get('service');

  useEffect(() => {
    if (!slug) return;
    setLoading(true);
    apiUtil.get(ApiGetSalonBySlug(slug)).then((res: any) => {
      if (res?.dataResponse?.returnCode === eResultCode.SUCCESS || res?.dataResponse?.returnCode === eResultCode.CREATED) {
        setSalon(res.data || res);
      } else {
        setError('Salon not found');
      }
    }).catch(() => setError('Failed to load page')).finally(() => setLoading(false));
  }, [slug]);

  useEffect(() => {
    if (preSelectedServiceId) {
      const found = servicesData.find((s) => s.id === preSelectedServiceId);
      if (found) setSelectedService(found);
    }
  }, [preSelectedServiceId]);

  useEffect(() => {
    if (selectedDate && salon?.id) {
      apiUtil.get(ApiGetAvailableSlots(salon.id), { date: selectedDate }).then((res: any) => {
        if (res?.data?.slots) {
          setAvailableSlots(res.data.slots);
        }
      }).catch(() => {});
    }
  }, [selectedDate, salon]);

  const filteredServices = useMemo(() => {
    if (!serviceSearch) return servicesData;
    const q = serviceSearch.toLowerCase();
    return servicesData.filter((s) => s.name.toLowerCase().includes(q) || s.category.toLowerCase().includes(q));
  }, [serviceSearch]);

  const categories = useMemo(() => {
    return [...new Set(servicesData.map((s) => s.category))];
  }, []);

  const stepTitles = ['Service', 'Staff', 'Date & Time', 'Details', 'Confirm'];

  const handleNext = () => {
    if (currentStep === 0 && !selectedService) { message.warning('Please select a service'); return; }
    if (currentStep === 1 && !selectedStaff) { message.warning('Please select a staff member'); return; }
    if (currentStep === 2 && (!selectedDate || !selectedTime)) { message.warning('Please select date and time'); return; }
    if (currentStep === 3) {
      form.validateFields().then((values) => {
        setCustomerDetails(values);
        setCurrentStep(currentStep + 1);
      }).catch(() => {});
      return;
    }
    setCurrentStep(currentStep + 1);
  };

  const handlePrev = () => setCurrentStep(currentStep - 1);

  const handleSubmit = async () => {
    if (!salon?.id) return;
    setSubmitting(true);
    try {
      const payload = {
        serviceId: selectedService.id,
        staffId: selectedStaff.id,
        date: selectedDate,
        time: selectedTime,
        customerName: customerDetails.name,
        customerEmail: customerDetails.email,
        customerPhone: customerDetails.phone,
        notes: customerDetails.notes || '',
      };
      const res = await apiUtil.post(ApiBookAppointment(salon.id), payload);
      if (res?.dataResponse?.returnCode === eResultCode.SUCCESS || res?.dataResponse?.returnCode === eResultCode.CREATED) {
        setBookingSuccess(true);
        message.success('Appointment booked successfully!');
      } else {
        message.error(res?.data?.message || 'Booking failed. Please try again.');
      }
    } catch {
      message.error('Something went wrong. Please try again.');
    } finally {
      setSubmitting(false);
    }
  };

  if (loading) return <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', minHeight: '100vh' }}><Spin size="large" /></div>;
  if (error) return <div style={{ maxWidth: 1100, margin: '100px auto', padding: '0 16px' }}><Alert title={error} type="error" showIcon /></div>;
  if (!salon) return <div style={{ maxWidth: 1100, margin: '100px auto', padding: '0 16px' }}><Alert title="Salon not found" type="warning" showIcon /></div>;

  if (bookingSuccess) {
    return (
      <div style={{ maxWidth: 600, margin: '100px auto', padding: '0 16px', textAlign: 'center' }}>
        <CheckCircleOutlined style={{ fontSize: 72, color: gold, marginBottom: 24 }} />
        <Title level={2} style={{ color: '#1a1a2e' }}>Appointment Confirmed!</Title>
        <Paragraph style={{ fontSize: 16, color: '#666' }}>
          Thank you, {customerDetails.name}! Your appointment for <strong>{selectedService?.name}</strong> with <strong>{selectedStaff?.name}</strong> on <strong>{selectedDate}</strong> at <strong>{selectedTime}</strong> has been booked.
        </Paragraph>
        <Space size="large" style={{ marginTop: 24 }}>
          <Button onClick={() => router.push(`/${slug}`)} style={{ borderRadius: 30 }}>Back to Home</Button>
          <Button type="primary" onClick={() => { setBookingSuccess(false); setCurrentStep(0); setSelectedService(null); setSelectedStaff(null); setSelectedDate(''); setSelectedTime(''); form.resetFields(); }}
            style={{ background: gold, borderColor: gold, color: '#1a1a2e', borderRadius: 30, fontWeight: 600 }}>
            Book Another
          </Button>
        </Space>
      </div>
    );
  }

  return (
    <div style={{ background: '#faf8f5', minHeight: '100vh' }}>
      <div style={{ maxWidth: 1000, margin: '0 auto', padding: '60px 20px 40px' }}>
        <div style={{ textAlign: 'center', marginBottom: 40 }}>
          <Title level={2} style={{ color: '#1a1a2e', margin: 0, fontSize: 36, fontWeight: 700 }}>Book Your Appointment</Title>
          <Text style={{ color: '#666', fontSize: 16, marginTop: 8, display: 'block' }}>at {salon?.name || 'our salon'}</Text>
          <Divider style={{ borderColor: gold, width: 60, minWidth: 60, margin: '16px auto', borderWidth: 2 }} />
        </div>

        <Steps current={currentStep} size="small" style={{ marginBottom: 40, maxWidth: 700, margin: '0 auto 40px' }}
          items={stepTitles.map((t) => ({ title: t }))}
          labelPlacement="vertical"
        />

        <div style={{ background: '#fff', borderRadius: 16, padding: 32, boxShadow: '0 4px 20px rgba(0,0,0,0.06)' }}>
          {/* STEP 1: SERVICE */}
          {currentStep === 0 && (
            <div>
              <Title level={4} style={{ marginBottom: 16 }}>Select a Service</Title>
              <Input.Search placeholder="Search services..." value={serviceSearch} onChange={(e) => setServiceSearch(e.target.value)} style={{ marginBottom: 20, maxWidth: 400 }} />
              <div style={{ marginBottom: 16 }}>
                <Text style={{ color: '#999', fontSize: 13, marginRight: 8 }}>Categories:</Text>
                {categories.map((cat) => (
                  <Tag key={cat} style={{ borderRadius: 20, cursor: 'pointer' }} onClick={() => setServiceSearch(cat)}>{cat}</Tag>
                ))}
                {serviceSearch && <Button type="link" size="small" onClick={() => setServiceSearch('')} style={{ color: '#999' }}>Clear</Button>}
              </div>
              <Row gutter={[16, 16]}>
                {filteredServices.map((svc) => (
                  <Col key={svc.id} xs={24} sm={12} md={8}>
                    <Card hoverable onClick={() => setSelectedService(svc)}
                      style={{ borderRadius: 12, border: selectedService?.id === svc.id ? `2px solid ${gold}` : '1px solid #f0f0f0', cursor: 'pointer', height: '100%' }}>
                      <div style={{ height: 120, borderRadius: 8, background: `url(${svc.image}) center/cover`, marginBottom: 12 }} />
                      <Title level={5} style={{ margin: '0 0 4px' }}>{svc.name}</Title>
                      <Space><ClockCircleOutlined style={{ color: '#999' }} /><Text style={{ color: '#999', fontSize: 12 }}>{svc.duration} min</Text></Space>
                      <div style={{ margin: '4px 0' }}><Rate disabled value={svc.rating} style={{ fontSize: 12 }} /></div>
                      <Text style={{ color: gold, fontWeight: 700, fontSize: 16 }}>${svc.price}</Text>
                    </Card>
                  </Col>
                ))}
              </Row>
            </div>
          )}

          {/* STEP 2: STAFF */}
          {currentStep === 1 && (
            <div>
              <Title level={4} style={{ marginBottom: 16 }}>Select a Stylist</Title>
              <Row gutter={[16, 16]}>
                {staffData.map((staff) => (
                  <Col key={staff.id} xs={24} sm={12} md={6}>
                    <Card hoverable onClick={() => setSelectedStaff(staff)}
                      style={{ borderRadius: 12, textAlign: 'center', border: selectedStaff?.id === staff.id ? `2px solid ${gold}` : '1px solid #f0f0f0', cursor: 'pointer', height: '100%' }}>
                      <Avatar src={staff.avatar} size={70} style={{ border: `3px solid ${gold}`, marginBottom: 12 }} />
                      <Title level={5} style={{ margin: 0 }}>{staff.name}</Title>
                      <Text style={{ color: gold, fontWeight: 600, fontSize: 13 }}>{staff.role}</Text>
                      <div style={{ margin: '6px 0' }}><Rate disabled value={staff.rating} style={{ fontSize: 12 }} /></div>
                      <div>{staff.specialties.map((sp, i) => <Tag key={i} color="default" style={{ fontSize: 11, margin: 2 }}>{sp}</Tag>)}</div>
                    </Card>
                  </Col>
                ))}
              </Row>
            </div>
          )}

          {/* STEP 3: DATE & TIME */}
          {currentStep === 2 && (
            <div>
              <Title level={4} style={{ marginBottom: 16 }}>Select Date & Time</Title>
              <Row gutter={[16, 16]}>
                <Col xs={24} md={12}>
                  <Text strong style={{ display: 'block', marginBottom: 8 }}>Date</Text>
                  <Input type="date" value={selectedDate} onChange={(e) => { setSelectedDate(e.target.value); setSelectedTime(''); }}
                    style={{ borderRadius: 8, height: 44 }} min={new Date().toISOString().split('T')[0]} />
                </Col>
              </Row>
              {selectedDate && (
                <div style={{ marginTop: 24 }}>
                  <Text strong style={{ display: 'block', marginBottom: 16 }}>Available Time Slots</Text>
                  {Object.entries(timeSlots).map(([period, slots]) => (
                    <div key={period} style={{ marginBottom: 20 }}>
                      <Text style={{ color: '#999', textTransform: 'capitalize', fontSize: 13, fontWeight: 600, marginBottom: 8, display: 'block' }}>{period}</Text>
                      <Space wrap>
                        {slots.map((slot) => {
                          const isAvail = availableSlots.length === 0 || availableSlots.includes(slot);
                          return (
                            <Button key={slot} onClick={() => isAvail && setSelectedTime(slot)}
                              disabled={!isAvail}
                              style={{
                                borderRadius: 8,
                                borderColor: selectedTime === slot ? gold : '#d9d9d9',
                                background: selectedTime === slot ? gold : '#fff',
                                color: selectedTime === slot ? '#1a1a2e' : isAvail ? '#333' : '#ccc',
                                fontWeight: selectedTime === slot ? 600 : 400,
                              }}>
                              {slot}
                            </Button>
                          );
                        })}
                      </Space>
                    </div>
                  ))}
                </div>
              )}
            </div>
          )}

          {/* STEP 4: DETAILS */}
          {currentStep === 3 && (
            <div>
              <Title level={4} style={{ marginBottom: 16 }}>Your Details</Title>
              <Form form={form} layout="vertical" initialValues={{ name: '', email: '', phone: '', notes: '' }}>
                <Row gutter={[16, 0]}>
                  <Col xs={24} md={8}>
                    <Form.Item name="name" label="Full Name" rules={[{ required: true, message: 'Please enter your name' }]}>
                      <Input prefix={<UserOutlined />} placeholder="Your name" style={{ borderRadius: 8 }} />
                    </Form.Item>
                  </Col>
                  <Col xs={24} md={8}>
                    <Form.Item name="email" label="Email" rules={[{ required: true, type: 'email', message: 'Valid email required' }]}>
                      <Input prefix={<MailOutlined />} placeholder="your@email.com" style={{ borderRadius: 8 }} />
                    </Form.Item>
                  </Col>
                  <Col xs={24} md={8}>
                    <Form.Item name="phone" label="Phone" rules={[{ required: true, message: 'Please enter your phone' }]}>
                      <Input prefix={<PhoneOutlined />} placeholder="Phone number" style={{ borderRadius: 8 }} />
                    </Form.Item>
                  </Col>
                </Row>
                <Form.Item name="notes" label="Special Notes (Optional)">
                  <TextArea rows={3} placeholder="Any special requests or notes..." style={{ borderRadius: 8 }} />
                </Form.Item>
              </Form>
            </div>
          )}

          {/* STEP 5: CONFIRM */}
          {currentStep === 4 && (
            <div>
              <Title level={4} style={{ marginBottom: 16 }}>Confirm Your Appointment</Title>
              <div style={{ background: '#faf8f5', borderRadius: 12, padding: 24 }}>
                <Row gutter={[16, 16]}>
                  <Col span={12}><Text strong>Service:</Text><br /><Text>{selectedService?.name}</Text></Col>
                  <Col span={12}><Text strong>Price:</Text><br /><Text style={{ color: gold, fontWeight: 700 }}>${selectedService?.price}</Text></Col>
                  <Col span={12}><Text strong>Stylist:</Text><br /><Text>{selectedStaff?.name}</Text></Col>
                  <Col span={12}><Text strong>Duration:</Text><br /><Text>{selectedService?.duration} min</Text></Col>
                  <Col span={12}><Text strong>Date:</Text><br /><Text>{selectedDate}</Text></Col>
                  <Col span={12}><Text strong>Time:</Text><br /><Text>{selectedTime}</Text></Col>
                  <Col span={12}><Text strong>Name:</Text><br /><Text>{customerDetails.name}</Text></Col>
                  <Col span={12}><Text strong>Email:</Text><br /><Text>{customerDetails.email}</Text></Col>
                  <Col span={12}><Text strong>Phone:</Text><br /><Text>{customerDetails.phone}</Text></Col>
                  {customerDetails.notes && <Col span={24}><Text strong>Notes:</Text><br /><Text>{customerDetails.notes}</Text></Col>}
                </Row>
              </div>
            </div>
          )}

          {/* NAVIGATION */}
          <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: 32 }}>
            <Button onClick={currentStep === 0 ? () => router.push(`/${slug}`) : handlePrev} icon={<LeftOutlined />} style={{ borderRadius: 30 }}>
              {currentStep === 0 ? 'Cancel' : 'Back'}
            </Button>
            {currentStep < 4 ? (
              <Button type="primary" onClick={handleNext} style={{ background: gold, borderColor: gold, color: '#1a1a2e', borderRadius: 30, fontWeight: 600 }}>
                Next <RightOutlined />
              </Button>
            ) : (
              <Button type="primary" onClick={handleSubmit} loading={submitting} style={{ background: gold, borderColor: gold, color: '#1a1a2e', borderRadius: 30, fontWeight: 600 }}>
                Confirm Booking
              </Button>
            )}
          </div>
        </div>
      </div>

      <style>{`
        .ant-card-hoverable:hover { transform: translateY(-4px); box-shadow: 0 12px 40px rgba(0,0,0,0.1) !important; }
        .ant-steps-item-active .ant-steps-item-icon { background: ${gold} !important; border-color: ${gold} !important; }
        .ant-steps-item-finish .ant-steps-item-icon { background: ${gold} !important; border-color: ${gold} !important; }
        .ant-steps-item-finish .ant-steps-item-tail::after { background: ${gold} !important; }
      `}</style>
    </div>
  );
}

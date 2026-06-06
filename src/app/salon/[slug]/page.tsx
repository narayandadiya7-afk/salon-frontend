'use client';

import React, { useEffect, useState } from 'react';
import { useParams, useRouter } from 'next/navigation';
import { Button, Tag, Spin, Alert, Card, Row, Col, Typography, Divider } from 'antd';
import { ClockCircleOutlined, EnvironmentOutlined, PhoneOutlined, ScissorOutlined } from '@ant-design/icons';
import Link from 'next/link';
import apiUtil from '../../../utils/api';
import { ApiGetSalonBySlug } from '../../../utils/api.constant';
import { eResultCode } from '../../../utils/enum';
import BookingModal from '../../../components/salon/BookingModal';

const { Title, Text, Paragraph } = Typography;

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
  description?: string;
  address?: string;
  city?: string;
  state?: string;
  phone?: string;
  email?: string;
  logoUrl?: string;
  primaryColor?: string;
  services: Service[];
  timeSlots: TimeSlot[];
  owner: { name: string; email: string };
}

const DAY_NAMES = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];

export default function SalonPage() {
  const params = useParams();
  const router = useRouter();
  const slug = params?.slug as string;

  const [salon, setSalon] = useState<Salon | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [expired, setExpired] = useState(false);
  const [bookingService, setBookingService] = useState<Service | null>(null);
  const [selectedCategory, setSelectedCategory] = useState<string>('All');

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
        if (returnCode === eResultCode.UNAUTHORIZED) setExpired(true);
        setError(response?.dataResponse?.description || 'Salon not found');
      }
    } catch {
      setError('Failed to load salon');
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', minHeight: '60vh' }}>
        <Spin size="large" description="Loading salon..." />
      </div>
    );
  }

  if (expired) {
    return (
      <div style={{ maxWidth: 600, margin: '80px auto', padding: '0 24px', textAlign: 'center' }}>
        <Alert
          type="warning"
          title="Salon Temporarily Unavailable"
          description="This salon's subscription has expired. Please check back later or contact the salon owner."
          showIcon
          style={{ marginBottom: 24 }}
        />
        <Link href="/">
          <Button type="primary">Back to Home</Button>
        </Link>
      </div>
    );
  }

  if (error || !salon) {
    return (
      <div style={{ maxWidth: 600, margin: '80px auto', padding: '0 24px', textAlign: 'center' }}>
        <Alert type="error" title="Salon Not Found" description={error || 'This salon does not exist.'} showIcon style={{ marginBottom: 24 }} />
        <Link href="/">
          <Button type="primary">Back to Home</Button>
        </Link>
      </div>
    );
  }

  const primaryColor = salon.primaryColor || '#1890ff';
  const categories = ['All', ...Array.from(new Set(salon.services.map((s) => s.category || 'General')))];
  const filteredServices = selectedCategory === 'All'
    ? salon.services
    : salon.services.filter((s) => (s.category || 'General') === selectedCategory);

  return (
    <div style={{ minHeight: '100vh', background: '#fafafa' }}>
      {/* Hero Banner */}
      <div style={{
        background: `linear-gradient(135deg, ${primaryColor} 0%, ${primaryColor}cc 100%)`,
        padding: '60px 24px',
        color: '#fff',
        textAlign: 'center',
      }}>
        <div style={{ maxWidth: 800, margin: '0 auto' }}>
          <div style={{ fontSize: 48, marginBottom: 16 }}>✂️</div>
          <Title level={1} style={{ color: '#fff', margin: 0, fontSize: 'clamp(28px, 5vw, 48px)' }}>
            {salon.name}
          </Title>
          {salon.description && (
            <Paragraph style={{ color: 'rgba(255,255,255,0.85)', fontSize: 18, marginTop: 12, marginBottom: 0 }}>
              {salon.description}
            </Paragraph>
          )}
          <div style={{ display: 'flex', justifyContent: 'center', gap: 24, marginTop: 20, flexWrap: 'wrap' }}>
            {salon.city && (
              <span style={{ color: 'rgba(255,255,255,0.9)', display: 'flex', alignItems: 'center', gap: 6 }}>
                <EnvironmentOutlined /> {salon.city}{salon.state ? `, ${salon.state}` : ''}
              </span>
            )}
            {salon.phone && (
              <span style={{ color: 'rgba(255,255,255,0.9)', display: 'flex', alignItems: 'center', gap: 6 }}>
                <PhoneOutlined /> {salon.phone}
              </span>
            )}
          </div>
        </div>
      </div>

      <div style={{ maxWidth: 1100, margin: '0 auto', padding: '40px 24px' }}>
        <Row gutter={[32, 32]}>
          {/* Services */}
          <Col xs={24} lg={16}>
            <div style={{ marginBottom: 24 }}>
              <Title level={2} style={{ marginBottom: 16 }}>
                <ScissorOutlined style={{ marginRight: 8, color: primaryColor }} />
                Our Services
              </Title>

              {/* Category Filter */}
              <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap', marginBottom: 20 }}>
                {categories.map((cat) => (
                  <Tag
                    key={cat}
                    onClick={() => setSelectedCategory(cat)}
                    style={{
                      cursor: 'pointer',
                      padding: '4px 16px',
                      borderRadius: 20,
                      fontSize: 14,
                      background: selectedCategory === cat ? primaryColor : '#f0f0f0',
                      color: selectedCategory === cat ? '#fff' : '#333',
                      border: 'none',
                    }}
                  >
                    {cat}
                  </Tag>
                ))}
              </div>

              <Row gutter={[16, 16]}>
                {filteredServices.map((service) => (
                  <Col xs={24} sm={12} key={service.id}>
                    <Card
                      hoverable
                      style={{ borderRadius: 12, height: '100%' }}
                      styles={{ body: { padding: 20 } }}
                    >
                      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: 8 }}>
                        <Text strong style={{ fontSize: 16 }}>{service.name}</Text>
                        <Text strong style={{ color: primaryColor, fontSize: 18, whiteSpace: 'nowrap' }}>
                          ₹{service.price}
                        </Text>
                      </div>
                      {service.description && (
                        <Text type="secondary" style={{ display: 'block', marginBottom: 12, fontSize: 13 }}>
                          {service.description}
                        </Text>
                      )}
                      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                        <span style={{ color: '#666', fontSize: 13 }}>
                          <ClockCircleOutlined style={{ marginRight: 4 }} />
                          {service.duration} min
                        </span>
                        <Button
                          type="primary"
                          size="small"
                          style={{ background: primaryColor, borderColor: primaryColor }}
                          onClick={() => setBookingService(service)}
                        >
                          Book Now
                        </Button>
                      </div>
                    </Card>
                  </Col>
                ))}
              </Row>

              {filteredServices.length === 0 && (
                <div style={{ textAlign: 'center', padding: '40px 0', color: '#999' }}>
                  No services available in this category.
                </div>
              )}
            </div>
          </Col>

          {/* Sidebar */}
          <Col xs={24} lg={8}>
            {/* Working Hours */}
            <Card style={{ borderRadius: 12, marginBottom: 20 }} title="Working Hours">
              {salon.timeSlots.map((slot) => (
                <div key={slot.dayOfWeek} style={{ display: 'flex', justifyContent: 'space-between', padding: '8px 0', borderBottom: '1px solid #f0f0f0' }}>
                  <Text style={{ fontWeight: slot.isAvailable ? 500 : 400, color: slot.isAvailable ? '#333' : '#bbb' }}>
                    {DAY_NAMES[slot.dayOfWeek]}
                  </Text>
                  <Text style={{ color: slot.isAvailable ? '#333' : '#bbb' }}>
                    {slot.isAvailable ? `${slot.startTime} – ${slot.endTime}` : 'Closed'}
                  </Text>
                </div>
              ))}
            </Card>

            {/* Contact */}
            <Card style={{ borderRadius: 12 }} title="Contact Us">
              {salon.address && (
                <div style={{ marginBottom: 12 }}>
                  <EnvironmentOutlined style={{ marginRight: 8, color: primaryColor }} />
                  <Text>{salon.address}</Text>
                  {salon.city && <Text>, {salon.city}</Text>}
                </div>
              )}
              {salon.phone && (
                <div style={{ marginBottom: 12 }}>
                  <PhoneOutlined style={{ marginRight: 8, color: primaryColor }} />
                  <a href={`tel:${salon.phone}`} style={{ color: primaryColor }}>{salon.phone}</a>
                </div>
              )}
              {salon.email && (
                <div>
                  <span style={{ marginRight: 8 }}>✉️</span>
                  <a href={`mailto:${salon.email}`} style={{ color: primaryColor }}>{salon.email}</a>
                </div>
              )}
              <Divider />
              <Button
                type="primary"
                block
                size="large"
                style={{ background: primaryColor, borderColor: primaryColor }}
                onClick={() => salon.services.length > 0 && setBookingService(salon.services[0])}
              >
                Book an Appointment
              </Button>
            </Card>
          </Col>
        </Row>
      </div>

      {/* Booking Modal */}
      {bookingService && (
        <BookingModal
          salon={salon}
          service={bookingService}
          primaryColor={primaryColor}
          onClose={() => setBookingService(null)}
        />
      )}
    </div>
  );
}

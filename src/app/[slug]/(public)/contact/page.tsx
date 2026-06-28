'use client';

import React, { useEffect, useState } from 'react';
import { useParams, useRouter } from 'next/navigation';
import { Typography, Row, Col, Button, Spin, Alert, Rate, Tag, Avatar, Divider, Card, Form, Input, message, Space } from 'antd';
import { PhoneOutlined, MailOutlined, EnvironmentOutlined, ClockCircleOutlined, RightOutlined, SendOutlined, InstagramOutlined, FacebookOutlined, TwitterOutlined, YoutubeOutlined } from '@ant-design/icons';
import apiUtil from '../../../../utils/api';
import { ApiGetSalonBySlug } from '../../../../utils/api.constant';
import { eResultCode } from '../../../../utils/enum';

const { Title, Text, Paragraph } = Typography;
const { TextArea } = Input;
const gold = '#d4a853';
const burgundy = '#7C1D3E';

const businessHours = [
  { day: 'Monday', hours: '9:00 AM – 7:00 PM' },
  { day: 'Tuesday', hours: '9:00 AM – 7:00 PM' },
  { day: 'Wednesday', hours: '9:00 AM – 7:00 PM' },
  { day: 'Thursday', hours: '9:00 AM – 8:00 PM' },
  { day: 'Friday', hours: '9:00 AM – 8:00 PM' },
  { day: 'Saturday', hours: '10:00 AM – 6:00 PM' },
  { day: 'Sunday', hours: 'Closed' },
];

const socialLinks = [
  { icon: <InstagramOutlined />, name: 'Instagram', url: '#' },
  { icon: <FacebookOutlined />, name: 'Facebook', url: '#' },
  { icon: <TwitterOutlined />, name: 'Twitter', url: '#' },
  { icon: <YoutubeOutlined />, name: 'YouTube', url: '#' },
];

export default function ContactPage() {
  const router = useRouter();
  const params = useParams();
  const slug = params?.slug as string;
  const [salon, setSalon] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [form] = Form.useForm();
  const [sending, setSending] = useState(false);

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

  const handleSubmit = () => {
    form.validateFields().then((values) => {
      setSending(true);
      setTimeout(() => {
        setSending(false);
        form.resetFields();
        message.success('Your message has been sent! We will get back to you shortly.');
      }, 1000);
    }).catch(() => {});
  };

  if (loading) return <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', minHeight: '100vh' }}><Spin size="large" /></div>;
  if (error) return <div style={{ maxWidth: 1100, margin: '100px auto', padding: '0 16px' }}><Alert title={error} type="error" showIcon /></div>;
  if (!salon) return <div style={{ maxWidth: 1100, margin: '100px auto', padding: '0 16px' }}><Alert title="Salon not found" type="warning" showIcon /></div>;

  return (
    <div>
      {/* HERO */}
      <section style={{ padding: '120px 20px 80px', background: 'linear-gradient(135deg, #0a0a1a 0%, #1a1a3e 50%, #0d0d2b 100%)', textAlign: 'center' }}>
        <div style={{ maxWidth: 800, margin: '0 auto' }}>
          <Title style={{ color: '#fff', fontSize: 48, fontWeight: 800, margin: 0 }}>Contact Us</Title>
          <div style={{ width: 60, height: 3, background: gold, margin: '20px auto' }} />
          <Text style={{ color: 'rgba(255,255,255,0.8)', fontSize: 18, display: 'block' }}>
            We'd love to hear from you. Get in touch with our team.
          </Text>
        </div>
      </section>

      {/* CONTACT INFO CARDS */}
      <section style={{ padding: '80px 20px', background: '#fff' }}>
        <div style={{ maxWidth: 1100, margin: '0 auto' }}>
          <Row gutter={[24, 24]}>
            {[
              { icon: <PhoneOutlined />, title: 'Phone', value: salon?.phone || '(555) 123-4567', action: `tel:${salon?.phone || '5551234567'}`, label: 'Call Now' },
              { icon: <MailOutlined />, title: 'Email', value: salon?.email || 'hello@salon.com', action: `mailto:${salon?.email || 'hello@salon.com'}`, label: 'Send Email' },
              { icon: <EnvironmentOutlined />, title: 'Address', value: salon?.address || '123 Beauty Lane, Suite 100, New York, NY 10001', action: `https://maps.google.com/?q=${encodeURIComponent(salon?.address || '123 Beauty Lane, New York')}`, label: 'View on Map' },
              { icon: <ClockCircleOutlined />, title: 'Hours', value: 'Mon–Sat 9AM–7PM', action: '#hours', label: 'View Hours' },
            ].map((item, i) => (
              <Col key={i} xs={24} sm={12} md={6}>
                <Card hoverable style={{ borderRadius: 16, textAlign: 'center', height: '100%', border: '1px solid #f0f0f0', boxShadow: '0 4px 20px rgba(0,0,0,0.06)' }}>
                  <div style={{ fontSize: 36, color: gold, marginBottom: 12 }}>{item.icon}</div>
                  <Title level={5} style={{ margin: '0 0 4px' }}>{item.title}</Title>
                  <Paragraph style={{ color: '#666', fontSize: 14, margin: '0 0 12px' }}>{item.value}</Paragraph>
                  <Button type="link" href={item.action} style={{ color: gold, padding: 0 }}>{item.label}</Button>
                </Card>
              </Col>
            ))}
          </Row>
        </div>
      </section>

      {/* BUSINESS HOURS & SOCIAL */}
      <section style={{ padding: '80px 20px', background: '#faf8f5' }}>
        <div style={{ maxWidth: 1100, margin: '0 auto' }}>
          <Row gutter={[40, 40]}>
            <Col xs={24} md={12}>
              <Title level={3} style={{ color: '#1a1a2e', marginBottom: 24 }}>Business Hours</Title>
              <div style={{ background: '#fff', borderRadius: 16, padding: 24, boxShadow: '0 4px 20px rgba(0,0,0,0.06)' }}>
                {businessHours.map((item, i) => (
                  <div key={i} style={{ display: 'flex', justifyContent: 'space-between', padding: '10px 0', borderBottom: i < businessHours.length - 1 ? '1px solid #f0f0f0' : 'none' }}>
                    <Text strong style={{ color: '#333' }}>{item.day}</Text>
                    <Text style={{ color: item.hours === 'Closed' ? '#e74c3c' : '#666' }}>{item.hours}</Text>
                  </div>
                ))}
              </div>
            </Col>
            <Col xs={24} md={12}>
              <Title level={3} style={{ color: '#1a1a2e', marginBottom: 24 }}>Follow Us</Title>
              <div style={{ background: '#fff', borderRadius: 16, padding: 24, boxShadow: '0 4px 20px rgba(0,0,0,0.06)' }}>
                <Row gutter={[16, 16]}>
                  {socialLinks.map((social, i) => (
                    <Col key={i} span={12}>
                      <Button href={social.url} target="_blank" style={{ width: '100%', height: 60, borderRadius: 12, display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 8, border: '1px solid #f0f0f0', background: '#faf8f5' }}>
                        <span style={{ fontSize: 24, color: gold }}>{social.icon}</span>
                        <Text strong>{social.name}</Text>
                      </Button>
                    </Col>
                  ))}
                </Row>
              </div>
            </Col>
          </Row>
        </div>
      </section>

      {/* INQUIRY FORM */}
      <section style={{ padding: '80px 20px', background: '#fff' }}>
        <div style={{ maxWidth: 700, margin: '0 auto' }}>
          <div style={{ textAlign: 'center', marginBottom: 40 }}>
            <Divider style={{ borderColor: gold, width: 60, minWidth: 60, margin: '0 auto 16px', borderWidth: 2 }} />
            <Title level={2} style={{ color: '#1a1a2e', margin: 0, fontSize: 32, fontWeight: 700 }}>Send Us a Message</Title>
            <Text style={{ color: '#666', fontSize: 16, marginTop: 8, display: 'block' }}>We'll get back to you within 24 hours</Text>
          </div>
          <div style={{ background: '#faf8f5', borderRadius: 16, padding: 32, boxShadow: '0 4px 20px rgba(0,0,0,0.06)' }}>
            <Form form={form} layout="vertical">
              <Row gutter={[16, 0]}>
                <Col xs={24} md={12}>
                  <Form.Item name="name" label="Your Name" rules={[{ required: true, message: 'Please enter your name' }]}>
                    <Input placeholder="John Doe" style={{ borderRadius: 8, height: 44 }} />
                  </Form.Item>
                </Col>
                <Col xs={24} md={12}>
                  <Form.Item name="email" label="Email Address" rules={[{ required: true, type: 'email', message: 'Valid email required' }]}>
                    <Input placeholder="john@example.com" style={{ borderRadius: 8, height: 44 }} />
                  </Form.Item>
                </Col>
              </Row>
              <Form.Item name="phone" label="Phone Number">
                <Input placeholder="(555) 123-4567" style={{ borderRadius: 8, height: 44 }} />
              </Form.Item>
              <Form.Item name="message" label="Your Message" rules={[{ required: true, message: 'Please enter your message' }]}>
                <TextArea rows={5} placeholder="Tell us how we can help..." style={{ borderRadius: 8 }} />
              </Form.Item>
              <Button type="primary" onClick={handleSubmit} loading={sending} icon={<SendOutlined />}
                style={{ width: '100%', height: 48, background: gold, borderColor: gold, color: '#1a1a2e', borderRadius: 30, fontWeight: 600, fontSize: 16 }}>
                Send Message
              </Button>
            </Form>
          </div>
        </div>
      </section>

      {/* MAP PLACEHOLDER */}
      <section style={{ padding: '0 20px 80px', background: '#fff' }}>
        <div style={{ maxWidth: 1100, margin: '0 auto' }}>
          <div style={{ borderRadius: 16, overflow: 'hidden', height: 400, background: '#f0f0f0', position: 'relative' }}>
            <div style={{ position: 'absolute', inset: 0, display: 'flex', alignItems: 'center', justifyContent: 'center', flexDirection: 'column', gap: 8 }}>
              <EnvironmentOutlined style={{ fontSize: 48, color: '#ccc' }} />
              <Text style={{ color: '#999', fontSize: 16 }}>Interactive Map Loading...</Text>
              <Text style={{ color: '#ccc', fontSize: 13 }}>{salon?.address || '123 Beauty Lane, Suite 100, New York, NY 10001'}</Text>
            </div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section style={{ padding: '80px 20px', background: `linear-gradient(135deg, ${burgundy} 0%, #a02d52 100%)`, textAlign: 'center' }}>
        <div style={{ maxWidth: 600, margin: '0 auto' }}>
          <Title level={2} style={{ color: '#fff', margin: 0, fontSize: 32 }}>Ready to Book Your Visit?</Title>
          <Text style={{ color: 'rgba(255,255,255,0.8)', fontSize: 16, display: 'block', margin: '16px 0 32px' }}>
            Schedule an appointment online and experience premium service.
          </Text>
          <Button type="primary" size="large" onClick={() => router.push(`/${slug}/book`)}
            style={{ height: 48, paddingInline: 36, fontSize: 16, fontWeight: 600, background: gold, borderColor: gold, color: '#1a1a2e', borderRadius: 30 }}>
            Book Appointment
          </Button>
        </div>
      </section>

      <style>{`
        .ant-card-hoverable:hover { transform: translateY(-4px); box-shadow: 0 12px 40px rgba(0,0,0,0.1) !important; }
      `}</style>
    </div>
  );
}

'use client';

import React, { useEffect, useState } from 'react';
import { useParams } from 'next/navigation';
import { Spin, Alert, Card, Row, Col, Typography, Button, Space } from 'antd';
import { ScissorOutlined, CreditCardOutlined } from '@ant-design/icons';
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

interface Salon {
  id: string;
  name: string;
  slug: string;
  services: Service[];
}

export default function ServicesPage() {
  const params = useParams();
  const slug = params?.slug as string;

  const [salon, setSalon] = useState<Salon | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

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

  if (loading) {
    return (
      <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', minHeight: '60vh' }}>
        <Spin size="large" description="Loading services..." />
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

  const categories = Array.from(new Set(salon?.services?.map(s => s.category || 'Other') || []));

  return (
    <div style={{ maxWidth: 1200, margin: '0 auto', padding: '40px 24px' }}>
      <Title level={2}>
        <ScissorOutlined /> Our Services
      </Title>
      <Paragraph>Browse all the services offered at {salon?.name}</Paragraph>

      {!salon?.services || salon.services.length === 0 ? (
        <Alert
          type="info"
          message="No services available"
          description="No services are currently listed. Please check back later."
          showIcon
          style={{ marginTop: '20px' }}
        />
      ) : (
        <>
          {categories.map((category) => (
            <div key={category} style={{ marginTop: '32px' }}>
              <Title level={3}>{category}</Title>
              <Row gutter={[24, 24]}>
                {salon.services
                  .filter(s => (s.category || 'Other') === category)
                  .map((service) => (
                    <Col key={service.id} xs={24} sm={12} lg={8}>
                      <Card
                        style={{ height: '100%', display: 'flex', flexDirection: 'column' }}
                        actions={[
                          <Button type="primary" key="book">
                            Book Now
                          </Button>,
                        ]}
                      >
                        <Title level={4}>{service.name}</Title>
                        {service.description && <Paragraph>{service.description}</Paragraph>}
                        <Space direction="vertical" style={{ marginTop: '12px' }}>
                          <Text>
                            <strong>Duration:</strong> {service.duration} mins
                          </Text>
                          <Text style={{ fontSize: '16px', color: '#1890ff', fontWeight: 'bold' }}>
                            <CreditCardOutlined /> ₹{service.price}
                          </Text>
                        </Space>
                      </Card>
                    </Col>
                  ))}
              </Row>
            </div>
          ))}
        </>
      )}
    </div>
  );
}

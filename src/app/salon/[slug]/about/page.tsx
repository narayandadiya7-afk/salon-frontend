'use client';

import React, { useEffect, useState } from 'react';
import { useParams } from 'next/navigation';
import { Spin, Alert, Card, Typography } from 'antd';
import { InfoCircleOutlined } from '@ant-design/icons';
import apiUtil from '../../../../utils/api';
import { ApiGetSalonBySlug } from '../../../../utils/api.constant';
import { eResultCode } from '../../../../utils/enum';

const { Title, Paragraph } = Typography;

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
  owner?: { name: string; email: string };
}

export default function AboutPage() {
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
        <Spin size="large" description="Loading salon..." />
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

  return (
    <div style={{ maxWidth: 800, margin: '0 auto', padding: '40px 24px' }}>
      <Title level={2}>
        <InfoCircleOutlined /> About Us
      </Title>

      <Card style={{ marginTop: '24px' }}>
        <Title level={3}>{salon?.name}</Title>
        {salon?.description && <Paragraph>{salon.description}</Paragraph>}

        <Paragraph>
          <strong>Location:</strong>
          {salon?.address && ` ${salon.address}`}
          {salon?.city && `, ${salon.city}`}
          {salon?.state && `, ${salon.state}`}
        </Paragraph>

        {salon?.phone && (
          <Paragraph>
            <strong>Phone:</strong> <a href={`tel:${salon.phone}`}>{salon.phone}</a>
          </Paragraph>
        )}

        {salon?.email && (
          <Paragraph>
            <strong>Email:</strong> <a href={`mailto:${salon.email}`}>{salon.email}</a>
          </Paragraph>
        )}

        {salon?.owner && (
          <Paragraph>
            <strong>Owner:</strong> {salon.owner.name}
          </Paragraph>
        )}
      </Card>
    </div>
  );
}

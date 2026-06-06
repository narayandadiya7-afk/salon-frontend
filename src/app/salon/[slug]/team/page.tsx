'use client';

import React, { useEffect, useState } from 'react';
import { useParams } from 'next/navigation';
import { Spin, Alert, Card, Row, Col, Typography } from 'antd';
import { TeamOutlined } from '@ant-design/icons';
import apiUtil from '../../../../utils/api';
import { ApiGetSalonBySlug } from '../../../../utils/api.constant';
import { eResultCode } from '../../../../utils/enum';

const { Title, Paragraph } = Typography;

interface TeamMember {
  id: string;
  name: string;
  designation?: string;
  bio?: string;
  imageUrl?: string;
}

interface Salon {
  id: string;
  name: string;
  slug: string;
  description?: string;
}

export default function TeamPage() {
  const params = useParams();
  const slug = params?.slug as string;

  const [salon, setSalon] = useState<Salon | null>(null);
  const [teamMembers, setTeamMembers] = useState<TeamMember[]>([]);
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
        setTeamMembers([]);
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
        <Spin size="large" description="Loading team..." />
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
    <div style={{ maxWidth: 1200, margin: '0 auto', padding: '40px 24px' }}>
      <Title level={2}>
        <TeamOutlined /> Our Team
      </Title>
      <Paragraph>{salon?.name} team members:</Paragraph>

      {teamMembers.length === 0 ? (
        <Alert
          type="info"
          message="Team members information coming soon"
          description="We're working on adding team member details. Check back later!"
          showIcon
          style={{ marginTop: '20px' }}
        />
      ) : (
        <Row gutter={[24, 24]} style={{ marginTop: '24px' }}>
          {teamMembers.map((member) => (
            <Col key={member.id} xs={24} sm={12} lg={8}>
              <Card
                style={{ height: '100%' }}
                cover={
                  member.imageUrl && <img alt={member.name} src={member.imageUrl} height={200} />
                }
              >
                <Title level={4}>{member.name}</Title>
                {member.designation && <Paragraph>{member.designation}</Paragraph>}
                {member.bio && <Paragraph>{member.bio}</Paragraph>}
              </Card>
            </Col>
          ))}
        </Row>
      )}
    </div>
  );
}

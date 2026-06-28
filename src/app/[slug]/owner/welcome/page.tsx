'use client';

import React from 'react';
import { useParams, useRouter } from 'next/navigation';
import { Button, Typography, Card, Steps, Divider } from 'antd';
import { CheckCircleOutlined, GlobalOutlined, UserOutlined, TeamOutlined } from '@ant-design/icons';

const { Title, Text, Paragraph } = Typography;

export default function WelcomePage() {
  const params = useParams();
  const router = useRouter();
  const slug = params?.slug as string;

  return (
    <div style={{ maxWidth: 700, margin: '60px auto', padding: '0 24px', textAlign: 'center' }}>
      <div style={{ fontSize: 64, marginBottom: 16 }}>🎉</div>
      <Title level={2} style={{ marginBottom: 8 }}>Your salon is live!</Title>
      <Paragraph style={{ fontSize: 16, color: '#666', marginBottom: 32 }}>
        Your 1-month free trial has started. Here&apos;s your salon website:
      </Paragraph>

      <Card
        style={{
          borderRadius: 12,
          background: '#f6f8ff',
          border: '1px solid #d9e6ff',
          marginBottom: 40,
          textAlign: 'center',
        }}
      >
        <GlobalOutlined style={{ fontSize: 24, color: '#1890ff', marginBottom: 8 }} />
        <div style={{ fontSize: 20, fontWeight: 600, color: '#1890ff' }}>
          /{slug}
        </div>
        <Text type="secondary">Share this link with your customers</Text>
        <div style={{ marginTop: 16 }}>
          <Button
            type="primary"
            size="large"
            onClick={() => router.push(`/${slug}`)}
          >
            View Your Salon Website
          </Button>
        </div>
      </Card>

      <Title level={4} style={{ marginBottom: 24 }}>Next Steps</Title>

      <div style={{ textAlign: 'left', maxWidth: 500, margin: '0 auto' }}>
        <Steps
          direction="vertical"
          current={-1}
          items={[
            {
              title: 'Set up your salon details',
              description: 'Add your address, phone, working hours, and more.',
              icon: <UserOutlined />,
            },
            {
              title: 'Add services & pricing',
              description: 'List the services you offer with prices and durations.',
              icon: <CheckCircleOutlined />,
            },
            {
              title: 'Invite your staff',
              description: 'Add team members so they can manage bookings too.',
              icon: <TeamOutlined />,
            },
          ]}
        />
      </div>

      <Divider />

      <Paragraph style={{ color: '#888' }}>
        You can manage everything from your salon dashboard.
      </Paragraph>
      <Button
        type="primary"
        size="large"
        onClick={() => router.push(`/${slug}/owner/login`)}
      >
        Go to Dashboard
      </Button>
    </div>
  );
}

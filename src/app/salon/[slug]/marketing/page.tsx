'use client';

import React, { useState } from 'react';
import { useParams } from 'next/navigation';
import {
  Row, Col, Card, Tag, Button, Space, Table, Typography, Divider, Tooltip, Badge,
  Switch, Modal, Form, Input, InputNumber, Select, DatePicker, Rate, Tabs, Progress, Statistic,
} from 'antd';
import type { TabsProps } from 'antd';
import {
  NotificationOutlined, GiftOutlined, MessageOutlined, SendOutlined,
  PlusOutlined, RightOutlined, StarOutlined, TeamOutlined,
  PercentageOutlined, WalletOutlined, RiseOutlined, EditOutlined,
  DeleteOutlined, BellOutlined, WhatsAppOutlined, CheckCircleOutlined,
  CopyOutlined, MoreOutlined, BarChartOutlined,
} from '@ant-design/icons';
import OwnerLayout from '../../../../components/layout/OwnerLayout';

const { Text } = Typography;

const kpis = [
  { icon: <NotificationOutlined />, label: 'Active Campaigns', value: '4', color: '#8B5CF6' },
  { icon: <GiftOutlined />, label: 'Coupons Redeemed', value: '186', color: '#EC4899' },
  { icon: <RiseOutlined />, label: 'Conversion Rate', value: '24.8%', color: '#10B981' },
  { icon: <WalletOutlined />, label: 'Revenue from Marketing', value: '₹72,400', color: '#F59E0B' },
];

const couponData = [
  { key: '1', code: 'WELCOME20', discount: '20% Off', type: 'New customers', minOrder: 500, used: 45, max: 100, status: 'Active', expiry: '2025-12-31' },
  { key: '2', code: 'SUMMER150', discount: '₹150 Off', type: 'All', minOrder: 800, used: 32, max: 50, status: 'Active', expiry: '2025-09-30' },
  { key: '3', code: 'VIP50', discount: '50% Off', type: 'VIP only', minOrder: 1000, used: 8, max: 20, status: 'Active', expiry: '2026-01-15' },
  { key: '4', code: 'REFER25', discount: '25% Off', type: 'Referrals', minOrder: 300, used: 15, max: Infinity, status: 'Expired', expiry: '2025-06-01' },
];

const pushCampaigns = [
  { key: '1', title: 'Weekend Special: 20% Off', message: 'Book any service this weekend and enjoy 20% discount!', sentTo: 1248, openRate: '32%', status: 'Sent', date: 'Jan 15, 2025' },
  { key: '2', title: 'New Service — HydraFacial', message: 'We have introduced HydraFacial treatments. Book now for glowing skin!', sentTo: 982, openRate: '28%', status: 'Sent', date: 'Jan 10, 2025' },
  { key: '3', title: 'Referral Bonus Reminder', message: 'Refer a friend and both get 25% off on your next visit!', sentTo: 450, openRate: '45%', status: 'Draft', date: 'Jan 20, 2025' },
];

const whatsAppCampaigns = [
  { key: '1', title: 'Appointment Reminders', status: 'Active', sent: 1248, template: 'Reminder Template', schedule: 'Daily at 9 AM' },
  { key: '2', title: 'Promotional Offers', status: 'Scheduled', sent: 0, template: 'Promo Template', schedule: 'Feb 1, 2025' },
];

function MarketingContent() {
  const params = useParams();
  const slug = params?.slug as string;

  const [couponModalOpen, setCouponModalOpen] = useState(false);
  const [campaignModalOpen, setCampaignModalOpen] = useState(false);
  const [loyaltyActive, setLoyaltyActive] = useState(true);
  const [campaignType, setCampaignType] = useState<'notification' | 'whatsapp'>('notification');
  const [couponForm] = Form.useForm();
  const [campaignForm] = Form.useForm();

  const gradientBtnStyle: React.CSSProperties = {
    background: 'linear-gradient(135deg, #8B5CF6, #EC4899)',
    border: 'none',
    borderRadius: 10,
    boxShadow: '0 4px 14px rgba(139,92,246,0.3)',
    color: '#fff',
    height: 40,
    fontWeight: 600,
    display: 'inline-flex',
    alignItems: 'center',
    gap: 6,
  };

  const couponColumns = [
    {
      title: 'Code', dataIndex: 'code', key: 'code',
      render: (code: string) => (
        <Space>
          <GiftOutlined style={{ color: '#8B5CF6', fontSize: 14 }} />
          <Text strong style={{ fontFamily: 'monospace', fontSize: 13 }}>{code}</Text>
        </Space>
      ),
    },
    {
      title: 'Discount', dataIndex: 'discount', key: 'discount',
      render: (val: string) => <Text style={{ color: '#059669', fontWeight: 600, fontSize: 13 }}>{val}</Text>,
    },
    {
      title: 'Type', dataIndex: 'type', key: 'type',
      render: (val: string) => <Tag style={{ borderRadius: 6, fontSize: 11 }}>{val}</Tag>,
    },
    {
      title: 'Min Order', dataIndex: 'minOrder', key: 'minOrder',
      render: (val: number) => <Text style={{ fontSize: 12 }}>₹{val.toLocaleString()}</Text>,
    },
    {
      title: 'Used/Max', key: 'usage',
      render: (_: any, record: typeof couponData[0]) => {
        const ratio = record.used / (record.max === Infinity ? record.used : record.max);
        const barColor = ratio > 0.8
          ? 'linear-gradient(90deg, #F59E0B, #EF4444)'
          : 'linear-gradient(90deg, #8B5CF6, #A855F7)';
        return (
          <Space size={8}>
            <div style={{ width: 64, height: 6, background: 'rgba(139,92,246,0.08)', borderRadius: 3, overflow: 'hidden' }}>
              <div style={{ width: `${Math.min(ratio * 100, 100)}%`, height: '100%', borderRadius: 3, background: barColor }} />
            </div>
            <Text style={{ fontSize: 12, fontWeight: 600 }}>
              {record.used}/{record.max === Infinity ? '∞' : record.max}
            </Text>
          </Space>
        );
      },
    },
    {
      title: 'Status', dataIndex: 'status', key: 'status',
      render: (status: string) => (
        <Tag color={status === 'Active' ? 'success' : 'default'} style={{ borderRadius: 6, fontSize: 11, fontWeight: 600 }}>
          <CheckCircleOutlined style={{ fontSize: 10, marginRight: 4 }} />
          {status}
        </Tag>
      ),
    },
    {
      title: 'Expiry', dataIndex: 'expiry', key: 'expiry',
      render: (val: string) => <Text style={{ fontSize: 12, color: 'var(--theme-text-secondary)' }}>{val}</Text>,
    },
    {
      title: '', key: 'actions', width: 100,
      render: () => (
        <Space size={4}>
          <Tooltip title="Edit"><Button type="text" size="small" icon={<EditOutlined />} style={{ color: '#8B5CF6' }} /></Tooltip>
          <Tooltip title="Duplicate"><Button type="text" size="small" icon={<CopyOutlined />} style={{ color: '#3B82F6' }} /></Tooltip>
          <Tooltip title="Delete"><Button type="text" size="small" icon={<DeleteOutlined />} style={{ color: '#EF4444' }} /></Tooltip>
          <Tooltip title="More"><Button type="text" size="small" icon={<MoreOutlined />} style={{ color: 'var(--theme-text-tertiary)' }} /></Tooltip>
        </Space>
      ),
    },
  ];

  return (
    <div>
      <div className="page-header-row">
        <div>
          <h1 className="page-header-title">Marketing Center</h1>
          <p className="page-header-subtitle">Grow your salon with campaigns, promotions, and outreach</p>
        </div>
        <Space>
          <Badge count={4} size="small" offset={[-5, 5]}>
            <Button icon={<BellOutlined />} style={{ borderRadius: 10, border: '1px solid var(--theme-border)' }}>Notifications</Button>
          </Badge>
          <Button icon={<BarChartOutlined />} style={{ borderRadius: 10, border: '1px solid var(--theme-border)' }}>
            Marketing Analytics
          </Button>
        </Space>
      </div>

      <Row gutter={[20, 20]} style={{ marginBottom: 24 }}>
        {kpis.map((kpi, i) => (
          <Col xs={24} sm={12} lg={6} key={i}>
            <div className="stat-widget" style={{ borderTop: `3px solid ${kpi.color}` }}>
              <div className="stat-widget-header">
                <div className="stat-widget-icon" style={{ background: `${kpi.color}12`, color: kpi.color }}>
                  {kpi.icon}
                </div>
                <Tag style={{ borderRadius: 6, margin: 0, fontSize: 10, border: 'none', background: `${kpi.color}10`, color: kpi.color }}>
                  +{8 + i * 3}% vs last month
                </Tag>
              </div>
              <div className="stat-widget-label">{kpi.label}</div>
              <div className="stat-widget-value">{kpi.value}</div>
            </div>
          </Col>
        ))}
      </Row>

      <Row gutter={[20, 20]} style={{ marginBottom: 24 }}>
        <Col xs={24} lg={16}>
          <Card
            className="premium-card"
            title={
              <Space>
                <GiftOutlined style={{ color: '#EC4899' }} />
                <Text strong style={{ fontSize: 15 }}>Coupons &amp; Promotions</Text>
              </Space>
            }
            extra={
              <Button
                type="primary"
                icon={<PlusOutlined />}
                style={gradientBtnStyle}
                onClick={() => setCouponModalOpen(true)}
              >
                Create Coupon
              </Button>
            }
          >
            <Table
              columns={couponColumns}
              dataSource={couponData}
              rowKey="key"
              pagination={false}
              size="small"
            />
          </Card>
        </Col>
        <Col xs={24} lg={8}>
          <Card
            className="premium-card"
            title={
              <Space>
                <StarOutlined style={{ color: '#F59E0B' }} />
                <Text strong style={{ fontSize: 15 }}>Loyalty Program</Text>
              </Space>
            }
            extra={
              <Space size={8}>
                <Text style={{ fontSize: 11, color: 'var(--theme-text-secondary)' }}>
                  {loyaltyActive ? 'Active' : 'Inactive'}
                </Text>
                <Switch
                  checked={loyaltyActive}
                  onChange={setLoyaltyActive}
                  style={{ background: loyaltyActive ? '#8B5CF6' : undefined }}
                  size="small"
                />
              </Space>
            }
          >
            <div style={{ textAlign: 'center', padding: '8px 0 12px' }}>
              <Progress
                type="circle"
                percent={loyaltyActive ? 100 : 0}
                size={64}
                strokeColor={{ '0%': '#8B5CF6', '100%': '#EC4899' }}
                trailColor="rgba(139,92,246,0.08)"
                format={() => loyaltyActive ? 'ON' : 'OFF'}
              />
              <div style={{ marginTop: 6 }}>
                <Text style={{ fontSize: 12, color: 'var(--theme-text-secondary)' }}>Program Status</Text>
              </div>
            </div>
            <Divider style={{ margin: '8px 0' }} />
            <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <Text style={{ fontSize: 12, color: 'var(--theme-text-secondary)' }}>Points System</Text>
                <Text strong style={{ fontSize: 13 }}>1 pt / ₹100</Text>
              </div>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <Text style={{ fontSize: 12, color: 'var(--theme-text-secondary)' }}>Redemption</Text>
                <Text strong style={{ fontSize: 13, color: '#059669' }}>100 pts = ₹500 off</Text>
              </div>
              <Divider style={{ margin: '4px 0' }} />
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <Space>
                  <TeamOutlined style={{ color: '#8B5CF6', fontSize: 14 }} />
                  <Text style={{ fontSize: 12, color: 'var(--theme-text-secondary)' }}>Enrolled Customers</Text>
                </Space>
                <Text strong style={{ fontSize: 22, color: '#8B5CF6' }}>328</Text>
              </div>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <Space>
                  <RiseOutlined style={{ color: '#10B981', fontSize: 14 }} />
                  <Text style={{ fontSize: 12, color: 'var(--theme-text-secondary)' }}>Points This Month</Text>
                </Space>
                <Text strong style={{ fontSize: 18, color: '#10B981' }}>12,450</Text>
              </div>
            </div>
          </Card>
        </Col>
      </Row>

      <Row gutter={[20, 20]} style={{ marginBottom: 24 }}>
        <Col xs={24} lg={12}>
          <Card
            className="premium-card"
            title={
              <Space>
                <BellOutlined style={{ color: '#3B82F6' }} />
                <Text strong style={{ fontSize: 15 }}>Push Notifications</Text>
              </Space>
            }
            extra={
              <Button
                type="primary"
                icon={<PlusOutlined />}
                style={{
                  ...gradientBtnStyle,
                  background: 'linear-gradient(135deg, #3B82F6, #06B6D4)',
                  boxShadow: '0 4px 14px rgba(59,130,246,0.3)',
                }}
                onClick={() => { setCampaignType('notification'); setCampaignModalOpen(true); }}
              >
                New Campaign
              </Button>
            }
          >
            <div style={{ display: 'flex', flexDirection: 'column' }}>
              {pushCampaigns.map((camp, i) => (
                <div key={camp.key} style={{
                  padding: '16px 0',
                  borderBottom: i < pushCampaigns.length - 1 ? '1px solid var(--theme-border-light)' : 'none',
                }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: 6 }}>
                    <Text strong style={{ fontSize: 13 }}>{camp.title}</Text>
                    <Tag
                      color={camp.status === 'Sent' ? 'success' : 'default'}
                      style={{ borderRadius: 6, fontSize: 10, fontWeight: 600, flexShrink: 0, margin: 0 }}
                    >
                      {camp.status === 'Draft' && <EditOutlined style={{ fontSize: 9, marginRight: 3 }} />}
                      {camp.status}
                    </Tag>
                  </div>
                  <Text style={{ fontSize: 12, color: 'var(--theme-text-secondary)', display: 'block', marginBottom: 8, lineHeight: 1.5 }}>
                    {camp.message}
                  </Text>
                  <div style={{ display: 'flex', alignItems: 'center', gap: 16, flexWrap: 'wrap' }}>
                    <Text style={{ fontSize: 11, color: 'var(--theme-text-tertiary)' }}>
                      Sent to: <Text strong style={{ color: 'var(--theme-text)', fontSize: 12 }}>{camp.sentTo.toLocaleString()}</Text>
                    </Text>
                    <Text style={{ fontSize: 11, color: 'var(--theme-text-tertiary)' }}>
                      Open rate: <Text strong style={{ color: '#10B981', fontSize: 12 }}>{camp.openRate}</Text>
                    </Text>
                    <Text style={{ fontSize: 11, color: 'var(--theme-text-tertiary)' }}>{camp.date}</Text>
                  </div>
                </div>
              ))}
            </div>
          </Card>
        </Col>
        <Col xs={24} lg={12}>
          <Card
            className="premium-card"
            title={
              <Space>
                <MessageOutlined style={{ color: '#25D366' }} />
                <Text strong style={{ fontSize: 15 }}>WhatsApp Campaigns</Text>
              </Space>
            }
            extra={
              <Button
                type="primary"
                icon={<PlusOutlined />}
                style={{
                  ...gradientBtnStyle,
                  background: 'linear-gradient(135deg, #25D366, #128C7E)',
                  boxShadow: '0 4px 14px rgba(37,211,102,0.3)',
                }}
                onClick={() => { setCampaignType('whatsapp'); setCampaignModalOpen(true); }}
              >
                New Campaign
              </Button>
            }
          >
            <div style={{ display: 'flex', flexDirection: 'column' }}>
              {whatsAppCampaigns.map((camp, i) => (
                <div key={camp.key} style={{
                  padding: '16px 0',
                  borderBottom: i < whatsAppCampaigns.length - 1 ? '1px solid var(--theme-border-light)' : 'none',
                }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: 10 }}>
                    <Space>
                      <div style={{
                        width: 28, height: 28, borderRadius: 8,
                        background: 'rgba(37,211,102,0.1)',
                        display: 'flex', alignItems: 'center', justifyContent: 'center',
                        color: '#25D366', fontSize: 14,
                      }}>
                        <MessageOutlined />
                      </div>
                      <Text strong style={{ fontSize: 13 }}>{camp.title}</Text>
                    </Space>
                    <Tag
                      color={camp.status === 'Active' ? 'success' : 'processing'}
                      style={{ borderRadius: 6, fontSize: 10, fontWeight: 600, flexShrink: 0, margin: 0 }}
                    >
                      {camp.status}
                    </Tag>
                  </div>
                  <Row gutter={16} style={{ marginBottom: 8 }}>
                    <Col span={12}>
                      <Text style={{ fontSize: 11, color: 'var(--theme-text-tertiary)', display: 'block', marginBottom: 4 }}>Template</Text>
                      <Tag style={{ borderRadius: 6, fontSize: 11, border: '1px solid var(--theme-border-light)', background: 'rgba(37,211,102,0.04)' }}>
                        {camp.template}
                      </Tag>
                    </Col>
                    <Col span={12}>
                      <Text style={{ fontSize: 11, color: 'var(--theme-text-tertiary)', display: 'block', marginBottom: 4 }}>Schedule</Text>
                      <Text style={{ fontSize: 12, fontWeight: 500 }}>{camp.schedule}</Text>
                    </Col>
                  </Row>
                  <div style={{ display: 'flex', alignItems: 'center', gap: 16 }}>
                    <Text style={{ fontSize: 11, color: 'var(--theme-text-tertiary)' }}>
                      Sent: <Text strong style={{ color: 'var(--theme-text)', fontSize: 12 }}>{camp.sent.toLocaleString()}</Text>
                    </Text>
                    <Button type="link" size="small" style={{ fontSize: 11, padding: 0, height: 'auto', color: '#8B5CF6' }}>
                      View Details <RightOutlined style={{ fontSize: 10 }} />
                    </Button>
                  </div>
                </div>
              ))}
            </div>
          </Card>
        </Col>
      </Row>

      <Modal
        title={
          <Space>
            <GiftOutlined style={{ color: '#EC4899' }} />
            <Text strong style={{ fontSize: 16 }}>Create Coupon</Text>
          </Space>
        }
        open={couponModalOpen}
        onCancel={() => { setCouponModalOpen(false); couponForm.resetFields(); }}
        footer={null}
        width={520}
        destroyOnClose
        styles={{ body: { paddingTop: 16 } }}
      >
        <Form
          form={couponForm}
          layout="vertical"
          onFinish={(values) => {
            console.log('Coupon created:', values);
            setCouponModalOpen(false);
            couponForm.resetFields();
          }}
        >
          <Row gutter={16}>
            <Col span={12}>
              <Form.Item label="Coupon Code" name="code" rules={[{ required: true, message: 'Enter coupon code' }]}>
                <Input placeholder="e.g. WELCOME20" style={{ borderRadius: 8, textTransform: 'uppercase', fontFamily: 'monospace' }} />
              </Form.Item>
            </Col>
            <Col span={12}>
              <Form.Item label="Discount Type" name="discountType" initialValue="percent">
                <Select
                  style={{ borderRadius: 8 }}
                  options={[
                    { value: 'percent', label: 'Percentage (%)' },
                    { value: 'flat', label: 'Flat (₹)' },
                  ]}
                />
              </Form.Item>
            </Col>
          </Row>
          <Row gutter={16}>
            <Col span={12}>
              <Form.Item label="Discount Value" name="discountValue" rules={[{ required: true, message: 'Enter value' }]}>
                <InputNumber style={{ width: '100%', borderRadius: 8 }} min={1} placeholder="e.g. 20" />
              </Form.Item>
            </Col>
            <Col span={12}>
              <Form.Item label="Min Order (₹)" name="minOrder">
                <InputNumber style={{ width: '100%', borderRadius: 8 }} min={0} placeholder="e.g. 500" />
              </Form.Item>
            </Col>
          </Row>
          <Row gutter={16}>
            <Col span={12}>
              <Form.Item label="Max Uses" name="maxUses">
                <InputNumber style={{ width: '100%', borderRadius: 8 }} min={0} placeholder="0 = Unlimited" />
              </Form.Item>
            </Col>
            <Col span={12}>
              <Form.Item label="Expiry Date" name="expiryDate">
                <DatePicker style={{ width: '100%', borderRadius: 8 }} />
              </Form.Item>
            </Col>
          </Row>
          <Form.Item label="Status" name="status" initialValue="Active">
            <Select
              style={{ borderRadius: 8 }}
              options={[
                { value: 'Active', label: 'Active' },
                { value: 'Inactive', label: 'Inactive' },
              ]}
            />
          </Form.Item>
          <Form.Item style={{ marginBottom: 0, textAlign: 'right' }}>
            <Space>
              <Button style={{ borderRadius: 10, height: 40 }} onClick={() => { setCouponModalOpen(false); couponForm.resetFields(); }}>
                Cancel
              </Button>
              <Button type="primary" htmlType="submit" style={gradientBtnStyle}>
                <CheckCircleOutlined /> Create Coupon
              </Button>
            </Space>
          </Form.Item>
        </Form>
      </Modal>

      <Modal
        title={
          <Space>
            {campaignType === 'notification'
              ? <BellOutlined style={{ color: '#3B82F6' }} />
              : <MessageOutlined style={{ color: '#25D366' }} />
            }
            <Text strong style={{ fontSize: 16 }}>
              New {campaignType === 'notification' ? 'Push Notification' : 'WhatsApp'} Campaign
            </Text>
          </Space>
        }
        open={campaignModalOpen}
        onCancel={() => { setCampaignModalOpen(false); campaignForm.resetFields(); }}
        footer={null}
        width={520}
        destroyOnClose
        styles={{ body: { paddingTop: 16 } }}
      >
        <Form
          form={campaignForm}
          layout="vertical"
          onFinish={(values) => {
            console.log('Campaign created:', values);
            setCampaignModalOpen(false);
            campaignForm.resetFields();
          }}
        >
          <Form.Item label="Campaign Type" name="type">
            <Select
              style={{ borderRadius: 8 }}
              defaultValue={campaignType}
              onChange={(val) => setCampaignType(val)}
              options={[
                { value: 'notification', label: 'Push Notification' },
                { value: 'whatsapp', label: 'WhatsApp Message' },
              ]}
            />
          </Form.Item>
          <Form.Item label="Campaign Title" name="title" rules={[{ required: true, message: 'Enter campaign title' }]}>
            <Input placeholder="e.g. Weekend Special Offer" style={{ borderRadius: 8 }} />
          </Form.Item>
          <Form.Item label="Message" name="message" rules={[{ required: true, message: 'Enter message' }]}>
            <Input.TextArea rows={4} placeholder="Type your message here..." style={{ borderRadius: 8, resize: 'none' }} />
          </Form.Item>
          <Row gutter={16}>
            <Col span={12}>
              <Form.Item label="Schedule" name="schedule" initialValue="now">
                <Select
                  style={{ borderRadius: 8 }}
                  options={[
                    { value: 'now', label: 'Send Now' },
                    { value: 'scheduled', label: 'Schedule Later' },
                  ]}
                />
              </Form.Item>
            </Col>
            <Col span={12}>
              <Form.Item label="Target Audience" name="audience" initialValue="all">
                <Select
                  style={{ borderRadius: 8 }}
                  options={[
                    { value: 'all', label: 'All Customers' },
                    { value: 'vip', label: 'VIP Only' },
                    { value: 'new', label: 'New Customers' },
                    { value: 'returning', label: 'Returning Customers' },
                  ]}
                />
              </Form.Item>
            </Col>
          </Row>
          <Form.Item style={{ marginBottom: 0, textAlign: 'right' }}>
            <Space>
              <Button style={{ borderRadius: 10, height: 40 }} onClick={() => { setCampaignModalOpen(false); campaignForm.resetFields(); }}>
                Cancel
              </Button>
              <Button
                type="primary"
                htmlType="submit"
                icon={<SendOutlined />}
                style={{
                  ...gradientBtnStyle,
                  background: campaignType === 'notification'
                    ? 'linear-gradient(135deg, #3B82F6, #06B6D4)'
                    : 'linear-gradient(135deg, #25D366, #128C7E)',
                  boxShadow: campaignType === 'notification'
                    ? '0 4px 14px rgba(59,130,246,0.3)'
                    : '0 4px 14px rgba(37,211,102,0.3)',
                }}
              >
                Send Campaign
              </Button>
            </Space>
          </Form.Item>
        </Form>
      </Modal>
    </div>
  );
}

export default function MarketingPage() {
  return (
    <OwnerLayout>
      <MarketingContent />
    </OwnerLayout>
  );
}

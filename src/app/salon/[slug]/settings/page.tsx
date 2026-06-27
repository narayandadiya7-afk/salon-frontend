'use client';

import React, { useState } from 'react';
import {
  Row, Col, Card, Tag, Button, Space, Input, Select, Switch,
  Form, Typography, Divider, Tooltip, Tabs, Upload, TimePicker,
  InputNumber, ColorPicker, message,
} from 'antd';
import type { TimePickerProps } from 'antd';
import {
  SettingOutlined, SaveOutlined, GlobalOutlined, ClockCircleOutlined,
  DollarOutlined, PictureOutlined, LinkOutlined,
  InstagramOutlined, FacebookOutlined, TwitterOutlined, YoutubeOutlined,
  MailOutlined, PhoneOutlined, EnvironmentOutlined, EditOutlined, CheckCircleOutlined,
} from '@ant-design/icons';
import OwnerLayout from '../../../../components/layout/OwnerLayout';
import dayjs from 'dayjs';

const { Text } = Typography;

interface DaySchedule {
  enabled: boolean;
  open: dayjs.Dayjs;
  close: dayjs.Dayjs;
}

interface WorkingHours {
  monday: DaySchedule;
  tuesday: DaySchedule;
  wednesday: DaySchedule;
  thursday: DaySchedule;
  friday: DaySchedule;
  saturday: DaySchedule;
  sunday: DaySchedule;
}

const defaultOpen = dayjs('09:00', 'HH:mm');
const defaultClose = dayjs('19:00', 'HH:mm');

const defaultWorkingHours: WorkingHours = {
  monday: { enabled: true, open: defaultOpen, close: defaultClose },
  tuesday: { enabled: true, open: defaultOpen, close: defaultClose },
  wednesday: { enabled: true, open: defaultOpen, close: defaultClose },
  thursday: { enabled: true, open: defaultOpen, close: defaultClose },
  friday: { enabled: true, open: defaultOpen, close: defaultClose },
  saturday: { enabled: true, open: defaultOpen, close: defaultClose },
  sunday: { enabled: false, open: dayjs('10:00', 'HH:mm'), close: dayjs('16:00', 'HH:mm') },
};

const weekDays: { key: keyof WorkingHours; label: string }[] = [
  { key: 'monday', label: 'Monday' },
  { key: 'tuesday', label: 'Tuesday' },
  { key: 'wednesday', label: 'Wednesday' },
  { key: 'thursday', label: 'Thursday' },
  { key: 'friday', label: 'Friday' },
  { key: 'saturday', label: 'Saturday' },
  { key: 'sunday', label: 'Sunday' },
];

function SettingsContent() {
  const [activeTab, setActiveTab] = useState('general');

  const [general, setGeneral] = useState({
    name: 'Luxe Salon & Spa',
    phone: '+1 555-0123',
    email: 'hello@luxesalon.com',
    address: '123 Luxury Lane',
    city: 'Beverly Hills',
    state: 'California',
    zip: '90210',
    country: 'United States',
    timezone: 'America/Los_Angeles',
    currency: 'USD',
  });

  const [workingHours, setWorkingHours] = useState<WorkingHours>(defaultWorkingHours);

  const [tax, setTax] = useState({
    name: 'GST',
    rate: 8,
    number: 'GSTIN-29ABCDE1234F1Z5',
    inclusive: false,
  });

  const [branding, setBranding] = useState({
    salonColor: '#7C1D3E',
    accentColor: '#C9953F',
    websiteUrl: 'https://luxesalon.com',
    logo: null as string | null,
  });

  const [social, setSocial] = useState({
    instagram: 'https://instagram.com/luxesalon',
    facebook: 'https://facebook.com/luxesalon',
    twitter: 'https://twitter.com/luxesalon',
    youtube: 'https://youtube.com/@luxesalon',
    whatsapp: '+1 555-0123',
  });

  const handleSave = () => {
    message.success({
      content: 'Settings saved successfully!',
      icon: <CheckCircleOutlined style={{ color: '#52c41a' }} />,
      style: { borderRadius: 10 },
    });
  };

  const updateGeneral = (key: string, value: string) =>
    setGeneral(prev => ({ ...prev, [key]: value }));

  const updateDay = (day: keyof WorkingHours, field: keyof DaySchedule, value: any) =>
    setWorkingHours(prev => ({ ...prev, [day]: { ...prev[day], [field]: value } }));

  const timePickerProps: TimePickerProps = {
    format: 'HH:mm',
    minuteStep: 15,
    size: 'middle',
    style: { width: 120, borderRadius: 10 },
    popupStyle: { borderRadius: 12 },
  };

  const fieldLabel = (label: string) => (
    <Text style={{ fontSize: 13, fontWeight: 600, display: 'block', marginBottom: 6 }}>
      {label}
    </Text>
  );

  const gradientBtn = (
    <Button
      type="primary"
      icon={<SaveOutlined />}
      onClick={handleSave}
      style={{
        borderRadius: 10, height: 42,
        background: 'linear-gradient(135deg, #7C1D3E, #C9953F)',
        border: 'none',
        boxShadow: '0 4px 14px rgba(124,29,62,0.3)',
        paddingInline: 24,
      }}
    >
      Save Changes
    </Button>
  );

  const renderSection = (title: string, icon: React.ReactNode, children: React.ReactNode) => (
    <Card
      className="premium-card"
      style={{ marginBottom: 24 }}
      title={
        <Space>
          <span style={{ color: '#7C1D3E', fontSize: 16 }}>{icon}</span>
          <span>{title}</span>
        </Space>
      }
    >
      {children}
    </Card>
  );

  const generalTab = (
    <div>
      {renderSection('Salon Information', <SettingOutlined />, (
        <Row gutter={[24, 0]}>
          <Col xs={24} md={12}>
            {fieldLabel('Salon Name')}
            <Input
              value={general.name}
              onChange={e => updateGeneral('name', e.target.value)}
              style={{ borderRadius: 10, height: 42, marginBottom: 20 }}
            />
          </Col>
          <Col xs={24} md={12}>
            {fieldLabel('Salon Phone')}
            <Input
              prefix={<PhoneOutlined style={{ color: 'var(--theme-text-tertiary)' }} />}
              value={general.phone}
              onChange={e => updateGeneral('phone', e.target.value)}
              style={{ borderRadius: 10, height: 42, marginBottom: 20 }}
            />
          </Col>
          <Col xs={24} md={12}>
            {fieldLabel('Salon Email')}
            <Input
              prefix={<MailOutlined style={{ color: 'var(--theme-text-tertiary)' }} />}
              value={general.email}
              onChange={e => updateGeneral('email', e.target.value)}
              style={{ borderRadius: 10, height: 42, marginBottom: 20 }}
            />
          </Col>
          <Col xs={24} md={12}>
            {fieldLabel('Address')}
            <Input
              prefix={<EnvironmentOutlined style={{ color: 'var(--theme-text-tertiary)' }} />}
              value={general.address}
              onChange={e => updateGeneral('address', e.target.value)}
              style={{ borderRadius: 10, height: 42, marginBottom: 20 }}
            />
          </Col>
          <Col xs={24} md={8}>
            {fieldLabel('City')}
            <Input
              value={general.city}
              onChange={e => updateGeneral('city', e.target.value)}
              style={{ borderRadius: 10, height: 42, marginBottom: 20 }}
            />
          </Col>
          <Col xs={24} md={8}>
            {fieldLabel('State')}
            <Input
              value={general.state}
              onChange={e => updateGeneral('state', e.target.value)}
              style={{ borderRadius: 10, height: 42, marginBottom: 20 }}
            />
          </Col>
          <Col xs={24} md={8}>
            {fieldLabel('Zip Code')}
            <Input
              value={general.zip}
              onChange={e => updateGeneral('zip', e.target.value)}
              style={{ borderRadius: 10, height: 42, marginBottom: 20 }}
            />
          </Col>
          <Col xs={24} md={8}>
            {fieldLabel('Country')}
            <Select
              value={general.country}
              onChange={v => updateGeneral('country', v)}
              style={{ width: '100%', borderRadius: 10, marginBottom: 20 }}
              options={[{ value: 'United States', label: 'United States' }, { value: 'Canada', label: 'Canada' }, { value: 'United Kingdom', label: 'United Kingdom' }]}
            />
          </Col>
          <Col xs={24} md={8}>
            {fieldLabel('Timezone')}
            <Select
              value={general.timezone}
              onChange={v => updateGeneral('timezone', v)}
              style={{ width: '100%', borderRadius: 10, marginBottom: 20 }}
              options={[
                { value: 'America/Los_Angeles', label: 'America/Los_Angeles (PST)' },
                { value: 'America/New_York', label: 'America/New_York (EST)' },
                { value: 'America/Chicago', label: 'America/Chicago (CST)' },
                { value: 'Europe/London', label: 'Europe/London (GMT)' },
              ]}
            />
          </Col>
          <Col xs={24} md={8}>
            {fieldLabel('Currency')}
            <Select
              value={general.currency}
              onChange={v => updateGeneral('currency', v)}
              style={{ width: '100%', borderRadius: 10, marginBottom: 20 }}
              options={[
                { value: 'USD', label: 'USD ($)' },
                { value: 'CAD', label: 'CAD (C$)' },
                { value: 'GBP', label: 'GBP (£)' },
                { value: 'EUR', label: 'EUR (€)' },
              ]}
            />
          </Col>
        </Row>
      ))}
      <div style={{ display: 'flex', justifyContent: 'flex-end' }}>
        {gradientBtn}
      </div>
    </div>
  );

  const workingHoursTab = (
    <div>
      {renderSection('Weekly Schedule', <ClockCircleOutlined />, (
        <div style={{ display: 'flex', flexDirection: 'column', gap: 4 }}>
          {weekDays.map(day => {
            const d = workingHours[day.key];
            return (
              <div
                key={day.key}
                style={{
                  display: 'flex', alignItems: 'center', gap: 16,
                  padding: '12px 16px', borderRadius: 12,
                  background: d.enabled ? 'rgba(124,29,62,0.03)' : 'transparent',
                  border: `1px solid ${d.enabled ? 'rgba(124,29,62,0.08)' : 'var(--theme-border-light)'}`,
                  transition: 'all 0.2s ease', marginBottom: 8,
                }}
              >
                <div style={{ width: 100, flexShrink: 0 }}>
                  <Text strong style={{ fontSize: 14, color: d.enabled ? 'var(--theme-text)' : 'var(--theme-text-tertiary)' }}>
                    {day.label}
                  </Text>
                </div>

                <Switch
                  checked={d.enabled}
                  onChange={v => updateDay(day.key, 'enabled', v)}
                  style={{
                    background: d.enabled ? 'linear-gradient(135deg, #7C1D3E, #C9953F)' : undefined,
                  }}
                />

                <Space style={{ opacity: d.enabled ? 1 : 0.4, pointerEvents: d.enabled ? 'auto' : 'none', transition: 'opacity 0.2s' }}>
                  <TimePicker
                    {...timePickerProps}
                    value={d.open}
                    onChange={v => updateDay(day.key, 'open', v)}
                    disabled={!d.enabled}
                  />
                  <Text style={{ color: 'var(--theme-text-tertiary)' }}>to</Text>
                  <TimePicker
                    {...timePickerProps}
                    value={d.close}
                    onChange={v => updateDay(day.key, 'close', v)}
                    disabled={!d.enabled}
                  />
                </Space>

                {d.enabled && (
                  <Tag style={{ margin: 0, borderRadius: 6, fontSize: 11, border: 'none', background: 'rgba(16,185,129,0.08)', color: '#10B981' }}>
                    <CheckCircleOutlined /> Active
                  </Tag>
                )}
              </div>
            );
          })}
        </div>
      ))}
      <div style={{ display: 'flex', justifyContent: 'flex-end' }}>
        {gradientBtn}
      </div>
    </div>
  );

  const taxTab = (
    <div>
      {renderSection('Tax Configuration', <DollarOutlined />, (
        <Row gutter={[24, 0]}>
          <Col xs={24} md={12}>
            {fieldLabel('Tax Name')}
            <Input
              value={tax.name}
              onChange={e => setTax(prev => ({ ...prev, name: e.target.value }))}
              placeholder="e.g. GST, VAT, Sales Tax"
              style={{ borderRadius: 10, height: 42, marginBottom: 20 }}
            />
          </Col>
          <Col xs={24} md={12}>
            {fieldLabel('Tax Rate (%)')}
            <InputNumber
              value={tax.rate}
              onChange={v => setTax(prev => ({ ...prev, rate: v || 0 }))}
              min={0}
              max={100}
              style={{ width: '100%', borderRadius: 10, height: 42 }}
              formatter={value => `${value}%`}
              parser={value => parseFloat(value?.replace('%', '') || '0')}
            />
          </Col>
          <Col xs={24} md={12}>
            {fieldLabel('Tax Number / Registration ID')}
            <Input
              value={tax.number}
              onChange={e => setTax(prev => ({ ...prev, number: e.target.value }))}
              style={{ borderRadius: 10, height: 42, marginBottom: 20 }}
            />
          </Col>
          <Col xs={24} md={12}>
            <div style={{ display: 'flex', alignItems: 'center', gap: 12, marginTop: 28 }}>
              <Switch
                checked={tax.inclusive}
                onChange={v => setTax(prev => ({ ...prev, inclusive: v }))}
                style={{ background: tax.inclusive ? 'linear-gradient(135deg, #7C1D3E, #C9953F)' : undefined }}
              />
              <div>
                <Text style={{ fontSize: 13, fontWeight: 600, display: 'block' }}>Tax Inclusive Pricing</Text>
                <Text style={{ fontSize: 12, color: 'var(--theme-text-tertiary)' }}>
                  Prices displayed include tax
                </Text>
              </div>
            </div>
          </Col>
        </Row>
      ))}
      <div style={{ display: 'flex', justifyContent: 'flex-end' }}>
        {gradientBtn}
      </div>
    </div>
  );

  const brandingTab = (
    <div>
      {renderSection('Branding', <PictureOutlined />, (
        <Row gutter={[24, 0]}>
          <Col xs={24} md={12}>
            {fieldLabel('Salon Logo')}
            <Upload.Dragger
              name="logo"
              showUploadList={false}
              style={{
                borderRadius: 12, border: '2px dashed var(--theme-border-light)',
                background: 'var(--theme-background)', padding: 24,
              }}
            >
              <div style={{ textAlign: 'center' }}>
                <PictureOutlined style={{ fontSize: 36, color: 'var(--theme-text-tertiary)' }} />
                <div style={{ marginTop: 8 }}>
                  <Text style={{ color: '#7C1D3E', fontWeight: 600 }}>Click or drag</Text>
                  <Text style={{ color: 'var(--theme-text-tertiary)' }}> to upload logo</Text>
                </div>
                <Text style={{ fontSize: 11, color: 'var(--theme-text-tertiary)' }}>
                  PNG, JPG up to 2MB
                </Text>
              </div>
            </Upload.Dragger>
          </Col>
          <Col xs={24} md={12}>
            <div style={{ marginBottom: 20 }}>
              {fieldLabel('Salon Primary Color')}
              <Space>
                <ColorPicker
                  value={branding.salonColor}
                  onChange={c => setBranding(prev => ({ ...prev, salonColor: c.toHexString() }))}
                  style={{ borderRadius: 10 }}
                />
                <Input
                  value={branding.salonColor}
                  onChange={e => setBranding(prev => ({ ...prev, salonColor: e.target.value }))}
                  style={{ width: 120, borderRadius: 10, height: 42 }}
                />
                <div style={{
                  width: 32, height: 32, borderRadius: 8,
                  background: branding.salonColor,
                  border: '2px solid var(--theme-border-light)',
                  flexShrink: 0,
                }} />
              </Space>
            </div>
            <div style={{ marginBottom: 20 }}>
              {fieldLabel('Accent Color')}
              <Space>
                <ColorPicker
                  value={branding.accentColor}
                  onChange={c => setBranding(prev => ({ ...prev, accentColor: c.toHexString() }))}
                  style={{ borderRadius: 10 }}
                />
                <Input
                  value={branding.accentColor}
                  onChange={e => setBranding(prev => ({ ...prev, accentColor: e.target.value }))}
                  style={{ width: 120, borderRadius: 10, height: 42 }}
                />
                <div style={{
                  width: 32, height: 32, borderRadius: 8,
                  background: branding.accentColor,
                  border: '2px solid var(--theme-border-light)',
                  flexShrink: 0,
                }} />
              </Space>
            </div>
            {fieldLabel('Website URL')}
            <Input
              prefix={<GlobalOutlined style={{ color: 'var(--theme-text-tertiary)' }} />}
              value={branding.websiteUrl}
              onChange={e => setBranding(prev => ({ ...prev, websiteUrl: e.target.value }))}
              style={{ borderRadius: 10, height: 42 }}
            />
          </Col>
        </Row>
      ))}
      <div style={{ display: 'flex', justifyContent: 'flex-end' }}>
        {gradientBtn}
      </div>
    </div>
  );

  const socialTab = (
    <div>
      {renderSection('Social Media Links', <LinkOutlined />, (
        <Row gutter={[24, 16]}>
          <Col xs={24} md={12}>
            {fieldLabel('Instagram')}
            <Input
              prefix={<InstagramOutlined style={{ color: '#E4405F', fontSize: 16 }} />}
              value={social.instagram}
              onChange={e => setSocial(prev => ({ ...prev, instagram: e.target.value }))}
              style={{ borderRadius: 10, height: 42 }}
              placeholder="https://instagram.com/..."
            />
          </Col>
          <Col xs={24} md={12}>
            {fieldLabel('Facebook')}
            <Input
              prefix={<FacebookOutlined style={{ color: '#1877F2', fontSize: 16 }} />}
              value={social.facebook}
              onChange={e => setSocial(prev => ({ ...prev, facebook: e.target.value }))}
              style={{ borderRadius: 10, height: 42 }}
              placeholder="https://facebook.com/..."
            />
          </Col>
          <Col xs={24} md={12}>
            {fieldLabel('Twitter / X')}
            <Input
              prefix={<TwitterOutlined style={{ color: '#1DA1F2', fontSize: 16 }} />}
              value={social.twitter}
              onChange={e => setSocial(prev => ({ ...prev, twitter: e.target.value }))}
              style={{ borderRadius: 10, height: 42 }}
              placeholder="https://twitter.com/..."
            />
          </Col>
          <Col xs={24} md={12}>
            {fieldLabel('YouTube')}
            <Input
              prefix={<YoutubeOutlined style={{ color: '#FF0000', fontSize: 16 }} />}
              value={social.youtube}
              onChange={e => setSocial(prev => ({ ...prev, youtube: e.target.value }))}
              style={{ borderRadius: 10, height: 42 }}
              placeholder="https://youtube.com/@..."
            />
          </Col>
          <Col xs={24} md={12}>
            {fieldLabel('WhatsApp Number')}
            <Input
              prefix={<PhoneOutlined style={{ color: '#25D366', fontSize: 16 }} />}
              value={social.whatsapp}
              onChange={e => setSocial(prev => ({ ...prev, whatsapp: e.target.value }))}
              style={{ borderRadius: 10, height: 42 }}
              placeholder="+1 555-0123"
            />
          </Col>
        </Row>
      ))}
      <div style={{ display: 'flex', justifyContent: 'flex-end' }}>
        {gradientBtn}
      </div>
    </div>
  );

  return (
    <div>
      <div className="page-header-row">
        <div>
          <h1 className="page-header-title">
            <Space>
              <SettingOutlined style={{ color: '#7C1D3E' }} />
              <span>Settings</span>
            </Space>
          </h1>
          <p className="page-header-subtitle">Manage your salon configuration and preferences</p>
        </div>
      </div>

      <Tabs
        activeKey={activeTab}
        onChange={setActiveTab}
        type="card"
        style={{ marginBottom: 0 }}
        items={[
          {
            key: 'general',
            label: (
              <Space size={6}>
                <GlobalOutlined />
                <span>General</span>
              </Space>
            ),
            children: generalTab,
          },
          {
            key: 'hours',
            label: (
              <Space size={6}>
                <ClockCircleOutlined />
                <span>Working Hours</span>
              </Space>
            ),
            children: workingHoursTab,
          },
          {
            key: 'tax',
            label: (
              <Space size={6}>
                <DollarOutlined />
                <span>Tax Settings</span>
              </Space>
            ),
            children: taxTab,
          },
          {
            key: 'branding',
            label: (
              <Space size={6}>
                <PictureOutlined />
                <span>Branding</span>
              </Space>
            ),
            children: brandingTab,
          },
          {
            key: 'social',
            label: (
              <Space size={6}>
                <LinkOutlined />
                <span>Social Media</span>
              </Space>
            ),
            children: socialTab,
          },
        ]}
      />
    </div>
  );
}

export default function SettingsPage() {
  return (
    <OwnerLayout>
      <SettingsContent />
    </OwnerLayout>
  );
}

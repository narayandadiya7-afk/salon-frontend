'use client';

import React, { useState } from 'react';
import {
  Row, Col, Card, Tag, Typography, Button, Space, Avatar, Input, Select, Switch,
  Modal, Table, Divider, Tooltip, Badge, Progress, Rate,
} from 'antd';
import type { SelectProps } from 'antd';
import {
  ScissorOutlined, PlusOutlined, SearchOutlined, FilterOutlined, MoreOutlined,
  ClockCircleOutlined, DollarOutlined, EditOutlined, DeleteOutlined,
  FolderOutlined, TagOutlined, RightOutlined, StarOutlined,
} from '@ant-design/icons';
import OwnerLayout from '@/components/layout/OwnerLayout';
import PillFilter from '@/components/pill-filter';

const { Text } = Typography;

interface Service {
  id: number;
  name: string;
  category: string;
  duration: number;
  price: number;
  description: string;
  bookings: number;
  rating: number;
  active: boolean;
  icon: string;
  color: string;
}

const servicesData: Service[] = [
  { id: 1, name: 'Haircut & Styling', category: 'Hair', duration: 45, price: 1500, description: 'Professional haircut and blow-dry styling tailored to your preference', bookings: 128, rating: 4.8, active: true, icon: '✂', color: '#7C1D3E' },
  { id: 2, name: 'Facial Treatment', category: 'Skin', duration: 60, price: 2200, description: 'Deep cleansing facial with exfoliation, extraction, and hydration mask', bookings: 94, rating: 4.7, active: true, icon: '💆', color: '#C9953F' },
  { id: 3, name: 'Manicure & Pedicure', category: 'Nails', duration: 45, price: 1800, description: 'Luxury nail care including shaping, cuticle work, and polish application', bookings: 76, rating: 4.6, active: true, icon: '💅', color: '#4A2D5E' },
  { id: 4, name: 'Hair Coloring', category: 'Hair', duration: 120, price: 3500, description: 'Full hair color application with premium products and toning treatment', bookings: 62, rating: 4.9, active: true, icon: '🎨', color: '#1A5C5C' },
  { id: 5, name: 'Massage Therapy', category: 'Massage', duration: 60, price: 2500, description: 'Swedish deep tissue massage to relieve tension and improve circulation', bookings: 48, rating: 4.8, active: true, icon: '🧘', color: '#8B6F47' },
  { id: 6, name: 'Bridal Makeup', category: 'Makeup', duration: 90, price: 5000, description: 'Complete bridal makeup package with trial session and touch-up kit', bookings: 36, rating: 4.9, active: true, icon: '💄', color: '#5C3A4A' },
  { id: 7, name: 'Hair Treatment', category: 'Hair', duration: 45, price: 2000, description: 'Deep conditioning keratin treatment for damaged and frizzy hair', bookings: 42, rating: 4.5, active: false, icon: '✨', color: '#2D5E3A' },
  { id: 8, name: 'Body Polish', category: 'Skin', duration: 75, price: 3000, description: 'Full body exfoliation scrub followed by moisturizing wrap treatment', bookings: 28, rating: 4.7, active: true, icon: '🌸', color: '#5C3A1E' },
  { id: 9, name: 'Gel Nails', category: 'Nails', duration: 60, price: 1200, description: 'Long-lasting gel nail application with your choice of color and design', bookings: 54, rating: 4.5, active: true, icon: '💎', color: '#7C1D3E' },
];

const categories = [
  { key: 'all', label: 'All', count: 9 },
  { key: 'Hair', label: 'Hair', count: 3 },
  { key: 'Skin', label: 'Skin', count: 2 },
  { key: 'Nails', label: 'Nails', count: 2 },
  { key: 'Massage', label: 'Massage', count: 1 },
  { key: 'Makeup', label: 'Makeup', count: 1 },
];

const dummyFormState = { name: '', category: 'Hair', duration: 30, price: 0, description: '', active: true };

function ServicesContent() {
  const [searchQuery, setSearchQuery] = useState('');
  const [activeCategory, setActiveCategory] = useState('all');
  const [services, setServices] = useState<Service[]>(servicesData);
  const [modalOpen, setModalOpen] = useState(false);
  const [formData, setFormData] = useState(dummyFormState);

  const filteredServices = services.filter(s => {
    const matchesSearch = s.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      s.description.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCategory = activeCategory === 'all' || s.category === activeCategory;
    return matchesSearch && matchesCategory;
  });

  const totalBookings = services.reduce((sum, s) => sum + s.bookings, 0);
  const avgRating = services.reduce((sum, s) => sum + s.rating, 0) / services.length;
  const activeServices = services.filter(s => s.active).length;
  const avgPrice = Math.round(services.reduce((sum, s) => sum + s.price, 0) / services.length);

  const toggleStatus = (id: number) => {
    setServices(prev => prev.map(s => s.id === id ? { ...s, active: !s.active } : s));
  };

  const deleteService = (id: number) => {
    setServices(prev => prev.filter(s => s.id !== id));
  };

  const handleAddService = () => {
    const newService: Service = {
      id: services.length + 1,
      name: formData.name,
      category: formData.category,
      duration: formData.duration,
      price: formData.price,
      description: formData.description,
      bookings: 0,
      rating: 0,
      active: formData.active,
      icon: '✨',
      color: '#7C1D3E',
    };
    setServices(prev => [...prev, newService]);
    setModalOpen(false);
    setFormData(dummyFormState);
  };

  return (
    <div>
      {/* Page Header */}
      <div className="page-header-row">
        <div>
          <h1 className="page-header-title">Services & Pricing</h1>
          <p className="page-header-subtitle">Manage your service menu, pricing, and categories</p>
        </div>
        <Space wrap>
          <Input
            placeholder="Search services..."
            prefix={<SearchOutlined style={{ color: 'var(--theme-text-tertiary)' }} />}
            value={searchQuery}
            onChange={e => setSearchQuery(e.target.value)}
            style={{ width: 240, borderRadius: 10, border: '1px solid var(--theme-border-light)', background: 'var(--theme-surface)' }}
          />
          <Button icon={<FolderOutlined />} style={{ borderRadius: 10, border: '1px solid var(--theme-border-light)' }}>
            Categories
          </Button>
          <Button
            type="primary"
            icon={<PlusOutlined />}
            onClick={() => setModalOpen(true)}
            style={{
              borderRadius: 10,
              background: 'linear-gradient(135deg, #7C1D3E, #C9953F)',
              border: 'none',
              boxShadow: '0 4px 14px rgba(124,29,62,0.3)',
            }}
          >
            Add Service
          </Button>
        </Space>
      </div>

      {/* KPI Row */}
      <Row gutter={[20, 20]} style={{ marginBottom: 24 }}>
        <Col xs={12} lg={6}>
          <div className="stat-widget stat-widget-revenue">
            <div className="stat-widget-header">
              <div className="stat-widget-icon stat-widget-icon-revenue"><ScissorOutlined /></div>
              <Tag style={{ borderRadius: 6, margin: 0, fontSize: 11, border: 'none', background: 'rgba(124,29,62,0.08)', color: '#7C1D3E' }}>Active</Tag>
            </div>
            <div className="stat-widget-label">Active Services</div>
            <div className="stat-widget-value">{activeServices}</div>
            <div className="stat-widget-trend stat-widget-trend-up">
              <TagOutlined /> {services.length - activeServices} inactive
            </div>
          </div>
        </Col>
        <Col xs={12} lg={6}>
          <div className="stat-widget stat-widget-bookings">
            <div className="stat-widget-header">
              <div className="stat-widget-icon stat-widget-icon-bookings"><DollarOutlined /></div>
              <Tag style={{ borderRadius: 6, margin: 0, fontSize: 11, border: 'none', background: 'rgba(124,29,62,0.08)', color: '#7C1D3E' }}>Avg</Tag>
            </div>
            <div className="stat-widget-label">Average Price</div>
            <div className="stat-widget-value">₹{avgPrice.toLocaleString()}</div>
            <div className="stat-widget-trend stat-widget-trend-up">
              <DollarOutlined /> Across all services
            </div>
          </div>
        </Col>
        <Col xs={12} lg={6}>
          <div className="stat-widget stat-widget-customers">
            <div className="stat-widget-header">
              <div className="stat-widget-icon stat-widget-icon-customers"><ClockCircleOutlined /></div>
              <Tag style={{ borderRadius: 6, margin: 0, fontSize: 11, border: 'none', background: 'rgba(45,94,58,0.08)', color: '#2D5E3A' }}>Total</Tag>
            </div>
            <div className="stat-widget-label">Total Bookings</div>
            <div className="stat-widget-value">{totalBookings.toLocaleString()}</div>
            <div className="stat-widget-trend stat-widget-trend-up">
              <ClockCircleOutlined /> Lifetime bookings
            </div>
          </div>
        </Col>
        <Col xs={12} lg={6}>
          <div className="stat-widget stat-widget-staff">
            <div className="stat-widget-header">
              <div className="stat-widget-icon stat-widget-icon-staff"><StarOutlined /></div>
              <Tag style={{ borderRadius: 6, margin: 0, fontSize: 11, border: 'none', background: 'rgba(201,149,63,0.08)', color: '#C9953F' }}>Avg</Tag>
            </div>
            <div className="stat-widget-label">Avg. Rating</div>
            <div className="stat-widget-value">{avgRating.toFixed(1)}★</div>
            <div className="stat-widget-trend stat-widget-trend-up">
              <StarOutlined /> Customer satisfaction
            </div>
          </div>
        </Col>
      </Row>

      {/* Categories Filter */}
      <PillFilter
        options={categories}
        value={activeCategory}
        onChange={setActiveCategory}
        style={{ marginBottom: 20 }}
      />

      {/* Services Grid */}
      <Row gutter={[20, 20]}>
        {filteredServices.map(service => (
          <Col key={service.id} xs={24} sm={12} lg={8}>
            <div
              className="premium-card"
              style={{
                padding: 0, position: 'relative', overflow: 'hidden',
                transition: 'all 0.3s ease',
                opacity: service.active ? 1 : 0.6,
              }}
              onMouseEnter={e => {
                if (service.active) {
                  e.currentTarget.style.transform = 'translateY(-2px)';
                  e.currentTarget.style.boxShadow = '0 12px 40px rgba(0,0,0,0.08)';
                }
              }}
              onMouseLeave={e => {
                e.currentTarget.style.transform = 'none';
                e.currentTarget.style.boxShadow = 'none';
              }}
            >
              {/* Colored top accent */}
              <div style={{
                height: 4,
                background: `linear-gradient(90deg, ${service.color}, ${service.color}66)`,
              }} />

              <div style={{ padding: 20 }}>
                {/* Header Row */}
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: 14 }}>
                  <Space size={14}>
                    <div style={{
                      width: 44, height: 44, borderRadius: 12,
                      background: `${service.color}15`,
                      display: 'flex', alignItems: 'center', justifyContent: 'center',
                      fontSize: 20, flexShrink: 0,
                    }}>
                      {service.icon}
                    </div>
                    <div>
                      <Text strong style={{ fontSize: 15, display: 'block' }}>{service.name}</Text>
                      <Tag style={{
                        margin: '2px 0 0', fontSize: 10, fontWeight: 600,
                        borderRadius: 6, border: 'none', padding: '0 8px', lineHeight: '20px',
                        background: `${service.color}15`,
                        color: service.color,
                      }}>
                        {service.category}
                      </Tag>
                    </div>
                  </Space>
                  <Badge
                    count={service.active ? 'Active' : 'Inactive'}
                    style={{
                      fontSize: 10, fontWeight: 600, padding: '0 8px', lineHeight: '20px',
                      borderRadius: 10, border: 'none',
                      background: service.active ? 'rgba(45,94,58,0.1)' : 'rgba(92,58,74,0.1)',
                      color: service.active ? '#2D5E3A' : '#5C3A4A',
                      boxShadow: 'none',
                    }}
                  />
                </div>

                {/* Description */}
                <Text style={{ fontSize: 12, color: 'var(--theme-text-secondary)', display: 'block', marginBottom: 14, lineHeight: 1.5 }}>
                  {service.description}
                </Text>

                {/* Duration & Price */}
                <div style={{ display: 'flex', gap: 16, marginBottom: 14 }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
                    <ClockCircleOutlined style={{ fontSize: 13, color: 'var(--theme-text-tertiary)' }} />
                    <Text style={{ fontSize: 13, color: 'var(--theme-text-secondary)' }}>{service.duration} min</Text>
                  </div>
                  <div style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
                    <DollarOutlined style={{ fontSize: 13, color: '#1A5C5C' }} />
                    <Text strong style={{ fontSize: 15, color: '#1A5C5C' }}>₹{service.price.toLocaleString()}</Text>
                  </div>
                </div>

                <Divider style={{ margin: '0 0 14px' }} />

                {/* Stats Row */}
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 14 }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                    <Tooltip title="Total Bookings">
                      <Space size={4}>
                        <div style={{
                          width: 24, height: 24, borderRadius: 6,
                          background: 'rgba(124,29,62,0.08)', color: '#7C1D3E',
                          display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 11,
                        }}>
                          <ClockCircleOutlined />
                        </div>
                        <Text style={{ fontSize: 13, fontWeight: 600 }}>{service.bookings}</Text>
                      </Space>
                    </Tooltip>
                    <Tooltip title="Rating">
                      <Space size={4}>
                        <div style={{
                          width: 24, height: 24, borderRadius: 6,
                          background: 'rgba(201,149,63,0.08)', color: '#C9953F',
                          display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 11,
                        }}>
                          <StarOutlined />
                        </div>
                        <Text style={{ fontSize: 13, fontWeight: 600 }}>{service.rating}</Text>
                      </Space>
                    </Tooltip>
                  </div>
                </div>

                {/* Actions Row */}
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                  <Space>
                    <Tooltip title="Edit Service">
                      <Button
                        type="text"
                        size="small"
                        icon={<EditOutlined />}
                        style={{ borderRadius: 8, color: 'var(--theme-text-secondary)' }}
                      />
                    </Tooltip>
                    <Tooltip title="Delete Service">
                      <Button
                        type="text"
                        size="small"
                        icon={<DeleteOutlined />}
                        style={{ borderRadius: 8, color: '#7C1D3E' }}
                        onClick={() => deleteService(service.id)}
                      />
                    </Tooltip>
                  </Space>
                  <Switch
                    checked={service.active}
                    onChange={() => toggleStatus(service.id)}
                    size="small"
                    style={{
                      background: service.active ? 'linear-gradient(135deg, #7C1D3E, #C9953F)' : undefined,
                    }}
                  />
                </div>
              </div>
            </div>
          </Col>
        ))}
        {filteredServices.length === 0 && (
          <Col span={24}>
            <div style={{ textAlign: 'center', padding: '60px 0', color: 'var(--theme-text-tertiary)' }}>
              <ScissorOutlined style={{ fontSize: 40, marginBottom: 12, display: 'block' }} />
              <Text style={{ fontSize: 15 }}>No services found matching your criteria</Text>
            </div>
          </Col>
        )}
      </Row>

      {/* Add Service Modal */}
      <Modal
        title={null}
        open={modalOpen}
        onCancel={() => { setModalOpen(false); setFormData(dummyFormState); }}
        footer={null}
        width={520}
        style={{ borderRadius: 16, overflow: 'hidden' }}
        destroyOnClose
      >
        <div style={{ margin: -24, marginBottom: 0, padding: '28px 24px 20px', borderBottom: '1px solid var(--theme-border-light)' }}>
          <Space>
            <div style={{
              width: 40, height: 40, borderRadius: 10,
              background: 'linear-gradient(135deg, #7C1D3E, #C9953F)',
              display: 'flex', alignItems: 'center', justifyContent: 'center',
              fontSize: 18, color: '#fff',
            }}>
              <PlusOutlined />
            </div>
            <div>
              <Text strong style={{ fontSize: 17 }}>Add New Service</Text>
              <div style={{ fontSize: 12, color: 'var(--theme-text-secondary)', marginTop: 1 }}>Create a new service for your menu</div>
            </div>
          </Space>
        </div>

        <div style={{ padding: '20px 0', display: 'flex', flexDirection: 'column', gap: 16 }}>
          <div>
            <Text style={{ fontSize: 13, fontWeight: 600, display: 'block', marginBottom: 6 }}>Service Name</Text>
            <Input
              placeholder="e.g. Haircut & Styling"
              value={formData.name}
              onChange={e => setFormData(prev => ({ ...prev, name: e.target.value }))}
              style={{ borderRadius: 10, border: '1px solid var(--theme-border-light)', height: 42 }}
            />
          </div>

          <div>
            <Text style={{ fontSize: 13, fontWeight: 600, display: 'block', marginBottom: 6 }}>Category</Text>
            <Select
              value={formData.category}
              onChange={val => setFormData(prev => ({ ...prev, category: val }))}
              style={{ width: '100%', borderRadius: 10 }}
              options={categories.filter(c => c.key !== 'all').map(c => ({ value: c.key, label: c.label }))}
            />
          </div>

          <Row gutter={16}>
            <Col span={12}>
              <Text style={{ fontSize: 13, fontWeight: 600, display: 'block', marginBottom: 6 }}>Duration (min)</Text>
              <Input
                type="number"
                placeholder="45"
                value={formData.duration}
                onChange={e => setFormData(prev => ({ ...prev, duration: parseInt(e.target.value) || 0 }))}
                style={{ borderRadius: 10, border: '1px solid var(--theme-border-light)', height: 42 }}
              />
            </Col>
            <Col span={12}>
              <Text style={{ fontSize: 13, fontWeight: 600, display: 'block', marginBottom: 6 }}>Price (₹)</Text>
              <Input
                type="number"
                placeholder="1500"
                value={formData.price}
                onChange={e => setFormData(prev => ({ ...prev, price: parseInt(e.target.value) || 0 }))}
                style={{ borderRadius: 10, border: '1px solid var(--theme-border-light)', height: 42 }}
              />
            </Col>
          </Row>

          <div>
            <Text style={{ fontSize: 13, fontWeight: 600, display: 'block', marginBottom: 6 }}>Description</Text>
            <Input.TextArea
              placeholder="Describe the service..."
              rows={3}
              value={formData.description}
              onChange={e => setFormData(prev => ({ ...prev, description: e.target.value }))}
              style={{ borderRadius: 10, border: '1px solid var(--theme-border-light)', resize: 'none' }}
            />
          </div>

          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <Text style={{ fontSize: 13, fontWeight: 600 }}>Active</Text>
            <Switch
              checked={formData.active}
              onChange={val => setFormData(prev => ({ ...prev, active: val }))}
              style={{ background: formData.active ? 'linear-gradient(135deg, #7C1D3E, #C9953F)' : undefined }}
            />
          </div>
        </div>

        <div style={{ padding: '16px 0 0', borderTop: '1px solid var(--theme-border-light)', display: 'flex', justifyContent: 'flex-end', gap: 8 }}>
          <Button
            onClick={() => { setModalOpen(false); setFormData(dummyFormState); }}
            style={{ borderRadius: 10, border: '1px solid var(--theme-border-light)', height: 40 }}
          >
            Cancel
          </Button>
          <Button
            type="primary"
            onClick={handleAddService}
            style={{
              borderRadius: 10, height: 40,
              background: 'linear-gradient(135deg, #7C1D3E, #C9953F)',
              border: 'none',
              boxShadow: '0 4px 14px rgba(124,29,62,0.3)',
            }}
          >
            Add Service
          </Button>
        </div>
      </Modal>
    </div>
  );
}

export default function ServicesPage() {
  return (
    <OwnerLayout>
      <ServicesContent />
    </OwnerLayout>
  );
}

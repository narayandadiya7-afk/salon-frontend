'use client';

import React, { useState } from 'react';
import {
  Row, Col, Card, Tag, Button, Space, Avatar, Input, Select, Switch,
  Modal, Table, Typography, Divider, Tooltip, Badge, Tabs, Upload, Form, Rate, InputNumber,
} from 'antd';
import {
  CodeSandboxOutlined, PlusOutlined, EditOutlined, EyeOutlined,
  PictureOutlined, TeamOutlined, MessageOutlined, GlobalOutlined,
  SettingOutlined, SaveOutlined, UploadOutlined, DeleteOutlined,
  StarOutlined, RightOutlined, HomeOutlined, InfoCircleOutlined, CheckCircleOutlined,
} from '@ant-design/icons';
import OwnerLayout from '../../../../components/layout/OwnerLayout';

const { Text, Title } = Typography;
const { TextArea } = Input;

interface TeamMember {
  id: string;
  name: string;
  role: string;
  bio: string;
  image: string;
}

interface GalleryImage {
  id: string;
  url: string;
  caption: string;
}

interface Testimonial {
  id: string;
  customerName: string;
  rating: number;
  reviewText: string;
  date: string;
  active: boolean;
}

const mockTeam: TeamMember[] = [
  { id: '1', name: 'Ananya Sharma', role: 'Senior Stylist', bio: 'Expert in modern haircuts and styling with 8+ years of experience.', image: '' },
  { id: '2', name: 'Rahul Verma', role: 'Barber', bio: 'Master barber specializing in classic and contemporary grooming.', image: '' },
  { id: '3', name: 'Priya Patel', role: 'Esthetician', bio: 'Certified skin care specialist with a passion for holistic treatments.', image: '' },
  { id: '4', name: 'Vikram Singh', role: 'Colorist', bio: 'Award-winning color specialist known for balayage and creative color.', image: '' },
];

const mockGallery: GalleryImage[] = [
  { id: '1', url: '', caption: 'Salon Interior' },
  { id: '2', url: '', caption: 'Hair Styling' },
  { id: '3', url: '', caption: 'Facial Treatment' },
  { id: '4', url: '', caption: 'Manicure Station' },
  { id: '5', url: '', caption: 'Product Display' },
  { id: '6', url: '', caption: 'Team Event' },
];

const mockTestimonials: Testimonial[] = [
  { id: '1', customerName: 'Sarah Johnson', rating: 5, reviewText: 'Absolutely amazing service! Ananya gave me the best haircut I have ever had. The salon ambiance is stunning.', date: '2026-06-15', active: true },
  { id: '2', customerName: 'Meera Patel', rating: 4, reviewText: 'Loved the facial treatment. Priya is incredibly skilled and made me feel so relaxed.', date: '2026-06-10', active: true },
  { id: '3', customerName: 'Amit Khanna', rating: 5, reviewText: 'Best barber in town. Rahul knows exactly what I want every single time.', date: '2026-06-08', active: true },
  { id: '4', customerName: 'Neha Gupta', rating: 4, reviewText: 'Great coloring work by Vikram. The balayage turned out perfect!', date: '2026-05-28', active: false },
];

const sectionColors: Record<string, string> = {
  'Hero Banner': '#7C1D3E',
  'About Section': '#7C1D3E',
  'Team': '#C9953F',
  'Gallery': '#2D5E3A',
  'Testimonials': '#C9953F',
};

function WebsiteCMSContent() {
  const [team, setTeam] = useState<TeamMember[]>(mockTeam);
  const [gallery, setGallery] = useState<GalleryImage[]>(mockGallery);
  const [testimonials, setTestimonials] = useState<Testimonial[]>(mockTestimonials);
  const [editingMember, setEditingMember] = useState<TeamMember | null>(null);
  const [memberModalOpen, setMemberModalOpen] = useState(false);
  const [previewVisible, setPreviewVisible] = useState(false);
  const [activeTab, setActiveTab] = useState('hero');

  const [heroData, setHeroData] = useState({
    headline: 'Where Style Meets Elegance',
    subtitle: 'Experience premium grooming and beauty treatments in a luxurious setting.',
    ctaText: 'Book Appointment',
    ctaLink: '/book',
  });

  const [aboutData, setAboutData] = useState({
    story: 'Founded in 2018, our salon was built on the belief that everyone deserves to look and feel their best. With a team of passionate professionals, we have created a space where artistry meets hospitality.',
    mission: 'To provide exceptional beauty services in a warm, welcoming environment that inspires confidence and well-being.',
  });

  const handleSaveMember = () => {
    if (!editingMember) return;
    if (editingMember.id) {
      setTeam(prev => prev.map(m => m.id === editingMember.id ? editingMember : m));
    } else {
      setTeam(prev => [...prev, { ...editingMember, id: String(Date.now()) }]);
    }
    setMemberModalOpen(false);
    setEditingMember(null);
  };

  const handleDeleteMember = (id: string) => {
    setTeam(prev => prev.filter(m => m.id !== id));
  };

  const handleToggleTestimonial = (id: string) => {
    setTestimonials(prev => prev.map(t => t.id === id ? { ...t, active: !t.active } : t));
  };

  const handleDeleteTestimonial = (id: string) => {
    setTestimonials(prev => prev.filter(t => t.id !== id));
  };

  const handleDeleteGallery = (id: string) => {
    setGallery(prev => prev.filter(g => g.id !== id));
  };

  const sectionHeader = (title: string, icon: React.ReactNode) => (
    <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 20 }}>
      <div style={{
        width: 36, height: 36, borderRadius: 10,
        background: `${sectionColors[title]}15`,
        color: sectionColors[title],
        display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 16,
      }}>
        {icon}
      </div>
      <div>
        <Text strong style={{ fontSize: 15 }}>{title}</Text>
        <div style={{ fontSize: 12, color: 'var(--theme-text-secondary)' }}>Manage your {title.toLowerCase()} content</div>
      </div>
    </div>
  );

  const tabItems = [
    {
      key: 'hero',
      label: (
        <Space size={6}>
          <PictureOutlined style={{ fontSize: 14 }} />
          <span>Hero Banner</span>
        </Space>
      ),
      children: (
        <div>
          {sectionHeader('Hero Banner', <PictureOutlined />)}

          <Row gutter={[24, 24]}>
            <Col xs={24} lg={14}>
              <Card className="premium-card" bodyStyle={{ padding: 24 }}>
                <Space direction="vertical" size={20} style={{ width: '100%' }}>
                  <div>
                    <Text strong style={{ fontSize: 13, display: 'block', marginBottom: 6 }}>Headline</Text>
                    <Input
                      size="large"
                      value={heroData.headline}
                      onChange={e => setHeroData(prev => ({ ...prev, headline: e.target.value }))}
                      placeholder="Enter headline text"
                      style={{ borderRadius: 10 }}
                    />
                  </div>
                  <div>
                    <Text strong style={{ fontSize: 13, display: 'block', marginBottom: 6 }}>Subtitle</Text>
                    <TextArea
                      rows={3}
                      value={heroData.subtitle}
                      onChange={e => setHeroData(prev => ({ ...prev, subtitle: e.target.value }))}
                      placeholder="Enter subtitle text"
                      style={{ borderRadius: 10, resize: 'none' }}
                    />
                  </div>
                  <Row gutter={16}>
                    <Col span={12}>
                      <Text strong style={{ fontSize: 13, display: 'block', marginBottom: 6 }}>CTA Button Text</Text>
                      <Input
                        value={heroData.ctaText}
                        onChange={e => setHeroData(prev => ({ ...prev, ctaText: e.target.value }))}
                        placeholder="e.g. Book Now"
                        style={{ borderRadius: 10 }}
                      />
                    </Col>
                    <Col span={12}>
                      <Text strong style={{ fontSize: 13, display: 'block', marginBottom: 6 }}>CTA Link</Text>
                      <Input
                        value={heroData.ctaLink}
                        onChange={e => setHeroData(prev => ({ ...prev, ctaLink: e.target.value }))}
                        placeholder="e.g. /book"
                        style={{ borderRadius: 10 }}
                      />
                    </Col>
                  </Row>
                </Space>

                <Divider style={{ margin: '20px 0', borderColor: 'var(--theme-border-light)' }} />

                <div>
                  <Text strong style={{ fontSize: 13, display: 'block', marginBottom: 12 }}>Background Image</Text>
                  <Upload.Dragger
                    accept="image/*"
                    showUploadList={false}
                    style={{ borderRadius: 12, border: '2px dashed var(--theme-border-light)', background: 'var(--theme-background)' }}
                  >
                    <div style={{ padding: 24 }}>
                      <UploadOutlined style={{ fontSize: 28, color: 'var(--theme-text-tertiary)' }} />
                      <div style={{ marginTop: 8, color: 'var(--theme-text-secondary)', fontSize: 13 }}>
                        Click or drag image to upload
                      </div>
                      <div style={{ fontSize: 11, color: 'var(--theme-text-tertiary)', marginTop: 4 }}>
                        Recommended: 1920x800px, max 2MB
                      </div>
                    </div>
                  </Upload.Dragger>
                </div>
              </Card>
            </Col>

            <Col xs={24} lg={10}>
              <Card className="premium-card" bodyStyle={{ padding: 0, overflow: 'hidden' }}>
                <div style={{
                  background: 'linear-gradient(135deg, #1A0A12, #2C1020)',
                  padding: 32, minHeight: 320,
                  display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center',
                  textAlign: 'center',
                }}>
                  <div style={{
                    width: 48, height: 48, borderRadius: 12,
                    background: 'linear-gradient(135deg, #7C1D3E, #C9953F)',
                    display: 'flex', alignItems: 'center', justifyContent: 'center',
                    marginBottom: 16, fontSize: 20, color: '#fff',
                  }}>
                    <EyeOutlined />
                  </div>
                  <Text style={{ fontSize: 11, color: 'rgba(201,149,63,0.5)', textTransform: 'uppercase', letterSpacing: 1.5, marginBottom: 8 }}>Preview</Text>
                  <div style={{ fontSize: 22, fontWeight: 700, color: '#fff', marginBottom: 8 }}>{heroData.headline || 'Headline'}</div>
                  <div style={{ fontSize: 13, color: 'rgba(255,255,255,0.6)', maxWidth: 280, marginBottom: 16, lineHeight: 1.5 }}>{heroData.subtitle || 'Subtitle'}</div>
                  <div style={{
                    display: 'inline-flex', alignItems: 'center', gap: 6,
                    padding: '8px 20px', borderRadius: 8,
                    background: 'linear-gradient(135deg, #7C1D3E, #C9953F)',
                    color: '#fff', fontSize: 13, fontWeight: 600,
                  }}>
                    {heroData.ctaText || 'CTA Button'}
                  </div>
                </div>
              </Card>
            </Col>
          </Row>
        </div>
      ),
    },
    {
      key: 'about',
      label: (
        <Space size={6}>
          <InfoCircleOutlined style={{ fontSize: 14 }} />
          <span>About Section</span>
        </Space>
      ),
      children: (
        <div>
          {sectionHeader('About Section', <InfoCircleOutlined />)}

          <Row gutter={[24, 24]}>
            <Col xs={24} lg={14}>
              <Card className="premium-card" bodyStyle={{ padding: 24 }}>
                <Space direction="vertical" size={20} style={{ width: '100%' }}>
                  <div>
                    <Text strong style={{ fontSize: 13, display: 'block', marginBottom: 6 }}>Our Story</Text>
                    <TextArea
                      rows={5}
                      value={aboutData.story}
                      onChange={e => setAboutData(prev => ({ ...prev, story: e.target.value }))}
                      placeholder="Tell your salon's story"
                      style={{ borderRadius: 10, resize: 'none' }}
                    />
                    <div style={{ fontSize: 11, color: 'var(--theme-text-tertiary)', marginTop: 4 }}>
                      <InfoCircleOutlined style={{ marginRight: 4 }} />
                      This appears on the About page of your website
                    </div>
                  </div>
                  <div>
                    <Text strong style={{ fontSize: 13, display: 'block', marginBottom: 6 }}>Mission Statement</Text>
                    <TextArea
                      rows={3}
                      value={aboutData.mission}
                      onChange={e => setAboutData(prev => ({ ...prev, mission: e.target.value }))}
                      placeholder="Your salon's mission"
                      style={{ borderRadius: 10, resize: 'none' }}
                    />
                  </div>
                </Space>

                <Divider style={{ margin: '20px 0', borderColor: 'var(--theme-border-light)' }} />

                <div>
                  <Text strong style={{ fontSize: 13, display: 'block', marginBottom: 12 }}>About Image</Text>
                  <Upload.Dragger
                    accept="image/*"
                    showUploadList={false}
                    style={{ borderRadius: 12, border: '2px dashed var(--theme-border-light)', background: 'var(--theme-background)' }}
                  >
                    <div style={{ padding: 24 }}>
                      <PictureOutlined style={{ fontSize: 28, color: 'var(--theme-text-tertiary)' }} />
                      <div style={{ marginTop: 8, color: 'var(--theme-text-secondary)', fontSize: 13 }}>
                        Upload salon image
                      </div>
                    </div>
                  </Upload.Dragger>
                </div>
              </Card>
            </Col>

            <Col xs={24} lg={10}>
              <Card className="premium-card" bodyStyle={{ padding: 24 }}>
                <div style={{
                  display: 'flex', alignItems: 'center', gap: 10, marginBottom: 16,
                  paddingBottom: 16, borderBottom: '1px solid var(--theme-border-light)',
                }}>
                  <div style={{
                    width: 36, height: 36, borderRadius: 10,
                    background: 'rgba(124,29,62,0.1)', color: '#7C1D3E',
                    display: 'flex', alignItems: 'center', justifyContent: 'center',
                  }}>
                    <GlobalOutlined />
                  </div>
                  <div>
                    <Text strong style={{ fontSize: 13 }}>Live Preview</Text>
                    <div style={{ fontSize: 11, color: 'var(--theme-text-secondary)' }}>How this looks on your site</div>
                  </div>
                </div>
                <div style={{ fontSize: 11, color: 'var(--theme-text-secondary)', lineHeight: 1.7 }}>
                  <div style={{ marginBottom: 12 }}>
                    <Text strong style={{ fontSize: 14, color: 'var(--theme-text)', display: 'block', marginBottom: 4 }}>Our Story</Text>
                    {aboutData.story}
                  </div>
                  <div>
                    <Text strong style={{ fontSize: 14, color: 'var(--theme-text)', display: 'block', marginBottom: 4 }}>Our Mission</Text>
                    {aboutData.mission}
                  </div>
                </div>
              </Card>
            </Col>
          </Row>
        </div>
      ),
    },
    {
      key: 'team',
      label: (
        <Space size={6}>
          <TeamOutlined style={{ fontSize: 14 }} />
          <span>Team</span>
        </Space>
      ),
      children: (
        <div>
          {sectionHeader('Team', <TeamOutlined />)}

          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 20 }}>
            <Text style={{ fontSize: 13, color: 'var(--theme-text-secondary)' }}>
              {team.length} team member{team.length !== 1 ? 's' : ''} displayed on website
            </Text>
            <Button
              type="primary"
              icon={<PlusOutlined />}
              style={{
                borderRadius: 10, background: 'linear-gradient(135deg, #7C1D3E, #C9953F)',
                border: 'none', boxShadow: '0 4px 14px rgba(124,29,62,0.3)',
              }}
              onClick={() => {
                setEditingMember({ id: '', name: '', role: '', bio: '', image: '' });
                setMemberModalOpen(true);
              }}
            >
              Add Member
            </Button>
          </div>

          <Row gutter={[20, 20]}>
            {team.map(member => (
              <Col xs={24} sm={12} lg={6} key={member.id}>
                <Card
                  className="premium-card"
                  bodyStyle={{ padding: 0 }}
                  style={{ height: '100%' }}
                >
                  <div style={{
                    height: 160,
                    background: 'linear-gradient(135deg, #2C1020, #3D1830)',
                    display: 'flex', alignItems: 'center', justifyContent: 'center',
                    position: 'relative',
                  }}>
                    <Avatar
                      size={72}
                      style={{
                        borderRadius: 16,
                        background: 'linear-gradient(135deg, #7C1D3E, #C9953F)',
                        fontSize: 28, fontWeight: 600, border: '3px solid rgba(255,255,255,0.2)',
                      }}
                    >
                      {member.name.charAt(0)}
                    </Avatar>
                    <div style={{
                      position: 'absolute', top: 12, right: 12,
                      display: 'flex', gap: 6,
                    }}>
                      <Tooltip title="Edit">
                        <Button
                          type="text"
                          size="small"
                          icon={<EditOutlined />}
                          style={{
                            borderRadius: 6, width: 28, height: 28,
                            background: 'rgba(255,255,255,0.1)', color: '#fff',
                          }}
                          onClick={() => {
                            setEditingMember({ ...member });
                            setMemberModalOpen(true);
                          }}
                        />
                      </Tooltip>
                      <Tooltip title="Delete">
                        <Button
                          type="text"
                          size="small"
                          icon={<DeleteOutlined />}
                          style={{
                            borderRadius: 6, width: 28, height: 28,
                            background: 'rgba(255,255,255,0.1)', color: 'rgba(124,29,62,0.7)',
                          }}
                          onClick={() => handleDeleteMember(member.id)}
                        />
                      </Tooltip>
                    </div>
                  </div>
                  <div style={{ padding: '16px 20px 20px' }}>
                    <Text strong style={{ fontSize: 15, display: 'block' }}>{member.name}</Text>
                    <Tag
                      style={{
                        borderRadius: 6, fontSize: 11, padding: '0 8px', marginTop: 4,
                        border: 'none', background: 'rgba(201,149,63,0.08)', color: '#C9953F',
                      }}
                    >
                      {member.role}
                    </Tag>
                    <div style={{ fontSize: 12, color: 'var(--theme-text-secondary)', marginTop: 10, lineHeight: 1.5 }}>
                      {member.bio}
                    </div>
                  </div>
                </Card>
              </Col>
            ))}
          </Row>

          <Modal
            title={
              <Space>
                <TeamOutlined style={{ color: '#7C1D3E' }} />
                <span>{editingMember?.id ? 'Edit Team Member' : 'Add Team Member'}</span>
              </Space>
            }
            open={memberModalOpen}
            onCancel={() => { setMemberModalOpen(false); setEditingMember(null); }}
            onOk={handleSaveMember}
            okText="Save"
            okButtonProps={{
              style: { borderRadius: 10, background: 'linear-gradient(135deg, #7C1D3E, #C9953F)', border: 'none' },
            }}
            cancelButtonProps={{ style: { borderRadius: 10 } }}
            width={520}
          >
            <div style={{ padding: '8px 0' }}>
              <Space direction="vertical" size={16} style={{ width: '100%' }}>
                <div>
                  <Text strong style={{ fontSize: 13, display: 'block', marginBottom: 6 }}>Name</Text>
                  <Input
                    value={editingMember?.name || ''}
                    onChange={e => setEditingMember(prev => prev ? { ...prev, name: e.target.value } : null)}
                    placeholder="Full name"
                    style={{ borderRadius: 10 }}
                  />
                </div>
                <div>
                  <Text strong style={{ fontSize: 13, display: 'block', marginBottom: 6 }}>Role</Text>
                  <Input
                    value={editingMember?.role || ''}
                    onChange={e => setEditingMember(prev => prev ? { ...prev, role: e.target.value } : null)}
                    placeholder="e.g. Senior Stylist"
                    style={{ borderRadius: 10 }}
                  />
                </div>
                <div>
                  <Text strong style={{ fontSize: 13, display: 'block', marginBottom: 6 }}>Bio</Text>
                  <TextArea
                    rows={3}
                    value={editingMember?.bio || ''}
                    onChange={e => setEditingMember(prev => prev ? { ...prev, bio: e.target.value } : null)}
                    placeholder="Brief biography"
                    style={{ borderRadius: 10, resize: 'none' }}
                  />
                </div>
                <div>
                  <Text strong style={{ fontSize: 13, display: 'block', marginBottom: 6 }}>Photo</Text>
                  <Upload
                    accept="image/*"
                    showUploadList={false}
                  >
                    <Button icon={<UploadOutlined />} style={{ borderRadius: 10 }}>
                      Upload Photo
                    </Button>
                  </Upload>
                </div>
              </Space>
            </div>
          </Modal>
        </div>
      ),
    },
    {
      key: 'gallery',
      label: (
        <Space size={6}>
          <PictureOutlined style={{ fontSize: 14 }} />
          <span>Gallery</span>
        </Space>
      ),
      children: (
        <div>
          {sectionHeader('Gallery', <PictureOutlined />)}

          <Upload.Dragger
            accept="image/*"
            showUploadList={false}
            style={{
              borderRadius: 12, border: '2px dashed var(--theme-border-light)',
              background: 'var(--theme-background)', marginBottom: 24,
            }}
          >
            <div style={{ padding: 32 }}>
              <UploadOutlined style={{ fontSize: 36, color: 'var(--theme-text-tertiary)' }} />
              <div style={{ marginTop: 12, fontSize: 14, fontWeight: 600, color: 'var(--theme-text)' }}>
                Drop images here or click to upload
              </div>
              <div style={{ fontSize: 12, color: 'var(--theme-text-tertiary)', marginTop: 4 }}>
                Supported: JPG, PNG, WebP — Max 5MB each
              </div>
            </div>
          </Upload.Dragger>

          <Row gutter={[16, 16]}>
            {gallery.map(image => (
              <Col xs={12} sm={8} lg={6} key={image.id}>
                <div style={{
                  borderRadius: 12, overflow: 'hidden',
                  border: '1px solid var(--theme-border-light)',
                  background: 'var(--theme-surface)',
                  position: 'relative',
                  transition: 'all 0.2s ease',
                }}
                  onMouseEnter={e => { e.currentTarget.style.borderColor = 'rgba(124,29,62,0.3)'; e.currentTarget.style.boxShadow = '0 4px 20px rgba(124,29,62,0.1)'; }}
                  onMouseLeave={e => { e.currentTarget.style.borderColor = 'var(--theme-border-light)'; e.currentTarget.style.boxShadow = 'none'; }}
                >
                  <div style={{
                    height: 140,
                    background: 'linear-gradient(135deg, #1A0A12, #2C1020)',
                    display: 'flex', alignItems: 'center', justifyContent: 'center',
                  }}>
                    <PictureOutlined style={{ fontSize: 32, color: 'rgba(201,149,63,0.3)' }} />
                  </div>
                  <div style={{ padding: '10px 12px', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                    <Text style={{ fontSize: 12, fontWeight: 600 }}>{image.caption}</Text>
                    <Tooltip title="Delete">
                      <Button
                        type="text"
                        size="small"
                        icon={<DeleteOutlined />}
                        style={{ color: 'var(--theme-text-tertiary)', borderRadius: 6 }}
                        onClick={() => handleDeleteGallery(image.id)}
                      />
                    </Tooltip>
                  </div>
                </div>
              </Col>
            ))}
          </Row>

          <div style={{ marginTop: 20, textAlign: 'center' }}>
            <Text style={{ fontSize: 12, color: 'var(--theme-text-tertiary)' }}>
              {gallery.length} image{gallery.length !== 1 ? 's' : ''} in gallery
            </Text>
          </div>
        </div>
      ),
    },
    {
      key: 'testimonials',
      label: (
        <Space size={6}>
          <MessageOutlined style={{ fontSize: 14 }} />
          <span>Testimonials</span>
        </Space>
      ),
      children: (
        <div>
          {sectionHeader('Testimonials', <MessageOutlined />)}

          <Row gutter={[20, 20]}>
            {testimonials.map(testimonial => (
              <Col xs={24} sm={12} lg={12} key={testimonial.id}>
                <Card
                  className="premium-card"
                  bodyStyle={{ padding: 20 }}
                  style={{
                    opacity: testimonial.active ? 1 : 0.5,
                    transition: 'opacity 0.3s ease',
                  }}
                >
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: 12 }}>
                    <Space>
                      <Avatar
                        size={40}
                        style={{
                          borderRadius: 12,
                          background: testimonial.active
                            ? 'linear-gradient(135deg, #C9953F, #7C1D3E)'
                            : 'var(--theme-text-tertiary)',
                          fontSize: 16, fontWeight: 600,
                        }}
                      >
                        {testimonial.customerName.charAt(0)}
                      </Avatar>
                      <div>
                        <Text strong style={{ fontSize: 14 }}>{testimonial.customerName}</Text>
                        <div style={{ display: 'flex', alignItems: 'center', gap: 4, marginTop: 2 }}>
                          <Rate
                            disabled
                            value={testimonial.rating}
                            style={{ fontSize: 12 }}
                          />
                          <Text style={{ fontSize: 11, color: 'var(--theme-text-tertiary)', marginLeft: 4 }}>
                            {testimonial.date}
                          </Text>
                        </div>
                      </div>
                    </Space>
                    <Space>
                      <Tooltip title={testimonial.active ? 'Hide from website' : 'Show on website'}>
                        <Switch
                          size="small"
                          checked={testimonial.active}
                          onChange={() => handleToggleTestimonial(testimonial.id)}
                          style={{
                            background: testimonial.active ? 'linear-gradient(135deg, #C9953F, #7C1D3E)' : undefined,
                          }}
                        />
                      </Tooltip>
                      <Tooltip title="Delete">
                        <Button
                          type="text"
                          size="small"
                          icon={<DeleteOutlined />}
                          style={{ borderRadius: 6, color: 'var(--theme-text-tertiary)' }}
                          onClick={() => handleDeleteTestimonial(testimonial.id)}
                        />
                      </Tooltip>
                    </Space>
                  </div>

                  <div style={{
                    fontSize: 13, color: 'var(--theme-text-secondary)',
                    lineHeight: 1.6, fontStyle: 'italic',
                    padding: '8px 0 0 52px',
                  }}>
                    "{testimonial.reviewText}"
                  </div>

                  <div style={{ padding: '8px 0 0 52px' }}>
                    {testimonial.active ? (
                      <Tag
                        style={{
                          borderRadius: 6, fontSize: 10,
                          border: 'none', background: 'rgba(45,94,58,0.08)', color: '#2D5E3A',
                        }}
                      >
                        <CheckCircleOutlined style={{ marginRight: 4 }} />
                        Published
                      </Tag>
                    ) : (
                      <Tag
                        style={{
                          borderRadius: 6, fontSize: 10,
                          border: 'none', background: 'rgba(92,58,74,0.08)', color: '#5C3A4A',
                        }}
                      >
                        Draft
                      </Tag>
                    )}
                  </div>
                </Card>
              </Col>
            ))}
          </Row>
        </div>
      ),
    },
  ];

  return (
    <div>
      {/* Page Header */}
      <div className="page-header-row">
        <div>
          <div style={{ display: 'flex', alignItems: 'center', gap: 12, marginBottom: 4 }}>
            <div style={{
              width: 40, height: 40, borderRadius: 12,
              background: 'linear-gradient(135deg, rgba(124,29,62,0.1), rgba(201,149,63,0.1))',
              color: '#7C1D3E', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 18,
            }}>
              <CodeSandboxOutlined />
            </div>
            <h1 className="page-header-title" style={{ margin: 0 }}>Website CMS</h1>
          </div>
          <p className="page-header-subtitle">Manage your salon website content</p>
        </div>
        <Space>
          <Button
            icon={<EyeOutlined />}
            style={{ borderRadius: 10, border: '1px solid var(--theme-border)' }}
          >
            Preview Website
          </Button>
          <Button
            type="primary"
            icon={<CheckCircleOutlined />}
            style={{
              borderRadius: 10, background: '#7C1D3E', border: 'none',
              boxShadow: '0 4px 14px rgba(124,29,62,0.3)',
            }}
          >
            Publish Changes
          </Button>
          <Button
            type="primary"
            icon={<SaveOutlined />}
            style={{
              borderRadius: 10, background: 'linear-gradient(135deg, #7C1D3E, #C9953F)',
              border: 'none', boxShadow: '0 4px 14px rgba(124,29,62,0.3)',
            }}
          >
            Save Draft
          </Button>
        </Space>
      </div>

      {/* Tabs */}
      <Card
        className="premium-card"
        bodyStyle={{ padding: 0 }}
        style={{ border: 'none' }}
      >
        <Tabs
          activeKey={activeTab}
          onChange={setActiveTab}
            className="salon-tabs"
            tabBarStyle={{
            padding: '4px 24px 0',
            margin: 0,
            background: 'var(--theme-surface)',
            borderBottom: '1px solid var(--theme-border-light)',
            borderRadius: '16px 16px 0 0',
          }}
          tabBarGutter={4}
          items={tabItems.map(item => ({
            ...item,
            children: (
              <div style={{ padding: 24 }}>
                {item.children}
              </div>
            ),
          }))}
        />
      </Card>
    </div>
  );
}

export default function WebsiteCMSPage() {
  return (
    <OwnerLayout>
      <WebsiteCMSContent />
    </OwnerLayout>
  );
}

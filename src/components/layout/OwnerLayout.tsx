'use client';

import React, { useState, useEffect } from 'react';
import { Layout, Menu, Avatar, Dropdown, Button, Badge, Typography, Space, Tooltip } from 'antd';
import type { MenuProps } from 'antd';
import {
  DashboardOutlined, ScissorOutlined, CalendarOutlined,
  SettingOutlined, CreditCardOutlined, ClockCircleOutlined,
  LogoutOutlined, UserOutlined, GlobalOutlined,
  MenuFoldOutlined, MenuUnfoldOutlined,
  TeamOutlined, BarChartOutlined, CodeSandboxOutlined, NotificationOutlined,
  SearchOutlined, QuestionCircleOutlined, BellOutlined,
} from '@ant-design/icons';
import { useRouter, usePathname } from 'next/navigation';
import AuthUtil from '../../utils/auth';
import ThemeToggle from './ThemeToggle';
import './OwnerLayout.css';

const { Sider, Header, Content } = Layout;
const { Text } = Typography;

interface OwnerLayoutProps {
  children: React.ReactNode;
  salonSlug?: string;
}

const NAV_ITEMS: { key: string; label: string; icon: React.ReactNode; section?: string }[] = [
  { key: 'dashboard', label: 'Dashboard', icon: <DashboardOutlined />, section: 'Main' },
  { key: 'appointments', label: 'Appointments', icon: <CalendarOutlined />, section: 'Main' },
  { key: 'customers', label: 'Customers', icon: <TeamOutlined />, section: 'Management' },
  { key: 'team', label: 'Staff', icon: <UserOutlined />, section: 'Management' },
  { key: 'services', label: 'Services', icon: <ScissorOutlined />, section: 'Management' },
  { key: 'website', label: 'Website CMS', icon: <CodeSandboxOutlined />, section: 'Online' },
  { key: 'analytics', label: 'Analytics', icon: <BarChartOutlined />, section: 'Insights' },
  { key: 'marketing', label: 'Marketing', icon: <NotificationOutlined />, section: 'Growth' },
  { key: 'subscription', label: 'Subscription', icon: <CreditCardOutlined />, section: 'Settings' },
  { key: 'settings', label: 'Settings', icon: <SettingOutlined />, section: 'Settings' },
];

const OwnerLayout: React.FC<OwnerLayoutProps> = ({ children, salonSlug }) => {
  const [collapsed, setCollapsed] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  const [searchVisible, setSearchVisible] = useState(false);
  const [salonName, setSalonName] = useState('');
  const [mounted, setMounted] = useState(false);
  const router = useRouter();
  const pathname = usePathname();

  useEffect(() => {
    const handleResize = () => {
      const mobile = window.innerWidth <= 768;
      setIsMobile(mobile);
      if (mobile) setCollapsed(true);
    };
    handleResize();
    setMounted(true);
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  useEffect(() => {
    if (!salonSlug) return;
    const base = process.env.NEXT_PUBLIC_API_BASEURL || 'http://localhost:3005/api/';
    fetch(`${base}salons/slug/${salonSlug}`)
      .then(res => res.ok ? res.json() : null)
      .then(payload => { if (payload?.data?.name) setSalonName(payload.data.name); })
      .catch(() => {});
  }, [salonSlug]);

  if (!mounted) return null;

  const currentSlug = salonSlug || (pathname.startsWith('/') ? pathname.split('/')[1] : '') || '';
  const basePath = currentSlug ? `/${currentSlug}/owner` : '/owner';
  const toggleSidebar = () => setCollapsed(!collapsed);

  const sections = NAV_ITEMS.reduce<Record<string, typeof NAV_ITEMS>>((acc, item) => {
    const s = item.section || 'Main';
    if (!acc[s]) acc[s] = [];
    acc[s].push(item);
    return acc;
  }, {});

  const menuItems: MenuProps['items'] = Object.entries(sections).flatMap(([section, items], idx) => [
    ...(idx > 0 ? [{ type: 'divider' as const, style: { margin: '4px 16px', borderColor: 'var(--theme-border)' } }] : []),
    {
      key: `section-${section}`,
      label: <span className="owner-section-label">{section}</span>,
      disabled: true,
      style: { cursor: 'default', height: 28, opacity: 1 },
    },
    ...items.map(item => ({
      key: item.key,
      icon: item.icon,
      label: item.label,
      onClick: () => {
        router.push(`${basePath}/${item.key}`);
        if (isMobile) setCollapsed(true);
      },
    })),
  ]);

  const currentPageLabel = (() => {
    const currentKey = pathname.split('/').pop() || 'dashboard';
    const item = NAV_ITEMS.find(i => i.key === currentKey);
    return item?.label || 'Dashboard';
  })();

  const handleLogout = () => {
    AuthUtil.logout();
    setTimeout(() => { window.location.href = '/login'; }, 500);
  };

  const userMenuItems: MenuProps['items'] = [
    {
      key: 'profile',
      icon: <UserOutlined />,
      label: 'My Profile',
    },
    ...(salonSlug ? [{
      key: 'view-salon' as const,
      icon: <GlobalOutlined />,
      label: 'View My Salon',
      onClick: () => window.open(`/${salonSlug}`, '_blank'),
    }] : []),
    { type: 'divider' },
    { key: 'logout', icon: <LogoutOutlined />, label: 'Logout', danger: true, onClick: handleLogout },
  ];

  return (
    <Layout className="owner-layout">
      {isMobile && !collapsed && (
        <div className="owner-sidebar-backdrop" onClick={() => setCollapsed(true)} />
      )}

      <Sider
        trigger={null}
        collapsible
        collapsed={collapsed}
        width={240}
        collapsedWidth={isMobile ? 0 : 72}
        className="owner-sider"
      >
        <div className="owner-sider-logo">
          <div className="owner-logo-icon">
            <ScissorOutlined style={{ fontSize: collapsed ? 20 : 22, color: '#fff' }} />
          </div>
          {!collapsed && (
            <div className="owner-logo-text">
              <Text className="owner-logo-name">{salonName || 'Salon'}</Text>
              <Text className="owner-logo-sub">Owner Portal</Text>
            </div>
          )}
        </div>

        <div className="owner-sider-menu-scroll">
          <Menu
            mode="inline"
            selectedKeys={[pathname.split('/').pop() || 'dashboard']}
            items={menuItems}
            className="owner-sider-menu"
          />
        </div>
      </Sider>

      <Layout className={`owner-site-layout ${collapsed ? 'owner-site-collapsed' : ''}`}>
        <Header className="owner-header">
          <div className="owner-header-left">
            <Button
              type="text"
              icon={collapsed ? <MenuUnfoldOutlined /> : <MenuFoldOutlined />}
              onClick={toggleSidebar}
              className="owner-header-toggle"
            />
            <div className="owner-header-breadcrumb">
              <span className="owner-breadcrumb-item">Owner Portal</span>
              <span className="owner-breadcrumb-sep">/</span>
              <span className="owner-breadcrumb-current">{currentPageLabel}</span>
            </div>
          </div>

          <div className="owner-header-right">
            <Space size={8}>
              <Tooltip title="Search">
                <Button
                  type="text"
                  icon={<SearchOutlined style={{ fontSize: 18 }} />}
                  className="owner-header-icon"
                  onClick={() => setSearchVisible(!searchVisible)}
                />
              </Tooltip>
              <Tooltip title="Help Center">
                <Button
                  type="text"
                  icon={<QuestionCircleOutlined style={{ fontSize: 18 }} />}
                  className="owner-header-icon"
                />
              </Tooltip>
              <Badge count={5} size="small" offset={[-2, 2]}>
                <Tooltip title="Notifications">
                  <Button
                    type="text"
                    icon={<BellOutlined style={{ fontSize: 18 }} />}
                    className="owner-header-icon"
                  />
                </Tooltip>
              </Badge>
              <div className="owner-header-divider" />
              <ThemeToggle />
              <Dropdown menu={{ items: userMenuItems }} placement="bottomRight" trigger={['click']}>
                <Space className="owner-user-menu">
                  <Avatar size={32} icon={<UserOutlined />} style={{ background: 'var(--salon-primary, #C8A46B)', cursor: 'pointer' }} />
                  {!isMobile && (
                    <div className="owner-user-info">
                      <Text className="owner-user-name">Owner</Text>
                      <Text className="owner-user-role">Salon Owner</Text>
                    </div>
                  )}
                </Space>
              </Dropdown>
            </Space>
          </div>
        </Header>

        {searchVisible && (
          <div className="owner-search-bar">
            <div className="owner-search-input-wrap">
              <SearchOutlined className="owner-search-input-icon" />
              <input
                className="owner-search-input-field"
                placeholder="Search appointments, customers, settings..."
                autoFocus
              />
              <kbd className="owner-search-kbd">ESC</kbd>
            </div>
          </div>
        )}

        <Content className="owner-content">
          {children}
        </Content>
      </Layout>
    </Layout>
  );
};

export default OwnerLayout;

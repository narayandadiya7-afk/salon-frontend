'use client';

import React, { useState, useEffect } from 'react';
import { Layout, Menu, Dropdown, Button, Tooltip, Badge } from 'antd';
import type { MenuProps } from 'antd';
import {
  DashboardOutlined, ScissorOutlined, CalendarOutlined,
  SettingOutlined, CreditCardOutlined, ClockCircleOutlined,
  LogoutOutlined, UserOutlined, GlobalOutlined,
  MenuFoldOutlined, MenuUnfoldOutlined,
  TeamOutlined, ShoppingCartOutlined,
  BarChartOutlined, CodeSandboxOutlined, NotificationOutlined,
  CustomerServiceOutlined, GiftOutlined, MessageOutlined,
  FileTextOutlined, PictureOutlined,
} from '@ant-design/icons';
import { useRouter, usePathname } from 'next/navigation';
import Link from 'next/link';
import AuthUtil from '../../utils/auth';
import './OwnerLayout.css';

const { Sider, Header, Content } = Layout;

interface OwnerLayoutProps {
  children: React.ReactNode;
  salonSlug?: string;
}

const NAV_ITEMS: { key: string; label: string; icon: React.ReactNode; section?: string }[] = [
  { key: 'dashboard', label: 'Dashboard', icon: <DashboardOutlined />, section: 'Main' },
  { key: 'appointments', label: 'Appointments', icon: <CalendarOutlined />, section: 'Main' },
  { key: 'customers', label: 'Customers', icon: <TeamOutlined />, section: 'Management' },
  { key: 'staff', label: 'Staff', icon: <TeamOutlined />, section: 'Management' },
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
  const [salonName, setSalonName] = useState('');
  const router = useRouter();
  const pathname = usePathname();

  useEffect(() => {
    const handleResize = () => {
      const mobile = window.innerWidth <= 768;
      setIsMobile(mobile);
      if (mobile) setCollapsed(true);
    };
    handleResize();
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  useEffect(() => {
    const slug = salonSlug || pathname.split('/')[1] || '';
    if (!slug) return;
    const base = process.env.NEXT_PUBLIC_API_BASEURL || 'http://localhost:3005/api/';
    fetch(`${base}salons/slug/${slug}`)
      .then(res => res.ok ? res.json() : null)
      .then(payload => { if (payload?.data?.name) setSalonName(payload.data.name); })
      .catch(() => {});
  }, [salonSlug, pathname]);

  const slug = salonSlug || pathname.split('/')[1] || '';
  const currentPath = pathname.split('/').pop() || 'dashboard';

  const isActive = (key: string) => {
    if (key === 'dashboard' && currentPath === 'dashboard') return true;
    if (key === 'staff' && (currentPath === 'team' || currentPath === 'staff')) return true;
    return currentPath === key;
  };

  const sections = NAV_ITEMS.reduce<Record<string, typeof NAV_ITEMS>>((acc, item) => {
    const s = item.section || 'Main';
    if (!acc[s]) acc[s] = [];
    acc[s].push(item);
    return acc;
  }, {});

  const menuItems: MenuProps['items'] = Object.entries(sections).flatMap(([section, items], idx) => [
    ...(idx > 0 ? [{ type: 'divider' as const, style: { margin: '4px 16px', borderColor: 'rgba(124,29,62,0.08)' } }] : []),
    {
      key: `section-${section}`,
      label: <span className="sidebar-section-label">{section}</span>,
      disabled: true,
      style: { cursor: 'default', height: 28, opacity: 1, color: 'rgba(167,139,250,0.4)' },
    },
    ...items.map(item => ({
      key: item.key,
      icon: item.icon,
      label: item.label,
      onClick: () => {
        const route = item.key === 'staff' ? 'team' : item.key;
        router.push(`/${slug}/owner/${route}`);
        if (isMobile) setCollapsed(true);
      },
    })),
  ]);

  const userMenuItems: MenuProps['items'] = [
    {
      key: 'profile',
      icon: <UserOutlined />,
      label: 'My Profile',
    },
    {
      key: 'view-salon',
      icon: <GlobalOutlined />,
      label: 'View My Salon',
      onClick: () => window.open(`/${slug}`, '_blank'),
    },
    { type: 'divider' },
    {
      key: 'logout',
      icon: <LogoutOutlined />,
      label: 'Logout',
      danger: true,
      onClick: () => AuthUtil.logout(),
    },
  ];

  const headerStyle: React.CSSProperties = {
    left: isMobile ? 0 : (collapsed ? 72 : 260),
  };

  const contentStyle: React.CSSProperties = {
    marginLeft: isMobile ? 0 : (collapsed ? 72 : 260),
  };

  return (
    <Layout className="owner-layout">
      {isMobile && !collapsed && <div className="mobile-backdrop" onClick={() => setCollapsed(true)} />}

      <Sider
        trigger={null}
        collapsible
        collapsed={collapsed}
        width={260}
        collapsedWidth={isMobile ? 0 : 72}
        className="owner-sider"
      >
        <div className="sidebar-logo">
          <div className="sidebar-logo-icon"><ScissorOutlined /></div>
          {!collapsed && (
            <div className="sidebar-logo-text">
              <div className="sidebar-logo-name">{salonName || 'Salon'}</div>
              <div className="sidebar-logo-sub">Owner Portal</div>
            </div>
          )}
        </div>

        <div className="sidebar-menu">
          <Menu
            theme="dark"
            mode="inline"
            selectedKeys={[isActive('dashboard') ? 'dashboard' : NAV_ITEMS.find(i => isActive(i.key))?.key || 'dashboard']}
            items={menuItems}
            style={{ background: 'transparent', borderRight: 0 }}
          />
        </div>

        {!collapsed && (
          <div className="sidebar-footer">
            <Dropdown menu={{ items: userMenuItems }} placement="topRight" trigger={['click']}>
              <div className="sidebar-user-card">
                <div className="sidebar-user-avatar">A</div>
                <div className="sidebar-user-info">
                  <div className="sidebar-user-name">Admin</div>
                  <div className="sidebar-user-role">Salon Owner</div>
                </div>
              </div>
            </Dropdown>
          </div>
        )}
      </Sider>

      <Layout>
        <Header className="owner-header" style={headerStyle}>
          <div className="owner-header-left">
            <Tooltip title={collapsed ? 'Expand sidebar' : 'Collapse sidebar'}>
              <Button
                className="collapse-btn"
                type="text"
                icon={collapsed ? <MenuUnfoldOutlined /> : <MenuFoldOutlined />}
                onClick={() => setCollapsed(!collapsed)}
              />
            </Tooltip>
          </div>

          <div className="owner-header-right">
            <Button className="header-action-btn" icon={<GiftOutlined />} />
            <Button className="header-action-btn" icon={<MessageOutlined />}>
              <span className="header-badge">3</span>
            </Button>
            <Button className="header-action-btn" icon={<BellIcon />}>
              <span className="header-badge">5</span>
            </Button>
            <div style={{ width: 1, height: 24, background: 'var(--theme-border-light)', margin: '0 4px' }} />
            <Dropdown menu={{ items: userMenuItems }} placement="bottomRight">
              <div className="user-avatar-trigger">
                <div className="user-avatar">A</div>
              </div>
            </Dropdown>
          </div>
        </Header>

        <Content className="owner-content" style={contentStyle}>
          <div className="owner-content-inner">
            {children}
          </div>
        </Content>
      </Layout>
    </Layout>
  );
};

function BellIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M18 8A6 6 0 0 0 6 8c0 7-3 9-3 9h18s-3-2-3-9" />
      <path d="M13.73 21a2 2 0 0 1-3.46 0" />
    </svg>
  );
}

export default OwnerLayout;

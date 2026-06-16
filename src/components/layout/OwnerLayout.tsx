'use client';

import React, { useState, useEffect } from 'react';
import { Layout, Menu, Avatar, Dropdown, Button, Tag } from 'antd';
import type { MenuProps } from 'antd';
import {
  DashboardOutlined, ScissorOutlined, CalendarOutlined,
  SettingOutlined, CreditCardOutlined, ClockCircleOutlined,
  LogoutOutlined, UserOutlined, GlobalOutlined, MenuFoldOutlined, MenuUnfoldOutlined,
} from '@ant-design/icons';
import { useRouter, usePathname } from 'next/navigation';
import Link from 'next/link';
import AuthUtil from '../../utils/auth';
import './OwnerLayout.css';

const { Sider, Header, Content } = Layout;

interface OwnerLayoutProps {
  children: React.ReactNode;
}

const OwnerLayout: React.FC<OwnerLayoutProps> = ({ children }) => {
  const [collapsed, setCollapsed] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
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
    window.addEventListener('resize', handleResize);
    setMounted(true);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  if (!mounted) return null;

    const isDashboardActive = pathname === '/owner/dashboard' || pathname.endsWith('/dashboard');

  const menuItems: MenuProps['items'] = [
    {
      key: isDashboardActive ? '/owner/dashboard' : '/owner/dashboard',
      icon: <DashboardOutlined />,
      label: 'Dashboard',
      onClick: () => router.push('/owner/dashboard'),
    },
    {
      key: '/owner/services',
      icon: <ScissorOutlined />,
      label: 'Services',
      onClick: () => router.push('/owner/services'),
    },
    {
      key: '/owner/appointments',
      icon: <CalendarOutlined />,
      label: 'Appointments',
      onClick: () => router.push('/owner/appointments'),
    },
    {
      key: '/owner/availability',
      icon: <ClockCircleOutlined />,
      label: 'Availability',
      onClick: () => router.push('/owner/availability'),
    },
    {
      key: '/owner/subscription',
      icon: <CreditCardOutlined />,
      label: 'Subscription',
      onClick: () => router.push('/owner/subscription'),
    },
    {
      key: '/owner/settings',
      icon: <SettingOutlined />,
      label: 'Salon Settings',
      onClick: () => router.push('/owner/settings'),
    },
  ];

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
      onClick: () => router.push('/owner/dashboard'),
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

  return (
    <Layout style={{ minHeight: '100vh' }}>
      {/* Mobile backdrop */}
      {isMobile && !collapsed && (
        <div
          onClick={() => setCollapsed(true)}
          style={{
            position: 'fixed', top: 0, left: 0, right: 0, bottom: 0,
            background: 'rgba(0,0,0,0.5)', zIndex: 900,
          }}
        />
      )}

      <Sider
        trigger={null}
        collapsible
        collapsed={collapsed}
        width={240}
        collapsedWidth={isMobile ? 0 : 72}
        style={{
          position: 'fixed', top: 0, bottom: 0, left: 0,
          zIndex: 1000, overflow: 'auto',
          background: '#001529',
        }}
      >
        {/* Logo */}
        <div style={{
          height: 64, display: 'flex', alignItems: 'center', justifyContent: collapsed ? 'center' : 'flex-start',
          padding: collapsed ? 0 : '0 20px', borderBottom: '1px solid rgba(255,255,255,0.1)',
        }}>
          {collapsed ? (
            <span style={{ fontSize: 24 }}>✂️</span>
          ) : (
            <div>
              <div style={{ color: '#fff', fontWeight: 700, fontSize: 16 }}>✂️ SalonSaaS</div>
              <div style={{ color: 'rgba(255,255,255,0.5)', fontSize: 11 }}>Owner Dashboard</div>
            </div>
          )}
        </div>

        <Menu
          theme="dark"
          mode="inline"
          selectedKeys={[isDashboardActive ? '/owner/dashboard' : pathname]}
          items={menuItems}
          style={{ borderRight: 0, marginTop: 8 }}
        />
      </Sider>

      <Layout style={{ marginLeft: isMobile ? 0 : (collapsed ? 72 : 240), transition: 'margin-left 0.2s' }}>
        <Header style={{
          position: 'fixed', top: 0, right: 0,
          left: isMobile ? 0 : (collapsed ? 72 : 240),
          zIndex: 999, height: 64, padding: '0 24px',
          background: '#fff', borderBottom: '1px solid #f0f0f0',
          display: 'flex', alignItems: 'center', justifyContent: 'space-between',
          transition: 'left 0.2s',
        }}>
          <Button
            type="text"
            icon={collapsed ? <MenuUnfoldOutlined /> : <MenuFoldOutlined />}
            onClick={() => setCollapsed(!collapsed)}
            style={{ fontSize: 18 }}
          />

          <div style={{ display: 'flex', alignItems: 'center', gap: 16 }}>
            <Tag color="green" style={{ margin: 0 }}>Active</Tag>
            <Dropdown menu={{ items: userMenuItems }} placement="bottomRight">
              <Avatar style={{ cursor: 'pointer', background: '#1890ff' }} icon={<UserOutlined />} />
            </Dropdown>
          </div>
        </Header>

        <Content style={{ marginTop: 64, padding: 24, background: '#f5f5f5', minHeight: 'calc(100vh - 64px)' }}>
          {children}
        </Content>
      </Layout>
    </Layout>
  );
};

export default OwnerLayout;

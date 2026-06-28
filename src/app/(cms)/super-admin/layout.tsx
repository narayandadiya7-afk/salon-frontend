'use client';

import React, { useState, useEffect } from 'react';
import { Layout, Menu, Avatar, Dropdown, Button, Badge, Typography, Space, Tooltip } from 'antd';
import type { MenuProps } from 'antd';
import {
  DashboardOutlined, BuildOutlined, GiftOutlined, DollarOutlined,
  TeamOutlined, FlagOutlined, CustomerServiceOutlined, AuditOutlined,
  SettingOutlined, UserOutlined, BellOutlined, SearchOutlined,
  MenuFoldOutlined, MenuUnfoldOutlined, LogoutOutlined,
  CreditCardOutlined, SafetyCertificateOutlined, ApiOutlined,
  SecurityScanOutlined, NotificationOutlined, QuestionCircleOutlined,
  WalletOutlined,
} from '@ant-design/icons';
import { useRouter, usePathname } from 'next/navigation';
import AuthUtil from '../../../utils/auth';
import notification from '../../../utils/notification';
import ThemeToggle from '../../../components/layout/ThemeToggle';
import './SuperAdminLayout.css';

const { Sider, Header, Content } = Layout;
const { Text } = Typography;

const menuItems: MenuProps['items'] = [
  { key: '/super-admin/dashboard', icon: <DashboardOutlined />, label: 'Dashboard' },
  { key: '/super-admin/tenants', icon: <BuildOutlined />, label: 'Tenants' },
  { key: '/super-admin/plans', icon: <GiftOutlined />, label: 'Subscription Plans' },
  { key: '/super-admin/revenue', icon: <WalletOutlined />, label: 'Revenue' },
  { key: '/super-admin/billing', icon: <CreditCardOutlined />, label: 'Billing' },
  { key: '/super-admin/users', icon: <TeamOutlined />, label: 'Users' },
  { key: '/super-admin/roles', icon: <SafetyCertificateOutlined />, label: 'Roles & Permissions' },
  { key: '/super-admin/feature-flags', icon: <FlagOutlined />, label: 'Feature Management' },
  { key: '/super-admin/support', icon: <CustomerServiceOutlined />, label: 'Support Center' },
  { key: '/super-admin/audit-logs', icon: <AuditOutlined />, label: 'Audit Logs' },
  { key: '/super-admin/notifications', icon: <NotificationOutlined />, label: 'Notifications' },
  { key: '/super-admin/integrations', icon: <ApiOutlined />, label: 'Integrations' },
  { key: '/super-admin/security', icon: <SecurityScanOutlined />, label: 'Security' },
  { key: '/super-admin/settings', icon: <SettingOutlined />, label: 'Platform Settings' },
];

export default function SuperAdminLayout({ children }: { children: React.ReactNode }) {
  const [collapsed, setCollapsed] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  const [mounted, setMounted] = useState(false);
  const [searchVisible, setSearchVisible] = useState(false);
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

  if (!mounted) return null;

  const toggleSidebar = () => setCollapsed(!collapsed);

  const handleLogout = () => {
    AuthUtil.logout();
    notification.success('Logged out successfully');
    setTimeout(() => { window.location.href = '/super-admin/login'; }, 500);
  };

  const userMenuItems: MenuProps['items'] = [
    { key: 'profile', icon: <UserOutlined />, label: 'Profile' },
    { type: 'divider' },
    { key: 'help', icon: <QuestionCircleOutlined />, label: 'Help Center' },
    { type: 'divider' },
    { key: 'logout', icon: <LogoutOutlined />, label: 'Logout', danger: true, onClick: handleLogout },
  ];

  return (
    <Layout className="super-admin-layout">
      {isMobile && !collapsed && (
        <div className="super-sidebar-backdrop" onClick={() => setCollapsed(true)} />
      )}

      <Sider
        trigger={null}
        collapsible
        collapsed={collapsed}
        width={240}
        collapsedWidth={isMobile ? 0 : 72}
        className="super-sider"
      >
        <div className="super-sider-logo">
          <div className="super-logo-icon">
            <svg viewBox="0 0 32 32" width={collapsed ? 28 : 32} height={collapsed ? 28 : 32} fill="none">
              <rect width="32" height="32" rx="8" fill="#d4a853" />
              <text x="16" y="22" textAnchor="middle" fill="#fff" fontSize="18" fontWeight="bold">S</text>
            </svg>
          </div>
          {!collapsed && (
            <div className="super-logo-text">
              <Text className="super-logo-name">SalonPro</Text>
              <Text className="super-logo-sub">Super Admin</Text>
            </div>
          )}
        </div>

        <div className="super-sider-menu-scroll">
          <Menu
            mode="inline"
            selectedKeys={[pathname]}
            items={menuItems}
            className="super-sider-menu"
            onClick={({ key }) => router.push(key)}
          />
        </div>
      </Sider>

      <Layout className={`super-site-layout ${collapsed ? 'super-site-collapsed' : ''}`}>
        <Header className="super-header">
          <div className="super-header-left">
            <Button
              type="text"
              icon={collapsed ? <MenuUnfoldOutlined /> : <MenuFoldOutlined />}
              onClick={toggleSidebar}
              className="super-header-toggle"
            />
            <div className="super-header-breadcrumb">
              <span className="super-breadcrumb-item">Super Admin</span>
              <span className="super-breadcrumb-sep">/</span>
              <span className="super-breadcrumb-current">
                {(menuItems as any[])?.find((m) => m.key === pathname)?.label || 'Dashboard'}
              </span>
            </div>
          </div>

          <div className="super-header-right">
            <Space size={8}>
              <Tooltip title="Search">
                <Button
                  type="text"
                  icon={<SearchOutlined style={{ fontSize: 18 }} />}
                  className="super-header-icon"
                  onClick={() => setSearchVisible(!searchVisible)}
                />
              </Tooltip>
              <Tooltip title="Help Center">
                <Button
                  type="text"
                  icon={<QuestionCircleOutlined style={{ fontSize: 18 }} />}
                  className="super-header-icon"
                />
              </Tooltip>
              <Badge count={5} size="small" offset={[-2, 2]}>
                <Tooltip title="Notifications">
                  <Button
                    type="text"
                    icon={<BellOutlined style={{ fontSize: 18 }} />}
                    className="super-header-icon"
                  />
                </Tooltip>
              </Badge>
              <div className="super-header-divider" />
              <ThemeToggle />
              <Dropdown menu={{ items: userMenuItems }} placement="bottomRight" trigger={['click']}>
                <Space className="super-user-menu">
                  <Avatar size={32} icon={<UserOutlined />} style={{ background: '#d4a853', cursor: 'pointer' }} />
                  {!isMobile && (
                    <div className="super-user-info">
                      <Text className="super-user-name">Super Admin</Text>
                      <Text className="super-user-role">Platform Administrator</Text>
                    </div>
                  )}
                </Space>
              </Dropdown>
            </Space>
          </div>
        </Header>

        {searchVisible && (
          <div className="super-search-bar">
            <div className="super-search-input-wrap">
              <SearchOutlined className="super-search-input-icon" />
              <input
                className="super-search-input-field"
                placeholder="Search tenants, users, settings, reports..."
                autoFocus
              />
              <kbd className="super-search-kbd">ESC</kbd>
            </div>
          </div>
        )}

        <Content className="super-content">
          {children}
        </Content>
      </Layout>
    </Layout>
  );
}

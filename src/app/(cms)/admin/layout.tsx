'use client';

import React, { useState, useEffect, useContext } from 'react';
import { Layout, Menu, Avatar, Dropdown, Button, Badge, Typography, Space, Tooltip } from 'antd';
import type { MenuProps } from 'antd';
import {
  DashboardOutlined, UserOutlined, SettingOutlined,
  FileTextOutlined, TeamOutlined, SafetyOutlined,
  GroupOutlined, UnorderedListOutlined, HomeOutlined,
  BellOutlined, SearchOutlined, QuestionCircleOutlined,
  MenuFoldOutlined, MenuUnfoldOutlined, LogoutOutlined,
} from '@ant-design/icons';
import { useRouter, usePathname } from 'next/navigation';
import { UserContext } from '../../../context/user';
import { TMenuItem } from '../../../types/config';
import AuthUtil from '../../../utils/auth';
import notification from '../../../utils/notification';
import ThemeToggle from '../../../components/layout/ThemeToggle';
import './AdminLayout.css';

const { Sider, Header, Content } = Layout;
const { Text } = Typography;

const iconMap: Record<string, React.ReactNode> = {
  home: <HomeOutlined />,
  dashboard: <DashboardOutlined />,
  users: <TeamOutlined />,
  team: <TeamOutlined />,
  roles: <SafetyOutlined />,
  safety: <SafetyOutlined />,
  settings: <SettingOutlined />,
  config: <SettingOutlined />,
  group: <GroupOutlined />,
  list: <UnorderedListOutlined />,
  file: <FileTextOutlined />,
  user: <UserOutlined />,
};

const getIcon = (iconName?: string) => {
  if (!iconName) return null;
  const key = iconName.toLowerCase();
  return iconMap[key] || <SettingOutlined />;
};

const buildMenuItems = (
  items: TMenuItem[],
  handleClick: (path: string) => void,
): NonNullable<MenuProps['items']> => {
  return items
    .filter((item) => item.isActive === 1)
    .sort((a, b) => a.displayOrder - b.displayOrder)
    .map((item) => {
      const path = item.entityUrl ? `/admin${item.entityUrl.startsWith('/') ? '' : '/'}${item.entityUrl}` : '';
      const children = item.children?.length ? buildMenuItems(item.children, handleClick) : [];
      if (children.length) {
        return {
          key: item.menuUniqueId,
          icon: getIcon(item.iconName),
          label: item.dispName || item.name,
          children,
        };
      }
      return {
        key: path,
        icon: getIcon(item.iconName),
        label: item.dispName || item.name,
        onClick: () => path && handleClick(path),
      };
    });
};

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  const [collapsed, setCollapsed] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  const [mounted, setMounted] = useState(false);
  const [searchVisible, setSearchVisible] = useState(false);
  const [smallLogo, setSmallLogo] = useState('');
  const [largeLogo, setLargeLogo] = useState('');
  const [defaultOpenKeys, setDefaultOpenKeys] = useState<string[]>([]);
  const router = useRouter();
  const pathname = usePathname();
  const { menuHierarchy } = useContext(UserContext);

  useEffect(() => {
    const loadLogos = () => {
      setSmallLogo(localStorage.getItem('app-logo-small') || '');
      setLargeLogo(localStorage.getItem('app-logo-large') || '');
    };
    loadLogos();
    const handleLogoUpdate = () => loadLogos();
    window.addEventListener('logo-updated', handleLogoUpdate);
    return () => window.removeEventListener('logo-updated', handleLogoUpdate);
  }, []);

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
    if (menuHierarchy?.length) {
      const parents = menuHierarchy
        .filter((m) => m.children?.length)
        .map((m) => m.menuUniqueId);
      setDefaultOpenKeys(parents);
    }
  }, [menuHierarchy]);

  if (!mounted) return null;

  const toggleSidebar = () => setCollapsed(!collapsed);

  const handleLogout = () => {
    AuthUtil.logout();
    notification.success('Logged out successfully');
    setTimeout(() => { window.location.href = '/login'; }, 500);
  };

  const userMenuItems: MenuProps['items'] = [
    { key: 'profile', icon: <UserOutlined />, label: 'Profile' },
    { type: 'divider' },
    { key: 'help', icon: <QuestionCircleOutlined />, label: 'Help Center' },
    { type: 'divider' },
    { key: 'logout', icon: <LogoutOutlined />, label: 'Logout', danger: true, onClick: handleLogout },
  ];

  const handleMenuClick = (path: string) => router.push(path);

  const menuItems: MenuProps['items'] = buildMenuItems(menuHierarchy || [], handleMenuClick);

  const currentPageLabel = (() => {
    const find = (items: NonNullable<MenuProps['items']>): string | null => {
      for (const item of items) {
        if (!item) continue;
        if ('key' in item && item.key === pathname && 'label' in item) return item.label as string;
        if ('children' in item && item.children) {
          const found = find(item.children as NonNullable<MenuProps['items']>);
          if (found) return found;
        }
      }
      return null;
    };
    return find(menuItems) || 'Dashboard';
  })();

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
            {smallLogo && collapsed
              ? <img src={smallLogo} alt="Logo" style={{ width: 32, height: 32, objectFit: 'contain' }} />
              : largeLogo
                ? <img src={largeLogo} alt="Logo" style={{ height: '32px', objectFit: 'contain' }} />
                : (
                  <svg viewBox="0 0 32 32" width={collapsed ? 28 : 32} height={collapsed ? 28 : 32} fill="none">
                    <rect width="32" height="32" rx="8" fill="#d4a853" />
                    <text x="16" y="22" textAnchor="middle" fill="#fff" fontSize="18" fontWeight="bold">S</text>
                  </svg>
                )}
          </div>
          {!collapsed && (
            <div className="super-logo-text">
              <Text className="super-logo-name">SalonPro</Text>
              <Text className="super-logo-sub">Admin</Text>
            </div>
          )}
        </div>

        <div className="super-sider-menu-scroll">
          <Menu
            mode="inline"
            selectedKeys={[pathname]}
            defaultOpenKeys={defaultOpenKeys}
            items={menuItems}
            className="super-sider-menu"
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
              <span className="super-breadcrumb-item">Admin</span>
              <span className="super-breadcrumb-sep">/</span>
              <span className="super-breadcrumb-current">{currentPageLabel}</span>
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
                      <Text className="super-user-name">Admin</Text>
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

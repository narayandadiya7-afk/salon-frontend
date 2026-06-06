'use client';

import React, { useState, useEffect } from 'react';
import { Layout, Menu } from 'antd';
import type { MenuProps } from 'antd';
import {
  DashboardOutlined, UserOutlined, SettingOutlined,
  FileTextOutlined, TeamOutlined, SafetyOutlined,
} from '@ant-design/icons';
import { useRouter, usePathname } from 'next/navigation';
import './Sidebar.css';

const { Sider } = Layout;

interface SidebarProps {
  collapsed: boolean;
  onNavigate?: () => void;
}

type MenuItem = Required<MenuProps>['items'][number];

const Sidebar: React.FC<SidebarProps> = ({ collapsed, onNavigate }) => {
  const router = useRouter();
  const pathname = usePathname();
  const [smallLogo, setSmallLogo] = useState<string>('');
  const [largeLogo, setLargeLogo] = useState<string>('');
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const loadLogos = () => {
      const storedSmallLogo = localStorage.getItem('app-logo-small');
      const storedLargeLogo = localStorage.getItem('app-logo-large');
      setSmallLogo(storedSmallLogo || '');
      setLargeLogo(storedLargeLogo || '');
    };
    loadLogos();
    const handleLogoUpdate = () => loadLogos();
    window.addEventListener('logo-updated', handleLogoUpdate);
    return () => window.removeEventListener('logo-updated', handleLogoUpdate);
  }, []);

  useEffect(() => {
    const handleResize = () => setIsMobile(window.innerWidth <= 768);
    handleResize();
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const handleMenuClick = (path: string) => {
    router.push(path);
    if (onNavigate) setTimeout(() => onNavigate(), 100);
  };

  const menuItems: MenuItem[] = [
    {
      key: '/admin/dashboard',
      icon: <DashboardOutlined />,
      label: 'Dashboard',
      onClick: () => handleMenuClick('/admin/dashboard'),
    },
    {
      key: '/admin/users',
      icon: <TeamOutlined />,
      label: 'Users',
      onClick: () => handleMenuClick('/admin/users'),
    },
    {
      key: '/admin/roles',
      icon: <SafetyOutlined />,
      label: 'Roles',
      onClick: () => handleMenuClick('/admin/roles'),
    },
    {
      key: 'config',
      icon: <SettingOutlined />,
      label: 'Configuration',
      children: [
        { key: '/admin/config-param', label: 'Parameters', onClick: () => handleMenuClick('/admin/config-param') },
        { key: '/admin/config-group', label: 'Groups', onClick: () => handleMenuClick('/admin/config-group') },
      ],
    },
    { key: 'docs', icon: <FileTextOutlined />, label: 'Documentation' },
    { key: 'profile', icon: <UserOutlined />, label: 'Profile' },
  ];

  const isMobileOpen = isMobile ? !collapsed : false;

  return (
    <Sider
      trigger={null}
      collapsible
      collapsed={collapsed}
      className="app-sidebar"
      width={250}
      collapsedWidth={80}
      style={{ overflow: 'auto', height: '100vh', position: 'fixed', top: 0, bottom: 0 }}
      data-mobile-open={isMobileOpen}
    >
      <div className="sidebar-logo">
        <div className="logo-icon">
          {collapsed
            ? (smallLogo
                ? <img src={smallLogo} alt="Logo" style={{ width: 40, height: 40, objectFit: 'contain' }} />
                : 'W')
            : (largeLogo
                ? <img src={largeLogo} alt="WebaniX" style={{ height: '40px', objectFit: 'contain' }} />
                : 'WebaniX')
          }
        </div>
      </div>

      <Menu
        mode="inline"
        selectedKeys={[pathname]}
        defaultOpenKeys={['config']}
        items={menuItems}
        className="sidebar-menu"
      />
    </Sider>
  );
};

export default Sidebar;

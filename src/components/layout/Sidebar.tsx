'use client';

import React, { useState, useEffect, useContext } from 'react';
import { Layout, Menu } from 'antd';
import type { MenuProps } from 'antd';
import {
  DashboardOutlined, UserOutlined, SettingOutlined,
  FileTextOutlined, TeamOutlined, SafetyOutlined,
  GroupOutlined, UnorderedListOutlined, HomeOutlined,
} from '@ant-design/icons';
import { useRouter, usePathname } from 'next/navigation';
import { UserContext } from '../../context/user';
import { TMenuItem } from '../../types/config';
import './Sidebar.css';

const { Sider } = Layout;

interface SidebarProps {
  collapsed: boolean;
  onNavigate?: () => void;
}

type MenuItem = Required<MenuProps>['items'][number];

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
): MenuItem[] => {
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

const Sidebar: React.FC<SidebarProps> = ({ collapsed, onNavigate }) => {
  const router = useRouter();
  const pathname = usePathname();
  const { menuHierarchy } = useContext(UserContext);
  const [smallLogo, setSmallLogo] = useState<string>('');
  const [largeLogo, setLargeLogo] = useState<string>('');
  const [isMobile, setIsMobile] = useState(false);
  const [defaultOpenKeys, setDefaultOpenKeys] = useState<string[]>([]);

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

  useEffect(() => {
    if (menuHierarchy?.length) {
      const parents = menuHierarchy
        .filter((m) => m.children?.length)
        .map((m) => m.menuUniqueId);
      setDefaultOpenKeys(parents);
    }
  }, [menuHierarchy]);

  const handleMenuClick = (path: string) => {
    router.push(path);
    if (onNavigate) setTimeout(() => onNavigate(), 100);
  };

  const menuItems: MenuItem[] = buildMenuItems(menuHierarchy || [], handleMenuClick);

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
        defaultOpenKeys={defaultOpenKeys}
        items={menuItems}
        className="sidebar-menu"
      />
    </Sider>
  );
};

export default Sidebar;

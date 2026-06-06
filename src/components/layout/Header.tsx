'use client';

import React, { useState } from 'react';
import { Layout, Avatar, Dropdown, Space, Typography, Button, Modal, Drawer } from 'antd';
import type { MenuProps } from 'antd';
import {
  UserOutlined, LogoutOutlined, BellOutlined,
  MenuFoldOutlined, MenuUnfoldOutlined, PictureOutlined,
} from '@ant-design/icons';
import ThemeToggle from './ThemeToggle';
import AuthUtil from '../../utils/auth';
import { notification } from '../../utils/notification';
import LogoSettings from '../logo/LogoSettings';
import './Header.css';

const { Header: AntHeader } = Layout;
const { Text } = Typography;

interface HeaderProps {
  collapsed: boolean;
  onToggle: () => void;
}

const Header: React.FC<HeaderProps> = ({ collapsed, onToggle }) => {
  const [logoDrawerOpen, setLogoDrawerOpen] = useState(false);
  const [modal, contextHolder] = Modal.useModal();

  const handleLogout = () => {
    modal.confirm({
      title: 'Confirm Logout',
      content: 'Are you sure you want to logout?',
      okText: 'Logout',
      cancelText: 'Cancel',
      okType: 'danger',
      onOk: () => {
        AuthUtil.logout();
        notification.success('Logged out successfully');
        setTimeout(() => { window.location.href = '/login'; }, 500);
      },
    });
  };

  const handleLogoUpdate = () => {
    window.dispatchEvent(new Event('logo-updated'));
  };

  const userMenuItems: MenuProps['items'] = [
    { key: 'profile', icon: <UserOutlined />, label: 'Profile' },
    {
      key: 'logo-settings',
      icon: <PictureOutlined />,
      label: 'Update Logo',
      onClick: () => setLogoDrawerOpen(true),
    },
    { type: 'divider' },
    { key: 'logout', icon: <LogoutOutlined />, label: 'Logout', danger: true, onClick: handleLogout },
  ];

  return (
    <>
      {contextHolder}
      <AntHeader className="app-header" data-collapsed={collapsed}>
        <div className="app-header-left">
          <Button
            type="text"
            icon={collapsed ? <MenuUnfoldOutlined /> : <MenuFoldOutlined />}
            onClick={onToggle}
            className="sidebar-toggle"
          />
        </div>

        <div className="app-header-right">
          <Space size="middle">
            <Button
              type="text"
              icon={<BellOutlined style={{ fontSize: '18px' }} />}
              className="header-icon-btn"
            />
            <ThemeToggle />
            <Dropdown menu={{ items: userMenuItems }} placement="bottomRight" trigger={['click']}>
              <Space className="user-menu" style={{ cursor: 'pointer' }}>
                <Avatar size="small" icon={<UserOutlined />} />
                <Text className="username">John Doe</Text>
              </Space>
            </Dropdown>
          </Space>
        </div>
      </AntHeader>

      {/* Logo Settings Drawer */}
      <Drawer
        title="Logo Settings"
        placement="right"
        open={logoDrawerOpen}
        onClose={() => setLogoDrawerOpen(false)}
        destroyOnClose
        styles={{ wrapper: { width: 378 }, body: { padding: 24, height: '100%', overflow: 'hidden', display: 'flex', flexDirection: 'column' } }}
      >
        <LogoSettings
          onCloseDrawer={() => setLogoDrawerOpen(false)}
          onSuccess={handleLogoUpdate}
        />
      </Drawer>
    </>
  );
};

export default Header;

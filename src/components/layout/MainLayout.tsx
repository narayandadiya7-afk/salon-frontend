'use client';

import React, { useState, useEffect } from 'react';
import { Layout } from 'antd';
import Sidebar from './Sidebar';
import Header from './Header';
import Breadcrumbs from './Breadcrumbs';
import LayoutSkeleton from './LayoutSkeleton';
import './MainLayout.css';
import './LayoutSkeleton.css';

const { Content } = Layout;

interface MainLayoutProps {
  children: React.ReactNode;
}

const MainLayout: React.FC<MainLayoutProps> = ({ children }) => {
  const [isMobile, setIsMobile] = useState(false);
  const [collapsed, setCollapsed] = useState(false);
  const [mounted, setMounted] = useState(false);

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

  if (!mounted) {
    return <LayoutSkeleton />;
  }

  const toggleSidebar = () => setCollapsed(!collapsed);

  const closeSidebarOnMobile = () => {
    if (isMobile && !collapsed) setCollapsed(true);
  };

  return (
    <Layout className="main-layout">
      {/* Mobile backdrop */}
      {isMobile && !collapsed && (
        <div
          className="sidebar-backdrop active"
          onClick={closeSidebarOnMobile}
          style={{
            position: 'fixed', top: 0, left: 0, right: 0, bottom: 0,
            background: 'rgba(0, 0, 0, 0.5)', zIndex: 900,
          }}
        />
      )}

      <Sidebar collapsed={collapsed} onNavigate={closeSidebarOnMobile} />

      <Layout
        className="site-layout"
        style={{
          marginLeft: isMobile ? 0 : (collapsed ? 80 : 250),
          transition: 'margin-left 0.3s ease',
        }}
      >
        <Header collapsed={collapsed} onToggle={toggleSidebar} />

        <div style={{ marginTop: 64 }}>
          <Breadcrumbs />
          <Content className="main-content">
            {children}
          </Content>
        </div>
      </Layout>
    </Layout>
  );
};

export default MainLayout;

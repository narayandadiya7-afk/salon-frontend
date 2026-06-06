'use client';

/**
 * AdvancePanel.tsx
 * Right sidebar with advance configuration - supports mobile drawer and desktop sider
 */
import React from 'react';
import { Layout, Menu, Drawer } from 'antd';
import type { MenuProps } from 'antd';
import styles from './advance.module.css';

const { Sider } = Layout;

interface AdvancePanelProps {
  collapsed: boolean;
  onClose: () => void;
  menuItems?: MenuProps['items'];
  selectedKeys?: string[];
  onMenuSelect?: (key: string) => void;
  isMobile?: boolean;
  // Simple "coming soon" mode (no menu)
  simple?: boolean;
}

const AdvancePanel: React.FC<AdvancePanelProps> = ({
  collapsed,
  onClose,
  menuItems = [],
  selectedKeys = [],
  onMenuSelect = () => {},
  isMobile = false,
  simple = false,
}) => {
  if (simple) {
    return (
      <div className={styles.parentContainer}>
        <span className={styles.verticalText}>Coming soon ....</span>
      </div>
    );
  }

  if (isMobile) {
    return (
      <Drawer
        placement="left"
        onClose={onClose}
        open={!collapsed}
        width={250}
        styles={{ body: { padding: 0 } }}
      >
        <Menu
          mode="inline"
          selectedKeys={selectedKeys}
          items={menuItems}
          onSelect={({ key }) => onMenuSelect(key)}
        />
      </Drawer>
    );
  }

  return (
    <Sider
      collapsible
      collapsed={collapsed}
      trigger={null}
      width={250}
      collapsedWidth={80}
      style={{ background: '#fff' }}
    >
      <Menu
        mode="inline"
        selectedKeys={selectedKeys}
        items={menuItems}
        onSelect={({ key }) => onMenuSelect(key)}
      />
    </Sider>
  );
};

export default AdvancePanel;

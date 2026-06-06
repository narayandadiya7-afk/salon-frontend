'use client';

/**
 * AdvanceSider.tsx
 * Right sidebar with advance configuration - desktop sider version
 */
import React from 'react';
import { Layout, Menu } from 'antd';
import type { MenuProps } from 'antd';

const { Sider } = Layout;

interface AdvanceSiderProps {
  collapsed: boolean;
  menuItems: MenuProps['items'];
  selectedKeys: string[];
  onMenuSelect: (key: string) => void;
}

const AdvanceSider: React.FC<AdvanceSiderProps> = ({
  collapsed,
  menuItems,
  selectedKeys,
  onMenuSelect,
}) => {
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

export default AdvanceSider;

'use client';

import React, { useMemo } from 'react';
import { Dropdown, Space, Tag } from 'antd';
import { BgColorsOutlined, CheckOutlined, MoonOutlined, SunOutlined } from '@ant-design/icons';
import type { MenuProps } from 'antd';
import { useTheme } from '../../contexts/ThemeContext';
import { themes, themeNames, ThemeMode } from '../../config/theme';
import './ThemeToggle.css';

const ThemeToggle: React.FC = React.memo(() => {
  const { theme, setTheme } = useTheme();

  const lightThemes: ThemeMode[] = ['light', 'ocean', 'forest', 'slate'];
  const darkThemes: ThemeMode[] = ['dark', 'midnight', 'nord', 'dracula'];

  const items: MenuProps['items'] = useMemo(() => {
    const createThemeItem = (themeMode: ThemeMode) => {
      const colors = themes[themeMode];
      const isSelected = theme === themeMode;
      const isDark = darkThemes.includes(themeMode);

      return {
        key: themeMode,
        label: (
          <div className="theme-menu-item">
            <div className="theme-preview">
              <div className="theme-color-primary" style={{ background: colors.primary }} />
              <div className="theme-color-surface" style={{ background: colors.surface }} />
              <div className="theme-color-background" style={{ background: colors.background }} />
            </div>
            <Space className="theme-info" size={4}>
              {isDark
                ? <MoonOutlined style={{ fontSize: 14, color: 'var(--theme-text-secondary)' }} />
                : <SunOutlined style={{ fontSize: 14, color: 'var(--theme-text-secondary)' }} />
              }
              <span className="theme-name">{themeNames[themeMode]}</span>
              {isSelected && <CheckOutlined style={{ fontSize: 12, color: 'var(--theme-primary)' }} />}
            </Space>
          </div>
        ),
        onClick: () => setTheme(themeMode),
        className: isSelected ? 'theme-menu-item-selected' : '',
      };
    };

    return [
      {
        type: 'group',
        label: (
          <div className="theme-group-label">
            <SunOutlined style={{ fontSize: 12 }} />
            <span>Light Themes</span>
          </div>
        ),
        children: lightThemes.map(createThemeItem),
      },
      { type: 'divider' },
      {
        type: 'group',
        label: (
          <div className="theme-group-label">
            <MoonOutlined style={{ fontSize: 12 }} />
            <span>Dark Themes</span>
          </div>
        ),
        children: darkThemes.map(createThemeItem),
      },
    ] as MenuProps['items'];
  }, [theme, setTheme]);

  const isDarkTheme = darkThemes.includes(theme);

  return (
    <Dropdown
      menu={{ items }}
      placement="bottomRight"
      trigger={['click']}
      classNames={{ root: 'theme-toggle-dropdown' }}
      destroyOnHidden={false}
    >
      <div className="theme-toggle-button">
        <Space size={8}>
          {isDarkTheme
            ? <MoonOutlined className="theme-toggle-icon" />
            : <SunOutlined className="theme-toggle-icon" />
          }
          <span className="theme-toggle-text">{themeNames[theme]}</span>
          <Tag
            className="theme-toggle-badge"
            style={{ background: themes[theme].primary, border: 'none', margin: 0 }}
          >
            <BgColorsOutlined style={{ fontSize: 10, color: '#fff' }} />
          </Tag>
        </Space>
      </div>
    </Dropdown>
  );
});

ThemeToggle.displayName = 'ThemeToggle';
export default ThemeToggle;

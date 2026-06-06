'use client';

import React, { createContext, useContext, useEffect, useState, ReactNode } from 'react';
import { App, ConfigProvider } from 'antd';
import { ThemeMode, getAntdTheme, themes } from '../config/theme';

interface ThemeContextType {
  theme: ThemeMode;
  setTheme: (theme: ThemeMode) => void;
  toggleTheme: () => void;
}

const ThemeContext = createContext<ThemeContextType | undefined>(undefined);
const THEME_STORAGE_KEY = 'app-theme';

// Global message/notification/modal accessor — set once App mounts
let globalMessage: ReturnType<typeof App.useApp>['message'] | null = null;
let globalNotification: ReturnType<typeof App.useApp>['notification'] | null = null;
let globalModal: ReturnType<typeof App.useApp>['modal'] | null = null;

export const getGlobalMessage = () => globalMessage;
export const getGlobalNotification = () => globalNotification;
export const getGlobalModal = () => globalModal;

// Inner component to extract App context and store globally
const AppContextBridge: React.FC<{ children: ReactNode }> = ({ children }) => {
  const { message, notification, modal } = App.useApp();
  globalMessage = message;
  globalNotification = notification;
  globalModal = modal;
  return <>{children}</>;
};

export const ThemeProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [theme, setThemeState] = useState<ThemeMode>('light');

  useEffect(() => {
    const savedTheme = localStorage.getItem(THEME_STORAGE_KEY) as ThemeMode;
    const validThemes = Object.keys(themes) as ThemeMode[];
    if (savedTheme && validThemes.includes(savedTheme)) {
      setThemeState(savedTheme);
    }
  }, []);

  const setTheme = (newTheme: ThemeMode) => {
    setThemeState(newTheme);
    localStorage.setItem(THEME_STORAGE_KEY, newTheme);
  };

  const toggleTheme = () => setTheme(theme === 'light' ? 'dark' : 'light');

  useEffect(() => {
    const colors = themes[theme] || themes.light;
    const root = document.documentElement;
    root.style.setProperty('--theme-primary', colors.primary);
    root.style.setProperty('--theme-secondary', colors.secondary);
    root.style.setProperty('--theme-background', colors.background);
    root.style.setProperty('--theme-surface', colors.surface);
    root.style.setProperty('--theme-text', colors.text);
    root.style.setProperty('--theme-text-secondary', colors.textSecondary);
    root.style.setProperty('--theme-border', colors.border);
    root.style.setProperty('--theme-hover', colors.hover);
    root.style.setProperty('--theme-success', colors.success);
    root.style.setProperty('--theme-warning', colors.warning);
    root.style.setProperty('--theme-error', colors.error);
    root.style.setProperty('--theme-info', colors.info);
    document.body.className = `theme-${theme}`;
  }, [theme]);

  return (
    <ThemeContext.Provider value={{ theme, setTheme, toggleTheme }}>
      <ConfigProvider theme={getAntdTheme(theme)}>
        <App>
          <AppContextBridge>
            {children}
          </AppContextBridge>
        </App>
      </ConfigProvider>
    </ThemeContext.Provider>
  );
};

export const useTheme = (): ThemeContextType => {
  const context = useContext(ThemeContext);
  if (!context) throw new Error('useTheme must be used within a ThemeProvider');
  return context;
};

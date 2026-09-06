'use client';

import React from 'react';
import { ThemeProvider } from '../contexts/ThemeContext';
import { LanguageProvider } from '../contexts/language-context';
import ReduxProvider from './ReduxProvider';
import AppProvider from '../contexts/app';
import UserProvider from '../contexts/user';

export default function AppProviders({ children }: { children: React.ReactNode }) {
  return (
    <ThemeProvider>
      <LanguageProvider>
        <ReduxProvider>
          <AppProvider>
            <UserProvider>
              {children}
            </UserProvider>
          </AppProvider>
        </ReduxProvider>
      </LanguageProvider>
    </ThemeProvider>
  );
}

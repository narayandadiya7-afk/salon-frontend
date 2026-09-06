'use client';

import React, { useState } from 'react';

const DEFAULT_VALUE: any = {
  lang: { type: 'en', data: {} },
  theme: { name: 'Default App', color: { primaryColor: '#1890ff', secondaryColor: '#52c41a' } },
};

const AppContext = React.createContext<{
  getTranslatedById: Function;
  updateTranslation: Function;
  theme?: Object;
  fetchLanguages: Function;
}>({
  getTranslatedById: () => {},
  updateTranslation: () => {},
  fetchLanguages: () => {},
});

export default function AppProvider({ children }: { children: React.ReactNode }) {
  const [state] = useState({
    ...DEFAULT_VALUE,
    fetchLanguages: () => {},
    getTranslatedById: () => {},
    updateTranslation: () => {},
  });

  return <AppContext.Provider value={state}>{children}</AppContext.Provider>;
}

export { AppContext, AppProvider };

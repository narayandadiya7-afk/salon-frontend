'use client';

import { createContext, useContext, type ReactNode } from 'react';

export interface CustomerPortalContextValue {
  basePath: string;
}

const CustomerPortalContext = createContext<CustomerPortalContextValue | null>(null);

export function CustomerPortalProvider({
  basePath,
  children,
}: {
  basePath: string;
  children: ReactNode;
}) {
  return (
    <CustomerPortalContext.Provider value={{ basePath }}>
      {children}
    </CustomerPortalContext.Provider>
  );
}

export function useCustomerPortal(): CustomerPortalContextValue {
  const ctx = useContext(CustomerPortalContext);
  if (!ctx) {
    throw new Error('useCustomerPortal must be used within a CustomerPortalProvider');
  }
  return ctx;
}

export function portalHref(basePath: string, to: string): string {
  return to === '/' ? basePath : `${basePath}${to}`;
}
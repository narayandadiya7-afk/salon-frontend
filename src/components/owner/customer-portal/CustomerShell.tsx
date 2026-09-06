'use client';

import type { ReactNode } from 'react';
import { AppShell } from './AppShell';
import { CustomerPortalProvider } from '@/contexts/customer-context';
import { Toaster } from '@/components/owner/customer-portal/sonner';

export function CustomerShell({ slug, children }: { slug: string; children: ReactNode }) {
  const basePath = `/${slug}/customer`;

  return (
    <CustomerPortalProvider basePath={basePath}>
      <div className="customer-shell min-h-screen bg-background font-sans">
        <AppShell>{children}</AppShell>
      </div>
      <Toaster position="top-center" />
    </CustomerPortalProvider>
  );
}
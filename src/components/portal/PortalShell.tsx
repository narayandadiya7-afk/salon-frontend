'use client';

import type { ReactNode } from 'react';
import { SessionProvider } from '@/lib/portal/session';
import { AppSidebar, useSidebarState } from './AppSidebar';
import { TopBar } from './TopBar';
import { Toaster } from 'sonner';

export function PortalShell({ slug, children }: { slug: string; children: ReactNode }) {
  const [collapsed, setCollapsed] = useSidebarState();

  return (
    <SessionProvider>
      <div className="portal-shell flex min-h-dvh w-full bg-background font-sans">
        <AppSidebar collapsed={collapsed} onToggle={() => setCollapsed((v) => !v)} slug={slug} />
        <div className="flex min-w-0 flex-1 flex-col">
          <TopBar slug={slug} />
          <main className="mx-auto w-full max-w-[1500px] flex-1 px-4 py-6 sm:px-6 lg:px-8 lg:py-8">
            {children}
          </main>
        </div>
      </div>
      <Toaster position="top-right" richColors />
    </SessionProvider>
  );
}

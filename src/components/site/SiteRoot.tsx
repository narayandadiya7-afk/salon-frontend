'use client';

import type { ReactNode } from 'react';
import type { SiteSalon } from '@/lib/site';
import { SiteContext } from './site-context';
import { SiteNav } from './SiteNav';
import { SiteFooter } from './SiteFooter';

export function SiteRoot({
  salon,
  slug,
  children,
}: {
  salon: SiteSalon;
  slug: string;
  children: ReactNode;
}) {
  return (
    <SiteContext.Provider value={{ salon, slug }}>
      <div className="site-root min-h-dvh">
        <SiteNav />
        <main>{children}</main>
        <SiteFooter />
      </div>
    </SiteContext.Provider>
  );
}

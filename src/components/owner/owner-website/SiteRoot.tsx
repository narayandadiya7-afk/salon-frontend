'use client';

import type { ReactNode } from 'react';
import { SiteContext } from '@/contexts/site-context';
import { SiteNav } from './SiteNav';
import { SiteFooter } from './SiteFooter';

export function SiteRoot({
  slug,
  children,
}: {
  slug: string;
  children: ReactNode;
}) {
  return (
    <SiteContext.Provider value={{ slug }}>
      <div className="site-root min-h-dvh">
        <SiteNav />
        <main>{children}</main>
        <SiteFooter />
      </div>
    </SiteContext.Provider>
  );
}

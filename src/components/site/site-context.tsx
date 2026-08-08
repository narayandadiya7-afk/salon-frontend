'use client';

import { createContext, useContext } from 'react';
import type { SiteSalon } from '@/lib/site';

type SiteContextValue = { salon: SiteSalon; slug: string };

export const SiteContext = createContext<SiteContextValue | null>(null);

export function useSite(): SiteContextValue {
  const ctx = useContext(SiteContext);
  if (!ctx) throw new Error('useSite must be used within SiteRoot');
  return ctx;
}

'use client';

import React from 'react';
import { useParams, usePathname } from 'next/navigation';
import OwnerNavbar from '../../../components/owner/OwnerNavbar';
import OwnerFooter from '../../../components/owner/OwnerFooter';

const OWNER_ROUTES = new Set([
  'dashboard', 'appointments', 'customers', 'team', 'services',
  'website', 'analytics', 'marketing', 'subscription', 'settings',
]);

function isOwnerPage(pathname: string): boolean {
  const segments = pathname.split('/').filter(Boolean);
  if (segments.length < 3) return false;
  const page = segments[2]; // e.g., /salon/foo/dashboard -> "dashboard"
  return OWNER_ROUTES.has(page);
}

export default function SalonLayout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const params = useParams();
  const slug = params?.slug as string;

  if (isOwnerPage(pathname)) return <>{children}</>;

  return (
    <>
      <OwnerNavbar salon={null} />
      <main>{children}</main>
      <OwnerFooter salon={null} />
    </>
  );
}

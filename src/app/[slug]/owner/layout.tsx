import type { Metadata } from 'next';
import '@/styles/owner-portal.css';
import { PortalShell } from '@/components/portal/PortalShell';

export const metadata: Metadata = {
  title: 'Maison Lumière — Business OS',
};

export default async function SalonOwnerLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  return <PortalShell slug={slug}>{children}</PortalShell>;
}

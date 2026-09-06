import type { Metadata } from 'next';
import '@/styles/customer-portal.css';
import { CustomerShell } from '@/components/owner/customer-portal/CustomerShell';

export const metadata: Metadata = {
  title: 'Glam Studio · My Salon Account',
  description:
    'Manage your Glam Studio appointments, membership, rewards and payments in one premium account.',
};

export default async function CustomerLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;

  return (
    <>
      <link
        rel="stylesheet"
        href="https://fonts.googleapis.com/css2?family=Cormorant+Garamond:wght@400;500;600;700&family=Karla:wght@300;400;500;600;700&display=swap"
      />
      <CustomerShell slug={slug}>{children}</CustomerShell>
    </>
  );
}
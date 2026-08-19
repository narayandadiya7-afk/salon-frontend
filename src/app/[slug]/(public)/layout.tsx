import type { Metadata } from 'next';
import ScrollRestoration from '../../../components/ScrollRestoration';
import { SiteRoot } from '../../../components/owner/owner-website/SiteRoot';
import { getSalon } from '../../../lib/site';
import '../../../styles/site.css';

export const metadata: Metadata = {
  title: 'Salon',
};

export default async function PublicLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const salon = await getSalon(slug);

  return (
    <>
      <ScrollRestoration />
      <SiteRoot salon={salon} slug={slug}>
        {children}
      </SiteRoot>
    </>
  );
}

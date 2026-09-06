import type { Metadata } from 'next';
import ScrollRestoration from '../../../components/ScrollRestoration';
import { SiteRoot } from '../../../components/owner/owner-website/SiteRoot';
import '../../../styles/owner-website.css';

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

  return (
    <>
      <ScrollRestoration />
      <SiteRoot slug={slug}>
        {children}
      </SiteRoot>
    </>
  );
}

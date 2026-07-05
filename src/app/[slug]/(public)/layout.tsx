import React from 'react';
import OwnerNavbar from '../../../components/owner/OwnerNavbar';
import OwnerFooter from '../../../components/owner/OwnerFooter';
import WhatsAppFloat from '../../../components/salon/WhatsAppFloat';
import ScrollRestoration from '../../../components/ScrollRestoration';
import '../../../styles/luxury.css';

async function fetchSalon(slug: string) {
  try {
    const base = process.env.NEXT_PUBLIC_API_BASEURL || 'http://localhost:3005/api/';
    const res = await fetch(`${base}salons/slug/${encodeURIComponent(slug)}`, { cache: 'no-store' });
    if (!res.ok) return null;
    const payload = await res.json();
    return payload?.data || null;
  } catch (e) {
    console.error(e);
    return null;
  }
}

export default async function PublicLayout({ children, params }: { children: React.ReactNode; params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const salon = await fetchSalon(slug);

  return (
    <>
      <ScrollRestoration />
      <OwnerNavbar salon={salon} />
      <main>{children}</main>
      <OwnerFooter salon={salon} />
      <WhatsAppFloat phoneNumber={salon?.phone || ''} />
    </>
  );
}

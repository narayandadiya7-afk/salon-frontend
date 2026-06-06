import React from 'react';
import OwnerNavbar from '../../../components/owner/OwnerNavbar';
import OwnerFooter from '../../../components/owner/OwnerFooter';

type Props = {
  children: React.ReactNode;
  params: { slug?: string };
};

async function fetchSalon(slug?: string) {
  if (!slug) return null;
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

export default async function SalonLayout({ children, params }: Props) {
  const salon = await fetchSalon(params?.slug);

  return (
    <>
      <OwnerNavbar salon={salon} />
      <main>{children}</main>
      <OwnerFooter salon={salon} />
    </>
  );
}

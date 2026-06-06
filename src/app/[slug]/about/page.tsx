import React from 'react';

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

export default async function AboutPage({ params }: { params: { slug: string } }) {
  const salon = await fetchSalon(params.slug);

  return (
    <section style={{ maxWidth: 1100, margin: '28px auto', padding: '0 16px' }}>
      <h1>About {salon?.name || 'this salon'}</h1>
      <p>{salon?.description || 'No description provided yet.'}</p>
    </section>
  );
}

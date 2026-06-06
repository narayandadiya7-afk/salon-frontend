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

export default async function TeamPage({ params }: { params: { slug: string } }) {
  const salon = await fetchSalon(params.slug);

  const team = salon?.team || []; // if team stored in salon

  return (
    <section style={{ maxWidth: 1100, margin: '28px auto', padding: '0 16px' }}>
      <h1>Our Team</h1>
      {team.length === 0 ? (
        <p>No team information provided yet.</p>
      ) : (
        <ul>
          {team.map((m: any) => (
            <li key={m.id}>{m.name} — {m.role}</li>
          ))}
        </ul>
      )}
    </section>
  );
}

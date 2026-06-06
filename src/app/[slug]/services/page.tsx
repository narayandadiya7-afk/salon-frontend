import React from 'react';

async function fetchServices(slug: string) {
  try {
    const base = process.env.NEXT_PUBLIC_API_BASEURL || 'http://localhost:3005/api/';
    const salonRes = await fetch(`${base}salons/slug/${encodeURIComponent(slug)}`, { cache: 'no-store' });
    if (!salonRes.ok) return [];
    const payload = await salonRes.json();
    return payload?.data?.services || [];
  } catch (e) {
    console.error(e);
    return [];
  }
}

export default async function ServicesPage({ params }: { params: { slug: string } }) {
  const services = await fetchServices(params.slug);

  return (
    <section style={{ maxWidth: 1100, margin: '28px auto', padding: '0 16px' }}>
      <h1>Services</h1>
      {services.length === 0 ? (
        <p>No services listed yet.</p>
      ) : (
        <ul>
          {services.map((s: any) => (
            <li key={s.id} style={{ marginBottom: 12 }}>
              <strong>{s.name}</strong> — ₹{s.price} — {s.duration} mins
              <p style={{ margin: '6px 0' }}>{s.description}</p>
            </li>
          ))}
        </ul>
      )}
    </section>
  );
}

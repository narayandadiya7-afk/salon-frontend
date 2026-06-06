import React from 'react';
import BookingForm from '../../../components/owner/BookingForm';

async function fetchSalonAndServices(slug: string) {
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

export default async function BookPage({ params }: { params: { slug: string } }) {
  const salon = await fetchSalonAndServices(params.slug);
  const services = salon?.services || [];
  const salonId = salon?.id;

  return (
    <section style={{ maxWidth: 1100, margin: '28px auto', padding: '0 16px' }}>
      <h1>Book an appointment at {salon?.name || 'this salon'}</h1>
      {salonId ? (
        <BookingForm salonId={salonId} services={services} />
      ) : (
        <p>Salon information not found.</p>
      )}
    </section>
  );
}

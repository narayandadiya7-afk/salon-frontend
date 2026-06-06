import React from 'react';

export default function SalonHome({ params, searchParams }: any) {
  return (
    <section style={{ maxWidth: 1100, margin: '28px auto', padding: '0 16px' }}>
      <h1>Welcome to this salon</h1>
      <p>This is a placeholder owner website home. Replace with real components.</p>
      <p>Slug: {params?.slug}</p>
    </section>
  );
}

'use client';

import React from 'react';
import { Empty, Typography } from 'antd';

export default function MyBookingsPage() {
  return (
    <main style={{ padding: 24, maxWidth: 980, margin: '0 auto' }}>
      <Typography.Title level={2}>My Bookings</Typography.Title>
      <Empty description="Booking history will appear here after your first appointment." />
    </main>
  );
}

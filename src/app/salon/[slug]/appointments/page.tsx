'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';

export default function AppointmentsRedirect() {
  const router = useRouter();
  useEffect(() => { router.replace('/owner/appointments'); }, []);
  return null;
}

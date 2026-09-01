'use client';

import React from 'react';
import { AdminShell } from '../../../components/admin/admin-portal/AdminShell';
import '../../../styles/admin-portal.css';

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  return (
    <AdminShell>
      {children}
    </AdminShell>
  );
}

'use client';

import { Bell, BellOff, CalendarCheck, TriangleAlert } from 'lucide-react';
import { ModulePage } from '@/components/portal/ModulePage';

export default function NotificationsPage() {
  return (
    <ModulePage
      module="notifications"
      name="Notifications"
      eyebrow="Inbox"
      title="Notification center"
      description="Bookings, payments, stock alerts, client messages and system events."
      stats={[
        { label: 'Unread', value: '5', icon: Bell, tone: 'gold' },
        { label: 'Today', value: '23', icon: CalendarCheck, tone: 'azure' },
        { label: 'Alerts', value: '4', hint: 'Inventory & payments', icon: TriangleAlert, tone: 'neutral' },
        { label: 'Muted channels', value: '1', hint: 'Campaign digests', icon: BellOff, tone: 'royal' },
      ]}
      panels={[
        {
          title: 'Recent',
          description: 'Newest first',
          rows: [
            { primary: 'New online booking', secondary: 'Grace Kim · Thu 15:00', chip: { label: 'Appointment', tone: 'azure' } },
            { primary: 'Payment received', secondary: '£420 from Amelie Laurent', chip: { label: 'Payment', tone: 'emerald' } },
            { primary: 'Critical stock', secondary: 'Wella Koleston 7/43 · 3 left', chip: { label: 'Inventory', tone: 'danger' } },
            { primary: 'New message', secondary: 'Priya Anand asked about parking', chip: { label: 'Customer', tone: 'royal' } },
            { primary: 'Campaign milestone', secondary: '100+ bookings from August offer', chip: { label: 'Marketing', tone: 'gold' } },
          ],
        },
        {
          title: 'Preferences',
          description: 'Per-channel delivery',
          rows: [
            { primary: 'Appointments', secondary: 'Email + push', chip: { label: 'On', tone: 'emerald' } },
            { primary: 'Payments', secondary: 'Push', chip: { label: 'On', tone: 'emerald' } },
            { primary: 'Inventory alerts', secondary: 'Email', chip: { label: 'On', tone: 'emerald' } },
            { primary: 'Campaign digests', secondary: 'Weekly', chip: { label: 'Muted', tone: 'neutral' } },
          ],
        },
      ]}
      features={['Read receipts', 'Bulk mark as read', 'Channel routing', 'Escalation rules']}
    />
  );
}

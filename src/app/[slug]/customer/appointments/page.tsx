'use client';

import Link from 'next/link';
import { CalendarDays, CalendarPlus } from 'lucide-react';
import { Button } from '@/components/owner/customer-portal/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/owner/customer-portal/tabs';
import { PageHeader } from '@/components/owner/customer-portal/PageHeader';
import { AppointmentCard } from '@/components/owner/customer-portal/AppointmentCard';
import { EmptyState } from '@/components/owner/customer-portal/EmptyState';
import { appointments } from '@/data/customer-portal';
import { useCustomerPortal } from '@/contexts/customer-context';

const upcoming = appointments.filter((a) => ['Pending', 'Confirmed', 'Checked In', 'In Progress', 'Rescheduled'].includes(a.status));
const completed = appointments.filter((a) => a.status === 'Completed');
const cancelled = appointments.filter((a) => a.status === 'Cancelled' || a.status === 'No Show');

function List({ items }: { items: typeof appointments }) {
  if (items.length === 0) {
    return <EmptyState icon={CalendarDays} title="Nothing here yet" description="When you book with Glam Studio your appointments appear here." ctaLabel="Book Appointment" />;
  }
  return <div className="grid gap-4">{items.map((a) => <AppointmentCard key={a.id} appointment={a} />)}</div>;
}

export default function AppointmentsPage() {
  const { basePath } = useCustomerPortal();
  return (
    <div className="space-y-6">
      <PageHeader
        title="My Appointments"
        subtitle="Everything you have booked at Glam Studio."
        action={
          <Button asChild className="rounded-full bg-gradient-gold text-ink hover:opacity-90">
            <Link href={`${basePath}/book`}>
              <CalendarPlus className="size-4" /> Book Appointment
            </Link>
          </Button>
        }
      />
      <Tabs defaultValue="upcoming">
        <TabsList className="rounded-full">
          <TabsTrigger className="rounded-full" value="upcoming">Upcoming ({upcoming.length})</TabsTrigger>
          <TabsTrigger className="rounded-full" value="completed">Completed ({completed.length})</TabsTrigger>
          <TabsTrigger className="rounded-full" value="cancelled">Cancelled ({cancelled.length})</TabsTrigger>
        </TabsList>
        <TabsContent value="upcoming" className="mt-5"><List items={upcoming} /></TabsContent>
        <TabsContent value="completed" className="mt-5"><List items={completed} /></TabsContent>
        <TabsContent value="cancelled" className="mt-5"><List items={cancelled} /></TabsContent>
      </Tabs>
    </div>
  );
}
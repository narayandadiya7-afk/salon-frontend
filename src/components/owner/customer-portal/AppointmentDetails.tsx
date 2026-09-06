import Link from 'next/link';
import { toast } from 'sonner';
import {
  Drawer, DrawerContent, DrawerDescription, DrawerHeader, DrawerTitle,
} from '@/components/owner/customer-portal/drawer';
import { Button } from '@/components/owner/customer-portal/button';
import { Separator } from '@/components/owner/customer-portal/separator';
import { StatusBadge } from './StatusBadge';
import { formatCurrency, tenant, type Appointment } from '@/data/customer-portal';
import { portalHref, useCustomerPortal } from '@/contexts/customer-context';

function Row({ label, value }: { label: string; value: string }) {
  return (
    <div className="flex items-baseline justify-between gap-6 py-2 text-sm">
      <span className="text-muted-foreground">{label}</span>
      <span className="text-right font-medium">{value}</span>
    </div>
  );
}

export function AppointmentDetails({
  appointment,
  open,
  onOpenChange,
}: {
  appointment: Appointment;
  open: boolean;
  onOpenChange: (v: boolean) => void;
}) {
  const tax = Math.round(appointment.price * 0.18);
  const discount = 240;
  const { basePath } = useCustomerPortal();

  return (
    <Drawer open={open} onOpenChange={onOpenChange}>
      <DrawerContent className="max-h-[92vh]">
        <div className="mx-auto w-full max-w-2xl overflow-y-auto px-5 pb-8">
          <DrawerHeader className="px-0">
            <DrawerTitle className="font-display text-3xl">{appointment.service}</DrawerTitle>
            <DrawerDescription>
              Booking {appointment.id} · {tenant.name}
            </DrawerDescription>
          </DrawerHeader>

          <div className="flex flex-wrap gap-2">
            <StatusBadge status={appointment.status} />
            <StatusBadge status={appointment.payment} />
          </div>

          <div className="mt-4 divide-y divide-border">
            <Row label="Stylist" value={appointment.staff} />
            <Row label="Date" value={appointment.date} />
            <Row label="Time" value={appointment.time} />
            <Row label="Duration" value={appointment.duration} />
            <Row label="Location" value={tenant.address} />
          </div>

          <Separator className="my-5" />
          <div className="divide-y divide-border">
            <Row label="Service price" value={formatCurrency(appointment.price)} />
            <Row label="Taxes (18%)" value={formatCurrency(tax)} />
            <Row label="Gold member discount" value={`− ${formatCurrency(discount)}`} />
            <Row label="Total paid" value={formatCurrency(appointment.price + tax - discount)} />
          </div>

          {appointment.notes ? (
            <div className="mt-5 rounded-2xl bg-muted p-4 text-sm">
              <p className="text-xs uppercase tracking-widest text-muted-foreground">Your notes</p>
              <p className="mt-1.5">{appointment.notes}</p>
            </div>
          ) : null}

          <div className="mt-4 rounded-2xl border border-border p-4 text-sm text-muted-foreground">
            <p className="text-xs uppercase tracking-widest">Cancellation policy</p>
            <p className="mt-1.5">
              Free cancellation up to 24 hours before your appointment. Later cancellations are
              charged 25% of the service price.
            </p>
          </div>

          <div className="mt-6 flex flex-wrap gap-2">
            <Button asChild className="rounded-full">
              <Link href={portalHref(basePath, '/messages')}>Contact Salon</Link>
            </Button>
            <Button
              variant="secondary"
              className="rounded-full"
              onClick={() => toast.success('Added to your calendar')}
            >
              Add to Calendar
            </Button>
            <Button
              variant="ghost"
              className="rounded-full"
              onClick={() => toast.success('Opening directions')}
            >
              Get Directions
            </Button>
          </div>
        </div>
      </DrawerContent>
    </Drawer>
  );
}
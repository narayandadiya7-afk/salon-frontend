'use client';

import { useState } from 'react';
import {
  CalendarPlus, Clock, MapPin, MoreHorizontal, Navigation, User,
} from 'lucide-react';
import { toast } from 'sonner';
import { Button } from '@/components/owner/customer-portal/button';
import { Avatar, AvatarFallback } from '@/components/owner/customer-portal/avatar';
import { StatusBadge } from './StatusBadge';
import { AppointmentDetails } from './AppointmentDetails';
import { RescheduleDialog } from './RescheduleDialog';
import { CancelDialog } from './CancelDialog';
import { formatCurrency, tenant, type Appointment } from '@/data/customer-portal';

export function AppointmentCard({
  appointment,
  featured = false,
}: {
  appointment: Appointment;
  featured?: boolean;
}) {
  const [details, setDetails] = useState(false);
  const [reschedule, setReschedule] = useState(false);
  const [cancel, setCancel] = useState(false);
  const editable = ['Pending', 'Confirmed', 'Rescheduled'].includes(appointment.status);

  return (
    <>
      <article
        className={
          featured
            ? 'rise-in surface overflow-hidden lg:flex'
            : 'surface surface-hover overflow-hidden sm:flex'
        }
      >
        <img
          src={appointment.image}
          alt={appointment.service}
          loading="lazy"
          width={800}
          height={600}
          className={
            featured
              ? 'h-48 w-full object-cover lg:h-auto lg:w-72'
              : 'h-36 w-full object-cover sm:h-auto sm:w-40'
          }
        />
        <div className="flex-1 space-y-4 p-5 sm:p-6">
          <div className="flex flex-wrap items-start justify-between gap-3">
            <div>
              <p className="text-xs uppercase tracking-[0.18em] text-muted-foreground">
                {featured ? 'Next appointment' : tenant.name}
              </p>
              <h3 className={featured ? 'mt-1 font-display text-3xl' : 'mt-1 font-display text-2xl'}>
                {appointment.service}
              </h3>
            </div>
            <div className="flex flex-wrap gap-2">
              <StatusBadge status={appointment.status} />
              <StatusBadge status={appointment.payment} />
            </div>
          </div>

          <div className="grid gap-3 text-sm sm:grid-cols-2">
            <div className="flex items-center gap-2.5">
              <Avatar className="size-8 border border-gold/40">
                <AvatarFallback className="bg-accent text-xs text-accent-foreground">
                  {appointment.staffInitials}
                </AvatarFallback>
              </Avatar>
              <span className="text-muted-foreground">
                with <span className="text-foreground">{appointment.staff}</span>
              </span>
            </div>
            <p className="flex items-center gap-2 text-muted-foreground">
              <Clock className="size-4" /> {appointment.date} · {appointment.time}
            </p>
            <p className="flex items-center gap-2 text-muted-foreground">
              <MapPin className="size-4" /> {tenant.tagline}
            </p>
            <p className="flex items-center gap-2 text-muted-foreground">
              <User className="size-4" /> {appointment.duration} · {formatCurrency(appointment.price)}
            </p>
          </div>

          <div className="flex flex-wrap gap-2 pt-1">
            <Button size="sm" className="rounded-full" onClick={() => setDetails(true)}>
              View Details
            </Button>
            {editable ? (
              <>
                <Button size="sm" variant="secondary" className="rounded-full" onClick={() => setReschedule(true)}>
                  Reschedule
                </Button>
                <Button size="sm" variant="ghost" className="rounded-full" onClick={() => setCancel(true)}>
                  Cancel
                </Button>
              </>
            ) : null}
            <Button
              size="sm"
              variant="ghost"
              className="rounded-full"
              onClick={() => toast.success('Opening directions to Glam Studio')}
            >
              <Navigation className="size-4" /> Directions
            </Button>
            <Button
              size="sm"
              variant="ghost"
              className="rounded-full"
              onClick={() => toast.success('Added to your calendar')}
            >
              <CalendarPlus className="size-4" /> Add to Calendar
            </Button>
            <Button size="sm" variant="ghost" className="rounded-full sm:hidden" aria-label="More">
              <MoreHorizontal className="size-4" />
            </Button>
          </div>
        </div>
      </article>

      <AppointmentDetails appointment={appointment} open={details} onOpenChange={setDetails} />
      <RescheduleDialog appointment={appointment} open={reschedule} onOpenChange={setReschedule} />
      <CancelDialog appointment={appointment} open={cancel} onOpenChange={setCancel} />
    </>
  );
}
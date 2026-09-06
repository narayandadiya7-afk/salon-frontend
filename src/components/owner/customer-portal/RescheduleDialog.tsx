'use client';

import { useState } from 'react';
import { toast } from 'sonner';
import { CheckCircle2 } from 'lucide-react';
import {
  Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle,
} from '@/components/owner/customer-portal/dialog';
import { Button } from '@/components/owner/customer-portal/button';
import { cn } from '@/utils/cn';
import type { Appointment } from '@/data/customer-portal';

const days = [
  { label: 'Sat', date: '22 Aug' },
  { label: 'Sun', date: '23 Aug' },
  { label: 'Tue', date: '25 Aug' },
  { label: 'Wed', date: '26 Aug' },
  { label: 'Thu', date: '27 Aug' },
];
const slots = ['10:00 AM', '11:30 AM', '1:00 PM', '2:00 PM', '4:30 PM', '6:00 PM'];
const unavailable = ['1:00 PM'];

export function RescheduleDialog({
  appointment,
  open,
  onOpenChange,
}: {
  appointment: Appointment;
  open: boolean;
  onOpenChange: (v: boolean) => void;
}) {
  const [day, setDay] = useState(days[1]!.date);
  const [slot, setSlot] = useState<string | null>(null);
  const [saving, setSaving] = useState(false);

  const confirm = () => {
    setSaving(true);
    setTimeout(() => {
      setSaving(false);
      onOpenChange(false);
      setSlot(null);
      toast.success('Appointment rescheduled', {
        description: `${appointment.service} moved to ${day}, ${slot}.`,
      });
    }, 900);
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-lg">
        <DialogHeader>
          <DialogTitle className="font-display text-2xl">Reschedule appointment</DialogTitle>
          <DialogDescription>
            Currently {appointment.date} · {appointment.time} with {appointment.staff}.
          </DialogDescription>
        </DialogHeader>

        <div>
          <p className="text-xs uppercase tracking-widest text-muted-foreground">Select new date</p>
          <div className="mt-3 flex gap-2 overflow-x-auto pb-1">
            {days.map((d) => (
              <button
                key={d.date}
                onClick={() => setDay(d.date)}
                className={cn(
                  'min-w-[74px] rounded-2xl border px-3 py-2.5 text-center transition-colors',
                  day === d.date ? 'border-gold bg-accent' : 'border-border hover:border-gold/50',
                )}
              >
                <span className="block text-xs text-muted-foreground">{d.label}</span>
                <span className="block text-sm font-medium">{d.date}</span>
              </button>
            ))}
          </div>
        </div>

        <div>
          <p className="text-xs uppercase tracking-widest text-muted-foreground">Select new time</p>
          <div className="mt-3 grid grid-cols-3 gap-2">
            {slots.map((s) => {
              const off = unavailable.includes(s);
              return (
                <button
                  key={s}
                  disabled={off}
                  onClick={() => setSlot(s)}
                  className={cn(
                    'rounded-full border px-3 py-2 text-sm transition-colors',
                    off && 'cursor-not-allowed border-dashed text-muted-foreground/50',
                    slot === s ? 'border-gold bg-accent' : 'border-border hover:border-gold/50',
                  )}
                >
                  {s}
                </button>
              );
            })}
          </div>
          {slot === null ? (
            <p className="mt-3 text-xs text-muted-foreground">
              1:00 PM is fully booked — 11:30 AM and 2:00 PM are open with {appointment.staff}.
            </p>
          ) : (
            <p className="mt-3 flex items-center gap-1.5 text-xs text-success">
              <CheckCircle2 className="size-3.5" /> {day} at {slot} is available.
            </p>
          )}
        </div>

        <DialogFooter>
          <Button variant="ghost" className="rounded-full" onClick={() => onOpenChange(false)}>
            Keep current time
          </Button>
          <Button className="rounded-full" disabled={!slot || saving} onClick={confirm}>
            {saving ? 'Confirming…' : 'Confirm change'}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
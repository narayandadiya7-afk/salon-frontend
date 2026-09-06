'use client';

import { useState } from 'react';
import { Check, Clock, Star } from 'lucide-react';
import { toast } from 'sonner';
import { Button } from '@/components/owner/customer-portal/button';
import { Textarea } from '@/components/owner/customer-portal/textarea';
import { Avatar, AvatarFallback } from '@/components/owner/customer-portal/avatar';
import { PageHeader } from '@/components/owner/customer-portal/PageHeader';
import { cn } from '@/utils/cn';
import { formatCurrency, services, stylists } from '@/data/customer-portal';

const days = [
  { label: 'Fri', date: '21 Aug' },
  { label: 'Sat', date: '22 Aug' },
  { label: 'Sun', date: '23 Aug' },
  { label: 'Tue', date: '25 Aug' },
  { label: 'Wed', date: '26 Aug' },
];
const slots = ['10:00 AM', '11:30 AM', '1:00 PM', '2:00 PM', '3:30 PM', '5:00 PM', '6:30 PM'];

function StepLabel({ n, text }: { n: number; text: string }) {
  return (
    <h2 className="flex items-center gap-3 font-display text-2xl">
      <span className="grid size-7 place-items-center rounded-full bg-accent text-sm text-accent-foreground">{n}</span>
      {text}
    </h2>
  );
}

export default function BookPage() {
  const [service, setService] = useState(services[0]!.id);
  const [stylist, setStylist] = useState(stylists[0]!.id);
  const [day, setDay] = useState(days[1]!.date);
  const [slot, setSlot] = useState(slots[3]!);
  const [notes, setNotes] = useState('');
  const selected = services.find((s) => s.id === service)!;

  return (
    <div className="space-y-8">
      <PageHeader title="Book Appointment" subtitle="Four quick steps and you're set." />

      <section className="space-y-4">
        <StepLabel n={1} text="Choose a service" />
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {services.map((s) => (
            <button
              key={s.id}
              onClick={() => setService(s.id)}
              className={cn('surface surface-hover overflow-hidden text-left', service === s.id && 'ring-2 ring-gold')}
            >
              <img src={s.image} alt={s.name} loading="lazy" width={800} height={600} className="h-32 w-full object-cover" />
              <div className="space-y-1 p-4">
                <p className="font-display text-lg leading-tight">{s.name}</p>
                <p className="flex items-center gap-2 text-xs text-muted-foreground">
                  <Clock className="size-3.5" /> {s.duration} · {formatCurrency(s.price)}
                </p>
                <p className="flex items-center gap-1 text-xs text-muted-foreground">
                  <Star className="size-3 fill-gold text-gold" /> {s.rating}
                </p>
              </div>
            </button>
          ))}
        </div>
      </section>

      <section className="space-y-4">
        <StepLabel n={2} text="Choose a stylist" />
        <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
          {stylists.map((st) => (
            <button
              key={st.id}
              onClick={() => setStylist(st.id)}
              className={cn('surface surface-hover flex items-center gap-3 p-4 text-left', stylist === st.id && 'ring-2 ring-gold')}
            >
              <Avatar className="size-10 border border-gold/40">
                <AvatarFallback className="bg-accent text-sm text-accent-foreground">{st.initials}</AvatarFallback>
              </Avatar>
              <div>
                <p className="text-sm font-medium">{st.name}</p>
                <p className="text-xs text-muted-foreground">{st.role} · {st.rating}★</p>
              </div>
            </button>
          ))}
        </div>
      </section>

      <section className="space-y-4">
        <StepLabel n={3} text="Pick date & time" />
        <div className="flex flex-wrap gap-2">
          {days.map((d) => (
            <button
              key={d.date}
              onClick={() => setDay(d.date)}
              className={cn('rounded-2xl border border-border px-5 py-3 text-center transition-colors', day === d.date ? 'bg-gradient-gold text-ink' : 'bg-card hover:border-gold/50')}
            >
              <span className="block text-xs opacity-70">{d.label}</span>
              <span className="text-sm font-medium">{d.date}</span>
            </button>
          ))}
        </div>
        <div className="flex flex-wrap gap-2">
          {slots.map((s) => (
            <button
              key={s}
              onClick={() => setSlot(s)}
              className={cn('rounded-full border border-border px-4 py-2 text-sm transition-colors', slot === s ? 'bg-foreground text-background' : 'bg-card hover:border-gold/50')}
            >
              {s}
            </button>
          ))}
        </div>
      </section>

      <section className="space-y-4">
        <StepLabel n={4} text="Confirm" />
        <div className="surface space-y-4 p-5">
          <Textarea
            placeholder="Any notes for your stylist?"
            value={notes}
            onChange={(e) => setNotes(e.target.value)}
            className="rounded-2xl"
          />
          <div className="flex flex-wrap items-center justify-between gap-3 rounded-2xl bg-muted p-4 text-sm">
            <div>
              <p className="font-medium text-foreground">{selected.name}</p>
              <p className="text-muted-foreground">
                {stylists.find((s) => s.id === stylist)!.name} · {day} · {slot} · {selected.duration}
              </p>
            </div>
            <p className="font-display text-2xl">{formatCurrency(selected.price)}</p>
          </div>
          <Button
            className="w-full rounded-full bg-gradient-gold text-ink hover:opacity-90"
            onClick={() => toast.success('Appointment requested', { description: `${selected.name} on ${day} at ${slot}.` })}
          >
            <Check className="size-4" /> Confirm booking
          </Button>
        </div>
      </section>
    </div>
  );
}
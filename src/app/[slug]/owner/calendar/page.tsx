'use client';

import { useState } from 'react';
import { ChevronLeft, ChevronRight, DoorOpen, Grid3x3, Users } from 'lucide-react';
import { Guard, PageHeader, StatusChip, Surface } from '@/components/portal/primitives';
import { Button } from '@/components/ui/button';
import { Tabs, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { cn } from '@/lib/utils';
import { toast } from 'sonner';

const HOURS = ['09:00', '10:00', '11:00', '12:00', '13:00', '14:00', '15:00', '16:00', '17:00', '18:00'];
const RESOURCES = ['Ivy Marchetti', 'Marco Rossi', 'Leila Haddad', 'Tomas Vega', 'Reina Cho'];

interface Block {
  resource: string;
  start: number;
  span: number;
  title: string;
  client: string;
  tone: string;
}

const BLOCKS: Block[] = [
  { resource: 'Ivy Marchetti', start: 0, span: 3, title: 'Balayage + Gloss', client: 'Eleanor Voss', tone: 'gold' },
  { resource: 'Ivy Marchetti', start: 4, span: 2, title: 'Bridal Trial', client: 'Amelie Laurent', tone: 'royal' },
  { resource: 'Marco Rossi', start: 1, span: 1, title: 'Skin Fade', client: 'Marcus Hale', tone: 'azure' },
  { resource: 'Marco Rossi', start: 2, span: 1, title: 'Beard Sculpt', client: 'Jonah Reed', tone: 'azure' },
  { resource: 'Leila Haddad', start: 1, span: 2, title: 'Keratin', client: 'Priya Anand', tone: 'emerald' },
  { resource: 'Leila Haddad', start: 6, span: 3, title: 'Colour Correction', client: 'Grace Kim', tone: 'gold' },
  { resource: 'Tomas Vega', start: 5, span: 1, title: 'Gel Manicure', client: 'Nadia Sorel', tone: 'royal' },
  { resource: 'Reina Cho', start: 2, span: 1, title: 'Signature Facial', client: 'Sofia Duarte', tone: 'emerald' },
  { resource: 'Reina Cho', start: 8, span: 1, title: 'Lash Lift', client: 'Bianca Ortiz', tone: 'azure' },
];

const toneClass: Record<string, string> = {
  gold: 'bg-gold-soft border-gold/40 text-gold',
  royal: 'bg-royal-soft border-royal/30 text-royal',
  azure: 'bg-azure-soft border-azure/30 text-azure',
  emerald: 'bg-emerald-soft border-emerald/30 text-emerald',
};

function CalendarPage() {
  const [view, setView] = useState('staff');

  return (
    <div className="space-y-6">
      <PageHeader
        eyebrow="Scheduling"
        title="Calendar"
        description="Resource-aware scheduling across stylists and treatment rooms. Drag to move, resize to extend."
        actions={
          <>
            <Button variant="outline" size="icon" aria-label="Previous day">
              <ChevronLeft className="size-4" />
            </Button>
            <Button variant="outline">Today · Mon 10 Aug</Button>
            <Button variant="outline" size="icon" aria-label="Next day">
              <ChevronRight className="size-4" />
            </Button>
          </>
        }
      />

      <div className="grid grid-cols-1 gap-3 sm:flex sm:flex-wrap sm:items-center sm:justify-between">
        <Tabs value={view} onValueChange={setView}>
          <TabsList>
            <TabsTrigger value="staff">
              <Users className="mr-1.5 size-4" /> Staff
            </TabsTrigger>
            <TabsTrigger value="room">
              <DoorOpen className="mr-1.5 size-4" /> Rooms
            </TabsTrigger>
            <TabsTrigger value="month">
              <Grid3x3 className="mr-1.5 size-4" /> Month
            </TabsTrigger>
          </TabsList>
        </Tabs>
        <div className="flex flex-wrap items-center gap-2 text-xs text-muted-foreground">
          <StatusChip tone="gold">Colour</StatusChip>
          <StatusChip tone="azure">Barbering</StatusChip>
          <StatusChip tone="emerald">Treatments</StatusChip>
          <StatusChip tone="royal">Premium</StatusChip>
        </div>
      </div>

      {view === 'month' ? (
        <Surface className="p-5">
          <div className="grid grid-cols-7 gap-px overflow-hidden rounded-xl bg-border text-sm">
            {['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'].map((d) => (
              <div key={d} className="bg-muted/60 px-3 py-2 text-xs font-semibold uppercase tracking-wider text-muted-foreground">
                {d}
              </div>
            ))}
            {Array.from({ length: 35 }).map((_, i) => {
              const day = i - 3;
              const busy = day > 0 && day % 3 === 0;
              return (
                <div key={i} className="min-h-[92px] bg-card px-3 py-2">
                  <span className={cn('text-xs font-medium', day <= 0 && 'text-muted-foreground/40')}>
                    {day > 0 && day <= 31 ? day : ''}
                  </span>
                  {busy && (
                    <div className="mt-1.5 space-y-1">
                      <p className="truncate rounded bg-gold-soft px-1.5 py-0.5 text-[0.65rem] text-gold">
                        6 bookings
                      </p>
                      <p className="truncate rounded bg-emerald-soft px-1.5 py-0.5 text-[0.65rem] text-emerald">
                        £1,240
                      </p>
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </Surface>
      ) : (
        <Surface className="overflow-hidden">
          <div className="overflow-x-auto">
            <div className="min-w-[900px]">
              <div className="grid grid-cols-[160px_repeat(10,minmax(0,1fr))] border-b border-border bg-muted/40">
                <div className="px-4 py-3 text-xs font-semibold uppercase tracking-wider text-muted-foreground">
                  {view === 'room' ? 'Room' : 'Stylist'}
                </div>
                {HOURS.map((h) => (
                  <div key={h} className="px-2 py-3 text-center text-xs font-medium text-muted-foreground">
                    {h}
                  </div>
                ))}
              </div>
              {(view === 'room'
                ? ['Colour Bar', 'Studio 1', 'Studio 2', 'Treatment Room', 'Nail Lounge']
                : RESOURCES
              ).map((res, idx) => (
                <div
                  key={res}
                  className="relative grid grid-cols-[160px_repeat(10,minmax(0,1fr))] border-b border-border last:border-0"
                >
                  <div className="truncate px-4 py-5 text-sm font-medium">{res}</div>
                  {HOURS.map((h) => (
                    <div key={h} className="border-l border-border/70 py-5" />
                  ))}
                  {BLOCKS.filter((b) => (view === 'room' ? RESOURCES.indexOf(b.resource) === idx : b.resource === res)).map(
                    (b, i) => (
                      <button
                        key={i}
                        onClick={() => toast(`${b.client} — ${b.title}`, { description: 'Drag to reschedule' })}
                        className={cn(
                          'absolute top-2 h-[calc(100%-1rem)] overflow-hidden rounded-lg border px-2.5 py-1.5 text-left transition-transform hover:scale-[1.01]',
                          toneClass[b.tone],
                        )}
                        style={{
                          left: `calc(160px + (100% - 160px) * ${b.start} / 10 + 2px)`,
                          width: `calc((100% - 160px) * ${b.span} / 10 - 4px)`,
                        }}
                      >
                        <span className="block truncate text-xs font-semibold">{b.title}</span>
                        <span className="block truncate text-[0.68rem] opacity-80">{b.client}</span>
                      </button>
                    ),
                  )}
                </div>
              ))}
            </div>
          </div>
        </Surface>
      )}
    </div>
  );
}

export default function CalendarPageRoute() {
  return (
    <Guard module="calendar" name="the Calendar">
      <CalendarPage />
    </Guard>
  );
}

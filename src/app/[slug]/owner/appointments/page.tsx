'use client';

import { useMemo, useState } from 'react';
import {
  CalendarDays,
  Check,
  Clock,
  Filter,
  KanbanSquare,
  List,
  LogIn,
  LogOut,
  MoreHorizontal,
  Plus,
  Repeat,
  Search,
  TriangleAlert,
  X,
} from 'lucide-react';
import {
  EmptyState,
  Guard,
  PageHeader,
  SectionCard,
  StatCard,
  StatusChip,
  Surface,
} from '@/components/owner/owner-portal/primitives';
import { Button } from '@/components/owner/owner-portal/button';
import { Input } from '@/components/owner/owner-portal/input';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/owner/owner-portal/tabs';
import { Avatar, AvatarFallback } from '@/components/owner/owner-portal/avatar';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/owner/owner-portal/dropdown-menu';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/owner/owner-portal/select';
import { appointments, type Appointment, type AppointmentStatus } from '@/data/portal';
import { useSession } from '@/lib/portal/session';
import { toast } from 'sonner';
import type { Tone } from '@/components/owner/owner-portal/primitives';

const statusTone: Record<AppointmentStatus, Tone | 'danger' | 'warning'> = {
  confirmed: 'azure',
  'checked-in': 'royal',
  'in-service': 'gold',
  completed: 'emerald',
  cancelled: 'danger',
  'no-show': 'danger',
  waitlist: 'warning',
};

const KANBAN: { key: AppointmentStatus; label: string }[] = [
  { key: 'waitlist', label: 'Waiting list' },
  { key: 'confirmed', label: 'Confirmed' },
  { key: 'checked-in', label: 'Checked in' },
  { key: 'in-service', label: 'In service' },
  { key: 'completed', label: 'Completed' },
];

function BookingCard({ a }: { a: Appointment }) {
  const { can } = useSession();
  return (
    <Surface className="p-4 transition-shadow hover:shadow-[var(--shadow-lifted)]">
      <div className="grid grid-cols-[auto_minmax(0,1fr)_auto] items-start gap-3">
        <Avatar className="size-9 shrink-0">
          <AvatarFallback className="bg-accent text-[0.7rem] font-semibold">{a.initials}</AvatarFallback>
        </Avatar>
        <div className="min-w-0">
          <p className="truncate text-sm font-semibold">{a.customer}</p>
          <p className="truncate text-xs text-muted-foreground">{a.service}</p>
        </div>
        <StatusChip tone={statusTone[a.status]}>{a.status}</StatusChip>
      </div>
      <div className="mt-3 flex flex-wrap items-center gap-x-4 gap-y-1 text-xs text-muted-foreground">
        <span className="inline-flex items-center gap-1">
          <Clock className="size-3.5" /> {a.start} · {a.duration}m
        </span>
        <span>{a.staff}</span>
        <span className="font-medium text-foreground">£{a.price}</span>
        <StatusChip tone={a.paid ? 'emerald' : 'neutral'}>{a.paid ? 'Paid' : 'Unpaid'}</StatusChip>
      </div>
      {a.notes && (
        <p className="mt-3 rounded-lg bg-gold-soft px-3 py-2 text-xs text-gold">{a.notes}</p>
      )}
      {can('appointments', 'edit') && (
        <div className="mt-3 flex flex-wrap gap-2">
          <Button size="sm" variant="subtle" onClick={() => toast.success(`${a.customer} checked in`)}>
            <LogIn className="size-3.5" /> Check in
          </Button>
          <Button size="sm" variant="subtle" onClick={() => toast.success(`${a.customer} checked out`)}>
            <LogOut className="size-3.5" /> Check out
          </Button>
          <Button size="sm" variant="ghost" onClick={() => toast('Reschedule drawer opened')}>
            <Repeat className="size-3.5" /> Reschedule
          </Button>
        </div>
      )}
    </Surface>
  );
}

function Appointments() {
  const { can, role, user } = useSession();
  const [query, setQuery] = useState('');
  const [staffFilter, setStaffFilter] = useState('all');
  const scopedToMe = role.id === 'stylist';

  const rows = useMemo(() => {
    return appointments.filter((a) => {
      if (scopedToMe && a.staff !== user.name) return false;
      if (staffFilter !== 'all' && a.staff !== staffFilter) return false;
      const q = query.toLowerCase();
      return !q || a.customer.toLowerCase().includes(q) || a.service.toLowerCase().includes(q);
    });
  }, [query, staffFilter, scopedToMe, user.name]);

  const staffNames = Array.from(new Set(appointments.map((a) => a.staff)));

  return (
    <div className="space-y-6">
      <PageHeader
        eyebrow="Operations"
        title="Appointments"
        description={
          scopedToMe
            ? "You're seeing only the bookings assigned to your chair."
            : 'Every booking across the floor — drag between stages, resolve conflicts and manage the waiting list.'
        }
        actions={
          can('appointments', 'create') && (
            <>
              <Button variant="outline" onClick={() => toast.success('Walk-in added to waiting list')}>
                Add walk-in
              </Button>
              <Button variant="gold" onClick={() => toast.success('New booking drawer opened')}>
                <Plus className="size-4" /> New booking
              </Button>
            </>
          )
        }
      />

      <section className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
        <StatCard label="Booked today" value={String(rows.length)} icon={CalendarDays} tone="gold" />
        <StatCard label="Checked in" value="7" icon={LogIn} tone="royal" />
        <StatCard label="Waiting list" value="3" icon={Clock} tone="azure" />
        <StatCard label="Conflicts" value="1" hint="15:00 double booking" icon={TriangleAlert} tone="neutral" />
      </section>

      <Surface className="flex items-center gap-3 border-warning/40 bg-warning-soft p-4">
        <TriangleAlert className="size-5 shrink-0 text-warning-foreground" />
        <p className="min-w-0 flex-1 text-sm text-warning-foreground">
          Conflict detected — Leila Haddad is double-booked at 15:00. Suggested slot: 15:30 with Ivy
          Marchetti.
        </p>
        <Button size="sm" variant="subtle" onClick={() => toast.success('Conflict resolved')}>
          Resolve
        </Button>
      </Surface>

      <Tabs defaultValue="list">
        <div className="grid grid-cols-1 gap-3 md:grid-cols-[auto_minmax(0,1fr)] md:items-center">
          <TabsList>
            <TabsTrigger value="list">
              <List className="mr-1.5 size-4" /> List
            </TabsTrigger>
            <TabsTrigger value="kanban">
              <KanbanSquare className="mr-1.5 size-4" /> Kanban
            </TabsTrigger>
            <TabsTrigger value="timeline">
              <Clock className="mr-1.5 size-4" /> Timeline
            </TabsTrigger>
          </TabsList>
          <div className="flex flex-wrap items-center gap-2 md:justify-end">
            <div className="relative min-w-0 flex-1 md:max-w-xs">
              <Search className="pointer-events-none absolute left-3 top-1/2 size-4 -translate-y-1/2 text-muted-foreground" />
              <Input
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder="Search bookings"
                className="pl-9"
                aria-label="Search bookings"
              />
            </div>
            <Select value={staffFilter} onValueChange={setStaffFilter}>
              <SelectTrigger className="w-[170px]" aria-label="Filter by staff">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All staff</SelectItem>
                {staffNames.map((n) => (
                  <SelectItem key={n} value={n}>
                    {n}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
            <Button variant="outline" size="icon" aria-label="Advanced filters">
              <Filter className="size-4" />
            </Button>
          </div>
        </div>

        <TabsContent value="list" className="mt-4">
          {rows.length === 0 ? (
            <Surface>
              <EmptyState
                icon={CalendarDays}
                title="No appointments match"
                description="Try clearing the search or staff filter to see the full day."
                action={
                  <Button
                    variant="outline"
                    onClick={() => {
                      setQuery('');
                      setStaffFilter('all');
                    }}
                  >
                    Clear filters
                  </Button>
                }
              />
            </Surface>
          ) : (
            <Surface className="overflow-hidden">
              <div className="overflow-x-auto">
                <table className="w-full min-w-[840px] text-sm">
                  <thead>
                    <tr className="border-b border-border bg-muted/40 text-left text-xs uppercase tracking-wider text-muted-foreground">
                      <th scope="col" className="px-5 py-3 font-semibold">Client</th>
                      <th scope="col" className="px-5 py-3 font-semibold">Service</th>
                      <th scope="col" className="px-5 py-3 font-semibold">Staff</th>
                      <th scope="col" className="px-5 py-3 font-semibold">Time</th>
                      <th scope="col" className="px-5 py-3 font-semibold">Status</th>
                      <th scope="col" className="px-5 py-3 font-semibold">Payment</th>
                      <th scope="col" className="px-5 py-3 text-right font-semibold">Actions</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-border">
                    {rows.map((a) => (
                      <tr key={a.id} className="transition-colors hover:bg-muted/40">
                        <td className="px-5 py-3.5">
                          <div className="flex items-center gap-3">
                            <Avatar className="size-8 shrink-0">
                              <AvatarFallback className="bg-accent text-[0.65rem] font-semibold">
                                {a.initials}
                              </AvatarFallback>
                            </Avatar>
                            <div className="min-w-0">
                              <p className="truncate font-medium">{a.customer}</p>
                              <p className="truncate text-xs text-muted-foreground">{a.id}</p>
                            </div>
                          </div>
                        </td>
                        <td className="px-5 py-3.5">{a.service}</td>
                        <td className="px-5 py-3.5 text-muted-foreground">{a.staff}</td>
                        <td className="px-5 py-3.5 tabular-nums">
                          {a.start} <span className="text-muted-foreground">· {a.duration}m</span>
                        </td>
                        <td className="px-5 py-3.5">
                          <StatusChip tone={statusTone[a.status]}>{a.status}</StatusChip>
                        </td>
                        <td className="px-5 py-3.5">
                          <StatusChip tone={a.paid ? 'emerald' : 'neutral'}>
                            {a.paid ? 'Paid' : `£${a.price} due`}
                          </StatusChip>
                        </td>
                        <td className="px-5 py-3.5 text-right">
                          <DropdownMenu>
                            <DropdownMenuTrigger asChild>
                              <Button variant="ghost" size="icon" aria-label={`Actions for ${a.customer}`}>
                                <MoreHorizontal className="size-4" />
                              </Button>
                            </DropdownMenuTrigger>
                            <DropdownMenuContent align="end">
                              <DropdownMenuItem onSelect={() => toast.success('Checked in')}>
                                <LogIn className="size-4" /> Check in
                              </DropdownMenuItem>
                              <DropdownMenuItem onSelect={() => toast.success('Marked complete')}>
                                <Check className="size-4" /> Complete
                              </DropdownMenuItem>
                              <DropdownMenuItem onSelect={() => toast('Reschedule drawer opened')}>
                                <Repeat className="size-4" /> Reschedule
                              </DropdownMenuItem>
                              <DropdownMenuSeparator />
                              <DropdownMenuItem
                                className="text-destructive focus:text-destructive"
                                disabled={!can('appointments', 'delete')}
                                onSelect={() => toast.error('Booking cancelled')}
                              >
                                <X className="size-4" /> Cancel booking
                              </DropdownMenuItem>
                            </DropdownMenuContent>
                          </DropdownMenu>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </Surface>
          )}
        </TabsContent>

        <TabsContent value="kanban" className="mt-4">
          <div className="grid gap-4 md:grid-cols-3 xl:grid-cols-5">
            {KANBAN.map((col) => {
              const items = rows.filter((a) => a.status === col.key);
              return (
                <div key={col.key} className="min-w-0">
                  <div className="mb-3 flex items-center justify-between">
                    <p className="text-sm font-semibold">{col.label}</p>
                    <span className="rounded-full bg-muted px-2 py-0.5 text-xs text-muted-foreground">
                      {items.length}
                    </span>
                  </div>
                  <div className="space-y-3">
                    {items.map((a) => (
                      <BookingCard key={a.id} a={a} />
                    ))}
                    {items.length === 0 && (
                      <div className="rounded-xl border border-dashed border-border p-6 text-center text-xs text-muted-foreground">
                        Drop bookings here
                      </div>
                    )}
                  </div>
                </div>
              );
            })}
          </div>
        </TabsContent>

        <TabsContent value="timeline" className="mt-4">
          <SectionCard title="Day timeline" description="09:00 – 19:00 · drag to reschedule" bodyClassName="p-0">
            <ol className="divide-y divide-border">
              {rows.map((a) => (
                <li key={a.id} className="grid grid-cols-[64px_minmax(0,1fr)] gap-4 px-5 py-4">
                  <span className="pt-1 text-sm font-semibold tabular-nums text-muted-foreground">
                    {a.start}
                  </span>
                  <div
                    className="min-w-0 rounded-xl border-l-4 bg-muted/40 px-4 py-3"
                    style={{ borderColor: 'var(--gold)' }}
                  >
                    <div className="grid grid-cols-[minmax(0,1fr)_auto] items-center gap-3">
                      <p className="truncate text-sm font-medium">
                        {a.customer} — {a.service}
                      </p>
                      <StatusChip tone={statusTone[a.status]}>{a.status}</StatusChip>
                    </div>
                    <p className="mt-1 text-xs text-muted-foreground">
                      {a.staff} · {a.duration} minutes · £{a.price}
                    </p>
                  </div>
                </li>
              ))}
            </ol>
          </SectionCard>
        </TabsContent>
      </Tabs>
    </div>
  );
}

export default function AppointmentsPage() {
  return (
    <Guard module="appointments" name="Appointments">
      <Appointments />
    </Guard>
  );
}

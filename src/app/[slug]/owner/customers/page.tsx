'use client';

import { useMemo, useState } from 'react';
import {
  CalendarHeart,
  Gift,
  Heart,
  Mail,
  Phone,
  Plus,
  Search,
  Sparkles,
  Star,
  Users,
  Wallet,
} from 'lucide-react';
import {
  EmptyState,
  Guard,
  PageHeader,
  StatCard,
  StatusChip,
  Surface,
} from '@/components/owner/owner-portal/primitives';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import { Sheet, SheetContent, SheetDescription, SheetHeader, SheetTitle } from '@/components/ui/sheet';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { customers, type Customer } from '@/data/portal';
import { useSession } from '@/lib/portal/session';
import { toast } from 'sonner';

const SEGMENTS = ['All', 'VIP', 'Regular', 'New', 'Inactive'] as const;

function CustomersPage() {
  const { can } = useSession();
  const [query, setQuery] = useState('');
  const [segment, setSegment] = useState<(typeof SEGMENTS)[number]>('All');
  const [active, setActive] = useState<Customer | null>(null);

  const rows = useMemo(
    () =>
      customers.filter((c) => {
        if (segment !== 'All' && c.tier !== segment) return false;
        const q = query.toLowerCase();
        return !q || c.name.toLowerCase().includes(q) || c.email.toLowerCase().includes(q);
      }),
    [query, segment],
  );

  return (
    <div className="space-y-6">
      <PageHeader
        eyebrow="Clients"
        title="Customers & CRM"
        description="Every guest, their history, spend and preferences — one profile across all locations."
        actions={
          can('customers', 'create') && (
            <>
              <Button variant="outline" onClick={() => toast('Import wizard opened')}>Import</Button>
              <Button variant="gold" onClick={() => toast.success('New customer drawer opened')}>
                <Plus className="size-4" /> Add customer
              </Button>
            </>
          )
        }
      />

      <section className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
        <StatCard label="Total customers" value="4,812" delta="+139" hint="This month" icon={Users} tone="gold" />
        <StatCard label="VIP members" value="327" delta="+12" icon={Star} tone="royal" />
        <StatCard label="Wallet liability" value="£18,940" icon={Wallet} tone="azure" />
        <StatCard label="Birthdays this week" value="14" hint="Auto campaign live" icon={CalendarHeart} tone="emerald" />
      </section>

      <div className="grid grid-cols-1 gap-3 md:flex md:flex-wrap md:items-center md:justify-between">
        <div className="flex flex-wrap gap-2">
          {SEGMENTS.map((s) => (
            <Button
              key={s}
              size="sm"
              variant={segment === s ? 'default' : 'outline'}
              onClick={() => setSegment(s)}
            >
              {s}
            </Button>
          ))}
        </div>
        <div className="relative md:w-72">
          <Search className="pointer-events-none absolute left-3 top-1/2 size-4 -translate-y-1/2 text-muted-foreground" />
          <Input
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search name or email"
            className="pl-9"
            aria-label="Search customers"
          />
        </div>
      </div>

      {rows.length === 0 ? (
        <Surface>
          <EmptyState
            icon={Users}
            title="No customers in this segment"
            description="Adjust your filters or import a client list to get started."
            action={
              <Button
                variant="outline"
                onClick={() => {
                  setQuery('');
                  setSegment('All');
                }}
              >
                Reset
              </Button>
            }
          />
        </Surface>
      ) : (
        <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
          {rows.map((c) => (
            <Surface key={c.id} className="p-5 transition-shadow hover:shadow-[var(--shadow-lifted)]">
              <div className="grid grid-cols-[auto_minmax(0,1fr)_auto] items-start gap-3">
                <Avatar className="size-11 shrink-0">
                  <AvatarFallback className="bg-accent text-sm font-semibold text-accent-foreground">
                    {c.initials}
                  </AvatarFallback>
                </Avatar>
                <div className="min-w-0">
                  <p className="truncate text-sm font-semibold">{c.name}</p>
                  <p className="truncate text-xs text-muted-foreground">{c.email}</p>
                </div>
                <StatusChip tone={c.tier === 'VIP' ? 'gold' : c.tier === 'Inactive' ? 'neutral' : 'azure'}>
                  {c.tier}
                </StatusChip>
              </div>

              <dl className="mt-4 grid grid-cols-3 gap-2 rounded-xl bg-muted/50 p-3 text-center">
                <div>
                  <dt className="text-[0.68rem] uppercase tracking-wider text-muted-foreground">Visits</dt>
                  <dd className="text-sm font-semibold">{c.visits}</dd>
                </div>
                <div>
                  <dt className="text-[0.68rem] uppercase tracking-wider text-muted-foreground">Spend</dt>
                  <dd className="text-sm font-semibold">£{c.spend.toLocaleString()}</dd>
                </div>
                <div>
                  <dt className="text-[0.68rem] uppercase tracking-wider text-muted-foreground">Points</dt>
                  <dd className="text-sm font-semibold">{c.points}</dd>
                </div>
              </dl>

              <div className="mt-3 flex flex-wrap gap-1.5">
                {c.membership && <StatusChip tone="royal">{c.membership}</StatusChip>}
                {c.tags.map((t) => (
                  <StatusChip key={t} tone="neutral">{t}</StatusChip>
                ))}
              </div>

              <div className="mt-4 flex items-center justify-between">
                <p className="text-xs text-muted-foreground">Last visit · {c.lastVisit}</p>
                <Button size="sm" variant="subtle" onClick={() => setActive(c)}>
                  View profile
                </Button>
              </div>
            </Surface>
          ))}
        </div>
      )}

      <Sheet open={!!active} onOpenChange={(o) => !o && setActive(null)}>
        <SheetContent className="w-full overflow-y-auto sm:max-w-lg">
          {active && (
            <>
              <SheetHeader>
                <SheetTitle className="text-display text-xl">{active.name}</SheetTitle>
                <SheetDescription>
                  {active.id} · Client since 2022 · Favourite stylist {active.favouriteStaff}
                </SheetDescription>
              </SheetHeader>

              <div className="space-y-5 px-4 pb-8">
                <div className="grid grid-cols-2 gap-3">
                  <Surface className="p-4">
                    <p className="text-xs text-muted-foreground">Wallet</p>
                    <p className="text-lg font-semibold">£{active.wallet}</p>
                  </Surface>
                  <Surface className="p-4">
                    <p className="text-xs text-muted-foreground">Loyalty points</p>
                    <p className="text-lg font-semibold">{active.points}</p>
                  </Surface>
                </div>

                <Tabs defaultValue="overview">
                  <TabsList className="w-full">
                    <TabsTrigger value="overview" className="flex-1">Overview</TabsTrigger>
                    <TabsTrigger value="history" className="flex-1">History</TabsTrigger>
                    <TabsTrigger value="notes" className="flex-1">Notes</TabsTrigger>
                  </TabsList>
                  <TabsContent value="overview" className="mt-4 space-y-3 text-sm">
                    <p className="flex items-center gap-2"><Mail className="size-4 text-muted-foreground" /> {active.email}</p>
                    <p className="flex items-center gap-2"><Phone className="size-4 text-muted-foreground" /> {active.phone}</p>
                    <p className="flex items-center gap-2"><Gift className="size-4 text-muted-foreground" /> Birthday · 14 March</p>
                    <p className="flex items-center gap-2"><Heart className="size-4 text-muted-foreground" /> Prefers ammonia-free colour</p>
                    <p className="flex items-center gap-2"><Sparkles className="size-4 text-muted-foreground" /> Membership · {active.membership ?? 'None'}</p>
                  </TabsContent>
                  <TabsContent value="history" className="mt-4">
                    <ol className="space-y-4 border-l border-border pl-4">
                      {['Balayage + Gloss · £285', 'Signature Facial · £130', 'Cut & Style · £78', 'Gel Manicure · £65'].map(
                        (h, i) => (
                          <li key={i} className="relative">
                            <span className="absolute -left-[21px] top-1.5 size-2.5 rounded-full bg-gold" />
                            <p className="text-sm font-medium">{h}</p>
                            <p className="text-xs text-muted-foreground">{['Today', '3 weeks ago', '2 months ago', '4 months ago'][i]}</p>
                          </li>
                        ),
                      )}
                    </ol>
                  </TabsContent>
                  <TabsContent value="notes" className="mt-4 space-y-3">
                    <Surface className="p-4 text-sm">
                      <p className="font-medium">Medical note</p>
                      <p className="mt-1 text-muted-foreground">Sensitive scalp — patch test required before colour.</p>
                    </Surface>
                    <Surface className="p-4 text-sm">
                      <p className="font-medium">Consent form</p>
                      <p className="mt-1 text-muted-foreground">Signed 12 Feb 2026 · Colour services</p>
                    </Surface>
                  </TabsContent>
                </Tabs>

                <div className="flex flex-wrap gap-2">
                  <Button variant="gold" onClick={() => toast.success('Booking drawer opened')}>Book appointment</Button>
                  <Button variant="outline" onClick={() => toast('Message composer opened')}>Message</Button>
                </div>
              </div>
            </>
          )}
        </SheetContent>
      </Sheet>
    </div>
  );
}

export default function CustomersPageRoute() {
  return (
    <Guard module="customers" name="Customers & CRM">
      <CustomersPage />
    </Guard>
  );
}

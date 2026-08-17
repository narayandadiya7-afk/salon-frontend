'use client';

import Link from 'next/link';
import { useParams } from 'next/navigation';
import { toast } from 'sonner';
import {
  Area,
  AreaChart,
  Bar,
  BarChart,
  CartesianGrid,
  Cell,
  Line,
  LineChart,
  Pie,
  PieChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from 'recharts';
import {
  ArrowUpRight,
  CalendarCheck,
  CalendarPlus,
  CreditCard,
  Crown,
  PackageX,
  Plus,
  Receipt,
  Repeat,
  Star,
  Ticket,
  UserPlus,
  Users,
  Wallet,
} from 'lucide-react';
import {
  EmptyState,
  PageHeader,
  SectionCard,
  StatCard,
  StatusChip,
  Surface,
} from '@/components/portal/primitives';
import { Button } from '@/components/ui/button';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import { Progress } from '@/components/ui/progress';
import { useSession } from '@/lib/portal/session';
import {
  acquisition,
  appointments,
  customers,
  inventory,
  monthlyRevenue,
  reviews,
  revenueByDay,
  servicePopularity,
  staff,
  staffPerformance,
} from '@/data/portal';

const chartColors = ['var(--gold)', 'var(--royal)', 'var(--azure)', 'var(--emerald)', 'var(--chart-5)'];

function ChartTip({ active, payload, label }: any) {
  if (!active || !payload?.length) return null;
  return (
    <div className="rounded-lg border border-border bg-popover px-3 py-2 text-xs shadow-[var(--shadow-lifted)]">
      <p className="font-semibold text-popover-foreground">{label}</p>
      {payload.map((p: any) => (
        <p key={p.dataKey} className="mt-0.5 text-muted-foreground">
          {p.name}: <span className="font-medium text-popover-foreground">{p.value}</span>
        </p>
      ))}
    </div>
  );
}

function Dashboard() {
  const params = useParams();
  const slug = (params?.slug as string) || '';
  const { role, user, can } = useSession();
  const isStylist = role.id === 'stylist';
  const myAppointments = appointments.filter((a) => a.staff === user.name);
  const shown = isStylist ? myAppointments : appointments;

  return (
    <div className="space-y-6">
      <PageHeader
        eyebrow={`${role.name} workspace`}
        title={`Good afternoon, ${user.name.split(' ')[0]}`}
        description={
          isStylist
            ? 'Your chair, your clients, your day. Everything else is hidden by your role permissions.'
            : 'A live read on revenue, bookings, team performance and stock across the salon.'
        }
        actions={
          <>
            {can('appointments', 'create') && (
              <Button variant="gold" onClick={() => toast.success('New booking drawer opened.')}>
                <Plus className="size-4" /> New booking
              </Button>
            )}
            {can('reports', 'export') && (
              <Button variant="outline" onClick={() => toast('Preparing PDF export…')}>
                Export report
              </Button>
            )}
          </>
        }
      />

      <section aria-label="Key metrics" className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
        {isStylist ? (
          <>
            <StatCard label="Your appointments today" value={String(myAppointments.length || 4)} icon={CalendarCheck} tone="gold" />
            <StatCard label="Hours booked" value="6.5 / 8" delta="+12%" icon={Repeat} tone="azure" />
            <StatCard label="Commission this week" value="£742" delta="+8%" icon={Wallet} tone="emerald" />
            <StatCard label="Client rating" value="4.9" hint="Across 128 reviews" icon={Star} tone="royal" />
          </>
        ) : (
          <>
            <StatCard label="Today's revenue" value="£6,482" delta="+14.2%" hint="vs. same day last week" icon={Wallet} tone="gold" />
            <StatCard label="Today's appointments" value="38" delta="+6" hint="9 walk-ins · 3 waitlist" icon={CalendarCheck} tone="royal" />
            <StatCard label="Average ticket" value="£171" delta="+4.8%" hint="Retail attach 28%" icon={Receipt} tone="azure" />
            <StatCard label="Returning customers" value="72%" delta="-1.4%" hint="Rolling 30 days" icon={Repeat} tone="emerald" />
          </>
        )}
      </section>

      <section className="grid gap-4 xl:grid-cols-3">
        <SectionCard
          title="Revenue this week"
          description="Services + retail, compared with last week"
          className="xl:col-span-2"
          action={<StatusChip tone="emerald">+14.2%</StatusChip>}
        >
          <div className="h-[280px] w-full">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={revenueByDay} margin={{ left: -18, right: 8, top: 8 }}>
                <defs>
                  <linearGradient id="rev" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="0%" stopColor="var(--gold)" stopOpacity={0.45} />
                    <stop offset="100%" stopColor="var(--gold)" stopOpacity={0.02} />
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" stroke="var(--border)" vertical={false} />
                <XAxis dataKey="day" tickLine={false} axisLine={false} fontSize={12} stroke="var(--muted-foreground)" />
                <YAxis tickLine={false} axisLine={false} fontSize={12} stroke="var(--muted-foreground)" />
                <Tooltip content={<ChartTip />} />
                <Area type="monotone" dataKey="revenue" name="This week" stroke="var(--gold)" strokeWidth={2.5} fill="url(#rev)" />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </SectionCard>

        <SectionCard title="Service popularity" description="Share of bookings, 30 days">
          <div className="h-[280px] w-full">
            <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie data={servicePopularity} dataKey="value" nameKey="name" innerRadius={62} outerRadius={98} paddingAngle={3} stroke="none">
                  {servicePopularity.map((_, i) => (
                    <Cell key={i} fill={chartColors[i % chartColors.length]} />
                  ))}
                </Pie>
                <Tooltip content={<ChartTip />} />
              </PieChart>
            </ResponsiveContainer>
          </div>
          <ul className="mt-2 space-y-2">
            {servicePopularity.map((s, i) => (
              <li key={s.name} className="flex items-center gap-2 text-sm">
                <span className="size-2.5 rounded-full" style={{ background: chartColors[i % chartColors.length] }} />
                <span className="min-w-0 flex-1 truncate text-muted-foreground">{s.name}</span>
                <span className="font-medium">{s.value}%</span>
              </li>
            ))}
          </ul>
        </SectionCard>
      </section>

      <section className="grid gap-4 xl:grid-cols-3">
        <SectionCard
          title={isStylist ? 'Your schedule today' : 'Upcoming bookings'}
          description="Live from the calendar"
          className="xl:col-span-2"
          bodyClassName="p-0"
          action={
            <Button asChild variant="ghost" size="sm">
              <Link href={`/${slug}/owner/appointments`}>
                View all <ArrowUpRight className="size-4" />
              </Link>
            </Button>
          }
        >
          <ul className="divide-y divide-border">
            {shown.slice(0, 6).map((a) => (
              <li key={a.id} className="grid grid-cols-[auto_minmax(0,1fr)_auto] items-center gap-3 px-5 py-3.5">
                <Avatar className="size-10 shrink-0">
                  <AvatarFallback className="bg-accent text-xs font-semibold text-accent-foreground">{a.initials}</AvatarFallback>
                </Avatar>
                <div className="min-w-0">
                  <p className="truncate text-sm font-medium">{a.customer}</p>
                  <p className="truncate text-xs text-muted-foreground">
                    {a.service} · {a.staff}
                  </p>
                </div>
                <div className="shrink-0 text-right">
                  <p className="text-sm font-semibold tabular-nums">{a.start}</p>
                  <p className="text-xs text-muted-foreground">{a.duration}m · £{a.price}</p>
                </div>
              </li>
            ))}
          </ul>
        </SectionCard>

        <div className="space-y-4">
          <SectionCard title="Quick actions" description="Scoped to your permissions">
            <div className="grid grid-cols-2 gap-2">
              {[
                { label: 'New booking', icon: CalendarPlus, module: 'appointments' as const },
                { label: 'Add walk-in', icon: UserPlus, module: 'appointments' as const },
                { label: 'Take payment', icon: CreditCard, module: 'pos' as const },
                { label: 'Sell gift card', icon: Ticket, module: 'pos' as const },
                { label: 'Add customer', icon: Users, module: 'customers' as const },
                { label: 'New campaign', icon: Crown, module: 'marketing' as const },
              ]
                .filter((q) => can(q.module, 'create') || can(q.module, 'edit'))
                .map((q) => (
                  <button
                    key={q.label}
                    onClick={() => toast.success(`${q.label} — opened`)}
                    className="flex flex-col items-start gap-2 rounded-xl border border-border bg-muted/40 p-3 text-left text-xs font-medium transition-colors hover:border-gold/50 hover:bg-gold-soft"
                  >
                    <q.icon className="size-4 text-gold" />
                    {q.label}
                  </button>
                ))}
            </div>
          </SectionCard>

          {can('staff') && (
            <SectionCard title="Staff availability" description="On shift right now">
              <ul className="space-y-3">
                {staff.slice(0, 5).map((s) => (
                  <li key={s.id} className="flex items-center gap-3">
                    <Avatar className="size-8 shrink-0">
                      <AvatarFallback className="bg-secondary text-[0.65rem] font-semibold">{s.initials}</AvatarFallback>
                    </Avatar>
                    <div className="min-w-0 flex-1">
                      <p className="truncate text-sm font-medium">{s.name}</p>
                      <Progress value={s.utilisation} className="mt-1.5 h-1.5" />
                    </div>
                    <StatusChip tone={s.status === 'On shift' ? 'emerald' : s.status === 'Break' ? 'gold' : 'neutral'}>
                      {s.status}
                    </StatusChip>
                  </li>
                ))}
              </ul>
            </SectionCard>
          )}
        </div>
      </section>

      {!isStylist && (
        <section className="grid gap-4 xl:grid-cols-3">
          <SectionCard title="Customer acquisition" description="New vs. returning, 6 months">
            <div className="h-[220px]">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={acquisition} margin={{ left: -22, right: 4 }}>
                  <CartesianGrid strokeDasharray="3 3" stroke="var(--border)" vertical={false} />
                  <XAxis dataKey="month" tickLine={false} axisLine={false} fontSize={12} stroke="var(--muted-foreground)" />
                  <YAxis tickLine={false} axisLine={false} fontSize={12} stroke="var(--muted-foreground)" />
                  <Tooltip content={<ChartTip />} />
                  <Bar dataKey="returning" name="Returning" stackId="a" fill="var(--royal)" radius={[0, 0, 4, 4]} />
                  <Bar dataKey="new" name="New" stackId="a" fill="var(--gold)" radius={[4, 4, 0, 0]} />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </SectionCard>

          <SectionCard title="Monthly revenue" description="Services vs. retail">
            <div className="h-[220px]">
              <ResponsiveContainer width="100%" height="100%">
                <LineChart data={monthlyRevenue} margin={{ left: -12, right: 4 }}>
                  <CartesianGrid strokeDasharray="3 3" stroke="var(--border)" vertical={false} />
                  <XAxis dataKey="month" tickLine={false} axisLine={false} fontSize={12} stroke="var(--muted-foreground)" />
                  <YAxis hide />
                  <Tooltip content={<ChartTip />} />
                  <Line type="monotone" dataKey="services" name="Services" stroke="var(--azure)" strokeWidth={2.5} dot={false} />
                  <Line type="monotone" dataKey="retail" name="Retail" stroke="var(--emerald)" strokeWidth={2.5} dot={false} />
                </LineChart>
              </ResponsiveContainer>
            </div>
          </SectionCard>

          <SectionCard title="Top employees" description="Revenue this month">
            <ul className="space-y-3.5">
              {staffPerformance.map((s) => (
                <li key={s.name}>
                  <div className="flex items-center justify-between text-sm">
                    <span className="font-medium">{s.name}</span>
                    <span className="tabular-nums text-muted-foreground">£{s.revenue.toLocaleString()}</span>
                  </div>
                  <Progress value={(s.revenue / 20000) * 100} className="mt-1.5 h-1.5" />
                </li>
              ))}
            </ul>
          </SectionCard>
        </section>
      )}

      <section className="grid gap-4 xl:grid-cols-3">
        {can('inventory') && (
          <SectionCard title="Low inventory" description="Reorder needed" bodyClassName="p-0">
            <ul className="divide-y divide-border">
              {inventory
                .filter((p) => p.status !== 'Healthy')
                .map((p) => (
                  <li key={p.id} className="grid grid-cols-[minmax(0,1fr)_auto] items-center gap-3 px-5 py-3.5">
                    <div className="min-w-0">
                      <p className="truncate text-sm font-medium">{p.name}</p>
                      <p className="truncate text-xs text-muted-foreground">{p.supplier}</p>
                    </div>
                    <StatusChip tone={p.status === 'Critical' ? 'danger' : 'warning'}>{p.stock} left</StatusChip>
                  </li>
                ))}
            </ul>
          </SectionCard>
        )}

        {can('customers') && (
          <SectionCard title="Recent customers" description="Last visits" bodyClassName="p-0">
            <ul className="divide-y divide-border">
              {customers.slice(0, 4).map((c) => (
                <li key={c.id} className="grid grid-cols-[auto_minmax(0,1fr)_auto] items-center gap-3 px-5 py-3.5">
                  <Avatar className="size-9 shrink-0">
                    <AvatarFallback className="bg-accent text-[0.7rem] font-semibold">{c.initials}</AvatarFallback>
                  </Avatar>
                  <div className="min-w-0">
                    <p className="truncate text-sm font-medium">{c.name}</p>
                    <p className="truncate text-xs text-muted-foreground">{c.lastVisit}</p>
                  </div>
                  <StatusChip tone={c.tier === 'VIP' ? 'gold' : c.tier === 'Inactive' ? 'neutral' : 'azure'}>{c.tier}</StatusChip>
                </li>
              ))}
            </ul>
          </SectionCard>
        )}

        <SectionCard title="Recent reviews" description="Across Google & Fresha">
          {reviews.length === 0 ? (
            <EmptyState icon={Star} title="No reviews yet" description="Reviews will appear here once clients respond." />
          ) : (
            <ul className="space-y-4">
              {reviews.map((r) => (
                <li key={r.id}>
                  <div className="flex items-center gap-2">
                    <span className="text-sm font-medium">{r.author}</span>
                    <span className="flex text-gold">
                      {Array.from({ length: r.rating }).map((_, i) => (
                        <Star key={i} className="size-3.5 fill-current" />
                      ))}
                    </span>
                    <span className="ml-auto text-xs text-muted-foreground">{r.when}</span>
                  </div>
                  <p className="mt-1 text-sm leading-relaxed text-muted-foreground">{r.text}</p>
                </li>
              ))}
            </ul>
          )}
        </SectionCard>
      </section>

      {!can('inventory') && (
        <Surface className="flex items-center gap-4 border-dashed p-5">
          <PackageX className="size-5 shrink-0 text-muted-foreground" />
          <p className="text-sm text-muted-foreground">
            Inventory, finance and website widgets are hidden because the{' '}
            <strong className="text-foreground">{role.name}</strong> role has no access to those modules.
          </p>
        </Surface>
      )}
    </div>
  );
}

export default function OwnerDashboardPage() {
  return <Dashboard />;
}

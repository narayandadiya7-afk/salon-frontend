'use client';

import { useState } from 'react';
import {
  ArrowDownRight,
  ArrowUpRight,
  BarChart3,
  CalendarDays,
  Download,
  Filter,
  LineChart,
  PieChart,
  Scissors,
  Star,
  TrendingUp,
  Users,
  Wallet,
} from 'lucide-react';
import {
  Bar,
  BarChart,
  CartesianGrid,
  Cell,
  Line,
  LineChart as ReLineChart,
  Pie,
  PieChart as RePieChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from 'recharts';
import {
  EmptyState,
  PageHeader,
  SectionCard,
  StatCard,
  StatusChip,
  Surface,
} from '@/components/portal/primitives';
import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';
import { useSession } from '@/lib/portal/session';
import { cn } from '@/lib/utils';

const chartColors = ['var(--gold)', 'var(--royal)', 'var(--azure)', 'var(--emerald)'];

const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
const revenueData = months.map((m, i) => ({
  month: m,
  revenue: [285, 312, 298, 341, 365, 352, 384, 378, 395, 410, 398, 425][i]!,
}));

const serviceData = [
  { name: 'Haircut', bookings: 284, revenue: 426, growth: 12 },
  { name: 'Facial', bookings: 196, revenue: 431, growth: 8 },
  { name: 'Manicure', bookings: 168, revenue: 302, growth: -3 },
  { name: 'Hair Coloring', bookings: 142, revenue: 497, growth: 15 },
  { name: 'Massage', bookings: 98, revenue: 392, growth: 5 },
  { name: 'Bridal Makeup', bookings: 52, revenue: 260, growth: 22 },
];

const staffData = [
  { name: 'Ananya', role: 'Senior Stylist', bookings: 186, revenue: 279, rating: 4.9, util: 92, color: 'var(--gold)' },
  { name: 'Rahul', role: 'Barber', bookings: 152, revenue: 182, rating: 4.7, util: 78, color: 'var(--royal)' },
  { name: 'Priya', role: 'Esthetician', bookings: 138, revenue: 220, rating: 4.8, util: 85, color: 'var(--azure)' },
  { name: 'Vikram', role: 'Colorist', bookings: 112, revenue: 201, rating: 4.6, util: 71, color: 'var(--emerald)' },
];

const retentionData = [
  { month: 'Jan', newC: 86, returning: 52, rate: 60.5 },
  { month: 'Feb', newC: 94, returning: 61, rate: 64.9 },
  { month: 'Mar', newC: 78, returning: 52, rate: 66.7 },
  { month: 'Apr', newC: 102, returning: 70, rate: 68.6 },
  { month: 'May', newC: 88, returning: 62, rate: 70.5 },
  { month: 'Jun', newC: 96, returning: 66, rate: 68.5 },
];

const peakHours = [
  { hour: '9 AM', bookings: 8 }, { hour: '10 AM', bookings: 24 },
  { hour: '11 AM', bookings: 32 }, { hour: '12 PM', bookings: 28 },
  { hour: '1 PM', bookings: 12 }, { hour: '2 PM', bookings: 22 },
  { hour: '3 PM', bookings: 30 }, { hour: '4 PM', bookings: 26 },
  { hour: '5 PM', bookings: 18 }, { hour: '6 PM', bookings: 10 },
  { hour: '7 PM', bookings: 6 },
];
const maxPeak = Math.max(...peakHours.map((p) => p.bookings));

interface ChartTipProps {
  active?: boolean;
  payload?: Array<{ dataKey?: string; name?: string; value?: number }>;
  label?: string;
}

function ChartTip({ active, payload, label }: ChartTipProps) {
  if (!active || !payload?.length) return null;
  return (
    <div className="rounded-lg border border-border bg-popover px-3 py-2 text-xs shadow-[var(--shadow-lifted)]">
      <p className="font-semibold text-popover-foreground">{label}</p>
      {payload.map((p) => (
        <p key={p.dataKey} className="mt-0.5 text-muted-foreground">
          {p.name}: <span className="font-medium text-popover-foreground">{p.value}</span>
        </p>
      ))}
    </div>
  );
}

function AnalyticsContent() {
  const [chartMode, setChartMode] = useState<'revenue' | 'bookings'>('revenue');
  const { can } = useSession();
  const totalRevenue = revenueData.reduce((a, b) => a + b.revenue, 0);
  const avgMonthly = Math.round(totalRevenue / revenueData.length);
  const currentMonth = new Date().getMonth();

  return (
    <div className="space-y-6">
      <PageHeader
        eyebrow="Insight"
        title="Analytics & Insights"
        description="Track your salon's performance and growth."
        actions={
          <>
            <Button variant="outline" onClick={() => {}}>
              <Download className="size-4" /> Download Report
            </Button>
          </>
        }
      />

      <section className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
        <StatCard label="Total Revenue" value={`£${totalRevenue.toLocaleString()}k`} delta="+12.5%" hint="vs last month" icon={Wallet} tone="gold" />
        <StatCard label="Total Bookings" value="1,428" delta="+8.3%" hint="vs last month" icon={CalendarDays} tone="royal" />
        <StatCard label="Customer Retention" value="68.5%" delta="+5.2%" hint="vs last month" icon={Users} tone="azure" />
        <StatCard label="Avg. Rating" value="4.8" hint="From 156 reviews" icon={Star} tone="emerald" />
      </section>

      <SectionCard
        title="Revenue Overview"
        description="Monthly revenue (₹ thousands)"
        action={
          <div className="flex gap-1">
            {(['revenue', 'bookings'] as const).map((m) => (
              <button
                key={m}
                onClick={() => setChartMode(m)}
                className={cn(
                  'rounded-lg px-3 py-1.5 text-xs font-medium capitalize transition-colors',
                  chartMode === m ? 'bg-primary text-primary-foreground' : 'text-muted-foreground hover:bg-muted',
                )}
              >
                {m}
              </button>
            ))}
          </div>
        }
      >
        <div className="h-[260px] w-full">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={revenueData} margin={{ left: -18, right: 8, top: 8 }} accessibilityLayer={false}>
              <CartesianGrid strokeDasharray="3 3" stroke="var(--border)" vertical={false} />
              <XAxis dataKey="month" tickLine={false} axisLine={false} fontSize={12} stroke="var(--muted-foreground)" />
              <YAxis tickLine={false} axisLine={false} fontSize={12} stroke="var(--muted-foreground)" />
              <Tooltip content={<ChartTip />} />
              <Bar dataKey="revenue" name="Revenue" radius={[6, 6, 0, 0]}>
                {revenueData.map((_, i) => (
                  <Cell key={i} fill={i === currentMonth ? 'var(--gold)' : 'var(--gold-soft)'} />
                ))}
              </Bar>
            </BarChart>
          </ResponsiveContainer>
        </div>
        <div className="mt-4 grid grid-cols-3 gap-4 border-t border-border pt-4">
          <div>
            <p className="text-xs text-muted-foreground">Total Revenue (YTD)</p>
            <p className="mt-0.5 text-xl font-semibold">{totalRevenue.toLocaleString()}k</p>
          </div>
          <div>
            <p className="text-xs text-muted-foreground">Monthly Average</p>
            <p className="mt-0.5 text-xl font-semibold">{avgMonthly.toLocaleString()}k</p>
          </div>
          <div>
            <p className="text-xs text-muted-foreground">Projected Annual</p>
            <p className="mt-0.5 text-xl font-semibold text-gold">{(totalRevenue * 2).toLocaleString()}k</p>
          </div>
        </div>
      </SectionCard>

      <section className="grid gap-4 xl:grid-cols-3">
        <SectionCard title="Service Analytics" description="Bookings & growth" className="xl:col-span-2">
          <div className="overflow-x-auto">
            <table className="w-full min-w-[640px] text-sm">
              <thead>
                <tr className="border-b border-border text-left text-xs uppercase tracking-wider text-muted-foreground">
                  <th className="pb-3 font-semibold">Service</th>
                  <th className="pb-3 font-semibold">Bookings</th>
                  <th className="pb-3 font-semibold">Revenue</th>
                  <th className="pb-3 font-semibold">Growth</th>
                  <th className="pb-3 font-semibold">Popularity</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-border">
                {serviceData.map((s) => {
                  const maxBookings = Math.max(...serviceData.map((x) => x.bookings));
                  return (
                    <tr key={s.name} className="hover:bg-muted/30">
                      <td className="py-3 font-medium">
                        <span className="flex items-center gap-2.5">
                          <span className="grid size-7 place-items-center rounded-lg bg-gold-soft text-gold">
                            <Scissors className="size-3.5" />
                          </span>
                          {s.name}
                        </span>
                      </td>
                      <td className="py-3 font-semibold tabular-nums">{s.bookings}</td>
                      <td className="py-3 font-semibold tabular-nums text-emerald">£{s.revenue}k</td>
                      <td className="py-3">
                        <span className={cn('flex items-center gap-1 text-xs font-semibold', s.growth >= 0 ? 'text-emerald' : 'text-destructive')}>
                          {s.growth >= 0 ? <ArrowUpRight className="size-3" /> : <ArrowDownRight className="size-3" />}
                          {s.growth >= 0 ? '+' : ''}{s.growth}%
                        </span>
                      </td>
                      <td className="py-3">
                        <div className="flex items-center gap-2">
                          <div className="h-1.5 flex-1 overflow-hidden rounded-full bg-muted">
                            <div
                              className="h-full rounded-full bg-gradient-to-r from-gold to-royal"
                              style={{ width: `${(s.bookings / maxBookings) * 100}%` }}
                            />
                          </div>
                          <span className="w-8 text-right text-xs text-muted-foreground">
                            {Math.round((s.bookings / maxBookings) * 100)}%
                          </span>
                        </div>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </SectionCard>

        <SectionCard title="Staff Analytics" description="Performance this month">
          <div className="space-y-4">
            {staffData.map((s) => (
              <div key={s.name}>
                <div className="flex items-center gap-3">
                  <span className="grid size-9 shrink-0 place-items-center rounded-xl text-sm font-bold" style={{ background: `color-mix(in srgb, ${s.color} 15%, transparent)`, color: s.color }}>
                    {s.name.charAt(0)}
                  </span>
                  <div className="min-w-0 flex-1">
                    <div className="flex items-center justify-between">
                      <span className="truncate text-sm font-semibold">{s.name}</span>
                      <span className="flex items-center gap-1 text-xs text-muted-foreground">
                        <Star className="size-3 text-gold fill-current" /> {s.rating}
                      </span>
                    </div>
                    <p className="text-xs text-muted-foreground">{s.role}</p>
                  </div>
                </div>
                <div className="mt-2 grid grid-cols-3 gap-3 text-xs">
                  <div>
                    <p className="text-muted-foreground">Bookings</p>
                    <p className="font-semibold">{s.bookings}</p>
                  </div>
                  <div>
                    <p className="text-muted-foreground">Revenue</p>
                    <p className="font-semibold text-emerald">£{s.revenue}k</p>
                  </div>
                  <div>
                    <div className="flex items-center justify-between">
                      <p className="text-muted-foreground">Util.</p>
                      <p className="font-semibold" style={{ color: s.color }}>{s.util}%</p>
                    </div>
                    <Progress value={s.util} className="mt-1 h-1.5" />
                  </div>
                </div>
              </div>
            ))}
          </div>
        </SectionCard>
      </section>

      <section className="grid gap-4 xl:grid-cols-3">
        <SectionCard title="Customer Retention" description="New vs. returning, 6 months" className="xl:col-span-2">
          <div className="grid grid-cols-4 gap-4 text-center">
            <div>
              <p className="text-xs text-muted-foreground">Total</p>
              <p className="text-lg font-semibold">1,284</p>
            </div>
            <div>
              <p className="text-xs text-muted-foreground">Returning</p>
              <p className="text-lg font-semibold">68.5%</p>
            </div>
            <div>
              <p className="text-xs text-muted-foreground">Avg Visits</p>
              <p className="text-lg font-semibold">2.4/mo</p>
            </div>
            <div>
              <p className="text-xs text-muted-foreground">Churn</p>
              <p className="text-lg font-semibold">6.2%</p>
            </div>
          </div>
          <div className="mt-4 h-[180px] w-full">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={retentionData} margin={{ left: -18, right: 4 }} accessibilityLayer={false}>
                <CartesianGrid strokeDasharray="3 3" stroke="var(--border)" vertical={false} />
                <XAxis dataKey="month" tickLine={false} axisLine={false} fontSize={12} stroke="var(--muted-foreground)" />
                <YAxis tickLine={false} axisLine={false} fontSize={12} stroke="var(--muted-foreground)" />
                <Tooltip content={<ChartTip />} />
                <Bar dataKey="returning" name="Returning" stackId="a" fill="var(--royal)" radius={[0, 0, 4, 4]} />
                <Bar dataKey="newC" name="New" stackId="a" fill="var(--gold)" radius={[4, 4, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>
          <div className="mt-4 overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-border text-left text-xs uppercase tracking-wider text-muted-foreground">
                  <th className="pb-2 font-semibold">Month</th>
                  <th className="pb-2 font-semibold">New</th>
                  <th className="pb-2 font-semibold">Returning</th>
                  <th className="pb-2 font-semibold">Rate</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-border">
                {retentionData.map((r) => (
                  <tr key={r.month}>
                    <td className="py-2 font-semibold">{r.month}</td>
                    <td className="py-2 font-semibold tabular-nums">{r.newC}</td>
                    <td className="py-2 font-semibold tabular-nums text-emerald">{r.returning}</td>
                    <td className="py-2">
                      <span className={cn('font-semibold tabular-nums', r.rate >= 68 ? 'text-emerald' : 'text-gold')}>
                        {r.rate}%
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </SectionCard>

        <SectionCard title="Peak Hours" description="Weekday distribution">
          <div className="space-y-2">
            {peakHours.map((p) => (
              <div key={p.hour} className="flex items-center gap-2">
                <span className="w-10 shrink-0 text-right text-xs text-muted-foreground">{p.hour}</span>
                <div className="h-5 flex-1 overflow-hidden rounded-full bg-muted/50">
                  <div
                    className="h-full rounded-full bg-gradient-to-r from-gold to-royal transition-all"
                    style={{ width: `${(p.bookings / maxPeak) * 100}%` }}
                  />
                </div>
                <span className="w-6 text-right text-xs font-semibold tabular-nums">{p.bookings}</span>
              </div>
            ))}
          </div>
          <div className="mt-4 grid grid-cols-3 gap-3 border-t border-border pt-4 text-center">
            <div>
              <p className="text-xs text-muted-foreground">Peak Hour</p>
              <p className="text-sm font-semibold text-royal">11 AM</p>
              <p className="text-xs text-muted-foreground">32 bookings</p>
            </div>
            <div>
              <p className="text-xs text-muted-foreground">Total Daily</p>
              <p className="text-sm font-semibold">{peakHours.reduce((a, p) => a + p.bookings, 0)}</p>
              <p className="text-xs text-muted-foreground">bookings</p>
            </div>
            <div>
              <p className="text-xs text-muted-foreground">Avg/Hour</p>
              <p className="text-sm font-semibold">
                {Math.round(peakHours.reduce((a, p) => a + p.bookings, 0) / peakHours.length)}
              </p>
              <p className="text-xs text-muted-foreground">bookings</p>
            </div>
          </div>
        </SectionCard>
      </section>
    </div>
  );
}

export default function AnalyticsPage() {
  return <AnalyticsContent />;
}

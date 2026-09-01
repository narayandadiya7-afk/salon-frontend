"use client";

import {
  Area, AreaChart, Bar, BarChart, CartesianGrid, Cell, Legend, Line, LineChart, Pie, PieChart,
  ResponsiveContainer, Tooltip, XAxis, YAxis,
} from "recharts";
import {
  Building2, CircleCheck, Clock, Ban, DollarSign, TrendingUp, Gem, Users, CalendarDays,
  CalendarRange, Wallet, LifeBuoy, Plus, Download, ArrowRight,
} from "lucide-react";
import { PageHeader, KpiCard, Panel, StatusBadge } from "@/components/admin/admin-portal/primitives";
import { Button } from "@/components/admin/admin-portal/button";
import { Avatar, AvatarFallback } from "@/components/admin/admin-portal/avatar";
import { Progress } from "@/components/admin/admin-portal/progress";
import {
  activityFeed, compact, currency, dauSeries, expiringTrials, geoDistribution, planDistribution,
  recentPayments, revenueSeries, systemHealth, tenants,
} from "@/components/admin/admin-portal/mock-data";

const axis = { stroke: "var(--color-muted-foreground)", fontSize: 12 };

const tooltipStyle = {
  background: "var(--color-popover)",
  border: "1px solid var(--color-border)",
  borderRadius: 12,
  color: "var(--color-popover-foreground)",
  fontSize: 12,
  boxShadow: "var(--shadow-elevated)",
};

export default function DashboardPage() {
  return (
    <>
      <PageHeader
        title="Platform Dashboard"
        description="Live overview of every salon tenant, subscription and payment across SalonOS."
        breadcrumb={["Home", "Dashboard"]}
        actions={
          <>
            <Button variant="outline"><Download className="size-4" /> Export report</Button>
            <Button><Plus className="size-4" /> New tenant</Button>
          </>
        }
      />

      <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
        <KpiCard label="Total Tenants" value="1,243" delta={5.8} hint="vs last month" icon={Building2} />
        <KpiCard label="Active Tenants" value="1,041" delta={4.2} hint="83.7% of base" icon={CircleCheck} tone="success" />
        <KpiCard label="Trial Tenants" value="128" delta={12.4} hint="23 expiring soon" icon={Clock} tone="warning" />
        <KpiCard label="Suspended" value="74" delta={-3.1} hint="mostly payment failures" icon={Ban} tone="destructive" />
        <KpiCard label="MRR" value={currency(287600)} delta={7.3} hint="recurring" icon={DollarSign} tone="success" />
        <KpiCard label="ARR" value={currency(3451200)} delta={9.1} hint="annualised" icon={TrendingUp} />
        <KpiCard label="Customer LTV" value={currency(4820)} delta={2.6} hint="blended" icon={Gem} tone="violet" />
        <KpiCard label="Active Users" value="18,942" delta={6.5} hint="last 30 days" icon={Users} />
        <KpiCard label="Today's Bookings" value="9,318" delta={3.9} hint="across all tenants" icon={CalendarDays} tone="violet" />
        <KpiCard label="Total Bookings" value={compact(4820000)} delta={11.2} hint="lifetime" icon={CalendarRange} />
        <KpiCard label="Platform Revenue" value={currency(1284900)} delta={8.4} hint="YTD" icon={Wallet} tone="success" />
        <KpiCard label="Pending Tickets" value="37" delta={-14.7} hint="4 breaching SLA" icon={LifeBuoy} tone="warning" />
      </div>

      <div className="mt-6 grid gap-4 lg:grid-cols-3">
        <Panel title="Recurring revenue" description="MRR growth over the last 8 months" className="lg:col-span-2" bodyClassName="p-4">
          <ResponsiveContainer width="100%" height={280}>
            <AreaChart data={revenueSeries} margin={{ top: 8, right: 8, left: -12, bottom: 0 }}>
              <defs>
                <linearGradient id="mrrFill" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="0%" stopColor="var(--color-chart-1)" stopOpacity={0.35} />
                  <stop offset="100%" stopColor="var(--color-chart-1)" stopOpacity={0.02} />
                </linearGradient>
              </defs>
              <CartesianGrid strokeDasharray="3 3" stroke="var(--color-border)" vertical={false} />
              <XAxis dataKey="month" tickLine={false} axisLine={false} {...axis} />
              <YAxis tickFormatter={(v) => compact(Number(v))} tickLine={false} axisLine={false} {...axis} />
              <Tooltip contentStyle={tooltipStyle} formatter={(v) => currency(Number(v))} />
              <Area type="monotone" dataKey="mrr" name="MRR" stroke="var(--color-chart-1)" strokeWidth={2.5} fill="url(#mrrFill)" />
            </AreaChart>
          </ResponsiveContainer>
        </Panel>

        <Panel title="Subscription distribution" description="Tenants per plan" bodyClassName="p-4">
          <ResponsiveContainer width="100%" height={280}>
            <PieChart>
              <Pie data={planDistribution} dataKey="value" nameKey="name" innerRadius={62} outerRadius={98} paddingAngle={3} stroke="var(--color-card)">
                {planDistribution.map((entry) => (
                  <Cell key={entry.name} fill={entry.color} />
                ))}
              </Pie>
              <Legend iconType="circle" wrapperStyle={{ fontSize: 12 }} />
              <Tooltip contentStyle={tooltipStyle} />
            </PieChart>
          </ResponsiveContainer>
        </Panel>
      </div>

      <div className="mt-4 grid gap-4 lg:grid-cols-3">
        <Panel title="Tenant growth" bodyClassName="p-4">
          <ResponsiveContainer width="100%" height={220}>
            <BarChart data={revenueSeries} margin={{ top: 8, right: 8, left: -18, bottom: 0 }}>
              <CartesianGrid strokeDasharray="3 3" stroke="var(--color-border)" vertical={false} />
              <XAxis dataKey="month" tickLine={false} axisLine={false} {...axis} />
              <YAxis tickLine={false} axisLine={false} {...axis} />
              <Tooltip contentStyle={tooltipStyle} cursor={{ fill: "var(--color-muted)" }} />
              <Bar dataKey="tenants" name="Tenants" fill="var(--color-chart-3)" radius={[6, 6, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </Panel>

        <Panel title="Churn rate" description="Monthly logo churn %" bodyClassName="p-4">
          <ResponsiveContainer width="100%" height={220}>
            <LineChart data={revenueSeries} margin={{ top: 8, right: 8, left: -18, bottom: 0 }}>
              <CartesianGrid strokeDasharray="3 3" stroke="var(--color-border)" vertical={false} />
              <XAxis dataKey="month" tickLine={false} axisLine={false} {...axis} />
              <YAxis tickLine={false} axisLine={false} domain={[0, 4]} {...axis} />
              <Tooltip contentStyle={tooltipStyle} formatter={(v) => `${v}%`} />
              <Line type="monotone" dataKey="churn" name="Churn" stroke="var(--color-chart-4)" strokeWidth={2.5} dot={false} />
            </LineChart>
          </ResponsiveContainer>
        </Panel>

        <Panel title="Daily active users" description="Last 14 days" bodyClassName="p-4">
          <ResponsiveContainer width="100%" height={220}>
            <AreaChart data={dauSeries} margin={{ top: 8, right: 8, left: -18, bottom: 0 }}>
              <defs>
                <linearGradient id="dauFill" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="0%" stopColor="var(--color-chart-2)" stopOpacity={0.35} />
                  <stop offset="100%" stopColor="var(--color-chart-2)" stopOpacity={0.02} />
                </linearGradient>
              </defs>
              <CartesianGrid strokeDasharray="3 3" stroke="var(--color-border)" vertical={false} />
              <XAxis dataKey="day" tickLine={false} axisLine={false} {...axis} />
              <YAxis tickFormatter={(v) => compact(Number(v))} tickLine={false} axisLine={false} {...axis} />
              <Tooltip contentStyle={tooltipStyle} />
              <Area type="monotone" dataKey="dau" name="DAU" stroke="var(--color-chart-2)" strokeWidth={2.5} fill="url(#dauFill)" />
            </AreaChart>
          </ResponsiveContainer>
        </Panel>
      </div>

      <div className="mt-4 grid gap-4 lg:grid-cols-3">
        <Panel
          title="Recent payments"
          className="lg:col-span-2"
          bodyClassName="p-0"
        >
          <div className="divide-y divide-border">
            {recentPayments.map((p) => (
              <div key={p.id} className="flex items-center gap-3 px-5 py-3">
                <Avatar className="size-9">
                  <AvatarFallback className="bg-muted text-[11px] font-semibold">{p.tenant.slice(0, 2).toUpperCase()}</AvatarFallback>
                </Avatar>
                <div className="min-w-0 flex-1">
                  <p className="truncate text-sm font-medium">{p.tenant}</p>
                  <p className="truncate text-xs text-muted-foreground">{p.method} · {p.date}</p>
                </div>
                <span className="text-sm font-semibold tabular-nums">{currency(p.amount)}</span>
                <StatusBadge status={p.status} />
              </div>
            ))}
          </div>
        </Panel>

        <Panel title="System health" bodyClassName="p-0">
          <div className="divide-y divide-border">
            {systemHealth.map((s) => (
              <div key={s.name} className="flex items-center justify-between gap-3 px-5 py-3.5">
                <div>
                  <p className="text-sm font-medium">{s.name}</p>
                  <p className="text-xs text-muted-foreground">{s.uptime} uptime · {s.latency}</p>
                </div>
                <StatusBadge status={s.status} />
              </div>
            ))}
          </div>
        </Panel>
      </div>

      <div className="mt-4 grid gap-4 lg:grid-cols-3">
        <Panel title="Expiring trials" description="Convert before renewal window closes" bodyClassName="p-0">
          <div className="divide-y divide-border">
            {expiringTrials.map((t) => (
              <div key={t.id} className="flex items-center justify-between gap-3 px-5 py-3 transition-colors hover:bg-accent/50">
                <div className="min-w-0">
                  <p className="truncate text-sm font-medium">{t.name}</p>
                  <p className="text-xs text-muted-foreground">Ends {t.expiry}</p>
                </div>
                <StatusBadge status="trial" />
              </div>
            ))}
          </div>
        </Panel>

        <Panel title="New registrations" description="Latest salons onboarded" bodyClassName="p-0">
          <div className="divide-y divide-border">
            {tenants.slice(0, 5).map((t) => (
              <div key={t.id} className="flex items-center gap-3 px-5 py-3">
                <span className="flex size-9 items-center justify-center rounded-lg bg-primary/10 text-[11px] font-semibold text-primary">{t.initials}</span>
                <div className="min-w-0 flex-1">
                  <p className="truncate text-sm font-medium">{t.name}</p>
                  <p className="truncate text-xs text-muted-foreground">{t.country} · {t.plan}</p>
                </div>
              </div>
            ))}
          </div>
        </Panel>

        <Panel title="Geographic distribution" bodyClassName="space-y-4">
          {geoDistribution.map((g) => (
            <div key={g.region}>
              <div className="mb-1.5 flex items-center justify-between text-xs">
                <span className="font-medium">{g.region}</span>
                <span className="tabular-nums text-muted-foreground">{g.tenants}</span>
              </div>
              <Progress value={(g.tenants / 468) * 100} className="h-2" />
            </div>
          ))}
        </Panel>
      </div>

      <div className="mt-4">
        <Panel title="Recent activity" description="Platform-wide admin and system events" bodyClassName="p-0">
          <ol className="divide-y divide-border">
            {activityFeed.map((a) => (
              <li key={a.actor + a.time} className="flex items-start gap-3 px-5 py-3.5">
                <span className="mt-1.5 size-2 shrink-0 rounded-full bg-primary" />
                <div className="min-w-0 flex-1">
                  <p className="text-sm">
                    <span className="font-medium">{a.actor}</span>{" "}
                    <span className="text-muted-foreground">{a.action}</span>{" "}
                    <span className="font-medium">{a.target}</span>
                  </p>
                  <p className="text-xs text-muted-foreground">{a.time}</p>
                </div>
              </li>
            ))}
          </ol>
        </Panel>
      </div>
    </>
  );
}

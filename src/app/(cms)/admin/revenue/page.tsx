"use client";

import { Area, AreaChart, Bar, BarChart, CartesianGrid, Cell, Legend, Line, LineChart, Pie, PieChart, ResponsiveContainer, Tooltip, XAxis, YAxis } from "recharts";
import { DollarSign, TrendingUp, Gem, Percent, Download } from "lucide-react";
import { PageHeader, KpiCard, Panel } from "@/components/admin/admin-portal/primitives";
import { Button } from "@/components/admin/admin-portal/button";
import { compact, currency, geoDistribution, planDistribution, revenueSeries } from "@/components/admin/admin-portal/mock-data";

const tooltipStyle = { background: "var(--color-popover)", border: "1px solid var(--color-border)", borderRadius: 12, fontSize: 12 };

export default function RevenuePage() {
  return (
    <>
      <PageHeader
        title="Revenue"
        description="Recurring revenue performance across plans, regions and cohorts."
        breadcrumb={["Home", "Revenue"]}
        actions={<Button variant="outline"><Download className="size-4" /> Export</Button>}
      />

      <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
        <KpiCard label="MRR" value={currency(287600)} delta={7.3} icon={DollarSign} tone="success" />
        <KpiCard label="ARR" value={currency(3451200)} delta={9.1} icon={TrendingUp} />
        <KpiCard label="ARPA" value={currency(231)} delta={1.4} icon={Gem} tone="violet" />
        <KpiCard label="Net churn" value="1.5%" delta={-0.4} icon={Percent} tone="warning" />
      </div>

      <div className="mt-6 grid gap-4 lg:grid-cols-3">
        <Panel title="MRR vs ARR" className="lg:col-span-2" bodyClassName="p-4">
          <ResponsiveContainer width="100%" height={300}>
            <AreaChart data={revenueSeries} margin={{ top: 8, right: 8, left: -6, bottom: 0 }}>
              <defs>
                <linearGradient id="rev1" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="0%" stopColor="var(--color-chart-1)" stopOpacity={0.35} />
                  <stop offset="100%" stopColor="var(--color-chart-1)" stopOpacity={0.02} />
                </linearGradient>
              </defs>
              <CartesianGrid strokeDasharray="3 3" stroke="var(--color-border)" vertical={false} />
              <XAxis dataKey="month" tickLine={false} axisLine={false} stroke="var(--color-muted-foreground)" fontSize={12} />
              <YAxis tickFormatter={(v) => compact(Number(v))} tickLine={false} axisLine={false} stroke="var(--color-muted-foreground)" fontSize={12} />
              <Tooltip contentStyle={tooltipStyle} formatter={(v) => currency(Number(v))} />
              <Legend wrapperStyle={{ fontSize: 12 }} />
              <Area type="monotone" dataKey="mrr" name="MRR" stroke="var(--color-chart-1)" strokeWidth={2.5} fill="url(#rev1)" />
              <Line type="monotone" dataKey="arr" name="ARR" stroke="var(--color-chart-3)" strokeWidth={2} dot={false} />
            </AreaChart>
          </ResponsiveContainer>
        </Panel>

        <Panel title="Plan mix" bodyClassName="p-4">
          <ResponsiveContainer width="100%" height={300}>
            <PieChart>
              <Pie data={planDistribution} dataKey="value" nameKey="name" outerRadius={100} stroke="var(--color-card)">
                {planDistribution.map((e) => <Cell key={e.name} fill={e.color} />)}
              </Pie>
              <Legend iconType="circle" wrapperStyle={{ fontSize: 12 }} />
              <Tooltip contentStyle={tooltipStyle} />
            </PieChart>
          </ResponsiveContainer>
        </Panel>
      </div>

      <div className="mt-4 grid gap-4 lg:grid-cols-2">
        <Panel title="Churn trend" bodyClassName="p-4">
          <ResponsiveContainer width="100%" height={240}>
            <LineChart data={revenueSeries} margin={{ top: 8, right: 8, left: -18, bottom: 0 }}>
              <CartesianGrid strokeDasharray="3 3" stroke="var(--color-border)" vertical={false} />
              <XAxis dataKey="month" tickLine={false} axisLine={false} stroke="var(--color-muted-foreground)" fontSize={12} />
              <YAxis tickLine={false} axisLine={false} domain={[0, 4]} stroke="var(--color-muted-foreground)" fontSize={12} />
              <Tooltip contentStyle={tooltipStyle} formatter={(v) => `${v}%`} />
              <Line type="monotone" dataKey="churn" name="Churn" stroke="var(--color-chart-4)" strokeWidth={2.5} dot={false} />
            </LineChart>
          </ResponsiveContainer>
        </Panel>

        <Panel title="Tenants by region" bodyClassName="p-4">
          <ResponsiveContainer width="100%" height={240}>
            <BarChart layout="vertical" data={geoDistribution} margin={{ top: 8, right: 16, left: 24, bottom: 0 }}>
              <CartesianGrid strokeDasharray="3 3" stroke="var(--color-border)" horizontal={false} />
              <XAxis type="number" tickLine={false} axisLine={false} stroke="var(--color-muted-foreground)" fontSize={12} />
              <YAxis type="category" dataKey="region" width={110} tickLine={false} axisLine={false} stroke="var(--color-muted-foreground)" fontSize={12} />
              <Tooltip cursor={{ fill: "var(--color-muted)" }} contentStyle={tooltipStyle} />
              <Bar dataKey="tenants" name="Tenants" fill="var(--color-chart-2)" radius={[0, 8, 8, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </Panel>
      </div>
    </>
  );
}

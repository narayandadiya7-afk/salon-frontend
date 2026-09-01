"use client";

import { Check, Plus, Sparkles } from "lucide-react";
import { Bar, BarChart, CartesianGrid, ResponsiveContainer, Tooltip, XAxis, YAxis } from "recharts";
import { PageHeader, KpiCard, Panel } from "@/components/admin/admin-portal/primitives";
import { Button } from "@/components/admin/admin-portal/button";
import { Badge } from "@/components/admin/admin-portal/badge";
import { Input } from "@/components/admin/admin-portal/input";
import { Label } from "@/components/admin/admin-portal/label";
import { Switch } from "@/components/admin/admin-portal/switch";
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from "@/components/admin/admin-portal/dialog";
import { currency, planCatalog } from "@/components/admin/admin-portal/mock-data";
import { cn } from "@/lib/utils";

const revenueByPlan = [
  { plan: "Starter", revenue: 23814 },
  { plan: "Professional", revenue: 61388 },
  { plan: "Business", revenue: 86901 },
  { plan: "Enterprise", revenue: 86304 },
];

export default function PlansPage() {
  return (
    <>
      <PageHeader
        title="Subscription Plans"
        description="Define what each tier includes, how it is priced and which modules unlock."
        breadcrumb={["Home", "Subscription Plans"]}
        actions={
          <Dialog>
            <DialogTrigger asChild><Button><Plus className="size-4" /> Create plan</Button></DialogTrigger>
            <DialogContent>
              <DialogHeader>
                <DialogTitle>Create a plan</DialogTitle>
                <DialogDescription>Plans become available to new tenants immediately after publishing.</DialogDescription>
              </DialogHeader>
              <div className="grid gap-4 py-2">
                <div className="grid gap-2">
                  <Label htmlFor="plan-name">Plan name</Label>
                  <Input id="plan-name" placeholder="e.g. Growth" />
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div className="grid gap-2">
                    <Label htmlFor="plan-monthly">Monthly price</Label>
                    <Input id="plan-monthly" type="number" placeholder="149" />
                  </div>
                  <div className="grid gap-2">
                    <Label htmlFor="plan-yearly">Yearly price</Label>
                    <Input id="plan-yearly" type="number" placeholder="1490" />
                  </div>
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div className="grid gap-2">
                    <Label htmlFor="plan-trial">Trial days</Label>
                    <Input id="plan-trial" type="number" placeholder="14" />
                  </div>
                  <div className="grid gap-2">
                    <Label htmlFor="plan-seats">Staff limit</Label>
                    <Input id="plan-seats" type="number" placeholder="20" />
                  </div>
                </div>
                <div className="flex items-center justify-between rounded-lg border border-border px-3 py-2.5">
                  <Label htmlFor="plan-public" className="text-sm font-normal">Publicly listed on pricing page</Label>
                  <Switch id="plan-public" defaultChecked />
                </div>
              </div>
              <DialogFooter>
                <Button variant="outline">Cancel</Button>
                <Button>Publish plan</Button>
              </DialogFooter>
            </DialogContent>
          </Dialog>
        }
      />

      <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
        <KpiCard label="Active plans" value="4" hint="1 draft" />
        <KpiCard label="Expiring in 30 days" value="186" delta={-6.4} tone="warning" />
        <KpiCard label="Failed renewals" value="24" delta={-11.2} tone="destructive" />
        <KpiCard label="Upgrade rate" value="8.6%" delta={1.9} tone="success" />
      </div>

      <div className="mt-6 grid gap-4 md:grid-cols-2 xl:grid-cols-4">
        {planCatalog.map((p) => (
          <div
            key={p.name}
            className={cn(
              "surface-card flex flex-col p-6 transition-shadow hover:shadow-[var(--shadow-elevated)]",
              p.popular && "ring-2 ring-primary",
            )}
          >
            <div className="flex items-center justify-between">
              <h3 className="text-base font-semibold">{p.name}</h3>
              {p.popular && <Badge className="gap-1"><Sparkles className="size-3" /> Popular</Badge>}
            </div>
            <p className="mt-4 text-3xl font-semibold tracking-tight tabular-nums">{currency(p.price)}</p>
            <p className="text-xs text-muted-foreground">per month · {currency(p.yearly)} billed yearly</p>
            <p className="mt-1 text-xs text-muted-foreground">{p.trial}-day free trial · {p.tenants} tenants</p>
            <ul className="mt-5 flex-1 space-y-2.5 text-sm">
              {p.features.map((f) => (
                <li key={f} className="flex items-start gap-2">
                  <Check className="mt-0.5 size-4 shrink-0 text-success" />
                  <span>{f}</span>
                </li>
              ))}
            </ul>
            <dl className="mt-5 space-y-1.5 rounded-lg bg-muted/60 p-3 text-xs">
              {Object.entries(p.limits).map(([k, v]) => (
                <div key={k} className="flex justify-between">
                  <dt className="capitalize text-muted-foreground">{k}</dt>
                  <dd className="font-medium">{String(v)}</dd>
                </div>
              ))}
            </dl>
            <div className="mt-5 flex gap-2">
              <Button variant="outline" className="flex-1">Edit</Button>
              <Button className="flex-1">Promote</Button>
            </div>
          </div>
        ))}
      </div>

      <Panel className="mt-6" title="Revenue by plan" description="Monthly recurring revenue contribution" bodyClassName="p-4">
        <ResponsiveContainer width="100%" height={280}>
          <BarChart data={revenueByPlan} margin={{ top: 8, right: 8, left: -8, bottom: 0 }}>
            <CartesianGrid strokeDasharray="3 3" stroke="var(--color-border)" vertical={false} />
            <XAxis dataKey="plan" tickLine={false} axisLine={false} stroke="var(--color-muted-foreground)" fontSize={12} />
            <YAxis tickLine={false} axisLine={false} stroke="var(--color-muted-foreground)" fontSize={12} />
            <Tooltip
              cursor={{ fill: "var(--color-muted)" }}
              formatter={(v) => currency(Number(v))}
              contentStyle={{ background: "var(--color-popover)", border: "1px solid var(--color-border)", borderRadius: 12, fontSize: 12 }}
            />
            <Bar dataKey="revenue" name="MRR" fill="var(--color-chart-1)" radius={[8, 8, 0, 0]} />
          </BarChart>
        </ResponsiveContainer>
      </Panel>
    </>
  );
}

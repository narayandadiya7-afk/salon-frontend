"use client";

import Link from "next/link";
import { useParams } from "next/navigation";
import { Ban, KeyRound, LogIn, Pencil, Trash2, TrendingUp } from "lucide-react";
import { PageHeader, KpiCard, Panel, StatusBadge, EmptyState } from "@/components/admin/admin-portal/primitives";
import { Button } from "@/components/admin/admin-portal/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/admin/admin-portal/tabs";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/admin/admin-portal/table";
import { currency, invoices, tenants } from "@/components/admin/admin-portal/mock-data";

const timeline = [
  { label: "Plan upgraded to Business", time: "Aug 14, 2026 · 09:12" },
  { label: "Invoice INV-2026-0917 paid", time: "Aug 18, 2026 · 03:40" },
  { label: "3 staff seats added", time: "Aug 02, 2026 · 16:22" },
  { label: "Custom domain verified", time: "Jul 28, 2026 · 11:05" },
  { label: "Trial converted to paid", time: "Jul 12, 2026 · 08:31" },
];

export default function TenantProfilePage() {
  const { tenantId } = useParams<{ tenantId: string }>();
  const tenant = tenants.find((t) => t.id === tenantId);

  if (!tenant) {
    return (
      <EmptyState
        title="Tenant not found"
        description="This salon may have been deleted or the link is out of date."
        action={<Button asChild><Link href="/admin/tenants">Back to tenants</Link></Button>}
      />
    );
  }

  return (
    <>
      <PageHeader
        title={tenant.name}
        description={`${tenant.country} · ${tenant.domain}`}
        breadcrumb={["Home", "Tenants", tenant.name]}
        actions={
          <>
            <Button variant="outline"><Pencil className="size-4" /> Edit</Button>
            <Button variant="outline"><KeyRound className="size-4" /> Reset password</Button>
            <Button variant="outline"><Ban className="size-4" /> Suspend</Button>
            <Button><LogIn className="size-4" /> Impersonate</Button>
          </>
        }
      />

      <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
        <KpiCard label="Plan" value={tenant.plan} hint={`Renews ${tenant.expiry}`} icon={TrendingUp} />
        <KpiCard label="Lifetime revenue" value={currency(tenant.revenue)} delta={6.2} tone="success" />
        <KpiCard label="Bookings" value={tenant.bookings.toLocaleString()} delta={4.1} tone="violet" />
        <KpiCard label="Customers" value={tenant.customers.toLocaleString()} delta={2.8} />
      </div>

      <Tabs defaultValue="overview" className="mt-6">
        <TabsList>
          <TabsTrigger value="overview">Overview</TabsTrigger>
          <TabsTrigger value="subscription">Subscription</TabsTrigger>
          <TabsTrigger value="payments">Payments</TabsTrigger>
          <TabsTrigger value="activity">Activity</TabsTrigger>
        </TabsList>

        <TabsContent value="overview" className="mt-4 grid gap-4 lg:grid-cols-2">
          <Panel title="Business information">
            <dl className="grid grid-cols-2 gap-y-4 text-sm">
              <dt className="text-muted-foreground">Salon name</dt><dd className="font-medium">{tenant.name}</dd>
              <dt className="text-muted-foreground">Tenant ID</dt><dd className="font-mono text-xs">{tenant.id}</dd>
              <dt className="text-muted-foreground">Country</dt><dd>{tenant.country}</dd>
              <dt className="text-muted-foreground">Custom domain</dt><dd>{tenant.domain}</dd>
              <dt className="text-muted-foreground">Staff</dt><dd>{tenant.staff}</dd>
              <dt className="text-muted-foreground">Active users</dt><dd>{tenant.users}</dd>
              <dt className="text-muted-foreground">Status</dt><dd><StatusBadge status={tenant.status} /></dd>
            </dl>
          </Panel>
          <Panel title="Owner details">
            <dl className="grid grid-cols-2 gap-y-4 text-sm">
              <dt className="text-muted-foreground">Name</dt><dd className="font-medium">{tenant.owner}</dd>
              <dt className="text-muted-foreground">Email</dt><dd className="truncate">{tenant.email}</dd>
              <dt className="text-muted-foreground">Last login</dt><dd>{tenant.lastLogin}</dd>
              <dt className="text-muted-foreground">MFA</dt><dd><StatusBadge status="active" /></dd>
            </dl>
            <div className="mt-6 flex gap-2">
              <Button variant="outline" size="sm">Send email</Button>
              <Button variant="ghost" size="sm" className="text-destructive"><Trash2 className="size-4" /> Delete tenant</Button>
            </div>
          </Panel>
        </TabsContent>

        <TabsContent value="subscription" className="mt-4">
          <Panel title="Current subscription">
            <dl className="grid gap-y-4 text-sm sm:grid-cols-4">
              <div><dt className="text-muted-foreground">Plan</dt><dd className="mt-1 font-medium">{tenant.plan}</dd></div>
              <div><dt className="text-muted-foreground">Billing cycle</dt><dd className="mt-1 font-medium">Monthly</dd></div>
              <div><dt className="text-muted-foreground">Renews</dt><dd className="mt-1 font-medium">{tenant.expiry}</dd></div>
              <div><dt className="text-muted-foreground">Seats</dt><dd className="mt-1 font-medium">{tenant.users}</dd></div>
            </dl>
            <div className="mt-6 flex flex-wrap gap-2">
              <Button>Upgrade plan</Button>
              <Button variant="outline">Change billing cycle</Button>
              <Button variant="outline">Extend trial</Button>
            </div>
          </Panel>
        </TabsContent>

        <TabsContent value="payments" className="mt-4">
          <Panel title="Payment history" bodyClassName="p-0">
            <div className="overflow-x-auto">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Invoice</TableHead>
                    <TableHead>Plan</TableHead>
                    <TableHead>Issued</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead className="text-right">Amount</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {invoices.map((i) => (
                    <TableRow key={i.id}>
                      <TableCell className="font-mono text-xs">{i.id}</TableCell>
                      <TableCell className="text-sm">{i.plan}</TableCell>
                      <TableCell className="text-sm text-muted-foreground">{i.issued}</TableCell>
                      <TableCell><StatusBadge status={i.status} /></TableCell>
                      <TableCell className="text-right font-medium tabular-nums">{currency(i.amount)}</TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </div>
          </Panel>
        </TabsContent>

        <TabsContent value="activity" className="mt-4">
          <Panel title="Activity timeline" bodyClassName="p-5">
            <ol className="relative space-y-6 border-l border-border pl-6">
              {timeline.map((t) => (
                <li key={t.label}>
                  <span className="absolute -left-[5px] mt-1.5 size-2.5 rounded-full bg-primary" />
                  <p className="text-sm font-medium">{t.label}</p>
                  <p className="text-xs text-muted-foreground">{t.time}</p>
                </li>
              ))}
            </ol>
          </Panel>
        </TabsContent>
      </Tabs>
    </>
  );
}
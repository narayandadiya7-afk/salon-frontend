"use client";

import { Wallet, CreditCard, RefreshCcw, XCircle } from "lucide-react";
import { PageHeader, KpiCard, Panel, StatusBadge } from "@/components/admin/admin-portal/primitives";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/admin/admin-portal/table";
import { currency, recentPayments } from "@/components/admin/admin-portal/mock-data";

const gateways = [
  { name: "Stripe", volume: 218400, success: "98.4%", status: "operational", mode: "Live" },
  { name: "Razorpay", volume: 52310, success: "94.1%", status: "degraded", mode: "Live" },
  { name: "PayPal", volume: 16890, success: "97.2%", status: "operational", mode: "Live" },
];

export default function PaymentsPage() {
  return (
    <>
      <PageHeader
        title="Payments"
        description="Every charge, refund and gateway event flowing through the platform."
        breadcrumb={["Home", "Payments"]}
      />

      <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
        <KpiCard label="Processed today" value={currency(18420)} delta={4.6} icon={Wallet} tone="success" />
        <KpiCard label="Authorisation rate" value="97.8%" delta={0.6} icon={CreditCard} />
        <KpiCard label="Refunds (30d)" value={currency(4210)} delta={-8.1} icon={RefreshCcw} tone="violet" />
        <KpiCard label="Failed (24h)" value="24" delta={-11.2} icon={XCircle} tone="destructive" />
      </div>

      <div className="mt-6 grid gap-4 lg:grid-cols-3">
        <Panel title="Transactions" className="lg:col-span-2" bodyClassName="p-0">
          <div className="overflow-x-auto">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Transaction</TableHead>
                  <TableHead>Tenant</TableHead>
                  <TableHead>Method</TableHead>
                  <TableHead>When</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead className="text-right">Amount</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {recentPayments.map((p) => (
                  <TableRow key={p.id}>
                    <TableCell className="font-mono text-xs">{p.id}</TableCell>
                    <TableCell className="text-sm font-medium">{p.tenant}</TableCell>
                    <TableCell className="text-sm text-muted-foreground">{p.method}</TableCell>
                    <TableCell className="text-sm text-muted-foreground">{p.date}</TableCell>
                    <TableCell><StatusBadge status={p.status} /></TableCell>
                    <TableCell className="text-right font-medium tabular-nums">{currency(p.amount)}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
        </Panel>

        <Panel title="Gateway status" bodyClassName="p-0">
          <div className="divide-y divide-border">
            {gateways.map((g) => (
              <div key={g.name} className="px-5 py-4">
                <div className="flex items-center justify-between">
                  <p className="text-sm font-medium">{g.name}</p>
                  <StatusBadge status={g.status} />
                </div>
                <p className="mt-1 text-xs text-muted-foreground">
                  {currency(g.volume)} · {g.success} success · {g.mode}
                </p>
              </div>
            ))}
          </div>
        </Panel>
      </div>
    </>
  );
}

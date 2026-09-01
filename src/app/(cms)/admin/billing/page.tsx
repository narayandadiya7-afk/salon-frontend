"use client";

import { Download, FileText, Receipt, AlertTriangle, Clock } from "lucide-react";
import { PageHeader, KpiCard, Panel, StatusBadge } from "@/components/admin/admin-portal/primitives";
import { Button } from "@/components/admin/admin-portal/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/admin/admin-portal/tabs";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/admin/admin-portal/table";
import { currency, invoices } from "@/components/admin/admin-portal/mock-data";

const refunds = [
  { id: "RF-2041", tenant: "Gilded Glow Spa", amount: 349, reason: "Duplicate charge", status: "pending", requested: "Aug 19, 2026" },
  { id: "RF-2040", tenant: "Copper Comb", amount: 149, reason: "Downgrade credit", status: "resolved", requested: "Aug 16, 2026" },
  { id: "RF-2039", tenant: "Rouge Studio", amount: 49, reason: "Trial billed in error", status: "resolved", requested: "Aug 12, 2026" },
];

const taxes = [
  { region: "European Union", scheme: "VAT MOSS", rate: "19–25%", collected: 48210 },
  { region: "United States", scheme: "Sales tax (nexus)", rate: "0–9.5%", collected: 31940 },
  { region: "India", scheme: "GST", rate: "18%", collected: 22870 },
  { region: "United Kingdom", scheme: "VAT", rate: "20%", collected: 18410 },
];

export default function BillingPage() {
  return (
    <>
      <PageHeader
        title="Billing"
        description="Invoices, taxes and refunds across all subscriptions."
        breadcrumb={["Home", "Billing"]}
        actions={<Button variant="outline"><Download className="size-4" /> Download statements</Button>}
      />

      <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
        <KpiCard label="Revenue today" value={currency(18420)} delta={4.6} icon={Receipt} tone="success" />
        <KpiCard label="Revenue this month" value={currency(287600)} delta={7.3} icon={FileText} />
        <KpiCard label="Pending payments" value={currency(24180)} delta={-2.2} icon={Clock} tone="warning" />
        <KpiCard label="Failed transactions" value="24" delta={-11.2} icon={AlertTriangle} tone="destructive" />
      </div>

      <Tabs defaultValue="invoices" className="mt-6">
        <TabsList>
          <TabsTrigger value="invoices">Invoices</TabsTrigger>
          <TabsTrigger value="refunds">Refund requests</TabsTrigger>
          <TabsTrigger value="taxes">Taxes</TabsTrigger>
        </TabsList>

        <TabsContent value="invoices" className="mt-4">
          <Panel title="Invoice history" bodyClassName="p-0">
            <div className="overflow-x-auto">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Invoice</TableHead>
                    <TableHead>Tenant</TableHead>
                    <TableHead>Plan</TableHead>
                    <TableHead>Issued</TableHead>
                    <TableHead>Due</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead className="text-right">Amount</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {invoices.map((i) => (
                    <TableRow key={i.id}>
                      <TableCell className="font-mono text-xs">{i.id}</TableCell>
                      <TableCell className="text-sm font-medium">{i.tenant}</TableCell>
                      <TableCell className="text-sm">{i.plan}</TableCell>
                      <TableCell className="text-sm text-muted-foreground">{i.issued}</TableCell>
                      <TableCell className="text-sm text-muted-foreground">{i.due}</TableCell>
                      <TableCell><StatusBadge status={i.status} /></TableCell>
                      <TableCell className="text-right font-medium tabular-nums">{currency(i.amount)}</TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </div>
          </Panel>
        </TabsContent>

        <TabsContent value="refunds" className="mt-4">
          <Panel title="Refund requests" bodyClassName="p-0">
            <div className="overflow-x-auto">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Request</TableHead>
                    <TableHead>Tenant</TableHead>
                    <TableHead>Reason</TableHead>
                    <TableHead>Requested</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead className="text-right">Amount</TableHead>
                    <TableHead className="text-right">Action</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {refunds.map((r) => (
                    <TableRow key={r.id}>
                      <TableCell className="font-mono text-xs">{r.id}</TableCell>
                      <TableCell className="text-sm font-medium">{r.tenant}</TableCell>
                      <TableCell className="text-sm">{r.reason}</TableCell>
                      <TableCell className="text-sm text-muted-foreground">{r.requested}</TableCell>
                      <TableCell><StatusBadge status={r.status} /></TableCell>
                      <TableCell className="text-right tabular-nums">{currency(r.amount)}</TableCell>
                      <TableCell className="text-right">
                        <Button size="sm" variant="outline" disabled={r.status === "resolved"}>Approve</Button>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </div>
          </Panel>
        </TabsContent>

        <TabsContent value="taxes" className="mt-4">
          <Panel title="Tax configuration" bodyClassName="p-0">
            <div className="overflow-x-auto">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Region</TableHead>
                    <TableHead>Scheme</TableHead>
                    <TableHead>Rate</TableHead>
                    <TableHead className="text-right">Collected YTD</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {taxes.map((t) => (
                    <TableRow key={t.region}>
                      <TableCell className="text-sm font-medium">{t.region}</TableCell>
                      <TableCell className="text-sm">{t.scheme}</TableCell>
                      <TableCell className="text-sm">{t.rate}</TableCell>
                      <TableCell className="text-right font-medium tabular-nums">{currency(t.collected)}</TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </div>
          </Panel>
        </TabsContent>
      </Tabs>
    </>
  );
}

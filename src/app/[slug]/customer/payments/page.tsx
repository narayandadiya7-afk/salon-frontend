'use client';

import { CreditCard, Download } from 'lucide-react';
import { toast } from 'sonner';
import { Button } from '@/components/owner/customer-portal/button';
import { PageHeader } from '@/components/owner/customer-portal/PageHeader';
import { StatusBadge } from '@/components/owner/customer-portal/StatusBadge';
import { customer, formatCurrency, paymentMethods, payments } from '@/data/customer-portal';

export default function PaymentsPage() {
  return (
    <div className="space-y-8">
      <PageHeader title="Payments & Invoices" subtitle="Receipts, refunds and saved payment methods." />

      <section className="grid gap-4 sm:grid-cols-3">
        <div className="surface p-5">
          <p className="text-xs uppercase tracking-[0.14em] text-muted-foreground">Total spent</p>
          <p className="mt-2 font-display text-3xl">{formatCurrency(customer.totalSpend)}</p>
        </div>
        <div className="surface p-5">
          <p className="text-xs uppercase tracking-[0.14em] text-muted-foreground">Visits</p>
          <p className="mt-2 font-display text-3xl">{customer.visits}</p>
        </div>
        <div className="surface p-5">
          <p className="text-xs uppercase tracking-[0.14em] text-muted-foreground">Avg. per visit</p>
          <p className="mt-2 font-display text-3xl">{formatCurrency(Math.round(customer.totalSpend / customer.visits))}</p>
        </div>
      </section>

      <section className="space-y-4">
        <h2 className="font-display text-2xl">Invoices</h2>
        <div className="surface divide-y divide-border">
          {payments.map((p) => (
            <div key={p.id} className="flex flex-wrap items-center justify-between gap-3 px-5 py-4 text-sm">
              <div className="min-w-0">
                <p className="font-medium">{p.item}</p>
                <p className="text-xs text-muted-foreground">{p.id} · {p.date} · {p.method}</p>
              </div>
              <div className="flex items-center gap-3">
                <StatusBadge status={p.status} />
                <span className="font-medium">{formatCurrency(p.amount)}</span>
                <Button size="sm" variant="ghost" className="rounded-full" onClick={() => toast.success(`Invoice ${p.id} downloaded`)}>
                  <Download className="size-4" />
                </Button>
              </div>
            </div>
          ))}
        </div>
      </section>

      <section className="space-y-4">
        <h2 className="font-display text-2xl">Saved payment methods</h2>
        <div className="grid gap-3 sm:grid-cols-2">
          {paymentMethods.map((m) => (
            <div key={m.id} className="surface flex items-center justify-between gap-3 p-4 text-sm">
              <span className="flex items-center gap-3">
                <CreditCard className="size-4 text-muted-foreground" />
                <span>
                  <span className="font-medium">{m.label}</span> {m.masked}
                  {m.expiry ? <span className="text-muted-foreground"> · {m.expiry}</span> : null}
                </span>
              </span>
              {m.primary ? <span className="rounded-full bg-accent px-3 py-1 text-xs text-accent-foreground">Primary</span> : null}
            </div>
          ))}
        </div>
        <Button variant="secondary" className="rounded-full" onClick={() => toast.success('Add payment method')}>
          Add payment method
        </Button>
      </section>
    </div>
  );
}
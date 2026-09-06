'use client';

import { Star } from 'lucide-react';
import { toast } from 'sonner';
import { Button } from '@/components/owner/customer-portal/button';
import { PageHeader } from '@/components/owner/customer-portal/PageHeader';
import { StatusBadge } from '@/components/owner/customer-portal/StatusBadge';
import { appointments, formatCurrency, reviews } from '@/data/customer-portal';

export default function HistoryPage() {
  return (
    <div className="space-y-8">
      <PageHeader title="Booking History" subtitle="Every visit you've had with Glam Studio." />

      <div className="surface overflow-x-auto">
        <table className="w-full min-w-[640px] text-sm">
          <thead className="border-b border-border text-left text-xs uppercase tracking-[0.14em] text-muted-foreground">
            <tr>
              <th className="px-5 py-4">Service</th>
              <th className="px-5 py-4">Stylist</th>
              <th className="px-5 py-4">Date</th>
              <th className="px-5 py-4">Status</th>
              <th className="px-5 py-4 text-right">Amount</th>
            </tr>
          </thead>
          <tbody>
            {appointments.map((a) => (
              <tr key={a.id} className="border-b border-border/60 last:border-0">
                <td className="px-5 py-4 font-medium">{a.service}</td>
                <td className="px-5 py-4 text-muted-foreground">{a.staff}</td>
                <td className="px-5 py-4 text-muted-foreground">{a.date} · {a.time}</td>
                <td className="px-5 py-4"><StatusBadge status={a.status} /></td>
                <td className="px-5 py-4 text-right">{formatCurrency(a.price)}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <section className="space-y-4">
        <h2 className="font-display text-2xl">Your reviews</h2>
        <div className="grid gap-4 sm:grid-cols-2">
          {reviews.map((r) => (
            <article key={r.id} className="surface space-y-2 p-5">
              <div className="flex items-center justify-between gap-3">
                <p className="font-display text-lg">{r.service}</p>
                <span className="flex items-center gap-1 text-xs text-muted-foreground">
                  {Array.from({ length: r.rating }).map((_, i) => (
                    <Star key={i} className="size-3.5 fill-gold text-gold" />
                  ))}
                </span>
              </div>
              <p className="text-sm text-muted-foreground">{r.text}</p>
              <p className="text-xs text-muted-foreground">{r.staff} · {r.date}</p>
            </article>
          ))}
        </div>
        <Button variant="secondary" className="rounded-full" onClick={() => toast.success('Review form opened')}>
          Leave a review
        </Button>
      </section>
    </div>
  );
}
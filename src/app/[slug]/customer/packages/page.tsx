'use client';

import { Package } from 'lucide-react';
import { toast } from 'sonner';
import { Button } from '@/components/owner/customer-portal/button';
import { Progress } from '@/components/owner/customer-portal/progress';
import { PageHeader } from '@/components/owner/customer-portal/PageHeader';
import { EmptyState } from '@/components/owner/customer-portal/EmptyState';
import { packages } from '@/data/customer-portal';

export default function PackagesPage() {
  if (packages.length === 0) {
    return <EmptyState icon={Package} title="No packages yet" description="Prepaid packages save up to 25% on your favourite services." ctaLabel="Browse services" />;
  }
  return (
    <div className="space-y-6">
      <PageHeader title="Packages & Prepaid" subtitle="Your bundled sessions and what's left." />
      <div className="grid gap-4 sm:grid-cols-2">
        {packages.map((p) => (
          <article key={p.id} className="surface space-y-3 p-5">
            <div className="flex items-start justify-between gap-3">
              <h2 className="font-display text-2xl leading-tight">{p.name}</h2>
              <span className="rounded-full bg-accent px-3 py-1 text-xs text-accent-foreground">
                {p.total - p.used} left
              </span>
            </div>
            <Progress value={(p.used / p.total) * 100} />
            <p className="text-sm text-muted-foreground">{p.used} of {p.total} sessions used · expires {p.expires}</p>
            <ul className="text-sm text-muted-foreground">
              {p.services.map((s) => <li key={s}>· {s}</li>)}
            </ul>
            <Button className="w-full rounded-full" onClick={() => toast.success('Session booked from package')}>
              Use a session
            </Button>
          </article>
        ))}
      </div>
    </div>
  );
}
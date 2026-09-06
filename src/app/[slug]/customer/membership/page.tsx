'use client';

import { Check, Crown } from 'lucide-react';
import { toast } from 'sonner';
import { Button } from '@/components/owner/customer-portal/button';
import { PageHeader } from '@/components/owner/customer-portal/PageHeader';
import { StatusBadge } from '@/components/owner/customer-portal/StatusBadge';
import { formatCurrency, membership } from '@/data/customer-portal';
import { cn } from '@/utils/cn';

export default function MembershipPage() {
  return (
    <div className="space-y-8">
      <PageHeader title="Membership" subtitle="Your plan, benefits and savings." />

      <section className="surface overflow-hidden bg-gradient-ink p-6 text-sidebar-foreground sm:p-8">
        <div className="flex flex-wrap items-start justify-between gap-4">
          <div>
            <p className="flex items-center gap-2 text-xs uppercase tracking-[0.2em] text-sidebar-foreground/60">
              <Crown className="size-4" /> Current plan
            </p>
            <h2 className="mt-2 font-display text-4xl">{membership.name}</h2>
            <p className="mt-1 text-sm text-sidebar-foreground/70">
              {formatCurrency(membership.price)} / {membership.cycle} · renews {membership.renewsOn}
            </p>
          </div>
          <StatusBadge status={membership.status === 'Active' ? 'Confirmed' : membership.status} />
        </div>
        <div className="mt-6 grid gap-4 sm:grid-cols-2">
          <div className="rounded-2xl bg-sidebar-accent p-4">
            <p className="text-xs text-sidebar-foreground/60">Saved this month</p>
            <p className="mt-1 font-display text-2xl">{formatCurrency(membership.savedThisMonth)}</p>
          </div>
          <div className="rounded-2xl bg-sidebar-accent p-4">
            <p className="text-xs text-sidebar-foreground/60">Saved in total</p>
            <p className="mt-1 font-display text-2xl">{formatCurrency(membership.savedTotal)}</p>
          </div>
        </div>
        <div className="mt-6 flex flex-wrap gap-2">
          <Button className="rounded-full bg-gradient-gold text-ink hover:opacity-90" onClick={() => toast.success('Membership renewed')}>
            Renew now
          </Button>
          <Button variant="ghost" className="rounded-full text-sidebar-foreground hover:bg-sidebar-accent" onClick={() => toast('Cancellation request sent')}>
            Cancel membership
          </Button>
        </div>
      </section>

      <section className="space-y-4">
        <h2 className="font-display text-2xl">Your benefits</h2>
        <div className="grid gap-3 sm:grid-cols-2">
          {membership.benefits.map((b) => (
            <div key={b.label} className="surface flex items-center justify-between gap-3 p-4 text-sm">
              <span className="flex items-center gap-2"><Check className="size-4 text-gold" /> {b.label}</span>
              <span className="text-xs text-muted-foreground">{b.used ? 'Used' : 'Available'}</span>
            </div>
          ))}
        </div>
      </section>

      <section className="space-y-4">
        <h2 className="font-display text-2xl">Upgrade your plan</h2>
        <div className="grid gap-4 sm:grid-cols-3">
          {membership.plans.map((p) => (
            <article key={p.id} className={cn('surface space-y-3 p-5', p.name === membership.name && 'ring-2 ring-gold')}>
              <h3 className="font-display text-2xl">{p.name}</h3>
              <p className="text-sm text-muted-foreground">{formatCurrency(p.price)} / month</p>
              <ul className="space-y-1.5 text-sm text-muted-foreground">
                {p.perks.map((perk) => (
                  <li key={perk} className="flex items-start gap-2"><Check className="mt-0.5 size-4 text-gold" /> {perk}</li>
                ))}
              </ul>
              <Button
                variant={p.name === membership.name ? 'secondary' : 'default'}
                className="w-full rounded-full"
                disabled={p.name === membership.name}
                onClick={() => toast.success(`Switched to ${p.name}`)}
              >
                {p.name === membership.name ? 'Current plan' : 'Choose plan'}
              </Button>
            </article>
          ))}
        </div>
      </section>
    </div>
  );
}
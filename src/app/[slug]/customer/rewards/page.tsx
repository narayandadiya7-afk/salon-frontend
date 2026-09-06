'use client';

import { Gift, Share2 } from 'lucide-react';
import { toast } from 'sonner';
import { Button } from '@/components/owner/customer-portal/button';
import { Progress } from '@/components/owner/customer-portal/progress';
import { PageHeader } from '@/components/owner/customer-portal/PageHeader';
import { loyalty } from '@/data/customer-portal';

export default function RewardsPage() {
  return (
    <div className="space-y-8">
      <PageHeader title="Loyalty & Rewards" subtitle="Earn points on every visit and turn them into treats." />

      <section className="surface space-y-4 p-6">
        <div className="flex flex-wrap items-end justify-between gap-3">
          <div>
            <p className="text-xs uppercase tracking-[0.16em] text-muted-foreground">Available points</p>
            <p className="mt-1 font-display text-5xl">{loyalty.points.toLocaleString('en-IN')}</p>
          </div>
          <p className="text-sm text-muted-foreground">Lifetime {loyalty.lifetime.toLocaleString('en-IN')} points</p>
        </div>
        <Progress value={(loyalty.points / loyalty.nextRewardAt) * 100} />
        <p className="text-sm text-muted-foreground">
          {(loyalty.nextRewardAt - loyalty.points).toLocaleString('en-IN')} points to your next reward tier.
        </p>
      </section>

      <section className="space-y-4">
        <h2 className="font-display text-2xl">Redeem rewards</h2>
        <div className="grid gap-4 sm:grid-cols-3">
          {loyalty.rewards.map((r) => (
            <article key={r.id} className="surface space-y-3 p-5">
              <div className="grid size-10 place-items-center rounded-full bg-accent text-accent-foreground"><Gift className="size-5" /></div>
              <p className="font-display text-xl leading-tight">{r.name}</p>
              <p className="text-sm text-muted-foreground">{r.cost.toLocaleString('en-IN')} points</p>
              <Button
                className="w-full rounded-full"
                variant={r.available ? 'default' : 'secondary'}
                disabled={!r.available}
                onClick={() => toast.success('Reward redeemed', { description: r.name })}
              >
                {r.available ? 'Redeem' : 'Not enough points'}
              </Button>
            </article>
          ))}
        </div>
      </section>

      <section className="surface flex flex-wrap items-center justify-between gap-4 p-6">
        <div>
          <h2 className="font-display text-2xl">Refer a friend</h2>
          <p className="mt-1 text-sm text-muted-foreground">You both get 300 points on their first visit.</p>
        </div>
        <Button className="rounded-full bg-gradient-gold text-ink hover:opacity-90" onClick={() => toast.success('Referral link copied')}>
          <Share2 className="size-4" /> Share invite
        </Button>
      </section>

      <section className="space-y-4">
        <h2 className="font-display text-2xl">Points history</h2>
        <div className="surface divide-y divide-border">
          {loyalty.history.map((h) => (
            <div key={h.id} className="flex items-center justify-between gap-3 px-5 py-4 text-sm">
              <div>
                <p className="font-medium">{h.label}</p>
                <p className="text-xs text-muted-foreground">{h.date}</p>
              </div>
              <span className={h.points > 0 ? 'text-success' : 'text-muted-foreground'}>
                {h.points > 0 ? '+' : ''}{h.points}
              </span>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}
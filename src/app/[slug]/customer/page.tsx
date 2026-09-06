'use client';

import Link from 'next/link';
import {
  CalendarDays, CreditCard, Crown, Gift, MessageCircle, Phone, Sparkles, Wallet,
} from 'lucide-react';
import { Button } from '@/components/owner/customer-portal/button';
import { Progress } from '@/components/owner/customer-portal/progress';
import { AppointmentCard } from '@/components/owner/customer-portal/AppointmentCard';
import { ServiceCard } from '@/components/owner/customer-portal/ServiceCard';
import {
  appointments, customer, formatCurrency, loyalty, membership, services, tenant, upcomingAppointment,
} from '@/data/customer-portal';
import { portalHref, useCustomerPortal } from '@/contexts/customer-context';

function Stat({
  icon: Icon, label, value, hint, to,
}: {
  icon: typeof Gift;
  label: string;
  value: string;
  hint: string;
  to: string;
}) {
  const { basePath } = useCustomerPortal();
  return (
    <Link href={portalHref(basePath, to)} className="surface surface-hover block p-5">
      <div className="flex items-center gap-2 text-muted-foreground">
        <Icon className="size-4" />
        <span className="text-xs uppercase tracking-[0.14em]">{label}</span>
      </div>
      <p className="mt-3 font-display text-3xl">{value}</p>
      <p className="mt-1 text-xs text-muted-foreground">{hint}</p>
    </Link>
  );
}

export default function Overview() {
  const { basePath } = useCustomerPortal();
  const past = appointments.filter((a) => a.status === 'Completed');
  return (
    <div className="space-y-8">
      <section className="rise-in surface overflow-hidden bg-gradient-ink p-6 text-sidebar-foreground sm:p-8">
        <p className="text-xs uppercase tracking-[0.2em] text-sidebar-foreground/60">{tenant.name}</p>
        <h1 className="mt-2 font-display text-4xl leading-tight sm:text-5xl">
          Welcome back, {customer.firstName}
        </h1>
        <p className="mt-2 max-w-lg text-sm text-sidebar-foreground/70">
          You have {appointments.filter((a) => a.status === 'Confirmed' || a.status === 'Pending').length} upcoming
          appointments and {loyalty.points.toLocaleString('en-IN')} reward points ready to use.
        </p>
        <div className="mt-6 flex flex-wrap gap-2">
          <Button asChild className="rounded-full bg-gradient-gold text-ink hover:opacity-90">
            <Link href={`${basePath}/book`}>
              <Sparkles className="size-4" /> Book Appointment
            </Link>
          </Button>
          <Button asChild variant="ghost" className="rounded-full text-sidebar-foreground hover:bg-sidebar-accent">
            <Link href={`${basePath}/messages`}>
              <MessageCircle className="size-4" /> Message salon
            </Link>
          </Button>
        </div>
      </section>

      <section className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        <Stat icon={CalendarDays} label="Upcoming" value={String(appointments.filter((a) => a.status !== 'Completed' && a.status !== 'Cancelled').length)} hint="View appointments" to="/appointments" />
        <Stat icon={Wallet} label="Total spent" value={formatCurrency(customer.totalSpend)} hint={`${customer.visits} visits so far`} to="/payments" />
        <Stat icon={Gift} label="Reward points" value={loyalty.points.toLocaleString('en-IN')} hint={`${loyalty.nextRewardAt - loyalty.points} to next reward`} to="/rewards" />
        <Stat icon={Crown} label="Membership" value={membership.name} hint={`Renews ${membership.renewsOn}`} to="/membership" />
      </section>

      <section className="space-y-4">
        <h2 className="font-display text-2xl">Your next appointment</h2>
        <AppointmentCard appointment={upcomingAppointment} featured />
      </section>

      <section className="grid gap-4 lg:grid-cols-3">
        <div className="surface space-y-3 p-5 lg:col-span-2">
          <h2 className="font-display text-2xl">Loyalty progress</h2>
          <Progress value={(loyalty.points / loyalty.nextRewardAt) * 100} />
          <p className="text-sm text-muted-foreground">
            {loyalty.points.toLocaleString('en-IN')} / {loyalty.nextRewardAt.toLocaleString('en-IN')} points towards your next reward.
          </p>
          <Button asChild variant="secondary" className="rounded-full">
            <Link href={portalHref(basePath, '/rewards')}>Redeem rewards</Link>
          </Button>
        </div>
        <div className="surface space-y-2 p-5">
          <h2 className="font-display text-2xl">Contact salon</h2>
          <p className="text-sm text-muted-foreground">{tenant.address}</p>
          <p className="text-sm text-muted-foreground">{tenant.hours}</p>
          <a href={`tel:${tenant.phone}`} className="inline-flex items-center gap-2 text-sm text-foreground underline-offset-4 hover:underline">
            <Phone className="size-4" /> {tenant.phone}
          </a>
        </div>
      </section>

      <section className="space-y-4">
        <div className="flex items-end justify-between gap-3">
          <h2 className="font-display text-2xl">Book again</h2>
          <Link href={portalHref(basePath, '/favorites')} className="text-sm text-muted-foreground underline-offset-4 hover:underline">
            See favorites
          </Link>
        </div>
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {services.map((s) => (
            <ServiceCard key={s.id} service={s} ctaLabel="Book again" footnote={`Last booked ${s.lastBooked ?? '—'}`} />
          ))}
        </div>
      </section>

      <section className="space-y-4">
        <h2 className="font-display text-2xl">Recent visits</h2>
        <div className="grid gap-4">
          {past.map((a) => <AppointmentCard key={a.id} appointment={a} />)}
        </div>
        <Button asChild variant="ghost" className="rounded-full">
          <Link href={portalHref(basePath, '/history')}>
            <CreditCard className="size-4" /> Full booking history
          </Link>
        </Button>
      </section>
    </div>
  );
}
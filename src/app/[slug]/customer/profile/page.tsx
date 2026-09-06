'use client';

import { toast } from 'sonner';
import { Avatar, AvatarFallback } from '@/components/owner/customer-portal/avatar';
import { Button } from '@/components/owner/customer-portal/button';
import { Input } from '@/components/owner/customer-portal/input';
import { Label } from '@/components/owner/customer-portal/label';
import { PageHeader } from '@/components/owner/customer-portal/PageHeader';
import { customer, formatCurrency, tenant } from '@/data/customer-portal';

function Field({ label, defaultValue, type = 'text' }: { label: string; defaultValue: string; type?: string }) {
  return (
    <div className="space-y-1.5">
      <Label className="text-xs uppercase tracking-[0.12em] text-muted-foreground">{label}</Label>
      <Input type={type} defaultValue={defaultValue} className="rounded-2xl" />
    </div>
  );
}

export default function ProfilePage() {
  return (
    <div className="space-y-6">
      <PageHeader title="My Profile" subtitle={`Your details with ${tenant.name}.`} />

      <div className="surface flex flex-wrap items-center gap-5 p-6">
        <Avatar className="size-16 border border-gold/40">
          <AvatarFallback className="bg-accent text-lg text-accent-foreground">{customer.initials}</AvatarFallback>
        </Avatar>
        <div>
          <p className="font-display text-3xl">{customer.fullName}</p>
          <p className="text-sm text-muted-foreground">Member since {customer.memberSince} · {customer.visits} visits · {formatCurrency(customer.totalSpend)} spent</p>
        </div>
      </div>

      <div className="surface space-y-4 p-6">
        <h2 className="font-display text-2xl">Personal details</h2>
        <div className="grid gap-4 sm:grid-cols-2">
          <Field label="Full name" defaultValue={customer.fullName} />
          <Field label="Email" defaultValue={customer.email} type="email" />
          <Field label="Phone" defaultValue={customer.phone} />
          <Field label="Date of birth" defaultValue={customer.dob} type="date" />
          <Field label="Gender" defaultValue={customer.gender} />
          <Field label="Address" defaultValue={customer.address} />
        </div>
        <div className="grid gap-4 sm:grid-cols-2">
          <Field label="Preferred stylist" defaultValue={customer.preferredStylist} />
          <Field label="Preferred services" defaultValue={customer.preferredServices.join(', ')} />
        </div>
        <Button className="rounded-full" onClick={() => toast.success('Profile updated')}>Save changes</Button>
      </div>
    </div>
  );
}
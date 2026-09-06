'use client';

import { toast } from 'sonner';
import { Button } from '@/components/owner/customer-portal/button';
import { Switch } from '@/components/owner/customer-portal/switch';
import { Label } from '@/components/owner/customer-portal/label';
import { PageHeader } from '@/components/owner/customer-portal/PageHeader';

const prefs = [
  { id: 'email', label: 'Email notifications', desc: 'Booking confirmations and receipts', on: true },
  { id: 'sms', label: 'SMS reminders', desc: 'A nudge 24 hours before your visit', on: true },
  { id: 'whatsapp', label: 'WhatsApp updates', desc: 'Chat updates from the salon', on: false },
  { id: 'offers', label: 'Promotional offers', desc: 'Seasonal deals and member-only pricing', on: true },
];

export default function SettingsPage() {
  return (
    <div className="space-y-6">
      <PageHeader title="Settings" subtitle="Notifications, privacy and account security." />

      <section className="surface divide-y divide-border">
        {prefs.map((p) => (
          <div key={p.id} className="flex items-center justify-between gap-4 px-5 py-4">
            <div>
              <Label htmlFor={p.id} className="text-sm font-medium">{p.label}</Label>
              <p className="text-xs text-muted-foreground">{p.desc}</p>
            </div>
            <Switch id={p.id} defaultChecked={p.on} onCheckedChange={() => toast.success('Preference saved')} />
          </div>
        ))}
      </section>

      <section className="surface space-y-3 p-6">
        <h2 className="font-display text-2xl">Account</h2>
        <div className="flex flex-wrap gap-2">
          <Button variant="secondary" className="rounded-full" onClick={() => toast.success('Password reset link sent')}>Change password</Button>
          <Button variant="secondary" className="rounded-full" onClick={() => toast.success('Data export requested')}>Download my data</Button>
          <Button variant="ghost" className="rounded-full text-destructive" onClick={() => toast('Account deletion requires confirmation by email')}>Delete account</Button>
        </div>
      </section>
    </div>
  );
}
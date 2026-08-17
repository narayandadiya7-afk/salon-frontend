'use client';

import { Building2, Receipt, Sparkles, Users } from 'lucide-react';
import { ModulePage } from '@/components/portal/ModulePage';

export default function SubscriptionPage() {
  return (
    <ModulePage
      module="subscription"
      name="Subscription"
      eyebrow="Billing"
      title="Subscription & billing"
      description="Your platform plan, usage, invoices and payment method."
      primaryAction="Upgrade plan"
      stats={[
        { label: 'Current plan', value: 'Enterprise', hint: '£389 / month', icon: Sparkles, tone: 'gold' },
        { label: 'Locations used', value: '3 of 5', icon: Building2, tone: 'azure' },
        { label: 'Seats used', value: '24 of 30', icon: Users, tone: 'royal' },
        { label: 'Next invoice', value: '01 Sep', hint: '£389.00', icon: Receipt, tone: 'emerald' },
      ]}
      panels={[
        {
          title: 'Plan usage',
          description: 'This billing period',
          rows: [
            { primary: 'Bookings processed', secondary: '14,281 of unlimited' },
            { primary: 'SMS credits', secondary: '2,140 of 5,000' },
            { primary: 'Storage', secondary: '18 GB of 100 GB' },
            { primary: 'API calls', secondary: '482k of 2M' },
          ],
        },
        {
          title: 'Billing history',
          description: 'Paid invoices',
          rows: [
            { primary: 'Aug 2026', secondary: 'Enterprise · 3 locations', value: '£389', chip: { label: 'Paid', tone: 'emerald' } },
            { primary: 'Jul 2026', secondary: 'Enterprise · 3 locations', value: '£389', chip: { label: 'Paid', tone: 'emerald' } },
            { primary: 'Jun 2026', secondary: 'Enterprise · 2 locations', value: '£289', chip: { label: 'Paid', tone: 'emerald' } },
            { primary: 'May 2026', secondary: 'Growth · 2 locations', value: '£189', chip: { label: 'Paid', tone: 'emerald' } },
          ],
        },
      ]}
      features={['Payment method', 'VAT details', 'Plan comparison', 'Cancel or pause']}
    />
  );
}

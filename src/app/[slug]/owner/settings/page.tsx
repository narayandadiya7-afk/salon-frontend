'use client';

import { Building2, DatabaseBackup, Plug, Users } from 'lucide-react';
import { ModulePage } from '@/components/portal/ModulePage';

export default function SettingsPage() {
  return (
    <ModulePage
      module="settings"
      name="Settings"
      eyebrow="System"
      title="Settings"
      description="Business information, locations, taxes, templates, integrations and security."
      primaryAction="Save changes"
      stats={[
        { label: 'Locations', value: '3', icon: Building2, tone: 'gold' },
        { label: 'Team seats', value: '24 of 30', icon: Users, tone: 'azure' },
        { label: 'Integrations', value: '7 connected', icon: Plug, tone: 'royal' },
        { label: 'Last backup', value: '2h ago', hint: 'Nightly at 02:00', icon: DatabaseBackup, tone: 'emerald' },
      ]}
      panels={[
        {
          title: 'Business',
          description: 'Core configuration',
          rows: [
            { primary: 'Business information', secondary: 'Maison Lumière Group Ltd' },
            { primary: 'Working hours', secondary: 'Mon–Sun · 09:00–20:00' },
            { primary: 'Holiday calendar', secondary: '8 dates in 2026' },
            { primary: 'Taxes', secondary: 'VAT 20% standard' },
            { primary: 'Currencies & languages', secondary: 'GBP · AED · English, French' },
          ],
        },
        {
          title: 'Platform',
          description: 'Security & integrations',
          rows: [
            { primary: 'Payment gateway', secondary: 'Stripe · live', chip: { label: 'Connected', tone: 'emerald' } },
            { primary: 'Email & SMS templates', secondary: '14 templates' },
            { primary: 'API keys', secondary: '3 active', chip: { label: 'Rotate in 30d', tone: 'warning' } },
            { primary: 'Security', secondary: '2FA enforced · SSO ready', chip: { label: 'Strong', tone: 'emerald' } },
            { primary: 'Audit logs', secondary: '1,284 events this month' },
          ],
        },
      ]}
      features={['Backup & restore', 'Roles defaults', 'Data export', 'Webhooks']}
    />
  );
}

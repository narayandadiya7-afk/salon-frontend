'use client';

import { Boxes, Crown, Scissors, Tag } from 'lucide-react';
import { ModulePage } from '@/components/portal/ModulePage';

export default function ServicesPage() {
  return (
    <ModulePage
      module="services"
      name="Services & Packages"
      eyebrow="Catalog"
      title="Services, packages & memberships"
      description="Pricing, duration, tax and availability rules for everything you sell."
      primaryAction="Add service"
      stats={[
        { label: 'Active services', value: '48', icon: Scissors, tone: 'gold' },
        { label: 'Packages', value: '12', icon: Boxes, tone: 'royal' },
        { label: 'Membership holders', value: '327', delta: '+18', icon: Crown, tone: 'azure' },
        { label: 'Avg service price', value: '£146', delta: '+2.4%', icon: Tag, tone: 'emerald' },
      ]}
      panels={[
        {
          title: 'Top services',
          description: 'Bookings, 30 days',
          rows: [
            { primary: 'Cut & Style', secondary: 'Hair · 60m · 20% VAT', value: '£78' },
            { primary: 'Balayage + Gloss', secondary: 'Colour · 150m', value: '£285' },
            { primary: 'Skin Fade', secondary: 'Barbering · 45m', value: '£48' },
            { primary: 'Keratin Treatment', secondary: 'Treatments · 120m', value: '£340' },
            { primary: 'Gel Manicure', secondary: 'Nails · 45m', value: '£65' },
          ],
        },
        {
          title: 'Memberships & packages',
          description: 'Recurring revenue',
          rows: [
            { primary: 'Platinum Glow', secondary: '84 holders · monthly', value: '£189' },
            { primary: 'Gold Ritual', secondary: '146 holders · monthly', value: '£119' },
            { primary: 'Skin Club', secondary: '97 holders · monthly', value: '£89' },
            { primary: 'Bridal Suite', secondary: '12 sold · one-off', value: '£1,250' },
            { primary: 'Gift cards', secondary: '218 active', chip: { label: '£9,420 liability', tone: 'neutral' } },
          ],
        },
      ]}
      features={['Categories', 'Bulk import', 'Bulk update', 'Availability rules', 'Upselling suggestions', 'Tax rules', 'Images']}
    />
  );
}

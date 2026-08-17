'use client';

import { CalendarCheck, Repeat, ShoppingBag, TrendingUp } from 'lucide-react';
import { ModulePage } from '@/components/portal/ModulePage';

export default function ReportsPage() {
  return (
    <ModulePage
      module="reports"
      name="Reports & Analytics"
      eyebrow="Insight"
      title="Reports & analytics"
      description="Slice revenue, staff, customers, services and marketing — then export."
      primaryAction="Build report"
      stats={[
        { label: 'Revenue YTD', value: '£612,300', delta: '+11.4%', icon: TrendingUp, tone: 'gold' },
        { label: 'Bookings YTD', value: '14,281', delta: '+8.2%', icon: CalendarCheck, tone: 'royal' },
        { label: 'Client retention', value: '72%', delta: '-1.4%', icon: Repeat, tone: 'azure' },
        { label: 'Retail attach', value: '28%', delta: '+2.1%', icon: ShoppingBag, tone: 'emerald' },
      ]}
      panels={[
        {
          title: 'Saved reports',
          description: 'Scheduled & ad-hoc',
          rows: [
            { primary: 'Weekly revenue summary', secondary: 'Every Monday 08:00', chip: { label: 'Scheduled', tone: 'emerald' } },
            { primary: 'Staff commission run', secondary: 'Monthly', chip: { label: 'Scheduled', tone: 'emerald' } },
            { primary: 'Membership cohort', secondary: 'Ad-hoc', chip: { label: 'Draft', tone: 'neutral' } },
            { primary: 'Tax summary Q3', secondary: 'Quarterly', chip: { label: 'Scheduled', tone: 'emerald' } },
          ],
        },
        {
          title: 'Export centre',
          description: 'PDF · Excel · CSV',
          rows: [
            { primary: 'Revenue by service', secondary: 'Last 90 days', chip: { label: 'Ready', tone: 'azure' } },
            { primary: 'Customer list', secondary: 'All segments', chip: { label: 'Ready', tone: 'azure' } },
            { primary: 'Inventory valuation', secondary: 'Current', chip: { label: 'Ready', tone: 'azure' } },
            { primary: 'Appointment log', secondary: 'Last 30 days', chip: { label: 'Ready', tone: 'azure' } },
          ],
        },
      ]}
      features={['Interactive filters', 'Comparisons', 'Cohorts', 'Tax reports', 'Marketing attribution']}
    />
  );
}

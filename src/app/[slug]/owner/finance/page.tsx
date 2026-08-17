'use client';

import { Banknote, Receipt, TrendingUp, Wallet } from 'lucide-react';
import { ModulePage } from '@/components/portal/ModulePage';

export default function FinancePage() {
  return (
    <ModulePage
      module="finance"
      name="Finance"
      eyebrow="Money"
      title="Financial management"
      description="Invoices, payments, expenses, taxes, tips and commission in one ledger."
      primaryAction="New invoice"
      stats={[
        { label: 'Revenue MTD', value: '£127,300', delta: '+7.1%', icon: Wallet, tone: 'gold' },
        { label: 'Outstanding', value: '£2,940', hint: '6 invoices', icon: Receipt, tone: 'neutral' },
        { label: 'Expenses MTD', value: '£10,570', icon: Banknote, tone: 'royal' },
        { label: 'Net profit', value: '£46,820', delta: '+9.4%', icon: TrendingUp, tone: 'emerald' },
      ]}
      panels={[
        {
          title: 'Invoices',
          description: 'Latest activity',
          rows: [
            { primary: 'INV-20841 · Eleanor Voss', secondary: 'Today · unpaid', value: '£285', chip: { label: 'Unpaid', tone: 'warning' } },
            { primary: 'INV-20840 · Marcus Hale', secondary: 'Today · card', value: '£48', chip: { label: 'Paid', tone: 'emerald' } },
            { primary: 'INV-20839 · Amelie Laurent', secondary: 'Yesterday · card', value: '£420', chip: { label: 'Paid', tone: 'emerald' } },
            { primary: 'INV-20838 · Grace Kim', secondary: 'Yesterday · split', value: '£520', chip: { label: 'Partial', tone: 'gold' } },
          ],
        },
        {
          title: 'Expenses',
          description: 'This month',
          rows: [
            { primary: 'Salon rent — Mayfair', secondary: 'Rent · 01 Aug', value: '£8,400' },
            { primary: 'Wella colour restock', secondary: 'Stock · 03 Aug', value: '£1,240' },
            { primary: 'Instagram ads', secondary: 'Marketing · 05 Aug', value: '£620' },
            { primary: 'Laundry service', secondary: 'Operations · 07 Aug', value: '£310' },
          ],
        },
      ]}
      features={['Taxes', 'Refunds', 'Tips', 'Commissions', 'Cash flow', 'Profit reports']}
    />
  );
}

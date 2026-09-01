'use client';

import { Banknote, CreditCard, Receipt, Undo2 } from 'lucide-react';
import { ModulePage } from '@/components/owner/owner-portal/ModulePage';

export default function PosPage() {
  return (
    <ModulePage
      module="pos"
      name="Point of Sale"
      eyebrow="Checkout"
      title="Point of sale"
      description="Fast checkout for services and retail with split payments, discounts and receipts."
      primaryAction="Open new sale"
      stats={[
        { label: 'Sales today', value: '62', icon: Receipt, tone: 'gold' },
        { label: 'Card takings', value: '£4,910', icon: CreditCard, tone: 'azure' },
        { label: 'Cash drawer', value: '£812', hint: 'Opening float £200', icon: Banknote, tone: 'emerald' },
        { label: 'Refunds', value: '£130', hint: '1 transaction', icon: Undo2, tone: 'neutral' },
      ]}
      panels={[
        {
          title: 'Open tickets',
          description: 'Awaiting payment',
          rows: [
            { primary: 'Eleanor Voss', secondary: 'Balayage + Gloss · Ivy', value: '£285' },
            { primary: 'Priya Anand', secondary: 'Keratin Treatment · Leila', value: '£340' },
            { primary: 'Grace Kim', secondary: 'Colour Correction · Leila', value: '£520' },
          ],
        },
        {
          title: 'Recent transactions',
          description: 'Today',
          rows: [
            { primary: 'Marcus Hale', secondary: 'Card · INV-20840', value: '£48', chip: { label: 'Paid', tone: 'emerald' } },
            { primary: 'Amelie Laurent', secondary: 'Card · INV-20839', value: '£420', chip: { label: 'Paid', tone: 'emerald' } },
            { primary: 'Bianca Ortiz', secondary: 'Wallet · INV-20837', value: '£95', chip: { label: 'Paid', tone: 'emerald' } },
            { primary: 'Sofia Duarte', secondary: 'Card · INV-20836', value: '£130', chip: { label: 'Refunded', tone: 'danger' } },
          ],
        },
      ]}
      features={['Split payments', 'Discounts', 'Coupons', 'Gift cards', 'Membership redemption', 'Receipt preview', 'Email receipt', 'Cash drawer']}
    />
  );
}

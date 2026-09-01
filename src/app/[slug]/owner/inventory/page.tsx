'use client';

import { Boxes, CalendarClock, TriangleAlert, Wallet } from 'lucide-react';
import { ModulePage } from '@/components/owner/owner-portal/ModulePage';

export default function InventoryPage() {
  return (
    <ModulePage
      module="inventory"
      name="Inventory"
      eyebrow="Stock"
      title="Inventory & suppliers"
      description="Products, purchase orders, stock movement, expiry and valuation."
      primaryAction="New purchase order"
      stats={[
        { label: 'SKUs tracked', value: '312', icon: Boxes, tone: 'gold' },
        { label: 'Low stock', value: '4', hint: 'Reorder today', icon: TriangleAlert, tone: 'neutral' },
        { label: 'Stock value', value: '£42,180', delta: '+3.1%', icon: Wallet, tone: 'emerald' },
        { label: 'Expiring soon', value: '7', hint: 'Within 60 days', icon: CalendarClock, tone: 'royal' },
      ]}
      panels={[
        {
          title: 'Reorder alerts',
          description: 'Below reorder point',
          rows: [
            { primary: 'Wella Koleston 7/43', secondary: 'Wella Direct · 3 units', chip: { label: 'Critical', tone: 'danger' } },
            { primary: 'Olaplex No.3', secondary: 'Olaplex UK · 6 units', chip: { label: 'Low', tone: 'warning' } },
            { primary: 'OPI Infinite Shine', secondary: 'Beauty Depot · 9 units', chip: { label: 'Low', tone: 'warning' } },
          ],
        },
        {
          title: 'Recent stock movement',
          description: 'Last 7 days',
          rows: [
            { primary: 'Kérastase Chronologiste', secondary: 'Received · PO-2291', value: '+24' },
            { primary: 'Dermalogica Milkfoliant', secondary: 'Retail sale', value: '-3' },
            { primary: 'Barber blades', secondary: 'Internal use', value: '-12' },
            { primary: 'Olaplex No.3', secondary: 'Retail sale', value: '-5' },
          ],
        },
      ]}
      features={['Suppliers', 'Purchase orders', 'Barcode & QR', 'Expiry alerts', 'Inventory valuation', 'Categories']}
    />
  );
}

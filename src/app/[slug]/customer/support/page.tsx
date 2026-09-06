'use client';

import { Mail, MapPin, MessageCircle, Phone } from 'lucide-react';
import Link from 'next/link';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/owner/customer-portal/accordion';
import { Button } from '@/components/owner/customer-portal/button';
import { PageHeader } from '@/components/owner/customer-portal/PageHeader';
import { tenant } from '@/data/customer-portal';
import { useCustomerPortal } from '@/contexts/customer-context';

const faqs = [
  { q: 'How do I reschedule an appointment?', a: 'Open My Appointments, choose the booking and tap Reschedule. Changes are free up to 24 hours before your slot.' },
  { q: 'What is the cancellation policy?', a: 'Cancel more than 24 hours ahead for a full refund. Later cancellations may incur a 25% fee.' },
  { q: 'How do loyalty points work?', a: 'You earn points on every completed visit and referral. Redeem them for discounts and add-on services.' },
  { q: 'Can I pause my membership?', a: 'Yes — message the salon and we can pause Glam Gold for up to two months per year.' },
];

export default function SupportPage() {
  const { basePath } = useCustomerPortal();
  return (
    <div className="space-y-8">
      <PageHeader title="Help & Support" subtitle={`We're here to help — ${tenant.responseTime.toLowerCase()}.`} />

      <section className="grid gap-4 sm:grid-cols-2">
        <div className="surface space-y-2 p-5">
          <h2 className="font-display text-2xl">{tenant.name}</h2>
          <p className="flex items-start gap-2 text-sm text-muted-foreground"><MapPin className="mt-0.5 size-4" /> {tenant.address}</p>
          <p className="text-sm text-muted-foreground">{tenant.hours}</p>
          <div className="flex flex-wrap gap-2 pt-2">
            <Button asChild variant="secondary" className="rounded-full"><a href={`tel:${tenant.phone}`}><Phone className="size-4" /> Call</a></Button>
            <Button asChild variant="secondary" className="rounded-full"><a href={`mailto:${tenant.email}`}><Mail className="size-4" /> Email</a></Button>
            <Button asChild className="rounded-full"><Link href={`${basePath}/messages`}><MessageCircle className="size-4" /> Chat</Link></Button>
          </div>
        </div>
        <div className="surface overflow-hidden">
          <iframe
            title="Glam Studio location"
            src="https://www.google.com/maps?q=Turner+Road+Bandra+West+Mumbai&output=embed"
            loading="lazy"
            className="h-full min-h-56 w-full border-0"
          />
        </div>
      </section>

      <section className="space-y-4">
        <h2 className="font-display text-2xl">Frequently asked</h2>
        <Accordion type="single" collapsible className="surface px-5">
          {faqs.map((f, i) => (
            <AccordionItem key={f.q} value={`f${i}`}>
              <AccordionTrigger className="text-left text-sm">{f.q}</AccordionTrigger>
              <AccordionContent className="text-sm text-muted-foreground">{f.a}</AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>
      </section>
    </div>
  );
}
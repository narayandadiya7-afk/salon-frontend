'use client';

import { useRouter } from 'next/navigation';
import {
  CommandDialog, CommandEmpty, CommandGroup, CommandInput, CommandItem, CommandList,
} from '@/components/owner/customer-portal/command';
import { services, stylists, appointments, packages, payments, membership } from '@/data/customer-portal';
import { portalHref, useCustomerPortal } from '@/contexts/customer-context';

export function GlobalSearch({
  open,
  onOpenChange,
}: {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}) {
  const router = useRouter();
  const { basePath } = useCustomerPortal();
  const go = (to: string) => {
    onOpenChange(false);
    router.push(portalHref(basePath, to));
  };

  return (
    <CommandDialog open={open} onOpenChange={onOpenChange}>
      <CommandInput placeholder="Search services, stylists, appointments…" />
      <CommandList>
        <CommandEmpty>No results at Glam Studio.</CommandEmpty>
        <CommandGroup heading="Services">
          {services.map((s) => (
            <CommandItem key={s.id} onSelect={() => go('/book')}>{s.name}</CommandItem>
          ))}
        </CommandGroup>
        <CommandGroup heading="Stylists">
          {stylists.map((s) => (
            <CommandItem key={s.id} onSelect={() => go('/book')}>{s.name} · {s.role}</CommandItem>
          ))}
        </CommandGroup>
        <CommandGroup heading="Appointments">
          {appointments.map((a) => (
            <CommandItem key={a.id} onSelect={() => go('/appointments')}>
              {a.service} · {a.date}
            </CommandItem>
          ))}
        </CommandGroup>
        <CommandGroup heading="Packages & Membership">
          {packages.map((p) => (
            <CommandItem key={p.id} onSelect={() => go('/packages')}>{p.name}</CommandItem>
          ))}
          <CommandItem onSelect={() => go('/membership')}>{membership.name} membership</CommandItem>
        </CommandGroup>
        <CommandGroup heading="Invoices">
          {payments.map((p) => (
            <CommandItem key={p.id} onSelect={() => go('/payments')}>{p.id} · {p.item}</CommandItem>
          ))}
        </CommandGroup>
      </CommandList>
    </CommandDialog>
  );
}
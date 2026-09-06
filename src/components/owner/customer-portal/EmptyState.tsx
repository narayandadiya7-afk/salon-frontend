import type { LucideIcon } from 'lucide-react';
import Link from 'next/link';
import { Button } from '@/components/owner/customer-portal/button';
import { portalHref, useCustomerPortal } from '@/contexts/customer-context';

export function EmptyState({
  icon: Icon,
  title,
  description,
  ctaLabel,
  ctaTo = '/book',
}: {
  icon: LucideIcon;
  title: string;
  description: string;
  ctaLabel: string;
  ctaTo?: string;
}) {
  const { basePath } = useCustomerPortal();
  return (
    <div className="surface flex flex-col items-center px-6 py-14 text-center">
      <div className="grid size-14 place-items-center rounded-full bg-accent text-accent-foreground">
        <Icon className="size-6" />
      </div>
      <h3 className="mt-5 font-display text-2xl">{title}</h3>
      <p className="mt-2 max-w-sm text-sm text-muted-foreground">{description}</p>
      <Button asChild className="mt-6 rounded-full">
        <Link href={portalHref(basePath, ctaTo)}>{ctaLabel}</Link>
      </Button>
    </div>
  );
}
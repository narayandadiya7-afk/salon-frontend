import { Clock, Star } from 'lucide-react';
import Link from 'next/link';
import { Button } from '@/components/owner/customer-portal/button';
import { formatCurrency, type Service } from '@/data/customer-portal';
import { portalHref, useCustomerPortal } from '@/contexts/customer-context';

export function ServiceCard({
  service,
  ctaLabel = 'Book',
  footnote,
}: {
  service: Service;
  ctaLabel?: string;
  footnote?: string;
}) {
  const { basePath } = useCustomerPortal();
  return (
    <article className="surface surface-hover overflow-hidden">
      <img
        src={service.image}
        alt={service.name}
        loading="lazy"
        width={800}
        height={600}
        className="h-40 w-full object-cover"
      />
      <div className="space-y-3 p-5">
        <div className="flex items-start justify-between gap-3">
          <h3 className="font-display text-xl leading-tight">{service.name}</h3>
          <span className="flex shrink-0 items-center gap-1 text-xs text-muted-foreground">
            <Star className="size-3.5 fill-gold text-gold" />
            {service.rating}
          </span>
        </div>
        <p className="line-clamp-2 text-sm text-muted-foreground">{service.description}</p>
        <div className="flex items-center gap-3 text-sm text-muted-foreground">
          <span className="inline-flex items-center gap-1.5">
            <Clock className="size-3.5" /> {service.duration}
          </span>
          <span className="font-medium text-foreground">{formatCurrency(service.price)}</span>
        </div>
        {footnote ? <p className="text-xs text-muted-foreground">{footnote}</p> : null}
        <Button asChild variant="secondary" className="w-full rounded-full">
          <Link href={portalHref(basePath, '/book')}>{ctaLabel}</Link>
        </Button>
      </div>
    </article>
  );
}
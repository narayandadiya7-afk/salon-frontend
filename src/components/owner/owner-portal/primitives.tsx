'use client';

import type { ReactNode } from 'react';
import Link from 'next/link';
import { useParams } from 'next/navigation';
import { Lock, type LucideIcon } from 'lucide-react';
import { cn } from '@/lib/utils';
import { useSession } from '@/lib/portal/session';
import type { ModuleId, PermissionAction } from '@/lib/portal/rbac';
import { Button } from '@/components/owner/owner-portal/button';
import { Skeleton } from '@/components/owner/owner-portal/skeleton';

export function PageHeader({
  eyebrow,
  title,
  description,
  actions,
}: {
  eyebrow?: string;
  title: string;
  description?: string;
  actions?: ReactNode;
}) {
  return (
    <header className="grid grid-cols-[minmax(0,1fr)_auto] items-start gap-4 sm:flex sm:flex-wrap sm:items-end sm:justify-between">
      <div className="min-w-0">
        {eyebrow && (
          <p className="text-[0.7rem] font-semibold uppercase tracking-[0.18em] text-gold">
            {eyebrow}
          </p>
        )}
        <h1 className="mt-1 text-display text-2xl text-foreground sm:text-3xl">{title}</h1>
        {description && (
          <p className="mt-2 max-w-2xl text-sm leading-relaxed text-muted-foreground">{description}</p>
        )}
      </div>
      {actions && <div className="flex shrink-0 flex-wrap items-center gap-2">{actions}</div>}
    </header>
  );
}

export function Surface({
  className,
  children,
  ...rest
}: React.HTMLAttributes<HTMLDivElement>) {
  return (
    <div className={cn('surface', className)} {...rest}>
      {children}
    </div>
  );
}

export function SectionCard({
  title,
  description,
  action,
  children,
  className,
  bodyClassName,
}: {
  title: string;
  description?: string;
  action?: ReactNode;
  children: ReactNode;
  className?: string;
  bodyClassName?: string;
}) {
  return (
    <Surface className={cn('flex flex-col', className)}>
      <div className="grid grid-cols-[minmax(0,1fr)_auto] items-center gap-3 border-b border-border px-5 py-4">
        <div className="min-w-0">
          <h2 className="truncate text-sm font-semibold text-foreground">{title}</h2>
          {description && <p className="truncate text-xs text-muted-foreground">{description}</p>}
        </div>
        {action}
      </div>
      <div className={cn('flex-1 p-5', bodyClassName)}>{children}</div>
    </Surface>
  );
}

const toneMap = {
  gold: 'bg-gold-soft text-gold',
  royal: 'bg-royal-soft text-royal',
  azure: 'bg-azure-soft text-azure',
  emerald: 'bg-emerald-soft text-emerald',
  neutral: 'bg-muted text-muted-foreground',
} as const;

export type Tone = keyof typeof toneMap;

export function StatCard({
  label,
  value,
  delta,
  hint,
  icon: Icon,
  tone = 'neutral',
}: {
  label: string;
  value: string;
  delta?: string;
  hint?: string;
  icon: LucideIcon;
  tone?: Tone;
}) {
  const positive = delta?.startsWith('+');
  return (
    <Surface className="p-5 transition-shadow hover:shadow-[var(--shadow-lifted)]">
      <div className="flex items-start justify-between gap-3">
        <span className={cn('grid size-10 shrink-0 place-items-center rounded-xl', toneMap[tone])}>
          <Icon className="size-5" strokeWidth={1.75} />
        </span>
        {delta && (
          <span
            className={cn(
              'rounded-full px-2 py-1 text-xs font-semibold',
              positive ? 'bg-emerald-soft text-emerald' : 'bg-destructive/10 text-destructive',
            )}
          >
            {delta}
          </span>
        )}
      </div>
      <p className="mt-4 text-sm text-muted-foreground">{label}</p>
      <p className="mt-1 text-2xl font-semibold tracking-tight text-foreground">{value}</p>
      {hint && <p className="mt-1 text-xs text-muted-foreground/80">{hint}</p>}
    </Surface>
  );
}

export function StatusChip({
  tone = 'neutral',
  children,
}: {
  tone?: Tone | 'danger' | 'warning';
  children: ReactNode;
}) {
  const map: Record<string, string> = {
    ...toneMap,
    danger: 'bg-destructive/10 text-destructive',
    warning: 'bg-warning-soft text-warning-foreground',
  };
  return (
    <span
      className={cn(
        'inline-flex items-center gap-1.5 rounded-full px-2.5 py-1 text-xs font-medium',
        map[tone],
      )}
    >
      {children}
    </span>
  );
}

export function EmptyState({
  icon: Icon,
  title,
  description,
  action,
}: {
  icon: LucideIcon;
  title: string;
  description: string;
  action?: ReactNode;
}) {
  return (
    <div className="flex flex-col items-center justify-center px-6 py-16 text-center">
      <span className="grid size-14 place-items-center rounded-2xl bg-muted text-muted-foreground">
        <Icon className="size-6" strokeWidth={1.5} />
      </span>
      <h3 className="mt-4 text-base font-semibold">{title}</h3>
      <p className="mt-1 max-w-sm text-sm text-muted-foreground">{description}</p>
      {action && <div className="mt-5">{action}</div>}
    </div>
  );
}

export function LoadingRows({ rows = 4 }: { rows?: number }) {
  return (
    <div className="space-y-3">
      {Array.from({ length: rows }).map((_, i) => (
        <Skeleton key={i} className="h-12 w-full rounded-lg" />
      ))}
    </div>
  );
}

export function PermissionDenied({ module }: { module: string }) {
  const { role } = useSession();
  const params = useParams();
  const slug = (params?.slug as string) || '';
  return (
    <div className="flex min-h-[60vh] items-center justify-center px-4">
      <Surface className="max-w-md p-8 text-center">
        <span className="mx-auto grid size-14 place-items-center rounded-2xl bg-destructive/10 text-destructive">
          <Lock className="size-6" strokeWidth={1.5} />
        </span>
        <h1 className="mt-5 text-display text-xl">Permission denied</h1>
        <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
          The <strong className="text-foreground">{role.name}</strong> role doesn&apos;t include
          access to {module}. Ask an owner to grant it in Roles &amp; Permissions.
        </p>
        <div className="mt-6 flex justify-center gap-2">
          <Button asChild variant="outline">
            <Link href={`/${slug}/owner/dashboard`}>Back to dashboard</Link>
          </Button>
        </div>
      </Surface>
    </div>
  );
}

export function Guard({
  module,
  action = 'view',
  name,
  children,
}: {
  module: ModuleId;
  action?: PermissionAction;
  name: string;
  children: ReactNode;
}) {
  const { can } = useSession();
  if (!can(module, action)) return <PermissionDenied module={name} />;
  return <>{children}</>;
}

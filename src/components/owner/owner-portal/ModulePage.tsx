'use client';

import type { LucideIcon } from 'lucide-react';
import { Guard, PageHeader, SectionCard, StatCard, StatusChip, Surface } from './primitives';
import { Button } from '@/components/owner/owner-portal/button';
import type { ModuleId } from '@/lib/portal/rbac';
import { toast } from 'sonner';

export interface ModuleStat {
  label: string;
  value: string;
  delta?: string;
  hint?: string;
  icon: LucideIcon;
  tone?: 'gold' | 'royal' | 'azure' | 'emerald' | 'neutral';
}

export interface ModuleRow {
  primary: string;
  secondary: string;
  meta?: string;
  value?: string;
  chip?: {
    label: string;
    tone: 'gold' | 'royal' | 'azure' | 'emerald' | 'neutral' | 'danger' | 'warning';
  };
}

export interface ModulePanel {
  title: string;
  description?: string;
  rows: ModuleRow[];
}

export function ModulePage({
  module,
  name,
  eyebrow,
  title,
  description,
  primaryAction,
  stats,
  panels,
  features,
}: {
  module: ModuleId;
  name: string;
  eyebrow: string;
  title: string;
  description: string;
  primaryAction?: string;
  stats: ModuleStat[];
  panels: ModulePanel[];
  features?: string[];
}) {
  return (
    <Guard module={module} name={name}>
      <div className="space-y-6">
        <PageHeader
          eyebrow={eyebrow}
          title={title}
          description={description}
          actions={
            primaryAction && (
              <Button variant="gold" onClick={() => toast.success(`${primaryAction} — opened`)}>
                {primaryAction}
              </Button>
            )
          }
        />

        <section className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
          {stats.map((s) => (
            <StatCard key={s.label} {...s} tone={s.tone ?? 'neutral'} />
          ))}
        </section>

        <section className="grid gap-4 xl:grid-cols-2">
          {panels.map((p) => (
            <SectionCard key={p.title} title={p.title} description={p.description ?? ''} bodyClassName="p-0">
              <ul className="divide-y divide-border">
                {p.rows.map((r) => (
                  <li
                    key={r.primary + r.secondary}
                    className="grid grid-cols-[minmax(0,1fr)_auto] items-center gap-3 px-5 py-3.5"
                  >
                    <div className="min-w-0">
                      <p className="truncate text-sm font-medium">{r.primary}</p>
                      <p className="truncate text-xs text-muted-foreground">{r.secondary}</p>
                    </div>
                    <div className="flex shrink-0 items-center gap-3">
                      {r.value && <span className="text-sm font-semibold tabular-nums">{r.value}</span>}
                      {r.chip && <StatusChip tone={r.chip.tone}>{r.chip.label}</StatusChip>}
                      {r.meta && <span className="text-xs text-muted-foreground">{r.meta}</span>}
                    </div>
                  </li>
                ))}
              </ul>
            </SectionCard>
          ))}
        </section>

        {features && features.length > 0 && (
          <Surface className="p-5">
            <p className="text-sm font-semibold">Included in this module</p>
            <div className="mt-3 flex flex-wrap gap-2">
              {features.map((f) => (
                <StatusChip key={f} tone="neutral">
                  {f}
                </StatusChip>
              ))}
            </div>
          </Surface>
        )}
      </div>
    </Guard>
  );
}

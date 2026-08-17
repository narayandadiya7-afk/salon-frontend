'use client';

import { useState } from 'react';
import { Check, Copy, Minus, Plus, ShieldCheck, Users } from 'lucide-react';
import { Guard, PageHeader, StatCard, StatusChip, Surface } from '@/components/portal/primitives';
import { Button } from '@/components/ui/button';
import { MODULES, ROLES, type PermissionAction } from '@/lib/portal/rbac';
import { toast } from 'sonner';
import { cn } from '@/lib/utils';

const ACTIONS: PermissionAction[] = ['view', 'create', 'edit', 'delete', 'approve', 'export', 'manage'];

function RolesPage() {
  const [selected, setSelected] = useState(ROLES[0]!.id);
  const role = ROLES.find((r) => r.id === selected)!;

  return (
    <div className="space-y-6">
      <PageHeader
        eyebrow="Access control"
        title="Roles & permissions"
        description="Five default roles plus unlimited custom roles. Every sidebar item, widget and action respects this matrix."
        actions={
          <>
            <Button variant="outline" onClick={() => toast.success(`${role.name} cloned`)}>
              <Copy className="size-4" /> Clone role
            </Button>
            <Button variant="gold" onClick={() => toast.success('New role drawer opened')}>
              <Plus className="size-4" /> New role
            </Button>
          </>
        }
      />

      <section className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
        <StatCard label="Roles" value={String(ROLES.length)} icon={ShieldCheck} tone="gold" />
        <StatCard label="Custom roles" value={String(ROLES.filter((r) => r.custom).length)} icon={Plus} tone="royal" />
        <StatCard label="Modules governed" value={String(MODULES.length)} icon={ShieldCheck} tone="azure" />
        <StatCard label="Team members" value={String(ROLES.reduce((a, r) => a + r.members, 0))} icon={Users} tone="emerald" />
      </section>

      <div className="grid gap-4 lg:grid-cols-[300px_minmax(0,1fr)]">
        <Surface className="p-3">
          <ul className="space-y-1">
            {ROLES.map((r) => (
              <li key={r.id}>
                <button
                  onClick={() => setSelected(r.id)}
                  className={cn(
                    'w-full rounded-lg px-3 py-3 text-left transition-colors',
                    r.id === selected ? 'bg-accent' : 'hover:bg-muted',
                  )}
                >
                  <div className="grid grid-cols-[minmax(0,1fr)_auto] items-center gap-2">
                    <span className="truncate text-sm font-semibold">{r.name}</span>
                    {r.custom && <StatusChip tone="royal">custom</StatusChip>}
                  </div>
                  <p className="mt-1 line-clamp-2 text-xs text-muted-foreground">{r.description}</p>
                  <p className="mt-1 text-[0.68rem] text-muted-foreground/80">{r.members} members</p>
                </button>
              </li>
            ))}
          </ul>
        </Surface>

        <Surface className="overflow-hidden">
          <div className="border-b border-border px-5 py-4">
            <h2 className="text-sm font-semibold">{role.name} — permission matrix</h2>
            <p className="text-xs text-muted-foreground">{role.description}</p>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full min-w-[720px] text-sm">
              <thead>
                <tr className="border-b border-border bg-muted/40 text-left text-xs uppercase tracking-wider text-muted-foreground">
                  <th scope="col" className="px-5 py-3 font-semibold">Module</th>
                  {ACTIONS.map((a) => (
                    <th key={a} scope="col" className="px-3 py-3 text-center font-semibold">{a}</th>
                  ))}
                </tr>
              </thead>
              <tbody className="divide-y divide-border">
                {MODULES.map((m) => {
                  const granted = role.permissions[m.id] ?? [];
                  return (
                    <tr key={m.id} className="hover:bg-muted/30">
                      <td className="px-5 py-3 font-medium">{m.label}</td>
                      {ACTIONS.map((a) => {
                        const on = granted.includes(a);
                        return (
                          <td key={a} className="px-3 py-3 text-center">
                            <span
                              className={cn(
                                'mx-auto grid size-6 place-items-center rounded-md',
                                on ? 'bg-emerald-soft text-emerald' : 'bg-muted text-muted-foreground/50',
                              )}
                              aria-label={`${m.label} ${a}: ${on ? 'granted' : 'denied'}`}
                            >
                              {on ? <Check className="size-3.5" /> : <Minus className="size-3.5" />}
                            </span>
                          </td>
                        );
                      })}
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </Surface>
      </div>
    </div>
  );
}

export default function RolesPageRoute() {
  return (
    <Guard module="roles" name="Roles & Permissions">
      <RolesPage />
    </Guard>
  );
}

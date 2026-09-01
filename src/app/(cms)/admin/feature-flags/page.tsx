"use client";

import { useState } from "react";
import { PageHeader, Panel } from "@/components/admin/admin-portal/primitives";
import { Switch } from "@/components/admin/admin-portal/switch";
import { Badge } from "@/components/admin/admin-portal/badge";
import { Progress } from "@/components/admin/admin-portal/progress";
import { featureFlags } from "@/components/admin/admin-portal/mock-data";

export default function FeaturesPage() {
  const [flags, setFlags] = useState(featureFlags);

  return (
    <>
      <PageHeader
        title="Feature Management"
        description="Enable or disable product modules across every tenant, or roll out gradually."
        breadcrumb={["Home", "Feature Management"]}
      />

      <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
        {flags.map((f, i) => (
          <div key={f.name} className="surface-card p-5 transition-shadow hover:shadow-[var(--shadow-elevated)]">
            <div className="flex items-start justify-between gap-3">
              <div>
                <h3 className="text-sm font-semibold">{f.name}</h3>
                <p className="mt-1 text-xs text-muted-foreground">{f.description}</p>
              </div>
              <Switch
                checked={f.enabled}
                aria-label={`Toggle ${f.name}`}
                onCheckedChange={(v) =>
                  setFlags((prev) => prev.map((p, pi) => (pi === i ? { ...p, enabled: v } : p)))
                }
              />
            </div>
            <div className="mt-4 flex items-center justify-between text-xs">
              <Badge variant={f.enabled ? "secondary" : "outline"}>{f.enabled ? "Enabled" : "Disabled"}</Badge>
              <span className="text-muted-foreground">Rollout {f.enabled ? f.rollout : "0%"}</span>
            </div>
            <Progress className="mt-2 h-1.5" value={f.enabled ? parseInt(f.rollout) : 0} />
          </div>
        ))}
      </div>

      <Panel className="mt-6" title="Rollout policy" description="Applies to all staged feature releases">
        <ul className="space-y-2 text-sm text-muted-foreground">
          <li>• Enterprise tenants are excluded from rollouts below 50% unless explicitly opted in.</li>
          <li>• Disabling a module hides its navigation and blocks its API endpoints within 60 seconds.</li>
          <li>• Every toggle is recorded in the audit log with actor, IP and previous value.</li>
        </ul>
      </Panel>
    </>
  );
}

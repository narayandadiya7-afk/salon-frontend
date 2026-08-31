"use client";

import { Plug } from "lucide-react";
import { PageHeader, Panel, StatusBadge } from "@/components/admin/admin-portal/primitives";
import { Button } from "@/components/admin/admin-portal/button";
import { Badge } from "@/components/admin/admin-portal/badge";
import { integrations } from "@/components/admin/admin-portal/mock-data";

export default function IntegrationsPage() {
  return (
    <>
      <PageHeader
        title="Integrations"
        description="Third-party services powering payments, messaging and scheduling."
        breadcrumb={["Home", "Integrations"]}
        actions={<Button><Plug className="size-4" /> Add integration</Button>}
      />

      <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
        {integrations.map((i) => (
          <div key={i.name} className="surface-card flex flex-col p-5 transition-shadow hover:shadow-[var(--shadow-elevated)]">
            <div className="flex items-start justify-between gap-3">
              <div>
                <h3 className="text-sm font-semibold">{i.name}</h3>
                <Badge variant="secondary" className="mt-1.5">{i.category}</Badge>
              </div>
              <StatusBadge status={i.status} />
            </div>
            <p className="mt-4 flex-1 text-xs text-muted-foreground">{i.detail}</p>
            <div className="mt-4 flex gap-2">
              <Button variant="outline" size="sm" className="flex-1">Configure</Button>
              <Button variant="ghost" size="sm" className="flex-1">Logs</Button>
            </div>
          </div>
        ))}
      </div>

      <Panel className="mt-6" title="API access" description="Platform REST and webhook endpoints">
        <dl className="grid gap-4 text-sm sm:grid-cols-3">
          <div><dt className="text-muted-foreground">Base URL</dt><dd className="mt-1 font-mono text-xs">https://api.salonos.io/v2</dd></div>
          <div><dt className="text-muted-foreground">Rate limit</dt><dd className="mt-1 font-medium">1,000 req / min</dd></div>
          <div><dt className="text-muted-foreground">Webhook delivery</dt><dd className="mt-1 font-medium">99.4% (24h)</dd></div>
        </dl>
      </Panel>
    </>
  );
}

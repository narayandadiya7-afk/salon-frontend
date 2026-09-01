"use client";

import { PageHeader, Panel } from "@/components/admin/admin-portal/primitives";
import { Switch } from "@/components/admin/admin-portal/switch";
import { Button } from "@/components/admin/admin-portal/button";
import { notifications } from "@/components/admin/admin-portal/mock-data";
import { cn } from "@/lib/utils";

const channels = [
  { name: "Email notifications", description: "Digest and instant alerts to platform staff", enabled: true },
  { name: "System alerts", description: "Infrastructure incidents and degraded services", enabled: true },
  { name: "Billing alerts", description: "Failed renewals, chargebacks and dunning", enabled: true },
  { name: "Security alerts", description: "Suspicious sign-ins, key rotation, IP blocks", enabled: true },
  { name: "Maintenance announcements", description: "Scheduled windows broadcast to tenants", enabled: false },
];

const dotTone: Record<string, string> = {
  success: "bg-success",
  info: "bg-info",
  warning: "bg-warning",
  destructive: "bg-destructive",
};

export default function NotificationsPage() {
  return (
    <>
      <PageHeader
        title="Notifications"
        description="Everything the platform needs your attention on, plus delivery preferences."
        breadcrumb={["Home", "Notifications"]}
        actions={<Button variant="outline">Mark all as read</Button>}
      />

      <div className="grid gap-4 lg:grid-cols-[1fr_380px]">
        <Panel title="Inbox" bodyClassName="p-0">
          <ul className="divide-y divide-border">
            {notifications.map((n) => (
              <li key={n.title} className="flex items-start gap-3 px-5 py-4">
                <span className={cn("mt-1.5 size-2 shrink-0 rounded-full", dotTone[n.type] ?? "bg-muted")} />
                <div className="min-w-0 flex-1">
                  <p className="text-sm font-medium">{n.title}</p>
                  <p className="text-sm text-muted-foreground">{n.body}</p>
                  <p className="mt-1 text-xs text-muted-foreground">{n.time}</p>
                </div>
                <Button variant="ghost" size="sm">Dismiss</Button>
              </li>
            ))}
          </ul>
        </Panel>

        <Panel title="Delivery channels" bodyClassName="p-0">
          <ul className="divide-y divide-border">
            {channels.map((c) => (
              <li key={c.name} className="flex items-start justify-between gap-3 px-5 py-4">
                <div>
                  <p className="text-sm font-medium">{c.name}</p>
                  <p className="text-xs text-muted-foreground">{c.description}</p>
                </div>
                <Switch defaultChecked={c.enabled} aria-label={`Toggle ${c.name}`} />
              </li>
            ))}
          </ul>
        </Panel>
      </div>
    </>
  );
}

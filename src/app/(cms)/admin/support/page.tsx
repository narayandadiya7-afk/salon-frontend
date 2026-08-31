"use client";

import { useState } from "react";
import { LifeBuoy, Clock, CircleCheck, AlarmClock, Send } from "lucide-react";
import { PageHeader, KpiCard, Panel, StatusBadge } from "@/components/admin/admin-portal/primitives";
import { Button } from "@/components/admin/admin-portal/button";
import { Textarea } from "@/components/admin/admin-portal/textarea";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/admin/admin-portal/tabs";
import { tickets } from "@/components/admin/admin-portal/mock-data";
import { cn } from "@/lib/utils";

const thread = [
  { author: "Amelia Hart", role: "Tenant owner", body: "Our August payout hasn't landed and the dashboard still shows it as processing.", time: "Today · 09:12" },
  { author: "Ana Sousa", role: "Support Lead", body: "Thanks Amelia — I can see the payout was retried after a gateway timeout. Escalating to billing now.", time: "Today · 09:31" },
  { author: "Marcus Webb", role: "Billing Manager", body: "Reissued the payout, funds should settle within 24h. Adding a credit for the delay.", time: "Today · 10:02" },
];

export default function SupportPage() {
  const [activeId, setActiveId] = useState(tickets[0]!.id);
  const active = tickets.find((t) => t.id === activeId) ?? tickets[0]!;

  return (
    <>
      <PageHeader
        title="Support Center"
        description="Tenant tickets, SLA tracking and internal escalation notes."
        breadcrumb={["Home", "Support Center"]}
      />

      <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
        <KpiCard label="Open tickets" value="37" delta={-14.7} icon={LifeBuoy} tone="warning" />
        <KpiCard label="First response" value="26 min" delta={-9.2} icon={Clock} tone="success" />
        <KpiCard label="Resolved (7d)" value="184" delta={6.8} icon={CircleCheck} tone="success" />
        <KpiCard label="SLA at risk" value="4" delta={2.1} icon={AlarmClock} tone="destructive" />
      </div>

      <div className="mt-6 grid gap-4 lg:grid-cols-[380px_1fr]">
        <Panel title="Queue" bodyClassName="p-0">
          <ul className="divide-y divide-border">
            {tickets.map((t) => (
              <li key={t.id}>
                <button
                  onClick={() => setActiveId(t.id)}
                  className={cn(
                    "w-full px-5 py-3.5 text-left transition-colors hover:bg-accent/50",
                    t.id === activeId && "bg-accent",
                  )}
                >
                  <div className="flex items-center justify-between gap-2">
                    <span className="font-mono text-[11px] text-muted-foreground">{t.id}</span>
                    <StatusBadge status={t.priority} />
                  </div>
                  <p className="mt-1 truncate text-sm font-medium">{t.subject}</p>
                  <p className="mt-0.5 truncate text-xs text-muted-foreground">{t.tenant} · {t.updated}</p>
                </button>
              </li>
            ))}
          </ul>
        </Panel>

        <div className="space-y-4">
          <Panel
            title={active.subject}
            description={`${active.tenant} · assigned to ${active.agent}`}
            actions={
              <div className="flex items-center gap-2">
                <StatusBadge status={active.status} />
                <span className="rounded-full bg-muted px-2.5 py-1 text-xs text-muted-foreground">SLA {active.sla}</span>
              </div>
            }
            bodyClassName="p-0"
          >
            <Tabs defaultValue="conversation">
              <TabsList className="m-4">
                <TabsTrigger value="conversation">Conversation</TabsTrigger>
                <TabsTrigger value="notes">Internal notes</TabsTrigger>
              </TabsList>
              <TabsContent value="conversation" className="space-y-4 px-5 pb-5">
                {thread.map((m) => (
                  <div key={m.time} className="rounded-xl border border-border p-4">
                    <div className="flex items-center justify-between text-xs">
                      <span className="font-medium">{m.author} <span className="text-muted-foreground">· {m.role}</span></span>
                      <span className="text-muted-foreground">{m.time}</span>
                    </div>
                    <p className="mt-2 text-sm">{m.body}</p>
                  </div>
                ))}
                <div className="rounded-xl border border-border p-3">
                  <Textarea placeholder="Write a reply to the tenant…" aria-label="Reply" className="min-h-24 border-0 p-0 shadow-none focus-visible:ring-0" />
                  <div className="mt-2 flex justify-end gap-2">
                    <Button variant="outline" size="sm">Save draft</Button>
                    <Button size="sm"><Send className="size-4" /> Send reply</Button>
                  </div>
                </div>
              </TabsContent>
              <TabsContent value="notes" className="px-5 pb-5">
                <div className="rounded-xl border border-dashed border-border p-4 text-sm text-muted-foreground">
                  Internal notes are visible to platform staff only. Escalations to engineering are logged here.
                </div>
              </TabsContent>
            </Tabs>
          </Panel>
        </div>
      </div>
    </>
  );
}

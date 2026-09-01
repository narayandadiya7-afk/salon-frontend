"use client";

import { ShieldCheck, KeyRound, Fingerprint, AlertTriangle, Plus } from "lucide-react";
import { PageHeader, KpiCard, Panel, StatusBadge } from "@/components/admin/admin-portal/primitives";
import { Button } from "@/components/admin/admin-portal/button";
import { Switch } from "@/components/admin/admin-portal/switch";
import { Input } from "@/components/admin/admin-portal/input";
import { Label } from "@/components/admin/admin-portal/label";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/admin/admin-portal/table";
import { apiKeys, sessions } from "@/components/admin/admin-portal/mock-data";

const loginAttempts = [
  { user: "owen@salonos.io", ip: "41.22.8.190", result: "failed", time: "09:22 · today", location: "Unknown" },
  { user: "neha@salonos.io", ip: "203.0.113.24", result: "succeeded", time: "08:04 · today", location: "Berlin, DE" },
  { user: "lara@salonos.io", ip: "77.11.4.2", result: "failed", time: "Yesterday", location: "Warsaw, PL" },
];

export default function SecurityPage() {
  return (
    <>
      <PageHeader
        title="Security"
        description="Authentication policy, credential hygiene and threat visibility."
        breadcrumb={["Home", "Security"]}
      />

      <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
        <KpiCard label="MFA coverage" value="88%" delta={4.1} icon={ShieldCheck} tone="success" />
        <KpiCard label="Active sessions" value="27" icon={Fingerprint} />
        <KpiCard label="API keys" value="12" hint="3 rotate this month" icon={KeyRound} tone="violet" />
        <KpiCard label="Failed logins (24h)" value="18" delta={22.5} icon={AlertTriangle} tone="destructive" />
      </div>

      <div className="mt-6 grid gap-4 lg:grid-cols-2">
        <Panel title="Authentication policy">
          <ul className="divide-y divide-border">
            {[
              ["Require MFA for all admins", true],
              ["Block sign-in from new countries", true],
              ["Session timeout after 8 hours", true],
              ["Allow password-only sign-in", false],
            ].map(([label, on]) => (
              <li key={String(label)} className="flex items-center justify-between gap-4 py-3.5 first:pt-0 last:pb-0">
                <span className="text-sm">{String(label)}</span>
                <Switch defaultChecked={Boolean(on)} aria-label={String(label)} />
              </li>
            ))}
          </ul>
          <div className="mt-4 grid gap-2">
            <Label htmlFor="ip-allow">IP whitelist</Label>
            <Input id="ip-allow" defaultValue="203.0.113.0/24, 198.51.100.7" />
            <p className="text-xs text-muted-foreground">Comma-separated CIDR ranges allowed to reach the admin portal.</p>
          </div>
        </Panel>

        <Panel title="Password policy">
          <dl className="grid grid-cols-2 gap-y-4 text-sm">
            <dt className="text-muted-foreground">Minimum length</dt><dd className="font-medium">14 characters</dd>
            <dt className="text-muted-foreground">Complexity</dt><dd className="font-medium">Upper, lower, digit, symbol</dd>
            <dt className="text-muted-foreground">Rotation</dt><dd className="font-medium">Every 180 days</dd>
            <dt className="text-muted-foreground">Reuse window</dt><dd className="font-medium">Last 10 passwords</dd>
            <dt className="text-muted-foreground">Breach check</dt><dd><StatusBadge status="active" /></dd>
          </dl>
          <Button className="mt-6" variant="outline">Edit policy</Button>
        </Panel>
      </div>

      <Panel className="mt-4" title="Active sessions" bodyClassName="p-0">
        <div className="overflow-x-auto">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>User</TableHead>
                <TableHead>Device</TableHead>
                <TableHead>IP</TableHead>
                <TableHead>Location</TableHead>
                <TableHead>Started</TableHead>
                <TableHead className="text-right">Action</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {sessions.map((s) => (
                <TableRow key={s.user + s.ip}>
                  <TableCell className="text-sm font-medium">{s.user}</TableCell>
                  <TableCell className="text-sm">{s.device}</TableCell>
                  <TableCell className="text-xs text-muted-foreground">{s.ip}</TableCell>
                  <TableCell className="text-sm">{s.location}</TableCell>
                  <TableCell className="text-sm text-muted-foreground">{s.started}</TableCell>
                  <TableCell className="text-right">
                    <Button size="sm" variant="ghost" className="text-destructive">Revoke</Button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      </Panel>

      <div className="mt-4 grid gap-4 lg:grid-cols-2">
        <Panel title="API keys" actions={<Button size="sm" variant="outline"><Plus className="size-4" /> New key</Button>} bodyClassName="p-0">
          <ul className="divide-y divide-border">
            {apiKeys.map((k) => (
              <li key={k.prefix} className="flex items-center justify-between gap-3 px-5 py-3.5">
                <div className="min-w-0">
                  <p className="truncate text-sm font-medium">{k.label}</p>
                  <p className="truncate font-mono text-xs text-muted-foreground">{k.prefix} · {k.scope}</p>
                  <p className="text-xs text-muted-foreground">Created {k.created} · used {k.lastUsed}</p>
                </div>
                <Button size="sm" variant="ghost">Rotate</Button>
              </li>
            ))}
          </ul>
        </Panel>

        <Panel title="Recent login attempts" bodyClassName="p-0">
          <ul className="divide-y divide-border">
            {loginAttempts.map((a) => (
              <li key={a.user + a.time} className="flex items-center justify-between gap-3 px-5 py-3.5">
                <div>
                  <p className="text-sm font-medium">{a.user}</p>
                  <p className="text-xs text-muted-foreground">{a.ip} · {a.location} · {a.time}</p>
                </div>
                <StatusBadge status={a.result === "failed" ? "failed" : "succeeded"} />
              </li>
            ))}
          </ul>
        </Panel>
      </div>
    </>
  );
}

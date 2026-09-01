"use client";

import { useState } from "react";
import { Download, Search } from "lucide-react";
import { PageHeader, Panel } from "@/components/admin/admin-portal/primitives";
import { Button } from "@/components/admin/admin-portal/button";
import { Input } from "@/components/admin/admin-portal/input";
import { Badge } from "@/components/admin/admin-portal/badge";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/admin/admin-portal/select";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/admin/admin-portal/table";
import { auditLogs } from "@/components/admin/admin-portal/mock-data";

export default function AuditLogsPage() {
  const [query, setQuery] = useState("");
  const [module, setModule] = useState("all");
  const rows = auditLogs.filter(
    (l) =>
      (module === "all" || l.module === module) &&
      (l.actor.includes(query.toLowerCase()) || l.action.includes(query.toLowerCase()) || l.target.toLowerCase().includes(query.toLowerCase())),
  );

  return (
    <>
      <PageHeader
        title="Audit Logs"
        description="Every privileged action is recorded and retained for 24 months."
        breadcrumb={["Home", "Audit Logs"]}
        actions={<Button variant="outline"><Download className="size-4" /> Export logs</Button>}
      />

      <Panel bodyClassName="p-0">
        <div className="flex flex-col gap-3 border-b border-border p-4 md:flex-row">
          <div className="relative flex-1">
            <Search className="pointer-events-none absolute left-3 top-1/2 size-4 -translate-y-1/2 text-muted-foreground" />
            <Input value={query} onChange={(e) => setQuery(e.target.value)} placeholder="Search actor, action or target…" aria-label="Search audit logs" className="pl-9" />
          </div>
          <Select value={module} onValueChange={setModule}>
            <SelectTrigger className="w-[180px]" aria-label="Filter by module"><SelectValue /></SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All modules</SelectItem>
              {[...new Set(auditLogs.map((l) => l.module))].map((m) => (
                <SelectItem key={m} value={m}>{m}</SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
        <div className="overflow-x-auto">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Timestamp</TableHead>
                <TableHead>Actor</TableHead>
                <TableHead>Action</TableHead>
                <TableHead>Module</TableHead>
                <TableHead>Target</TableHead>
                <TableHead>IP</TableHead>
                <TableHead>Device</TableHead>
                <TableHead>Browser</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {rows.map((l) => (
                <TableRow key={l.id}>
                  <TableCell className="whitespace-nowrap text-xs tabular-nums text-muted-foreground">{l.time}</TableCell>
                  <TableCell className="text-sm font-medium">{l.actor}</TableCell>
                  <TableCell><code className="rounded bg-muted px-1.5 py-0.5 text-xs">{l.action}</code></TableCell>
                  <TableCell><Badge variant="secondary">{l.module}</Badge></TableCell>
                  <TableCell className="text-sm">{l.target}</TableCell>
                  <TableCell className="text-xs text-muted-foreground">{l.ip}</TableCell>
                  <TableCell className="text-xs text-muted-foreground">{l.device}</TableCell>
                  <TableCell className="text-xs text-muted-foreground">{l.browser}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      </Panel>
    </>
  );
}

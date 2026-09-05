"use client";

import { useMemo, useState } from "react";
import Link from "next/link";
import { Building2, CircleCheck, Clock, Ban, Download, Plus, Search, SlidersHorizontal, MoreHorizontal } from "lucide-react";
import { PageHeader, KpiCard, Panel, StatusBadge, EmptyState } from "@/components/admin/admin-portal/primitives";
import { Button } from "@/components/admin/admin-portal/button";
import { Checkbox } from "@/components/admin/admin-portal/checkbox";
import { Input } from "@/components/admin/admin-portal/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/admin/admin-portal/select";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/admin/admin-portal/table";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuSeparator, DropdownMenuTrigger } from "@/components/admin/admin-portal/dropdown-menu";
import { currency, tenants } from "@/components/admin/admin-portal/mock-data";

const PAGE_SIZE = 10;

export default function TenantsPage() {
  const [query, setQuery] = useState("");
  const [status, setStatus] = useState("all");
  const [plan, setPlan] = useState("all");
  const [page, setPage] = useState(1);
  const [selected, setSelected] = useState<string[]>([]);

  const filtered = useMemo(
    () =>
      tenants.filter(
        (t) =>
          (status === "all" || t.status === status) &&
          (plan === "all" || t.plan === plan) &&
          (t.name.toLowerCase().includes(query.toLowerCase()) ||
            t.owner.toLowerCase().includes(query.toLowerCase()) ||
            t.email.toLowerCase().includes(query.toLowerCase())),
      ),
    [query, status, plan],
  );

  const pages = Math.max(1, Math.ceil(filtered.length / PAGE_SIZE));
  const current = Math.min(page, pages);
  const rows = filtered.slice((current - 1) * PAGE_SIZE, current * PAGE_SIZE);
  const allChecked = rows.length > 0 && rows.every((r) => selected.includes(r.id));

  return (
    <>
      <PageHeader
        title="Tenants"
        description="Every salon business running on SalonOS, with subscription and usage context."
        breadcrumb={["Home", "Tenants"]}
        actions={
          <>
            <Button variant="outline"><Download className="size-4" /> Export CSV</Button>
            <Button><Plus className="size-4" /> Add tenant</Button>
          </>
        }
      />

      <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
        <KpiCard label="Total Tenants" value="1,243" delta={5.8} icon={Building2} />
        <KpiCard label="Active" value="1,041" delta={4.2} icon={CircleCheck} tone="success" />
        <KpiCard label="On Trial" value="128" delta={12.4} icon={Clock} tone="warning" />
        <KpiCard label="Suspended" value="74" delta={-3.1} icon={Ban} tone="destructive" />
      </div>

      <Panel className="mt-6" bodyClassName="p-0">
        <div className="flex flex-col gap-3 border-b border-border p-4 lg:flex-row lg:items-center">
          <div className="relative flex-1">
            <Search className="pointer-events-none absolute left-3 top-1/2 size-4 -translate-y-1/2 text-muted-foreground" />
            <Input
              value={query}
              onChange={(e) => { setQuery(e.target.value); setPage(1); }}
              placeholder="Search salon, owner or email…"
              aria-label="Search tenants"
              className="pl-9"
            />
          </div>
          <div className="flex flex-wrap gap-2">
            <Select value={status} onValueChange={(v) => { setStatus(v); setPage(1); }}>
              <SelectTrigger className="w-[150px]" aria-label="Filter by status"><SelectValue /></SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All statuses</SelectItem>
                <SelectItem value="active">Active</SelectItem>
                <SelectItem value="trial">Trial</SelectItem>
                <SelectItem value="suspended">Suspended</SelectItem>
                <SelectItem value="churned">Churned</SelectItem>
              </SelectContent>
            </Select>
            <Select value={plan} onValueChange={(v) => { setPlan(v); setPage(1); }}>
              <SelectTrigger className="w-[160px]" aria-label="Filter by plan"><SelectValue /></SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All plans</SelectItem>
                <SelectItem value="Starter">Starter</SelectItem>
                <SelectItem value="Professional">Professional</SelectItem>
                <SelectItem value="Business">Business</SelectItem>
                <SelectItem value="Enterprise">Enterprise</SelectItem>
              </SelectContent>
            </Select>
            <Button variant="outline"><SlidersHorizontal className="size-4" /> More filters</Button>
          </div>
        </div>

        {selected.length > 0 && (
          <div className="flex flex-wrap items-center gap-2 border-b border-border bg-accent/50 px-4 py-2.5 text-sm">
            <span className="font-medium">{selected.length} selected</span>
            <div className="ml-auto flex flex-wrap gap-2">
              <Button size="sm" variant="outline">Change plan</Button>
              <Button size="sm" variant="outline">Suspend</Button>
              <Button size="sm" variant="ghost" className="text-destructive">Delete</Button>
            </div>
          </div>
        )}

        {rows.length === 0 ? (
          <div className="p-6">
            <EmptyState
              title="No tenants match your filters"
              description="Try a different search term, or reset the status and plan filters."
              action={<Button variant="outline" onClick={() => { setQuery(""); setStatus("all"); setPlan("all"); }}>Reset filters</Button>}
            />
          </div>
        ) : (
          <div className="overflow-x-auto">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead className="w-10">
                    <Checkbox
                      aria-label="Select all rows"
                      checked={allChecked}
                      onCheckedChange={(v) => setSelected(v ? rows.map((r) => r.id) : [])}
                    />
                  </TableHead>
                  <TableHead>Salon</TableHead>
                  <TableHead>Owner</TableHead>
                  <TableHead>Plan</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead>Expiry</TableHead>
                  <TableHead className="text-right">Users</TableHead>
                  <TableHead className="text-right">Revenue</TableHead>
                  <TableHead>Last login</TableHead>
                  <TableHead className="w-10" />
                </TableRow>
              </TableHeader>
              <TableBody>
                {rows.map((t) => (
                  <TableRow key={t.id}>
                    <TableCell>
                      <Checkbox
                        aria-label={`Select ${t.name}`}
                        checked={selected.includes(t.id)}
                        onCheckedChange={(v) =>
                          setSelected((s) => (v ? [...s, t.id] : s.filter((id) => id !== t.id)))
                        }
                      />
                    </TableCell>
                    <TableCell>
                      <Link href={`/admin/tenants/${t.id}`} className="flex items-center gap-3 hover:underline">
                        <span className="flex size-9 items-center justify-center rounded-lg bg-primary/10 text-[11px] font-semibold text-primary">{t.initials}</span>
                        <span className="min-w-0">
                          <span className="block truncate text-sm font-medium">{t.name}</span>
                          <span className="block truncate text-xs text-muted-foreground">{t.domain}</span>
                        </span>
                      </Link>
                    </TableCell>
                    <TableCell>
                      <span className="block text-sm">{t.owner}</span>
                      <span className="block text-xs text-muted-foreground">{t.email}</span>
                    </TableCell>
                    <TableCell className="text-sm">{t.plan}</TableCell>
                    <TableCell><StatusBadge status={t.status} /></TableCell>
                    <TableCell className="text-sm tabular-nums text-muted-foreground">{t.expiry}</TableCell>
                    <TableCell className="text-right text-sm tabular-nums">{t.users}</TableCell>
                    <TableCell className="text-right text-sm font-medium tabular-nums">{currency(t.revenue)}</TableCell>
                    <TableCell className="text-sm text-muted-foreground">{t.lastLogin}</TableCell>
                    <TableCell>
                      <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                          <Button variant="ghost" size="icon" aria-label={`Actions for ${t.name}`}>
                            <MoreHorizontal className="size-4" />
                          </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="end" className="w-48">
                          <DropdownMenuItem asChild>
                            <Link href={`/admin/tenants/${t.id}`}>View profile</Link>
                          </DropdownMenuItem>
                          <DropdownMenuItem>Edit</DropdownMenuItem>
                          <DropdownMenuItem>Upgrade plan</DropdownMenuItem>
                          <DropdownMenuItem>Reset password</DropdownMenuItem>
                          <DropdownMenuItem>Impersonate</DropdownMenuItem>
                          <DropdownMenuSeparator />
                          <DropdownMenuItem>Suspend</DropdownMenuItem>
                          <DropdownMenuItem className="text-destructive">Delete</DropdownMenuItem>
                        </DropdownMenuContent>
                      </DropdownMenu>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
        )}

        <div className="flex flex-wrap items-center justify-between gap-3 border-t border-border px-4 py-3 text-sm">
          <p className="text-muted-foreground">
            Showing {(current - 1) * PAGE_SIZE + 1}–{Math.min(current * PAGE_SIZE, filtered.length)} of {filtered.length}
          </p>
          <div className="flex items-center gap-2">
            <Button variant="outline" size="sm" disabled={current === 1} onClick={() => setPage(current - 1)}>Previous</Button>
            <span className="text-muted-foreground">Page {current} of {pages}</span>
            <Button variant="outline" size="sm" disabled={current === pages} onClick={() => setPage(current + 1)}>Next</Button>
          </div>
        </div>
      </Panel>
    </>
  );
}

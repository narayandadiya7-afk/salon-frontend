"use client";

import { useState } from "react";
import { MoreHorizontal, Search, UserPlus, Users as UsersIcon, ShieldCheck, UserX } from "lucide-react";
import { PageHeader, KpiCard, Panel, StatusBadge } from "@/components/admin/admin-portal/primitives";
import { Button } from "@/components/admin/admin-portal/button";
import { Input } from "@/components/admin/admin-portal/input";
import { Label } from "@/components/admin/admin-portal/label";
import { Avatar, AvatarFallback } from "@/components/admin/admin-portal/avatar";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/admin/admin-portal/table";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuSeparator, DropdownMenuTrigger } from "@/components/admin/admin-portal/dropdown-menu";
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from "@/components/admin/admin-portal/dialog";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/admin/admin-portal/select";
import { platformUsers } from "@/components/admin/admin-portal/mock-data";

export default function UsersPage() {
  const [query, setQuery] = useState("");
  const rows = platformUsers.filter(
    (u) => u.name.toLowerCase().includes(query.toLowerCase()) || u.email.toLowerCase().includes(query.toLowerCase()),
  );

  return (
    <>
      <PageHeader
        title="Users"
        description="Internal administrators with access to the super admin portal."
        breadcrumb={["Home", "Users"]}
        actions={
          <Dialog>
            <DialogTrigger asChild><Button><UserPlus className="size-4" /> Invite user</Button></DialogTrigger>
            <DialogContent>
              <DialogHeader>
                <DialogTitle>Invite a platform user</DialogTitle>
                <DialogDescription>They receive an email invite and must enable MFA on first sign-in.</DialogDescription>
              </DialogHeader>
              <div className="grid gap-4 py-2">
                <div className="grid gap-2">
                  <Label htmlFor="invite-email">Work email</Label>
                  <Input id="invite-email" type="email" placeholder="name@salonos.io" />
                </div>
                <div className="grid gap-2">
                  <Label htmlFor="invite-role">Role</Label>
                  <Select defaultValue="Support Agent">
                    <SelectTrigger id="invite-role"><SelectValue /></SelectTrigger>
                    <SelectContent>
                      <SelectItem value="Super Admin">Super Admin</SelectItem>
                      <SelectItem value="Billing Manager">Billing Manager</SelectItem>
                      <SelectItem value="Support Lead">Support Lead</SelectItem>
                      <SelectItem value="Support Agent">Support Agent</SelectItem>
                      <SelectItem value="Analyst">Analyst</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
              <DialogFooter>
                <Button variant="outline">Cancel</Button>
                <Button>Send invite</Button>
              </DialogFooter>
            </DialogContent>
          </Dialog>
        }
      />

      <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
        <KpiCard label="Platform users" value="34" delta={5.9} icon={UsersIcon} />
        <KpiCard label="MFA enabled" value="88%" delta={4.1} icon={ShieldCheck} tone="success" />
        <KpiCard label="Pending invites" value="3" icon={UserPlus} tone="warning" />
        <KpiCard label="Suspended" value="1" icon={UserX} tone="destructive" />
      </div>

      <Panel className="mt-6" bodyClassName="p-0">
        <div className="border-b border-border p-4">
          <div className="relative max-w-sm">
            <Search className="pointer-events-none absolute left-3 top-1/2 size-4 -translate-y-1/2 text-muted-foreground" />
            <Input value={query} onChange={(e) => setQuery(e.target.value)} placeholder="Search users…" aria-label="Search users" className="pl-9" />
          </div>
        </div>
        <div className="overflow-x-auto">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>User</TableHead>
                <TableHead>Role</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>MFA</TableHead>
                <TableHead>Last login</TableHead>
                <TableHead className="w-10" />
              </TableRow>
            </TableHeader>
            <TableBody>
              {rows.map((u) => (
                <TableRow key={u.email}>
                  <TableCell>
                    <div className="flex items-center gap-3">
                      <Avatar className="size-9">
                        <AvatarFallback className="bg-primary/10 text-[11px] font-semibold text-primary">
                          {u.name.split(" ").map((n) => n[0]).join("")}
                        </AvatarFallback>
                      </Avatar>
                      <div>
                        <p className="text-sm font-medium">{u.name}</p>
                        <p className="text-xs text-muted-foreground">{u.email}</p>
                      </div>
                    </div>
                  </TableCell>
                  <TableCell className="text-sm">{u.role}</TableCell>
                  <TableCell><StatusBadge status={u.status} /></TableCell>
                  <TableCell><StatusBadge status={u.mfa ? "active" : "pending"} /></TableCell>
                  <TableCell className="text-sm text-muted-foreground">{u.lastLogin}</TableCell>
                  <TableCell>
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <Button variant="ghost" size="icon" aria-label={`Actions for ${u.name}`}><MoreHorizontal className="size-4" /></Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent align="end">
                        <DropdownMenuItem>Edit user</DropdownMenuItem>
                        <DropdownMenuItem>Assign roles</DropdownMenuItem>
                        <DropdownMenuItem>Reset password</DropdownMenuItem>
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
      </Panel>
    </>
  );
}

"use client";

import { Plus } from "lucide-react";
import { PageHeader, Panel } from "@/components/admin/admin-portal/primitives";
import { Button } from "@/components/admin/admin-portal/button";
import { Badge } from "@/components/admin/admin-portal/badge";
import { Checkbox } from "@/components/admin/admin-portal/checkbox";
import { Input } from "@/components/admin/admin-portal/input";
import { Label } from "@/components/admin/admin-portal/label";
import { Textarea } from "@/components/admin/admin-portal/textarea";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/admin/admin-portal/table";
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from "@/components/admin/admin-portal/dialog";
import { permissionModules, roles } from "@/components/admin/admin-portal/mock-data";

export default function RolesPage() {
  return (
    <>
      <PageHeader
        title="Roles & Permissions"
        description="Least-privilege access control for everyone operating the platform."
        breadcrumb={["Home", "Roles & Permissions"]}
        actions={
          <Dialog>
            <DialogTrigger asChild><Button><Plus className="size-4" /> Create role</Button></DialogTrigger>
            <DialogContent>
              <DialogHeader>
                <DialogTitle>Create role</DialogTitle>
                <DialogDescription>Start from a blank set of permissions and grant only what is needed.</DialogDescription>
              </DialogHeader>
              <div className="grid gap-4 py-2">
                <div className="grid gap-2">
                  <Label htmlFor="role-name">Role name</Label>
                  <Input id="role-name" placeholder="e.g. Compliance Auditor" />
                </div>
                <div className="grid gap-2">
                  <Label htmlFor="role-desc">Description</Label>
                  <Textarea id="role-desc" placeholder="What this role is allowed to do" />
                </div>
              </div>
              <DialogFooter>
                <Button variant="outline">Cancel</Button>
                <Button>Create role</Button>
              </DialogFooter>
            </DialogContent>
          </Dialog>
        }
      />

      <Panel title="Roles" bodyClassName="p-0">
        <div className="overflow-x-auto">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Role</TableHead>
                <TableHead>Description</TableHead>
                <TableHead>Scope</TableHead>
                <TableHead className="text-right">Users</TableHead>
                <TableHead className="text-right">Action</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {roles.map((r) => (
                <TableRow key={r.name}>
                  <TableCell className="text-sm font-medium">{r.name}</TableCell>
                  <TableCell className="text-sm text-muted-foreground">{r.description}</TableCell>
                  <TableCell><Badge variant="secondary">{r.scope}</Badge></TableCell>
                  <TableCell className="text-right tabular-nums">{r.users}</TableCell>
                  <TableCell className="text-right"><Button size="sm" variant="outline">Edit permissions</Button></TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      </Panel>

      <Panel className="mt-4" title="Permission matrix" description="Permissions granted to the Support Lead role" bodyClassName="p-0">
        <div className="overflow-x-auto">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Module</TableHead>
                {["View", "Create", "Update", "Suspend", "Delete"].map((p) => (
                  <TableHead key={p} className="text-center">{p}</TableHead>
                ))}
              </TableRow>
            </TableHeader>
            <TableBody>
              {permissionModules.map((m, mi) => (
                <TableRow key={m.module}>
                  <TableCell className="text-sm font-medium">{m.module}</TableCell>
                  {m.perms.map((p, pi) => (
                    <TableCell key={p} className="text-center">
                      <Checkbox aria-label={`${p} ${m.module}`} defaultChecked={pi === 0 || (mi < 2 && pi < 3)} />
                    </TableCell>
                  ))}
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
        <div className="flex justify-end gap-2 border-t border-border px-5 py-3">
          <Button variant="outline">Discard</Button>
          <Button>Save permissions</Button>
        </div>
      </Panel>
    </>
  );
}

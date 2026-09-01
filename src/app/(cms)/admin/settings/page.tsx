"use client";

import { Save, Upload } from "lucide-react";
import { PageHeader, Panel } from "@/components/admin/admin-portal/primitives";
import { Button } from "@/components/admin/admin-portal/button";
import { Input } from "@/components/admin/admin-portal/input";
import { Label } from "@/components/admin/admin-portal/label";
import { Textarea } from "@/components/admin/admin-portal/textarea";
import { Switch } from "@/components/admin/admin-portal/switch";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/admin/admin-portal/select";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/admin/admin-portal/tabs";

export default function SettingsPage() {
  return (
    <>
      <PageHeader
        title="Platform Settings"
        description="Global configuration applied across every tenant workspace."
        breadcrumb={["Home", "Platform Settings"]}
        actions={<Button><Save className="size-4" /> Save changes</Button>}
      />

      <Tabs defaultValue="branding">
        <TabsList>
          <TabsTrigger value="branding">Branding</TabsTrigger>
          <TabsTrigger value="localisation">Localisation</TabsTrigger>
          <TabsTrigger value="templates">Templates</TabsTrigger>
          <TabsTrigger value="advanced">Advanced</TabsTrigger>
        </TabsList>

        <TabsContent value="branding" className="mt-4 grid gap-4 lg:grid-cols-2">
          <Panel title="Identity">
            <div className="grid gap-4">
              <div className="grid gap-2">
                <Label htmlFor="platform-name">Platform name</Label>
                <Input id="platform-name" defaultValue="SalonOS" />
              </div>
              <div className="grid gap-2">
                <Label htmlFor="support-email">Support email</Label>
                <Input id="support-email" type="email" defaultValue="support@salonos.io" />
              </div>
              <div className="grid gap-2">
                <Label htmlFor="logo">Logo</Label>
                <div className="flex items-center gap-3 rounded-lg border border-dashed border-border p-4">
                  <span className="flex size-11 items-center justify-center rounded-lg bg-primary/10 text-sm font-bold text-primary">SO</span>
                  <Button id="logo" variant="outline" size="sm"><Upload className="size-4" /> Upload SVG or PNG</Button>
                </div>
              </div>
            </div>
          </Panel>
          <Panel title="Tenant defaults">
            <div className="grid gap-4">
              <div className="grid gap-2">
                <Label htmlFor="tagline">Marketing tagline</Label>
                <Textarea id="tagline" defaultValue="Run your salon like the world's best." />
              </div>
              <div className="flex items-center justify-between rounded-lg border border-border px-3 py-2.5">
                <Label htmlFor="whitelabel" className="text-sm font-normal">Allow white-label branding on Enterprise</Label>
                <Switch id="whitelabel" defaultChecked />
              </div>
            </div>
          </Panel>
        </TabsContent>

        <TabsContent value="localisation" className="mt-4 grid gap-4 lg:grid-cols-2">
          <Panel title="Regional defaults">
            <div className="grid gap-4">
              <div className="grid gap-2">
                <Label htmlFor="currency">Default currency</Label>
                <Select defaultValue="USD">
                  <SelectTrigger id="currency"><SelectValue /></SelectTrigger>
                  <SelectContent>
                    <SelectItem value="USD">USD — US Dollar</SelectItem>
                    <SelectItem value="EUR">EUR — Euro</SelectItem>
                    <SelectItem value="GBP">GBP — Pound Sterling</SelectItem>
                    <SelectItem value="INR">INR — Indian Rupee</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="grid gap-2">
                <Label htmlFor="timezone">Default time zone</Label>
                <Select defaultValue="UTC">
                  <SelectTrigger id="timezone"><SelectValue /></SelectTrigger>
                  <SelectContent>
                    <SelectItem value="UTC">UTC</SelectItem>
                    <SelectItem value="Europe/Berlin">Europe/Berlin</SelectItem>
                    <SelectItem value="America/New_York">America/New_York</SelectItem>
                    <SelectItem value="Asia/Kolkata">Asia/Kolkata</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="grid gap-2">
                <Label htmlFor="language">Default language</Label>
                <Select defaultValue="en">
                  <SelectTrigger id="language"><SelectValue /></SelectTrigger>
                  <SelectContent>
                    <SelectItem value="en">English</SelectItem>
                    <SelectItem value="de">German</SelectItem>
                    <SelectItem value="fr">French</SelectItem>
                    <SelectItem value="es">Spanish</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
          </Panel>
          <Panel title="Tax defaults">
            <div className="grid gap-4">
              <div className="grid gap-2">
                <Label htmlFor="tax-rate">Fallback tax rate (%)</Label>
                <Input id="tax-rate" type="number" defaultValue={20} />
              </div>
              <div className="flex items-center justify-between rounded-lg border border-border px-3 py-2.5">
                <Label htmlFor="tax-inclusive" className="text-sm font-normal">Prices include tax</Label>
                <Switch id="tax-inclusive" />
              </div>
            </div>
          </Panel>
        </TabsContent>

        <TabsContent value="templates" className="mt-4 grid gap-4 lg:grid-cols-2">
          <Panel title="Email template" description="Subscription renewal reminder">
            <Textarea className="min-h-48" defaultValue={"Hi {{owner_name}},\n\nYour {{plan_name}} subscription renews on {{renewal_date}} for {{amount}}.\n\n— The SalonOS team"} />
          </Panel>
          <Panel title="SMS template" description="Appointment reminder">
            <Textarea className="min-h-48" defaultValue={"Reminder: {{service}} at {{salon_name}} on {{date}} at {{time}}. Reply STOP to opt out."} />
          </Panel>
        </TabsContent>

        <TabsContent value="advanced" className="mt-4 grid gap-4 lg:grid-cols-2">
          <Panel title="Maintenance mode">
            <div className="flex items-center justify-between rounded-lg border border-border px-3 py-2.5">
              <Label htmlFor="maintenance" className="text-sm font-normal">Enable maintenance mode for all tenants</Label>
              <Switch id="maintenance" />
            </div>
            <div className="mt-4 grid gap-2">
              <Label htmlFor="maintenance-msg">Message shown to tenants</Label>
              <Textarea id="maintenance-msg" defaultValue="SalonOS is undergoing scheduled maintenance and will be back shortly." />
            </div>
          </Panel>
          <Panel title="Danger zone">
            <p className="text-sm text-muted-foreground">
              Irreversible operations affecting the whole platform. These require a second approver.
            </p>
            <div className="mt-4 flex flex-wrap gap-2">
              <Button variant="outline">Purge deleted tenants</Button>
              <Button variant="destructive">Rotate all API keys</Button>
            </div>
          </Panel>
        </TabsContent>
      </Tabs>
    </>
  );
}

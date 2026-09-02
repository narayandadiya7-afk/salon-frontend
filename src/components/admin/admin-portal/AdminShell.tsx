"use client";

import React, { useEffect, useState, type ReactNode, createContext, useContext } from "react";
import Link from "next/link";
import { useRouter, usePathname } from "next/navigation";
import {
  LayoutDashboard, Building2, CreditCard, TrendingUp, ReceiptText, Wallet, Users, ShieldCheck,
  ToggleRight, LifeBuoy, ScrollText, Bell, Plug, Lock, Settings, Search, HelpCircle, Moon, Sun,
  PanelLeftClose, PanelLeft, ChevronDown, Menu, X, Sparkles,
} from "lucide-react";
import { Button } from "@/components/admin/admin-portal/button";
import {
  DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuLabel,
  DropdownMenuSeparator, DropdownMenuTrigger,
} from "@/components/admin/admin-portal/dropdown-menu";
import { Avatar, AvatarFallback } from "@/components/admin/admin-portal/avatar";
import { Badge } from "@/components/admin/admin-portal/badge";
import { cn } from "@/lib/utils";
import { notifications } from "@/components/admin/admin-portal/mock-data";

const nav = [
  {
    group: "Overview",
    items: [
      { to: "/admin/dashboard", label: "Dashboard", icon: LayoutDashboard },
      { to: "/admin/tenants", label: "Tenants", icon: Building2 },
    ],
  },
  {
    group: "Revenue",
    items: [
      { to: "/admin/plans", label: "Subscription Plans", icon: CreditCard },
      { to: "/admin/revenue", label: "Revenue", icon: TrendingUp },
      { to: "/admin/billing", label: "Billing", icon: ReceiptText },
      { to: "/admin/payments", label: "Payments", icon: Wallet },
    ],
  },
  {
    group: "Access",
    items: [
      { to: "/admin/users", label: "Users", icon: Users },
      { to: "/admin/roles", label: "Roles & Permissions", icon: ShieldCheck },
      { to: "/admin/feature-flags", label: "Feature Management", icon: ToggleRight },
    ],
  },
  {
    group: "Operations",
    items: [
      { to: "/admin/support", label: "Support Center", icon: LifeBuoy },
      { to: "/admin/audit-logs", label: "Audit Logs", icon: ScrollText },
      { to: "/admin/notifications", label: "Notifications", icon: Bell },
      { to: "/admin/integrations", label: "Integrations", icon: Plug },
      { to: "/admin/security", label: "Security", icon: Lock },
      { to: "/admin/settings", label: "Platform Settings", icon: Settings },
    ],
  },
] as const;

export interface AdminShellContextValue {
  dark: boolean;
  toggleTheme: () => void;
}

const AdminShellContext = createContext<AdminShellContextValue>({
  dark: false,
  toggleTheme: () => {},
});

export function useAdminShell() {
  return useContext(AdminShellContext);
}

function useTheme() {
  const [dark, setDark] = useState(false);
  useEffect(() => {
    const stored = localStorage.getItem("salonos-theme");
    const isDark = stored === "dark";
    setDark(isDark);
    document.documentElement.classList.toggle("dark", isDark);
  }, []);
  const toggle = () => {
    setDark((d) => {
      const next = !d;
      document.documentElement.classList.toggle("dark", next);
      localStorage.setItem("salonos-theme", next ? "dark" : "light");
      return next;
    });
  };
  return { dark, toggle };
}

function SidebarContent({ collapsed, onNavigate }: { collapsed: boolean; onNavigate?: () => void }) {
  const pathname = usePathname();
  return (
    <div className="flex h-full flex-col">
      <div className={cn("flex h-16 items-center gap-2.5 border-b border-sidebar-border px-4", collapsed && "justify-center px-0")}>
        <div className="flex size-9 shrink-0 items-center justify-center rounded-xl bg-primary text-primary-foreground">
          <Sparkles className="size-4.5" />
        </div>
        {!collapsed && (
          <div className="min-w-0">
            <p className="truncate text-sm font-semibold text-sidebar-foreground">SalonOS</p>
            <p className="truncate text-xs text-muted-foreground">Super Admin</p>
          </div>
        )}
      </div>

      <nav className="flex-1 space-y-5 overflow-y-auto px-3 py-4" aria-label="Main">
        {nav.map((section) => (
          <div key={section.group}>
            {!collapsed && (
              <p className="px-2 pb-1.5 text-[11px] font-semibold uppercase tracking-wider text-muted-foreground">
                {section.group}
              </p>
            )}
            <ul className="space-y-0.5">
              {section.items.map((item) => {
                const active = pathname === item.to;
                return (
                  <li key={item.to}>
                    <Link
                      href={item.to}
                      onClick={onNavigate}
                      title={collapsed ? item.label : undefined}
                      aria-current={active ? "page" : undefined}
                      className={cn(
                        "flex items-center gap-3 rounded-lg px-2.5 py-2 text-sm font-medium text-sidebar-foreground transition-colors",
                        "hover:bg-sidebar-accent hover:text-sidebar-accent-foreground focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-sidebar-ring",
                        active && "bg-sidebar-accent text-sidebar-primary",
                        collapsed && "justify-center px-0",
                      )}
                    >
                      <item.icon className={cn("size-4.5 shrink-0", active && "text-sidebar-primary")} />
                      {!collapsed && <span className="truncate">{item.label}</span>}
                    </Link>
                  </li>
                );
              })}
            </ul>
          </div>
        ))}
      </nav>

      {!collapsed && (
        <div className="m-3 rounded-xl border border-sidebar-border bg-sidebar-accent/60 p-3">
          <p className="text-xs font-semibold text-sidebar-accent-foreground">Platform status</p>
          <p className="mt-1 flex items-center gap-1.5 text-xs text-muted-foreground">
            <span className="size-1.5 rounded-full bg-success" /> All systems operational
          </p>
        </div>
      )}
    </div>
  );
}

export function AdminShell({ children }: { children: ReactNode }) {
  const [collapsed, setCollapsed] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const { dark, toggle } = useTheme();

  return (
    <AdminShellContext.Provider value={{ dark, toggleTheme: toggle }}>
      <div className="admin-shell min-h-screen bg-background">
        {/* Desktop sidebar */}
        <aside
          className={cn(
            "fixed inset-y-0 left-0 z-40 hidden border-r border-sidebar-border bg-sidebar transition-[width] duration-200 lg:block",
            collapsed ? "w-[72px]" : "w-64",
          )}
        >
          <SidebarContent collapsed={collapsed} />
        </aside>

        {/* Mobile sidebar overlay */}
        {mobileOpen && (
          <div className="fixed inset-0 z-50 lg:hidden">
            <div className="absolute inset-0 bg-foreground/40" onClick={() => setMobileOpen(false)} />
            <aside className="absolute inset-y-0 left-0 w-72 border-r border-sidebar-border bg-sidebar">
              <Button
                variant="ghost" size="icon" aria-label="Close navigation"
                className="absolute right-2 top-3" onClick={() => setMobileOpen(false)}
              >
                <X className="size-4" />
              </Button>
              <SidebarContent collapsed={false} onNavigate={() => setMobileOpen(false)} />
            </aside>
          </div>
        )}

        <div className={cn("transition-[padding] duration-200", collapsed ? "lg:pl-[72px]" : "lg:pl-64")}>
          <header className="sticky top-0 z-30 flex h-16 items-center gap-2 border-b border-border bg-card/80 px-4 backdrop-blur-md md:px-6">
            <Button variant="ghost" size="icon" className="lg:hidden" aria-label="Open navigation" onClick={() => setMobileOpen(true)}>
              <Menu className="size-5" />
            </Button>
            <Button
              variant="ghost" size="icon" className="hidden lg:inline-flex"
              aria-label={collapsed ? "Expand sidebar" : "Collapse sidebar"}
              onClick={() => setCollapsed((c) => !c)}
            >
              {collapsed ? <PanelLeft className="size-4.5" /> : <PanelLeftClose className="size-4.5" />}
            </Button>

            {/* Organization dropdown */}
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="outline" className="hidden h-9 gap-2 md:inline-flex">
                  <span className="flex size-5 items-center justify-center rounded bg-primary/10 text-[10px] font-bold text-primary">SO</span>
                  SalonOS Global
                  <ChevronDown className="size-3.5 text-muted-foreground" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="start" className="w-56">
                <DropdownMenuLabel>Organizations</DropdownMenuLabel>
                <DropdownMenuItem>SalonOS Global</DropdownMenuItem>
                <DropdownMenuItem>SalonOS EU</DropdownMenuItem>
                <DropdownMenuItem>SalonOS APAC</DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>

            {/* Search bar */}
            <div className="relative mx-auto hidden w-full max-w-md md:block">
              <Search className="pointer-events-none absolute left-3 top-1/2 size-4 -translate-y-1/2 text-muted-foreground" />
              <input
                type="search"
                aria-label="Global search"
                placeholder="Search tenants, invoices, users…"
                className="h-9 w-full rounded-lg border border-input bg-background pl-9 pr-14 text-sm outline-none transition focus-visible:ring-2 focus-visible:ring-ring"
              />
              <kbd className="pointer-events-none absolute right-2.5 top-1/2 -translate-y-1/2 rounded border border-border px-1.5 py-0.5 text-[10px] text-muted-foreground">
                ⌘K
              </kbd>
            </div>

            <div className="ml-auto flex items-center gap-1">
              {/* Theme toggle */}
              <Button variant="ghost" size="icon" aria-label="Toggle theme" onClick={toggle}>
                {dark ? <Sun className="size-4.5" /> : <Moon className="size-4.5" />}
              </Button>

              {/* Help */}
              <Button variant="ghost" size="icon" aria-label="Help center" asChild>
                <Link href="/admin/support"><HelpCircle className="size-4.5" /></Link>
              </Button>

              {/* Notifications dropdown */}
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="ghost" size="icon" aria-label="Notifications" className="relative">
                    <Bell className="size-4.5" />
                    <span className="absolute right-2 top-2 size-2 rounded-full bg-destructive ring-2 ring-card" />
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end" className="w-80">
                  <DropdownMenuLabel className="flex items-center justify-between">
                    Notifications <Badge variant="secondary">{notifications.length} new</Badge>
                  </DropdownMenuLabel>
                  <DropdownMenuSeparator />
                  {notifications.map((n) => (
                    <DropdownMenuItem key={n.title} className="flex-col items-start gap-0.5 py-2">
                      <span className="text-sm font-medium">{n.title}</span>
                      <span className="text-xs text-muted-foreground">{n.body}</span>
                      <span className="text-[11px] text-muted-foreground">{n.time}</span>
                    </DropdownMenuItem>
                  ))}
                </DropdownMenuContent>
              </DropdownMenu>

              {/* Profile dropdown */}
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <button className="ml-1 flex items-center gap-2 rounded-lg p-1 transition-colors hover:bg-accent focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ring">
                    <Avatar className="size-8">
                      <AvatarFallback className="bg-primary/10 text-xs font-semibold text-primary">NK</AvatarFallback>
                    </Avatar>
                    <span className="hidden text-left lg:block">
                      <span className="block text-xs font-semibold leading-tight">Neha Kapoor</span>
                      <span className="block text-[11px] leading-tight text-muted-foreground">Super Admin</span>
                    </span>
                  </button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end" className="w-52">
                  <DropdownMenuLabel>neha@salonos.io</DropdownMenuLabel>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem>Profile</DropdownMenuItem>
                  <DropdownMenuItem asChild><Link href="/admin/security">Security</Link></DropdownMenuItem>
                  <DropdownMenuItem asChild><Link href="/admin/settings">Preferences</Link></DropdownMenuItem>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem className="text-destructive">Sign out</DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </div>
          </header>

          <main className="mx-auto w-full max-w-[1600px] px-4 py-6 md:px-6 lg:py-8">{children}</main>
        </div>
      </div>
    </AdminShellContext.Provider>
  );
}

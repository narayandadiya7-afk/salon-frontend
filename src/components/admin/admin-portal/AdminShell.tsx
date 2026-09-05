"use client";

import React, { useEffect, useState, type ReactNode, createContext, useContext } from "react";
import Link from "next/link";
import { useRouter, usePathname } from "next/navigation";
import {
  type LucideIcon,
  LayoutDashboard, Building2, CreditCard, TrendingUp, ReceiptText, Wallet, Users, ShieldCheck,
  ToggleRight, LifeBuoy, ScrollText, Bell, Plug, Lock, Settings, Search, HelpCircle, Moon, Sun,
  PanelLeftClose, PanelLeft, ChevronDown, Menu, Plus, X, Sparkles, LogOut, UserRound,
} from "lucide-react";
import { Button } from "@/components/admin/admin-portal/button";
import {
  DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuLabel,
  DropdownMenuSeparator, DropdownMenuTrigger,
} from "@/components/admin/admin-portal/dropdown-menu";
import { Avatar, AvatarFallback } from "@/components/admin/admin-portal/avatar";
import { cn } from "@/lib/utils";
import { notifications } from "@/components/admin/admin-portal/mock-data";
import {
  Popover, PopoverContent, PopoverTrigger,
} from "@/components/admin/admin-portal/popover";
import {
  CommandDialog, CommandEmpty, CommandGroup, CommandInput, CommandItem, CommandList,
} from "@/components/admin/admin-portal/command";
import { Toaster, toast } from "sonner";

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

type NavItem = { to: string; label: string; icon: LucideIcon };

const navItems: NavItem[] = nav
  .map((section) => section.items.map((item) => ({ to: item.to, label: item.label, icon: item.icon })))
  .flat();

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
        <div className="flex size-9 shrink-0 items-center justify-center rounded-xl bg-sidebar-primary text-sidebar-primary-foreground">
          <Sparkles className="size-4.5" />
        </div>
        {!collapsed && (
          <div className="min-w-0">
            <p className="truncate text-sm font-semibold text-sidebar-foreground">SalonOS</p>
            <p className="truncate text-xs text-muted-foreground">Super Admin</p>
          </div>
        )}
      </div>

      <nav className="flex flex-1 flex-col gap-6 overflow-y-auto px-3 py-4" aria-label="Main">
        {nav.map((section) => (
          <div key={section.group}>
            {!collapsed && (
              <p className="px-3 pb-2 text-[0.68rem] font-semibold uppercase tracking-[0.14em] text-sidebar-foreground/45">
                {section.group}
              </p>
            )}
            <ul className="space-y-1">
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
                        "group flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-medium transition-colors focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-sidebar-ring",
                        collapsed && "justify-center px-0",
                        active
                          ? "bg-sidebar-accent text-sidebar-accent-foreground"
                          : "text-sidebar-foreground/75 hover:bg-sidebar-accent/60 hover:text-sidebar-accent-foreground",
                      )}
                    >
                      <span className="relative flex items-center">
                        <item.icon className="size-[1.15rem] shrink-0" strokeWidth={1.75} />
                        {active && (
                          <span className="absolute -left-3 top-1/2 h-5 w-0.5 -translate-y-1/2 rounded-full bg-sidebar-primary" />
                        )}
                      </span>
                      {!collapsed && <span className="min-w-0 flex-1 truncate">{item.label}</span>}
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
  const [open, setOpen] = useState(false);
  const { dark, toggle } = useTheme();
  const unread = notifications.filter((n) => n.unread).length;
  const router = useRouter();

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "k" && (e.metaKey || e.ctrlKey)) {
        e.preventDefault();
        setOpen((v) => !v);
      }
    };
    document.addEventListener("keydown", onKey);
    return () => document.removeEventListener("keydown", onKey);
  }, []);

  return (
    <AdminShellContext.Provider value={{ dark, toggleTheme: toggle }}>
      <div className="admin-shell min-h-screen bg-background">
        {/* Desktop sidebar */}
        <aside
          className={cn(
            "fixed inset-y-0 left-0 z-40 hidden border-r border-sidebar-border bg-sidebar transition-[width] duration-300 lg:block",
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

        <div className={cn("transition-[padding] duration-300", collapsed ? "lg:pl-[72px]" : "lg:pl-64")}>
          <header className="sticky top-0 z-30 flex h-16 items-center gap-2 border-b border-border bg-background/85 px-4 backdrop-blur-xl md:px-6">
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
            <div className="mx-auto hidden w-full max-w-md md:block">
              <button
                onClick={() => setOpen(true)}
                aria-label="Global search"
                className="flex h-10 w-full items-center gap-2 rounded-xl border border-border bg-muted/50 px-3 text-sm text-muted-foreground transition-colors hover:bg-muted"
              >
                <Search className="size-4 shrink-0" />
                <span className="min-w-0 flex-1 truncate text-left">
                  Search tenants, invoices, users…
                </span>
                <kbd className="hidden shrink-0 rounded border border-border bg-background px-1.5 py-0.5 text-[0.65rem] font-medium sm:block">
                  ⌘K
                </kbd>
              </button>
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

              {/* Notifications popover */}
              <Popover>
                <PopoverTrigger asChild>
                  <Button
                    variant="ghost"
                    size="icon"
                    aria-label={`Notifications, ${unread} unread`}
                    className="relative"
                  >
                    <Bell className="size-5" />
                    {unread > 0 && (
                      <span className="absolute right-1.5 top-1.5 size-2 rounded-full bg-destructive ring-2 ring-background" />
                    )}
                  </Button>
                </PopoverTrigger>
                <PopoverContent align="end" className="w-[340px] p-0">
                  <div className="flex items-center justify-between border-b border-border px-4 py-3">
                    <p className="text-sm font-semibold">Notifications</p>
                    <Link
                      href="/admin/notifications"
                      className="text-xs font-medium text-azure hover:underline"
                    >
                      View all
                    </Link>
                  </div>
                  <ul className="max-h-80 divide-y divide-border overflow-y-auto">
                    {notifications.slice(0, 5).map((n) => (
                      <li key={n.id} className="flex gap-3 px-4 py-3">
                        <span
                          className={cn(
                            "mt-1.5 size-2 shrink-0 rounded-full",
                            n.unread ? "bg-gold" : "bg-border",
                          )}
                        />
                        <div className="min-w-0">
                          <p className="truncate text-sm font-medium">{n.title}</p>
                          <p className="text-xs text-muted-foreground">{n.body}</p>
                          <p className="mt-1 text-[0.68rem] text-muted-foreground/70">{n.when}</p>
                        </div>
                      </li>
                    ))}
                  </ul>
                </PopoverContent>
              </Popover>

              {/* Profile dropdown */}
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="ghost" className="h-10 gap-2 px-1.5 sm:px-2">
                    <Avatar className="size-8">
                      <AvatarFallback className="bg-primary text-xs font-semibold text-primary-foreground">NK</AvatarFallback>
                    </Avatar>
                    <span className="hidden flex-col items-start lg:flex">
                      <span className="text-sm font-semibold leading-tight">Neha Kapoor</span>
                      <span className="text-[0.68rem] leading-tight text-muted-foreground">Super Admin</span>
                    </span>
                    <ChevronDown className="size-4 text-muted-foreground" />
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end" className="w-72">
                  <DropdownMenuLabel className="font-normal">
                    <p className="text-sm font-semibold">Neha Kapoor</p>
                    <p className="text-xs text-muted-foreground">neha@salonos.io</p>
                  </DropdownMenuLabel>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem>
                    <UserRound className="size-4" /> Profile
                  </DropdownMenuItem>
                  <DropdownMenuItem asChild>
                    <Link href="/admin/security"><ShieldCheck className="size-4" /> Security</Link>
                  </DropdownMenuItem>
                  <DropdownMenuItem asChild>
                    <Link href="/admin/settings"><Settings className="size-4" /> Preferences</Link>
                  </DropdownMenuItem>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem className="text-destructive">
                    <LogOut className="size-4" /> Sign out
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </div>
          </header>

          <main className="mx-auto w-full max-w-[1600px] px-4 py-6 md:px-6 lg:py-8">{children}</main>
        </div>
      </div>

      <CommandDialog open={open} onOpenChange={setOpen}>
        <CommandInput placeholder="Search modules, tenants, users…" />
        <CommandList>
          <CommandEmpty>No results found.</CommandEmpty>
          <CommandGroup heading="Modules">
            {navItems.map((item) => (
              <CommandItem
                key={item.to}
                value={item.label}
                onSelect={() => {
                  setOpen(false);
                  router.push(item.to);
                }}
              >
                <item.icon className="size-4" />
                {item.label}
              </CommandItem>
            ))}
          </CommandGroup>
          <CommandGroup heading="Quick actions">
            <CommandItem
              onSelect={() => {
                setOpen(false);
                toast.success("Tenant creation wizard opened.");
              }}
            >
              <Plus className="size-4" /> New tenant
            </CommandItem>
            <CommandItem
              onSelect={() => {
                setOpen(false);
                toast.success("Invitation form opened.");
              }}
            >
              <Plus className="size-4" /> Invite user
            </CommandItem>
          </CommandGroup>
        </CommandList>
      </CommandDialog>

      <Toaster position="top-right" richColors />
    </AdminShellContext.Provider>
  );
}

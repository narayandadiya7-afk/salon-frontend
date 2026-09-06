'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useState } from 'react';
import {
  ChevronLeft,
  Scissors,
  LayoutDashboard,
  CalendarDays,
  CalendarRange,
  Users,
  UserCog,
  ShieldCheck,
  Boxes,
  CreditCard,
  Receipt,
  Megaphone,
  Globe,
  BarChart3,
  Bell,
  Settings,
  Sparkles,
  type LucideIcon,
} from 'lucide-react';
import { ownerRole } from '@/data/owner-portal';
import { cn } from '@/utils/cn';

export interface NavItem {
  to: string;
  label: string;
  icon: LucideIcon;
  badge?: string;
}

export interface NavSection {
  title: string;
  items: NavItem[];
}

export const NAV: NavSection[] = [
  {
    title: 'Overview',
    items: [{ to: 'dashboard', label: 'Dashboard', icon: LayoutDashboard }],
  },
  {
    title: 'Operations',
    items: [
      { to: 'appointments', label: 'Appointments', icon: CalendarDays, badge: '12' },
      { to: 'calendar', label: 'Calendar', icon: CalendarRange },
      { to: 'pos', label: 'Point of Sale', icon: CreditCard },
    ],
  },
  {
    title: 'Clients & Team',
    items: [
      { to: 'customers', label: 'Customers CRM', icon: Users },
      { to: 'staff', label: 'Staff', icon: UserCog },
      { to: 'roles', label: 'Roles & Permissions', icon: ShieldCheck },
    ],
  },
  {
    title: 'Catalog',
    items: [
      { to: 'services', label: 'Services & Packages', icon: Scissors },
      { to: 'inventory', label: 'Inventory', icon: Boxes, badge: '4' },
    ],
  },
  {
    title: 'Growth & Money',
    items: [
      { to: 'finance', label: 'Finance', icon: Receipt },
      { to: 'marketing', label: 'Marketing', icon: Megaphone },
      { to: 'cms', label: 'Website CMS', icon: Globe },
      { to: 'reports', label: 'Reports', icon: BarChart3 },
    ],
  },
  {
    title: 'System',
    items: [
      { to: 'notifications', label: 'Notifications', icon: Bell, badge: '5' },
      { to: 'settings', label: 'Settings', icon: Settings },
      { to: 'subscription', label: 'Subscription', icon: Sparkles },
    ],
  },
];

export function navHref(to: string, slug: string): string {
  const base = slug ? `/${slug}/owner` : '/owner';
  return to === 'dashboard' ? `${base}/dashboard` : `${base}/${to}`;
}

export function SidebarNav({
  collapsed,
  onNavigate,
  slug,
}: {
  collapsed: boolean;
  onNavigate?: () => void;
  slug: string;
}) {
  const pathname = usePathname();

  return (
    <nav className="flex flex-1 flex-col gap-6 overflow-y-auto px-3 py-4" aria-label="Main">
      {NAV.map((section) => (
        <div key={section.title}>
          {!collapsed && (
            <p className="px-3 pb-2 text-[0.68rem] font-semibold uppercase tracking-[0.14em] text-sidebar-foreground/45">
              {section.title}
            </p>
          )}
          <ul className="space-y-1">
            {section.items.map((item) => {
              const href = navHref(item.to, slug);
              const active = item.to === 'dashboard' ? pathname === href : pathname.startsWith(href);
              return (
                  <li key={item.to}>
                    <Link
                      href={href}
                      onClick={onNavigate}
                      title={collapsed ? item.label : undefined}
                      className={cn(
                        'group flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-medium transition-colors',
                        collapsed && 'justify-center px-0',
                        active
                          ? 'bg-sidebar-accent text-sidebar-accent-foreground'
                          : 'text-sidebar-foreground/75 hover:bg-sidebar-accent/60 hover:text-sidebar-accent-foreground',
                      )}
                    >
                      <span className="relative flex items-center">
                        <item.icon className="size-[1.15rem] shrink-0" strokeWidth={1.75} />
                        {active && (
                          <span className="absolute -left-3 top-1/2 h-5 w-0.5 -translate-y-1/2 rounded-full bg-sidebar-primary" />
                        )}
                      </span>
                      {!collapsed && <span className="min-w-0 flex-1 truncate">{item.label}</span>}
                      {!collapsed && item.badge && (
                        <span className="shrink-0 rounded-full bg-sidebar-primary/15 px-2 py-0.5 text-[0.7rem] font-semibold text-sidebar-primary">
                          {item.badge}
                        </span>
                      )}
                    </Link>
                  </li>
                );
              })}
            </ul>
        </div>
      ))}
      {!collapsed && (
        <div className="mt-auto rounded-xl border border-sidebar-border bg-sidebar-accent/40 p-4">
          <p className="text-xs font-semibold uppercase tracking-wider text-sidebar-primary">
            Signed in as
          </p>
          <p className="mt-1 text-sm text-sidebar-foreground">{ownerRole.name}</p>
          <p className="mt-1 text-xs leading-relaxed text-sidebar-foreground/60">
            {Object.keys(ownerRole.permissions).length} of {NAV.flatMap((s) => s.items).length} modules visible.
          </p>
        </div>
      )}
    </nav>
  );
}

export function AppSidebar({
  collapsed,
  onToggle,
  slug,
}: {
  collapsed: boolean;
  onToggle: () => void;
  slug: string;
}) {
  return (
    <aside
      className={cn(
        'sticky top-0 hidden h-dvh shrink-0 flex-col border-r border-sidebar-border bg-sidebar transition-[width] duration-300 lg:flex',
        collapsed ? 'w-[76px]' : 'w-[268px]',
      )}
    >
      <div className={cn('flex h-16 items-center gap-2.5 border-b border-sidebar-border px-4', collapsed && 'justify-center px-0')}>
        <span className="grid size-9 shrink-0 place-items-center rounded-xl bg-sidebar-primary text-sidebar-primary-foreground">
          <Scissors className="size-4.5" strokeWidth={2} />
        </span>
        {!collapsed && (
          <div className="min-w-0">
            <p className="truncate text-sm font-semibold text-sidebar-accent-foreground">
              Maison Lumière
            </p>
            <p className="truncate text-[0.7rem] uppercase tracking-[0.16em] text-sidebar-foreground/50">
              Business OS
            </p>
          </div>
        )}
      </div>
      <SidebarNav collapsed={collapsed} slug={slug} />
      <button
        onClick={onToggle}
        aria-label={collapsed ? 'Expand sidebar' : 'Collapse sidebar'}
        className="flex items-center justify-center gap-2 border-t border-sidebar-border py-3 text-xs font-medium text-sidebar-foreground/60 transition-colors hover:bg-sidebar-accent hover:text-sidebar-accent-foreground"
      >
        <ChevronLeft className={cn('size-4 transition-transform', collapsed && 'rotate-180')} />
        {!collapsed && 'Collapse'}
      </button>
    </aside>
  );
}

export function useSidebarState() {
  return useState(false);
}

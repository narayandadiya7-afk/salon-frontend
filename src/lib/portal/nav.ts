import {
  LayoutDashboard,
  CalendarDays,
  CalendarRange,
  Users,
  UserCog,
  ShieldCheck,
  Scissors,
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
import type { ModuleId } from '@/lib/portal/rbac';

export interface NavItem {
  to: string;
  label: string;
  icon: LucideIcon;
  module: ModuleId;
  badge?: string;
}

export interface NavSection {
  title: string;
  items: NavItem[];
}

export const NAV: NavSection[] = [
  {
    title: 'Overview',
    items: [{ to: 'dashboard', label: 'Dashboard', icon: LayoutDashboard, module: 'dashboard' }],
  },
  {
    title: 'Operations',
    items: [
      { to: 'appointments', label: 'Appointments', icon: CalendarDays, module: 'appointments', badge: '12' },
      { to: 'calendar', label: 'Calendar', icon: CalendarRange, module: 'calendar' },
      { to: 'pos', label: 'Point of Sale', icon: CreditCard, module: 'pos' },
    ],
  },
  {
    title: 'Clients & Team',
    items: [
      { to: 'customers', label: 'Customers CRM', icon: Users, module: 'customers' },
      { to: 'staff', label: 'Staff', icon: UserCog, module: 'staff' },
      { to: 'roles', label: 'Roles & Permissions', icon: ShieldCheck, module: 'roles' },
    ],
  },
  {
    title: 'Catalog',
    items: [
      { to: 'services', label: 'Services & Packages', icon: Scissors, module: 'services' },
      { to: 'inventory', label: 'Inventory', icon: Boxes, module: 'inventory', badge: '4' },
    ],
  },
  {
    title: 'Growth & Money',
    items: [
      { to: 'finance', label: 'Finance', icon: Receipt, module: 'finance' },
      { to: 'marketing', label: 'Marketing', icon: Megaphone, module: 'marketing' },
      { to: 'cms', label: 'Website CMS', icon: Globe, module: 'cms' },
      { to: 'reports', label: 'Reports', icon: BarChart3, module: 'reports' },
    ],
  },
  {
    title: 'System',
    items: [
      { to: 'notifications', label: 'Notifications', icon: Bell, module: 'notifications', badge: '5' },
      { to: 'settings', label: 'Settings', icon: Settings, module: 'settings' },
      { to: 'subscription', label: 'Subscription', icon: Sparkles, module: 'subscription' },
    ],
  },
];

export function navHref(to: string, slug: string): string {
  const base = slug ? `/${slug}/owner` : '/owner';
  return to === 'dashboard' ? `${base}/dashboard` : `${base}/${to}`;
}

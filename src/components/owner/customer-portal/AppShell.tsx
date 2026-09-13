'use client';

import { useEffect, useState, type ReactNode } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Bell, CalendarPlus, ChevronLeft, Menu, Moon, PanelLeft, PanelLeftClose, Search, Sparkles, Sun } from 'lucide-react';
import { Button } from '@/components/owner/customer-portal/button';
import { Avatar, AvatarFallback } from '@/components/owner/customer-portal/avatar';
import { Sheet, SheetContent, SheetTrigger, SheetTitle } from '@/components/owner/customer-portal/sheet';
import { cn } from '@/utils/cn';
import { useCustomerPortal, portalHref } from '@/contexts/customer-context';
import { navSections, mobileNavItems } from './nav-items';
import { customer, tenant, notifications } from '@/data/customer-portal';
import { GlobalSearch } from './GlobalSearch';

function NavList({
  collapsed,
  onNavigate,
}: {
  collapsed: boolean;
  onNavigate?: () => void;
}) {
  const pathname = usePathname();
  const { basePath } = useCustomerPortal();
  return (
    <nav className="flex flex-1 flex-col gap-6 overflow-y-auto px-3 py-4" aria-label="Main">
      {navSections.map((section) => (
        <div key={section.title}>
          {!collapsed && (
            <p className="px-3 pb-2 text-[0.68rem] font-semibold uppercase tracking-[0.14em] text-sidebar-foreground/45">
              {section.title}
            </p>
          )}
          <ul className="space-y-1">
            {section.items.map((item) => {
              const href = portalHref(basePath, item.to);
              const active = item.to === '/' ? pathname === basePath : pathname.startsWith(href);
              return (
                <li key={item.to}>
                  <Link
                    href={href}
                    onClick={onNavigate}
                    title={collapsed ? item.label : undefined}
                    className={cn(
                      'flex items-center gap-2.5 rounded-lg px-3 py-2 text-sm font-medium transition-colors',
                      collapsed && 'justify-center px-0',
                      active
                        ? 'bg-sidebar-primary text-sidebar-primary-foreground'
                        : 'text-sidebar-foreground/75 hover:bg-sidebar-accent/60 hover:text-sidebar-accent-foreground',
                    )}
                  >
                    <item.icon className="size-4 shrink-0" strokeWidth={2} />
                    {!collapsed && <span className="min-w-0 flex-1 truncate">{item.label}</span>}
                  </Link>
                </li>
              );
            })}
          </ul>
        </div>
      ))}
        {!collapsed && (
          <div className="mt-auto rounded-xl border border-sidebar-border bg-sidebar-accent/40 p-4">
            <p className="text-xs font-semibold uppercase tracking-wider text-sidebar-primary">Signed in as</p>
            <p className="mt-1 text-sm text-sidebar-foreground">{customer.fullName}</p>
            <p className="mt-1 text-xs text-sidebar-foreground/60">Member since {customer.memberSince}</p>
          </div>
        )}
    </nav>
  );
}

function Brand({ collapsed }: { collapsed?: boolean }) {
  return (
    <div className={cn('flex items-center gap-2.5', collapsed && 'justify-center')}>
      <span className={cn('grid size-9 shrink-0 place-items-center rounded-xl bg-sidebar-primary text-sidebar-primary-foreground', collapsed && 'mx-auto')}>
        <Sparkles className="size-4.5" strokeWidth={2} />
      </span>
      {!collapsed && (
        <div className="min-w-0">
          <p className="truncate text-sm font-semibold text-sidebar-accent-foreground">{tenant.name}</p>
          <p className="truncate text-[0.7rem] uppercase tracking-[0.16em] text-sidebar-foreground/50">{tenant.tagline}</p>
        </div>
      )}
    </div>
  );
}

export function AppShell({ children }: { children: ReactNode }) {
  const [mobileNav, setMobileNav] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const [collapsed, setCollapsed] = useState(false);
  const [theme, setTheme] = useState<'light' | 'dark'>('light');
  const pathname = usePathname();
  const { basePath } = useCustomerPortal();
  const unread = notifications.filter((n) => !n.read).length;

  useEffect(() => {
    const stored = localStorage.getItem('salonos.theme');
    const isDark = stored === 'dark';
    setTheme(isDark ? 'dark' : 'light');
    document.documentElement.classList.toggle('dark', isDark);
  }, []);

  const toggleTheme = () => {
    setTheme((t) => {
      const next = t === 'dark' ? 'light' : 'dark';
      document.documentElement.classList.toggle('dark', next === 'dark');
      localStorage.setItem('salonos.theme', next);
      return next;
    });
  };

  return (
    <div className="min-h-screen bg-background">
      <aside
        className={cn(
          'fixed inset-y-0 left-0 z-40 hidden flex-col border-r border-sidebar-border bg-sidebar transition-[width] duration-300 lg:flex',
          collapsed ? 'w-[76px]' : 'w-[268px]',
        )}
      >
        <div className={cn('flex h-16 shrink-0 items-center gap-2.5 border-b border-sidebar-border px-4', collapsed && 'justify-center px-0')}>
          <Brand collapsed={collapsed} />
        </div>
        <NavList collapsed={collapsed} />
        <button
          onClick={() => setCollapsed((v) => !v)}
          aria-label={collapsed ? 'Expand sidebar' : 'Collapse sidebar'}
          className="flex items-center justify-center gap-2 border-t border-sidebar-border py-3 text-xs font-medium text-sidebar-foreground/60 transition-colors hover:bg-sidebar-accent hover:text-sidebar-accent-foreground"
        >
          <ChevronLeft className={cn('size-4 transition-transform', collapsed && 'rotate-180')} />
          {!collapsed && 'Collapse'}
        </button>
      </aside>

      <div className={cn('transition-[padding] duration-300', collapsed ? 'lg:pl-[76px]' : 'lg:pl-[268px]')}>
        <header className="sticky top-0 z-30 border-b border-border bg-background/85 backdrop-blur-xl">
          <div className="mx-auto grid w-full max-w-[1500px] grid-cols-[auto_1fr_auto] items-center gap-3 px-4 py-3 sm:px-6 lg:px-8">
            <div className="flex min-w-0 items-center gap-2">
              <Sheet open={mobileNav} onOpenChange={setMobileNav}>
                <SheetTrigger asChild>
                  <Button variant="ghost" size="icon" className="lg:hidden" aria-label="Open navigation">
                    <Menu className="size-5" />
                  </Button>
                </SheetTrigger>
                <SheetContent side="left" className="w-[280px] border-sidebar-border bg-sidebar p-0">
                  <SheetTitle className="sr-only">Navigation</SheetTitle>
                  <div className="flex items-center gap-2.5 border-b border-sidebar-border px-5 py-4">
                    <Brand />
                  </div>
                  <NavList collapsed={false} onNavigate={() => setMobileNav(false)} />
                </SheetContent>
              </Sheet>

              <Button
                variant="ghost"
                size="icon"
                className="-ml-3 hidden lg:inline-flex"
                aria-label={collapsed ? 'Expand sidebar' : 'Collapse sidebar'}
                onClick={() => setCollapsed((v) => !v)}
              >
                {collapsed ? <PanelLeft className="size-4.5" /> : <PanelLeftClose className="size-4.5" />}
              </Button>

              <span className="min-w-0 truncate text-sm font-semibold lg:hidden">
                {tenant.name}
              </span>
            </div>

            <div className="flex min-w-0 justify-center">
              <button
                onClick={() => setSearchOpen(true)}
                className="flex h-10 w-full max-w-md items-center gap-2 rounded-xl border border-border bg-muted/50 px-3 text-sm text-muted-foreground transition-colors hover:bg-muted"
              >
                <Search className="size-4 shrink-0" />
                <span className="min-w-0 flex-1 truncate text-left">
                  Search services, stylists, invoices…
                </span>
              </button>
            </div>

            <div className="flex items-center gap-1 sm:gap-2">
              <Button variant="ghost" size="icon" onClick={toggleTheme} aria-label="Toggle theme">
                {theme === 'dark' ? <Sun className="size-5" /> : <Moon className="size-5" />}
              </Button>

              <Button asChild variant="ghost" size="icon" className="relative" aria-label={`Notifications, ${unread} unread`}>
                <Link href={`${basePath}/notifications`}>
                  <Bell className="size-5" />
                  {unread > 0 ? (
                    <span className="absolute right-1.5 top-1.5 size-2 rounded-full bg-destructive ring-2 ring-background" />
                  ) : null}
                </Link>
              </Button>

              <Button asChild variant="ghost" className="h-10 px-1.5 sm:px-2" aria-label="Profile">
                <Link href={`${basePath}/profile`}>
                  <Avatar className="size-8">
                    <AvatarFallback className="bg-primary text-xs font-semibold text-primary-foreground">
                      {customer.initials}
                    </AvatarFallback>
                  </Avatar>
                </Link>
              </Button>
            </div>
          </div>
        </header>

        <main className="mx-auto max-w-[1500px] px-4 pb-32 pt-6 sm:px-6 lg:px-8 lg:pb-16">{children}</main>
      </div>

      <nav className="fixed inset-x-0 bottom-0 z-40 border-t border-border bg-card/95 backdrop-blur lg:hidden">
        <div className="mx-auto grid max-w-md grid-cols-5 items-end px-2 pb-[max(0.5rem,env(safe-area-inset-bottom))] pt-2">
          {mobileNavItems.slice(0, 2).map((item) => (
            <MobileTab key={item.to} {...item} active={item.to === '/' ? pathname === basePath : pathname.startsWith(portalHref(basePath, item.to))} />
          ))}
          <Link href={`${basePath}/book`} className="flex flex-col items-center gap-1">
            <span className="-mt-7 grid size-14 place-items-center rounded-full bg-primary text-primary-foreground shadow-lift">
              <CalendarPlus className="size-6" />
            </span>
            <span className="text-[11px] font-medium">Book</span>
          </Link>
          {mobileNavItems.slice(2).map((item) => (
            <MobileTab key={item.to} {...item} active={pathname.startsWith(portalHref(basePath, item.to))} />
          ))}
        </div>
      </nav>

      <GlobalSearch open={searchOpen} onOpenChange={setSearchOpen} />
    </div>
  );
}

function MobileTab({
  to,
  label,
  icon: Icon,
  active,
}: {
  to: string;
  label: string;
  icon: typeof Search;
  active: boolean;
}) {
  const { basePath } = useCustomerPortal();
  return (
    <Link
      href={portalHref(basePath, to)}
      className={cn(
        'flex flex-col items-center gap-1 py-1 text-[11px] transition-colors',
        active ? 'text-foreground' : 'text-muted-foreground',
      )}
    >
      <Icon className={cn('size-5', active && 'text-gold')} />
      {label}
    </Link>
  );
}
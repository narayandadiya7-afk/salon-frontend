'use client';

import { useState, type ReactNode } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Bell, CalendarPlus, Menu, Search, Sparkles } from 'lucide-react';
import { Button } from '@/components/owner/customer-portal/button';
import { Avatar, AvatarFallback } from '@/components/owner/customer-portal/avatar';
import { Sheet, SheetContent, SheetTrigger, SheetTitle } from '@/components/owner/customer-portal/sheet';
import { cn } from '@/utils/cn';
import { useCustomerPortal, portalHref } from '@/contexts/customer-context';
import { navItems, mobileNavItems } from './nav-items';
import { customer, tenant, notifications } from '@/data/customer-portal';
import { GlobalSearch } from './GlobalSearch';

function NavList({ onNavigate }: { onNavigate?: () => void }) {
  const pathname = usePathname();
  const { basePath } = useCustomerPortal();
  return (
    <nav className="space-y-1">
      {navItems.map((item) => {
        const href = portalHref(basePath, item.to);
        const active = item.to === '/' ? pathname === basePath : pathname.startsWith(href);
        return (
          <Link
            key={item.to}
            href={href}
            onClick={onNavigate}
            className={cn(
              'flex items-center gap-3 rounded-full px-4 py-2.5 text-sm transition-colors',
              active
                ? 'bg-sidebar-primary text-sidebar-primary-foreground font-medium'
                : 'text-sidebar-foreground/75 hover:bg-sidebar-accent hover:text-sidebar-accent-foreground',
            )}
          >
            <item.icon className="size-4 shrink-0" />
            {item.label}
          </Link>
        );
      })}
    </nav>
  );
}

function Brand() {
  return (
    <div className="flex items-center gap-3">
      <div className="grid size-10 place-items-center rounded-full bg-gradient-gold text-ink">
        <Sparkles className="size-5" />
      </div>
      <div>
        <p className="font-display text-lg leading-none text-sidebar-foreground">{tenant.name}</p>
        <p className="mt-1 text-[11px] tracking-wide text-sidebar-foreground/55">{tenant.tagline}</p>
      </div>
    </div>
  );
}

export function AppShell({ children }: { children: ReactNode }) {
  const [mobileNav, setMobileNav] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const pathname = usePathname();
  const { basePath } = useCustomerPortal();
  const unread = notifications.filter((n) => !n.read).length;

  return (
    <div className="min-h-screen bg-background">
      <aside className="fixed inset-y-0 left-0 z-40 hidden w-72 flex-col bg-gradient-ink px-5 py-7 lg:flex">
        <Brand />
        <Button asChild className="mt-7 w-full rounded-full bg-gradient-gold text-ink hover:opacity-90">
          <Link href={`${basePath}/book`}>
            <CalendarPlus className="size-4" /> Book Appointment
          </Link>
        </Button>
        <div className="mt-7 flex-1 overflow-y-auto pr-1">
          <NavList />
        </div>
        <div className="mt-4 rounded-2xl bg-sidebar-accent p-4">
          <p className="text-xs text-sidebar-foreground/60">Signed in as</p>
          <p className="mt-1 text-sm text-sidebar-foreground">{customer.fullName}</p>
          <p className="text-[11px] text-sidebar-foreground/50">Member since {customer.memberSince}</p>
        </div>
      </aside>

      <div className="lg:pl-72">
        <header className="sticky top-0 z-30 border-b border-border/70 bg-background/85 backdrop-blur">
          <div className="mx-auto flex max-w-6xl items-center gap-3 px-4 py-3 sm:px-6">
            <Sheet open={mobileNav} onOpenChange={setMobileNav}>
              <SheetTrigger asChild>
                <Button variant="ghost" size="icon" className="lg:hidden" aria-label="Open menu">
                  <Menu className="size-5" />
                </Button>
              </SheetTrigger>
              <SheetContent side="left" className="w-[86%] max-w-xs bg-gradient-ink p-5">
                <SheetTitle className="sr-only">Menu</SheetTitle>
                <Brand />
                <div className="mt-6">
                  <NavList onNavigate={() => setMobileNav(false)} />
                </div>
              </SheetContent>
            </Sheet>

            <button
              onClick={() => setSearchOpen(true)}
              className="flex flex-1 items-center gap-2 rounded-full border border-border bg-card px-4 py-2 text-left text-sm text-muted-foreground transition-colors hover:border-gold/50"
            >
              <Search className="size-4" />
              <span className="truncate">Search services, stylists, invoices…</span>
            </button>

            <Button asChild variant="ghost" size="icon" className="relative" aria-label="Notifications">
              <Link href={`${basePath}/notifications`}>
                <Bell className="size-5" />
                {unread > 0 ? (
                  <span className="absolute right-1.5 top-1.5 size-2 rounded-full bg-gold" />
                ) : null}
              </Link>
            </Button>
            <Link href={`${basePath}/profile`} aria-label="Profile">
              <Avatar className="size-9 border border-gold/40">
                <AvatarFallback className="bg-accent text-sm text-accent-foreground">
                  {customer.initials}
                </AvatarFallback>
              </Avatar>
            </Link>
          </div>
        </header>

        <main className="mx-auto max-w-6xl px-4 pb-32 pt-6 sm:px-6 lg:pb-16">{children}</main>
      </div>

      <nav className="fixed inset-x-0 bottom-0 z-40 border-t border-border bg-card/95 backdrop-blur lg:hidden">
        <div className="mx-auto grid max-w-md grid-cols-5 items-end px-2 pb-[max(0.5rem,env(safe-area-inset-bottom))] pt-2">
          {mobileNavItems.slice(0, 2).map((item) => (
            <MobileTab key={item.to} {...item} active={item.to === '/' ? pathname === basePath : pathname.startsWith(portalHref(basePath, item.to))} />
          ))}
          <Link href={`${basePath}/book`} className="flex flex-col items-center gap-1">
            <span className="-mt-7 grid size-14 place-items-center rounded-full bg-gradient-gold text-ink shadow-lift">
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
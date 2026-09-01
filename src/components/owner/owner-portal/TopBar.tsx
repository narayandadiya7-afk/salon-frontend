'use client';

import Link from 'next/link';
import { useParams, useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import {
  Bell,
  Building2,
  Check,
  ChevronDown,
  LogOut,
  Menu,
  Moon,
  Plus,
  Search,
  Settings,
  Sun,
  UserRound,
  Scissors,
} from 'lucide-react';
import { Button } from '@/components/owner/owner-portal/button';
import { Sheet, SheetContent, SheetTitle, SheetTrigger } from '@/components/owner/owner-portal/sheet';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/owner/owner-portal/dropdown-menu';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/owner/owner-portal/popover';
import {
  CommandDialog,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from '@/components/owner/owner-portal/command';
import { Avatar, AvatarFallback } from '@/components/owner/owner-portal/avatar';
import { SidebarNav } from './AppSidebar';
import { useSession } from '@/lib/portal/session';
import { NAV, navHref } from '@/lib/portal/nav';
import { notifications } from '@/data/portal';
import { cn } from '@/lib/utils';
import { toast } from 'sonner';

export function TopBar({ slug }: { slug: string }) {
  const { user, role, roles, setRoleId, salon, salons, setSalonId, theme, toggleTheme, can } =
    useSession();
  const [open, setOpen] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const router = useRouter();
  const params = useParams();
  const paramSlug = (params?.slug as string) || slug;

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'k' && (e.metaKey || e.ctrlKey)) {
        e.preventDefault();
        setOpen((v) => !v);
      }
    };
    document.addEventListener('keydown', onKey);
    return () => document.removeEventListener('keydown', onKey);
  }, []);

  const visibleNav = NAV.flatMap((s) => s.items).filter((i) => can(i.module));
  const unread = notifications.filter((n) => n.unread).length;

  return (
    <header className="sticky top-0 z-30 border-b border-border bg-background/85 backdrop-blur-xl">
      <div className="grid grid-cols-[auto_1fr_auto] items-center gap-3 px-4 py-3 sm:px-6">
        <div className="flex min-w-0 items-center gap-2">
          <Sheet open={mobileOpen} onOpenChange={setMobileOpen}>
            <SheetTrigger asChild>
              <Button variant="ghost" size="icon" className="lg:hidden" aria-label="Open navigation">
                <Menu className="size-5" />
              </Button>
            </SheetTrigger>
            <SheetContent side="left" className="w-[280px] border-sidebar-border bg-sidebar p-0">
              <SheetTitle className="sr-only">Navigation</SheetTitle>
              <div className="flex items-center gap-3 px-5 py-5">
                <span className="grid size-9 place-items-center rounded-xl bg-sidebar-primary text-sidebar-primary-foreground">
                  <Scissors className="size-4.5" />
                </span>
                <p className="text-display text-base text-sidebar-accent-foreground">Maison Lumière</p>
              </div>
              <SidebarNav collapsed={false} onNavigate={() => setMobileOpen(false)} slug={paramSlug} />
            </SheetContent>
          </Sheet>

          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" className="h-10 max-w-[210px] gap-2 px-2 sm:px-3">
                <Building2 className="size-4 shrink-0 text-muted-foreground" />
                <span className="hidden min-w-0 flex-col items-start sm:flex">
                  <span className="w-full truncate text-sm font-semibold leading-tight">
                    {salon.name.split('—')[1]?.trim() ?? salon.name}
                  </span>
                  <span className="text-[0.68rem] leading-tight text-muted-foreground">{salon.city}</span>
                </span>
                <ChevronDown className="size-4 shrink-0 text-muted-foreground" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="start" className="w-64">
              <DropdownMenuLabel>Locations</DropdownMenuLabel>
              {salons.map((s) => (
                <DropdownMenuItem key={s.id} onSelect={() => setSalonId(s.id)}>
                  <span className="flex-1 truncate">{s.name}</span>
                  {s.id === salon.id && <Check className="size-4 text-gold" />}
                </DropdownMenuItem>
              ))}
            </DropdownMenuContent>
          </DropdownMenu>
        </div>

        <div className="flex min-w-0 justify-center">
          <button
            onClick={() => setOpen(true)}
            className="flex h-10 w-full max-w-md items-center gap-2 rounded-xl border border-border bg-muted/50 px-3 text-sm text-muted-foreground transition-colors hover:bg-muted"
          >
            <Search className="size-4 shrink-0" />
            <span className="min-w-0 flex-1 truncate text-left">
              Search clients, bookings, invoices…
            </span>
            <kbd className="hidden shrink-0 rounded border border-border bg-background px-1.5 py-0.5 text-[0.65rem] font-medium sm:block">
              ⌘K
            </kbd>
          </button>
        </div>

        <div className="flex items-center gap-1 sm:gap-2">
          <Button
            variant="gold"
            className="hidden md:inline-flex"
            onClick={() => toast.success('Quick action', { description: 'New booking drawer opened.' })}
          >
            <Plus className="size-4" />
            New booking
          </Button>

          <Button variant="ghost" size="icon" onClick={toggleTheme} aria-label="Toggle theme">
            {theme === 'dark' ? <Sun className="size-5" /> : <Moon className="size-5" />}
          </Button>

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
                  href={navHref('notifications', paramSlug)}
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
                        'mt-1.5 size-2 shrink-0 rounded-full',
                        n.unread ? 'bg-gold' : 'bg-border',
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

          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" className="h-10 gap-2 px-1.5 sm:px-2">
                <Avatar className="size-8">
                  <AvatarFallback className="bg-primary text-xs font-semibold text-primary-foreground">
                    {user.initials}
                  </AvatarFallback>
                </Avatar>
                <span className="hidden flex-col items-start lg:flex">
                  <span className="text-sm font-semibold leading-tight">{user.name}</span>
                  <span className="text-[0.68rem] leading-tight text-muted-foreground">{role.name}</span>
                </span>
                <ChevronDown className="size-4 text-muted-foreground" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="w-72">
              <DropdownMenuLabel className="font-normal">
                <p className="text-sm font-semibold">{user.name}</p>
                <p className="text-xs text-muted-foreground">{user.email}</p>
              </DropdownMenuLabel>
              <DropdownMenuSeparator />
              <DropdownMenuLabel className="text-[0.68rem] uppercase tracking-wider text-muted-foreground">
                Preview as role
              </DropdownMenuLabel>
              {roles.map((r) => (
                <DropdownMenuItem key={r.id} onSelect={() => setRoleId(r.id)}>
                  <span className="flex-1">{r.name}</span>
                  {r.custom && (
                    <span className="rounded-full bg-royal-soft px-2 py-0.5 text-[0.62rem] font-semibold text-royal">
                      custom
                    </span>
                  )}
                  {r.id === role.id && <Check className="size-4 text-gold" />}
                </DropdownMenuItem>
              ))}
              <DropdownMenuSeparator />
              <DropdownMenuItem onSelect={() => router.push(navHref('staff', paramSlug))}>
                <UserRound className="size-4" /> My profile
              </DropdownMenuItem>
              <DropdownMenuItem onSelect={() => router.push(navHref('settings', paramSlug))}>
                <Settings className="size-4" /> Settings
              </DropdownMenuItem>
              <DropdownMenuItem onSelect={() => toast('Signed out of Maison Lumière')}>
                <LogOut className="size-4" /> Sign out
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </div>

      <CommandDialog open={open} onOpenChange={setOpen}>
        <CommandInput placeholder="Search modules, clients, invoices…" />
        <CommandList>
          <CommandEmpty>No results found.</CommandEmpty>
          <CommandGroup heading="Modules">
            {visibleNav.map((item) => (
              <CommandItem
                key={item.to}
                value={item.label}
                onSelect={() => {
                  setOpen(false);
                  router.push(navHref(item.to, paramSlug));
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
                toast.success('New booking drawer opened.');
              }}
            >
              <Plus className="size-4" /> New booking
            </CommandItem>
            <CommandItem
              onSelect={() => {
                setOpen(false);
                toast.success('Walk-in added to the waiting list.');
              }}
            >
              <Plus className="size-4" /> Add walk-in
            </CommandItem>
          </CommandGroup>
        </CommandList>
      </CommandDialog>
    </header>
  );
}

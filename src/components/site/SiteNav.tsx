'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Menu, X, Moon, Sun, Globe, User, CalendarCheck } from 'lucide-react';
import { useEffect, useState } from 'react';
import { salon } from '@/data/salon';
import { useSite } from './site-context';
import { cn } from '@/lib/cn';

const links = [
  { to: '', label: 'Home' },
  { to: '/services', label: 'Services' },
  { to: '/packages', label: 'Packages' },
  { to: '/memberships', label: 'Memberships' },
  { to: '/gallery', label: 'Gallery' },
  { to: '/team', label: 'Our Team' },
  { to: '/testimonials', label: 'Reviews' },
  { to: '/blog', label: 'Journal' },
  { to: '/about', label: 'About' },
  { to: '/contact', label: 'Contact' },
] as const;

export function SiteNav() {
  const { slug } = useSite();
  const pathname = usePathname();
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [dark, setDark] = useState(false);
  const [lang, setLang] = useState('EN');

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  useEffect(() => {
    document.documentElement.classList.toggle('dark', dark);
    return () => document.documentElement.classList.remove('dark');
  }, [dark]);

  useEffect(() => {
    document.body.style.overflow = open ? 'hidden' : '';
    return () => {
      document.body.style.overflow = '';
    };
  }, [open]);

  const isActive = (to: string) => {
    const base = `/${slug}${to}`;
    if (to === '') return pathname === `/${slug}` || pathname === `/${slug}/`;
    return pathname.startsWith(base);
  };

  return (
    <>
      <header
        className={cn(
          'fixed inset-x-0 top-0 z-50 transition-all duration-500',
          scrolled
            ? 'glass py-2 shadow-[var(--shadow-soft)]'
            : 'bg-[linear-gradient(180deg,color-mix(in_oklab,var(--background)_82%,transparent),transparent)] py-4 backdrop-blur-[2px]',
        )}
      >
        <div className="shell grid grid-cols-[minmax(0,1fr)_auto] items-center gap-4">
          <Link href={`/${slug}`} className="flex min-w-0 items-center gap-3" onClick={() => setOpen(false)}>
            <span className="grid size-9 shrink-0 place-items-center rounded-full border border-gold/40 text-gold">
              <span className="display text-lg leading-none">M</span>
            </span>
            <span className="min-w-0">
              <span className="display block truncate text-lg leading-tight">{salon.name}</span>
              <span className="hidden text-[0.6rem] uppercase tracking-[0.3em] text-muted-foreground sm:block">
                Hair · Skin · Spa
              </span>
            </span>
          </Link>

          <div className="flex items-center gap-1">
            <nav className="mr-2 hidden items-center gap-1 xl:flex">
              {links.slice(1).map((l) => (
                <Link
                  key={l.to}
                  href={`/${slug}${l.to}`}
                  className={cn(
                    'rounded-full px-3 py-2 text-[0.8rem] tracking-wide transition-colors',
                    isActive(l.to) ? 'text-foreground' : 'text-muted-foreground hover:text-foreground',
                  )}
                >
                  {l.label}
                </Link>
              ))}
            </nav>

            <button
              type="button"
              onClick={() => setLang(lang === 'EN' ? 'FR' : 'EN')}
              aria-label="Switch language"
              className="hidden size-9 place-items-center rounded-full text-muted-foreground transition-colors hover:text-foreground sm:grid"
            >
              <span className="flex items-center gap-1 text-[0.65rem] tracking-widest">
                <Globe className="size-4" />
                {lang}
              </span>
            </button>
            <button
              type="button"
              onClick={() => setDark((d) => !d)}
              aria-label="Toggle theme"
              className="grid size-9 place-items-center rounded-full text-muted-foreground transition-colors hover:text-foreground"
            >
              {dark ? <Sun className="size-4" /> : <Moon className="size-4" />}
            </button>
            <Link
              href={`/${slug}/contact`}
              aria-label="Account"
              className="hidden size-9 place-items-center rounded-full text-muted-foreground transition-colors hover:text-foreground lg:grid"
            >
              <User className="size-4" />
            </Link>

            <Link
              href={`/${slug}/book`}
              className="ml-1 hidden items-center gap-2 rounded-full bg-primary px-5 py-2.5 text-[0.78rem] tracking-wide text-primary-foreground transition-transform duration-300 hover:-translate-y-0.5 md:inline-flex"
            >
              <CalendarCheck className="size-4" />
              Book Appointment
            </Link>

            <button
              type="button"
              onClick={() => setOpen((o) => !o)}
              aria-label={open ? 'Close menu' : 'Open menu'}
              className="grid size-10 place-items-center rounded-full border border-border xl:hidden"
            >
              {open ? <X className="size-4" /> : <Menu className="size-4" />}
            </button>
          </div>
        </div>
      </header>

      {open && (
        <div className="fixed inset-0 z-40 bg-background/98 pt-24 backdrop-blur-xl xl:hidden">
          <nav className="shell flex flex-col">
            {links.map((l, i) => (
              <Link
                key={l.to}
                href={`/${slug}${l.to}`}
                onClick={() => setOpen(false)}
                style={{ animationDelay: `${i * 40}ms` }}
                className={cn(
                  'reveal display border-b border-border/60 py-4 text-3xl',
                  isActive(l.to) ? 'text-gold' : '',
                )}
              >
                {l.label}
              </Link>
            ))}
            <Link
              href={`/${slug}/book`}
              onClick={() => setOpen(false)}
              className="mt-8 rounded-full bg-primary px-6 py-4 text-center text-sm tracking-wide text-primary-foreground"
            >
              Book Appointment
            </Link>
          </nav>
        </div>
      )}

      {!open && (
        <Link
          href={`/${slug}/book`}
          className="fixed inset-x-5 bottom-5 z-40 flex items-center justify-center gap-2 rounded-full bg-primary py-4 text-sm tracking-wide text-primary-foreground shadow-[var(--shadow-lift)] md:hidden"
        >
          <CalendarCheck className="size-4" />
          Book Now
        </Link>
      )}
    </>
  );
}

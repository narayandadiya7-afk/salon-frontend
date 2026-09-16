'use client';

import Link from "next/link";
import { useState } from "react";

const nav = [
  { to: "/features", label: "Features" },
  { to: "/solutions", label: "Solutions" },
  { to: "/pricing", label: "Pricing" },
  { to: "/how-it-works", label: "How it works" },
  { to: "/customers", label: "Stories" },
  { to: "/about", label: "About" },
] as const;

export function SiteHeader() {
  const [open, setOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 border-b border-line bg-background/92 shadow-card backdrop-blur-xl">
      <div className="mx-auto flex max-w-6xl items-center justify-between px-6 py-3.5">
        <Link href="/" className="flex items-baseline gap-3">
          <span className="font-display text-3xl font-semibold tracking-tight">Avivane</span>
          <span className="hidden font-mono text-[10px] uppercase tracking-[0.2em] text-muted-foreground sm:inline">
            salon platform
          </span>
        </Link>

        <nav className="hidden items-center gap-7 text-sm text-muted-foreground lg:flex">
          {nav.map((item) => (
            <Link
              key={item.to}
              href={item.to}
              className="transition-colors hover:text-foreground"
            >
              {item.label}
            </Link>
          ))}
        </nav>

        <div className="flex items-center gap-4">
          <Link
            href="/login"
            className="hidden text-sm text-muted-foreground transition-colors hover:text-foreground sm:inline"
          >
            Log in
          </Link>
          <Link
            href="/register"
            className="hidden rounded-full bg-primary px-5 py-2.5 text-sm font-semibold text-primary-foreground transition-all duration-300 hover:-translate-y-0.5 hover:bg-brass-soft hover:shadow-card sm:inline-flex"
          >
            Get Your Salon Website
          </Link>
          <button
            type="button"
            aria-label="Toggle navigation"
            aria-expanded={open}
            onClick={() => setOpen((v) => !v)}
            className="flex size-9 items-center justify-center rounded-full ring-1 ring-line lg:hidden"
          >
            <span className="flex flex-col gap-1">
              <span className="block h-px w-4 bg-foreground" />
              <span className="block h-px w-4 bg-foreground" />
            </span>
          </button>
        </div>
      </div>

      {open && (
        <nav className="border-t border-line bg-surface px-6 py-4 lg:hidden">
          <ul className="flex flex-col gap-3 text-sm">
            {nav.map((item) => (
              <li key={item.to}>
                <Link href={item.to} onClick={() => setOpen(false)} className="text-muted-foreground">
                  {item.label}
                </Link>
              </li>
            ))}
            <li>
              <Link href="/login" onClick={() => setOpen(false)} className="text-muted-foreground">
                Log in
              </Link>
            </li>
          </ul>
        </nav>
      )}
    </header>
  );
}
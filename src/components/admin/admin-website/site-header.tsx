'use client';

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";

const nav = [
  { to: "/features", label: "Features" },
  { to: "/solutions", label: "Solutions" },
  { to: "/pricing", label: "Pricing" },
  { to: "/how-it-works", label: "How it works" },
  { to: "/customers", label: "Stories" },
  { to: "/about", label: "About" },
  { to: "/contact", label: "Contact" },
] as const;

const solutionsGroups = [
  {
    title: "Salons & Studios",
    links: [
      { label: "Hair Salons", to: "/solutions/hair-salon" },
      { label: "Beauty Salons", to: "/solutions/beauty-salon" },
      { label: "Nail Salons", to: "/solutions/nail-salon" },
      { label: "Lash & Brow", to: "/solutions/lash-brow" },
      { label: "Makeup Artists", to: "/solutions/makeup-artist" },
      { label: "Bridal", to: "/solutions/bridal" },
    ],
  },
  {
    title: "Wellness, Skin & Body",
    links: [
      { label: "Spa", to: "/solutions/spa" },
      { label: "Massage Therapy", to: "/solutions/massage-therapy" },
      { label: "Wellness Centers", to: "/solutions/wellness" },
      { label: "Skin Care", to: "/solutions/skincare" },
      { label: "Waxing & Hair Removal", to: "/solutions/waxing" },
    ],
  },
  {
    title: "Grooming & Solo",
    links: [
      { label: "Barbershops", to: "/solutions/barbershop" },
      { label: "Men's Grooming", to: "/solutions/mens-grooming" },
      { label: "Freelancers", to: "/solutions/freelancers" },
    ],
  },
] as const;

function isActive(pathname: string, to: string) {
  if (to === "/") return pathname === "/";
  return pathname === to || pathname.startsWith(`${to}/`);
}

export function SiteHeader() {
  const [open, setOpen] = useState(false);
  const [solutionsOpen, setSolutionsOpen] = useState(false);
  const pathname = usePathname();

  return (
    <header className="sticky top-0 z-50 border-b border-line bg-background/92 shadow-card backdrop-blur-xl">
      <div className="mx-auto flex max-w-6xl items-center justify-between px-6 py-3.5">
        <Link href="/" className={"flex items-baseline gap-3" + (isActive(pathname, "/") ? " active" : "")}>
          <span className="font-display text-3xl font-semibold tracking-tight">Fyncho</span>
          <span className="hidden font-mono text-[10px] uppercase tracking-[0.2em] text-muted-foreground sm:inline">
            beauty &amp; wellness
          </span>
        </Link>

        <nav className="hidden items-center gap-7 text-sm text-muted-foreground lg:flex">
          {nav.map((item) =>
            item.to === "/solutions" ? (
              <div
                key={item.to}
                className="relative"
                onMouseEnter={() => setSolutionsOpen(true)}
                onMouseLeave={() => setSolutionsOpen(false)}
              >
                <Link
                  href={item.to}
                  className={"transition-colors hover:text-foreground" + (isActive(pathname, item.to) ? " text-foreground" : "")}
                >
                  {item.label}
                </Link>

                {solutionsOpen && (
                  <div className="absolute left-1/2 top-full z-50 mt-3 w-[580px] -translate-x-1/2 rounded-2xl border border-line bg-background p-6 shadow-lift">
                    <div className="grid grid-cols-3 gap-6">
                      {solutionsGroups.map((group) => (
                        <div key={group.title}>
                          <p className="mb-2 font-mono text-[10px] uppercase tracking-[0.18em] text-brass">
                            {group.title}
                          </p>
                          <ul className="space-y-1.5">
                            {group.links.map((link) => (
                              <li key={link.to}>
                                <Link
                                  href={link.to}
                                  className="block text-xs text-muted-foreground transition-colors hover:text-foreground"
                                  onClick={() => setSolutionsOpen(false)}
                                >
                                  {link.label}
                                </Link>
                              </li>
                            ))}
                          </ul>
                        </div>
                      ))}
                    </div>
                    <div className="mt-5 border-t border-line pt-4">
                      <Link
                        href="/solutions"
                        className="font-mono text-[10px] uppercase tracking-[0.18em] text-brass-soft transition-colors hover:text-brass"
                        onClick={() => setSolutionsOpen(false)}
                      >
                        View all solutions →
                      </Link>
                    </div>
                  </div>
                )}
              </div>
            ) : (
              <Link
                key={item.to}
                href={item.to}
                className={"transition-colors hover:text-foreground" + (isActive(pathname, item.to) ? " text-foreground" : "")}
              >
                {item.label}
              </Link>
            )
          )}
        </nav>

        <div className="flex items-center gap-4">
          <Link
            href="/login"
            className={"hidden text-sm text-muted-foreground transition-colors hover:text-foreground sm:inline" + (isActive(pathname, "/login") ? " active" : "")}
          >
            Log in
          </Link>
          <Link
            href="/register"
            className={"hidden rounded-full bg-primary px-5 py-2.5 text-sm font-semibold text-primary-foreground transition-all duration-300 hover:-translate-y-0.5 hover:bg-brass-soft hover:shadow-card sm:inline-flex" + (isActive(pathname, "/register") ? " active" : "")}
          >
            Get Started Free
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

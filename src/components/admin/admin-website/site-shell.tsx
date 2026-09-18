import type { ReactNode } from "react";
import { SiteHeader } from "./site-header";
import { SiteFooter } from "./site-footer";

export function SiteShell({ children }: { children: ReactNode }) {
  return (
    <div className="avivane-site min-h-screen bg-background">
      <SiteHeader />
      <main>{children}</main>
      <SiteFooter />
    </div>
  );
}

export function PageHero({
  eyebrow,
  title,
  intro,
  image,
  imageAlt,
}: {
  eyebrow: string;
  title: ReactNode;
  intro: string;
  image: string;
  imageAlt: string;
}) {
  return (
    <section className="page-banner relative isolate mb-20 flex min-h-[calc(100svh-4rem)] flex-col overflow-hidden bg-primary sm:mb-28">
      <img
        src={image}
        alt={imageAlt}
        width={1920}
        height={1088}
        className="banner-image absolute inset-0 h-full w-full object-cover"
      />
      <div className="banner-shade absolute inset-0" />
      <div className="pointer-events-none absolute inset-5 border border-primary-foreground/15 sm:inset-8" />

      <div className="relative mx-auto flex w-full max-w-7xl flex-1 flex-col px-10 pb-10 pt-12 sm:px-14 sm:pb-14 lg:px-16">
        <div className="anim-rise flex items-center justify-between border-b border-primary-foreground/20 pb-5">
          <p className="font-mono text-[10px] uppercase tracking-[0.22em] text-primary-foreground/70">
            Avivane <span className="mx-2 text-brass">/</span> {eyebrow}
          </p>
          <p className="hidden font-mono text-[10px] uppercase tracking-[0.22em] text-primary-foreground/50 sm:block">
            Salon platform
          </p>
        </div>

        <div className="grid flex-1 content-center gap-8 py-12 lg:grid-cols-12 lg:items-end lg:gap-12 lg:py-16">
          <div className="lg:col-span-8">
            <span className="anim-rise block h-px w-16 bg-brass" />
            <h1 className="anim-rise-2 mt-7 max-w-4xl font-display text-5xl leading-[0.92] text-balance text-primary-foreground sm:text-7xl lg:text-8xl">
              {title}
            </h1>
          </div>
          <div className="anim-rise-3 border-l border-brass/70 pl-5 lg:col-span-4 lg:mb-2 lg:pl-7">
            <p className="font-mono text-[10px] uppercase tracking-[0.2em] text-brass">Designed for ownership</p>
            <p className="mt-4 max-w-[42ch] text-sm leading-relaxed text-pretty text-primary-foreground/90 sm:text-base">
              {intro}
            </p>
          </div>
        </div>

        <div className="anim-rise-4 grid border-t border-primary-foreground/20 pt-5 sm:grid-cols-[1fr_auto] sm:items-end sm:gap-8">
          <dl className="hidden grid-cols-3 gap-8 sm:grid">
            <div>
              <dt className="font-mono text-[9px] uppercase tracking-[0.2em] text-primary-foreground/45">Presence</dt>
              <dd className="mt-2 text-xs text-primary-foreground/80">Your salon. Your address.</dd>
            </div>
            <div>
              <dt className="font-mono text-[9px] uppercase tracking-[0.2em] text-primary-foreground/45">Experience</dt>
              <dd className="mt-2 text-xs text-primary-foreground/80">Beautiful from first click.</dd>
            </div>
            <div>
              <dt className="font-mono text-[9px] uppercase tracking-[0.2em] text-primary-foreground/45">Growth</dt>
              <dd className="mt-2 text-xs text-primary-foreground/80">One connected platform.</dd>
            </div>
          </dl>
          <div className="flex items-center gap-3 justify-self-start sm:justify-self-end">
            <span className="font-mono text-[10px] uppercase tracking-[0.2em] text-primary-foreground/60">Explore</span>
            <span aria-hidden="true" className="flex size-9 items-center justify-center rounded-full border border-primary-foreground/25 text-brass">↓</span>
          </div>
        </div>
      </div>
    </section>
  );
}
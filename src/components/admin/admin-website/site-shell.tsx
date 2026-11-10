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

export function HeroShell({
  eyebrow,
  topRight = "Beauty & Wellness Platform",
  image,
  imageAlt,
  videoSrc,
  poster,
  children,
  bottom,
  flushBottom = false,
}: {
  eyebrow: string;
  topRight?: string;
  image?: string;
  imageAlt?: string;
  videoSrc?: string;
  poster?: string;
  children: ReactNode;
  bottom?: ReactNode;
  flushBottom?: boolean;
}) {
  return (
    <section
      className={
        "page-banner relative isolate flex min-h-[calc(100svh-4rem)] lg:min-h-[720px] lg:max-h-[820px] flex-col overflow-hidden bg-primary " +
        (flushBottom ? "" : "mb-20 sm:mb-28")
      }
    >
      {videoSrc ? (
        <>
          {poster && (
            <img
              src={poster}
              alt={imageAlt ?? ""}
              width={1920}
              height={1088}
              className="banner-image absolute inset-0 h-full w-full object-cover sm:hidden"
            />
          )}
          <video
            autoPlay
            muted
            loop
            playsInline
            preload="auto"
            aria-label={imageAlt}
            className="banner-image absolute inset-0 h-full w-full object-cover hidden sm:block"
          >
            <source src={videoSrc} type="video/mp4" />
          </video>
        </>
      ) : (
        <img
          src={image}
          alt={imageAlt ?? ""}
          width={1920}
          height={1088}
          className="banner-image absolute inset-0 h-full w-full object-cover"
        />
      )}
      <div className="banner-shade absolute inset-0" />
      <div className="pointer-events-none absolute inset-4 border border-primary-foreground/15 sm:inset-6" />

      <div className="relative mx-auto flex w-full max-w-7xl flex-1 flex-col px-6 pb-10 pt-12 sm:px-8 sm:pb-14 lg:px-12">
        <div className="anim-rise flex items-center justify-between border-b border-primary-foreground/20 pb-5">
          <p className="font-mono text-[10px] uppercase tracking-[0.22em] text-primary-foreground/70">
            Fyncho <span className="mx-2 text-brass">/</span> {eyebrow}
          </p>
          <p className="hidden font-mono text-[10px] uppercase tracking-[0.22em] text-primary-foreground/50 sm:block">
            {topRight}
          </p>
        </div>

        <div className="flex-1 content-center py-10 lg:py-14">{children}</div>

        {bottom && (
          <div className="anim-rise-4 border-t border-primary-foreground/20 pt-5">
            {bottom}
          </div>
        )}
      </div>
    </section>
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
    <HeroShell
      eyebrow={eyebrow}
      image={image}
      imageAlt={imageAlt}
      bottom={
        <div className="grid border-t border-primary-foreground/20 pt-5 sm:grid-cols-[1fr_auto] sm:items-end sm:gap-8">
          <dl className="hidden grid-cols-3 gap-8 sm:grid">
            <div>
              <dt className="font-mono text-[9px] uppercase tracking-[0.2em] text-primary-foreground/45">Presence</dt>
              <dd className="mt-2 text-xs text-primary-foreground/80">Your business. Your address.</dd>
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
      }
    >
      <div className="grid gap-8 lg:grid-cols-12 lg:items-end lg:gap-12">
        <div className="lg:col-span-8">
          <span className="anim-rise block h-px w-16 bg-brass" />
          <h1 className="anim-rise-2 mt-7 max-w-4xl font-display text-5xl leading-[0.92] text-balance text-primary-foreground sm:text-7xl lg:text-8xl">
            {title}
          </h1>
        </div>
        <div className="anim-rise-3 border-l border-brass/70 pl-5 lg:col-span-4 lg:mb-2 lg:pl-7">
          <p className="font-mono text-[10px] uppercase tracking-[0.2em] text-brass">Built for your business</p>
          <p className="mt-4 max-w-[42ch] text-sm leading-relaxed text-pretty text-primary-foreground/90 sm:text-base">
            {intro}
          </p>
        </div>
      </div>
    </HeroShell>
  );
}

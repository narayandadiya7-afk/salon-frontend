import Link from "next/link";
import type { ReactNode } from "react";

export function SectionHeading({
  eyebrow,
  title,
  description,
  align = "left",
}: {
  eyebrow: string;
  title: ReactNode;
  description?: string;
  align?: "left" | "center";
}) {
  return (
    <div className={align === "center" ? "mx-auto max-w-3xl text-center" : "max-w-2xl"}>
      <span className={align === "center" ? "rule-brass mx-auto mb-5" : "rule-brass mb-5"} />
      <p className="eyebrow">{eyebrow}</p>
      <h2 className="mt-4 text-4xl leading-[1.02] text-balance sm:text-5xl">{title}</h2>
      {description && (
        <p className="mt-5 text-base leading-relaxed text-pretty text-muted-foreground sm:text-lg">
          {description}
        </p>
      )}
    </div>
  );
}

export function MetricBand({
  items,
}: {
  items: Array<{ value: string; label: string; detail?: string }>;
}) {
  return (
    <dl className="grid grid-cols-2 border-y border-line lg:grid-cols-4">
      {items.map((item) => (
        <div
          key={item.label}
          className="group border-line px-5 py-8 transition-colors duration-300 even:border-l hover:bg-background/60 lg:border-l lg:first:border-l-0"
        >
          <dt className="font-mono text-[10px] uppercase tracking-[0.18em] text-muted-foreground">
            {item.label}
          </dt>
          <dd className="mt-3 font-display text-5xl leading-none transition-colors duration-300 group-hover:text-brass-soft">
            {item.value}
          </dd>
          {item.detail && (
            <p className="mt-3 max-w-[26ch] text-xs leading-relaxed text-muted-foreground">{item.detail}</p>
          )}
        </div>
      ))}
    </dl>
  );
}

export function ClosingCta({
  title,
  description,
  secondary,
}: {
  title: string;
  description: string;
  secondary?: { label: string; to: "/pricing" | "/features" | "/how-it-works" | "/customers" };
}) {
  return (
    <section className="closing-glow relative isolate overflow-hidden bg-primary py-24 sm:py-32">
      <div className="relative mx-auto max-w-4xl px-6 text-center">
        <span className="rule-brass mx-auto mb-6" />
        <p className="eyebrow">Your salon, ready for what is next</p>
        <h2 className="mt-5 font-display text-5xl leading-[0.98] text-balance text-primary-foreground sm:text-6xl">
          {title}
        </h2>
        <p className="mx-auto mt-6 max-w-[58ch] text-lg leading-relaxed text-pretty text-primary-foreground/70">
          {description}
        </p>
        <div className="mt-10 flex flex-wrap justify-center gap-3">
          <Link
            href="/register"
            className="rounded-full bg-brass px-8 py-4 text-sm font-semibold text-primary transition-transform duration-300 hover:-translate-y-0.5 hover:bg-primary-foreground"
          >
            Get Your Salon Website
          </Link>
          {secondary && (
            <Link
              href={secondary.to}
              className="rounded-full px-8 py-4 text-sm font-semibold text-primary-foreground ring-1 ring-primary-foreground/25 transition-colors hover:bg-primary-foreground/10"
            >
              {secondary.label}
            </Link>
          )}
        </div>
      </div>
    </section>
  );
}
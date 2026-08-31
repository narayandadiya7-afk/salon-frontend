import type { ReactNode } from "react";
import { ArrowDownRight, ArrowUpRight } from "lucide-react";
import { Badge } from "@/components/admin/admin-portal/badge";
import { cn } from "@/lib/utils";

export function PageHeader({
  title,
  description,
  breadcrumb,
  actions,
}: {
  title: string;
  description?: string;
  breadcrumb?: string[];
  actions?: ReactNode;
}) {
  return (
    <div className="mb-6 flex flex-col gap-4 md:flex-row md:items-end md:justify-between">
      <div className="min-w-0">
        {breadcrumb && (
          <nav aria-label="Breadcrumb" className="mb-1.5 flex flex-wrap items-center gap-1.5 text-xs text-muted-foreground">
            {breadcrumb.map((crumb, i) => (
              <span key={crumb} className="flex items-center gap-1.5">
                {i > 0 && <span aria-hidden>/</span>}
                <span className={cn(i === breadcrumb.length - 1 && "text-foreground")}>{crumb}</span>
              </span>
            ))}
          </nav>
        )}
        <h1 className="text-2xl font-semibold tracking-tight md:text-3xl">{title}</h1>
        {description && <p className="mt-1.5 max-w-2xl text-sm text-muted-foreground">{description}</p>}
      </div>
      {actions && <div className="flex flex-wrap items-center gap-2">{actions}</div>}
    </div>
  );
}

export function Panel({
  title,
  description,
  actions,
  children,
  className,
  bodyClassName,
}: {
  title?: string;
  description?: string;
  actions?: ReactNode;
  children: ReactNode;
  className?: string;
  bodyClassName?: string;
}) {
  return (
    <section className={cn("surface-card overflow-hidden", className)}>
      {(title || actions) && (
        <div className="flex flex-wrap items-center justify-between gap-3 border-b border-border px-5 py-4">
          <div>
            {title && <h2 className="text-sm font-semibold">{title}</h2>}
            {description && <p className="mt-0.5 text-xs text-muted-foreground">{description}</p>}
          </div>
          {actions}
        </div>
      )}
      <div className={cn("p-5", bodyClassName)}>{children}</div>
    </section>
  );
}

const toneMap = {
  primary: "bg-primary/10 text-primary",
  success: "bg-success/12 text-success",
  warning: "bg-warning/18 text-warning-foreground",
  destructive: "bg-destructive/10 text-destructive",
  violet: "bg-violet/10 text-violet",
  muted: "bg-muted text-muted-foreground",
} as const;

export type Tone = keyof typeof toneMap;

export function KpiCard({
  label,
  value,
  delta,
  hint,
  icon: Icon,
  tone = "primary",
}: {
  label: string;
  value: string;
  delta?: number;
  hint?: string;
  icon?: React.ComponentType<{ className?: string }>;
  tone?: Tone;
}) {
  const up = (delta ?? 0) >= 0;
  return (
    <div className="surface-card p-5 transition-shadow hover:shadow-[var(--shadow-elevated)]">
      <div className="flex items-start justify-between gap-3">
        <p className="text-xs font-medium uppercase tracking-wide text-muted-foreground">{label}</p>
        {Icon && (
          <span className={cn("flex size-8 items-center justify-center rounded-lg", toneMap[tone])}>
            <Icon className="size-4" />
          </span>
        )}
      </div>
      <p className="mt-3 text-2xl font-semibold tracking-tight tabular-nums">{value}</p>
      <div className="mt-2 flex items-center gap-2 text-xs">
        {delta !== undefined && (
          <span className={cn("inline-flex items-center gap-0.5 font-medium", up ? "text-success" : "text-destructive")}>
            {up ? <ArrowUpRight className="size-3.5" /> : <ArrowDownRight className="size-3.5" />}
            {Math.abs(delta)}%
          </span>
        )}
        {hint && <span className="text-muted-foreground">{hint}</span>}
      </div>
    </div>
  );
}

const statusStyles: Record<string, string> = {
  active: "bg-success/12 text-success border-success/20",
  operational: "bg-success/12 text-success border-success/20",
  succeeded: "bg-success/12 text-success border-success/20",
  paid: "bg-success/12 text-success border-success/20",
  connected: "bg-success/12 text-success border-success/20",
  resolved: "bg-success/12 text-success border-success/20",
  success: "bg-success/12 text-success border-success/20",
  trial: "bg-info/12 text-info border-info/20",
  open: "bg-info/12 text-info border-info/20",
  invited: "bg-info/12 text-info border-info/20",
  info: "bg-info/12 text-info border-info/20",
  pending: "bg-warning/18 text-warning-foreground border-warning/30",
  degraded: "bg-warning/18 text-warning-foreground border-warning/30",
  attention: "bg-warning/18 text-warning-foreground border-warning/30",
  warning: "bg-warning/18 text-warning-foreground border-warning/30",
  refunded: "bg-violet/12 text-violet border-violet/20",
  suspended: "bg-destructive/10 text-destructive border-destructive/20",
  failed: "bg-destructive/10 text-destructive border-destructive/20",
  overdue: "bg-destructive/10 text-destructive border-destructive/20",
  urgent: "bg-destructive/10 text-destructive border-destructive/20",
  error: "bg-destructive/10 text-destructive border-destructive/20",
  high: "bg-warning/18 text-warning-foreground border-warning/30",
  medium: "bg-info/12 text-info border-info/20",
  low: "bg-muted text-muted-foreground border-border",
  churned: "bg-muted text-muted-foreground border-border",
  closed: "bg-muted text-muted-foreground border-border",
  disconnected: "bg-muted text-muted-foreground border-border",
};

export function StatusBadge({ status, className }: { status: string; className?: string }) {
  return (
    <Badge
      variant="outline"
      className={cn("rounded-full border px-2 py-0.5 text-[11px] font-medium capitalize", statusStyles[status] ?? statusStyles["low"], className)}
    >
      {status}
    </Badge>
  );
}

export function EmptyState({ title, description, action }: { title: string; description: string; action?: ReactNode }) {
  return (
    <div className="flex flex-col items-center justify-center rounded-xl border border-dashed border-border px-6 py-14 text-center">
      <h3 className="text-sm font-semibold">{title}</h3>
      <p className="mt-1 max-w-sm text-sm text-muted-foreground">{description}</p>
      {action && <div className="mt-4">{action}</div>}
    </div>
  );
}

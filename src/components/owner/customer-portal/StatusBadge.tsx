import { cn } from '@/utils/cn';
import type { AppointmentStatus, PaymentStatus } from '@/data/customer-portal';

const styles: Record<string, string> = {
  Pending: 'bg-warning/15 text-warning-foreground border-warning/30',
  Confirmed: 'bg-success/12 text-success border-success/25',
  'Checked In': 'bg-info/12 text-info border-info/25',
  'In Progress': 'bg-info/12 text-info border-info/25',
  Completed: 'bg-muted text-muted-foreground border-border',
  Cancelled: 'bg-destructive/10 text-destructive border-destructive/20',
  Rescheduled: 'bg-accent text-accent-foreground border-gold/30',
  'No Show': 'bg-destructive/8 text-destructive border-destructive/20',
  Paid: 'bg-success/12 text-success border-success/25',
  Refunded: 'bg-info/12 text-info border-info/25',
  Failed: 'bg-destructive/10 text-destructive border-destructive/20',
};

export function StatusBadge({
  status,
  className,
}: {
  status: AppointmentStatus | PaymentStatus | string;
  className?: string;
}) {
  return (
    <span
      className={cn(
        'inline-flex items-center gap-1.5 rounded-full border px-2.5 py-1 text-xs font-medium tracking-wide',
        styles[status] ?? 'bg-muted text-muted-foreground border-border',
        className,
      )}
    >
      <span className="size-1.5 rounded-full bg-current opacity-70" />
      {status}
    </span>
  );
}
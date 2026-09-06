'use client';

import { Bell } from 'lucide-react';
import { toast } from 'sonner';
import { Button } from '@/components/owner/customer-portal/button';
import { PageHeader } from '@/components/owner/customer-portal/PageHeader';
import { notifications } from '@/data/customer-portal';
import { cn } from '@/utils/cn';

export default function NotificationsPage() {
  return (
    <div className="space-y-6">
      <PageHeader
        title="Notifications"
        subtitle="Reminders, offers and account updates."
        action={
          <Button variant="secondary" className="rounded-full" onClick={() => toast.success('All notifications marked as read')}>
            Mark all read
          </Button>
        }
      />
      <div className="surface divide-y divide-border">
        {notifications.map((n) => (
          <div key={n.id} className={cn('flex gap-4 px-5 py-4', !n.read && 'bg-accent/40')}>
            <div className="grid size-9 shrink-0 place-items-center rounded-full bg-accent text-accent-foreground">
              <Bell className="size-4" />
            </div>
            <div className="min-w-0 flex-1">
              <div className="flex flex-wrap items-center gap-2">
                <p className="text-sm font-medium">{n.title}</p>
                <span className="rounded-full border border-border px-2 py-0.5 text-[11px] text-muted-foreground">{n.category}</span>
              </div>
              <p className="mt-1 text-sm text-muted-foreground">{n.body}</p>
              <p className="mt-1 text-xs text-muted-foreground">{n.time}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
'use client';

import { useState } from 'react';
import { Send } from 'lucide-react';
import { toast } from 'sonner';
import { Button } from '@/components/owner/customer-portal/button';
import { Input } from '@/components/owner/customer-portal/input';
import { PageHeader } from '@/components/owner/customer-portal/PageHeader';
import { messages, tenant } from '@/data/customer-portal';
import { cn } from '@/utils/cn';

export default function MessagesPage() {
  const [draft, setDraft] = useState('');
  const [thread, setThread] = useState(messages);

  const send = () => {
    if (!draft.trim()) return;
    setThread([...thread, { id: `m${thread.length + 1}`, from: 'customer' as const, text: draft, time: 'Now' }]);
    setDraft('');
    toast.success('Message sent');
  };

  return (
    <div className="space-y-6">
      <PageHeader title="Messages" subtitle={`${tenant.name} · ${tenant.responseTime}`} />
      <div className="surface flex h-[60vh] flex-col">
        <div className="flex-1 space-y-3 overflow-y-auto p-5">
          {thread.map((m) => (
            <div key={m.id} className={cn('flex', m.from === 'customer' ? 'justify-end' : 'justify-start')}>
              <div
                className={cn(
                  'max-w-[80%] rounded-3xl px-4 py-2.5 text-sm',
                  m.from === 'customer' ? 'bg-foreground text-background' : 'bg-muted text-foreground',
                )}
              >
                <p>{m.text}</p>
                <p className="mt-1 text-[11px] opacity-60">{m.time}</p>
              </div>
            </div>
          ))}
        </div>
        <div className="flex items-center gap-2 border-t border-border p-3">
          <Input
            value={draft}
            onChange={(e) => setDraft(e.target.value)}
            onKeyDown={(e) => e.key === 'Enter' && send()}
            placeholder="Write a message…"
            className="rounded-full"
          />
          <Button className="rounded-full" size="icon" aria-label="Send" onClick={send}>
            <Send className="size-4" />
          </Button>
        </div>
      </div>
    </div>
  );
}
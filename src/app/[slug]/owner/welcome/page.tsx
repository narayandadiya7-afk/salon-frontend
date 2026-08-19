'use client';

import { useParams, useRouter } from 'next/navigation';
import { Check, Globe, User, Users } from 'lucide-react';
import { Surface } from '@/components/owner/owner-portal/primitives';
import { Button } from '@/components/owner/owner-portal/button';

const steps = [
  { icon: User, title: 'Set up your salon details', description: 'Add your address, phone, working hours, and more.' },
  { icon: Check, title: 'Add services & pricing', description: 'List the services you offer with prices and durations.' },
  { icon: Users, title: 'Invite your staff', description: 'Add team members so they can manage bookings too.' },
];

export default function WelcomePage() {
  const params = useParams();
  const router = useRouter();
  const slug = params?.slug as string;

  return (
    <div className="mx-auto max-w-[700px] px-6 py-16 text-center">
      <div className="text-6xl mb-4">🎉</div>
      <h1 className="text-display text-2xl font-semibold sm:text-3xl">Your salon is live!</h1>
      <p className="mt-2 text-sm text-muted-foreground">
        Your 1-month free trial has started. Here&apos;s your salon website:
      </p>

      <Surface className="mx-auto mt-8 max-w-md p-8 text-center">
        <span className="mx-auto grid size-12 place-items-center rounded-xl bg-gold-soft text-gold">
          <Globe className="size-6" />
        </span>
        <p className="mt-4 text-lg font-semibold text-gold">/{slug}</p>
        <p className="mt-1 text-sm text-muted-foreground">Share this link with your customers</p>
        <Button variant="gold" className="mt-5" onClick={() => router.push(`/${slug}`)}>
          View Your Salon Website
        </Button>
      </Surface>

      <h2 className="mt-10 text-display text-lg font-semibold">Next Steps</h2>

      <div className="mx-auto mt-6 max-w-[500px] space-y-4 text-left">
        {steps.map((s, i) => (
          <div key={i} className="flex items-start gap-4">
            <span className="grid size-9 shrink-0 place-items-center rounded-xl bg-gold-soft text-gold">
              <s.icon className="size-4.5" />
            </span>
            <div>
              <p className="text-sm font-semibold">{s.title}</p>
              <p className="mt-0.5 text-xs text-muted-foreground">{s.description}</p>
            </div>
          </div>
        ))}
      </div>

      <p className="mt-8 text-sm text-muted-foreground">
        You can manage everything from your salon dashboard.
      </p>
      <Button variant="gold" className="mt-4" onClick={() => router.push(`/${slug}/owner/login`)}>
        Go to Dashboard
      </Button>
    </div>
  );
}

'use client';

import { useState } from 'react';
import Link from 'next/link';
import { notification } from '@/utils/notification';

function Field({
  label,
  ...props
}: { label: string } & React.InputHTMLAttributes<HTMLInputElement>) {
  return (
    <label className="block">
      <span className="font-mono text-[11px] uppercase tracking-[0.2em] text-muted-foreground">
        {label}
      </span>
      <input
        {...props}
        required
        className="mt-2 w-full rounded-xl bg-surface px-4 py-3 text-sm outline-none ring-1 ring-line focus:ring-2 focus:ring-brass"
      />
    </label>
  );
}

export function ForgotPasswordForm() {
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);
    notification.success('Reset link sent to your email!');
    setLoading(false);
  };

  return (
    <section className="mx-auto max-w-md px-6 py-24">
      <div className="card-lux p-8 sm:p-10">
        <span className="rule-brass mb-5" />
        <p className="eyebrow">Account recovery</p>
        <h1 className="mt-4 font-display text-5xl leading-[0.95] text-balance">
          Forgot your password?
        </h1>
        <p className="mt-4 text-sm leading-relaxed text-muted-foreground">
          Enter the email address for your salon account and we&apos;ll send you a link to reset
          your password.
        </p>

        <form className="mt-9 space-y-4" onSubmit={handleSubmit}>
          <Field label="Email" type="email" name="email" placeholder="you@salon.com" />
          <button
            type="submit"
            disabled={loading}
            className="w-full rounded-full bg-primary px-6 py-3 text-sm font-semibold text-primary-foreground transition-colors hover:bg-brass-soft disabled:opacity-60"
          >
            {loading ? 'Sending…' : 'Send Reset Link'}
          </button>
        </form>

        <p className="mt-8 text-sm text-muted-foreground">
          Remembered it?{' '}
          <Link href="/login" className="text-brass-soft hover:text-brass">
            Back to login
          </Link>
        </p>
      </div>
    </section>
  );
}
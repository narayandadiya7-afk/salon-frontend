'use client';

import { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { notification } from '@/utils/notification';
import apiUtil from '@/utils/api';
import AuthUtil from '@/utils/auth';
import { ApiAuthLogin } from '@/utils/api.constant';
import { eResultCode } from '@/utils/enum';
import EncryptUtils from '@/utils/encrypt';

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

export function LoginForm() {
  const [notice, setNotice] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const form = new FormData(e.currentTarget);
    const email = String(form.get('email') || '');
    const password = String(form.get('password') || '');

    setLoading(true);
    try {
      const encryptedPassword = EncryptUtils.encrypt(password);
      const response = await apiUtil.post(ApiAuthLogin, {
        email,
        password: encryptedPassword,
      });

      const { dataResponse, data } = response || {};
      const returnCode = dataResponse?.returnCode;

      if (returnCode === eResultCode.SUCCESS || returnCode === eResultCode.CREATED) {
        const token = data?.accessToken || data?.token;
        if (token) AuthUtil.setToken(token);

        const role = data?.user?.role;
        const salonSlug = data?.user?.salon?.slug || data?.user?.tenant?.slug;
        notification.success(dataResponse?.description || 'Login successful!');

        if ((role === 'SALON_OWNER' || role === 'SALON_STAFF') && salonSlug) router.push(`/${salonSlug}/owner/dashboard`);
        else if (role === 'SALON_OWNER' || role === 'SALON_STAFF') router.push('/owner/dashboard');
        else if (salonSlug) router.push(`/${salonSlug}`);
        else router.push('/account');
      } else {
        setNotice(dataResponse?.description || 'Login failed. Please check your credentials.');
      }
    } catch {
      setNotice('An error occurred. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <section className="mx-auto max-w-md px-6 py-24">
      <div className="card-lux p-8 sm:p-10">
        <span className="rule-brass mb-5" />
        <p className="eyebrow">Welcome back</p>
        <h1 className="mt-4 font-display text-5xl leading-[0.95] text-balance">
          Open your salon.
        </h1>
        <p className="mt-4 text-sm leading-relaxed text-muted-foreground">
          Sign in to manage appointments, clients and everything behind your salon address.
        </p>

        <form className="mt-9 space-y-4" onSubmit={handleSubmit}>
          <Field label="Email" type="email" name="email" placeholder="you@salon.com" />
          <Field label="Password" type="password" name="password" placeholder="••••••••" />

          <div className="flex items-center justify-between">
            <span className="font-mono text-xs text-muted-foreground">Forgot password?</span>
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full rounded-full bg-primary px-6 py-3 text-sm font-semibold text-primary-foreground transition-colors hover:bg-brass-soft disabled:opacity-60"
          >
            {loading ? 'Logging in…' : 'Log in'}
          </button>
          <button
            type="button"
            onClick={() => setNotice('Google sign-in becomes available once the backend is enabled.')}
            className="w-full rounded-full px-6 py-3 text-sm font-semibold text-foreground ring-1 ring-line transition-colors hover:bg-surface"
          >
            Continue with Google
          </button>
        </form>

        {notice && (
          <p className="mt-5 rounded-xl bg-surface p-4 font-mono text-xs leading-relaxed text-muted-foreground ring-1 ring-line">
            {notice}
          </p>
        )}

        <p className="mt-8 text-sm text-muted-foreground">
          No salon yet?{' '}
          <Link href="/register" className="text-brass-soft hover:text-brass">
            Get your salon website
          </Link>
        </p>
      </div>
    </section>
  );
}
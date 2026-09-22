'use client';

import { useMemo, useState } from 'react';
import Link from 'next/link';
import { notification } from '@/utils/notification';
import apiUtil from '@/utils/api';
import AuthUtil from '@/utils/auth';
import { ApiAuthRegister } from '@/utils/api.constant';
import { eResultCode } from '@/utils/enum';
import EncryptUtils from '@/utils/encrypt';

const businessTypes = [
  'Hair salon',
  'Beauty salon',
  'Barbershop',
  'Spa & wellness',
  'Nail studio',
  'Beauty clinic',
];

const taken = ['glam-studio', 'avivane', 'salon', 'admin'];

function slugify(value: string) {
  return value
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9\s-]/g, '')
    .replace(/\s+/g, '-')
    .replace(/-+/g, '-')
    .slice(0, 40);
}

const stepLabels = ['Your account', 'Your salon', 'Your URL'];

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
        maxLength={120}
        className="mt-2 w-full rounded-xl bg-surface px-4 py-3 text-sm outline-none ring-1 ring-line focus:ring-2 focus:ring-brass"
      />
    </label>
  );
}

function SubmitButton({ children }: { children: React.ReactNode }) {
  return (
    <button
      type="submit"
      className="w-full rounded-full bg-primary px-6 py-3 text-sm font-semibold text-primary-foreground transition-colors hover:bg-brass-soft"
    >
      {children}
    </button>
  );
}

function BackButton({ onClick }: { onClick: () => void }) {
  return (
    <button
      type="button"
      onClick={onClick}
      className="rounded-full px-6 py-3 text-sm font-semibold text-foreground ring-1 ring-line transition-colors hover:bg-surface"
    >
      Back
    </button>
  );
}

export function RegisterForm() {
  const [step, setStep] = useState(0);
  const [account, setAccount] = useState({
    name: '',
    email: '',
    phone: '',
    password: '',
    confirm: '',
  });
  const [salon, setSalon] = useState({
    name: '',
    type: businessTypes[0],
    country: '',
    city: '',
  });
  const [slug, setSlug] = useState('');
  const [created, setCreated] = useState(false);
  const [createdSlug, setCreatedSlug] = useState('');
  const [loading, setLoading] = useState(false);

  const effectiveSlug = slug || slugify(salon.name);
  const available = useMemo(
    () => effectiveSlug.length >= 3 && !taken.includes(effectiveSlug),
    [effectiveSlug],
  );
  const passwordsMatch = account.password.length >= 8 && account.password === account.confirm;

  const handleSubmit = async () => {
    if (!available) return;

    setLoading(true);
    try {
      const response = await apiUtil.post(ApiAuthRegister, {
        name: account.name,
        email: account.email,
        phone: account.phone,
        password: EncryptUtils.encrypt(account.password),
        role: 'SALON_OWNER',
        salonName: salon.name,
        businessType: salon.type,
        country: salon.country,
        city: salon.city,
        preferredSlug: effectiveSlug,
      });

      const { dataResponse, data } = response || {};
      const returnCode = dataResponse?.returnCode;

      if (returnCode === eResultCode.CREATED || returnCode === eResultCode.SUCCESS) {
        const token = data?.accessToken || data?.token;
        if (token) AuthUtil.setToken(token);
        setCreatedSlug(data?.salon?.slug || effectiveSlug);
        setCreated(true);
      } else {
        notification.error(dataResponse?.description || 'Registration failed. Please try again.');
      }
    } catch {
      notification.error('An error occurred. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  if (created) {
    return (
      <section className="mx-auto max-w-2xl px-6 py-24 text-center">
        <p className="eyebrow">Salon created</p>
        <h1 className="mt-4 font-display text-5xl leading-[0.95] text-balance sm:text-6xl">
          Your salon website is ready.
        </h1>
        <div className="mt-8 rounded-2xl border border-line bg-surface p-6">
          <p className="break-all font-mono text-sm">
            https://avivane.com/<span className="text-brass-soft">{createdSlug}</span>
          </p>
        </div>
        <div className="mt-8 flex flex-wrap justify-center gap-3">
          <span className="rounded-full bg-primary px-7 py-3.5 text-sm font-semibold text-primary-foreground">
            Visit My Website
          </span>
          <span className="rounded-full px-7 py-3.5 text-sm font-semibold text-foreground ring-1 ring-line">
            Open Salon Dashboard
          </span>
        </div>
        <p className="mt-6 font-mono text-xs leading-relaxed text-muted-foreground">
          From here your salon ecosystem takes over — public website, dashboard and customer
          portal all live at your address.
        </p>
        <Link
          href="/"
          className="mt-8 inline-block font-mono text-xs uppercase tracking-[0.2em] text-brass-soft hover:text-brass"
        >
          Back to Avivane →
        </Link>
      </section>
    );
  }

  return (
    <section className="mx-auto max-w-xl px-6 py-16">
      <p className="eyebrow">Create your salon</p>
      <h1 className="mt-4 font-display text-5xl leading-[0.95] text-balance">
        Claim your address.
      </h1>

      <ol className="mt-8 flex gap-px overflow-hidden rounded-full bg-line">
        {stepLabels.map((label, i) => (
          <li
            key={label}
            className={`flex-1 px-4 py-2.5 text-center font-mono text-[11px] uppercase tracking-[0.16em] ${
              i === step ? 'bg-primary text-primary-foreground' : 'bg-surface text-muted-foreground'
            }`}
          >
            {`0${i + 1} ${label}`}
          </li>
        ))}
      </ol>

      {step === 0 && (
        <form
          className="mt-8 space-y-4"
          onSubmit={(e) => {
            e.preventDefault();
            if (passwordsMatch) setStep(1);
          }}
        >
          <Field
            label="Full name"
            value={account.name}
            onChange={(e) => setAccount({ ...account, name: e.target.value })}
          />
          <Field
            label="Email"
            type="email"
            value={account.email}
            onChange={(e) => setAccount({ ...account, email: e.target.value })}
          />
          <Field
            label="Phone"
            type="tel"
            value={account.phone}
            onChange={(e) => setAccount({ ...account, phone: e.target.value })}
          />
          <Field
            label="Password"
            type="password"
            value={account.password}
            onChange={(e) => setAccount({ ...account, password: e.target.value })}
          />
          <Field
            label="Confirm password"
            type="password"
            value={account.confirm}
            onChange={(e) => setAccount({ ...account, confirm: e.target.value })}
          />
          {account.confirm.length > 0 && !passwordsMatch && (
            <p className="font-mono text-xs text-destructive">
              Passwords must match and be at least 8 characters.
            </p>
          )}
          <SubmitButton>Continue</SubmitButton>
        </form>
      )}

      {step === 1 && (
        <form
          className="mt-8 space-y-4"
          onSubmit={(e) => {
            e.preventDefault();
            setSlug(slugify(salon.name));
            setStep(2);
          }}
        >
          <Field
            label="Salon name"
            placeholder="Glam Studio"
            value={salon.name}
            onChange={(e) => setSalon({ ...salon, name: e.target.value })}
          />
          <label className="block">
            <span className="font-mono text-[11px] uppercase tracking-[0.2em] text-muted-foreground">
              Business type
            </span>
            <select
              value={salon.type}
              onChange={(e) => setSalon({ ...salon, type: e.target.value })}
              className="mt-2 w-full rounded-xl bg-surface px-4 py-3 text-sm outline-none ring-1 ring-line focus:ring-2 focus:ring-brass"
            >
              {businessTypes.map((t) => (
                <option key={t}>{t}</option>
              ))}
            </select>
          </label>
          <Field
            label="Country"
            value={salon.country}
            onChange={(e) => setSalon({ ...salon, country: e.target.value })}
          />
          <Field
            label="City"
            value={salon.city}
            onChange={(e) => setSalon({ ...salon, city: e.target.value })}
          />
          <div className="flex gap-3">
            <BackButton onClick={() => setStep(0)} />
            <SubmitButton>Choose my URL</SubmitButton>
          </div>
        </form>
      )}

      {step === 2 && (
        <form
          className="mt-8 space-y-5"
          onSubmit={(e) => {
            e.preventDefault();
            handleSubmit();
          }}
        >
          <label className="block">
            <span className="font-mono text-[11px] uppercase tracking-[0.2em] text-muted-foreground">
              Your salon URL
            </span>
            <div className="mt-2 flex items-center rounded-xl bg-surface px-4 py-3 ring-1 ring-line focus-within:ring-2 focus-within:ring-brass">
              <span className="font-mono text-sm text-muted-foreground">avivane.com/</span>
              <input
                value={effectiveSlug}
                onChange={(e) => setSlug(slugify(e.target.value))}
                placeholder="your-salon-name"
                maxLength={40}
                className="w-full bg-transparent font-mono text-sm outline-none"
              />
            </div>
          </label>

          <p className={`font-mono text-xs ${available ? 'text-brass-soft' : 'text-destructive'}`}>
            {effectiveSlug.length < 3
              ? 'Pick at least 3 characters.'
              : available
                ? '✓ Available'
                : 'That address is already taken — try another.'}
          </p>

          <div className="rounded-2xl border border-line bg-surface p-5">
            <p className="font-mono text-[11px] uppercase tracking-[0.2em] text-muted-foreground">
              Generated URL
            </p>
            <p className="mt-2 break-all font-mono text-sm">
              https://avivane.com/
              <span className="text-brass-soft">{effectiveSlug || 'your-salon-name'}</span>
            </p>
          </div>

          <div className="flex gap-3">
            <BackButton onClick={() => setStep(1)} />
            <SubmitButton>{loading ? 'Creating…' : 'Create My Salon'}</SubmitButton>
          </div>
        </form>
      )}

      <p className="mt-8 text-sm text-muted-foreground">
        Already have an account?{' '}
        <Link href="/login" className="text-brass-soft hover:text-brass">
          Log in
        </Link>
      </p>
    </section>
  );
}
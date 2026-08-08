'use client';

import Link from 'next/link';
import { useSearchParams } from 'next/navigation';
import { useMemo, useState } from 'react';
import {
  Search,
  Star,
  Clock,
  Check,
  ChevronLeft,
  ChevronRight,
  CalendarPlus,
  MapPin,
  Share2,
  CreditCard,
  Wallet,
  Gift,
  Banknote,
  Smartphone,
} from 'lucide-react';
import { services, stylists, categories, salon } from '../../../../data/salon';
import { cn } from '../../../../lib/utils';
import { useSite } from '../../../../components/site/site-context';
import { usePageMeta } from '../../../../components/site/ui';

const steps = ['Service', 'Specialist', 'Date', 'Time', 'Details', 'Summary', 'Payment', 'Confirmed'];

const slotGroups = [
  { label: 'Morning', slots: ['09:00', '09:45', '10:30', '11:15'] },
  { label: 'Afternoon', slots: ['12:30', '13:15', '14:00', '15:30'] },
  { label: 'Evening', slots: ['17:00', '17:45', '18:30', '19:15'] },
];

export default function BookingPage() {
  const { slug } = useSite();
  usePageMeta(
    'Book an Appointment — Maison Lumière',
    'Book your salon appointment in eight simple steps: choose a service, specialist, date, time and pay securely.',
  );

  const searchParams = useSearchParams();
  const presetService = searchParams.get('service') ?? undefined;
  const presetStylist = searchParams.get('stylist') ?? undefined;
  const [step, setStep] = useState(presetService || presetStylist ? 1 : 0);
  const [serviceId, setServiceId] = useState<string | undefined>(presetService);
  const [stylistId, setStylistId] = useState<string | undefined>(presetStylist);
  const [query, setQuery] = useState('');
  const [cat, setCat] = useState<string>('All');
  const [date, setDate] = useState<number | null>(null);
  const [time, setTime] = useState<string | null>(null);
  const [coupon, setCoupon] = useState('');
  const [applied, setApplied] = useState(false);
  const [payment, setPayment] = useState('card');

  const service = services.find((s) => s.id === serviceId);
  const stylist = stylists.find((s) => s.id === stylistId);

  const filtered = useMemo(
    () =>
      services.filter(
        (s) =>
          (cat === 'All' || s.category === cat) &&
          (s.name.toLowerCase().includes(query.toLowerCase()) ||
            s.description.toLowerCase().includes(query.toLowerCase())),
      ),
    [cat, query],
  );

  const subtotal = service?.price ?? 0;
  const discount = applied ? Math.round(subtotal * 0.1) : 0;
  const tax = Math.round((subtotal - discount) * 0.0875);
  const total = subtotal - discount + tax;

  const canContinue = [
    Boolean(serviceId),
    Boolean(stylistId),
    date !== null,
    Boolean(time),
    true,
    true,
    true,
    true,
  ][step];

  return (
    <div className="pt-32 pb-24">
      <div className="shell">
        <div className="mx-auto max-w-3xl text-center">
          <p className="eyebrow">Booking</p>
          <h1 className="display mt-4 text-4xl md:text-6xl">Reserve your chair</h1>
          <p className="mt-4 text-sm text-muted-foreground">
            Eight short steps. You can change or cancel free of charge up to 24 hours before.
          </p>
        </div>

        {/* Stepper */}
        <div className="mx-auto mt-14 flex max-w-4xl items-center gap-1 overflow-x-auto pb-2">
          {steps.map((s, i) => (
            <div key={s} className="flex min-w-fit flex-1 items-center gap-1">
              <button
                onClick={() => i < step && setStep(i)}
                className={cn(
                  'flex items-center gap-2 rounded-full border px-3.5 py-2 text-[0.68rem] uppercase tracking-[0.16em] transition-colors',
                  i === step && 'border-gold bg-gold text-primary-foreground',
                  i < step && 'border-gold/50 text-gold',
                  i > step && 'border-border text-muted-foreground',
                )}
              >
                {i < step ? <Check className="size-3" /> : <span>{i + 1}</span>}
                {s}
              </button>
              {i < steps.length - 1 && <span className="h-px flex-1 bg-border" />}
            </div>
          ))}
        </div>

        <div className="mx-auto mt-14 max-w-4xl">
          {step === 0 && (
            <div className="reveal">
              <div className="flex flex-wrap items-center gap-4">
                <label className="flex min-w-60 flex-1 items-center gap-3 border-b border-border pb-2">
                  <Search className="size-4 text-muted-foreground" />
                  <input
                    value={query}
                    onChange={(e) => setQuery(e.target.value.slice(0, 60))}
                    placeholder="Search services"
                    className="w-full bg-transparent text-sm outline-none placeholder:text-muted-foreground"
                  />
                </label>
              </div>
              <div className="mt-6 flex flex-wrap gap-2">
                {categories.map((c) => (
                  <button
                    key={c}
                    onClick={() => setCat(c)}
                    className={cn(
                      'rounded-full border px-4 py-1.5 text-xs uppercase tracking-[0.16em] transition-colors',
                      cat === c ? 'border-gold bg-gold text-primary-foreground' : 'border-border hover:border-gold',
                    )}
                  >
                    {c}
                  </button>
                ))}
              </div>
              <div className="mt-8 grid gap-4 sm:grid-cols-2">
                {filtered.map((s) => (
                  <button
                    key={s.id}
                    onClick={() => setServiceId(s.id)}
                    className={cn(
                      'surface-card flex items-center gap-4 p-4 text-left transition-colors',
                      serviceId === s.id && 'ring-1 ring-gold',
                    )}
                  >
                    <img src={s.image} alt="" loading="lazy" className="size-20 shrink-0 rounded-xl object-cover" />
                    <span className="min-w-0">
                      <span className="display block truncate text-xl">{s.name}</span>
                      <span className="mt-1 block text-xs text-muted-foreground">
                        {s.duration} min · ${s.price}
                      </span>
                      {s.popular && (
                        <span className="mt-2 inline-block text-[0.6rem] uppercase tracking-[0.2em] text-gold">
                          Popular
                        </span>
                      )}
                    </span>
                  </button>
                ))}
              </div>
              {filtered.length === 0 && (
                <p className="mt-10 text-center text-sm text-muted-foreground">No services match that search.</p>
              )}
            </div>
          )}

          {step === 1 && (
            <div className="reveal grid gap-4 sm:grid-cols-2">
              {stylists.map((s) => (
                <button
                  key={s.id}
                  onClick={() => setStylistId(s.id)}
                  className={cn(
                    'surface-card flex items-center gap-4 p-5 text-left',
                    stylistId === s.id && 'ring-1 ring-gold',
                  )}
                >
                  <img src={s.image} alt="" loading="lazy" className="size-20 shrink-0 rounded-full object-cover" />
                  <span className="min-w-0">
                    <span className="display block truncate text-xl">{s.name}</span>
                    <span className="block text-xs uppercase tracking-[0.16em] text-muted-foreground">{s.role}</span>
                    <span className="mt-2 flex items-center gap-3 text-xs text-muted-foreground">
                      <span className="flex items-center gap-1 text-gold">
                        <Star className="size-3 fill-gold" /> {s.rating.toFixed(1)}
                      </span>
                      {s.experience}
                    </span>
                  </span>
                </button>
              ))}
            </div>
          )}

          {step === 2 && (
            <div className="reveal surface-card p-8">
              <div className="flex items-center justify-between">
                <button className="grid size-9 place-items-center rounded-full border border-border" aria-label="Previous month">
                  <ChevronLeft className="size-4" />
                </button>
                <p className="display text-2xl">August 2026</p>
                <button className="grid size-9 place-items-center rounded-full border border-border" aria-label="Next month">
                  <ChevronRight className="size-4" />
                </button>
              </div>
              <div className="mt-8 grid grid-cols-7 gap-2 text-center text-[0.65rem] uppercase tracking-[0.15em] text-muted-foreground">
                {['M', 'T', 'W', 'T', 'F', 'S', 'S'].map((d, i) => (
                  <span key={i}>{d}</span>
                ))}
              </div>
              <div className="mt-3 grid grid-cols-7 gap-2">
                {Array.from({ length: 31 }).map((_, i) => {
                  const day = i + 1;
                  const closed = day % 7 === 0;
                  const busy = day % 5 === 0;
                  return (
                    <button
                      key={day}
                      disabled={closed}
                      onClick={() => setDate(day)}
                      className={cn(
                        'relative rounded-xl border py-3 text-sm transition-colors',
                        closed && 'cursor-not-allowed border-transparent text-muted-foreground/35',
                        !closed && date === day && 'border-gold bg-gold text-primary-foreground',
                        !closed && date !== day && 'border-border hover:border-gold',
                      )}
                    >
                      {day}
                      {!closed && date !== day && (
                        <span
                          className={cn(
                            'absolute inset-x-0 bottom-1.5 mx-auto size-1 rounded-full',
                            busy ? 'bg-rose' : 'bg-emerald',
                          )}
                        />
                      )}
                    </button>
                  );
                })}
              </div>
              <div className="mt-6 flex flex-wrap gap-6 text-xs text-muted-foreground">
                <span className="flex items-center gap-2">
                  <span className="size-1.5 rounded-full bg-emerald" /> Good availability
                </span>
                <span className="flex items-center gap-2">
                  <span className="size-1.5 rounded-full bg-rose" /> Limited
                </span>
                <span className="flex items-center gap-2">
                  <span className="size-1.5 rounded-full bg-muted-foreground/40" /> Closed
                </span>
              </div>
            </div>
          )}

          {step === 3 && (
            <div className="reveal space-y-8">
              {slotGroups.map((g) => (
                <div key={g.label}>
                  <p className="eyebrow">{g.label}</p>
                  <div className="mt-4 grid grid-cols-2 gap-3 sm:grid-cols-4">
                    {g.slots.map((s, i) => (
                      <button
                        key={s}
                        onClick={() => setTime(s)}
                        className={cn(
                          'rounded-full border py-3 text-sm transition-colors',
                          time === s ? 'border-gold bg-gold text-primary-foreground' : 'border-border hover:border-gold',
                        )}
                      >
                        {s}
                        {i === 1 && time !== s && (
                          <span className="ml-2 text-[0.6rem] uppercase tracking-[0.15em] text-gold">Best</span>
                        )}
                      </button>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          )}

          {step === 4 && (
            <div className="reveal surface-card mx-auto max-w-lg p-8">
              <h2 className="display text-3xl">Your details</h2>
              <p className="mt-2 text-sm text-muted-foreground">Sign in, or continue as a guest.</p>
              <div className="mt-7 grid gap-3 sm:grid-cols-2">
                {['Continue with Google', 'Continue with Apple'].map((p) => (
                  <button
                    key={p}
                    className="rounded-full border border-border py-3 text-xs uppercase tracking-[0.16em] hover:border-gold"
                  >
                    {p}
                  </button>
                ))}
              </div>
              <div className="my-7 flex items-center gap-4 text-[0.65rem] uppercase tracking-[0.2em] text-muted-foreground">
                <span className="h-px flex-1 bg-border" /> or <span className="h-px flex-1 bg-border" />
              </div>
              <div className="space-y-5">
                {[
                  { id: 'full-name', label: 'Full name', type: 'text' },
                  { id: 'email', label: 'Email', type: 'email' },
                  { id: 'phone', label: 'Mobile (for OTP)', type: 'tel' },
                ].map((f) => (
                  <div key={f.id}>
                    <label htmlFor={f.id} className="eyebrow">
                      {f.label}
                    </label>
                    <input
                      id={f.id}
                      type={f.type}
                      maxLength={255}
                      className="mt-2 w-full border-b border-border bg-transparent pb-2 text-sm outline-none focus:border-gold"
                    />
                  </div>
                ))}
              </div>
              <p className="mt-6 text-xs text-muted-foreground">
                We&apos;ll text a one-time code to confirm your booking.{' '}
                <button className="text-gold">Forgot password?</button>
              </p>
            </div>
          )}

          {step === 5 && (
            <div className="reveal surface-card mx-auto max-w-lg p-8">
              <h2 className="display text-3xl">Booking summary</h2>
              <dl className="mt-7 space-y-4 text-sm">
                <Row label="Service" value={service?.name ?? '—'} />
                <Row label="Specialist" value={stylist?.name ?? 'Any available'} />
                <Row label="Date" value={date ? `${date} August 2026` : '—'} />
                <Row label="Time" value={time ?? '—'} />
                <Row label="Duration" value={service ? `${service.duration} min` : '—'} />
              </dl>

              <div className="mt-7 flex items-center gap-2 border-b border-border pb-2">
                <input
                  value={coupon}
                  onChange={(e) => setCoupon(e.target.value.slice(0, 20))}
                  placeholder="Coupon or membership code"
                  className="w-full bg-transparent text-sm outline-none placeholder:text-muted-foreground"
                />
                <button
                  onClick={() => setApplied(coupon.trim().length > 2)}
                  className="text-xs uppercase tracking-[0.16em] text-gold"
                >
                  Apply
                </button>
              </div>
              {applied && <p className="mt-2 text-xs text-emerald">Member discount applied — 10% off.</p>}

              <div className="gold-rule mt-7" />
              <dl className="mt-5 space-y-3 text-sm">
                <Row label="Subtotal" value={`$${subtotal}`} />
                <Row label="Discount" value={`-$${discount}`} />
                <Row label="Tax (8.75%)" value={`$${tax}`} />
              </dl>
              <div className="mt-5 flex items-end justify-between">
                <span className="eyebrow">Total</span>
                <span className="display text-4xl">${total}</span>
              </div>
            </div>
          )}

          {step === 6 && (
            <div className="reveal surface-card mx-auto max-w-lg p-8">
              <h2 className="display text-3xl">Payment</h2>
              <p className="mt-2 text-sm text-muted-foreground">Secured checkout. Nothing is charged until you confirm.</p>
              <div className="mt-7 space-y-3">
                {[
                  { id: 'card', label: 'Card', icon: CreditCard },
                  { id: 'upi', label: 'UPI', icon: Smartphone },
                  { id: 'wallet', label: 'Wallet', icon: Wallet },
                  { id: 'gift', label: 'Gift card', icon: Gift },
                  { id: 'cash', label: 'Pay at the salon', icon: Banknote },
                ].map((p) => (
                  <button
                    key={p.id}
                    onClick={() => setPayment(p.id)}
                    className={cn(
                      'flex w-full items-center gap-4 rounded-2xl border px-5 py-4 text-left text-sm transition-colors',
                      payment === p.id ? 'border-gold' : 'border-border hover:border-gold/50',
                    )}
                  >
                    <p.icon className="size-4 text-gold" />
                    {p.label}
                    {payment === p.id && <Check className="ml-auto size-4 text-gold" />}
                  </button>
                ))}
              </div>
              {payment === 'card' && (
                <div className="mt-7 space-y-5">
                  {['Card number', 'Name on card'].map((l) => (
                    <div key={l}>
                      <label className="eyebrow" htmlFor={l}>
                        {l}
                      </label>
                      <input
                        id={l}
                        maxLength={40}
                        className="mt-2 w-full border-b border-border bg-transparent pb-2 text-sm outline-none focus:border-gold"
                      />
                    </div>
                  ))}
                </div>
              )}
              <p className="mt-8 flex items-center justify-between text-sm">
                <span className="eyebrow">Amount due</span>
                <span className="display text-3xl">${total}</span>
              </p>
            </div>
          )}

          {step === 7 && (
            <div className="reveal surface-card mx-auto max-w-lg p-10 text-center">
              <span className="mx-auto grid size-20 place-items-center rounded-full bg-[var(--gradient-gold)] text-primary-foreground">
                <Check className="size-8" />
              </span>
              <h2 className="display mt-7 text-4xl">You&apos;re booked</h2>
              <p className="mt-3 text-sm text-muted-foreground">
                A confirmation is on its way to your inbox. We look forward to seeing you.
              </p>
              <dl className="mt-8 space-y-4 text-left text-sm">
                <Row label="Service" value={service?.name ?? '—'} />
                <Row label="Specialist" value={stylist?.name ?? 'Any available'} />
                <Row label="When" value={`${date ?? '—'} August 2026 · ${time ?? '—'}`} />
                <Row label="Where" value={salon.address} />
                <Row label="Paid" value={`$${total}`} />
              </dl>
              <div className="mt-8 grid gap-3 sm:grid-cols-3">
                {[
                  { icon: CalendarPlus, label: 'Add to calendar' },
                  { icon: MapPin, label: 'Directions' },
                  { icon: Share2, label: 'Share' },
                ].map((a) => (
                  <button
                    key={a.label}
                    className="flex items-center justify-center gap-2 rounded-full border border-border py-3 text-[0.68rem] uppercase tracking-[0.16em] hover:border-gold hover:text-gold"
                  >
                    <a.icon className="size-4" /> {a.label}
                  </button>
                ))}
              </div>
              <div className="mt-8 flex flex-wrap justify-center gap-3">
                <button
                  onClick={() => {
                    setStep(0);
                    setServiceId(undefined);
                    setStylistId(undefined);
                    setDate(null);
                    setTime(null);
                  }}
                  className="rounded-full bg-primary px-6 py-3.5 text-xs uppercase tracking-[0.2em] text-primary-foreground"
                >
                  Book another
                </button>
                <Link
                  href={`/${slug}`}
                  className="rounded-full border border-border px-6 py-3.5 text-xs uppercase tracking-[0.2em]"
                >
                  Back home
                </Link>
              </div>
            </div>
          )}

          {step < 7 && (
            <div className="mt-12 flex items-center justify-between gap-4">
              <button
                onClick={() => setStep((s) => Math.max(0, s - 1))}
                disabled={step === 0}
                className="inline-flex items-center gap-2 rounded-full border border-border px-6 py-3.5 text-xs uppercase tracking-[0.2em] disabled:opacity-40"
              >
                <ChevronLeft className="size-4" /> Back
              </button>
              <div className="hidden items-center gap-4 text-xs text-muted-foreground sm:flex">
                {service && (
                  <span className="flex items-center gap-2">
                    <Clock className="size-3.5" /> {service.duration} min · ${service.price}
                  </span>
                )}
              </div>
              <button
                onClick={() => setStep((s) => Math.min(7, s + 1))}
                disabled={!canContinue}
                className="inline-flex items-center gap-2 rounded-full bg-primary px-7 py-3.5 text-xs uppercase tracking-[0.2em] text-primary-foreground transition-transform hover:-translate-y-0.5 disabled:cursor-not-allowed disabled:opacity-40"
              >
                {step === 6 ? 'Confirm booking' : 'Continue'} <ChevronRight className="size-4" />
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

function Row({ label, value }: { label: string; value: string }) {
  return (
    <div className="flex items-start justify-between gap-6">
      <dt className="text-muted-foreground">{label}</dt>
      <dd className="text-right">{value}</dd>
    </div>
  );
}

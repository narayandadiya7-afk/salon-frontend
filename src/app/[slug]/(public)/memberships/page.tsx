'use client';

import Link from 'next/link';
import { useState } from 'react';
import { Check, Minus } from 'lucide-react';
import { PageHero, SectionHead, usePageMeta } from '../../../../components/site/ui';
import { memberships } from '../../../../data/salon';
import { useSite } from '../../../../components/site/site-context';

const compare = [
  { feature: 'Monthly signature services', values: ['1', '2', '4'] },
  { feature: 'Discount on services & retail', values: ['10%', '15%', '20%'] },
  { feature: 'Priority booking window', values: ['Weekdays', 'All week', 'Concierge'] },
  { feature: 'Loyalty points', values: ['1x', '2x', '3x'] },
  { feature: 'Complimentary blow-dry', values: [false, true, true] },
  { feature: 'After-hours private suite', values: [false, false, true] },
  { feature: 'Guest passes', values: [false, false, true] },
];

export default function MembershipsPage() {
  const { slug } = useSite();
  usePageMeta(
    'Memberships — Maison Lumière',
    'Monthly and annual salon memberships with priority booking, loyalty points and up to 20% off every service.',
  );

  const [annual, setAnnual] = useState(false);

  return (
    <>
      <PageHero
        eyebrow="Memberships"
        title="Membership, the quiet luxury of never waiting"
        copy="Choose a rhythm that suits you. Cancel or change tier any time — unused credits roll over for 60 days."
      />

      <section className="shell pb-16">
        <div className="mx-auto flex w-fit items-center gap-1 rounded-full border border-border p-1">
          {[
            { label: 'Monthly', v: false },
            { label: 'Annual · save 2 months', v: true },
          ].map((o) => (
            <button
              key={o.label}
              onClick={() => setAnnual(o.v)}
              className={`rounded-full px-6 py-2.5 text-xs uppercase tracking-[0.18em] transition-colors ${
                annual === o.v ? 'bg-primary text-primary-foreground' : 'text-muted-foreground'
              }`}
            >
              {o.label}
            </button>
          ))}
        </div>

        <div className="mt-14 grid gap-6 lg:grid-cols-3">
          {memberships.map((m) => (
            <article key={m.id} className={`surface-card lift p-8 ${m.featured ? 'ring-1 ring-gold' : ''}`}>
              {m.featured && (
                <span className="mb-4 inline-block rounded-full bg-gold px-3 py-1 text-[0.6rem] uppercase tracking-[0.2em] text-primary-foreground">
                  Most chosen
                </span>
              )}
              <h2 className="display text-3xl">{m.name}</h2>
              <p className="mt-2 text-sm text-muted-foreground">{m.description}</p>
              <p className="display mt-6 text-5xl">
                ${annual ? m.annual : m.monthly}
                <span className="text-base text-muted-foreground">{annual ? ' /year' : ' /month'}</span>
              </p>
              <ul className="mt-7 space-y-3 text-sm text-muted-foreground">
                {m.perks.map((p) => (
                  <li key={p} className="flex gap-3">
                    <Check className="size-4 shrink-0 text-gold" />
                    {p}
                  </li>
                ))}
              </ul>
              <Link
                href={`/${slug}/book`}
                className={`mt-8 block rounded-full px-6 py-3.5 text-center text-xs uppercase tracking-[0.2em] transition-transform hover:-translate-y-0.5 ${
                  m.featured ? 'bg-primary text-primary-foreground' : 'border border-border'
                }`}
              >
                Join {m.name}
              </Link>
            </article>
          ))}
        </div>
      </section>

      <section className="section bg-secondary/40">
        <div className="shell">
          <SectionHead eyebrow="Compare" title="Every benefit, side by side" align="center" />
          <div className="mt-12 overflow-x-auto">
            <table className="w-full min-w-160 border-collapse text-sm">
              <thead>
                <tr className="border-b border-border">
                  <th className="py-5 text-left font-normal text-muted-foreground">Benefit</th>
                  {memberships.map((m) => (
                    <th key={m.id} className="display py-5 text-2xl font-normal">
                      {m.name}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {compare.map((row) => (
                  <tr key={row.feature} className="border-b border-border/60">
                    <td className="py-5 text-muted-foreground">{row.feature}</td>
                    {row.values.map((v, i) => (
                      <td key={i} className="py-5 text-center">
                        {typeof v === 'boolean' ? (
                          v ? (
                            <Check className="mx-auto size-4 text-gold" />
                          ) : (
                            <Minus className="mx-auto size-4 text-muted-foreground/50" />
                          )
                        ) : (
                          v
                        )}
                      </td>
                    ))}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </section>
    </>
  );
}

'use client';

import { Heart } from 'lucide-react';
import { Avatar, AvatarFallback } from '@/components/owner/customer-portal/avatar';
import { PageHeader } from '@/components/owner/customer-portal/PageHeader';
import { ServiceCard } from '@/components/owner/customer-portal/ServiceCard';
import { customer, services, stylists } from '@/data/customer-portal';

export default function FavoritesPage() {
  const favServices = services.filter((s) => customer.preferredServices.includes(s.name));
  return (
    <div className="space-y-8">
      <PageHeader title="Favorites" subtitle="The services and stylists you keep coming back to." />

      <section className="space-y-4">
        <h2 className="flex items-center gap-2 font-display text-2xl"><Heart className="size-5 text-gold" /> Saved services</h2>
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {favServices.map((s) => <ServiceCard key={s.id} service={s} ctaLabel="Book again" />)}
        </div>
      </section>

      <section className="space-y-4">
        <h2 className="font-display text-2xl">Preferred stylists</h2>
        <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
          {stylists.map((st) => (
            <div key={st.id} className="surface flex items-center gap-3 p-4">
              <Avatar className="size-10 border border-gold/40">
                <AvatarFallback className="bg-accent text-sm text-accent-foreground">{st.initials}</AvatarFallback>
              </Avatar>
              <div>
                <p className="text-sm font-medium">{st.name}</p>
                <p className="text-xs text-muted-foreground">{st.role} · {st.rating}★</p>
              </div>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}
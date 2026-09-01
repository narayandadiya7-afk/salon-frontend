'use client';

import { useState } from 'react';
import {
  CalendarDays,
  Check,
  Clock,
  Filter,
  Mail,
  MoreHorizontal,
  Phone,
  Plus,
  Search,
  Star,
  Users,
  Wallet,
} from 'lucide-react';
import {
  EmptyState,
  Guard,
  PageHeader,
  SectionCard,
  StatCard,
  StatusChip,
  Surface,
} from '@/components/owner/owner-portal/primitives';
import { Button } from '@/components/owner/owner-portal/button';
import { Input } from '@/components/owner/owner-portal/input';
import { Avatar, AvatarFallback } from '@/components/owner/owner-portal/avatar';
import { Progress } from '@/components/owner/owner-portal/progress';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/owner/owner-portal/tabs';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/owner/owner-portal/dropdown-menu';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from '@/components/owner/owner-portal/dialog';
import { useSession } from '@/lib/portal/session';
import { toast } from 'sonner';
import { cn } from '@/lib/utils';

interface StaffMember {
  id: number;
  name: string;
  role: string;
  rating: number;
  bookings: number;
  revenue: number;
  utilization: number;
  status: 'Active' | 'Offline';
  initials: string;
  color: string;
  phone: string;
  email: string;
  specialty: string;
  reviews: number;
}

const staffMembers: StaffMember[] = [
  { id: 1, name: 'Ananya Sharma', role: 'Senior Stylist', rating: 4.9, bookings: 45, revenue: 67500, utilization: 85, status: 'Active', initials: 'AS', color: 'var(--gold)', phone: '+91 98765 43210', email: 'ananya@salon.com', specialty: 'Haircut & Styling', reviews: 128 },
  { id: 2, name: 'Rahul Verma', role: 'Master Barber', rating: 4.7, bookings: 38, revenue: 45600, utilization: 72, status: 'Active', initials: 'RV', color: 'var(--royal)', phone: '+91 98765 43211', email: 'rahul@salon.com', specialty: 'Beard & Shave', reviews: 96 },
  { id: 3, name: 'Priya Patel', role: 'Esthetician', rating: 4.8, bookings: 32, revenue: 51200, utilization: 68, status: 'Active', initials: 'PP', color: 'var(--azure)', phone: '+91 98765 43212', email: 'priya@salon.com', specialty: 'Facial Treatments', reviews: 84 },
  { id: 4, name: 'Vikram Singh', role: 'Colorist', rating: 4.6, bookings: 28, revenue: 50400, utilization: 60, status: 'Active', initials: 'VS', color: 'var(--emerald)', phone: '+91 98765 43213', email: 'vikram@salon.com', specialty: 'Hair Coloring', reviews: 72 },
  { id: 5, name: 'Meera Kapoor', role: 'Nail Technician', rating: 4.9, bookings: 24, revenue: 28800, utilization: 55, status: 'Offline', initials: 'MK', color: 'var(--gold)', phone: '+91 98765 43214', email: 'meera@salon.com', specialty: 'Manicure & Pedicure', reviews: 62 },
  { id: 6, name: 'Amit Joshi', role: 'Massage Therapist', rating: 4.5, bookings: 18, revenue: 32400, utilization: 45, status: 'Active', initials: 'AJ', color: 'var(--royal)', phone: '+91 98765 43215', email: 'amit@salon.com', specialty: 'Massage Therapy', reviews: 48 },
  { id: 7, name: 'Neha Gupta', role: 'Hair Stylist', rating: 4.7, bookings: 35, revenue: 45500, utilization: 78, status: 'Active', initials: 'NG', color: 'var(--emerald)', phone: '+91 98765 43216', email: 'neha@salon.com', specialty: 'Blow-dry & Styling', reviews: 92 },
  { id: 8, name: 'Raj Khanna', role: 'Barber', rating: 4.4, bookings: 15, revenue: 18000, utilization: 38, status: 'Active', initials: 'RK', color: 'var(--azure)', phone: '+91 98765 43217', email: 'raj@salon.com', specialty: 'Classic Cuts', reviews: 36 },
];

function getUtilizationColor(val: number) {
  if (val >= 80) return 'text-emerald';
  if (val >= 60) return 'text-gold';
  return 'text-royal';
}

function StaffContent() {
  const { can } = useSession();
  const [query, setQuery] = useState('');
  const [tab, setTab] = useState('all');
  const [selected, setSelected] = useState<StaffMember | null>(null);

  const avgRating = (staffMembers.reduce((s, m) => s + m.rating, 0) / staffMembers.length).toFixed(1);
  const activeCount = staffMembers.filter((s) => s.status === 'Active').length;

  const filtered = staffMembers.filter((s) => {
    const matchSearch = s.name.toLowerCase().includes(query.toLowerCase()) || s.role.toLowerCase().includes(query.toLowerCase());
    if (tab === 'active') return matchSearch && s.status === 'Active';
    if (tab === 'offline') return matchSearch && s.status === 'Offline';
    return matchSearch;
  });

  return (
    <div className="space-y-6">
      <PageHeader
        eyebrow="Team"
        title="Staff Management"
        description="Manage your team, schedules, and performance."
        actions={
          can('staff', 'create') && (
            <Button variant="gold" onClick={() => toast.success('Add staff drawer opened')}>
              <Plus className="size-4" /> Add Staff Member
            </Button>
          )
        }
      />

      <section className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
        <StatCard label="Active Staff" value={String(activeCount)} hint={`${staffMembers.length} total`} icon={Users} tone="gold" />
        <StatCard label="On Shift Now" value="6" hint="3 on break" icon={Clock} tone="royal" />
        <StatCard label="Avg. Utilisation" value="65%" delta="+3.2%" icon={Wallet} tone="azure" />
        <StatCard label="Avg. Rating" value={`${avgRating}★`} hint="All team" icon={Star} tone="emerald" />
      </section>

      <Surface className="overflow-hidden">
        <div className="border-b border-border px-5 py-4">
          <div className="grid grid-cols-1 gap-3 md:grid-cols-[auto_minmax(0,1fr)] md:items-center">
            <Tabs value={tab} onValueChange={setTab}>
              <TabsList>
                <TabsTrigger value="all">All Staff</TabsTrigger>
                <TabsTrigger value="active">Active</TabsTrigger>
                <TabsTrigger value="offline">Offline</TabsTrigger>
              </TabsList>
            </Tabs>
            <div className="relative md:ml-auto md:w-64">
              <Search className="pointer-events-none absolute left-3 top-1/2 size-4 -translate-y-1/2 text-muted-foreground" />
              <Input
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder="Search staff…"
                className="pl-9"
                aria-label="Search staff"
              />
            </div>
          </div>
        </div>

        <div className="p-5">
          <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
            {filtered.map((s) => (
              <button
                key={s.id}
                onClick={() => setSelected(s)}
                className="rounded-xl border border-border bg-card p-5 text-left transition-all hover:shadow-[var(--shadow-lifted)]"
              >
                <div className="flex items-start justify-between">
                  <Avatar className="size-12">
                    <AvatarFallback className="text-sm font-bold" style={{ background: `color-mix(in srgb, ${s.color} 20%, transparent)`, color: s.color }}>
                      {s.initials}
                    </AvatarFallback>
                  </Avatar>
                  <span className={cn('inline-flex items-center gap-1.5 rounded-full px-2 py-0.5 text-[0.65rem] font-semibold', s.status === 'Active' ? 'bg-emerald-soft text-emerald' : 'bg-muted text-muted-foreground')}>
                    <span className="size-1.5 rounded-full bg-current" />
                    {s.status}
                  </span>
                </div>
                <p className="mt-3 text-sm font-semibold">{s.name}</p>
                <p className="text-xs text-muted-foreground">{s.role}</p>
                <div className="mt-2 flex items-center gap-1 text-xs text-muted-foreground">
                  <Star className="size-3 text-gold fill-current" /> {s.rating} <span className="text-muted-foreground/60">({s.reviews})</span>
                </div>
                <div className="mt-3 flex items-center justify-between text-xs">
                  <span className="text-muted-foreground">Bookings</span>
                  <span className="font-semibold">{s.bookings}</span>
                </div>
                <div className="mt-1 flex items-center justify-between text-xs">
                  <span className="text-muted-foreground">Revenue</span>
                  <span className="font-semibold text-emerald">£{s.revenue.toLocaleString()}</span>
                </div>
                <div className="mt-2">
                  <div className="flex items-center justify-between text-[0.65rem]">
                    <span className="text-muted-foreground">Utilisation</span>
                    <span className={cn('font-semibold', getUtilizationColor(s.utilization))}>{s.utilization}%</span>
                  </div>
                  <Progress value={s.utilization} className="mt-1 h-1.5" />
                </div>
              </button>
            ))}
          </div>
          {filtered.length === 0 && (
            <EmptyState icon={Users} title="No staff found" description="Try adjusting your search or filter." />
          )}
        </div>
      </Surface>

      <SectionCard title="Performance Overview" description="Revenue & rating by staff member" bodyClassName="p-0">
        <div className="overflow-x-auto">
          <table className="w-full min-w-[700px] text-sm">
            <thead>
              <tr className="border-b border-border bg-muted/40 text-left text-xs uppercase tracking-wider text-muted-foreground">
                <th scope="col" className="px-5 py-3 font-semibold">Staff</th>
                <th scope="col" className="px-3 py-3 font-semibold">Role</th>
                <th scope="col" className="px-3 py-3 text-center font-semibold">Bookings</th>
                <th scope="col" className="px-3 py-3 text-center font-semibold">Revenue</th>
                <th scope="col" className="px-3 py-3 text-center font-semibold">Rating</th>
                <th scope="col" className="px-3 py-3 text-center font-semibold">Status</th>
                <th scope="col" className="px-3 py-3 text-center font-semibold">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-border">
              {filtered.map((s) => (
                <tr key={s.id} className="hover:bg-muted/30">
                  <td className="px-5 py-3.5">
                    <div className="flex items-center gap-3">
                      <Avatar className="size-8 shrink-0">
                        <AvatarFallback className="text-[0.6rem] font-bold" style={{ background: `color-mix(in srgb, ${s.color} 20%, transparent)`, color: s.color }}>
                          {s.initials}
                        </AvatarFallback>
                      </Avatar>
                      <div>
                        <p className="font-medium">{s.name}</p>
                        <p className="text-xs text-muted-foreground">{s.specialty}</p>
                      </div>
                    </div>
                  </td>
                  <td className="px-3 py-3.5 text-muted-foreground">{s.role}</td>
                  <td className="px-3 py-3.5 text-center font-semibold tabular-nums">{s.bookings}</td>
                  <td className="px-3 py-3.5 text-center font-semibold tabular-nums text-emerald">£{s.revenue.toLocaleString()}</td>
                  <td className="px-3 py-3.5 text-center">
                    <span className="inline-flex items-center gap-1 font-semibold tabular-nums">
                      <Star className="size-3 text-gold fill-current" /> {s.rating}
                    </span>
                  </td>
                  <td className="px-3 py-3.5 text-center">
                    <span className={cn('inline-flex items-center gap-1.5 rounded-full px-2 py-0.5 text-xs font-semibold', s.status === 'Active' ? 'bg-emerald-soft text-emerald' : 'bg-muted text-muted-foreground')}>
                      <span className="size-1.5 rounded-full bg-current" />
                      {s.status}
                    </span>
                  </td>
                  <td className="px-3 py-3.5 text-center">
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <Button variant="ghost" size="icon" className="size-8">
                          <MoreHorizontal className="size-4" />
                        </Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent align="end">
                        <DropdownMenuItem onClick={() => setSelected(s)}>View Profile</DropdownMenuItem>
                        <DropdownMenuItem onClick={() => toast.success('Schedule opened')}>Manage Schedule</DropdownMenuItem>
                        <DropdownMenuItem onClick={() => toast.success('Commission opened')}>Commission Settings</DropdownMenuItem>
                        <DropdownMenuSeparator />
                        <DropdownMenuItem onClick={() => toast(s.status === 'Active' ? 'Set offline' : 'Set active')}>
                          {s.status === 'Active' ? 'Set Offline' : 'Set Active'}
                        </DropdownMenuItem>
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </SectionCard>

      <Dialog open={!!selected} onOpenChange={(o) => !o && setSelected(null)}>
        <DialogContent className="sm:max-w-md">
          {selected && (
            <>
              <DialogHeader>
                <div className="flex items-center gap-3">
                  <Avatar className="size-12">
                    <AvatarFallback className="text-sm font-bold" style={{ background: `color-mix(in srgb, ${selected.color} 20%, transparent)`, color: selected.color }}>
                      {selected.initials}
                    </AvatarFallback>
                  </Avatar>
                  <div>
                    <DialogTitle className="text-base">{selected.name}</DialogTitle>
                    <p className="text-xs text-muted-foreground">{selected.role}</p>
                  </div>
                </div>
              </DialogHeader>

              <div className="space-y-4 pt-2">
                <div className="grid grid-cols-3 gap-3 text-center">
                  <Surface className="p-3">
                    <p className="text-[0.65rem] text-muted-foreground">Bookings</p>
                    <p className="text-xl font-semibold">{selected.bookings}</p>
                  </Surface>
                  <Surface className="p-3">
                    <p className="text-[0.65rem] text-muted-foreground">Revenue</p>
                    <p className="text-xl font-semibold text-emerald">£{(selected.revenue / 1000).toFixed(1)}k</p>
                  </Surface>
                  <Surface className="p-3">
                    <p className="text-[0.65rem] text-muted-foreground">Rating</p>
                    <p className="text-xl font-semibold">{selected.rating}</p>
                  </Surface>
                </div>

                <div className="space-y-2 text-sm">
                  <div className="flex items-center gap-2 text-muted-foreground"><Phone className="size-4" /> {selected.phone}</div>
                  <div className="flex items-center gap-2 text-muted-foreground"><Mail className="size-4" /> {selected.email}</div>
                  <div className="flex items-center gap-2 text-muted-foreground"><Star className="size-4" /> {selected.specialty} · {selected.reviews} reviews</div>
                </div>

                <div>
                  <div className="flex items-center justify-between text-xs">
                    <span className="text-muted-foreground">Utilisation Rate</span>
                    <span className={cn('font-semibold', getUtilizationColor(selected.utilization))}>{selected.utilization}%</span>
                  </div>
                  <Progress value={selected.utilization} className="mt-1.5 h-2" />
                </div>

                <div className="flex gap-2">
                  <Button variant="gold" className="flex-1" onClick={() => toast.success('Schedule opened')}>
                    <CalendarDays className="size-4" /> Manage Schedule
                  </Button>
                  <Button variant="outline" onClick={() => toast('Settings opened')}>
                    Settings
                  </Button>
                </div>
              </div>
            </>
          )}
        </DialogContent>
      </Dialog>
    </div>
  );
}

export default function StaffManagementPage() {
  return (
    <Guard module="staff" name="Staff Management">
      <StaffContent />
    </Guard>
  );
}

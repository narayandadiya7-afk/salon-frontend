'use client';

import { Clock, Gauge, Users, Wallet } from 'lucide-react';
import { ModulePage } from '@/components/owner/owner-portal/ModulePage';

export default function StaffPage() {
  return (
    <ModulePage
      module="staff"
      name="Staff"
      eyebrow="Team"
      title="Staff management"
      description="Directory, shifts, leave, commission and performance for every team member."
      primaryAction="Add team member"
      stats={[
        { label: 'Team members', value: '24', delta: '+2', icon: Users, tone: 'gold' },
        { label: 'On shift now', value: '11', hint: '3 on break', icon: Clock, tone: 'royal' },
        { label: 'Avg utilisation', value: '81%', delta: '+3.2%', icon: Gauge, tone: 'azure' },
        { label: 'Commission due', value: '£14,146', hint: 'Payable Friday', icon: Wallet, tone: 'emerald' },
      ]}
      panels={[
        {
          title: 'Directory',
          description: 'Roles, shifts and status',
          rows: [
            { primary: 'Ivy Marchetti', secondary: 'Senior Colourist · 09:00 – 18:00', chip: { label: 'On shift', tone: 'emerald' } },
            { primary: 'Marco Rossi', secondary: 'Master Barber · 10:00 – 19:00', chip: { label: 'On shift', tone: 'emerald' } },
            { primary: 'Leila Haddad', secondary: 'Colour Specialist · 09:30 – 18:30', chip: { label: 'Break', tone: 'gold' } },
            { primary: 'Tomas Vega', secondary: 'Nail Artist · 11:00 – 20:00', chip: { label: 'On shift', tone: 'emerald' } },
            { primary: 'Priya Raman', secondary: 'Salon Manager', chip: { label: 'Off today', tone: 'neutral' } },
            { primary: 'Dan Okafor', secondary: 'Accountant', chip: { label: 'Leave', tone: 'warning' } },
          ],
        },
        {
          title: 'Performance',
          description: 'Revenue this month',
          rows: [
            { primary: 'Ivy Marchetti', secondary: '4.9 rating · 92% utilisation', value: '£18,400' },
            { primary: 'Marco Rossi', secondary: '4.8 rating · 88% utilisation', value: '£16,250' },
            { primary: 'Leila Haddad', secondary: '4.9 rating · 84% utilisation', value: '£14,980' },
            { primary: 'Tomas Vega', secondary: '4.6 rating · 71% utilisation', value: '£11,240' },
            { primary: 'Reina Cho', secondary: '4.7 rating · 66% utilisation', value: '£9,860' },
          ],
        },
      ]}
      features={['Availability', 'Shift schedule', 'Leave management', 'Attendance', 'Payroll summary', 'Documents', 'Certificates', 'Role assignment']}
    />
  );
}

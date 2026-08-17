'use client';

import { Crown, MailOpen, Megaphone, TrendingUp } from 'lucide-react';
import { ModulePage } from '@/components/portal/ModulePage';

export default function MarketingPage() {
  return (
    <ModulePage
      module="marketing"
      name="Marketing"
      eyebrow="Growth"
      title="Marketing center"
      description="Email, SMS, WhatsApp and push campaigns with loyalty, referrals and coupons."
      primaryAction="Create campaign"
      stats={[
        { label: 'Active campaigns', value: '6', icon: Megaphone, tone: 'gold' },
        { label: 'Attributed revenue', value: '£28,900', delta: '+18%', icon: TrendingUp, tone: 'emerald' },
        { label: 'Avg open rate', value: '64%', delta: '+3%', icon: MailOpen, tone: 'azure' },
        { label: 'Loyalty members', value: '1,204', delta: '+64', icon: Crown, tone: 'royal' },
      ]}
      panels={[
        {
          title: 'Campaigns',
          description: 'Performance',
          rows: [
            { primary: 'August Balayage Offer', secondary: 'Email · 3,210 sent', value: '£18,400', chip: { label: 'Live', tone: 'emerald' } },
            { primary: 'Birthday Treat', secondary: 'SMS · evergreen', value: '£6,120', chip: { label: 'Automated', tone: 'royal' } },
            { primary: 'Win-back 90 days', secondary: 'WhatsApp · 640 sent', value: '£4,380', chip: { label: 'Live', tone: 'emerald' } },
            { primary: 'Membership Upsell', secondary: 'Push', value: '£0', chip: { label: 'Draft', tone: 'neutral' } },
          ],
        },
        {
          title: 'Segments & offers',
          description: 'Audience health',
          rows: [
            { primary: 'VIP high spenders', secondary: '327 clients', chip: { label: 'Targeted', tone: 'gold' } },
            { primary: 'Lapsed 90+ days', secondary: '412 clients', chip: { label: 'Win-back', tone: 'warning' } },
            { primary: 'New this month', secondary: '139 clients', chip: { label: 'Nurture', tone: 'azure' } },
            { primary: 'SUMMER20 coupon', secondary: '184 redemptions', value: '£3,120' },
          ],
        },
      ]}
      features={['Referral program', 'Abandoned booking', 'Coupons', 'Reviews', 'Campaign analytics', 'Customer segmentation']}
    />
  );
}

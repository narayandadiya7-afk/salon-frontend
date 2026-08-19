'use client';

import { CalendarCheck, FileText, Globe, TrendingUp } from 'lucide-react';
import { ModulePage } from '@/components/owner/owner-portal/ModulePage';

export default function CmsPage() {
  return (
    <ModulePage
      module="cms"
      name="Website CMS"
      eyebrow="Web"
      title="Website CMS"
      description="Compose your public site: hero, services, team, gallery, blogs and SEO."
      primaryAction="Publish changes"
      stats={[
        { label: 'Pages live', value: '9', icon: Globe, tone: 'gold' },
        { label: 'Monthly visitors', value: '24,180', delta: '+12%', icon: TrendingUp, tone: 'azure' },
        { label: 'Online bookings', value: '1,062', delta: '+9%', icon: CalendarCheck, tone: 'emerald' },
        { label: 'Blog posts', value: '34', hint: '3 drafts', icon: FileText, tone: 'royal' },
      ]}
      panels={[
        {
          title: 'Homepage sections',
          description: 'Drag to reorder',
          rows: [
            { primary: 'Hero banner', secondary: 'Image + booking CTA', chip: { label: 'Published', tone: 'emerald' } },
            { primary: 'About', secondary: 'Studio story', chip: { label: 'Published', tone: 'emerald' } },
            { primary: 'Services grid', secondary: '8 featured services', chip: { label: 'Published', tone: 'emerald' } },
            { primary: 'Team', secondary: '6 stylists', chip: { label: 'Draft', tone: 'warning' } },
            { primary: 'Testimonials', secondary: '12 quotes', chip: { label: 'Published', tone: 'emerald' } },
            { primary: 'FAQs', secondary: '9 questions', chip: { label: 'Published', tone: 'emerald' } },
          ],
        },
        {
          title: 'Site settings',
          description: 'Content & metadata',
          rows: [
            { primary: 'Announcement bar', secondary: 'Autumn colour event', chip: { label: 'Active', tone: 'gold' } },
            { primary: 'Promotional banner', secondary: '20% off midweek', chip: { label: 'Scheduled', tone: 'azure' } },
            { primary: 'Business hours', secondary: 'Mon–Sun · 09:00–20:00' },
            { primary: 'Social links', secondary: 'Instagram, TikTok, Pinterest' },
            { primary: 'SEO', secondary: 'Meta titles & descriptions', chip: { label: 'Healthy', tone: 'emerald' } },
          ],
        },
      ]}
      features={['Gallery', 'Blogs', 'Contact page', 'Drag & drop editing', 'Preview mode']}
    />
  );
}

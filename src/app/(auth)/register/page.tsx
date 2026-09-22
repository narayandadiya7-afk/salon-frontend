import type { Metadata } from 'next';
import { SiteShell } from '@/components/admin/admin-website/site-shell';
import { RegisterForm } from './RegisterForm';

const TITLE = 'Create Your Salon — Get Your Salon Website | Avivane';
const DESCRIPTION =
  'Register your salon, choose your unique salon URL, and receive your live salon website address.';

export const metadata: Metadata = {
  title: TITLE,
  description: DESCRIPTION,
  openGraph: { title: TITLE, description: DESCRIPTION, type: 'website' },
  twitter: { card: 'summary_large_image' },
};

export default function RegisterPage() {
  return (
    <SiteShell>
      <RegisterForm />
    </SiteShell>
  );
}
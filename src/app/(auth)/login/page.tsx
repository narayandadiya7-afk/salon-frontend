import type { Metadata } from 'next';
import { SiteShell } from '@/components/admin/admin-website/site-shell';
import { LoginForm } from './LoginForm';

const TITLE = 'Log In — Avivane Salon Platform';
const DESCRIPTION =
  'Sign in to your Avivane account to open your salon dashboard.';

export const metadata: Metadata = {
  title: TITLE,
  description: DESCRIPTION,
  openGraph: { title: TITLE, description: DESCRIPTION, type: 'website' },
  twitter: { card: 'summary_large_image' },
};

export default function LoginPage() {
  return (
    <SiteShell>
      <LoginForm />
    </SiteShell>
  );
}
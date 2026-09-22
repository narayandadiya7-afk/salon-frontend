import type { Metadata } from 'next';
import { SiteShell } from '@/components/admin/admin-website/site-shell';
import { ForgotPasswordForm } from './ForgotPasswordForm';

export const metadata: Metadata = {
  title: 'Forgot Password | Avivane',
  description:
    'Enter your email address and we will send you a link to reset your salon password.',
};

export default function ForgotPasswordPage() {
  return (
    <SiteShell>
      <ForgotPasswordForm />
    </SiteShell>
  );
}
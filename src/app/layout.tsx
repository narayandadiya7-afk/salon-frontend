import type { Metadata } from 'next';
import './globals.css';
import AppProviders from '../providers/AppProviders';

export const metadata: Metadata = {
  title: 'SalonSaaS — Launch Your Salon Website in Minutes',
  description: 'The all-in-one SaaS platform for salon businesses. Online booking, subscription management, and a beautiful website.',
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body>
        <AppProviders>
          {children}
        </AppProviders>
      </body>
    </html>
  );
}

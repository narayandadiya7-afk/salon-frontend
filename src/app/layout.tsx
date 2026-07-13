import type { Metadata } from 'next';
import './globals.css';
import AppProviders from '../providers/AppProviders';

export const metadata: Metadata = {
  title: 'SalonSaaS — Launch Your Salon Website in Minutes',
  description: 'The all-in-one SaaS platform for salon businesses. Online booking, subscription management, and a beautiful website.',
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body suppressHydrationWarning>
        {/* Google Translate hidden mount point */}
        <div id="google_translate_element" style={{ display: 'none' }} />

        {/* Init script — must come before the loader */}
        <script
          dangerouslySetInnerHTML={{
            __html: `
              function googleTranslateElementInit() {
                new google.translate.TranslateElement({
                  pageLanguage: 'en',
                  includedLanguages: '',
                  autoDisplay: false,
                }, 'google_translate_element');
              }
            `,
          }}
        />

        {/* Google Translate loader */}
        <script
          src="//translate.google.com/translate_a/element.js?cb=googleTranslateElementInit"
          async
        />

        <AppProviders>
          {children}
        </AppProviders>
      </body>
    </html>
  );
}

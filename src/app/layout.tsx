import type { Metadata } from 'next';
import { Cormorant_Garamond, Fraunces, Jost, Plus_Jakarta_Sans } from 'next/font/google';
import './globals.css';
import AppProviders from '../providers/AppProviders';

const cormorant = Cormorant_Garamond({
  subsets: ['latin'],
  weight: ['300', '400', '500', '600'],
  style: ['normal', 'italic'],
  variable: '--font-cormorant',
  display: 'swap',
});

const jost = Jost({
  subsets: ['latin'],
  weight: ['300', '400', '500', '600'],
  variable: '--font-jost',
  display: 'swap',
});

const fraunces = Fraunces({
  subsets: ['latin'],
  weight: ['400', '500', '600'],
  style: ['normal', 'italic'],
  variable: '--font-fraunces',
  display: 'swap',
});

const plusJakarta = Plus_Jakarta_Sans({
  subsets: ['latin'],
  weight: ['400', '500', '600', '700', '800'],
  variable: '--font-plus-jakarta',
  display: 'swap',
});

export const metadata: Metadata = {
  title: 'SalonSaaS — Launch Your Salon Website in Minutes',
  description: 'The all-in-one SaaS platform for salon businesses. Online booking, subscription management, and a beautiful website.',
};

const scrollRestorationScript = `(function () {
  try {
    var saved = JSON.parse(sessionStorage.getItem('salon-scroll-positions') || '{}');
    var y = saved[location.pathname];
    if (typeof y !== 'number') return;
    if ('scrollRestoration' in history) history.scrollRestoration = 'manual';
    var apply = function () {
      var html = document.documentElement;
      var prev = html.style.scrollBehavior;
      html.style.scrollBehavior = 'auto';
      window.scrollTo(0, y);
      html.style.scrollBehavior = prev;
      if (document.readyState === 'complete') {
        if ('scrollRestoration' in history) history.scrollRestoration = 'auto';
      } else {
        requestAnimationFrame(apply);
      }
    };
    requestAnimationFrame(apply);
  } catch (e) {}
})();`;

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html
      lang="en"
      suppressHydrationWarning
      className={`${cormorant.variable} ${jost.variable} ${fraunces.variable} ${plusJakarta.variable}`}
    >
      <head>
        <script dangerouslySetInnerHTML={{ __html: scrollRestorationScript }} />
      </head>
      <body suppressHydrationWarning>
        <AppProviders>
          {children}
        </AppProviders>
      </body>
    </html>
  );
}

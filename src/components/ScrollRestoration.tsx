'use client';

import { useEffect, useRef } from 'react';
import { usePathname } from 'next/navigation';

const STORAGE_KEY = 'salon-scroll-positions';

let isBackForward = false;

function readPositions(): Record<string, number> {
  try {
    return JSON.parse(sessionStorage.getItem(STORAGE_KEY) ?? '{}');
  } catch {
    return {};
  }
}

function writePositions(positions: Record<string, number>) {
  try {
    sessionStorage.setItem(STORAGE_KEY, JSON.stringify(positions));
  } catch {
    // storage unavailable — ignore
  }
}

function isReload() {
  try {
    const [entry] = performance.getEntriesByType('navigation') as PerformanceNavigationTiming[];
    return entry?.type === 'reload';
  } catch {
    return false;
  }
}

function restoreScroll(y: number) {
  const html = document.documentElement;
  const prev = html.style.scrollBehavior;
  html.style.scrollBehavior = 'auto';
  window.scrollTo(0, y);
  html.style.scrollBehavior = prev;
}

export default function ScrollRestoration() {
  const pathname = usePathname();
  const restoredOnLoad = useRef(false);

  useEffect(() => {
    const onPopState = () => {
      isBackForward = true;
    };
    window.addEventListener('popstate', onPopState);
    return () => window.removeEventListener('popstate', onPopState);
  }, []);

  useEffect(() => {
    let raf = 0;
    const save = () => {
      cancelAnimationFrame(raf);
      raf = requestAnimationFrame(() => {
        const positions = readPositions();
        positions[pathname] = window.scrollY;
        writePositions(positions);
      });
    };
    window.addEventListener('scroll', save, { passive: true });
    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener('scroll', save);
    };
  }, [pathname]);

  useEffect(() => {
    if (!restoredOnLoad.current) {
      restoredOnLoad.current = true;

      // A reload keeps the tab's session storage, so restore the position
      // that was saved before the page was reloaded.
      if (isReload()) {
        const positions = readPositions();
        const y = positions[pathname];
        if (y === undefined) return;

        let raf = 0;
        const apply = () => {
          cancelAnimationFrame(raf);
          raf = requestAnimationFrame(() => {
            cancelAnimationFrame(raf);
            raf = requestAnimationFrame(() => restoreScroll(y));
          });
        };

        if (document.readyState === 'complete') {
          apply();
          return () => cancelAnimationFrame(raf);
        }

        const onLoad = () => {
          window.removeEventListener('load', onLoad);
          apply();
        };
        window.addEventListener('load', onLoad);
        return () => {
          cancelAnimationFrame(raf);
          window.removeEventListener('load', onLoad);
        };
      }
      return;
    }

    if (isBackForward) {
      isBackForward = false;
      const y = readPositions()[pathname] ?? 0;
      requestAnimationFrame(() => {
        requestAnimationFrame(() => restoreScroll(y));
      });
    } else {
      const positions = readPositions();
      delete positions[pathname];
      writePositions(positions);
    }
  }, [pathname]);

  return null;
}

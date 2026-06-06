'use client';

import React, { useEffect } from 'react';
import { useRouter } from 'next/navigation';

/**
 * ForceUpdate.tsx
 * Component that forces a page reload when a new version is detected.
 * Checks for app version in localStorage and reloads if outdated.
 */
interface ForceUpdateProps {
  version?: string;
}

const ForceUpdate: React.FC<ForceUpdateProps> = ({ version = '1.0.0' }) => {
  const router = useRouter();

  useEffect(() => {
    const storedVersion = localStorage.getItem('app-version');
    if (storedVersion && storedVersion !== version) {
      localStorage.setItem('app-version', version);
      window.location.reload();
    } else if (!storedVersion) {
      localStorage.setItem('app-version', version);
    }
  }, [version]);

  return null;
};

export default ForceUpdate;

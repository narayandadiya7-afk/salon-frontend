'use client';

import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
  useSyncExternalStore,
  type ReactNode,
} from 'react';
import {
  ROLES,
  can,
  roleById,
  type ModuleId,
  type PermissionAction,
  type Role,
  type RoleId,
} from '@/lib/portal/rbac';

interface SessionValue {
  role: Role;
  roles: Role[];
  setRoleId: (id: RoleId) => void;
  user: { name: string; initials: string; email: string };
  salon: { id: string; name: string; city: string };
  salons: { id: string; name: string; city: string }[];
  setSalonId: (id: string) => void;
  can: (module: ModuleId, action?: PermissionAction) => boolean;
  theme: 'light' | 'dark';
  toggleTheme: () => void;
}

const SALONS = [
  { id: 'mayfair', name: 'Maison Lumière — Mayfair', city: 'London' },
  { id: 'soho', name: 'Maison Lumière — Soho', city: 'London' },
  { id: 'dubai', name: 'Maison Lumière — DIFC', city: 'Dubai' },
];

const USERS: Record<string, { name: string; initials: string; email: string }> = {
  owner: { name: 'Amara Devine', initials: 'AD', email: 'amara@maisonlumiere.co' },
  manager: { name: 'Priya Raman', initials: 'PR', email: 'priya@maisonlumiere.co' },
  receptionist: { name: 'Noah Bennett', initials: 'NB', email: 'noah@maisonlumiere.co' },
  stylist: { name: 'Ivy Marchetti', initials: 'IM', email: 'ivy@maisonlumiere.co' },
  accountant: { name: 'Dan Okafor', initials: 'DO', email: 'dan@maisonlumiere.co' },
  'social-lead': { name: 'Zara Quinn', initials: 'ZQ', email: 'zara@maisonlumiere.co' },
};

const ROLES_KEY = 'salonos.role';
const THEME_KEY = 'salonos.theme';

let listeners: Array<() => void> = [];

function subscribe(listener: () => void) {
  listeners.push(listener);
  if (typeof window !== 'undefined') window.addEventListener('storage', listener);
  return () => {
    listeners = listeners.filter((l) => l !== listener);
    if (typeof window !== 'undefined') window.removeEventListener('storage', listener);
  };
}

function notify() {
  listeners.forEach((l) => l());
}

function readRole() {
  if (typeof window === 'undefined') return 'owner';
  return window.localStorage.getItem(ROLES_KEY) ?? 'owner';
}

function readTheme() {
  if (typeof window === 'undefined') return 'light';
  const t = window.localStorage.getItem(THEME_KEY);
  return t === 'dark' || t === 'light' ? t : 'light';
}

const serverRole = () => 'owner';
const serverTheme = () => 'light';

const SessionContext = createContext<SessionValue | null>(null);

export function SessionProvider({ children }: { children: ReactNode }) {
  const roleId = useSyncExternalStore(subscribe, readRole, serverRole) as RoleId;
  const theme = useSyncExternalStore(subscribe, readTheme, serverTheme) as 'light' | 'dark';
  const [salonId, setSalonId] = useState(SALONS[0]!.id);

  useEffect(() => {
    document.documentElement.classList.toggle('dark', theme === 'dark');
  }, [theme]);

  const setRoleId = useCallback((id: RoleId) => {
    window.localStorage.setItem(ROLES_KEY, id);
    notify();
  }, []);

  const toggleTheme = useCallback(() => {
    const next = readTheme() === 'dark' ? 'light' : 'dark';
    window.localStorage.setItem(THEME_KEY, next);
    notify();
  }, []);

  const value = useMemo<SessionValue>(() => {
    const role = roleById(roleId);
    return {
      role,
      roles: ROLES,
      setRoleId,
      user: USERS[role.id] ?? USERS['owner']!,
      salon: SALONS.find((s) => s.id === salonId) ?? SALONS[0]!,
      salons: SALONS,
      setSalonId,
      can: (module, action = 'view') => can(role, module, action),
      theme,
      toggleTheme,
    };
  }, [roleId, salonId, theme, setRoleId, toggleTheme]);

  return <SessionContext.Provider value={value}>{children}</SessionContext.Provider>;
}

export function useSession() {
  const ctx = useContext(SessionContext);
  if (!ctx) throw new Error('useSession must be used inside SessionProvider');
  return ctx;
}

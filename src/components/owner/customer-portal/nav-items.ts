import {
  LayoutDashboard, CalendarDays, CalendarPlus, History, Heart, Crown, Gift,
  Package, CreditCard, Bell, MessageCircle, User, Settings, LifeBuoy,
  type LucideIcon,
} from 'lucide-react';

export interface CustomerNavItem {
  to: string;
  label: string;
  icon: LucideIcon;
}

export interface CustomerNavSection {
  title: string;
  items: CustomerNavItem[];
}

export const navSections: CustomerNavSection[] = [
  {
    title: 'Overview',
    items: [{ to: '/', label: 'Overview', icon: LayoutDashboard }],
  },
  {
    title: 'Appointments',
    items: [
      { to: '/book', label: 'Book Appointment', icon: CalendarPlus },
      { to: '/appointments', label: 'My Appointments', icon: CalendarDays },
      { to: '/history', label: 'Booking History', icon: History },
      { to: '/favorites', label: 'Favorites', icon: Heart },
    ],
  },
  {
    title: 'Loyalty & Payments',
    items: [
      { to: '/membership', label: 'Membership', icon: Crown },
      { to: '/rewards', label: 'Loyalty & Rewards', icon: Gift },
      { to: '/packages', label: 'Packages', icon: Package },
      { to: '/payments', label: 'Payments & Invoices', icon: CreditCard },
    ],
  },
  {
    title: 'Account',
    items: [
      { to: '/notifications', label: 'Notifications', icon: Bell },
      { to: '/messages', label: 'Messages', icon: MessageCircle },
      { to: '/profile', label: 'Profile', icon: User },
      { to: '/settings', label: 'Settings', icon: Settings },
      { to: '/support', label: 'Help & Support', icon: LifeBuoy },
    ],
  },
];

export const mobileNavItems = [
  { to: '/', label: 'Home', icon: LayoutDashboard },
  { to: '/appointments', label: 'Appointments', icon: CalendarDays },
  { to: '/rewards', label: 'Rewards', icon: Gift },
  { to: '/profile', label: 'Profile', icon: User },
] as const;
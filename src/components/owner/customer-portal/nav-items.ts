import {
  LayoutDashboard, CalendarDays, CalendarPlus, History, Heart, Crown, Gift,
  Package, CreditCard, Bell, MessageCircle, User, Settings, LifeBuoy,
} from 'lucide-react';

export const navItems = [
  { to: '/', label: 'Overview', icon: LayoutDashboard },
  { to: '/appointments', label: 'My Appointments', icon: CalendarDays },
  { to: '/book', label: 'Book Appointment', icon: CalendarPlus },
  { to: '/history', label: 'Booking History', icon: History },
  { to: '/favorites', label: 'Favorites', icon: Heart },
  { to: '/membership', label: 'Membership', icon: Crown },
  { to: '/rewards', label: 'Loyalty & Rewards', icon: Gift },
  { to: '/packages', label: 'Packages', icon: Package },
  { to: '/payments', label: 'Payments & Invoices', icon: CreditCard },
  { to: '/notifications', label: 'Notifications', icon: Bell },
  { to: '/messages', label: 'Messages', icon: MessageCircle },
  { to: '/profile', label: 'Profile', icon: User },
  { to: '/settings', label: 'Settings', icon: Settings },
  { to: '/support', label: 'Help & Support', icon: LifeBuoy },
] as const;

export const mobileNavItems = [
  { to: '/', label: 'Home', icon: LayoutDashboard },
  { to: '/appointments', label: 'Appointments', icon: CalendarDays },
  { to: '/rewards', label: 'Rewards', icon: Gift },
  { to: '/profile', label: 'Profile', icon: User },
] as const;
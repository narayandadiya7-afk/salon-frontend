export type FynchoFeature = {
  t: string;
  d: string;
};

export const features: FynchoFeature[] = [
  {
    t: 'Business Software',
    d: 'Give your business a professional online presence with your own business address, services, team, gallery and contact information.',
  },
  {
    t: 'Online Booking',
    d: 'Let customers explore your services, choose a team member and book available appointment times online.',
  },
  {
    t: 'Customer Management',
    d: 'Keep customer profiles and appointment history together so your team has the information they need in one place.',
  },
  {
    t: 'Team Management',
    d: 'Manage team members, working hours and availability so bookings are based on when your team can actually provide each service.',
  },
  {
    t: 'Services',
    d: 'Create and manage your services with clear descriptions, durations and pricing.',
  },
  {
    t: 'Appointments',
    d: 'Manage bookings, appointment status, schedules, cancellations and changes from one place.',
  },
  {
    t: 'Payments',
    d: 'Accept online payments and deposits as part of the booking experience, with payment requirements configured for your business.',
  },
  {
    t: 'Memberships',
    d: 'Offer memberships that give customers another reason to keep coming back to your business.',
  },
  {
    t: 'Loyalty',
    d: 'Build stronger customer relationships with loyalty features designed to encourage repeat visits.',
  },
  {
    t: 'Reminders & Notifications',
    d: 'Keep customers and your team informed with appointment confirmations, reminders and relevant booking updates.',
  },
  {
    t: 'Reports & Revenue',
    d: 'Understand bookings, revenue and business activity through clear reports and performance views.',
  },
  {
    t: 'Business Dashboard',
    d: 'Manage appointments, customers, services, team members and business activity from one connected dashboard.',
  },
];

export const HOMEPAGE_FEATURE_COUNT = 6;

export const homePageFeatures = features.slice(0, HOMEPAGE_FEATURE_COUNT);
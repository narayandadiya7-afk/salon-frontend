export const revenueByDay = [
  { day: 'Mon', revenue: 3120, lastWeek: 2740 },
  { day: 'Tue', revenue: 3860, lastWeek: 3210 },
  { day: 'Wed', revenue: 4290, lastWeek: 3980 },
  { day: 'Thu', revenue: 5120, lastWeek: 4420 },
  { day: 'Fri', revenue: 6890, lastWeek: 6010 },
  { day: 'Sat', revenue: 8240, lastWeek: 7460 },
  { day: 'Sun', revenue: 4570, lastWeek: 4890 },
];

export const monthlyRevenue = [
  { month: 'Jan', revenue: 84000, services: 61000, retail: 23000 },
  { month: 'Feb', revenue: 91500, services: 66000, retail: 25500 },
  { month: 'Mar', revenue: 88200, services: 63500, retail: 24700 },
  { month: 'Apr', revenue: 102400, services: 74000, retail: 28400 },
  { month: 'May', revenue: 118900, services: 86500, retail: 32400 },
  { month: 'Jun', revenue: 127300, services: 92800, retail: 34500 },
];

export const acquisition = [
  { month: 'Jan', new: 74, returning: 210 },
  { month: 'Feb', new: 88, returning: 232 },
  { month: 'Mar', new: 81, returning: 244 },
  { month: 'Apr', new: 106, returning: 268 },
  { month: 'May', new: 124, returning: 291 },
  { month: 'Jun', new: 139, returning: 318 },
];

export const servicePopularity = [
  { name: 'Balayage', value: 32 },
  { name: 'Keratin', value: 21 },
  { name: 'Cut & Style', value: 19 },
  { name: 'Facials', value: 16 },
  { name: 'Nails', value: 12 },
];

export const staffPerformance = [
  { name: 'Ivy', revenue: 18400, rating: 4.9, utilisation: 92 },
  { name: 'Marco', revenue: 16250, rating: 4.8, utilisation: 88 },
  { name: 'Leila', revenue: 14980, rating: 4.9, utilisation: 84 },
  { name: 'Tomas', revenue: 11240, rating: 4.6, utilisation: 71 },
  { name: 'Reina', revenue: 9860, rating: 4.7, utilisation: 66 },
];

export type AppointmentStatus =
  | 'confirmed'
  | 'checked-in'
  | 'in-service'
  | 'completed'
  | 'cancelled'
  | 'no-show'
  | 'waitlist';

export interface Appointment {
  id: string;
  customer: string;
  initials: string;
  service: string;
  staff: string;
  start: string;
  duration: number;
  price: number;
  status: AppointmentStatus;
  paid: boolean;
  notes?: string;
  channel: 'online' | 'walk-in' | 'phone';
}

export const appointments: Appointment[] = [
  { id: 'APT-4821', customer: 'Eleanor Voss', initials: 'EV', service: 'Balayage + Gloss', staff: 'Ivy Marchetti', start: '09:00', duration: 150, price: 285, status: 'in-service', paid: false, channel: 'online', notes: 'Allergic to ammonia based lifters.' },
  { id: 'APT-4822', customer: 'Marcus Hale', initials: 'MH', service: 'Skin Fade', staff: 'Marco Rossi', start: '09:30', duration: 45, price: 48, status: 'completed', paid: true, channel: 'walk-in' },
  { id: 'APT-4823', customer: 'Priya Anand', initials: 'PA', service: 'Keratin Treatment', staff: 'Leila Haddad', start: '10:15', duration: 120, price: 340, status: 'checked-in', paid: false, channel: 'online' },
  { id: 'APT-4824', customer: 'Sofia Duarte', initials: 'SD', service: 'Signature Facial', staff: 'Reina Cho', start: '11:00', duration: 60, price: 130, status: 'confirmed', paid: false, channel: 'phone' },
  { id: 'APT-4825', customer: 'Jonah Reed', initials: 'JR', service: 'Beard Sculpt', staff: 'Marco Rossi', start: '11:30', duration: 30, price: 32, status: 'confirmed', paid: false, channel: 'walk-in' },
  { id: 'APT-4826', customer: 'Amelie Laurent', initials: 'AL', service: 'Bridal Trial', staff: 'Ivy Marchetti', start: '13:00', duration: 90, price: 420, status: 'confirmed', paid: true, channel: 'online', notes: 'VIP — champagne on arrival.' },
  { id: 'APT-4827', customer: 'Nadia Sorel', initials: 'NS', service: 'Gel Manicure', staff: 'Tomas Vega', start: '14:00', duration: 45, price: 65, status: 'waitlist', paid: false, channel: 'online' },
  { id: 'APT-4828', customer: 'Grace Kim', initials: 'GK', service: 'Colour Correction', staff: 'Leila Haddad', start: '15:00', duration: 180, price: 520, status: 'confirmed', paid: false, channel: 'online' },
  { id: 'APT-4829', customer: 'Owen Fry', initials: 'OF', service: 'Cut & Style', staff: 'Tomas Vega', start: '16:30', duration: 60, price: 78, status: 'cancelled', paid: false, channel: 'phone' },
  { id: 'APT-4830', customer: 'Bianca Ortiz', initials: 'BO', service: 'Lash Lift', staff: 'Reina Cho', start: '17:15', duration: 60, price: 95, status: 'confirmed', paid: false, channel: 'online' },
];

export interface Customer {
  id: string;
  name: string;
  initials: string;
  email: string;
  phone: string;
  tier: 'VIP' | 'Regular' | 'New' | 'Inactive';
  visits: number;
  spend: number;
  wallet: number;
  points: number;
  lastVisit: string;
  favouriteStaff: string;
  membership: string | null;
  tags: string[];
}

export const customers: Customer[] = [
  { id: 'CU-1041', name: 'Eleanor Voss', initials: 'EV', email: 'eleanor.voss@mail.com', phone: '+44 7700 900112', tier: 'VIP', visits: 47, spend: 12840, wallet: 220, points: 3860, lastVisit: 'Today', favouriteStaff: 'Ivy Marchetti', membership: 'Platinum Glow', tags: ['High spend', 'Colour'] },
  { id: 'CU-1042', name: 'Priya Anand', initials: 'PA', email: 'priya.anand@mail.com', phone: '+44 7700 900431', tier: 'VIP', visits: 31, spend: 9420, wallet: 0, points: 2410, lastVisit: 'Today', favouriteStaff: 'Leila Haddad', membership: 'Gold Ritual', tags: ['Keratin'] },
  { id: 'CU-1043', name: 'Marcus Hale', initials: 'MH', email: 'm.hale@mail.com', phone: '+44 7700 900987', tier: 'Regular', visits: 18, spend: 1120, wallet: 0, points: 480, lastVisit: '3 days ago', favouriteStaff: 'Marco Rossi', membership: null, tags: ['Barbering'] },
  { id: 'CU-1044', name: 'Sofia Duarte', initials: 'SD', email: 'sofia.d@mail.com', phone: '+44 7700 900222', tier: 'Regular', visits: 12, spend: 2140, wallet: 45, points: 640, lastVisit: '2 weeks ago', favouriteStaff: 'Reina Cho', membership: 'Skin Club', tags: ['Skincare'] },
  { id: 'CU-1045', name: 'Amelie Laurent', initials: 'AL', email: 'amelie@mail.com', phone: '+33 6 12 45 78 90', tier: 'New', visits: 2, spend: 640, wallet: 0, points: 120, lastVisit: 'Yesterday', favouriteStaff: 'Ivy Marchetti', membership: null, tags: ['Bridal'] },
  { id: 'CU-1046', name: 'Grace Kim', initials: 'GK', email: 'grace.kim@mail.com', phone: '+44 7700 900555', tier: 'VIP', visits: 26, spend: 8210, wallet: 130, points: 1980, lastVisit: '1 week ago', favouriteStaff: 'Leila Haddad', membership: 'Platinum Glow', tags: ['Colour', 'High spend'] },
  { id: 'CU-1047', name: 'Owen Fry', initials: 'OF', email: 'owen.fry@mail.com', phone: '+44 7700 900777', tier: 'Inactive', visits: 6, spend: 410, wallet: 0, points: 90, lastVisit: '8 months ago', favouriteStaff: 'Tomas Vega', membership: null, tags: ['Win-back'] },
  { id: 'CU-1048', name: 'Bianca Ortiz', initials: 'BO', email: 'bianca.o@mail.com', phone: '+44 7700 900888', tier: 'Regular', visits: 15, spend: 2980, wallet: 60, points: 720, lastVisit: '5 days ago', favouriteStaff: 'Reina Cho', membership: 'Skin Club', tags: ['Lashes'] },
];

export interface StaffMember {
  id: string;
  name: string;
  initials: string;
  role: string;
  roleId: string;
  status: 'On shift' | 'Break' | 'Off today' | 'Leave';
  shift: string;
  revenue: number;
  commission: number;
  rating: number;
  utilisation: number;
  services: string[];
}

export const staff: StaffMember[] = [
  { id: 'ST-01', name: 'Ivy Marchetti', initials: 'IM', role: 'Senior Colourist', roleId: 'stylist', status: 'On shift', shift: '09:00 – 18:00', revenue: 18400, commission: 3680, rating: 4.9, utilisation: 92, services: ['Balayage', 'Colour Correction', 'Bridal'] },
  { id: 'ST-02', name: 'Marco Rossi', initials: 'MR', role: 'Master Barber', roleId: 'stylist', status: 'On shift', shift: '10:00 – 19:00', revenue: 16250, commission: 3250, rating: 4.8, utilisation: 88, services: ['Skin Fade', 'Beard Sculpt'] },
  { id: 'ST-03', name: 'Leila Haddad', initials: 'LH', role: 'Colour Specialist', roleId: 'stylist', status: 'Break', shift: '09:30 – 18:30', revenue: 14980, commission: 2996, rating: 4.9, utilisation: 84, services: ['Keratin', 'Balayage'] },
  { id: 'ST-04', name: 'Tomas Vega', initials: 'TV', role: 'Nail Artist', roleId: 'stylist', status: 'On shift', shift: '11:00 – 20:00', revenue: 11240, commission: 2248, rating: 4.6, utilisation: 71, services: ['Gel Manicure', 'Pedicure'] },
  { id: 'ST-05', name: 'Reina Cho', initials: 'RC', role: 'Aesthetician', roleId: 'stylist', status: 'On shift', shift: '09:00 – 17:00', revenue: 9860, commission: 1972, rating: 4.7, utilisation: 66, services: ['Facials', 'Lash Lift'] },
  { id: 'ST-06', name: 'Noah Bennett', initials: 'NB', role: 'Front Desk Lead', roleId: 'receptionist', status: 'On shift', shift: '08:30 – 17:30', revenue: 0, commission: 0, rating: 4.8, utilisation: 0, services: [] },
  { id: 'ST-07', name: 'Priya Raman', initials: 'PR', role: 'Salon Manager', roleId: 'manager', status: 'Off today', shift: '—', revenue: 0, commission: 0, rating: 5, utilisation: 0, services: [] },
  { id: 'ST-08', name: 'Dan Okafor', initials: 'DO', role: 'Accountant', roleId: 'accountant', status: 'Leave', shift: '—', revenue: 0, commission: 0, rating: 4.9, utilisation: 0, services: [] },
];

export const services = [
  { id: 'SV-01', name: 'Balayage + Gloss', category: 'Colour', duration: 150, price: 285, tax: 20, bookings: 214, status: 'Active' },
  { id: 'SV-02', name: 'Colour Correction', category: 'Colour', duration: 180, price: 520, tax: 20, bookings: 62, status: 'Active' },
  { id: 'SV-03', name: 'Keratin Treatment', category: 'Treatments', duration: 120, price: 340, tax: 20, bookings: 138, status: 'Active' },
  { id: 'SV-04', name: 'Cut & Style', category: 'Hair', duration: 60, price: 78, tax: 20, bookings: 401, status: 'Active' },
  { id: 'SV-05', name: 'Skin Fade', category: 'Barbering', duration: 45, price: 48, tax: 20, bookings: 356, status: 'Active' },
  { id: 'SV-06', name: 'Signature Facial', category: 'Skin', duration: 60, price: 130, tax: 20, bookings: 189, status: 'Active' },
  { id: 'SV-07', name: 'Lash Lift', category: 'Beauty', duration: 60, price: 95, tax: 20, bookings: 121, status: 'Draft' },
  { id: 'SV-08', name: 'Gel Manicure', category: 'Nails', duration: 45, price: 65, tax: 20, bookings: 275, status: 'Active' },
];

export const packages = [
  { id: 'PK-01', name: 'Platinum Glow', type: 'Membership', price: 189, cadence: 'monthly', holders: 84, perks: ['2 blowouts', '15% off colour', 'Priority booking'] },
  { id: 'PK-02', name: 'Gold Ritual', type: 'Membership', price: 119, cadence: 'monthly', holders: 146, perks: ['1 treatment', '10% off retail'] },
  { id: 'PK-03', name: 'Skin Club', type: 'Membership', price: 89, cadence: 'monthly', holders: 97, perks: ['1 facial', 'Free consult'] },
  { id: 'PK-04', name: 'Bridal Suite', type: 'Package', price: 1250, cadence: 'one-off', holders: 12, perks: ['Trial', 'Day-of styling', '2 guests'] },
];

export const inventory = [
  { id: 'PR-01', name: 'Olaplex No.3 Hair Perfector', sku: 'OLA-N3-100', supplier: 'Olaplex UK', stock: 6, reorder: 12, cost: 18, price: 34, expiry: '2027-04', status: 'Low' },
  { id: 'PR-02', name: 'Kérastase Chronologiste', sku: 'KER-CHR-250', supplier: "L'Oréal Pro", stock: 24, reorder: 10, cost: 32, price: 68, expiry: '2028-01', status: 'Healthy' },
  { id: 'PR-03', name: 'Wella Koleston 7/43', sku: 'WEL-K743', supplier: 'Wella Direct', stock: 3, reorder: 15, cost: 7, price: 0, expiry: '2026-11', status: 'Critical' },
  { id: 'PR-04', name: 'Dermalogica Daily Milkfoliant', sku: 'DER-DMF-74', supplier: 'Dermalogica', stock: 18, reorder: 8, cost: 26, price: 55, expiry: '2027-09', status: 'Healthy' },
  { id: 'PR-05', name: 'OPI Infinite Shine — Bubble Bath', sku: 'OPI-IS-BB', supplier: 'Beauty Depot', stock: 9, reorder: 10, cost: 6, price: 16, expiry: '2029-02', status: 'Low' },
  { id: 'PR-06', name: 'Barber Blade Cartridges', sku: 'BRB-BLD-50', supplier: 'Beauty Depot', stock: 42, reorder: 20, cost: 0.4, price: 0, expiry: '—', status: 'Healthy' },
];

export const invoices = [
  { id: 'INV-20841', customer: 'Eleanor Voss', date: 'Today', amount: 285, tax: 47.5, status: 'Unpaid', method: '—' },
  { id: 'INV-20840', customer: 'Marcus Hale', date: 'Today', amount: 48, tax: 8, status: 'Paid', method: 'Card' },
  { id: 'INV-20839', customer: 'Amelie Laurent', date: 'Yesterday', amount: 420, tax: 70, status: 'Paid', method: 'Card' },
  { id: 'INV-20838', customer: 'Grace Kim', date: 'Yesterday', amount: 520, tax: 86.7, status: 'Partially paid', method: 'Split' },
  { id: 'INV-20837', customer: 'Bianca Ortiz', date: '2 days ago', amount: 95, tax: 15.8, status: 'Paid', method: 'Wallet' },
  { id: 'INV-20836', customer: 'Sofia Duarte', date: '3 days ago', amount: 130, tax: 21.7, status: 'Refunded', method: 'Card' },
];

export const expenses = [
  { id: 'EX-311', label: 'Salon rent — Mayfair', category: 'Rent', amount: 8400, date: '01 Aug' },
  { id: 'EX-312', label: 'Wella colour restock', category: 'Stock', amount: 1240, date: '03 Aug' },
  { id: 'EX-313', label: 'Instagram ads', category: 'Marketing', amount: 620, date: '05 Aug' },
  { id: 'EX-314', label: 'Laundry service', category: 'Operations', amount: 310, date: '07 Aug' },
];

export const campaigns = [
  { id: 'CP-01', name: 'August Balayage Offer', channel: 'Email', status: 'Live', sent: 3210, opened: 61, booked: 138, revenue: 18400 },
  { id: 'CP-02', name: 'Birthday Treat — Evergreen', channel: 'SMS', status: 'Automated', sent: 412, opened: 88, booked: 96, revenue: 6120 },
  { id: 'CP-03', name: 'Win-back 90 days', channel: 'WhatsApp', status: 'Live', sent: 640, opened: 74, booked: 51, revenue: 4380 },
  { id: 'CP-04', name: 'Membership Upsell', channel: 'Push', status: 'Draft', sent: 0, opened: 0, booked: 0, revenue: 0 },
];

export const reviews = [
  { id: 'RV-1', author: 'Eleanor Voss', rating: 5, text: "Ivy's balayage is unmatched. The suite feels like a private club.", source: 'Google', when: '2h ago' },
  { id: 'RV-2', author: 'Marcus Hale', rating: 5, text: 'In and out in 40 minutes, sharpest fade in London.', source: 'Fresha', when: '6h ago' },
  { id: 'RV-3', author: 'Sofia Duarte', rating: 4, text: 'Lovely facial, would have liked a longer massage segment.', source: 'Google', when: '1d ago' },
];

export const notifications = [
  { id: 'N1', type: 'appointment', title: 'New online booking', body: 'Grace Kim booked Colour Correction for Thu 15:00', when: '4m ago', unread: true },
  { id: 'N2', type: 'payment', title: 'Payment received', body: '£420.00 from Amelie Laurent — card', when: '22m ago', unread: true },
  { id: 'N3', type: 'inventory', title: 'Critical stock', body: 'Wella Koleston 7/43 down to 3 units', when: '1h ago', unread: true },
  { id: 'N4', type: 'customer', title: 'New message', body: 'Priya Anand asked about parking', when: '2h ago', unread: true },
  { id: 'N5', type: 'campaign', title: 'Campaign milestone', body: 'August Balayage Offer passed 100 bookings', when: '5h ago', unread: true },
  { id: 'N6', type: 'system', title: 'Backup complete', body: 'Nightly backup finished successfully', when: '9h ago', unread: false },
];

export const serviceImages = {
  haircut: '/assets/customer-portal/service-haircut.jpg',
  facial: '/assets/customer-portal/service-facial.jpg',
  manicure: '/assets/customer-portal/service-manicure.jpg',
  massage: '/assets/customer-portal/service-massage.jpg',
};

/** Tenant context — every record below belongs to this salon only. */
export const tenant = {
  id: "glam-studio",
  name: "Glam Studio",
  tagline: "Bandra West, Mumbai",
  address: "12 Turner Road, Bandra West, Mumbai 400050",
  phone: "+91 98200 44120",
  email: "hello@glamstudio.in",
  hours: "Tue – Sun · 10:00 AM – 8:00 PM",
  responseTime: "Usually replies within 15 minutes",
  currency: "₹",
};

export const customer = {
  firstName: "Sarah",
  fullName: "Sarah Mehta",
  email: "sarah.mehta@email.com",
  phone: "+91 98111 23344",
  dob: "1994-03-18",
  gender: "Female",
  address: "402 Palm Grove, Khar West, Mumbai 400052",
  initials: "SM",
  memberSince: "March 2023",
  preferredStylist: "Emma Fernandes",
  preferredServices: ["Haircut & Styling", "Signature Facial"],
  totalSpend: 48250,
  visits: 26,
};

export type AppointmentStatus =
  | "Pending"
  | "Confirmed"
  | "Checked In"
  | "In Progress"
  | "Completed"
  | "Cancelled"
  | "Rescheduled"
  | "No Show";

export type PaymentStatus = "Paid" | "Pending" | "Refunded" | "Failed";

export type Appointment = {
  id: string;
  service: string;
  staff: string;
  staffInitials: string;
  date: string;
  weekday: string;
  time: string;
  duration: string;
  price: number;
  status: AppointmentStatus;
  payment: PaymentStatus;
  image: string;
  notes?: string;
};

export const upcomingAppointment: Appointment = {
  id: "GS-48219",
  service: "Haircut & Styling",
  staff: "Emma Fernandes",
  staffInitials: "EF",
  date: "Saturday, August 22",
  weekday: "Sat",
  time: "2:00 PM – 3:00 PM",
  duration: "60 min",
  price: 2400,
  status: "Confirmed",
  payment: "Paid",
  image: serviceImages.haircut,
  notes: "Keep the length, soften the layers around the face.",
};

export const appointments: Appointment[] = [
  upcomingAppointment,
  {
    id: "GS-48160",
    service: "Signature Facial",
    staff: "Riya Kapoor",
    staffInitials: "RK",
    date: "Thursday, September 4",
    weekday: "Thu",
    time: "11:30 AM – 12:45 PM",
    duration: "75 min",
    price: 3200,
    status: "Pending",
    payment: "Pending",
    image: serviceImages.facial,
  },
  {
    id: "GS-47902",
    service: "Gel Manicure",
    staff: "Anaya Shah",
    staffInitials: "AS",
    date: "Friday, August 1",
    weekday: "Fri",
    time: "5:00 PM – 5:45 PM",
    duration: "45 min",
    price: 1500,
    status: "Completed",
    payment: "Paid",
    image: serviceImages.manicure,
  },
  {
    id: "GS-47744",
    service: "Aroma Massage",
    staff: "Meera Nair",
    staffInitials: "MN",
    date: "Sunday, July 13",
    weekday: "Sun",
    time: "6:00 PM – 7:00 PM",
    duration: "60 min",
    price: 2800,
    status: "Completed",
    payment: "Paid",
    image: serviceImages.massage,
  },
  {
    id: "GS-47610",
    service: "Hair Spa Ritual",
    staff: "Emma Fernandes",
    staffInitials: "EF",
    date: "Saturday, June 21",
    weekday: "Sat",
    time: "1:00 PM – 2:15 PM",
    duration: "75 min",
    price: 3400,
    status: "Cancelled",
    payment: "Refunded",
    image: serviceImages.haircut,
  },
];

export type Service = {
  id: string;
  name: string;
  description: string;
  duration: string;
  price: number;
  rating: number;
  image: string;
  stylist?: string;
  lastBooked?: string;
};

export const services: Service[] = [
  {
    id: "s1",
    name: "Haircut & Styling",
    description: "Consultation, precision cut and a finished blow-dry.",
    duration: "60 min",
    price: 2400,
    rating: 4.9,
    image: serviceImages.haircut,
    stylist: "Emma Fernandes",
    lastBooked: "12 July 2026",
  },
  {
    id: "s2",
    name: "Signature Facial",
    description: "Deep cleanse, enzyme peel and hydrating mask.",
    duration: "75 min",
    price: 3200,
    rating: 4.8,
    image: serviceImages.facial,
    stylist: "Riya Kapoor",
    lastBooked: "2 June 2026",
  },
  {
    id: "s3",
    name: "Gel Manicure",
    description: "Shaping, cuticle care and long-wear gel colour.",
    duration: "45 min",
    price: 1500,
    rating: 4.7,
    image: serviceImages.manicure,
    stylist: "Anaya Shah",
    lastBooked: "1 August 2026",
  },
  {
    id: "s4",
    name: "Aroma Massage",
    description: "Full body relaxation massage with warm oils.",
    duration: "60 min",
    price: 2800,
    rating: 5.0,
    image: serviceImages.massage,
    stylist: "Meera Nair",
    lastBooked: "13 July 2026",
  },
];

export const stylists = [
  { id: "st1", name: "Emma Fernandes", role: "Senior Stylist", initials: "EF", rating: 4.9 },
  { id: "st2", name: "Riya Kapoor", role: "Skin Therapist", initials: "RK", rating: 4.8 },
  { id: "st3", name: "Anaya Shah", role: "Nail Artist", initials: "AS", rating: 4.7 },
  { id: "st4", name: "Meera Nair", role: "Massage Therapist", initials: "MN", rating: 5.0 },
];

export const loyalty = {
  points: 2450,
  nextRewardAt: 3000,
  lifetime: 9820,
  rewards: [
    { id: "r1", name: "₹250 off any service", cost: 500, available: true },
    { id: "r2", name: "Complimentary hair spa add-on", cost: 1200, available: true },
    { id: "r3", name: "₹1,000 off a colour service", cost: 3000, available: false },
  ],
  history: [
    { id: "h1", label: "Gel Manicure visit", points: 150, date: "1 Aug 2026" },
    { id: "h2", label: "Referral bonus — Nikita", points: 300, date: "22 Jul 2026" },
    { id: "h3", label: "Redeemed ₹250 off", points: -500, date: "13 Jul 2026" },
    { id: "h4", label: "Aroma Massage visit", points: 280, date: "13 Jul 2026" },
  ],
};

export const membership = {
  active: true,
  name: "Glam Gold",
  status: "Active",
  renewsOn: "12 December 2026",
  price: 1999,
  cycle: "month",
  savedThisMonth: 1200,
  savedTotal: 14400,
  benefits: [
    { label: "20% off all hair services", used: false },
    { label: "2 complimentary blow-dries / month", used: true },
    { label: "Priority weekend booking", used: false },
    { label: "Birthday facial on us", used: false },
  ],
  plans: [
    { id: "p1", name: "Glam Essential", price: 999, perks: ["10% off services", "1 blow-dry / month"] },
    { id: "p2", name: "Glam Gold", price: 1999, perks: ["20% off services", "2 blow-dries / month", "Priority booking"] },
    { id: "p3", name: "Glam Platinum", price: 3499, perks: ["30% off services", "Unlimited blow-dries", "Dedicated stylist"] },
  ],
};

export const packages = [
  {
    id: "pk1",
    name: "Luxury Hair Package",
    services: ["Haircut & Styling", "Hair Spa Ritual", "Deep Conditioning"],
    used: 3,
    total: 5,
    expires: "31 December 2026",
  },
  {
    id: "pk2",
    name: "Radiance Facial Series",
    services: ["Signature Facial", "Vitamin C Glow"],
    used: 1,
    total: 4,
    expires: "15 March 2027",
  },
];

export const payments = [
  { id: "INV-2081", date: "1 Aug 2026", item: "Gel Manicure", amount: 1500, method: "Visa •••• 4242", status: "Paid" as PaymentStatus },
  { id: "INV-2044", date: "13 Jul 2026", item: "Aroma Massage", amount: 2800, method: "UPI · sarah@okhdfc", status: "Paid" as PaymentStatus },
  { id: "INV-2011", date: "21 Jun 2026", item: "Hair Spa Ritual", amount: 3400, method: "Visa •••• 4242", status: "Refunded" as PaymentStatus },
  { id: "INV-1988", date: "4 Jun 2026", item: "Glam Gold membership", amount: 1999, method: "Apple Pay", status: "Paid" as PaymentStatus },
  { id: "INV-1954", date: "18 May 2026", item: "Signature Facial", amount: 3200, method: "Mastercard •••• 8811", status: "Failed" as PaymentStatus },
];

export const paymentMethods = [
  { id: "pm1", label: "Visa", masked: "•••• 4242", expiry: "07/29", primary: true },
  { id: "pm2", label: "Mastercard", masked: "•••• 8811", expiry: "02/28", primary: false },
  { id: "pm3", label: "UPI", masked: "sarah@okhdfc", expiry: "", primary: false },
  { id: "pm4", label: "Apple Pay", masked: "•••• 1102", expiry: "", primary: false },
];

export type NotificationCategory =
  | "Appointments"
  | "Payments"
  | "Promotions"
  | "Membership"
  | "Loyalty"
  | "Messages"
  | "System";

export const notifications: {
  id: string;
  category: NotificationCategory;
  title: string;
  body: string;
  time: string;
  read: boolean;
}[] = [
  { id: "n1", category: "Appointments", title: "Your appointment is tomorrow", body: "Haircut & Styling with Emma at 2:00 PM.", time: "2h ago", read: false },
  { id: "n2", category: "Loyalty", title: "You earned 150 points", body: "Thanks for visiting Glam Studio.", time: "Yesterday", read: false },
  { id: "n3", category: "Membership", title: "Glam Gold renews in 5 days", body: "₹1,999 will be charged to Visa •••• 4242.", time: "2 days ago", read: true },
  { id: "n4", category: "Payments", title: "Payment successful", body: "₹1,500 paid for Gel Manicure.", time: "3 days ago", read: true },
  { id: "n5", category: "Promotions", title: "Monsoon glow week", body: "25% off all facials until Sunday.", time: "5 days ago", read: true },
];

export const messages = [
  { id: "m1", from: "salon" as const, text: "Hi Sarah! Emma has confirmed your Saturday 2:00 PM slot. See you soon ✨", time: "10:12 AM" },
  { id: "m2", from: "customer" as const, text: "Perfect. Could she also do a quick fringe trim?", time: "10:20 AM" },
  { id: "m3", from: "salon" as const, text: "Absolutely — we've added it at no extra cost since you're a Gold member.", time: "10:22 AM" },
];

export const reviews = [
  { id: "rv1", service: "Aroma Massage", staff: "Meera Nair", rating: 5, text: "Deeply relaxing, best hour of my month.", date: "14 Jul 2026" },
  { id: "rv2", service: "Gel Manicure", staff: "Anaya Shah", rating: 4, text: "Beautiful finish, lasted three weeks.", date: "3 Aug 2026" },
];

export const formatCurrency = (value: number) =>
  `${tenant.currency}${value.toLocaleString("en-IN")}`;
// Exact mirror of super-admin-portal/src/lib/mock-data.ts

export type TenantStatus = "active" | "trial" | "suspended" | "churned";

export type Tenant = {
  id: string;
  name: string;
  initials: string;
  owner: string;
  email: string;
  plan: "Starter" | "Professional" | "Business" | "Enterprise";
  status: TenantStatus;
  expiry: string;
  users: number;
  revenue: number;
  lastLogin: string;
  country: string;
  domain: string;
  staff: number;
  customers: number;
  bookings: number;
};

const plans = ["Starter", "Professional", "Business", "Enterprise"] as const;
const statuses: TenantStatus[] = ["active", "active", "active", "trial", "suspended", "churned"];
const names = [
  "Luxe Hair Studio", "Bloom Beauty Bar", "Nordic Nails", "Velvet & Vine Salon", "Copper Comb",
  "Gilded Glow Spa", "Ivory Room", "Urban Mane", "Serenity Skin Lab", "The Barber Union",
  "Petal & Pearl", "Aurora Aesthetics", "Cutting Room 9", "Maison Coiffure", "Sunset Spa Co.",
  "Halo Hair House", "Rouge Studio", "Marble & Moss", "Silk Thread Salon", "Atelier Blanc",
  "Lush Lounge", "Coastal Cuts", "Nova Nail Bar", "Bright Ivy Beauty", "Onyx Grooming",
];
const owners = [
  "Amelia Hart", "Rohan Mehta", "Sofia Lindqvist", "Daniel Okafor", "Priya Raman",
  "Lucas Moreau", "Hannah Weiss", "Tomás Rivera", "Yuki Tanaka", "Grace Bennett",
];
const countries = ["United States", "India", "United Kingdom", "Germany", "Australia", "Canada", "Singapore", "UAE"];

function seeded(i: number, mod: number) {
  return (i * 7919 + 104729) % mod;
}

export const tenants: Tenant[] = Array.from({ length: 48 }, (_, i) => {
  const name = names[i % names.length]! + (i >= names.length ? ` ${Math.floor(i / names.length) + 1}` : "");
  return {
    id: `tn_${(1000 + i).toString()}`,
    name,
    initials: name.replace(/[^A-Za-z ]/g, "").split(" ").filter(Boolean).slice(0, 2).map((w) => w[0]).join(""),
    owner: owners[seeded(i, owners.length)]!,
    email: `owner${i + 1}@${name.toLowerCase().replace(/[^a-z]/g, "").slice(0, 10)}.com`,
    plan: plans[seeded(i, 4)]!,
    status: statuses[seeded(i, statuses.length)]!,
    expiry: new Date(2026, seeded(i, 11), 1 + seeded(i, 27)).toISOString().slice(0, 10),
    users: 3 + seeded(i, 140),
    revenue: 480 + seeded(i, 24000),
    lastLogin: `${1 + seeded(i, 23)}h ago`,
    country: countries[seeded(i, countries.length)]!,
    domain: `${name.toLowerCase().replace(/[^a-z]/g, "").slice(0, 12)}.salonos.app`,
    staff: 2 + seeded(i, 40),
    customers: 120 + seeded(i, 9000),
    bookings: 300 + seeded(i, 18000),
  };
});

export const revenueSeries = [
  { month: "Jan", mrr: 182000, arr: 2184000, churn: 2.4, tenants: 820 },
  { month: "Feb", mrr: 194500, arr: 2334000, churn: 2.1, tenants: 869 },
  { month: "Mar", mrr: 206300, arr: 2475600, churn: 2.6, tenants: 921 },
  { month: "Apr", mrr: 221800, arr: 2661600, churn: 1.9, tenants: 987 },
  { month: "May", mrr: 238400, arr: 2860800, churn: 2.2, tenants: 1042 },
  { month: "Jun", mrr: 252900, arr: 3034800, churn: 1.7, tenants: 1108 },
  { month: "Jul", mrr: 268100, arr: 3217200, churn: 1.8, tenants: 1174 },
  { month: "Aug", mrr: 287600, arr: 3451200, churn: 1.5, tenants: 1243 },
];

export const planDistribution = [
  { name: "Starter", value: 486, color: "var(--color-chart-5)" },
  { name: "Professional", value: 412, color: "var(--color-chart-1)" },
  { name: "Business", value: 249, color: "var(--color-chart-3)" },
  { name: "Enterprise", value: 96, color: "var(--color-chart-2)" },
];

export const geoDistribution = [
  { region: "North America", tenants: 468 },
  { region: "Europe", tenants: 352 },
  { region: "Asia Pacific", tenants: 289 },
  { region: "Middle East", tenants: 92 },
  { region: "LATAM", tenants: 42 },
];

export const dauSeries = Array.from({ length: 14 }, (_, i) => ({
  day: `D${i + 1}`,
  dau: 4200 + seeded(i, 1800),
  signups: 40 + seeded(i, 60),
}));

export const recentPayments = [
  { id: "in_88213", tenant: "Luxe Hair Studio", amount: 249, status: "succeeded", date: "2 min ago", method: "Visa •••• 4242" },
  { id: "in_88212", tenant: "Nordic Nails", amount: 99, status: "succeeded", date: "18 min ago", method: "Mastercard •••• 8891" },
  { id: "in_88211", tenant: "Velvet & Vine Salon", amount: 499, status: "failed", date: "42 min ago", method: "Amex •••• 1002" },
  { id: "in_88210", tenant: "Copper Comb", amount: 149, status: "succeeded", date: "1 h ago", method: "UPI" },
  { id: "in_88209", tenant: "Gilded Glow Spa", amount: 999, status: "refunded", date: "3 h ago", method: "Visa •••• 7781" },
  { id: "in_88208", tenant: "The Barber Union", amount: 249, status: "succeeded", date: "5 h ago", method: "Visa •••• 3390" },
];

export const activityFeed = [
  { actor: "Neha Kapoor", action: "suspended tenant", target: "Rouge Studio", time: "6 min ago", type: "warning" as const },
  { actor: "System", action: "processed renewal batch", target: "412 invoices", time: "22 min ago", type: "info" as const },
  { actor: "Marcus Webb", action: "upgraded plan", target: "Ivory Room → Enterprise", time: "1 h ago", type: "success" as const },
  { actor: "Security", action: "blocked login attempts", target: "IP 41.22.8.190", time: "2 h ago", type: "destructive" as const },
  { actor: "Ana Sousa", action: "created role", target: "Billing Analyst", time: "4 h ago", type: "info" as const },
];

export const expiringTrials = tenants.filter((t) => t.status === "trial").slice(0, 5);

export const systemHealth = [
  { name: "API Gateway", uptime: "99.99%", latency: "84 ms", status: "operational" },
  { name: "Booking Engine", uptime: "99.97%", latency: "112 ms", status: "operational" },
  { name: "Payments Service", uptime: "99.92%", latency: "196 ms", status: "degraded" },
  { name: "Notification Worker", uptime: "99.99%", latency: "62 ms", status: "operational" },
];

export const planCatalog = [
  {
    name: "Starter", price: 49, yearly: 490, trial: 14, tenants: 486,
    features: ["1 location", "Up to 5 staff", "Online booking", "Email reminders", "Basic reports"],
    limits: { staff: 5, locations: 1, bookings: "1,500 / mo", storage: "5 GB" },
  },
  {
    name: "Professional", price: 149, yearly: 1490, trial: 14, tenants: 412, popular: true,
    features: ["3 locations", "Up to 20 staff", "POS & invoicing", "Loyalty program", "Advanced analytics"],
    limits: { staff: 20, locations: 3, bookings: "10,000 / mo", storage: "50 GB" },
  },
  {
    name: "Business", price: 349, yearly: 3490, trial: 21, tenants: 249,
    features: ["10 locations", "Unlimited staff", "Inventory & memberships", "Marketing automation", "Custom domain"],
    limits: { staff: 100, locations: 10, bookings: "50,000 / mo", storage: "250 GB" },
  },
  {
    name: "Enterprise", price: 899, yearly: 8990, trial: 30, tenants: 96,
    features: ["Unlimited locations", "SSO & SCIM", "Dedicated CSM", "99.99% SLA", "AI assistant + API"],
    limits: { staff: "Unlimited", locations: "Unlimited", bookings: "Unlimited", storage: "1 TB" },
  },
];

export const platformUsers = [
  { name: "Neha Kapoor", email: "neha@salonos.io", role: "Super Admin", status: "active", lastLogin: "12 min ago", mfa: true },
  { name: "Marcus Webb", email: "marcus@salonos.io", role: "Billing Manager", status: "active", lastLogin: "1 h ago", mfa: true },
  { name: "Ana Sousa", email: "ana@salonos.io", role: "Support Lead", status: "active", lastLogin: "3 h ago", mfa: false },
  { name: "Dev Patel", email: "dev@salonos.io", role: "Platform Engineer", status: "active", lastLogin: "Yesterday", mfa: true },
  { name: "Lara Fischer", email: "lara@salonos.io", role: "Analyst", status: "suspended", lastLogin: "12 days ago", mfa: false },
  { name: "Owen Blake", email: "owen@salonos.io", role: "Support Agent", status: "invited", lastLogin: "—", mfa: false },
];

export const roles = [
  { name: "Super Admin", users: 3, description: "Unrestricted access across the platform", scope: "Global" },
  { name: "Billing Manager", users: 6, description: "Invoices, refunds, payment gateways", scope: "Finance" },
  { name: "Support Lead", users: 4, description: "Tickets, tenant impersonation, SLAs", scope: "Support" },
  { name: "Platform Engineer", users: 9, description: "Feature flags, integrations, system health", scope: "Engineering" },
  { name: "Analyst", users: 12, description: "Read-only analytics and exports", scope: "Read only" },
];

export const permissionModules = [
  { module: "Tenants", perms: ["View", "Create", "Update", "Suspend", "Delete"] },
  { module: "Subscriptions", perms: ["View", "Create", "Update", "Suspend", "Delete"] },
  { module: "Billing", perms: ["View", "Create", "Update", "Suspend", "Delete"] },
  { module: "Users", perms: ["View", "Create", "Update", "Suspend", "Delete"] },
  { module: "Security", perms: ["View", "Create", "Update", "Suspend", "Delete"] },
  { module: "Settings", perms: ["View", "Create", "Update", "Suspend", "Delete"] },
];

export const featureFlags = [
  { name: "Online Booking", description: "Public booking pages and widgets", enabled: true, rollout: "100%" },
  { name: "POS", description: "In-salon point of sale and receipts", enabled: true, rollout: "100%" },
  { name: "Loyalty", description: "Points, tiers and rewards", enabled: true, rollout: "82%" },
  { name: "Memberships", description: "Recurring client memberships", enabled: true, rollout: "64%" },
  { name: "Inventory", description: "Stock tracking and purchase orders", enabled: false, rollout: "0%" },
  { name: "Marketing", description: "Campaigns, segments and automations", enabled: true, rollout: "45%" },
  { name: "Reviews", description: "Post-visit review collection", enabled: true, rollout: "100%" },
  { name: "Blogs", description: "Tenant content publishing", enabled: false, rollout: "0%" },
  { name: "AI Assistant", description: "Copilot for scheduling and insights", enabled: true, rollout: "12%" },
  { name: "WhatsApp Integration", description: "Reminders over WhatsApp Business", enabled: true, rollout: "38%" },
];

export const tickets = [
  { id: "TK-4821", subject: "Payout not received for August", tenant: "Luxe Hair Studio", priority: "urgent", status: "open", sla: "1h 12m", agent: "Ana Sousa", updated: "8 min ago" },
  { id: "TK-4820", subject: "Cannot import client list (CSV)", tenant: "Nordic Nails", priority: "high", status: "pending", sla: "4h 02m", agent: "Owen Blake", updated: "35 min ago" },
  { id: "TK-4819", subject: "Custom domain SSL pending", tenant: "Atelier Blanc", priority: "medium", status: "open", sla: "9h 44m", agent: "Dev Patel", updated: "1 h ago" },
  { id: "TK-4818", subject: "Request: additional staff seats", tenant: "Urban Mane", priority: "low", status: "resolved", sla: "—", agent: "Ana Sousa", updated: "3 h ago" },
  { id: "TK-4817", subject: "Double charge on renewal", tenant: "Copper Comb", priority: "urgent", status: "pending", sla: "0h 26m", agent: "Marcus Webb", updated: "4 h ago" },
  { id: "TK-4816", subject: "SMS reminders delayed", tenant: "Halo Hair House", priority: "high", status: "closed", sla: "—", agent: "Dev Patel", updated: "Yesterday" },
];

export const auditLogs = [
  { id: 1, actor: "neha@salonos.io", action: "tenant.suspend", module: "Tenants", target: "Rouge Studio", ip: "203.0.113.24", device: "MacBook Pro", browser: "Chrome 141", time: "2026-08-20 14:12" },
  { id: 2, actor: "marcus@salonos.io", action: "invoice.refund", module: "Billing", target: "in_88209", ip: "198.51.100.7", device: "Windows 11", browser: "Edge 139", time: "2026-08-20 13:48" },
  { id: 3, actor: "system", action: "subscription.renew_batch", module: "Subscriptions", target: "412 tenants", ip: "internal", device: "Worker", browser: "—", time: "2026-08-20 13:00" },
  { id: 4, actor: "dev@salonos.io", action: "feature_flag.update", module: "Features", target: "AI Assistant → 12%", ip: "192.0.2.55", device: "Linux", browser: "Firefox 133", time: "2026-08-20 11:31" },
  { id: 5, actor: "ana@salonos.io", action: "tenant.impersonate", module: "Support", target: "Nordic Nails", ip: "203.0.113.99", device: "iPad Pro", browser: "Safari 19", time: "2026-08-20 10:04" },
  { id: 6, actor: "unknown", action: "auth.failed_login", module: "Security", target: "owen@salonos.io", ip: "41.22.8.190", device: "Unknown", browser: "curl", time: "2026-08-20 09:22" },
];

export const integrations = [
  { name: "Stripe", category: "Payments", status: "connected", detail: "acct_1P9•••  · live mode" },
  { name: "Razorpay", category: "Payments", status: "connected", detail: "rzp_live_9K•••" },
  { name: "SMTP (Postmark)", category: "Email", status: "connected", detail: "smtp.postmarkapp.com" },
  { name: "Twilio", category: "SMS", status: "attention", detail: "Low balance · $12.40" },
  { name: "WhatsApp Business", category: "Messaging", status: "connected", detail: "2 numbers verified" },
  { name: "Google Calendar", category: "Calendar", status: "connected", detail: "OAuth · 812 tenants" },
  { name: "Microsoft Calendar", category: "Calendar", status: "disconnected", detail: "Not configured" },
  { name: "Webhooks", category: "Developer", status: "connected", detail: "14 endpoints · 99.4% delivery" },
];

export const notifications = [
  { title: "Payment failure spike", body: "18 failed renewals in the last hour on Razorpay.", type: "destructive" as const, time: "12 min ago" },
  { title: "New enterprise tenant", body: "Ivory Room upgraded to Enterprise (annual).", type: "success" as const, time: "1 h ago" },
  { title: "Scheduled maintenance", body: "Database failover drill on Aug 24, 02:00–03:00 UTC.", type: "info" as const, time: "5 h ago" },
  { title: "Trial expiring", body: "23 trials end within 48 hours.", type: "warning" as const, time: "Yesterday" },
];

export const sessions = [
  { user: "neha@salonos.io", device: "MacBook Pro · Chrome", ip: "203.0.113.24", location: "Berlin, DE", started: "2 h ago" },
  { user: "marcus@salonos.io", device: "Windows 11 · Edge", ip: "198.51.100.7", location: "Austin, US", started: "5 h ago" },
  { user: "ana@salonos.io", device: "iPad Pro · Safari", ip: "203.0.113.99", location: "Lisbon, PT", started: "1 d ago" },
];

export const apiKeys = [
  { label: "Production server key", prefix: "sk_live_7f2•••", created: "Mar 04, 2026", lastUsed: "3 min ago", scope: "Full access" },
  { label: "Analytics read-only", prefix: "sk_live_a19•••", created: "Jan 22, 2026", lastUsed: "2 h ago", scope: "Read" },
  { label: "Staging key", prefix: "sk_test_c40•••", created: "Jun 11, 2026", lastUsed: "Yesterday", scope: "Full access" },
];

export const invoices = [
  { id: "INV-2026-0918", tenant: "Ivory Room", plan: "Enterprise", amount: 8990, status: "paid", issued: "Aug 18, 2026", due: "Aug 25, 2026" },
  { id: "INV-2026-0917", tenant: "Luxe Hair Studio", plan: "Business", amount: 349, status: "paid", issued: "Aug 18, 2026", due: "Aug 25, 2026" },
  { id: "INV-2026-0916", tenant: "Velvet & Vine Salon", plan: "Professional", amount: 149, status: "overdue", issued: "Aug 12, 2026", due: "Aug 19, 2026" },
  { id: "INV-2026-0915", tenant: "Nordic Nails", plan: "Starter", amount: 49, status: "paid", issued: "Aug 11, 2026", due: "Aug 18, 2026" },
  { id: "INV-2026-0914", tenant: "Copper Comb", plan: "Professional", amount: 149, status: "open", issued: "Aug 10, 2026", due: "Aug 24, 2026" },
  { id: "INV-2026-0913", tenant: "Gilded Glow Spa", plan: "Business", amount: 349, status: "refunded", issued: "Aug 08, 2026", due: "Aug 15, 2026" },
];

export const currency = (n: number) =>
  new Intl.NumberFormat("en-US", { style: "currency", currency: "USD", maximumFractionDigits: 0 }).format(n);

export const compact = (n: number) =>
  new Intl.NumberFormat("en-US", { notation: "compact", maximumFractionDigits: 1 }).format(n);

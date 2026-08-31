// Mock data matching super-admin-portal for CMS admin portal

export const currency = (n: number) =>
  new Intl.NumberFormat("en-US", { style: "currency", currency: "USD", maximumFractionDigits: 0 }).format(n);

export const compact = (n: number) =>
  new Intl.NumberFormat("en-US", { notation: "compact", maximumFractionDigits: 1 }).format(n);

export const tenants = [
  { id: "t-001", name: "Bloom Beauty Spa", domain: "bloombeauty.com", owner: "Emma Bloom", email: "emma@bloombeauty.com", plan: "Business", status: "active", users: 8, staff: 10, customers: 420, bookings: 1240, revenue: 5988, expiry: "Sep 15, 2026", lastLogin: "2 min ago", initials: "BB", country: "United States" },
  { id: "t-002", name: "Glamour Studio", domain: "glamour.studio", owner: "Sarah Glam", email: "sarah@glamour.studio", plan: "Business", status: "active", users: 6, staff: 8, customers: 310, bookings: 890, revenue: 5988, expiry: "Oct 1, 2026", lastLogin: "15 min ago", initials: "GS", country: "United Kingdom" },
  { id: "t-003", name: "Luxury Nails", domain: "luxurynails.com", owner: "James Lux", email: "james@luxurynails.com", plan: "Professional", status: "active", users: 12, staff: 15, customers: 580, bookings: 2100, revenue: 11976, expiry: "Aug 30, 2026", lastLogin: "1 hour ago", initials: "LN", country: "Canada" },
  { id: "t-004", name: "Elite Styles", domain: "elitestyles.co", owner: "Mike Elite", email: "mike@elitestyles.co", plan: "Starter", status: "suspended", users: 3, staff: 4, customers: 120, bookings: 340, revenue: 594, expiry: "Jul 20, 2026", lastLogin: "2 days ago", initials: "ES", country: "Australia" },
  { id: "t-005", name: "Serenity Day Spa", domain: "serenityspa.com", owner: "Lisa Calm", email: "lisa@serenityspa.com", plan: "Trial", status: "trial", users: 5, staff: 6, customers: 80, bookings: 190, revenue: 0, expiry: "Jul 1, 2026", lastLogin: "5 min ago", initials: "SD", country: "Germany" },
  { id: "t-006", name: "QuickCuts Salon", domain: "quickcuts.com", owner: "Tom Quick", email: "tom@quickcuts.com", plan: "Business", status: "suspended", users: 4, staff: 5, customers: 200, bookings: 560, revenue: 2394, expiry: "Jun 15, 2026", lastLogin: "3 days ago", initials: "QC", country: "India" },
  { id: "t-007", name: "The Barbershop Co.", domain: "barbershop.co", owner: "Alex Barber", email: "alex@barbershop.co", plan: "Enterprise", status: "active", users: 20, staff: 25, customers: 890, bookings: 3200, revenue: 19980, expiry: "Dec 31, 2026", lastLogin: "10 min ago", initials: "BC", country: "United States" },
  { id: "t-008", name: "Nail Artistry", domain: "nailartistry.com", owner: "Nina Art", email: "nina@nailartistry.com", plan: "Starter", status: "active", users: 3, staff: 3, customers: 95, bookings: 280, revenue: 594, expiry: "Nov 15, 2026", lastLogin: "1 day ago", initials: "NA", country: "France" },
  { id: "t-009", name: "Style Studio", domain: "stylestudio.com", owner: "Chris Style", email: "chris@stylestudio.com", plan: "Business", status: "active", users: 7, staff: 9, customers: 350, bookings: 980, revenue: 4192, expiry: "Oct 20, 2026", lastLogin: "3 hours ago", initials: "SS", country: "Japan" },
  { id: "t-010", name: "Divine Cuts", domain: "divinecuts.com", owner: "Divine D.", email: "divine@divinecuts.com", plan: "Professional", status: "active", users: 10, staff: 12, customers: 480, bookings: 1560, revenue: 8982, expiry: "Sep 5, 2026", lastLogin: "30 min ago", initials: "DC", country: "Brazil" },
  { id: "t-011", name: "Golden Touch Spa", domain: "goldentouch.com", owner: "Grace Gold", email: "grace@goldentouch.com", plan: "Enterprise", status: "trial", users: 15, staff: 18, customers: 720, bookings: 2400, revenue: 0, expiry: "Jul 24, 2026", lastLogin: "1 hour ago", initials: "GT", country: "Singapore" },
  { id: "t-012", name: "Prestige Barber", domain: "prestigebarber.com", owner: "Paul Prestige", email: "paul@prestigebarber.com", plan: "Business", status: "active", users: 5, staff: 7, customers: 280, bookings: 750, revenue: 2990, expiry: "Nov 1, 2026", lastLogin: "2 hours ago", initials: "PB", country: "Italy" },
] as const;

export const invoices = [
  { id: "INV-2026-0917", tenant: "Bloom Beauty Spa", plan: "Business", issued: "Aug 18, 2026", due: "Sep 17, 2026", amount: 299, status: "paid" },
  { id: "INV-2026-0916", tenant: "Glamour Studio", plan: "Business", issued: "Aug 17, 2026", due: "Sep 16, 2026", amount: 299, status: "paid" },
  { id: "INV-2026-0915", tenant: "Luxury Nails", plan: "Professional", issued: "Aug 16, 2026", due: "Sep 15, 2026", amount: 599, status: "paid" },
  { id: "INV-2026-0914", tenant: "Elite Styles", plan: "Starter", issued: "Aug 15, 2026", due: "Sep 14, 2026", amount: 99, status: "overdue" },
  { id: "INV-2026-0913", tenant: "The Barbershop Co.", plan: "Enterprise", issued: "Aug 14, 2026", due: "Sep 13, 2026", amount: 999, status: "paid" },
  { id: "INV-2026-0912", tenant: "Style Studio", plan: "Business", issued: "Aug 13, 2026", due: "Sep 12, 2026", amount: 299, status: "paid" },
  { id: "INV-2026-0911", tenant: "Divine Cuts", plan: "Professional", issued: "Aug 12, 2026", due: "Sep 11, 2026", amount: 599, status: "pending" },
  { id: "INV-2026-0910", tenant: "Nail Artistry", plan: "Starter", issued: "Aug 11, 2026", due: "Sep 10, 2026", amount: 99, status: "paid" },
];

export const recentPayments = [
  { id: "PAY-8847", tenant: "Bloom Beauty Spa", amount: 299, method: "Visa •••• 4242", date: "Aug 19, 2026", status: "succeeded" },
  { id: "PAY-8846", tenant: "Glamour Studio", amount: 299, method: "Mastercard •••• 5555", date: "Aug 18, 2026", status: "succeeded" },
  { id: "PAY-8845", tenant: "Luxury Nails", amount: 599, method: "Visa •••• 4242", date: "Aug 17, 2026", status: "succeeded" },
  { id: "PAY-8844", tenant: "The Barbershop Co.", amount: 999, method: "Amex •••• 3782", date: "Aug 16, 2026", status: "succeeded" },
  { id: "PAY-8843", tenant: "Style Studio", amount: 299, method: "Visa •••• 4242", date: "Aug 15, 2026", status: "succeeded" },
  { id: "PAY-8842", tenant: "Elite Styles", amount: 99, method: "Mastercard •••• 5555", date: "Aug 14, 2026", status: "pending" },
  { id: "PAY-8841", tenant: "Nail Artistry", amount: 99, method: "Visa •••• 4242", date: "Aug 13, 2026", status: "succeeded" },
  { id: "PAY-8840", tenant: "Divine Cuts", amount: 599, method: "Bank transfer", date: "Aug 12, 2026", status: "failed" },
];

export const revenueSeries = [
  { month: "Jan", mrr: 198400, arr: 2380800, churn: 2.8, tenants: 892 },
  { month: "Feb", mrr: 212800, arr: 2553600, churn: 2.6, tenants: 924 },
  { month: "Mar", mrr: 224100, arr: 2689200, churn: 2.4, tenants: 958 },
  { month: "Apr", mrr: 235600, arr: 2827200, churn: 2.3, tenants: 991 },
  { month: "May", mrr: 248900, arr: 2986800, churn: 2.1, tenants: 1028 },
  { month: "Jun", mrr: 259200, arr: 3110400, churn: 2.0, tenants: 1065 },
  { month: "Jul", mrr: 272400, arr: 3268800, churn: 1.8, tenants: 1108 },
  { month: "Aug", mrr: 287600, arr: 3451200, churn: 1.5, tenants: 1243 },
];

export const dauSeries = [
  { day: "Mon", dau: 4230 }, { day: "Tue", dau: 4780 }, { day: "Wed", dau: 5120 },
  { day: "Thu", dau: 4890 }, { day: "Fri", dau: 5340 }, { day: "Sat", dau: 6120 },
  { day: "Sun", dau: 4450 }, { day: "Mon", dau: 4310 }, { day: "Tue", dau: 4920 },
  { day: "Wed", dau: 5280 }, { day: "Thu", dau: 5010 }, { day: "Fri", dau: 5480 },
  { day: "Sat", dau: 6290 }, { day: "Sun", dau: 4580 },
];

export const planDistribution = [
  { name: "Starter", value: 485, color: "#3b82f6" },
  { name: "Business", value: 372, color: "#10b981" },
  { name: "Professional", value: 218, color: "#d4a853" },
  { name: "Enterprise", value: 89, color: "#8b5cf6" },
];

export const geoDistribution = [
  { region: "United States", tenants: 468 },
  { region: "United Kingdom", tenants: 187 },
  { region: "India", tenants: 156 },
  { region: "Canada", tenants: 124 },
  { region: "Germany", tenants: 98 },
  { region: "Australia", tenants: 87 },
  { region: "France", tenants: 63 },
  { region: "Other", tenants: 60 },
];

export const systemHealth = [
  { name: "API Gateway", uptime: "99.99%", latency: "12ms", status: "operational" },
  { name: "Database Cluster", uptime: "99.98%", latency: "3ms", status: "operational" },
  { name: "CDN / Static Assets", uptime: "100%", latency: "8ms", status: "operational" },
  { name: "Payment Processing", uptime: "99.95%", latency: "45ms", status: "operational" },
  { name: "Email Service", uptime: "99.90%", latency: "120ms", status: "degraded" },
];

export const expiringTrials = [
  { id: "t-005", name: "Serenity Day Spa", expiry: "Jun 29" },
  { id: "t-011", name: "Golden Touch Spa", expiry: "Jul 12" },
  { id: "t-004", name: "Elite Styles", expiry: "Jul 20" },
];

export const activityFeed = [
  { actor: "System", action: "auto-renewed subscription for", target: "Bloom Beauty Spa", time: "2 min ago" },
  { actor: "Emma Bloom", action: "upgraded plan to", target: "Business", time: "15 min ago" },
  { actor: "System", action: "suspended", target: "QuickCuts Salon (payment overdue)", time: "1 hour ago" },
  { actor: "Admin", action: "created new role", target: "Support Lead", time: "3 hours ago" },
  { actor: "James Lux", action: "added 3 staff seats for", target: "Luxury Nails", time: "5 hours ago" },
  { actor: "System", action: "completed payout to", target: "The Barbershop Co.", time: "8 hours ago" },
];

export const platformUsers = [
  { name: "Neha Kapoor", email: "neha@salonos.io", role: "Super Admin", status: "active", mfa: true, lastLogin: "2 min ago" },
  { name: "Owen Marsh", email: "owen@salonos.io", role: "Billing Manager", status: "active", mfa: true, lastLogin: "1 hour ago" },
  { name: "Lara Chen", email: "lara@salonos.io", role: "Support Lead", status: "active", mfa: true, lastLogin: "30 min ago" },
  { name: "Marcus Webb", email: "marcus@salonos.io", role: "Billing Manager", status: "active", mfa: true, lastLogin: "3 hours ago" },
  { name: "Ana Sousa", email: "ana@salonos.io", role: "Support Agent", status: "active", mfa: false, lastLogin: "5 hours ago" },
  { name: "Ravi Patel", email: "ravi@salonos.io", role: "Analyst", status: "active", mfa: true, lastLogin: "1 day ago" },
  { name: "Sofia Rivera", email: "sofia@salonos.io", role: "Support Agent", status: "active", mfa: false, lastLogin: "2 days ago" },
  { name: "Tom Baker", email: "tom@salonos.io", role: "Analyst", status: "suspended", mfa: false, lastLogin: "14 days ago" },
];

export const roles = [
  { name: "Super Admin", description: "Full access to all platform features and settings", scope: "Global", users: 2 },
  { name: "Billing Manager", description: "Manages subscriptions, invoices, refunds and payment gateways", scope: "Revenue", users: 2 },
  { name: "Support Lead", description: "Triages and escalates support tickets, manages SLA compliance", scope: "Operations", users: 1 },
  { name: "Support Agent", description: "Handles tenant support tickets and live chat", scope: "Operations", users: 3 },
  { name: "Analyst", description: "Read-only access to dashboards, reports and audit logs", scope: "Read-only", users: 2 },
];

export const permissionModules = [
  { module: "Tenants", perms: ["View", "Create", "Update", "Suspend", "Delete"] },
  { module: "Users", perms: ["View", "Create", "Update", "Suspend", "Delete"] },
  { module: "Billing", perms: ["View", "Create", "Update", "Suspend", "Delete"] },
  { module: "Plans", perms: ["View", "Create", "Update", "Suspend", "Delete"] },
  { module: "Support", perms: ["View", "Create", "Update", "Suspend", "Delete"] },
  { module: "Settings", perms: ["View", "Create", "Update", "Suspend", "Delete"] },
  { module: "Audit Logs", perms: ["View", "Create", "Update", "Suspend", "Delete"] },
];

export const planCatalog = [
  { name: "Starter", price: 99, yearly: 999, trial: 14, tenants: 485, popular: false, features: ["Up to 3 staff", "Basic analytics", "Email support", "1 salon location", "Booking widget"], limits: { staff: 3, locations: 1, "api calls": "1K/mo", storage: "1 GB" } },
  { name: "Business", price: 299, yearly: 2999, trial: 14, tenants: 372, popular: true, features: ["Up to 10 staff", "Advanced analytics", "Priority support", "3 salon locations", "Marketing tools", "API access"], limits: { staff: 10, locations: 3, "api calls": "10K/mo", storage: "10 GB" } },
  { name: "Professional", price: 599, yearly: 5999, trial: 14, tenants: 218, popular: false, features: ["Unlimited staff", "Full analytics suite", "24/7 phone support", "Unlimited locations", "Marketing automation", "API access", "Custom domain"], limits: { staff: "Unlimited", locations: "Unlimited", "api calls": "50K/mo", storage: "50 GB" } },
  { name: "Enterprise", price: 999, yearly: 9999, trial: 30, tenants: 89, popular: false, features: ["Everything in Professional", "Dedicated account manager", "Custom integrations", "SLA guarantee", "On-premise option", "Advanced security", "Multi-region deployment"], limits: { staff: "Unlimited", locations: "Unlimited", "api calls": "Unlimited", storage: "Unlimited" } },
];

export const featureFlags = [
  { name: "Online Booking", description: "Allow tenants to accept online bookings through the booking widget", enabled: true, rollout: "90%" },
  { name: "Payment Processing", description: "Enable in-platform payment collection via Stripe/Razorpay", enabled: true, rollout: "72%" },
  { name: "Marketing Tools", description: "Email campaigns, SMS notifications, and promo code engine", enabled: true, rollout: "52%" },
  { name: "Advanced Analytics", description: "In-depth business intelligence with custom reports and dashboards", enabled: false, rollout: "27%" },
  { name: "API Access", description: "REST API access for third-party integrations and custom development", enabled: true, rollout: "17%" },
  { name: "Custom Domain", description: "Allow tenants to use their own domain name for their salon page", enabled: true, rollout: "15%" },
  { name: "Inventory Management", description: "Track product inventory, stock levels, and supplier management", enabled: false, rollout: "12%" },
  { name: "Loyalty Program", description: "Points-based loyalty system with rewards and referral bonuses", enabled: false, rollout: "8%" },
];

export const notifications = [
  { title: "Payment failed for Elite Styles", body: "Invoice INV-2026-0914 ($99) payment was declined. Retrying in 24 hours.", time: "10 min ago", type: "warning" },
  { title: "New tenant registered", body: "Golden Touch Spa joined on Enterprise trial.", time: "30 min ago", type: "info" },
  { title: "SLA breach risk", body: "4 support tickets are within 1 hour of SLA breach.", time: "1 hour ago", type: "destructive" },
  { title: "Plan upgraded", body: "Luxury Nails upgraded from Business to Professional.", time: "2 hours ago", type: "success" },
  { title: "Scheduled maintenance", body: "Database migration tonight 02:00–04:00 UTC.", time: "3 hours ago", type: "info" },
  { title: "Monthly payout completed", body: "$127,400 distributed to 1,041 active tenants.", time: "5 hours ago", type: "success" },
];

export const integrations = [
  { name: "Stripe", category: "Payment Gateway", status: "connected", detail: "Primary payment processor. Handles 82% of platform transactions with 98.4% success rate." },
  { name: "Razorpay", category: "Payment Gateway", status: "connected", detail: "Secondary gateway for Indian market. Handles INR transactions with 94.1% success rate." },
  { name: "SendGrid", category: "Email", status: "connected", detail: "Transactional email delivery for invoices, notifications and tenant communications." },
  { name: "Twilio", category: "SMS", status: "connected", detail: "SMS notifications for appointment reminders, payment alerts and security codes." },
  { name: "Google Calendar", category: "Calendar", status: "connected", detail: "Two-way calendar sync for salon appointment scheduling." },
  { name: "Zapier", category: "Automation", status: "operational", detail: "Workflow automation connecting SalonOS to 5,000+ apps." },
  { name: "Slack", category: "Notifications", status: "operational", detail: "Internal team notifications for support tickets and system alerts." },
  { name: "Segment", category: "Analytics", status: "operational", detail: "Customer data platform for unified analytics and audience building." },
  { name: "AWS S3", category: "Storage", status: "connected", detail: "Cloud storage for tenant assets, backups and media files." },
];

export const sessions = [
  { user: "neha@salonos.io", device: "MacBook Pro — Chrome 127", ip: "203.0.113.24", location: "Berlin, DE", started: "Aug 19, 08:04" },
  { user: "owen@salonos.io", device: "iPhone 15 — Safari", ip: "198.51.100.7", location: "London, UK", started: "Aug 19, 09:32" },
  { user: "lara@salonos.io", device: "Windows PC — Firefox 130", ip: "77.11.4.2", location: "Warsaw, PL", started: "Aug 19, 10:15" },
  { user: "marcus@salonos.io", device: "MacBook Air — Chrome 127", ip: "192.0.2.42", location: "New York, US", started: "Aug 18, 14:22" },
  { user: "ana@salonos.io", device: "iPad Pro — Safari", ip: "203.0.113.88", location: "Lisbon, PT", started: "Aug 18, 16:45" },
];

export const apiKeys = [
  { label: "Production API Key", prefix: "sk_live_a1b2…", scope: "Full access", created: "Mar 12, 2026", lastUsed: "2 min ago" },
  { label: "Staging API Key", prefix: "sk_test_c3d4…", scope: "Full access", created: "Mar 12, 2026", lastUsed: "1 hour ago" },
  { label: "Webhook Integration", prefix: "whsec_e5f6…", scope: "Read-only", created: "Jun 8, 2026", lastUsed: "30 min ago" },
  { label: "Analytics Service", prefix: "ak_analytics_g7h8…", scope: "Analytics only", created: "Jul 20, 2026", lastUsed: "5 hours ago" },
];

export const tickets = [
  { id: "TKT-1047", subject: "August payout hasn't landed", tenant: "Bloom Beauty Spa", priority: "high", status: "open", agent: "Ana Sousa", updated: "2 min ago", sla: "2h 18m" },
  { id: "TKT-1046", subject: "Custom domain verification failing", tenant: "The Barbershop Co.", priority: "medium", status: "open", agent: "Lara Chen", updated: "15 min ago", sla: "4h 42m" },
  { id: "TKT-1045", subject: "Can't access billing dashboard", tenant: "Luxury Nails", priority: "high", status: "pending", agent: "Marcus Webb", updated: "1 hour ago", sla: "1h 55m" },
  { id: "TKT-1044", subject: "Feature request: API rate limit increase", tenant: "Divine Cuts", priority: "low", status: "open", agent: "Ana Sousa", updated: "2 hours ago", sla: "6h 30m" },
  { id: "TKT-1043", subject: "Mobile app crashing on booking flow", tenant: "Style Studio", priority: "urgent", status: "open", agent: "Lara Chen", updated: "3 hours ago", sla: "45m" },
  { id: "TKT-1042", subject: "Invoice discrepancy for July", tenant: "Elite Styles", priority: "medium", status: "resolved", agent: "Marcus Webb", updated: "1 day ago", sla: "—" },
  { id: "TKT-1041", subject: "Password reset not working", tenant: "Nail Artistry", priority: "high", status: "closed", agent: "Ana Sousa", updated: "2 days ago", sla: "—" },
];

export const auditLogs = [
  { id: 1, time: "Aug 19, 2026 10:42:18", actor: "neha@salonos.io", action: "role.update", module: "Roles", target: "Support Lead", ip: "203.0.113.24", device: "MacBook Pro", browser: "Chrome 127" },
  { id: 2, time: "Aug 19, 2026 10:38:05", actor: "system", action: "tenant.auto_suspend", module: "Tenants", target: "QuickCuts Salon", ip: "—", device: "—", browser: "—" },
  { id: 3, time: "Aug 19, 2026 10:15:44", actor: "owen@salonos.io", action: "invoice.retry", module: "Billing", target: "INV-2026-0914", ip: "198.51.100.7", device: "iPhone 15", browser: "Safari" },
  { id: 4, time: "Aug 19, 2026 09:52:31", actor: "lara@salonos.io", action: "ticket.assign", module: "Support", target: "TKT-1043", ip: "77.11.4.2", device: "Windows PC", browser: "Firefox 130" },
  { id: 5, time: "Aug 19, 2026 09:30:12", actor: "marcus@salonos.io", action: "plan.create", module: "Plans", target: "Enterprise Plus", ip: "192.0.2.42", device: "MacBook Air", browser: "Chrome 127" },
  { id: 6, time: "Aug 19, 2026 09:14:08", actor: "neha@salonos.io", action: "user.invite", module: "Users", target: "sofia@salonos.io", ip: "203.0.113.24", device: "MacBook Pro", browser: "Chrome 127" },
  { id: 7, time: "Aug 19, 2026 08:55:22", actor: "system", action: "payout.complete", module: "Billing", target: "$127,400 batch", ip: "—", device: "—", browser: "—" },
  { id: 8, time: "Aug 19, 2026 08:30:01", actor: "ana@salonos.io", action: "ticket.resolve", module: "Support", target: "TKT-1038", ip: "203.0.113.88", device: "iPad Pro", browser: "Safari" },
];

export const ticketsOld = tickets;

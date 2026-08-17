export type PermissionAction = 'view' | 'create' | 'edit' | 'delete' | 'approve' | 'export' | 'manage';

export type ModuleId =
  | 'dashboard'
  | 'appointments'
  | 'calendar'
  | 'customers'
  | 'staff'
  | 'roles'
  | 'services'
  | 'inventory'
  | 'pos'
  | 'finance'
  | 'marketing'
  | 'cms'
  | 'reports'
  | 'notifications'
  | 'settings'
  | 'subscription';

export type Permissions = Partial<Record<ModuleId, PermissionAction[]>>;

export type RoleId = 'owner' | 'manager' | 'receptionist' | 'stylist' | 'accountant' | string;

export interface Role {
  id: RoleId;
  name: string;
  description: string;
  custom?: boolean;
  members: number;
  permissions: Permissions;
}

const ALL: PermissionAction[] = ['view', 'create', 'edit', 'delete', 'approve', 'export', 'manage'];
const READ: PermissionAction[] = ['view'];
const READ_EXPORT: PermissionAction[] = ['view', 'export'];
const OPERATE: PermissionAction[] = ['view', 'create', 'edit'];

export const MODULES: { id: ModuleId; label: string }[] = [
  { id: 'dashboard', label: 'Dashboard' },
  { id: 'appointments', label: 'Appointments' },
  { id: 'calendar', label: 'Calendar' },
  { id: 'customers', label: 'Customers & CRM' },
  { id: 'staff', label: 'Staff' },
  { id: 'roles', label: 'Roles & Permissions' },
  { id: 'services', label: 'Services & Packages' },
  { id: 'inventory', label: 'Inventory' },
  { id: 'pos', label: 'Point of Sale' },
  { id: 'finance', label: 'Finance' },
  { id: 'marketing', label: 'Marketing' },
  { id: 'cms', label: 'Website CMS' },
  { id: 'reports', label: 'Reports & Analytics' },
  { id: 'notifications', label: 'Notifications' },
  { id: 'settings', label: 'Settings' },
  { id: 'subscription', label: 'Subscription & Billing' },
];

export const ROLES: Role[] = [
  {
    id: 'owner',
    name: 'Owner',
    description: 'Unrestricted access to every module, billing and business configuration.',
    members: 2,
    permissions: Object.fromEntries(MODULES.map((m) => [m.id, ALL])) as Permissions,
  },
  {
    id: 'manager',
    name: 'Manager',
    description: 'Runs daily operations, staffing, inventory and reporting.',
    members: 3,
    permissions: {
      dashboard: READ,
      appointments: ALL,
      calendar: ALL,
      customers: ALL,
      staff: ['view', 'create', 'edit', 'approve'],
      services: OPERATE,
      inventory: ALL,
      pos: OPERATE,
      finance: READ_EXPORT,
      marketing: OPERATE,
      reports: READ_EXPORT,
      notifications: READ,
      settings: READ,
    },
  },
  {
    id: 'receptionist',
    name: 'Receptionist',
    description: 'Front desk: bookings, walk-ins, checkout and customer records.',
    members: 4,
    permissions: {
      dashboard: READ,
      appointments: OPERATE,
      calendar: OPERATE,
      customers: OPERATE,
      pos: OPERATE,
      notifications: READ,
    },
  },
  {
    id: 'stylist',
    name: 'Stylist',
    description: 'Own schedule, assigned clients and availability only.',
    members: 11,
    permissions: {
      dashboard: READ,
      appointments: ['view', 'edit'],
      calendar: READ,
      customers: READ,
      notifications: READ,
    },
  },
  {
    id: 'accountant',
    name: 'Accountant',
    description: 'Financial records, invoices, taxes and exports.',
    members: 1,
    permissions: {
      dashboard: READ,
      finance: ['view', 'create', 'edit', 'approve', 'export'],
      reports: READ_EXPORT,
      inventory: READ,
      notifications: READ,
    },
  },
  {
    id: 'social-lead',
    name: 'Social Lead',
    description: 'Custom role — owns campaigns, reviews and the public website.',
    custom: true,
    members: 1,
    permissions: {
      dashboard: READ,
      marketing: ALL,
      cms: ALL,
      customers: READ,
      reports: READ,
      notifications: READ,
    },
  },
];

export function roleById(id: RoleId): Role {
  return ROLES.find((r) => r.id === id) ?? ROLES[0]!;
}

export function can(role: Role, module: ModuleId, action: PermissionAction = 'view'): boolean {
  return role.permissions[module]?.includes(action) ?? false;
}

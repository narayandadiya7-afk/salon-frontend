/**
 * api.constant.ts
 * Defines all API endpoint constants.
 */

// ─── Legacy ───────────────────────────────────────────────────────────────────
export const ApiSignin = 'signin';

// ─── Auth (Prisma-based) ──────────────────────────────────────────────────────
export const ApiAuthRegister = 'auth/register';
export const ApiAuthLogin = 'auth/login';
export const ApiAuthProfile = 'auth/profile';

// ─── Public Salon ─────────────────────────────────────────────────────────────
export const ApiGetSalonBySlug = (slug: string) => `salons/slug/${slug}`;
export const ApiResolveTenant = (slug: string) => `tenant/${slug}`;
export const ApiTenantServices = (slug: string) => `tenant/${slug}/services`;
export const ApiTenantSlots = (slug: string) => `tenant/${slug}/slots`;
export const ApiTenantBook = (slug: string) => `tenant/${slug}/book`;
export const ApiGetSalonServices = (salonId: string) => `salons/${salonId}/services`;
export const ApiGetAvailableSlots = (salonId: string) => `salons/${salonId}/slots`;
export const ApiBookAppointment = (salonId: string) => `salons/${salonId}/book`;
export const ApiCancelAppointment = (appointmentId: string) => `appointments/${appointmentId}/cancel`;

// ─── Owner Dashboard ──────────────────────────────────────────────────────────
export const ApiOwnerSalon = 'owner/salon';
export const ApiUpdateSalon = (salonId: string) => `owner/salons/${salonId}`;
export const ApiUpdateWorkingHours = (salonId: string) => `owner/salons/${salonId}/working-hours`;

// Services
export const ApiCreateService = (salonId: string) => `owner/salons/${salonId}/services`;
export const ApiOwnerServices = (salonId: string) => `owner/salons/${salonId}/services`;
export const ApiUpdateService = (salonId: string, serviceId: string) => `owner/salons/${salonId}/services/${serviceId}`;
export const ApiDeleteService = (salonId: string, serviceId: string) => `owner/salons/${salonId}/services/${serviceId}`;

// Appointments
export const ApiOwnerAppointments = (salonId: string) => `owner/salons/${salonId}/appointments`;
export const ApiUpdateAppointmentStatus = (salonId: string, appointmentId: string) =>
  `owner/salons/${salonId}/appointments/${appointmentId}/status`;

// ─── Payments ─────────────────────────────────────────────────────────────────
export const ApiCreateOrder = 'payments/create-order';
export const ApiVerifyPayment = 'payments/verify';
export const ApiTestPaymentSuccess = 'payments/test-success';
export const ApiPaymentHistory = 'payments/history';

// ─── Admin ────────────────────────────────────────────────────────────────────
export const ApiAdminSalons = 'admin/salons';
export const ApiSuperAdminTenants = 'superadmin/tenants';
export const ApiTenantRoles = (salonId: string) => `owner/salons/${salonId}/roles`;
export const ApiAssignTenantRole = (salonId: string) => `owner/salons/${salonId}/roles/assign`;

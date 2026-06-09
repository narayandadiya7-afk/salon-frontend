/**
 * enum.ts
 * Common enums and constants used throughout the project.
 */

// Return codes — mirrors backend eReturnCodes
export enum eResultCode {
  SUCCESS = 0,
  DB_ERROR = 1,
  NOT_FOUND = 2,
  AUTHENTICATION_FAILED = 3,
  DUPLICATE_DATA = 4,
  UNAUTHORIZED = 5,
  CREATED = 6,
  INVALID_DATA = 7,
  INVALID_REQUEST = 8,
}

// Source platform — mirrors backend eSourcePlatform
export enum eSourcePlatform {
  PORTAL = 1,
  WEBSITE = 2,
  MOBILE = 3,
}

// Constants for Input Lengths
export const INPUT_LENGTH = {
  PASSWORD_LENGTH: 20,
  EMAIL_LENGTH: 40,
  BASIC_LENGTH: 30,
};

// Enums for HTTP Status Codes
export enum eHTTPStatusCode {
  OK = 200,
  BAD_REQUEST = 400,
  INTERNAL_SERVER_ERROR = 500,
}

// Enums for Login Modes
export enum eLoginMode {
  PASSWORD = 1,
  OTP = 2,
}

// Enums for Privileges (menu-based privileges from GetMenuHierarchy API)
// Values match the privilegeUniqueId from the backend menu response.
export enum ePrivileges {
  VIEW_DASHBOARD = "VIEWDASHBOARD",
  VIEW_USERS = "VIEWUSERS",
  ADD_EDIT_USERS = "ADDEDITUSERS",
  DELETE_USERS = "DELETEUSERS",
  VIEW_ROLES = "VIEWROLES",
  ADD_EDIT_ROLES = "ADDEDITROLES",
  DELETE_ROLES = "DELETEROLES",
  VIEW_CONFIG_GROUP = "VIEWCONFIGGROUP",
  ADD_EDIT_CONFIG_GROUP = "ADDEDITCONFIGGROUP",
  DELETE_CONFIG_GROUP = "DELETECONFIGGROUP",
  VIEW_CONFIG_PARAM = "VIEWCONFIGPARAM",
  ADD_EDIT_CONFIG_PARAM = "ADDEDITCONFIGPARAM",
  DELETE_CONFIG_PARAM = "DELETECONFIGPARAM",
}

// Permission keys matching backend RBAC permission system
// These are the granular permission keys stored in the `permissions` table
// and checked by `requirePermission()` middleware on the backend.
export enum ePermissions {
  BOOKINGS_CREATE = "bookings.create",
  BOOKINGS_EDIT = "bookings.edit",
  BOOKINGS_DELETE = "bookings.delete",
  SERVICES_MANAGE = "services.manage",
  CUSTOMERS_VIEW = "customers.view",
  STAFF_MANAGE = "staff.manage",
  REPORTS_VIEW = "reports.view",
  CMS_MANAGE = "cms.manage",
  PAYMENTS_MANAGE = "payments.manage",
  SUBSCRIPTION_MANAGE = "subscription.manage",
  ROLES_MANAGE = "roles.manage",
}

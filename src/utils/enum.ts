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

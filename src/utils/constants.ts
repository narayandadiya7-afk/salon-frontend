import { TFilterModel } from '../types/config';

export const APP_NAME = 'Next Antd Architecture';
export const EMPTY_CHILDREN = 'Please provide component to display';
export const HEADER_HEIGHT = 64;
export const DEFAULT_LANG = 'en';

export const SCREEN_BREAKPOINT = {
  mobile: 0,
  tablet: 768,
  computer: 1024,
};

export const dateFormat = 'dd-MMM-yyyy hh:mm:ss a';
export const dateOnlyFormat = 'dd-MMM-yyyy';
export const debounceTime = 1000;

export const RESPONSE_STATUS = {
  SUCCESS: 'R_SUCCESS',
  NO_DATA_FOUND: 'R_NO_DATA_FOUND',
};

export const REMOVE_MESSAGE = 'Are you sure to remove?';
export const NumberRestrictKeys = ['e', 'E', '+', '-', '.'];

export const THEME_AVATAR_COLORS = [
  '#7C1D3E',
  '#C9953F',
  '#4A2D5E',
  '#1A5C5C',
  '#8B6F47',
  '#5C3A4A',
  '#2D5E3A',
  '#5C3A1E',
];

export const defaultFilterParams: TFilterModel = {
  pageSize: 10,
  currentPage: 1,
  filterRowsCount: 0,
  totalRows: 0,
  searchText: '',
  orderType: '',
  orderBy: '',
  fromDate: null,
  toDate: null,
};

/**
 * Fyncho contact details — used by the contact page, its form and the site
 * footer, so the phone and email are defined once here.
 *
 * Phone and email are both published and are always defined. WhatsApp, address
 * and hours have no fallback on purpose: a contact page showing an invented
 * street address is worse than one that omits the channel.
 *
 * Override without a code change:
 *   NEXT_PUBLIC_CONTACT_PHONE  official mobile (falls back to the placeholder)
 *   NEXT_PUBLIC_CONTACT_EMAIL  defaults to hello@fyncho.com
 *   NEXT_PUBLIC_CONTACT_WHATSAPP / _ADDRESS / _CITY / _COUNTRY / _HOURS / _RESPONSE_TIME
 */

const readContactEnv = (key: string): string | null => process.env[key]?.trim() || null;

/** TEMPORARY — not a working Fyncho number. Grep this name to find every reference. */
export const PLACEHOLDER_CONTACT_PHONE = '+91 91668 38452';

export interface ContactDetails {
  phone: string;
  email: string;
  whatsapp: string | null;
  addressLines: string[];
  hours: string | null;
  responseTime: string | null;
}

export const CONTACT: ContactDetails = {
  phone: readContactEnv('NEXT_PUBLIC_CONTACT_PHONE') ?? PLACEHOLDER_CONTACT_PHONE,
  email: readContactEnv('NEXT_PUBLIC_CONTACT_EMAIL') ?? 'hello@fyncho.com',
  whatsapp: readContactEnv('NEXT_PUBLIC_CONTACT_WHATSAPP'),
  addressLines: [
    readContactEnv('NEXT_PUBLIC_CONTACT_ADDRESS'),
    readContactEnv('NEXT_PUBLIC_CONTACT_CITY'),
    readContactEnv('NEXT_PUBLIC_CONTACT_COUNTRY'),
  ].filter((line): line is string => line !== null),
  hours: readContactEnv('NEXT_PUBLIC_CONTACT_HOURS'),
  responseTime: readContactEnv('NEXT_PUBLIC_CONTACT_RESPONSE_TIME'),
};

/** True while the site is still publishing the stand-in number. Assert on this in CI. */
export const USING_PLACEHOLDER_PHONE = CONTACT.phone === PLACEHOLDER_CONTACT_PHONE;

/** Normalised for a tel: href, e.g. "+91 98200 44120" -> "+919820044120". */
export const toTelHref = (phone: string): string => `tel:${phone.replace(/[^\d+]/g, '')}`;

export const toWhatsAppHref = (number: string, message: string): string =>
  `https://wa.me/${number.replace(/[^\d]/g, '')}?text=${encodeURIComponent(message)}`;

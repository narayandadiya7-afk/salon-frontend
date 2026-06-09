import { ePermissions, ePrivileges } from './enum';
import { TFilterModel } from '../types/config';
import { StoreUtil } from './store';

export default class Utils {
  static isNullOrUndefined = (value: any) => [null, undefined].includes(value);

  static deepClone = (value: any = {}) => JSON.parse(JSON.stringify(value));

  static getFloatValue = (value: any) =>
    typeof value === 'number' ? value : isNaN(parseFloat(value)) ? 0 : parseFloat(value);

  static toUpper = (value: any) =>
    value && typeof value === 'string' ? value.toUpperCase() : '';

  static isFalsy = (value: any) => [undefined, null, '', 0, false].includes(value);

  static sleep = (milliseconds: number) =>
    new Promise((resolve) => setTimeout(resolve, milliseconds));

  static redirectUrl = (path: string) => {
    if (typeof window !== 'undefined') window.location.href = path;
  };

  static getQueryString = (q: any = {}) => {
    const qParams = Object.keys(q).filter((param) => ![null, undefined].includes(q[param]));
    return qParams.length
      ? '?' + qParams.map((param) => `${encodeURIComponent(param)}=${encodeURIComponent(q[param])}`).join('&')
      : '';
  };

  static preventDefault = (event: any = {}) => {
    event?.preventDefault();
    event?.stopPropagation();
    return false;
  };

  static generateIntRandomBetweenMinMax = (min = 0, max = 100) =>
    Math.floor(Math.random() * (max - min + 1) + min);

  static updateParamsFromUrl(url: string, defaultParams: TFilterModel): TFilterModel {
    if (typeof window === 'undefined') return defaultParams;
    const newUrl = new URL(url);
    const queryParams = newUrl.searchParams;
    const updatedParams = { ...defaultParams };
    queryParams.forEach((value, key) => {
      if (key in updatedParams) (updatedParams as any)[key] = value;
    });
    return updatedParams;
  }

  /** Legacy privilege check (menu-based privileges) */
  static isUserHasAccess = (privileges: any[], privilege: ePrivileges): boolean => {
    return privileges?.some((p) => p.privilegeUniqueId === privilege && p.isAssigned === true);
  };

  /** Legacy privilege check by raw ID string */
  static isPrivilegeAssigned = (privileges: any[], privilegeUniqueId: string): boolean => {
    return privileges?.some((p) => p.privilegeUniqueId === privilegeUniqueId || p.privilegeId === Number(privilegeUniqueId));
  };

  /**
   * Decode JWT payload from stored access token cookie.
   * Returns null if token is missing or invalid.
   */
  static decodeToken(): { role?: string; roles?: string[]; permissions?: string[] } | null {
    const accessTokenKey = process.env.NEXT_PUBLIC_ACCESS_TOKEN_KEY || 'access_token';
    const token = StoreUtil.getCookie(accessTokenKey);
    if (!token) return null;
    try {
      const raw = token.startsWith('Bearer ') ? token.slice(7) : token;
      const payload = raw.split('.')[1];
      return JSON.parse(atob(payload.replace(/-/g, '+').replace(/_/g, '/')));
    } catch {
      return null;
    }
  }

  /**
   * Check if the current user has a specific RBAC permission key.
   * This reads from the JWT permissions array (set during login by the backend).
   * @param permissionKey - e.g. "services.manage", "bookings.edit"
   */
  static hasPermission(permissionKey: string): boolean {
    const decoded = this.decodeToken();
    if (!decoded?.permissions) return false;
    return decoded.permissions.includes(permissionKey);
  }

  /**
   * Check if the current user has any of the given roles.
   * Checks against both the single `role` field and the `roles` array.
   */
  static hasRole(...roleNames: string[]): boolean {
    const decoded = this.decodeToken();
    if (!decoded) return false;
    if (roleNames.includes(decoded.role || '')) return true;
    return decoded.roles?.some((r) => roleNames.includes(r)) ?? false;
  }
}

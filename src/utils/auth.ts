/**
 * Auth.ts
 * User session management — mirrors cost-sheet pattern.
 */

import Utils from '.';
import { StoreUtil } from './store';

const NEXT_PUBLIC_ACCESS_TOKEN_KEY = process.env.NEXT_PUBLIC_ACCESS_TOKEN_KEY || 'access_token';
const NEXT_PUBLIC_REFRESH_TOKEN_KEY = process.env.NEXT_PUBLIC_REFRESH_TOKEN_KEY || 'refresh_token';

class AuthUtil {
  /**
   * Check if the access token exists.
   */
  static isTokenExist(): boolean {
    const token = StoreUtil.getCookie(NEXT_PUBLIC_ACCESS_TOKEN_KEY);
    return !Utils.isNullOrUndefined(token);
  }

  /**
   * Set the access token in the cookie.
   */
  static setToken(token: string): void {
    StoreUtil.setCookie(NEXT_PUBLIC_ACCESS_TOKEN_KEY, token.startsWith('Bearer ') ? token : `Bearer ${token}`);
  }

  /**
   * Get the access token from the cookie as Authorization header object.
   */
  static getToken(): object {
    const token: any = StoreUtil.getCookie(NEXT_PUBLIC_ACCESS_TOKEN_KEY);
    return token ? { Authorization: token } : {};
  }

  /**
   * Get Authorization header for API requests.
   */
  static getAuthHeader(): object {
    return this.getToken();
  }

  /**
   * Logout the user — clears all tokens and cookies, redirects to login.
   */
  static async logout(locally = false): Promise<boolean> {
    try {
      if (!locally) {
        // server logout actions if needed
      }
    } catch (e) {
      // handle errors
    } finally {
      StoreUtil.removeCookie(NEXT_PUBLIC_ACCESS_TOKEN_KEY);
      StoreUtil.removeCookie(NEXT_PUBLIC_REFRESH_TOKEN_KEY);
      StoreUtil.removeAllCookies();
      Utils.redirectUrl('/login');
    }
    return true;
  }

  /**
   * Refresh the access token using the refresh token.
   */
  static async refreshToken(): Promise<boolean> {
    const _token = StoreUtil.get(NEXT_PUBLIC_REFRESH_TOKEN_KEY);
    // implement refresh token call here when needed
    return false;
  }
}

export { AuthUtil as default };

/**
 * Store.ts - Cookie and session storage management
 */

const defaultOptions = {
  path: '/',
  maxAge: 30 * 24 * 60 * 60 * 1000,
};

export class StoreUtil {
  static set(name: string, data: any) {
    if (typeof window !== 'undefined' && name && data)
      sessionStorage.setItem(name, data);
  }

  static get(name: string) {
    if (typeof window !== 'undefined') return sessionStorage.getItem(name);
    return null;
  }

  static remove(name: string) {
    if (typeof window !== 'undefined') sessionStorage.removeItem(name);
  }

  static removeAll() {
    if (typeof window !== 'undefined') sessionStorage.clear();
  }

  static setCookie(name: string, data: any) {
    if (typeof document !== 'undefined' && name && data) {
      document.cookie = `${name}=${data}; path=/; max-age=${defaultOptions.maxAge}`;
    }
  }

  static getCookie(name: string): string | null {
    if (typeof document === 'undefined') return null;
    const match = document.cookie.match(new RegExp('(^| )' + name + '=([^;]+)'));
    return match ? match[2] : null;
  }

  static removeCookie(name: string) {
    if (typeof document !== 'undefined') {
      document.cookie = `${name}=; path=/; expires=Thu, 01 Jan 1970 00:00:00 GMT`;
    }
  }

  static removeAllCookies() {
    if (typeof document !== 'undefined') {
      document.cookie.split(';').forEach((c) => {
        const name = c.split('=')[0].trim();
        StoreUtil.removeCookie(name);
      });
    }
  }
}

/**
 * Api.ts - HTTP client utility with GET, POST, PATCH, DELETE methods
 */

import Utils from '.';
import AuthUtil from './auth';
import { StoreUtil } from './store';
import { eSourcePlatform } from './enum';

const API_BASE_URL = process.env.NEXT_PUBLIC_API_BASEURL || 'http://localhost:3005/api/';
const BASEURL = API_BASE_URL.endsWith('/') ? API_BASE_URL : `${API_BASE_URL}/`;
const ACCESS_TOKEN_KEY = process.env.NEXT_PUBLIC_ACCESS_TOKEN_KEY || 'access_token';
const REFRESH_TOKEN_KEY = process.env.NEXT_PUBLIC_REFRESH_TOKEN_KEY || 'refresh_token';

const DEFAULT_HEADERS: RequestInit = {
  method: 'GET',
  mode: 'cors',
  cache: 'no-cache',
  credentials: 'include',
  headers: {
    'Content-Type': 'application/json',
    'x-api-source': String(eSourcePlatform.WEBSITE),
  },
  redirect: 'follow',
  referrer: 'no-referrer',
};

class ApiUtil {
  static getClientInstance() {
    return new ApiUtil();
  }

  private abortControllers: Array<AbortController> = [];

  private validateRequest(data: any) {
    if (data.constructor.name === 'FormData') return data;
    return JSON.stringify(data);
  }

  private async validateResponse(response: Response) {
    const contentType = response.headers.get('content-type');
    if (contentType?.includes('application/json')) {
      const data = await response.json();
      // Extract token from new dataResponse format: data.accessToken or data.token
      const token = data?.data?.accessToken || data?.data?.token || data?.data?.authToken;
      if (token) AuthUtil.setToken(token);
      return data;
    } else if (contentType?.includes('application/octet-stream')) {
      return response.blob();
    }
  }

  private async apiFetch(
    url: string,
    requestInit: RequestInit = { method: 'GET', headers: { 'Content-Type': 'application/json' } },
    requestData?: object
  ): Promise<any> {
    try {
      if (!url) throw 'No url provided';

      const body = requestData ? this.validateRequest(requestData) : undefined;
      const isFormData = body instanceof FormData;

      const init = {
        ...DEFAULT_HEADERS,
        ...requestInit,
        ...(body ? { body } : {}),
      };

      // For FormData the browser must set Content-Type (with boundary) itself
      const baseHeaders: Record<string, string> = { ...(init.headers as Record<string, string> ?? {}) };
      if (isFormData) delete baseHeaders['Content-Type'];

      init.headers = { ...baseHeaders, ...AuthUtil.getAuthHeader() };

      const response = await fetch(new URL(url, BASEURL).toString(), init);

      if (response.status >= 200 && response.status <= 299) {
        return this.validateResponse(response);
      }

      if (response.status === 401 || response.status === 403) {
        StoreUtil.removeCookie(ACCESS_TOKEN_KEY);
        StoreUtil.removeCookie(REFRESH_TOKEN_KEY);
        StoreUtil.removeAll();
        await Utils.sleep(1500);
        Utils.redirectUrl('/login');
        return;
      }

      // Return the JSON body for non-2xx so pages can read dataResponse.description
      const contentType = response.headers.get('content-type');
      if (contentType?.includes('application/json')) {
        return await response.json();
      }

      throw new Error(`${response.status} ${response.statusText}`);
    } catch (error) {
      this.errorHandler(error);
    }
  }

  public get = async (url: string, data = {}, headers = {}): Promise<any> =>
    this.apiFetch(`${url}${Utils.getQueryString(data)}`, { ...(headers ? { headers } : {}), method: 'GET' });

  public post = async (url: string, data = {}, headers?: any): Promise<any> =>
    this.apiFetch(url, { ...(headers ? { headers } : {}), method: 'POST' }, data);

  public async patch(url: string, data = {}, headers?: any): Promise<any> {
    return this.apiFetch(url, { ...(headers ? { headers } : {}), method: 'PATCH' }, data);
  }

  public async put(url: string, data = {}, headers?: any): Promise<any> {
    return this.apiFetch(url, { ...(headers ? { headers } : {}), method: 'PUT' }, data);
  }

  public async delete(url: string, data = {}, headers?: any): Promise<any> {
    return this.apiFetch(`${url}${Utils.getQueryString(data)}`, { ...(headers ? { headers } : {}), method: 'DELETE' }, data);
  }

  public errorHandler(error: any) {
    if (error instanceof TypeError && error.message === 'Failed to fetch') {
      console.warn('Network error: unable to reach the server.');
      return;
    }
    console.error(error);
  }

  public abortAllRequests = () => {
    for (const controller of this.abortControllers) controller.abort();
    this.abortControllers = [];
  };
}

const apiUtil: ApiUtil = ApiUtil.getClientInstance();
export { apiUtil as default };

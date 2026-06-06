/**
 * Utils - Common utility functions
 */

import { TFilterModel } from '../types/config';

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
}

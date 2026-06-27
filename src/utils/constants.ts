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

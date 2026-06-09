// config.ts - App level types

export type TUser = {
  id?: number;
  userName?: string;
  displayName?: string;
  mobileNo?: string;
  emailId?: string;
  roleName?: string;
  roleId?: number | null;
  password?: string;
  confirmPassword?: string;
  createdOn?: string | Date;
  roles?: TRole[];
  userType?: string;
  isTempPassword?: boolean;
  uniqueUserTypeId?: string;
  defModuleUniqueId?: string;
  defLanguageUniqueId?: string;
  privileges?: Array<TPrivilege>;
};

export type TPrivilege = {
  id: number;
  name: string;
  groupId: number;
  menuId: number;
  privilegeUniqueId: string;
  menuUniqueId: string;
  isAssigned?: boolean;
};

export type TMenuItem = {
  id: number;
  name: string;
  dispName: string;
  parentId: number;
  parentUniqueId: string;
  entityUrl: string;
  menuIcon?: string;
  isActive: number;
  enableForOthers?: number;
  iconName: string;
  displayOrder: number;
  privileges: TPrivilege[];
  menuUniqueId: string;
  orgId: number;
  requestDateTime: string;
  requestSource: number;
  isDeleted: number;
  children?: TMenuItem[];
};

export type TRole = {
  id: number;
  name: string;
  roleUniqueId?: string;
  description?: string;
};

export type TFilterModel = {
  id?: number;
  totalRows: number;
  pageSize: number;
  currentPage: number;
  searchText: string;
  filterRowsCount: number;
  orderType: string;
  orderBy?: string;
  fromDate?: Date | string | null;
  toDate?: Date | string | null;
};

export type TDataResponse = {
  returnCode: number;
  responseDateTime: string;
  description: string;
};

export type TResponseModel = {
  filterModel?: TFilterModel;
  dataResponse: TDataResponse;
  data: unknown;
};

export type TContext = {
  onUpdate?: () => void;
  userName?: string;
  email?: string;
  orgid?: string;
  isUserLogged?: boolean;
  privilegeList?: Array<TPrivilege>;
  isTempPassword?: boolean;
  defLanguageUniqueId?: string;
  user?: TUser;
  menuHierarchy?: TMenuItem[];
};

export type TCheckPrevilege = {
  id: number;
  menuid: number;
  privilegeId: number;
  privilegeName: string;
  roleId: number;
  privilegeUniqueId: string;
};

export type TOptionType = {
  label: string;
  value: string | number;
};

export type TConfigParam = {
  id: number;
  name: string;
  description: string;
  groupId: number | null;
  groupName: string;
  groupUniqueId: string;
  createdOn?: string | Date;
  organizationId?: number;
  paramUniqueId: string;
};

export type TConfigGroup = {
  id: number;
  groupName: string;
  description: string;
  groupUniqueId: string;
};

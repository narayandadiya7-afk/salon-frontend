'use client';

import React, { useEffect, useRef, useState } from 'react';
import { TContext, TMenuItem, TPrivilege, TUser } from '../types/config';
import { eResultCode } from '../utils/enum';
import AuthUtil from '../utils/auth';
import Utils from '../utils';
import useFetch from '../hooks/useFetch';
import { GetSpecificUser, GetMenuHierarchy } from '../utils/api.constant';

const UserContext = React.createContext<TContext>({});

export default function UserProvider({ children }: { children: React.ReactNode }) {
  const { post } = useFetch();
  const [privilegeList, setPrivilegeList] = useState<TPrivilege[]>([]);
  const initialized = useRef(false);

  const onUpdate = (detail: TContext = {}) => {
    setState((prevState: TContext) => ({
      ...prevState,
      ...detail,
      isUserLogged: !Utils.isNullOrUndefined(detail.user?.id ?? prevState.user?.id),
    }));
  };

  const [state, setState] = useState<TContext>({ onUpdate, isUserLogged: false });

  useEffect(() => {
    if (AuthUtil.isTokenExist() && !initialized.current) {
      initialized.current = true;
      init();
    }
    if (!AuthUtil.isTokenExist()) {
      initialized.current = false;
    }
  });

  useEffect(() => {
    const handleAuthChange = (e: CustomEvent<{ hasToken: boolean }>) => {
      if (e.detail.hasToken && !initialized.current) {
        initialized.current = true;
        init();
      }
    };
    window.addEventListener('auth:token-changed', handleAuthChange as EventListener);
    return () => window.removeEventListener('auth:token-changed', handleAuthChange as EventListener);
  }, []);

  async function init() {
    if (AuthUtil.isTokenExist()) {
      const user = await initializeUser();
      const menuHierarchy = await getMenuHierarchyList();

      const getAllPrivileges = (items: TMenuItem[]): TPrivilege[] => {
        const privileges: TPrivilege[] = [];
        for (const item of items) {
          if (item.privileges?.length) privileges.push(...item.privileges);
          if (item.children?.length) privileges.push(...getAllPrivileges(item.children));
        }
        return privileges;
      };

      const pl = getAllPrivileges(menuHierarchy || []);
      setPrivilegeList(pl);
      onUpdate({ user, menuHierarchy, privilegeList: pl });
    }
  }

  const initializeUser = async () => {
    try {
      const response = await post(GetSpecificUser, { data: {} });
      const { data, dataResponse } = response;
      if (dataResponse?.returnCode === eResultCode.SUCCESS) {
        return data;
      }
    } catch (error) {
      console.error('Failed to initialize user:', error);
    }
  };

  const getMenuHierarchyList = async () => {
    try {
      const response = await post(GetMenuHierarchy, {
        data: { renderMenuRoleWise: true },
      });
      const { data, dataResponse } = response;
      if (dataResponse?.returnCode === eResultCode.SUCCESS) {
        return data;
      }
    } catch (error) {
      console.error(error);
    }
  };

  return <UserContext.Provider value={state}>{children}</UserContext.Provider>;
}

export { UserContext, UserProvider };

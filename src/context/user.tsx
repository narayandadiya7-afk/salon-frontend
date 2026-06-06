'use client';

import React, { useEffect, useState } from 'react';
import { TContext, TMenuItem, TPrivilege, TUser } from '../types/config';
import Utils from '../utils';

const UserContext = React.createContext<TContext>({});

export default function UserProvider({ children }: { children: React.ReactNode }) {
  const onUpdate = (detail: TContext = {}) => {
    setState((prevState: TContext) => ({
      ...prevState,
      ...detail,
      isUserLogged: !Utils.isNullOrUndefined(prevState.user?.id),
    }));
  };

  const [state, setState] = useState<TContext>({ onUpdate, isUserLogged: false });

  useEffect(() => { init(); }, []);

  async function init() {
    const user: TUser = {
      id: 1,
      displayName: 'Admin User',
      userName: 'admin',
      emailId: 'admin@example.com',
      mobileNo: '9999999999',
      privileges: [],
      roles: [{ id: 1, name: 'Super Admin', roleUniqueId: 'SUPERADMIN' }],
      isTempPassword: false,
      defLanguageUniqueId: 'en',
    };

    const menuHierarchy: TMenuItem[] = [
      {
        id: 1, name: 'Dashboard', dispName: 'Dashboard', parentId: 0,
        parentUniqueId: '0', entityUrl: '/dashboard', isActive: 0,
        iconName: 'home', displayOrder: 1, privileges: [],
        menuUniqueId: 'DASHBOARD_1', orgId: 0,
        requestDateTime: '0001-01-01T00:00:00', requestSource: 0, isDeleted: 0,
      },
    ];

    onUpdate({ user, menuHierarchy });
  }

  return <UserContext.Provider value={state}>{children}</UserContext.Provider>;
}

export { UserContext, UserProvider };

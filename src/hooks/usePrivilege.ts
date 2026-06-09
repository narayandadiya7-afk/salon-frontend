'use client';

import { useContext } from 'react';
import { UserContext } from '../context/user';

export function usePrivilege() {
  const { privilegeList } = useContext(UserContext);

  const hasPrivilege = (privilegeUniqueId: string): boolean => {
    return privilegeList?.some((p) => p.privilegeUniqueId === privilegeUniqueId) ?? false;
  };

  const hasAnyPrivilege = (...privilegeIds: string[]): boolean => {
    return privilegeIds.some((id) => hasPrivilege(id));
  };

  return { hasPrivilege, hasAnyPrivilege, privilegeList };
}

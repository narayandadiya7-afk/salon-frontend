'use client';

import React, { useState, useEffect } from 'react';
import { Tree } from 'antd';

const getPrivilegeUniqueIds = (privileges: any[]) =>
  privileges.map((p) => p.privilegeUniqueId);

const PrivilegeMapper: React.FC<{
  menuHierarchy: any[];
  preSelectedPrivileges: any[];
  onPrivilegesChange: (checkedPrivileges: any[]) => void;
}> = ({ menuHierarchy, preSelectedPrivileges, onPrivilegesChange }) => {
  const [checkedKeys, setCheckedKeys] = useState<string[]>(
    getPrivilegeUniqueIds(preSelectedPrivileges)
  );

  const generateTreeNodes = (data: any[]): any[] =>
    data.map((menuItem) => {
      const { children = [], privileges = [] } = menuItem;
      const privilegeNodes = privileges.map((privilege: any) => ({
        title: <>{privilege.name}</>,
        key: privilege.privilegeUniqueId,
        isLeaf: true,
        privilege,
      }));
      const childNodes = generateTreeNodes(children);
      return {
        title: <span style={{ fontWeight: 600 }}>{menuItem.dispName}</span>,
        key: menuItem.menuUniqueId,
        children: [...privilegeNodes, ...childNodes],
      };
    });

  const treeData = generateTreeNodes(menuHierarchy);

  const handleCheck = (checkedKeysValue: any, info: any) => {
    setCheckedKeys(checkedKeysValue);
    const checkedPrivileges = info.checkedNodes
      .filter((node: any) => node.privilege)
      .map((node: any) => node.privilege);
    onPrivilegesChange(checkedPrivileges);
  };

  useEffect(() => {
    setCheckedKeys(getPrivilegeUniqueIds(preSelectedPrivileges));
  }, [preSelectedPrivileges]);

  return (
    <div style={{ height: '65vh', overflowY: 'auto' }}>
      <Tree
        checkable
        checkedKeys={checkedKeys}
        onCheck={handleCheck}
        defaultExpandAll
        treeData={treeData}
      />
    </div>
  );
};

export default PrivilegeMapper;

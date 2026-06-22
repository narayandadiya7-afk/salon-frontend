'use client';

import React from 'react';
import { Table, Checkbox, Typography } from 'antd';
import './PermissionMatrix.css';

const { Text } = Typography;

interface PermissionMatrixProps {
  modules: string[];
  actions: string[];
  permissions: Record<string, Record<string, boolean>>;
  onChange?: (module: string, action: string, value: boolean) => void;
  readOnly?: boolean;
}

const PermissionMatrix: React.FC<PermissionMatrixProps> = ({
  modules,
  actions,
  permissions,
  onChange,
  readOnly = false,
}) => {
  const columns = [
    {
      title: 'Module',
      dataIndex: 'module',
      key: 'module',
      width: 160,
      render: (text: string) => (
        <Text strong style={{ color: 'var(--theme-text)' }}>{text}</Text>
      ),
    },
    ...actions.map((action) => ({
      title: action.charAt(0).toUpperCase() + action.slice(1),
      dataIndex: action,
      key: action,
      width: 100,
      render: (_: any, record: { module: string }) => {
        const checked = permissions[record.module]?.[action] || false;
        return (
          <Checkbox
            checked={checked}
            disabled={readOnly}
            onChange={(e) => onChange?.(record.module, action, e.target.checked)}
          />
        );
      },
    })),
  ];

  const dataSource = modules.map((module) => ({
    key: module,
    module,
    ...actions.reduce((acc, action) => ({
      ...acc,
      [action]: permissions[module]?.[action] || false,
    }), {}),
  }));

  return (
    <div className="permission-matrix">
      <Table
        columns={columns}
        dataSource={dataSource}
        pagination={false}
        size="small"
        bordered
      />
    </div>
  );
};

export default PermissionMatrix;

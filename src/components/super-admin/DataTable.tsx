'use client';

import React from 'react';
import { Table } from 'antd';
import type { TableProps } from 'antd';
import './DataTable.css';

interface DataTableProps<T> extends TableProps<T> {
  className?: string;
}

function DataTable<T extends object>({
  className = '',
  ...rest
}: DataTableProps<T>) {
  return (
    <div className="super-data-table-wrapper">
      <Table<T>
        className={`super-data-table ${className}`}
        size="small"
        {...rest}
      />
    </div>
  );
}

export default DataTable;

'use client';

/**
 * Table.tsx
 * Common table component with dynamic rows and columns
 */
import React from 'react';
import styles from './table.module.css';
import classNames from 'classnames';
import Filter from '../filter/filter';

type variants = 'leftAlign' | 'rightAlign' | 'centerAlign';

type TableProps = {
  classNames?: string;
  children: React.ReactNode;
  filterKey?: string;
  activeFilters?: string;
  orderType?: string;
  colSpan?: number;
  variant?: variants;
  width?: string;
  height?: string;
  onFilterChange?: (key: string, orderType: string) => void;
};

export function Table(props: TableProps) {
  return (
    <table className={classNames(styles.table, props.classNames)}>
      {props.children}
    </table>
  );
}

export function TableBody(props: TableProps) {
  return (
    <tbody className={classNames(styles.tableBody, props.classNames)}>
      {props.children}
    </tbody>
  );
}

export function TableHead(props: TableProps) {
  return (
    <thead className={classNames(styles.tableHead, props.classNames)}>
      {props.children}
    </thead>
  );
}

export function TableHeadCell(props: TableProps) {
  const handleHeaderClick = () => {
    if (props.onFilterChange) {
      props.onFilterChange(
        props.filterKey as string,
        props.orderType === 'A' ? 'D' : 'A'
      );
    }
  };

  const { variant = 'centerAlign' } = props;
  return (
    <th
      style={{ width: props.width, height: props.height }}
      className={classNames(styles.thead, props.classNames)}
      onClick={handleHeaderClick}
    >
      <div className={classNames(styles.rowFlex, styles[variant])}>
        {props.children}
        {props.filterKey ? (
          <Filter
            filterKey={props.filterKey}
            activeFilters={props.activeFilters}
            onFilterChange={props.onFilterChange}
            orderType={props.orderType}
          />
        ) : null}
      </div>
    </th>
  );
}

export function TableRow(props: TableProps) {
  return (
    <tr className={classNames(styles.tableRow, props.classNames)}>
      {props.children}
    </tr>
  );
}

export function TableColumn(props: TableProps) {
  const { variant = 'centerAlign' } = props;
  return (
    <td
      colSpan={props.colSpan}
      className={classNames(styles.tableColumn, props.classNames)}
    >
      <div className={classNames(styles.tdFlex, styles[variant])}>
        {props.children}
      </div>
    </td>
  );
}

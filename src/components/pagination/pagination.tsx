'use client';

import React, { useState, useEffect } from 'react';
import { Pagination as AntPagination, Select } from 'antd';
import styles from './pagination.module.css';
import Text from '../../context/language-context';

type PaginationProps = {
  currentPage?: number;
  filterRowsCount: number;
  totalRows?: number;
  ClassNames?: string;
  itemsPerPage: number;
  onPageChange?: (newPage: number, newPageSize: number) => void;
  fetchdata?: (currentPage: number, pageSize: number, searchText: string) => void;
  searchText?: string;
};

export default function Pagination(props: PaginationProps) {
  const {
    filterRowsCount,
    totalRows = 0,
    itemsPerPage,
    ClassNames,
    currentPage = 1,
    fetchdata,
    searchText = '',
    onPageChange,
  } = props;

  const [pageSize, setPageSize] = useState(itemsPerPage);

  useEffect(() => {
    setPageSize(itemsPerPage);
  }, [itemsPerPage]);

  const handlePageChange = (page: number, size: number) => {
    if (onPageChange) {
      onPageChange(page, size);
      if (typeof window !== 'undefined') {
        const newUrl = new URL(window.location.href);
        newUrl.searchParams.set('currentPage', page.toString());
        window.history.pushState({}, '', newUrl.toString());
      }
    }
    if (fetchdata) {
      fetchdata(page, size, searchText);
    }
  };

  const handlePageSizeChange = (value: number) => {
    const newPage = Math.ceil(((currentPage - 1) * pageSize + 1) / value);
    setPageSize(value);
    if (typeof window !== 'undefined') {
      const newUrl = new URL(window.location.href);
      newUrl.searchParams.set('pageSize', value.toString());
      newUrl.searchParams.set('currentPage', '1');
      window.history.pushState({}, '', newUrl.toString());
    }
    if (onPageChange) onPageChange(newPage, value);
    if (fetchdata) fetchdata(newPage, value, searchText);
  };

  const showingFrom = (currentPage - 1) * pageSize + 1;
  const showingTo = Math.min(currentPage * pageSize, totalRows);

  return (
    <div className={styles.paginationContainer}>
      <div className={styles.pageInfo}>
        <div className={styles.showingMessageLargeScreen}>
          {currentPage && filterRowsCount && totalRows
            ? `${Text({ tid: 'Showing', def: 'Showing' })} ${showingFrom} ${Text({ tid: 'to', def: 'to' })} ${showingTo} ${Text({ tid: 'outof', def: 'out of' })} ${totalRows} ${Text({ tid: 'entries', def: 'entries' })}`
            : ''}
        </div>
        <div className={styles.showingMessageSmallScreen}>
          {currentPage && filterRowsCount && totalRows
            ? `Showing ${showingFrom} to ${showingTo} out of ${totalRows} entries`
            : ''}
        </div>
        <label className={styles.pageSize} htmlFor="pageSizeSelect">
          {Text({ tid: 'PageSize', def: 'Page Size' })}:
        </label>
        <Select
          id="pageSizeSelect"
          value={pageSize}
          onChange={handlePageSizeChange}
          options={[
            { value: 10, label: '10' },
            { value: 20, label: '20' },
            { value: 50, label: '50' },
            { value: 100, label: '100' },
          ]}
          style={{ marginLeft: 8, width: 80 }}
          size="small"
        />
      </div>

      <AntPagination
        current={currentPage}
        pageSize={pageSize}
        total={totalRows}
        onChange={handlePageChange}
        showSizeChanger={false}
        className={ClassNames}
      />
    </div>
  );
}

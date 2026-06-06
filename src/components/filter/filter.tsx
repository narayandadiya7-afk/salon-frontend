'use client';

import React from 'react';
import styles from './filter.module.css';

type FilterProps = {
  filterKey?: string;
  activeFilters?: string;
  orderType?: string;
  onFilterChange?: (key: string, orderType: string) => void;
};

const Filter: React.FC<FilterProps> = ({
  filterKey,
  activeFilters,
  orderType,
  onFilterChange,
}) => {
  const isActive = activeFilters === filterKey;

  const handleFilterClick = () => {
    const newOrderType = isActive ? (orderType === 'A' ? 'D' : 'A') : 'A';
    if (onFilterChange && filterKey !== undefined) {
      onFilterChange(filterKey, newOrderType);
    }
  };

  return (
    <div
      className={isActive ? styles.active : styles.notactive}
      title="Filter"
      onClick={handleFilterClick}
    >
      <div className={styles.icon}>
        <div className={styles.upIcon}></div>
        <div></div>
      </div>
    </div>
  );
};

export default Filter;

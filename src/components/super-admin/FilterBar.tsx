'use client';

import React from 'react';
import { Space, Select, DatePicker, Button } from 'antd';
import { FilterOutlined, ClearOutlined } from '@ant-design/icons';
import SearchInput from './SearchInput';
import './FilterBar.css';

const { RangePicker } = DatePicker;

interface FilterOption {
  label: string;
  value: string;
}

interface FilterBarProps {
  searchPlaceholder?: string;
  searchValue?: string;
  onSearchChange?: (value: string) => void;
  statusOptions?: FilterOption[];
  statusValue?: string;
  onStatusChange?: (value: string) => void;
  planOptions?: FilterOption[];
  planValue?: string;
  onPlanChange?: (value: string) => void;
  extraFilters?: React.ReactNode;
  onClear?: () => void;
  showDateRange?: boolean;
  onDateRangeChange?: (dates: any) => void;
}

const FilterBar: React.FC<FilterBarProps> = ({
  searchPlaceholder = 'Search...',
  searchValue,
  onSearchChange,
  statusOptions,
  statusValue,
  onStatusChange,
  planOptions,
  planValue,
  onPlanChange,
  extraFilters,
  onClear,
  showDateRange = false,
  onDateRangeChange,
}) => {
  return (
    <div className="super-filter-bar">
      <div className="filter-bar-left">
        <SearchInput
          value={searchValue}
          onChange={onSearchChange}
          placeholder={searchPlaceholder}
        />
        <Space size={8} wrap>
          {statusOptions && (
            <Select
              className="filter-select"
              placeholder="Status"
              value={statusValue}
              onChange={onStatusChange}
              options={statusOptions}
              allowClear
              style={{ minWidth: 130 }}
            />
          )}
          {planOptions && (
            <Select
              className="filter-select"
              placeholder="Plan"
              value={planValue}
              onChange={onPlanChange}
              options={planOptions}
              allowClear
              style={{ minWidth: 130 }}
            />
          )}
          {showDateRange && (
            <RangePicker className="filter-datepicker" onChange={onDateRangeChange} />
          )}
          {extraFilters}
        </Space>
      </div>
      {onClear && (
        <Button icon={<ClearOutlined />} size="small" onClick={onClear} type="text">
          Clear
        </Button>
      )}
    </div>
  );
};

export default FilterBar;

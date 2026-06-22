'use client';

import React from 'react';
import { Input } from 'antd';
import { SearchOutlined } from '@ant-design/icons';
import './SearchInput.css';

interface SearchInputProps {
  value?: string;
  onChange?: (value: string) => void;
  placeholder?: string;
  onSearch?: (value: string) => void;
}

const SearchInput: React.FC<SearchInputProps> = ({
  value,
  onChange,
  placeholder = 'Search...',
  onSearch,
}) => {
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    onChange?.(e.target.value);
  };

  const handleSearch = (val: string) => {
    onSearch?.(val);
  };

  return (
    <Input
      className="super-search-input"
      prefix={<SearchOutlined />}
      value={value}
      onChange={handleChange}
      placeholder={placeholder}
      onPressEnter={(e) => handleSearch((e.target as HTMLInputElement).value)}
      allowClear
    />
  );
};

export default SearchInput;

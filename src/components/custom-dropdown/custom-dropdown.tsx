'use client';

import React, { useEffect, useState, useCallback, useMemo } from 'react';
import { Select } from 'antd';
import { eResultCode } from '../../utils/enum';
import useFetch from '../../hooks/useFetch';
import styles from './customDropdown.module.css';

type TOptions = {
  value: any;
  label: string;
  isSelected?: boolean;
};

type TProps = {
  onChange: (option: TOptions | any) => void;
  endPoint: string;
  label?: string;
  placeHolder: string;
  variant?: string;
  addPaylod?: object;
  labelStyle?: object;
  value?: any;
  error?: string;
  isRequired?: boolean;
  isDisabled?: boolean;
  optionId?: string;
  optionName?: string;
  isMultiSelect?: boolean;
  className?: string;
  allowClear?: boolean;
  onOptionsFetched?: (options: TOptions[]) => void;
  filterOptions?: (options: TOptions[]) => TOptions[];
  maxTagCount?: number | 'responsive';
  selectedName?: string;
};

const dropdownCache = new Map<string, any[]>();

function stableStringify(obj: any): string {
  if (obj === null || typeof obj !== 'object') return String(obj);
  if (Array.isArray(obj)) return '[' + obj.map(stableStringify).join(',') + ']';
  return (
    '{' +
    Object.keys(obj)
      .sort()
      .map((k) => JSON.stringify(k) + ':' + stableStringify(obj[k]))
      .join(',') +
    '}'
  );
}

function debounce<T extends (...args: any[]) => void>(
  func: T,
  wait: number
): T & { cancel: () => void } {
  let timeout: ReturnType<typeof setTimeout> | null = null;
  const debounced = (...args: Parameters<T>) => {
    if (timeout) clearTimeout(timeout);
    timeout = setTimeout(() => func(...args), wait);
  };
  (debounced as any).cancel = () => {
    if (timeout) clearTimeout(timeout);
  };
  return debounced as T & { cancel: () => void };
}

const CustomDropdown = (props: TProps) => {
  const {
    onChange,
    endPoint,
    addPaylod,
    optionId = 'id',
    optionName = 'name',
    isMultiSelect = false,
    isDisabled = false,
    allowClear = true,
    onOptionsFetched,
    value,
    selectedName,
    maxTagCount,
  } = props;

  const [dropdownOptions, setDropdownOptions] = useState<TOptions[]>([]);
  const [allOptions, setAllOptions] = useState<TOptions[]>([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalRows, setTotalRows] = useState(0);
  const [currentSearchText, setCurrentSearchText] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const { post } = useFetch();

  const { effectivePageSize, isStatic } = useMemo(() => {
    const propPageSize = (addPaylod as any)?.pageSize;
    const ps = propPageSize !== undefined && propPageSize > 0 ? propPageSize : -1;
    return { effectivePageSize: ps, isStatic: ps <= 0 };
  }, [addPaylod]);

  const cacheKey = useMemo(() => {
    if (isStatic) {
      return endPoint + ':' + stableStringify({ ...(addPaylod || {}), searchText: '', pageSize: -1, currentPage: 1 });
    }
    return '';
  }, [endPoint, addPaylod, isStatic]);

  const fetchData = useCallback(async () => {
    if (isStatic && cacheKey && dropdownCache.has(cacheKey)) {
      const cached = dropdownCache.get(cacheKey) || [];
      setDropdownOptions(cached);
      setAllOptions(cached);
      return;
    }

    if (!endPoint) return;
    setIsLoading(true);

    try {
      const payload = {
        data: {
          pageSize: effectivePageSize,
          currentPage,
          searchText: currentSearchText,
          ...(addPaylod && { ...addPaylod }),
        },
      };

      const response = await post(endPoint, payload);

      if (response?.dataResponse?.returnCode === eResultCode.SUCCESS) {
        const newOptions = response.data.map((item: any) => {
          const label = item.employeeUniqueId
            ? `${item[optionName]}(${item.employeeUniqueId})`
            : item[optionName];
          return { value: item[optionId], label, ...item };
        });

        if (currentPage > 1) {
          setDropdownOptions((prev) => [...prev, ...newOptions]);
        } else {
          setDropdownOptions(newOptions);
          onOptionsFetched?.(newOptions);
        }

        if (isStatic && cacheKey) {
          dropdownCache.set(cacheKey, newOptions);
          setAllOptions(newOptions);
        }

        setTotalRows(response.filterModel?.totalRows ?? 0);
      }
    } catch (error) {
      console.error('Fetch error:', error);
    } finally {
      setIsLoading(false);
    }
  }, [isStatic, cacheKey, endPoint, addPaylod, currentSearchText, effectivePageSize, currentPage, post, optionId, optionName]);

  useEffect(() => {
    fetchData();
  }, [fetchData]);

  const handleSearchDebounced = useMemo(
    () =>
      debounce((input: string) => {
        setCurrentSearchText(input);
        setCurrentPage(1);
      }, 300),
    []
  );

  useEffect(() => {
    return () => handleSearchDebounced.cancel();
  }, [handleSearchDebounced]);

  const handleSearch = useCallback(
    (input: string) => {
      if (isStatic) {
        const filtered = allOptions.filter((opt) =>
          opt.label.toLowerCase().includes(input.toLowerCase())
        );
        setDropdownOptions(filtered);
      } else {
        handleSearchDebounced(input);
      }
    },
    [allOptions, isStatic, handleSearchDebounced]
  );

  useEffect(() => {
    if (value && selectedName && !isMultiSelect) {
      const exists = dropdownOptions.some((opt) => String(opt.value) === String(value));
      if (!exists) {
        setDropdownOptions((prev) => [...prev, { value, label: selectedName }]);
      }
    }
  }, [value, selectedName, isMultiSelect, dropdownOptions]);

  const handlePopupScroll = useCallback(
    (event: React.UIEvent<HTMLDivElement>) => {
      const target = event.target as HTMLDivElement;
      if (target.scrollTop + target.clientHeight >= target.scrollHeight - 10) {
        if (!isStatic && totalRows > currentPage * effectivePageSize) {
          setCurrentPage((prev) => prev + 1);
        }
      }
    },
    [isStatic, totalRows, currentPage, effectivePageSize]
  );

  const selectValue = useMemo(() => {
    if (isMultiSelect) {
      return (value as any[])?.map((val) => {
        const option = dropdownOptions.find((opt) => String(opt.value) === String(val));
        return option || { value: val, label: val };
      });
    }
    return dropdownOptions.find((opt) => String(opt.value) === String(value));
  }, [isMultiSelect, value, dropdownOptions]);

  return (
    <div className={styles.mainDivStyle}>
      {props.label && (
        <span className={styles.lables}>
          {props.isRequired && <span className={styles.labelColor}>* </span>}
          <label style={{ marginLeft: '4px', color: '#1f1f1f', ...props.labelStyle }}>
            {props.label}
          </label>
        </span>
      )}

      <Select
        variant={(props?.variant as 'outlined') || 'outlined'}
        filterOption={false}
        showSearch
        placeholder={props.placeHolder || 'Select...'}
        options={props.filterOptions ? props.filterOptions(dropdownOptions) : dropdownOptions}
        onSearch={handleSearch}
        onPopupScroll={handlePopupScroll}
        loading={isLoading}
        disabled={isDisabled}
        allowClear={allowClear}
        onClear={() => {
          if (!isStatic) {
            setCurrentSearchText('');
            setCurrentPage(1);
          } else {
            setDropdownOptions(allOptions);
          }
        }}
        value={selectValue}
        mode={isMultiSelect ? 'multiple' : undefined}
        onChange={(selected) => {
          if (isMultiSelect) {
            const selectedOptions = dropdownOptions.filter((opt) =>
              (selected as any[]).some((val) => String(val) === String(opt.value))
            );
            onChange(selectedOptions);
          } else {
            const selectedOption = dropdownOptions.find((opt) => opt.value === selected);
            onChange(selectedOption || null);
          }
          if (!isStatic) {
            setCurrentSearchText('');
            setCurrentPage(1);
          } else {
            setDropdownOptions(allOptions);
          }
        }}
        maxTagCount={maxTagCount ?? 'responsive'}
        style={{ width: '100%' }}
        className={props.className}
      />

      {props.error && <span className={styles.errorLabel}>{props.error}</span>}
    </div>
  );
};

export default CustomDropdown;

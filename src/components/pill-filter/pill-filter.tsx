'use client';

import React from 'react';
import styles from './pill-filter.module.css';

export interface PillFilterOption {
  key: string;
  label: string;
  count?: number;
}

interface PillFilterProps {
  options: PillFilterOption[];
  value: string;
  onChange: (value: string) => void;
  size?: 'sm' | 'md';
  style?: React.CSSProperties;
}

const PillFilter: React.FC<PillFilterProps> = ({
  options,
  value,
  onChange,
  size = 'md',
  style,
}) => (
  <div className={styles.wrapper} style={style}>
    {options.map(opt => (
      <div
        key={opt.key}
        className={`${styles.pill}${value === opt.key ? ` ${styles.active}` : ''}${size === 'sm' ? ` ${styles.sm}` : ''}`}
        onClick={() => onChange(opt.key)}
      >
        <span>{opt.label}</span>
        {opt.count !== undefined && <span className={styles.count}>{opt.count}</span>}
      </div>
    ))}
  </div>
);

export default PillFilter;

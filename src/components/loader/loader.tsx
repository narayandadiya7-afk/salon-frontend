'use client';

/*
 * Loader.tsx
 * Common loader component using Ant Design Spin
 */
import React from 'react';
import { Spin } from 'antd';
import { LoadingOutlined } from '@ant-design/icons';
import styles from './loader.module.css';

type TLoader = {
  size?: 'small' | 'default' | 'large';
};

export default function Loader(props: TLoader) {
  const { size = 'default' } = props;
  return (
    <div className={styles.loaderContainer}>
      <Spin
        indicator={<LoadingOutlined className={styles.spin} />}
        size={size}
      />
    </div>
  );
}

'use client';

/*
 * page-header.tsx
 * Common page header component used throughout the application
 */
import React, { ReactNode } from 'react';
import classNames from 'classnames';
import styles from './page-header.module.css';

type Size = 'small' | 'basic' | 'medium' | 'large';

type PageHeaderProps = {
  title?: ReactNode;
  icon?: ReactNode;
  children?: ReactNode;
  className?: string;
  itemsClassName?: string;
  titleClassName?: string;
  size?: Size;
  searchButton?: any;
};

export const PageHeader = (props: PageHeaderProps) => {
  let {
    children,
    className,
    itemsClassName,
    titleClassName,
    icon,
    title,
    size,
    searchButton,
    ...pageHeaderProps
  } = props;

  title = title ?? 'PageTitle';
  size = size ?? 'small';

  return (
    <div
      {...pageHeaderProps}
      className={classNames(styles.mainHeader, className)}
    >
      <div className={classNames(styles.headerTitle, titleClassName)}>
        <span className={styles.headerIcon}>{icon}</span>
        <strong className={styles.title}>{title}</strong>
        &nbsp;
        <div className={classNames(styles.headerTitle, titleClassName)}>
          {searchButton}
        </div>
      </div>
      <div className={classNames(styles.headerItems, itemsClassName)}>
        {children}
      </div>
    </div>
  );
};

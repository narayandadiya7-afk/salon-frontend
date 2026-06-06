'use client';

import React from 'react';
import classNames from 'classnames';
import styles from './form.module.css';

type FormRowProps = {
  children: React.ReactNode;
  className?: string;
};

export const FormRow = (props: FormRowProps) => {
  const { children, className } = props;
  return (
    <div className={classNames(styles.formRow, className)}>{children}</div>
  );
};

'use client';

/**
 * ToastContainer.tsx
 * Container for toast notifications controlled by useToast hook
 */
import React, { useEffect } from 'react';
import useToast from '../../hooks/useToast';
import styles from './toast-container.module.css';
import classNames from 'classnames';

type ToastProps = {
  time?: number;
};

export default function ToastContainer(props: ToastProps) {
  const { time = 3000 } = props;
  const {
    showToast,
    onCloseToast,
    position,
    content,
    title,
    type,
  } = useToast();

  useEffect(() => {
    const timer = setTimeout(() => {
      onCloseToast();
    }, time);
    return () => clearTimeout(timer);
  }, [showToast, time]);

  if (!showToast) return <></>;

  return (
    <div className={classNames(styles.toast, styles[position])}>
      <div className={classNames(styles.toastContainer, styles[type])}>
        <div className={styles.toastTitle}>{title}</div>
        <div>{content}</div>
      </div>
    </div>
  );
}

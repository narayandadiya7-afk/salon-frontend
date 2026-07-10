'use client';

import React from 'react';
import styles from './button.module.css';

type ButtonVariant = 'primary' | 'secondary' | 'outline' | 'ghost' | 'gold-outline' | 'light' | 'text';
type ButtonSize = 'sm' | 'md' | 'lg' | 'xl';

interface ButtonProps {
  variant?: ButtonVariant;
  size?: ButtonSize;
  href?: string;
  onClick?: (e: React.MouseEvent<HTMLButtonElement | HTMLAnchorElement>) => void;
  htmlType?: 'button' | 'submit' | 'reset';
  disabled?: boolean;
  loading?: boolean;
  className?: string;
  children?: React.ReactNode;
  icon?: React.ReactNode;
  style?: React.CSSProperties;
  target?: string;
  rel?: string;
}

const variantToClass: Record<ButtonVariant, string> = {
  primary: styles.primary,
  secondary: styles.secondary,
  outline: styles.outline,
  ghost: styles.ghost,
  'gold-outline': styles.goldOutline,
  light: styles.light,
  text: styles.text,
};

const sizeToClass: Record<ButtonSize, string> = {
  sm: styles.sm,
  md: styles.md,
  lg: styles.lg,
  xl: styles.xl,
};

export default function Button({
  variant = 'primary',
  size = 'md',
  href,
  onClick,
  htmlType = 'button',
  disabled = false,
  loading = false,
  className = '',
  children,
  icon,
  style,
  target,
  rel,
}: ButtonProps) {
  const classNames = [
    styles.btn,
    variantToClass[variant],
    sizeToClass[size],
    className,
    loading ? styles.loading : '',
  ].filter(Boolean).join(' ');

  const content = (
    <>
      {loading && <span className={styles.spinner} />}
      {icon && !loading && <span>{icon}</span>}
      {children}
    </>
  );

  if (href) {
    return (
      <a
        href={href}
        className={classNames}
        onClick={disabled ? undefined : onClick}
        style={style}
        target={target}
        rel={rel}
        aria-disabled={disabled || undefined}
      >
        {content}
      </a>
    );
  }

  return (
    <button
      type={htmlType}
      className={classNames}
      onClick={disabled ? undefined : onClick}
      disabled={disabled || loading}
      style={style}
    >
      {content}
    </button>
  );
}

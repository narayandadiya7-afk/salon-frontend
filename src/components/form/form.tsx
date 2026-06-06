'use client';

/*
 * form.tsx
 * Parent component for form elements used throughout the application
 */
import React, { ReactNode } from 'react';
import classNames from 'classnames';
import styles from './form.module.css';

type FormProps = {
  onSubmit?: (event: React.FormEvent<HTMLFormElement>) => void;
  children?: ReactNode;
  className?: string;
};

export default function FormLayout(props: FormProps) {
  const { children, className = '', ...formProps } = props;
  return (
    <form
      {...formProps}
      action="return false"
      className={classNames(styles.form, styles[className], className)}
    >
      {children}
    </form>
  );
}

export function FormContent(props: Pick<FormProps, 'children' | 'className'>) {
  return (
    <section className={classNames(styles.formContent, props.className)}>
      {props.children}
    </section>
  );
}

export function FormHeader(props: Pick<FormProps, 'children' | 'className'>) {
  return (
    <header className={classNames(styles.formHeader, props.className)}>
      {props.children}
    </header>
  );
}

export function FormFooter(props: Pick<FormProps, 'children' | 'className'>) {
  return (
    <footer className={classNames(styles.formFooter, props.className)}>
      {props.children}
    </footer>
  );
}

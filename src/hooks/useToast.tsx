/**
 * useToast.tsx
 * Hook to manage toast notifications via Redux state
 */
'use client';

import { ReactNode } from 'react';
import { useSelector } from 'react-redux';
import { useAppDispatch } from '../state/hook';
import {
  selectToast,
  showToast,
  closeToast,
  ToastOpen,
  selectToastType,
  selectToastTitle,
  selectToastContent,
} from '../state/toast/slice';

export type ToastProps = {
  type?: string;
  title?: ReactNode;
  content?: string;
  position?: ToastOpen;
  showCloseButton?: boolean;
};

export default function useToast() {
  const dispatch = useAppDispatch();

  const show = useSelector(selectToast);
  const title = useSelector(selectToastTitle);
  const content = useSelector(selectToastContent);
  const type = useSelector(selectToastType);

  const onShowToast = (props: ToastProps) => {
    dispatch(showToast(props));
  };

  const onCloseToast = () => {
    dispatch(closeToast());
  };

  return {
    type,
    title,
    content,
    position: ToastOpen.leftBottom,
    closeToast,
    onShowToast,
    onCloseToast,
    showToast: show,
  };
}

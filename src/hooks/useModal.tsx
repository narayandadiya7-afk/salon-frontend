/**
 * useModal.tsx
 * Hook to manage modal functionality via Redux state
 */
'use client';

import { useSelector } from 'react-redux';
import { useAppDispatch } from '../state/hook';
import {
  showModal,
  ModalSize,
  closeModal,
  selectModal,
  selectModalSize,
  selectModalTitle,
  selectModalComponent,
  selectModalonSave,
  selectModalContent,
  selectModalshowButton,
  selectModalShowTitle,
  selectremarkOpen,
  selectPreview,
} from '../state/modal/slice';

export type ModalProps = {
  showTitle?: boolean;
  showButton?: boolean;
  content?: string | Array<any> | React.ReactNode | undefined;
  title?: string;
  size?: ModalSize;
  showCloseButton?: boolean;
  Component?: React.FunctionComponent<any>;
  onSave?: Function;
  onCancel?: () => void;
  remarkOpen?: boolean;
  preview?: boolean;
};

export default function useModal() {
  const dispatch = useAppDispatch();

  const show = useSelector(selectModal);
  const title = useSelector(selectModalTitle);
  const showTitle = useSelector(selectModalShowTitle);
  const showButton = useSelector(selectModalshowButton);
  const content = useSelector(selectModalContent);
  const Component = useSelector(selectModalComponent);
  const size = useSelector(selectModalSize);
  const onSave = useSelector(selectModalonSave);
  const remarkOpen = useSelector(selectremarkOpen);
  const preview = useSelector(selectPreview);

  const onShowModal = (props: ModalProps) => {
    dispatch(showModal(props));
  };

  const onCloseModal = () => {
    dispatch(closeModal());
  };

  return {
    size,
    title,
    onSave,
    content,
    showTitle,
    showButton,
    onShowModal,
    onCloseModal,
    showModal: show,
    remarkOpen,
    preview,
    ModalComponent: Component,
  };
}

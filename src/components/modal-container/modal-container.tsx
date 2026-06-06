'use client';

/**
 * ModalContainer.tsx
 * Container that wraps modal functionality controlled by useModal hook
 */
import classNames from 'classnames';
import React from 'react';
import useModal from '../../hooks/useModal';
import styles from './modal-container.module.css';
import { CheckOutlined, CloseOutlined, DeleteOutlined } from '@ant-design/icons';
import { Button } from 'antd';

export default function ModalContainer() {
  const {
    showModal,
    onCloseModal,
    title,
    size,
    ModalComponent,
    onSave,
    content,
    showTitle,
    showButton,
    remarkOpen = true,
    preview,
  } = useModal();

  const handleOverlayClick = (event: React.MouseEvent) => {
    if (event.target === event.currentTarget) {
      onCloseModal();
    }
  };

  if (!showModal || ModalComponent === null) return <></>;

  return (
    <div className={styles.modalOverlay} onClick={handleOverlayClick}>
      <div
        className={classNames(
          preview === false ? styles.modalContainer1 : styles.modalContainer,
          styles[size],
          'rounded-lg'
        )}
      >
        {showTitle && (
          <div className={classNames(styles.modalTitle, 'py-4 px-4 rounded-t-lg')}>
            <DeleteOutlined style={{ marginRight: '0.75rem' }} />
            <span>{title}</span>
          </div>
        )}
        <div className="px-6 py-6">
          {content ? content : <ModalComponent />}
        </div>
        {showButton && (
          <div className={classNames(styles.modalFooter, 'py-4 px-4 rounded-b-lg')}>
            <div className="flex justify-end">
              <div className="mr-2">
                <Button onClick={onCloseModal}>
                  <CloseOutlined /> No
                </Button>
              </div>
              <div>
                <Button
                  onClick={() => {
                    if (onSave) onSave();
                    if (remarkOpen) onCloseModal();
                  }}
                >
                  <CheckOutlined /> Yes
                </Button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

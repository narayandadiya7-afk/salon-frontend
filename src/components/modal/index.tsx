'use client';

import React, { useEffect, useState } from 'react';
import { Button, Modal } from 'antd';
import styles from './modal.module.css';

interface CustomModalProps {
  title: string;
  okText?: string;
  cancelText?: string;
  isOpen: boolean;
  onOk?: (...args: any) => void;
  onCancel: () => void;
  children: React.ReactNode;
  isFullScreen?: boolean;
  hideOkButton?: boolean;
  hideCancelButton?: boolean;
  disableOk?: boolean;
  width?: string | number;
  style?: React.CSSProperties;
  footer?: React.ReactNode[] | null;
  bodyPadding?: string;
  cusHeader?: boolean;
}

/**
 * Reusable modal component wrapping Ant Design's Modal
 */
const CustomModal: React.FC<CustomModalProps> = ({
  title,
  isOpen,
  onOk,
  onCancel,
  children,
  style,
  okText = 'Ok',
  cancelText = 'Close',
  isFullScreen = false,
  hideOkButton = false,
  hideCancelButton = false,
  disableOk = false,
  width,
  footer,
  bodyPadding = '12px',
}) => {
  const [hideOK, setHideOk] = useState(false);
  const [hideCancel, setHideCancel] = useState(false);

  useEffect(() => {
    setHideOk(hideOkButton);
    setHideCancel(hideCancelButton);
  }, [hideOkButton, hideCancelButton]);

  return (
    <Modal
      footer={footer ? footer : null}
      title={title}
      open={isOpen}
      onCancel={onCancel}
      width={isFullScreen ? '80%' : width || undefined}
      className={styles.noFullScreen}
      styles={{ body: { padding: bodyPadding } }}
      style={style}
      destroyOnHidden
      centered
    >
      {children}

      <div
        className={styles.customFooter}
        style={{
          display:
            footer === null || (hideOkButton && hideCancelButton)
              ? 'none'
              : 'flex',
          justifyContent: 'end',
          gap: '10px',
        }}
      >
        {!hideOK && (
          <Button
            onClick={() => {
              if (!disableOk && typeof onOk === 'function') onOk();
            }}
            style={{
              cursor: disableOk ? 'not-allowed' : 'pointer',
              opacity: disableOk ? 0.5 : 1,
            }}
            type="primary"
          >
            {okText}
          </Button>
        )}
        {!hideCancel && (
          <Button onClick={onCancel} type="default">
            {cancelText}
          </Button>
        )}
      </div>
    </Modal>
  );
};

export default CustomModal;

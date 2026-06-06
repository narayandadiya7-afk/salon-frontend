'use client';

import React, { ReactElement, useState } from 'react';
import { Drawer } from 'antd';

type CustomDrawerProps = {
  component: React.ElementType;
  componentProps?: any;
  title?: string;
  size?: 'default' | 'large';
  trigger?: ReactElement;
  width?: number;
  placement?: 'left' | 'right' | 'top' | 'bottom';
  isOpen?: boolean;
  onClose?: () => void;
  onOpen?: () => void;
};

const CustomDrawer: React.FC<CustomDrawerProps> = ({
  component: Component,
  componentProps,
  title,
  size,
  width,
  trigger,
  placement = 'right',
  isOpen,
  onClose,
  onOpen,
}) => {
  const isControlled = isOpen !== undefined;
  const [internalOpen, setInternalOpen] = useState(false);
  const open = isControlled ? isOpen : internalOpen;

  const showDrawer = () => {
    if (isControlled) {
      onOpen?.();
    } else {
      setInternalOpen(true);
    }
  };

  const closeDrawer = () => {
    if (isControlled) {
      onClose?.();
    } else {
      setInternalOpen(false);
    }
  };

  return (
    <>
      {trigger &&
        React.cloneElement(
          trigger as React.ReactElement<{ onClick: () => void }>,
          { onClick: showDrawer }
        )}

      <Drawer
        maskClosable={false}
        placement={placement}
        width={width || (size === 'default' ? 378 : 620)}
        title={title || null}
        onClose={closeDrawer}
        open={open}
        classNames={{ body: 'custom-drawer-body' }}
        destroyOnClose
      >
        <Component {...componentProps} onCloseDrawer={closeDrawer} />
      </Drawer>
    </>
  );
};

export default CustomDrawer;

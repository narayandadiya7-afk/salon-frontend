'use client';

import React, { ReactNode } from 'react';
import { Popover } from 'antd';

type TGenericPopoverProps = {
  content: ReactNode;
  trigger?: 'click' | 'hover' | 'focus';
  placement?:
    | 'top'
    | 'bottom'
    | 'left'
    | 'right'
    | 'topLeft'
    | 'topRight'
    | 'bottomLeft'
    | 'bottomRight';
  overlayClassName?: string;
  iconClassName?: string;
  containerClassName?: string;
  children?: ReactNode;
  // Legacy icon prop support (renders a div trigger if no children)
  icon?: any;
};

const GenericPopover: React.FC<TGenericPopoverProps> = ({
  content,
  trigger = 'click',
  placement = 'bottomRight',
  overlayClassName = '',
  iconClassName = '',
  containerClassName = '',
  children,
  icon,
}) => {
  return (
    <Popover
      content={content}
      trigger={trigger}
      placement={placement}
      overlayClassName={overlayClassName}
    >
      <div className={containerClassName}>
        {children}
        {!children && icon && (
          <span className={iconClassName}>{icon}</span>
        )}
      </div>
    </Popover>
  );
};

export default GenericPopover;

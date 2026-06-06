'use client';

import React from 'react';
import {
  CheckCircleOutlined,
  EditOutlined,
  SaveOutlined,
  EyeOutlined,
  MinusCircleOutlined,
} from '@ant-design/icons';
import styles from './statusLabel.module.css';

type TProps = {
  status?: string;
};

function StatusLabel(props: TProps) {
  const getIcon = () => {
    switch (props.status) {
      case 'Draft': return <EditOutlined />;
      case 'Approved': return <CheckCircleOutlined />;
      case 'Submitted': return <SaveOutlined />;
      case 'Reviewed': return <EyeOutlined />;
      default: return <MinusCircleOutlined />;
    }
  };

  const getClassName = () => {
    switch (props.status) {
      case 'Draft': return styles.draftTag;
      case 'Approved': return styles.approvedTag;
      case 'Submitted': return styles.submitTag;
      case 'Reviewed': return styles.reviewedTag;
      default: return styles.defaultTag;
    }
  };

  return (
    <>
      {props.status ? (
        <span className={getClassName()}>
          <span style={{ marginRight: '5px' }}>{props.status}</span>
          {getIcon()}
        </span>
      ) : (
        <></>
      )}
    </>
  );
}

export default StatusLabel;

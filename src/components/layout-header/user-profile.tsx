'use client';

import { useContext, useEffect, useState } from 'react';
import { UserContext } from '../../context';
import { Button } from 'antd';
import {
  MailOutlined,
  PhoneOutlined,
  LogoutOutlined,
  UserOutlined,
} from '@ant-design/icons';
import { useRouter } from 'next/navigation';
import Avatar from '../avatar/avatar';
import styles from './layout-header.module.css';
import GenericPopover from '../pop-over';
import AuthUtil from '../../utils/auth';
import Utils from '../../utils';
import { TContext } from '../../types/config';

export default function UserProfile() {
  const context: TContext = useContext(UserContext);
  const [userDetails, setUserDetails] = useState(context.user);
  const router = useRouter();

  useEffect(() => {
    setUserDetails(context.user);
  }, [context.user]);

  function signOut() {
    AuthUtil.logout();
    Utils.redirectUrl('/login');
  }

  const handleClick = () => {
    router.push('/admin/dashboard');
  };

  const userProfileContent = (
    <div className={styles.userBox}>
      <div className={styles.pencil}>
        <Avatar name={userDetails?.displayName || ''} />
        <span className={styles.userName}>
          {userDetails?.displayName || userDetails?.emailId}
        </span>
      </div>
      <div className={styles.userProfile}>
        <div className={styles.profileWrapper}>
          <MailOutlined />
          <span>{userDetails?.emailId}</span>
        </div>
        <div className={styles.profileWrapper}>
          <PhoneOutlined />
          <span>{userDetails?.mobileNo}</span>
        </div>
        <div
          className={styles.profileWrapper}
          onClick={handleClick}
          style={{ cursor: 'pointer' }}
        >
          View More
        </div>
      </div>
      <div className={styles.logoutDiv}>
        <Button onClick={signOut}>
          <LogoutOutlined /> Sign Out
        </Button>
      </div>
    </div>
  );

  return (
    <GenericPopover
      content={userProfileContent}
      overlayClassName={styles.popoverOverlay}
      containerClassName={styles.tooltipContainer}
    >
      <UserOutlined className={styles.userIcon} />
    </GenericPopover>
  );
}

'use client';

/*
 * LayoutHeader.tsx
 * Common layout header component used throughout the application
 */
import UserProfile from './user-profile';
import styles from './layout-header.module.css';
import {
  HomeOutlined,
  MenuFoldOutlined,
  MenuUnfoldOutlined,
} from '@ant-design/icons';
import { useRouter } from 'next/navigation';

type TProps = {
  onToggleSideBar: () => void;
  sideBarStatus: boolean;
};

export default function LayoutHeader(props: TProps) {
  const router = useRouter();

  const onHandleEdit = () => {
    props.onToggleSideBar();
  };

  return (
    <div className={styles.header}>
      <div className={styles.logoSize}>
        <div className={styles.logo} onClick={onHandleEdit}>
          {props.sideBarStatus ? (
            <MenuFoldOutlined className={styles.primaryColor} />
          ) : (
            <MenuUnfoldOutlined className={styles.primaryColor} />
          )}
        </div>
        <div className={styles.welcomelogo}></div>
      </div>

      <div className={styles.headerMenu}>
        <div style={{ marginTop: '2px', cursor: 'pointer' }}>
          <HomeOutlined
            style={{ fontSize: '1.2rem' }}
            onClick={() => router.push('/admin/dashboard')}
          />
        </div>
        <div className={styles.userProfileIcon}>
          <UserProfile />
        </div>
      </div>
    </div>
  );
}

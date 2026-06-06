'use client';

import { useContext, useEffect, useState } from 'react';
import classNames from 'classnames';
import { useRouter, usePathname } from 'next/navigation';
import styles from './menu.module.css';
import { CaretDownOutlined, CaretUpOutlined } from '@ant-design/icons';
import { UserContext } from '../../context';
import { TContext, TMenuItem } from '../../types/config';

type TProps = {
  isOpen?: boolean;
  sideBarStatus?: boolean;
};

export default function SidebarComponent(props: TProps) {
  const context: TContext = useContext(UserContext);
  const menuData = context.menuHierarchy;
  const router = useRouter();
  const pathname = usePathname();

  const handleClick = (url: string) => {
    router.push(url);
  };

  const MenuItem = ({ item }: { item: TMenuItem }) => {
    const [isSubMenuVisible, setIsSubMenuVisible] = useState(false);
    const [isActive, setIsActive] = useState(false);

    const hasChildren = (menuItem: TMenuItem) => {
      return menuItem.children && menuItem.children.length > 0;
    };

    const isChildActiveRecursive = (children: TMenuItem[] | undefined): boolean => {
      if (!children) return false;
      return children.some((child) => {
        if (child.children) return isChildActiveRecursive(child.children);
        return pathname === child.entityUrl;
      });
    };

    useEffect(() => {
      const isChildActive = isChildActiveRecursive(item.children);
      setIsSubMenuVisible(isChildActive);
      setIsActive(isChildActive || pathname === item.entityUrl);
    }, [item.children, item.entityUrl, pathname]);

    const toggleSubMenu = () => {
      setIsSubMenuVisible(!isSubMenuVisible);
      if (item.parentId === 0 || hasChildren(item)) {
        setIsActive(!isActive);
      }
    };

    return (
      <div className={classNames(styles.user_menu)}>
        <div
          className={classNames(styles.item, { [styles.active]: isActive })}
          onClick={toggleSubMenu}
        >
          {hasChildren(item) ? (
            <div className={styles.iconStyle}>
              <span className={styles.spanOfInconStyle}>
                <span className={styles.primaryColor}>{item.iconName}</span>
              </span>
              <span className={`${styles.menu_name} ${styles.spanDispName}`}>
                {props?.sideBarStatus ? item.dispName : ''}
              </span>
            </div>
          ) : (
            <span
              className={styles.linkStyle}
              onClick={() => handleClick(item.entityUrl)}
            >
              <span className={styles.linkSpan}>
                <span className={styles.primaryColor}>{item.iconName}</span>
              </span>
              <span className={`${styles.menu_name} ${styles.spanDispName}`}>
                {props?.sideBarStatus ? item.dispName : ''}
              </span>
            </span>
          )}
          {hasChildren(item) && props.sideBarStatus && (
            <div>
              {isSubMenuVisible ? <CaretUpOutlined /> : <CaretDownOutlined />}
            </div>
          )}
        </div>
        {isSubMenuVisible && hasChildren(item) && (
          <div className={styles.sub_menu}>
            {item.children!.map((subItem, index) => (
              <MenuItem key={index} item={subItem} />
            ))}
          </div>
        )}
      </div>
    );
  };

  return (
    <div>
      <div className={styles.user_sidebar}>
        <div className={styles.user_detail}>
          <div className={styles.user_box}>
            <span
              className={
                props?.sideBarStatus ? styles.user_pic : styles.user_pic_compact
              }
            ></span>
          </div>
        </div>
        <div className={styles.menuSection}>
          {menuData &&
            menuData.map((item, index) => (
              <MenuItem key={index} item={item} />
            ))}
        </div>
      </div>
    </div>
  );
}

'use client';

/*
 * layout-footer.tsx
 * Common footer component used throughout the application
 */
import styles from './layout-footer.module.css';

export default function LayoutFooter() {
  const getCurrentYear = () => {
    return new Date().getFullYear();
  };

  return (
    <div className={styles.footer}>
      <div>© {getCurrentYear()} WEBaniX Solutions</div>
      <div className={styles.footerCondition}>
        <div>
          <span>Terms and conditions</span>
          <span> | </span>
          <span>Privacy policy</span>
        </div>
      </div>
    </div>
  );
}

'use client';

// CookieBanner.tsx
import { useState } from 'react';
import styles from './cookie.module.css';

const CookieBanner = () => {
  const [acceptedCookies, setAcceptedCookies] = useState(
    typeof localStorage !== 'undefined'
      ? localStorage.getItem('acceptedCookies') === 'true'
      : false
  );

  const handleAcceptCookies = () => {
    setAcceptedCookies(true);
    localStorage?.setItem('acceptedCookies', 'true');
  };

  return (
    <div
      className={`${styles['cookie-banner']} ${acceptedCookies ? styles['hidden'] : styles['visible']}`}
    >
      <div className={styles['buttons-container']}>
        <button
          className={styles['accept-button']}
          onClick={handleAcceptCookies}
        >
          Ok
        </button>
        <button className={styles['privacy-button']}>Privacy policy</button>
      </div>
    </div>
  );
};

export default CookieBanner;

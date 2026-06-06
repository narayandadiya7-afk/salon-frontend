'use client';

import React, { useState } from 'react';
import styles from './search.module.css';
import Text from '../../context/language-context';

type SearchProps = {
  searchText: string;
  onInputChange: (searchText: string) => void;
};

const Search: React.FC<SearchProps> = ({ searchText, onInputChange }) => {
  const [isInputFocused, setInputFocused] = useState(false);

  const handleInputChange = (value: string) => {
    if (value.length <= 15) {
      if (typeof window !== 'undefined') {
        const newUrl = new URL(window.location.href);
        newUrl.searchParams.set('searchText', value);
        newUrl.searchParams.set('currentPage', '1');
        newUrl.searchParams.set('pageSize', '10');
        window.history.pushState({}, '', newUrl.toString());
      }
      onInputChange(value);
    }
  };

  const handleClearClick = () => {
    if (typeof window !== 'undefined') {
      const newUrl = new URL(window.location.href);
      newUrl.searchParams.set('searchText', '');
      window.history.pushState({}, '', newUrl.toString());
    }
    onInputChange('');
  };

  return (
    <div className={styles.inputWrapper}>
      <input
        className={styles.searchBox}
        type="text"
        placeholder={Text({ tid: 'Search', def: 'Search' })}
        value={searchText}
        onChange={(e) => handleInputChange(e.target.value)}
        onFocus={() => setInputFocused(true)}
        onBlur={() => setInputFocused(false)}
      />
      {searchText.length > 0 && (
        <button className={styles.clearButton} onClick={handleClearClick}>
          ✕
        </button>
      )}
    </div>
  );
};

export default Search;

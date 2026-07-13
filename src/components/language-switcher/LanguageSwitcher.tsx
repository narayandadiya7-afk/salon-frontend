'use client';

import React, { useEffect, useRef, useState } from 'react';
import { Button } from 'antd';
import { GlobalOutlined } from '@ant-design/icons';
import styles from './LanguageSwitcher.module.css';

const LANGUAGES = [
  { code: 'en', label: 'English' },
  { code: 'hi', label: 'हिन्दी' },
  { code: 'bn', label: 'বাংলা' },
  { code: 'te', label: 'తెలుగు' },
  { code: 'mr', label: 'मराठी' },
  { code: 'ta', label: 'தமிழ்' },
  { code: 'gu', label: 'ગુજરાતી' },
  { code: 'kn', label: 'ಕನ್ನಡ' },
  { code: 'ml', label: 'മലയാളം' },
  { code: 'pa', label: 'ਪੰਜਾਬੀ' },
  { code: 'ur', label: 'اردو' },
  { code: 'sd', label: 'سنڌي' },
  { code: 'ne', label: 'नेपाली' },
  { code: 'si', label: 'සිංහල' },
  { code: 'my', label: 'မြန်မာ' },
  { code: 'th', label: 'ไทย' },
  { code: 'vi', label: 'Tiếng Việt' },
  { code: 'ko', label: '한국어' },
  { code: 'ja', label: '日本語' },
  { code: 'zh-CN', label: '中文 (简体)' },
  { code: 'zh-TW', label: '中文 (繁體)' },
  { code: 'es', label: 'Español' },
  { code: 'fr', label: 'Français' },
  { code: 'de', label: 'Deutsch' },
  { code: 'pt', label: 'Português' },
  { code: 'it', label: 'Italiano' },
  { code: 'nl', label: 'Nederlands' },
  { code: 'ru', label: 'Русский' },
  { code: 'pl', label: 'Polski' },
  { code: 'tr', label: 'Türkçe' },
  { code: 'ar', label: 'العربية' },
  { code: 'fa', label: 'فارسی' },
  { code: 'sw', label: 'Kiswahili' },
  { code: 'id', label: 'Bahasa Indonesia' },
  { code: 'ms', label: 'Bahasa Melayu' },
  { code: 'uk', label: 'Українська' },
  { code: 'cs', label: 'Čeština' },
  { code: 'ro', label: 'Română' },
  { code: 'hu', label: 'Magyar' },
  { code: 'sv', label: 'Svenska' },
  { code: 'no', label: 'Norsk' },
  { code: 'da', label: 'Dansk' },
  { code: 'fi', label: 'Suomi' },
  { code: 'el', label: 'Ελληνικά' },
  { code: 'he', label: 'עברית' },
  { code: 'fil', label: 'Filipino' },
  { code: 'km', label: 'ភាសាខ្មែរ' },
  { code: 'lo', label: 'ພາສາລາວ' },
  { code: 'ka', label: 'ქართული' },
  { code: 'hy', label: 'Հայերեն' },
  { code: 'am', label: 'አማርኛ' },
  { code: 'sn', label: 'chiShona' },
  { code: 'yo', label: 'Yorùbá' },
  { code: 'zu', label: 'isiZulu' },
  { code: 'af', label: 'Afrikaans' },
  { code: 'sq', label: 'Shqip' },
  { code: 'bs', label: 'Bosanski' },
  { code: 'hr', label: 'Hrvatski' },
  { code: 'sk', label: 'Slovenčina' },
  { code: 'sl', label: 'Slovenščina' },
  { code: 'bg', label: 'Български' },
  { code: 'sr', label: 'Српски' },
  { code: 'mk', label: 'Македонски' },
  { code: 'et', label: 'Eesti' },
  { code: 'lv', label: 'Latviešu' },
  { code: 'lt', label: 'Lietuvių' },
  { code: 'ca', label: 'Català' },
  { code: 'eu', label: 'Euskara' },
  { code: 'gl', label: 'Galego' },
  { code: 'cy', label: 'Cymraeg' },
];

function triggerGoogleTranslate(langCode: string) {
  const doTranslate = () => {
    const select = document.querySelector(
      '.goog-te-combo',
    ) as HTMLSelectElement;
    if (!select) return;
    select.value = langCode;
    select.dispatchEvent(new Event('change', { bubbles: true }));
  };

  try {
    const sessionKeys: string[] = [];
    for (let i = 0; i < sessionStorage.length; i++) {
      const k = sessionStorage.key(i);
      if (k && (k.includes('goog') || k.includes('_gtrans')))
        sessionKeys.push(k);
    }
    sessionKeys.forEach((k) => sessionStorage.removeItem(k));
  } catch {}

  document.cookie = 'googtrans=; path=/; max-age=0;';
  document.cookie = `googtrans=; path=/; domain=${window.location.hostname}; max-age=0;`;

  doTranslate();
  setTimeout(doTranslate, 600);
}

export default function LanguageSwitcher() {
  const [open, setOpen] = useState(false);
  const [activeLang, setActiveLang] = useState(LANGUAGES[0]);
  const [search, setSearch] = useState('');
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const cookie = document.cookie
      .split(';')
      .find((c) => c.trim().startsWith('googtrans='));
    if (cookie) {
      const match = cookie.match(/\/[a-z]{2}\/([a-z\-]{2,})/);
      if (match) {
        const saved = LANGUAGES.find((l) => l.code === match[1]);
        if (saved) setActiveLang(saved);
      }
    }
  }, []);

  useEffect(() => {
    const handler = (e: MouseEvent) => {
      if (ref.current && !ref.current.contains(e.target as Node))
        setOpen(false);
    };
    document.addEventListener('mousedown', handler);
    return () => document.removeEventListener('mousedown', handler);
  }, []);

  const handleSelect = (lang: (typeof LANGUAGES)[0]) => {
    setActiveLang(lang);
    setOpen(false);
    setSearch('');
    triggerGoogleTranslate(lang.code);
  };

  const filtered = search
    ? LANGUAGES.filter(
        (l) =>
          l.label.toLowerCase().includes(search.toLowerCase()) ||
          l.code.toLowerCase().includes(search.toLowerCase()),
      )
    : LANGUAGES;

  const displayName = activeLang.code === 'zh-CN' ? 'ZH' : activeLang.code.toUpperCase();

  return (
    <div className={styles.langSwitcher} ref={ref}>
      <Button
        className={styles.langTrigger}
        onClick={() => setOpen((o) => !o)}
        aria-label="Change language"
        aria-expanded={open}
      >
        <GlobalOutlined style={{ fontSize: 15 }} />
        <span translate="no" className={`${styles.langCode} notranslate`}>
          {displayName}
        </span>
      </Button>

      {open && (
        <div className={styles.langDropdown}>
          <p className={styles.langDropdownTitle} translate="no">
            Select Language
          </p>
          <input
            className={styles.langSearch}
            type="text"
            placeholder="Search language..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            autoFocus
            translate="no"
          />
          <div className={styles.langGrid}>
            {filtered.map((l) => (
              <Button
                key={l.code}
                className={`${styles.langOption} ${l.code === activeLang.code ? styles.langActive : ''}`}
                onClick={() => handleSelect(l)}
              >
                <span
                  className={`${styles.optionLabel} notranslate`}
                  translate="no"
                >
                  {l.label}
                </span>
              </Button>
            ))}
            {filtered.length === 0 && (
              <p className={styles.noResults} translate="no">
                No languages found
              </p>
            )}
          </div>
        </div>
      )}
    </div>
  );
}

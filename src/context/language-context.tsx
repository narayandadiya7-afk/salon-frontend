'use client';

import { useState, createContext, useContext } from 'react';

const dictionaryList: Record<string, Record<string, string>> = { en: {}, fr: {}, hi: {} };

export const languageOptions = { en: 'English', fr: 'French', hi: 'Hindi' };

export const LanguageContext = createContext({
  userLanguage: 'en',
  dictionary: dictionaryList.en,
  userLanguageChange: (selected: keyof typeof languageOptions) => {},
} as {
  userLanguage: string;
  dictionary: Record<string, string>;
  userLanguageChange: (selected: keyof typeof languageOptions) => void;
});

export function LanguageProvider({ children }: { children: React.ReactNode }) {
  const defaultLanguage =
    typeof localStorage !== 'undefined' ? localStorage.getItem('rcml-lang') : 'en';
  const [userLanguage, setUserLanguage] = useState<string>(defaultLanguage || 'en');

  const userLanguageChange = (selected: keyof typeof languageOptions) => {
    const newLanguage = languageOptions[selected] ? selected : 'en';
    setUserLanguage(newLanguage);
    if (typeof localStorage !== 'undefined') localStorage.setItem('rcml-lang', newLanguage);
  };

  return (
    <LanguageContext.Provider value={{
      userLanguage,
      dictionary: dictionaryList[userLanguage as keyof typeof dictionaryList] || {},
      userLanguageChange,
    }}>
      {children}
    </LanguageContext.Provider>
  );
}

export function useLanguage() {
  return useContext(LanguageContext);
}

export default function Text({ tid, def }: { tid: string; def: string }): string {
  const { dictionary } = useContext(LanguageContext);
  return dictionary[tid] ?? def;
}

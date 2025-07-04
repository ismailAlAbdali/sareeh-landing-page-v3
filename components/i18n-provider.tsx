'use client';

import { createContext, useContext, useState, useEffect } from 'react';
import { usePathname, useRouter } from 'next/navigation';
import { i18n, type Locale } from '@/lib/i18n-config';

type Direction = 'ltr' | 'rtl';

type I18nContextType = {
  language: Locale;
  direction: Direction;
  setLanguage: (lang: Locale) => void;
};

const I18nContext = createContext<I18nContextType | undefined>(undefined);

export function I18nProvider({ 
  children,
  lang
}: { 
  children: React.ReactNode
  lang: Locale
}) {
  const pathname = usePathname();
  const router = useRouter();
  const [language, setLanguageState] = useState<Locale>(lang);
  const [direction, setDirection] = useState<Direction>(lang === 'ar' ? 'rtl' : 'ltr');

  const setLanguage = (newLang: Locale) => {
    setLanguageState(newLang);
    setDirection(newLang === 'ar' ? 'rtl' : 'ltr');
    document.documentElement.dir = newLang === 'ar' ? 'rtl' : 'ltr';
    document.documentElement.lang = newLang;
    document.cookie = `NEXT_LOCALE=${newLang}; path=/; max-age=31536000`;
    
    // Update URL to reflect language change
    const newPathname = pathname.replace(`/${language}`, `/${newLang}`);
    router.push(newPathname);
  };

  useEffect(() => {
    document.documentElement.dir = direction;
    document.documentElement.lang = language;
  }, [direction, language]);

  return (
    <I18nContext.Provider value={{ language, direction, setLanguage }}>
      {children}
    </I18nContext.Provider>
  );
}

export function useI18n() {
  const context = useContext(I18nContext);
  if (context === undefined) {
    throw new Error('useI18n must be used within an I18nProvider');
  }
  return context;
}
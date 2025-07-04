'use client';

import { useI18n } from './i18n-provider';
import { translations } from '@/lib/translations';
import { useTheme } from 'next-themes';
import { useEffect, useState } from 'react';

export default function Footer() {
  const { language } = useI18n();
  const { resolvedTheme } = useTheme(); // Use `resolvedTheme` to get the actual theme
  const [logoPath, setLogoPath] = useState(''); // State to store the correct logo path
  const t = translations[language].footer;
  const currentYear = new Date().getFullYear();

  useEffect(() => {
    // Update logo path after theme is resolved
    if (resolvedTheme) {
      setLogoPath(
        resolvedTheme === 'dark'
          ? 'images/header_logo.png'
          : 'images/header_logo_light.png'
      );
    }
  }, [resolvedTheme]);

  return (
    <footer className="bg-gray-50 dark:bg-gray-900 py-12">
      <div className="container mx-auto px-4">
        <div className="flex flex-col md:flex-row justify-between items-center">
          <div className="mb-4 md:mb-0">
            {logoPath && ( // Render logo only after the path is set
              <img src={logoPath} alt="Sareeh POS" className="h-8" />
            )}
          </div>

          <div className="flex flex-col md:flex-row items-center space-y-4 md:space-y-0 md:space-x-8">
            <a href="#" className="text-sm text-gray-600 dark:text-gray-400 hover:text-primary">
              <span className={`${language === 'ar' ? 'ml-2' : 'mr-2'}`}></span>
              {t.privacy}
            </a>
            <a href="#" className="text-sm text-gray-600 dark:text-gray-400 hover:text-primary">
              <span className={`${language === 'ar' ? 'ml-2' : 'mr-2'}`}></span>
              {t.terms}
            </a>
          </div>

          <div className="mt-4 md:mt-0 text-sm text-gray-600 dark:text-gray-400">
            © {currentYear} Oman Cloud {t.rights}
          </div>
        </div>
      </div>
    </footer>
  );
}

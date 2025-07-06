'use client';

import { useI18n } from './i18n-provider';
import { translations } from '@/lib/translations';
import { useTheme } from 'next-themes';
import { useEffect, useState } from 'react';
import { Phone, MessageCircle, MapPin, Instagram, Mail } from "lucide-react";

export default function Footer() {
  const { language } = useI18n();
  const { resolvedTheme } = useTheme();
  const [logoPath, setLogoPath] = useState('');
  const t = translations[language].footer;
  const currentYear = new Date().getFullYear();
  const isRTL = language === 'ar';

  useEffect(() => {
    if (resolvedTheme) {
      setLogoPath(
        resolvedTheme === 'dark'
          ? '/images/header_logo.png'
          : '/images/header_logo_light.png'
      );
    }
  }, [resolvedTheme]);

  return (
    <footer className="bg-gray-50 dark:bg-gray-900 text-gray-900 dark:text-white border-t border-gray-200 dark:border-gray-800" dir={isRTL ? 'rtl' : 'ltr'}>
      <div className="container mx-auto px-6 py-16">
        <div className={`grid grid-cols-1 md:grid-cols-3 gap-10 lg:gap-16 ${isRTL ? 'text-right' : 'text-left'}`}>
          {/* Company Section */}
          <div className="space-y-6">
            <div className={`mb-8 ${isRTL ? 'text-right' : 'text-left'}`}>
              {logoPath && (
                <img 
                  src={logoPath} 
                  alt="Sareeh POS" 
                  className={`h-12 ${isRTL ? 'inline-block' : 'inline-block'}`}
                />
              )}
            </div>
            <p className={`text-gray-600 dark:text-gray-300 leading-relaxed ${isRTL ? 'text-base font-medium' : 'text-sm'}`}>
              {isRTL 
                ? "صريح هو نظام إدارة المبيعات والمخزون المتكامل المصمم لتطوير أعمالك وتحويلها رقمياً. نقدم الحل الأمثل للمشاريع الصغيرة والمتوسطة في سلطنة عمان لإدارة المبيعات والمخزون والفواتير بكل سهولة وكفاءة."
                : "Sareeh POS is a comprehensive point-of-sale and inventory management system designed to digitally transform your business. We provide the perfect solution for small and medium enterprises in Oman to manage sales, inventory, and invoicing with ease and efficiency."
              }
            </p>
          </div>

          {/* Quick Links Section */}
          <div className="space-y-6">
            <h3 className={`text-xl font-bold text-gray-900 dark:text-white mb-6 ${isRTL ? 'text-2xl' : 'text-xl'}`}>
              {isRTL ? 'روابط سريعة' : 'Quick Links'}
            </h3>
            <nav className="space-y-4">
              <a href="#features" className={`block text-gray-600 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white transition-colors duration-200 ${isRTL ? 'text-base font-medium' : 'text-sm'}`}>
                {isRTL ? 'المميزات' : 'Features'}
              </a>
              <a href="#industries" className={`block text-gray-600 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white transition-colors duration-200 ${isRTL ? 'text-base font-medium' : 'text-sm'}`}>
                {isRTL ? 'القطاعات' : 'Industries'}
              </a>
              <a href="#pricing" className={`block text-gray-600 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white transition-colors duration-200 ${isRTL ? 'text-base font-medium' : 'text-sm'}`}>
                {isRTL ? 'الأسعار' : 'Pricing'}
              </a>
              <a href="#" className={`block text-gray-600 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white transition-colors duration-200 ${isRTL ? 'text-base font-medium' : 'text-sm'}`}>
                {t.privacy}
              </a>
              <a href="#" className={`block text-gray-600 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white transition-colors duration-200 ${isRTL ? 'text-base font-medium' : 'text-sm'}`}>
                {t.terms}
              </a>
            </nav>
          </div>

          {/* Contact & Social Section */}
          <div className={`space-y-6 ${isRTL ? 'text-right' : 'text-left'}`}>
            <h3 className={`text-xl font-bold text-gray-900 dark:text-white mb-6 ${isRTL ? 'text-2xl' : 'text-xl'}`}>
              {t.contact}
            </h3>
            <div className="space-y-5">
              <a 
                href="tel:+96895544746"
                className={`flex items-center gap-4 text-gray-600 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white transition-colors duration-200 group ${isRTL ? 'flex-row-reverse justify-end' : 'justify-start'}`}
              >
                <Phone className="w-5 h-5 text-blue-500 dark:text-blue-400 flex-shrink-0 group-hover:text-blue-600 dark:group-hover:text-blue-300" />
                <span className={`${isRTL ? 'text-base font-medium' : 'text-sm'}`}>+968 95544746</span>
              </a>
              
              <a 
                href="mailto:sareeh@omancloud.com"
                className={`flex items-center gap-4 text-gray-600 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white transition-colors duration-200 group ${isRTL ? 'flex-row-reverse justify-end' : 'justify-start'}`}
              >
                <Mail className="w-5 h-5 text-purple-500 dark:text-purple-400 flex-shrink-0 group-hover:text-purple-600 dark:group-hover:text-purple-300" />
                <span className={`${isRTL ? 'text-base font-medium' : 'text-sm'}`}>sareeh@omancloud.com</span>
              </a>
              
              <a 
                href="https://wa.me/96895544746"
                target="_blank"
                rel="noopener noreferrer"
                className={`flex items-center gap-4 text-gray-600 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white transition-colors duration-200 group ${isRTL ? 'flex-row-reverse justify-end' : 'justify-start'}`}
              >
                <MessageCircle className="w-5 h-5 text-green-500 dark:text-green-400 flex-shrink-0 group-hover:text-green-600 dark:group-hover:text-green-300" />
                <span className={`${isRTL ? 'text-base font-medium' : 'text-sm'}`}>WhatsApp</span>
              </a>
              
              <div className={`flex items-center gap-4 text-gray-600 dark:text-gray-300 ${isRTL ? 'flex-row-reverse justify-end' : 'justify-start'}`}>
                <MapPin className="w-5 h-5 text-red-500 dark:text-red-400 flex-shrink-0" />
                <span className={`${isRTL ? 'text-base font-medium' : 'text-sm'}`}>
                  {isRTL ? 'بوشر، غلا، سلطنة عمان' : 'Bousher, Ghala, Oman'}
                </span>
              </div>
            </div>

            {/* Social Media */}
            <div className="pt-6">
              <h4 className={`font-semibold text-gray-900 dark:text-white mb-4 ${isRTL ? 'text-lg' : 'text-sm'}`}>
                {t.followUs}
              </h4>
              <a
                href="https://instagram.com/omancloud.co"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center w-12 h-12 bg-gray-200 dark:bg-gray-800 hover:bg-gradient-to-r hover:from-purple-500 hover:to-pink-500 rounded-lg transition-all duration-300 transform hover:scale-110"
                aria-label={`${t.followUs} - Instagram`}
              >
                <Instagram className="w-6 h-6 text-pink-500 dark:text-pink-400" />
              </a>
            </div>
          </div>
        </div>

        {/* Bottom Section - Copyright */}
        <div className="border-t border-gray-200 dark:border-gray-800 mt-16 pt-10">
          <div className="text-center">
            <p className={`text-gray-500 dark:text-gray-400 ${isRTL ? 'text-base' : 'text-sm'}`}>
              © {currentYear} Oman Cloud. {t.rights}
            </p>
          </div>
        </div>
      </div>
    </footer>
  )
}

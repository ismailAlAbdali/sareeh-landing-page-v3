'use client';

import { motion } from 'framer-motion';
import { MapPin } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useI18n } from './i18n-provider';
import { translations } from '@/lib/translations';


const GOOGLE_MAPS_URL = "https://maps.app.goo.gl/FLzgrHmWmQt5ZA7L7"
export default function Location() {
  const { language } = useI18n();
  const t = translations[language].location;

  return (
    <section id="contact" className="py-24">
      <div className="container mx-auto px-4">
        <div className="max-w-6xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              {t.title}
            </h2>
            <p className="text-lg text-gray-600 dark:text-gray-400">
              {t.subtitle}
            </p>
          </motion.div>

          <div className="grid md:grid-cols-2 gap-12 items-center">
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="space-y-6"
            >
              <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-xl p-8">
                <h3 className="text-2xl font-bold mb-4">{t.company}</h3>
                <div className="space-y-2 text-gray-600 dark:text-gray-300">
                  <p>{t.address.line1}</p>
                  <p>{t.address.line2}</p>
                  <p>{t.address.line3}</p>
                </div>
                <Button
                  onClick={() => window.location.href = GOOGLE_MAPS_URL}
                  
                  className="mt-6"
                  variant="outline"
                >
                  
                  <span className={`${language === 'ar' ? 'ml-2' : 'mr-2'}`}><MapPin className="mr-2 h-5 w-5" /></span>
                  {t.viewMap}
                </Button>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="relative"
            >
              <div className="aspect-video rounded-2xl overflow-hidden">
              <iframe
                  width="100%"
                  height="450"
                  src="https://maps.google.com/maps?width=100%25&amp;height=600&amp;hl=en&amp;q=%D9%85%D9%83%D8%AA%D8%A8%20205%20-%20Oman%20Cloud%20-%20%D8%B9%D9%85%D8%A7%D9%86%20%D9%83%D9%84%D8%A7%D9%88%D8%AF+(%D9%85%D9%83%D8%AA%D8%A8%20205%20-%20Oman%20Cloud%20-%20%D8%B9%D9%85%D8%A7%D9%86%20%D9%83%D9%84%D8%A7%D9%88%D8%AF)&amp;t=&amp;z=15&amp;ie=UTF8&amp;iwloc=B&amp;output=embed"
                  allowFullScreen
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                ></iframe>
              </div>
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
}
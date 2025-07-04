'use client';

import { motion } from 'framer-motion';
import { Check, MessageCircle } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useI18n } from './i18n-provider';
import { translations } from '@/lib/translations';
import WhatsAppRedirect from '@/components/whatsapp-redirect';

const offer_bundle_image_path = "images/offer_bundle.png"

export default function SpecialOffer() {
  const { language } = useI18n();
  const t = translations[language].offer;

  const bundleFeatures = [
    t.features.desktop,
    t.features.printer,
    t.features.scanner,
    t.features.drawer,
    t.features.software,
    t.features.installation,
    t.features.training,
    t.features.support,
  ];

  const inquiryMessage = language === 'ar' 
    ? `مرحباً! أنا مهتم بـ ${t.title} (349 ريال عماني) والذي يشمل:\n` +
      `- ${t.features.desktop}\n` +
      `- ${t.features.printer}\n` +
      `- ${t.features.scanner}\n` +
      `- ${t.features.drawer}\n` +
      `- ${t.features.software}\n\n` +
      "أرجو تزويدي بمزيد من المعلومات."
    : `Hello! I'm interested in the ${t.title} (349 OMR) which includes:\n` +
      `- ${t.features.desktop}\n` +
      `- ${t.features.printer}\n` +
      `- ${t.features.scanner}\n` +
      `- ${t.features.drawer}\n` +
      `- ${t.features.software}\n\n` +
      "Please provide more information.";

  return (
    <section id="offer" className="py-24 bg-gradient-to-b from-gray-50 to-white dark:from-gray-900 dark:to-gray-800">
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
              className="space-y-8"
            >
              <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-xl p-8">
                <div className="flex items-center justify-between mb-6">
                  <div>
                    <p className="text-sm text-gray-500 dark:text-gray-400">{t.regularPrice}</p>
                    <p className="text-2xl font-bold line-through text-gray-400">415 OMR</p>
                  </div>
                  <div className="text-right">
                    <p className="text-sm text-primary">{t.specialOffer}</p>
                    <p className="text-4xl font-bold text-primary">349 OMR</p>
                  </div>
                </div>

                <div className="space-y-4">
                  {bundleFeatures.map((feature, index) => (
                    <motion.div
                      key={index}
                      initial={{ opacity: 0, x: -10 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      transition={{ delay: index * 0.1 }}
                      className="flex items-center space-x-3"
                    >
                      <Check className="h-5 w-5 text-primary flex-shrink-0" />
                      <span>{feature}</span>
                    </motion.div>
                  ))}
                </div>

                <WhatsAppRedirect
                  message={inquiryMessage}
                  loadingMessage={language === 'ar' ? "جارٍ توجيهك إلى واتساب..." : "Directing you to WhatsApp..."}
                >
                  <Button
                    className="w-full mt-8"
                    size="lg"
                  >
                    <MessageCircle className={`h-5 w-5 ${language === 'ar' ? 'ml-2' : 'mr-2'}`} />
                    {t.inquireNow}
                  </Button>
                </WhatsAppRedirect>
              </div>

              <div className="text-sm text-gray-500 dark:text-gray-400">
                {t.terms.validity}
                <br />
                {t.terms.installation}
                <br />
                {t.terms.conditions}
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="relative"
            >
              <div className="aspect-square rounded-2xl overflow-hidden">
                <img
                  src={offer_bundle_image_path}
                  alt="POS Bundle"
                  className="w-full h-full object-cover"
                />
              </div>
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
}
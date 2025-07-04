'use client';

import { MessageCircle } from 'lucide-react';
import { useI18n } from './i18n-provider';
import { motion } from 'framer-motion';
import { useState } from 'react';
import LoadingOverlay from './loading-overlay';
import { AnimatePresence } from 'framer-motion';

const WHATSAPP_NUMBER = process.env.NEXT_PUBLIC_WHATSAPP_NUMBER;

if (!WHATSAPP_NUMBER) {
  throw new Error('Missing WhatsApp number environment variable');
}

export default function FloatingWhatsApp() {
  const { language } = useI18n();
  const [isRedirecting, setIsRedirecting] = useState(false);

  const handleWhatsApp = () => {
    setIsRedirecting(true);
    
    const message = language === 'ar'
      ? "مرحباً! أود معرفة المزيد عن نظام صريح"
      : "Hello! I would like to know more about Sareeh system";

    const encodedMessage = encodeURIComponent(message);
    
    setTimeout(() => {
      const whatsappURL = `https://wa.me/${WHATSAPP_NUMBER}?text=${encodedMessage}`;
      window.location.href = whatsappURL;
      setIsRedirecting(false);
    }, 1500);
  };

  return (
    <div className="fixed bottom-6 right-6 z-[1000]">
      <AnimatePresence>
        {isRedirecting && (
          <LoadingOverlay 
            message={language === 'ar' ? "جارٍ توجيهك إلى واتساب..." : "Directing you to WhatsApp..."}
          />
        )}
      </AnimatePresence>

      <motion.button
        onClick={handleWhatsApp}
        className="flex items-center justify-center w-14 h-14 bg-green-500 text-white rounded-full shadow-lg hover:bg-green-600 transition-colors"
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.9 }}
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
      >
        <MessageCircle className="h-7 w-7" />
      </motion.button>
    </div>
  );
} 
'use client';

import { Mail, MessageCircle } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useI18n } from './i18n-provider';
import { translations } from '@/lib/translations';
import { useState } from 'react';
import LoadingOverlay from '@/components/loading-overlay';
import { motion, AnimatePresence } from 'framer-motion';

const WHATSAPP_NUMBER = process.env.NEXT_PUBLIC_WHATSAPP_NUMBER;

if (!WHATSAPP_NUMBER) {
  throw new Error('Missing WhatsApp number environment variable');
}

export default function ContactButtons() {
  const { language } = useI18n();
  const t = translations[language].contact;
  const [isRedirecting, setIsRedirecting] = useState(false);

  const handleWhatsApp = () => {
    setIsRedirecting(true);
    
    const message = language === 'ar'
      ? "أنا جاي من موقع العرض الخاص لصريح وأرغب في معرفة المزيد عن العروض والخدمات المتاحة. شكرًا!"
      : "I am visiting Sareeh's special offer site and would like to know more about the offers and services available. Thank you!";

    const encodedMessage = encodeURIComponent(message);
    
    setTimeout(() => {
      const whatsappURL = `https://wa.me/${WHATSAPP_NUMBER}?text=${message}`
     
      
      window.location.href = whatsappURL;
      setIsRedirecting(false);
    }, 1500);
  };

  const handleEmail = () => {
    window.open('mailto:sales@omancloud.com', '_blank');
  };

  return (
    <>
      <AnimatePresence>
        {isRedirecting && (
          <LoadingOverlay 
            message={language === 'ar' ? "جارٍ توجيهك إلى واتساب..." : "Directing you to WhatsApp..."}
          />
        )}
      </AnimatePresence>

      <div className="flex gap-2">
        <Button
          variant="default"
          size="sm"
          onClick={handleWhatsApp}
          disabled={isRedirecting}
          className="flex-1 md:flex-none"
        >
          <MessageCircle className={`h-4 w-4 ${language === 'ar' ? 'ml-2' : 'mr-2'}`} />
          {t.whatsapp}
        </Button>

        <Button
          variant="outline"
          size="sm"
          onClick={handleEmail}
          className="flex-1 md:flex-none"
        >
          <Mail className={`h-4 w-4 ${language === 'ar' ? 'ml-2' : 'mr-2'}`} />
          {t.email}
        </Button>
      </div>
    </>
  );
}
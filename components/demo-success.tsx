'use client';

import { useEffect, useState } from 'react';
import { CheckCircle, Clock, MessageCircle } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { useI18n } from './i18n-provider';
import { translations } from '@/lib/translations';
import { motion } from 'framer-motion';

// Extend Window interface for gtag
declare global {
  interface Window {
    gtag?: (...args: any[]) => void;
  }
}

interface DemoSuccessProps {
  requestNumber?: string;
  businessName?: string;
  contactName?: string;
  onClose?: () => void;
}

export default function DemoSuccess({ 
  requestNumber, 
  businessName, 
  contactName,
  onClose 
}: DemoSuccessProps) {
  const { language } = useI18n();
  const t = translations[language].demoSuccess;
  const [showWhatsAppButton, setShowWhatsAppButton] = useState(false);

  // Google Ads conversion tracking
  useEffect(() => {
    // Track form submission conversion
    if (typeof window !== 'undefined' && window.gtag) {
      window.gtag('event', 'conversion', {
        'send_to': 'AW-1234567890/ABC123DEF456', // TODO: Replace with your actual Google Ads conversion ID
        'value': 1.0,
        'currency': 'OMR',
        'transaction_id': requestNumber || 'demo-' + Date.now()
      });
    }

    // Show WhatsApp button after 3 seconds
    const timer = setTimeout(() => {
      setShowWhatsAppButton(true);
    }, 3000);

    return () => clearTimeout(timer);
  }, [requestNumber]);

  const handleWhatsAppContact = () => {
    const message = language === 'ar'
      ? encodeURIComponent(
          `مرحباً، أنا ${contactName} من ${businessName}.\n\nطلب رقم: ${requestNumber}\n\nأريد معرفة المزيد عن نظام صريح وكيفية الحصول على نسخة تجريبية.`
        )
      : encodeURIComponent(
          `Hello, I'm ${contactName} from ${businessName}.\n\nRequest #: ${requestNumber}\n\nI would like to know more about the Sareeh system and how to get a trial version.`
        );

    const whatsappURL = `https://wa.me/${process.env.NEXT_PUBLIC_WHATSAPP_NUMBER}?text=${message}`;
    window.open(whatsappURL, '_blank');
  };

  const handleClose = () => {
    if (onClose) {
      onClose();
    }
  };

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center p-4 z-50">
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.3 }}
        className="w-full max-w-2xl"
      >
        <Card className="relative">
          <CardHeader className="text-center pb-4">
            <div className="mx-auto w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mb-4">
              <CheckCircle className="w-8 h-8 text-green-600" />
            </div>
            <CardTitle className="text-2xl font-bold text-green-600">
              {t.title}
            </CardTitle>
            <p className="text-gray-600 dark:text-gray-400 mt-2">
              {t.subtitle}
            </p>
          </CardHeader>

          <CardContent className="space-y-6">
            {/* Request Details */}
            <div className="bg-gray-50 dark:bg-gray-800 rounded-lg p-4">
              <h3 className="font-semibold mb-3">{t.requestDetails}</h3>
              <div className="space-y-2 text-sm">
                {requestNumber && (
                  <div className="flex justify-between">
                    <span className="text-gray-600 dark:text-gray-400">{t.requestNumber}:</span>
                    <span className="font-mono font-semibold">{requestNumber}</span>
                  </div>
                )}
                {businessName && (
                  <div className="flex justify-between">
                    <span className="text-gray-600 dark:text-gray-400">{t.businessName}:</span>
                    <span className="font-semibold">{businessName}</span>
                  </div>
                )}
                {contactName && (
                  <div className="flex justify-between">
                    <span className="text-gray-600 dark:text-gray-400">{t.contactName}:</span>
                    <span className="font-semibold">{contactName}</span>
                  </div>
                )}
              </div>
            </div>

            {/* Next Steps */}
            <div className="space-y-4">
              <h3 className="font-semibold text-lg">{t.nextSteps}</h3>
              
              <div className="space-y-3">
                <div className="flex items-start space-x-3">
                  <div className="w-6 h-6 bg-blue-100 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                    <span className="text-blue-600 text-sm font-semibold">1</span>
                  </div>
                  <div>
                    <p className="font-medium">{t.step1.title}</p>
                    <p className="text-sm text-gray-600 dark:text-gray-400">{t.step1.description}</p>
                  </div>
                </div>

                <div className="flex items-start space-x-3">
                  <div className="w-6 h-6 bg-blue-100 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                    <span className="text-blue-600 text-sm font-semibold">2</span>
                  </div>
                  <div>
                    <p className="font-medium">{t.step2.title}</p>
                    <p className="text-sm text-gray-600 dark:text-gray-400">{t.step2.description}</p>
                  </div>
                </div>

                <div className="flex items-start space-x-3">
                  <div className="w-6 h-6 bg-blue-100 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                    <span className="text-blue-600 text-sm font-semibold">3</span>
                  </div>
                  <div>
                    <p className="font-medium">{t.step3.title}</p>
                    <p className="text-sm text-gray-600 dark:text-gray-400">{t.step3.description}</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="flex flex-col sm:flex-row gap-3 pt-4">
              {showWhatsAppButton && (
                <Button 
                  onClick={handleWhatsAppContact}
                  className="flex-1 bg-green-600 hover:bg-green-700"
                >
                  <MessageCircle className="w-4 h-4 mr-2" />
                  {t.whatsappButton}
                </Button>
              )}
              
              <Button 
                variant="outline" 
                onClick={handleClose}
                className="flex-1"
              >
                {t.closeButton}
              </Button>
            </div>
          </CardContent>
        </Card>
      </motion.div>
    </div>
  );
} 
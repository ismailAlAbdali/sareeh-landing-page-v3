'use client';

import { useEffect, useState, Suspense } from 'react';
import { useSearchParams } from 'next/navigation';
import { CheckCircle, MessageCircle, ArrowLeft } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { useI18n } from '@/components/i18n-provider';
import { translations } from '@/lib/translations';
import { motion } from 'framer-motion';
import Link from 'next/link';

// Extend Window interface for Google Analytics
declare global {
  interface Window {
    gtag?: (...args: any[]) => void;
  }
}

// Loading component for Suspense fallback
function ThankYouPageSkeleton() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 dark:from-gray-900 dark:to-gray-800 flex items-center justify-center p-4">
      <div className="w-full max-w-2xl">
        <Card className="relative shadow-2xl">
          <CardHeader className="text-center pb-4">
            <div className="mx-auto w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mb-6">
              <CheckCircle className="w-10 h-10 text-green-600" />
            </div>
            <CardTitle className="text-3xl font-bold text-green-600 mb-2">
              Loading...
            </CardTitle>
            <p className="text-lg text-gray-600 dark:text-gray-400">
              Please wait while we load your request details...
            </p>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="bg-gray-50 dark:bg-gray-800 rounded-lg p-6">
              <div className="animate-pulse space-y-3">
                <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded w-3/4"></div>
                <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded w-1/2"></div>
                <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded w-2/3"></div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}

// Component that uses useSearchParams
function ThankYouPageContent() {
  const { language } = useI18n();
  const t = translations[language].thankYou;
  const searchParams = useSearchParams();
  const [showWhatsAppButton, setShowWhatsAppButton] = useState(false);

  // Get data from URL parameters
  const requestNumber = searchParams.get('request') || `DEMO-${Date.now()}`;
  const businessName = searchParams.get('business') || '';
  const contactName = searchParams.get('contact') || '';
  const industry = searchParams.get('industry') || '';

  // Google Analytics tracking
  useEffect(() => {
    // Track thank you page view and demo completion events
    if (typeof window !== 'undefined' && window.gtag) {
      // Track page view
      window.gtag('config', 'G-NDXT4VP66E', {
        page_title: 'Thank You - Demo Request Completed',
        page_location: window.location.href,
      });

      // Track demo request completion event
      window.gtag('event', 'demo_request_completed', {
        'event_category': 'engagement',
        'event_label': 'demo_form_submission',
        'value': 1,
        'transaction_id': requestNumber,
        'business_name': businessName,
        'industry': industry,
        'currency': 'OMR'
      });

      // Track conversion for Google Ads (if you have conversion tracking set up)
      window.gtag('event', 'conversion', {
        'send_to': 'G-NDXT4VP66E/demo_conversion', // Update this if you have specific conversion tracking
        'value': 1.0,
        'currency': 'OMR',
        'transaction_id': requestNumber
      });

      // Track custom milestone event
      window.gtag('event', 'milestone_reached', {
        'milestone_name': 'demo_request_thank_you',
        'event_category': 'user_journey',
        'event_label': 'demo_funnel_completion'
      });
    }

    // Show WhatsApp button after 3 seconds
    const timer = setTimeout(() => {
      setShowWhatsAppButton(true);
    }, 3000);

    return () => clearTimeout(timer);
  }, [requestNumber, businessName, industry]);

  const handleWhatsAppContact = () => {
    const message = language === 'ar'
      ? encodeURIComponent(
          `مرحباً، أنا ${contactName} من ${businessName}.\n\nطلب رقم: ${requestNumber}\nالقطاع: ${industry}\n\nأريد معرفة المزيد عن نظام صريح وكيفية الحصول على نسخة تجريبية.`
        )
      : encodeURIComponent(
          `Hello, I'm ${contactName} from ${businessName}.\n\nRequest #: ${requestNumber}\nIndustry: ${industry}\n\nI would like to know more about the Sareeh system and how to get a trial version.`
        );

    const whatsappURL = `https://wa.me/${process.env.NEXT_PUBLIC_WHATSAPP_NUMBER}?text=${message}`;
    window.open(whatsappURL, '_blank');
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 dark:from-gray-900 dark:to-gray-800 flex items-center justify-center p-4">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="w-full max-w-2xl"
      >
        <Card className="relative shadow-2xl">
          <CardHeader className="text-center pb-4">
            <div className="mx-auto w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mb-6">
              <CheckCircle className="w-10 h-10 text-green-600" />
            </div>
            <CardTitle className="text-3xl font-bold text-green-600 mb-2">
              {t.title}
            </CardTitle>
            <p className="text-lg text-gray-600 dark:text-gray-400">
              {t.subtitle}
            </p>
          </CardHeader>

          <CardContent className="space-y-6">
            {/* Request Details */}
            <div className="bg-gray-50 dark:bg-gray-800 rounded-lg p-6">
              <h3 className="font-semibold text-lg mb-4">{t.requestDetails}</h3>
              <div className="space-y-3 text-sm">
                <div className="flex justify-between items-center">
                  <span className="text-gray-600 dark:text-gray-400">{t.requestNumber}:</span>
                  <span className="font-mono font-semibold text-lg">{requestNumber}</span>
                </div>
                {businessName && (
                  <div className="flex justify-between items-center">
                    <span className="text-gray-600 dark:text-gray-400">{t.businessName}:</span>
                    <span className="font-semibold">{businessName}</span>
                  </div>
                )}
                {contactName && (
                  <div className="flex justify-between items-center">
                    <span className="text-gray-600 dark:text-gray-400">{t.contactName}:</span>
                    <span className="font-semibold">{contactName}</span>
                  </div>
                )}
                {industry && (
                  <div className="flex justify-between items-center">
                    <span className="text-gray-600 dark:text-gray-400">{t.industry}:</span>
                    <span className="font-semibold">{industry}</span>
                  </div>
                )}
              </div>
            </div>

            {/* Next Steps */}
            <div className="space-y-4">
              <h3 className="font-semibold text-xl">{t.nextSteps}</h3>
              
              <div className="space-y-4">
                <div className="flex items-start space-x-4">
                  <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                    <span className="text-blue-600 text-sm font-semibold">1</span>
                  </div>
                  <div>
                    <p className="font-medium text-lg">{t.step1.title}</p>
                    <p className="text-gray-600 dark:text-gray-400">{t.step1.description}</p>
                  </div>
                </div>

                <div className="flex items-start space-x-4">
                  <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                    <span className="text-blue-600 text-sm font-semibold">2</span>
                  </div>
                  <div>
                    <p className="font-medium text-lg">{t.step2.title}</p>
                    <p className="text-gray-600 dark:text-gray-400">{t.step2.description}</p>
                  </div>
                </div>

                <div className="flex items-start space-x-4">
                  <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                    <span className="text-blue-600 text-sm font-semibold">3</span>
                  </div>
                  <div>
                    <p className="font-medium text-lg">{t.step3.title}</p>
                    <p className="text-gray-600 dark:text-gray-400">{t.step3.description}</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="flex flex-col sm:flex-row gap-4 pt-6">
              {showWhatsAppButton && (
                <Button 
                  onClick={handleWhatsAppContact}
                  className="flex-1 bg-green-600 hover:bg-green-700 text-lg py-3"
                >
                  <MessageCircle className="w-5 h-5 mr-2" />
                  {t.whatsappButton}
                </Button>
              )}
              
              <Link href={`/${language}`} className="flex-1">
                <Button 
                  variant="outline" 
                  className="w-full text-lg py-3"
                >
                  <ArrowLeft className="w-5 h-5 mr-2" />
                  {t.backToHome}
                </Button>
              </Link>
            </div>
          </CardContent>
        </Card>
      </motion.div>
    </div>
  );
}

// Main component wrapped in Suspense
export default function ThankYouPage() {
  return (
    <Suspense fallback={<ThankYouPageSkeleton />}>
      <ThankYouPageContent />
    </Suspense>
  );
} 
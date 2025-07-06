'use client';

import { useState, useEffect } from 'react';
import { MessageCircle, PlayCircle } from 'lucide-react';

import { Button } from '@/components/ui/button';
import HeroCountdown from './hero-countdown';
import CelebrationConfetti from './celebration-confetti';
import { useI18n } from './i18n-provider';
import { translations } from '@/lib/translations';
import LoadingOverlay from '@/components/loading-overlay';
import { motion, AnimatePresence } from 'framer-motion';
const IMAGE_DIR = 'images/';
const WHATSAPP_NUMBER = process.env.NEXT_PUBLIC_WHATSAPP_NUMBER;

if (!WHATSAPP_NUMBER) {
  throw new Error('Missing environment variables');
}

export default function Hero() {
  const [showConfetti, setShowConfetti] = useState(false);  
  const [isRedirecting, setIsRedirecting] = useState(false);

  const { language } = useI18n();
  const t = translations[language].hero;

  useEffect(() => {
    setShowConfetti(true);
    const timer = setTimeout(() => setShowConfetti(false), 3000);
    return () => clearTimeout(timer);
  }, []);

  const handleWhatsApp = () => {
    setIsRedirecting(true);
  
    // Determine the message based on the language
    const message =
      language === 'ar'
        ? encodeURIComponent(
            "أنا جاي من موقع التعريفي لصريح وأرغب في معرفة المزيد عن العروض والخدمات المتاحة. شكرًا!"
          )
        : encodeURIComponent(
            "I am visiting Sareeh's landing page and would like to know more about the offers and services available. Thank you!"
          );
  
    setTimeout(() => {
      const whatsappURL = `https://wa.me/${WHATSAPP_NUMBER}?text=${message}`
     
      
      window.location.href = whatsappURL;
      setIsRedirecting(false);
    }, 1500);
  };
  

  const handleDemo = () => {
    document.getElementById('demo')?.scrollIntoView({ behavior: 'smooth' });
  };

  const handleCelebrateAgain = () => {
    setShowConfetti(true);
    const timer = setTimeout(() => setShowConfetti(false), 5000);
    return () => clearTimeout(timer);
  };

  // Use absolute paths for better cross-browser compatibility
  const imageSrc = language === 'ar' ? '/images/sareeh_ar.png' : '/images/sareeh_en.png';

  // Debug logging
  useEffect(() => {
    console.log('Hero image src:', imageSrc);
    console.log('Current language:', language);
  }, [imageSrc, language]);

  return (
    <section className="relative min-h-screen pt-24 overflow-hidden">
      <AnimatePresence>
        {isRedirecting && (
          <LoadingOverlay message={language === 'ar' ? "جارٍ توجيهك إلى واتساب..." : "Directing you to WhatsApp..."} />
        )}
      </AnimatePresence>
      
      {/* {showConfetti && <CelebrationConfetti />}
      {showConfetti && <CelebrationConfetti />}
      {showConfetti && <CelebrationConfetti />}
      {showConfetti && <CelebrationConfetti />} */}

      <div className="hero-gradient absolute inset-0" />

      <div className="container relative mx-auto px-4 py-12 text-center">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="max-w-4xl mx-auto"
        >
          <h1 className="text-4xl md:text-6xl font-bold mb-6">
            <span className="gradient-text">{t.title}</span>
          </h1>

          <p className="text-xl md:text-2xl text-gray-600 dark:text-gray-300 mb-8">
            {t.subtitle}
          </p>

          {/* Commented out countdown
          <div className="mb-12">
            <HeroCountdown />
          </div>
          */}

          <div className="flex flex-col md:flex-row gap-4 justify-center mb-12">
          <Button
  size="lg"
  className="text-lg flex items-center justify-center"
  onClick={handleWhatsApp}
>
  <MessageCircle className={`h-5 w-5 ${language === 'ar' ? 'ml-2' : 'mr-2'}`} />
  {t.contactSales}
</Button>

<Button
  size="lg"
  variant="outline"
  className="text-lg flex items-center justify-center"
  onClick={handleDemo}
>
  <PlayCircle className={`h-5 w-5 ${language === 'ar' ? 'ml-2' : 'mr-2'}`} />
  {t.requestDemo}
</Button>

{/* Celebrate Again Button */}
{/* <Button
  size="lg"
  variant="destructive"
  className={`text-lg bg-gradient-to-r from-red-500 via-white to-green-500
              text-green-800 dark:text-green-500
              flex items-center justify-center rounded-lg shadow-md 
              hover:shadow-lg transition-all duration-500`}
  onClick={handleCelebrateAgain}
>
  <span className={`${language === 'ar' ? 'ml-2' : 'mr-2'}`}>🎉</span>
  {t.celebrateAgain || "Celebrate Again!"}
</Button> */}


          </div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3, duration: 0.5 }}
            className="relative max-w-5xl mx-auto"
          >
            {/* Use regular img tag for maximum cross-browser compatibility */}
            <img
              src={imageSrc}
              alt="Sareeh POS Dashboard"
              className="rounded-lg shadow-2xl w-full h-auto"
              style={{
                maxWidth: '100%',
                height: 'auto',
                display: 'block',
                objectFit: 'contain'
              }}
              loading="eager"
              decoding="async"
              onLoad={() => console.log('Hero image loaded successfully:', imageSrc)}
              onError={(e) => {
                console.error('Hero image failed to load:', imageSrc, e);
                // Try to reload the image
                const target = e.target as HTMLImageElement;
                target.src = imageSrc + '?t=' + Date.now();
              }}
            />
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}

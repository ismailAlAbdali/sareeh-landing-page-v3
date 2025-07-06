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
      
      <div className="container mx-auto px-4 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center min-h-[70vh]">
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center lg:text-left space-y-6"
          >
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold leading-tight">
              {t.title}
            </h1>
            <p className="text-lg md:text-xl text-gray-600 dark:text-gray-300 max-w-2xl mx-auto lg:mx-0">
              {t.subtitle}
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start">
              <Button 
                size="lg" 
                onClick={handleDemo}
                className="bg-primary hover:bg-primary/90 text-white px-8 py-4 text-lg font-semibold"
              >
                {t.requestDemo}
              </Button>
              <Button 
                size="lg" 
                variant="outline" 
                onClick={handleWhatsApp}
                className="px-8 py-4 text-lg font-semibold"
              >
                {t.contactSales}
              </Button>
            </div>
          </motion.div>

          <motion.div 
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="flex justify-center lg:justify-end"
          >
            <div className="relative">
              <motion.img
                src={imageSrc}
                alt={language === 'ar' ? 'نظام نقاط البيع صريح' : 'Sareeh POS System'}
                className="max-w-full h-auto rounded-lg shadow-2xl"
                style={{
                  filter: 'drop-shadow(0 25px 50px rgba(0,0,0,0.15))',
                }}
                whileHover={{ scale: 1.05 }}
                transition={{ duration: 0.3 }}
              />
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}

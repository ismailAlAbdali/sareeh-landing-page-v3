"use client";

import { useRef, useState } from "react";
import Image from "next/image";
import { motion } from "framer-motion";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { PricingTier } from "@/lib/types/pricing";
import { ImageModal } from "@/components/ui/image-modal";
import { useI18n } from "@/components/i18n-provider";
import { translations } from "@/lib/translations";

const currancyLang = {
  ar: "ريال عماني",
  en: "OMR"
}

interface PricingCardProps extends PricingTier {
  className?: string;
}

const WHATSAPP_NUMBER = process.env.NEXT_PUBLIC_WHATSAPP_NUMBER;

if (!WHATSAPP_NUMBER) {
  throw new Error('Missing WhatsApp number environment variable');
}

const whatsappMessages = {
  ar: {
    greeting: "مرحباً! أنا مهتم بباقة",
    details: "تفاصيل الباقة",
    price: "السعر",
    directing: "جاري تحويلك إلى واتساب..."
  },
  en: {
    greeting: "Hello! I'm interested in the",
    details: "Package details",
    price: "Price",
    directing: "Redirecting to WhatsApp..."
  }
};

function handleGetStarted(packageDetails: {
  name: string;
  price: number;
  features: string[];
}, language: 'en' | 'ar') {
  const messages = whatsappMessages[language];
  
  const messageContent = `${messages.greeting} ${packageDetails.name} package.
${messages.details}:
- ${packageDetails.features.join('\n- ')}
${messages.price}: ${packageDetails.price} ${language === 'ar' ? 'ريال عماني' : 'OMR'}`;

  const encodedMessage = encodeURIComponent(messageContent);
  const whatsappURL = `https://wa.me/${WHATSAPP_NUMBER}?text=${encodedMessage}`;
  
  window.location.href = whatsappURL;
}

export function PricingCard({
  name,
  description,
  price,
  features,
  image,
  className,
}: PricingCardProps) {
  const cardRef = useRef<HTMLDivElement>(null);
  const [isImageModalOpen, setIsImageModalOpen] = useState(false);
  const { language, direction } = useI18n();
  const t = translations[language].pricing;

  return (
    <>
      <motion.div
        whileHover={{ scale: 1.02 }}
        transition={{ duration: 0.2 }}
        className={cn("relative", className)}
        ref={cardRef}
      >
        <Card className="relative flex flex-col h-full">
          <CardHeader>
            <div 
              className="relative aspect-square w-full mb-4 cursor-pointer transition-transform hover:scale-[1.02]"
              onClick={() => setIsImageModalOpen(true)}
            >
              <Image
                src={image}
                alt={name}
                fill
                className="object-cover rounded-lg"
              />
            </div>
            <CardTitle className="text-2xl font-bold">{name}</CardTitle>
            <CardDescription className="mt-2">{description}</CardDescription>
          </CardHeader>
          <CardContent className="flex-grow">
            <div className="mb-4">
              <span className="text-4xl font-bold">
                {direction === 'rtl' ? `${price} ${currancyLang.ar}` : `${price} ${currancyLang.en}`}
              </span>
        
            </div>
            <ul className="space-y-2">
              {features.map((feature, index) => (
                <li key={index} className="flex items-center">
                  <span className={cn(
                    "mr-2",
                    direction === 'rtl' && "ml-2 mr-0"
                  )}>✓</span>
                  {feature}
                </li>
              ))}
            </ul>
          </CardContent>
          <CardFooter className="mt-auto pt-6">
            <Button 
              className="w-full" 
              variant="default"
              onClick={() => handleGetStarted({
                name,
                price,
                features
              }, language)}
            >
              {t.getStarted}
            </Button>
          </CardFooter>
        </Card>
      </motion.div>
      
      <ImageModal
        isOpen={isImageModalOpen}
        onClose={() => setIsImageModalOpen(false)}
        imageUrl={image}
        altText={name}
      />
    </>
  );
}
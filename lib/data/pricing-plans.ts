import { PricingTier } from "@/types/pricing";
import { translations } from "@/lib/translations";
import { useI18n } from "@/components/i18n-provider";

const IMAGE_PATH = "/pricing/";

const pricesInOMR = {
    "basic": 159,
    "pro" : 349,
    "business" : 410,
    "enterprise" : 590

}

// Helper function to get pricing tiers based on language
export const getPricingTiers = (language: 'en' | 'ar'): PricingTier[] => {
  const t = translations[language].pricing;
  
  return [
    {
      name: t.plans.basic.name,
      description: t.plans.basic.description,
      price: pricesInOMR.basic,
      features: t.plans.basic.features,
      image: `${IMAGE_PATH}basic.png`,
    },
    {
      name: t.plans.pro.name,
      description: t.plans.pro.description,
      price: pricesInOMR.pro,
      features: t.plans.pro.features,
      image: `${IMAGE_PATH}pro.png`,
    },
    {
      name: t.plans.business.name,
      description: t.plans.business.description,
      price: pricesInOMR.business,
      features: t.plans.business.features,
      image: `${IMAGE_PATH}business.png`,
    },
    {
      name: t.plans.enterprise.name,
      description: t.plans.enterprise.description,
      price: pricesInOMR.enterprise,
      features: t.plans.enterprise.features,
      image: `${IMAGE_PATH}enterprise.png`, // Fixed typo in 'fourth'
    },
  ];
};

// Default export for static usage
export const pricingTiers = getPricingTiers('en');
'use client';

import { motion } from 'framer-motion';
import { Store, Utensils, Stethoscope, Shirt, Coffee, Scissors, Wheat, Car,Droplet } from 'lucide-react';
import { useI18n } from './i18n-provider'; // Assuming this hook provides the current language

const industries = [
  { icon: Store, name: { en: 'Retail', ar: 'البيع بالتجزئة' } },
  { icon: Utensils, name: { en: 'Restaurants', ar: 'المطاعم' } },
  { icon: Stethoscope, name: { en: 'Pharamcies', ar: 'الصيدليات'} },
  { icon: Shirt, name: { en: 'Fashion', ar: 'الأزياء' } },
  { icon: Coffee, name: { en: 'Cafes', ar: 'المقاهي' } },
  { icon: Scissors, name: { en: 'Salons', ar: 'صالونات التجميل' } },
  { icon: Wheat, name: { en: 'Agriculture', ar: 'المواد الزراعية' } },
  { icon: Car, name: { en: 'Automotive', ar: 'السيارات' } },
  { icon: Droplet, name: { en: 'Purfumes', ar: 'العطور' } }
];

const container = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1
    }
  }
};

const item = {
  hidden: { opacity: 0, scale: 0.9 },
  show: { opacity: 1, scale: 1 }
};

export default function IndustriesGrid() {
  const { language } = useI18n(); // Get the current language

  return (
    <section id="industries" className="py-24">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            {language === 'ar' ? 'مصمم لكل قطاع' : 'Tailored for Every Industry'}
          </h2>
          <p className="text-lg text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
            {language === 'ar' ? 'حلول متخصصة لمختلف قطاعات الأعمال' : 'Specialized solutions for different business sectors'}
          </p>
        </motion.div>

        <motion.div
          variants={container}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true }}
          className="grid grid-cols-2 md:grid-cols-3 gap-6"
        >
          {industries.map((industry, index) => (
            <motion.div
              key={index}
              variants={item}
              whileHover={{ scale: 1.05 }}
              className="group bg-white dark:bg-gray-800 p-6 rounded-xl shadow-md text-center cursor-pointer"
            >
              <div className="flex flex-col items-center">
                <industry.icon className="h-12 w-12 text-primary mb-4 group-hover:scale-110 transition-transform" />
                <h3 className="text-lg font-semibold">{industry.name[language]}</h3>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
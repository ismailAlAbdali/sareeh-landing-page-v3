'use client';

import { translations } from '@/lib/translations';
import { motion } from 'framer-motion';
import { 
  BarChart3, 
  Package, 
  Users, 
  Smartphone, 
  ShoppingCart, 
  FileBarChart, 
  Briefcase, 
  ClipboardCheck, 
  Sparkles 
} from 'lucide-react'; // Added new icons
import { useI18n } from './i18n-provider';

export default function FeaturesGrid() {
  const { language } = useI18n();
  const t = translations[language].features;

  const features = [
    {
      icon: ClipboardCheck,
      title: t.sales.title,
      description: t.sales.description
    },
    {
      icon: Briefcase,
      title: t.employee.title,
      description: t.employee.description
    },
    {
      icon: Users,
      title: t.customers.title,
      description: t.customers.description
    },
    
    {
      icon: Package,
      title: t.inventory.title,
      description: t.inventory.description
    },
    
    {
      icon: ShoppingCart,
      title: t.purchase.title,
      description: t.purchase.description
    },
    {
      icon: Smartphone,
      title: t.mobile.title,
      description: t.mobile.description
    },
    {
      icon: FileBarChart,
      title: t.reports.title,
      description: t.reports.description
    },
    {
      icon: BarChart3,
      title: t.analytics.title,
      description: t.analytics.description
    },
    {
      icon: Sparkles,
      title: t.other.title,
      description: t.other.description
    }
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
    hidden: { opacity: 0, y: 20 },
    show: { opacity: 1, y: 0 }
  };

  return (
    <section id="features" className="py-24 bg-gray-50 dark:bg-gray-900">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            {t.title}
          </h2>
          <p className="text-lg text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
            {t.subtitle}
          </p>
        </motion.div>

        <motion.div
          variants={container}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true }}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
        >
          {features.map((feature, index) => (
            <motion.div
              key={index}
              variants={item}
              className="group relative bg-white dark:bg-gray-800 p-6 rounded-xl shadow-md hover:shadow-xl transition-shadow"
            >
              <div className="absolute inset-0 bg-gradient-to-r from-primary/10 to-blue-600/10 rounded-xl opacity-0 group-hover:opacity-100 transition-opacity" />
              <div className="relative">
                <feature.icon className="h-12 w-12 text-primary mb-4" />
                <h3 className="text-xl font-semibold mb-2">{feature.title}</h3>
                <p className="text-gray-600 dark:text-gray-400">{feature.description}</p>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
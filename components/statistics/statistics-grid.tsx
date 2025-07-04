'use client';

import { useI18n } from '@/components/i18n-provider';
import { Counter } from './counter';
import { BackupIndicator } from './backup-indicator';
import { UptimeDisplay } from './uptime-display';
import { motion } from 'framer-motion';
import { ShoppingCart, Users, Clock } from 'lucide-react';
import { translations } from '@/lib/translations';

const ACTIVE_CLIENTS_PLUS = 400; // TOTAL NUMBER OF CLIENTS
const TOTAL_SALE_TRANS_PLUS = 20000000; // TOTALS SALES TRANSACTIONS IN MILLION
const YEARS_OF_EXPERIENCE = 10;  // Add this constant

export function StatisticsGrid() {
  const { language } = useI18n();
  const t = translations[language].statistics;

  return (
    <section className="py-24 bg-gray-50 dark:bg-gray-900">
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

        <div className="grid grid-cols-2 md:grid-cols-5 gap-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="flex flex-col items-center"
          >
            <ShoppingCart className="h-8 w-8 text-primary mb-4" />
            <Counter end={TOTAL_SALE_TRANS_PLUS} formatter={(value) => (value / 1000000).toFixed(1)} suffix="M+" />
            <div className="text-sm text-gray-600 dark:text-gray-400 mt-2">{t.sales}</div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="flex flex-col items-center"
          >
            <Users className="h-8 w-8 text-primary mb-4" />
            <Counter end={ACTIVE_CLIENTS_PLUS} suffix="+" />
            <div className="text-sm text-gray-600 dark:text-gray-400 mt-2">{t.clients}</div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
            className="flex flex-col items-center"
          >
            <BackupIndicator label={t.backup} />
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.3 }}
            className="flex flex-col items-center"
          >
            <UptimeDisplay percentage={99.9} label={t.uptime} />
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.4 }}
            className="flex flex-col items-center"
          >
            <Clock className="h-8 w-8 text-primary mb-4" />
            <Counter end={YEARS_OF_EXPERIENCE} suffix="+" />
            <div className="text-sm text-gray-600 dark:text-gray-400 mt-2">{t.experience}</div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
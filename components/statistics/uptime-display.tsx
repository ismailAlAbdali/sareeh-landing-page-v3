'use client';

import { motion } from 'framer-motion';
import { Activity } from 'lucide-react';

interface UptimeDisplayProps {
  percentage: number;
  label: string;
}

export function UptimeDisplay({ percentage, label }: UptimeDisplayProps) {
  return (
    <div className="flex flex-col items-center">
      <motion.div
        initial={{ opacity: 0, scale: 0.5 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.5 }}
        className="mb-2"
      >
        <Activity className="h-8 w-8 text-primary" />
      </motion.div>
      <div className="text-4xl font-bold text-primary mb-2">
        {percentage.toFixed(1)}%
      </div>
      <div className="text-sm text-gray-600 dark:text-gray-400">{label}</div>
    </div>
  );
}
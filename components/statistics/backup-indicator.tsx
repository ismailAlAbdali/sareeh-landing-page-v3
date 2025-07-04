'use client';

import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { Cloud, CheckCircle } from 'lucide-react';

interface BackupIndicatorProps {
  label: string;
}

export function BackupIndicator({ label }: BackupIndicatorProps) {
  const [lastBackup, setLastBackup] = useState<Date>(new Date());
  const [isAnimating, setIsAnimating] = useState(false);

  useEffect(() => {
    // Simulate backup every 24 hours
    const interval = setInterval(() => {
      setLastBackup(new Date());
      setIsAnimating(true);
      setTimeout(() => setIsAnimating(false), 2000);
    }, 24 * 60 * 60 * 1000);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="flex flex-col items-center">
      <motion.div
        animate={isAnimating ? { scale: [1, 1.2, 1] } : {}}
        transition={{ duration: 0.5 }}
        className="relative mb-2"
      >
        <Cloud className="h-8 w-8 text-primary" />
        <CheckCircle className="h-4 w-4 text-green-500 absolute -right-1 -bottom-1" />
      </motion.div>
      <div className="text-4xl font-bold text-primary mb-2">24h</div>
      <div className="text-sm text-gray-600 dark:text-gray-400">{label}</div>
    </div>
  );
}
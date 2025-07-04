'use client';

import { useEffect, useState } from 'react';
import Countdown from 'react-countdown';
import { motion } from 'framer-motion';
import { useI18n } from './i18n-provider';
import { translations } from '@/lib/translations';

const CountdownDisplay = ({ days, hours, minutes, seconds }: { 
  days: number;
  hours: number;
  minutes: number;
  seconds: number;
}) => {
  const { language } = useI18n();
  const t = translations[language].hero.countdown;

  const timeUnits = [
    { label: t.days, value: days },
    { label: t.hours, value: hours },
    { label: t.minutes, value: minutes },
    { label: t.seconds, value: seconds },
  ];

  return (
    <div className="flex gap-4 justify-center">
      {timeUnits.map(({ label, value }, index) => (
        <div key={label} className="text-center">
          <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-4 min-w-[100px]">
            <div className="text-4xl font-bold text-primary">{value.toString().padStart(2, '0')}</div>
            <div className="text-sm text-gray-600 dark:text-gray-400">{label}</div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default function HeroCountdown() {
  const [mounted, setMounted] = useState(false);
  const targetDate = new Date('2024-11-30T23:59:59');

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) return null;

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
      className="w-full"
    >
      <Countdown
        date={targetDate}
        renderer={({ days, hours, minutes, seconds }) => (
          <CountdownDisplay
            days={days}
            hours={hours}
            minutes={minutes}
            seconds={seconds}
          />
        )}
      />
    </motion.div>
  );
}
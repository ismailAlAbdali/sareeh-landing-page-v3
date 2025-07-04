'use client';

import { useState, useEffect } from 'react';
import { useTheme } from 'next-themes';
import { useI18n } from './i18n-provider';
import { Button } from '@/components/ui/button';
import { Moon, Sun, Menu } from 'lucide-react';
import { motion, useScroll, useMotionValueEvent } from 'framer-motion';
import LanguageSwitcher from './language-switcher';
import ContactButtons from './contact-buttons';
import { translations } from '@/lib/translations';
import {
  Sheet,
  SheetContent,
  SheetTrigger,
} from '@/components/ui/sheet';
import NavLinks from './nav-links';
import Link from 'next/link';

export default function Header() {
  const [hidden, setHidden] = useState(false);
  const { scrollY } = useScroll();
  const { resolvedTheme, setTheme } = useTheme(); // Use resolvedTheme for the actual theme value
  const [logoPath, setLogoPath] = useState(''); // State for logo path
  const { language, direction } = useI18n();
  const t = translations[language].nav;

  // Update logo path after theme is resolved
  useEffect(() => {
    if (resolvedTheme) {
      setLogoPath(
        resolvedTheme === 'dark'
          ? '/images/header_logo.png'
          : '/images/header_logo_light.png'
      );
    }
  }, [resolvedTheme]);

  useMotionValueEvent(scrollY, "change", (latest) => {
    const previous = scrollY.getPrevious() ?? 0;
    if (latest > previous && latest > 150) {
      setHidden(true);
    } else {
      setHidden(false);
    }
  });

  return (
    <motion.header
      variants={{
        visible: { y: 0 },
        hidden: { y: '-100%' },
      }}
      animate={hidden ? 'hidden' : 'visible'}
      transition={{ duration: 0.35, ease: 'easeInOut' }}
      className="fixed top-0 left-0 right-0 z-50 bg-background/80 backdrop-blur-sm border-b"
    >
      <div className="container mx-auto px-4 h-16 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <Link href={`/${language}`}>
            {logoPath && <img src={logoPath} alt="Sareeh POS" className="h-8" />}
          </Link>
        </div>

        <nav className="hidden md:flex items-center space-x-6 rtl:space-x-reverse">
          <NavLinks />
        </nav>

        <div className="flex items-center gap-4">
          <div className="hidden md:block">
            <ContactButtons />
          </div>
          
          <LanguageSwitcher />
          
          <Button
            variant="ghost"
            size="icon"
            onClick={() => setTheme(resolvedTheme === 'dark' ? 'light' : 'dark')}
          >
            <Sun className="h-5 w-5 rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0" />
            <Moon className="absolute h-5 w-5 rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100" />
          </Button>

          <Sheet>
            <SheetTrigger asChild>
              <Button variant="ghost" size="icon" className="md:hidden">
                <Menu className="h-5 w-5" />
              </Button>
            </SheetTrigger>
            <SheetContent side={direction === 'rtl' ? 'right' : 'left'}>
              <div className="flex flex-col space-y-4 mt-8">
                <NavLinks />
                <div className="pt-4">
                  <ContactButtons />
                </div>
              </div>
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </motion.header>
  );
}

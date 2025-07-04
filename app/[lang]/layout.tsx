import { Inter } from 'next/font/google';
import { ThemeProvider } from '@/components/theme-provider';
import { Toaster } from 'sonner';
import { I18nProvider } from '@/components/i18n-provider';
import type { Locale } from '@/lib/i18n-config';
import Header from '@/components/header';
import FloatingWhatsApp from '@/components/floating-whatsapp';
import '../globals.css';

const inter = Inter({ subsets: ['latin'] });

export default function RootLayout({
  children,
  params: { lang },
}: {
  children: React.ReactNode;
  params: { lang: string };
}) {
  return (
    <html lang={lang} dir={lang === 'ar' ? 'rtl' : 'ltr'} suppressHydrationWarning>
      <body className={inter.className}>
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          <I18nProvider lang={lang as Locale}>
            <Header />
            {children}
            <FloatingWhatsApp />
            <Toaster />
          </I18nProvider>
        </ThemeProvider>
      </body>
    </html>
  );
} 
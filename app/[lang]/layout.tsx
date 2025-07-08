import { ThemeProvider } from '@/components/theme-provider';
import { Toaster } from 'sonner';
import { I18nProvider } from '@/components/i18n-provider';
import type { Locale } from '@/lib/i18n-config';
import { i18n } from '@/lib/i18n-config';
import Header from '@/components/header';
import FloatingWhatsApp from '@/components/floating-whatsapp';
import TestEmailButton from '@/components/test-email-button';

// Required for static export
export function generateStaticParams() {
  return i18n.locales.map((locale) => ({ lang: locale }));
}

export default function LangLayout({
  children,
  params: { lang },
}: {
  children: React.ReactNode;
  params: { lang: string };
}) {
  const isRTL = lang === 'ar';
  
  return (
    <>
      <script
        dangerouslySetInnerHTML={{
          __html: `
            document.documentElement.lang = '${lang}';
            document.documentElement.dir = '${isRTL ? 'rtl' : 'ltr'}';
          `,
        }}
      />
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
          <Toaster 
            position="top-center"
            toastOptions={{
              style: {
                background: 'var(--background)',
                color: 'var(--foreground)',
                border: '1px solid var(--border)',
              }
            }}
          />
          <TestEmailButton />
        </I18nProvider>
      </ThemeProvider>
    </>
  );
} 
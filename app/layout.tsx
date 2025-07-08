import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import './globals.css';

const inter = Inter({ subsets: ['latin'] });

// Shared metadata for both languages
const sharedMetadata = {
  metadataBase: new URL('https://sareeh.omancloud.com/'),
  alternates: {
    canonical: 'https://sareeh.omancloud.com/',
    languages: {
      'en-US': 'https://sareeh.omancloud.com/en',
      'ar-OM': 'https://sareeh.omancloud.com/ar',
    },
  },
  openGraph: {
    type: 'website',
    siteName: 'Sareeh POS',
    images: ['/images/header_logo.png'],
  },
  twitter: {
    card: 'summary_large_image',
    images: ['/images/twitter-image.jpg'],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large' as const,
      'max-snippet': -1,
    },
  },
  verification: {
    google: 'your-google-verification-code',
  },
  icons: {
    icon: [{ url: '/images/favicon.ico', sizes: 'any' }]
  }
};

// Language-specific metadata
export const metadata: Metadata = {
  ...sharedMetadata,
  title: {
    template: '%s | Sareeh POS',
    default: 'Sareeh POS - Complete Business Management Solution',
  },
  description: 'Sareeh POS - The leading Micro ERP solution in Oman',
  keywords: [
    // English Keywords
    'POS System Oman',
    'Point of Sale Oman',
    'Business Management Software',
    'Retail POS System',
    'Restaurant POS Oman',
    'Inventory Management System',
    'Cloud POS Solution',
    'ERP System Oman',
    'Retail Management Software',
    'Business Analytics Oman',
    'Cafe Point of Sale system in Oman',
    'Cafe POS system',
    // Arabic Keywords
    'نظام نقاط البيع عمان',
    'برنامج محاسبة عمان',
    'نظام إدارة المطاعم',
    'برنامج المحاسبة للشركات',
    'نظام إدارة المخزون',
    'حلول نقاط البيع السحابية',
    'برنامج محاسبة للمطاعم',
    'نظام إدارة المبيعات',
    'برنامج محاسبي متكامل',
    'نظام تخطيط موارد المؤسسات'
  ].join(', '),
};

// Google Analytics Script Component
function GoogleAnalytics() {
  return (
    <>
      <script async src="https://www.googletagmanager.com/gtag/js?id=G-NDXT4VP66E" />
      <script
        dangerouslySetInnerHTML={{
          __html: `
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());
            gtag('config', 'G-NDXT4VP66E');
          `,
        }}
      />
    </>
  );
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <GoogleAnalytics />
        <link rel="icon" href="/images/favicon.ico" sizes="any" />
        {/* Preload hero images for better performance and cross-browser compatibility */}
        <link rel="preload" as="image" href="/images/sareeh_en.png" />
        <link rel="preload" as="image" href="/images/sareeh_ar.png" />
      </head>
      <body className={inter.className}>
        {children}
      </body>
    </html>
  )
}
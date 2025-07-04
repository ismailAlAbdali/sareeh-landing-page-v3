export const sharedMetadata = {
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
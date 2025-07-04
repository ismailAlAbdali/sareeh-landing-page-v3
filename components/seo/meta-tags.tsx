'use client'

import { useI18n } from '../i18n-provider'
import { seoConfig } from '@/lib/seo-config'
import Head from 'next/head'

export default function MetaTags() {
  const { language } = useI18n()
  const config = seoConfig[language as 'en' | 'ar']
  const common = seoConfig.common

  return (
    <Head>
      {/* Basic Meta Tags */}
      <meta name="keywords" content={config.keywords} />
      
      {/* Open Graph */}
      <meta property="og:locale" content={language === 'ar' ? 'ar_OM' : 'en_OM'} />
      <meta property="og:type" content="website" />
      <meta property="og:site_name" content={config.companyName} />
      <meta property="og:image" content={common.images.banner} />
      
      {/* Twitter */}
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:image" content={common.images.banner} />
      
      {/* Geo Tags */}
      <meta name="geo.region" content="OM-MA" />
      <meta name="geo.placename" content={config.address.city} />
      <meta name="geo.position" content={`${common.coordinates.latitude};${common.coordinates.longitude}`} />
      <meta name="ICBM" content={`${common.coordinates.latitude}, ${common.coordinates.longitude}`} />
      
      {/* Canonical URLs */}
      <link 
        rel="canonical" 
        href={`https://sareeh.omancloud.com/${language}`}
      />
      <link 
        rel="alternate" 
        href="https://sareeh.omancloud.com/ar" 
        hrefLang="ar-OM" 
      />
      <link 
        rel="alternate" 
        href="https://sareeh.omancloud.com/en" 
        hrefLang="en-OM" 
      />
    </Head>
  )
} 
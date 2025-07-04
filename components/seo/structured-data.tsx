'use client'

import { useI18n } from '../i18n-provider'
import { seoConfig } from '@/lib/seo-config'

export default function StructuredData() {
  const { language } = useI18n()
  const config = seoConfig[language as 'en' | 'ar']
  const common = seoConfig.common

  const structuredData = [
    // Local Business
    {
      '@context': 'https://schema.org',
      '@type': 'SoftwareApplication',
      'name': config.companyName,
      'image': [
        common.images.logo,
        common.images.banner,
        common.images.office
      ],
      'applicationCategory': 'BusinessApplication',
      'operatingSystem': 'All',
      'offers': {
        '@type': 'Offer',
        'price': '0',
        'priceCurrency': 'OMR'
      },
      'provider': {
        '@type': 'Organization',
        'name': 'Oman Cloud',
        'address': {
          '@type': 'PostalAddress',
          'streetAddress': config.address.street,
          'addressLocality': config.address.city,
          'addressRegion': config.address.region,
          'postalCode': config.address.postalCode,
          'addressCountry': config.address.country
        },
        'geo': {
          '@type': 'GeoCoordinates',
          'latitude': common.coordinates.latitude,
          'longitude': common.coordinates.longitude
        },
        'telephone': process.env.NEXT_PUBLIC_WHATSAPP_NUMBER,
        'openingHours': common.openingHours.map(oh => `${oh.days} ${oh.hours}`).join(', ')
      }
    },
    // Organization
    {
      '@context': 'https://schema.org',
      '@type': 'Organization',
      'name': config.companyName,
      'url': 'https://sareeh.omancloud.com',
      'logo': common.images.logo,
      'sameAs': [
        common.social.facebook,
        common.social.twitter,
        common.social.instagram
      ]
    },
    // BreadcrumbList
    {
      '@context': 'https://schema.org',
      '@type': 'BreadcrumbList',
      'itemListElement': [
        {
          '@type': 'ListItem',
          'position': 1,
          'name': 'Home',
          'item': `https://sareeh.omancloud.com/${language}`
        }
      ]
    }
  ]

  return (
    <>
      {structuredData.map((data, index) => (
        <script
          key={index}
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(data) }}
        />
      ))}
    </>
  )
} 
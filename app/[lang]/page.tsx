import { Metadata } from 'next'
import { i18n } from '@/lib/i18n-config'
import { I18nProvider } from '@/components/i18n-provider'
import Header from '@/components/header'
import Hero from '@/components/hero'
import FeaturesGrid from '@/components/features-grid'
import IndustriesGrid from '@/components/industries-grid'
import { StatisticsGrid } from '@/components/statistics/statistics-grid'
import { PricingSection } from '@/components/pricing/PricingSection'
import DemoForm from '@/components/demo-form'
import { FAQ } from '@/components/faq'
import Location from '@/components/location'
import Footer from '@/components/footer'
import { sharedMetadata } from '@/lib/shared-metadata'

export function generateStaticParams() {
  return i18n.locales.map((locale) => ({ lang: locale }))
}

export async function generateMetadata({ params }: { params: { lang: string } }): Promise<Metadata> {
  return {
    ...sharedMetadata,
    title: params.lang === 'ar' 
      ? 'صريح - نظام نقاط البيع المتكامل في عمان'
      : 'Sareeh POS - Complete Business Management Solution in Oman',
    description: params.lang === 'ar'
      ? 'صريح - الحل الرائد لنقاط البيع في عمان. نظام متكامل لإدارة الأعمال'
      : 'Sareeh POS - The leading POS solution in Oman. Complete business management system',
    alternates: {
      ...sharedMetadata.alternates,
      languages: {
        'en': 'https://sareeh.omancloud.com/en',
        'ar': 'https://sareeh.omancloud.com/ar',
      }
    }
  }
}

export default function Home({
  params: { lang }
}: {
  params: { lang: string }
}) {
  return (
    <>
      <main className="min-h-screen bg-background">
        <Hero />
        <FeaturesGrid />
        <IndustriesGrid />
        <StatisticsGrid />
        <PricingSection />
        <DemoForm />
        <FAQ />
        <Location />
      </main>
      <Footer />
    </>
  )
} 
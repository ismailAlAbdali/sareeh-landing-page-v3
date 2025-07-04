'use client'

import { useI18n } from './i18n-provider'
import { translations } from '@/lib/translations'
import { cn } from '@/lib/utils'
import { usePathname } from 'next/navigation'

export default function NavLinks() {
  const { language } = useI18n()
  const t = translations[language].nav
  const pathname = usePathname()

  const handleScroll = (e: React.MouseEvent<HTMLAnchorElement>, id: string) => {
    e.preventDefault()
    const element = document.getElementById(id)
    if (element) {
      const offset = 80 // Height of fixed header
      const bodyRect = document.body.getBoundingClientRect().top
      const elementRect = element.getBoundingClientRect().top
      const elementPosition = elementRect - bodyRect
      const offsetPosition = elementPosition - offset

      window.scrollTo({
        top: offsetPosition,
        behavior: 'smooth'
      })
    }
  }

  const links = [
    { href: '#features', id: 'features', label: t.features },
    { href: '#industries', id: 'industries', label: t.industries },
    { href: '#pricing', id: 'pricing', label: t.offer },
    { href: '#demo', id: 'demo', label: t.demo },
    { href: '#contact', id: 'contact', label: t.contact },
  ]

  return (
    <>
      {links.map((link) => (
        <a
          key={link.href}
          href={link.href}
          onClick={(e) => handleScroll(e, link.id)}
          className={cn(
            'text-sm font-medium transition-colors hover:text-primary cursor-pointer',
            pathname === `/${language}${link.href}`
              ? 'text-foreground'
              : 'text-foreground/60'
          )}
        >
          {link.label}
        </a>
      ))}
    </>
  )
} 
"use client"

import { useState, useEffect } from "react"
import Image from "next/image"
import { useI18n } from '@/components/i18n-provider'
import { translations } from '@/lib/translations'
 
interface ClientLogo {
  id: string
  imagePath: string
  alt: string
}

const clientLogos: ClientLogo[] = [
  {
    id: "ifitness",
    imagePath: "/clients/IFitness.png",
    alt: "IFitness Logo"
  },
  {
    id: "aldana-makeup",
    imagePath: "/clients/aldana mackup.png",
    alt: "Aldana Makeup Logo"
  },
  {
    id: "awani-store",
    imagePath: "/clients/awani store logo.png",
    alt: "Awani Store Logo"
  },
  {
    id: "aswaq-al-raqeef",
    imagePath: "/clients/Aswaq Al Raqeef Al Arabi.png",
    alt: "Aswaq Al Raqeef Al Arabi Logo"
  },
  {
    id: "quickstop-shop",
    imagePath: "/clients/QuickStop Shop.png",
    alt: "QuickStop Shop Logo"
  },
  {
    id: "nsgamers",
    imagePath: "/clients/NSGamers Logo.png",
    alt: "NSGamers Logo"
  },
  {
    id: "alhaitham-perfumes",
    imagePath: "/clients/AlHaithamForPerfumes.png",
    alt: "AlHaitham For Perfumes Logo"
  },
  {
    id: "mafroshat-bin-shaya",
    imagePath: "/clients/MafroshatBinShaya.png",
    alt: "Mafroshat Bin Shaya Logo"
  },
  {
    id: "quickstore",
    imagePath: "/clients/QuickStore.png",
    alt: "QuickStore Logo"
  },
  {
    id: "sourj-bakery-cafe",
    imagePath: "/clients/Sourj-Bakery-Cafe.png",
    alt: "Sourj Bakery Cafe Logo"
  },
  {
    id: "barari-aleawaja",
    imagePath: "/clients/Barari-AlEawaja-Agriculture-materials.png",
    alt: "Barari AlEawaja Agriculture Materials Logo"
  },
  {
    id: "cam-std-wedding",
    imagePath: "/clients/cam-std-wedding-photograpy.png",
    alt: "CAM STD Wedding Photography Logo"
  }
]

export default function ClientsSection() {
  const { language } = useI18n()
  const t = translations[language].clients
  const [hoveredLogo, setHoveredLogo] = useState<string | null>(null)
  const [visibleLogos, setVisibleLogos] = useState<boolean[]>(new Array(clientLogos.length).fill(false))

  // Animate logos on mount
  useEffect(() => {
    const timer = setTimeout(() => {
      clientLogos.forEach((_, index) => {
        setTimeout(() => {
          setVisibleLogos((prev) => {
            const newVisible = [...prev]
            newVisible[index] = true
            return newVisible
          })
        }, index * 150)
      })
    }, 300)

    return () => clearTimeout(timer)
  }, [])

  const isRTL = language === "ar"

  // SEO structured data for clients
  const structuredData = {
    "@context": "https://schema.org",
    "@type": "Organization",
    "name": language === "ar" ? "صريح - نظام نقاط البيع" : "Sareeh POS System",
    "description": t.subtitle,
    "clients": clientLogos.map(logo => ({
      "@type": "Organization",
      "name": t.companies[logo.id as keyof typeof t.companies],
      "identifier": logo.id
    }))
  }

  return (
    <>
      {/* SEO JSON-LD structured data */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
      />
      
      <section 
        id="clients" 
        className="py-20 px-4 bg-background text-foreground font-tajawal" 
        dir={isRTL ? "rtl" : "ltr"}
        role="region"
        aria-labelledby="clients-heading"
      >
        <div className="container mx-auto max-w-5xl">
          {/* Content */}
          <div className="text-center mb-12">
            {/* Heading */}
            <h2 
              id="clients-heading"
              className="text-3xl md:text-4xl font-bold mb-4 text-foreground animate-in slide-in-from-top duration-700"
            >
              {t.title}
            </h2>

            {/* Description */}
            <p className="text-base md:text-lg text-muted-foreground animate-in slide-in-from-top duration-700 delay-200">
              {t.subtitle}
            </p>
          </div>

        {/* Logos Grid - 3 columns, 4 rows for 12 clients */}
        <div className="grid gap-8 grid-cols-3 max-w-5xl mx-auto">
          {clientLogos.map((logo, index) => (
            <div
              key={logo.id}
              className={`
                relative group transition-all duration-500 ease-out
                ${visibleLogos[index] ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"}
              `}
              style={{ transitionDelay: `${index * 100}ms` }}
              onMouseEnter={() => setHoveredLogo(logo.id)}
              onMouseLeave={() => setHoveredLogo(null)}
            >
                                                          {/* Logo Container */}
              <div className="relative p-10 rounded-lg bg-white border border-gray-200 transition-all duration-300 ease-in-out cursor-pointer hover:scale-105 hover:shadow-lg hover:border-primary/30 group-hover:bg-white/90">
                {/* Client Logo */}
                <div
                  className={`
                    w-full h-32 transition-all duration-300 flex items-center justify-center relative
                    ${hoveredLogo === logo.id ? "" : "grayscale opacity-70"}
                    group-hover:scale-110
                  `}
                >
                  <Image
                    src={logo.imagePath}
                    alt={logo.alt}
                    width={240}
                    height={128}
                    className="object-contain w-full h-full"
                    loading="lazy"
                  />
                </div>

                {/* Hover Overlay */}
                <div
                  className={`
                  absolute inset-0 rounded-lg bg-gradient-to-r from-primary/5 to-primary/10 
                  opacity-0 group-hover:opacity-100 transition-opacity duration-300
                `}
                />

                                                  {/* Tooltip */}
                 {hoveredLogo === logo.id && (
                   <div className="absolute -top-10 left-1/2 transform -translate-x-1/2 px-3 py-1 bg-popover text-popover-foreground text-sm font-medium whitespace-nowrap rounded-md shadow-lg border border-gray-300 z-10 animate-in fade-in slide-in-from-bottom-2 duration-200">
                     {t.companies[logo.id as keyof typeof t.companies]}
                     <div className="absolute top-full left-1/2 transform -translate-x-1/2 border-4 border-transparent border-t-popover" />
                   </div>
                 )}
              </div>

                             {/* Animated Border */}
               <div className="absolute inset-0 rounded-lg border-2 border-primary/30 opacity-0 group-hover:opacity-100 transition-opacity duration-300 animate-pulse" />
            </div>
          ))}
        </div>

        {/* Dynamic Background Elements */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <div className="absolute top-1/4 left-1/4 w-32 h-32 bg-primary/5 rounded-full blur-3xl animate-pulse" />
          <div className="absolute bottom-1/4 right-1/4 w-24 h-24 bg-accent/5 rounded-full blur-2xl animate-pulse delay-1000" />
        </div>
      </div>

      {/* Custom Styles */}
      <style jsx global>{`
        @import url('https://fonts.googleapis.com/css2?family=Tajawal:wght@400;500;700&display=swap');
        
        .font-tajawal {
          font-family: 'Tajawal', sans-serif;
        }
        
        /* Enhanced animations */
        @keyframes float {
          0%, 100% { transform: translateY(0px); }
          50% { transform: translateY(-10px); }
        }
        
        .group:hover .animate-float {
          animation: float 2s ease-in-out infinite;
        }
        
        /* Staggered animation for grid items */
        .grid > div:nth-child(odd) {
          animation-delay: 0.1s;
        }
        
        .grid > div:nth-child(even) {
          animation-delay: 0.2s;
        }
        
        /* RTL-specific adjustments */
        [dir="rtl"] {
          text-align: right;
        }
        
        [dir="rtl"] .text-center {
          text-align: center;
        }
        
        /* Accessibility improvements */
        @media (prefers-reduced-motion: reduce) {
          * {
            animation-duration: 0.01ms !important;
            animation-iteration-count: 1 !important;
            transition-duration: 0.01ms !important;
          }
        }
        
        /* Focus styles for keyboard navigation */
        .group:focus-within {
          outline: 2px solid hsl(var(--primary));
          outline-offset: 2px;
          border-radius: 8px;
        }
      `}</style>
      </section>
    </>
  )
} 
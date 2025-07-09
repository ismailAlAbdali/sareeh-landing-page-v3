"use client"

import { useState, useEffect, useRef } from "react"
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
  const [touchedLogo, setTouchedLogo] = useState<string | null>(null)
  const [scrollTriggered, setScrollTriggered] = useState(false)
  
  const sectionRef = useRef<HTMLElement>(null)
  const logoRefs = useRef<(HTMLDivElement | null)[]>([])

  // Intersection Observer for scroll-triggered animations
  useEffect(() => {
    const observerOptions = {
      threshold: 0.1,
      rootMargin: '-50px 0px -50px 0px'
    }

    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting && !scrollTriggered) {
          setScrollTriggered(true)
          
          // Staggered animation for logos
          clientLogos.forEach((_, index) => {
            setTimeout(() => {
              setVisibleLogos((prev) => {
                const newVisible = [...prev]
                newVisible[index] = true
                return newVisible
              })
            }, index * 100) // Faster stagger for mobile
          })
        }
      })
    }, observerOptions)

    if (sectionRef.current) {
      observer.observe(sectionRef.current)
    }

    return () => observer.disconnect()
  }, [scrollTriggered])

  // Individual logo intersection observer for enhanced scroll effects
  useEffect(() => {
    const logoObserver = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        const index = parseInt(entry.target.getAttribute('data-index') || '0')
        if (entry.isIntersecting) {
          setTimeout(() => {
            setVisibleLogos((prev) => {
              const newVisible = [...prev]
              newVisible[index] = true
              return newVisible
            })
          }, 100)
        }
      })
    }, {
      threshold: 0.3,
      rootMargin: '0px 0px -100px 0px'
    })

    logoRefs.current.forEach((ref) => {
      if (ref) logoObserver.observe(ref)
    })

    return () => logoObserver.disconnect()
  }, [])

  const isRTL = language === "ar"

  // Touch handlers for mobile interaction
  const handleTouchStart = (logoId: string) => {
    setTouchedLogo(logoId)
    // Haptic feedback for supported devices
    if ('vibrate' in navigator) {
      navigator.vibrate(50)
    }
  }

  const handleTouchEnd = () => {
    setTimeout(() => setTouchedLogo(null), 150)
  }

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
        ref={sectionRef}
        id="clients" 
        className="py-12 sm:py-16 lg:py-20 px-4 bg-background text-foreground font-tajawal overflow-hidden" 
        dir={isRTL ? "rtl" : "ltr"}
        role="region"
        aria-labelledby="clients-heading"
      >
        <div className="container mx-auto max-w-7xl">
          {/* Content */}
          <div className="text-center mb-8 sm:mb-12">
            {/* Heading */}
            <h2 
              id="clients-heading"
              className={`text-2xl sm:text-3xl lg:text-4xl font-bold mb-4 text-foreground transition-all duration-1000 ${
                scrollTriggered ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
              }`}
            >
              {t.title}
            </h2>

            {/* Description */}
            <p className={`text-sm sm:text-base lg:text-lg text-muted-foreground transition-all duration-1000 delay-300 ${
              scrollTriggered ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
            }`}>
              {t.subtitle}
            </p>
          </div>

        {/* Responsive Logos Grid */}
        <div className="grid gap-3 sm:gap-4 lg:gap-6 xl:gap-8 grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-4 max-w-6xl mx-auto">
          {clientLogos.map((logo, index) => (
            <div
              key={logo.id}
              ref={(el) => { logoRefs.current[index] = el }}
              data-index={index}
              className={`
                relative group transition-all duration-700 ease-out transform-gpu
                ${visibleLogos[index] 
                  ? "opacity-100 translate-y-0 scale-100" 
                  : "opacity-0 translate-y-12 scale-95"
                }
                ${touchedLogo === logo.id ? "scale-95" : ""}
              `}
              style={{ 
                transitionDelay: `${index * 50}ms`,
                willChange: 'transform, opacity'
              }}
              onMouseEnter={() => setHoveredLogo(logo.id)}
              onMouseLeave={() => setHoveredLogo(null)}
              onTouchStart={() => handleTouchStart(logo.id)}
              onTouchEnd={handleTouchEnd}
            >
              {/* Logo Container */}
              <div className={`
                relative p-3 sm:p-4 lg:p-6 xl:p-8 rounded-xl bg-white border border-gray-200/80 
                transition-all duration-300 ease-out cursor-pointer 
                shadow-sm hover:shadow-lg active:shadow-md
                backdrop-blur-sm bg-white/95
                ${touchedLogo === logo.id 
                  ? "scale-95 shadow-md border-primary/40 bg-primary/5" 
                  : "hover:scale-105 hover:border-primary/30 hover:bg-white/90"
                }
              `}>
                {/* Client Logo */}
                <div
                  className={`
                    w-full h-16 sm:h-20 lg:h-24 xl:h-28 transition-all duration-500 flex items-center justify-center relative
                    ${hoveredLogo === logo.id || touchedLogo === logo.id 
                      ? "grayscale-0 opacity-100 scale-110" 
                      : "grayscale opacity-75 scale-100"
                    }
                  `}
                >
                  <Image
                    src={logo.imagePath}
                    alt={logo.alt}
                    width={240}
                    height={128}
                    className="object-contain w-full h-full transition-all duration-300"
                    loading="lazy"
                    sizes="(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 25vw"
                  />
                </div>

                {/* Hover/Touch Overlay */}
                <div
                  className={`
                  absolute inset-0 rounded-xl bg-gradient-to-br from-primary/5 via-primary/3 to-primary/10 
                  transition-opacity duration-300
                  ${hoveredLogo === logo.id || touchedLogo === logo.id ? "opacity-100" : "opacity-0"}
                `}
                />

                {/* Mobile-friendly tooltip */}
                {(hoveredLogo === logo.id || touchedLogo === logo.id) && (
                  <div className="absolute -top-8 sm:-top-10 left-1/2 transform -translate-x-1/2 px-2 sm:px-3 py-1 bg-gray-900 text-white text-xs sm:text-sm font-medium whitespace-nowrap rounded-lg shadow-lg z-20 animate-in fade-in slide-in-from-bottom-2 duration-200">
                    {t.companies[logo.id as keyof typeof t.companies]}
                    <div className="absolute top-full left-1/2 transform -translate-x-1/2 border-4 border-transparent border-t-gray-900" />
                  </div>
                )}

                {/* Touch feedback indicator */}
                {touchedLogo === logo.id && (
                  <div className="absolute inset-0 rounded-xl border-2 border-primary/50 animate-pulse" />
                )}
              </div>

              {/* Animated Border for scroll effect */}
              <div className={`
                absolute inset-0 rounded-xl border-2 border-primary/30 transition-all duration-500
                ${visibleLogos[index] ? "opacity-0" : "opacity-100 animate-pulse"}
              `} />
            </div>
          ))}
        </div>

        {/* Enhanced Background Elements */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <div className={`absolute top-1/4 left-1/4 w-32 h-32 bg-primary/5 rounded-full blur-3xl transition-all duration-1000 ${
            scrollTriggered ? 'opacity-100 animate-pulse' : 'opacity-0'
          }`} />
          <div className={`absolute bottom-1/4 right-1/4 w-24 h-24 bg-accent/5 rounded-full blur-2xl transition-all duration-1000 delay-500 ${
            scrollTriggered ? 'opacity-100 animate-pulse' : 'opacity-0'
          }`} />
        </div>
      </div>

      {/* Enhanced Mobile-First Styles */}
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
        
        @keyframes slideInUp {
          from { 
            opacity: 0; 
            transform: translateY(30px) scale(0.95); 
          }
          to { 
            opacity: 1; 
            transform: translateY(0) scale(1); 
          }
        }
        
        /* Mobile touch optimizations */
        @media (hover: none) and (pointer: coarse) {
          .group:hover {
            transform: none;
          }
          
          .group:active {
            transform: scale(0.98);
            transition-duration: 0.1s;
          }
        }
        
        /* Staggered animation for grid items */
        .grid > div:nth-child(4n+1) {
          animation-delay: 0ms;
        }
        
        .grid > div:nth-child(4n+2) {
          animation-delay: 50ms;
        }
        
        .grid > div:nth-child(4n+3) {
          animation-delay: 100ms;
        }
        
        .grid > div:nth-child(4n+4) {
          animation-delay: 150ms;
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
          
          .group {
            transform: none !important;
          }
        }
        
        /* Focus styles for keyboard navigation */
        .group:focus-within {
          outline: 2px solid hsl(var(--primary));
          outline-offset: 2px;
          border-radius: 12px;
        }
        
        /* Mobile-specific improvements */
        @media (max-width: 640px) {
          .grid {
            gap: 0.75rem;
          }
          
          /* Touch-friendly sizing */
          .group {
            min-height: 80px;
          }
          
          /* Smoother animations on mobile */
          .transition-all {
            transition-timing-function: cubic-bezier(0.4, 0, 0.2, 1);
          }
        }
        
        @media (max-width: 480px) {
          .grid {
            gap: 0.5rem;
          }
          
          /* Ensure sufficient touch targets */
          .group {
            min-height: 72px;
          }
        }
        
        /* Performance optimizations */
        .transform-gpu {
          transform: translateZ(0);
          backface-visibility: hidden;
          perspective: 1000px;
        }
        
        /* Smooth scroll behavior */
        html {
          scroll-behavior: smooth;
        }
      `}</style>
      </section>
    </>
  )
} 
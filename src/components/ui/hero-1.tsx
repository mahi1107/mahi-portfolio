'use client'

import { useState } from 'react'
import { Dialog, DialogContent } from '@/components/ui/dialog'
import { Menu, X } from 'lucide-react'

interface NavigationItem {
  name: string
  href: string
}

interface AnnouncementBanner {
  text: string
  linkText: string
  linkHref: string
}

interface CallToAction {
  text: string
  href: string
  variant: 'primary' | 'secondary'
}

interface HeroLandingProps {
  // Logo and branding
  logo?: {
    src: string
    alt: string
    companyName: string
  }
  
  // Navigation
  navigation?: NavigationItem[]
  loginText?: string
  loginHref?: string
  
  // Hero content
  title: string
  description: string
  announcementBanner?: AnnouncementBanner
  callToActions?: CallToAction[]
  
  // Styling options
  titleSize?: 'small' | 'medium' | 'large'
  gradientColors?: {
    from: string
    to: string
  }
  
  // Additional customization
  className?: string
}

const defaultProps: Partial<HeroLandingProps> = {
  logo: {
    src: "https://tailwindcss.com/plus-assets/img/logos/mark.svg?color=indigo&shade=600",
    alt: "Company Logo",
    companyName: "Your Company"
  },
  navigation: [
    { name: 'Product', href: '#' },
    { name: 'Features', href: '#' },
    { name: 'Marketplace', href: '#' },
    { name: 'Company', href: '#' },
  ],
  loginText: "Log in",
  loginHref: "#",
  titleSize: "large",
  gradientColors: {
    from: "oklch(0.646 0.222 41.116)",
    to: "oklch(0.488 0.243 264.376)"
  },
  callToActions: [
    { text: "Get started", href: "#", variant: "primary" },
    { text: "Learn more", href: "#", variant: "secondary" }
  ]
}

export function HeroLanding(props: HeroLandingProps) {
  const {
    logo,
    navigation,
    loginText,
    loginHref,
    title,
    description,
    announcementBanner,
    callToActions,
    titleSize,
    gradientColors,
    className
  } = { ...defaultProps, ...props }

  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)

  const getTitleSizeClasses = () => {
    switch (titleSize) {
      case 'small':
        return 'text-2xl sm:text-3xl md:text-5xl'
      case 'medium':
        return 'text-2xl sm:text-4xl md:text-6xl'
      case 'large':
      default:
        return 'text-3xl sm:text-5xl md:text-7xl'
    }
  }

  const renderCallToAction = (cta: CallToAction, index: number) => {
    if (cta.variant === 'primary') {
      return (
        <a
          key={index}
          href={cta.href}
          className="rounded-lg bg-accent px-4 py-2 text-xs sm:text-sm font-semibold text-black shadow-sm hover:bg-accent-hover transition-colors"
        >
          {cta.text}
        </a>
      )
    } else {
      return (
        <a
          key={index}
          href={cta.href}
          className="text-xs sm:text-sm/6 font-semibold text-white hover:text-accent transition-colors"
        >
          {cta.text} <span aria-hidden="true">→</span>
        </a>
      )
    }
  }

  return (
    <div className={`min-h-screen w-screen overflow-x-hidden relative ${className || ''}`}>
      {/* Top gradient background */}
      <div
        aria-hidden="true"
        className="absolute inset-x-0 -top-40 -z-10 transform-gpu overflow-hidden blur-3xl sm:-top-80 min-h-screen"
      >
        <div
          style={{
            clipPath:
              'polygon(74.1% 44.1%, 100% 61.6%, 97.5% 26.9%, 85.5% 0.1%, 80.7% 2%, 72.5% 32.5%, 60.2% 62.4%, 52.4% 68.1%, 47.5% 58.3%, 45.2% 34.5%, 27.5% 76.7%, 0.1% 64.9%, 17.9% 100%, 27.6% 76.8%, 76.1% 97.7%, 74.1% 44.1%)',
            background: `linear-gradient(to top right, ${gradientColors?.from}, ${gradientColors?.to})`
          }}
          className="relative left-[calc(50%-11rem)] aspect-[1155/678] w-[36.125rem] max-w-none -translate-x-1/2 rotate-[30deg] opacity-30 sm:left-[calc(50%-30rem)] sm:w-[72.1875rem] min-h-screen"
        />
      </div>
      
      {/* Bottom gradient background */}
      <div
        aria-hidden="true"
        className="absolute inset-x-0 top-[calc(100%-13rem)] -z-10 transform-gpu overflow-hidden blur-3xl sm:top-[calc(100%-30rem)] min-h-screen"
      >
        <div
          style={{
            clipPath:
              'polygon(74.1% 44.1%, 100% 61.6%, 97.5% 26.9%, 85.5% 0.1%, 80.7% 2%, 72.5% 32.5%, 60.2% 62.4%, 52.4% 68.1%, 47.5% 58.3%, 45.2% 34.5%, 27.5% 76.7%, 0.1% 64.9%, 17.9% 100%, 27.6% 76.8%, 76.1% 97.7%, 74.1% 44.1%)',
            background: `linear-gradient(to top right, ${gradientColors?.from}, ${gradientColors?.to})`
          }}
          className="relative left-[calc(50%+3rem)] aspect-[1155/678] w-[36.125rem] max-w-none -translate-x-1/2 opacity-30 sm:left-[calc(50%+36rem)] sm:w-[72.1875rem] min-h-screen"
        />
      </div>

      {/* Modern Centered Floating Modular Pill Header */}
      <header className="fixed top-4 inset-x-0 z-50 flex justify-center px-4">
        <nav aria-label="Global" className="w-full max-w-4xl bg-black/60 backdrop-blur-md border border-white/10 rounded-full flex items-center justify-between px-6 py-2.5 shadow-lg shadow-black/20 select-none">
          <div className="flex lg:flex-1">
            <a href="#" className="-m-1.5 p-1.5 flex items-center gap-2">
              <span className="sr-only">{logo?.companyName}</span>
              <img
                alt={logo?.alt}
                src={logo?.src}
                className="h-6 sm:h-7 w-auto"
              />
            </a>
          </div>
          <div className="flex lg:hidden">
            <button
              type="button; button"
              onClick={() => setMobileMenuOpen(true)}
              className="-m-2 rounded-full p-2 text-neutral-400 hover:text-white transition-colors cursor-pointer"
            >
              <span className="sr-only">Open main menu</span>
              <Menu aria-hidden="true" className="size-5" />
            </button>
          </div>
          {navigation && navigation.length > 0 && (
            <div className="hidden lg:flex lg:gap-x-8 xl:gap-x-12">
              {navigation.map((item) => (
                <a key={item.name} href={item.href} className="text-[10px] font-bold text-neutral-400 hover:text-accent transition-colors uppercase tracking-widest font-sans">
                  {item.name}
                </a>
              ))}
            </div>
          )}
          {loginText && loginHref && (
            <div className="hidden lg:flex lg:flex-1 lg:justify-end">
              <a href={loginHref} className="text-[10px] font-bold text-neutral-300 hover:text-accent transition-colors uppercase tracking-widest font-sans">
                {loginText} <span aria-hidden="true">&rarr;</span>
              </a>
            </div>
          )}
        </nav>
        <Dialog open={mobileMenuOpen} onOpenChange={setMobileMenuOpen}>
          <DialogContent className="fixed inset-y-0 right-0 z-50 w-full overflow-y-auto bg-[#080808]/95 backdrop-blur-md px-6 py-6 sm:max-w-sm border-l border-white/5 lg:hidden">
            <div className="flex items-center justify-between">
              <a href="#" className="-m-1.5 p-1.5 flex items-center">
                <span className="sr-only">{logo?.companyName}</span>
                <img
                  alt={logo?.alt}
                  src={logo?.src}
                  className="h-6 sm:h-7 w-auto"
                />
              </a>
              <button
                type="button"
                onClick={() => setMobileMenuOpen(false)}
                className="-m-2 rounded-full p-2 text-neutral-400 hover:text-white transition-colors cursor-pointer"
              >
                <span className="sr-only">Close menu</span>
                <X aria-hidden="true" className="size-5" />
              </button>
            </div>
            <div className="mt-8 flow-root">
              <div className="-my-6 divide-y divide-white/5">
                {navigation && navigation.length > 0 && (
                  <div className="space-y-3 py-6">
                    {navigation.map((item) => (
                      <a
                        key={item.name}
                        href={item.href}
                        onClick={() => setMobileMenuOpen(false)}
                        className="-mx-3 block rounded-xl px-4 py-2.5 text-sm font-semibold text-neutral-300 hover:bg-white/5 hover:text-accent transition-colors font-sans"
                      >
                        {item.name}
                      </a>
                    ))}
                  </div>
                )}
                {loginText && loginHref && (
                  <div className="py-6">
                    <a
                      href={loginHref}
                      onClick={() => setMobileMenuOpen(false)}
                      className="-mx-3 block rounded-xl px-4 py-2.5 text-sm font-semibold text-neutral-300 hover:bg-white/5 hover:text-accent transition-colors font-sans"
                    >
                      {loginText}
                    </a>
                  </div>
                )}
              </div>
            </div>
          </DialogContent>
        </Dialog>
      </header>

      <div className="relative isolate px-6 pt-4 overflow-hidden min-h-screen flex flex-col justify-center">        
        <div className="mx-auto max-w-4xl pt-20 sm:pt-25">
          {/* Announcement banner */}
          {announcementBanner && (
            <div className="hidden sm:mb-6 sm:flex sm:justify-center">
              <div className="relative rounded-full px-3 py-1.5 text-xs text-neutral-400 border border-white/5 bg-[#111111]/80 hover:border-accent/30 transition-all select-none">
                {announcementBanner.text}{' '}
                <a href={announcementBanner.linkHref} className="font-bold text-accent hover:text-accent-hover transition-colors ml-1 inline-flex items-center gap-0.5">
                  <span aria-hidden="true" className="absolute inset-0" />
                  {announcementBanner.linkText} <span aria-hidden="true">&rarr;</span>
                </a>
              </div>
            </div>
          )}
          
          <div className="text-center select-none">
            <h1 className={`${getTitleSizeClasses()} font-extrabold tracking-tight text-balance text-white leading-tight font-display uppercase`}>
              {title}
            </h1>
            <p className="mt-6 text-sm sm:text-base md:text-lg leading-relaxed font-light text-neutral-400 font-sans max-w-2xl mx-auto">
              {description}
            </p>
            
            {/* Call to action buttons */}
            {callToActions && callToActions.length > 0 && (
              <div className="mt-8 sm:mt-10 flex items-center justify-center gap-x-6">
                {callToActions.map((cta, index) => renderCallToAction(cta, index))}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}

// Export types for consumers
export type { HeroLandingProps, NavigationItem, AnnouncementBanner, CallToAction }

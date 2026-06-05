import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { Menu, X, FileText } from 'lucide-react';
import { portfolioData } from '../../data/portfolioData';

interface NavItem {
  name: string;
  path: string;
}

const navItems: NavItem[] = [
  { name: 'ABOUT', path: '/' },
  { name: 'SKILLS', path: '/skills' },
  { name: 'PROJECTS', path: '/projects' },
  { name: 'ACHIEVEMENTS', path: '/achievements' },
  { name: 'CERTIFICATES', path: '/certificates' },
  { name: 'JOURNEY', path: '/journey' },
  { name: 'CONTACT', path: '/contact' }
];

interface FloatingNavbarProps {
  brandIdentity?: any;
  globalExperience?: any;
}

export default function FloatingNavbar({ brandIdentity, globalExperience }: FloatingNavbarProps) {
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const location = useLocation();

  const navConfig = {
    brandName: globalExperience?.header?.brandName || brandIdentity?.navbar?.brandName || portfolioData.name,
    statusDotColor: globalExperience?.theme?.primaryAccent || brandIdentity?.navbar?.statusDotColor || "#f97316",
    resumeButtonText: globalExperience?.header?.resumeButton?.text || brandIdentity?.navbar?.resumeButtonText || "Resume",
    resumeUrl: globalExperience?.header?.resumeButton?.url || brandIdentity?.navbar?.resumeUrl || "/Mahi%20Singh%20Resume.pdf"
  };

  const msNavItems = globalExperience?.header?.navItems
    ? globalExperience.header.navItems.filter((n: any) => n.enabled).map((n: any) => ({ name: n.label, path: n.route }))
    : navItems;

  const nameValue = navConfig.brandName;
  const dotColor = navConfig.statusDotColor;
  const resumeText = navConfig.resumeButtonText;
  const resumeHref = navConfig.resumeUrl;

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 20) {
        setScrolled(true);
      } else {
        setScrolled(false);
      }
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Close mobile menu on path changes
  useEffect(() => {
    setMobileMenuOpen(false);
  }, [location.pathname]);

  return (
    <>
      <header className="fixed top-0 inset-x-0 z-50 flex justify-center px-6 py-4 pointer-events-none">
        <motion.nav
          initial={{ y: -20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
          className={`pointer-events-auto flex items-center justify-between gap-6 md:gap-10 w-fit max-w-[1250px] rounded-full border transition-all duration-300 font-sans ${scrolled
              ? 'px-4 py-1.5 bg-neutral-900/90 border-white/15 shadow-xl shadow-black/40 backdrop-blur-md scale-[0.99]'
              : 'px-5 py-2.5 bg-neutral-950/60 border-white/10 shadow-lg backdrop-blur-md'
            }`}
        >
          {/* Logo Dot & Name */}
          <Link
            to="/"
            className="flex items-center gap-2 group cursor-pointer select-none"
          >
            <span
              className="w-2 h-2 rounded-full group-hover:scale-125 transition-transform"
              style={{ backgroundColor: dotColor }}
            />
            <span className="font-extrabold tracking-widest text-white uppercase text-[11px] font-display">
              {nameValue}
            </span>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden lg:flex items-center gap-1.5">
            {msNavItems.map((item) => {
              const isActive =
                item.path === '/'
                  ? location.pathname === '/'
                  : location.pathname.startsWith(item.path);

              return (
                <Link
                  key={item.name}
                  to={item.path}
                  className={`relative px-3 py-1.5 text-xs font-bold tracking-widest uppercase transition-colors rounded-full duration-200 select-none ${isActive ? 'text-white' : 'text-neutral-400 hover:text-neutral-200'
                    }`}
                >
                  <span className="relative z-10">{item.name}</span>
                  {isActive && (
                    <motion.div
                      layoutId="active-nav-pill"
                      className="absolute inset-0 z-0 rounded-full bg-white/[0.08] border border-white/15 shadow-[inset_0_1px_1px_rgba(255,255,255,0.05)]"
                      transition={{ type: 'spring', stiffness: 380, damping: 30 }}
                    />
                  )}
                </Link>
              );
            })}
          </div>

          {/* Resume Link Button */}
          <div className="hidden lg:flex items-center">
            <a
              href={resumeHref}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-4.5 py-2 rounded-full bg-orange-500/10 border border-orange-500/20 hover:bg-orange-500/20 text-orange-400 hover:text-orange-300 font-bold text-[11px] tracking-widest uppercase transition-colors"
              style={{
                color: dotColor,
                borderColor: `${dotColor}33`,
              }}
            >
              <FileText className="w-3.5 h-3.5" />
              {resumeText}
            </a>
          </div>

          {/* Mobile Menu Toggle Button */}
          <div className="flex lg:hidden">
            <button
              onClick={() => setMobileMenuOpen(true)}
              className="p-1.5 rounded-full text-neutral-400 hover:text-white transition-colors cursor-pointer"
            >
              <Menu className="w-6 h-6" />
            </button>
          </div>
        </motion.nav>
      </header>

      {/* Mobile Drawer Overlay */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <>
            {/* Backdrop click closer */}
            <motion.div
              key="mobile-nav-backdrop"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setMobileMenuOpen(false)}
              className="fixed inset-0 bg-black/60 backdrop-blur-sm z-[9998] lg:hidden"
            />

            {/* Full-screen slide-down drawer container */}
            <motion.div
              key="mobile-nav-drawer"
              initial={{ y: '-100%', opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              exit={{ y: '-100%', opacity: 0 }}
              transition={{
                type: 'spring',
                stiffness: 260,
                damping: 28,
                mass: 0.8
              }}
              className="fixed inset-0 w-full h-screen bg-[#0c0c0c]/98 backdrop-blur-xl px-8 py-10 flex flex-col justify-between z-[9999] overflow-y-auto lg:hidden font-sans"
            >
              {/* Header inside drawer */}
              <div className="flex justify-between items-center shrink-0">
                <div className="flex items-center gap-2">
                  <span className="w-2 h-2 rounded-full" style={{ backgroundColor: dotColor }} />
                  <span className="font-extrabold tracking-widest text-white uppercase text-[10px] font-display">
                    {nameValue}
                  </span>
                </div>
                <button
                  onClick={() => setMobileMenuOpen(false)}
                  className="p-2 rounded-full text-neutral-400 hover:text-white transition-colors cursor-pointer bg-white/5 border border-white/10"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              {/* Centered Large List of Navigation routes */}
              <div className="flex flex-col items-center justify-center gap-6 my-auto pt-10 pb-8">
                {msNavItems.map((item) => {
                  const isActive =
                    item.path === '/'
                      ? location.pathname === '/'
                      : location.pathname.startsWith(item.path);

                  return (
                    <Link
                      key={item.name}
                      to={item.path}
                      onClick={() => setMobileMenuOpen(false)}
                      className={`px-6 py-2 text-base font-extrabold tracking-[0.25em] uppercase rounded-xl transition-all ${isActive
                          ? 'text-white drop-shadow-[0_0_12px_rgba(251,146,60,0.5)]'
                          : 'text-neutral-400 hover:text-neutral-200'
                        }`}
                      style={isActive ? { color: dotColor } : undefined}
                    >
                      {item.name}
                    </Link>
                  );
                })}
              </div>

              {/* Sidebar bottom Resume centered */}
              <div className="shrink-0 pt-4">
                <a
                  href={resumeHref}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full max-w-[240px] mx-auto flex items-center justify-center gap-2 py-3.5 rounded-full text-black font-extrabold text-[11px] tracking-widest uppercase transition-all shadow-lg hover:brightness-110 active:scale-[0.98]"
                  style={{ backgroundColor: dotColor }}
                >
                  <FileText className="w-4 h-4" />
                  {resumeText}
                </a>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  );
}

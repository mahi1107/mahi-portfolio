import React, { useRef, useEffect, useState } from 'react';
import { Outlet, useLocation } from 'react-router-dom';
import { AnimatePresence, motion } from 'framer-motion';
import axios from 'axios';
import { io } from 'socket.io-client';
import FloatingNavbar from './FloatingNavbar';
import { Component as RadialGlowBackground } from '../ui/radial-glow-background';
import { portfolioData } from '../../data/portfolioData';

export default function Layout() {
  const location = useLocation();
  const videoRef = useRef<HTMLVideoElement>(null);
  const [brandIdentity, setBrandIdentity] = useState<any>(null);
  const [globalExperience, setGlobalExperience] = useState<any>(null);

  useEffect(() => {
    const fetchBrand = async () => {
      try {
        const res = await axios.get(`${import.meta.env.VITE_API_BASE_URL || 'http://localhost:5000'}/api/ms/brand-identity`);
        if (res.data && res.data.data && res.data.data.brandIdentity) {
          setBrandIdentity(res.data.data.brandIdentity);
        }
      } catch (err) {
        console.error("Failed to load brand identity:", err);
      }
    };

    const fetchGlobalExperience = async () => {
      try {
        const res = await axios.get(`${import.meta.env.VITE_API_BASE_URL || 'http://localhost:5000'}/api/ms/global-experience`);
        if (res.data && res.data.data && res.data.data.globalExperience) {
          setGlobalExperience(res.data.data.globalExperience);
        }
      } catch (err) {
        console.error("Failed to load global experience:", err);
      }
    };

    fetchBrand();
    fetchGlobalExperience();

    // Socket.io room join
    const socket = io(import.meta.env.VITE_API_BASE_URL || 'http://localhost:5000');
    socket.emit('portfolio:join', 'mahi');
    
    socket.on('brand_identity_ms:updated', (payload: any) => {
      if (payload.brandIdentity) {
        console.log("⚡ Received live brand identity update:", payload.brandIdentity);
        setBrandIdentity(payload.brandIdentity);
      }
    });

    socket.on('global_experience_ms:updated', (payload: any) => {
      if (payload.globalExperience) {
        console.log("⚡ Received live global experience update:", payload.globalExperience);
        setGlobalExperience(payload.globalExperience);
      }
    });

    return () => {
      socket.disconnect();
    };
  }, []);

  useEffect(() => {
    if (videoRef.current) {
      videoRef.current.muted = true;
      videoRef.current.loop = true;
      videoRef.current.play().catch(err => {
        console.warn("Auto-play was prevented by the browser:", err);
      });
    }
  }, [brandIdentity]);

  const visuals = {
    primaryAccent: globalExperience?.theme?.primaryAccent || brandIdentity?.visualSettings?.primaryAccent || "#f97316",
    secondaryAccent: globalExperience?.theme?.secondaryAccent || brandIdentity?.visualSettings?.secondaryAccent || "#fb923c",
    glowColor: globalExperience?.theme?.gradientOverlay || brandIdentity?.visualSettings?.glowColor || "rgba(251, 146, 60, 0.15)",
    cardGlassOpacity: (globalExperience?.header?.visuals?.headerGlassOpacity !== undefined) ? globalExperience.header.visuals.headerGlassOpacity / 100 : (brandIdentity?.visualSettings?.cardGlassOpacity || 0.1)
  };

  const bgMedia = {
    heroBackgroundImage: brandIdentity?.backgroundMedia?.heroBackgroundImage || "/mahi.mp4",
    overlayStrength: globalExperience?.theme?.cinematicDarkness !== undefined ? globalExperience.theme.cinematicDarkness / 100 : (brandIdentity?.backgroundMedia?.overlayStrength || 0.28),
    blurIntensity: brandIdentity?.backgroundMedia?.blurIntensity || 0,
    darkGradientOpacity: brandIdentity?.backgroundMedia?.darkGradientOpacity || 0.12
  };

  const nameValue = globalExperience?.header?.brandName || brandIdentity?.navbar?.brandName || portfolioData.name;

  const backgroundIsVideo = bgMedia.heroBackgroundImage ? bgMedia.heroBackgroundImage.toLowerCase().endsWith('.mp4') : true;

  return (
    <div className="min-h-screen w-full relative">
      <style>{`
        :root {
          --primary: ${visuals.primaryAccent} !important;
          --secondary: ${visuals.secondaryAccent} !important;
          --glow-color: ${visuals.glowColor} !important;
          --section-gap: ${globalExperience?.layout?.sectionGap !== undefined ? globalExperience.layout.sectionGap : 48}px !important;
          --max-width: ${globalExperience?.layout?.maxWidth !== undefined ? globalExperience.layout.maxWidth : 1280}px !important;
          --animation-speed: ${globalExperience?.layout?.animationSpeed !== undefined ? globalExperience.layout.animationSpeed : 0.8}s !important;
        }
      `}</style>

      {/* ── Global full-page background ── */}
      <div className="fixed inset-0 w-full h-full z-0 pointer-events-none select-none overflow-hidden">
        {backgroundIsVideo ? (
          <video
            ref={videoRef}
            key={bgMedia.heroBackgroundImage}
            className="w-full h-full object-cover"
            autoPlay
            loop
            muted
            playsInline
            style={{ 
              opacity: 1 - bgMedia.overlayStrength,
              filter: bgMedia.blurIntensity ? `blur(${bgMedia.blurIntensity}px)` : 'none'
            }}
          >
            <source src={bgMedia.heroBackgroundImage} type="video/mp4" />
          </video>
        ) : (
          <img
            src={bgMedia.heroBackgroundImage}
            className="w-full h-full object-cover"
            style={{ 
              opacity: 1 - bgMedia.overlayStrength,
              filter: bgMedia.blurIntensity ? `blur(${bgMedia.blurIntensity}px)` : 'none'
            }}
          />
        )}
        {/* Subtle cinematic darkening overlay so video details remain sharp and vibrant */}
        <div className="absolute inset-0 bg-black" style={{ opacity: bgMedia.overlayStrength }} />
        {/* Premium subtle deep-violet radial gradient glow */}
        <div
          className="absolute inset-0"
          style={{
            backgroundImage: `radial-gradient(circle 800px at 50% 200px, ${visuals.glowColor || 'rgba(251, 146, 60, 0.15)'}, transparent)`,
          }}
        />
      </div>

      {/* ── All page content sits above the video ── */}
      <div className="relative z-10 min-h-screen text-neutral-300 selection:bg-neutral-800 selection:text-white font-sans antialiased flex flex-col justify-between">
        {/* Horizontally Centered Floating Dock Navbar */}
        <FloatingNavbar brandIdentity={brandIdentity} globalExperience={globalExperience} />

        {/* Dynamic Route View Content Container */}
        <main className={`flex-1 w-full ${['/skills', '/journey'].includes(location.pathname) ? '' : 'pt-24 pb-12 max-w-7xl mx-auto px-6'}`}>
          <AnimatePresence mode="wait">
            <motion.div
              key={location.pathname}
              initial={{ opacity: 0, y: 15, filter: 'blur(4px)' }}
              animate={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
              exit={{ opacity: 0, y: -15, filter: 'blur(4px)' }}
              transition={{ duration: 0.45, ease: [0.16, 1, 0.3, 1] }}
              className="w-full h-full"
            >
              <Outlet context={{ brandIdentity, globalExperience }} />
            </motion.div>
          </AnimatePresence>
        </main>

        {/* Unified Global Shared Footer */}
        {globalExperience?.footer?.visuals?.footerEnabled !== false && (
          <footer 
            className="border-t border-white/5 py-5 sm:py-8 px-4 sm:px-6 text-center text-xs select-none max-w-7xl mx-auto rounded-t-2xl mt-16 w-full font-sans space-y-1"
            style={{
              backgroundColor: globalExperience?.footer?.visuals?.footerGlassEffect ? 'rgba(0, 0, 0, 0.4)' : 'transparent',
              backdropFilter: globalExperience?.footer?.visuals?.footerGlassEffect ? `blur(${globalExperience.footer.visuals.footerBlur}px)` : 'none',
              opacity: (globalExperience?.footer?.visuals?.footerOpacity ?? 90) / 100,
              color: globalExperience?.footer?.visuals?.footerTextColor || 'inherit'
            }}
          >
            <p 
              className="font-medium"
              style={{
                color: globalExperience?.footer?.visuals?.footerAccentColor || '#a3a3a3'
              }}
            >
              {globalExperience?.footer?.heading || `Designed & Developed by ${nameValue}`}
            </p>
            <p className="text-[10px] uppercase tracking-widest font-sans">
              {globalExperience?.footer?.techStackText || "React • Tailwind • Motion"}
            </p>
          </footer>
        )}
      </div>
    </div>
  );
}


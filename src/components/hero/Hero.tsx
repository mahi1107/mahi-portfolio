import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useOutletContext } from 'react-router-dom';
import { portfolioData } from '../../data/portfolioData';
import { ArrowRight, Sparkles, Cpu, Layers } from 'lucide-react';
import { ShinyButton } from '../ui/shiny-button';

export default function Hero() {
  const { brandIdentity } = useOutletContext<{ brandIdentity: any }>();

  const heroConfig = brandIdentity?.hero || {
    introHeadingLine1: "Hi, I'm",
    mainName: portfolioData.name,
    accentGradientStart: "#fb923c",
    accentGradientEnd: "#f59e0b",
    availabilityBadge: "B.Tech CSE Student // AVAILABLE FOR ROLES",
    subtitleLine1: "Building Digital Experiences",
    subtitleLine2: ""
  };

  const bioConfig = brandIdentity?.biography || {
    biography: "I’m a Computer Science Engineering student passionate about crafting clean interfaces, AI-driven automations, and robust MERN systems that combine fluid design with powerful frontend logic."
  };

  const ctaConfig = brandIdentity?.ctas || {
    primaryCTAText: "View My Work",
    primaryCTAUrl: "projects",
    secondaryCTAText: "Let's Connect",
    secondaryCTAUrl: "contact"
  };

  const visuals = brandIdentity?.visualSettings || {
    primaryAccent: "#f97316",
    secondaryAccent: "#fb923c",
    glowColor: "rgba(251, 146, 60, 0.15)",
    cardGlassOpacity: 0.1
  };

  const dynamicLines = heroConfig.subtitleLine2
    ? [heroConfig.subtitleLine2]
    : [
        "That Feel Cinematic",
        "For Modern Businesses",
        "With Interactive Interfaces",
        "Using Scalable Systems",
        "With Powerful Frontend Logic",
        "That Users Actually Enjoy",
        "With Clean Architecture",
        "Through Modern Web Technologies"
      ];

  const [dynamicLineIndex, setDynamicLineIndex] = useState(0);

  useEffect(() => {
    if (dynamicLines.length <= 1) {
      setDynamicLineIndex(0);
      return;
    }
    const interval = setInterval(() => {
      setDynamicLineIndex((prev) => (prev + 1) % dynamicLines.length);
    }, 3000); // Elegant 3s interval
    return () => clearInterval(interval);
  }, [dynamicLines.length]);

  const handleScroll = (id: string) => {
    const el = document.getElementById(id);
    if (el) el.scrollIntoView({ behavior: 'smooth' });
  };

  const gradientTextClass = {
    backgroundImage: `linear-gradient(to right, ${visuals.primaryAccent}, ${visuals.secondaryAccent})`
  };

  return (
    <section className="relative min-h-[85vh] sm:min-h-[75vh] flex items-center justify-center pt-20 xs:pt-24 sm:pt-16 pb-10 sm:pb-12 px-4 sm:px-6 select-none overflow-hidden bg-transparent">
      
      {/* ── DEPTH LAYERS: CENTER GLOW & FLOATING MICRO-PARTICLES ── */}
      
      {/* Ambient Radial Center Glow behind text */}
      <div 
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] md:w-[900px] h-[400px] md:h-[500px] pointer-events-none z-0 rounded-full blur-[90px]"
        style={{
          background: `radial-gradient(circle, ${visuals.primaryAccent}26 0%, ${visuals.secondaryAccent}0d 50%, transparent 70%)`
        }}
      />

      {/* Floating Micro Particle 1 (Top Left) */}
      <motion.div
        animate={{ 
          y: [0, -12, 0],
          x: [0, 8, 0],
          opacity: [0.3, 0.6, 0.3]
        }}
        transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
        className="absolute top-[15%] left-[10%] w-3 h-3 rounded-full bg-orange-400/30 blur-[2px] pointer-events-none hidden md:block"
        style={{ backgroundColor: `${visuals.primaryAccent}4d` }}
      />

      {/* Floating Micro Particle 2 (Top Right - UI Fragment) */}
      <motion.div
        animate={{ 
          y: [0, 15, 0],
          x: [0, -10, 0],
          opacity: [0.2, 0.5, 0.2]
        }}
        transition={{ duration: 7, repeat: Infinity, ease: "easeInOut", delay: 1 }}
        className="absolute top-[25%] right-[15%] px-3 py-1.5 rounded-lg border border-white/5 bg-white/[0.01] backdrop-blur-[2px] pointer-events-none hidden lg:flex items-center gap-1.5"
      >
        <Cpu className="w-3 h-3 text-orange-400/50" style={{ color: `${visuals.primaryAccent}80` }} />
        <span className="text-[8px] font-mono text-neutral-500 uppercase tracking-widest">Core Config</span>
      </motion.div>

      {/* Floating Micro Particle 3 (Bottom Left) */}
      <motion.div
        animate={{ 
          y: [0, -18, 0],
          x: [0, -6, 0],
          opacity: [0.2, 0.5, 0.2]
        }}
        transition={{ duration: 8, repeat: Infinity, ease: "easeInOut", delay: 2 }}
        className="absolute bottom-[20%] left-[15%] w-2 h-2 rounded-full bg-amber-400/30 blur-[1px] pointer-events-none hidden md:block"
        style={{ backgroundColor: `${visuals.secondaryAccent}4d` }}
      />

      {/* Floating Micro Particle 4 (Bottom Right - UI Fragment) */}
      <motion.div
        animate={{ 
          y: [0, -12, 0],
          x: [0, 8, 0],
          opacity: [0.2, 0.4, 0.2]
        }}
        transition={{ duration: 9, repeat: Infinity, ease: "easeInOut", delay: 3 }}
        className="absolute bottom-[25%] right-[10%] px-3 py-1.5 rounded-lg border border-white/5 bg-white/[0.01] backdrop-blur-[2px] pointer-events-none hidden lg:flex items-center gap-1.5"
      >
        <Layers className="w-3 h-3 text-amber-400/50" style={{ color: `${visuals.secondaryAccent}80` }} />
        <span className="text-[8px] font-mono text-neutral-500 uppercase tracking-widest">MERN DNA</span>
      </motion.div>

      {/* ── CENTERED IMMERSIVE CONTENT WRAPPER (900px Max Width) ── */}
      <div className="max-w-[900px] w-full text-center space-y-6 sm:space-y-9 relative z-10 px-4 md:px-8 flex flex-col items-center -translate-y-10 xs:-translate-y-12 sm:-translate-y-12">
        
        {/* Subtle Accent Status Badge */}
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/5 border border-white/10 shadow-inner backdrop-blur-md"
        >
          <span className="relative flex h-2 w-2">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full opacity-75" style={{ backgroundColor: visuals.secondaryAccent }}></span>
            <span className="relative inline-flex rounded-full h-2 w-2" style={{ backgroundColor: visuals.primaryAccent }}></span>
          </span>
          <span className="text-[10px] text-neutral-300 uppercase tracking-[0.25em] font-sans font-bold">
            {heroConfig.availabilityBadge}
          </span>
        </motion.div>

        {/* HUGE CENTERED NAME WITH CINEMATIC GLOW */}
        <motion.h1 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.15, duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
          className="font-black uppercase tracking-tighter text-white font-display text-[2.2rem] xs:text-[2.8rem] sm:text-[3.8rem] md:text-[5rem] lg:text-[7.5rem]"
          style={{
            lineHeight: 0.95,
            textShadow: `0 0 50px ${visuals.glowColor}`
          }}
        >
          {heroConfig.introHeadingLine1} <br />
          <span className="bg-gradient-to-r bg-clip-text text-transparent drop-shadow-[0_0_30px_rgba(251,146,60,0.4)]" style={gradientTextClass}>
            {heroConfig.mainName}
          </span>
        </motion.h1>

        {/* DYNAMIC ROTATING SUB-TEXT SYSTEM */}
        <motion.div 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.3, duration: 0.8 }}
          className="flex flex-col items-center text-center mt-1 sm:mt-2 w-full max-w-[280px] sm:max-w-none mx-auto"
        >
          {/* Fixed Line */}
          <span 
            className="text-neutral-400 font-extrabold tracking-tight uppercase text-xs xs:text-sm sm:text-[18px] md:text-xl lg:text-2xl"
            style={{ lineHeight: 1.1 }}
          >
            {heroConfig.subtitleLine1}
          </span>
          {/* Animated Line (Vertical Blur Offset Reveal) */}
          <div className="h-[1.4em] relative flex justify-center w-full overflow-visible mt-1 sm:mt-3">
            <AnimatePresence mode="wait">
              <motion.span
                key={dynamicLineIndex}
                initial={{ opacity: 0, y: 15, filter: 'blur(8px)' }}
                animate={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
                exit={{ opacity: 0, y: -15, filter: 'blur(8px)' }}
                transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
                className="absolute text-transparent bg-clip-text bg-gradient-to-r font-black tracking-tight w-full text-center uppercase text-xs xs:text-sm sm:text-[18px] md:text-xl lg:text-2xl"
                style={{
                  lineHeight: 1.1,
                  backgroundImage: `linear-gradient(to right, ${visuals.primaryAccent}, ${visuals.secondaryAccent})`
                }}
              >
                {dynamicLines[dynamicLineIndex]}
              </motion.span>
            </AnimatePresence>
          </div>
        </motion.div>

        {/* EMOTIONAL SUPPORTING STATEMENT (BIO) */}
        <motion.p
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.45, duration: 0.8 }}
          className="text-neutral-300 text-sm sm:text-base md:text-lg font-light font-sans max-w-[660px] mx-auto leading-relaxed mt-6 md:mt-8 drop-shadow-[0_2px_15px_rgba(0,0,0,0.6)]"
        >
          {bioConfig.biography}
        </motion.p>

        {/* PREMIUM GLASSMORPHIC CTA BUTTONS */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6, duration: 0.6 }}
          className="flex flex-col sm:flex-row items-center justify-center gap-3 sm:gap-6 pt-4 sm:pt-10 w-full relative z-20 max-w-[260px] sm:max-w-none mx-auto"
        >
          {/* Primary View Work Button with Shiny effect */}
          <ShinyButton
            onClick={() => handleScroll(ctaConfig.primaryCTAUrl)}
            className="w-full sm:w-auto !py-4 !px-7 sm:!px-8 !text-[11px] sm:!text-[12px] !font-extrabold !uppercase !tracking-widest shadow-2xl"
          >
            <span className="flex items-center justify-center gap-2 w-full">
              <span>{ctaConfig.primaryCTAText}</span>
              <ArrowRight className="w-4 h-4 text-orange-400 group-hover:translate-x-1 transition-transform" style={{ color: visuals.primaryAccent }} />
            </span>
          </ShinyButton>

          {/* Secondary Connect Button with Shiny effect */}
          <ShinyButton
            onClick={() => handleScroll(ctaConfig.secondaryCTAUrl)}
            className="w-full sm:w-auto !py-4 !px-7 sm:!px-8 !text-[11px] sm:!text-[12px] !font-extrabold !uppercase !tracking-widest shadow-2xl"
          >
            <span className="flex items-center justify-center w-full">
              {ctaConfig.secondaryCTAText}
            </span>
          </ShinyButton>
        </motion.div>

      </div>
    </section>
  );
}

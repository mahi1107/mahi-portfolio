import React, { useState, useEffect } from 'react';
import { createPortal } from 'react-dom';
import { motion, AnimatePresence } from 'framer-motion';
import axios from 'axios';
import { io } from 'socket.io-client';
import { portfolioData } from '../data/portfolioData';
import type { ProjectItem } from '../data/portfolioData';
import Section from '../components/shared/Section';
import { Github, ExternalLink, Users, Sparkles, X } from 'lucide-react';

type ProjectFilter = 'ALL' | 'FULL STACK' | 'AI / PYTHON' | 'BACKEND';

// Individual Project Card with Hover spotlights and neon edge highlights
function ProjectCard({ 
  project, 
  onClick, 
  hoverControls, 
  bgControls, 
  layoutControls 
}: { 
  project: any; 
  onClick: () => void;
  hoverControls: any;
  bgControls: any;
  layoutControls: any;
}) {
  const cardRef = React.useRef<HTMLDivElement>(null);
  const [coords, setCoords] = React.useState({ x: 0, y: 0 });
  const [isHovered, setIsHovered] = React.useState(false);

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!cardRef.current) return;
    const rect = cardRef.current.getBoundingClientRect();
    setCoords({
      x: e.clientX - rect.left,
      y: e.clientY - rect.top,
    });
  };

  const accentColor = project.gradientAccent || '#f97316';
  const scaleHover = hoverControls?.scale || 1.02;
  const zoomHover = hoverControls?.imageZoom || 1.05;
  const blurIntensity = hoverControls?.blurIntensity || 8;
  const showGlow = hoverControls?.shadowGlow !== false;
  const cardTrans = bgControls?.cardTransparency !== undefined ? bgControls.cardTransparency : 0.3;
  const borderRadius = layoutControls?.modalRadius !== undefined ? layoutControls.modalRadius : 32;

  return (
    <motion.div
      ref={cardRef}
      onMouseMove={handleMouseMove}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      onClick={onClick}
      whileHover={{ 
        y: -6, 
        scale: scaleHover,
        boxShadow: showGlow ? `0 10px 30px -10px ${accentColor}40` : '0 8px 30px rgba(0,0,0,0.5)'
      }}
      transition={{ 
        type: layoutControls?.transitionCurve === 'spring' ? 'spring' : 'tween',
        ease: layoutControls?.transitionCurve !== 'spring' ? 'easeOut' : undefined,
        duration: (layoutControls?.hoverSpeed || 300) / 1000 
      }}
      className="flex flex-col overflow-hidden transition-all duration-300 group relative cursor-pointer text-left w-full shadow-[0_8px_30px_rgba(0,0,0,0.5)] h-auto min-h-[360px] xs:min-h-[380px] sm:h-[430px] backdrop-blur-xl bg-black/55 sm:bg-neutral-900/[var(--card-trans)] border border-white/8 sm:border-white/5 mb-6 sm:mb-0"
      style={{
        borderRadius: `${borderRadius}px`,
        '--card-trans': cardTrans
      } as React.CSSProperties}
    >
      {/* Dynamic spotlight hover glow */}
      {isHovered && (
        <div
          className="absolute inset-0 pointer-events-none transition-opacity duration-300 z-0"
          style={{
            background: `radial-gradient(${blurIntensity * 25}px circle at ${coords.x}px ${coords.y}px, ${accentColor}12, transparent 80%)`,
          }}
        />
      )}

      {/* 1. IMAGE (Aspect-ratio on mobile, height-capped at 180px on desktop) */}
      <div className="relative w-full aspect-[16/9] md:aspect-auto md:h-[180px] overflow-hidden shrink-0 border-b border-white/5 bg-neutral-950">
        <motion.div
          className="absolute inset-0 bg-cover bg-center pointer-events-none"
          style={{ backgroundImage: `url(${project.image})` }}
          animate={{ scale: isHovered ? zoomHover : 1 }}
          transition={{ duration: 0.5 }}
        />
        <div className="absolute inset-0 bg-gradient-to-t from-[#09090b] via-[#09090b]/10 to-transparent" />
        
        {/* Floating status & deployment indicators */}
        <div className="absolute top-3 left-3 z-10 flex gap-1.5">
          <span 
            className="flex items-center gap-1 px-2.5 py-0.5 rounded-full text-[8px] font-mono border font-extrabold uppercase tracking-widest bg-neutral-950/80 backdrop-blur-sm shadow-sm"
            style={{ borderColor: `${accentColor}40`, color: accentColor }}
          >
            <span className="relative flex h-1 w-1">
              <span 
                className="animate-ping absolute inline-flex h-full w-full rounded-full opacity-75"
                style={{ backgroundColor: accentColor }}
              ></span>
              <span 
                className="relative inline-flex rounded-full h-1 w-1"
                style={{ backgroundColor: accentColor }}
              ></span>
            </span>
            {project.status}
          </span>
        </div>
      </div>

      {/* Content wrapper: Meta -> Title -> Description -> Stack -> Actions */}
      <div className="p-5 flex flex-col justify-between flex-grow relative z-10 space-y-2">
        
        {/* 2. META */}
        <div className="space-y-1.5">
          <span 
            className="text-[8px] font-mono tracking-widest font-extrabold uppercase block"
            style={{ color: accentColor }}
          >
            {project.category}
          </span>

          {/* 3. TITLE */}
          <h4 className="text-base font-extrabold text-white uppercase tracking-tight leading-snug group-hover:text-white transition-colors duration-200 truncate">
            {project.title}
          </h4>

          {/* 4. DESCRIPTION */}
          <p className="text-neutral-400 text-[11px] sm:text-xs font-light font-sans leading-relaxed line-clamp-2 sm:line-clamp-3">
            {project.description}
          </p>
        </div>

        {/* BOTTOM SECTION */}
        <div className="pt-3 border-t border-white/5 flex items-center justify-between gap-4 mt-auto select-none">
          
          {/* 5. STACK */}
          <div className="flex flex-wrap gap-1 max-w-[70%]">
            {project.technologies?.slice(0, 3).map((tech: string) => (
              <span
                key={tech}
                className="px-2 py-0.5 rounded bg-neutral-950 border border-white/5 text-neutral-400 font-mono text-[8px] font-bold uppercase tracking-wider"
              >
                {tech}
              </span>
            ))}
            {project.technologies?.length > 3 && (
              <span className="px-2 py-0.5 rounded bg-neutral-950 border border-white/5 text-neutral-500 font-mono text-[8px] font-bold uppercase tracking-wider">
                +{project.technologies.length - 3} MORE
              </span>
            )}
          </div>

          {/* 6. ACTIONS */}
          <div className="flex gap-2 sm:gap-1.5 shrink-0" onClick={e => e.stopPropagation()}>
            {project.actionButtons?.sourceCode?.enabled !== false && project.actionButtons?.sourceCode?.url && (
              <a
                href={project.actionButtons.sourceCode.url}
                target="_blank"
                rel="noopener noreferrer"
                className="p-2.5 sm:p-1.5 w-11 h-11 sm:w-8 sm:h-8 rounded-lg bg-neutral-950 hover:bg-neutral-850 border border-white/5 hover:border-white/10 text-neutral-400 hover:text-white transition-all cursor-pointer flex items-center justify-center shadow-md animate-fade-in"
              >
                <Github className="w-5 h-5 sm:w-3.5 sm:h-3.5" />
              </a>
            )}
            {project.actionButtons?.livePreview?.enabled !== false && project.actionButtons?.livePreview?.url && (
              <a
                href={project.actionButtons.livePreview.url}
                target="_blank"
                rel="noopener noreferrer"
                className="p-2.5 sm:p-1.5 w-11 h-11 sm:w-8 sm:h-8 rounded-lg text-neutral-950 transition-all cursor-pointer flex items-center justify-center shadow-lg hover:brightness-110 animate-fade-in"
                style={{ backgroundColor: accentColor, boxShadow: `0 0 10px ${accentColor}40` }}
              >
                <ExternalLink className="w-5 h-5 sm:w-3.5 sm:h-3.5 text-neutral-950 font-black" />
              </a>
            )}
          </div>
        </div>
      </div>
    </motion.div>
  );
}

// Expandable detailed information Modal Dialog (Centered Cinematic Viewport)
function ProjectDetailModal({ 
  project, 
  onClose, 
  modalLayout, 
  animationLayout 
}: { 
  project: any; 
  onClose: () => void;
  modalLayout: any;
  animationLayout: any;
}) {
  useEffect(() => {
    document.body.style.overflow = 'hidden';
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, []);

  const accentColor = project.gradientAccent || '#f97316';
  const blurValue = modalLayout.behavior?.blurIntensity !== undefined ? modalLayout.behavior.blurIntensity : 12;
  const isSplit = modalLayout.layoutType === 'split';
  const animSpeed = modalLayout.behavior?.animationSpeed !== undefined ? modalLayout.behavior.animationSpeed : 0.35;
  const isBorderGlow = modalLayout.behavior?.borderGlow !== false;
  const borderRadius = animationLayout?.modalRadius !== undefined ? animationLayout.modalRadius : 32;

  // Render icons helper
  const renderKpiIcon = (iconName: string) => {
    switch (iconName) {
      case 'Zap': return <Sparkles className="w-4 h-4 text-orange-400 shrink-0" />;
      case 'Cpu': return <Sparkles className="w-4 h-4 text-cyan-400 shrink-0" />;
      default: return <Sparkles className="w-4 h-4 text-amber-400 shrink-0" />;
    }
  };

  return createPortal(
    <div className="fixed inset-0 z-[9999] flex items-center justify-center p-0 overflow-hidden">
      {/* Outer Layer blur background */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        onClick={onClose}
        className="fixed inset-0 bg-black/85 z-0 cursor-pointer"
        style={{
          backdropFilter: `blur(${blurValue}px)`
        }}
      />

      {/* Cinematic Modal Container */}
      <motion.div
        initial={
          modalLayout.behavior?.openTransition === 'fade' 
            ? { opacity: 0 } 
            : { opacity: 0, scale: 0.94, y: 30 }
        }
        animate={
          modalLayout.behavior?.openTransition === 'fade' 
            ? { opacity: 1 } 
            : { opacity: 1, scale: 1, y: 0 }
        }
        exit={
          modalLayout.behavior?.closeTransition === 'fade' 
            ? { opacity: 0 } 
            : { opacity: 0, scale: 0.94, y: 30 }
        }
        transition={{ 
          type: modalLayout.behavior?.openTransition === 'spring' ? 'spring' : 'tween',
          ease: 'easeOut',
          duration: animSpeed 
        }}
        className="relative w-full h-screen sm:w-[92vw] sm:max-w-6xl sm:h-[88vh] bg-neutral-950 border overflow-hidden z-10 flex flex-col text-left"
        style={{
          borderColor: isBorderGlow ? `${accentColor}40` : 'rgba(255,255,255,0.08)',
          borderRadius: `${borderRadius}px`
        }}
      >
        {/* Fixed Top Header (Flex-shrink-0) */}
        <div className="px-6 py-5 md:px-8 border-b border-white/5 bg-neutral-900/40 backdrop-blur-md flex justify-between items-center shrink-0 z-20">
          <div className="space-y-1">
            <div className="flex flex-wrap gap-2 items-center">
              <span 
                className="px-2.5 py-0.5 text-[9px] font-mono border rounded-full font-bold uppercase tracking-wider bg-neutral-950/80"
                style={{ borderColor: `${accentColor}30`, color: accentColor }}
              >
                {project.category}
              </span>
              <span className="px-2.5 py-0.5 text-[9px] font-mono bg-neutral-900 border border-white/10 text-neutral-300 rounded-full font-bold uppercase tracking-wider">
                {project.status}
              </span>
            </div>
            <h3 className="text-xl md:text-2xl font-black text-white uppercase tracking-tight font-display mt-1">
              {project.title}
            </h3>
          </div>
          <button
            onClick={onClose}
            className="p-2.5 rounded-full bg-black/60 hover:bg-black/90 border border-white/10 text-neutral-300 hover:text-white transition-all cursor-pointer shadow-inner"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Scrollable Content Area */}
        <div className="flex-1 overflow-y-auto p-6 md:p-8 space-y-8">
          
          {isSplit ? (
            /* ==========================================
               SPLIT WORKSPACE LAYOUT (65% left, 35% right)
               ========================================== */
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
              
              {/* LEFT COLUMN: NARRATIVES */}
              <div className="lg:col-span-7 space-y-6">
                
                {modalLayout.enabledSections?.overview !== false && (
                  <div className="space-y-2">
                    <h4 className="text-[10px] font-mono tracking-wider text-neutral-500 uppercase font-bold">
                      Project Overview
                    </h4>
                    <p className="text-neutral-300 text-sm md:text-base font-light font-sans leading-relaxed">
                      {project.description}
                    </p>
                  </div>
                )}

                {modalLayout.enabledSections?.kpi !== false && project.kpis && project.kpis.length > 0 && (
                  <div className="space-y-3 pt-4 border-t border-white/5">
                    <h4 className="text-[10px] font-mono tracking-wider text-neutral-500 uppercase font-bold">
                      Key Performance Indicators & Outcomes
                    </h4>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                      {project.kpis.map((kpi: any, i: number) => (
                        <div
                          key={i}
                          className="flex items-start gap-2.5 p-3 rounded-xl bg-neutral-950 border border-white/5"
                        >
                          {renderKpiIcon(kpi.icon)}
                          <div className="space-y-0.5">
                            <span className="text-[10px] font-mono font-bold text-white uppercase block">{kpi.title}</span>
                            <span className="text-[9.5px] text-neutral-400 font-sans font-light leading-relaxed block">
                              {kpi.description}
                            </span>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                {/* Narrative break downs */}
                <div className="space-y-4 pt-4 border-t border-white/5">
                  {modalLayout.enabledSections?.architecture !== false && project.architectureDescription && (
                    <div className="space-y-2">
                      <h4 className="text-[10px] font-mono tracking-wider text-neutral-500 uppercase font-bold">
                        Architecture & Systems Orchestration
                      </h4>
                      <p className="text-neutral-400 text-xs leading-relaxed font-sans font-light">
                        {project.architectureDescription}
                      </p>
                    </div>
                  )}

                  {modalLayout.enabledSections?.challenges !== false && project.engineeringChallenges && (
                    <div className="space-y-2">
                      <h4 className="text-[10px] font-mono tracking-wider text-neutral-500 uppercase font-bold">
                        Engineering Challenges & Resiliencies
                      </h4>
                      <p className="text-neutral-400 text-xs leading-relaxed font-sans font-light">
                        {project.engineeringChallenges}
                      </p>
                    </div>
                  )}
                </div>

              </div>

              {/* RIGHT COLUMN: PREVIEW STICKY */}
              <div className="lg:col-span-5 space-y-6 lg:sticky lg:top-0">
                {modalLayout.enabledSections?.gallery !== false && (
                  <div className="relative w-full rounded-2xl overflow-hidden border border-white/10 bg-neutral-950 aspect-video shrink-0 shadow-lg group">
                    <div
                      className="absolute inset-0 bg-cover bg-center transition-transform duration-700 ease-out group-hover:scale-105"
                      style={{ backgroundImage: `url(${project.heroBanner || project.image})` }}
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent" />
                  </div>
                )}

                {modalLayout.enabledSections?.stack !== false && project.technologies && (
                  <div className="p-5 rounded-2xl bg-neutral-900 border border-white/5 space-y-3">
                    <h4 className="text-[10px] font-mono tracking-wider text-neutral-500 uppercase font-bold">
                      Technologies Deployed
                    </h4>
                    <div className="flex flex-wrap gap-1.5">
                      {project.technologies.map((tech: string) => (
                        <span
                          key={tech}
                          className="px-2.5 py-1 rounded bg-neutral-950 border border-white/5 text-neutral-300 font-mono text-[9px] font-bold uppercase tracking-wider"
                        >
                          {tech}
                        </span>
                      ))}
                    </div>
                  </div>
                )}

                {project.scalabilityNotes && (
                  <div className="p-5 rounded-2xl bg-neutral-900 border border-white/5 text-left">
                    <span className="text-[8px] font-mono text-neutral-500 uppercase tracking-widest block">Scalability Framework</span>
                    <p className="text-neutral-300 text-[10px] leading-relaxed font-sans mt-1">
                      {project.scalabilityNotes}
                    </p>
                  </div>
                )}
              </div>

            </div>
          ) : (
            /* ==========================================
               CENTERED STORYTELLING CHRONOLOGICAL NARRATIVE
               ========================================== */
            <div className="max-w-3xl mx-auto space-y-8 text-center">
              
              {modalLayout.enabledSections?.gallery !== false && (
                <div className="relative w-full rounded-[24px] overflow-hidden border border-white/10 bg-neutral-950 aspect-[21/9] shadow-2xl">
                  <div
                    className="absolute inset-0 bg-cover bg-center"
                    style={{ backgroundImage: `url(${project.heroBanner || project.image})` }}
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-neutral-950 via-neutral-950/20 to-transparent" />
                </div>
              )}

              {modalLayout.enabledSections?.overview !== false && (
                <div className="space-y-3 pt-2">
                  <h4 className="text-[10px] font-mono tracking-widest text-neutral-500 uppercase font-bold">Overview Narrative</h4>
                  <p className="text-neutral-200 text-sm md:text-base font-light font-sans leading-relaxed max-w-xl mx-auto">
                    {project.description}
                  </p>
                </div>
              )}

              {modalLayout.enabledSections?.kpi !== false && project.kpis && project.kpis.length > 0 && (
                <div className="space-y-4 pt-6 border-t border-white/5 max-w-2xl mx-auto">
                  <h4 className="text-[10px] font-mono tracking-widest text-neutral-500 uppercase font-bold">Key Benchmarks</h4>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    {project.kpis.map((kpi: any, i: number) => (
                      <div key={i} className="p-4 rounded-2xl bg-neutral-900 border border-white/5 text-left space-y-1">
                        {renderKpiIcon(kpi.icon)}
                        <span className="block text-xs font-mono font-bold text-white uppercase">{kpi.title}</span>
                        <span className="block text-[10px] text-neutral-450 font-sans font-light leading-relaxed">{kpi.description}</span>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {modalLayout.enabledSections?.architecture !== false && project.architectureDescription && (
                <div className="space-y-3 pt-6 border-t border-white/5 max-w-2xl mx-auto text-left">
                  <h4 className="text-[10px] font-mono tracking-widest text-neutral-500 uppercase font-bold text-center">Architecture Orchestration</h4>
                  <p className="text-neutral-400 text-xs font-light leading-relaxed font-sans">
                    {project.architectureDescription}
                  </p>
                </div>
              )}

              {modalLayout.enabledSections?.challenges !== false && project.engineeringChallenges && (
                <div className="space-y-3 pt-6 border-t border-white/5 max-w-2xl mx-auto text-left">
                  <h4 className="text-[10px] font-mono tracking-widest text-neutral-500 uppercase font-bold text-center">Engineering Hardships & Resiliences</h4>
                  <p className="text-neutral-400 text-xs font-light leading-relaxed font-sans">
                    {project.engineeringChallenges}
                  </p>
                </div>
              )}

              {modalLayout.enabledSections?.stack !== false && project.technologies && (
                <div className="pt-6 border-t border-white/5 max-w-xl mx-auto space-y-3">
                  <h4 className="text-[10px] font-mono tracking-widest text-neutral-500 uppercase font-bold">Tech Orbit Blueprint</h4>
                  <div className="flex flex-wrap gap-2 justify-center">
                    {project.technologies.map((t: string) => (
                      <span key={t} className="px-3 py-1 rounded-md bg-neutral-900 border border-white/5 text-[10px] font-mono font-bold uppercase text-neutral-300">
                        {t}
                      </span>
                    ))}
                  </div>
                </div>
              )}

            </div>
          )}

        </div>

        {/* Action Footer (Flex-shrink-0) */}
        <div className="px-6 py-5 md:px-8 bg-neutral-950 border-t border-white/5 flex justify-end gap-3 shrink-0 z-20 select-none">
          {project.actionButtons?.sourceCode?.enabled !== false && project.actionButtons?.sourceCode?.url && (
            <a
              href={project.actionButtons.sourceCode.url}
              target="_blank"
              rel="noopener noreferrer"
              className="px-5 py-2.5 rounded-xl bg-neutral-900 hover:bg-neutral-800 border border-white/10 text-neutral-300 hover:text-white text-xs font-mono font-bold uppercase tracking-widest transition-all cursor-pointer flex items-center gap-2"
            >
              <Github className="w-4 h-4" />
              Source Code
            </a>
          )}
          {project.actionButtons?.livePreview?.enabled !== false && project.actionButtons?.livePreview?.url && (
            <a
              href={project.actionButtons.livePreview.url}
              target="_blank"
              rel="noopener noreferrer"
              className="px-5 py-2.5 rounded-xl text-neutral-950 text-xs font-mono font-black uppercase tracking-widest transition-all cursor-pointer flex items-center gap-2 shadow-lg"
              style={{ backgroundColor: accentColor, boxShadow: `0 0 15px ${accentColor}40` }}
            >
              <ExternalLink className="w-4 h-4" />
              Live Preview
            </a>
          )}
        </div>
      </motion.div>
    </div>,
    document.body
  );
}

export default function ProjectsPage() {
  // Global projects settings states
  const [badge, setBadge] = useState('BUILDS + SCALABLE DEPLOYMENTS');
  const [heading, setHeading] = useState('PROJECTS THAT SOLVE REAL PROBLEMS');
  const [subtext, setSubtext] = useState('AI systems, scalable platforms, and interactive experiences engineered to solve real-world problems.');
  
  const [categories, setCategories] = useState<any[]>([
    { id: 'ALL', label: 'ALL', active: true, accentColor: '#f97316' },
    { id: 'FULL STACK', label: 'FULL STACK', active: true, accentColor: '#3b82f6' },
    { id: 'AI/PYTHON', label: 'AI/PYTHON', active: true, accentColor: '#10b981' },
    { id: 'BACKEND', label: 'BACKEND', active: true, accentColor: '#8b5cf6' },
    { id: 'DATA SYSTEMS', label: 'DATA SYSTEMS', active: true, accentColor: '#ec4899' }
  ]);

  const [projectsList, setProjectsList] = useState<any[]>([]);
  const [filter, setFilter] = useState<string>('ALL');
  const [selectedProject, setSelectedProject] = useState<any | null>(null);

  // Modal configuration
  const [modalLayout, setModalLayout] = useState<any>({
    layoutType: 'split',
    enabledSections: { overview: true, kpi: true, challenges: true, stack: true, architecture: true, gallery: true },
    behavior: { animationSpeed: 0.35, blurIntensity: 12, borderGlow: true, openTransition: 'spring', closeTransition: 'ease' }
  });

  // Hover and background options
  const [livePreviewControls, setLivePreviewControls] = useState<any>({
    cardHover: { blurIntensity: 8, scale: 1.02, imageZoom: 1.05, shadowGlow: true },
    background: { overlayOpacity: 0.08, glassBlur: 16, lightingGradient: 'radial-gradient(circle_800px_at_50%_-100px,rgba(251,146,60,0.08),transparent)', cardTransparency: 0.3 }
  });

  // Animation and spacing options
  const [animationLayout, setAnimationLayout] = useState<any>({
    cardSpacing: 24,
    modalRadius: 32,
    cardGlow: 15,
    hoverSpeed: 300,
    transitionCurve: 'cubic-bezier(0.16, 1, 0.3, 1)',
    layoutDensity: 'cozy'
  });

  const hydrateProjects = (sec: any) => {
    if (!sec) return;
    if (sec.badge) setBadge(sec.badge);
    if (sec.heading) setHeading(sec.heading);
    if (sec.description) setSubtext(sec.description);
    if (sec.categories) setCategories(sec.categories);
    
    if (sec.projects) {
      const mapped = sec.projects.map((p: any) => ({
        id: p.id,
        title: p.title || 'NEW SHOWCASE PROJECT',
        slug: p.slug || (p.title ? p.title.toLowerCase().replace(/[^a-z0-9]+/g, '-') : 'creative-blueprint'),
        category: p.category || 'FULL STACK',
        status: p.status || (p.featured ? 'Featured' : 'Live'),
        image: p.image || p.imageUrl || p.thumbnail || 'https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&w=800&q=80',
        heroBanner: p.heroBanner || p.image || p.imageUrl || 'https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?auto=format&fit=crop&w=800&q=80',
        modalPreviewMedia: p.modalPreviewMedia || p.videoPreview || p.image || p.imageUrl || 'https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?auto=format&fit=crop&w=800&q=80',
        gradientAccent: p.gradientAccent || '#f97316',
        description: p.description || 'A brief conversational summary of the project.',
        architectureDescription: p.architectureDescription || p.technicalBreakdown?.architecture || 'Built upon modular full-stack schemas, isolated client states, secure authorization middlewares, optimized multi-layer database queries, and automatic serverless deployment pipelines to maintain high horizontal scalability.',
        engineeringChallenges: p.engineeringChallenges || p.technicalBreakdown?.optimization || 'Optimized database query performance using relational schema indexes, resolved memory leaks under socket events, engineered premium fluid animations running cleanly at 60fps, and established dynamic data synchronization loops.',
        outcomes: p.outcomes || (Array.isArray(p.highlights) ? p.highlights.join('\n') : p.outcomes || 'Detail bulleted outcomes or performance KPI parameters.'),
        scalabilityNotes: p.scalabilityNotes || p.technicalBreakdown?.apis || 'Explain horizontal indexing patterns, edge networks, or database clustering.',
        kpis: p.kpis || [
          { icon: 'Zap', title: 'Sub-12ms Latency', description: 'Engineered sub-12ms param routing caches' },
          { icon: 'Shield', title: 'Zero Session Faults', description: 'Zero core session failures during peak queries' }
        ],
        technologies: p.technologies || p.techStack || ['React', 'Node.js', 'PostgreSQL'],
        actionButtons: p.actionButtons || {
          sourceCode: { enabled: true, url: p.githubUrl || 'https://github.com' },
          livePreview: { enabled: true, url: p.liveUrl || p.demoUrl || 'https://google.com' },
          caseStudy: { enabled: true }
        },
        visible: p.visible !== false,
        order: p.order || 1
      }));
      setProjectsList(mapped);
    }

    if (sec.modalLayout) setModalLayout(sec.modalLayout);
    if (sec.livePreviewControls) setLivePreviewControls(sec.livePreviewControls);
    if (sec.animationLayout) setAnimationLayout(sec.animationLayout);
  };

  useEffect(() => {
    const fetchProjects = async () => {
      try {
        const res = await axios.get(`${import.meta.env.VITE_API_BASE_URL || 'http://localhost:5000'}/api/portfolio/slug/mahi`);
        if (res.data.data && res.data.data.projectsSection) {
          hydrateProjects(res.data.data.projectsSection);
        } else if (res.data.data && res.data.data.projects) {
          // Seeding fallback
          hydrateProjects({ projects: res.data.data.projects });
        }
      } catch (err) {
        console.warn("Failed to fetch dynamic projects, using static fallback.");
        hydrateProjects({ projects: portfolioData.projects });
      }
    };
    fetchProjects();
  }, []);

  useEffect(() => {
    const socket = io(import.meta.env.VITE_API_BASE_URL || 'http://localhost:5000');
    socket.emit('portfolio:join', 'mahi');

    socket.on('projects:updated', (payload: any) => {
      console.log('⚡ Real-time projects updated in frontend:', payload);
      if (payload.projectsSection) {
        hydrateProjects(payload.projectsSection);
      }
    });

    return () => {
      socket.disconnect();
    };
  }, []);

  const matchesFilter = (project: any) => {
    if (filter === 'ALL') return true;
    if (filter === 'FULL STACK') {
      return project.technologies?.includes('React') || project.technologies?.includes('Next.js');
    }
    if (filter === 'AI / PYTHON') {
      return project.technologies?.includes('Python') || project.technologies?.includes('Gemini LLM');
    }
    if (filter === 'BACKEND') {
      return project.technologies?.includes('Node.js') || project.technologies?.includes('PostgreSQL');
    }
    return project.category === filter;
  };

  const projectSourceList = projectsList.length > 0 ? projectsList : portfolioData.projects;
  const filteredProjects = projectSourceList.filter(p => p.visible !== false).filter(matchesFilter);

  const spacerSpacing = animationLayout?.cardSpacing !== undefined ? animationLayout.cardSpacing : 24;

  return (
    <Section id="projects-page" title={heading} subtitle={badge}>
      <div 
        className="relative w-full overflow-hidden border border-white/10 select-none shadow-[0_30px_60px_rgba(0,0,0,0.4)] transition-all duration-500 p-4 sm:p-6 md:p-9 lg:p-12"
        style={{
          borderRadius: `${animationLayout?.modalRadius || 32}px`,
          backgroundColor: `rgba(9, 9, 11, ${livePreviewControls?.background?.cardTransparency !== undefined ? 0.3 : 0.3})`,
          backdropFilter: `blur(${livePreviewControls?.background?.glassBlur || 16}px)`
        }}
      >
        
        {/* Matte dark surface background with faint subtle grids */}
        <div className="absolute inset-0 -z-10 overflow-hidden" style={{ borderRadius: `${animationLayout?.modalRadius || 32}px` }}>
          <div 
            className="absolute inset-0 transition-opacity duration-500"
            style={{ 
              background: livePreviewControls?.background?.lightingGradient || 'radial-gradient(circle_800px_at_50%_-100px,rgba(251,146,60,0.08),transparent)',
              opacity: 1
            }} 
          />
          
          <div 
            className="absolute inset-0 pointer-events-none transition-opacity duration-500"
            style={{
              backgroundImage: `linear-gradient(to right, rgba(255, 255, 255, 0.4) 1px, transparent 1px), linear-gradient(to bottom, rgba(255, 255, 255, 0.4) 1px, transparent 1px)`,
              backgroundSize: '32px 32px',
              opacity: livePreviewControls?.background?.overlayOpacity !== undefined ? livePreviewControls.background.overlayOpacity : 0.04
            }}
          />
        </div>

        <div className="space-y-6 sm:space-y-10 relative z-10 text-left">
          
          {/* Header */}
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 pb-4 md:pb-6 border-b border-white/5">
            <div className="space-y-2">
              <span className="text-[9px] font-mono tracking-widest text-orange-400 font-extrabold uppercase">
                // Interactive Project Dashboard
              </span>
              <h3 className="text-xl md:text-2xl font-black text-white uppercase tracking-tight font-display">
                Selected Works
              </h3>
              <p className="text-neutral-400 text-xs md:text-sm font-light font-sans max-w-xl">
                {subtext}
              </p>
            </div>

            {/* Dynamic filter tags */}
            <div className="flex flex-row md:flex-wrap gap-2 overflow-x-auto md:overflow-x-visible [scrollbar-width:none] [&::-webkit-scrollbar]:hidden max-w-full pb-1.5 md:pb-0 select-none -mx-4 px-4 md:mx-0 md:px-0 scroll-smooth snap-x snap-mandatory justify-start items-center">
              {categories.filter(c => c.active).map(cat => {
                const isSelected = filter === cat.id;
                const activeColor = cat.accentColor || '#f97316';
                return (
                  <button
                    key={cat.id}
                    onClick={() => setFilter(cat.id)}
                    className="relative px-3.5 py-1.5 rounded-full text-[9px] font-extrabold tracking-widest uppercase transition-all duration-300 cursor-pointer overflow-hidden group border border-transparent shrink-0 snap-center"
                    style={{
                      borderColor: isSelected ? `${activeColor}40` : 'rgba(255, 255, 255, 0.05)',
                      backgroundColor: isSelected ? `${activeColor}10` : 'rgba(255, 255, 255, 0.02)'
                    }}
                  >
                    <span 
                      className="transition-colors duration-300 font-bold"
                      style={{ color: isSelected ? activeColor : '#a3a3a3' }}
                    >
                      {cat.label}
                    </span>
                  </button>
                );
              })}
            </div>
          </div>

          {/* Dynamic 3-Column Cinematic Grid */}
          <div 
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 items-stretch transition-all duration-500"
            style={{
              gap: `${spacerSpacing}px`
            }}
          >
            <AnimatePresence mode="popLayout">
              {filteredProjects.map((project, idx) => (
                <motion.div
                  key={project.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  transition={{ duration: 0.45, delay: idx * 0.05 }}
                  layout
                >
                  <ProjectCard
                    project={project}
                    onClick={() => setSelectedProject(project)}
                    hoverControls={livePreviewControls.cardHover}
                    bgControls={livePreviewControls.background}
                    layoutControls={animationLayout}
                  />
                </motion.div>
              ))}
            </AnimatePresence>
          </div>
        </div>
      </div>

      {/* Details modal overlays */}
      <AnimatePresence>
        {selectedProject && (
          <ProjectDetailModal
            project={selectedProject}
            onClose={() => setSelectedProject(null)}
            modalLayout={modalLayout}
            animationLayout={animationLayout}
          />
        )}
      </AnimatePresence>
    </Section>
  );
}

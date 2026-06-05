import React, { useState, useEffect } from 'react';
import { createPortal } from 'react-dom';
import { motion, AnimatePresence } from 'framer-motion';
import axios from 'axios';
import { io } from 'socket.io-client';
import { portfolioData } from '../data/portfolioData';
import Section from '../components/shared/Section';
import { Github, ExternalLink, Sparkles, X } from 'lucide-react';

// Individual Project Card with Hover spotlights and neon edge highlights
function ProjectCard({ 
  project, 
  onClick, 
  triggerToast
}: { 
  project: any; 
  onClick: () => void;
  triggerToast: (msg: string) => void;
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

  return (
    <motion.div
      ref={cardRef}
      onMouseMove={handleMouseMove}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      onClick={onClick}
      whileHover={{ 
        y: -8, 
        scale: 1.02,
        boxShadow: `0 20px 40px -15px ${accentColor}30`
      }}
      transition={{ 
        type: 'spring',
        stiffness: 300,
        damping: 25
      }}
      className="flex flex-col overflow-hidden transition-all duration-300 group relative cursor-pointer text-left w-full shadow-[0_12px_40px_rgba(0,0,0,0.6)] backdrop-blur-xl bg-neutral-900/40 border border-white/5 rounded-[32px] min-h-[460px]"
    >
      {/* Dynamic spotlight hover glow */}
      {isHovered && (
        <div
          className="absolute inset-0 pointer-events-none transition-opacity duration-300 z-0"
          style={{
            background: `radial-gradient(300px circle at ${coords.x}px ${coords.y}px, ${accentColor}08, transparent 80%)`,
          }}
        />
      )}

      {/* 1. IMAGE */}
      <div className="relative w-full aspect-[16/10] overflow-hidden shrink-0 border-b border-white/5 bg-neutral-950">
        <motion.div
          className="absolute inset-0 bg-cover bg-center pointer-events-none"
          style={{ backgroundImage: `url(${project.image})` }}
          animate={{ scale: isHovered ? 1.05 : 1 }}
          transition={{ duration: 0.5 }}
        />
        <div className="absolute inset-0 bg-gradient-to-t from-neutral-950 via-neutral-950/20 to-transparent" />
        
        {/* Floating status & deployment indicators */}
        <div className="absolute top-4 left-4 z-10">
          <span 
            className="flex items-center gap-1.5 px-3 py-1 rounded-full text-[9px] font-mono border font-extrabold uppercase tracking-widest bg-neutral-950/80 backdrop-blur-sm"
            style={{ borderColor: `${accentColor}40`, color: accentColor }}
          >
            <span className="relative flex h-1.5 w-1.5">
              <span 
                className="animate-ping absolute inline-flex h-full w-full rounded-full opacity-75"
                style={{ backgroundColor: accentColor }}
              ></span>
              <span 
                className="relative inline-flex rounded-full h-1.5 w-1.5"
                style={{ backgroundColor: accentColor }}
              ></span>
            </span>
            {project.status}
          </span>
        </div>
      </div>

      {/* Content wrapper */}
      <div className="p-6 flex flex-col justify-between flex-grow relative z-10 space-y-4">
        <div className="space-y-2">
          <span 
            className="text-[10px] font-mono tracking-widest font-extrabold uppercase block"
            style={{ color: accentColor }}
          >
            {project.category}
          </span>

          <h4 className="text-lg font-black text-white uppercase tracking-tight leading-snug group-hover:text-white transition-colors duration-200">
            {project.title}
          </h4>

          <p className="text-neutral-400 text-xs font-light font-sans leading-relaxed">
            {project.description}
          </p>
        </div>

        {/* BOTTOM SECTION */}
        <div className="pt-4 border-t border-white/5 flex items-center justify-between gap-4 mt-auto select-none">
          {/* Tech Stack tags */}
          <div className="flex flex-wrap gap-1.5 max-w-[70%]">
            {project.technologies?.slice(0, 3).map((tech: string) => (
              <span
                key={tech}
                className="px-2.5 py-1 rounded-lg bg-neutral-950 border border-white/5 text-neutral-400 font-mono text-[9px] font-bold uppercase tracking-wider"
              >
                {tech}
              </span>
            ))}
            {project.technologies && project.technologies.length > 3 && (
              <span className="px-2.5 py-1 rounded-lg bg-neutral-950 border border-white/5 text-neutral-400 font-mono text-[9px] font-bold uppercase tracking-wider">
                +{project.technologies.length - 3} MORE
              </span>
            )}
          </div>

          {/* Action buttons */}
          <div className="flex gap-2 shrink-0" onClick={e => e.stopPropagation()}>
            {project.actionButtons?.sourceCode?.enabled !== false && project.actionButtons?.sourceCode?.url && (
              <a
                href={project.actionButtons.sourceCode.url}
                target="_blank"
                rel="noopener noreferrer"
                className="p-2 w-10 h-10 rounded-xl bg-neutral-950 hover:bg-neutral-800 border border-white/5 hover:border-white/10 text-neutral-400 hover:text-white transition-all cursor-pointer flex items-center justify-center shadow-md"
              >
                <Github className="w-5 h-5" />
              </a>
            )}
            {project.actionButtons?.livePreview?.enabled !== false && (
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  if (project.liveUrl) {
                    window.open(project.liveUrl, '_blank', 'noopener,noreferrer');
                  } else {
                    triggerToast("Project Deployment In Progress // Live Demo Available Soon");
                  }
                }}
                className="p-2 w-10 h-10 rounded-xl text-neutral-950 transition-all cursor-pointer flex items-center justify-center shadow-lg hover:brightness-110"
                style={{ backgroundColor: accentColor, boxShadow: `0 0 10px ${accentColor}40` }}
              >
                <ExternalLink className="w-5 h-5 text-neutral-950 font-black" />
              </button>
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
  triggerToast
}: { 
  project: any; 
  onClose: () => void;
  triggerToast: (msg: string) => void;
}) {
  useEffect(() => {
    document.body.style.overflow = 'hidden';
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, []);

  const accentColor = project.gradientAccent || '#f97316';

  return createPortal(
    <div className="fixed inset-0 z-[9999] flex items-center justify-center p-4 overflow-hidden">
      {/* Outer Layer blur background */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        onClick={onClose}
        className="fixed inset-0 bg-black/85 z-0 cursor-pointer backdrop-blur-md"
      />

      {/* Cinematic Modal Container */}
      <motion.div
        initial={{ opacity: 0, scale: 0.95, y: 20 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        exit={{ opacity: 0, scale: 0.95, y: 20 }}
        transition={{ type: 'spring', damping: 25, stiffness: 250 }}
        className="relative w-full max-w-4xl h-[85vh] bg-neutral-950 border border-white/10 overflow-hidden z-10 flex flex-col text-left rounded-3xl"
        style={{
          boxShadow: `0 0 40px ${accentColor}20`
        }}
      >
        {/* Top Header */}
        <div className="px-6 py-5 border-b border-white/5 bg-neutral-900/40 backdrop-blur-md flex justify-between items-center shrink-0 z-20">
          <div className="space-y-1">
            <span 
              className="px-2.5 py-0.5 text-[9px] font-mono border rounded-full font-bold uppercase tracking-wider bg-neutral-950/80"
              style={{ borderColor: `${accentColor}30`, color: accentColor }}
            >
              {project.category}
            </span>
            <h3 className="text-xl md:text-2xl font-black text-white uppercase tracking-tight font-display mt-1">
              {project.title}
            </h3>
          </div>
          <button
            onClick={onClose}
            className="p-2.5 rounded-full bg-black/60 hover:bg-black/90 border border-white/10 text-neutral-300 hover:text-white transition-all cursor-pointer"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Scrollable Content Area */}
        <div className="flex-1 overflow-y-auto p-6 md:p-8 space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-12 gap-8 items-start">
            
            {/* LEFT COLUMN: Project Details (65%) */}
            <div className="md:col-span-8 space-y-6">
              
              {/* Problem Statement */}
              {project.problemStatement && (
                <div className="space-y-2">
                  <h4 className="text-[10px] font-mono tracking-wider text-neutral-500 uppercase font-bold">
                    Problem Statement
                  </h4>
                  <div className="p-4 rounded-2xl bg-red-950/10 border border-red-500/10 text-neutral-300 text-sm font-sans font-light leading-relaxed">
                    {project.problemStatement}
                  </div>
                </div>
              )}

              {/* Solution */}
              {project.solution && (
                <div className="space-y-2">
                  <h4 className="text-[10px] font-mono tracking-wider text-neutral-500 uppercase font-bold">
                    Solution
                  </h4>
                  <div className="p-4 rounded-2xl bg-emerald-950/10 border border-emerald-500/10 text-neutral-300 text-sm font-sans font-light leading-relaxed">
                    {project.solution}
                  </div>
                </div>
              )}

              {/* Key Features */}
              {project.keyFeatures && project.keyFeatures.length > 0 && (
                <div className="space-y-3">
                  <h4 className="text-[10px] font-mono tracking-wider text-neutral-500 uppercase font-bold">
                    Key Features
                  </h4>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    {project.keyFeatures.map((feat: string, i: number) => (
                      <div key={i} className="flex items-start gap-2.5 p-3 rounded-xl bg-neutral-900 border border-white/5">
                        <Sparkles className="w-3.5 h-3.5 text-accent shrink-0 mt-0.5" style={{ color: accentColor }} />
                        <span className="text-xs text-neutral-355 font-sans font-light leading-relaxed">
                          {feat}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Challenges & Learning */}
              {project.challengesLearning && (
                <div className="space-y-2">
                  <h4 className="text-[10px] font-mono tracking-wider text-neutral-500 uppercase font-bold">
                    Challenges & Learning
                  </h4>
                  <div className="p-4 rounded-2xl bg-neutral-900/60 border border-white/5 text-neutral-300 text-xs leading-relaxed font-sans font-light">
                    {project.challengesLearning}
                  </div>
                </div>
              )}

              {/* Future Enhancements */}
              {project.futureEnhancements && project.futureEnhancements.length > 0 && (
                <div className="space-y-2">
                  <h4 className="text-[10px] font-mono tracking-wider text-neutral-500 uppercase font-bold">
                    Future Enhancements
                  </h4>
                  <ul className="space-y-2">
                    {project.futureEnhancements.map((enh: string, i: number) => (
                      <li key={i} className="flex items-center gap-2.5 text-xs text-neutral-400 font-sans font-light">
                        <span className="w-1.5 h-1.5 rounded-full bg-neutral-600 animate-pulse" />
                        {enh}
                      </li>
                    ))}
                  </ul>
                </div>
              )}
            </div>

            {/* RIGHT COLUMN: Sidebar (35%) */}
            <div className="md:col-span-4 space-y-6">
              {/* Media Preview */}
              <div className="relative w-full rounded-2xl overflow-hidden border border-white/10 bg-neutral-950 aspect-video shadow-lg">
                <div
                  className="absolute inset-0 bg-cover bg-center"
                  style={{ backgroundImage: `url(${project.image})` }}
                />
              </div>

              {/* Tech Stack */}
              <div className="p-5 rounded-2xl bg-neutral-900 border border-white/5 space-y-3">
                <h4 className="text-[10px] font-mono tracking-wider text-neutral-500 uppercase font-bold">
                  Technology Stack
                </h4>
                <div className="flex flex-wrap gap-1.5">
                  {project.technologies?.map((tech: string) => (
                    <span
                      key={tech}
                      className="px-2.5 py-1 rounded bg-neutral-950 border border-white/5 text-neutral-300 font-mono text-[9px] font-bold uppercase tracking-wider"
                    >
                      {tech}
                    </span>
                  ))}
                </div>
              </div>
            </div>

          </div>
        </div>

        {/* Footer Actions */}
        <div className="px-6 py-5 bg-neutral-950 border-t border-white/5 flex justify-end gap-3 shrink-0 z-20">
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
          {project.actionButtons?.livePreview?.enabled !== false && (
            <button
              onClick={() => {
                if (project.liveUrl) {
                  window.open(project.liveUrl, '_blank', 'noopener,noreferrer');
                } else {
                  triggerToast("Project Deployment In Progress // Live Demo Available Soon");
                }
              }}
              className="px-5 py-2.5 rounded-xl text-neutral-950 text-xs font-mono font-black uppercase tracking-widest transition-all cursor-pointer flex items-center gap-2 shadow-lg hover:brightness-110"
              style={{ backgroundColor: accentColor, boxShadow: `0 0 15px ${accentColor}40` }}
            >
              <ExternalLink className="w-4 h-4" />
              Live Preview
            </button>
          )}
        </div>
      </motion.div>
    </div>,
    document.body
  );
}

export default function ProjectsPage() {
  const [badge] = useState('BUILDS + SCALABLE DEPLOYMENTS');
  const [heading] = useState('PROJECTS THAT SOLVE REAL PROBLEMS');
  const [subtext] = useState('AI systems, scalable platforms, and interactive experiences engineered to solve real-world problems.');
  
  const [projectsList, setProjectsList] = useState<any[]>([]);
  const [selectedProject, setSelectedProject] = useState<any | null>(null);

  // Toast notification state
  const [showToast, setShowToast] = useState(false);
  const [toastMessage, setToastMessage] = useState('');

  const triggerToast = (message: string) => {
    setToastMessage(message);
    setShowToast(true);
  };

  useEffect(() => {
    if (showToast) {
      const timer = setTimeout(() => {
        setShowToast(false);
      }, 3000);
      return () => clearTimeout(timer);
    }
  }, [showToast]);

  const hydrateProjects = (sec: any) => {
    if (!sec) return;
    if (sec.projects) {
      const mapped = sec.projects.map((p: any) => ({
        id: p.id,
        title: p.title || 'NEW SHOWCASE PROJECT',
        slug: p.slug || (p.title ? p.title.toLowerCase().replace(/[^a-z0-9]+/g, '-') : 'creative-blueprint'),
        category: p.category || 'FULL STACK',
        status: p.status || (p.featured ? 'Featured' : 'Live'),
        image: p.image || p.imageUrl || p.thumbnail || '',
        heroBanner: p.heroBanner || p.image || p.imageUrl || '',
        modalPreviewMedia: p.modalPreviewMedia || p.videoPreview || p.image || p.imageUrl || '',
        gradientAccent: p.gradientAccent || '#f97316',
        description: p.description || 'A brief conversational summary of the project.',
        problemStatement: p.problemStatement || '',
        solution: p.solution || '',
        keyFeatures: p.keyFeatures || [],
        challengesLearning: p.challengesLearning || '',
        futureEnhancements: p.futureEnhancements || [],
        technologies: p.technologies || p.techStack || ['React', 'Node.js', 'PostgreSQL'],
        actionButtons: p.actionButtons || {
          sourceCode: { enabled: true, url: p.githubUrl || 'https://github.com' },
          livePreview: { enabled: true, url: p.liveUrl || p.demoUrl || '' }
        },
        visible: p.visible !== false,
        order: p.order || 1
      }));
      setProjectsList(mapped);
    }
  };

  useEffect(() => {
    const fetchProjects = async () => {
      try {
        const res = await axios.get(`${import.meta.env.VITE_API_BASE_URL || 'http://localhost:5000'}/api/portfolio/slug/mahi`);
        if (res.data.data && res.data.data.projectsSection) {
          hydrateProjects(res.data.data.projectsSection);
        } else if (res.data.data && res.data.data.projects) {
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

  const projectSourceList = projectsList.length > 0 ? projectsList : portfolioData.projects;
  const filteredProjects = projectSourceList.filter(p => p.visible !== false);

  return (
    <Section id="projects-page" title={heading} subtitle={badge}>
      <div 
        className="relative w-full overflow-hidden border border-white/10 select-none shadow-[0_30px_60px_rgba(0,0,0,0.4)] transition-all duration-500 p-4 sm:p-6 md:p-9 lg:p-12 rounded-[32px] bg-neutral-900/30 backdrop-blur-xl"
      >
        {/* Matte dark surface background with faint subtle grids */}
        <div className="absolute inset-0 -z-10 overflow-hidden rounded-[32px]">
          <div 
            className="absolute inset-0 transition-opacity duration-500"
            style={{ 
              background: 'radial-gradient(circle_800px_at_50%_-100px,rgba(251,146,60,0.08),transparent)',
              opacity: 1
            }} 
          />
          <div 
            className="absolute inset-0 pointer-events-none opacity-[0.04]"
            style={{
              backgroundImage: `linear-gradient(to right, rgba(255, 255, 255, 0.4) 1px, transparent 1px), linear-gradient(to bottom, rgba(255, 255, 255, 0.4) 1px, transparent 1px)`,
              backgroundSize: '32px 32px'
            }}
          />
        </div>

        <div className="space-y-6 sm:space-y-10 relative z-10 text-left">
          {/* Header */}
          <div className="flex flex-col gap-4 pb-4 md:pb-6 border-b border-white/5">
            <div className="space-y-2">
              <span className="text-[9px] font-mono tracking-widest text-orange-400 font-extrabold uppercase">
                // Interactive Project Showcase
              </span>
              <h3 className="text-xl md:text-2xl font-black text-white uppercase tracking-tight font-display">
                Selected Works
              </h3>
              <p className="text-neutral-400 text-xs md:text-sm font-light font-sans max-w-xl">
                {subtext}
              </p>
            </div>
          </div>

          {/* 3-Column Showcase Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 max-w-6xl mx-auto gap-6 items-stretch transition-all duration-500">
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
                    triggerToast={triggerToast}
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
            triggerToast={triggerToast}
          />
        )}
      </AnimatePresence>

      {/* Premium Glassmorphic Toast Notification */}
      {createPortal(
        <AnimatePresence>
          {showToast && (
            <motion.div
              initial={{ opacity: 0, y: 50, scale: 0.9 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: 25, scale: 0.9 }}
              className="fixed bottom-6 left-1/2 -translate-x-1/2 md:left-auto md:right-6 md:translate-x-0 z-[100000] px-6 py-4 rounded-2xl bg-neutral-950/80 border border-white/10 shadow-2xl backdrop-blur-xl flex items-center justify-center md:justify-start gap-3 font-sans select-none w-[90%] max-w-sm sm:w-auto text-center"
              style={{ boxShadow: '0 10px 40px -10px rgba(0,0,0,0.7)' }}
            >
              <div className="w-2 h-2 rounded-full bg-orange-500 animate-pulse" />
              <span className="text-xs font-mono font-bold tracking-wider text-neutral-300 uppercase">
                {toastMessage}
              </span>
            </motion.div>
          )}
        </AnimatePresence>,
        document.body
      )}
    </Section>
  );
}

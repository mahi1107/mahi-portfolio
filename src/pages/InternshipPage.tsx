import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import axios from 'axios';
import { io } from 'socket.io-client';
import Section from '../components/shared/Section';
import { 
  Briefcase, Star, MapPin, Calendar, CheckCircle2, ShieldCheck, 
  Award, Zap, ArrowRight, Eye, Sparkles, BookOpen, Quote
} from 'lucide-react';

interface Internship {
  id: string;
  company: string;
  role: string;
  duration: string;
  location: string;
  workMode: string;
  employmentType?: string;
  summary: string;
  metrics?: string[];
  technologies?: string[];
  bannerImage?: string;
  galleryImages?: string[];
  featured?: boolean;
  accentColor?: string;
  visible?: boolean;
  offerLetterUrl?: string;
  caseStudyUrl?: string;
  order?: number;
}

export default function InternshipPage() {
  const [badge, setBadge] = useState('ENGINEERING MILESTONES');
  const [heading, setHeading] = useState('EXPERIENCE STORY');
  const [description, setDescription] = useState(
    'Hands-on engineering experience across product development, backend systems, AI workflows, and modern web platforms.'
  );

  const [internshipsList, setInternshipsList] = useState<Internship[]>([]);
  const [selectedInternId, setSelectedInternId] = useState<string | null>(null);

  // Load from DB
  const hydrateInternships = (sec: any) => {
    if (!sec) return;
    if (sec.badge) setBadge(sec.badge);
    if (sec.heading) setHeading(sec.heading);
    if (sec.description) setDescription(sec.description);
    
    if (sec.internships) {
      const list = sec.internships.filter((item: any) => item.visible !== false);
      setInternshipsList(list);

      // Pre-select the featured internship or the first one
      const featured = list.find((item: any) => item.featured);
      if (featured) {
        setSelectedInternId(featured.id);
      } else if (list.length > 0) {
        setSelectedInternId(list[0].id);
      }
    }
  };

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const res = await axios.get(`${import.meta.env.VITE_API_BASE_URL || 'http://localhost:5000'}/api/portfolio/slug/mahi`);
        if (res.data?.data?.profile?.internshipsSection) {
          hydrateInternships(res.data.data.profile.internshipsSection);
        } else if (res.data?.data?.internships) {
          hydrateInternships({ internships: res.data.data.internships });
        }
      } catch (err) {
        console.error('Failed to fetch dynamic internships:', err);
      }
    };
    fetchProfile();
  }, []);

  useEffect(() => {
    const socket = io(import.meta.env.VITE_API_BASE_URL || 'http://localhost:5000');
    socket.emit('portfolio:join', 'mahi');

    socket.on('internships:updated', (payload: any) => {
      console.log('⚡ Live experience sync in MS frontend:', payload);
      if (payload.internshipsSection) {
        hydrateInternships(payload.internshipsSection);
      }
    });

    return () => {
      socket.disconnect();
    };
  }, []);

  const activeIntern = internshipsList.find((i) => i.id === selectedInternId) || internshipsList[0];

  // Group years for timeline
  const groupTimelineByYear = () => {
    const years: Record<string, Internship[]> = {};
    internshipsList.forEach((item) => {
      const yearMatch = item.duration.match(/\b(202\d)\b/);
      const year = yearMatch ? yearMatch[1] : '2025';
      if (!years[year]) {
        years[year] = [];
      }
      years[year].push(item);
    });
    return Object.entries(years).sort((a, b) => b[0].localeCompare(a[0]));
  };

  // Split summary into bullet responsibilities if it contains sentences, or return fallback
  const getResponsibilities = (summaryText: string) => {
    if (!summaryText) return [];
    return summaryText
      .split(/(?<=\.)\s+/)
      .map(s => s.trim())
      .filter(s => s.length > 5);
  };

  // Custom Personal Lessons Learned note per company
  const getLessonsLearned = (companyName: string) => {
    const name = companyName.toLowerCase();
    if (name.includes('google')) {
      return 'Working on production frontend systems taught me component architecture, scalability, collaboration, and engineering discipline.';
    }
    if (name.includes('tech scale') || name.includes('tech-scale')) {
      return 'Designing distributed backend modules taught me about connection pools, database horizontal scaling, caching strategies, and event stream reliability.';
    }
    if (name.includes('pixelcraft') || name.includes('pixel craft')) {
      return 'Deploying client dashboards built technical versatility in integrating cross-stack layers, managing secure authorization, and resolving asset load bottlenecks.';
    }
    return 'Working in active development teams built professional software standards, production debugging patterns, technical scalability metrics, and product-minded execution.';
  };

  return (
    <Section id="internship-page" title={heading} subtitle={badge}>
      <div className="relative w-full rounded-[32px] overflow-hidden border border-white/10 p-4 sm:p-6 md:p-10 select-none bg-neutral-950/35 backdrop-blur-2xl shadow-[0_30px_60px_rgba(0,0,0,0.5)]">
        
        {/* Ambient Grid overlay */}
        <div className="absolute inset-0 -z-10 pointer-events-none opacity-[0.02]" 
          style={{ 
            backgroundImage: `linear-gradient(to right, rgba(255,255,255,0.4) 1px, transparent 1px), linear-gradient(to bottom, rgba(255,255,255,0.4) 1px, transparent 1px)`,
            backgroundSize: '40px 40px' 
          }} 
        />
        <div className="absolute top-1/4 left-1/4 w-[500px] h-[500px] rounded-full bg-orange-500/5 blur-[120px] pointer-events-none animate-pulse -z-10" />

        <div className="space-y-8 md:space-y-12 relative z-10">

          {/* Hero Section Description */}
          <div className="text-left max-w-full md:max-w-2xl">
            <p className="text-neutral-400 text-sm md:text-base font-light leading-relaxed">
              {description}
            </p>
          </div>

          {/* Experience Timeline Section */}
          <div className="space-y-6 text-left">
            <span className="text-[10px] font-mono tracking-widest text-neutral-500 font-extrabold uppercase block">// CHRONOLOGICAL ROADMAP</span>

            <div className="relative md:border-l md:border-white/5 md:pl-8 space-y-8 py-2 max-w-3xl">
              {groupTimelineByYear().map(([year, items]) => (
                <div key={year} className="space-y-4">
                  {/* Timeline Year label */}
                  <div className="md:absolute md:-left-[14px] md:top-0 relative flex items-center justify-start md:justify-center bg-transparent md:bg-neutral-950 md:border md:border-white/15 px-0 md:px-2.5 py-0.5 rounded text-sm md:text-[10px] font-mono font-black text-white shadow-none md:shadow-md w-full md:w-auto uppercase tracking-widest mb-4 md:mb-0">
                    <span className="text-orange-400 mr-1 md:hidden">YEAR</span> {year}
                    <div className="flex-grow h-[1.5px] bg-gradient-to-r from-orange-500/40 via-orange-500/10 to-transparent ml-3 md:hidden" />
                  </div>

                  <div className="space-y-4 pt-2 md:pt-6">
                    {items.map((item) => {
                      const isSelected = item.id === selectedInternId;
                      return (
                        <motion.div
                          key={item.id}
                          onClick={() => setSelectedInternId(item.id)}
                          whileHover={{ x: 4 }}
                          className={`p-5 rounded-2xl border transition-all duration-300 cursor-pointer text-left relative group w-full ${
                            isSelected 
                              ? 'bg-gradient-to-r from-orange-500/10 to-transparent border-orange-500/25 shadow-[0_0_30px_rgba(251,146,60,0.05)]' 
                              : 'bg-neutral-900/20 border-white/5 hover:border-white/10'
                          }`}
                        >
                          {/* Active connector node */}
                          <div className={`hidden md:block absolute -left-[37px] top-1/2 -translate-y-1/2 w-3 h-3 rounded-full border bg-neutral-950 transition-all duration-300 ${
                            isSelected ? 'border-orange-400 shadow-[0_0_12px_#fb923c] scale-110' : 'border-white/10'
                          }`} />

                          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                            <div className="space-y-1">
                              <div className="flex items-center gap-2">
                                <span className={`text-[9px] font-mono tracking-widest font-extrabold uppercase ${
                                  isSelected ? 'text-orange-400' : 'text-neutral-500'
                                }`}>
                                  {item.company}
                                </span>
                                {item.featured && (
                                  <span className="text-[7px] font-mono font-black uppercase text-cyan-400 bg-cyan-500/10 border border-cyan-500/20 px-1.5 py-0.5 rounded leading-none flex items-center gap-0.5">
                                    <Star className="w-2.5 h-2.5 fill-cyan-400" /> FLAGSHIP
                                  </span>
                                )}
                              </div>
                              <h4 className="text-base font-extrabold text-white uppercase tracking-tight">
                                {item.role}
                              </h4>
                            </div>

                            <div className="text-left sm:text-right shrink-0">
                              <span className="text-xs font-mono text-zinc-400 block">{item.duration}</span>
                              <span className="text-[10px] text-zinc-500 block mt-0.5">{item.location} ({item.workMode})</span>
                            </div>
                          </div>
                        </motion.div>
                      );
                    })}
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Selected Internship Details Workspace */}
          <AnimatePresence mode="wait">
            {activeIntern ? (
              <motion.div
                key={activeIntern.id}
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -15 }}
                transition={{ duration: 0.4, ease: 'easeOut' }}
                className="space-y-12 pt-8 border-t border-white/5"
              >
                
                {/* Section: Selected Internship Details Panel */}
                <div className="p-6 md:p-8 rounded-[28px] border border-white/10 bg-neutral-950/60 relative overflow-hidden shadow-xl text-left">
                  <div className="absolute -inset-1 rounded-[29px] bg-gradient-to-br from-orange-500/5 to-transparent blur-xl opacity-60 pointer-events-none" />
                  
                  <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 relative z-10">
                    <div className="space-y-2">
                      <span className="text-[9px] font-mono font-bold text-orange-400 uppercase tracking-widest block">// SHOWCASING EXPERIENCE</span>
                      <h3 className="text-xl md:text-2xl font-black text-white uppercase tracking-tight leading-none font-display">
                        {activeIntern.role}
                      </h3>
                      <div className="flex flex-wrap gap-2 text-xs text-neutral-400 items-center font-mono mt-2">
                        <span className="font-extrabold text-white uppercase">{activeIntern.company}</span>
                        <span>•</span>
                        <span>{activeIntern.duration}</span>
                        <span>•</span>
                        <span>{activeIntern.location} ({activeIntern.workMode})</span>
                      </div>
                    </div>

                    {activeIntern.employmentType && (
                      <div className="px-4 py-2 bg-neutral-900 border border-white/10 rounded-xl text-xs font-mono font-bold text-zinc-300 uppercase shrink-0">
                        {activeIntern.employmentType}
                      </div>
                    )}
                  </div>
                </div>

                {/* Section: Work Showcase Gallery */}
                {activeIntern.galleryImages && activeIntern.galleryImages.length > 0 ? (
                  <div className="space-y-6 text-left">
                    <span className="text-[10px] font-mono tracking-widest text-neutral-500 font-extrabold uppercase block">// WORK SHOWCASE</span>
                    
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      {activeIntern.galleryImages.map((imgUrl, idx) => (
                        <div key={idx} className="relative group rounded-2xl border border-white/10 overflow-hidden bg-neutral-950 aspect-[16/10] md:aspect-video shadow-lg">
                          <img 
                            src={imgUrl} 
                            alt={`Work showcase screenshot ${idx + 1}`} 
                            className="w-full h-full object-cover grayscale brightness-90 group-hover:grayscale-0 group-hover:brightness-100 transition-all duration-500 ease-out"
                          />
                          <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none" />
                          <div className="absolute bottom-4 left-4 z-10 opacity-0 group-hover:opacity-100 transition-opacity duration-300 text-left font-mono">
                            <span className="text-[10px] font-extrabold text-orange-400 uppercase tracking-wider block">Production Snapshot</span>
                            <span className="text-[9px] text-zinc-300 uppercase">{activeIntern.company} Workspace</span>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                ) : activeIntern.bannerImage ? (
                  <div className="space-y-6 text-left">
                    <span className="text-[10px] font-mono tracking-widest text-neutral-500 font-extrabold uppercase block">// WORK SHOWCASE</span>
                    <div className="relative rounded-2xl border border-white/10 overflow-hidden bg-neutral-950 aspect-[21/9] max-w-4xl shadow-lg">
                      <img src={activeIntern.bannerImage} className="w-full h-full object-cover grayscale brightness-90 hover:grayscale-0 hover:brightness-100 transition-all duration-500" />
                      <div className="absolute inset-0 bg-gradient-to-t from-neutral-950/80 via-transparent to-transparent pointer-events-none" />
                    </div>
                  </div>
                ) : null}

                {/* Section: Responsibilities & Key Outcomes (2-Column Grid) */}
                <div className="grid grid-cols-1 md:grid-cols-12 gap-8 items-start">
                  
                  {/* Left Pane: Responsibilities (What I worked on) */}
                  <div className="md:col-span-7 space-y-4 text-left">
                    <span className="text-[10px] font-mono tracking-widest text-neutral-500 font-extrabold uppercase block">// WHAT I WORKED ON</span>
                    
                    <div className="p-6 rounded-2xl border border-white/5 bg-neutral-900/10 space-y-4 min-h-[220px]">
                      <ul className="space-y-3.5">
                        {getResponsibilities(activeIntern.summary).map((resp, idx) => (
                          <li key={idx} className="flex items-start gap-3 text-xs leading-relaxed text-neutral-300 font-sans font-light">
                            <span className="w-1.5 h-1.5 rounded-full bg-orange-400 shrink-0 mt-2" />
                            <span>{resp}</span>
                          </li>
                        ))}
                        {getResponsibilities(activeIntern.summary).length === 0 && (
                          <li className="text-xs text-neutral-500 font-light font-sans">{activeIntern.summary}</li>
                        )}
                      </ul>
                    </div>
                  </div>

                  {/* Right Pane: Key Outcomes */}
                  <div className="md:col-span-5 space-y-4 text-left">
                    <span className="text-[10px] font-mono tracking-widest text-neutral-500 font-extrabold uppercase block">// KEY OUTCOMES</span>

                    <div className="grid grid-cols-1 gap-3.5">
                      {activeIntern.metrics && activeIntern.metrics.map((m, idx) => (
                        <div key={idx} className="p-5 md:p-4 rounded-xl border border-white/5 bg-neutral-900/10 flex items-center gap-3.5 hover:border-white/10 transition-all duration-300">
                          <div className="w-8 h-8 rounded-lg bg-neutral-950 border border-white/5 flex items-center justify-center text-orange-400 shrink-0">
                            <Zap className="w-4 h-4" />
                          </div>
                          <span className="text-xs font-mono font-bold text-white uppercase leading-snug">{m}</span>
                        </div>
                      ))}
                      {(!activeIntern.metrics || activeIntern.metrics.length === 0) && (
                        <div className="p-4 rounded-xl border border-white/5 bg-neutral-900/10 text-center">
                          <span className="text-xs text-neutral-500">No telemetry outcomes configured.</span>
                        </div>
                      )}
                    </div>
                  </div>

                </div>

                {/* Section: Internship Certificate & Recommendation Note (2-Column Grid) */}
                <div className="grid grid-cols-1 md:grid-cols-12 gap-8 items-stretch">
                  
                  {/* Left: Certificate Verification */}
                  <div className="md:col-span-6 space-y-4 text-left flex flex-col">
                    <span className="text-[10px] font-mono tracking-widest text-neutral-500 font-extrabold uppercase block">// INTERNSHIP CERTIFICATE</span>
                    
                    <div className="p-6 rounded-2xl border border-white/5 bg-neutral-900/10 flex-1 flex flex-col justify-between space-y-6">
                      <div className="space-y-4">
                        <div className="flex items-center gap-3">
                          <div className="w-10 h-10 rounded-xl bg-neutral-950 border border-white/5 flex items-center justify-center text-orange-400">
                            <Award className="w-5 h-5" />
                          </div>
                          <div>
                            <h4 className="text-xs font-black text-white uppercase tracking-wider">Completion Certificate</h4>
                            <span className="text-[9px] font-mono text-zinc-500 block uppercase">Verification Registry</span>
                          </div>
                        </div>

                        <div className="space-y-2.5 pt-2 font-mono text-[10px] text-zinc-400">
                          <div className="flex justify-between border-b border-white/[0.03] pb-1.5">
                            <span>ISSUED BY:</span>
                            <span className="text-white font-bold uppercase">{activeIntern.company}</span>
                          </div>
                          <div className="flex justify-between border-b border-white/[0.03] pb-1.5">
                            <span>ISSUE DATE:</span>
                            <span className="text-white">{activeIntern.duration.split(' - ')[1] || 'July 2025'}</span>
                          </div>
                          <div className="flex justify-between">
                            <span>STATUS:</span>
                            <span className="text-emerald-400 font-bold uppercase flex items-center gap-1">
                              <ShieldCheck className="w-3.5 h-3.5" /> Verified
                            </span>
                          </div>
                        </div>
                      </div>

                      {activeIntern.offerLetterUrl && (
                        <a
                          href={activeIntern.offerLetterUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="w-full max-w-xs mx-auto md:max-w-none md:w-full flex items-center justify-center gap-2 py-3 bg-orange-500 hover:bg-orange-600 text-neutral-950 font-black text-[10px] tracking-widest uppercase rounded-xl transition-colors shadow-md cursor-pointer"
                        >
                          <Eye className="w-4 h-4 text-neutral-950" />
                          <span>Preview Credentials</span>
                        </a>
                      )}
                    </div>
                  </div>

                  {/* Right: Recommendation / Experience Lessons Note */}
                  <div className="md:col-span-6 space-y-4 text-left flex flex-col">
                    <span className="text-[10px] font-mono tracking-widest text-neutral-500 font-extrabold uppercase block">// RECOMMENDATION & REFLECTION</span>

                    <div className="p-6 rounded-2xl border border-white/5 bg-gradient-to-br from-neutral-950/40 via-neutral-950/80 to-neutral-950 flex-1 flex flex-col justify-between space-y-6 relative overflow-hidden group">
                      <div className="absolute top-0 right-0 p-3 text-white/[0.02] group-hover:text-orange-500/[0.03] transition-colors pointer-events-none">
                        <Quote className="w-24 h-24 rotate-180" />
                      </div>

                      <div className="space-y-4 relative z-10">
                        <div className="flex items-center gap-2">
                          <BookOpen className="w-4 h-4 text-orange-400" />
                          <span className="text-[9px] font-mono font-bold tracking-widest uppercase text-neutral-500">WHAT I LEARNED</span>
                        </div>

                        <p className="text-neutral-350 text-xs font-light leading-relaxed font-sans italic">
                          "{getLessonsLearned(activeIntern.company)}"
                        </p>
                      </div>

                      <div className="relative z-10 flex items-center gap-2.5 pt-3 border-t border-white/[0.03] font-mono text-[9px] text-zinc-500">
                        <CheckCircle2 className="w-3.5 h-3.5 text-orange-400" />
                        <span>Professional growth competency certified</span>
                      </div>
                    </div>
                  </div>

                </div>

              </motion.div>
            ) : null}
          </AnimatePresence>

        </div>
      </div>
    </Section>
  );
}

import React, { useRef, useState, useEffect } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import axios from 'axios';
import { io } from 'socket.io-client';
import Section from '../components/shared/Section';
import {
  GraduationCap,
  Code,
  Sparkles,
  Trophy,
  CheckCircle2,
  Terminal,
  Activity,
  TrendingUp,
  Milestone,
  Play,
  Server,
  Cpu,
  Rocket,
  Target
} from 'lucide-react';

const colorMap: Record<string, { bg: string, border: string, text: string, hex: string }> = {
  blue: {
    bg: "bg-blue-500/10",
    border: "border-blue-500/20",
    text: "text-blue-400",
    hex: "#3b82f6"
  },
  orange: {
    bg: "bg-orange-500/10",
    border: "border-orange-500/20",
    text: "text-orange-400",
    hex: "#fb923c"
  },
  purple: {
    bg: "bg-purple-500/10",
    border: "border-purple-500/20",
    text: "text-purple-400",
    hex: "#a855f7"
  },
  green: {
    bg: "bg-emerald-500/10",
    border: "border-emerald-500/20",
    text: "text-emerald-400",
    hex: "#10b981"
  }
};

const getIcon = (iconName: string, colorClass: string) => {
  const classes = `w-5 h-5 ${colorClass}`;
  switch (iconName) {
    case 'GraduationCap':
      return <GraduationCap className={classes} />;
    case 'Code':
      return <Code className={classes} />;
    case 'Server':
      return <Server className={classes} />;
    case 'Cpu':
      return <Cpu className={classes} />;
    case 'Rocket':
      return <Rocket className={classes} />;
    case 'Target':
      return <Target className={classes} />;
    default:
      return <GraduationCap className={classes} />;
  }
};

export default function JourneyPage() {
  const containerRef = useRef<HTMLDivElement>(null);
  const [hoveredIdx, setHoveredIdx] = useState<number | null>(null);

  const [badge, setBadge] = useState('ASCENDING JOURNEY');
  const [heading, setHeading] = useState('MY TECHNICAL EVOLUTION');
  const [description, setDescription] = useState(
    'An interactive roadmap charting my growth from learning computer science fundamentals to building highly scalable full-stack applications and intelligent AI networks.'
  );

  const [destination, setDestination] = useState<any>({
    show: true,
    statusLabel: "🥇 THE SUMMIT / GOAL",
    mainGoal: "AI + FULL STACK SYSTEMS",
    description: "Scaling technical capabilities in distributed computing architecture, secure Docker containers, AWS deployment frameworks, and multi-agent system design models.",
    skills: ["AWS Infrastructure", "Docker Containers", "Distributed Systems", "Advanced AI Agents"]
  });

  const [milestones, setMilestones] = useState<any[]>([
    {
      id: 'm-1',
      year: '2023',
      phaseName: 'COMPUTER SCIENCE FOUNDATION',
      title: 'B.Tech CSE Journey Begins',
      badgeText: '🎓 Academic Foundation',
      description: 'Started B.Tech in Computer Science Engineering at Parul University. Built strong fundamentals in programming, data structures, algorithms, DBMS, and computer networks.',
      skills: [
        'C',
        'C++',
        'Java',
        'Data Structures',
        'Algorithms',
        'DBMS',
        'Computer Networks'
      ],
      icon: 'GraduationCap',
      colorTheme: 'blue',
      order: 1
    },
    {
      id: 'm-2',
      year: '2024-2025',
      phaseName: 'SKILL DEVELOPMENT & CERTIFICATIONS',
      title: 'Technical Growth & Industry Learning',
      badgeText: '🏅 Certified Learner',
      description: 'Expanded technical expertise through industry-recognized certifications while strengthening software development and networking concepts.',
      skills: [
        'Computer Networks',
        'SQL',
        'Problem Solving',
        'Git',
        'GitHub',
        'Software Engineering'
      ],
      achievementText: 'NPTEL Computer Networks Certification',
      achievementId: 'nptel-computer-networks',
      icon: 'Award',
      colorTheme: 'orange',
      order: 2
    },
    {
      id: 'm-3',
      year: '2025',
      phaseName: 'AI & HACKATHON EXCELLENCE',
      title: 'AI Innovation & Competitive Success',
      badgeText: '🏆 Runner-Up',
      description: 'Explored Artificial Intelligence through IBM SkillsBuild, AWS Academy, and Tata GenAI programs. Achieved Runner-Up position at Vadodara Hackathon 6.0 among 720+ teams while building innovative real-world solutions.',
      skills: [
        'Artificial Intelligence',
        'Generative AI',
        'AWS',
        'Prompt Engineering',
        'REST APIs',
        'Full Stack Development'
      ],
      achievementText: 'Runner-Up - Vadodara Hackathon 6.0 (Top 45 out of 720+ Teams)',
      achievementId: 'hackathon-runner-up',
      icon: 'Trophy',
      colorTheme: 'purple',
      order: 3
    },
    {
      id: 'm-4',
      year: '2026',
      phaseName: 'FULL STACK & AI PROJECTS',
      title: 'Building Scalable Intelligent Systems',
      badgeText: '🚀 Project Builder',
      description: 'Developed impactful projects including TraveLoop, Accident Hotspot Detection System, and VaaniDoc while applying AI, analytics, and full-stack engineering principles.',
      skills: [
        'React.js',
        'Next.js',
        'Node.js',
        'Flask',
        'MongoDB',
        'PostgreSQL',
        'Python',
        'AI Systems'
      ],
      achievementText: '50,000+ Accident Records Processed & Multiple AI Projects Developed',
      achievementId: 'project-achievement',
      icon: 'Rocket',
      colorTheme: 'cyan',
      order: 4
    }

  ]);

  const hydrateJourney = (sec: any) => {
    if (!sec) return;
    if (sec.badge) setBadge(sec.badge);
    if (sec.heading) setHeading(sec.heading);
    if (sec.description) setDescription(sec.description);

    if (sec.destination) setDestination(sec.destination);
    if (sec.milestones) {
      const sorted = [...sec.milestones].sort((a: any, b: any) => (a.order || 0) - (b.order || 0));
      setMilestones(sorted);
    }
  };

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const res = await axios.get(`${import.meta.env.VITE_API_BASE_URL || 'http://localhost:5000'}/api/portfolio/slug/mahi`);
        if (res.data?.data?.profile?.journeySection) {
          hydrateJourney(res.data.data.profile.journeySection);
        }
      } catch (err) {
        console.error('Failed to fetch dynamic journey:', err);
      }
    };
    fetchProfile();
  }, []);

  useEffect(() => {
    const socket = io(import.meta.env.VITE_API_BASE_URL || 'http://localhost:5000');
    socket.emit('portfolio:join', 'mahi');

    socket.on('journey:updated', (payload: any) => {
      console.log('⚡ Live journey sync in MS frontend:', payload);
      if (payload) {
        hydrateJourney(payload);
      }
    });

    return () => {
      socket.disconnect();
    };
  }, []);

  // Bind scrolling to traveler climb progress
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start center", "end center"]
  });

  // Calculate top offset and height path drawing
  const pathHeight = useTransform(scrollYProgress, [0, 1], ["0%", "100%"]);
  const orbY = useTransform(scrollYProgress, [0, 1], ["0%", "100%"]);

  return (
    <div className="min-h-screen w-full relative bg-transparent">
      {/* Blueprint Grid Overlay Motif */}
      <div
        className="absolute inset-0 pointer-events-none opacity-[0.03] z-0 bg-grid-pattern"
        style={{ backgroundSize: '40px 40px' }}
      />

      <div ref={containerRef} className="w-full relative z-10 pt-24 sm:pt-24 md:pt-24 pb-20 max-w-7xl mx-auto px-6">

        {/* Dynamic cinematic Section Header */}
        <Section
          id="journey-page"
          title={heading}
          subtitle={badge}
          className="bg-transparent py-0 md:py-0 mb-8 sm:mb-16"
        >
          <div className="text-left max-w-xl">
            <p className="text-neutral-400 text-sm font-light leading-relaxed">
              {description}
            </p>
          </div>
        </Section>

        {/* Dynamic Climb Roadmap Canvas */}
        <div className="relative max-w-4xl mx-auto py-4 sm:py-12 select-none">

          {/* THE START NODE (At the top of the path) */}
          <div className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-8 z-20 flex flex-col items-center">
            <div className="px-3 py-1 text-[9px] font-mono font-bold tracking-widest uppercase bg-neutral-900 border border-neutral-800 text-neutral-500 rounded-full shadow-lg">
              START
            </div>
            <div className="w-1.5 h-1.5 rounded-full bg-neutral-800 mt-2" />
          </div>

          {/* ACTIVE GLOWING PROGRESS PATH LINE */}
          <div className="absolute left-1/2 top-4 bottom-24 w-[2px] bg-neutral-900/60 -translate-x-1/2 z-0">
            <motion.div
              className="absolute top-0 left-0 w-full bg-gradient-to-b from-orange-400 via-amber-500 to-orange-600 transition-all duration-300"
              style={{
                height: pathHeight,
                boxShadow: hoveredIdx !== null
                  ? '0 0 24px #fb923c, 0 0 45px rgba(251,146,60,0.6)'
                  : '0 0 12px #fb923c'
              }}
            />

            {/* PULSING CYBER CLIMBER ORB */}
            <motion.div
              className="absolute -left-[7px] w-4 h-4 rounded-full bg-orange-400 border-2 border-white flex items-center justify-center -translate-y-1/2 z-30 transition-all duration-300"
              style={{
                top: orbY,
                transform: hoveredIdx !== null
                  ? 'translateY(-50%) scale(1.35)'
                  : 'translateY(-50%) scale(1)',
                boxShadow: hoveredIdx !== null
                  ? '0 0 25px #fb923c, 0 0 45px rgba(251,146,60,0.7)'
                  : '0 0 15px #fb923c'
              }}
            >
              <span className={`w-2 h-2 rounded-full bg-neutral-950 opacity-75 ${hoveredIdx !== null ? 'animate-none scale-150' : 'animate-ping'}`} />
              <span className="absolute w-1.5 h-1.5 rounded-full bg-neutral-950" />
            </motion.div>
          </div>

          {/* CLEAN CENTERED TIMELINE CARDS */}
          <div className="space-y-16">
            {milestones.map((item, idx) => {
              const colorData = colorMap[item.colorTheme] || colorMap.blue;

              return (
                <div
                  key={item.id || idx}
                  className="relative flex flex-col w-full items-center"
                >
                  {/* Timeline Intersection Node */}
                  <div className="absolute left-1/2 -translate-x-1/2 top-0 z-10">
                    <motion.div
                      whileInView={{ scale: [0.8, 1.1, 1], opacity: 1 }}
                      viewport={{ once: true }}
                      initial={{ scale: 0.5, opacity: 0 }}
                      transition={{ duration: 0.4, delay: idx * 0.1 }}
                      className="w-8 h-8 rounded-full bg-neutral-950 border border-neutral-800 flex items-center justify-center text-neutral-400 hover:border-orange-400 hover:text-orange-400 transition-colors cursor-pointer shadow-lg shadow-black/80"
                    >
                      {getIcon(item.icon, colorData.text)}
                    </motion.div>
                  </div>

                  {/* Centered Card */}
                  <div className="w-full max-w-2xl pt-12">
                    <motion.div
                      onMouseEnter={() => setHoveredIdx(idx)}
                      onMouseLeave={() => setHoveredIdx(null)}
                      initial={{ opacity: 0, y: 30 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      viewport={{ once: true, margin: "-80px" }}
                      transition={{ duration: 0.6, cubicBezier: [0.16, 1, 0.3, 1] }}
                      whileHover={{ y: -4 }}
                      className="solid-card p-6 md:p-8 border border-neutral-900 bg-neutral-950/75 backdrop-blur-md shadow-2xl relative overflow-hidden group hover:border-neutral-800 transition-all duration-300 text-left"
                    >
                      {/* Sub-card top-level glow line */}
                      <div className="absolute top-0 left-0 w-full h-[1.5px] bg-gradient-to-r from-transparent via-orange-500/25 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />

                      {/* Header row: Year & Badge */}
                      <div className="flex justify-between items-start gap-4 mb-4">
                        <div>
                          {item.badgeText && (
                            <span className={`inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-[9px] font-extrabold uppercase tracking-widest ${colorData.bg} border ${colorData.border} ${colorData.text}`}>
                              {item.badgeText}
                            </span>
                          )}
                          <span className="block text-[10px] font-mono tracking-widest text-neutral-500 uppercase mt-1.5">
                            {item.phaseName}
                          </span>
                        </div>
                        <span className={`text-xl font-mono font-black text-neutral-500 group-hover:${colorData.text} transition-colors`}>
                          {item.year}
                        </span>
                      </div>

                      {/* Details */}
                      <div className="space-y-3">
                        <h3 className="text-base md:text-lg font-bold text-white uppercase tracking-tight leading-snug">
                          {item.title}
                        </h3>
                        <p className="text-neutral-400 text-xs md:text-sm font-light leading-relaxed">
                          {item.description}
                        </p>
                      </div>

                      {/* Unlocked Skills Section */}
                      {item.skills && item.skills.length > 0 && (
                        <div className="mt-5 pt-4 border-t border-neutral-900/60">
                          <span className="text-[9px] font-mono tracking-widest text-neutral-500 font-extrabold uppercase block mb-2.5">
                            ✓ Skills Unlocked
                          </span>
                          <div className="flex flex-wrap gap-1.5">
                            {item.skills.map((skill: string, sIdx: number) => (
                              <span
                                key={sIdx}
                                className="px-2 py-0.5 rounded text-[10px] font-mono bg-neutral-900 border border-neutral-800/80 text-neutral-400 hover:text-white transition-colors"
                              >
                                {skill}
                              </span>
                            ))}
                          </div>
                        </div>
                      )}

                      {/* Achievement Unlocked Capsule */}
                      {item.achievementId && item.achievementId !== 'none' && (
                        <div className="mt-4 flex items-center gap-2 px-3 py-2 rounded-lg bg-neutral-900/40 border border-neutral-900 font-mono text-[9px] font-medium text-neutral-450">
                          <Trophy className="w-3.5 h-3.5 text-amber-505 shrink-0" style={{ color: colorData.hex }} />
                          <span className="line-clamp-1 text-zinc-400">{item.achievementText || "Attached Credential Milestone"}</span>
                        </div>
                      )}

                    </motion.div>
                  </div>
                </div>
              );
            })}
          </div>

          {/* THE SUMMIT CLOSURE CARD: CURRENT GOALS */}
          {destination && destination.show && (
            <motion.div
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.7, delay: 0.2 }}
              className="mt-20 w-full max-w-xl mx-auto relative z-20 text-center"
            >
              {/* Pulsing Intersection Node */}
              <div className="absolute left-1/2 -translate-x-1/2 -top-10 z-10 md:block hidden">
                <span className="relative flex h-3 w-3">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-orange-400 opacity-75"></span>
                  <span className="relative inline-flex rounded-full h-3 w-3 bg-orange-500"></span>
                </span>
              </div>

              {/* Glowing Summit Card */}
              <div
                onMouseEnter={() => setHoveredIdx(99)}
                onMouseLeave={() => setHoveredIdx(null)}
                className="solid-card p-6 md:p-8 border border-orange-500/25 bg-gradient-to-br from-orange-950/10 via-neutral-950/90 to-neutral-950 hover:border-orange-500/40 transition-all duration-500 shadow-[0_20px_45px_rgba(0,0,0,0.6)] text-left relative overflow-hidden group"
              >
                {/* Active Ambient Spotlight */}
                <div className="absolute -inset-1 rounded-3xl bg-gradient-to-br from-orange-500/10 to-transparent blur-xl opacity-40 pointer-events-none group-hover:opacity-60 transition-all duration-500" />

                <div className="relative z-10 space-y-4">
                  <div className="flex items-center justify-between">
                    <span className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-[9px] font-extrabold tracking-widest uppercase bg-orange-500/10 border border-orange-500/20 text-orange-400">
                      {destination.statusLabel || "🥇 THE SUMMIT / GOAL"}
                    </span>
                    <span className="text-[10px] font-mono font-bold text-neutral-500 uppercase tracking-widest">
                      ACTIVE NOW
                    </span>
                  </div>

                  <div className="space-y-2">
                    <h3 className="text-lg md:text-xl font-bold text-white uppercase tracking-tight">
                      CURRENTLY BUILDING:<br />
                      <span className="text-orange-400">{destination.mainGoal}</span>
                    </h3>
                    <p className="text-neutral-300 text-xs md:text-sm font-light leading-relaxed">
                      {destination.description}
                    </p>
                  </div>

                  {/* Current Focus Progress Metrics */}
                  <div className="space-y-3 pt-3 border-t border-neutral-900/60 select-none">
                    <span className="text-[9px] font-mono tracking-widest text-neutral-500 font-extrabold uppercase block">
                      ⚡ Current Focus Telemetry
                    </span>
                    <div className="space-y-2.5 text-[9px] font-mono text-zinc-400 text-left">

                      {/* Bar 1: AI Agents */}
                      <div className="space-y-1">
                        <div className="flex justify-between font-bold">
                          <span>AI AGENTS / MULTI-AGENT SWARMS</span>
                          <span className="text-orange-400">90%</span>
                        </div>
                        <div className="w-full h-1 bg-neutral-900 border border-neutral-800/80 rounded-full overflow-hidden">
                          <motion.div
                            initial={{ width: 0 }}
                            whileInView={{ width: '90%' }}
                            viewport={{ once: true }}
                            transition={{ duration: 1, delay: 0.1, ease: "easeOut" }}
                            className="h-full bg-orange-500 rounded-full"
                          />
                        </div>
                      </div>

                      {/* Bar 2: Cloud Architecture */}
                      <div className="space-y-1">
                        <div className="flex justify-between font-bold">
                          <span>CLOUD ARCHITECTURE / AWS DEPLOYMENT</span>
                          <span className="text-orange-400">80%</span>
                        </div>
                        <div className="w-full h-1 bg-neutral-900 border border-neutral-800/80 rounded-full overflow-hidden">
                          <motion.div
                            initial={{ width: 0 }}
                            whileInView={{ width: '80%' }}
                            viewport={{ once: true }}
                            transition={{ duration: 1, delay: 0.2, ease: "easeOut" }}
                            className="h-full bg-orange-500 rounded-full"
                          />
                        </div>
                      </div>

                      {/* Bar 3: System Design */}
                      <div className="space-y-1">
                        <div className="flex justify-between font-bold">
                          <span>SYSTEM DESIGN / DISTRIBUTED PIPELINES</span>
                          <span className="text-orange-400">70%</span>
                        </div>
                        <div className="w-full h-1 bg-neutral-900 border border-neutral-800/80 rounded-full overflow-hidden">
                          <motion.div
                            initial={{ width: 0 }}
                            whileInView={{ width: '70%' }}
                            viewport={{ once: true }}
                            transition={{ duration: 1, delay: 0.3, ease: "easeOut" }}
                            className="h-full bg-orange-500 rounded-full"
                          />
                        </div>
                      </div>

                    </div>
                  </div>

                  {/* Skills In Training */}
                  {destination.skills && destination.skills.length > 0 && (
                    <div className="pt-3 border-t border-neutral-900">
                      <span className="text-[9px] font-mono tracking-widest text-neutral-500 font-extrabold uppercase block mb-2">
                        ⚡ Skills In Action & Training
                      </span>
                      <div className="flex flex-wrap gap-1.5">
                        {destination.skills.map((skill: string, sIdx: number) => (
                          <span
                            key={sIdx}
                            className="px-2.5 py-0.5 rounded-full text-[9px] font-mono font-bold bg-orange-500/5 border border-orange-400/20 text-orange-400"
                          >
                            {skill}
                          </span>
                        ))}
                      </div>
                    </div>
                  )}
                </div>

              </div>
            </motion.div>
          )}

          {/* THE NEXT DESTINATION END NODE */}
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.3 }}
            className="mt-16 w-full max-w-xl mx-auto relative z-20 text-center flex flex-col items-center select-none"
          >
            <div className="w-1.5 h-10 bg-gradient-to-b from-orange-600 to-orange-500/20" />

            {/* Glowing ◉ Next Destination Indicator */}
            <div className="w-10 h-10 rounded-full bg-neutral-950 border border-orange-500 flex items-center justify-center text-orange-400 shadow-[0_0_20px_rgba(251,146,60,0.3)] my-2">
              <Rocket className="w-5 h-5 animate-pulse" />
            </div>

            <div className="solid-card p-5 border border-dashed border-orange-500/30 bg-neutral-950/90 text-center max-w-sm mt-3 space-y-1.5 relative overflow-hidden group shadow-lg">
              <div className="absolute inset-0 bg-orange-500/[0.01] pointer-events-none" />
              <div className="flex justify-between items-center text-[9px] font-mono font-bold tracking-widest text-orange-400 uppercase">
                <span>◉ NEXT DESTINATION</span>
                <span className="text-zinc-500">2026+</span>
              </div>
              <h4 className="text-xs font-black text-white uppercase tracking-tight leading-snug">
                Building Scalable AI Products for Real-World Users
              </h4>
            </div>
          </motion.div>

        </div>
      </div>
    </div>
  );
}

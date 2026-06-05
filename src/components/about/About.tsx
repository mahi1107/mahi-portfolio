import React from 'react';
import { motion } from 'framer-motion';
import { useOutletContext } from 'react-router-dom';
import Section from '../shared/Section';
import {
  GraduationCap,
  Code2,
  Sparkles,
  Activity,
  Trophy
} from 'lucide-react';
import { portfolioData } from '../../data/portfolioData';

export default function About() {
  const { brandIdentity } = useOutletContext<{ brandIdentity: any }>();
  const [activeAboutTab, setActiveAboutTab] = React.useState<'journey' | 'overview'>('journey');

  const aboutSectionConfig = brandIdentity?.aboutSection || {
    aboutHeading: "ABOUT",
    aboutMainText: "Building modern web applications with clean code, smart AI features, and user-friendly designs.",
    leftAccentLineColor: "#f97316"
  };

  const timelineMilestones = brandIdentity?.timeline || [
    {
      year: "2023",
      subtitle: "College Start",
      title: "Started B.Tech CSE",
      description: "Began my Computer Science degree. Focused on the basics of programming in C, C++ and Java, learning how databases work, and solving simple logic challenges.",
      activeDotColor: "#f97316"
    },
    {
      year: "2024",
      subtitle: "Building Websites",
      title: "Web Development",
      description: "Dived into web development. Learned how to build complete websites using React, Node.js, Express, and database systems with simple and clear designs.",
      activeDotColor: "#f97316"
    },
    {
      year: "2025",
      subtitle: "Smart Tools",
      title: "AI & Mapping Apps",
      description: "Started connecting AI models and maps to my web projects. Built a smart Accident Hotspot app that maps out high-risk traffic intersections in real time.",
      activeDotColor: "#f97316"
    },
    {
      year: "Current",
      subtitle: "Daily Practice",
      title: "Algorithms & Practice",
      description: "Currently practicing coding algorithms in Java, learning how to design solid systems, and building helpful projects.",
      activeDotColor: "#f97316"
    }
  ];

  const overviewCardConfig = brandIdentity?.overviewCard || {
    education: {
      degree: "B.Tech in Computer Science",
      university: "Parul University",
      duration: "2023 — 2027",
      grade: "8.37 CGPA"
    },
    focus: {
      focusHeading: "Current Focus",
      focusDescription: "Building responsive websites, studying AI integrations, and learning to write clean, efficient code."
    },
    techStack: ['Python', 'React.js', 'MongoDB', 'Java', 'AWS'],
    highlights: [
      { label: "College CGPA", value: "8.37" },
      { label: "Hackathon Rank", value: "Top 6%" },
      { label: "AWS Certified", value: "AWS" },
      { label: "Core Focus", value: "AI + Web" }
    ],
    availability: {
      availabilityText: "Available for projects and collaboration",
      availabilityEnabled: true
    }
  };

  const visuals = brandIdentity?.visualSettings || {
    primaryAccent: "#f97316",
    secondaryAccent: "#fb923c",
    glowColor: "rgba(251, 146, 60, 0.15)",
    cardGlassOpacity: 0.1
  };

  // Stagger animation container config
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.15,
        delayChildren: 0.1
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.6, ease: [0.16, 1, 0.3, 1] }
    }
  };

  const badgeStyles = {
    backgroundColor: `${visuals.primaryAccent}1a`,
    borderColor: `${visuals.primaryAccent}33`,
    color: visuals.primaryAccent
  };

  const iconBoxStyles = {
    backgroundColor: `${visuals.primaryAccent}1a`,
    borderColor: `${visuals.primaryAccent}33`,
    color: visuals.primaryAccent
  };

  return (
    <Section id="about" title={aboutSectionConfig.aboutHeading} subtitle="" className="relative">

      <motion.div
        variants={containerVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-100px" }}
        className="space-y-16 relative z-10 select-none text-left"
      >

        {/* ZONE 1: Large Intro Statement */}
        <motion.div
          variants={itemVariants}
          className="max-w-5xl border-l-2 pl-6 py-2"
          style={{ borderColor: aboutSectionConfig.leftAccentLineColor }}
        >
          <h3 className="text-2xl sm:text-3xl md:text-4xl lg:text-[40px] font-extrabold tracking-tight text-white leading-tight font-sans">
            {aboutSectionConfig.aboutMainText}
          </h3>
        </motion.div>

        {/* ZONE 2: Asymmetrical Two-Column Layout */}
        {/* Mobile Tab Selectors (hidden on desktop) */}
        <div className="flex lg:hidden gap-2 p-1 bg-white/5 border border-white/10 rounded-xl w-full max-w-sm mx-auto mb-8 font-mono select-none">
          <button
            onClick={() => setActiveAboutTab('journey')}
            className={`flex-1 py-2 text-center text-xs font-bold uppercase tracking-wider rounded-lg transition-all cursor-pointer ${activeAboutTab === 'journey'
              ? 'bg-neutral-900 border border-white/5 text-primary shadow'
              : 'text-neutral-500 hover:text-neutral-350'
              }`}
          >
            My Journey
          </button>
          <button
            onClick={() => setActiveAboutTab('overview')}
            className={`flex-1 py-2 text-center text-xs font-bold uppercase tracking-wider rounded-lg transition-all cursor-pointer ${activeAboutTab === 'overview'
              ? 'bg-neutral-900 border border-white/5 text-primary shadow'
              : 'text-neutral-500 hover:text-neutral-350'
              }`}
          >
            Overview
          </button>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-stretch max-w-[1400px] mx-auto">

          {/* LEFT SIDE: Story timeline (lg:col-span-8) */}
          <div className={`lg:col-span-8 space-y-8 relative ${activeAboutTab === 'journey' ? 'block' : 'hidden lg:block'}`}>
            {/* Timeline Label */}
            <div className="mb-4">
              <span className="text-[10px] font-bold uppercase tracking-widest font-mono px-3 py-1.5 rounded-md border" style={badgeStyles}>
                My Journey
              </span>
              <h4 className="text-xl font-bold text-white font-display mt-3">Timeline</h4>
            </div>

            {/* Vertical timeline connector lines */}
            <div className="relative pl-8 md:pl-12 space-y-12">
              <div
                className="absolute left-3.5 md:left-[22px] top-3 bottom-3 w-[1px]"
                style={{
                  backgroundImage: `linear-gradient(to bottom, ${visuals.primaryAccent}80, ${visuals.primaryAccent}1a, rgba(255, 255, 255, 0.05))`
                }}
              />

              {timelineMilestones.map((milestone: any, index: number) => (
                <motion.div
                  key={index}
                  variants={itemVariants}
                  whileHover="hover"
                  className="relative group text-left"
                >
                  {/* Timeline circular indicator with pulse glimmer */}
                  <div className="absolute -left-[33px] md:-left-[49px] top-1.5 flex items-center justify-center">
                    <div
                      className="w-3 h-3 rounded-full group-hover:scale-125 transition-transform duration-300 relative"
                      style={{ backgroundColor: milestone.activeDotColor || visuals.primaryAccent }}
                    >
                      <div
                        className="absolute -inset-1.5 rounded-full animate-ping group-hover:bg-orange-400/40 transition-colors"
                        style={{ backgroundColor: `${milestone.activeDotColor || visuals.primaryAccent}40` }}
                      />
                    </div>
                  </div>

                  {/* Editorial Milestone Item */}
                  <div className="space-y-2 border-b border-white/5 pb-8 group-hover:border-orange-500/20 transition-all duration-300">
                    <div className="flex flex-wrap items-baseline gap-3">
                      <span className="text-xl font-display font-black tracking-tight" style={{ color: visuals.primaryAccent }}>
                        {milestone.year}
                      </span>
                      <span className="text-[10px] text-neutral-500 font-bold uppercase tracking-widest font-mono">
                        {milestone.label || milestone.subtitle}
                      </span>
                    </div>

                    <h5 className="text-white font-bold text-lg font-sans tracking-tight leading-tight group-hover:text-orange-300 transition-colors duration-300">
                      {milestone.title}
                    </h5>

                    <p className="text-neutral-400 text-sm leading-relaxed font-light font-sans max-w-3xl">
                      {milestone.description}
                    </p>

                    {/* Subtle hover reveal line */}
                    <div
                      className="w-0 h-[1px] bg-gradient-to-r from-orange-400/60 to-transparent group-hover:w-1/3 transition-all duration-500 mt-2"
                      style={{
                        backgroundImage: `linear-gradient(to right, ${visuals.primaryAccent}99, transparent)`
                      }}
                    />
                  </div>
                </motion.div>
              ))}
            </div>
          </div>

          {/* RIGHT SIDE: Single Premium Feature Card (lg:col-span-4) */}
          <div className={`lg:col-span-4 flex flex-col justify-start ${activeAboutTab === 'overview' ? 'block' : 'hidden lg:block'}`}>
            <div className="mb-4">
              <span className="text-[10px] font-bold uppercase tracking-widest font-mono px-3 py-1.5 rounded-md border" style={badgeStyles}>
                Overview
              </span>
              <h4 className="text-xl font-bold text-white font-display mt-3">About Me</h4>
            </div>

            {/* ONE SINGLE FEATURE CARD ONLY */}
            <motion.div
              variants={itemVariants}
              whileHover={{ y: -4 }}
              className="solid-card p-7 border border-white/5 relative overflow-hidden group hover:border-orange-500/30 transition-all duration-500 shadow-2xl flex flex-col space-y-7 bg-[#111111]"
              style={{
                backgroundColor: `rgba(17, 17, 17, ${visuals.cardGlassOpacity || 0.1})`,
                borderColor: `${visuals.primaryAccent}15`,
                boxShadow: `0 10px 40px -10px ${visuals.glowColor || 'rgba(0,0,0,0.5)'}`
              }}
            >
              {/* Subtle visual glow accent on hover */}
              <div
                className="absolute -right-20 -top-20 w-40 h-40 rounded-full blur-2xl group-hover:bg-orange-500/10 transition-colors duration-500 pointer-events-none"
                style={{
                  background: `radial-gradient(circle, ${visuals.primaryAccent}0d 0%, transparent 70%)`
                }}
              />

              {/* Education Sub-Section */}
              <div className="space-y-3">
                <div className="flex items-center gap-2">
                  <div className="w-8 h-8 rounded-lg border flex items-center justify-center shadow-inner flex-shrink-0" style={iconBoxStyles}>
                    <GraduationCap className="w-4 h-4" />
                  </div>
                  <span className="text-[10px] text-neutral-400 font-bold uppercase tracking-widest font-mono">
                    Education
                  </span>
                </div>
                <div className="pl-10 space-y-1 text-left">
                  <h5 className="text-white font-extrabold text-sm tracking-wide">
                    {overviewCardConfig.education.degree}
                  </h5>
                  <p className="text-neutral-300 font-medium font-sans text-xs">{overviewCardConfig.education.university}</p>
                  <p className="text-neutral-500 font-extrabold text-[9px] uppercase font-mono tracking-wider pt-1">
                    {overviewCardConfig.education.duration} • Grade: {overviewCardConfig.education.grade}
                  </p>
                </div>
              </div>

              <div className="h-[1px] bg-white/5 w-full lg:hidden" />

              {/* Current Focus Sub-Section */}
              <div className="space-y-3">
                <div className="flex items-center gap-2">
                  <div className="w-8 h-8 rounded-lg border flex items-center justify-center shadow-inner flex-shrink-0" style={iconBoxStyles}>
                    <Sparkles className="w-4 h-4" />
                  </div>
                  <span className="text-[10px] text-neutral-400 font-bold uppercase tracking-widest font-mono">
                    My Focus
                  </span>
                </div>
                <div className="pl-10 text-left">
                  <h5 className="text-white font-extrabold text-sm tracking-wide mb-1">
                    {overviewCardConfig.focus.focusHeading}
                  </h5>
                  <p className="text-neutral-400 text-xs leading-relaxed font-light font-sans">
                    {overviewCardConfig.focus.focusDescription}
                  </p>
                </div>
              </div>

              <div className="h-[1px] bg-white/5 w-full lg:hidden" />

              {/* Toolchain Arsenal Sub-Section */}
              <div className="space-y-3">
                <div className="flex items-center gap-2">
                  <div className="w-8 h-8 rounded-lg border flex items-center justify-center shadow-inner flex-shrink-0" style={iconBoxStyles}>
                    <Code2 className="w-4 h-4" />
                  </div>
                  <span className="text-[10px] text-neutral-400 font-bold uppercase tracking-widest font-mono">
                    Tech Stack
                  </span>
                </div>
                <div className="pl-10 text-left">
                  <h5 className="text-white font-extrabold text-sm tracking-wide mb-2">
                    Technologies I Use
                  </h5>
                  <div className="flex flex-wrap gap-1.5">
                    {overviewCardConfig.techStack.map((tech: string) => (
                      <span
                        key={tech}
                        className="px-2.5 py-1 text-[9px] bg-[#090909] border border-white/5 rounded-full text-neutral-300 font-bold uppercase tracking-wider transition-all duration-300"
                        style={{
                          borderColor: 'rgba(255, 255, 255, 0.05)'
                        }}
                      >
                        {tech}
                      </span>
                    ))}
                  </div>
                </div>
              </div>

              <div className="h-[1px] bg-white/5 w-full lg:hidden" />

              {/* Key Highlights Sub-Section */}
              <div className="pt-5 border-t border-white/5 space-y-3">
                <div className="flex items-center gap-2">
                  <div className="w-8 h-8 rounded-lg border flex items-center justify-center shadow-inner flex-shrink-0" style={iconBoxStyles}>
                    <Trophy className="w-4 h-4" />
                  </div>
                  <span className="text-[10px] text-neutral-400 font-bold uppercase tracking-widest font-mono">
                    Key Highlights
                  </span>
                </div>
                <div className="pl-10 grid grid-cols-2 gap-4">
                  {overviewCardConfig.highlights.map((highlight: any, index: number) => {
                    const isOrange = index === 0;
                    return (
                      <div
                        key={index}
                        className="border-l-2 pl-3.5 space-y-0.5 group/stat"
                        style={{ borderColor: isOrange ? visuals.primaryAccent : 'rgba(255, 255, 255, 0.05)' }}
                      >
                        <span className="text-[9px] text-neutral-500 uppercase tracking-widest font-mono font-extrabold">{highlight.label}</span>
                        <h6
                          className="text-sm md:text-base font-black tracking-tight font-sans duration-300 group-hover/stat:scale-105 origin-left"
                          style={{ color: isOrange ? visuals.primaryAccent : '#ffffff' }}
                        >
                          {highlight.value}
                        </h6>
                      </div>
                    );
                  })}
                </div>
              </div>

              <div className="h-[1px] bg-white/5 w-full lg:hidden" />

              {/* Availability Sub-Section */}
              {overviewCardConfig.availability.availabilityEnabled && (
                <div className="pt-5 border-t border-white/5 space-y-2">
                  <div className="flex items-center gap-2">
                    <div className="w-8 h-8 rounded-lg border flex items-center justify-center shadow-inner flex-shrink-0" style={iconBoxStyles}>
                      <Activity className="w-4 h-4 animate-pulse" />
                    </div>
                    <span className="text-[10px] text-neutral-400 font-bold uppercase tracking-widest font-mono">
                      Availability
                    </span>
                  </div>
                  <div className="pl-10 text-left">
                    <p className="text-xs font-bold font-sans animate-pulse" style={{ color: visuals.primaryAccent }}>
                      {overviewCardConfig.availability.availabilityText}
                    </p>
                  </div>
                </div>
              )}

            </motion.div>

          </div>

        </div>

      </motion.div>
    </Section>
  );
}

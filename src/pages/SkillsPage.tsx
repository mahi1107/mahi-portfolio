import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Section from '../components/shared/Section';
import { Terminal, Layout, Cpu, Database, ArrowRight, Layers, Sparkles, Activity, Award, Code2, FolderGit2, BadgeAlert, Laptop, Smartphone, Sliders, Type, Palette } from 'lucide-react';
import axios from 'axios';
import { io } from 'socket.io-client';

const ICON_COMPONENT_MAP: Record<string, React.ComponentType<any>> = {
  Terminal, Layout, Cpu, Database, Layers, Sparkles, Activity, Award, Code2, FolderGit2, BadgeAlert, Laptop, Smartphone, Sliders, Type, Palette
};

function DynamicIcon({ name, className }: { name: string; className?: string }) {
  const Comp = ICON_COMPONENT_MAP[name] || Terminal;
  return <Comp className={className} />;
}

interface SkillNode {
  name: string;
  angle: number;
  ring: 1 | 2;
  bgGradient: string;
  borderClass: string;
  glowColor: string;
  glowHex: string;
  bulletBg: string;
  textColor: string;
}

const skillsList: SkillNode[] = [
  {
    name: "React.js",
    angle: 0,
    ring: 1,
    bgGradient: "from-[#00d8ff]/10 via-[#00517c]/5 to-black/60",
    borderClass: "border-[#00d8ff]/25 hover:border-[#00d8ff]/60",
    glowColor: "rgba(0, 216, 255, 0.35)",
    glowHex: "#00d8ff",
    bulletBg: "bg-[#00d8ff]",
    textColor: "text-[#bfefff] group-hover:text-[#00d8ff]"
  },
  {
    name: "Python",
    angle: 90,
    ring: 1,
    bgGradient: "from-[#ffd43b]/10 via-[#306998]/5 to-black/60",
    borderClass: "border-[#ffd43b]/25 hover:border-[#ffd43b]/60",
    glowColor: "rgba(255, 212, 59, 0.25)",
    glowHex: "#ffd43b",
    bulletBg: "bg-[#ffd43b]",
    textColor: "text-[#fff2b2] group-hover:text-[#ffd43b]"
  },
  {
    name: "Java",
    angle: 180,
    ring: 1,
    bgGradient: "from-[#f89820]/15 via-[#7a4c16]/5 to-black/60",
    borderClass: "border-[#f89820]/25 hover:border-[#f89820]/60",
    glowColor: "rgba(248, 152, 32, 0.3)",
    glowHex: "#f89820",
    bulletBg: "bg-[#f89820]",
    textColor: "text-[#ffe2bf] group-hover:text-[#f89820]"
  },
  {
    name: "MongoDB",
    angle: 270,
    ring: 1,
    bgGradient: "from-[#13aa52]/10 via-[#0a381c]/5 to-black/60",
    borderClass: "border-[#13aa52]/25 hover:border-[#13aa52]/60",
    glowColor: "rgba(19, 170, 82, 0.3)",
    glowHex: "#13aa52",
    bulletBg: "bg-[#13aa52]",
    textColor: "text-[#c2ffd9] group-hover:text-[#13aa52]"
  },
  {
    name: "AWS",
    angle: 45,
    ring: 2,
    bgGradient: "from-[#ff9900]/15 via-[#54360b]/5 to-black/60",
    borderClass: "border-[#ff9900]/25 hover:border-[#ff9900]/60",
    glowColor: "rgba(255, 153, 0, 0.3)",
    glowHex: "#ff9900",
    bulletBg: "bg-[#ff9900]",
    textColor: "text-[#ffe9cc] group-hover:text-[#ff9900]"
  },
  {
    name: "DSA",
    angle: 135,
    ring: 2,
    bgGradient: "from-[#fb923c]/10 via-[#7c2d12]/5 to-black/60",
    borderClass: "border-[#fb923c]/25 hover:border-[#fb923c]/60",
    glowColor: "rgba(251, 146, 60, 0.3)",
    glowHex: "#fb923c",
    bulletBg: "bg-[#fb923c]",
    textColor: "text-[#ffedd5] group-hover:text-[#fb923c]"
  },

  {
    name: "UI/UX",
    angle: 315,
    ring: 2,
    bgGradient: "from-[#a855f7]/10 via-[#5c2196]/5 to-black/60",
    borderClass: "border-[#a855f7]/25 hover:border-[#ec4899]/60",
    glowColor: "rgba(168, 85, 247, 0.3)",
    glowHex: "#a855f7",
    bulletBg: "bg-[#ec4899]",
    textColor: "text-[#fcd4ff] group-hover:text-[#ec4899]"
  }
];

interface SkillDetails {
  title: string;
  subtitle: string;
  description: string;
  points: string[];
}

const skillDetails: Record<string, SkillDetails> = {
  "React.js": {
    title: "React.js",
    subtitle: "Frontend Architecture",
    description: "Structuring high-performance, single-page application systems with custom hooks and state coordination.",
    points: ["Frontend Architecture", "Reusable Components", "Modern UI Systems"]
  },
  "Python": {
    title: "Python",
    subtitle: "AI & Automation Core",
    description: "Creating analytical pipelines, mathematical scripts, and neural network data models.",
    points: ["AI & Scripting", "Neural Integrations", "Automation Core"]
  },
  "Java": {
    title: "Java",
    subtitle: "Enterprise Engineering",
    description: "Developing robust object-oriented software products and algorithmic systems.",
    points: ["OOP Development", "Scalable Systems", "Complex Algorithms"]
  },
  "MongoDB": {
    title: "MongoDB",
    subtitle: "Database Architecture",
    description: "Architecting flexible, horizontal-scale document models with custom aggregation queries.",
    points: ["NoSQL Database", "Document Models", "Scale Optimization"]
  },
  "AWS": {
    title: "AWS",
    subtitle: "Cloud Foundations",
    description: "Managing serverless deployments, securely permissioned networks, and CDN caching layers.",
    points: ["Cloud Infrastructure", "Safe Deployments", "Serverless Architecture"]
  },
  "DSA": {
    title: "DSA",
    subtitle: "Problem Solving",
    description: "Refining logical thinking using data structures and optimized computational speed algorithms.",
    points: ["Problem Solving", "Complexity Tuning", "Data Structures"]
  },
  "UI/UX": {
    title: "UI/UX",
    subtitle: "Interactive Design",
    description: "Designing user-centric layouts, micro-animations, and fluid design language systems.",
    points: ["UI/UX Design", "Premium Layouts", "Editorial Aesthetics"]
  }
};

const defaultCenter: SkillDetails = {
  title: "Mahi Singh",
  subtitle: "Full Stack + AI",
  description: "Creating premium user interfaces, analytical backend architectures, and intelligent systems.",
  points: ["Modern Web Development", "Algorithmic Problem Solving", "Emerging AI Tech"]
};


const featuredCards = [
  {
    title: "Problem Solving",
    description: "Focused on building logical thinking through DSA and scalable development patterns.",
    icon: <Terminal className="w-5 h-5 text-orange-400" />
  },
  {
    title: "Frontend Development",
    description: "Creating responsive, modern, and interactive user interfaces with React and Tailwind.",
    icon: <Layout className="w-5 h-5 text-orange-400" />
  },
  {
    title: "AI & Data",
    description: "Exploring AI-driven systems, structured datasets, and analytical problem solving.",
    icon: <Database className="w-5 h-5 text-orange-400" />
  },
  {
    title: "Backend Systems",
    description: "Building APIs, database logic, and scalable backend integrations.",
    icon: <Cpu className="w-5 h-5 text-orange-400" />
  }
];

interface BentoGlowCardProps {
  number: string;
  title: string;
  description: string;
  tags: string[];
  className?: string;
  index: number;
  icon?: React.ReactNode;
}

function BentoGlowCard({ number, title, description, tags, className = '', index, icon }: BentoGlowCardProps) {
  const cardRef = useRef<HTMLDivElement>(null);
  const [isHovered, setIsHovered] = useState(false);
  const [rotation, setRotation] = useState({ x: 0, y: 0 });

  // Handle mouse movement for 3D effect
  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (cardRef.current) {
      const rect = cardRef.current.getBoundingClientRect();

      // Calculate mouse position relative to card center
      const x = e.clientX - rect.left - rect.width / 2;
      const y = e.clientY - rect.top - rect.height / 2;

      // Calculate rotation (limited range for subtle effect)
      const rotateX = -(y / rect.height) * 5; // Max 5 degrees rotation
      const rotateY = (x / rect.width) * 5; // Max 5 degrees rotation

      setRotation({ x: rotateX, y: rotateY });
    }
  };

  // Reset rotation when not hovering
  const handleMouseLeave = () => {
    setIsHovered(false);
    setRotation({ x: 0, y: 0 });
  };

  return (
    <motion.div
      ref={cardRef}
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.8, delay: index * 0.12, ease: [0.16, 1, 0.3, 1] }}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={handleMouseLeave}
      onMouseMove={handleMouseMove}
      className={`relative rounded-[32px] overflow-hidden cursor-pointer select-none transition-all duration-500 w-full flex ${className}`}
      style={{
        transformStyle: "preserve-3d",
        backgroundColor: "#0e131f",
        boxShadow: isHovered
          ? "0 -10px 100px 10px rgba(78, 99, 255, 0.25), 0 0 30px -5px rgba(251, 146, 60, 0.15), 0 10px 30px -15px rgba(0, 0, 0, 0.8)"
          : "0 0 10px 0 rgba(0, 0, 0, 0.5)",
      }}
      animate={{
        y: isHovered ? -5 : 0,
        rotateX: rotation.x,
        rotateY: rotation.y,
        perspective: 1000,
      }}
    >
      {/* Subtle glass reflection overlay */}
      <motion.div
        className="absolute inset-0 z-35 pointer-events-none"
        style={{
          background: "linear-gradient(135deg, rgba(255,255,255,0.08) 0%, rgba(255,255,255,0) 40%, rgba(255,255,255,0) 80%, rgba(255,255,255,0.05) 100%)",
          backdropFilter: "blur(2px)",
        }}
        animate={{
          opacity: isHovered ? 0.7 : 0.5,
          rotateX: -rotation.x * 0.2,
          rotateY: -rotation.y * 0.2,
          z: 1,
        }}
        transition={{
          duration: 0.4,
          ease: "easeOut"
        }}
      />

      {/* Dark background with black gradient like in the image */}
      <motion.div
        className="absolute inset-0 z-0"
        style={{
          background: "linear-gradient(180deg, #000000 0%, #000000 70%)",
        }}
        animate={{
          z: -1
        }}
      />

      {/* Noise texture overlay */}
      <motion.div
        className="absolute inset-0 opacity-30 mix-blend-overlay z-10"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.65' numOctaves='5' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)'/%3E%3C/svg%3E")`,
        }}
        animate={{
          z: -0.5
        }}
      />

      {/* Subtle finger smudge texture for realism */}
      <motion.div
        className="absolute inset-0 opacity-10 mix-blend-soft-light z-11 pointer-events-none"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 400 400' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='smudge'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.01' numOctaves='3' seed='5' stitchTiles='stitch'/%3E%3CfeGaussianBlur stdDeviation='10'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23smudge)'/%3E%3C/svg%3E")`,
          backdropFilter: "blur(1px)",
        }}
        animate={{
          z: -0.25
        }}
      />

      {/* Purple/blue glow effect matching the image */}
      <motion.div
        className="absolute bottom-0 left-0 right-0 h-2/3 z-20 pointer-events-none"
        style={{
          background: `
            radial-gradient(ellipse at bottom right, rgba(172, 92, 255, 0.7) -10%, rgba(79, 70, 229, 0) 70%),
            radial-gradient(ellipse at bottom left, rgba(56, 189, 248, 0.7) -10%, rgba(79, 70, 229, 0) 70%)
          `,
          filter: "blur(40px)",
        }}
        animate={{
          opacity: isHovered ? 0.9 : 0.8,
          y: isHovered ? rotation.x * 0.5 : 0,
          z: 0
        }}
        transition={{
          duration: 0.4,
          ease: "easeOut"
        }}
      />

      {/* Central purple glow as seen in the image */}
      <motion.div
        className="absolute bottom-0 left-0 right-0 h-2/3 z-21 pointer-events-none"
        style={{
          background: `
            radial-gradient(circle at bottom center, rgba(161, 58, 229, 0.7) -20%, rgba(79, 70, 229, 0) 60%)
          `,
          filter: "blur(45px)",
        }}
        animate={{
          opacity: isHovered ? 0.85 : 0.75,
          y: isHovered ? `calc(10% + ${rotation.x * 0.3}px)` : "10%",
          z: 0
        }}
        transition={{
          duration: 0.4,
          ease: "easeOut"
        }}
      />

      {/* Enhanced bottom border glow for premium look */}
      <motion.div
        className="absolute bottom-0 left-0 right-0 h-[2px] z-25 pointer-events-none"
        style={{
          background: "linear-gradient(90deg, rgba(255, 255, 255, 0.05) 0%, rgba(255, 255, 255, 0.7) 50%, rgba(255, 255, 255, 0.05) 100%)",
        }}
        animate={{
          boxShadow: isHovered
            ? "0 0 20px 4px rgba(172, 92, 255, 0.9), 0 0 30px 6px rgba(138, 58, 185, 0.7), 0 0 40px 8px rgba(56, 189, 248, 0.5)"
            : "0 0 15px 3px rgba(172, 92, 255, 0.8), 0 0 25px 5px rgba(138, 58, 185, 0.6), 0 0 35px 7px rgba(56, 189, 248, 0.4)",
          opacity: isHovered ? 1 : 0.9,
          z: 0.5
        }}
        transition={{
          duration: 0.4,
          ease: "easeOut"
        }}
      />
      <motion.div
        className="absolute bottom-0 left-0 h-1/4 w-[1px] z-25 rounded-full pointer-events-none"
        style={{
          background: "linear-gradient(to top, rgba(255, 255, 255, 0.7) 0%, rgba(255, 255, 255, 0.5) 20%, rgba(255, 255, 255, 0.3) 40%, rgba(255, 255, 255, 0.1) 60%, rgba(255, 255, 255, 0) 80%)",
        }}
        animate={{
          boxShadow: isHovered
            ? "0 0 20px 4px rgba(172, 92, 255, 0.9), 0 0 30px 6px rgba(138, 58, 185, 0.7), 0 0 40px 8px rgba(56, 189, 248, 0.5)"
            : "0 0 15px 3px rgba(172, 92, 255, 0.8), 0 0 25px 5px rgba(138, 58, 185, 0.6), 0 0 35px 7px rgba(56, 189, 248, 0.4)",
          opacity: isHovered ? 1 : 0.9,
          z: 0.5
        }}
        transition={{
          duration: 0.4,
          ease: "easeOut"
        }}
      />
      <motion.div
        className="absolute bottom-0 left-0 h-1/4 z-25 pointer-events-none"
        style={{
          background: "linear-gradient(to top, rgba(255, 255, 255, 0.7) 0%, rgba(255, 255, 255, 0.55) 15%, rgba(255, 255, 255, 0.4) 30%, rgba(255, 255, 255, 0.25) 45%, rgba(255, 255, 255, 0.1) 70%, rgba(255, 255, 255, 0) 85%)",
        }}
        animate={{
          boxShadow: isHovered
            ? "0 0 20px 4px rgba(172, 92, 255, 0.9), 0 0 30px 6px rgba(138, 58, 185, 0.7), 0 0 40px 8px rgba(56, 189, 248, 0.5)"
            : "0 0 15px 3px rgba(172, 92, 255, 0.8), 0 0 25px 5px rgba(138, 58, 185, 0.6), 0 0 35px 7px rgba(56, 189, 248, 0.4)",
          opacity: isHovered ? 1 : 0.9,
          z: 0.5
        }}
        transition={{
          duration: 0.4,
          ease: "easeOut"
        }}
      />
      <motion.div
        className="absolute bottom-0 right-0 h-1/4 w-[1px] z-25 rounded-full pointer-events-none"
        style={{
          background: "linear-gradient(to top, rgba(255, 255, 255, 0.7) 0%, rgba(255, 255, 255, 0.5) 20%, rgba(255, 255, 255, 0.3) 40%, rgba(255, 255, 255, 0.1) 60%, rgba(255, 255, 255, 0) 80%)",
        }}
        animate={{
          boxShadow: isHovered
            ? "0 0 20px 4px rgba(172, 92, 255, 0.9), 0 0 30px 6px rgba(138, 58, 185, 0.7), 0 0 40px 8px rgba(56, 189, 248, 0.5)"
            : "0 0 15px 3px rgba(172, 92, 255, 0.8), 0 0 25px 5px rgba(138, 58, 185, 0.6), 0 0 35px 7px rgba(56, 189, 248, 0.4)",
          opacity: isHovered ? 1 : 0.9,
          z: 0.5
        }}
        transition={{
          duration: 0.4,
          ease: "easeOut"
        }}
      />
      <motion.div
        className="absolute bottom-0 right-0 h-1/3 z-25 pointer-events-none"
        style={{
          background: "linear-gradient(to top, rgba(255, 255, 255, 0.7) 0%, rgba(255, 255, 255, 0.55) 15%, rgba(255, 255, 255, 0.4) 30%, rgba(255, 255, 255, 0.25) 45%, rgba(255, 255, 255, 0.1) 70%, rgba(255, 255, 255, 0) 85%)",
        }}
        animate={{
          boxShadow: isHovered
            ? "0 0 20px 4px rgba(172, 92, 255, 0.9), 0 0 30px 6px rgba(138, 58, 185, 0.7), 0 0 40px 8px rgba(56, 189, 248, 0.5)"
            : "0 0 15px 3px rgba(172, 92, 255, 0.8), 0 0 25px 5px rgba(138, 58, 185, 0.6), 0 0 35px 7px rgba(56, 189, 248, 0.4)",
          opacity: isHovered ? 1 : 0.9,
          z: 0.5
        }}
        transition={{
          duration: 0.4,
          ease: "easeOut"
        }}
      />

      {/* Card Body - Premium Glassmorphic content layout */}
      <motion.div
        className="relative z-40 w-full flex-1 p-5 md:p-6 flex flex-col justify-between items-stretch overflow-hidden min-h-[220px] md:min-h-[240px]"
        animate={{
          z: 2
        }}
      >
        {/* Large Faded Display Number (Top Right) */}
        <span className="absolute top-3 right-5 text-5xl md:text-6xl font-black font-display text-neutral-800/15 select-none transition-all duration-700 group-hover:text-orange-500/10 group-hover:scale-105 pointer-events-none">
          {number}
        </span>

        {/* TOP: Category tag and skeuomorphic icon */}
        <div className="flex justify-between items-start relative z-10 w-full">
          <div className="flex flex-col space-y-1">
            <span className="text-[9px] font-mono tracking-widest text-neutral-500 select-none group-hover:text-orange-400/50 transition-colors duration-500 uppercase">
              CAPABILITY // {number}
            </span>
          </div>

          {/* Premium Skeuomorphic Icon Button */}
          {icon && (
            <motion.div
              className="w-10 h-10 rounded-full flex items-center justify-center"
              style={{
                background: "linear-gradient(225deg, #171c2c 0%, #121624 100%)",
                position: "relative",
                overflow: "hidden"
              }}
              initial={{ filter: "blur(3px)", opacity: 0.7 }}
              animate={{
                filter: "blur(0px)",
                opacity: 1,
                boxShadow: isHovered
                  ? "0 6px 12px -2px rgba(0, 0, 0, 0.3), 0 3px 6px -1px rgba(0, 0, 0, 0.2), inset 2px 2px 5px rgba(255, 255, 255, 0.15), inset -2px -2px 5px rgba(0, 0, 0, 0.7)"
                  : "0 4px 8px -2px rgba(0, 0, 0, 0.25), 0 2px 4px -1px rgba(0, 0, 0, 0.15), inset 1px 1px 3px rgba(255, 255, 255, 0.12), inset -2px -2px 4px rgba(0, 0, 0, 0.5)",
                z: isHovered ? 10 : 5,
                y: isHovered ? -2 : 0,
                rotateX: isHovered ? -rotation.x * 0.5 : 0,
                rotateY: isHovered ? -rotation.y * 0.5 : 0
              }}
              transition={{
                duration: 0.4,
                ease: "easeOut"
              }}
            >
              {/* Top-left highlight for realistic lighting */}
              <div
                className="absolute top-0 left-0 w-2/3 h-2/3 opacity-40 pointer-events-none"
                style={{
                  background: "radial-gradient(circle at top left, rgba(255, 255, 255, 0.5), transparent 80%)",
                  filter: "blur(8px)"
                }}
              />

              {/* Bottom shadow for depth */}
              <div
                className="absolute bottom-0 left-0 w-full h-1/2 opacity-50 pointer-events-none"
                style={{
                  background: "linear-gradient(to top, rgba(0, 0, 0, 0.4), transparent)",
                  backdropFilter: "blur(2px)"
                }}
              />

              <div className="flex items-center justify-center w-full h-full relative z-10 scale-90">
                {icon}
              </div>
            </motion.div>
          )}
        </div>

        {/* CENTER: Title & Elegant Divider */}
        <div className="flex-1 flex flex-col justify-center text-left py-3 relative z-10">
          <motion.h4
            className="text-white font-extrabold text-lg md:text-xl font-display tracking-tight group-hover:text-orange-300 transition-colors"
            animate={{ x: isHovered ? 4 : 0 }}
            transition={{ type: "spring", stiffness: 350, damping: 25 }}
          >
            {title}
          </motion.h4>
          {/* Subtle Glowing Divider Accent Line */}
          <div className="w-8 h-[2px] bg-gradient-to-r from-orange-400 to-transparent mt-2 group-hover:w-16 transition-all duration-500 rounded-full" />
        </div>

        {/* BOTTOM: Description and Mini Tags */}
        <div className="space-y-4 pt-4 border-t border-white/5 relative z-10">
          <p className="text-neutral-400 text-xs md:text-sm font-light font-sans leading-relaxed">
            {description}
          </p>

          <div className="flex flex-wrap gap-2 pt-1">
            {tags.map((tag, idx) => (
              <span
                key={tag}
                className={`px-3 py-1 rounded-full text-[9px] font-bold tracking-wide bg-neutral-900/60 border transition-all duration-300 ${isHovered
                  ? 'border-orange-500/25 text-orange-300 shadow-[0_0_12px_rgba(251,146,60,0.12)] translate-y-[-2px]'
                  : 'border-white/5 text-neutral-500'
                  }`}
                style={{ transitionDelay: `${idx * 40}ms` }}
              >
                {tag}
              </span>
            ))}
          </div>
        </div>

      </motion.div>
    </motion.div>
  );
}

export default function SkillsPage() {
  const [hoveredSkill, setHoveredSkill] = useState<string | null>(null);
  const [isMobile, setIsMobile] = useState(false);
  const [expandedCategory, setExpandedCategory] = useState<string | null>(null);

  const toggleCategory = (cat: string) => {
    setExpandedCategory(expandedCategory === cat ? null : cat);
  };

  // Dynamic skillsSection configuration states with sensible Mahi fallbacks
  const [badge, setBadge] = useState("SKILLS & TECHNOLOGIES");
  const [heading, setHeading] = useState("SYSTEM CAPABILITIES");
  const [description, setDescription] = useState("A combination of modern development tools, problem-solving skills, and continuously evolving technologies.");

  const [orbitTitle, setOrbitTitle] = useState("Mahi Singh");
  const [orbitSubtitle, setOrbitSubtitle] = useState("Full Stack + AI");
  const [orbitDescription, setOrbitDescription] = useState("Creating premium user interfaces, analytical backend architectures, and intelligent systems.");
  const [orbitRadius, setOrbitRadius] = useState(231);
  const [orbitGlow, setOrbitGlow] = useState(75);
  const [orbitSpeed, setOrbitSpeed] = useState(25);
  const [orbitSkills, setOrbitSkills] = useState<SkillNode[]>(skillsList);

  const [capabilityCards, setCapabilityCards] = useState<any[]>([
    { id: "01", title: "Frontend Development", shortDescription: "Responsive React interfaces, Tailwind systems, animations, and modern UI architecture.", icon: "Layout", tags: ["React.js", "Tailwind CSS", "Framer Motion", "Responsive UI"], order: 1, enabled: true },
    { id: "02", title: "AI & Data", shortDescription: "Exploring AI-driven systems, structured datasets, and analytical problem solving.", icon: "Database", tags: ["Gemini API", "Python", "Data Structures"], order: 2, enabled: true },
    { id: "03", title: "Backend Systems", shortDescription: "Building APIs, database logic, and scalable backend integrations.", icon: "Cpu", tags: ["Node.js", "Express", "MongoDB", "REST APIs"], order: 3, enabled: true },
    { id: "04", title: "Problem Solving", shortDescription: "Building strong logical foundations through DSA, systems thinking, and scalable architecture exploration.", icon: "Terminal", tags: ["Java", "Algorithms", "DSA Core", "Complexity Tuning"], order: 4, enabled: true }
  ]);

  const [techStacks, setTechStacks] = useState<any[]>([
    { category: "Frontend", skills: ["React.js", "Tailwind CSS", "HTML5", "CSS3", "JavaScript"] },
    { category: "Backend", skills: ["Node.js", "Express.js", "REST APIs", "FastAPI"] },
    { category: "Databases", skills: ["MongoDB", "MySQL", "PostgreSQL"] },
    { category: "Languages & Tools", skills: ["Python", "Java", "TypeScript", "Git", "GitHub", "AWS"] }
  ]);

  const hydrateSkills = (sec: any) => {
    if (!sec) return;
    if (sec.badge) setBadge(sec.badge);
    if (sec.heading) setHeading(sec.heading);
    if (sec.description) setDescription(sec.description);

    if (sec.orbitTitle) setOrbitTitle(sec.orbitTitle);
    if (sec.orbitSubtitle) setOrbitSubtitle(sec.orbitSubtitle);
    if (sec.orbitDescription) setOrbitDescription(sec.orbitDescription);
    if (sec.orbitRadius !== undefined) setOrbitRadius(sec.orbitRadius);
    if (sec.orbitGlow !== undefined) setOrbitGlow(sec.orbitGlow);
    if (sec.orbitSpeed !== undefined) setOrbitSpeed(sec.orbitSpeed);
    if (sec.orbitSkills && sec.orbitSkills.length > 0) setOrbitSkills(sec.orbitSkills);

    if (sec.capabilityCards && sec.capabilityCards.length > 0) {
      setCapabilityCards(sec.capabilityCards);
    }
    if (sec.techStacks && sec.techStacks.length > 0) {
      setTechStacks(sec.techStacks);
    }
  };

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const res = await axios.get(`${import.meta.env.VITE_API_BASE_URL || 'http://localhost:5000'}/api/portfolio/slug/mahi`);
        if (res.data.status === 'success' && res.data.data.profile) {
          const profile = res.data.data.profile;
          if (profile.skillsSection) {
            const sec = typeof profile.skillsSection === 'string'
              ? JSON.parse(profile.skillsSection)
              : profile.skillsSection;
            hydrateSkills(sec);
          }
        }
      } catch (err) {
        console.warn("Failed to fetch skills section from DB, using fallback defaults.", err);
      }
    };
    fetchProfile();
  }, []);

  useEffect(() => {
    const socket = io(import.meta.env.VITE_API_BASE_URL || 'http://localhost:5000');
    socket.emit('portfolio:join', 'mahi');

    socket.on('skills:updated', (payload: any) => {
      console.log('⚡ Real-time skills updated:', payload);
      hydrateSkills(payload);
    });

    return () => {
      socket.disconnect();
    };
  }, []);

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 768);
    };
    handleResize();
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const getCoordinates = (angle: number, ring: 1 | 2) => {
    const rad = (angle * Math.PI) / 180;
    // Dynamic radius computed from orbitRadius
    const baseRadius = orbitRadius;
    const r1 = isMobile ? baseRadius * 0.65 : baseRadius;
    const r2 = isMobile ? baseRadius * 0.97 : baseRadius * 1.43;
    const r = ring === 1 ? r1 : r2;
    return {
      x: r * Math.cos(rad),
      y: r * Math.sin(rad)
    };
  };

  const activeCenter = hoveredSkill ? (skillDetails[hoveredSkill] || {
    title: hoveredSkill,
    subtitle: "Core Technology",
    description: `Specialized engineering node configured dynamically in orbital core: ${hoveredSkill}.`,
    points: ["Dynamic Integration", "Verified Capability"]
  }) : {
    title: orbitTitle,
    subtitle: orbitSubtitle,
    description: orbitDescription,
    points: ["Modern Web Development", "Algorithmic Problem Solving", "Emerging AI Tech"]
  };

  const activeSkillNode = orbitSkills.find(s => s.name === hoveredSkill);
  const glowColorHex = activeSkillNode ? activeSkillNode.glowHex : "#fb923c";

  const ambientParticles = React.useMemo(() => {
    return Array.from({ length: 20 }, (_, idx) => ({
      id: idx,
      size: Math.random() * 2 + 1,
      x: (Math.random() - 0.5) * (isMobile ? 420 : 640),
      y: (Math.random() - 0.5) * (isMobile ? 420 : 640),
      duration: Math.random() * 7 + 7,
      delay: Math.random() * 3,
    }));
  }, [isMobile]);

  // Concentric circle background diameter calculations
  const r1 = isMobile ? orbitRadius * 0.65 : orbitRadius;
  const r2 = isMobile ? orbitRadius * 0.97 : orbitRadius * 1.43;
  const d1 = r1 * 2;
  const d2 = r2 * 2;

  return (
    <div className="min-h-screen bg-transparent p-0 relative overflow-x-hidden w-full flex flex-col justify-start">
      {/* Amber Glow Background */}
      <div
        className="absolute inset-0 z-0 pointer-events-none"
        style={{
          backgroundImage: `
            radial-gradient(125% 125% at 50% 10%, transparent 45%, rgba(245, 158, 11, 0.15) 100%)
          `,
          backgroundSize: "100% 100%",
        }}
      />
      <div className="max-w-7xl mx-auto px-6 w-full relative z-10 space-y-16 pt-24 pb-12">

        {/* Title Section */}
        <Section id="skills-page" title={badge} subtitle="">
          <div className="space-y-16 select-none text-left w-full">

            {/* Top supporting tagline in sentence case */}
            <div className="max-w-3xl border-l-2 border-orange-500/40 pl-6 py-1">
              <p className="text-lg md:text-xl text-neutral-300 leading-relaxed font-light font-sans">
                {description}
              </p>
            </div>

            {/* Centerpiece: Interactive Radar/Orbit Visualizer */}
            <div
              className="relative w-full h-[425px] md:h-[800px] flex items-center justify-center overflow-visible my-8 select-none origin-center"
              style={isMobile ? { transform: 'scale(0.72)', transformOrigin: 'center center' } : undefined}
            >

              {/* Layer 0: Ambient Star Particles Layer */}
              <div className="absolute inset-0 pointer-events-none z-0 overflow-visible">
                {ambientParticles.map((p) => (
                  <motion.div
                    key={p.id}
                    className="absolute rounded-full bg-orange-400/40"
                    style={{
                      width: p.size,
                      height: p.size,
                      left: `calc(50% + ${p.x}px)`,
                      top: `calc(50% + ${p.y}px)`,
                      filter: p.size > 2 ? 'blur(0.5px)' : 'none',
                    }}
                    animate={{
                      opacity: [0.15, 0.65, 0.15],
                      scale: [1, 1.5, 1],
                      y: [0, -15, 0],
                      x: [0, 10, 0]
                    }}
                    transition={{
                      duration: p.duration,
                      repeat: Infinity,
                      ease: "easeInOut",
                      delay: p.delay
                    }}
                  />
                ))}
              </div>

              {/* Layer 1: Concentric Orbit Rings Background */}
              <div className="absolute inset-0 flex items-center justify-center pointer-events-none z-10">
                {/* Ring 1 - Inner Ring Background */}
                <div
                  className="absolute rounded-full border border-orange-500/10"
                  style={{
                    width: `${d1}px`,
                    height: `${d1}px`,
                    background: 'radial-gradient(circle, transparent 72%, rgba(251, 146, 60, 0.02) 100%)',
                    transition: 'width 0.3s, height 0.3s'
                  }}
                />
                {/* Ring 2 - Outer Ring Background */}
                <div
                  className="absolute rounded-full border border-orange-500/5"
                  style={{
                    width: `${d2}px`,
                    height: `${d2}px`,
                    background: 'radial-gradient(circle, transparent 86%, rgba(251, 146, 60, 0.01) 100%)',
                    transition: 'width 0.3s, height 0.3s'
                  }}
                />
              </div>

              {/* Layer 3: Layered Glass-Core Centerpiece Hub */}
              <div className="absolute z-30 w-[238px] h-[238px] md:w-[312px] md:h-[312px] flex items-center justify-center pointer-events-auto">
                {/* Outer Ambient Glow Ring */}
                <div
                  className="absolute inset-0 rounded-full blur-xl opacity-75 animate-pulse transition-colors duration-500"
                  style={{
                    backgroundColor: hoveredSkill ? `${glowColorHex}25` : 'rgba(251, 146, 60, 0.08)',
                    opacity: orbitGlow / 100
                  }}
                />

                {/* Middle Refractive Blur Ring */}
                <div
                  className="absolute -inset-1 rounded-full border bg-neutral-950/20 backdrop-blur-lg shadow-2xl transition-colors duration-500"
                  style={{
                    borderColor: hoveredSkill ? `${glowColorHex}40` : 'rgba(251, 146, 60, 0.2)'
                  }}
                />

                {/* Inner Gradient Core Container */}
                <div
                  className="absolute inset-0 rounded-full border border-white/10 flex flex-col items-center justify-center p-5 text-center select-none shadow-[inset_0_0_35px_rgba(251,146,60,0.1)] transition-all duration-500 overflow-hidden"
                  style={{
                    background: hoveredSkill
                      ? `radial-gradient(circle, rgba(10,10,20,0.85) 0%, ${glowColorHex}12 70%, rgba(0,0,0,0.95) 100%)`
                      : 'radial-gradient(circle, rgba(10,10,20,0.85) 0%, rgba(251,146,60,0.06) 70%, rgba(0,0,0,0.95) 100%)'
                  }}
                >
                  {/* Cyber grid lines */}
                  <div
                    className="absolute inset-0 opacity-[0.035] pointer-events-none"
                    style={{
                      backgroundImage: `linear-gradient(to right, rgba(255, 255, 255, 0.1) 1px, transparent 1px), linear-gradient(to bottom, rgba(255, 255, 255, 0.1) 1px, transparent 1px)`,
                      backgroundSize: '8px 8px'
                    }}
                  />

                  <AnimatePresence mode="wait">
                    <motion.div
                      key={activeCenter.title}
                      initial={{ opacity: 0, scale: 0.95, filter: "blur(4px)" }}
                      animate={{ opacity: 1, scale: 1, filter: "blur(0px)" }}
                      exit={{ opacity: 0, scale: 0.95, filter: "blur(4px)" }}
                      transition={{ duration: 0.25 }}
                      className="flex flex-col items-center justify-center h-full w-full space-y-3 relative z-10"
                    >
                      <h4
                        className="text-white font-black text-xs sm:text-sm md:text-base font-display uppercase tracking-widest transition-all duration-300"
                        style={{
                          color: hoveredSkill ? '#ffffff' : '#fdba74',
                          textShadow: hoveredSkill
                            ? `0 0 15px ${glowColorHex}, 0 0 30px ${glowColorHex}60`
                            : '0 0 10px rgba(251, 146, 60, 0.45), 0 0 20px rgba(251, 146, 60, 0.2)'
                        }}
                      >
                        {activeCenter.title}
                      </h4>
                      <span
                        className="text-[8px] sm:text-[9px] md:text-[10px] font-extrabold font-mono tracking-widest block uppercase transition-colors duration-300"
                        style={{
                          color: hoveredSkill ? glowColorHex : 'rgba(251, 146, 60, 0.8)'
                        }}
                      >
                        {activeCenter.subtitle}
                      </span>
                      <p className="text-neutral-300 text-[10px] sm:text-[11px] md:text-[12px] leading-relaxed font-sans font-light max-w-[130px] md:max-w-[200px] mx-auto py-1">
                        {activeCenter.description}
                      </p>

                      {/* Expanded Point Stack */}
                      <div className="hidden md:flex flex-col items-center gap-1.5 pt-2.5 border-t border-white/10 w-full">
                        {(activeCenter.points || []).map((pt) => (
                          <span
                            key={pt}
                            className="text-[9px] md:text-[10px] font-mono tracking-wide transition-colors duration-300"
                            style={{
                              color: hoveredSkill ? `${glowColorHex}e0` : 'rgba(251, 146, 60, 0.7)'
                            }}
                          >
                            {pt}
                          </span>
                        ))}
                      </div>
                    </motion.div>
                  </AnimatePresence>
                </div>
              </div>

              {/* Layer 2: Rotating Ring 1 Container */}
              <div
                className="absolute w-full h-full inset-0 flex items-center justify-center pointer-events-none z-20"
                style={{
                  animation: `spin ${orbitSpeed}s linear infinite`,
                  animationPlayState: hoveredSkill ? 'paused' : 'running',
                }}
              >
                {/* Connection lines for Ring 1 nodes */}
                <svg
                  className="absolute inset-0 pointer-events-none z-0 overflow-visible w-full h-full"
                  viewBox="-375 -375 750 750"
                >
                  {orbitSkills.filter(n => n.ring === 1).map((node) => {
                    const { x, y } = getCoordinates(node.angle, node.ring);
                    const isHovered = hoveredSkill === node.name;
                    return (
                      <g key={`line-${node.name}`}>
                        <line
                          x1="0" y1="0"
                          x2={x} y2={y}
                          stroke={isHovered ? node.glowHex : "rgba(255, 255, 255, 0.05)"}
                          strokeWidth={isHovered ? "1.5" : "1"}
                          opacity={isHovered ? 0.35 : 0.15}
                          style={{ transition: 'stroke 0.3s, stroke-width 0.3s, opacity 0.3s' }}
                        />
                        <line
                          x1="0" y1="0"
                          x2={x} y2={y}
                          stroke={isHovered ? node.glowHex : "rgba(251, 146, 60, 0.2)"}
                          strokeWidth={isHovered ? "1.8" : "1.2"}
                          strokeDasharray="6, 14"
                          className="animate-pulse-dash"
                          style={{
                            filter: isHovered ? `drop-shadow(0 0 5px ${node.glowHex})` : 'none',
                            transition: 'stroke 0.3s, stroke-width 0.3s'
                          }}
                        />
                      </g>
                    );
                  })}
                </svg>

                {/* Ring 1 Gradient Glass Pills mapping */}
                {orbitSkills.filter(n => n.ring === 1).map((node) => {
                  const { x, y } = getCoordinates(node.angle, node.ring);
                  const isHovered = hoveredSkill === node.name;

                  return (
                    <div
                      key={node.name}
                      className="absolute pointer-events-auto"
                      style={{
                        left: `calc(50% + ${x}px)`,
                        top: `calc(50% + ${y}px)`,
                        transform: 'translate(-50%, -50%)',
                      }}
                    >
                      {/* Counter-rotation upright pills */}
                      <div
                        style={{
                          animation: `spin-reverse ${orbitSpeed}s linear infinite`,
                          animationPlayState: hoveredSkill ? 'paused' : 'running',
                        }}
                      >
                        <motion.div
                          className="cursor-pointer select-none group"
                          initial={{ scale: 0.9, opacity: 0 }}
                          animate={{
                            scale: 1,
                            opacity: 1,
                            y: [0, -4, 0],
                            x: [0, 3, 0]
                          }}
                          transition={{
                            scale: { duration: 0.4 },
                            opacity: { duration: 0.4 },
                            y: { duration: 5, repeat: Infinity, ease: "easeInOut", delay: node.angle * 0.005 },
                            x: { duration: 4, repeat: Infinity, ease: "easeInOut", delay: node.angle * 0.008 }
                          }}
                          whileHover={{ scale: 1.08 }}
                          onMouseEnter={() => setHoveredSkill(node.name)}
                          onMouseLeave={() => setHoveredSkill(null)}
                        >
                          <div
                            className={`px-4 py-2.5 rounded-full border bg-gradient-to-br backdrop-blur-md text-[11px] md:text-xs font-sans tracking-wide transition-all duration-300 whitespace-nowrap flex items-center gap-2 ${node.borderClass} ${node.bgGradient} ${isHovered ? '' : 'glow-pill-pulse'}`}
                            style={{
                              '--glow-color': node.glowColor,
                              boxShadow: isHovered
                                ? `0 0 25px -2px ${node.glowColor}, inset 0 1px 1px rgba(255,255,255,0.15)`
                                : undefined,
                            } as React.CSSProperties}
                          >
                            <span className={`inline-block w-1.5 h-1.5 rounded-full transition-all duration-300 ${node.bulletBg} ${isHovered
                              ? 'scale-125 shadow-[0_0_8px_rgba(255,255,255,0.8)] animate-pulse'
                              : 'opacity-75 scale-100'
                              }`} />

                            <span className={`font-semibold transition-colors duration-300 ${node.textColor}`}>
                              {node.name}
                            </span>

                            <AnimatePresence>
                              {isHovered && (
                                <motion.span
                                  initial={{ width: 0, opacity: 0 }}
                                  animate={{ width: "auto", opacity: 1 }}
                                  exit={{ width: 0, opacity: 0 }}
                                  className="text-[9px] text-orange-400 font-mono overflow-hidden font-bold hidden sm:inline"
                                >
                                  // {(skillDetails[node.name] || { points: ["Advanced Node"] }).points[0]}
                                </motion.span>
                              )}
                            </AnimatePresence>
                          </div>
                        </motion.div>
                      </div>
                    </div>
                  );
                })}
              </div>

              {/* Layer 2: Rotating Ring 2 Container */}
              <div
                className="absolute w-full h-full inset-0 flex items-center justify-center pointer-events-none z-20"
                style={{
                  animation: `spin-reverse ${orbitSpeed * 1.4}s linear infinite`,
                  animationPlayState: hoveredSkill ? 'paused' : 'running',
                }}
              >
                {/* connection lines for Ring 2 nodes */}
                <svg
                  className="absolute inset-0 pointer-events-none z-0 overflow-visible w-full h-full"
                  viewBox="-375 -375 750 750"
                >
                  {orbitSkills.filter(n => n.ring === 2 && !isMobile).map((node) => {
                    const { x, y } = getCoordinates(node.angle, node.ring);
                    const isHovered = hoveredSkill === node.name;
                    return (
                      <g key={`line-${node.name}`}>
                        <line
                          x1="0" y1="0"
                          x2={x} y2={y}
                          stroke={isHovered ? node.glowHex : "rgba(255, 255, 255, 0.05)"}
                          strokeWidth={isHovered ? "1.5" : "1"}
                          opacity={isHovered ? 0.35 : 0.15}
                          style={{ transition: 'stroke 0.3s, stroke-width 0.3s, opacity 0.3s' }}
                        />
                        <line
                          x1="0" y1="0"
                          x2={x} y2={y}
                          stroke={isHovered ? node.glowHex : "rgba(251, 146, 60, 0.2)"}
                          strokeWidth={isHovered ? "1.8" : "1.2"}
                          strokeDasharray="6, 14"
                          className="animate-pulse-dash"
                          style={{
                            filter: isHovered ? `drop-shadow(0 0 5px ${node.glowHex})` : 'none',
                            transition: 'stroke 0.3s, stroke-width 0.3s'
                          }}
                        />
                      </g>
                    );
                  })}
                </svg>

                {/* Ring 2 Gradient Glass Pills mapping */}
                {orbitSkills.filter(n => n.ring === 2 && !isMobile).map((node) => {
                  const { x, y } = getCoordinates(node.angle, node.ring);
                  const isHovered = hoveredSkill === node.name;

                  return (
                    <div
                      key={node.name}
                      className="absolute pointer-events-auto"
                      style={{
                        left: `calc(50% + ${x}px)`,
                        top: `calc(50% + ${y}px)`,
                        transform: 'translate(-50%, -50%)',
                      }}
                    >
                      {/* Counter-rotation upright pills */}
                      <div
                        style={{
                          animation: `spin ${orbitSpeed * 1.4}s linear infinite`,
                          animationPlayState: hoveredSkill ? 'paused' : 'running',
                        }}
                      >
                        <motion.div
                          className="cursor-pointer select-none group"
                          initial={{ scale: 0.9, opacity: 0 }}
                          animate={{
                            scale: 1,
                            opacity: 1,
                            y: [0, -6, 0],
                            x: [0, -3, 0]
                          }}
                          transition={{
                            scale: { duration: 0.4 },
                            opacity: { duration: 0.4 },
                            y: { duration: 7, repeat: Infinity, ease: "easeInOut", delay: node.angle * 0.005 },
                            x: { duration: 6, repeat: Infinity, ease: "easeInOut", delay: node.angle * 0.008 }
                          }}
                          whileHover={{ scale: 1.08 }}
                          onMouseEnter={() => setHoveredSkill(node.name)}
                          onMouseLeave={() => setHoveredSkill(null)}
                        >
                          <div
                            className={`px-4 py-2.5 rounded-full border bg-gradient-to-br backdrop-blur-md text-[11px] md:text-xs font-sans tracking-wide transition-all duration-300 whitespace-nowrap flex items-center gap-2 ${node.borderClass} ${node.bgGradient} ${isHovered ? '' : 'glow-pill-pulse'}`}
                            style={{
                              '--glow-color': node.glowColor,
                              boxShadow: isHovered
                                ? `0 0 25px -2px ${node.glowColor}, inset 0 1px 1px rgba(255,255,255,0.15)`
                                : undefined,
                            } as React.CSSProperties}
                          >
                            <span className={`inline-block w-1.5 h-1.5 rounded-full transition-all duration-300 ${node.bulletBg} ${isHovered
                              ? 'scale-125 shadow-[0_0_8px_rgba(255,255,255,0.8)] animate-pulse'
                              : 'opacity-75 scale-100'
                              }`} />

                            <span className={`font-semibold transition-colors duration-300 ${node.textColor}`}>
                              {node.name}
                            </span>

                            <AnimatePresence>
                              {isHovered && (
                                <motion.span
                                  initial={{ width: 0, opacity: 0 }}
                                  animate={{ width: "auto", opacity: 1 }}
                                  exit={{ width: 0, opacity: 0 }}
                                  className="text-[9px] text-orange-400 font-mono overflow-hidden font-bold hidden sm:inline"
                                >
                                  // {(skillDetails[node.name] || { points: ["Advanced Node"] }).points[0]}
                                </motion.span>
                              )}
                            </AnimatePresence>
                          </div>
                        </motion.div>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
            {/* Section 4: Dynamic Technology Stack Grid */}
            <div className="space-y-6 max-w-6xl mx-auto pt-12 w-full">
              <h3 className="text-xs font-bold text-neutral-500 tracking-wider font-mono border-b border-white/5 pb-3 select-none uppercase">
                Technical Stack Grid
              </h3>

              {isMobile ? (
                /* Mobile Collapsible Accordion Group */
                <div className="space-y-3 w-full max-w-md mx-auto">
                  {techStacks.map((group, idx) => {
                    const isOpen = expandedCategory === group.category;
                    return (
                      <div
                        key={group.category || idx}
                        className="border border-white/10 rounded-2xl bg-black/45 backdrop-blur-xl overflow-hidden transition-all duration-300"
                        style={{
                          boxShadow: "0 10px 40px rgba(0, 0, 0, 0.35)"
                        }}
                      >
                        {/* Header Toggle Row */}
                        <button
                          onClick={() => toggleCategory(group.category)}
                          className="w-full flex items-center justify-between p-4.5 text-left select-none cursor-pointer focus:outline-none transition-colors hover:bg-white/[0.02]"
                        >
                          <span className="text-white font-extrabold text-xs sm:text-sm font-display tracking-wider uppercase flex items-center gap-2">
                            <Award className="w-3.5 h-3.5 text-orange-500" />
                            <span>{group.category}</span>
                          </span>
                          <motion.span
                            animate={{ rotate: isOpen ? 90 : 0 }}
                            className="text-orange-500 font-bold text-[9px] shrink-0"
                            transition={{ duration: 0.2 }}
                          >
                            ▶
                          </motion.span>
                        </button>

                        {/* Collapsible tags stream */}
                        <AnimatePresence initial={false}>
                          {isOpen && (
                            <motion.div
                              initial={{ height: 0, opacity: 0 }}
                              animate={{ height: "auto", opacity: 1 }}
                              exit={{ height: 0, opacity: 0 }}
                              transition={{ duration: 0.3, ease: "easeInOut" }}
                              className="overflow-hidden border-t border-white/5 bg-black/20"
                            >
                              <div className="p-4 flex flex-wrap gap-2">
                                {(group.skills || []).map((skill: string) => (
                                  <span
                                    key={skill}
                                    className="px-2.5 py-1.5 rounded-lg text-[9px] font-mono font-semibold bg-neutral-900 border border-white/5 text-neutral-400"
                                  >
                                    {skill}
                                  </span>
                                ))}
                              </div>
                            </motion.div>
                          )}
                        </AnimatePresence>
                      </div>
                    );
                  })}
                </div>
              ) : (
                /* Standard Desktop 4-Column Bento Grid */
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 w-full items-stretch">
                  {techStacks.map((group, idx) => (
                    <motion.div
                      key={group.category || idx}
                      initial={{ opacity: 0, y: 20 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      viewport={{ once: true }}
                      transition={{ duration: 0.6, delay: idx * 0.1 }}
                      className="relative bg-black/45 border border-white/10 rounded-2xl p-5 md:p-6 backdrop-blur-xl overflow-hidden hover:border-orange-500/20 group transition-all duration-300 flex flex-col justify-start"
                      style={{
                        boxShadow: "0 10px 40px rgba(0, 0, 0, 0.35)"
                      }}
                      whileHover={{
                        y: -2,
                        boxShadow: "0 8px 24px rgba(249, 115, 22, 0.08), 0 0 1px rgba(249, 115, 22, 0.3)"
                      }}
                    >
                      {/* Subtle orange accent glow top-left */}
                      <div className="absolute -top-10 -left-10 w-24 h-24 rounded-full bg-orange-500/5 blur-2xl group-hover:bg-orange-500/10 transition-all duration-500" />

                      {/* Category Header */}
                      <div className="flex items-center justify-between pb-3 mb-4 border-b border-white/5 relative z-10 shrink-0">
                        <h4 className="text-white font-extrabold text-sm font-display tracking-wider uppercase group-hover:text-orange-400 transition-colors">
                          {group.category}
                        </h4>
                        <Award className="w-3.5 h-3.5 text-orange-500/60 group-hover:text-orange-400 group-hover:rotate-12 transition-all duration-500" />
                      </div>

                      {/* Skill tags */}
                      <div className="flex flex-wrap gap-2 relative z-10">
                        {(group.skills || []).map((skill: string) => (
                          <span
                            key={skill}
                            className="px-2.5 py-1.5 rounded-lg text-[10px] font-mono font-semibold bg-neutral-900 border border-white/5 text-neutral-400 hover:text-orange-300 hover:border-orange-500/30 hover:bg-orange-500/5 transition-all duration-200"
                          >
                            {skill}
                          </span>
                        ))}
                      </div>
                    </motion.div>
                  ))}
                </div>
              )}
            </div>

            {/* Upgraded Premium Projects CTA Banner */}
            <div className="text-center pt-16 w-full max-w-2xl mx-auto space-y-6 select-none relative z-10">
              <div className="h-[1px] bg-gradient-to-r from-transparent via-white/5 to-transparent w-full" />

              <h4 className="text-white font-extrabold text-xs sm:text-sm font-display uppercase tracking-widest leading-normal">
                Ready to see these skills in action?
              </h4>

              <motion.a
                href="/projects"
                whileHover={{ scale: 1.03 }}
                whileActive={{ scale: 0.98 }}
                className="inline-flex items-center justify-center gap-2 px-8 py-3.5 rounded-full text-black font-extrabold text-xs tracking-widest uppercase transition-all shadow-xl hover:brightness-110 active:brightness-95 cursor-pointer bg-orange-500"
              >
                <span>View Projects</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </motion.a>
            </div>

          </div>
        </Section>
      </div>
    </div>
  );
}

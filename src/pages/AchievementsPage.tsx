import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import axios from 'axios';
import { io } from 'socket.io-client';
import Section from '../components/shared/Section';
import ParticlesBg from '../components/ui/particles-bg';
import { Trophy, Award, Sparkles, Flame, CheckCircle2, Zap, ShieldCheck, ArrowUpRight } from 'lucide-react';

const colorMap: Record<string, { accent: string, hex: string, textClass: string, iconClass: string }> = {
  orange: {
    accent: "from-orange-500/20 to-amber-500/20 border-orange-500/40 text-orange-400 glow-[rgba(251,146,60,0.15)]",
    hex: "#fb923c",
    textClass: "text-orange-400",
    iconClass: "text-orange-400"
  },
  blue: {
    accent: "from-blue-500/20 to-cyan-500/20 border-blue-500/40 text-blue-400 glow-[rgba(59,130,246,0.15)]",
    hex: "#3b82f6",
    textClass: "text-blue-400",
    iconClass: "text-blue-400"
  },
  purple: {
    accent: "from-purple-500/20 to-indigo-500/20 border-purple-500/40 text-purple-400 glow-[rgba(168,85,247,0.15)]",
    hex: "#a855f7",
    textClass: "text-purple-400",
    iconClass: "text-purple-400"
  },
  green: {
    accent: "from-emerald-500/20 to-teal-500/20 border-emerald-500/40 text-emerald-400 glow-[rgba(16,185,129,0.15)]",
    hex: "#10b981",
    textClass: "text-emerald-400",
    iconClass: "text-emerald-400"
  }
};

const getIcon = (type: string, color: string) => {
  const clr = colorMap[color] || colorMap.orange;
  const classes = `w-5 h-5 ${clr.iconClass}`;

  switch (type?.toLowerCase()) {
    case 'competition':
      return <Trophy className={classes} />;
    case 'certification':
      return <ShieldCheck className={classes} />;
    case 'programming':
      return <Flame className={classes} />;
    case 'academic':
      return <Zap className={classes} />;
    case 'research':
      return <Award className={classes} />;
    default:
      return <Sparkles className={classes} />;
  }
};

const statColors = ['text-orange-400', 'text-amber-400', 'text-purple-400', 'text-emerald-400', 'text-blue-400'];

export default function AchievementsPage() {
  const [badge, setBadge] = useState('AWARDS • PEER MILESTONES');
  const [heading, setHeading] = useState('MILESTONES & COMPETITIVE WINS');
  const [description, setDescription] = useState(
    'Recognized achievements across competitive programming, hackathons and certifications.'
  );

  const [stats, setStats] = useState<any[]>([
    { label: "Problems Solved", value: "200+", subtitle: "LeetCode" },
    { label: "Vadodara Rank", value: "Top 45 / 720+", subtitle: "Hackathon" },
    { label: "Integrated Builds", value: "5+", subtitle: "Projects" }
  ]);

  const [spotlight, setSpotlight] = useState<any>({
    title: "VADODARA HACKATHON RUNNER-UP",
    subtitle: "HACKATHON WINNER // Vadodara Hackathon",
    organization: "Vadodara Hackathon",
    year: "2025",
    description: "Runner-up finish in the city-level hackathon out of 720+ competing developer teams...",
    result: "Top 45 / 720+ Teams",
    location: "Vadodara, Gujarat",
    badge: "Vadodara Rank 2nd",
    icon: "Trophy",
    certLink: "",
    proofLink: "",
    galleryImage: ""
  });

  const [achievementsList, setAchievementsList] = useState<any[]>([
    { id: 'leetcode-streak', title: 'LeetCode Daily Active Streak', organization: 'LeetCode', year: '2025', category: 'Programming', summary: 'Solved 200+ coding problems focusing on optimization, memory efficiency and DSA.', badgeText: '200+ Solved', type: 'Programming', highlightColor: 'orange', order: 1 },
    { id: 'aws-practitioner', title: 'AWS Cloud Graduate', organization: 'AWS Academy', year: '2025', category: 'Certification', summary: 'Validated architectural knowledge of cloud infrastructure, serverless deployments, securely partitioned subnets, and CDN caching layers.', badgeText: 'AWS Certified', type: 'Certification', highlightColor: 'blue', order: 2 },
    { id: 'networks-elite', title: 'Network Engineering Elite', organization: 'IIT Kharagpur / NPTEL', year: '2025', category: 'Academic', summary: 'Acquired formal engineering certification in routers, network protocols, switching topologies, and network performance optimizations.', badgeText: 'Elite', type: 'Academic', highlightColor: 'purple', order: 3 }
  ]);

  const hydrateAchievements = (sec: any) => {
    if (!sec) return;
    if (sec.badge) setBadge(sec.badge);
    if (sec.heading) setHeading(sec.heading);
    if (sec.description) setDescription(sec.description);

    if (sec.stats) setStats(sec.stats);
    if (sec.spotlight) setSpotlight(sec.spotlight);
    if (sec.achievements) {
      const sorted = [...sec.achievements].sort((a: any, b: any) => (a.order || 0) - (b.order || 0));
      setAchievementsList(sorted);
    }
  };

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const res = await axios.get(`${import.meta.env.VITE_API_BASE_URL || 'http://localhost:5000'}/api/portfolio/slug/mahi`);
        if (res.data?.data?.profile?.achievementsSection) {
          hydrateAchievements(res.data.data.profile.achievementsSection);
        }
      } catch (err) {
        console.error('Failed to fetch dynamic achievements:', err);
      }
    };
    fetchProfile();
  }, []);

  useEffect(() => {
    const socket = io(import.meta.env.VITE_API_BASE_URL || 'http://localhost:5000');
    socket.emit('portfolio:join', 'mahi');

    socket.on('achievements:updated', (payload: any) => {
      console.log('⚡ Live achievements sync in MS frontend:', payload);
      if (payload.achievementsSection) {
        hydrateAchievements(payload.achievementsSection);
      }
    });

    return () => {
      socket.disconnect();
    };
  }, []);

  return (
    <Section id="achievements-page" title={heading} subtitle={badge}>
      <div className="relative w-full rounded-[32px] overflow-hidden border border-white/10 p-4 sm:p-6 md:p-10 select-none bg-neutral-950/30 backdrop-blur-xl shadow-[0_30px_60px_rgba(0,0,0,0.4)]">

        {/* Radial Glow Background */}
        <div
          className="absolute inset-0 -z-10 pointer-events-none"
          style={{
            backgroundImage: `radial-gradient(circle 500px at 50% 100px, rgba(132,204,22,0.08), transparent)`,
          }}
        />

        {/* Dynamic section-level particles background */}
        <ParticlesBg />

        {/* Darkening translucent overlay for premium glass text rendering */}
        <div className="absolute inset-0 -z-9 bg-neutral-950/20" />

        <div className="space-y-8 md:space-y-12 relative z-10 text-left">

          {/* Animated Metrics Row */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 pb-10 border-b border-white/5">
            {stats.map((stat, idx) => {
              const color = statColors[idx % statColors.length];
              return (
                <motion.div
                  key={stat.label || idx}
                  initial={{ opacity: 0, scale: 0.9 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: idx * 0.1, ease: "easeOut" }}
                  className="rounded-2xl border border-white/5 bg-neutral-900/35 backdrop-blur-md p-4 flex flex-col items-center justify-center text-center hover:border-white/10 transition-all duration-300 relative group overflow-hidden"
                >
                  <div className="absolute inset-0 -translate-x-full group-hover:translate-x-full bg-gradient-to-r from-transparent via-white/5 to-transparent transition-transform duration-1000 ease-out" />
                  <span className={`text-3xl md:text-4xl font-black font-display tracking-tight ${color} block mb-1`}>
                    {stat.value}
                  </span>
                  <span className="text-[10px] font-mono tracking-widest text-neutral-400 font-extrabold uppercase">
                    {stat.label}
                  </span>
                  {stat.subtitle && (
                    <span className="text-[8px] font-mono text-zinc-500 uppercase mt-0.5 font-bold">
                      {stat.subtitle}
                    </span>
                  )}
                </motion.div>
              );
            })}
          </div>

          {/* Main Spotlight Section: The Victory Wall */}
          <div className="space-y-6">
            <span className="text-[10px] font-mono tracking-widest text-neutral-400 font-extrabold uppercase">
              // PRESTIGIOUS SPOTLIGHT
            </span>

            {spotlight && (
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
                className="w-full rounded-[28px] border border-amber-500/25 bg-gradient-to-br from-amber-500/5 via-neutral-950/70 to-neutral-950 p-6 md:p-10 flex flex-col md:flex-row items-center justify-between gap-8 hover:border-amber-500/40 transition-all duration-500 relative group shadow-[0_20px_50px_rgba(0,0,0,0.6)]"
              >
                {/* Spotlight Ambient Glow */}
                <div className="absolute -inset-1 rounded-[29px] bg-gradient-to-br from-amber-500/10 to-transparent blur-xl opacity-50 pointer-events-none group-hover:opacity-75 transition-all duration-500" />

                {/* Left Side: Spotlight text details */}
                <div className="space-y-6 flex-1 text-left relative z-10">
                  <div className="flex items-center gap-2">
                    <span className="relative flex h-2 w-2">
                      <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-amber-400 opacity-75"></span>
                      <span className="relative inline-flex rounded-full h-2 w-2 bg-amber-500"></span>
                    </span>
                    <span className="text-[9px] font-mono tracking-widest text-amber-400 font-bold uppercase truncate max-w-[85%]">
                      {spotlight.subtitle || `HACKATHON WINNER // ${spotlight.organization}`}
                    </span>
                  </div>

                  <div className="space-y-3">
                    <h3 className="text-2xl md:text-3xl font-black text-white uppercase tracking-tight leading-tight font-display whitespace-pre-line">
                      {spotlight.title}
                    </h3>
                    <p className="text-neutral-300 text-xs md:text-sm font-light leading-relaxed max-w-2xl font-sans">
                      {spotlight.description}
                    </p>
                  </div>

                  <div className="flex flex-wrap gap-6 pt-4 border-t border-white/5">
                    <div>
                      <span className="text-[8px] font-mono tracking-widest text-neutral-500 font-extrabold uppercase block mb-1">
                        Placement Result
                      </span>
                      <span className="text-xs font-mono font-black text-amber-400 uppercase tracking-wide">
                        {spotlight.result || '🥈 2nd Place / 100+ Teams'}
                      </span>
                    </div>
                    <div>
                      <span className="text-[8px] font-mono tracking-widest text-neutral-500 font-extrabold uppercase block mb-1">
                        Timeline Verification
                      </span>
                      <span className="text-xs font-mono font-black text-neutral-300 uppercase tracking-wide">
                        {spotlight.location || 'Vadodara'}, Year {spotlight.year || '2024'}
                      </span>
                    </div>
                    {(spotlight.certLink || spotlight.proofLink) && (
                      <div>
                        <span className="text-[8px] font-mono tracking-widest text-neutral-500 font-extrabold uppercase block mb-1">
                          Credentials
                        </span>
                        <div className="flex gap-3">
                          {spotlight.certLink && (
                            <a href={spotlight.certLink} target="_blank" rel="noopener noreferrer" className="text-xs font-mono font-black text-cyan-400 hover:text-cyan-300 uppercase tracking-wide underline flex items-center gap-1">
                              Certificate <ArrowUpRight className="w-3 h-3" />
                            </a>
                          )}
                          {spotlight.proofLink && (
                            <a href={spotlight.proofLink} target="_blank" rel="noopener noreferrer" className="text-xs font-mono font-black text-cyan-400 hover:text-cyan-300 uppercase tracking-wide underline flex items-center gap-1">
                              Official Proof <ArrowUpRight className="w-3 h-3" />
                            </a>
                          )}
                        </div>
                      </div>
                    )}
                  </div>
                </div>

                {/* Right Side: Animated cyber trophy badge illustration */}
                <div className="w-[120px] h-[120px] md:w-[160px] md:h-[160px] shrink-0 relative flex items-center justify-center z-10">
                  {/* Glowing Orbit Rings */}
                  <div className="absolute inset-0 rounded-full border border-amber-500/15 animate-spin pointer-events-none" style={{ animationDuration: '15s' }} />
                  <div className="absolute inset-2 rounded-full border border-amber-500/10 border-dashed animate-spin pointer-events-none" style={{ animationDuration: '8s', animationDirection: 'reverse' }} />

                  {/* Giant Glowing Trophy Badge */}
                  <motion.div
                    animate={{ y: [0, -6, 0] }}
                    transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
                    className="w-16 h-16 md:w-20 md:h-20 rounded-full bg-gradient-to-br from-amber-500/20 to-yellow-500/5 border border-amber-400/40 flex items-center justify-center text-amber-400 shadow-[0_0_35px_rgba(245,158,11,0.25)] relative"
                  >
                    <Trophy className="w-8 h-8 md:w-10 md:h-10 text-amber-400 filter drop-shadow-[0_0_10px_rgba(245,158,11,0.5)]" />
                    {/* Tiny sparkles surrounding */}
                    <div className="absolute top-0 right-0 w-2 h-2 rounded-full bg-yellow-400 animate-ping" />
                  </motion.div>
                </div>
              </motion.div>
            )}
          </div>

          {/* Timeline Section */}
          <div className="space-y-8 pt-4">
            <span className="text-[10px] font-mono tracking-widest text-neutral-400 font-extrabold uppercase block text-left">
              // COMPETITIVE MILESTONE ROADMAP
            </span>

            <div className="relative border-l-2 border-white/5 pl-5 md:pl-10 space-y-10">

              {achievementsList.map((ach, idx) => {
                const colorData = colorMap[ach.highlightColor] || colorMap.orange;
                const isEvenMobile = idx % 2 === 1;
                return (
                  <motion.div
                    key={ach.id || idx}
                    initial={{ opacity: 0, x: -30 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.6, delay: idx * 0.15 }}
                    className="relative group text-left"
                  >
                    {/* Timeline Glowing Milestone Node */}
                    <div
                      className="absolute -left-[26px] md:-left-[49px] top-2 md:top-1.5 w-3 h-3 md:w-4 md:h-4 rounded-full border-2 bg-neutral-950 transition-all duration-500 group-hover:scale-125"
                      style={{
                        borderColor: colorData.hex,
                        boxShadow: `0 0 10px ${colorData.hex}50`
                      }}
                    />

                    {/* Timeline card component */}
                    <div className={`rounded-2xl border border-white/5 bg-neutral-900/30 hover:bg-neutral-900/50 backdrop-blur-md p-5 md:p-6 transition-all duration-300 relative hover:border-white/10 flex flex-col md:flex-row md:items-center justify-between gap-6 ${isEvenMobile ? 'ml-2 md:ml-0' : 'ml-0'
                      }`}>
                      <div className="space-y-3 flex-1">
                        {/* Year badge & category */}
                        <div className="flex items-center gap-3">
                          <span className="px-2 py-0.5 rounded text-[9px] font-mono font-bold bg-neutral-950 border border-white/5 text-neutral-400 uppercase tracking-widest">
                            {ach.year}
                          </span>
                          <span className="text-[9px] font-mono tracking-widest text-neutral-500 font-bold uppercase">
                            {ach.category || ach.type}
                          </span>
                          {ach.organization && (
                            <>
                              <span className="text-neutral-700 text-[8px]">•</span>
                              <span className="text-[9px] font-mono tracking-widest text-neutral-400 font-medium uppercase">
                                {ach.organization}
                              </span>
                            </>
                          )}
                        </div>

                        {/* Title */}
                        <h4 className="text-base md:text-lg font-bold text-white uppercase tracking-tight font-display">
                          {ach.title}
                        </h4>

                        {/* Description */}
                        <p className="text-neutral-400 text-xs md:text-sm font-light leading-relaxed font-sans max-w-3xl">
                          {ach.summary}
                        </p>
                      </div>

                      {/* Right Action/Metric Capsule */}
                      <div className="shrink-0 flex items-center gap-4">
                        {ach.badgeText && (
                          <div className="flex items-center gap-2 px-3 py-1.5 rounded-xl bg-neutral-950 border border-white/5 font-mono text-[10px] font-bold tracking-wider text-neutral-300">
                            <Sparkles className={`w-3 h-3 ${colorData.textClass} shrink-0`} />
                            <span>{ach.badgeText}</span>
                          </div>
                        )}

                        <div className="w-10 h-10 rounded-xl bg-neutral-950 border border-white/5 flex items-center justify-center text-neutral-400 group-hover:text-white transition-colors duration-300">
                          {getIcon(ach.type, ach.highlightColor)}
                        </div>
                      </div>
                    </div>
                  </motion.div>
                );
              })}

              {achievementsList.length === 0 && (
                <div className="p-8 text-center bg-neutral-900/10 border border-dashed border-white/10 rounded-2xl">
                  <span className="text-xs text-neutral-500">No achievements registered in the timeline.</span>
                </div>
              )}

            </div>
          </div>

        </div>
      </div>
    </Section>
  );
}

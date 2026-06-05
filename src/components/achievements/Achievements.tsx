import React from 'react';
import { motion } from 'framer-motion';
import Section from '../shared/Section';
import { portfolioData } from '../../data/portfolioData';
import { Trophy, Star, Target } from 'lucide-react';

export default function Achievements() {
  return (
    <Section id="achievements" title="Achievements" subtitle="ACHIEVEMENTS • Awards & Contests">
      <div className="space-y-6 text-left select-none">
        {portfolioData.achievements.map((ach, i) => (
          <motion.div
            key={ach.id}
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.6, delay: i * 0.15 }}
            whileHover={{ x: 6 }}
            className="group solid-card p-6 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-6 relative overflow-hidden shadow-md"
          >
            <div className="flex items-start gap-4">
              <div className="w-12 h-12 rounded-xl bg-accent/10 border border-accent/20 flex items-center justify-center text-accent shrink-0 group-hover:scale-105 transition-transform duration-300">
                {ach.id.includes('hackathon') ? (
                  <Trophy className="w-6 h-6" />
                ) : (
                  <Target className="w-6 h-6" />
                )}
              </div>
              <div className="space-y-1">
                <div className="flex items-center gap-3">
                  <h4 className="text-white font-bold text-base uppercase tracking-tight group-hover:text-accent transition-colors duration-200 font-display">
                    {ach.title}
                  </h4>
                  <span className="text-[10px] text-neutral-500 font-semibold font-sans">
                    {ach.date}
                  </span>
                </div>
                <span className="text-[10px] text-accent font-semibold uppercase tracking-wider block font-sans">
                  {ach.organization}
                </span>
                <p className="text-neutral-400 text-xs md:text-sm font-light leading-relaxed max-w-2xl pt-1 font-sans">
                  {ach.description}
                </p>
              </div>
            </div>

            {/* Clean Rank Badge */}
            {ach.stat && (
              <div className="self-end sm:self-center px-4 py-2 rounded-xl bg-[#181818] border border-white/5 text-right select-none shadow-sm shrink-0">
                <span className="text-[9px] text-neutral-500 font-semibold uppercase block font-sans">Ranking</span>
                <span className="text-white font-extrabold text-sm tracking-tight uppercase flex items-center gap-1.5 justify-end font-display">
                  <Star className="w-3.5 h-3.5 text-yellow-500 fill-yellow-500" />
                  {ach.stat}
                </span>
              </div>
            )}
          </motion.div>
        ))}
      </div>
    </Section>
  );
}

import React from 'react';
import { motion } from 'framer-motion';
import Section from '../shared/Section';
import { portfolioData } from '../../data/portfolioData';
import { Bookmark, Calendar } from 'lucide-react';

export default function Journey() {
  return (
    <Section id="journey" title="Learning Journey" subtitle="JOURNEY • Academic Roadmap">
      <div className="relative border-l border-white/5 ml-4 md:ml-6 text-left select-none space-y-12">
        {portfolioData.journey.map((item, i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.6, delay: i * 0.15 }}
            className="relative pl-8 md:pl-10 group"
          >
            {/* Timeline bullet indicator */}
            <div className="absolute -left-[9px] top-1.5 w-4 h-4 rounded-full bg-[#080808] border-2 border-white/10 group-hover:border-accent group-hover:bg-accent/10 flex items-center justify-center transition-all duration-300">
              <div className="w-1.5 h-1.5 rounded-full bg-neutral-700 group-hover:bg-accent transition-colors" />
            </div>

            {/* Main journey card block */}
            <div className="group solid-card p-6 relative overflow-hidden transition-all duration-300 shadow-md">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 mb-3">
                <h4 className="text-white font-bold text-sm uppercase tracking-wide group-hover:text-accent transition-colors duration-200 flex items-center gap-2 font-display">
                  <Bookmark className="w-4 h-4 text-accent shrink-0" />
                  {item.title}
                </h4>
                
                <span className="inline-flex items-center gap-1.5 text-[10px] text-accent font-semibold uppercase tracking-wider bg-accent/5 border border-accent/20 px-2.5 py-0.5 rounded-full self-start sm:self-center font-sans">
                  <Calendar className="w-3 h-3" />
                  {item.year}
                </span>
              </div>

              <p className="text-neutral-400 text-xs md:text-sm font-light leading-relaxed font-sans">
                {item.description}
              </p>
            </div>
          </motion.div>
        ))}
      </div>
    </Section>
  );
}

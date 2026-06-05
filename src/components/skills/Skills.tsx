import React from 'react';
import { motion } from 'framer-motion';
import Section from '../shared/Section';
import { portfolioData } from '../../data/portfolioData';
import { Terminal, Laptop, Server, Database, GraduationCap, ChevronRight } from 'lucide-react';

const categoryIcons: { [key: string]: React.ReactNode } = {
  "Languages": <Terminal className="w-4 h-4 text-accent" />,
  "Frontend": <Laptop className="w-4 h-4 text-accent" />,
  "Backend": <Server className="w-4 h-4 text-accent" />,
  "Databases & Tools": <Database className="w-4 h-4 text-accent" />,
  "Currently Learning": <GraduationCap className="w-4 h-4 text-accent" />
};

export default function Skills() {
  const containerVariants = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 15 },
    show: { opacity: 1, y: 0, transition: { duration: 0.5, ease: "easeOut" } }
  };

  return (
    <div className="min-h-0 bg-transparent p-0 relative overflow-visible">
      <Section id="skills" title="My Skills" subtitle="SKILLS • Technologies & Tools">
        <motion.div 
        variants={containerVariants}
        initial="hidden"
        whileInView="show"
        viewport={{ once: true, margin: "-100px" }}
        className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 text-left select-none"
      >
        {portfolioData.skillsData.map((cat, i) => (
          <motion.div
            key={i}
            variants={itemVariants}
            className="group solid-card p-6 relative overflow-hidden transition-all duration-300 shadow-md"
          >
            <div className="flex items-center gap-3 border-b border-white/5 pb-3 mb-4">
              <div className="w-8 h-8 rounded-lg bg-[#1a1a1a] border border-white/5 flex items-center justify-center group-hover:scale-105 transition-transform duration-300">
                {categoryIcons[cat.category] || <Terminal className="w-4 h-4 text-neutral-400" />}
              </div>
              <h4 className="text-white font-bold text-sm uppercase tracking-wide font-display">
                {cat.category}
              </h4>
            </div>

            <ul className="space-y-3">
              {cat.skills.map((skill, si) => (
                <li key={si} className="space-y-1.5">
                  <div className="flex justify-between items-center text-xs font-sans">
                    <span className="text-neutral-400 group-hover:text-neutral-200 transition-colors duration-200 flex items-center gap-1 font-light">
                      <ChevronRight className="w-3 h-3 text-neutral-600 group-hover:text-accent transition-colors duration-200" />
                      {skill.name}
                    </span>
                    <span className="text-[10px] text-neutral-500 font-semibold">
                      {skill.level}0%
                    </span>
                  </div>

                  {/* Single Clean Accent Color Progress Meter */}
                  <div className="h-1 w-full bg-[#181818] rounded-full overflow-hidden relative">
                    <motion.div
                      initial={{ width: 0 }}
                      whileInView={{ width: `${skill.level * 10}%` }}
                      viewport={{ once: true }}
                      transition={{ duration: 1, delay: 0.2 + si * 0.05 }}
                      className="absolute top-0 left-0 h-full bg-accent rounded-full"
                    />
                  </div>
                </li>
              ))}
            </ul>
          </motion.div>
        ))}
        </motion.div>
      </Section>
    </div>
  );
}

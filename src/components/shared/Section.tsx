import React from 'react';
import { motion } from 'framer-motion';

interface SectionProps {
  id: string;
  title: string;
  subtitle?: string;
  children: React.ReactNode;
  className?: string;
}

export default function Section({ id, title, subtitle, children, className = '' }: SectionProps) {
  const isCompact = id === 'projects-page' || id === 'internship-page' || id === 'achievements-page' || id === 'certificates-page' || id === 'journey-page';
  return (
    <section 
      id={id} 
      className={`py-8 md:py-12 relative ${className} ${isCompact ? 'pt-5 pb-4 md:py-12' : ''}`}
    >
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-100px" }}
        transition={{ duration: 0.8, ease: "easeOut" }}
        className={`text-left relative z-10 ${isCompact ? 'mb-4 sm:mb-6 md:mb-12' : 'mb-12'}`}
      >
        {subtitle !== "" && (
          <span className="text-[9px] md:text-[10px] text-accent font-semibold uppercase tracking-[0.25em] block mb-2.5">
            {subtitle ? subtitle.replace(" // ", " • ") : id.toUpperCase()}
          </span>
        )}
        <h2 className={`font-extrabold tracking-tight text-white uppercase font-display ${
          isCompact 
            ? 'text-[1.8rem] xs:text-[2.2rem] sm:text-3xl md:text-4xl leading-tight sm:leading-none' 
            : 'text-2xl sm:text-3xl md:text-4xl leading-none'
        }`}>
          {title}
        </h2>
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-100px" }}
        transition={{ duration: 0.8, delay: 0.2, ease: "easeOut" }}
        className="relative z-10"
      >
        {children}
      </motion.div>
    </section>
  );
}

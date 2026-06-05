import React, { useState } from 'react';
import { motion } from 'framer-motion';
import Section from '../shared/Section';
import { portfolioData } from '../../data/portfolioData';
import { Mail, Github, Linkedin, Sparkles, Copy, Check } from 'lucide-react';

export default function Contact() {
  const [copied, setCopied] = useState(false);

  const handleCopyEmail = () => {
    navigator.clipboard.writeText(portfolioData.email);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <Section id="contact" title="Get in Touch" subtitle="CONTACT • Say Hello">
      <div className="grid grid-cols-1 md:grid-cols-12 gap-12 text-left select-none">
        
        {/* Left Column: Messages/Vibe */}
        <div className="md:col-span-6 space-y-6">
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-emerald-500/10 border border-emerald-500/20"
          >
            <Sparkles className="w-3.5 h-3.5 text-emerald-400" />
            <span className="text-[10px] text-emerald-300 uppercase tracking-widest font-sans font-bold">
              {portfolioData.availability}
            </span>
          </motion.div>

          <h3 className="text-2xl md:text-3xl font-extrabold text-white uppercase tracking-tight leading-tight font-heading">
            Let's build something exceptional together.
          </h3>
          
          <p className="text-neutral-400 text-sm md:text-base leading-relaxed font-light font-sans max-w-md">
            Whether you want to talk about full-stack development, AI projects, coding assignments, or just want to collaborate on a cool idea, my inbox is open!
          </p>
        </div>

        {/* Right Column: Interactive cards */}
        <div className="md:col-span-6 space-y-4">
          
          {/* Email Copier Card */}
          <div 
            onClick={handleCopyEmail}
            className="group solid-card p-6 hover:border-accent/40 transition-all duration-300 flex items-center justify-between cursor-pointer relative overflow-hidden"
          >
            <div className="flex items-center gap-4">
              <div className="w-10 h-10 rounded-xl bg-accent/5 border border-accent/20 flex items-center justify-center text-accent shadow-inner group-hover:scale-105 transition-transform duration-300 shrink-0">
                <Mail className="w-5 h-5" />
              </div>
              <div>
                <span className="text-[9px] text-neutral-500 font-sans uppercase tracking-wider block mb-0.5">DIRECT EMAIL</span>
                <span className="text-white font-bold text-sm tracking-wide group-hover:text-accent transition-colors font-sans">{portfolioData.email}</span>
              </div>
            </div>

            <button 
              className="w-8 h-8 rounded-full border border-white/5 bg-white/5 hover:bg-white/10 text-neutral-500 hover:text-white flex items-center justify-center transition-all cursor-pointer shrink-0"
              type="button"
            >
              {copied ? (
                <Check className="w-4 h-4 text-emerald-400" />
              ) : (
                <Copy className="w-4 h-4 text-neutral-400 group-hover:text-accent transition-colors" />
              )}
            </button>
          </div>

          {/* Social Links Rows */}
          <div className="grid grid-cols-2 gap-4">
            
            <a 
              href={portfolioData.github}
              target="_blank"
              rel="noreferrer"
              className="group solid-card p-6 transition-all duration-300 flex flex-col justify-between h-32 cursor-pointer hover:border-accent/40"
            >
              <div className="w-9 h-9 rounded-xl bg-accent/5 border border-accent/20 flex items-center justify-center text-accent shadow-inner group-hover:scale-105 transition-transform duration-300 shrink-0">
                <Github className="w-5 h-5" />
              </div>
              <div>
                <span className="text-[8px] text-neutral-500 font-sans uppercase tracking-wider block mb-0.5">CODEBASE</span>
                <span className="text-white font-bold text-xs uppercase tracking-wider group-hover:text-accent transition-colors font-sans font-bold">GitHub</span>
              </div>
            </a>

            <a 
              href={portfolioData.linkedin}
              target="_blank"
              rel="noreferrer"
              className="group solid-card p-6 transition-all duration-300 flex flex-col justify-between h-32 cursor-pointer hover:border-accent/40"
            >
              <div className="w-9 h-9 rounded-xl bg-accent/5 border border-accent/20 flex items-center justify-center text-accent shadow-inner group-hover:scale-105 transition-transform duration-300 shrink-0">
                <Linkedin className="w-5 h-5" />
              </div>
              <div>
                <span className="text-[8px] text-neutral-500 font-sans uppercase tracking-wider block mb-0.5">NETWORK</span>
                <span className="text-white font-bold text-xs uppercase tracking-wider group-hover:text-accent transition-colors font-sans font-bold">LinkedIn</span>
              </div>
            </a>

          </div>

        </div>

      </div>
    </Section>
  );
}

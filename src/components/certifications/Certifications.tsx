import React from 'react';
import { motion } from 'framer-motion';
import Section from '../shared/Section';
import { portfolioData } from '../../data/portfolioData';
import { ShieldCheck, ExternalLink } from 'lucide-react';

export default function Certifications() {
  return (
    <Section id="certifications" title="Certifications" subtitle="CERTIFICATES • Course Certificates">
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 text-left select-none">
        {portfolioData.certifications.map((cert, i) => (
          <motion.div
            key={cert.id}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.6, delay: i * 0.15 }}
            whileHover={{ y: -4 }}
            className="group bg-[#111111] border border-white/5 p-6 rounded-[24px] hover:border-accent/25 hover:shadow-lg transition-all duration-300 relative overflow-hidden flex flex-col justify-between"
          >
            <div className="space-y-4">
              <div className="w-10 h-10 rounded-xl bg-accent/10 border border-accent/20 flex items-center justify-center text-accent shrink-0 group-hover:scale-105 transition-transform duration-300">
                <ShieldCheck className="w-5 h-5" />
              </div>

              <div>
                <h4 className="text-white font-bold text-sm uppercase tracking-wide group-hover:text-accent transition-colors duration-200 font-display">
                  {cert.title}
                </h4>
                <span className="text-[10px] text-accent font-semibold uppercase tracking-widest block mt-1 font-sans">
                  {cert.issuer}
                </span>
              </div>
            </div>

            <div className="flex items-center justify-between mt-6 pt-4 border-t border-white/5 font-sans">
              <span className="text-[10px] text-neutral-500 font-semibold uppercase tracking-wider">
                Issued: {cert.date}
              </span>
              
              {cert.credentialUrl && (
                <a
                  href={cert.credentialUrl}
                  target="_blank"
                  rel="noreferrer"
                  className="inline-flex items-center gap-1.5 text-[10px] text-accent hover:text-accent-hover font-semibold uppercase tracking-wider cursor-pointer transition-colors"
                >
                  Verify Credential
                  <ExternalLink className="w-3 h-3" />
                </a>
              )}
            </div>
          </motion.div>
        ))}
      </div>
    </Section>
  );
}

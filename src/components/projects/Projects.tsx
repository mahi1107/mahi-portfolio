import React, { useRef, useState } from 'react';
import { motion } from 'framer-motion';
import Section from '../shared/Section';
import { portfolioData, type ProjectItem } from '../../data/portfolioData';
import { Github, ExternalLink } from 'lucide-react';

function BentoCard({ project }: { project: ProjectItem }) {
  const cardRef = useRef<HTMLDivElement>(null);
  const [coords, setCoords] = useState({ x: 0, y: 0 });
  const [isHovered, setIsHovered] = useState(false);

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!cardRef.current) return;
    const rect = cardRef.current.getBoundingClientRect();
    setCoords({
      x: e.clientX - rect.left,
      y: e.clientY - rect.top
    });
  };

  const isLarge = project.size === 'large';
  const isMedium = project.size === 'medium';

  return (
    <motion.div
      ref={cardRef}
      onMouseMove={handleMouseMove}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      whileHover={{ y: -5 }}
      className={`group bg-[#111111] border border-white/5 p-6 rounded-[24px] hover:border-accent/25 hover:shadow-lg transition-all duration-300 relative overflow-hidden flex flex-col justify-between ${
        isLarge 
          ? 'md:col-span-12 lg:col-span-8 min-h-[350px]' 
          : isMedium 
            ? 'md:col-span-6 lg:col-span-4 min-h-[300px]' 
            : 'md:col-span-6 lg:col-span-4 min-h-[260px]'
      }`}
    >
      {/* Subtle modern cursor spotlight gradient */}
      {isHovered && (
        <div 
          className="absolute inset-0 pointer-events-none transition-opacity duration-300"
          style={{
            background: `radial-gradient(300px circle at ${coords.x}px ${coords.y}px, rgba(6, 182, 212, 0.06), transparent 80%)`
          }}
        />
      )}

      {/* Main card details container */}
      <div className="space-y-4 relative z-10 text-left select-none">
        <div className="flex justify-between items-start gap-4">
          <span className="text-[9px] text-accent font-semibold uppercase tracking-widest block border border-accent/15 px-2.5 py-0.5 rounded-full bg-accent/5 font-sans">
            {project.featured ? "Featured" : "Project"}
          </span>
          {project.highlight && (
            <span className="text-[9px] text-neutral-400 font-semibold tracking-wider block uppercase truncate max-w-[200px] font-sans">
              {project.highlight}
            </span>
          )}
        </div>

        <div>
          <h3 className="text-lg font-extrabold text-white uppercase group-hover:text-accent transition-colors duration-200 font-display">
            {project.title}
          </h3>
          <p className="text-neutral-400 text-xs md:text-sm font-light mt-2 leading-relaxed font-sans">
            {project.description}
          </p>
        </div>

        {/* Tech Stack Pills */}
        <div className="flex flex-wrap gap-1.5 pt-2">
          {project.techStack.map((tech, i) => (
            <span 
              key={i} 
              className="px-2.5 py-0.5 rounded-md bg-[#181818] border border-white/5 text-[9px] text-neutral-400 font-semibold"
            >
              {tech}
            </span>
          ))}
        </div>
      </div>

      {/* Card Action Links Footer */}
      <div className="flex items-center justify-between pt-5 mt-auto border-t border-white/5 relative z-10 select-none">
        <span className="text-[9px] text-neutral-500 font-semibold uppercase tracking-wider">
          LINKS
        </span>

        <div className="flex items-center gap-3">
          {project.githubUrl && (
            <a 
              href={project.githubUrl}
              target="_blank"
              rel="noreferrer"
              className="w-8 h-8 rounded-full border border-white/5 bg-[#181818] hover:bg-[#222] hover:border-accent/20 text-neutral-400 hover:text-white flex items-center justify-center transition-all cursor-pointer shadow-md"
            >
              <Github className="w-4 h-4" />
            </a>
          )}
          {project.liveUrl && (
            <a 
              href={project.liveUrl}
              target="_blank"
              rel="noreferrer"
              className="w-8 h-8 rounded-full border border-white/5 bg-[#181818] hover:bg-[#222] hover:border-accent/20 text-neutral-400 hover:text-white flex items-center justify-center transition-all cursor-pointer shadow-md"
            >
              <ExternalLink className="w-4 h-4" />
            </a>
          )}
        </div>
      </div>
    </motion.div>
  );
}

export default function Projects() {
  return (
    <Section id="projects" title="Showcase Projects" subtitle="PROJECTS • Featured Work">
      <div className="grid grid-cols-1 md:grid-cols-12 gap-6 items-stretch">
        {portfolioData.projects.map((project) => (
          <BentoCard key={project.id} project={project} />
        ))}
      </div>
    </Section>
  );
}

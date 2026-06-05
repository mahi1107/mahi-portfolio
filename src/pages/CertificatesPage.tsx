import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { io } from 'socket.io-client';
import axios from 'axios';
import Section from '../components/shared/Section';
import {
  ShieldCheck,
  ExternalLink,
  Award,
  Calendar,
  ArrowRight,
  CheckCircle2,
  Download,
  Lock,
  X,
  FileText,
  FileCheck2,
  Cpu,
  Cloud,
  Network,
  Database,
  Lock as LockIcon,
  TrendingUp,
  Activity,
  BarChart3
} from 'lucide-react';
import { Dialog, DialogContent, DialogTrigger } from '../components/ui/dialog';

// Custom interface matching CMS dynamic structure
interface CustomCertificate {
  id: string;
  title: string;
  issuer: string;
  date: string;
  verifyCode: string;
  credentialUrl: string;
  issuerLogoText: string;
  logoBg: string;
  logoColor: string;
  certificateImage: string;
  featured: boolean;
  visible: boolean;
  accentColor: string;
  glowColor: string;
  status: 'Verified' | 'Elite' | 'Professional' | 'Foundation' | 'Academic';
  achievementTag: string;
  showAchievementTag: boolean;
  showCredentialBtn: boolean;
  externalVerification: boolean;
  downloadToggle: boolean;
  skills: string[];
}

export default function CertificatesPage() {
  const [selectedCert, setSelectedCert] = useState<CustomCertificate | null>(null);

  // Section Configuration states
  const [badge, setMsBadge] = useState('CREDENTIAL SHOWCASE');
  const [heading, setMsHeading] = useState('CERTIFICATIONS & LEARNING');
  const [description, setMsDescription] = useState('Industry-recognized credentials validating cloud, networking, and software systems engineering expertise.');
  const [blurIntensity, setMsBlurIntensity] = useState(12);
  const [overlayDarkness, setMsOverlayDarkness] = useState(85);
  const [glassTransparency, setMsGlassTransparency] = useState(20);
  const [warmTint, setMsWarmTint] = useState(true);

  // Verification Settings
  const [verificationBadgeStyle, setMsVerificationBadgeStyle] = useState<'glow' | 'outline' | 'pulse' | 'static'>('glow');
  const [verificationColorMode, setMsVerificationColorMode] = useState<'green' | 'blue' | 'orange' | 'academy'>('orange');
  const [verificationAnimation, setMsVerificationAnimation] = useState<'shimmer' | 'pulse' | 'hover glow'>('shimmer');
  const [trustIndicators, setMsTrustIndicators] = useState({
    verified: true,
    ranked: true,
    institutionBacked: true,
    academyIssued: true
  });

  // Display Layout presets
  const [layout, setMsLayout] = useState({
    gridColumnsDesktop: 2,
    gridColumnsMobile: 1,
    cardMinHeight: 320,
    integratedBadge: true
  });

  // Telemetry Analytics & Radar tracks
  const [analytics, setMsAnalytics] = useState({
    totalCertifications: 4,
    activeLearningTracks: 4,
    completionScore: 100,
    platformCount: 4,
    radarTracks: {
      Cloud: 85,
      AI: 75,
      Networking: 90,
      Backend: 80,
      Security: 70
    }
  });

  // Dynamic certificates array
  const [certificatesList, setMsCertificatesList] = useState<CustomCertificate[]>([]);

  // Seed Fallback data
  const staticFallbackCerts: CustomCertificate[] = [
    {
      id: "aws-cloud",
      title: "AWS Certified Cloud Foundations",
      issuer: "AWS Academy",
      date: "2025",
      verifyCode: "AWS-ACADEMY-9812-421",
      credentialUrl: "/certificates/aws-cloud.pdf",
      issuerLogoText: "AWS",
      logoBg: "bg-amber-500/10 border-amber-500/20",
      logoColor: "text-amber-500",
      certificateImage: "/certificates/aws-cloud.png",
      featured: true,
      visible: true,
      accentColor: "amber",
      glowColor: "#f59e0b",
      status: "Verified",
      achievementTag: "AWS Academy Graduate",
      showAchievementTag: true,
      showCredentialBtn: true,
      externalVerification: true,
      downloadToggle: false,
      skills: ["AWS", "Cloud Computing", "IAM", "EC2", "S3", "Security Foundations"]
    },
    {
      id: "nptel-networks",
      title: "Network Engineering Certification (Elite)",
      issuer: "NPTEL / IIT Kharagpur",
      date: "2025",
      verifyCode: "NPTEL23CS82S637201",
      credentialUrl: "/certificates/nptel-networks.pdf",
      issuerLogoText: "IIT",
      logoBg: "bg-blue-500/10 border-blue-500/20",
      logoColor: "text-blue-400",
      certificateImage: "/certificates/nptel-networks.png",
      featured: true,
      visible: true,
      accentColor: "blue",
      glowColor: "#3b82f6",
      status: "Elite",
      achievementTag: "Elite",
      showAchievementTag: true,
      showCredentialBtn: true,
      externalVerification: true,
      downloadToggle: false,
      skills: ["Computer Networks", "OSI Model", "Routing Protocols", "Subnetting", "Switching"]
    },
    {
      id: "ibm-ai-fundamentals",
      title: "AI Fundamentals",
      issuer: "IBM SkillsBuild & Cisco Networking Academy",
      date: "2025",
      verifyCode: "IBM-AI-FUNDAMENTALS-2025",
      credentialUrl: "/certificates/ibm-ai-fundamentals.pdf",
      issuerLogoText: "IBM",
      logoBg: "bg-cyan-500/10 border-cyan-500/20",
      logoColor: "text-cyan-400",
      certificateImage: "/certificates/ibm-ai-fundamentals.png",
      featured: true,
      visible: true,
      accentColor: "cyan",
      glowColor: "#06b6d4",
      status: "Verified",
      achievementTag: "AI Certified",
      showAchievementTag: true,
      showCredentialBtn: true,
      externalVerification: true,
      downloadToggle: false,
      skills: [
        "Artificial Intelligence",
        "Machine Learning",
        "Deep Learning",
        "Natural Language Processing",
        "Computer Vision",
        "IBM Watson Studio"
      ]
    },
    {
      id: "tata-genai",
      title: "GenAI Powered Data Analytics Job Simulation",
      issuer: "Tata Group / Forage",
      date: "2025",
      verifyCode: "TATA-GENAI-2025",
      credentialUrl: "/certificates/tata-genai.pdf",
      issuerLogoText: "TATA",
      logoBg: "bg-indigo-500/10 border-indigo-500/20",
      logoColor: "text-indigo-400",
      certificateImage: "/certificates/tata-genai.png",
      featured: true,
      visible: true,
      accentColor: "indigo",
      glowColor: "#6366f1",
      status: "Verified",
      achievementTag: "Industry Simulation",
      showAchievementTag: true,
      showCredentialBtn: true,
      externalVerification: true,
      downloadToggle: false,
      skills: [
        "Generative AI",
        "Data Analytics",
        "Risk Profiling",
        "Business Reporting",
        "Data Storytelling",
        "AI Strategy"
      ]
    }
  ];

  // Helper hydrator
  const hydrateCertificatesSection = (sec: any) => {
    if (!sec) return;
    setMsBadge(sec.badge || 'CREDENTIAL SHOWCASE');
    setMsHeading(sec.heading || 'CERTIFICATIONS & LEARNING');
    setMsDescription(sec.description || 'Industry-recognized credentials...');
    setMsBlurIntensity(sec.blurIntensity !== undefined ? sec.blurIntensity : 12);
    setMsOverlayDarkness(sec.overlayDarkness !== undefined ? sec.overlayDarkness : 85);
    setMsGlassTransparency(sec.glassTransparency !== undefined ? sec.glassTransparency : 20);
    setMsWarmTint(sec.warmTint !== undefined ? sec.warmTint : true);

    const v = sec.verification || {};
    setMsVerificationBadgeStyle(v.badgeStyle || 'glow');
    setMsVerificationColorMode(v.colorMode || 'orange');
    setMsVerificationAnimation(v.animation || 'shimmer');
    setMsTrustIndicators(v.trustIndicators || { verified: true, ranked: true, institutionBacked: true, academyIssued: true });

    const l = sec.layout || {};
    setMsLayout({
      gridColumnsDesktop: l.gridColumnsDesktop || 2,
      gridColumnsMobile: l.gridColumnsMobile || 1,
      cardMinHeight: l.cardMinHeight || 320,
      integratedBadge: l.integratedBadge !== false
    });

    const a = sec.analytics || {};
    setMsAnalytics({
      totalCertifications: a.totalCertifications || 4,
      activeLearningTracks: a.activeLearningTracks || 3,
      completionScore: a.completionScore || 92,
      platformCount: a.platformCount || 2,
      radarTracks: a.radarTracks || { Cloud: 85, AI: 75, Networking: 90, Backend: 80, Security: 70 }
    });

    setMsCertificatesList(sec.certificates || []);
  };

  // Fetch initial dynamic database seeding profile payload
  useEffect(() => {
    const fetchCertifications = async () => {
      try {
        const res = await axios.get(`${import.meta.env.VITE_API_BASE_URL || 'http://localhost:5000'}/api/portfolio/slug/mahi`);
        if (res.data?.data?.certificatesSection) {
          hydrateCertificatesSection(res.data.data.certificatesSection);
        } else {
          setMsCertificatesList(staticFallbackCerts);
        }
      } catch (err) {
        console.warn("Seeding dynamic certificates failed, using static fallback.");
        setMsCertificatesList(staticFallbackCerts);
      }
    };
    fetchCertifications();
  }, []);

  // Socket pipeline integration
  useEffect(() => {
    const socket = io(import.meta.env.VITE_API_BASE_URL || 'http://localhost:5000');
    socket.emit('portfolio:join', 'mahi');

    socket.on('certificates:updated', (payload: any) => {
      console.log('⚡ Real-time certifications updated in MS frontend:', payload);
      if (payload.certificatesSection) {
        hydrateCertificatesSection(payload.certificatesSection);
      }
    });

    return () => {
      socket.disconnect();
    };
  }, []);

  // Theme configuration presets
  const themeStyles: Record<string, any> = {
    purple: { glow: 'rgba(139, 92, 246, 0.15)', text: 'text-purple-400', border: 'border-purple-500/20' },
    blue: { glow: 'rgba(59, 130, 246, 0.15)', text: 'text-blue-400', border: 'border-blue-500/20' },
    amber: { glow: 'rgba(245, 158, 11, 0.15)', text: 'text-amber-400', border: 'border-amber-500/20' },
    emerald: { glow: 'rgba(16, 185, 129, 0.15)', text: 'text-emerald-400', border: 'border-emerald-500/20' },
    cyan: { glow: 'rgba(6, 182, 212, 0.15)', text: 'text-cyan-400', border: 'border-cyan-500/20' },
  };

  const getVerificationStyles = (c: CustomCertificate) => {
    const style = themeStyles[c.accentColor || 'amber'] || themeStyles.amber;

    // Resolve verification colors
    let textClass = 'text-orange-400';
    let bgClass = 'bg-orange-500/10 border-orange-500/20';
    let glowHex = c.glowColor || '#f97316';

    if (verificationColorMode === 'green') {
      textClass = 'text-emerald-400';
      bgClass = 'bg-emerald-500/10 border-emerald-500/20';
      glowHex = '#10b981';
    } else if (verificationColorMode === 'blue') {
      textClass = 'text-blue-400';
      bgClass = 'bg-blue-500/10 border-blue-500/20';
      glowHex = '#3b82f6';
    } else if (verificationColorMode === 'academy') {
      textClass = c.logoColor || 'text-amber-500';
      bgClass = c.logoBg || 'bg-amber-500/10 border-amber-500/20';
      glowHex = c.glowColor || '#f59e0b';
    }

    return { textClass, bgClass, glowHex };
  };

  const displayList = certificatesList.length > 0 ? certificatesList : staticFallbackCerts;
  const visibleCerts = displayList.filter(c => c.visible !== false);

  return (
    <Section
      id="certificates-page"
      title={heading}
      subtitle={badge}
      className="relative min-h-[85vh] overflow-hidden"
    >
      {/* High-fidelity Cinematic Background Overlay */}
      <div
        className="absolute top-1/4 left-1/2 -translate-x-1/2 w-[800px] h-[450px] pointer-events-none z-0 transition-all duration-700"
        style={{
          filter: `blur(${blurIntensity}px)`,
          opacity: 1.0 - (glassTransparency / 100.0),
          backgroundImage: warmTint
            ? 'radial-gradient(circle, rgba(249,115,22,0.12) 0%, transparent 70%)'
            : 'radial-gradient(circle, rgba(62,62,62,0.2) 0%, transparent 70%)',
        }}
      />

      <div className="relative z-10 max-w-5xl mx-auto space-y-8 md:space-y-12 text-left">
        {/* Cinematic Header strip */}
        <div className="flex flex-col md:flex-row gap-6 md:gap-8 justify-between items-start select-none">
          <div className="max-w-xl">
            <p className="text-neutral-400 text-sm font-light leading-relaxed font-sans">
              {description}
            </p>
          </div>

          {/* TELEMETRY METRIC STRIP */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 bg-[#09090b]/60 border border-white/[0.04] p-4 rounded-3xl backdrop-blur-md w-full md:w-auto">
            <div className="bg-[#121214]/60 border border-white/[0.02] p-3 rounded-2xl flex flex-col justify-center min-w-[100px] shrink-0 text-left">
              <span className="text-xl font-black text-orange-500 font-mono tracking-tight leading-none mb-1">
                {analytics.totalCertifications}
              </span>
              <span className="text-[8px] text-zinc-500 font-mono uppercase tracking-widest font-bold">Total Certs</span>
            </div>

            <div className="bg-[#121214]/60 border border-white/[0.02] p-3 rounded-2xl flex flex-col justify-center min-w-[100px] shrink-0 text-left">
              <span className="text-xl font-black text-orange-500 font-mono tracking-tight leading-none mb-1">
                {analytics.activeLearningTracks}
              </span>
              <span className="text-[8px] text-zinc-500 font-mono uppercase tracking-widest font-bold">Active Tracks</span>
            </div>

            <div className="bg-[#121214]/60 border border-white/[0.02] p-3 rounded-2xl flex flex-col justify-center min-w-[100px] shrink-0 text-left">
              <span className="text-xl font-black text-orange-500 font-mono tracking-tight leading-none mb-1 text-left">
                {analytics.completionScore}%
              </span>
              <span className="text-[8px] text-zinc-500 font-mono uppercase tracking-widest font-bold text-left">Completion</span>
            </div>

            <div className="bg-[#121214]/60 border border-white/[0.02] p-3 rounded-2xl flex flex-col justify-center min-w-[100px] shrink-0 text-left">
              <span className="text-xl font-black text-orange-500 font-mono tracking-tight leading-none mb-1">
                {analytics.platformCount}
              </span>
              <span className="text-[8px] text-zinc-500 font-mono uppercase tracking-widest font-bold">Platforms</span>
            </div>
          </div>
        </div>

        {/* RADAR TRACKS AND TOPICS BAR */}
        <div className="bg-[#09090b]/40 border border-white/[0.04] p-6 rounded-3xl backdrop-blur-lg select-none space-y-4">
          <div className="flex items-center gap-2 text-neutral-400 font-mono text-[10px] uppercase tracking-widest font-extrabold pb-2 border-b border-white/[0.04]">
            <Activity className="w-3.5 h-3.5 text-orange-500" />
            <span>Learning Radar Track Progress Index</span>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-5 gap-4 sm:gap-6 text-left">
            {Object.entries(analytics.radarTracks).map(([trackName, level]) => (
              <div key={trackName} className="space-y-1.5 font-mono text-[9px] text-zinc-500 text-left">
                <div className="flex justify-between font-bold">
                  <span>{trackName.toUpperCase()}</span>
                  <span className="text-orange-500">{level}%</span>
                </div>
                <div className="w-full h-1 bg-[#121214] rounded-full overflow-hidden">
                  <motion.div
                    initial={{ width: 0 }}
                    animate={{ width: `${level}%` }}
                    transition={{ duration: 1, ease: "easeOut" }}
                    className="h-full bg-orange-500 rounded-full"
                  />
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* 1-COLUMN MOBILE / 2-COLUMN DESKTOP CERTIFICATION SHOWCASE GRID */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {visibleCerts.map((cert, idx) => {
            const style = themeStyles[cert.accentColor || 'amber'] || themeStyles.amber;
            const { textClass, bgClass, glowHex } = getVerificationStyles(cert);

            return (
              <motion.div
                key={cert.id}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: idx * 0.1 }}
                style={{ minHeight: `${layout.cardMinHeight}px` }}
                className="group relative flex flex-col justify-between p-6 rounded-2xl bg-[rgba(15,15,18,0.85)] border border-[rgba(255,255,255,0.06)] hover:border-neutral-700/60 transition-all duration-300 shadow-2xl overflow-hidden text-left"
              >
                {/* Decorative radial card hover accent */}
                <div
                  className="absolute inset-0 z-0 pointer-events-none opacity-0 group-hover:opacity-100 transition-opacity duration-500"
                  style={{
                    background: `radial-gradient(circle at 100% 0%, ${glowHex}10 0%, transparent 60%)`
                  }}
                />

                {/* Mobile Image Preview (visible on mobile, hidden on desktop) */}
                {cert.certificateImage && (
                  <a
                    href={cert.credentialUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="block md:hidden w-full aspect-[1.618] rounded-xl overflow-hidden border border-white/[0.06] mb-4 relative z-10"
                  >
                    <img
                      src={cert.certificateImage}
                      alt={cert.title}
                      className="w-full h-full object-cover"
                    />
                    <div className="absolute inset-0 bg-black/40 flex items-center justify-center">
                      <span className="text-[9px] font-mono font-bold tracking-widest text-white uppercase bg-black/60 px-2.5 py-1.5 rounded-lg border border-white/10 flex items-center gap-1">
                        <span>View Certificate</span>
                        <ExternalLink className="w-3 h-3" />
                      </span>
                    </div>
                  </a>
                )}

                {/* CARD CONTENT SPLIT */}
                {layout.integratedBadge ? (
                  <div className="flex flex-col md:flex-row gap-6 h-full relative z-10 items-stretch">

                    {/* LEFT CONTENT CONTAINER (100% on mobile, 65% on desktop) */}
                    <div className="w-full md:w-[65%] flex flex-col justify-between text-left space-y-4">
                      <div className="space-y-3">
                        <div className="flex items-center gap-2">
                          {/* Issuer Badge logo text */}
                          <div className={`px-2 py-0.5 text-[9px] font-bold font-mono tracking-wider rounded border ${cert.logoBg || 'bg-amber-500/10 border-amber-500/20'} ${cert.logoColor || 'text-amber-500'}`}>
                            {cert.issuerLogoText || 'CRED'}
                          </div>

                          <span className="text-[10px] text-zinc-500 font-extrabold uppercase tracking-widest truncate max-w-[120px]">
                            {cert.issuer}
                          </span>
                        </div>

                        <h3 className="text-base font-black text-white uppercase tracking-tight leading-snug font-heading font-bold leading-tight">
                          {cert.title}
                        </h3>

                        {cert.achievementTag && cert.showAchievementTag !== false && (
                          <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded text-[8.5px] font-bold tracking-wider font-mono bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 leading-none">
                            ★ {cert.achievementTag}
                          </span>
                        )}

                        <p className="text-zinc-400 text-xs font-light leading-relaxed font-sans line-clamp-3">
                          {cert.description}
                        </p>
                      </div>

                      {/* Covered Skills */}
                      <div className="flex flex-wrap gap-1.5 pt-2">
                        {cert.skills?.slice(0, 2).map((skill, sIdx) => (
                          <span
                            key={sIdx}
                            className="px-2 py-0.5 rounded text-[8px] font-mono bg-neutral-900 border border-neutral-800 text-zinc-500 uppercase select-none"
                          >
                            {skill}
                          </span>
                        ))}
                        {cert.skills?.length > 2 && (
                          <>
                            {cert.skills.slice(2).map((skill, sIdx) => (
                              <span
                                key={sIdx + 2}
                                className="hidden md:inline-block px-2 py-0.5 rounded text-[8px] font-mono bg-neutral-900 border border-neutral-800 text-zinc-500 uppercase select-none"
                              >
                                {skill}
                              </span>
                            ))}
                            <span className="md:hidden px-2 py-0.5 rounded text-[8px] font-mono bg-neutral-900 border border-neutral-800 text-zinc-500 font-bold uppercase select-none">
                              +{cert.skills.length - 2} MORE
                            </span>
                          </>
                        )}
                      </div>
                    </div>

                    {/* RIGHT COMPACT CONTAINER (Vertical Stack on Desktop, Row below on Mobile) */}
                    <div className="w-full md:w-[35%] shrink-0 border-t md:border-t-0 md:border-l border-white/[0.04] pt-4 md:pt-0 md:pl-5 flex flex-row md:flex-col justify-between items-center md:items-end text-left md:text-right py-1 gap-4">

                      {/* Desktop Image Preview (hidden on mobile, shown on desktop) */}
                      {cert.certificateImage && (
                        <a
                          href={cert.credentialUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="hidden md:block w-full aspect-[1.414] rounded-xl overflow-hidden border border-white/10 relative group/img shadow-lg hover:border-orange-500/30 transition-all duration-300"
                        >
                          <img
                            src={cert.certificateImage}
                            alt={cert.title}
                            className="w-full h-full object-cover group-hover/img:scale-105 transition-transform duration-555"
                          />
                          <div className="absolute inset-0 bg-black/40 opacity-0 group-hover/img:opacity-100 flex items-center justify-center transition-opacity duration-300">
                            <span className="text-[9px] font-mono font-bold tracking-widest text-white uppercase bg-black/60 px-2 py-1 rounded-md border border-white/10 flex items-center gap-1">
                              <span>View</span>
                              <ExternalLink className="w-3 h-3" />
                            </span>
                          </div>
                        </a>
                      )}

                      {/* Date details */}
                      <div className="space-y-0.5 text-left md:text-right">
                        <span className="text-[8px] font-mono font-bold text-zinc-600 uppercase tracking-widest block leading-none">Issued Date</span>
                        <span className="text-[11px] font-extrabold text-white block leading-none">{cert.date}</span>
                      </div>

                      {/* Verification badge settings style */}
                      <div className="space-y-1 select-none text-left md:text-right">
                        <span className="text-[8px] font-mono font-bold text-zinc-600 uppercase tracking-widest block leading-none md:block hidden">Status</span>

                        <span
                          style={{
                            boxShadow: verificationBadgeStyle === 'glow' ? `0 0 15px ${glowHex}30` : 'none',
                            borderColor: verificationBadgeStyle === 'outline' ? `${glowHex}40` : 'transparent'
                          }}
                          className={`inline-flex items-center gap-1 text-[9px] font-mono font-extrabold uppercase px-2 py-1 rounded leading-none shrink-0 ${textClass} ${bgClass}`}
                        >
                          {verificationBadgeStyle === 'pulse' && (
                            <span className="w-1.5 h-1.5 rounded-full bg-current animate-pulse shrink-0" />
                          )}
                          <span>{cert.status || 'Verified'}</span>
                        </span>
                      </div>

                      {/* Verification Link trigger */}
                      <div className="flex flex-col items-end gap-1.5">
                        <Dialog>
                          <DialogTrigger asChild>
                            <button
                              onClick={() => setSelectedCert(cert)}
                              className="inline-flex items-center gap-1 text-[10px] font-bold text-zinc-400 hover:text-white transition-colors cursor-pointer select-none font-mono"
                            >
                              <span>Verify Details</span>
                              <ArrowRight className="w-3.5 h-3.5" />
                            </button>
                          </DialogTrigger>

                          {/* Interactive Lightbox Document Verification Portal */}
                          <DialogContent className="sm:max-w-md bg-[#0c0c0e] border border-neutral-800/80 p-0 text-white rounded-3xl shadow-2xl overflow-hidden focus:outline-none z-[9999]">
                            <div className="p-6 md:p-8 space-y-6">

                              <div className="flex justify-between items-start border-b border-neutral-900 pb-4">
                                <div className="space-y-1">
                                  <span className="text-[9px] text-orange-500 font-extrabold uppercase tracking-widest block font-mono">
                                    Official Document Verification
                                  </span>
                                  <h4 className="text-sm font-bold text-white tracking-tight leading-tight uppercase font-heading">
                                    {cert.title}
                                  </h4>
                                </div>
                              </div>

                              {/* Digital Certificate Document Image or Mockup */}
                              {cert.certificateImage ? (
                                <div className="relative border border-neutral-800 rounded-2xl overflow-hidden bg-neutral-950 shadow-2xl max-h-[280px] aspect-[1.414] flex items-center justify-center group">
                                  <img
                                    src={cert.certificateImage}
                                    alt={cert.title}
                                    className="w-full h-full object-contain"
                                  />
                                  <a
                                    href={cert.credentialUrl}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 flex items-center justify-center transition-opacity duration-300"
                                  >
                                    <span className="text-[10px] font-mono font-bold tracking-widest text-white uppercase bg-black/70 px-3 py-2 rounded-lg border border-white/10 flex items-center gap-1.5">
                                      <span>Open Registry Link</span>
                                      <ExternalLink className="w-3.5 h-3.5" />
                                    </span>
                                  </a>
                                </div>
                              ) : (
                                <div className="relative border border-neutral-800 rounded-2xl p-6 bg-gradient-to-br from-neutral-900/60 to-neutral-950/80 flex flex-col justify-between aspect-[1.414] overflow-hidden select-none shadow-inner">
                                  <div className="absolute inset-2 border border-neutral-800/40 pointer-events-none rounded-lg" />

                                  <div className="absolute top-4 right-4 text-neutral-700 font-mono text-[8px] uppercase tracking-wider">
                                    SECURE VERIFIED ID: {cert.verifyCode}
                                  </div>

                                  <div className="space-y-3.5 relative z-10 text-left pt-2">
                                    <div className="flex items-center gap-1.5 text-[9px] font-bold text-neutral-500 uppercase tracking-widest leading-none font-mono">
                                      <Award className="w-4 h-4 text-orange-500" />
                                      <span>{cert.issuer}</span>
                                    </div>
                                    <div className="space-y-0.5">
                                      <p className="text-[8px] italic text-neutral-500 font-serif leading-none">This credential certifies that</p>
                                      <h5 className="text-[15px] font-bold font-serif text-white tracking-wide leading-none">Mahi Singh</h5>
                                    </div>
                                    <p className="text-[9px] text-neutral-400 leading-normal max-w-xs font-sans">
                                      {cert.description}
                                    </p>
                                  </div>

                                  <div className="flex justify-between items-end relative z-10 pt-3 border-t border-neutral-900/80">
                                    <div>
                                      <p className="text-[7px] text-neutral-500 font-extrabold uppercase font-mono">Issued Date</p>
                                      <p className="text-[9.5px] font-bold text-neutral-300 leading-none">{cert.date}</p>
                                    </div>
                                    <div className="text-right">
                                      <p className="text-[7px] text-neutral-500 font-extrabold uppercase font-mono">Status</p>
                                      <span className="inline-flex items-center gap-1 text-[8.5px] font-extrabold text-emerald-400 uppercase tracking-widest bg-emerald-500/10 border border-emerald-500/20 px-2 py-0.5 rounded leading-none">
                                        <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
                                        Active
                                      </span>
                                    </div>
                                  </div>
                                </div>
                              )}

                              {/* Verification info & redirection logs */}
                              <div className="space-y-3.5 pt-2 text-[10px]">
                                <p className="text-neutral-500 text-left leading-relaxed">
                                  This certification is linked directly to the official credential register of {cert.issuer}. Unique secure verification code: <code className="text-neutral-300 font-mono font-bold bg-neutral-950 px-1 py-0.5 rounded">{cert.verifyCode}</code>.
                                </p>
                                <div className="flex justify-end gap-2 pt-3 border-t border-neutral-900 font-mono text-[9px]">
                                  {cert.externalVerification !== false && !cert.credentialUrl.toLowerCase().endsWith('.pdf') && (
                                    <a
                                      href={cert.credentialUrl}
                                      target="_blank"
                                      rel="noopener noreferrer"
                                      className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl bg-neutral-900 border border-neutral-800 text-neutral-300 hover:text-white transition-colors cursor-pointer"
                                    >
                                      <ExternalLink className="w-3.5 h-3.5" />
                                      External Register
                                    </a>
                                  )}
                                  <a
                                    href={cert.credentialUrl}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl bg-neutral-100 hover:bg-neutral-200 text-neutral-950 font-bold transition-colors cursor-pointer"
                                  >
                                    <FileCheck2 className="w-3.5 h-3.5 text-neutral-950" />
                                    {cert.credentialUrl.toLowerCase().endsWith('.pdf') ? 'Open PDF Certificate' : 'Verify Registry'}
                                  </a>
                                </div>
                              </div>
                            </div>
                          </DialogContent>
                        </Dialog>

                        <div className="text-[7.5px] font-mono text-zinc-600 block select-all select-text font-bold leading-none">
                          ID: {cert.verifyCode}
                        </div>
                      </div>

                    </div>
                  </div>
                ) : (
                  // Classic Horizontal Slab template (Fallback compatibility)
                  <div className="space-y-4 relative z-10 text-left select-none">
                    <div className="flex justify-between items-center pb-2 border-b border-white/[0.04]">
                      <div className={`px-2 py-0.5 text-[8px] font-bold font-mono rounded border ${cert.logoBg} ${cert.logoColor}`}>
                        {cert.issuerLogoText || 'CRED'}
                      </div>
                      <span className="text-[10px] text-zinc-500 font-bold font-mono">{cert.date}</span>
                    </div>
                    <h3 className="text-base font-black text-white uppercase tracking-tight">{cert.title}</h3>
                    <p className="text-zinc-400 text-xs font-light leading-relaxed">{cert.description}</p>
                  </div>
                )}

              </motion.div>
            );
          })}
        </div>
      </div>
    </Section>
  );
}

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import axios from 'axios';
import { io } from 'socket.io-client';
import { Mail, Github, Linkedin, Check, Send, ArrowUpRight, AlertCircle } from 'lucide-react';
import Section from '../components/shared/Section';

export default function ContactPage() {
  const [copied, setCopied] = useState(false);
  const [formData, setFormData] = useState({ name: '', email: '', message: '' });
  const [status, setStatus] = useState<'idle' | 'sending' | 'success'>('idle');

  const [heading, setHeading] = useState("BUILD SOMETHING REMARKABLE");
  const [description, setDescription] = useState("Open to internships, freelance projects, collaborations, and software development opportunities.");
  const [quote, setQuote] = useState("Interested in building scalable, thoughtful digital experiences.");
  const [quoteAuthor, setQuoteAuthor] = useState("Mahi Singh");

  // Availability List
  const [availabilityList, setAvailabilityList] = useState<string[]>([
    "Frontend Development",
    "Full Stack Projects",
    "AI-Powered Systems",
    "Internship Opportunities"
  ]);

  // Location & Response Speed
  const [locationText, setLocationText] = useState("India");
  const [responseTimeText, setResponseTimeText] = useState("Usually within 24 hours");

  // Social Links
  const [socialGithub, setSocialGithub] = useState("");
  const [socialLinkedin, setSocialLinkedin] = useState("");
  const [socialEmail, setSocialEmail] = useState("");

  // Form Config
  const [formEnabled, setFormEnabled] = useState(true);

  const hydrateContact = (sec: any) => {
    if (!sec) return;
    if (sec.heading) {
      if (sec.heading.toLowerCase().includes("work together") || sec.heading.toLowerCase().includes("contact")) {
        setHeading("BUILD SOMETHING REMARKABLE");
      } else {
        setHeading(sec.heading);
      }
    }
    if (sec.description) setDescription(sec.description);
    if (sec.quote) setQuote(sec.quote);
    if (sec.quoteAuthor) setQuoteAuthor(sec.quoteAuthor);

    if (Array.isArray(sec.availability)) {
      setAvailabilityList(sec.availability);
    }

    if (sec.location) setLocationText(sec.location);
    if (sec.responseTime) setResponseTimeText(sec.responseTime);

    const socials = sec.socials || {};
    if (socials.github) setSocialGithub(socials.github);
    if (socials.linkedin) setSocialLinkedin(socials.linkedin);
    if (socials.email) setSocialEmail(socials.email);

    const fConfig = sec.form || {};
    setFormEnabled(fConfig.enabled !== false);
  };

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const res = await axios.get(`${import.meta.env.VITE_API_BASE_URL || 'http://localhost:5000'}/api/portfolio/slug/mahi`);
        if (res.data?.data?.profile?.contactSection) {
          hydrateContact(res.data.data.profile.contactSection);
        } else if (res.data?.data?.profile) {
          const p = res.data.data.profile;
          setSocialEmail(res.data.data.user?.email || "mahi@example.com");
          setSocialGithub(p.github || "");
          setSocialLinkedin(p.linkedin || "");
        }
      } catch (err) {
        console.error('Failed to fetch dynamic contact settings:', err);
      }
    };
    fetchProfile();
  }, []);

  useEffect(() => {
    const socket = io(import.meta.env.VITE_API_BASE_URL || 'http://localhost:5000');
    socket.emit('portfolio:join', 'mahi');

    socket.on('contact:updated', (payload: any) => {
      console.log('⚡ Live contact sync in MS frontend:', payload);
      if (payload) {
        hydrateContact(payload);
      }
    });

    return () => {
      socket.disconnect();
    };
  }, []);

  const handleCopyEmail = async () => {
    const targetEmail = socialEmail || "mahi@example.com";
    try {
      await navigator.clipboard.writeText(targetEmail);
      setCopied(true);
      window.location.href = `mailto:${targetEmail}`;
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      console.error('Failed to copy text: ', err);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.name || !formData.email || !formData.message) return;

    setStatus('sending');
    try {
      await axios.post('https://formsubmit.co/ajax/mahimanoj1107@gmail.com', {
        name: formData.name,
        email: formData.email,
        message: formData.message,
        _subject: `Portfolio Contact Inquiry from ${formData.name}`,
        _captcha: 'false',
        _template: 'table'
      });
      setStatus('success');
      setFormData({ name: '', email: '', message: '' });
      setTimeout(() => setStatus('idle'), 4000);
    } catch (err) {
      console.error('Failed to submit message:', err);
      setStatus('idle');
      alert('Failed to send message. Please click on the Email button to connect directly!');
    }
  };

  return (
    <Section
      id="contact-page"
      title={heading}
      subtitle="CONTACT // SECURE CHANNEL"
      className="relative text-left"
    >
      {/* Dynamic description intro */}
      <div className="text-left max-w-xl mb-10">
        <p className="text-neutral-400 text-xs sm:text-sm font-light leading-relaxed font-sans">
          {description}
        </p>
      </div>

      {/* Main Grid */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-100px" }}
        transition={{ duration: 0.8, delay: 0.15, ease: "easeOut" }}
        className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start relative z-10"
      >
        {/* Left Side: Credibility Matrix, Social Cards, Availability, Location/Response */}
        <div className="lg:col-span-5 space-y-8">
          <div className="space-y-6">

            {/* 1. Credibility & Trust Matrix */}
            <div className="pb-6 border-b border-white/5 space-y-3 font-sans">
              <span className="text-[9px] text-neutral-500 uppercase tracking-widest font-black block">
                Engineering Telemetry Profile
              </span>
              <div className="grid grid-cols-2 gap-3 max-w-md">
                {/* DSA Solved */}
                <div className="p-3 bg-neutral-900/30 border border-white/5 rounded-xl text-left space-y-0.5 relative overflow-hidden group">
                  <div className="absolute inset-0 bg-orange-500/[0.01] pointer-events-none" />
                  <span className="text-lg font-black text-orange-500 font-mono tracking-tight leading-none block">200+</span>
                  <span className="text-[8px] text-zinc-400 font-mono uppercase tracking-wider font-extrabold block">DSA Problems Solved</span>
                </div>
                {/* Builds */}
                <div className="p-3 bg-neutral-900/30 border border-white/5 rounded-xl text-left space-y-0.5 relative overflow-hidden group">
                  <div className="absolute inset-0 bg-orange-500/[0.01] pointer-events-none" />
                  <span className="text-lg font-black text-orange-500 font-mono tracking-tight leading-none block">5+</span>
                  <span className="text-[8px] text-zinc-400 font-mono uppercase tracking-wider font-extrabold block">Integrated Builds</span>
                </div>
                {/* Hackathon */}
                <div className="p-3 bg-neutral-900/30 border border-white/5 rounded-xl text-left space-y-0.5 relative overflow-hidden group">
                  <div className="absolute inset-0 bg-white/[0.01] pointer-events-none" />
                  <span className="text-xs font-black text-white font-mono uppercase tracking-tight block pt-0.5">Hackathon Runner-Up (Top 45 of 720+ Teams)</span>
                  <span className="text-[8px] text-zinc-550 font-mono uppercase tracking-wider font-extrabold block pt-0.5">Vadodara Hackathon</span>
                </div>
                {/* AWS */}
                <div className="p-3 bg-neutral-900/30 border border-white/5 rounded-xl text-left space-y-0.5 relative overflow-hidden group">
                  <div className="absolute inset-0 bg-white/[0.01] pointer-events-none" />
                  <span className="text-xs font-black text-white font-mono uppercase tracking-tight block pt-0.5">AWS Cloud Graduate</span>
                  <span className="text-[8px] text-zinc-550 font-mono uppercase tracking-wider font-extrabold block pt-0.5">Industry Certified</span>
                </div>
              </div>
            </div>

            {/* 2. Connect With Me (Social Cards Grid) */}
            <div className="pb-6 border-b border-white/5 space-y-3 font-sans">
              <span className="text-[9px] text-neutral-500 uppercase tracking-widest block font-black">
                Connect With Me
              </span>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 max-w-md">

                {/* GitHub Card */}
                {socialGithub && (
                  <a
                    href={socialGithub}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="p-4 rounded-xl border border-white/5 bg-neutral-900/35 hover:bg-neutral-900/50 text-left flex items-center justify-between group transition-all duration-300"
                  >
                    <div className="flex items-center gap-3">
                      <div className="w-9 h-9 rounded-lg bg-neutral-950 border border-white/5 flex items-center justify-center text-zinc-400 group-hover:text-white transition-colors">
                        <Github className="w-4 h-4" />
                      </div>
                      <div>
                        <span className="text-[8px] font-mono font-bold text-zinc-500 uppercase tracking-wide block">Source Code</span>
                        <span className="text-xs font-black text-white uppercase tracking-tight block mt-0.5">GitHub Profile</span>
                      </div>
                    </div>
                    <ArrowUpRight className="w-3.5 h-3.5 text-neutral-500 group-hover:text-white group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
                  </a>
                )}

                {/* LinkedIn Card */}
                {socialLinkedin && (
                  <a
                    href={socialLinkedin}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="p-4 rounded-xl border border-white/5 bg-neutral-900/35 hover:bg-neutral-900/50 text-left flex items-center justify-between group transition-all duration-300"
                  >
                    <div className="flex items-center gap-3">
                      <div className="w-9 h-9 rounded-lg bg-neutral-950 border border-white/5 flex items-center justify-center text-zinc-400 group-hover:text-white transition-colors">
                        <Linkedin className="w-4 h-4" />
                      </div>
                      <div>
                        <span className="text-[8px] font-mono font-bold text-zinc-500 uppercase tracking-wide block">Professional</span>
                        <span className="text-xs font-black text-white uppercase tracking-tight block mt-0.5">LinkedIn Profile</span>
                      </div>
                    </div>
                    <ArrowUpRight className="w-3.5 h-3.5 text-neutral-500 group-hover:text-white group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
                  </a>
                )}

                {/* Email Card (With Tap-to-Copy) */}
                {socialEmail && (
                  <button
                    onClick={handleCopyEmail}
                    className="p-4 rounded-xl border border-white/5 bg-neutral-900/35 hover:bg-neutral-900/50 text-left flex items-center justify-between group transition-all duration-300 w-full cursor-pointer sm:col-span-2"
                  >
                    <div className="flex items-center gap-3">
                      <div className="w-9 h-9 rounded-lg bg-neutral-950 border border-white/5 flex items-center justify-center text-zinc-400 group-hover:text-white transition-colors">
                        <Mail className="w-4 h-4" />
                      </div>
                      <div>
                        <span className="text-[8px] font-mono font-bold text-zinc-500 uppercase tracking-wide block">Direct Mail</span>
                        <span className="text-xs font-black text-white uppercase tracking-tight block mt-0.5">
                          {copied ? 'Copied Email!' : 'Email Address'}
                        </span>
                      </div>
                    </div>
                    <ArrowUpRight className="w-3.5 h-3.5 text-neutral-500 group-hover:text-white group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
                  </button>
                )}

              </div>
            </div>

            {/* 3. Currently Available For */}
            {availabilityList.length > 0 && (
              <div className="pb-6 border-b border-white/5 space-y-3">
                <span className="text-[10px] text-neutral-500 uppercase tracking-widest font-black block font-sans">
                  Why Reach Out?
                </span>
                <ul className="space-y-2.5 font-sans text-xs sm:text-sm text-neutral-300">
                  {availabilityList.map((tag, idx) => (
                    <li key={idx} className="flex items-center gap-3 group">
                      <span className="w-1.5 h-1.5 rounded-full bg-orange-400 group-hover:scale-125 transition-transform duration-200 shrink-0" />
                      <span>{tag}</span>
                    </li>
                  ))}
                </ul>
              </div>
            )}

            {/* 4. Geographical & Response Metrics */}
            <div className="grid grid-cols-2 gap-3 font-sans max-w-md">

              {/* Location Card */}
              <div className="p-4 rounded-xl border border-white/5 bg-neutral-900/35 text-left space-y-1 hover:border-white/10 transition-colors">
                <span className="text-[8px] font-mono tracking-widest text-neutral-500 font-extrabold uppercase block">
                  Based In
                </span>
                <span className="text-xs font-black text-white uppercase tracking-wider block">
                  {locationText}
                </span>
              </div>

              {/* Response Time Stat Card */}
              <div className="p-4 rounded-xl border border-white/5 bg-neutral-900/35 text-left space-y-1 hover:border-white/10 transition-colors">
                <div className="flex items-center gap-1">
                  <span className="text-orange-400 text-xs shrink-0 leading-none">⚡</span>
                  <span className="text-[8px] font-mono tracking-widest text-neutral-500 font-extrabold uppercase block">
                    Response Speed
                  </span>
                </div>
                <span className="text-xs font-black text-orange-400 uppercase tracking-wider block">
                  {responseTimeText.toLowerCase().includes("24") ? "< 24 Hours" : responseTimeText}
                </span>
              </div>

            </div>
          </div>
        </div>

        {/* Right Side: Dynamic Form Submission Container */}
        <div className="lg:col-span-7 w-full text-left">
          {formEnabled ? (
            <form
              onSubmit={handleSubmit}
              className="space-y-6 bg-black/30 border border-white/10 backdrop-blur-md rounded-2xl p-6 sm:p-8 shadow-2xl shadow-black/20 relative"
            >
              <div className="space-y-4">
                <h3 className="text-base sm:text-lg font-bold text-white font-display tracking-tight border-b border-white/5 pb-3">
                  Send a Message
                </h3>

                <div className="space-y-6 pt-2">
                  {/* Your Name */}
                  <div className="flex flex-col gap-1.5 text-left font-sans group">
                    <label className="text-[9px] text-white/50 group-focus-within:text-white/80 uppercase tracking-widest font-bold transition-colors duration-200">
                      Your Name
                    </label>
                    <input
                      type="text"
                      required
                      value={formData.name}
                      onChange={e => setFormData({ ...formData, name: e.target.value })}
                      disabled={status === 'sending' || status === 'success'}
                      placeholder="John Doe"
                      className="w-full bg-transparent border-0 border-b border-white/20 focus:border-b-white/80 py-3 px-1 text-sm text-white placeholder-white/30 focus:outline-none transition-all font-sans rounded-none"
                    />
                  </div>

                  {/* Email Address */}
                  <div className="flex flex-col gap-1.5 text-left font-sans group">
                    <label className="text-[9px] text-white/50 group-focus-within:text-white/80 uppercase tracking-widest font-bold transition-colors duration-200">
                      Email Address
                    </label>
                    <input
                      type="email"
                      required
                      value={formData.email}
                      onChange={e => setFormData({ ...formData, email: e.target.value })}
                      disabled={status === 'sending' || status === 'success'}
                      placeholder="john@example.com"
                      className="w-full bg-transparent border-0 border-b border-white/20 focus:border-b-white/80 py-3 px-1 text-sm text-white placeholder-white/30 focus:outline-none transition-all font-sans rounded-none"
                    />
                  </div>

                  {/* Project / Message */}
                  <div className="flex flex-col gap-1.5 text-left font-sans group">
                    <label className="text-[9px] text-white/50 group-focus-within:text-white/80 uppercase tracking-widest font-bold transition-colors duration-200">
                      Project / Message
                    </label>
                    <textarea
                      required
                      rows={4}
                      value={formData.message}
                      onChange={e => setFormData({ ...formData, message: e.target.value })}
                      disabled={status === 'sending' || status === 'success'}
                      placeholder="Outline your project scope or opportunity..."
                      className="w-full bg-transparent border-0 border-b border-white/20 focus:border-b-white/80 py-3 px-1 text-sm text-white placeholder-white/30 focus:outline-none transition-all font-sans resize-none rounded-none"
                    />
                  </div>
                </div>
              </div>

              {/* Submit Section */}
              <div className="pt-4 flex flex-col sm:flex-row gap-4 items-center justify-between">
                <span className="text-[10px] text-white/40 font-sans tracking-wide leading-relaxed">
                  Open communication channel.
                </span>

                <motion.button
                  type="submit"
                  disabled={status !== 'idle'}
                  whileHover={status === 'idle' ? { scale: 1.01 } : {}}
                  whileTap={status === 'idle' ? { scale: 0.99 } : {}}
                  className={`w-full sm:w-auto inline-flex items-center justify-center gap-2 px-6 py-3 rounded-full font-bold text-xs tracking-widest uppercase transition-all duration-300 select-none cursor-pointer group ${status === 'success'
                    ? 'bg-emerald-600 text-white shadow-lg shadow-emerald-500/10 cursor-default border border-emerald-500/20'
                    : status === 'sending'
                      ? 'bg-neutral-800 text-neutral-400 border border-white/5 cursor-wait'
                      : 'bg-gradient-to-r from-blue-600/90 to-indigo-600/90 hover:from-blue-600 hover:to-indigo-600 text-white shadow-md shadow-blue-500/5 hover:shadow-blue-500/15'
                    }`}
                >
                  {status === 'success' ? (
                    <>
                      <Check className="w-3.5 h-3.5 animate-fade-in" />
                      Message Sent!
                    </>
                  ) : status === 'sending' ? (
                    <>
                      <span className="w-3.5 h-3.5 border-2 border-neutral-400 border-t-transparent rounded-full animate-spin" />
                      Sending...
                    </>
                  ) : (
                    <>
                      Send Message
                      <Send className="w-3.5 h-3.5 group-hover:translate-x-1 group-hover:-translate-y-0.5 transition-transform" />
                    </>
                  )}
                </motion.button>
              </div>
            </form>
          ) : (
            <div className="p-8 sm:p-10 rounded-2xl border border-dashed border-red-500/20 bg-red-950/5 text-center text-red-400 space-y-3 font-sans shadow-xl">
              <AlertCircle className="w-8 h-8 mx-auto animate-pulse text-red-400" />
              <h3 className="text-sm font-bold uppercase tracking-wider">Inbound Messaging Offline</h3>
              <p className="text-neutral-400 text-xs leading-relaxed max-w-sm mx-auto">
                Direct message form submissions are currently disabled. Please feel free to connect using the socials or copied email link on the left side panel.
              </p>
            </div>
          )}
        </div>
      </motion.div>
    </Section>
  );
}

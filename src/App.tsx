import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { motion, AnimatePresence } from 'framer-motion';
import { BrowserRouter, Routes, Route } from 'react-router-dom';

// UI Loader Component
import KineticDotsLoader from '@/components/ui/kinetic-dots-loader';

// Layout & Custom Route Pages
import Layout from '@/components/layout/Layout';
import Home from '@/pages/Home';
import SkillsPage from '@/pages/SkillsPage';
import ProjectsPage from '@/pages/ProjectsPage';
import InternshipPage from '@/pages/InternshipPage';
import AchievementsPage from '@/pages/AchievementsPage';
import CertificatesPage from '@/pages/CertificatesPage';
import JourneyPage from '@/pages/JourneyPage';
import ContactPage from '@/pages/ContactPage';

const API_BASE = (import.meta.env.VITE_API_BASE_URL || 'http://localhost:5000') + '/api';

export default function App() {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setLoading(false);
    }, 1800);
    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    // Log telemetry visit on mount
    const logVisit = async () => {
      const getBrowserName = () => {
        const ua = navigator.userAgent;
        if (ua.includes('Firefox')) return 'Firefox';
        if (ua.includes('Chrome') && !ua.includes('Edg')) return 'Chrome';
        if (ua.includes('Safari') && !ua.includes('Chrome')) return 'Safari';
        if (ua.includes('Edg')) return 'Edge';
        if (ua.includes('Opera') || ua.includes('OPR')) return 'Opera';
        return 'Unknown';
      };

      let country = 'Unknown';
      let visitorIp = '';
      try {
        const geoRes = await axios.get('https://ipapi.co/json/', { timeout: 2200 });
        if (geoRes.data) {
          country = geoRes.data.country_name || 'Unknown';
          visitorIp = geoRes.data.ip || '';
        }
      } catch (e) {
        console.warn('Dynamic GeoIP lookup failed. Relying on backend fallback.');
      }

      try {
        await axios.post(`${API_BASE}/analytics/log`, {
          portfolioSlug: 'mahi',
          country,
          visitorIp,
          browser: getBrowserName(),
          device: window.innerWidth < 768 ? 'Mobile' : 'Desktop',
        });
      } catch (error) {
        // Silently skip if API is not seeding yet
        console.warn('Telemetry server offline:', error);
      }
    };
    logVisit();
  }, []);

  return (
    <AnimatePresence mode="wait">
      {loading ? (
        <motion.div
          key="loader"
          initial={{ opacity: 1 }}
          exit={{ 
            opacity: 0, 
            y: -30, 
            transition: { duration: 0.8, ease: [0.16, 1, 0.3, 1] } 
          }}
          className="fixed inset-0 z-[9999] flex flex-col items-center justify-center bg-black font-mono select-none"
        >
          <div className="flex flex-col items-center gap-6">
            <KineticDotsLoader />
            <motion.p
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 0.7, y: 0 }}
              transition={{ delay: 0.3, duration: 0.8 }}
              className="text-[11px] md:text-xs text-neutral-400 tracking-[0.3em] font-medium animate-pulse text-center"
            >
              LOADING PORTFOLIO...
            </motion.p>
          </div>
        </motion.div>
      ) : (
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<Layout />}>
              <Route index element={<Home />} />
              <Route path="skills" element={<SkillsPage />} />
              <Route path="projects" element={<ProjectsPage />} />
              <Route path="internship" element={<InternshipPage />} />
              <Route path="achievements" element={<AchievementsPage />} />
              <Route path="certificates" element={<CertificatesPage />} />
              <Route path="journey" element={<JourneyPage />} />
              <Route path="contact" element={<ContactPage />} />
            </Route>
          </Routes>
        </BrowserRouter>
      )}
    </AnimatePresence>
  );
}


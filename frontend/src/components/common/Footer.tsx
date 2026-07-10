import React, { useEffect, useState } from 'react';
import { NavLink } from 'react-router-dom';
import { ArrowUp } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { settingsService } from '@/services/SettingsService';

export const Footer: React.FC = () => {
  const [showScrollTop, setShowScrollTop] = useState(false);
  const [logoText, setLogoText] = useState('ALI.OS');
  const [github, setGithub] = useState('https://github.com');
  const [linkedin, setLinkedin] = useState('https://linkedin.com');

  // Monitor scroll height to show Back-to-Top toggle
  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 400) {
        setShowScrollTop(true);
      } else {
        setShowScrollTop(false);
      }
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    const fetchSettings = async () => {
      try {
        const logo = await settingsService.getSetting('logoText', 'ALI.OS');
        setLogoText(logo);
        const git = await settingsService.getSetting('github', 'https://github.com');
        setGithub(git);
        const link = await settingsService.getSetting('linkedin', 'https://linkedin.com');
        setLinkedin(link);
      } catch {}
    };
    fetchSettings();
  }, []);

  const handleScrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="w-full border-t border-primary/10 bg-surface/50 transition-colors duration-300 relative py-12 md:py-16">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        
        {/* Footer Top Content Block */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-8 md:gap-12 pb-12 border-b border-primary/5">
          {/* Logo & Mission Statement */}
          <div className="md:col-span-4 space-y-4">
            <NavLink to="/" className="flex items-center gap-2 font-mono text-lg font-bold tracking-wider text-accent hover:text-highlight w-fit">
              <img src="/logo.png" alt="Logo" className="h-6 w-auto object-contain" />
              <span>{logoText}</span>
            </NavLink>
            <p className="text-xs sm:text-sm text-muted leading-relaxed max-w-xs">
              A scalable developer ecosystem showcasing personal software products, university communities, notes libraries, and open-source contributions.
            </p>
          </div>

          {/* Quick Links Column 1 */}
          <div className="md:col-span-2 space-y-3">
            <span className="text-[10px] text-muted font-mono uppercase tracking-wider font-semibold">Catalog</span>
            <ul className="space-y-2 flex flex-col">
              <NavLink to="/projects" className="text-xs text-muted hover:text-accent transition-colors">Projects</NavLink>
              <NavLink to="/solutions" className="text-xs text-muted hover:text-accent transition-colors">Solutions</NavLink>
              <NavLink to="/notes" className="text-xs text-muted hover:text-accent transition-colors">Knowledge Hub</NavLink>
            </ul>
          </div>

          {/* Quick Links Column 2 */}
          <div className="md:col-span-2 space-y-3">
            <span className="text-[10px] text-muted font-mono uppercase tracking-wider font-semibold">Community</span>
            <ul className="space-y-2 flex flex-col">
              <NavLink to="/deep-code" className="text-xs text-muted hover:text-accent transition-colors">Deep Code</NavLink>
              <NavLink to="/blog" className="text-xs text-muted hover:text-accent transition-colors">Blog Feed</NavLink>
              <NavLink to="/resume" className="text-xs text-muted hover:text-accent transition-colors">Resume Registry</NavLink>
            </ul>
          </div>

          {/* Quick Links Column 3 */}
          <div className="md:col-span-2 space-y-3">
            <span className="text-[10px] text-muted font-mono uppercase tracking-wider font-semibold">Legal</span>
            <ul className="space-y-2 flex flex-col">
              <NavLink to="/privacy" className="text-xs text-muted hover:text-accent transition-colors">Privacy Policy</NavLink>
              <NavLink to="/terms" className="text-xs text-muted hover:text-accent transition-colors">Terms of Service</NavLink>
              <NavLink to="/contact" className="text-xs text-muted hover:text-accent transition-colors">Contact Support</NavLink>
            </ul>
          </div>

          {/* Social icons links */}
          <div className="md:col-span-2 space-y-3">
            <span className="text-[10px] text-muted font-mono uppercase tracking-wider font-semibold">Socials</span>
            <div className="flex gap-3">
              <a href={github} target="_blank" rel="noopener noreferrer" className="p-1.5 rounded-lg border border-primary/5 bg-surface text-muted hover:text-accent hover:border-accent/15 transition-all shadow-sm" aria-label="GitHub">
                <svg className="h-4 w-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M15 22v-4a4.8 4.8 0 0 0-1-3.5c3 0 6-2 6-5.5.08-1.25-.27-2.48-1-3.5.28-1.15.28-2.35 0-3.5 0 0-1 0-3 1.5-2.64-.5-5.36-.5-8 0C6 2 5 2 5 2c-.3 1.15-.3 2.35 0 3.5A5.403 5.403 0 0 0 4 9c0 3.5 3 5.5 6 5.5-.39.49-.68 1.05-.85 1.65-.17.6-.22 1.23-.15 1.85v4" />
                  <path d="M9 18c-4.51 2-5-2-7-2" />
                </svg>
              </a>
              <a href={linkedin} target="_blank" rel="noopener noreferrer" className="p-1.5 rounded-lg border border-primary/5 bg-surface text-muted hover:text-accent hover:border-accent/15 transition-all shadow-sm" aria-label="LinkedIn">
                <svg className="h-4 w-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z" />
                  <rect width="4" height="12" x="2" y="9" />
                  <circle cx="4" cy="4" r="2" />
                </svg>
              </a>
            </div>
          </div>
        </div>

        {/* Footer Bottom copyright notes */}
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4 pt-8 text-[10px] font-mono text-muted uppercase tracking-wider">
          <span>&copy; {new Date().getFullYear()} {logoText}. All rights reserved.</span>
          <span>Designed &amp; Engineered by Ali</span>
        </div>

      </div>

      {/* Floating back to top button */}
      <AnimatePresence>
        {showScrollTop && (
          <motion.button
            initial={{ opacity: 0, scale: 0.5, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.5, y: 20 }}
            onClick={handleScrollToTop}
            className="fixed bottom-6 right-6 p-3 bg-accent hover:bg-highlight text-white rounded-full shadow-lg transition-all duration-300 z-50 border border-white/10"
            aria-label="Back to Top"
          >
            <ArrowUp className="h-4 w-4" />
          </motion.button>
        )}
      </AnimatePresence>
    </footer>
  );
};

export default Footer;

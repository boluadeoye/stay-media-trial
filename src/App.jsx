import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowRight } from 'lucide-react';
import Header from './components/Header';
import Hero from './components/Hero';
import StickyPageMenu from './components/StickyPageMenu';
import CasesSection from './components/CasesSection';
import HowItWorksSection from './components/HowItWorksSection';
import FaqSection from './components/FaqSection';
import QuoteModal from './components/QuoteModal';
import TrialConfirmationView from './components/TrialConfirmationView';
import Footer from './components/Footer';

export default function App() {
  const [theme, setTheme] = useState('light');
  const [activeSection, setActiveSection] = useState('cases');
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isConfirmed, setIsConfirmed] = useState(false);
  const [showBottomCta, setShowBottomCta] = useState(false);

  const isDark = theme === 'dark';
  const toggleTheme = () => setTheme(prev => prev === 'light' ? 'dark' : 'light');

  // Active Scroll-Spy
  useEffect(() => {
    const handleScroll = () => {
      const scrollPos = window.scrollY + 200;
      setShowBottomCta(window.scrollY > 380);

      const casesEl = document.getElementById('cases');
      const howItWorksEl = document.getElementById('how-it-works');
      const faqsEl = document.getElementById('faqs');

      if (faqsEl && scrollPos >= faqsEl.offsetTop) {
        setActiveSection('faqs');
      } else if (howItWorksEl && scrollPos >= howItWorksEl.offsetTop) {
        setActiveSection('how-it-works');
      } else {
        setActiveSection('cases');
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleSelectSection = (sectionId) => {
    setActiveSection(sectionId);
    const target = document.getElementById(sectionId);
    if (target) {
      const yOffset = -90;
      const y = target.getBoundingClientRect().top + window.pageYOffset + yOffset;
      window.scrollTo({ top: y, behavior: 'smooth' });
    }
  };

  return (
    <div className={`min-h-screen w-full font-body overflow-x-clip transition-colors duration-200 ${
      isDark ? 'bg-[#0C150F] text-white' : 'bg-[#F4FBF2] text-[#111827]'
    }`}>
      
      {/* 1. Header with 740px Breakpoint Calibration */}
      <Header theme={theme} onToggleTheme={toggleTheme} />

      {/* RENDER POST-SUBMISSION 3-STEP CONFIRMATION FUNNEL OR MAIN SPRINT STOREFRONT */}
      {isConfirmed ? (
        <TrialConfirmationView onBack={() => setIsConfirmed(false)} isDark={isDark} />
      ) : (
        <>
          <Hero onClaimClick={() => setIsModalOpen(true)} isDark={isDark} />
          <StickyPageMenu activeSection={activeSection} onSelectSection={handleSelectSection} isDark={isDark} />
          <CasesSection onOpenBrief={() => setIsModalOpen(true)} isDark={isDark} />
          <HowItWorksSection isDark={isDark} />
          <FaqSection isDark={isDark} />
          <Footer isDark={isDark} />

          {/* Sticky Bottom Bar (Widened on Desktop, Animated on Hover, Elevated to bottom-7) */}
          <AnimatePresence>
            {showBottomCta && (
              <motion.div
                initial={{ y: 50, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                exit={{ y: 50, opacity: 0 }}
                className="fixed bottom-7 sm:bottom-9 left-1/2 -translate-x-1/2 z-40 w-full max-w-[340px] min-[741px]:max-w-[460px] px-4 pointer-events-auto"
              >
                <motion.button
                  whileHover={{ scale: 1.035, y: -2 }}
                  whileTap={{ scale: 0.96 }}
                  onClick={() => setIsModalOpen(true)}
                  className="w-full py-4 rounded-full bg-[#0EA34A] hover:bg-[#0C8F40] text-white font-display font-extrabold text-xs uppercase tracking-wider shadow-2xl transition-all flex items-center justify-center space-x-2 cursor-pointer border border-white/20"
                >
                  <span>CLAIM FREE TRIAL</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </motion.button>
              </motion.div>
            )}
          </AnimatePresence>
        </>
      )}

      {/* Quote Modal Wiring: Transitions to Confirmation Funnel on Submit */}
      <QuoteModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onSuccess={() => setIsConfirmed(true)}
      />

    </div>
  );
}

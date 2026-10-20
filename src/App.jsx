import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowRight } from 'lucide-react';
import Header from './components/Header';
import Hero from './components/Hero';
import StickyPageMenu from './components/StickyPageMenu';
import BenefitsSection from './components/BenefitsSection';
import HowItWorksSection from './components/HowItWorksSection';
import CasesSection from './components/CasesSection';
import FaqDrawer from './components/FaqDrawer';
import QuoteModal from './components/QuoteModal';
import LegalModal from './components/LegalModal';
import TrialConfirmationView from './components/TrialConfirmationView';
import Footer from './components/Footer';

export default function App() {
  const [theme, setTheme] = useState('light');
  const [activeSection, setActiveSection] = useState('benefits');
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isFaqDrawerOpen, setIsFaqDrawerOpen] = useState(false);
  const [isLegalModalOpen, setIsLegalModalOpen] = useState(false);
  const [legalModalTab, setLegalModalTab] = useState('terms');
  const [showBottomCta, setShowBottomCta] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);

  // 100-CAP LIVE HEARTBEAT STATE
  const [trialStatus, setTrialStatus] = useState({
    count: 0,
    cap: 100,
    remaining: 100,
    isOpen: true,
    month: ''
  });

  const isDark = theme === 'dark';
  const toggleTheme = () => setTheme(prev => prev === 'light' ? 'dark' : 'light');

  useEffect(() => {
    fetch('https://legacy.staymedia.ng/wp-json/staymedia/v1/trial-status')
      .then(res => res.json())
      .then(data => {
        if (data && data.success) {
          setTrialStatus({
            count: typeof data.count === 'number' ? data.count : 0,
            cap: data.cap || 100,
            remaining: typeof data.remaining === 'number' ? data.remaining : 100,
            isOpen: data.is_open !== false,
            month: data.month || ''
          });
        }
      })
      .catch(() => {});
  }, []);

  useEffect(() => {
    const handleScroll = () => {
      if (isSubmitted) return;

      const scrollPos = window.scrollY + 200;
      setShowBottomCta(window.scrollY > 380);

      const benefitsEl = document.getElementById('benefits');
      const howItWorksEl = document.getElementById('how-it-works');
      const casesEl = document.getElementById('cases');

      if (casesEl && scrollPos >= casesEl.offsetTop) {
        setActiveSection('cases');
      } else if (howItWorksEl && scrollPos >= howItWorksEl.offsetTop) {
        setActiveSection('how-it-works');
      } else {
        setActiveSection('benefits');
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, [isSubmitted]);

  const handleSelectSection = (sectionId) => {
    setActiveSection(sectionId);
    const target = document.getElementById(sectionId);
    if (target) {
      const yOffset = -90;
      const y = target.getBoundingClientRect().top + window.pageYOffset + yOffset;
      window.scrollTo({ top: y, behavior: 'smooth' });
    }
  };

  const handleOpenLegal = (tab = 'terms') => {
    setLegalModalTab(tab);
    setIsLegalModalOpen(true);
  };

  const handleFormSuccess = () => {
    setIsModalOpen(false);
    setIsSubmitted(true);
    window.scrollTo({ top: 0, behavior: 'instant' });
  };

  const handleReturnToStorefront = () => {
    setIsSubmitted(false);
    window.scrollTo({ top: 0, behavior: 'instant' });
  };

  return (
    <div className={`min-h-screen w-full font-body overflow-x-clip transition-colors duration-200 ${
      isDark ? 'bg-[#0C150F] text-white' : 'bg-[#F4FBF2] text-[#111827]'
    }`}>
      <Header
        theme={theme}
        onToggleTheme={toggleTheme}
        onOpenFaqDrawer={() => setIsFaqDrawerOpen(true)}
      />

      {isSubmitted ? (
        <main className="w-full">
          <TrialConfirmationView
            onBack={handleReturnToStorefront}
            isDark={isDark}
          />
        </main>
      ) : (
        <main className="w-full">
          <Hero
            onClaimClick={() => trialStatus.isOpen && setIsModalOpen(true)}
            onOpenLegal={handleOpenLegal}
            isDark={isDark}
            trialStatus={trialStatus}
          />

          <StickyPageMenu
            activeSection={activeSection}
            onSelectSection={handleSelectSection}
            isDark={isDark}
          />

          <BenefitsSection
            isDark={isDark}
            onClaimClick={() => trialStatus.isOpen && setIsModalOpen(true)}
          />

          <HowItWorksSection isDark={isDark} />

          <CasesSection onOpenBrief={() => trialStatus.isOpen && setIsModalOpen(true)} isDark={isDark} />
        </main>
      )}

      <Footer onOpenLegal={handleOpenLegal} isDark={isDark} />

      <AnimatePresence>
        {showBottomCta && !isModalOpen && !isLegalModalOpen && !isFaqDrawerOpen && !isSubmitted && (
          <motion.div
            initial={{ y: 50, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: 50, opacity: 0 }}
            className="fixed bottom-7 sm:bottom-9 left-1/2 -translate-x-1/2 z-40 w-full max-w-[340px] sm:max-w-[460px] min-[1024px]:max-w-[500px] px-4 pointer-events-auto"
          >
            <motion.button
              whileHover={trialStatus.isOpen ? { scale: 1.035, y: -2 } : {}}
              whileTap={trialStatus.isOpen ? { scale: 0.96 } : {}}
              disabled={!trialStatus.isOpen}
              onClick={() => trialStatus.isOpen && setIsModalOpen(true)}
              className={`w-full py-4 rounded-full font-display font-extrabold text-xs uppercase tracking-wider shadow-2xl transition-all flex items-center justify-center space-x-2 border border-white/20 ${
                trialStatus.isOpen
                  ? 'bg-[#0EA34A] hover:bg-[#0C8F40] text-white cursor-pointer'
                  : 'bg-gray-600 text-white/70 cursor-not-allowed opacity-85'
              }`}
            >
              <span>{trialStatus.isOpen ? 'CLAIM FREE TRIAL' : 'COHORT FULL (100/100)'}</span>
              {trialStatus.isOpen && <ArrowRight className="w-3.5 h-3.5" />}
            </motion.button>
          </motion.div>
        )}
      </AnimatePresence>

      <FaqDrawer
        isOpen={isFaqDrawerOpen}
        onClose={() => setIsFaqDrawerOpen(false)}
        isDark={isDark}
        onOpenBrief={() => {
          setIsFaqDrawerOpen(false);
          if (trialStatus.isOpen) setIsModalOpen(true);
        }}
      />

      <QuoteModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onSuccess={handleFormSuccess}
        onOpenLegal={handleOpenLegal}
        isDark={isDark}
      />

      <LegalModal
        isOpen={isLegalModalOpen}
        onClose={() => setIsLegalModalOpen(false)}
        initialTab={legalModalTab}
        isDark={isDark}
      />
    </div>
  );
}

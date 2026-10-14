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

  const isDark = theme === 'dark';
  const toggleTheme = () => setTheme(prev => prev === 'light' ? 'dark' : 'light');

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
      
      {/* Header with '?' FAQ Drawer Trigger */}
      <Header
        theme={theme}
        onToggleTheme={toggleTheme}
        onOpenFaqDrawer={() => setIsFaqDrawerOpen(true)}
      />

      {/* VIEW CONDITIONAL: CONFIRMATION SCREEN VS STANDARD STOREFRONT */}
      {isSubmitted ? (
        <main className="w-full">
          <TrialConfirmationView
            onBack={handleReturnToStorefront}
            isDark={isDark}
          />
        </main>
      ) : (
        <main className="w-full">
          {/* 1. HERO */}
          <Hero
            onClaimClick={() => setIsModalOpen(true)}
            onOpenLegal={handleOpenLegal}
            isDark={isDark}
          />

          {/* 2. STICKY PAGE MENU: [ Benefits ] [ How it works ] [ Cases ] */}
          <StickyPageMenu
            activeSection={activeSection}
            onSelectSection={handleSelectSection}
            isDark={isDark}
          />

          {/* 3. BENEFITS SECTION (6-POINT NOTION GRID & RISK REVERSAL) */}
          <BenefitsSection
            isDark={isDark}
            onClaimClick={() => setIsModalOpen(true)}
          />

          {/* 4. HOW IT WORKS SECTION */}
          <HowItWorksSection isDark={isDark} />

          {/* 5. CASES SECTION */}
          <CasesSection onOpenBrief={() => setIsModalOpen(true)} isDark={isDark} />
        </main>
      )}

      <Footer onOpenLegal={handleOpenLegal} isDark={isDark} />

      {/* POLISHED STICKY BOTTOM BUTTON */}
      <AnimatePresence>
        {showBottomCta && !isModalOpen && !isLegalModalOpen && !isFaqDrawerOpen && !isSubmitted && (
          <motion.div
            initial={{ y: 50, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: 50, opacity: 0 }}
            className="fixed bottom-7 sm:bottom-9 left-1/2 -translate-x-1/2 z-40 w-full max-w-[340px] sm:max-w-[460px] min-[1024px]:max-w-[500px] px-4 pointer-events-auto"
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

      {/* Full-Screen Categorized FAQ Drawer (Triggered by '?' Icon in Header) */}
      <FaqDrawer
        isOpen={isFaqDrawerOpen}
        onClose={() => setIsFaqDrawerOpen(false)}
        isDark={isDark}
        onOpenBrief={() => {
          setIsFaqDrawerOpen(false);
          setIsModalOpen(true);
        }}
      />

      {/* Primary Conversion Intake Modal */}
      <QuoteModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onSuccess={handleFormSuccess}
        onOpenLegal={handleOpenLegal}
      />

      {/* Dedicated Legal Governance Reader (Terms & Privacy) */}
      <LegalModal
        isOpen={isLegalModalOpen}
        onClose={() => setIsLegalModalOpen(false)}
        initialTab={legalModalTab}
        isDark={isDark}
      />
    </div>
  );
}

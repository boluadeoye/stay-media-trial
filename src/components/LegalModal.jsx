import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Shield, FileText, CheckCircle2, ExternalLink } from 'lucide-react';
import { LEGAL_METADATA, TRIAL_TERMS_SECTIONS, PRIVACY_POLICY_SECTIONS } from '../constants/legalData';

export default function LegalModal({ isOpen, onClose, initialTab = 'terms', isDark = false }) {
  const [activeTab, setActiveTab] = useState(initialTab);

  useEffect(() => {
    if (initialTab) setActiveTab(initialTab);
  }, [initialTab]);

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [isOpen]);

  const sections = activeTab === 'terms' ? TRIAL_TERMS_SECTIONS : PRIVACY_POLICY_SECTIONS;
  const isTerms = activeTab === 'terms';

  // AUTOMATED REGEX PARSER: TURNS EMAILS & URLS INTO HIGH-CONTRAST CLICKABLE LINKS
  const renderFormattedPoint = (text) => {
    const parts = text.split(/(speakto@staymedia\.ng|https:\/\/staymedia\.ng)/g);
    return parts.map((part, index) => {
      if (part === 'speakto@staymedia.ng') {
        return (
          <a
            key={index}
            href="mailto:speakto@staymedia.ng"
            className="text-[#0EA34A] underline font-bold hover:text-[#0C8F40] transition-colors cursor-pointer"
          >
            speakto@staymedia.ng
          </a>
        );
      }
      if (part === 'https://staymedia.ng') {
        return (
          <a
            key={index}
            href="https://staymedia.ng"
            target="_blank"
            rel="noopener noreferrer"
            className="text-[#0EA34A] underline font-bold hover:text-[#0C8F40] transition-colors inline-flex items-center space-x-0.5 cursor-pointer"
          >
            <span>https://staymedia.ng</span>
            <ExternalLink className="w-2.5 h-2.5 inline ml-0.5 stroke-[2.5]" />
          </a>
        );
      }
      return part;
    });
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-2 sm:p-6 font-body">
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="absolute inset-0 bg-black/80 backdrop-blur-md"
          />

          {/* Modal Container */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 20 }}
            transition={{ type: "spring", stiffness: 450, damping: 28 }}
            className={`relative w-full max-w-[1040px] h-[92dvh] rounded-[24px] border shadow-2xl z-10 flex flex-col overflow-hidden text-left ${
              isDark
                ? 'bg-[#0C150F] border-white/15 text-white'
                : 'bg-[#F4FBF2] border-[#E5E7EB] text-[#111827]'
            }`}
          >
            {/* Top Bar Header */}
            <div className={`p-4 sm:p-6 border-b flex items-center justify-between flex-shrink-0 transition-colors ${
              isDark ? 'border-white/10 bg-[#06170E]' : 'border-black/10 bg-white'
            }`}>
              <div className="flex items-center space-x-3">
                <div className="w-9 h-9 rounded-full bg-[#0EA34A]/10 text-[#0EA34A] flex items-center justify-center flex-shrink-0">
                  {isTerms ? <FileText className="w-4 h-4 stroke-[2.5]" /> : <Shield className="w-4 h-4 stroke-[2.5]" />}
                </div>
                <div>
                  <div className="font-display font-black text-sm sm:text-base tracking-tight">
                    {LEGAL_METADATA.entityName} Legal Governance
                  </div>
                  <div className="text-[10px] sm:text-xs opacity-60">
                    Governed under the {LEGAL_METADATA.governingLaw} · Updated {LEGAL_METADATA.lastUpdated}
                  </div>
                </div>
              </div>

              {/* Close Button */}
              <button
                onClick={onClose}
                className={`p-2 rounded-full border transition-colors cursor-pointer ${
                  isDark
                    ? 'border-white/15 text-white/70 hover:text-white hover:bg-white/10'
                    : 'border-black/10 text-black/70 hover:text-black hover:bg-black/5'
                }`}
                aria-label="Close legal modal"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Tab Navigation Pill Bar */}
            <div className={`px-4 sm:px-6 py-3 border-b flex items-center justify-between flex-shrink-0 ${
              isDark ? 'border-white/10 bg-[#0B2215]/60' : 'border-black/5 bg-[#E8F7ED]/50'
            }`}>
              <div className="flex items-center space-x-2">
                <button
                  type="button"
                  onClick={() => setActiveTab('terms')}
                  className={`px-4 py-2 rounded-full text-xs font-display font-extrabold uppercase tracking-wider transition-all cursor-pointer ${
                    activeTab === 'terms'
                      ? 'bg-[#0EA34A] text-white shadow-md'
                      : isDark
                      ? 'text-white/70 hover:text-white hover:bg-white/5'
                      : 'text-black/70 hover:text-black hover:bg-black/5'
                  }`}
                >
                  Trial Terms (12 Sections)
                </button>
                <button
                  type="button"
                  onClick={() => setActiveTab('privacy')}
                  className={`px-4 py-2 rounded-full text-xs font-display font-extrabold uppercase tracking-wider transition-all cursor-pointer ${
                    activeTab === 'privacy'
                      ? 'bg-[#0EA34A] text-white shadow-md'
                      : isDark
                      ? 'text-white/70 hover:text-white hover:bg-white/5'
                      : 'text-black/70 hover:text-black hover:bg-black/5'
                  }`}
                >
                  Privacy Policy (NDPA 2023)
                </button>
              </div>

              <div className="hidden sm:flex items-center space-x-2 text-[11px] font-semibold opacity-60">
                <span>Contact:</span>
                <a href={`mailto:${LEGAL_METADATA.contactEmail}`} className="text-[#0EA34A] hover:underline font-bold">
                  {LEGAL_METADATA.contactEmail}
                </a>
              </div>
            </div>

            {/* Scrollable Legal Body */}
            <div className="flex-1 overflow-y-auto p-5 sm:p-8 space-y-8 scrollbar-thin scrollbar-thumb-gray-400">
              <div className="max-w-[880px] mx-auto space-y-8">
                {/* Document Subheader Notice */}
                <div className={`p-4 sm:p-5 rounded-[16px] border ${
                  isDark ? 'bg-[#06170E] border-white/10' : 'bg-white border-black/10'
                }`}>
                  <div className="flex items-start space-x-3">
                    <CheckCircle2 className="w-5 h-5 text-[#0EA34A] flex-shrink-0 mt-0.5" />
                    <div className="text-xs leading-relaxed opacity-85">
                      {isTerms
                        ? "These terms apply to all applicants and approved participants in the Stay Media 7-Day Free Trial Growth Sprint. Applying indicates acceptance of all terms stated below."
                        : "This Privacy Policy governs the collection, processing, and storage of personal information across Stay Media digital storefronts in strict compliance with the Nigeria Data Protection Act 2023 (NDPA 2023)."}
                    </div>
                  </div>
                </div>

                {/* Numbered Sections with Formatted Interactive Links */}
                <div className="space-y-6">
                  {sections.map((section) => (
                    <div
                      key={section.id}
                      className={`p-5 sm:p-6 rounded-[18px] border transition-all ${
                        isDark ? 'bg-[#0B2215]/40 border-white/10' : 'bg-white border-[#E5E7EB] shadow-sm'
                      }`}
                    >
                      <div className="flex items-center space-x-3 pb-3 border-b border-black/5 dark:border-white/10 mb-3">
                        <span className="font-display font-black text-xs px-2.5 py-0.5 rounded-full bg-[#0EA34A] text-white">
                          Section {section.number}
                        </span>
                        <h3 className="font-display font-extrabold text-sm sm:text-base tracking-tight">
                          {section.title}
                        </h3>
                      </div>

                      <ul className="space-y-2.5 text-xs sm:text-[13px] leading-relaxed opacity-90 font-body">
                        {section.points.map((pt, pIdx) => (
                          <li key={pIdx} className="flex items-start space-x-2">
                            <span className="text-[#0EA34A] font-bold mt-0.5">•</span>
                            <span className="flex-1">{renderFormattedPoint(pt)}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  ))}
                </div>

                {/* Footer Assurance Banner */}
                <div className={`p-6 rounded-[18px] border text-center space-y-2 ${
                  isDark ? 'bg-[#06170E] border-white/10' : 'bg-white border-black/10'
                }`}>
                  <div className="font-display font-extrabold text-xs uppercase tracking-wider text-[#0EA34A]">
                    Official Service Governance · Stay Media Ltd
                  </div>
                  <p className="text-[11.5px] opacity-70 max-w-[600px] mx-auto">
                    For regulatory inquiries, Data Protection Officer requests, or enterprise SLA agreements, please write to{" "}
                    <a href={`mailto:${LEGAL_METADATA.contactEmail}`} className="text-[#0EA34A] underline font-bold">
                      {LEGAL_METADATA.contactEmail}
                    </a>.
                  </p>
                </div>
              </div>
            </div>

            {/* Bottom Modal Bar */}
            <div className={`p-4 border-t flex items-center justify-between flex-shrink-0 text-xs ${
              isDark ? 'border-white/10 bg-[#06170E]' : 'border-black/10 bg-white'
            }`}>
              <div className="text-[11px] opacity-60">
                © 2026 STAY MEDIA Ltd. All Rights Reserved.
              </div>
              <button
                type="button"
                onClick={onClose}
                className="px-6 py-2 rounded-full bg-[#0EA34A] hover:bg-[#0C8F40] text-white font-display font-bold text-xs uppercase tracking-wider transition-colors cursor-pointer shadow-md"
              >
                Close Legal Document
              </button>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}

import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Check, ArrowRight, Download } from 'lucide-react';
import { TRIAL_SERVICE_DATA } from '../constants/trialData';

export default function TrialConfirmationView({ onBack, isDark = false }) {
  const [downloadSuccess, setDownloadSuccess] = useState(false);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const handleEbookDownload = () => {
    setDownloadSuccess(true);
    const link = document.createElement('a');
    link.href = TRIAL_SERVICE_DATA.ebookCover;
    link.download = "StayMedia-Social-Media-Audit-Guide.jpg";
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <div className={`w-full min-h-screen font-body overflow-x-hidden selection:bg-[#0EA34A] selection:text-white pt-24 pb-20 px-6 sm:px-10 transition-colors duration-200 ${
      isDark ? 'bg-[#0C150F] text-white' : 'bg-[#F4FBF2] text-[#111827]'
    }`}>
      <div className="max-w-[920px] mx-auto space-y-12 text-left">
        
        {/* STEP 1: APPLICATION RECEIVED & WHAT HAPPENS NEXT TIMELINE */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className={`p-7 sm:p-10 rounded-[24px] border shadow-xl space-y-6 ${
            isDark ? 'bg-[#0B2215] border-white/10' : 'bg-white border-[#E5E7EB]'
          }`}
        >
          <div className="space-y-3">
            <div className="inline-flex items-center space-x-2 px-3 py-1 rounded-full bg-[#E8F7ED] border border-[#0EA34A]/25 text-[10px] font-display font-extrabold uppercase tracking-widest text-[#044b1d]">
              <Check className="w-3.5 h-3.5 text-[#0EA34A]" />
              <span>Application Received</span>
            </div>

            <h1 className="text-2xl sm:text-4xl font-extrabold tracking-tight leading-tight">
              Your 7-Day Growth Trial Application Has Been Received
            </h1>

            <p className={`text-xs sm:text-sm leading-relaxed max-w-[56ch] ${
              isDark ? 'text-white/75' : 'text-[#4B5563]'
            }`}>
              Thanks for taking the first step toward improving your business digitally. Our team will review your application and contact you via WhatsApp/email with the next steps.
            </p>
          </div>

          <div className={`p-5 rounded-[16px] border space-y-3 ${
            isDark ? 'bg-[#06170E] border-white/10' : 'bg-[#F9FAFB] border-[#E5E7EB]'
          }`}>
            <span className="text-[10px] font-display font-extrabold uppercase tracking-widest text-[#0EA34A] block">
              What Happens Next?
            </span>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 pt-1">
              <div className="flex items-center space-x-2.5">
                <span className="w-6 h-6 rounded-full bg-[#0EA34A] text-white flex items-center justify-center font-display font-bold text-xs flex-shrink-0">
                  01
                </span>
                <span className="text-xs font-display font-bold">Review Application</span>
              </div>
              <div className="flex items-center space-x-2.5">
                <span className="w-6 h-6 rounded-full bg-[#0EA34A]/20 text-[#0EA34A] flex items-center justify-center font-display font-bold text-xs flex-shrink-0">
                  02
                </span>
                <span className="text-xs font-display font-bold">Qualification Check</span>
              </div>
              <div className="flex items-center space-x-2.5">
                <span className="w-6 h-6 rounded-full bg-black/10 dark:bg-white/10 text-gray-500 flex items-center justify-center font-display font-bold text-xs flex-shrink-0">
                  03
                </span>
                <span className="text-xs font-display font-bold">7-Day Sprint Begins</span>
              </div>
            </div>
          </div>
        </motion.div>

        {/* STEP 2: DIGITAL INCENTIVE (FREE EBOOK LEAD MAGNET WITH 3D DESK MOCKUP) */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className={`p-7 sm:p-10 rounded-[24px] border shadow-xl ${
            isDark ? 'bg-[#0B2215] border-white/10' : 'bg-white border-[#E5E7EB]'
          }`}
        >
          <div className="grid grid-cols-1 min-[741px]:grid-cols-12 gap-8 items-center">
            
            <div className="min-[741px]:col-span-5 flex justify-center">
              <div className="relative w-full max-w-[340px] aspect-[4/3] rounded-[18px] overflow-hidden shadow-2xl border border-black/10 dark:border-white/15">
                <img
                  src={TRIAL_SERVICE_DATA.ebookCover}
                  alt="Social Media Audit Guide"
                  className="w-full h-full object-cover"
                />
              </div>
            </div>

            <div className="min-[741px]:col-span-7 space-y-4 text-left">
              <span className="text-[10px] font-display font-extrabold uppercase tracking-widest text-[#0EA34A] block">
                While You Wait, Get Something Useful...
              </span>

              <h2 className="text-xl sm:text-2xl font-extrabold tracking-tight leading-snug">
                Get Our Free Social Media Audit Guide
              </h2>

              <p className={`text-xs leading-relaxed ${isDark ? 'text-white/75' : 'text-[#4B5563]'}`}>
                Want to start improving your business right now? We've created a practical digital growth guide to help business owners understand what is working, what is holding you back, and how to turn digital attention into sales.
              </p>

              <div className="space-y-1.5 text-xs font-medium">
                <div className="flex items-center space-x-2 text-[#0EA34A]">
                  <span>✔</span>
                  <span className={isDark ? 'text-white/85' : 'text-[#111827]'}>Find out what is working and what is not</span>
                </div>
                <div className="flex items-center space-x-2 text-[#0EA34A]">
                  <span>✔</span>
                  <span className={isDark ? 'text-white/85' : 'text-[#111827]'}>Discover what is holding your sales back</span>
                </div>
                <div className="flex items-center space-x-2 text-[#0EA34A]">
                  <span>✔</span>
                  <span className={isDark ? 'text-white/85' : 'text-[#111827]'}>Practical steps to generate more paying customers</span>
                </div>
              </div>

              <div className="pt-2">
                <button
                  onClick={handleEbookDownload}
                  className="px-6 py-3.5 rounded-[8px] bg-black hover:bg-black/85 text-white font-display font-bold text-xs uppercase tracking-wider transition-colors shadow-lg flex items-center space-x-2 cursor-pointer"
                >
                  <Download className="w-4 h-4 text-[#0EA34A]" />
                  <span>{downloadSuccess ? "✓ Downloading Guide..." : "GET FREE EBOOK"}</span>
                </button>
              </div>
            </div>

          </div>
        </motion.div>

        {/* STEP 3: STAY MEDIA COMMUNITY INVITATION */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="p-8 sm:p-10 rounded-[24px] bg-gradient-to-br from-[#06170E] via-[#0B2215] to-[#04110A] text-white border border-white/15 shadow-2xl flex flex-col min-[741px]:flex-row items-start min-[741px]:items-center justify-between gap-6"
        >
          <div className="space-y-2 max-w-[500px]">
            <span className="text-[10px] font-display font-bold uppercase tracking-widest text-[#F5B800]">
              Want more resources like this?
            </span>
            <h3 className="text-xl sm:text-2xl font-extrabold tracking-tight">
              Join the Stay Media Community
            </h3>
            <p className="text-xs text-white/75 leading-relaxed font-normal">
              Connect directly with our growth practitioners and get exclusive commercial playbooks delivered directly to your WhatsApp.
            </p>
          </div>

          <a
            href={TRIAL_SERVICE_DATA.whatsappUrl}
            target="_blank"
            rel="noreferrer"
            className="px-7 py-3.5 rounded-full bg-[#0EA34A] hover:bg-[#0C8F40] text-white font-display font-bold text-xs uppercase tracking-wider transition-all shadow-xl flex items-center space-x-2 whitespace-nowrap cursor-pointer"
          >
            <span>JOIN FREE</span>
            <ArrowRight className="w-4 h-4" />
          </a>
        </motion.div>

        {/* EXACT REQUIREMENT: '← Return back' */}
        <div className="text-center pt-2">
          <button
            onClick={onBack}
            className={`text-xs font-display font-bold hover:underline cursor-pointer transition-colors ${
              isDark ? 'text-white/60 hover:text-white' : 'text-[#6B7280] hover:text-[#111827]'
            }`}
          >
            ← Return back
          </button>
        </div>

      </div>
    </div>
  );
}

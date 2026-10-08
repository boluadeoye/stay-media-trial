import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Check, ArrowRight } from 'lucide-react';
import { TRIAL_SERVICE_DATA } from '../constants/trialData';

export default function TrialModal({ isOpen, onClose }) {
  const [formData, setFormData] = useState({
    fullName: '',
    businessName: '',
    email: '',
    phone: '',
    goal: 'Customer Acquisition & Inbound Leads'
  });
  const [formStatus, setFormStatus] = useState('idle');

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!formData.fullName || !formData.email || !formData.businessName) return;
    setFormStatus('submitting');

    const payload = {
      businessName: formData.businessName,
      email: formData.email,
      phoneNumber: formData.phone,
      supportLookingFor: '7-Day Free Trial Sprint',
      helpText: `Full Name: ${formData.fullName}\nPrimary Goal: ${formData.goal}`,
      target_email: 'growth@staymedia.ng',
      submitted_at: new Date().toISOString()
    };

    try {
      fetch(TRIAL_SERVICE_DATA.wpAuditEndpoint, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload)
      }).catch(() => {});
    } catch {}

    setTimeout(() => {
      setFormStatus('submitted');
      window.location.href = TRIAL_SERVICE_DATA.whatsappUrl;
    }, 650);
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 font-body">
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="absolute inset-0 bg-black/75 backdrop-blur-sm"
          />

          {/* Modal Card */}
          <motion.div
            initial={{ opacity: 0, scale: 0.94, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.94, y: 15 }}
            transition={{ type: "spring", stiffness: 450, damping: 25 }}
            className="relative w-full max-w-[480px] bg-white border border-[#E5E7EB] rounded-[20px] p-6 sm:p-8 shadow-2xl z-10 text-left"
          >
            <div className="flex items-center justify-between pb-4 border-b border-[#E5E7EB] mb-4">
              <div>
                <span className="text-[10px] font-display font-extrabold uppercase tracking-widest text-black/50">
                  Sprint Application
                </span>
                <h3 className="font-display font-black text-lg text-black">
                  Claim Your 7-Day Free Trial
                </h3>
              </div>
              <button
                onClick={onClose}
                className="p-1 rounded-full text-black/50 hover:text-black hover:bg-black/5 transition-colors cursor-pointer"
                aria-label="Close"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleSubmit} className="space-y-3.5">
              <div>
                <label className="block text-[11px] font-display font-bold text-black mb-1">
                  Full Name *
                </label>
                <input
                  type="text"
                  required
                  value={formData.fullName}
                  onChange={(e) => setFormData({ ...formData, fullName: e.target.value })}
                  placeholder="e.g. Samuel Adeleke"
                  className="w-full px-3.5 py-2.5 rounded-[8px] bg-[#F9FAFB] border border-[#E5E7EB] text-xs text-black placeholder-black/35 focus:border-black focus:outline-none"
                />
              </div>

              <div>
                <label className="block text-[11px] font-display font-bold text-black mb-1">
                  Business Name *
                </label>
                <input
                  type="text"
                  required
                  value={formData.businessName}
                  onChange={(e) => setFormData({ ...formData, businessName: e.target.value })}
                  placeholder="Company name"
                  className="w-full px-3.5 py-2.5 rounded-[8px] bg-[#F9FAFB] border border-[#E5E7EB] text-xs text-black placeholder-black/35 focus:border-black focus:outline-none"
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="block text-[11px] font-display font-bold text-black mb-1">
                    Work Email *
                  </label>
                  <input
                    type="email"
                    required
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    placeholder="name@company.com"
                    className="w-full px-3.5 py-2.5 rounded-[8px] bg-[#F9FAFB] border border-[#E5E7EB] text-xs text-black placeholder-black/35 focus:border-black focus:outline-none"
                  />
                </div>
                <div>
                  <label className="block text-[11px] font-display font-bold text-black mb-1">
                    Phone / WhatsApp *
                  </label>
                  <input
                    type="tel"
                    required
                    value={formData.phone}
                    onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                    placeholder="+234..."
                    className="w-full px-3.5 py-2.5 rounded-[8px] bg-[#F9FAFB] border border-[#E5E7EB] text-xs text-black placeholder-black/35 focus:border-black focus:outline-none"
                  />
                </div>
              </div>

              <div>
                <label className="block text-[11px] font-display font-bold text-black mb-1">
                  Primary Objective
                </label>
                <select
                  value={formData.goal}
                  onChange={(e) => setFormData({ ...formData, goal: e.target.value })}
                  className="w-full px-3.5 py-2.5 rounded-[8px] bg-[#F9FAFB] border border-[#E5E7EB] text-xs text-black focus:border-black focus:outline-none"
                >
                  <option value="Customer Acquisition & Inbound Leads">Customer Acquisition & Inbound Leads</option>
                  <option value="High-Converting Web Infrastructure">High-Converting Web Infrastructure</option>
                  <option value="Brand Identity & Visual Positioning">Brand Identity & Visual Positioning</option>
                  <option value="Complete Digital Commercial Strategy">Complete Digital Commercial Strategy</option>
                </select>
              </div>

              <button
                type="submit"
                disabled={formStatus !== 'idle'}
                className="w-full py-3.5 mt-2 rounded-[8px] bg-black text-white font-display font-bold text-xs uppercase tracking-wider hover:bg-black/85 transition-colors flex items-center justify-center space-x-2 cursor-pointer disabled:opacity-75 shadow-md"
              >
                {formStatus === 'idle' && (
                  <>
                    <span>Submit & Join WhatsApp Channel</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </>
                )}
                {formStatus === 'submitting' && <span>Submitting & Redirecting…</span>}
                {formStatus === 'submitted' && (
                  <>
                    <Check className="w-4 h-4 text-white" />
                    <span>✓ Redirecting to WhatsApp Channel…</span>
                  </>
                )}
              </button>

              <p className="text-center text-[10px] text-black/50 pt-1">
                🔒 Strict commercial privacy. No payment required to apply.
              </p>
            </form>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}

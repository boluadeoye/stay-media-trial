import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Star, ShieldCheck, Award, Clock, AlertCircle } from 'lucide-react';
import { TRIAL_SERVICE_DATA, CONTACT_INFO, TRIAL_ASSETS } from '../constants/trialData';

export default function QuoteModal({ isOpen, onClose, onSuccess }) {
  const [activeReviewIdx, setActiveReviewIdx] = useState(0);
  const [activePanel, setActivePanel] = useState('form');

  const [formData, setFormData] = useState({
    fullName: '',
    businessName: '',
    phone: '',
    email: '',
    website: '',
    socialHandle: '',
    industry: '',
    businessStage: 'Startup',
    biggestChallenges: ['low customers'],
    serviceInterested: 'Basic Landing Page',
    whyInterested: 'I need more customers',
    paidPlan: 'Yes'
  });

  const [formStatus, setFormStatus] = useState('idle');
  const [errors, setErrors] = useState({});
  const [validationAlert, setValidationAlert] = useState('');

  const toggleChallenge = (item) => {
    setFormData(prev => ({
      ...prev,
      biggestChallenges: prev.biggestChallenges.includes(item)
        ? prev.biggestChallenges.filter(c => c !== item)
        : [...prev.biggestChallenges, item]
    }));
  };

  const handleFieldChange = (field, value) => {
    setFormData(prev => ({ ...prev, [field]: value }));
    if (errors[field]) {
      setErrors(prev => {
        const next = { ...prev };
        delete next[field];
        return next;
      });
    }
    if (validationAlert) setValidationAlert('');
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const newErrors = {};
    if (!formData.fullName.trim()) newErrors.fullName = "Full name is required";
    if (!formData.businessName.trim()) newErrors.businessName = "Business name is required";
    if (!formData.phone.trim()) newErrors.phone = "Phone / WhatsApp is required";
    if (!formData.email.trim()) {
      newErrors.email = "Work email is required";
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email.trim())) {
      newErrors.email = "Please enter a valid email address (e.g. name@company.com)";
    }

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      const missingList = Object.keys(newErrors).map(k => {
        if (k === 'fullName') return 'Full Name';
        if (k === 'businessName') return 'Business Name';
        if (k === 'phone') return 'Phone Number';
        if (k === 'email') return 'Work Email';
        return k;
      }).join(', ');

      setValidationAlert(`Please fill in all required fields: ${missingList}`);
      const scrollable = document.getElementById('modal-scroll-container');
      if (scrollable) scrollable.scrollTo({ top: 0, behavior: 'smooth' });
      return;
    }

    setErrors({});
    setValidationAlert('');
    setFormStatus('submitting');

    const payload = {
      fullName: formData.fullName,
      businessName: formData.businessName,
      email: formData.email,
      phoneNumber: formData.phone,
      supportLookingFor: '7-Day Free Trial Sprint Application',
      helpText: `Company: ${formData.businessName}\nWebsite: ${formData.website}\nSocial: ${formData.socialHandle}\nIndustry: ${formData.industry}\nStage: ${formData.businessStage}\nChallenges: ${formData.biggestChallenges.join(', ')}\nService: ${formData.serviceInterested}\nWhy Interested: ${formData.whyInterested}\nPaid Plan: ${formData.paidPlan}`,
      target_email: CONTACT_INFO.supportEmail,
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
      setFormStatus('idle');
      if (onSuccess) onSuccess();
      if (onClose) onClose();
    }, 550);
  };

  const reviews = TRIAL_SERVICE_DATA.googleReviews;
  const currentReview = reviews[activeReviewIdx] || reviews[0];

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 font-body">
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} onClick={onClose} className="absolute inset-0 bg-black/75 backdrop-blur-sm" />

          <motion.div
            id="modal-scroll-container"
            initial={{ opacity: 0, scale: 0.94, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.94, y: 15 }}
            transition={{ type: "spring", stiffness: 450, damping: 25 }}
            className="relative w-full max-w-[960px] max-h-[92dvh] overflow-y-auto bg-white rounded-[24px] border border-[#E5E7EB] shadow-2xl z-10 grid grid-cols-1 min-[741px]:grid-cols-12 text-left"
          >
            <button onClick={onClose} className="absolute top-4 right-4 p-1.5 rounded-full text-black/50 hover:text-black hover:bg-black/5 z-20 cursor-pointer" aria-label="Close modal">
              <X className="w-5 h-5" />
            </button>

            {/* Mobile Underline Switcher (< 741px) */}
            <div className="min-[741px]:hidden col-span-1 p-5 pb-0">
              <div className="flex items-center border-b border-[#E5E7EB] w-full">
                <button
                  type="button"
                  onClick={() => setActivePanel('form')}
                  className={`pb-2.5 px-4 text-xs font-display font-bold uppercase tracking-wider transition-all cursor-pointer border-b-2 -mb-[1px] ${
                    activePanel === 'form' ? 'border-[#0EA34A] text-[#0EA34A]' : 'border-transparent text-[#6B7280]'
                  }`}
                >
                  Application Form
                </button>
                <button
                  type="button"
                  onClick={() => setActivePanel('reviews')}
                  className={`pb-2.5 px-4 text-xs font-display font-bold uppercase tracking-wider transition-all cursor-pointer border-b-2 -mb-[1px] ${
                    activePanel === 'reviews' ? 'border-[#0EA34A] text-[#0EA34A]' : 'border-transparent text-[#6B7280]'
                  }`}
                >
                  Reviews ({reviews.length})
                </button>
              </div>
            </div>

            {/* Left Column: 4 Real Google Reviews Dotted Slider (~40% Width) */}
            <div className={`min-[741px]:col-span-5 bg-[#F9FAFB] p-6 sm:p-7 border-b min-[741px]:border-b-0 min-[741px]:border-r border-[#E5E7EB] flex flex-col justify-between space-y-6 ${
              activePanel === 'reviews' ? 'block' : 'hidden min-[741px]:flex'
            }`}>
              <div className="space-y-4">
                {/* UPGRADED: STAY MEDIA LOGO BADGE (REPLACED CRUDE SM TEXT) */}
                <div className="w-9 h-9 rounded-[10px] overflow-hidden border border-[#E5E7EB] bg-white shadow-sm flex items-center justify-center flex-shrink-0 p-0.5">
                  <img
                    src={TRIAL_ASSETS.monogramBadge || TRIAL_ASSETS.logo}
                    alt="Stay Media"
                    className="w-full h-full object-cover rounded-[8px]"
                  />
                </div>

                <div className="space-y-1">
                  <div className="flex items-center space-x-1 text-[#F59E0B]">
                    {[...Array(currentReview.rating || 5)].map((_, i) => (
                      <Star key={i} className="w-3.5 h-3.5 fill-current" />
                    ))}
                  </div>
                  <span className="text-[10px] font-display font-bold text-black/60 uppercase">
                    Verified Google Reviews
                  </span>
                </div>

                <p className="text-xs text-black/75 leading-relaxed italic font-normal min-h-[110px]">
                  "{currentReview.quote}"
                </p>

                <div>
                  <div className="font-display font-bold text-xs text-black">{currentReview.author}</div>
                  <div className="text-[10px] text-black/50">{currentReview.role}</div>
                </div>

                {/* 4 Dotted Slider Controls */}
                <div className="flex items-center space-x-2 pt-2">
                  {reviews.map((_, dotIdx) => (
                    <button
                      key={dotIdx}
                      type="button"
                      onClick={() => setActiveReviewIdx(dotIdx)}
                      className={`h-2 rounded-full transition-all cursor-pointer ${
                        activeReviewIdx === dotIdx ? 'w-6 bg-[#0EA34A]' : 'w-2 bg-black/20 hover:bg-black/40'
                      }`}
                      aria-label={`Go to review ${dotIdx + 1}`}
                    />
                  ))}
                </div>
              </div>

              <div className="pt-4 border-t border-[#E5E7EB] space-y-2 text-[10.5px] text-black/70 font-display font-medium">
                <div className="flex items-center space-x-2"><ShieldCheck className="w-3.5 h-3.5 text-[#0EA34A]" /><span>NDA Protected</span></div>
                <div className="flex items-center space-x-2"><Award className="w-3.5 h-3.5 text-[#F5B800]" /><span>Awarded Agency</span></div>
                <div className="flex items-center space-x-2"><Clock className="w-3.5 h-3.5 text-[#2563EB]" /><span>Verified Deliverables</span></div>
              </div>
            </div>

            {/* Right Column: Application Form (~60% Width) */}
            <div className={`min-[741px]:col-span-7 p-6 sm:p-8 space-y-4 ${
              activePanel === 'form' ? 'block' : 'hidden min-[741px]:block'
            }`}>
              <div className="space-y-1">
                <h3 className="font-display font-black text-xl text-black">
                  Claim Your 7-Day Free Trial
                </h3>
                <p className="text-xs text-black/60">
                  Complete the application below to initiate your 7-day growth sprint.
                </p>
              </div>

              {/* VISIBLE VALIDATION ALERT BANNER */}
              {validationAlert && (
                <motion.div
                  initial={{ opacity: 0, y: -8 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="p-3.5 rounded-[10px] bg-red-50 border border-red-200 text-red-700 text-xs flex items-start space-x-2.5"
                >
                  <AlertCircle className="w-4 h-4 text-red-600 flex-shrink-0 mt-0.5" />
                  <span className="font-medium leading-relaxed">{validationAlert}</span>
                </motion.div>
              )}

              <form onSubmit={handleSubmit} noValidate className="space-y-3">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <div>
                    <label className="block text-[10.5px] font-bold text-black mb-1">Full Name *</label>
                    <input
                      type="text"
                      placeholder="Samuel Adeleke"
                      value={formData.fullName}
                      onChange={(e) => handleFieldChange('fullName', e.target.value)}
                      className={`w-full px-3 py-2 rounded-[6px] text-xs focus:outline-none transition-colors ${
                        errors.fullName
                          ? 'bg-red-50/30 border-2 border-red-500 text-black'
                          : 'bg-[#F9FAFB] border border-[#E5E7EB] text-black focus:border-[#0EA34A]'
                      }`}
                    />
                    {errors.fullName && <p className="text-[10px] text-red-600 mt-1 font-medium">{errors.fullName}</p>}
                  </div>

                  <div>
                    <label className="block text-[10.5px] font-bold text-black mb-1">Business Name *</label>
                    <input
                      type="text"
                      placeholder="Company name"
                      value={formData.businessName}
                      onChange={(e) => handleFieldChange('businessName', e.target.value)}
                      className={`w-full px-3 py-2 rounded-[6px] text-xs focus:outline-none transition-colors ${
                        errors.businessName
                          ? 'bg-red-50/30 border-2 border-red-500 text-black'
                          : 'bg-[#F9FAFB] border border-[#E5E7EB] text-black focus:border-[#0EA34A]'
                      }`}
                    />
                    {errors.businessName && <p className="text-[10px] text-red-600 mt-1 font-medium">{errors.businessName}</p>}
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <div>
                    <label className="block text-[10.5px] font-bold text-black mb-1">Phone / WhatsApp *</label>
                    <input
                      type="tel"
                      placeholder="+234..."
                      value={formData.phone}
                      onChange={(e) => handleFieldChange('phone', e.target.value)}
                      className={`w-full px-3 py-2 rounded-[6px] text-xs focus:outline-none transition-colors ${
                        errors.phone
                          ? 'bg-red-50/30 border-2 border-red-500 text-black'
                          : 'bg-[#F9FAFB] border border-[#E5E7EB] text-black focus:border-[#0EA34A]'
                      }`}
                    />
                    {errors.phone && <p className="text-[10px] text-red-600 mt-1 font-medium">{errors.phone}</p>}
                  </div>

                  <div>
                    <label className="block text-[10.5px] font-bold text-black mb-1">Email Address *</label>
                    <input
                      type="email"
                      placeholder="name@company.com"
                      value={formData.email}
                      onChange={(e) => handleFieldChange('email', e.target.value)}
                      className={`w-full px-3 py-2 rounded-[6px] text-xs focus:outline-none transition-colors ${
                        errors.email
                          ? 'bg-red-50/30 border-2 border-red-500 text-black'
                          : 'bg-[#F9FAFB] border border-[#E5E7EB] text-black focus:border-[#0EA34A]'
                      }`}
                    />
                    {errors.email && <p className="text-[10px] text-red-600 mt-1 font-medium">{errors.email}</p>}
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <div>
                    <label className="block text-[10.5px] font-bold text-black mb-1">Website URL</label>
                    <input
                      type="text"
                      placeholder="https://..."
                      value={formData.website}
                      onChange={(e) => handleFieldChange('website', e.target.value)}
                      className="w-full px-3 py-2 rounded-[6px] bg-[#F9FAFB] border border-[#E5E7EB] text-xs text-black focus:border-[#0EA34A] focus:outline-none"
                    />
                  </div>
                  <div>
                    <label className="block text-[10.5px] font-bold text-black mb-1">Social Handle</label>
                    <input
                      type="text"
                      placeholder="Instagram / Facebook / LinkedIn"
                      value={formData.socialHandle}
                      onChange={(e) => handleFieldChange('socialHandle', e.target.value)}
                      className="w-full px-3 py-2 rounded-[6px] bg-[#F9FAFB] border border-[#E5E7EB] text-xs text-black focus:border-[#0EA34A] focus:outline-none"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <div>
                    <label className="block text-[10.5px] font-bold text-black mb-1">Business Industry</label>
                    <input
                      type="text"
                      placeholder="e.g. Retail, Real Estate"
                      value={formData.industry}
                      onChange={(e) => handleFieldChange('industry', e.target.value)}
                      className="w-full px-3 py-2 rounded-[6px] bg-[#F9FAFB] border border-[#E5E7EB] text-xs text-black focus:border-[#0EA34A] focus:outline-none"
                    />
                  </div>
                  <div>
                    <label className="block text-[10.5px] font-bold text-black mb-1">Business Stage *</label>
                    <select
                      value={formData.businessStage}
                      onChange={(e) => handleFieldChange('businessStage', e.target.value)}
                      className="w-full px-3 py-2 rounded-[6px] bg-[#F9FAFB] border border-[#E5E7EB] text-xs text-black focus:border-[#0EA34A] focus:outline-none"
                    >
                      {TRIAL_SERVICE_DATA.formOptions.businessStages.map(s => <option key={s} value={s}>{s}</option>)}
                    </select>
                  </div>
                </div>

                <div>
                  <label className="block text-[10.5px] font-bold text-black mb-1">Biggest Challenge</label>
                  <div className="flex overflow-x-auto scrollbar-thin scrollbar-thumb-gray-300 gap-1.5 py-1" style={{ touchAction: 'pan-x pan-y' }}>
                    {TRIAL_SERVICE_DATA.formOptions.biggestChallenges.map(item => {
                      const isSelected = formData.biggestChallenges.includes(item);
                      return (
                        <button
                          key={item}
                          type="button"
                          onClick={() => toggleChallenge(item)}
                          className={`px-3 py-1.5 rounded-full text-[10.5px] font-display font-bold transition-all whitespace-nowrap cursor-pointer flex-shrink-0 ${
                            isSelected ? 'bg-[#0EA34A] text-white shadow-sm' : 'bg-[#F3F4F6] text-black/75 hover:bg-[#E5E7EB]'
                          }`}
                        >
                          {isSelected ? `✓ ${item}` : `+ ${item}`}
                        </button>
                      );
                    })}
                  </div>
                </div>

                <div>
                  <label className="block text-[10.5px] font-bold text-black mb-1">Service you would like to try *</label>
                  <select
                    value={formData.serviceInterested}
                    onChange={(e) => handleFieldChange('serviceInterested', e.target.value)}
                    className="w-full px-3 py-2 rounded-[6px] bg-[#F9FAFB] border border-[#E5E7EB] text-xs text-black focus:border-[#0EA34A] focus:outline-none"
                  >
                    {TRIAL_SERVICE_DATA.formOptions.trialServices.map(s => <option key={s} value={s}>{s}</option>)}
                  </select>
                </div>

                <div>
                  <label className="block text-[10.5px] font-bold text-black mb-1">Why are you interested in the free trial right now? *</label>
                  <select
                    value={formData.whyInterested}
                    onChange={(e) => handleFieldChange('whyInterested', e.target.value)}
                    className="w-full px-3 py-2 rounded-[6px] bg-[#F9FAFB] border border-[#E5E7EB] text-xs text-black focus:border-[#0EA34A] focus:outline-none"
                  >
                    {TRIAL_SERVICE_DATA.formOptions.whyInterested.map(s => <option key={s} value={s}>{s}</option>)}
                  </select>
                </div>

                <div>
                  <label className="block text-[10.5px] font-bold text-black mb-1">If the trial delivers value, would you consider a paid plan? *</label>
                  <select
                    value={formData.paidPlan}
                    onChange={(e) => handleFieldChange('paidPlan', e.target.value)}
                    className="w-full px-3 py-2 rounded-[6px] bg-[#F9FAFB] border border-[#E5E7EB] text-xs text-black focus:border-[#0EA34A] focus:outline-none"
                  >
                    {TRIAL_SERVICE_DATA.formOptions.paidPlan.map(s => <option key={s} value={s}>{s}</option>)}
                  </select>
                </div>

                <div className="pt-2">
                  <button
                    type="submit"
                    disabled={formStatus !== 'idle'}
                    className="w-full py-3.5 rounded-[8px] bg-black hover:bg-black/90 text-white font-display font-bold text-xs uppercase tracking-wider transition-colors flex items-center justify-center space-x-2 cursor-pointer shadow-lg disabled:opacity-75"
                  >
                    {formStatus === 'idle' && <span>CLAIM MY FREE TRIAL</span>}
                    {formStatus === 'submitting' && <span>Submitting Application…</span>}
                  </button>
                </div>
              </form>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Star, ShieldCheck, Award, Clock, AlertCircle } from 'lucide-react';
import { TRIAL_SERVICE_DATA, TRIAL_ASSETS } from '../constants/trialData';

const EMAIL_REGEX = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
const PHONE_REGEX = /^[+0-9\s\-()]{8,20}$/;
const CHECK_DUPLICATE_ENDPOINT = "https://legacy.staymedia.ng/wp-json/staymedia/v1/check-duplicate";

export default function QuoteModal({ isOpen, onClose, onSuccess, onOpenLegal, isDark = false }) {
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
    paidPlan: 'Yes',
    marketingConsent: false
  });

  const [formStatus, setFormStatus] = useState('idle');
  const [errors, setErrors] = useState({});
  const [validationAlert, setValidationAlert] = useState('');
  const [checkingField, setCheckingField] = useState({ email: false, businessName: false, phone: false });

  const toggleChallenge = (item) => {
    setFormData(prev => ({
      ...prev,
      biggestChallenges: prev.biggestChallenges.includes(item)
        ? prev.biggestChallenges.filter(c => c !== item)
        : [...prev.biggestChallenges, item]
    }));
  };

  const validateLocalField = (field, value) => {
    let error = '';
    const trimmed = (value || '').trim();

    if (field === 'fullName') {
      if (!trimmed) error = 'Full name is required';
      else if (trimmed.length < 2) error = 'Please enter your complete name';
    } else if (field === 'businessName') {
      if (!trimmed) error = 'Business name is required';
      else if (trimmed.length < 2) error = 'Please enter your full business name';
    } else if (field === 'phone') {
      if (!trimmed) error = 'Phone / WhatsApp is required';
      else if (!PHONE_REGEX.test(trimmed)) error = 'Please enter a valid phone number (min 8 digits)';
    } else if (field === 'email') {
      if (!trimmed) error = 'Corporate or work email is required';
      else if (!EMAIL_REGEX.test(trimmed)) error = 'Please enter a valid email address (e.g. name@company.com)';
    }

    return error;
  };

  // LIVE PRE-FLIGHT ASYNC DEDUPLICATION CHECK ON BLUR
  const checkLiveDuplicate = async (field, value) => {
    const trimmed = (value || '').trim();
    if (!trimmed) return;

    if (field === 'email' && !EMAIL_REGEX.test(trimmed)) return;
    if (field === 'phone' && !PHONE_REGEX.test(trimmed)) return;
    if (field === 'businessName' && trimmed.length < 2) return;

    setCheckingField(prev => ({ ...prev, [field]: true }));

    try {
      const res = await fetch(CHECK_DUPLICATE_ENDPOINT, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ field, value: trimmed })
      });
      const data = await res.json().catch(() => ({}));

      if (data && data.exists === true) {
        setErrors(prev => ({ ...prev, [field]: data.message }));
      } else {
        setErrors(prev => {
          const next = { ...prev };
          if (next[field] === 'Email has already been used' || next[field] === 'Business already applied' || next[field] === 'Existing number add a new one') {
            delete next[field];
          }
          return next;
        });
      }
    } catch (err) {
      // Fail silently on network errors so user is never blocked
    } finally {
      setCheckingField(prev => ({ ...prev, [field]: false }));
    }
  };

  // INSTANT ERROR CLEARANCE ON KEYSTROKE
  const handleFieldChange = (field, value) => {
    setFormData(prev => ({ ...prev, [field]: value }));
    const localErr = validateLocalField(field, value);

    setErrors(prev => {
      const next = { ...prev };
      if (localErr) {
        next[field] = localErr;
      } else {
        // Purge error immediately as soon as local validation passes
        delete next[field];
      }
      return next;
    });

    if (validationAlert) setValidationAlert('');
  };

  const handleFieldBlur = (field) => {
    const val = formData[field];
    const localErr = validateLocalField(field, val);
    if (!localErr && (field === 'email' || field === 'businessName' || field === 'phone')) {
      checkLiveDuplicate(field, val);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const newErrors = {};
    ['fullName', 'businessName', 'phone', 'email'].forEach(f => {
      const err = validateLocalField(f, formData[f]);
      if (err) newErrors[f] = err;
    });

    const mergedErrors = { ...errors, ...newErrors };

    if (Object.keys(mergedErrors).length > 0) {
      setErrors(mergedErrors);
      setValidationAlert('Please correct the highlighted fields before submitting your application.');
      const scrollable = document.getElementById('modal-scroll-container');
      if (scrollable) scrollable.scrollTo({ top: 0, behavior: 'smooth' });
      return;
    }

    setErrors({});
    setValidationAlert('');
    setFormStatus('submitting');

    const consentValue = formData.marketingConsent ? 'YES' : 'NO';

    const payload = {
      fullName: formData.fullName.trim(),
      businessName: formData.businessName.trim(),
      email: formData.email.trim(),
      phoneNumber: formData.phone.trim(),
      website: formData.website.trim(),
      socialHandle: formData.socialHandle.trim(),
      industry: formData.industry.trim(),
      businessStage: formData.businessStage,
      biggestChallenges: formData.biggestChallenges,
      serviceInterested: formData.serviceInterested,
      whyInterested: formData.whyInterested,
      paidPlan: formData.paidPlan,
      marketingConsent: consentValue,
      supportLookingFor: '7-Day Free Trial Sprint Application',
      helpText: `Company: ${formData.businessName}\nWebsite: ${formData.website}\nSocial: ${formData.socialHandle}\nIndustry: ${formData.industry}\nStage: ${formData.businessStage}\nChallenges: ${formData.biggestChallenges.join(', ')}\nService: ${formData.serviceInterested}\nWhy Interested: ${formData.whyInterested}\nConsider Partner: ${formData.paidPlan}\nMarketing Consent: ${consentValue}`,
      target_email: 'growth@staymedia.ng',
      submitted_at: new Date().toISOString()
    };

    try {
      const response = await fetch(TRIAL_SERVICE_DATA.wpAuditEndpoint, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload)
      });

      const resData = await response.json().catch(() => ({}));

      if (response.ok && (resData.success || resData.post_id)) {
        setFormStatus('idle');
        if (onSuccess) onSuccess();
        if (onClose) onClose();
      } else {
        setFormStatus('idle');
        const userFriendlyMsg = resData.message || 'Unable to submit trial application. Please check your details and try again.';
        setValidationAlert(userFriendlyMsg);
        const scrollable = document.getElementById('modal-scroll-container');
        if (scrollable) scrollable.scrollTo({ top: 0, behavior: 'smooth' });
      }
    } catch (err) {
      setFormStatus('idle');
      setValidationAlert('Network connection error. Please verify your internet connection or apply via WhatsApp.');
      const scrollable = document.getElementById('modal-scroll-container');
      if (scrollable) scrollable.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  const reviews = TRIAL_SERVICE_DATA?.googleReviews || [];
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
            transition={{ type: 'spring', stiffness: 450, damping: 25 }}
            className={`relative w-full max-w-[960px] max-h-[92dvh] overflow-y-auto rounded-[24px] border shadow-2xl z-10 grid grid-cols-1 min-[741px]:grid-cols-12 text-left ${
              isDark ? 'bg-[#0C150F] border-white/15 text-white' : 'bg-[#F4FBF2] border-[#E5E7EB] text-[#111827]'
            }`}
          >
            <button
              onClick={onClose}
              className={`absolute top-4 right-4 p-1.5 rounded-full z-20 cursor-pointer transition-colors ${
                isDark ? 'text-white/70 hover:text-white hover:bg-white/10' : 'text-black/50 hover:text-black hover:bg-black/5'
              }`}
              aria-label="Close modal"
            >
              <X className="w-5 h-5" />
            </button>
            <div className="min-[741px]:hidden col-span-1 p-5 pb-0">
              <div className={`flex items-center border-b w-full ${isDark ? 'border-white/10' : 'border-[#0EA34A]/20'}`}>
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

            <div className={`min-[741px]:col-span-5 p-6 sm:p-7 border-b min-[741px]:border-b-0 min-[741px]:border-r flex flex-col justify-between space-y-6 ${
              isDark ? 'bg-[#0B2215] border-white/10 text-white' : 'bg-[#E8F7ED] border-[#0EA34A]/20 text-[#111827]'
            } ${activePanel === 'reviews' ? 'block' : 'hidden min-[741px]:flex'}`}>
              <div className="space-y-4">
                <div className="w-9 h-9 rounded-[10px] overflow-hidden border border-black/10 dark:border-white/15 bg-white shadow-sm flex items-center justify-center flex-shrink-0 p-0.5">
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
                  <span className={`text-[10px] font-display font-bold uppercase ${isDark ? 'text-white/60' : 'text-[#111827]/70'}`}>
                    Verified Google Reviews
                  </span>
                </div>

                <p className={`text-xs leading-relaxed italic font-normal min-h-[110px] font-body ${
                  isDark ? 'text-white/80' : 'text-[#111827]/85'
                }`}>
                  "{currentReview.quote}"
                </p>

                <div>
                  <div className={`font-display font-bold text-xs ${isDark ? 'text-white' : 'text-[#111827]'}`}>
                    {currentReview.author}
                  </div>
                  <div className={`text-[10px] ${isDark ? 'text-white/50' : 'text-[#111827]/60'}`}>
                    {currentReview.role}
                  </div>
                </div>

                <div className="flex items-center space-x-2 pt-2">
                  {reviews.map((_, dotIdx) => (
                    <button
                      key={dotIdx}
                      type="button"
                      onClick={() => setActiveReviewIdx(dotIdx)}
                      className={`h-2 rounded-full transition-all cursor-pointer ${
                        activeReviewIdx === dotIdx
                          ? 'w-6 bg-[#0EA34A]'
                          : isDark ? 'w-2 bg-white/20 hover:bg-white/40' : 'w-2 bg-black/20 hover:bg-black/40'
                      }`}
                      aria-label={`Go to review ${dotIdx + 1}`}
                    />
                  ))}
                </div>
              </div>

              <div className={`pt-4 border-t space-y-2 text-[10.5px] font-display font-medium ${
                isDark ? 'border-white/10 text-white/70' : 'border-[#0EA34A]/20 text-[#111827]/80'
              }`}>
                <div className="flex items-center space-x-2"><ShieldCheck className="w-3.5 h-3.5 text-[#0EA34A]" /><span>NDA Protected</span></div>
                <div className="flex items-center space-x-2"><Award className="w-3.5 h-3.5 text-[#F5B800]" /><span>Awarded Agency</span></div>
                <div className="flex items-center space-x-2"><Clock className="w-3.5 h-3.5 text-[#2563EB]" /><span>Verified Deliverables</span></div>
              </div>
            </div>

            <div className={`min-[741px]:col-span-7 p-6 sm:p-8 space-y-4 ${
              isDark ? 'bg-[#0C150F] text-white' : 'bg-[#F4FBF2] text-[#111827]'
            } ${activePanel === 'form' ? 'block' : 'hidden min-[741px]:block'}`}>
              <div className="space-y-1">
                <h3 className={`font-display font-black text-xl ${isDark ? 'text-white' : 'text-[#111827]'}`}>
                  Claim Your 7-Day Free Trial
                </h3>
                <p className={`text-xs ${isDark ? 'text-white/60' : 'text-[#111827]/70'}`}>
                  Complete the application below to initiate your 7-day growth sprint.
                </p>
              </div>

              {validationAlert && (
                <motion.div
                  initial={{ opacity: 0, y: -8 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="p-3.5 rounded-[10px] bg-red-500/15 border border-red-500/30 text-red-600 dark:text-red-400 text-xs flex items-start space-x-2.5"
                >
                  <AlertCircle className="w-4 h-4 text-red-500 flex-shrink-0 mt-0.5" />
                  <span className="font-semibold leading-relaxed">{validationAlert}</span>
                </motion.div>
              )}

              <form onSubmit={handleSubmit} noValidate className="space-y-3">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <div>
                    <label className={`block text-[10.5px] font-bold mb-1 ${isDark ? 'text-white/90' : 'text-[#111827]'}`}>Full Name *</label>
                    <input
                      type="text"
                      placeholder="Samuel Adeleke"
                      value={formData.fullName}
                      onChange={(e) => handleFieldChange('fullName', e.target.value)}
                      onBlur={() => handleFieldBlur('fullName')}
                      className={`w-full px-3 py-2 rounded-[6px] text-xs focus:outline-none transition-colors ${
                        errors.fullName
                          ? 'bg-red-500/10 border-2 border-red-500'
                          : isDark
                          ? 'bg-[#06170E] border border-white/15 text-white focus:border-[#0EA34A]'
                          : 'bg-white border border-[#E5E7EB] text-[#111827] focus:border-[#0EA34A]'
                      }`}
                    />
                    {errors.fullName && <p className="text-[10px] text-red-500 mt-1 font-semibold">{errors.fullName}</p>}
                  </div>

                  <div>
                    <label className={`block text-[10.5px] font-bold mb-1 ${isDark ? 'text-white/90' : 'text-[#111827]'}`}>Business Name *</label>
                    <input
                      type="text"
                      placeholder="Company name"
                      value={formData.businessName}
                      onChange={(e) => handleFieldChange('businessName', e.target.value)}
                      onBlur={() => handleFieldBlur('businessName')}
                      className={`w-full px-3 py-2 rounded-[6px] text-xs focus:outline-none transition-colors ${
                        errors.businessName
                          ? 'bg-red-500/10 border-2 border-red-500'
                          : isDark
                          ? 'bg-[#06170E] border border-white/15 text-white focus:border-[#0EA34A]'
                          : 'bg-white border border-[#E5E7EB] text-[#111827] focus:border-[#0EA34A]'
                      }`}
                    />
                    {errors.businessName && <p className="text-[10px] text-red-500 mt-1 font-semibold">{errors.businessName}</p>}
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <div>
                    <label className={`block text-[10.5px] font-bold mb-1 ${isDark ? 'text-white/90' : 'text-[#111827]'}`}>Phone / WhatsApp *</label>
                    <input
                      type="tel"
                      placeholder="+234..."
                      value={formData.phone}
                      onChange={(e) => handleFieldChange('phone', e.target.value)}
                      onBlur={() => handleFieldBlur('phone')}
                      className={`w-full px-3 py-2 rounded-[6px] text-xs focus:outline-none transition-colors ${
                        errors.phone
                          ? 'bg-red-500/10 border-2 border-red-500'
                          : isDark
                          ? 'bg-[#06170E] border border-white/15 text-white focus:border-[#0EA34A]'
                          : 'bg-white border border-[#E5E7EB] text-[#111827] focus:border-[#0EA34A]'
                      }`}
                    />
                    {errors.phone && <p className="text-[10px] text-red-500 mt-1 font-semibold">{errors.phone}</p>}
                  </div>

                  <div>
                    <label className={`block text-[10.5px] font-bold mb-1 ${isDark ? 'text-white/90' : 'text-[#111827]'}`}>Email Address *</label>
                    <input
                      type="email"
                      placeholder="name@company.com"
                      value={formData.email}
                      onChange={(e) => handleFieldChange('email', e.target.value)}
                      onBlur={() => handleFieldBlur('email')}
                      className={`w-full px-3 py-2 rounded-[6px] text-xs focus:outline-none transition-colors ${
                        errors.email
                          ? 'bg-red-500/10 border-2 border-red-500'
                          : isDark
                          ? 'bg-[#06170E] border border-white/15 text-white focus:border-[#0EA34A]'
                          : 'bg-white border border-[#E5E7EB] text-[#111827] focus:border-[#0EA34A]'
                      }`}
                    />
                    {errors.email && <p className="text-[10px] text-red-500 mt-1 font-semibold">{errors.email}</p>}
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <div>
                    <label className={`block text-[10.5px] font-bold mb-1 ${isDark ? 'text-white/90' : 'text-[#111827]'}`}>Website URL</label>
                    <input
                      type="text"
                      placeholder="https://..."
                      value={formData.website}
                      onChange={(e) => handleFieldChange('website', e.target.value)}
                      className={`w-full px-3 py-2 rounded-[6px] text-xs focus:outline-none ${
                        isDark ? 'bg-[#06170E] border border-white/15 text-white' : 'bg-white border border-[#E5E7EB] text-[#111827]'
                      }`}
                    />
                  </div>
                  <div>
                    <label className={`block text-[10.5px] font-bold mb-1 ${isDark ? 'text-white/90' : 'text-[#111827]'}`}>Social Handle</label>
                    <input
                      type="text"
                      placeholder="Instagram / LinkedIn / X"
                      value={formData.socialHandle}
                      onChange={(e) => handleFieldChange('socialHandle', e.target.value)}
                      className={`w-full px-3 py-2 rounded-[6px] text-xs focus:outline-none ${
                        isDark ? 'bg-[#06170E] border border-white/15 text-white' : 'bg-white border border-[#E5E7EB] text-[#111827]'
                      }`}
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <div>
                    <label className={`block text-[10.5px] font-bold mb-1 ${isDark ? 'text-white/90' : 'text-[#111827]'}`}>Business Industry</label>
                    <input
                      type="text"
                      placeholder="e.g. Retail, Real Estate"
                      value={formData.industry}
                      onChange={(e) => handleFieldChange('industry', e.target.value)}
                      className={`w-full px-3 py-2 rounded-[6px] text-xs focus:outline-none ${
                        isDark ? 'bg-[#06170E] border border-white/15 text-white' : 'bg-white border border-[#E5E7EB] text-[#111827]'
                      }`}
                    />
                  </div>
                  <div>
                    <label className={`block text-[10.5px] font-bold mb-1 ${isDark ? 'text-white/90' : 'text-[#111827]'}`}>Business Stage *</label>
                    <select
                      value={formData.businessStage}
                      onChange={(e) => handleFieldChange('businessStage', e.target.value)}
                      className={`w-full px-3 py-2 rounded-[6px] text-xs focus:outline-none ${
                        isDark ? 'bg-[#06170E] border border-white/15 text-white' : 'bg-white border border-[#E5E7EB] text-[#111827]'
                      }`}
                    >
                      {TRIAL_SERVICE_DATA.formOptions.businessStages.map(s => <option key={s} value={s}>{s}</option>)}
                    </select>
                  </div>
                </div>

                <div>
                  <label className={`block text-[10.5px] font-bold mb-1 ${isDark ? 'text-white/90' : 'text-[#111827]'}`}>Biggest Challenge</label>
                  <div className="flex overflow-x-auto scrollbar-thin scrollbar-thumb-gray-300 gap-1.5 py-1" style={{ touchAction: 'pan-x pan-y' }}>
                    {TRIAL_SERVICE_DATA.formOptions.biggestChallenges.map(item => {
                      const isSelected = formData.biggestChallenges.includes(item);
                      return (
                        <button
                          key={item}
                          type="button"
                          onClick={() => toggleChallenge(item)}
                          className={`px-3 py-1.5 rounded-full text-[10.5px] font-display font-bold transition-all whitespace-nowrap cursor-pointer flex-shrink-0 ${
                            isSelected
                              ? 'bg-[#0EA34A] text-white shadow-sm'
                              : isDark ? 'bg-white/5 text-white/80 hover:bg-white/10' : 'bg-white border border-[#E5E7EB] text-black/75 hover:bg-gray-100'
                          }`}
                        >
                          {isSelected ? `✓ ${item}` : `+ ${item}`}
                        </button>
                      );
                    })}
                  </div>
                </div>

                <div>
                  <label className={`block text-[10.5px] font-bold mb-1 ${isDark ? 'text-white/90' : 'text-[#111827]'}`}>Service you would like to try *</label>
                  <select
                    value={formData.serviceInterested}
                    onChange={(e) => handleFieldChange('serviceInterested', e.target.value)}
                    className={`w-full px-3 py-2 rounded-[6px] text-xs focus:outline-none ${
                      isDark ? 'bg-[#06170E] border border-white/15 text-white' : 'bg-white border border-[#E5E7EB] text-[#111827]'
                    }`}
                  >
                    {TRIAL_SERVICE_DATA.formOptions.trialServices.map(s => <option key={s} value={s}>{s}</option>)}
                  </select>
                </div>

                <div>
                  <label className={`block text-[10.5px] font-bold mb-1 ${isDark ? 'text-white/90' : 'text-[#111827]'}`}>Why are you interested in the free trial right now? *</label>
                  <select
                    value={formData.whyInterested}
                    onChange={(e) => handleFieldChange('whyInterested', e.target.value)}
                    className={`w-full px-3 py-2 rounded-[6px] text-xs focus:outline-none ${
                      isDark ? 'bg-[#06170E] border border-white/15 text-white' : 'bg-white border border-[#E5E7EB] text-[#111827]'
                    }`}
                  >
                    {TRIAL_SERVICE_DATA.formOptions.whyInterested.map(s => <option key={s} value={s}>{s}</option>)}
                  </select>
                </div>

                <div>
                  <label className={`block text-[10.5px] font-bold mb-1 ${isDark ? 'text-white/90' : 'text-[#111827]'}`}>
                    If the trial delivers value, would you consider STAY MEDIA as your partner? *
                  </label>
                  <select
                    value={formData.paidPlan}
                    onChange={(e) => handleFieldChange('paidPlan', e.target.value)}
                    className={`w-full px-3 py-2 rounded-[6px] text-xs focus:outline-none ${
                      isDark ? 'bg-[#06170E] border border-white/15 text-white' : 'bg-white border border-[#E5E7EB] text-[#111827]'
                    }`}
                  >
                    {TRIAL_SERVICE_DATA.formOptions.paidPlan.map(s => <option key={s} value={s}>{s}</option>)}
                  </select>
                </div>

                <div className="pt-1">
                  <label className="flex items-start space-x-2.5 cursor-pointer select-none">
                    <input
                      type="checkbox"
                      checked={formData.marketingConsent}
                      onChange={(e) => handleFieldChange('marketingConsent', e.target.checked)}
                      className="mt-0.5 rounded border-gray-300 text-[#0EA34A] focus:ring-[#0EA34A]"
                    />
                    <span className={`text-[10.5px] leading-snug ${isDark ? 'text-white/80' : 'text-[#111827]/80'}`}>
                      I grant STAY MEDIA authorization to evaluate my commercial infrastructure and contact me as a prospective digital growth partner.
                    </span>
                  </label>
                </div>

                <div className={`text-[10px] leading-tight pt-1 ${isDark ? 'text-white/60' : 'text-[#111827]/70'}`}>
                  By submitting this application, you agree to our{" "}
                  <button
                    type="button"
                    onClick={() => onOpenLegal && onOpenLegal('terms')}
                    className="text-[#0EA34A] underline font-semibold hover:text-[#0C8F40] cursor-pointer"
                  >
                    Trial Terms
                  </button>{" "}
                  and{" "}
                  <button
                    type="button"
                    onClick={() => onOpenLegal && onOpenLegal('privacy')}
                    className="text-[#0EA34A] underline font-semibold hover:text-[#0C8F40] cursor-pointer"
                  >
                    Privacy Policy
                  </button>.
                </div>

                <div className="pt-2">
                  <button
                    type="submit"
                    disabled={formStatus !== 'idle'}
                    className="w-full py-3.5 rounded-[8px] bg-[#0EA34A] hover:bg-[#0C8F40] text-white font-display font-bold text-xs uppercase tracking-wider transition-colors flex items-center justify-center space-x-2 cursor-pointer shadow-lg disabled:opacity-75"
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

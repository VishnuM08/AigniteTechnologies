import React, { useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import { Check, Send, Sparkles, Clock, Calculator, ShieldCheck } from "lucide-react";
import { playSound } from "./SoundToggle";

interface PlatformOption {
  id: string;
  name: string;
  baseCost: number;
  baseWeeks: number;
  icon: string;
}

interface FeatureOption {
  id: string;
  name: string;
  cost: number;
  weeks: number;
  description: string;
}

const PLATFORMS: PlatformOption[] = [
  { id: "mobile", name: "Mobile App (iOS/Android)", baseCost: 6500, baseWeeks: 6, icon: "📱" },
  { id: "web", name: "Web Application", baseCost: 5000, baseWeeks: 4, icon: "💻" },
  { id: "ai", name: "AI/LLM Integration", baseCost: 4500, baseWeeks: 4, icon: "🧠" },
  { id: "prototype", name: "UI/UX Interactive Prototype", baseCost: 2000, baseWeeks: 2, icon: "🎨" },
];

const FEATURES: FeatureOption[] = [
  { id: "auth", name: "User Accounts & Profiles", cost: 1200, weeks: 1, description: "Secure signup, social login, and user management" },
  { id: "payments", name: "Stripe & Subscriptions", cost: 1500, weeks: 1.5, description: "Credit cards, Apple Pay, invoices, and billing portal" },
  { id: "chat", name: "Real-time Chat / Messaging", cost: 2000, weeks: 2, description: "Instant messaging, push notifications, and channels" },
  { id: "admin", name: "Admin Control Dashboard", cost: 1800, weeks: 1.5, description: "Track user metrics, moderate content, and view analytics" },
  { id: "multi", name: "Multi-language Support", cost: 1000, weeks: 1, description: "Localization and translation architecture" },
  { id: "offline", name: "Offline Sync Mode", cost: 2500, weeks: 2.5, description: "Offline database access and automatic cloud sync" },
];

export function ProjectEstimator() {
  const [selectedPlatform, setSelectedPlatform] = useState<string>("web");
  const [selectedFeatures, setSelectedFeatures] = useState<string[]>(["auth"]);
  const [timelineSpeed, setTimelineSpeed] = useState<"standard" | "rushed">("standard");
  
  // Lead Capture State
  const [clientName, setClientName] = useState("");
  const [clientEmail, setClientEmail] = useState("");
  const [clientDetails, setClientDetails] = useState("");
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Sound feedback wrappers
  const handlePlatformSelect = (id: string) => {
    playSound("click");
    setSelectedPlatform(id);
  };

  const handleFeatureToggle = (id: string) => {
    playSound("click");
    setSelectedFeatures((prev) =>
      prev.includes(id) ? prev.filter((item) => item !== id) : [...prev, id]
    );
  };

  const handleSpeedToggle = (speed: "standard" | "rushed") => {
    playSound("click");
    setTimelineSpeed(speed);
  };

  // Calculations
  const activePlatform = PLATFORMS.find((p) => p.id === selectedPlatform) || PLATFORMS[1];
  
  const featuresCost = selectedFeatures.reduce((acc, featId) => {
    const feat = FEATURES.find((f) => f.id === featId);
    return acc + (feat ? feat.cost : 0);
  }, 0);

  const featuresWeeks = selectedFeatures.reduce((acc, featId) => {
    const feat = FEATURES.find((f) => f.id === featId);
    return acc + (feat ? feat.weeks : 0);
  }, 0);

  let rawCost = activePlatform.baseCost + featuresCost;
  let rawWeeks = activePlatform.baseWeeks + featuresWeeks;

  if (timelineSpeed === "rushed") {
    rawCost *= 1.25; // 25% rush premium
    rawWeeks *= 0.7; // 30% faster delivery
  }

  const minCost = Math.round(rawCost * 0.9);
  const maxCost = Math.round(rawCost * 1.1);
  const minWeeks = Math.max(1, Math.round(rawWeeks * 0.9));
  const maxWeeks = Math.round(rawWeeks * 1.1);

  // Form Submit Handler
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!clientName || !clientEmail) return;

    playSound("success");
    setIsSubmitting(true);

    // Simulate API request
    setTimeout(() => {
      setIsSubmitting(false);
      setIsSubmitted(true);
    }, 1500);
  };

  return (
    <div className="w-full max-w-4xl mx-auto mt-12 bg-white dark:bg-[#1a1a1a] rounded-3xl border border-[#d2d2d7]/30 dark:border-[#2a2a2a] shadow-xl overflow-hidden backdrop-blur-md">
      <div className="grid grid-cols-1 lg:grid-cols-12">
        
        {/* Left Side: Configurator */}
        <div className="p-6 md:p-8 lg:col-span-7 border-r border-[#d2d2d7]/30 dark:border-[#2a2a2a]">
          <div className="flex items-center gap-2 mb-6">
            <Sparkles className="text-[#0071e3]" size={18} />
            <h3 className="text-sm font-semibold tracking-wider uppercase text-[#0071e3]">
              Project Estimator
            </h3>
          </div>

          <h4 className="text-xl font-bold mb-6 text-[#1a1a1a] dark:text-white">
            Configure Your Project Scope
          </h4>

          {/* Step 1: Platforms */}
          <div className="mb-8">
            <label className="block text-xs font-bold uppercase tracking-wider text-[#86868b] mb-3">
              1. Choose Platform
            </label>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {PLATFORMS.map((platform) => (
                <button
                  key={platform.id}
                  type="button"
                  onClick={() => handlePlatformSelect(platform.id)}
                  className={`flex items-center gap-3 p-4 rounded-2xl text-left border transition-all cursor-pointer ${
                    selectedPlatform === platform.id
                      ? "border-[#0071e3] bg-[#0071e3]/5 dark:bg-[#0071e3]/10 text-[#0071e3] font-medium"
                      : "border-[#d2d2d7]/50 dark:border-[#2a2a2a] hover:bg-[#f5f5f7] dark:hover:bg-[#2a2a2a] text-[#1a1a1a] dark:text-white"
                  }`}
                >
                  <span className="text-2xl">{platform.icon}</span>
                  <div>
                    <div className="text-sm font-semibold leading-snug">{platform.name}</div>
                    <div className="text-xs text-[#86868b]">Base: ~{platform.baseWeeks}wks</div>
                  </div>
                </button>
              ))}
            </div>
          </div>

          {/* Step 2: Features */}
          <div className="mb-8">
            <label className="block text-xs font-bold uppercase tracking-wider text-[#86868b] mb-3">
              2. Add Features
            </label>
            <div className="space-y-2.5">
              {FEATURES.map((feature) => {
                const isChecked = selectedFeatures.includes(feature.id);
                return (
                  <button
                    key={feature.id}
                    type="button"
                    onClick={() => handleFeatureToggle(feature.id)}
                    className={`w-full flex items-start gap-3 p-3.5 rounded-2xl text-left border transition-all cursor-pointer ${
                      isChecked
                        ? "border-[#0071e3] bg-[#0071e3]/5 dark:bg-[#0071e3]/10 text-[#1a1a1a] dark:text-white"
                        : "border-[#d2d2d7]/50 dark:border-[#2a2a2a] hover:bg-[#f5f5f7] dark:hover:bg-[#2a2a2a] text-[#1a1a1a] dark:text-white"
                    }`}
                  >
                    <div className={`mt-0.5 w-5 h-5 rounded-md flex items-center justify-center border transition-all ${
                      isChecked ? "bg-[#0071e3] border-[#0071e3]" : "border-[#d2d2d7] dark:border-[#2a2a2a]"
                    }`}>
                      {isChecked && <Check size={12} className="text-white" strokeWidth={3} />}
                    </div>
                    <div className="flex-1">
                      <div className="flex justify-between items-baseline mb-0.5">
                        <span className="text-sm font-semibold leading-none">{feature.name}</span>
                        <span className="text-xs font-bold text-[#86868b]">+~{feature.weeks}w</span>
                      </div>
                      <p className="text-xs text-[#86868b]">{feature.description}</p>
                    </div>
                  </button>
                );
              })}
            </div>
          </div>

          {/* Step 3: Speed option */}
          <div>
            <label className="block text-xs font-bold uppercase tracking-wider text-[#86868b] mb-3">
              3. Delivery Speed
            </label>
            <div className="flex gap-3">
              <button
                type="button"
                onClick={() => handleSpeedToggle("standard")}
                className={`flex-1 py-3 px-4 rounded-xl border text-sm font-semibold text-center cursor-pointer transition-all ${
                  timelineSpeed === "standard"
                    ? "border-[#0071e3] bg-[#0071e3]/5 text-[#0071e3]"
                    : "border-[#d2d2d7]/50 dark:border-[#2a2a2a] text-[#86868b] hover:bg-[#f5f5f7] dark:hover:bg-[#2a2a2a]"
                }`}
              >
                🚴 Standard Timeline
              </button>
              <button
                type="button"
                onClick={() => handleSpeedToggle("rushed")}
                className={`flex-1 py-3 px-4 rounded-xl border text-sm font-semibold text-center cursor-pointer transition-all ${
                  timelineSpeed === "rushed"
                    ? "border-[#0071e3] bg-[#0071e3]/5 text-[#0071e3]"
                    : "border-[#d2d2d7]/50 dark:border-[#2a2a2a] text-[#86868b] hover:bg-[#f5f5f7] dark:hover:bg-[#2a2a2a]"
                }`}
              >
                ⚡ Rushed Delivery (+25%)
              </button>
            </div>
          </div>
        </div>

        {/* Right Side: Quote Summary & Lead Form */}
        <div className="p-6 md:p-8 lg:col-span-5 bg-[#f5f5f7] dark:bg-[#1f1f23] flex flex-col justify-between">
          <div>
            <div className="flex items-center gap-2 mb-6">
              <Calculator className="text-[#86868b]" size={16} />
              <h4 className="text-xs font-bold uppercase tracking-wider text-[#86868b]">
                Estimation Output
              </h4>
            </div>

            {/* Price Box */}
            <div className="mb-6 p-5 rounded-2xl bg-white dark:bg-[#1a1a1a] border border-[#d2d2d7]/20 shadow-sm text-center">
              <div className="text-xs font-semibold text-[#86868b] mb-1">Estimated Project Cost</div>
              <div className="text-3xl font-extrabold tracking-tight text-[#1a1a1a] dark:text-white mb-2">
                ${minCost.toLocaleString()} - ${maxCost.toLocaleString()}
              </div>
              <div className="inline-flex items-center gap-1.5 px-3 py-1 bg-emerald-500/10 dark:bg-emerald-500/20 text-emerald-600 dark:text-emerald-400 rounded-full text-xs font-bold">
                <Clock size={12} />
                Est: {minWeeks} - {maxWeeks} weeks
              </div>
            </div>

            <div className="mb-6 space-y-3">
              <div className="flex justify-between items-center text-xs">
                <span className="text-[#86868b]">Architecture:</span>
                <span className="font-semibold text-[#1a1a1a] dark:text-white">Serverless / Scalable Cloud</span>
              </div>
              <div className="flex justify-between items-center text-xs">
                <span className="text-[#86868b]">Tech Stack Recommendation:</span>
                <span className="font-semibold text-[#0071e3] truncate max-w-[200px]">
                  {selectedPlatform === "mobile" ? "React Native + Supabase" : "Next.js + Node + Postgre"}
                </span>
              </div>
            </div>
          </div>

          {/* Lead capture Form */}
          <div className="border-t border-[#d2d2d7]/50 dark:border-[#2a2a2a]/50 pt-6">
            <AnimatePresence mode="wait">
              {!isSubmitted ? (
                <motion.form
                  key="lead-form"
                  onSubmit={handleSubmit}
                  className="space-y-3"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                >
                  <h5 className="text-xs font-bold text-[#1a1a1a] dark:text-white uppercase tracking-wider mb-2">
                    Send to My Inbox & Get Started
                  </h5>
                  
                  <input
                    type="text"
                    required
                    placeholder="Your Name"
                    value={clientName}
                    onChange={(e) => setClientName(e.target.value)}
                    className="w-full px-4 py-2.5 bg-white dark:bg-[#1a1a1a] text-sm text-[#1a1a1a] dark:text-white placeholder-[#86868b] border border-[#d2d2d7]/50 dark:border-[#2a2a2a] rounded-xl focus:outline-none focus:border-[#0071e3] transition-all"
                  />
                  
                  <input
                    type="email"
                    required
                    placeholder="Your Email Address"
                    value={clientEmail}
                    onChange={(e) => setClientEmail(e.target.value)}
                    className="w-full px-4 py-2.5 bg-white dark:bg-[#1a1a1a] text-sm text-[#1a1a1a] dark:text-white placeholder-[#86868b] border border-[#d2d2d7]/50 dark:border-[#2a2a2a] rounded-xl focus:outline-none focus:border-[#0071e3] transition-all"
                  />
                  
                  <textarea
                    rows={2}
                    placeholder="Describe your goals (optional)..."
                    value={clientDetails}
                    onChange={(e) => setClientDetails(e.target.value)}
                    className="w-full px-4 py-2.5 bg-white dark:bg-[#1a1a1a] text-sm text-[#1a1a1a] dark:text-white placeholder-[#86868b] border border-[#d2d2d7]/50 dark:border-[#2a2a2a] rounded-xl focus:outline-none focus:border-[#0071e3] transition-all resize-none"
                  />

                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="w-full flex items-center justify-center gap-2 py-3 bg-[#0071e3] hover:bg-[#0077ed] disabled:bg-gray-400 text-white text-sm font-bold rounded-xl transition-all shadow-md shadow-[#0071e3]/10 cursor-pointer active:scale-[0.98]"
                  >
                    {isSubmitting ? (
                      <span>Sending estimate...</span>
                    ) : (
                      <>
                        <Send size={14} />
                        Request Detailed Proposal
                      </>
                    )}
                  </button>
                </motion.form>
              ) : (
                <motion.div
                  key="success-screen"
                  className="text-center py-6 space-y-3"
                  initial={{ scale: 0.9, opacity: 0 }}
                  animate={{ scale: 1, opacity: 1 }}
                >
                  <div className="w-12 h-12 bg-emerald-500/10 dark:bg-emerald-500/20 text-emerald-500 rounded-full flex items-center justify-center mx-auto">
                    <ShieldCheck size={24} />
                  </div>
                  <h5 className="font-bold text-[#1a1a1a] dark:text-white text-sm">
                    Estimate Sent!
                  </h5>
                  <p className="text-xs text-[#86868b] leading-normal px-2">
                    Thanks {clientName}. We've sent a summary to <strong>{clientEmail}</strong> and will reach out with a direct calendar invite.
                  </p>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </div>

      </div>
    </div>
  );
}
export default ProjectEstimator;

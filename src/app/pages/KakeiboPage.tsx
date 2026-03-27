import React from "react";
import { motion, AnimatePresence } from "motion/react";
import {
  ArrowLeft,
  ExternalLink,
  Download,
  TrendingUp,
  PieChart,
  Target,
  Shield,
  Zap,
  Smartphone,
  BarChart3,
  Calendar as CalendarIcon,
  Lock,
  CloudLightning,
  SmartphoneNfc,
  CheckCircle2,
  Clock,
  ArrowRight,
  MousePointer2,
  FileSpreadsheet,
  Bell,
  Fingerprint,
  Layers,
} from "lucide-react";
import { Link } from "react-router";
import { SEO } from "../components/SEO";

import { Variants } from "motion/react";

const fadeInUp: Variants = {
  hidden: { opacity: 0, y: 60 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.8, ease: [0.6, 0.05, 0.01, 0.9] },
  },
};

const staggerContainer: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.15,
    },
  },
};

export default function KakeiboPage() {
  const [demoStep, setDemoStep] = React.useState<"idle" | "receiving" | "approving" | "success">("idle");
  const [demoTransactions, setDemoTransactions] = React.useState<any[]>([]);

  const startDemo = () => {
    setDemoStep("receiving");
    setTimeout(() => {
      // Auto-trigger approved after simulation
    }, 3000);
  };

  const approveTransaction = () => {
    setDemoStep("approving");
    setTimeout(() => {
      setDemoTransactions([
        { id: Date.now(), title: "Starbucks Coffee", amount: "₹350", category: "Optional", time: "Just now" },
        ...demoTransactions
      ]);
      setDemoStep("success");
      setTimeout(() => setDemoStep("idle"), 3000);
    }, 800);
  };

  const mainPillars = [
    {
      icon: <Zap size={32} />,
      title: "Smart Automation",
      subtitle: "SMS Transaction Detection",
      description: "Stop typing, start tapping. Kakeibo automatically parses bank SMS (SBI, HDFC, ICICI, etc.) to log transactions in seconds with your approval.",
      color: "from-blue-500 to-cyan-500",
    },
    {
      icon: <Target size={32} />,
      title: "Mindful Budgeting",
      subtitle: "The Kakeibo Philosophy",
      description: "Turn budgeting into a habit of mindfulness. Understand your relationship with money and make conscious financial decisions.",
      color: "from-emerald-500 to-teal-500",
    },
    {
      icon: <BarChart3 size={32} />,
      title: "Stunning Analytics",
      subtitle: "Insightful Analytics",
      description: "Deep-dive into your spending with beautiful interactive charts, monthly projections, and intensity-based calendar views.",
      color: "from-purple-500 to-pink-500",
    },
  ];

  const features = [
    {
      category: "Tracking",
      items: [
        { icon: <Smartphone size={20} />, title: "Manual Entry", desc: "Fast, intuitive form with category & receipt support." },
        { icon: <Zap size={20} />, title: "Quick Add", desc: "One-tap logging for your frequent daily expenses." },
        { icon: <MousePointer2 size={20} />, title: "Swipe Gestures", desc: "iOS-style swipe to edit or delete history instantly." },
      ]
    },
    {
      category: "Budgeting",
      items: [
        { icon: <Target size={20} />, title: "Monthly Limits", desc: "Set total budgets and track progress in real-time." },
        { icon: <Bell size={20} />, title: "Smart Warnings", desc: "Visual color shifts as you hit 80% of your limit." },
        { icon: <Layers size={20} />, title: "Category Breakdown", desc: "See exactly what is consuming your budget." },
      ]
    },
    {
      category: "Commitments",
      items: [
        { icon: <CalendarIcon size={20} />, title: "Recurring Expenses", desc: "Track subscriptions with monthly projections." },
        { icon: <Clock size={20} />, title: "Bill Reminders", desc: "Never miss a payment with automated alerts." },
        { icon: <TrendingUp size={20} />, title: "Savings Goals", desc: "Visual contribution bars for your big targets." },
      ]
    },
    {
      category: "Security",
      items: [
        { icon: <Lock size={20} />, title: "PIN & Biometric", desc: "Secure data with 4-digit PIN or fingerprint lock." },
        { icon: <CloudLightning size={20} />, title: "Offline-First", desc: "Zero-latency local storage with background sync." },
        { icon: <SmartphoneNfc size={20} />, title: "Multi-Device", desc: "Safe account sync powered by Aignite Backend." },
      ]
    }
  ];

  return (
    <div className="min-h-screen bg-white dark:bg-[#0a0a0a] transition-colors duration-300 selection:bg-[#0071e3]/30">
      <SEO
        title="Kakeibo | Mindful Expense Tracker"
        description="Master the art of mindful spending with Kakeibo. Automate tracking with SMS detection and visualize your goals with premium analytics."
        keywords="Kakeibo, expense tracker, SMS detection, mindful spending, Japanese budgeting, automated expenses"
      />

      {/* Hero Section */}
      <section className="relative px-6 pt-32 pb-20 md:pt-48 md:pb-32 overflow-hidden bg-gradient-to-b from-white to-[#fbfbfd] dark:from-[#0a0a0a] dark:to-[#111111]">
        {/* Ambient Decorative Blurs */}
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-7xl h-[500px] pointer-events-none opacity-20 dark:opacity-40 overflow-hidden">
          <div className="absolute top-[-10%] left-[20%] w-[400px] h-[400px] bg-[#0071e3] blur-[120px] rounded-full" />
          <div className="absolute top-[10%] right-[15%] w-[350px] h-[350px] bg-cyan-500 blur-[120px] rounded-full" />
        </div>

        <div className="max-w-6xl mx-auto relative z-10">
          <Link
            to="/"
            className="inline-flex items-center gap-2 mb-10 text-[#86868b] hover:text-[#0071e3] dark:hover:text-white transition-all group"
            style={{ fontSize: "0.9375rem", fontWeight: 500 }}
          >
            <ArrowLeft size={18} className="transition-transform group-hover:-translate-x-1" />
            Explore Aignite Products
          </Link>

          <motion.div
            initial="hidden"
            animate="visible"
            variants={staggerContainer}
            className="grid lg:grid-cols-2 gap-16 items-center"
          >
            <motion.div className="text-left" variants={fadeInUp}>
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-50 dark:bg-blue-500/10 border border-blue-100 dark:border-blue-500/20 text-[#0071e3] mb-8">
                <span className="relative flex h-2 w-2">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-blue-400 opacity-75"></span>
                  <span className="relative inline-flex rounded-full h-2 w-2 bg-blue-500"></span>
                </span>
                <span className="text-[0.75rem] font-bold tracking-wider uppercase">Production Launch</span>
              </div>

              <div className="flex items-center gap-6 mb-8">
                <img
                  src="/assets/Kakeibo/kakeibo_logo.png"
                  alt="Kakeibo Logo"
                  className="w-20 h-20 md:w-24 md:h-24 object-contain rounded-[2rem] shadow-2xl border border-white/50 dark:border-white/10"
                />
                <h1
                  className="text-[#1a1a1a] dark:text-white"
                  style={{
                    fontSize: "clamp(2.5rem, 8vw, 4.5rem)",
                    fontWeight: 700,
                    letterSpacing: "-0.03em",
                    lineHeight: 1,
                  }}
                >
                  Kakeibo
                </h1>
              </div>

              <h2
                className="mb-6 text-[#1a1a1a] dark:text-white font-bold leading-tight"
                style={{ fontSize: "clamp(1.75rem, 5vw, 3rem)" }}
              >
                Master the Art of <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#0071e3] to-cyan-400">Mindful Spending.</span>
              </h2>

              <p
                className="mb-10 text-[#86868b] dark:text-[#a1a1a6] max-w-xl"
                style={{ fontSize: "clamp(1.125rem, 2vw, 1.25rem)", lineHeight: 1.5 }}
              >
                Experience the art of mindful budgeting. Automate your tracking, visualize your goals, and secure your financial future with the most beautiful expense manager on the market.
              </p>

              <div className="flex flex-col sm:flex-row gap-5">
                <a
                  href="https://play.google.com/store/apps/details?id=com.aignite.kakeibo&pcampaignid=web_share"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center justify-center gap-3 px-8 py-4 bg-[#0071e3] text-white rounded-2xl transition-all hover:bg-[#0077ed] hover:shadow-xl hover:shadow-blue-500/20 active:scale-[0.98] group"
                >
                  <Download size={20} />
                  <span className="font-semibold text-lg">Get on Play Store</span>
                  <ArrowRight size={20} className="transition-all opacity-0 -translate-x-2 group-hover:opacity-10 group-hover:translate-x-0" />
                </a>
                <a
                  href="https://kakeibo.theaignite.app"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center justify-center gap-3 px-8 py-4 bg-white dark:bg-white/5 text-[#1a1a1a] dark:text-white border border-[#d2d2d7] dark:border-white/10 rounded-2xl transition-all hover:bg-black/5 dark:hover:bg-white/10 hover:border-[#1a1a1a] dark:hover:border-white active:scale-[0.98]"
                >
                  <ExternalLink size={20} />
                  <span className="font-semibold text-lg">Try Web App</span>
                </a>
              </div>
            </motion.div>

            <motion.div 
              className="relative p-4 md:p-8"
              variants={fadeInUp}
            >
              <div className="absolute inset-0 bg-gradient-to-br from-[#0071e3]/20 to-cyan-500/20 blur-[60px] rounded-full animate-pulse pointer-events-none" />
              <div className="relative rounded-[3rem] overflow-hidden shadow-[0_50px_100px_-20px_rgba(0,0,0,0.3)] border border-white/20">
                <img
                  src="/assets/Kakeibo/Kakeibo-FG.png"
                  alt="Kakeibo App View"
                  className="w-full h-auto object-cover"
                />
              </div>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* Interactive Experience - Suggestion 1 */}
      <section className="px-6 py-24 bg-[#fbfbfd] dark:bg-[#0d0d0d] overflow-hidden relative border-y border-[#d2d2d7]/30 dark:border-white/5">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-5xl font-bold text-[#1a1a1a] dark:text-white mb-6 tracking-tight">Experience the Magic.</h2>
            <p className="text-[#86868b] text-lg md:text-xl max-w-2xl mx-auto font-medium">
              See how Kakeibo transforms your banking SMS into clear, mindful entries instantly.
            </p>
          </div>

          <div className="flex flex-col lg:flex-row items-center gap-16">
            {/* Control Panel */}
            <div className="w-full lg:w-1/3 space-y-8">
              <div className="p-8 rounded-3xl bg-white dark:bg-white/5 border border-[#d2d2d7]/50 dark:border-white/10 shadow-sm relative overflow-hidden group">
                <div className="absolute inset-0 bg-gradient-to-br from-blue-500/5 to-cyan-500/5 opacity-0 group-hover:opacity-100 transition-opacity" />
                <h3 className="text-xl font-bold text-[#1a1a1a] dark:text-white mb-4 relative z-10">Try it yourself</h3>
                <p className="text-[#86868b] mb-8 font-medium relative z-10 leading-relaxed">Receive a simulated bank SMS and see the automation in action.</p>
                <button
                  onClick={startDemo}
                  disabled={demoStep !== 'idle'}
                  className="w-full py-5 bg-[#0071e3] text-white rounded-2xl font-bold text-lg transition-all hover:bg-[#0077ed] disabled:opacity-50 disabled:cursor-not-allowed shadow-lg shadow-blue-500/20 active:scale-[0.98] relative z-10"
                >
                  {demoStep === 'idle' ? 'Simulate Transaction SMS' : 'Demo in Progress...'}
                </button>
              </div>
              
              <div className="flex items-start gap-4 p-6 rounded-2xl bg-blue-50 dark:bg-blue-500/10 border border-blue-100 dark:border-blue-500/20">
                <div className="p-2 rounded-lg bg-blue-500 text-white">
                  <Shield size={20} />
                </div>
                <div>
                  <p className="text-blue-900 dark:text-blue-300 text-sm font-bold mb-1">Bank-Grade Privacy</p>
                  <p className="text-blue-700 dark:text-blue-400 text-xs font-bold leading-snug">Parsing happens 100% locally on your device. Your data never leaves your app.</p>
                </div>
              </div>
            </div>

            {/* Phone Mockup */}
            <div className="w-full lg:w-2/3 relative flex justify-center">
              <div className="w-[300px] h-[600px] md:w-[340px] md:h-[680px] bg-[#0a0a0a] rounded-[3.5rem] border-[10px] border-[#1a1a1a] relative overflow-hidden shadow-[0_50px_100px_-20px_rgba(0,0,0,0.5)] ring-1 ring-white/10">
                {/* iPhone Notch Style Status Bar */}
                <div className="absolute top-0 left-1/2 -translate-x-1/2 w-40 h-7 bg-[#1a1a1a] rounded-b-2xl z-40" />
                <div className="absolute top-0 w-full h-8 px-8 flex justify-between items-center z-30 text-white text-[10px] font-bold pt-2">
                  <span>9:41</span>
                  <div className="flex gap-1.5 items-center">
                    <Smartphone size={10} />
                    <div className="w-4 h-2 rounded-sm border border-white/30 relative">
                       <div className="absolute left-[1px] top-[1px] bottom-[1px] w-2 bg-emerald-500 rounded-[1px]" />
                    </div>
                  </div>
                </div>

                {/* App Content */}
                <div className="absolute inset-0 bg-white dark:bg-[#0a0a0a] pt-12 overflow-y-auto no-scrollbar">
                  <div className="p-6">
                    <div className="flex justify-between items-center mb-6">
                      <h4 className="text-xl font-bold dark:text-white">Live Insights</h4>
                      <BarChart3 size={20} className="text-[#0071e3]" />
                    </div>
                    
                    <div className="space-y-4">
                      {demoTransactions.length === 0 && (
                        <div className="py-20 text-center opacity-30">
                          <PieChart size={64} className="mx-auto mb-4 text-[#86868b]" />
                          <p className="text-sm font-bold uppercase tracking-widest text-[#86868b]">Feed is Empty</p>
                        </div>
                      )}
                      
                      <AnimatePresence mode="popLayout">
                        {demoTransactions.map(tx => (
                          <motion.div
                            key={tx.id}
                            initial={{ opacity: 0, scale: 0.9, y: 10 }}
                            animate={{ opacity: 1, scale: 1, y: 0 }}
                            className="flex items-center justify-between p-4 rounded-2xl bg-[#fbfbfd] dark:bg-white/5 border border-[#d2d2d7]/30 dark:border-white/5 group"
                          >
                            <div className="flex items-center gap-3">
                              <div className="w-10 h-10 rounded-full bg-emerald-500/10 flex items-center justify-center text-emerald-500">
                                <Zap size={18} />
                              </div>
                              <div>
                                <p className="font-bold text-sm dark:text-white leading-none mb-1">{tx.title}</p>
                                <p className="text-[10px] text-[#86868b] font-bold uppercase tracking-wider">{tx.category}</p>
                              </div>
                            </div>
                            <div className="text-right">
                              <p className="font-bold text-sm text-red-500 mb-1">{tx.amount}</p>
                              <p className="text-[9px] text-[#86868b] font-medium">{tx.time}</p>
                            </div>
                          </motion.div>
                        ))}
                      </AnimatePresence>

                      <div className="opacity-20 pointer-events-none space-y-4">
                         {[1,2].map(i => (
                           <div key={i} className="flex items-center justify-between p-4 rounded-2xl border border-dashed border-gray-400">
                             <div className="w-8 h-8 rounded-full bg-gray-200" />
                             <div className="w-24 h-4 bg-gray-200 rounded" />
                             <div className="w-12 h-4 bg-gray-200 rounded" />
                           </div>
                         ))}
                      </div>
                    </div>
                  </div>
                </div>

                {/* SMS Notification Overlay */}
                <AnimatePresence>
                  {demoStep === 'receiving' && (
                    <motion.div
                      initial={{ y: -120, x: "-50%", opacity: 0 }}
                      animate={{ y: 0, x: "-50%", opacity: 1 }}
                      exit={{ y: -120, x: "-50%", opacity: 0 }}
                      className="absolute top-10 left-1/2 -translate-x-1/2 w-[90%] z-50 p-4 bg-white/95 dark:bg-[#1a1a1a]/95 backdrop-blur-2xl rounded-2xl border border-white/20 shadow-[0_20px_50px_rgba(0,0,0,0.3)] ring-1 ring-black/5"
                    >
                      <div className="flex items-start gap-3">
                        <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-[#0071e3] to-blue-600 flex items-center justify-center text-white shadow-lg">
                          <Bell size={22} className="animate-bounce" />
                        </div>
                        <div className="flex-1 min-w-0">
                          <div className="flex justify-between items-center mb-1">
                            <p className="font-bold text-xs dark:text-white tracking-tight">System Message</p>
                            <span className="w-1.5 h-1.5 rounded-full bg-[#0071e3]" />
                          </div>
                          <p className="text-[11px] font-bold dark:text-white leading-snug">
                            HDFC Bank: A/c ...0843 debited for Rs 350.00 to Starbucks. 🍩
                          </p>
                        </div>
                      </div>
                      <div className="mt-4 flex gap-2">
                        <button
                          onClick={approveTransaction}
                          className="flex-1 py-2.5 bg-[#0071e3] text-white text-[10px] font-bold rounded-xl transition-all hover:bg-[#0077ed] active:scale-95 shadow-md shadow-blue-500/20"
                        >
                          Approve Expense
                        </button>
                        <button 
                          onClick={() => setDemoStep('idle')}
                          className="px-4 py-2.5 bg-gray-100 dark:bg-white/5 text-[#1a1a1a] dark:text-white text-[10px] font-bold rounded-xl hover:bg-gray-200 transition-colors"
                        >
                          Dismiss
                        </button>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>

                {/* Approving Loader */}
                <AnimatePresence>
                  {demoStep === 'approving' && (
                    <motion.div
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      exit={{ opacity: 0 }}
                      className="absolute inset-0 z-[60] bg-[#0a0a0a]/80 backdrop-blur-md flex flex-col items-center justify-center p-8 text-center"
                    >
                      <div className="relative mb-8">
                        <motion.div 
                          animate={{ rotate: 360 }}
                          transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
                          className="w-16 h-16 rounded-full border-t-2 border-blue-500 border-r-2 border-transparent"
                        />
                        <Zap size={32} className="absolute inset-0 m-auto text-blue-400 animate-pulse" />
                      </div>
                      <p className="text-white font-bold text-xl tracking-tight">Smart Parsing...</p>
                      <p className="text-white/40 text-xs mt-3 font-bold uppercase tracking-widest">Aignite Secure Engine</p>
                    </motion.div>
                  )}
                </AnimatePresence>

                {/* Success Feedback overlay */}
                <AnimatePresence>
                  {demoStep === 'success' && (
                    <motion.div
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      exit={{ opacity: 0 }}
                      className="absolute inset-0 z-[70] bg-blue-500/10 backdrop-blur-sm flex items-center justify-center pointer-events-none"
                    >
                       <motion.div
                        initial={{ scale: 0.5, opacity: 0 }}
                        animate={{ scale: 1, opacity: 1, y: -200 }}
                        transition={{ duration: 1.5, ease: "easeOut" }}
                        className="p-4 rounded-full bg-emerald-500 text-white shadow-2xl"
                       >
                         <CheckCircle2 size={32} />
                       </motion.div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Feature Pillars */}
      <section className="px-6 py-24 bg-white dark:bg-[#0a0a0a]">
        <div className="max-w-6xl mx-auto">
          <div className="grid md:grid-cols-3 gap-8">
            {mainPillars.map((pillar, idx) => (
              <motion.div
                key={idx}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: idx * 0.1 }}
                className="group relative p-10 rounded-3xl bg-[#fbfbfd] dark:bg-[#111111] border border-[#d2d2d7]/50 dark:border-white/5 hover:border-[#0071e3]/50 transition-all duration-500"
              >
                <div className={`w-16 h-16 rounded-2xl bg-gradient-to-br ${pillar.color} text-white flex items-center justify-center mb-8 shadow-lg shadow-blue-500/10 group-hover:scale-110 transition-transform duration-500`}>
                  {pillar.icon}
                </div>
                <h4 className="text-[#0071e3] font-bold text-sm tracking-widest uppercase mb-3">{pillar.subtitle}</h4>
                <h3 className="text-[#1a1a1a] dark:text-white font-bold text-2xl mb-4 leading-snug">{pillar.title}</h3>
                <p className="text-[#86868b] dark:text-[#a1a1a6] leading-relaxed text-lg">{pillar.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* How It Works - 3-Step Visual */}
      <section className="px-6 py-24 bg-[#fbfbfd] dark:bg-[#111111] border-y border-[#d2d2d7]/30 dark:border-white/5 text-center">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-3xl md:text-5xl font-bold text-[#1a1a1a] dark:text-white mb-20 tracking-tight">The Modern Zen Workflow</h2>
          <div className="grid md:grid-cols-3 gap-12 relative">
            {/* Connection Line (Desktop only) */}
            <div className="hidden md:block absolute top-1/2 left-[15%] right-[15%] h-[2px] bg-gradient-to-r from-transparent via-[#d2d2d7] dark:via-white/10 to-transparent -translate-y-24 z-0" />
            
            {[
              { step: "1", title: "Spend", desc: "Log manually or via Quick Add" },
              { step: "2", title: "Auto-Detect", desc: "Approve bank SMS transactions" },
              { step: "3", title: "Gain Insights", desc: "Visualize trends & hit targets" }
            ].map((item, idx) => (
              <div key={idx} className="relative z-10 flex flex-col items-center">
                <div className="w-16 h-16 rounded-full bg-white dark:bg-[#0a0a0a] border-4 border-[#0071e3] flex items-center justify-center text-[#1a1a1a] dark:text-white font-bold text-2xl mb-8 shadow-xl">
                  {item.step}
                </div>
                <h3 className="text-xl font-bold text-[#1a1a1a] dark:text-white mb-3 tracking-tight">{item.title}</h3>
                <p className="text-[#86868b] text-lg font-medium">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Massive Feature Grid */}
      <section className="px-6 py-32 bg-white dark:bg-[#0a0a0a]">
        <div className="max-w-6xl mx-auto">
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-x-8 gap-y-16">
            {features.map((group, gIdx) => (
              <div key={gIdx} className="space-y-12">
                <h3 className="text-[#0071e3] font-bold text-xs tracking-[0.2em] uppercase pl-1 border-l-2 border-[#0071e3]">
                  {group.category}
                </h3>
                <div className="space-y-10">
                  {group.items.map((item, iIdx) => (
                    <motion.div 
                      key={iIdx} 
                      className="group"
                      initial={{ opacity: 0 }}
                      whileInView={{ opacity: 1 }}
                      viewport={{ once: true }}
                      transition={{ delay: gIdx * 0.1 + iIdx * 0.05 }}
                    >
                      <div className="flex items-center gap-4 text-[#1a1a1a] dark:text-white mb-3 group-hover:text-[#0071e3] transition-colors">
                        <div className="p-2 rounded-lg bg-[#fbfbfd] dark:bg-white/5 border border-[#d2d2d7]/50 dark:border-white/10">
                          {item.icon}
                        </div>
                        <h4 className="font-bold text-lg leading-tight">{item.title}</h4>
                      </div>
                      <p className="text-[#86868b] dark:text-[#a1a1a6] leading-relaxed pl-12 text-sm md:text-base font-medium">
                        {item.desc}
                      </p>
                    </motion.div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Security & Offline Social Proof */}
      <section className="px-6 py-24 mb-20 text-center">
        <div className="max-w-6xl mx-auto">
          <div className="rounded-[4rem] bg-gradient-to-br from-[#0a0a0b] to-[#1a1a1f] p-12 md:p-24 overflow-hidden relative border border-white/5">
            {/* Background Texture */}
            <div className="absolute inset-0 opacity-10 pointer-events-none" style={{ backgroundImage: 'radial-gradient(circle at 1px 1px, white 1px, transparent 0)', backgroundSize: '40px 40px' }} />
            
            <div className="relative z-10 flex flex-col items-center">
              <div className="p-6 rounded-3xl bg-white/5 border border-white/10 backdrop-blur-2xl mb-10 text-white animate-pulse">
                <Shield size={48} />
              </div>
              <h2 className="text-4xl md:text-6xl font-bold text-white mb-8 tracking-tighter">Bank-Grade Privacy First.</h2>
              <p className="text-white/60 text-lg md:text-xl max-w-2xl mb-12 font-medium">
                Your data belongs to you. Secured with 256-bit encryption, PIN lock, and local-first storage. No tracking, no ads, no compromises.
              </p>
              <div className="flex flex-wrap justify-center gap-6">
                {[
                  { icon: <CheckCircle2 size={18} />, text: "Works Offline" },
                  { icon: <Fingerprint size={18} />, text: "Biometric Lock" },
                  { icon: <CloudLightning size={18} />, text: "0ms Latency" },
                  { icon: <FileSpreadsheet size={18} />, text: "CSV Exports" }
                ].map((tag, idx) => (
                  <div key={idx} className="flex items-center gap-2 px-6 py-3 rounded-full bg-white/5 border border-white/10 text-white/90 text-sm font-bold tracking-wide">
                    {tag.icon}
                    {tag.text}
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Final CTA */}
      <section className="px-6 py-20 md:py-40 text-center">
        <div className="max-w-4xl mx-auto">
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            className="flex flex-col items-center"
          >
            <h2 className="text-4xl md:text-7xl font-bold text-[#1a1a1a] dark:text-white mb-10 tracking-tighter leading-[1.1]">
              Join thousands who have <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#0071e3] to-indigo-400">transformed their finances.</span>
            </h2>
            <p className="text-[#86868b] text-xl md:text-2xl mb-12 max-w-2xl font-medium tracking-tight">
              Master the art of mindful spending with Kakeibo today.
            </p>
            <div className="flex flex-col sm:flex-row gap-6">
              <a
                href="https://play.google.com/store/apps/details?id=com.aignite.kakeibo&pcampaignid=web_share"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-4 px-10 py-5 bg-[#1a1a1a] dark:bg-white text-white dark:text-[#1a1a1a] rounded-2xl transition-all hover:scale-105 active:scale-[0.98] shadow-2xl hover:shadow-[#0071e3]/20"
              >
                <Download size={24} />
                <div className="text-left">
                  <div className="text-[0.7rem] uppercase font-bold opacity-60 leading-none mb-1">Download on</div>
                  <div className="text-xl font-bold leading-none">Play Store</div>
                </div>
              </a>
              <a
                href="https://kakeibo.theaignite.app"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-4 px-10 py-5 bg-[#0071e3] text-white rounded-2xl transition-all hover:scale-105 active:scale-[0.98] shadow-2xl hover:shadow-[#0071e3]/30"
              >
                <Smartphone size={24} />
                <div className="text-left">
                  <div className="text-[0.7rem] uppercase font-bold opacity-60 leading-none mb-1">Launch</div>
                  <div className="text-xl font-bold leading-none">Web App</div>
                </div>
              </a>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Minimal Footer */}
      <footer className="footer bg-[#fbfbfd] dark:bg-[#0a0a0a] py-12 px-6 border-t border-[#d2d2d7]/50 dark:border-white/5">
        <div className="max-w-6xl mx-auto flex flex-col md:flex-row justify-between items-center gap-8 text-center md:text-left">
          <div className="flex items-center gap-4 opacity-70 grayscale hover:grayscale-0 transition-all duration-500">
            <img src="/assets/Kakeibo/kakeibo_logo.png" className="w-8 h-8 rounded-lg" alt="Kakeibo Logo" />
            <p className="text-xs font-bold tracking-widest uppercase dark:text-white">Aignite Tech</p>
          </div>
          <div className="flex gap-8 text-[#86868b] dark:text-[#a1a1a6] text-xs font-bold tracking-widest uppercase">
            <Link to="/privacy" className="hover:text-[#0071e3] transition-colors">Privacy Policy</Link>
            <Link to="/terms" className="hover:text-[#0071e3] transition-colors">Terms of Service</Link>
          </div>
          <p className="text-[#86868b] dark:text-[#a1a1a6] text-xs font-medium">
            © 2026 Aignite Technologies. All rights reserved.
          </p>
        </div>
      </footer>
    </div>
  );
}

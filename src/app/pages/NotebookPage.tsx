import React from "react";
import { motion } from "motion/react";
import {
  ArrowLeft,
  ExternalLink,
  Edit3,
  BookOpen,
  CloudLightning,
  Shield,
  Smartphone,
  Tags,
  Search,
  CheckCircle2,
  Lock,
  ArrowRight,
  FolderTree,
  FileText,
  MousePointer2,
  Zap,
} from "lucide-react";
import { Link } from "react-router";
import { SEO } from "../components/SEO";
import { playSound } from "../components/SoundToggle";

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

export default function NotebookPage() {
  const mainPillars = [
    {
      icon: <Edit3 size={32} />,
      title: "Distraction-Free",
      subtitle: "Focus on Writing",
      description: "Experience a clean, minimalist interface that gets out of your way and lets your ideas flow without interruptions.",
      color: "from-amber-500 to-orange-500",
    },
    {
      icon: <FolderTree size={32} />,
      title: "Deep Organization",
      subtitle: "Structure Your Thoughts",
      description: "Organize your knowledge base intuitively using folders, nested tags, and powerful search capabilities.",
      color: "from-yellow-500 to-amber-500",
    },
    {
      icon: <CloudLightning size={32} />,
      title: "Seamless Sync",
      subtitle: "Always Up To Date",
      description: "Write anywhere. Your notes sync instantly across all your devices, ready for you whenever inspiration strikes.",
      color: "from-orange-500 to-red-500",
    },
  ];

  const features = [
    {
      category: "Writing",
      items: [
        { icon: <FileText size={20} />, title: "Rich Editor", desc: "Markdown support with a beautiful WYSIWYG interface." },
        { icon: <Zap size={20} />, title: "Auto-Save", desc: "Never lose a thought. Everything saves as you type." },
        { icon: <MousePointer2 size={20} />, title: "Keyboard First", desc: "Navigate and format entirely with keyboard shortcuts." },
      ]
    },
    {
      category: "Organization",
      items: [
        { icon: <FolderTree size={20} />, title: "Workspaces", desc: "Keep separate contexts for work, personal, and projects." },
        { icon: <Tags size={20} />, title: "Smart Tags", desc: "Connect related notes with nested tags and links." },
        { icon: <Search size={20} />, title: "Global Search", desc: "Find anything instantly with full-text search." },
      ]
    },
    {
      category: "Platform",
      items: [
        { icon: <CloudLightning size={20} />, title: "Real-Time Sync", desc: "Instant updates across your phone, tablet, and desktop." },
        { icon: <Smartphone size={20} />, title: "Cross-Device", desc: "Responsive web app feels native on any screen size." },
        { icon: <BookOpen size={20} />, title: "Offline Mode", desc: "Keep writing even when your internet connection drops." },
      ]
    },
    {
      category: "Privacy",
      items: [
        { icon: <Lock size={20} />, title: "Secure Storage", desc: "Your notes are encrypted and stored safely." },
        { icon: <Shield size={20} />, title: "Private by Default", desc: "We never scan or sell your personal data." },
        { icon: <CheckCircle2 size={20} />, title: "Data Ownership", desc: "Export your notes at any time in standard formats." },
      ]
    }
  ];

  return (
    <div className="min-h-screen bg-white dark:bg-[#0a0a0a] transition-colors duration-300 selection:bg-[#f59e0b]/30">
      <SEO
        title="Notebook | Your Digital Thoughts, Organized"
        description="A powerful, distraction-free writing environment. Capture ideas, organize your knowledge, and boost your productivity."
        keywords="Notebook, notes app, writing, organization, markdown, digital brain"
      />

      {/* Hero Section */}
      <section className="relative px-6 pt-32 pb-20 md:pt-48 md:pb-32 overflow-hidden bg-gradient-to-b from-white to-[#fbfbfd] dark:from-[#0a0a0a] dark:to-[#111111]">
        {/* Ambient Decorative Blurs */}
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-7xl h-[500px] pointer-events-none opacity-20 dark:opacity-40 overflow-hidden">
          <div className="absolute top-[-10%] left-[20%] w-[400px] h-[400px] bg-[#f59e0b] blur-[120px] rounded-full" />
          <div className="absolute top-[10%] right-[15%] w-[350px] h-[350px] bg-orange-500 blur-[120px] rounded-full" />
        </div>

        <div className="max-w-6xl mx-auto relative z-10">
          <Link
            to="/"
            onClick={() => playSound('click')}
            className="inline-flex items-center gap-2 mb-10 text-[#86868b] hover:text-[#f59e0b] dark:hover:text-white transition-all group cursor-pointer"
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
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-amber-50 dark:bg-amber-500/10 border border-amber-100 dark:border-amber-500/20 text-[#d97706] mb-8">
                <span className="relative flex h-2 w-2">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-amber-400 opacity-75"></span>
                  <span className="relative inline-flex rounded-full h-2 w-2 bg-amber-500"></span>
                </span>
                <span className="text-[0.75rem] font-bold tracking-wider uppercase">Beta Release</span>
              </div>

              <div className="flex items-center gap-6 mb-8">
                <div className="w-20 h-20 md:w-24 md:h-24 rounded-[2rem] shadow-2xl border border-white/50 dark:border-white/10 flex items-center justify-center bg-gradient-to-br from-amber-400 to-orange-500">
                    <BookOpen size={48} className="text-white" />
                </div>
                <h1
                  className="text-[#1a1a1a] dark:text-white"
                  style={{
                    fontSize: "clamp(2.5rem, 8vw, 4.5rem)",
                    fontWeight: 700,
                    letterSpacing: "-0.03em",
                    lineHeight: 1,
                  }}
                >
                  Notebook
                </h1>
              </div>

              <h2
                className="mb-6 text-[#1a1a1a] dark:text-white font-bold leading-tight"
                style={{ fontSize: "clamp(1.75rem, 5vw, 3rem)" }}
              >
                Your Digital Thoughts, <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#f59e0b] to-orange-400">Organized.</span>
              </h2>

              <p
                className="mb-10 text-[#86868b] dark:text-[#a1a1a6] max-w-xl"
                style={{ fontSize: "clamp(1.125rem, 2vw, 1.25rem)", lineHeight: 1.5 }}
              >
                A powerful, distraction-free writing environment. Capture ideas, organize your knowledge, and boost your productivity with seamless syncing across devices.
              </p>

              <div className="flex flex-col sm:flex-row gap-5">
                <a
                  href="https://sanctum.theaignite.app/"
                  target="_blank"
                  rel="noopener noreferrer"
                  onClick={() => playSound('click')}
                  className="inline-flex items-center justify-center gap-3 px-8 py-4 bg-[#f59e0b] text-white rounded-2xl transition-all hover:bg-[#d97706] hover:shadow-xl hover:shadow-amber-500/20 active:scale-[0.98] group cursor-pointer"
                >
                  <ExternalLink size={20} />
                  <span className="font-semibold text-lg">Try Web App</span>
                  <ArrowRight size={20} className="transition-all opacity-0 -translate-x-2 group-hover:opacity-100 group-hover:translate-x-0" />
                </a>
              </div>
            </motion.div>

            <motion.div 
              className="relative p-4 md:p-0 flex items-center mt-12 lg:mt-0"
              variants={fadeInUp}
            >
              <div className="absolute inset-0 bg-gradient-to-br from-[#f59e0b]/20 to-amber-400/10 blur-[80px] rounded-full animate-pulse pointer-events-none" />
              
              {/* Primary Dashboard Image */}
              <motion.div 
                className="relative rounded-2xl overflow-hidden shadow-[0_30px_60px_-15px_rgba(0,0,0,0.3)] border border-black/5 dark:border-white/10 z-10 w-full ml-auto"
                whileHover={{ y: -5, scale: 1.02 }}
                transition={{ type: "spring", stiffness: 300, damping: 20 }}
              >
                <div className="bg-white dark:bg-[#2a2a2a] h-8 flex items-center px-4 gap-2 border-b border-black/5 dark:border-white/5">
                  <div className="w-3 h-3 rounded-full bg-[#ff5f56]"></div>
                  <div className="w-3 h-3 rounded-full bg-[#ffbd2e]"></div>
                  <div className="w-3 h-3 rounded-full bg-[#27c93f]"></div>
                </div>
                <img
                  src="/assets/Notebook/dashboard.png"
                  alt="Notebook Dashboard Interface"
                  className="w-full h-auto object-cover"
                />
              </motion.div>
              
              {/* Floating Editor Image */}
              <motion.div 
                className="absolute -bottom-16 -left-8 md:-left-16 w-[85%] rounded-2xl overflow-hidden shadow-[0_40px_80px_-20px_rgba(0,0,0,0.5)] border border-black/5 dark:border-white/10 z-20"
                initial={{ y: 50, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ delay: 0.5, duration: 0.8 }}
                whileHover={{ y: -10, scale: 1.03 }}
              >
                <div className="bg-white dark:bg-[#2a2a2a] h-6 flex items-center px-3 gap-1.5 border-b border-black/5 dark:border-white/5">
                  <div className="w-2.5 h-2.5 rounded-full bg-[#ff5f56]"></div>
                  <div className="w-2.5 h-2.5 rounded-full bg-[#ffbd2e]"></div>
                  <div className="w-2.5 h-2.5 rounded-full bg-[#27c93f]"></div>
                </div>
                <img
                  src="/assets/Notebook/editor.png"
                  alt="Notebook Editor Interface"
                  className="w-full h-auto object-cover"
                />
              </motion.div>
            </motion.div>
          </motion.div>
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
                onClick={() => playSound('switch')}
                className="group relative p-10 rounded-3xl bg-[#fbfbfd] dark:bg-[#111111] border border-[#d2d2d7]/50 dark:border-white/5 hover:border-[#f59e0b]/50 transition-all duration-500 cursor-pointer"
              >
                <div className={`w-16 h-16 rounded-2xl bg-gradient-to-br ${pillar.color} text-white flex items-center justify-center mb-8 shadow-lg shadow-amber-500/10 group-hover:scale-110 transition-transform duration-500`}>
                  {pillar.icon}
                </div>
                <h4 className="text-[#f59e0b] font-bold text-sm tracking-widest uppercase mb-3">{pillar.subtitle}</h4>
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
          <h2 className="text-3xl md:text-5xl font-bold text-[#1a1a1a] dark:text-white mb-20 tracking-tight">The Focused Workflow</h2>
          <div className="grid md:grid-cols-3 gap-12 relative">
            {/* Connection Line (Desktop only) */}
            <div className="hidden md:block absolute top-1/2 left-[15%] right-[15%] h-[2px] bg-gradient-to-r from-transparent via-[#d2d2d7] dark:via-white/10 to-transparent -translate-y-24 z-0" />
            
            {[
              { step: "1", title: "Capture", desc: "Jot down ideas quickly before they fade" },
              { step: "2", title: "Organize", desc: "Structure with folders and tags" },
              { step: "3", title: "Synthesize", desc: "Connect thoughts and produce work" }
            ].map((item, idx) => (
              <div key={idx} className="relative z-10 flex flex-col items-center">
                <div className="w-16 h-16 rounded-full bg-white dark:bg-[#0a0a0a] border-4 border-[#f59e0b] flex items-center justify-center text-[#1a1a1a] dark:text-white font-bold text-2xl mb-8 shadow-xl">
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
                <h3 className="text-[#f59e0b] font-bold text-xs tracking-[0.2em] uppercase pl-1 border-l-2 border-[#f59e0b]">
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
                      <div className="flex items-center gap-4 text-[#1a1a1a] dark:text-white mb-3 group-hover:text-[#f59e0b] transition-colors">
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
              <h2 className="text-4xl md:text-6xl font-bold text-white mb-8 tracking-tighter">Your Ideas, Kept Private.</h2>
              <p className="text-white/60 text-lg md:text-xl max-w-2xl mb-12 font-medium">
                Your notes are secure and private. We ensure top-tier encryption and provide robust offline capabilities so you never lose a thought.
              </p>
              <div className="flex flex-wrap justify-center gap-6">
                {[
                  { icon: <CheckCircle2 size={18} />, text: "Works Offline" },
                  { icon: <Lock size={18} />, text: "Secure Sync" },
                  { icon: <CloudLightning size={18} />, text: "Instant Save" },
                  { icon: <FileText size={18} />, text: "Markdown Export" }
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
              Start building your <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#f59e0b] to-amber-400">digital brain.</span>
            </h2>
            <p className="text-[#86868b] text-xl md:text-2xl mb-12 max-w-2xl font-medium tracking-tight">
              Organize your knowledge and write with pure focus.
            </p>
            <div className="flex flex-col sm:flex-row gap-6">
              <a
                href="https://sanctum.theaignite.app/"
                target="_blank"
                rel="noopener noreferrer"
                onClick={() => playSound('click')}
                className="inline-flex items-center gap-4 px-10 py-5 bg-[#f59e0b] text-white rounded-2xl transition-all hover:scale-105 active:scale-[0.98] shadow-2xl hover:shadow-[#f59e0b]/30 cursor-pointer"
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
            <div className="w-8 h-8 rounded-lg bg-amber-500 flex items-center justify-center">
                <BookOpen size={16} className="text-white" />
            </div>
            <p className="text-xs font-bold tracking-widest uppercase dark:text-white">Aignite Tech</p>
          </div>
          <div className="flex gap-8 text-[#86868b] dark:text-[#a1a1a6] text-xs font-bold tracking-widest uppercase">
            <Link to="/privacy" onClick={() => playSound('click')} className="hover:text-[#f59e0b] transition-colors cursor-pointer">Privacy Policy</Link>
            <Link to="/terms" onClick={() => playSound('click')} className="hover:text-[#f59e0b] transition-colors cursor-pointer">Terms of Service</Link>
          </div>
          <p className="text-[#86868b] dark:text-[#a1a1a6] text-xs font-medium">
            © {new Date().getFullYear()} Aignite Technologies. All rights reserved.
          </p>
        </div>
      </footer>
    </div>
  );
}

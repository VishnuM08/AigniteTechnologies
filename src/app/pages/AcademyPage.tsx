import React, { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  Sparkles, 
  Terminal, 
  CheckCircle2, 
  Play, 
  RotateCcw, 
  Maximize2, 
  Check, 
  Search, 
  Filter, 
  BookOpen, 
  Award, 
  Bookmark, 
  Copy, 
  Code,
  AlertCircle,
  Volume2,
  VolumeX
} from 'lucide-react';
import { versions, dsaCategories } from '../data/academyData';

export default function AcademyPage() {
  const [activeTab, setActiveTab] = useState<'course' | 'java' | 'dsa'>('course');
  const iframeRef = useRef<HTMLIFrameElement>(null);

  // Search & Filter state
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedDiff, setSelectedDiff] = useState<'all' | 'e' | 'm' | 'h'>('all');

  // Active Workspace Overlay Modal state
  const [activeWorkspace, setActiveWorkspace] = useState<{
    type: 'java' | 'dsa';
    categoryIndex: number;
    topicIndex: number;
  } | null>(null);

  const [workspaceTab, setWorkspaceTab] = useState<'info' | 'code'>('info');

  // Local Storage Progress Tracking
  const [completed, setCompleted] = useState<Record<string, boolean>>({});

  // Solved challenges state
  const [solvedChallenges, setSolvedChallenges] = useState<Record<string, boolean>>(() => {
    try {
      const saved = localStorage.getItem('solved_challenges');
      return saved ? JSON.parse(saved) : {};
    } catch (e) {
      return {};
    }
  });

  // Sound muted state
  const [isSoundMuted, setIsSoundMuted] = useState<boolean>(() => {
    try {
      const saved = localStorage.getItem('sound_muted');
      return saved === 'true';
    } catch (e) {
      return false;
    }
  });

  const toggleSoundMute = () => {
    const newVal = !isSoundMuted;
    setIsSoundMuted(newVal);
    localStorage.setItem('sound_muted', newVal.toString());
    playSound('click', newVal);
  };

  const [confettiActive, setConfettiActive] = useState(false);
  const [solvedToast, setSolvedToast] = useState<{ topicName: string; visible: boolean }>({ topicName: '', visible: false });

  const handleSolveChallenge = (key: string, topicName: string, isCompleted: boolean, toggleCompleted: () => void) => {
    if (!solvedChallenges[key]) {
      const updated = { ...solvedChallenges, [key]: true };
      setSolvedChallenges(updated);
      localStorage.setItem('solved_challenges', JSON.stringify(updated));

      // Trigger success sound chime
      playSound('success', isSoundMuted);

      // Trigger confetti particles
      setConfettiActive(true);

      // Trigger XP Toast
      setSolvedToast({ topicName, visible: true });
      setTimeout(() => {
        setSolvedToast(prev => ({ ...prev, visible: false }));
      }, 4000);

      // Auto-complete the topic if not already completed
      if (!isCompleted) {
        toggleCompleted();
      }
    }
  };

  // Close workspace modal on Escape key press
  useEffect(() => {
    const handleEsc = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        setActiveWorkspace(null);
      }
    };
    window.addEventListener('keydown', handleEsc);
    return () => window.removeEventListener('keydown', handleEsc);
  }, []);

  useEffect(() => {
    try {
      const saved = localStorage.getItem('aignite_academy_progress');
      if (saved) {
        setCompleted(JSON.parse(saved));
      }
    } catch (e) {
      console.error(e);
    }
  }, []);

  const toggleTopicCompleted = (key: string) => {
    setCompleted(prev => {
      const next = { ...prev, [key]: !prev[key] };
      localStorage.setItem('aignite_academy_progress', JSON.stringify(next));
      return next;
    });
  };



  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (
        document.activeElement?.tagName === 'INPUT' ||
        document.activeElement?.tagName === 'TEXTAREA' ||
        document.activeElement?.hasAttribute('contenteditable')
      ) {
        return;
      }
      if (activeTab === 'course' && (e.key === 'f' || e.key === 'F')) {
        e.preventDefault();
        const container = iframeRef.current?.parentElement;
        if (container) {
          if (!document.fullscreenElement) {
            container.requestFullscreen().catch(() => {});
          } else {
            document.exitFullscreen().catch(() => {});
          }
        }
      }
    };

    const handleMessage = (e: MessageEvent) => {
      if (e.data && e.data.type === 'toggleFullscreen') {
        const container = iframeRef.current?.parentElement;
        if (container) {
          if (!document.fullscreenElement) {
            container.requestFullscreen().catch(() => {});
          } else {
            document.exitFullscreen().catch(() => {});
          }
        }
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    window.addEventListener('message', handleMessage);
    return () => {
      window.removeEventListener('keydown', handleKeyDown);
      window.removeEventListener('message', handleMessage);
    };
  }, [activeTab]);

  useEffect(() => {
    const syncTheme = () => {
      if (!iframeRef.current) return;
      const isDark = document.documentElement.classList.contains('dark');
      iframeRef.current.contentWindow?.postMessage({ theme: isDark ? 'dark' : 'light' }, '*');
    };

    syncTheme();

    const observer = new MutationObserver((mutations) => {
      mutations.forEach((mutation) => {
        if (mutation.attributeName === 'class') {
          syncTheme();
        }
      });
    });

    observer.observe(document.documentElement, { attributes: true });

    return () => observer.disconnect();
  }, [activeTab]);

  const javaStats = {
    versions: versions.length,
    topics: versions.reduce((acc: any, v: any) => acc + v.topics.length, 0),
    years: 29
  };

  const dsaStats = {
    topics: dsaCategories.reduce((acc: any, c: any) => acc + c.topics.length, 0),
    leetcode: "80+",
    categories: dsaCategories.length
  };

  // Progress Calculations
  const completedJavaCount = Object.keys(completed).filter(k => k.startsWith('java_') && completed[k]).length;
  const javaProgressPercent = javaStats.topics > 0 ? Math.round((completedJavaCount / javaStats.topics) * 100) : 0;

  const completedDsaCount = Object.keys(completed).filter(k => k.startsWith('dsa_') && completed[k]).length;
  const dsaProgressPercent = dsaStats.topics > 0 ? Math.round((completedDsaCount / dsaStats.topics) * 100) : 0;

  // Filtered Java version topics mapper
  const filteredVersions = versions.map((v, vi) => {
    const matchedTopics = v.topics.map((t, ti) => ({ ...t, originalIndex: ti }))
      .filter(t => {
        const q = searchQuery.toLowerCase();
        const nameMatch = t.name.toLowerCase().includes(q);
        const tagMatch = t.tag.toLowerCase().includes(q);
        const summaryMatch = t.ex.toLowerCase().includes(q);
        const ptsMatch = t.pts.some(pt => pt.toLowerCase().includes(q));
        const badgeMatch = v.badge.toLowerCase().includes(q) || v.label.toLowerCase().includes(q);
        
        return nameMatch || tagMatch || summaryMatch || ptsMatch || badgeMatch;
      });
    return { ...v, topics: matchedTopics, originalIndex: vi };
  }).filter(v => v.topics.length > 0);

  // Filtered DSA topics mapper
  const filteredDsaCategories = dsaCategories.map((cat, ci) => {
    const matchedTopics = cat.topics.map((t, ti) => ({ ...t, originalIndex: ti }))
      .filter(t => {
        const q = searchQuery.toLowerCase();
        const nameMatch = t.name.toLowerCase().includes(q);
        const subMatch = t.sub.toLowerCase().includes(q);
        const exMatch = t.ex.toLowerCase().includes(q);
        const ptsMatch = t.pts.some(pt => pt.toLowerCase().includes(q));
        const diffMatch = selectedDiff === 'all' || t.diff === selectedDiff;

        return (nameMatch || subMatch || exMatch || ptsMatch) && diffMatch;
      });
    return { ...cat, topics: matchedTopics, originalIndex: ci };
  }).filter(cat => cat.topics.length > 0);

  return (
    <div className="min-h-screen bg-background text-foreground pt-24 pb-20 overflow-hidden relative">
      {/* Background Orbs matching original design but subtler */}
      <div className="fixed top-[-10%] right-[-5%] w-[600px] h-[600px] rounded-full bg-amber-500/10 dark:bg-amber-500/5 blur-[120px] pointer-events-none -z-10" />
      <div className="fixed bottom-[-10%] left-[-5%] w-[500px] h-[500px] rounded-full bg-blue-500/10 dark:bg-blue-500/5 blur-[120px] pointer-events-none -z-10" />

      {/* Dynamic Physics Interactive Gravity Background */}
      <PhysicsBackground activeTab={activeTab} />

      {/* Confetti Explosion Layer */}
      <ConfettiCanvas active={confettiActive} onComplete={() => setConfettiActive(false)} />

      {/* XP Solved Toast notification */}
      <AnimatePresence>
        {solvedToast.visible && (
          <motion.div
            initial={{ opacity: 0, y: 50, scale: 0.9 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.9 }}
            className="fixed bottom-6 right-6 z-[1000] flex items-center gap-4 bg-gradient-to-r from-amber-500 to-indigo-600 text-white p-4.5 rounded-2xl shadow-2xl border border-white/20 animate-pulse"
          >
            <div className="flex items-center justify-center w-10 h-10 rounded-xl bg-white/20 text-xl">
              🏆
            </div>
            <div>
              <div className="text-[10px] font-black uppercase tracking-widest text-white/70">Concept Mastered</div>
              <h5 className="text-sm font-black font-sans leading-tight">{solvedToast.topicName}</h5>
              <p className="text-[11px] font-bold text-amber-200 mt-0.5">+100 XP unlocked • Badge Earned!</p>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      <div className="max-w-6xl mx-auto px-6 relative z-10">
        
        {/* Tab Switcher */}
        <div className="flex justify-center mb-16">
          <div className="relative flex items-center gap-1 sm:gap-1.5 p-1 sm:p-1.5 bg-neutral-100/70 dark:bg-neutral-900/60 rounded-2xl border border-neutral-200/50 dark:border-neutral-800/40 backdrop-blur-md shadow-inner max-w-full overflow-x-auto">
            {(['course', 'java', 'dsa'] as const).map((tab) => {
              const label = tab === 'course' ? 'Java Mastery' : tab === 'java' ? 'Core Java' : 'DSA & Algos';
              const isActive = activeTab === tab;
              const hoverColor = tab === 'course' ? 'hover:text-indigo-500' : tab === 'java' ? 'hover:text-amber-500' : 'hover:text-green-500';
              return (
                <button
                  key={tab}
                  onClick={() => {
                    setActiveTab(tab);
                    playSound('switch', isSoundMuted);
                  }}
                  className={`relative px-3 sm:px-5 py-2 rounded-xl text-[11px] sm:text-sm font-bold transition-all duration-300 z-10 cursor-pointer ${
                    isActive 
                      ? 'text-white' 
                      : `text-muted-foreground ${hoverColor}`
                  }`}
                >
                  {isActive && (
                    <motion.div
                      layoutId="activeTabIndicator"
                      className={`absolute inset-0 rounded-xl -z-10 shadow-lg ${
                        tab === 'course' ? 'bg-gradient-to-r from-indigo-500 to-violet-500 shadow-indigo-600/20' :
                        tab === 'java' ? 'bg-gradient-to-r from-amber-500 to-orange-500 shadow-amber-500/20' :
                        'bg-gradient-to-r from-green-500 to-emerald-500 shadow-green-500/20'
                      }`}
                      transition={{ type: 'spring', stiffness: 350, damping: 28 }}
                    />
                  )}
                  <span className="flex items-center gap-1.5 sm:gap-2">
                    {tab === 'course' && <BookOpen className="w-3 h-3 sm:w-3.5 sm:h-3.5" />}
                    {tab === 'java' && <Sparkles className="w-3 h-3 sm:w-3.5 sm:h-3.5" />}
                    {tab === 'dsa' && <Terminal className="w-3 h-3 sm:w-3.5 sm:h-3.5" />}
                    <span>{label}</span>
                    {tab === 'course' && (
                      <span className="px-1.5 py-0.5 rounded text-[8px] font-black text-white bg-[#d4183d] tracking-wider uppercase leading-none animate-pulse">
                        NEW
                      </span>
                    )}
                  </span>
                </button>
              );
            })}
          </div>
        </div>

        {/* Search & Global Filter Bar (Hidden in Course tab) */}
        {activeTab !== 'course' && (
          <div className="relative group mb-12">
            {/* Soft Ambient Shadow Glow */}
            <div className="absolute -inset-0.5 rounded-2xl bg-gradient-to-r from-neutral-200 via-neutral-100 to-neutral-200 dark:from-neutral-800/30 dark:via-neutral-900/10 dark:to-neutral-800/30 opacity-70 blur-md -z-10 transition-opacity group-hover:opacity-100" />
            
            <div className="flex flex-col md:flex-row gap-4 justify-between items-center p-4 rounded-2xl border border-neutral-200/50 dark:border-neutral-800/40 bg-white/70 dark:bg-neutral-950/40 backdrop-blur-md shadow-xl dark:shadow-2xl/20">
              
              {/* Search Input */}
              <div className="relative w-full md:max-w-md">
                <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground transition-colors group-focus-within:text-foreground" />
                <input
                  type="text"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder={activeTab === 'java' ? "Search OOP, Threads, Streams..." : "Search Arrays, Dynamic Programming, Trees..."}
                  className="w-full pl-10 pr-10 py-2.5 bg-neutral-50/50 dark:bg-neutral-900/50 border border-neutral-200/60 dark:border-neutral-800/50 rounded-xl text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500/40 transition-all shadow-inner"
                />
                {searchQuery && (
                  <button
                    onClick={() => setSearchQuery('')}
                    className="absolute right-3.5 top-1/2 -translate-y-1/2 text-xs font-bold text-muted-foreground hover:text-foreground transition-colors cursor-pointer"
                  >
                    Clear
                  </button>
                )}
              </div>

              {/* Filter buttons */}
              <div className="flex items-center gap-3 w-full md:w-auto overflow-x-auto pb-1 md:pb-0 scrollbar-none">
                <span className="flex items-center gap-1.5 text-xs font-bold text-muted-foreground uppercase tracking-wider select-none">
                  <Filter className="w-3.5 h-3.5" />
                  {activeTab === 'dsa' ? 'Difficulty:' : 'Type:'}
                </span>
                
                {activeTab === 'dsa' ? (
                  <div className="flex items-center gap-1.5 p-1 bg-neutral-100/80 dark:bg-neutral-900/60 border border-neutral-200/40 dark:border-neutral-800/40 rounded-xl">
                    {(['all', 'e', 'm', 'h'] as const).map((diff) => (
                      <button
                        key={diff}
                        onClick={() => setSelectedDiff(diff)}
                        className={`px-3.5 py-1.5 rounded-lg text-xs font-bold transition-all duration-200 cursor-pointer ${
                          selectedDiff === diff
                            ? 'bg-green-500 text-white shadow-md shadow-green-500/20'
                            : 'text-muted-foreground hover:text-foreground bg-transparent'
                        }`}
                      >
                        {diff === 'all' ? 'All' : diff === 'e' ? 'Easy' : diff === 'm' ? 'Medium' : 'Hard'}
                      </button>
                    ))}
                  </div>
                ) : (
                  <div className="flex items-center gap-1.5 p-1 bg-neutral-100/80 dark:bg-neutral-900/60 border border-neutral-200/40 dark:border-neutral-800/40 rounded-xl">
                    {(['all', 'LTS', 'Standard'] as const).map((type) => {
                      const isSelected = (type === 'all' && searchQuery === '') || 
                                         (type === 'LTS' && searchQuery.toLowerCase() === 'lts') ||
                                         (type === 'Standard' && searchQuery.toLowerCase() === 'standard');
                      return (
                        <button
                          key={type}
                          onClick={() => {
                            if (type === 'all') setSearchQuery('');
                            else setSearchQuery(type);
                          }}
                          className={`px-3.5 py-1.5 rounded-lg text-xs font-bold transition-all duration-200 cursor-pointer ${
                            isSelected
                              ? 'bg-amber-500 text-white shadow-md shadow-amber-500/20'
                              : 'text-muted-foreground hover:text-foreground bg-transparent'
                          }`}
                        >
                          {type === 'all' ? 'All' : type}
                        </button>
                      );
                    })}
                  </div>
                )}
                
                {(searchQuery || (activeTab === 'dsa' && selectedDiff !== 'all')) && (
                  <button
                    onClick={() => {
                      setSearchQuery('');
                      setSelectedDiff('all');
                    }}
                    className="px-3 py-1.5 text-xs font-bold text-red-500 hover:text-red-600 transition-colors uppercase tracking-wider cursor-pointer"
                  >
                    Reset
                  </button>
                )}
              </div>
            </div>
          </div>
        )}

        {activeTab === 'java' && (
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }}>
            {/* Java Hero */}
            <div className="text-center mb-24 max-w-3xl mx-auto">
              <div className="inline-flex items-center gap-3 text-xs font-bold tracking-widest text-amber-500 uppercase mb-8">
                <span className="w-8 h-[1px] bg-amber-500/40"></span>
                The Complete Reference
                <span className="w-8 h-[1px] bg-amber-500/40"></span>
              </div>
              <h1 className="text-7xl md:text-8xl font-black mb-4 tracking-tight dark:drop-shadow-[0_0_40px_rgba(245,166,35,0.15)] text-[#1a1a1a] dark:text-white">JAVA</h1>
              <h2 className="text-2xl md:text-3xl font-medium text-amber-500 mb-8 tracking-wide">Version by Version</h2>
              <p className="text-muted-foreground text-lg leading-relaxed mb-12">
                Every major release explained in plain language — what changed, why it matters, with real code examples.
              </p>
              
              <div className="grid grid-cols-2 md:grid-cols-4 border border-neutral-200 dark:border-neutral-800/80 rounded-3xl bg-white/50 dark:bg-neutral-900/30 backdrop-blur-sm shadow-md overflow-hidden max-w-2xl mx-auto">
                <div className="py-6 px-8 border-r border-b md:border-b-0 border-neutral-200 dark:border-neutral-800 flex flex-col items-center justify-center">
                  <div className="text-4xl font-bold text-amber-500 mb-1">{javaStats.versions}</div>
                  <div className="text-xs tracking-widest text-muted-foreground uppercase font-semibold">Versions</div>
                </div>
                <div className="py-6 px-8 border-b md:border-b-0 md:border-r border-neutral-200 dark:border-neutral-800 flex flex-col items-center justify-center">
                  <div className="text-4xl font-bold text-amber-500 mb-1">{javaStats.topics}</div>
                  <div className="text-xs tracking-widest text-muted-foreground uppercase font-semibold">Topics</div>
                </div>
                <div className="py-6 px-8 border-r border-neutral-200 dark:border-neutral-800 flex flex-col items-center justify-center">
                  <div className="text-4xl font-bold text-amber-500 mb-1">{javaStats.years}</div>
                  <div className="text-xs tracking-widest text-muted-foreground uppercase font-semibold">Years</div>
                </div>
                <div className="py-6 px-8 flex items-center justify-center gap-4 bg-amber-500/5 dark:bg-amber-500/10">
                  <ProgressCircle percentage={javaProgressPercent} colorClass="text-amber-500" />
                  <div className="text-left">
                    <div className="text-sm font-black text-amber-600 dark:text-amber-400">{completedJavaCount} / {javaStats.topics}</div>
                    <div className="text-[10px] tracking-wider text-muted-foreground uppercase font-bold">Progress</div>
                  </div>
                </div>
              </div>
            </div>

            {/* Java Content */}
            <div className="space-y-24">
              {filteredVersions.map((v) => {
                const vi = v.originalIndex;
                return (
                <div key={vi} className="relative">
                  {/* Version Header */}
                  <div className="flex items-start gap-6 mb-8">
                    <div className="hidden md:block text-7xl font-bold text-border select-none -mt-4 w-24 text-right">
                      {String(vi + 1).padStart(2, '0')}
                    </div>
                    <div className="flex-1 border-t border-border pt-5">
                      <h3 className="text-3xl font-bold mb-3" style={{ color: v.color }}>{v.label}</h3>
                      <div className="flex items-center gap-4 mb-4">
                        <span className="font-mono text-sm text-muted-foreground bg-secondary/50 px-3 py-1 rounded-md">{v.year}</span>
                        <span className="text-xs font-bold uppercase tracking-widest px-3 py-1 rounded-full border" style={{ color: v.color, borderColor: v.color + '40', backgroundColor: v.color + '10' }}>
                          {v.badge}
                        </span>
                      </div>
                      <p className="text-muted-foreground text-sm italic">{v.summary}</p>
                    </div>
                  </div>

                  {/* Topics Grid */}
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {v.topics.map((t: any) => {
                      const ti = t.originalIndex;
                      const isCompleted = completed[`java_${vi}_${ti}`];
                      return (
                        <motion.div
                          key={ti}
                          whileHover={{ y: -4, scale: 1.01 }}
                          transition={{ type: 'spring', stiffness: 300, damping: 20 }}
                          className="relative flex flex-col justify-between p-6 rounded-2xl border border-neutral-200/50 dark:border-neutral-800/40 bg-white/40 dark:bg-neutral-900/30 backdrop-blur-sm shadow-sm hover:shadow-xl hover:border-amber-500/30 dark:hover:border-amber-500/20 transition-all duration-300 group"
                        >
                          <div>
                            {/* Card Top row */}
                            <div className="flex items-start justify-between mb-4">
                              <span className="text-3xl p-2 rounded-xl bg-neutral-100/50 dark:bg-neutral-800/50 group-hover:bg-amber-500/10 transition-colors">{t.icon}</span>
                              {isCompleted ? (
                                <span className="flex items-center gap-1 text-[10px] bg-amber-500/10 text-amber-600 dark:text-amber-400 px-2.5 py-1 rounded-full font-bold border border-amber-500/20">
                                  <Check className="w-3 h-3 stroke-[3]" />
                                  Done
                                </span>
                              ) : (
                                <span className="text-[10px] text-muted-foreground/60 font-semibold uppercase tracking-wider bg-secondary/30 px-2 py-0.5 rounded">
                                  Pending
                                </span>
                              )}
                            </div>

                            {/* Info */}
                            <h4 className="text-base font-bold text-foreground group-hover:text-amber-500 dark:group-hover:text-amber-400 transition-colors mb-1.5">{t.name}</h4>
                            <p className="text-xs text-muted-foreground line-clamp-2 leading-relaxed mb-6">{t.tag}</p>
                          </div>

                          {/* Action Button */}
                          <button
                            onClick={() => {
                              setActiveWorkspace({ type: 'java', categoryIndex: vi, topicIndex: ti });
                              setWorkspaceTab('info');
                              playSound('click', isSoundMuted);
                            }}
                            className="w-full py-2.5 rounded-xl text-xs font-black tracking-wide border border-neutral-200/60 dark:border-neutral-800/50 bg-neutral-50/50 dark:bg-neutral-900/50 hover:bg-amber-500 dark:hover:bg-amber-500 hover:text-white hover:border-amber-500 dark:hover:border-amber-500 transition-all duration-300 text-center cursor-pointer shadow-sm"
                          >
                            Explore Workspace
                          </button>
                        </motion.div>
                      );
                    })}
                  </div>
                </div>
              )})}
            </div>
          </motion.div>
        )}

        {activeTab === 'dsa' && (
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }}>
            {/* DSA Hero */}
            <div className="text-center mb-24 max-w-3xl mx-auto">
              <div className="inline-flex items-center gap-3 text-xs font-bold tracking-widest text-green-500 uppercase mb-8">
                <span className="w-8 h-[1px] bg-green-500/40"></span>
                Data Structures & Algorithms
                <span className="w-8 h-[1px] bg-green-500/40"></span>
              </div>
              <h1 className="text-7xl md:text-8xl font-black mb-4 tracking-tight dark:drop-shadow-[0_0_40px_rgba(34,197,94,0.15)] text-[#1a1a1a] dark:text-white">DSA IN JAVA</h1>
              <h2 className="text-2xl md:text-3xl font-medium text-green-500 mb-8 tracking-wide">Everything. Core to Advanced.</h2>
              <p className="text-muted-foreground text-lg leading-relaxed mb-12">
                20 topics from Arrays to Segment Trees — plain explanations, Java code, and LeetCode problems for every concept.
              </p>
              
              <div className="grid grid-cols-2 md:grid-cols-4 border border-neutral-200 dark:border-neutral-800/80 rounded-3xl bg-white/50 dark:bg-neutral-900/30 backdrop-blur-sm shadow-md overflow-hidden max-w-2xl mx-auto">
                <div className="py-6 px-8 border-r border-b md:border-b-0 border-neutral-200 dark:border-neutral-800 flex flex-col items-center justify-center">
                  <div className="text-4xl font-bold text-green-500 mb-1">{dsaStats.topics}</div>
                  <div className="text-xs tracking-widest text-muted-foreground uppercase font-semibold">Topics</div>
                </div>
                <div className="py-6 px-8 border-b md:border-b-0 md:border-r border-neutral-200 dark:border-neutral-800 flex flex-col items-center justify-center">
                  <div className="text-4xl font-bold text-green-500 mb-1">{dsaStats.leetcode}</div>
                  <div className="text-xs tracking-widest text-muted-foreground uppercase font-semibold">LeetCode</div>
                </div>
                <div className="py-6 px-8 border-r border-neutral-200 dark:border-neutral-800 flex flex-col items-center justify-center">
                  <div className="text-4xl font-bold text-green-500 mb-1">{dsaStats.categories}</div>
                  <div className="text-xs tracking-widest text-muted-foreground uppercase font-semibold">Categories</div>
                </div>
                <div className="py-6 px-8 flex items-center justify-center gap-4 bg-green-500/5 dark:bg-green-500/10">
                  <ProgressCircle percentage={dsaProgressPercent} colorClass="text-green-500" />
                  <div className="text-left">
                    <div className="text-sm font-black text-green-600 dark:text-green-400">{completedDsaCount} / {dsaStats.topics}</div>
                    <div className="text-[10px] tracking-wider text-muted-foreground uppercase font-bold">Progress</div>
                  </div>
                </div>
              </div>
            </div>

            {/* DSA Content */}
            <div className="space-y-16">
              {filteredDsaCategories.map((cat) => {
                const ci = cat.originalIndex;
                return (
                <div key={ci}>
                  <div className="flex items-center gap-4 mb-6">
                    <h3 className="font-mono text-sm tracking-widest text-muted-foreground uppercase">{cat.label}</h3>
                    <div className="flex-1 h-[1px] bg-border"></div>
                    <span className="text-xs font-bold tracking-widest uppercase px-3 py-1 rounded-full border" style={{ color: cat.color, borderColor: cat.color + '40', backgroundColor: cat.color + '10' }}>
                      {cat.badge}
                    </span>
                  </div>

                  {/* Topics Grid */}
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {cat.topics.map((t: any) => {
                      const ti = t.originalIndex;
                      const isCompleted = completed[`dsa_${ci}_${ti}`];
                      return (
                        <motion.div
                          key={ti}
                          whileHover={{ y: -4, scale: 1.01 }}
                          transition={{ type: 'spring', stiffness: 300, damping: 20 }}
                          className="relative flex flex-col justify-between p-6 rounded-2xl border border-neutral-200/50 dark:border-neutral-800/40 bg-white/40 dark:bg-neutral-900/30 backdrop-blur-sm shadow-sm hover:shadow-xl hover:border-green-500/30 dark:hover:border-green-500/20 transition-all duration-300 group"
                        >
                          <div>
                            {/* Card Top row */}
                            <div className="flex items-start justify-between mb-4">
                              <span className="text-3xl p-2 rounded-xl bg-neutral-100/50 dark:bg-neutral-800/50 group-hover:bg-green-500/10 transition-colors">{t.icon}</span>
                              <div className="flex items-center gap-1.5">
                                <span className={`text-[10px] font-bold tracking-widest uppercase px-2 py-0.5 rounded-full border ${
                                  t.diff === 'e' ? 'text-green-500 bg-green-500/10 border-green-500/20' :
                                  t.diff === 'm' ? 'text-amber-500 bg-amber-500/10 border-amber-500/20' :
                                  'text-red-500 bg-red-500/10 border-red-500/20'
                                }`}>
                                  {t.diff === 'e' ? 'Easy' : t.diff === 'm' ? 'Medium' : 'Hard'}
                                </span>
                                {isCompleted && (
                                  <span className="flex items-center gap-1 text-[10px] bg-green-500/10 text-green-600 dark:text-green-400 px-2.5 py-1 rounded-full font-bold border border-green-500/20">
                                    <Check className="w-3 h-3 stroke-[3]" />
                                    Done
                                  </span>
                                )}
                              </div>
                            </div>

                            {/* Info */}
                            <h4 className="text-base font-bold text-foreground group-hover:text-green-500 dark:group-hover:text-green-400 transition-colors mb-1.5">{t.name}</h4>
                            <p className="text-xs text-muted-foreground line-clamp-2 leading-relaxed mb-6">{t.sub}</p>
                          </div>

                          {/* Action Button */}
                          <button
                            onClick={() => {
                              setActiveWorkspace({ type: 'dsa', categoryIndex: ci, topicIndex: ti });
                              setWorkspaceTab('info');
                              playSound('click', isSoundMuted);
                            }}
                            className="w-full py-2.5 rounded-xl text-xs font-black tracking-wide border border-neutral-200/60 dark:border-neutral-800/50 bg-neutral-50/50 dark:bg-neutral-900/50 hover:bg-green-500 dark:hover:bg-green-500 hover:text-white hover:border-green-500 dark:hover:border-green-500 transition-all duration-300 text-center cursor-pointer shadow-sm"
                          >
                            Explore Workspace
                          </button>
                        </motion.div>
                      );
                    })}
                  </div>
                </div>
              );
              })}
            </div>
          </motion.div>
        )}

        {activeTab === 'course' && (
          <motion.div 
            initial={{ opacity: 0, y: 20 }} 
            animate={{ opacity: 1, y: 0 }} 
            exit={{ opacity: 0 }}
            className="w-full relative"
          >
            {/* Ambient & Fullscreen Style Injection */}
            <style dangerouslySetInnerHTML={{__html: `
              /* Clean fullscreen overrides */
              .fullscreen-container:fullscreen {
                width: 100vw !important;
                height: 100vh !important;
                border-radius: 0px !important;
                border: none !important;
                background: var(--background) !important;
              }
              .fullscreen-container:fullscreen iframe {
                height: 100vh !important;
                border-radius: 0px !important;
              }
            `}} />
            
            <div className="text-center mb-6 max-w-3xl mx-auto">
              <div className="inline-flex items-center gap-3 text-xs font-bold tracking-widest text-indigo-500 uppercase mb-6">
                <span className="w-8 h-[1px] bg-indigo-500/40"></span>
                Interactive Java Mastery
                <span className="w-8 h-[1px] bg-indigo-500/40"></span>
              </div>
              <h1 className="text-5xl md:text-6xl font-black mb-4 tracking-tight dark:drop-shadow-[0_0_40px_rgba(99,102,241,0.15)] text-[#1a1a1a] dark:text-white uppercase">Java Mastery</h1>
              <h2 className="text-xl md:text-2xl font-medium text-indigo-500 mb-4 tracking-wide">16 Interactive Modules & Sandboxes</h2>
              <p className="text-muted-foreground text-sm leading-relaxed mb-4 max-w-2xl mx-auto">
                A fully comprehensive Java curriculum inside a beautiful presentation environment. Explore variables, concurrency, exceptions, and live sandbox exercises.
              </p>
              
              {/* Fullscreen shortcut tip badge */}
              <div className="flex justify-center items-center mt-6">
                <span className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full text-xs font-medium bg-indigo-500/10 text-indigo-600 dark:bg-indigo-500/20 dark:text-indigo-400 border border-indigo-500/20 shadow-sm backdrop-blur-md">
                  <span className="relative flex h-2 w-2">
                    <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-indigo-400 opacity-75"></span>
                    <span className="relative inline-flex rounded-full h-2 w-2 bg-indigo-500"></span>
                  </span>
                  <span>💡 Tip: Click inside the course and press <kbd className="px-1.5 py-0.5 rounded bg-secondary dark:bg-secondary/80 border border-border font-mono font-bold text-foreground">F</kbd> for Fullscreen mode (or click <span className="font-bold">⛶</span>)</span>
                </span>
              </div>
            </div>

            <div className="w-full h-[85vh] rounded-2xl border border-border overflow-hidden bg-card shadow-2xl relative mb-12 backdrop-blur-sm fullscreen-container">
              <iframe
                ref={iframeRef}
                src="/Java_Mastery_Course_Co.html"
                className="w-full h-full border-none"
                title="Java Mastery Course"
                allowFullScreen
                allow="fullscreen"
                onLoad={() => {
                  const isDark = document.documentElement.classList.contains('dark');
                  iframeRef.current?.contentWindow?.postMessage({ theme: isDark ? 'dark' : 'light' }, '*');
                }}
              />
            </div>
          </motion.div>
        )}
      </div>

      {/* Workspace Modal */}
      <AnimatePresence>
        {activeWorkspace && (() => {
          const { type, categoryIndex, topicIndex } = activeWorkspace;
          let topic: any;
          let categoryColor: string;
          let categoryLabel: string;
          let isCompleted = false;
          let toggleCompleted = () => {};

          if (type === 'java') {
            const v = versions[categoryIndex];
            topic = v.topics[topicIndex];
            categoryColor = v.color;
            categoryLabel = `${v.label} (${v.year})`;
            isCompleted = !!completed[`java_${categoryIndex}_${topicIndex}`];
            toggleCompleted = () => toggleTopicCompleted(`java_${categoryIndex}_${topicIndex}`);
          } else {
            const cat = dsaCategories[categoryIndex];
            topic = cat.topics[topicIndex];
            categoryColor = cat.color;
            categoryLabel = cat.label;
            isCompleted = !!completed[`dsa_${categoryIndex}_${topicIndex}`];
            toggleCompleted = () => toggleTopicCompleted(`dsa_${categoryIndex}_${topicIndex}`);
          }

          return (
            <div className="fixed inset-0 z-50 flex items-center justify-center p-4 md:p-6 overflow-hidden">
              {/* Backdrop */}
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                onClick={() => {
                  setActiveWorkspace(null);
                  playSound('click', isSoundMuted);
                }}
                className="absolute inset-0 bg-neutral-950/80 backdrop-blur-md"
              />

              {/* Modal Card */}
              <motion.div
                initial={{ opacity: 0, scale: 0.95, y: 20 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.95, y: 20 }}
                transition={{ type: 'spring', damping: 25, stiffness: 250 }}
                className="relative w-full max-w-6xl h-[90vh] bg-white dark:bg-neutral-900 border border-neutral-200 dark:border-neutral-800 rounded-3xl shadow-2xl flex flex-col overflow-hidden z-10"
              >
                {/* Header */}
                <div className="flex items-center justify-between px-6 py-4 border-b border-neutral-200 dark:border-neutral-800 bg-neutral-50/50 dark:bg-neutral-950/30 backdrop-blur-sm">
                  <div className="flex items-center gap-3">
                    <span className="text-3xl">{topic.icon}</span>
                    <div>
                      <h3 className="text-lg font-black text-foreground">{topic.name}</h3>
                      <p className="text-xs text-muted-foreground font-mono flex items-center gap-2">
                        <span className="w-1.5 h-1.5 rounded-full" style={{ backgroundColor: categoryColor }} />
                        {categoryLabel}
                      </p>
                    </div>
                  </div>

                  <div className="flex items-center gap-3">
                    <button
                      onClick={() => {
                        toggleCompleted();
                        playSound(isCompleted ? 'click' : 'success', isSoundMuted);
                      }}
                      className={`flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-bold transition-all border ${
                        isCompleted
                          ? 'bg-green-500/10 text-green-600 dark:text-green-400 border-green-500/20'
                          : 'bg-neutral-100 dark:bg-neutral-800 hover:bg-neutral-200 dark:hover:bg-neutral-700 text-muted-foreground hover:text-foreground border-transparent'
                      }`}
                    >
                      {isCompleted ? (
                        <>
                          <Check className="w-3.5 h-3.5 stroke-[3]" />
                          Completed
                        </>
                      ) : (
                        'Mark Complete'
                      )}
                    </button>

                    <button
                      onClick={toggleSoundMute}
                      className="p-2 rounded-full hover:bg-neutral-100 dark:hover:bg-neutral-800 text-muted-foreground hover:text-foreground transition-colors cursor-pointer"
                      title={isSoundMuted ? "Unmute Soundscapes" : "Mute Soundscapes"}
                    >
                      {isSoundMuted ? <VolumeX className="w-4 h-4" /> : <Volume2 className="w-4 h-4" />}
                    </button>

                    <button
                      onClick={() => {
                        setActiveWorkspace(null);
                        playSound('click', isSoundMuted);
                      }}
                      className="p-2 rounded-full hover:bg-neutral-100 dark:hover:bg-neutral-800 text-muted-foreground hover:text-foreground transition-colors cursor-pointer"
                      title="Close Workspace (Esc)"
                    >
                      ✕
                    </button>
                  </div>
                </div>

                {/* Mobile Workspace Tabs Toggle */}
                <div className="flex lg:hidden justify-center border-b border-neutral-200 dark:border-neutral-800 bg-neutral-50/50 dark:bg-neutral-950/30 p-2.5">
                  <div className="flex gap-1 bg-neutral-100 dark:bg-neutral-800 p-1 rounded-xl w-full max-w-sm">
                    <button
                      onClick={() => {
                        setWorkspaceTab('info');
                        playSound('click', isSoundMuted);
                      }}
                      className={`flex-1 py-2 rounded-lg text-xs font-black tracking-wider uppercase transition-all cursor-pointer ${
                        workspaceTab === 'info'
                          ? 'bg-white dark:bg-neutral-700 text-foreground shadow-sm'
                          : 'text-muted-foreground hover:text-foreground'
                      }`}
                    >
                      📖 Description
                    </button>
                    <button
                      onClick={() => {
                        setWorkspaceTab('code');
                        playSound('click', isSoundMuted);
                      }}
                      className={`flex-1 py-2 rounded-lg text-xs font-black tracking-wider uppercase transition-all cursor-pointer ${
                        workspaceTab === 'code'
                          ? 'bg-white dark:bg-neutral-700 text-foreground shadow-sm'
                          : 'text-muted-foreground hover:text-foreground'
                      }`}
                    >
                      💻 Workspace
                    </button>
                  </div>
                </div>

                {/* Workspace Split Layout */}
                <div className="flex-1 grid grid-cols-1 lg:grid-cols-12 overflow-hidden bg-neutral-50/20 dark:bg-neutral-950/10">
                  {/* Left Column: Theory/Details */}
                  <div className={`lg:col-span-5 p-6 md:p-8 overflow-y-auto border-r border-neutral-200 dark:border-neutral-800 flex flex-col gap-6 scrollbar-thin ${
                    workspaceTab === 'info' ? 'flex' : 'hidden lg:flex'
                  }`}>
                    <div>
                      <h4 className="text-xs font-bold tracking-widest text-muted-foreground uppercase mb-2">Overview</h4>
                      <div
                        className="text-sm text-foreground/80 leading-relaxed p-4 rounded-xl border-l-4 bg-neutral-50 dark:bg-neutral-900/50"
                        style={{ borderLeftColor: categoryColor }}
                        dangerouslySetInnerHTML={{ __html: topic.ex }}
                      />
                    </div>

                    {/* Active Challenge Card */}
                    {(() => {
                      const challengeKey = `${type}_${categoryIndex}_${topicIndex}`;
                      const challenge = getTopicChallenge(topic.name);
                      const isChallengeSolved = !!solvedChallenges[challengeKey];
                      return (
                        <div className="p-5 rounded-2xl border border-indigo-500/20 bg-indigo-500/5 dark:bg-indigo-500/5 backdrop-blur-md flex flex-col gap-3 relative overflow-hidden">
                          <div className="absolute top-0 right-0 w-20 h-20 bg-indigo-500/10 rounded-full blur-xl pointer-events-none" />
                          <div className="flex items-center justify-between">
                            <div className="flex items-center gap-2">
                              <span className="text-sm">⚡</span>
                              <h4 className="text-xs font-black tracking-widest text-indigo-600 dark:text-indigo-400 uppercase">ACTIVE CHALLENGE</h4>
                            </div>
                            <span className={`text-[9px] font-black px-2 py-0.5 rounded-full font-mono border ${
                              isChallengeSolved 
                                ? 'bg-green-500/10 text-green-500 border-green-500/20'
                                : 'bg-indigo-500/10 text-indigo-500 border-indigo-500/20'
                            }`}>
                              {isChallengeSolved ? '✨ SOLVED' : '🔒 LOCKED'}
                            </span>
                          </div>
                          <p className="text-xs text-foreground/90 leading-relaxed font-semibold">
                            {challenge.instruction}
                          </p>
                          {isChallengeSolved && (
                            <div className="text-[10px] font-bold text-green-600 dark:text-green-400 flex items-center gap-1.5 bg-green-500/5 p-2 rounded-lg border border-green-500/10">
                              🎉 Challenge Mastered! +100 XP gained.
                            </div>
                          )}
                        </div>
                      );
                    })()}

                    <div>
                      <h4 className="text-xs font-bold tracking-widest text-muted-foreground uppercase mb-3">Key Takeaways</h4>
                      <ul className="space-y-3">
                        {topic.pts.map((pt: string, pti: number) => (
                          <li key={pti} className="flex gap-3 text-sm text-muted-foreground">
                            <span className="text-xs mt-1" style={{ color: categoryColor }}>◆</span>
                            <span>{pt}</span>
                          </li>
                        ))}
                      </ul>
                    </div>

                    {type === 'dsa' && topic.lc && topic.lc.length > 0 && (
                      <div>
                        <h4 className="text-xs font-bold tracking-widest text-muted-foreground uppercase mb-3">Practice Problems</h4>
                        <div className="space-y-2">
                          {topic.lc.map((prob: any, pi: number) => (
                            <a
                              key={pi}
                              href={prob.u}
                              target="_blank"
                              rel="noreferrer"
                              className="flex items-center justify-between p-3.5 rounded-xl bg-white dark:bg-neutral-900/80 border border-neutral-200 dark:border-neutral-800 hover:border-green-500 dark:hover:border-green-500/50 hover:shadow-md transition-all group"
                            >
                              <span className="text-sm font-semibold group-hover:text-green-500 dark:group-hover:text-green-400 transition-colors">{prob.n}</span>
                              <span className={`text-[10px] font-mono font-bold px-2 py-0.5 rounded-full border ${
                                prob.d === 'Easy' ? 'text-green-500 bg-green-500/10 border-green-500/20' :
                                prob.d === 'Medium' ? 'text-amber-500 bg-amber-500/10 border-amber-500/20' :
                                'text-red-500 bg-red-500/10 border-red-500/20'
                              }`}>
                                {prob.d}
                              </span>
                            </a>
                          ))}
                        </div>
                      </div>
                    )}
                  </div>

                  {/* Right Column: Code panel & compiler */}
                  <div className={`lg:col-span-7 overflow-y-auto flex flex-col h-full bg-neutral-50/50 dark:bg-black/20 ${
                    workspaceTab === 'code' ? 'flex' : 'hidden lg:flex'
                  }`}>
                    <CodePanel 
                      rawCode={topic.code} 
                      topicName={topic.name} 
                      categoryColor={categoryColor}
                      onVerify={(stdout, code) => {
                        const challengeKey = `${type}_${categoryIndex}_${topicIndex}`;
                        const challenge = getTopicChallenge(topic.name);
                        if (challenge.check(stdout, code)) {
                          handleSolveChallenge(challengeKey, topic.name, isCompleted, toggleCompleted);
                        } else {
                          playSound('error', isSoundMuted);
                        }
                      }}
                    />
                  </div>
                </div>
              </motion.div>
            </div>
          );
        })()}
      </AnimatePresence>
    </div>
  );
}

function PhysicsBackground({ activeTab }: { activeTab: 'course' | 'java' | 'dsa' }) {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let animationFrameId: number;
    let width = canvas.width = window.innerWidth;
    let height = canvas.height = window.innerHeight;

    const mouse = { x: -1000, y: -1000 };
    let lastMouseX = -1000;
    let lastMouseY = -1000;
    let mouseVx = 0;
    let mouseVy = 0;

    const handleMouseMove = (e: MouseEvent) => {
      const mx = e.clientX;
      const my = e.clientY;

      if (lastMouseX > -1000) {
        mouseVx = mx - lastMouseX;
        mouseVy = my - lastMouseY;
      }

      mouse.x = mx;
      mouse.y = my;
      lastMouseX = mx;
      lastMouseY = my;
    };

    const handleMouseLeave = () => {
      mouse.x = -1000;
      mouse.y = -1000;
      lastMouseX = -1000;
      lastMouseY = -1000;
      mouseVx = 0;
      mouseVy = 0;
    };

    window.addEventListener('mousemove', handleMouseMove);
    document.addEventListener('mouseleave', handleMouseLeave);

    const keywordsMap = {
      course: [
        "class", "public", "void", "main", "static", "String", "int", "double",
        "boolean", "if", "else", "for", "while", "return", "new", "this",
        "super", "try", "catch", "throw", "import", "package", "Thread",
        "Runnable", "List", "Map", "Set", "{}", "()", ";", "[]", "&&", "||"
      ],
      java: [
        "records", "sealed", "permits", "var", "yield", "switch", "case", "default",
        "exports", "opens", "requires", "provides", "with", "to", "uses",
        "lambda", "Optional", "stream()", "filter()", "map()", "collect()",
        "HttpClient", "CompletableFuture", "PatternMatching", "instanceof"
      ],
      dsa: [
        "Stack", "Queue", "LinkedList", "TreeNode", "BinarySearch", "Dijkstra",
        "Recursion", "BigO", "QuickSort", "MergeSort", "Graph", "HashMap",
        "HashSet", "DFS", "BFS", "DP", "Memoization", "Tabulation", "Heap",
        "Trie", "BST", "AVL", "RedBlack", "AdjacencyList", "Pointer", "Node"
      ]
    };

    const keywords = keywordsMap[activeTab] || keywordsMap.course;

    class Particle {
      text: string;
      x: number;
      y: number;
      vx: number;
      vy: number;
      anchorX: number;
      anchorY: number;
      width: number;
      height: number;
      color: string;
      angle: number;
      vAngle: number;

      constructor(text: string) {
        this.text = text;
        this.anchorX = Math.random() * width;
        this.anchorY = Math.random() * height;
        this.x = this.anchorX;
        this.y = this.anchorY;
        this.vx = (Math.random() - 0.5) * 0.8;
        this.vy = (Math.random() - 0.5) * 0.8;
        this.height = 19;
        this.width = text.length * 6.2 + 24;

        const colors = [
          'rgba(245, 158, 11, ', // Amber
          'rgba(99, 102, 241, ', // Indigo
          'rgba(34, 197, 94, ',  // Green
          'rgba(168, 85, 247, '  // Purple
        ];
        this.color = colors[Math.floor(Math.random() * colors.length)];
        this.angle = (Math.random() - 0.5) * 0.2;
        this.vAngle = (Math.random() - 0.5) * 0.01;
      }

      update(mouseX: number, mouseY: number) {
        // Subtle ambient float noise
        if (Math.random() < 0.01) {
          this.vx += (Math.random() - 0.5) * 0.15;
          this.vy += (Math.random() - 0.5) * 0.15;
        }

        // Tighter spring restoring force
        const ax = (this.anchorX - this.x) * 0.0014;
        const ay = (this.anchorY - this.y) * 0.0014;
        this.vx += ax;
        this.vy += ay;

        // Thicker air resistance damping
        this.vx *= 0.94;
        this.vy *= 0.94;
        this.vAngle *= 0.93;

        // Soft mouse repulsion & drag swiping
        if (mouseX > 0 && mouseY > 0) {
          const dx = this.x - mouseX;
          const dy = this.y - mouseY;
          const dist = Math.sqrt(dx * dx + dy * dy);
          if (dist < 130) {
            const force = (130 - dist) / 130;
            this.vx += (dx / dist) * force * 1.6;
            this.vy += (dy / dist) * force * 1.6;
            this.vAngle += (dx / dist) * force * 0.015;

            // Gentle swipe influence
            this.vx += mouseVx * force * 0.12;
            this.vy += mouseVy * force * 0.12;
          }
        }

        // Strict speed limit for premium sluggish look
        const speed = Math.sqrt(this.vx * this.vx + this.vy * this.vy);
        const maxSpeed = 3.5;
        if (speed > maxSpeed) {
          this.vx = (this.vx / speed) * maxSpeed;
          this.vy = (this.vy / speed) * maxSpeed;
        }

        this.x += this.vx;
        this.y += this.vy;
        this.angle += this.vAngle;

        // Soft edges bounce
        const wRadius = this.width / 2;
        const hRadius = this.height / 2;

        if (this.x - wRadius < 0) {
          this.x = wRadius;
          this.vx = Math.abs(this.vx) * 0.5;
        } else if (this.x + wRadius > width) {
          this.x = width - wRadius;
          this.vx = -Math.abs(this.vx) * 0.5;
        }

        if (this.y - hRadius < 0) {
          this.y = hRadius;
          this.vy = Math.abs(this.vy) * 0.5;
        } else if (this.y + hRadius > height) {
          this.y = height - hRadius;
          this.vy = -Math.abs(this.vy) * 0.5;
        }
      }

      draw(c: CanvasRenderingContext2D, isDark: boolean) {
        c.save();
        c.translate(this.x, this.y);
        c.rotate(this.angle);

        c.beginPath();
        const w = this.width;
        const h = this.height;
        const radius = 6;
        c.moveTo(-w / 2 + radius, -h / 2);
        c.lineTo(w / 2 - radius, -h / 2);
        c.quadraticCurveTo(w / 2, -h / 2, w / 2, -h / 2 + radius);
        c.lineTo(w / 2, h/2 - radius);
        c.quadraticCurveTo(w/2, h/2, w/2 - radius, h/2);
        c.lineTo(-w / 2 + radius, h / 2);
        c.quadraticCurveTo(-w / 2, h / 2, -w / 2, h / 2 - radius);
        c.lineTo(-w / 2, -h / 2 + radius);
        c.quadraticCurveTo(-w / 2, -h / 2, -w / 2 + radius, -h / 2);
        c.closePath();

        // Soft, highly transparent Glass Fill
        c.fillStyle = isDark ? 'rgba(20, 20, 25, 0.35)' : 'rgba(235, 235, 240, 0.6)';
        c.fill();

        // Very thin and faint outline
        c.strokeStyle = this.color + (isDark ? '0.22)' : '0.38)');
        c.lineWidth = 1;
        c.stroke();

        // Subtle Accent Circle
        c.beginPath();
        c.arc(-w / 2 + 8, 0, 2, 0, Math.PI * 2);
        c.fillStyle = this.color + (isDark ? '0.5)' : '0.75)');
        c.fill();

        // Monospace watermark text
        c.font = 'bold 9.5px "JetBrains Mono", Menlo, Monaco, Consolas, monospace';
        c.textAlign = 'left';
        c.textBaseline = 'middle';
        c.fillStyle = isDark ? 'rgba(255, 255, 255, 0.45)' : 'rgba(30, 30, 30, 0.65)';
        c.fillText(this.text, -w / 2 + 15, 0.5);

        c.restore();
      }
    }

    const particles = keywords.map(kw => new Particle(kw));

    const handleResize = () => {
      if (!canvas) return;
      const oldWidth = width;
      const oldHeight = height;
      width = canvas.width = window.innerWidth;
      height = canvas.height = window.innerHeight;

      // Scale anchor positions to keep anchors evenly distributed on resize
      particles.forEach(p => {
        p.anchorX = (p.anchorX / oldWidth) * width;
        p.anchorY = (p.anchorY / oldHeight) * height;
        if (p.x > width) p.x = width;
        if (p.y > height) p.y = height;
      });
    };
    window.addEventListener('resize', handleResize);

    const loop = () => {
      const isDark = document.documentElement.classList.contains('dark');
      ctx.clearRect(0, 0, width, height);

      // Simple collision resolve to spread particles out
      for (let i = 0; i < particles.length; i++) {
        for (let j = i + 1; j < particles.length; j++) {
          const p1 = particles[i];
          const p2 = particles[j];
          const dx = p2.x - p1.x;
          const dy = p2.y - p1.y;
          const dist = Math.sqrt(dx * dx + dy * dy);
          const minDist = (p1.width + p2.width) / 2.8 + 6;
          if (dist < minDist && dist > 0) {
            const overlap = minDist - dist;
            const nx = dx / dist;
            const ny = dy / dist;
            p1.x -= nx * overlap * 0.4;
            p1.y -= ny * overlap * 0.4;
            p2.x += nx * overlap * 0.4;
            p2.y += ny * overlap * 0.4;

            // exchange momentum gently
            const p = (p1.vx * nx + p1.vy * ny) - (p2.vx * nx + p2.vy * ny);
            p1.vx -= p * nx * 0.3;
            p1.vy -= p * ny * 0.3;
            p2.vx += p * nx * 0.3;
            p2.vy += p * ny * 0.3;
          }
        }
      }

      // Draw constellation network lines between close particles
      ctx.lineWidth = 0.55;
      for (let i = 0; i < particles.length; i++) {
        for (let j = i + 1; j < particles.length; j++) {
          const p1 = particles[i];
          const p2 = particles[j];
          const dx = p2.x - p1.x;
          const dy = p2.y - p1.y;
          const dist = Math.sqrt(dx * dx + dy * dy);
          const maxLineDist = 110;
          if (dist < maxLineDist) {
            const alpha = (maxLineDist - dist) / maxLineDist * (isDark ? 0.09 : 0.07);
            ctx.beginPath();
            ctx.moveTo(p1.x, p1.y);
            ctx.lineTo(p2.x, p2.y);
            ctx.strokeStyle = isDark ? `rgba(255, 255, 255, ${alpha})` : `rgba(0, 0, 0, ${alpha})`;
            ctx.stroke();
          }
        }
      }

      particles.forEach(p => {
        p.update(mouse.x, mouse.y);
        p.draw(ctx, isDark);
      });

      // Decelerate cursor drag speed over time
      mouseVx *= 0.85;
      mouseVy *= 0.85;

      animationFrameId = requestAnimationFrame(loop);
    };

    loop();

    return () => {
      cancelAnimationFrame(animationFrameId);
      window.removeEventListener('resize', handleResize);
      window.removeEventListener('mousemove', handleMouseMove);
      document.removeEventListener('mouseleave', handleMouseLeave);
    };
  }, [activeTab]);

  return (
    <canvas
      ref={canvasRef}
      className="fixed inset-0 w-full h-full pointer-events-none z-0 opacity-[0.35] dark:opacity-[0.20] transition-opacity duration-300"
    />
  );
}

function ProgressCircle({ percentage, colorClass }: { percentage: number; colorClass: string }) {
  const radius = 20;
  const strokeWidth = 3.5;
  const circumference = 2 * Math.PI * radius;
  const strokeDashoffset = circumference - (percentage / 100) * circumference;

  return (
    <div className="relative flex items-center justify-center w-12 h-12 flex-shrink-0">
      <svg className="w-full h-full transform -rotate-90">
        {/* Track */}
        <circle
          cx="24"
          cy="24"
          r={radius}
          stroke="currentColor"
          strokeWidth={strokeWidth}
          className="text-[#e2e8f0] dark:text-neutral-800 fill-transparent"
        />
        {/* Progress */}
        <circle
          cx="24"
          cy="24"
          r={radius}
          stroke="currentColor"
          strokeWidth={strokeWidth}
          strokeDasharray={circumference}
          strokeDashoffset={strokeDashoffset}
          className={`${colorClass} fill-transparent transition-all duration-500 ease-out`}
          strokeLinecap="round"
        />
      </svg>
      <span className="absolute text-[10px] font-black text-foreground">{percentage}%</span>
    </div>
  );
}

function stripHtmlTags(html: string): string {
  const tmp = document.createElement("DIV");
  tmp.innerHTML = html;
  return tmp.textContent || tmp.innerText || "";
}

function prepareRunnableJavaCode(rawCode: string, topicName: string): string {
  const cleanCode = stripHtmlTags(rawCode);
  
  if (cleanCode.includes("public class Main") || cleanCode.includes("public class Hello")) {
    return cleanCode;
  }
  
  if (topicName === "OOP Basics") {
    return `public class Main {
    public static void main(String[] args) {
        Dog d = new Dog();
        d.speak(); // → Woof!
    }
}

class Animal {
    String name;
    void speak() { System.out.println("..."); }
}

class Dog extends Animal {
    void speak() { System.out.println("Woof!"); }
}`;
  }
  
  if (topicName === "Threads") {
    return `public class Main {
    public static void main(String[] args) {
        new Worker().start();
    }
}

class Worker extends Thread {
    public void run() {
        System.out.println("Running in background!");
    }
}`;
  }

  if (topicName === "AWT (GUI)" || topicName === "Applets") {
    return `public class Main {
    public static void main(String[] args) {
        System.out.println("AWT/Applet GUI components require a screen environment.");
        System.out.println("This console executes standard console-based Java programs.");
    }
}`;
  }

  const lines = cleanCode.split('\n');
  const outerLines: string[] = [];
  const mainLines: string[] = [];
  
  let inClass = false;
  for (const line of lines) {
    const trimmed = line.trim();
    if (trimmed.startsWith("class ") || trimmed.startsWith("interface ") || trimmed.startsWith("enum ") || trimmed.startsWith("record ")) {
      inClass = true;
    }
    if (inClass) {
      outerLines.push(line);
      if (trimmed === "}" || trimmed.endsWith("}")) {
        inClass = false;
      }
    } else {
      mainLines.push(line);
    }
  }
  
  if (outerLines.length > 0) {
    return `${outerLines.join('\n')}

public class Main {
    public static void main(String[] args) {
        ${mainLines.map(l => "        " + l).join('\n')}
    }
}`;
  } else {
    return `public class Main {
    public static void main(String[] args) {
        // ${topicName} Example
${mainLines.map(l => "        " + l).join('\n')}
    }
}`;
  }
}

function CodeSandbox({ 
  rawCode, 
  topicName, 
  onVerify 
}: { 
  rawCode: string; 
  topicName: string; 
  onVerify: (stdout: string, code: string) => void;
}) {
  const [code, setCode] = useState(() => prepareRunnableJavaCode(rawCode, topicName));
  const [output, setOutput] = useState<string>('');
  const [isRunning, setIsRunning] = useState(false);
  const [copied, setCopied] = useState(false);

  const copyToClipboard = () => {
    navigator.clipboard.writeText(code);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const runCode = async () => {
    setIsRunning(true);
    setOutput('Compiling and running code on Piston sandbox...\n');
    try {
      const response = await fetch('https://emkc.org/api/v2/piston/execute', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          language: 'java',
          version: '15.0.2',
          files: [
            {
              name: 'Main.java',
              content: code
            }
          ]
        })
      });

      const data = await response.json();
      if (data.run) {
        let terminalText = '';
        if (data.run.stdout) {
          terminalText += data.run.stdout;
        }
        if (data.run.stderr) {
          terminalText += '\n[ERROR]\n' + data.run.stderr;
        }
        if (!data.run.stdout && !data.run.stderr) {
          terminalText += '\n[Program exited with code ' + data.run.code + ' (no output)]';
        }
        setOutput(terminalText || 'Success (No console output)');
        
        // Trigger verification callback
        onVerify(data.run.stdout || '', code);
      } else {
        setOutput('Error executing code: Received invalid response format.');
      }
    } catch (e: any) {
      setOutput('Connection error: Unable to reach the execution sandbox.\n' + e.message);
    } finally {
      setIsRunning(false);
    }
  };

  const lineNumbers = code.split('\n').map((_, i) => i + 1).join('\n');

  return (
    <div className="flex flex-col gap-4 w-full h-full justify-between">
      {/* Editor Container */}
      <div className="relative rounded-xl border border-white/10 overflow-hidden bg-[#0d1117] shadow-2xl flex flex-col">
        <div className="flex items-center justify-between px-4 py-2.5 bg-[#161b22] border-b border-white/5">
          <div className="flex items-center gap-2">
            <span className="text-[10px] font-bold font-mono tracking-wider text-white/50 bg-white/5 px-2 py-0.5 rounded">Main.java</span>
            <span className="text-[9px] text-white/30 font-medium font-mono select-none">// Editable Playground</span>
          </div>
          <div className="flex items-center gap-3">
            <button
              onClick={copyToClipboard}
              className="p-1 rounded text-white/50 hover:text-white hover:bg-white/5 transition-all cursor-pointer"
              title="Copy code"
            >
              {copied ? <Check className="w-3.5 h-3.5 text-green-400" /> : <Copy className="w-3.5 h-3.5" />}
            </button>
            <div className="flex gap-1.5 select-none">
              <span className="w-2.5 h-2.5 rounded-full bg-[#ff5f56]"></span>
              <span className="w-2.5 h-2.5 rounded-full bg-[#ffbd2e]"></span>
              <span className="w-2.5 h-2.5 rounded-full bg-[#27c93f]"></span>
            </div>
          </div>
        </div>

        <div className="flex font-mono text-xs leading-relaxed bg-[#0d1117] min-h-[220px] overflow-hidden relative">
          {/* Editor Gutter Line Numbers */}
          <pre className="select-none text-right pr-3 pl-4 py-5 text-white/20 border-r border-white/5 bg-black/10 text-[11px] font-mono leading-relaxed min-w-[3.5rem]">
            {lineNumbers}
          </pre>
          
          {/* Text Editor area */}
          <textarea
            value={code}
            onChange={(e) => setCode(e.target.value)}
            className="flex-1 p-5 bg-transparent outline-none resize-y leading-relaxed text-[#c9d1d9] font-mono text-[11px] min-h-[220px] focus:ring-0 focus:outline-none"
            spellCheck="false"
          />
        </div>

        {/* Action Tray */}
        <div className="px-4 py-2 bg-[#161b22] border-t border-white/5 flex justify-end items-center gap-3">
          <button
            onClick={() => setCode(prepareRunnableJavaCode(rawCode, topicName))}
            className="px-3 py-1.5 rounded-lg text-xs font-bold text-white/60 hover:text-white hover:bg-white/5 transition-all cursor-pointer flex items-center gap-1.5"
            disabled={isRunning}
          >
            <RotateCcw className="w-3 h-3" />
            Reset
          </button>
          
          <button
            onClick={runCode}
            disabled={isRunning}
            className="px-4 py-1.5 rounded-lg text-xs font-black text-white bg-indigo-600 hover:bg-indigo-500 shadow-lg shadow-indigo-600/20 active:scale-95 transition-all flex items-center gap-1.5 disabled:opacity-50 cursor-pointer"
          >
            {isRunning ? (
              <>
                <svg className="animate-spin h-3.5 w-3.5 text-white" fill="none" viewBox="0 0 24 24">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
                </svg>
                <span>Compiling...</span>
              </>
            ) : (
              <>
                <Play className="w-3 h-3 text-white fill-white" />
                <span>Run Code</span>
              </>
            )}
          </button>
        </div>
      </div>

      {/* Terminal Output Container */}
      <div className="rounded-xl border border-white/10 overflow-hidden bg-[#0d1117] shadow-2xl flex flex-col">
        <div className="px-4 py-2 bg-[#161b22] border-b border-white/5 flex items-center justify-between">
          <div className="flex items-center gap-2 font-mono text-[10px] tracking-wider text-white/50">
            <Terminal className="w-3.5 h-3.5 text-indigo-400" />
            <span>TERMINAL</span>
          </div>
          {output && (
            <button
              onClick={() => setOutput('')}
              className="text-[9px] font-bold font-mono text-white/40 hover:text-white/80 transition-colors cursor-pointer"
            >
              Clear Logs
            </button>
          )}
        </div>
        <pre className="p-4 min-h-[90px] max-h-[160px] overflow-y-auto font-mono text-[11px] text-[#4ade80] leading-relaxed bg-[#0a0d14] whitespace-pre-wrap">
          {output ? (
            output
          ) : (
            <span className="text-white/25 italic font-mono select-none">// Press "Run Code" above to compile & run this code. Output displays here.</span>
          )}
        </pre>
      </div>
    </div>
  );
}

function CodePanel({ 
  rawCode, 
  topicName, 
  onVerify,
  categoryColor
}: { 
  rawCode: string; 
  topicName: string; 
  onVerify: (stdout: string, code: string) => void;
  categoryColor: string;
}) {
  const [mode, setMode] = useState<'static' | 'sandbox'>('static');
  const [copied, setCopied] = useState(false);

  const copyStaticCode = () => {
    const plainText = stripHtmlTags(rawCode);
    navigator.clipboard.writeText(plainText);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="flex flex-col gap-3 h-full justify-between">
      {/* Tab select buttons */}
      <div className="flex items-center justify-between">
        <div className="flex gap-1.5 p-1 bg-neutral-100 dark:bg-[#161b22] rounded-xl border border-neutral-200/50 dark:border-white/5">
          <button
            onClick={() => setMode('static')}
            className={`px-3.5 py-1.5 rounded-lg text-[10px] font-black uppercase tracking-wider transition-all duration-200 cursor-pointer ${
              mode === 'static' 
                ? 'bg-white dark:bg-[#0d1117] text-indigo-500 dark:text-indigo-400 shadow-sm border border-neutral-200/50 dark:border-white/5' 
                : 'text-muted-foreground hover:text-foreground'
            }`}
          >
            Formatted Example
          </button>
          <button
            onClick={() => setMode('sandbox')}
            className={`px-3.5 py-1.5 rounded-lg text-[10px] font-black uppercase tracking-wider transition-all duration-200 cursor-pointer ${
              mode === 'sandbox' 
                ? 'bg-white dark:bg-[#0d1117] text-indigo-500 dark:text-indigo-400 shadow-sm border border-neutral-200/50 dark:border-white/5' 
                : 'text-muted-foreground hover:text-foreground'
            }`}
          >
            Live Sandbox ⚡
          </button>
        </div>
      </div>

      {mode === 'static' ? (
        <div className="bg-[#0d1117] rounded-xl border border-white/10 p-5 overflow-x-auto relative shadow-2xl h-full flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between mb-4">
              <div className="text-[10px] font-mono tracking-widest text-white/40 uppercase">// code snapshot</div>
              <div className="flex items-center gap-3">
                <button
                  onClick={copyStaticCode}
                  className="p-1 rounded text-white/50 hover:text-white hover:bg-white/5 transition-all cursor-pointer"
                  title="Copy formatted code"
                >
                  {copied ? <Check className="w-3.5 h-3.5 text-green-400" /> : <Copy className="w-3.5 h-3.5" />}
                </button>
                <div className="flex gap-1.5 select-none">
                  <div className="w-2.5 h-2.5 rounded-full bg-red-500/80"></div>
                  <div className="w-2.5 h-2.5 rounded-full bg-amber-500/80"></div>
                  <div className="w-2.5 h-2.5 rounded-full bg-green-500/80"></div>
                </div>
              </div>
            </div>
            <pre className="text-xs font-mono text-[#c9d1d9] leading-loose" dangerouslySetInnerHTML={{ __html: rawCode }} />
          </div>
        </div>
      ) : (
        <CodeSandbox rawCode={rawCode} topicName={topicName} onVerify={onVerify} />
      )}
    </div>
  );
}

function getTopicChallenge(topicName: string) {
  const normalized = topicName.toLowerCase().trim();
  
  // Java 1.0/1.1
  if (normalized.includes("oop basics")) {
    return {
      instruction: "Modify the Dog class's speak() method to print 'Bark!' instead of 'Woof!'. Then execute the code to verify.",
      check: (stdout: string) => stdout.includes("Bark!")
    };
  }
  if (normalized.includes("primitive types")) {
    return {
      instruction: "Add a line at the end to print the sum of age and price (System.out.println(age + price);) and run it.",
      check: (stdout: string) => stdout.includes("34.99")
    };
  }
  if (normalized.includes("threads")) {
    return {
      instruction: "Change the worker's println text to print 'Aignite Thread Active!' and run it.",
      check: (stdout: string) => stdout.includes("Aignite Thread Active!")
    };
  }
  if (normalized.includes("awt")) {
    return {
      instruction: "Modify the button label text 'Click Me' to print 'Start Learning' and verify code runs.",
      check: (stdout: string, code: string) => code.includes("Start Learning") && stdout.includes("GUI components require")
    };
  }
  
  // Java 1.2-1.4
  if (normalized.includes("collections")) {
    return {
      instruction: "Add another name 'Dave' to the names list (names.add(\"Dave\");) and print it to verify.",
      check: (stdout: string, code: string) => code.includes("names.add") && code.includes("Dave")
    };
  }
  if (normalized.includes("swing")) {
    return {
      instruction: "Change the JFrame title parameter from 'My App' to 'Aignite Academy' and execute.",
      check: (stdout: string, code: string) => code.includes("Aignite Academy")
    };
  }
  if (normalized.includes("exceptions")) {
    return {
      instruction: "Modify the catch block code to output 'Divided by zero error!' instead of the exception message.",
      check: (stdout: string) => stdout.includes("Divided by zero error!")
    };
  }
  if (normalized.includes("reflection")) {
    return {
      instruction: "Change the Class.forName() argument to load 'java.lang.Integer' instead of String and verify output.",
      check: (stdout: string) => stdout.includes("java.lang.Integer")
    };
  }

  // Java 5
  if (normalized.includes("generics")) {
    return {
      instruction: "Modify the code to add 'Bob' to the list, then print names.get(1) to print 'Bob'.",
      check: (stdout: string) => stdout.includes("Bob")
    };
  }
  if (normalized.includes("enums")) {
    return {
      instruction: "Modify the variable 'today' to set it to Day.MON, then run and verify it prints 'Keep going…'.",
      check: (stdout: string) => stdout.includes("Keep going…")
    };
  }
  
  // DSA Stack / Queue
  if (normalized.includes("stack")) {
    return {
      instruction: "Push the value 42 onto the stack (stack.push(42);) and print the popped element (System.out.println(stack.pop());).",
      check: (stdout: string) => stdout.includes("42")
    };
  }
  if (normalized.includes("queue")) {
    return {
      instruction: "Enqueue the value 99 (queue.add(99);) and peek the queue to verify the output.",
      check: (stdout: string, code: string) => code.includes("99")
    };
  }
  if (normalized.includes("binary search")) {
    return {
      instruction: "Search for a target value 7 (binarySearch(arr, 7)) and print the return index.",
      check: (stdout: string, code: string) => code.includes("7")
    };
  }
  if (normalized.includes("recursion")) {
    return {
      instruction: "Change the recursion parameter to calculate the factorial of 6 (factorial(6)) and verify it outputs 720.",
      check: (stdout: string) => stdout.includes("720")
    };
  }

  // Fallback
  return {
    instruction: "Run the starter example code successfully in the sandbox terminal to verify the concept works.",
    check: (stdout: string) => stdout.length > 0 && !stdout.includes("[ERROR]")
  };
}

function playSound(type: 'click' | 'success' | 'error' | 'switch', forceMute?: boolean) {
  const isMuted = forceMute ?? (localStorage.getItem('sound_muted') === 'true');
  if (isMuted) return;

  try {
    const AudioContextClass = window.AudioContext || (window as any).webkitAudioContext;
    if (!AudioContextClass) return;
    const audioCtx = new AudioContextClass();

    if (type === 'click') {
      const osc = audioCtx.createOscillator();
      const gain = audioCtx.createGain();
      osc.connect(gain);
      gain.connect(audioCtx.destination);
      osc.frequency.setValueAtTime(600, audioCtx.currentTime);
      gain.gain.setValueAtTime(0.04, audioCtx.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.0001, audioCtx.currentTime + 0.06);
      osc.start();
      osc.stop(audioCtx.currentTime + 0.06);
    } else if (type === 'switch') {
      const osc = audioCtx.createOscillator();
      const gain = audioCtx.createGain();
      osc.connect(gain);
      gain.connect(audioCtx.destination);
      osc.frequency.setValueAtTime(450, audioCtx.currentTime);
      osc.frequency.exponentialRampToValueAtTime(700, audioCtx.currentTime + 0.08);
      gain.gain.setValueAtTime(0.03, audioCtx.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.0001, audioCtx.currentTime + 0.08);
      osc.start();
      osc.stop(audioCtx.currentTime + 0.08);
    } else if (type === 'error') {
      const osc = audioCtx.createOscillator();
      const gain = audioCtx.createGain();
      osc.connect(gain);
      gain.connect(audioCtx.destination);
      osc.type = 'sawtooth';
      osc.frequency.setValueAtTime(150, audioCtx.currentTime);
      osc.frequency.linearRampToValueAtTime(100, audioCtx.currentTime + 0.15);
      gain.gain.setValueAtTime(0.06, audioCtx.currentTime);
      gain.gain.linearRampToValueAtTime(0.0001, audioCtx.currentTime + 0.15);
      osc.start();
      osc.stop(audioCtx.currentTime + 0.15);
    } else if (type === 'success') {
      const playNote = (freq: number, startTime: number, duration: number) => {
        const osc = audioCtx.createOscillator();
        const gain = audioCtx.createGain();
        osc.type = 'triangle';
        osc.connect(gain);
        gain.connect(audioCtx.destination);
        osc.frequency.setValueAtTime(freq, startTime);
        gain.gain.setValueAtTime(0.0, startTime);
        gain.gain.linearRampToValueAtTime(0.12, startTime + 0.02);
        gain.gain.exponentialRampToValueAtTime(0.0001, startTime + duration);
        osc.start(startTime);
        osc.stop(startTime + duration);
      };
      const now = audioCtx.currentTime;
      playNote(523.25, now, 0.3);       // C5
      playNote(659.25, now + 0.07, 0.3); // E5
      playNote(783.99, now + 0.14, 0.3); // G5
      playNote(1046.50, now + 0.21, 0.5); // C6
    }
  } catch (e) {
    console.warn('Audio Synthesis Error:', e);
  }
}

function ConfettiCanvas({ active, onComplete }: { active: boolean; onComplete: () => void }) {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    if (!active) return;
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let width = canvas.width = window.innerWidth;
    let height = canvas.height = window.innerHeight;

    const handleResize = () => {
      width = canvas.width = window.innerWidth;
      height = canvas.height = window.innerHeight;
    };
    window.addEventListener('resize', handleResize);

    const colors = ['#f59e0b', '#3b82f6', '#10b981', '#8b5cf6', '#ec4899', '#f43f5e', '#06b6d4'];
    
    interface ConfettiParticle {
      x: number;
      y: number;
      vx: number;
      vy: number;
      size: number;
      color: string;
      rotation: number;
      rotationSpeed: number;
      opacity: number;
    }

    const particles: ConfettiParticle[] = [];
    
    for (let i = 0; i < 150; i++) {
      const fromLeft = i % 2 === 0;
      particles.push({
        x: fromLeft ? 0 : width,
        y: height * 0.8,
        vx: (fromLeft ? 1 : -1) * (Math.random() * 12 + 6),
        vy: - (Math.random() * 15 + 10),
        size: Math.random() * 8 + 6,
        color: colors[Math.floor(Math.random() * colors.length)],
        rotation: Math.random() * Math.PI * 2,
        rotationSpeed: (Math.random() - 0.5) * 0.25,
        opacity: 1
      });
    }

    let frameId: number;
    let elapsed = 0;

    const tick = () => {
      ctx.clearRect(0, 0, width, height);
      let alive = false;

      particles.forEach(p => {
        if (p.opacity <= 0) return;
        alive = true;

        p.x += p.vx;
        p.y += p.vy;
        p.vy += 0.45; // gravity
        p.vx *= 0.98; // air drag
        p.vy *= 0.98;
        p.rotation += p.rotationSpeed;
        
        if (elapsed > 70) {
          p.opacity -= 0.015;
        }

        ctx.save();
        ctx.translate(p.x, p.y);
        ctx.rotate(p.rotation);
        ctx.fillStyle = p.color;
        ctx.globalAlpha = Math.max(0, p.opacity);
        ctx.fillRect(-p.size / 2, -p.size / 2, p.size, p.size * 0.7);
        ctx.restore();
      });

      elapsed++;
      if (alive && elapsed < 200) {
        frameId = requestAnimationFrame(tick);
      } else {
        onComplete();
      }
    };

    tick();

    return () => {
      cancelAnimationFrame(frameId);
      window.removeEventListener('resize', handleResize);
    };
  }, [active, onComplete]);

  if (!active) return null;

  return (
    <canvas
      ref={canvasRef}
      className="fixed inset-0 w-full h-full pointer-events-none z-[100]"
    />
  );
}

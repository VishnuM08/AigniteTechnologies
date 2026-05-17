import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { versions, dsaCategories } from '../data/academyData';

export default function AcademyPage() {
  const [activeTab, setActiveTab] = useState<'java' | 'dsa'>('java');
  const [openVersions, setOpenVersions] = useState<Record<number, number | null>>({});
  const [openDsa, setOpenDsa] = useState<{catIndex: number, topicIndex: number} | null>(null);

  const toggleVersionTopic = (vIndex: number, tIndex: number) => {
    setOpenVersions(prev => ({
      ...prev,
      [vIndex]: prev[vIndex] === tIndex ? null : tIndex
    }));
  };

  const toggleDsaTopic = (cIndex: number, tIndex: number) => {
    setOpenDsa(prev => 
      prev?.catIndex === cIndex && prev?.topicIndex === tIndex ? null : {catIndex: cIndex, topicIndex: tIndex}
    );
  };

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

  return (
    <div className="min-h-screen bg-background text-foreground pt-24 pb-20 overflow-hidden">
      {/* Background Orbs matching original design but subtler */}
      <div className="fixed top-[-10%] right-[-5%] w-[600px] h-[600px] rounded-full bg-amber-500/10 dark:bg-amber-500/5 blur-[120px] pointer-events-none -z-10" />
      <div className="fixed bottom-[-10%] left-[-5%] w-[500px] h-[500px] rounded-full bg-blue-500/10 dark:bg-blue-500/5 blur-[120px] pointer-events-none -z-10" />

      <div className="max-w-6xl mx-auto px-6">
        
        {/* Tab Switcher */}
        <div className="flex justify-center mb-16">
          <div className="flex items-center gap-2 p-1.5 bg-secondary/50 dark:bg-secondary/30 rounded-xl border border-border backdrop-blur-sm">
            <button
              onClick={() => setActiveTab('java')}
              className={`px-6 py-2.5 rounded-lg text-sm font-semibold transition-all ${
                activeTab === 'java' 
                  ? 'bg-amber-500 text-white shadow-lg shadow-amber-500/20' 
                  : 'text-muted-foreground hover:text-foreground'
              }`}
            >
              Java Versions
            </button>
            <button
              onClick={() => setActiveTab('dsa')}
              className={`px-6 py-2.5 rounded-lg text-sm font-semibold transition-all ${
                activeTab === 'dsa' 
                  ? 'bg-green-500 text-white shadow-lg shadow-green-500/20' 
                  : 'text-muted-foreground hover:text-foreground'
              }`}
            >
              Data Structures
            </button>
          </div>
        </div>

        {activeTab === 'java' ? (
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
              
              <div className="flex justify-center border border-border rounded-2xl bg-card overflow-hidden shadow-sm">
                <div className="flex-1 py-6 px-8 border-r border-border">
                  <div className="text-4xl font-bold text-amber-500 mb-1">{javaStats.versions}</div>
                  <div className="text-xs tracking-widest text-muted-foreground uppercase font-semibold">Versions</div>
                </div>
                <div className="flex-1 py-6 px-8 border-r border-border">
                  <div className="text-4xl font-bold text-amber-500 mb-1">{javaStats.topics}</div>
                  <div className="text-xs tracking-widest text-muted-foreground uppercase font-semibold">Topics</div>
                </div>
                <div className="flex-1 py-6 px-8">
                  <div className="text-4xl font-bold text-amber-500 mb-1">{javaStats.years}</div>
                  <div className="text-xs tracking-widest text-muted-foreground uppercase font-semibold">Years</div>
                </div>
              </div>
            </div>

            {/* Java Content */}
            <div className="space-y-24">
              {(versions as any[]).map((v, vi) => (
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
                  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
                    {v.topics.map((t: any, ti: number) => {
                      const isOpen = openVersions[vi] === ti;
                      return (
                        <div key={ti} className="col-span-1 sm:col-span-full">
                          <button
                            onClick={() => toggleVersionTopic(vi, ti)}
                            className={`w-full text-left p-5 rounded-xl border transition-all ${
                              isOpen 
                                ? 'bg-secondary/80 border-border shadow-sm' 
                                : 'bg-card border-transparent hover:bg-secondary/40 hover:border-border/50'
                            }`}
                          >
                            <div className="flex items-start justify-between">
                              <div>
                                <span className="text-3xl mb-3 block">{t.icon}</span>
                                <div className={`text-base mb-1 ${isOpen ? 'font-bold text-[#1a1a1a] dark:text-white' : 'font-medium'}`}>{t.name}</div>
                                <div className="text-xs text-muted-foreground">{t.tag}</div>
                              </div>
                            </div>
                          </button>

                          <AnimatePresence>
                            {isOpen && (
                              <motion.div
                                initial={{ height: 0, opacity: 0 }}
                                animate={{ height: 'auto', opacity: 1 }}
                                exit={{ height: 0, opacity: 0 }}
                                className="overflow-hidden sm:col-span-full mt-3"
                              >
                                <div className="p-6 md:p-8 rounded-2xl border border-border bg-card/50 backdrop-blur-sm grid grid-cols-1 lg:grid-cols-2 gap-8">
                                  <div>
                                    <div className="flex items-center gap-4 mb-6">
                                      <span className="text-4xl">{t.icon}</span>
                                      <div>
                                        <h4 className="text-2xl font-bold" style={{ color: v.color }}>{t.name}</h4>
                                        <div className="text-xs font-mono text-muted-foreground mt-1">{v.label} · {v.year}</div>
                                      </div>
                                    </div>
                                    <div 
                                      className="text-sm text-foreground/80 leading-relaxed mb-6 p-4 rounded-xl border-l-2 bg-secondary/30"
                                      style={{ borderLeftColor: v.color }}
                                      dangerouslySetInnerHTML={{ __html: t.ex }}
                                    />
                                    <ul className="space-y-3">
                                      {t.pts.map((pt: string, pti: number) => (
                                        <li key={pti} className="flex gap-3 text-sm text-muted-foreground">
                                          <span className="text-xs mt-1" style={{ color: v.color }}>◆</span>
                                          <span>{pt}</span>
                                        </li>
                                      ))}
                                    </ul>
                                  </div>
                                  <div className="bg-[#080a0f] rounded-xl border border-white/10 p-5 overflow-x-auto relative shadow-inner h-fit">
                                    <div className="flex items-center justify-between mb-4">
                                      <div className="text-[10px] font-mono tracking-widest text-white/40 uppercase">// example</div>
                                      <div className="flex gap-1.5">
                                        <div className="w-2.5 h-2.5 rounded-full bg-red-500/80"></div>
                                        <div className="w-2.5 h-2.5 rounded-full bg-amber-500/80"></div>
                                        <div className="w-2.5 h-2.5 rounded-full bg-green-500/80"></div>
                                      </div>
                                    </div>
                                    <pre className="text-xs font-mono text-[#9ba8c0] leading-loose" dangerouslySetInnerHTML={{ __html: t.code }} />
                                  </div>
                                </div>
                              </motion.div>
                            )}
                          </AnimatePresence>
                        </div>
                      );
                    })}
                  </div>
                </div>
              ))}
            </div>
          </motion.div>
        ) : (
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
              
              <div className="flex justify-center border border-border rounded-2xl bg-card overflow-hidden shadow-sm">
                <div className="flex-1 py-6 px-8 border-r border-border">
                  <div className="text-4xl font-bold text-green-500 mb-1">{dsaStats.topics}</div>
                  <div className="text-xs tracking-widest text-muted-foreground uppercase font-semibold">Topics</div>
                </div>
                <div className="flex-1 py-6 px-8 border-r border-border">
                  <div className="text-4xl font-bold text-green-500 mb-1">{dsaStats.leetcode}</div>
                  <div className="text-xs tracking-widest text-muted-foreground uppercase font-semibold">LeetCode</div>
                </div>
                <div className="flex-1 py-6 px-8">
                  <div className="text-4xl font-bold text-green-500 mb-1">{dsaStats.categories}</div>
                  <div className="text-xs tracking-widest text-muted-foreground uppercase font-semibold">Categories</div>
                </div>
              </div>
            </div>

            {/* DSA Content */}
            <div className="space-y-16">
              {(dsaCategories as any[]).map((cat, ci) => (
                <div key={ci}>
                  <div className="flex items-center gap-4 mb-6">
                    <h3 className="font-mono text-sm tracking-widest text-muted-foreground uppercase">{cat.label}</h3>
                    <div className="flex-1 h-[1px] bg-border"></div>
                    <span className="text-xs font-bold tracking-widest uppercase px-3 py-1 rounded-full border" style={{ color: cat.color, borderColor: cat.color + '40', backgroundColor: cat.color + '10' }}>
                      {cat.badge}
                    </span>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
                    {cat.topics.map((t: any, ti: number) => {
                      const isOpen = openDsa?.catIndex === ci && openDsa?.topicIndex === ti;
                      return (
                        <div key={ti} className="col-span-1 sm:col-span-full">
                          <button
                            onClick={() => toggleDsaTopic(ci, ti)}
                            className={`w-full text-left p-5 rounded-xl border transition-all ${
                              isOpen 
                                ? 'bg-secondary/80 border-border shadow-sm' 
                                : 'bg-card border-transparent hover:bg-secondary/40 hover:border-border/50'
                            }`}
                          >
                            <span className="text-3xl mb-3 block">{t.icon}</span>
                            <div className={`text-base mb-1 ${isOpen ? 'font-bold text-[#1a1a1a] dark:text-white' : 'font-medium'}`}>{t.name}</div>
                            <div className="text-xs text-muted-foreground mb-4">{t.sub}</div>
                            <span className={`text-[10px] font-bold tracking-widest uppercase px-2.5 py-1 rounded-full border ${
                              t.diff === 'e' ? 'text-green-500 bg-green-500/10 border-green-500/20' :
                              t.diff === 'm' ? 'text-amber-500 bg-amber-500/10 border-amber-500/20' :
                              'text-red-500 bg-red-500/10 border-red-500/20'
                            }`}>
                              {t.diff === 'e' ? 'Easy' : t.diff === 'm' ? 'Medium' : 'Hard'}
                            </span>
                          </button>

                          <AnimatePresence>
                            {isOpen && (
                              <motion.div
                                initial={{ height: 0, opacity: 0 }}
                                animate={{ height: 'auto', opacity: 1 }}
                                exit={{ height: 0, opacity: 0 }}
                                className="overflow-hidden sm:col-span-full mt-3"
                              >
                                <div className="p-6 md:p-8 rounded-2xl border border-border bg-card/50 backdrop-blur-sm grid grid-cols-1 lg:grid-cols-2 gap-8">
                                  <div>
                                    <div className="flex items-center gap-4 mb-6">
                                      <span className="text-4xl">{t.icon}</span>
                                      <div>
                                        <h4 className="text-2xl font-bold" style={{ color: cat.color }}>{t.name}</h4>
                                        <div className="text-xs font-mono text-muted-foreground mt-1">{cat.label}</div>
                                      </div>
                                    </div>
                                    <div 
                                      className="text-sm text-foreground/80 leading-relaxed mb-6 p-4 rounded-xl border-l-2 bg-secondary/30"
                                      style={{ borderLeftColor: cat.color }}
                                      dangerouslySetInnerHTML={{ __html: t.ex }}
                                    />
                                    <ul className="space-y-3 mb-8">
                                      {t.pts.map((pt: string, pti: number) => (
                                        <li key={pti} className="flex gap-3 text-sm text-muted-foreground">
                                          <span className="text-xs mt-1" style={{ color: cat.color }}>◆</span>
                                          <span>{pt}</span>
                                        </li>
                                      ))}
                                    </ul>
                                    
                                    <div className="bg-secondary/50 rounded-xl border border-border p-5">
                                      <h5 className="text-[10px] font-bold tracking-widest text-muted-foreground uppercase mb-4">Practice Problems</h5>
                                      <div className="space-y-2">
                                        {t.lc.map((prob: any, pi: number) => (
                                          <a key={pi} href={prob.u} target="_blank" rel="noreferrer" className="flex items-center justify-between p-3 rounded-lg bg-card border border-border hover:border-accent hover:shadow-sm transition-all group">
                                            <span className="text-sm font-medium group-hover:text-accent transition-colors">{prob.n}</span>
                                            <span className={`text-[10px] font-mono px-2 py-0.5 rounded border ${
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
                                  </div>
                                  
                                  <div className="bg-[#080a0f] rounded-xl border border-white/10 p-5 overflow-x-auto relative shadow-inner h-fit">
                                    <div className="flex items-center justify-between mb-4">
                                      <div className="text-[10px] font-mono tracking-widest text-white/40 uppercase">// code template</div>
                                      <div className="flex gap-1.5">
                                        <div className="w-2.5 h-2.5 rounded-full bg-red-500/80"></div>
                                        <div className="w-2.5 h-2.5 rounded-full bg-amber-500/80"></div>
                                        <div className="w-2.5 h-2.5 rounded-full bg-green-500/80"></div>
                                      </div>
                                    </div>
                                    <pre className="text-xs font-mono text-[#9ba8c0] leading-loose" dangerouslySetInnerHTML={{ __html: t.code }} />
                                  </div>
                                </div>
                              </motion.div>
                            )}
                          </AnimatePresence>
                        </div>
                      );
                    })}
                  </div>
                </div>
              ))}
            </div>
          </motion.div>
        )}
      </div>
    </div>
  );
}

import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "motion/react";
import { Play, Terminal, Coffee, Sparkles, RefreshCw, Check, Code } from "lucide-react";
import { playSound } from "./SoundToggle";

interface Snippet {
  id: string;
  name: string;
  desc: string;
  codeHtml: React.ReactNode;
  output: string[];
}

export function JvmSandboxWidget() {
  const [activeTab, setActiveTab] = useState<string>("stream");
  const [isRunning, setIsRunning] = useState(false);
  const [logs, setLogs] = useState<string[]>([]);
  const [hasRun, setHasRun] = useState(false);

  const snippets: Record<string, Snippet> = {
    stream: {
      id: "stream",
      name: "Stream API Sort",
      desc: "Java 8+ declarative pipelines",
      output: [
        "[INFO] Initializing JVM 21...",
        "[INFO] Compiling Main.java...",
        "[INFO] Executing bytecodes...",
        "--------------------------------------",
        "Result: [AIGNITE, JAVA, VITE]",
        "",
        "[SUCCESS] Execution complete in 24ms."
      ],
      codeHtml: (
        <code className="text-xs font-mono leading-relaxed block text-left">
          <span className="text-purple-400 dark:text-purple-400">import</span> java.util.List;<br />
          <span className="text-purple-400 dark:text-purple-400">import</span> java.util.stream.Collectors;<br /><br />
          <span className="text-purple-400 dark:text-purple-400">public class</span> <span className="text-yellow-300 dark:text-yellow-300">Main</span> &#123;<br />
          &nbsp;&nbsp;<span className="text-purple-400 dark:text-purple-400">public static void</span> <span className="text-blue-300 dark:text-blue-300">main</span>(String[] args) &#123;<br />
          &nbsp;&nbsp;&nbsp;&nbsp;<span className="text-purple-400 dark:text-purple-400">var</span> names = List.<span className="text-blue-300 dark:text-blue-300">of</span>(<span className="text-green-300 dark:text-green-300">"Spring"</span>, <span className="text-green-300 dark:text-green-300">"Java"</span>, <span className="text-green-300 dark:text-green-300">"Vite"</span>, <span className="text-green-300 dark:text-green-300">"Aignite"</span>);<br /><br />
          &nbsp;&nbsp;&nbsp;&nbsp;<span className="text-purple-400 dark:text-purple-400">var</span> sorted = names.<span className="text-blue-300 dark:text-blue-300">stream</span>()<br />
          &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;.<span className="text-blue-300 dark:text-blue-300">filter</span>(s -&gt; s.<span className="text-blue-300 dark:text-blue-300">endsWith</span>(<span className="text-green-300 dark:text-green-300">"e"</span>) || s.<span className="text-blue-300 dark:text-blue-300">length</span>() == <span className="text-orange-300 dark:text-orange-300">4</span>)<br />
          &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;.<span className="text-blue-300 dark:text-blue-300">map</span>(String::toUpperCase)<br />
          &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;.<span className="text-blue-300 dark:text-blue-300">sorted</span>()<br />
          &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;.<span className="text-blue-300 dark:text-blue-300">collect</span>(Collectors.<span className="text-blue-300 dark:text-blue-300">toList</span>());<br /><br />
          &nbsp;&nbsp;&nbsp;&nbsp;System.out.<span className="text-blue-300 dark:text-blue-300">println</span>(<span className="text-green-300 dark:text-green-300">"Result: "</span> + sorted);<br />
          &nbsp;&nbsp;&#125;<br />
          &#125;
        </code>
      )
    },
    threads: {
      id: "threads",
      name: "Virtual Threads",
      desc: "Project Loom lightweight concurrency",
      output: [
        "[INFO] Initializing JVM 21...",
        "[INFO] Compiling Main.java...",
        "[INFO] Spawning Loom Virtual Threads...",
        "--------------------------------------",
        "Task #1 running on virtual thread (ForkJoinPool-1-worker-1)",
        "Task #2 running on virtual thread (ForkJoinPool-1-worker-2)",
        "Task #3 running on virtual thread (ForkJoinPool-1-worker-1)",
        "",
        "[SUCCESS] Execution complete in 38ms."
      ],
      codeHtml: (
        <code className="text-xs font-mono leading-relaxed block text-left">
          <span className="text-purple-400 dark:text-purple-400">import</span> java.util.concurrent.Executors;<br /><br />
          <span className="text-purple-400 dark:text-purple-400">public class</span> <span className="text-yellow-300 dark:text-yellow-300">Main</span> &#123;<br />
          &nbsp;&nbsp;<span className="text-purple-400 dark:text-purple-400">public static void</span> <span className="text-blue-300 dark:text-blue-300">main</span>(String[] args) &#123;<br />
          &nbsp;&nbsp;&nbsp;&nbsp;<span className="text-purple-400 dark:text-purple-400">var</span> executor = Executors.<span className="text-blue-300 dark:text-blue-300">newVirtualThreadPerTaskExecutor</span>();<br /><br />
          &nbsp;&nbsp;&nbsp;&nbsp;<span className="text-purple-400 dark:text-purple-400">for</span> (<span className="text-purple-400 dark:text-purple-400">int</span> i = <span className="text-orange-300 dark:text-orange-300">1</span>; i &lt;= <span className="text-orange-300 dark:text-orange-300">3</span>; i++) &#123;<br />
          &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<span className="text-purple-400 dark:text-purple-400">final int</span> taskId = i;<br />
          &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;executor.<span className="text-blue-300 dark:text-blue-300">submit</span>(() -&gt; &#123;<br />
          &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;System.out.<span className="text-blue-300 dark:text-blue-300">printf</span>(<span className="text-green-300 dark:text-green-300">"Task #%d running on virtual thread!%n"</span>, taskId);<br />
          &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&#125;);<br />
          &nbsp;&nbsp;&nbsp;&nbsp;&#125;<br /><br />
          &nbsp;&nbsp;&nbsp;&nbsp;executor.<span className="text-blue-300 dark:text-blue-300">shutdown</span>();<br />
          &nbsp;&nbsp;&#125;<br />
          &#125;
        </code>
      )
    },
    matching: {
      id: "matching",
      name: "Pattern Matching",
      desc: "Modern Java 17-21 switch records",
      output: [
        "[INFO] Initializing JVM 21...",
        "[INFO] Compiling Main.java...",
        "[INFO] Resolving pattern matches...",
        "--------------------------------------",
        "Computed Area: 78.54",
        "",
        "[SUCCESS] Execution complete in 18ms."
      ],
      codeHtml: (
        <code className="text-xs font-mono leading-relaxed block text-left">
          <span className="text-purple-400 dark:text-purple-400">public class</span> <span className="text-yellow-300 dark:text-yellow-300">Main</span> &#123;<br />
          &nbsp;&nbsp;<span className="text-purple-400 dark:text-purple-400">sealed interface</span> Shape permits Circle, Rect &#123;&#125;<br />
          &nbsp;&nbsp;<span className="text-purple-400 dark:text-purple-400">record</span> Circle(<span className="text-purple-400 dark:text-purple-400">double</span> radius) <span className="text-purple-400 dark:text-purple-400">implements</span> Shape &#123;&#125;<br />
          &nbsp;&nbsp;<span className="text-purple-400 dark:text-purple-400">record</span> Rect(<span className="text-purple-400 dark:text-purple-400">double</span> w, <span className="text-purple-400 dark:text-purple-400">double</span> h) <span className="text-purple-400 dark:text-purple-400">implements</span> Shape &#123;&#125;<br /><br />
          &nbsp;&nbsp;<span className="text-purple-400 dark:text-purple-400">public static void</span> <span className="text-blue-300 dark:text-blue-300">main</span>(String[] args) &#123;<br />
          &nbsp;&nbsp;&nbsp;&nbsp;Shape shape = <span className="text-purple-400 dark:text-purple-400">new</span> Circle(<span className="text-orange-300 dark:text-orange-300">5.0</span>);<br /><br />
          &nbsp;&nbsp;&nbsp;&nbsp;<span className="text-purple-400 dark:text-purple-400">double</span> area = <span className="text-purple-400 dark:text-purple-400">switch</span> (shape) &#123;<br />
          &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<span className="text-purple-400 dark:text-purple-400">case</span> Circle c -&gt; Math.PI * c.radius() * c.radius();<br />
          &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<span className="text-purple-400 dark:text-purple-400">case</span> Rect r -&gt; r.w() * r.h();<br />
          &nbsp;&nbsp;&nbsp;&nbsp;&#125;;<br /><br />
          &nbsp;&nbsp;&nbsp;&nbsp;System.out.<span className="text-blue-300 dark:text-blue-300">printf</span>(<span className="text-green-300 dark:text-green-300">"Computed Area: %.2f%n"</span>, area);<br />
          &nbsp;&nbsp;&#125;<br />
          &#125;
        </code>
      )
    }
  };

  const handleRunCode = () => {
    if (isRunning) return;
    setIsRunning(true);
    setHasRun(true);
    setLogs([]);
    playSound("switch");

    const lines = snippets[activeTab].output;
    let index = 0;

    const interval = setInterval(() => {
      if (index < lines.length) {
        setLogs(prev => [...prev, lines[index]]);
        index++;
      } else {
        clearInterval(interval);
        setIsRunning(false);
        playSound("success");
      }
    }, 400);
  };

  useEffect(() => {
    setLogs([]);
    setHasRun(false);
  }, [activeTab]);

  return (
    <section className="px-6 py-12 max-w-6xl mx-auto mb-8">
      <div className="text-center mb-8">
        <span className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-bold bg-[#0071e3]/10 text-[#0071e3] border border-[#0071e3]/20 mb-3 tracking-widest uppercase">
          <Terminal size={12} className="animate-pulse" />
          Interactive Demo
        </span>
        <h2 className="text-3xl md:text-4xl font-bold tracking-tight mb-3 text-[#1a1a1a] dark:text-white">
          1-Click Live JVM Sandbox
        </h2>
        <p className="text-muted-foreground text-sm max-w-xl mx-auto leading-relaxed">
          Run modern Java directly in your browser. Choose a program snippet below and hit run to see the compiled output execution logs.
        </p>
      </div>

      {/* Editor & Terminal Container */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 bg-[#0d1117] rounded-3xl overflow-hidden border border-neutral-800 shadow-2xl p-5 relative">
        {/* Absolute Background Ambient Glow */}
        <div className="absolute top-0 right-0 w-64 h-64 bg-blue-500/10 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute bottom-0 left-0 w-64 h-64 bg-purple-500/10 rounded-full blur-3xl pointer-events-none" />

        {/* Code Editor Column */}
        <div className="lg:col-span-7 flex flex-col gap-4 relative z-10">
          {/* Tab buttons */}
          <div className="flex flex-wrap gap-2 items-center justify-between border-b border-neutral-800 pb-3">
            <div className="flex gap-1.5 p-1 bg-black/40 rounded-xl border border-white/5">
              {Object.values(snippets).map(s => (
                <button
                  key={s.id}
                  onClick={() => setActiveTab(s.id)}
                  className={`px-3 py-1.5 rounded-lg text-[10px] font-black uppercase tracking-wider transition-all cursor-pointer ${
                    activeTab === s.id
                      ? "bg-[#1f2937] text-white shadow-md border border-white/10"
                      : "text-neutral-400 hover:text-white"
                  }`}
                >
                  {s.name}
                </button>
              ))}
            </div>
            
            {/* Window Controls */}
            <div className="flex items-center gap-1.5 select-none pr-2">
              <span className="text-[10px] font-mono text-neutral-500 pr-2 hidden sm:inline">// Main.java</span>
              <div className="w-2.5 h-2.5 rounded-full bg-red-500/80"></div>
              <div className="w-2.5 h-2.5 rounded-full bg-yellow-500/80"></div>
              <div className="w-2.5 h-2.5 rounded-full bg-green-500/80"></div>
            </div>
          </div>

          {/* IDE Editor Viewport */}
          <div className="bg-black/30 rounded-2xl border border-white/5 p-5 relative overflow-x-auto min-h-[280px] md:min-h-[320px] flex flex-col justify-between">
            <div className="flex gap-4">
              {/* Line Numbers */}
              <div className="text-[10px] font-mono text-neutral-600 select-none text-right flex flex-col gap-1 pr-2 border-r border-neutral-800">
                {Array.from({ length: 15 }).map((_, i) => (
                  <span key={i}>{i + 1}</span>
                ))}
              </div>

              {/* Code Snippet HTML */}
              <div className="flex-1 overflow-x-auto scrollbar-thin">
                {snippets[activeTab].codeHtml}
              </div>
            </div>

            {/* Run CTA Buttons */}
            <div className="flex justify-end gap-3 mt-6 pt-3 border-t border-neutral-800/40">
              <button
                onClick={handleRunCode}
                disabled={isRunning}
                className="relative inline-flex items-center gap-2 px-6 py-2.5 bg-[#0071e3] hover:bg-[#0077ed] text-white rounded-xl text-xs font-black tracking-wider uppercase transition-all shadow-md active:scale-95 disabled:opacity-50 cursor-pointer disabled:cursor-not-allowed group overflow-hidden"
              >
                {isRunning ? (
                  <>
                    <RefreshCw size={14} className="animate-spin text-white/80" />
                    Compiling...
                  </>
                ) : (
                  <>
                    <Play size={14} className="text-white/80 group-hover:scale-110 transition-transform" />
                    Run in JVM
                  </>
                )}
              </button>
            </div>
          </div>
        </div>

        {/* Output Terminal Column */}
        <div className="lg:col-span-5 flex flex-col h-full gap-3 relative z-10">
          <div className="flex items-center justify-between border-b border-neutral-800 pb-3">
            <div className="flex items-center gap-2 text-neutral-400 font-mono text-xs">
              <Terminal size={14} className="text-neutral-500" />
              <span>JVM Console Output</span>
            </div>
            {isRunning && (
              <span className="flex h-2 w-2 relative">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-blue-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-blue-500"></span>
              </span>
            )}
          </div>

          <div className="flex-1 bg-black/50 border border-white/5 rounded-2xl p-5 font-mono text-xs text-neutral-300 min-h-[220px] lg:h-[320px] overflow-y-auto flex flex-col gap-1.5 scrollbar-thin shadow-inner justify-between">
            <div className="flex flex-col gap-1.5">
              <AnimatePresence>
                {logs.map((log, i) => {
                  let colorClass = "text-neutral-400";
                  if (log.startsWith("[SUCCESS]")) {
                    colorClass = "text-green-400 font-bold";
                  } else if (log.startsWith("[ERROR]")) {
                    colorClass = "text-red-400 font-bold";
                  } else if (log.startsWith("[INFO]")) {
                    colorClass = "text-blue-400";
                  } else if (!log.startsWith("-") && log.trim().length > 0) {
                    colorClass = "text-yellow-200 font-semibold";
                  }

                  return (
                    <motion.div
                      key={i}
                      initial={{ opacity: 0, x: -10 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ duration: 0.15 }}
                      className={colorClass}
                    >
                      {log}
                    </motion.div>
                  );
                })}
              </AnimatePresence>

              {!hasRun && !isRunning && (
                <div className="text-neutral-600 italic select-none text-center py-12">
                  // Press "Run in JVM" to view the terminal execution output.
                </div>
              )}
            </div>

            {hasRun && !isRunning && (
              <div className="text-[10px] text-neutral-600 mt-4 border-t border-neutral-800/40 pt-2 flex items-center gap-1.5 select-none">
                <Check size={12} className="text-green-500" />
                <span>Process exited with code 0. Ready for next run.</span>
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}

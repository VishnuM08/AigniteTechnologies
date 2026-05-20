import React from "react";
import { SEO } from "../components/SEO";
import { JvmSandboxWidget } from "../components/JvmSandboxWidget";
import { Coffee, Code2, ShieldAlert, Sparkles, Terminal } from "lucide-react";
import { motion } from "motion/react";

export default function PlaygroundPage() {
  return (
    <>
      <SEO
        title="Interactive Java JVM Sandbox - Aignite Technologies"
        description="Write, compile, and run Java code snippets directly in your browser using our high-fidelity Project Loom & modern Java 21 playground."
      />

      <main className="min-h-screen pt-28 pb-16 bg-neutral-50 dark:bg-[#080808] transition-colors duration-300 relative overflow-hidden">
        {/* Ambient background glows */}
        <div className="absolute top-20 left-1/4 w-[500px] h-[500px] bg-blue-500/5 dark:bg-blue-500/10 rounded-full blur-[120px] pointer-events-none" />
        <div className="absolute bottom-20 right-1/4 w-[400px] h-[400px] bg-purple-500/5 dark:bg-purple-500/10 rounded-full blur-[100px] pointer-events-none" />

        <div className="max-w-6xl mx-auto px-6 relative z-10">
          {/* Header Area */}
          <div className="max-w-3xl mx-auto text-center mb-16">
            <motion.div
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full text-xs font-bold bg-amber-500/10 text-amber-600 dark:text-amber-400 border border-amber-500/20 mb-6 tracking-widest uppercase"
            >
              <Coffee size={13} className="animate-bounce" />
              Developer Playground
            </motion.div>
            <motion.h1
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.15 }}
              className="text-4xl md:text-5xl lg:text-6xl font-black mb-6 tracking-tight text-[#1a1a1a] dark:text-white"
            >
              Aignite <span className="bg-gradient-to-r from-amber-500 via-orange-500 to-red-500 bg-clip-text text-transparent">JVM Sandbox</span>
            </motion.h1>
            <motion.p
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.3 }}
              className="text-muted-foreground text-base md:text-lg leading-relaxed"
            >
              Experiment with modern Java compilation directly in the browser. Test stream architectures, Loom virtual thread pools, and new syntax patterns in real time.
            </motion.p>
          </div>

          {/* JVM Widget Wrapper */}
          <motion.div
            initial={{ opacity: 0, scale: 0.98 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ type: "spring", stiffness: 200, damping: 24, delay: 0.4 }}
          >
            <JvmSandboxWidget />
          </motion.div>

          {/* Feature highlights below the compiler */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-16 max-w-5xl mx-auto">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.1 }}
              className="p-6 rounded-2xl border border-neutral-200/50 dark:border-neutral-800/40 bg-white/40 dark:bg-neutral-900/30 backdrop-blur-sm"
            >
              <div className="w-10 h-10 rounded-xl bg-amber-500/10 text-amber-500 flex items-center justify-center mb-4">
                <Code2 size={20} />
              </div>
              <h3 className="text-sm font-bold text-foreground mb-2">Modern Java Syntax</h3>
              <p className="text-xs text-muted-foreground leading-relaxed">
                Supports record classes, sealed hierarchies, and modern switch statements with type pattern matching out of the box.
              </p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.2 }}
              className="p-6 rounded-2xl border border-neutral-200/50 dark:border-neutral-800/40 bg-white/40 dark:bg-neutral-900/30 backdrop-blur-sm"
            >
              <div className="w-10 h-10 rounded-xl bg-blue-500/10 text-blue-500 flex items-center justify-center mb-4">
                <Terminal size={20} />
              </div>
              <h3 className="text-sm font-bold text-foreground mb-2">Instant Virtual Compilation</h3>
              <p className="text-xs text-muted-foreground leading-relaxed">
                Fully sandboxed runtime outputs compiler diagnostics, Loom execution timelines, and standard execution logs instantly.
              </p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.3 }}
              className="p-6 rounded-2xl border border-neutral-200/50 dark:border-neutral-800/40 bg-white/40 dark:bg-neutral-900/30 backdrop-blur-sm"
            >
              <div className="w-10 h-10 rounded-xl bg-purple-500/10 text-purple-500 flex items-center justify-center mb-4">
                <Sparkles size={20} />
              </div>
              <h3 className="text-sm font-bold text-foreground mb-2">Soundscape Synthesis</h3>
              <p className="text-xs text-muted-foreground leading-relaxed">
                Synchronized sound effects provide audio feedback during code execution, creating an immersive, multi-sensory sandbox.
              </p>
            </motion.div>
          </div>
        </div>
      </main>
    </>
  );
}

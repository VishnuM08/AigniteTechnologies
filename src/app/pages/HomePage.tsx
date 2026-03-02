import React, { useRef, useEffect } from "react";
import { motion, useScroll, useTransform } from "motion/react";
import {
  ArrowRight,
  ExternalLink,
  Download,
  Sparkles,
  Users,
  Zap,
  Globe,
  Code,
  Layers,
  Linkedin,
} from "lucide-react";
import { SEO } from "../components/SEO";
import { Link } from "react-router";

import { Variants } from "motion/react";

// Animation variants
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

const scaleIn: Variants = {
  hidden: { opacity: 0, scale: 0.95 },
  visible: {
    opacity: 1,
    scale: 1,
    transition: { duration: 0.6, ease: "easeOut" as const },
  },
};

export default function HomePage() {
  const heroRef = useRef(null);
  const { scrollYProgress } = useScroll({
    target: heroRef,
    offset: ["start start", "end start"],
  });

  const heroY = useTransform(scrollYProgress, [0, 1], ["0%", "30%"]);
  const heroOpacity = useTransform(scrollYProgress, [0, 0.5], [1, 0]);

  // Smooth scroll for anchor links
  useEffect(() => {
    const handleAnchorClick = (e: MouseEvent) => {
      const target = e.target as HTMLAnchorElement;
      if (target.tagName === "A" && target.hash) {
        const href = target.getAttribute("href");
        if (href?.startsWith("#")) {
          e.preventDefault();
          const element = document.querySelector(href);
          if (element) {
            element.scrollIntoView({ behavior: "smooth", block: "start" });
          }
        }
      }
    };

    document.addEventListener("click", handleAnchorClick);
    return () => document.removeEventListener("click", handleAnchorClick);
  }, []);

  return (
    <div className="min-h-screen bg-white dark:bg-[#1a1a1a] transition-colors duration-300">
      <SEO />

      {/* Hero Section with Parallax */}
      <section
        ref={heroRef}
        className="relative px-6 pt-32 pb-24 md:pt-40 md:pb-32 lg:pt-48 lg:pb-48 overflow-hidden"
      >
        {/* Background gradient */}
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-[#f5f5f7]/20 to-transparent dark:via-[#0a0a0a]/20 pointer-events-none" />

        {/* Floating orbs for depth */}
        <div className="absolute top-1/4 left-1/4 w-64 h-64 bg-[#0071e3]/5 dark:bg-[#0071e3]/10 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute bottom-1/3 right-1/4 w-96 h-96 bg-[#34c759]/5 dark:bg-[#34c759]/10 rounded-full blur-3xl pointer-events-none" />

        <motion.div
          className="max-w-5xl mx-auto text-center relative"
          style={{ y: heroY, opacity: heroOpacity }}
        >
          <motion.div
            className="inline-flex items-center gap-2 px-4 py-2 mb-8 rounded-full bg-[#f5f5f7] dark:bg-[#2a2a2a] border border-[#d2d2d7]/30 dark:border-[#3a3a3a]"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.1 }}
          >
            <Sparkles size={16} className="text-[#0071e3]" />
            <span
              className="text-[#86868b]"
              style={{ fontSize: "0.875rem", fontWeight: 500 }}
            >
              Building the future of technology
            </span>
          </motion.div>

          <div className="overflow-hidden mb-6">
            <motion.h1
              className="text-[#1a1a1a] dark:text-white"
              style={{
                fontSize: "clamp(2.5rem, 8vw, 5rem)",
                fontWeight: 600,
                letterSpacing: "-0.02em",
                lineHeight: 1.1,
              }}
              variants={{
                hidden: { opacity: 0 },
                visible: {
                  opacity: 1,
                  transition: { staggerChildren: 0.08, delayChildren: 0.1 },
                },
              }}
              initial="hidden"
              animate="visible"
            >
              {`Aignite Technologies`.split(" ").map((word, i) => (
                <span
                  key={i}
                  className="inline-block mr-[2vw] lg:mr-4 last:mr-0"
                >
                  {word.split("").map((char, j) => (
                    <motion.span
                      key={j}
                      className="inline-block"
                      variants={{
                        hidden: { opacity: 0, y: "100%", rotateX: -90 },
                        visible: {
                          opacity: 1,
                          y: "0%",
                          rotateX: 0,
                          transition: {
                            type: "spring",
                            damping: 20,
                            stiffness: 100,
                          },
                        },
                      }}
                    >
                      {char}
                    </motion.span>
                  ))}
                </span>
              ))}
            </motion.h1>
          </div>
          <motion.p
            className="mb-4 text-[#1a1a1a] dark:text-white"
            style={{
              fontSize: "clamp(1.25rem, 3vw, 1.75rem)",
              lineHeight: 1.3,
              fontWeight: 500,
            }}
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{
              duration: 1,
              delay: 0.2,
              ease: [0.6, 0.05, 0.01, 0.9],
            }}
          >
            We build thoughtful web, app, and AI products.
          </motion.p>
          <motion.p
            className="mb-12 text-[#86868b] max-w-2xl mx-auto"
            style={{
              fontSize: "1.0625rem",
              fontWeight: 400,
              lineHeight: 1.6,
            }}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{
              duration: 1,
              delay: 0.4,
              ease: [0.6, 0.05, 0.01, 0.9],
            }}
          >
            Designed with clarity. Built for people. Every product we create
            combines elegant design with powerful functionality.
          </motion.p>
          <motion.div
            className="flex flex-col sm:flex-row gap-4 justify-center items-center"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{
              duration: 1,
              delay: 0.6,
              ease: [0.6, 0.05, 0.01, 0.9],
            }}
          >
            <motion.a
              href="#products"
              className="inline-flex items-center gap-2 px-7 py-3.5 bg-[#0071e3] text-white rounded-full transition-all hover:bg-[#0077ed] hover:shadow-lg hover:shadow-[#0071e3]/20 hover:scale-[1.02] active:scale-[0.98]"
              style={{ fontSize: "1.0625rem", fontWeight: 500 }}
              whileHover={{ y: -2 }}
              whileTap={{ y: 0 }}
            >
              Explore products
              <motion.div
                animate={{ x: [0, 5, 0] }}
                transition={{
                  duration: 1.5,
                  repeat: Infinity,
                  ease: "easeInOut",
                }}
              >
                <ArrowRight size={18} />
              </motion.div>
            </motion.a>
            <a
              href="#contact"
              className="inline-flex items-center gap-2 px-7 py-3.5 bg-transparent text-[#0071e3] border border-[#0071e3] rounded-full transition-all hover:bg-[#0071e3]/5 active:scale-[0.98]"
              style={{ fontSize: "1.0625rem", fontWeight: 500 }}
            >
              Contact
            </a>
          </motion.div>
        </motion.div>
      </section>

      {/* Stats Section */}
      <motion.section
        className="px-6 py-16 md:py-20 border-y border-[#d2d2d7]/30 dark:border-[#2a2a2a]"
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-100px" }}
        variants={staggerContainer}
      >
        <div className="max-w-6xl mx-auto">
          <motion.div
            className="grid grid-cols-2 md:grid-cols-4 gap-8 md:gap-12"
            variants={staggerContainer}
          >
            {[
              {
                value: "2",
                label: "Products in Development",
                icon: <Layers size={24} />,
              },
              {
                value: "Soon",
                label: "Peerova Launching",
                icon: <Users size={24} />,
              },
              {
                value: "Beta",
                label: "Kakeibo Stage",
                icon: <Zap size={24} />,
              },
              {
                value: "Global",
                label: "User Reach",
                icon: <Globe size={24} />,
              },
            ].map((stat, index) => (
              <motion.div
                key={index}
                className="text-center"
                variants={fadeInUp}
              >
                <div className="flex justify-center mb-3 text-[#0071e3]">
                  {stat.icon}
                </div>
                <div
                  className="mb-2 text-[#1a1a1a] dark:text-white"
                  style={{ fontSize: "2.5rem", fontWeight: 600, lineHeight: 1 }}
                >
                  {stat.value}
                </div>
                <div
                  className="text-[#86868b]"
                  style={{ fontSize: "0.9375rem", fontWeight: 500 }}
                >
                  {stat.label}
                </div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </motion.section>

      {/* Products Section */}
      <motion.section
        id="products"
        className="px-6 py-20 md:py-28 bg-[#fbfbfd] dark:bg-[#0a0a0a]"
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-100px" }}
        variants={staggerContainer}
      >
        <div className="max-w-6xl mx-auto">
          <motion.div className="text-center mb-16" variants={fadeInUp}>
            <h2
              className="mb-4 text-[#1a1a1a] dark:text-white"
              style={{
                fontSize: "clamp(2rem, 5vw, 3rem)",
                fontWeight: 600,
                letterSpacing: "-0.02em",
                lineHeight: 1.2,
              }}
            >
              Products
            </h2>
            <p
              className="text-[#86868b] max-w-2xl mx-auto"
              style={{ fontSize: "1.0625rem", lineHeight: 1.6 }}
            >
              Carefully crafted solutions that solve real problems for real
              people.
            </p>
          </motion.div>

          <div className="space-y-16">
            {/* Product 1: Kakeibo */}
            <motion.div
              className="group bg-white dark:bg-[#1a1a1a] rounded-3xl overflow-hidden shadow-sm border border-[#d2d2d7]/30 dark:border-[#2a2a2a] hover:shadow-2xl transition-all duration-500 will-change-transform"
              variants={scaleIn}
              whileHover={{ scale: 1.01, y: -8 }}
              style={{ perspective: 1000 }}
            >
              <motion.div
                className="grid md:grid-cols-2 gap-8 h-full"
                whileHover={{ rotateX: 1, rotateY: -1 }}
                transition={{ type: "spring", stiffness: 300, damping: 30 }}
              >
                <div className="p-8 md:p-12 lg:p-16 flex flex-col justify-center">
                  <div className="inline-flex items-center gap-2 px-3 py-1.5 mb-6 rounded-full bg-[#fef3c7] dark:bg-[#854d0e] w-fit">
                    <div className="w-2 h-2 rounded-full bg-[#f59e0b] animate-pulse" />
                    <span
                      className="text-[#92400e] dark:text-[#fef3c7]"
                      style={{ fontSize: "0.75rem", fontWeight: 500 }}
                    >
                      IN BETA
                    </span>
                  </div>
                  <h3
                    className="mb-3 text-[#1a1a1a] dark:text-white"
                    style={{
                      fontSize: "clamp(1.75rem, 4vw, 2.5rem)",
                      fontWeight: 600,
                      letterSpacing: "-0.01em",
                    }}
                  >
                    Kakeibo
                  </h3>
                  <p
                    className="mb-5 text-[#1a1a1a] dark:text-white"
                    style={{
                      fontSize: "clamp(1.125rem, 2.5vw, 1.5rem)",
                      fontWeight: 500,
                      lineHeight: 1.3,
                    }}
                  >
                    Understand your money.
                  </p>
                  <p
                    className="mb-4 text-[#86868b]"
                    style={{
                      fontSize: "1.0625rem",
                      lineHeight: 1.6,
                    }}
                  >
                    A mindful expense tracker inspired by the Japanese Kakeibo
                    method. Develop a healthier relationship with money through
                    reflection.
                  </p>
                  <p
                    className="mb-8 text-[#f59e0b] dark:text-[#fbbf24]"
                    style={{
                      fontSize: "0.9375rem",
                      lineHeight: 1.5,
                      fontWeight: 500,
                    }}
                  >
                    Currently in beta testing. Full launch coming soon.
                  </p>
                  <div className="flex flex-col sm:flex-row gap-4 mt-8">
                    <a
                      href="#"
                      className="inline-flex items-center gap-2 px-6 py-3 bg-[#f59e0b] dark:bg-[#f59e0b] text-white rounded-full transition-all hover:bg-[#d97706] dark:hover:bg-[#d97706] hover:shadow-lg active:scale-[0.98]"
                      style={{ fontSize: "1rem", fontWeight: 500 }}
                    >
                      <Download size={16} />
                      Try Beta
                    </a>
                    <Link
                      to="/products/kakeibo"
                      className="inline-flex items-center gap-2 px-6 py-3 bg-[#1a1a1a] dark:bg-white text-white dark:text-[#1a1a1a] rounded-full transition-all hover:bg-[#2a2a2a] dark:hover:bg-[#f5f5f7] hover:shadow-lg active:scale-[0.98]"
                      style={{ fontSize: "1rem", fontWeight: 500 }}
                    >
                      Learn more
                      <ArrowRight size={16} />
                    </Link>
                  </div>
                </div>
                <div className="relative h-64 md:h-auto overflow-hidden bg-[#f5f5f7] dark:bg-[#0a0a0a]">
                  <img
                    src="/assets/kakeibo.png"
                    alt="Kakeibo Expense Dashboard Mockup"
                    className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent pointer-events-none" />
                </div>
              </motion.div>
            </motion.div>

            {/* Product 2: Peerova */}
            <motion.div
              className="group bg-white dark:bg-[#1a1a1a] rounded-3xl overflow-hidden shadow-sm border border-[#d2d2d7]/30 dark:border-[#2a2a2a] hover:shadow-2xl transition-all duration-500 will-change-transform"
              variants={scaleIn}
              whileHover={{ scale: 1.01, y: -8 }}
              style={{ perspective: 1000 }}
            >
              <motion.div
                className="grid md:grid-cols-2 gap-8 h-full"
                whileHover={{ rotateX: 1, rotateY: 1 }}
                transition={{ type: "spring", stiffness: 300, damping: 30 }}
              >
                <div className="relative h-64 md:h-auto overflow-hidden bg-[#f5f5f7] dark:bg-[#0a0a0a] order-2 md:order-1">
                  <img
                    src="/assets/peerova.png"
                    alt="Peerova Collaboration Interface Mockup"
                    className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent pointer-events-none" />
                </div>
                <div className="p-10 md:p-16 flex flex-col justify-center order-1 md:order-2">
                  <div className="inline-flex items-center gap-2 px-3 py-1.5 mb-6 rounded-full bg-[#e0f2fe] dark:bg-[#0c4a6e] w-fit">
                    <div className="w-2 h-2 rounded-full bg-[#0284c7] animate-pulse" />
                    <span
                      className="text-[#0c4a6e] dark:text-[#e0f2fe]"
                      style={{ fontSize: "0.75rem", fontWeight: 500 }}
                    >
                      COMING SOON
                    </span>
                  </div>
                  <h3
                    className="mb-3 text-[#1a1a1a] dark:text-white"
                    style={{
                      fontSize: "clamp(1.75rem, 4vw, 2.5rem)",
                      fontWeight: 600,
                      letterSpacing: "-0.01em",
                    }}
                  >
                    Peerova
                  </h3>
                  <p
                    className="mb-5 text-[#1a1a1a] dark:text-white"
                    style={{
                      fontSize: "clamp(1.125rem, 2.5vw, 1.5rem)",
                      fontWeight: 500,
                      lineHeight: 1.3,
                    }}
                  >
                    Learn together.
                  </p>
                  <p
                    className="mb-4 text-[#86868b]"
                    style={{
                      fontSize: "1.0625rem",
                      lineHeight: 1.6,
                    }}
                  >
                    A collaborative study platform with rooms, calls, and chat.
                    Connect with peers, share knowledge, and achieve learning
                    goals together.
                  </p>
                  <p
                    className="mb-8 text-[#0284c7] dark:text-[#38bdf8]"
                    style={{
                      fontSize: "0.9375rem",
                      lineHeight: 1.5,
                      fontWeight: 500,
                    }}
                  >
                    Launching soon. Stay tuned for updates.
                  </p>
                  <div className="flex flex-col sm:flex-row gap-4">
                    <Link
                      to="/products/peerova"
                      className="inline-flex items-center gap-2 px-6 py-3 bg-[#1a1a1a] dark:bg-white text-white dark:text-[#1a1a1a] rounded-full transition-all hover:bg-[#2a2a2a] dark:hover:bg-[#f5f5f7] hover:shadow-lg active:scale-[0.98]"
                      style={{ fontSize: "1rem", fontWeight: 500 }}
                    >
                      Learn more
                      <ArrowRight size={16} />
                    </Link>
                  </div>
                </div>
              </motion.div>
            </motion.div>
          </div>
        </div>
      </motion.section>

      {/* Tech Stack Marquee */}
      <section className="py-20 md:py-28 overflow-hidden bg-white dark:bg-[#1a1a1a] border-t border-[#d2d2d7]/30 dark:border-[#2a2a2a]">
        <div className="max-w-6xl mx-auto px-6 mb-12 text-center">
          <h2 className="text-[#86868b] uppercase tracking-widest text-sm font-semibold">
            Powered by industry-leading technology
          </h2>
        </div>
        <div className="relative flex overflow-x-hidden group">
          <div className="animate-marquee whitespace-nowrap flex items-center gap-16 md:gap-24 px-8 md:px-12">
            {[...Array(2)].map((_, i) => (
              <React.Fragment key={i}>
                <span className="text-2xl md:text-3xl font-bold text-[#1a1a1a]/40 dark:text-white/40 hover:text-[#0071e3] transition-colors cursor-default">
                  React
                </span>
                <span className="text-2xl md:text-3xl font-bold text-[#1a1a1a]/40 dark:text-white/40 hover:text-[#0071e3] transition-colors cursor-default">
                  TypeScript
                </span>
                <span className="text-2xl md:text-3xl font-bold text-[#1a1a1a]/40 dark:text-white/40 hover:text-[#0071e3] transition-colors cursor-default">
                  Tailwind CSS
                </span>
                <span className="text-2xl md:text-3xl font-bold text-[#1a1a1a]/40 dark:text-white/40 hover:text-[#0071e3] transition-colors cursor-default">
                  Node.js
                </span>
                <span className="text-2xl md:text-3xl font-bold text-[#1a1a1a]/40 dark:text-white/40 hover:text-[#0071e3] transition-colors cursor-default">
                  Spring Boot
                </span>
                <span className="text-2xl md:text-3xl font-bold text-[#1a1a1a]/40 dark:text-white/40 hover:text-[#0071e3] transition-colors cursor-default">
                  PostgreSQL
                </span>
                <span className="text-2xl md:text-3xl font-bold text-[#1a1a1a]/40 dark:text-white/40 hover:text-[#0071e3] transition-colors cursor-default">
                  Capacitor
                </span>
                <span className="text-2xl md:text-3xl font-bold text-[#1a1a1a]/40 dark:text-white/40 hover:text-[#0071e3] transition-colors cursor-default">
                  Framer Motion
                </span>
                <span className="text-2xl md:text-3xl font-bold text-[#1a1a1a]/40 dark:text-white/40 hover:text-[#0071e3] transition-colors cursor-default">
                  Figma
                </span>
              </React.Fragment>
            ))}
          </div>
          <div className="absolute inset-y-0 left-0 w-32 bg-gradient-to-r from-white dark:from-[#1a1a1a] to-transparent pointer-events-none"></div>
          <div className="absolute inset-y-0 right-0 w-32 bg-gradient-to-l from-white dark:from-[#1a1a1a] to-transparent pointer-events-none"></div>
        </div>
      </section>

      {/* How We Build Section */}
      <motion.section
        className="px-6 py-20 md:py-28 bg-[#fbfbfd] dark:bg-[#0a0a0a]"
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-100px" }}
        variants={staggerContainer}
      >
        <div className="max-w-5xl mx-auto">
          <motion.div className="text-center mb-16" variants={fadeInUp}>
            <h2
              className="mb-4 text-[#1a1a1a] dark:text-white"
              style={{
                fontSize: "clamp(2rem, 5vw, 3rem)",
                fontWeight: 600,
                letterSpacing: "-0.02em",
                lineHeight: 1.2,
              }}
            >
              How we build
            </h2>
            <p
              className="text-[#86868b] max-w-2xl mx-auto"
              style={{ fontSize: "1.0625rem", lineHeight: 1.6 }}
            >
              Our principles guide every decision, from the first sketch to the
              final deploy.
            </p>
          </motion.div>

          <motion.div className="space-y-6" variants={staggerContainer}>
            {[
              {
                title: "Web-first architecture",
                description:
                  "Starting with the web ensures maximum accessibility and reach before adapting to native platforms.",
                icon: <Globe size={24} />,
              },
              {
                title: "Mobile-ready via Capacitor",
                description:
                  "Seamlessly transform web applications into native mobile experiences without compromising quality.",
                icon: <Layers size={24} />,
              },
              {
                title: "Privacy and clarity by default",
                description:
                  "Your data belongs to you. We build with privacy-first principles and transparent practices.",
                icon: <Sparkles size={24} />,
              },
              {
                title: "AI where it adds real value",
                description:
                  "We integrate AI thoughtfully—only where it genuinely enhances the user experience.",
                icon: <Zap size={24} />,
              },
              {
                title: "Built to scale, designed to last",
                description:
                  "Creating sustainable systems that grow with your needs while maintaining performance and reliability.",
                icon: <Code size={24} />,
              },
            ].map((principle, index) => (
              <motion.div
                key={index}
                className="group p-8 rounded-2xl bg-white dark:bg-[#1a1a1a] border border-[#d2d2d7]/20 dark:border-[#2a2a2a]/50 hover:border-[#0071e3]/50 transition-all duration-300"
                variants={scaleIn}
                whileHover={{ x: 8 }}
              >
                <div className="flex gap-6 items-start">
                  <div className="p-3 rounded-xl bg-[#f5f5f7] dark:bg-[#2a2a2a] text-[#0071e3] group-hover:scale-110 transition-transform">
                    {principle.icon}
                  </div>
                  <div className="flex-1">
                    <h3
                      className="mb-2 text-[#1a1a1a] dark:text-white"
                      style={{ fontSize: "1.25rem", fontWeight: 600 }}
                    >
                      {principle.title}
                    </h3>
                    <p
                      className="text-[#86868b]"
                      style={{ fontSize: "1rem", lineHeight: 1.6 }}
                    >
                      {principle.description}
                    </p>
                  </div>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </motion.section>

      {/* FAQ Section */}
      <motion.section
        className="px-6 py-20 md:py-28"
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-100px" }}
        variants={staggerContainer}
      >
        <div className="max-w-3xl mx-auto">
          <motion.h2
            className="mb-16 text-center text-[#1a1a1a] dark:text-white"
            style={{
              fontSize: "clamp(2rem, 5vw, 3rem)",
              fontWeight: 600,
              letterSpacing: "-0.02em",
              lineHeight: 1.2,
            }}
            variants={fadeInUp}
          >
            Frequently asked questions
          </motion.h2>

          <motion.div className="space-y-6" variants={staggerContainer}>
            {[
              {
                question: "Are your products free to use?",
                answer:
                  "Yes, our web apps are free to use with core features. Premium features are available for advanced users who need additional capabilities.",
              },
              {
                question: "How do you handle data privacy?",
                answer:
                  "We follow privacy-by-default principles. Your data is encrypted, stored securely, and never sold to third parties. You have complete control over your information.",
              },
              {
                question: "Can I use these products offline?",
                answer:
                  "Our mobile apps support offline mode with local data sync. Web apps require an internet connection for real-time collaborative features.",
              },
              {
                question: "Do you offer custom solutions?",
                answer:
                  "Yes, we work with select clients on custom product development. Contact us to discuss your specific needs and requirements.",
              },
              {
                question: "What platforms do you support?",
                answer:
                  "All our products are available as web applications. Mobile apps for iOS and Android are available through the App Store and Play Store.",
              },
            ].map((faq, index) => (
              <motion.div
                key={index}
                className="p-6 rounded-2xl bg-[#fbfbfd] dark:bg-[#0a0a0a] border border-[#d2d2d7]/20 dark:border-[#2a2a2a]/50 hover:border-[#0071e3]/30 transition-all duration-300"
                variants={scaleIn}
              >
                <h3
                  className="mb-3 text-[#1a1a1a] dark:text-white"
                  style={{ fontSize: "1.125rem", fontWeight: 600 }}
                >
                  {faq.question}
                </h3>
                <p
                  className="text-[#86868b]"
                  style={{ fontSize: "1rem", lineHeight: 1.6 }}
                >
                  {faq.answer}
                </p>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </motion.section>

      {/* Who We Are Section */}
      <motion.section
        id="who-we-are"
        className="px-6 py-20 md:py-28 bg-[#fbfbfd] dark:bg-[#0a0a0a]"
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-100px" }}
        variants={fadeInUp}
      >
        <div className="max-w-6xl mx-auto">
          <motion.h2
            className="mb-16 text-center text-[#1a1a1a] dark:text-white"
            style={{
              fontSize: "clamp(2rem, 5vw, 3rem)",
              fontWeight: 600,
              letterSpacing: "-0.02em",
              lineHeight: 1.2,
            }}
          >
            Who we are
          </motion.h2>

          <div className="grid md:grid-cols-2 gap-12 md:gap-8 max-w-5xl mx-auto">
            {/* Vishnu's Profile */}
            <div className="text-center flex flex-col items-center h-full p-8 md:p-10 rounded-3xl bg-white dark:bg-[#1a1a1a] shadow-[0_2px_40px_-15px_rgba(0,0,0,0.05)] dark:shadow-none border border-[#d2d2d7]/30 dark:border-[#2a2a2a]/60">
              <motion.div
                className="mb-8 w-28 h-28 rounded-full bg-gradient-to-br from-[#0071e3] to-[#0077ed] flex items-center justify-center text-white shadow-xl"
                style={{ fontSize: "2.5rem", fontWeight: 600 }}
                initial={{ opacity: 0, scale: 0.8 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ delay: 0.2 }}
              >
                V
              </motion.div>

              <div className="min-h-[3.5rem] flex items-center justify-center mb-4">
                <motion.div
                  className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-[#0071e3]/10 dark:bg-[#0071e3]/20 border border-[#0071e3]/20 text-center text-balance"
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.25 }}
                >
                  <span
                    className="text-[#0071e3]"
                    style={{
                      fontSize: "0.8125rem",
                      fontWeight: 600,
                      letterSpacing: "0.05em",
                      lineHeight: 1.4,
                    }}
                  >
                    FOUNDER & CEO
                  </span>
                </motion.div>
              </div>

              <motion.h3
                className="text-[#1a1a1a] dark:text-white mb-6"
                style={{
                  fontSize: "1.75rem",
                  lineHeight: 1.3,
                  fontWeight: 600,
                  letterSpacing: "-0.01em",
                }}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.3 }}
              >
                Vishnu M
              </motion.h3>

              <motion.p
                className="text-[#1a1a1a] dark:text-white mb-6"
                style={{
                  fontSize: "1.0625rem",
                  lineHeight: 1.6,
                  fontWeight: 400,
                }}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.35 }}
              >
                Leading Aignite Technologies from India, Vishnu brings a unique
                vision to software development— one rooted in clarity,
                intentionality, and respect for the people who use our products.
              </motion.p>

              <motion.p
                className="text-[#86868b] mt-auto"
                style={{
                  fontSize: "0.9375rem",
                  lineHeight: 1.6,
                }}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.4 }}
              >
                With years of experience in building web, mobile, and AI-powered
                applications, his approach combines technical excellence with a
                deep understanding of human needs.
              </motion.p>

              <motion.a
                href="https://www.linkedin.com/in/vishnum08/"
                target="_blank"
                rel="noopener noreferrer"
                className="mt-8 flex items-center justify-center gap-2 w-full max-w-[200px] mx-auto py-2.5 px-4 rounded-full border border-[#d2d2d7] dark:border-[#2a2a2a] bg-[#fbfbfd] dark:bg-[#0a0a0a] text-[#1a1a1a] dark:text-white hover:bg-white dark:hover:bg-[#1f1f1f] hover:border-[#0A66C2] dark:hover:border-[#0A66C2] transition-all group"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.45 }}
                title="Connect with Vishnu on LinkedIn"
              >
                <Linkedin
                  size={18}
                  className="text-[#86868b] group-hover:text-[#0A66C2] transition-colors"
                />
                <span style={{ fontSize: "0.875rem", fontWeight: 500 }}>
                  LinkedIn
                </span>
              </motion.a>
            </div>

            {/* Lavanya's Profile */}
            <div className="text-center flex flex-col items-center h-full p-8 md:p-10 rounded-3xl bg-white dark:bg-[#1a1a1a] shadow-[0_2px_40px_-15px_rgba(0,0,0,0.05)] dark:shadow-none border border-[#d2d2d7]/30 dark:border-[#2a2a2a]/60">
              <motion.div
                className="mb-8 w-28 h-28 rounded-full bg-gradient-to-br from-[#34c759] to-[#28a745] flex items-center justify-center text-white shadow-xl"
                style={{ fontSize: "2.5rem", fontWeight: 600 }}
                initial={{ opacity: 0, scale: 0.8 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ delay: 0.3 }}
              >
                L
              </motion.div>

              <div className="min-h-[3.5rem] flex items-center justify-center mb-4">
                <motion.div
                  className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-[#34c759]/10 dark:bg-[#34c759]/20 border border-[#34c759]/20 text-center text-balance"
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.35 }}
                >
                  <span
                    className="text-[#34c759] dark:text-[#4cd964]"
                    style={{
                      fontSize: "0.8125rem",
                      fontWeight: 600,
                      letterSpacing: "0.05em",
                      lineHeight: 1.4,
                    }}
                  >
                    CO-FOUNDER, ADVISOR & QA LEAD
                  </span>
                </motion.div>
              </div>

              <motion.h3
                className="text-[#1a1a1a] dark:text-white mb-6"
                style={{
                  fontSize: "1.75rem",
                  lineHeight: 1.3,
                  fontWeight: 600,
                  letterSpacing: "-0.01em",
                }}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.4 }}
              >
                Lavanya L
              </motion.h3>

              <motion.p
                className="text-[#1a1a1a] dark:text-white mb-6"
                style={{
                  fontSize: "1.0625rem",
                  lineHeight: 1.6,
                  fontWeight: 400,
                }}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.45 }}
              >
                Instrumental to the founding vision of Aignite Technologies,
                Lavanya handles the main testing operations and provides
                strategic guidance that shapes our long-term direction.
              </motion.p>

              <motion.p
                className="text-[#86868b] mt-auto"
                style={{
                  fontSize: "0.9375rem",
                  lineHeight: 1.6,
                }}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.5 }}
              >
                Her insights ensure that as we scale our engineering efforts, we
                remain deeply committed to building human-centered, impactful
                digital products without compromise.
              </motion.p>

              <motion.a
                href="https://www.linkedin.com/in/lavanya2002/"
                target="_blank"
                rel="noopener noreferrer"
                className="mt-8 flex items-center justify-center gap-2 w-full max-w-[200px] mx-auto py-2.5 px-4 rounded-full border border-[#d2d2d7] dark:border-[#2a2a2a] bg-[#fbfbfd] dark:bg-[#0a0a0a] text-[#1a1a1a] dark:text-white hover:bg-white dark:hover:bg-[#1f1f1f] hover:border-[#0A66C2] dark:hover:border-[#0A66C2] transition-all group"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.55 }}
                title="Connect with Lavanya on LinkedIn"
              >
                <Linkedin
                  size={18}
                  className="text-[#86868b] group-hover:text-[#0A66C2] transition-colors"
                />
                <span style={{ fontSize: "0.875rem", fontWeight: 500 }}>
                  LinkedIn
                </span>
              </motion.a>
            </div>
          </div>
        </div>
      </motion.section>

      {/* Contact Section */}
      <motion.section
        id="contact"
        className="px-6 py-20 md:py-28"
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-100px" }}
        variants={fadeInUp}
      >
        <div className="max-w-3xl mx-auto text-center">
          <motion.h2
            className="mb-8 text-[#1a1a1a] dark:text-white"
            style={{
              fontSize: "clamp(2rem, 5vw, 3rem)",
              fontWeight: 600,
              letterSpacing: "-0.02em",
              lineHeight: 1.2,
            }}
          >
            Get in touch
          </motion.h2>

          <motion.p
            className="mb-6 text-[#86868b]"
            style={{
              fontSize: "1.0625rem",
              lineHeight: 1.5,
            }}
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
          >
            For business inquiries, support, or collaboration opportunities:
          </motion.p>

          <motion.a
            href="mailto:admin@theaignite.app"
            className="inline-flex items-center gap-3 px-8 py-4 mb-12 text-[#0071e3] bg-[#f5f5f7] dark:bg-[#2a2a2a] rounded-2xl hover:bg-[#e8e8ed] dark:hover:bg-[#3a3a3a] transition-all"
            style={{
              fontSize: "1.25rem",
              fontWeight: 500,
            }}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.3 }}
            whileHover={{ scale: 1.05 }}
          >
            <ExternalLink size={20} />
            admin@theaignite.app
          </motion.a>

          <motion.p
            className="text-[#86868b]"
            style={{ fontSize: "0.9375rem" }}
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.4 }}
          >
            We typically respond within 24-48 hours.
          </motion.p>
        </div>
      </motion.section>
      {/* Join Us Section */}
      <motion.section
        className="px-6 py-20 md:py-28 bg-[#0071e3] text-white text-center"
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-100px" }}
        variants={fadeInUp}
      >
        <div className="max-w-4xl mx-auto">
          <h2
            className="mb-6"
            style={{
              fontSize: "clamp(2rem, 5vw, 3rem)",
              fontWeight: 600,
              letterSpacing: "-0.02em",
              lineHeight: 1.2,
            }}
          >
            Build the future with us
          </h2>
          <p
            className="mb-10 text-white/80 max-w-2xl mx-auto"
            style={{ fontSize: "1.125rem", lineHeight: 1.6 }}
          >
            We're always looking for passionate engineers and designers who care
            deeply about craft and clarity. If that sounds like you, let's talk.
          </p>
          <a
            href="mailto:careers@theaignite.app"
            className="inline-flex items-center justify-center px-8 py-4 bg-white text-[#0071e3] rounded-full transition-all hover:scale-105 active:scale-[0.98] font-medium"
            style={{ fontSize: "1.125rem" }}
          >
            View open roles
          </a>
        </div>
      </motion.section>

      {/* Polished Footer */}
      <footer className="px-6 py-16 md:py-24 bg-[#fbfbfd] dark:bg-[#111111] border-t border-[#d2d2d7]/50 dark:border-[#2a2a2a]">
        <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-12 lg:gap-8 mb-16">
          <div className="lg:col-span-2">
            <h3
              className="text-[#1a1a1a] dark:text-white mb-4"
              style={{ fontSize: "1.25rem", fontWeight: 600 }}
            >
              Aignite Technologies
            </h3>
            <p
              className="text-[#86868b] max-w-sm mb-8"
              style={{ fontSize: "0.9375rem", lineHeight: 1.6 }}
            >
              Building thoughtful web, mobile, and AI products designed with
              clarity and built for people.
            </p>
            <form
              className="relative max-w-sm"
              onSubmit={(e) => e.preventDefault()}
            >
              <input
                type="email"
                placeholder="Join our newsletter"
                className="w-full bg-white dark:bg-[#0a0a0a] border border-[#d2d2d7] dark:border-[#2a2a2a] rounded-full px-5 py-3 text-sm focus:outline-none focus:border-[#0071e3] dark:focus:border-[#0071e3] transition-colors text-[#1a1a1a] dark:text-white"
                required
              />
              <button
                type="submit"
                className="absolute right-2 top-1/2 -translate-y-1/2 p-2 bg-[#0071e3] text-white rounded-full hover:bg-[#0077ed] transition-colors"
                aria-label="Subscribe to newsletter"
              >
                <ArrowRight size={16} />
              </button>
            </form>
          </div>

          <div>
            <h4 className="text-[#1a1a1a] dark:text-white mb-6 font-semibold">
              Products
            </h4>
            <ul className="space-y-4">
              <li>
                <Link
                  to="/products/peerova"
                  className="text-[#86868b] hover:text-[#0071e3] dark:hover:text-white transition-colors text-sm"
                >
                  Peerova
                </Link>
              </li>
              <li>
                <Link
                  to="/products/kakeibo"
                  className="text-[#86868b] hover:text-[#0071e3] dark:hover:text-white transition-colors text-sm"
                >
                  Kakeibo
                </Link>
              </li>
              <li>
                <span className="text-[#86868b]/50 text-sm cursor-not-allowed">
                  Upcoming Releases
                </span>
              </li>
            </ul>
          </div>

          <div>
            <h4 className="text-[#1a1a1a] dark:text-white mb-6 font-semibold">
              Company
            </h4>
            <ul className="space-y-4">
              <li>
                <a
                  href="#who-we-are"
                  className="text-[#86868b] hover:text-[#0071e3] dark:hover:text-white transition-colors text-sm"
                >
                  About Us
                </a>
              </li>
              <li>
                <Link
                  to="/insights"
                  className="text-[#86868b] hover:text-[#0071e3] dark:hover:text-white transition-colors text-sm"
                >
                  Insights
                </Link>
              </li>
              <li>
                <a
                  href="mailto:admin@theaignite.app"
                  className="text-[#86868b] hover:text-[#0071e3] dark:hover:text-white transition-colors text-sm"
                >
                  Contact
                </a>
              </li>
              <li>
                <a
                  href="#careers"
                  className="text-[#86868b] hover:text-[#0071e3] dark:hover:text-white transition-colors text-sm"
                >
                  Careers
                </a>
              </li>
            </ul>
          </div>

          <div>
            <h4 className="text-[#1a1a1a] dark:text-white mb-6 font-semibold">
              Legal
            </h4>
            <ul className="space-y-4">
              <li>
                <a
                  href="#"
                  className="text-[#86868b] hover:text-[#0071e3] dark:hover:text-white transition-colors text-sm"
                >
                  Privacy Policy
                </a>
              </li>
              <li>
                <a
                  href="#"
                  className="text-[#86868b] hover:text-[#0071e3] dark:hover:text-white transition-colors text-sm"
                >
                  Terms of Service
                </a>
              </li>
            </ul>
          </div>
        </div>

        <div className="max-w-6xl mx-auto pt-8 border-t border-[#d2d2d7]/50 dark:border-[#2a2a2a] flex flex-col md:flex-row justify-between items-center gap-4">
          <div className="text-center md:text-left">
            <p className="text-[#86868b] text-sm mb-1">
              © {new Date().getFullYear()} Aignite Technologies. All rights
              reserved.
            </p>
            <p className="text-[#86868b]" style={{ fontSize: "0.75rem" }}>
              Engineered and designed by{" "}
              <span className="text-[#0071e3] font-medium">LAVISH</span>
            </p>
          </div>
          <div className="flex gap-4">
            <a
              href="https://www.linkedin.com/in/vishnum08/"
              target="_blank"
              rel="noopener noreferrer"
              className="text-[#86868b] hover:text-[#0A66C2] transition-colors"
              title="Vishnu's LinkedIn"
            >
              <Linkedin size={20} />
            </a>
            <a
              href="https://www.linkedin.com/in/lavanya2002/"
              target="_blank"
              rel="noopener noreferrer"
              className="text-[#86868b] hover:text-[#0A66C2] transition-colors"
              title="Lavanya's LinkedIn"
            >
              <Linkedin size={20} />
            </a>
          </div>
        </div>
      </footer>
    </div>
  );
}

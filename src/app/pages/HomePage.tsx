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
} from "lucide-react";
import { Navigation } from "../components/Navigation";
import { CustomCursor } from "../components/CustomCursor";
import { ScrollProgress } from "../components/ScrollProgress";
import { BackToTop } from "../components/BackToTop";
import { ThemeToggle } from "../components/ThemeToggle";
import { SEO } from "../components/SEO";
import { LoadingScreen } from "../components/LoadingScreen";
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
      <LoadingScreen />
      <SEO />
      <CustomCursor />
      <ScrollProgress />
      <Navigation />
      <BackToTop />
      <ThemeToggle />

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

          <motion.h1
            className="mb-6 text-[#1a1a1a] dark:text-white"
            style={{
              fontSize: "clamp(2.5rem, 8vw, 5rem)",
              fontWeight: 600,
              letterSpacing: "-0.02em",
              lineHeight: 1.1,
            }}
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, ease: [0.6, 0.05, 0.01, 0.9] }}
          >
            Aignite Technologies
          </motion.h1>
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
            <a
              href="#products"
              className="inline-flex items-center gap-2 px-7 py-3.5 bg-[#0071e3] text-white rounded-full transition-all hover:bg-[#0077ed] hover:shadow-lg active:scale-[0.98]"
              style={{ fontSize: "1.0625rem", fontWeight: 500 }}
            >
              Explore products
              <ArrowRight size={18} />
            </a>
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
                label: "Launching",
                icon: <Sparkles size={24} />,
              },
              {
                value: "Beta",
                label: "Current Stage",
                icon: <Code size={24} />,
              },
              { value: "India", label: "Based in", icon: <Globe size={24} /> },
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
              className="group bg-white dark:bg-[#1a1a1a] rounded-3xl overflow-hidden shadow-sm border border-[#d2d2d7]/30 dark:border-[#2a2a2a] hover:shadow-2xl hover:-translate-y-2 transition-all duration-500"
              variants={scaleIn}
            >
              <div className="grid md:grid-cols-2 gap-8">
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
                  <div className="flex flex-col sm:flex-row gap-4">
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
                <div className="relative h-64 md:h-auto bg-gradient-to-br from-[#34c759]/10 to-[#34c759]/5 dark:from-[#34c759]/20 dark:to-[#34c759]/10 flex items-center justify-center">
                  {/* Placeholder for product image/screenshot */}
                  <div className="text-center p-8">
                    <Code
                      size={80}
                      className="mx-auto mb-4 text-[#34c759] opacity-40"
                    />
                    <p
                      className="text-[#86868b]"
                      style={{ fontSize: "0.875rem" }}
                    >
                      Product Screenshot
                    </p>
                  </div>
                </div>
              </div>
            </motion.div>

            {/* Product 2: Peerova */}
            <motion.div
              className="group bg-white dark:bg-[#1a1a1a] rounded-3xl overflow-hidden shadow-sm border border-[#d2d2d7]/30 dark:border-[#2a2a2a] hover:shadow-2xl hover:-translate-y-2 transition-all duration-500"
              variants={scaleIn}
            >
              <div className="grid md:grid-cols-2 gap-8">
                <div className="relative h-64 md:h-auto bg-gradient-to-br from-[#0071e3]/10 to-[#0071e3]/5 dark:from-[#0071e3]/20 dark:to-[#0071e3]/10 flex items-center justify-center order-2 md:order-1">
                  {/* Placeholder for product image/screenshot */}
                  <div className="text-center p-8">
                    <Users
                      size={80}
                      className="mx-auto mb-4 text-[#0071e3] opacity-40"
                    />
                    <p
                      className="text-[#86868b]"
                      style={{ fontSize: "0.875rem" }}
                    >
                      Product Screenshot
                    </p>
                  </div>
                </div>
                <div className="p-8 md:p-12 lg:p-16 flex flex-col justify-center order-1 md:order-2">
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
              </div>
            </motion.div>
          </div>
        </div>
      </motion.section>

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
        <div className="max-w-3xl mx-auto text-center">
          <motion.h2
            className="mb-12 text-[#1a1a1a] dark:text-white"
            style={{
              fontSize: "clamp(2rem, 5vw, 3rem)",
              fontWeight: 600,
              letterSpacing: "-0.02em",
              lineHeight: 1.2,
            }}
          >
            Who we are
          </motion.h2>

          <motion.div
            className="mb-12 w-32 h-32 mx-auto rounded-full bg-gradient-to-br from-[#0071e3] to-[#0077ed] flex items-center justify-center text-white shadow-2xl"
            style={{ fontSize: "3rem", fontWeight: 600 }}
            initial={{ opacity: 0, scale: 0.8 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
          >
            V
          </motion.div>

          <motion.div
            className="inline-flex items-center gap-2 px-4 py-1.5 mb-6 rounded-full bg-[#0071e3]/10 dark:bg-[#0071e3]/20 border border-[#0071e3]/20"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.25 }}
          >
            <span
              className="text-[#0071e3]"
              style={{
                fontSize: "0.875rem",
                fontWeight: 600,
                letterSpacing: "0.05em",
              }}
            >
              FOUNDER & CEO
            </span>
          </motion.div>

          <motion.h3
            className="text-[#1a1a1a] dark:text-white mb-8"
            style={{
              fontSize: "2rem",
              lineHeight: 1.3,
              fontWeight: 600,
              letterSpacing: "-0.01em",
            }}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.3 }}
          >
            Vishnu
          </motion.h3>

          <motion.p
            className="text-[#1a1a1a] dark:text-white mb-6"
            style={{
              fontSize: "1.125rem",
              lineHeight: 1.7,
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
            className="text-[#86868b] max-w-2xl mx-auto"
            style={{
              fontSize: "1rem",
              lineHeight: 1.7,
            }}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.4 }}
          >
            With years of experience in building web, mobile, and AI-powered
            applications, his approach combines technical excellence with a deep
            understanding of human needs. Every product reflects a commitment to
            doing fewer things, but doing them extraordinarily well.
          </motion.p>
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

      {/* Footer */}
      <footer className="px-6 py-12 border-t border-[#d2d2d7]/50 dark:border-[#2a2a2a]">
        <div className="max-w-6xl mx-auto">
          <div className="flex flex-col md:flex-row justify-between items-center gap-6 mb-8">
            <div className="text-center md:text-left">
              <p
                className="text-[#1a1a1a] dark:text-white mb-2"
                style={{ fontSize: "1.125rem", fontWeight: 600 }}
              >
                Aignite Technologies
              </p>
              <p className="text-[#86868b]" style={{ fontSize: "0.875rem" }}>
                Building thoughtful technology
              </p>
            </div>

            <nav className="flex flex-wrap justify-center gap-8">
              {[
                { name: "Products", href: "#products" },
                { name: "Insights", href: "/insights" },
                { name: "About", href: "#who-we-are" },
                { name: "Contact", href: "#contact" },
              ].map((link) => (
                <a
                  key={link.name}
                  href={link.href}
                  className="text-[#86868b] hover:text-[#1a1a1a] dark:hover:text-white transition-colors"
                  style={{ fontSize: "0.875rem", fontWeight: 500 }}
                >
                  {link.name}
                </a>
              ))}
            </nav>
          </div>

          <div className="pt-8 border-t border-[#d2d2d7]/30 dark:border-[#2a2a2a] text-center space-y-3">
            <p className="text-[#86868b]" style={{ fontSize: "0.8125rem" }}>
              © 2026 Aignite Technologies. All rights reserved.
            </p>
            <p className="text-[#86868b]" style={{ fontSize: "0.75rem" }}>
              Engineered and designed by{" "}
              <span className="text-[#0071e3] font-medium">LAVISH</span>
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
}

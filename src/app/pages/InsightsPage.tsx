import React from "react";
import { motion } from "motion/react";
import { Calendar, ArrowRight } from "lucide-react";
import { Navigation } from "../components/Navigation";
import { CustomCursor } from "../components/CustomCursor";
import { ScrollProgress } from "../components/ScrollProgress";
import { BackToTop } from "../components/BackToTop";
import { SEO } from "../components/SEO";
import { Link } from "react-router";

import { Variants } from "motion/react";

const fadeInUp: Variants = {
  hidden: { opacity: 0, y: 60 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.8, ease: [0.6, 0.05, 0.01, 0.9] },
  },
};

const staggerContainer = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
    },
  },
};

export default function InsightsPage() {
  const articles = [
    {
      date: "Feb 20, 2026",
      title: "Why We Build With Web-First Architecture",
      excerpt:
        "Our approach to building scalable, accessible applications starts with the web. Here's why.",
      readTime: "5 min read",
      slug: "web-first-architecture",
    },
    {
      date: "Feb 10, 2026",
      title: "The Philosophy Behind Minimal Design",
      excerpt:
        "Restraint in design isn't about removing features—it's about revealing what matters.",
      readTime: "4 min read",
      slug: "minimal-design-philosophy",
    },
    {
      date: "Jan 28, 2026",
      title: "Building AI Products That Respect Users",
      excerpt:
        "AI should enhance human capability, not replace human judgment. Our principles for ethical AI integration.",
      readTime: "6 min read",
      slug: "ethical-ai-products",
    },
    {
      date: "Jan 15, 2026",
      title: "Privacy by Default: A Development Approach",
      excerpt:
        "How we architect applications to protect user privacy from the ground up.",
      readTime: "5 min read",
      slug: "privacy-by-default",
    },
    {
      date: "Dec 30, 2025",
      title: "The Case for Collaborative Learning",
      excerpt:
        "Why we built Peerova and what we've learned about how people learn together.",
      readTime: "7 min read",
      slug: "collaborative-learning",
    },
    {
      date: "Dec 18, 2025",
      title: "Mindful Money Management in the Digital Age",
      excerpt:
        "The Japanese Kakeibo method adapted for modern life—reflections on building Kakeibo.",
      readTime: "6 min read",
      slug: "mindful-money-management",
    },
  ];

  return (
    <div className="min-h-screen bg-white dark:bg-[#1a1a1a]">
      <SEO
        title="Insights - Thoughts on Technology and Design | Aignite Technologies"
        description="Thoughts on building thoughtful products, design philosophy, and technology that serves people."
        keywords="technology insights, product design, software development, thoughtful technology"
      />
      <CustomCursor />
      <ScrollProgress />
      <Navigation />
      <BackToTop />

      {/* Hero Section */}
      <section className="px-6 pt-32 pb-20 md:pt-40 md:pb-28">
        <div className="max-w-4xl mx-auto">
          <motion.div
            initial="hidden"
            animate="visible"
            variants={staggerContainer}
          >
            <motion.h1
              className="mb-6 text-[#1a1a1a] dark:text-white"
              style={{
                fontSize: "clamp(2.5rem, 8vw, 4rem)",
                fontWeight: 600,
                letterSpacing: "-0.02em",
                lineHeight: 1.1,
              }}
              variants={fadeInUp}
            >
              Insights
            </motion.h1>

            <motion.p
              className="text-[#86868b] max-w-2xl"
              style={{
                fontSize: "1.125rem",
                lineHeight: 1.6,
              }}
              variants={fadeInUp}
            >
              Thoughts on building thoughtful products, design philosophy, and
              technology that serves people.
            </motion.p>
          </motion.div>
        </div>
      </section>

      {/* Articles Grid */}
      <motion.section
        className="px-6 py-12 pb-28"
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-100px" }}
        variants={staggerContainer}
      >
        <div className="max-w-6xl mx-auto">
          <motion.div
            className="grid gap-8 md:grid-cols-2"
            variants={staggerContainer}
          >
            {articles.map((article, index) => (
              <motion.article
                key={index}
                className="group p-8 rounded-2xl bg-[#fbfbfd] dark:bg-[#0a0a0a] border border-[#d2d2d7]/20 dark:border-[#2a2a2a]/50 hover:border-[#0071e3]/50 transition-all duration-300 cursor-pointer"
                variants={fadeInUp}
                whileHover={{ y: -4 }}
              >
                <div
                  className="flex items-center gap-3 mb-4 text-[#86868b]"
                  style={{ fontSize: "0.875rem" }}
                >
                  <Calendar size={14} />
                  <span>{article.date}</span>
                  <span>•</span>
                  <span>{article.readTime}</span>
                </div>

                <h2
                  className="mb-3 text-[#1a1a1a] dark:text-white group-hover:text-[#0071e3] transition-colors"
                  style={{
                    fontSize: "1.5rem",
                    fontWeight: 600,
                    lineHeight: 1.3,
                  }}
                >
                  {article.title}
                </h2>

                <p
                  className="mb-6 text-[#86868b]"
                  style={{ fontSize: "1rem", lineHeight: 1.6 }}
                >
                  {article.excerpt}
                </p>

                <div
                  className="flex items-center gap-2 text-[#0071e3] group-hover:gap-3 transition-all"
                  style={{ fontSize: "0.9375rem", fontWeight: 500 }}
                >
                  Read article
                  <ArrowRight size={16} />
                </div>
              </motion.article>
            ))}
          </motion.div>
        </div>
      </motion.section>

      {/* Newsletter CTA */}
      <motion.section
        className="px-6 py-20 md:py-28 bg-[#fbfbfd] dark:bg-[#0a0a0a]"
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
        variants={fadeInUp}
      >
        <div className="max-w-2xl mx-auto text-center">
          <motion.h2
            className="mb-6 text-[#1a1a1a] dark:text-white"
            style={{
              fontSize: "clamp(1.75rem, 4vw, 2.5rem)",
              fontWeight: 600,
              letterSpacing: "-0.02em",
              lineHeight: 1.2,
            }}
          >
            Stay updated
          </motion.h2>

          <motion.p
            className="mb-8 text-[#86868b]"
            style={{ fontSize: "1.0625rem", lineHeight: 1.5 }}
          >
            Get occasional insights on product development, design, and
            thoughtful technology.
          </motion.p>

          <motion.div className="flex flex-col sm:flex-row gap-3 max-w-md mx-auto">
            <input
              type="email"
              placeholder="Enter your email"
              className="flex-1 px-5 py-3 rounded-full bg-white dark:bg-[#1a1a1a] border border-[#d2d2d7] dark:border-[#2a2a2a] focus:outline-none focus:border-[#0071e3] transition-colors"
              style={{ fontSize: "1rem" }}
            />
            <button
              className="px-6 py-3 bg-[#0071e3] text-white rounded-full transition-all hover:bg-[#0077ed] active:scale-[0.98] whitespace-nowrap"
              style={{ fontSize: "1rem", fontWeight: 500 }}
            >
              Subscribe
            </button>
          </motion.div>

          <motion.p
            className="mt-4 text-[#86868b]"
            style={{ fontSize: "0.8125rem" }}
          >
            No spam. Unsubscribe anytime.
          </motion.p>
        </div>
      </motion.section>

      {/* Footer */}
      <footer className="px-6 py-12 border-t border-[#d2d2d7]/50 dark:border-[#2a2a2a]">
        <div className="max-w-6xl mx-auto">
          <div className="flex flex-col md:flex-row justify-between items-center gap-6">
            <p className="text-[#86868b]" style={{ fontSize: "0.875rem" }}>
              © 2026 Aignite Technologies
            </p>

            <nav className="flex gap-8">
              {[
                { name: "Home", href: "/" },
                { name: "Products", href: "/#products" },
                { name: "About", href: "/#who-we-are" },
                { name: "Contact", href: "/#contact" },
              ].map((link) => (
                <a
                  key={link.name}
                  href={link.href}
                  className="text-[#86868b] hover:text-[#1a1a1a] dark:hover:text-white transition-colors"
                  style={{ fontSize: "0.875rem" }}
                >
                  {link.name}
                </a>
              ))}
            </nav>
          </div>
        </div>
      </footer>
    </div>
  );
}

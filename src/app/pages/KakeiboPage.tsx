import React from "react";
import { motion } from "motion/react";
import {
  ArrowLeft,
  ExternalLink,
  Download,
  TrendingUp,
  PieChart,
  Target,
  Shield,
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
  const features = [
    {
      icon: <Target size={24} />,
      title: "Mindful Tracking",
      description:
        "Record expenses with intention. The Kakeibo method encourages reflection on your spending patterns.",
    },
    {
      icon: <PieChart size={24} />,
      title: "Clear Categories",
      description:
        "Organize spending into four simple categories: Survival, Optional, Culture, and Extra.",
    },
    {
      icon: <TrendingUp size={24} />,
      title: "Monthly Goals",
      description:
        "Set savings targets and track progress throughout the month with visual insights.",
    },
    {
      icon: <Shield size={24} />,
      title: "Privacy First",
      description:
        "Your financial data stays yours. No tracking, no ads, no data selling.",
    },
  ];

  return (
    <div className="min-h-screen bg-white dark:bg-[#1a1a1a]">
      <SEO
        title="Kakeibo - Mindful Expense Tracker | Aignite Technologies"
        description="A mindful expense tracker inspired by the Japanese Kakeibo method. Understand your money with clarity."
        keywords="Kakeibo, expense tracker, budgeting, mindful money, Japanese budgeting method"
      />

      {/* Hero Section */}
      <section className="px-6 pt-32 pb-20 md:pt-40 md:pb-28">
        <div className="max-w-5xl mx-auto">
          <Link
            to="/"
            className="inline-flex items-center gap-2 mb-8 text-[#86868b] hover:text-[#1a1a1a] dark:hover:text-white transition-colors"
            style={{ fontSize: "0.9375rem", fontWeight: 500 }}
          >
            <ArrowLeft size={18} />
            Back to home
          </Link>

          <motion.div
            initial="hidden"
            animate="visible"
            variants={staggerContainer}
          >
            <motion.h1
              className="mb-6 text-[#1a1a1a] dark:text-white"
              style={{
                fontSize: "clamp(2.5rem, 8vw, 4.5rem)",
                fontWeight: 600,
                letterSpacing: "-0.02em",
                lineHeight: 1.1,
              }}
              variants={fadeInUp}
            >
              Kakeibo
            </motion.h1>

            <motion.p
              className="mb-5 text-[#1a1a1a] dark:text-white"
              style={{
                fontSize: "clamp(1.25rem, 3vw, 2rem)",
                fontWeight: 500,
                lineHeight: 1.3,
              }}
              variants={fadeInUp}
            >
              Understand your money.
            </motion.p>

            <motion.p
              className="mb-12 text-[#86868b] max-w-2xl"
              style={{
                fontSize: "1.125rem",
                lineHeight: 1.6,
              }}
              variants={fadeInUp}
            >
              Inspired by the century-old Japanese Kakeibo method, this mindful
              expense tracker helps you develop a healthier relationship with
              money through reflection and intentional spending.
            </motion.p>

            <motion.div
              className="flex flex-col sm:flex-row gap-4"
              variants={fadeInUp}
            >
              <a
                href="#"
                className="inline-flex items-center gap-2 px-7 py-3.5 bg-[#0071e3] text-white rounded-full transition-all hover:bg-[#0077ed] active:scale-[0.98]"
                style={{ fontSize: "1.0625rem", fontWeight: 500 }}
              >
                <ExternalLink size={18} />
                Open web app
              </a>
              <a
                href="#"
                className="inline-flex items-center gap-2 px-7 py-3.5 bg-transparent text-[#0071e3] border border-[#0071e3] rounded-full transition-all hover:bg-[#0071e3]/5 active:scale-[0.98]"
                style={{ fontSize: "1.0625rem", fontWeight: 500 }}
              >
                <Download size={18} />
                Download app
              </a>
            </motion.div>
          </motion.div>
        </div>

        {/* Concrete Hero Asset */}
        <motion.div
          className="max-w-6xl mx-auto mt-20 px-6"
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
        >
          <div className="relative rounded-3xl overflow-hidden shadow-2xl border border-[#d2d2d7]/30 dark:border-[#2a2a2a] bg-[#f5f5f7] dark:bg-[#0a0a0a] aspect-[16/9] md:aspect-[21/9]">
            <img
              src="/assets/kakeibo.png"
              alt="Kakeibo Mindful Expense Dashboard interface mockup"
              className="absolute inset-0 w-full h-full object-cover object-top"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/20 via-transparent to-transparent pointer-events-none" />
          </div>
        </motion.div>
      </section>

      {/* Features Section */}
      <motion.section
        className="px-6 py-20 md:py-28 bg-[#fbfbfd] dark:bg-[#0a0a0a]"
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-100px" }}
        variants={staggerContainer}
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
            variants={fadeInUp}
          >
            Simplicity meets intention
          </motion.h2>

          <motion.div
            className="grid gap-8 md:grid-cols-2"
            variants={staggerContainer}
          >
            {features.map((feature, index) => (
              <motion.div
                key={index}
                className="p-8 rounded-2xl bg-white dark:bg-[#1a1a1a] border border-[#d2d2d7]/20 dark:border-[#2a2a2a]/50 hover:border-[#0071e3]/50 transition-all duration-300"
                variants={fadeInUp}
                whileHover={{ scale: 1.02, y: -4 }}
              >
                <div className="mb-4 text-[#0071e3]">{feature.icon}</div>
                <h3
                  className="mb-3 text-[#1a1a1a] dark:text-white"
                  style={{ fontSize: "1.25rem", fontWeight: 600 }}
                >
                  {feature.title}
                </h3>
                <p
                  className="text-[#86868b]"
                  style={{ fontSize: "1rem", lineHeight: 1.6 }}
                >
                  {feature.description}
                </p>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </motion.section>

      {/* Philosophy Section */}
      <motion.section
        className="px-6 py-20 md:py-28"
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-100px" }}
        variants={fadeInUp}
      >
        <div className="max-w-3xl mx-auto">
          <motion.h2
            className="mb-12 text-center text-[#1a1a1a] dark:text-white"
            style={{
              fontSize: "clamp(2rem, 5vw, 3rem)",
              fontWeight: 600,
              letterSpacing: "-0.02em",
              lineHeight: 1.2,
            }}
          >
            The Kakeibo philosophy
          </motion.h2>

          <motion.div className="space-y-8">
            <div className="p-8 rounded-2xl bg-[#fbfbfd] dark:bg-[#0a0a0a] border border-[#d2d2d7]/20 dark:border-[#2a2a2a]/50">
              <p
                className="text-[#1a1a1a] dark:text-white mb-4"
                style={{ fontSize: "1.125rem", lineHeight: 1.6 }}
              >
                Kakeibo (家計簿) literally means "household financial ledger."
                Created in 1904, it's a simple, mindful approach to managing
                money that asks four key questions:
              </p>
              <ul
                className="space-y-3 text-[#86868b]"
                style={{ fontSize: "1rem", lineHeight: 1.6 }}
              >
                <li className="pl-4 border-l-2 border-[#0071e3]">
                  How much money do you have available?
                </li>
                <li className="pl-4 border-l-2 border-[#0071e3]">
                  How much would you like to save?
                </li>
                <li className="pl-4 border-l-2 border-[#0071e3]">
                  How much are you spending?
                </li>
                <li className="pl-4 border-l-2 border-[#0071e3]">
                  How can you improve?
                </li>
              </ul>
            </div>
          </motion.div>
        </div>
      </motion.section>

      {/* How It Works Section */}
      <motion.section
        className="px-6 py-20 md:py-28 bg-[#fbfbfd] dark:bg-[#0a0a0a]"
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-100px" }}
        variants={staggerContainer}
      >
        <div className="max-w-4xl mx-auto">
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
            How it works
          </motion.h2>

          <motion.div className="space-y-6" variants={staggerContainer}>
            {[
              {
                step: "01",
                title: "Set your monthly budget",
                description:
                  "Start each month by defining your income and savings goals.",
              },
              {
                step: "02",
                title: "Track daily expenses",
                description:
                  "Record purchases mindfully, categorizing them as you go.",
              },
              {
                step: "03",
                title: "Review and reflect",
                description:
                  "At month's end, review your spending patterns and adjust for next month.",
              },
              {
                step: "04",
                title: "Build better habits",
                description:
                  "Over time, develop a natural awareness of your financial choices.",
              },
            ].map((item, index) => (
              <motion.div
                key={index}
                className="flex gap-6 p-6 rounded-2xl bg-white dark:bg-[#1a1a1a] border border-[#d2d2d7]/20 dark:border-[#2a2a2a]/50"
                variants={fadeInUp}
              >
                <div
                  className="text-[#0071e3] shrink-0"
                  style={{ fontSize: "2rem", fontWeight: 600, lineHeight: 1 }}
                >
                  {item.step}
                </div>
                <div>
                  <h3
                    className="mb-2 text-[#1a1a1a] dark:text-white"
                    style={{ fontSize: "1.25rem", fontWeight: 600 }}
                  >
                    {item.title}
                  </h3>
                  <p
                    className="text-[#86868b]"
                    style={{ fontSize: "1rem", lineHeight: 1.6 }}
                  >
                    {item.description}
                  </p>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </motion.section>

      {/* CTA Section */}
      <motion.section
        className="px-6 py-20 md:py-28"
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
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
            Start your financial journey
          </motion.h2>

          <motion.p
            className="mb-10 text-[#86868b]"
            style={{ fontSize: "1.0625rem", lineHeight: 1.5 }}
          >
            Take control of your finances with mindfulness and clarity.
          </motion.p>

          <motion.div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a
              href="#"
              className="inline-flex items-center gap-2 px-7 py-3.5 bg-[#0071e3] text-white rounded-full transition-all hover:bg-[#0077ed] active:scale-[0.98]"
              style={{ fontSize: "1.0625rem", fontWeight: 500 }}
            >
              <ExternalLink size={18} />
              Launch web app
            </a>
          </motion.div>
        </div>
      </motion.section>

      {/* Footer */}
      <footer className="px-6 py-12 border-t border-[#d2d2d7]/50 dark:border-[#2a2a2a]">
        <div className="max-w-6xl mx-auto text-center">
          <Link
            to="/"
            className="text-[#86868b] hover:text-[#1a1a1a] dark:hover:text-white transition-colors"
            style={{ fontSize: "0.875rem" }}
          >
            © 2026 Aignite Technologies
          </Link>
        </div>
      </footer>
    </div>
  );
}

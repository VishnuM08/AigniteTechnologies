import React from "react";
import { motion } from "motion/react";
import {
  ArrowLeft,
  ExternalLink,
  Download,
  Video,
  MessageCircle,
  Users,
  Calendar,
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

const staggerContainer = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.15,
    },
  },
};

export default function PeerovaPage() {
  const features = [
    {
      icon: <Users size={24} />,
      title: "Study Rooms",
      description:
        "Create collaborative spaces where your study group can focus together, share resources, and stay motivated.",
    },
    {
      icon: <Video size={24} />,
      title: "Video Calls",
      description:
        "Built-in video calling to discuss complex topics face-to-face without leaving the platform.",
    },
    {
      icon: <MessageCircle size={24} />,
      title: "Real-time Chat",
      description:
        "Instant messaging to quickly share ideas, ask questions, and coordinate with your study partners.",
    },
    {
      icon: <Calendar size={24} />,
      title: "Session Planning",
      description:
        "Schedule study sessions, set goals, and track your learning progress over time.",
    },
  ];

  return (
    <div className="min-h-screen bg-white dark:bg-[#1a1a1a]">
      <SEO
        title="Peerova - Collaborative Learning Platform | Aignite Technologies"
        description="A collaborative study platform with rooms, video calls, and chat. Learn together with Peerova."
        keywords="Peerova, collaborative learning, study platform, video calls, study groups"
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
              Peerova
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
              Learn together.
            </motion.p>

            <motion.p
              className="mb-12 text-[#86868b] max-w-2xl"
              style={{
                fontSize: "1.125rem",
                lineHeight: 1.6,
              }}
              variants={fadeInUp}
            >
              Peerova is a collaborative study platform designed to bring
              students together in focused, productive environments. Connect
              with peers, share knowledge, and achieve your learning goals as a
              team.
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

        {/* Concrete Hero Asset / Playstore Announcement */}
        <motion.div
          className="max-w-6xl mx-auto mt-20 px-6"
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
        >
          <div className="relative rounded-3xl overflow-hidden shadow-2xl border border-[#d2d2d7]/30 dark:border-[#2a2a2a] bg-gradient-to-br from-[#0071e3]/10 to-[#0071e3]/5 dark:from-[#0071e3]/20 dark:to-[#0071e3]/10 aspect-[16/9] md:aspect-[21/9] flex flex-col items-center justify-center group">
            {/* Image Placeholder (User can drop <img src="..." /> here later) */}
            <div className="absolute inset-0 flex items-center justify-center opacity-30">
              <div className="text-center">
                <Users size={64} className="mx-auto mb-3 text-[#0071e3]" />
                <span className="text-lg font-medium text-[#0071e3]">
                  Hero Image Slot
                </span>
              </div>
            </div>

            {/* Floating Glassmorphic Playstore Badge */}
            <motion.div
              className="absolute top-6 left-6 md:top-10 md:left-10 z-10 flex items-center gap-3 px-5 py-3 bg-white/70 dark:bg-black/70 backdrop-blur-md rounded-full border border-white/20 dark:border-white/10 shadow-lg cursor-default"
              initial={{ y: 0 }}
              whileHover={{ y: -2, scale: 1.05 }}
              transition={{ type: "spring", stiffness: 400, damping: 25 }}
            >
              <Download size={20} className="text-[#0071e3]" />
              <span
                className="text-[#1a1a1a] dark:text-white"
                style={{ fontSize: "1rem", fontWeight: 600 }}
              >
                Coming to Playstore
              </span>
            </motion.div>
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
            Everything you need to learn together
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

      {/* Use Cases Section */}
      <motion.section
        className="px-6 py-20 md:py-28"
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
            Built for how you learn
          </motion.h2>

          <motion.div className="space-y-8" variants={staggerContainer}>
            {[
              {
                title: "Study Groups",
                description:
                  "Form dedicated study groups for your courses and collaborate on assignments, projects, and exam preparation.",
              },
              {
                title: "Remote Learning",
                description:
                  "Stay connected with classmates and study partners regardless of location with seamless video and chat.",
              },
              {
                title: "Tutoring Sessions",
                description:
                  "Host one-on-one or group tutoring sessions with integrated tools for real-time collaboration.",
              },
              {
                title: "Language Exchange",
                description:
                  "Practice languages with native speakers in structured conversation rooms with scheduling tools.",
              },
            ].map((useCase, index) => (
              <motion.div
                key={index}
                className="p-6 rounded-2xl bg-[#fbfbfd] dark:bg-[#0a0a0a] border border-[#d2d2d7]/20 dark:border-[#2a2a2a]/50"
                variants={fadeInUp}
              >
                <h3
                  className="mb-2 text-[#1a1a1a] dark:text-white"
                  style={{ fontSize: "1.125rem", fontWeight: 600 }}
                >
                  {useCase.title}
                </h3>
                <p
                  className="text-[#86868b]"
                  style={{ fontSize: "1rem", lineHeight: 1.6 }}
                >
                  {useCase.description}
                </p>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </motion.section>

      {/* CTA Section */}
      <motion.section
        className="px-6 py-20 md:py-28 bg-[#fbfbfd] dark:bg-[#0a0a0a]"
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
            Start learning together today
          </motion.h2>

          <motion.p
            className="mb-10 text-[#86868b]"
            style={{ fontSize: "1.0625rem", lineHeight: 1.5 }}
          >
            Join thousands of students already using Peerova to achieve their
            learning goals.
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

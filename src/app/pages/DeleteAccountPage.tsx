import React from "react";
import { motion } from "motion/react";
import {
  ArrowLeft,
  Trash2,
  Mail,
  ShieldAlert,
  Database,
  HelpCircle,
} from "lucide-react";
import { Link } from "react-router";
import { SEO } from "../components/SEO";
import { Variants } from "motion/react";

const fadeInUp: Variants = {
  hidden: { opacity: 0, y: 40 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, ease: [0.6, 0.05, 0.01, 0.9] },
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

export default function DeleteAccountPage() {
  const sections = [
    {
      id: "how-to-delete",
      title: "How to Delete Your Account",
      icon: <Trash2 className="text-[#0071e3] w-6 h-6 mb-4" />,
      content: (
        <ol className="list-decimal pl-5 space-y-3">
          <li>
            Open the <strong>Kakeibo</strong> app
          </li>
          <li>
            Go to <strong>Settings</strong> → <strong>Delete Account</strong>
          </li>
          <li>Enter the OTP sent to your registered email</li>
          <li>Confirm the deletion request</li>
        </ol>
      ),
    },
    {
      id: "what-is-deleted",
      title: "What Data Will Be Deleted",
      icon: <Database className="text-[#ff3b30] w-6 h-6 mb-4" />,
      content: (
        <ul className="list-disc pl-5 space-y-3">
          <li>User account information (name, email)</li>
          <li>Expenses</li>
          <li>Budgets</li>
          <li>Savings goals</li>
          <li>Recurring expenses</li>
        </ul>
      ),
    },
    {
      id: "data-retention",
      title: "Data Retention",
      icon: <ShieldAlert className="text-[#34c759] w-6 h-6 mb-4" />,
      content: (
        <p>
          Once an account deletion request is confirmed, all associated personal
          and financial data is permanently removed from our servers in
          compliance with data safety regulations.
        </p>
      ),
    },
    {
      id: "need-help",
      title: "Need Help?",
      icon: <HelpCircle className="text-[#ff9500] w-6 h-6 mb-4" />,
      content: (
        <>
          <p className="mb-4">
            If you cannot access your account, you may request account deletion
            by contacting our support team directly:
          </p>
          <div className="flex items-center gap-3 bg-white dark:bg-[#1a1a1a] p-4 rounded-xl border border-[#d2d2d7]/50 dark:border-[#2a2a2a]/60 w-fit">
            <Mail className="text-[#0071e3] w-5 h-5 flex-shrink-0" />
            <a
              href="mailto:support@theaignite.app"
              className="text-[#0071e3] hover:underline font-medium"
            >
              support@theaignite.app
            </a>
          </div>
        </>
      ),
    },
  ];

  return (
    <div className="min-h-screen bg-white dark:bg-[#111111] transition-colors duration-300">
      <SEO
        title="Delete Account | Kakeibo"
        description="Instructions on how to request account deletion and data removal for Kakeibo."
        keywords="delete account, data deletion, privacy, kakeibo data safety"
      />

      {/* Header */}
      <section className="px-6 pt-32 pb-16 md:pt-40 md:pb-24 border-b border-[#d2d2d7]/30 dark:border-[#2a2a2a]">
        <div className="max-w-3xl mx-auto">
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
            <motion.div
              className="flex items-center gap-3 mb-6 text-[#ff3b30]"
              variants={fadeInUp}
            >
              <Trash2 size={28} />
              <span className="font-semibold tracking-wide uppercase text-sm">
                Data Safety
              </span>
            </motion.div>

            <motion.h1
              className="mb-8 text-[#1a1a1a] dark:text-white"
              style={{
                fontSize: "clamp(2.5rem, 6vw, 4rem)",
                fontWeight: 600,
                letterSpacing: "-0.02em",
                lineHeight: 1.1,
              }}
              variants={fadeInUp}
            >
              Delete Your Kakeibo Account
            </motion.h1>

            <motion.p
              className="text-[#86868b] text-lg md:text-xl font-medium max-w-2xl"
              variants={fadeInUp}
            >
              If you would like to permanently delete your Kakeibo account and
              associated data, you can request deletion directly from the mobile
              app or using the web process below.
            </motion.p>
          </motion.div>
        </div>
      </section>

      {/* Content */}
      <section className="px-6 py-16 md:py-24 bg-[#fbfbfd] dark:bg-[#111111]">
        <div className="max-w-3xl mx-auto">
          <motion.div
            className="grid gap-12"
            initial="hidden"
            animate="visible"
            variants={staggerContainer}
          >
            {sections.map((section) => (
              <motion.div
                key={section.id}
                variants={fadeInUp}
                className="bg-white dark:bg-[#161618] p-8 md:p-10 rounded-3xl shadow-sm border border-[#d2d2d7]/30 dark:border-[#2a2a2a]"
                id={section.id}
              >
                {section.icon}
                <h2 className="text-2xl md:text-3xl text-[#1a1a1a] dark:text-white mb-6 font-semibold tracking-tight">
                  {section.title}
                </h2>
                <div className="text-base md:text-lg leading-relaxed text-[#424245] dark:text-[#a1a1a6] prose dark:prose-invert max-w-none">
                  {section.content}
                </div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Footer */}
      <footer className="px-6 py-12 border-t border-[#d2d2d7]/50 dark:border-[#2a2a2a] bg-white dark:bg-[#111111]">
        <div className="max-w-6xl mx-auto text-center flex flex-col justify-center items-center gap-4">
          <p className="text-[#86868b]" style={{ fontSize: "0.875rem" }}>
            © {new Date().getFullYear()} Aignite Technologies
          </p>
        </div>
      </footer>
    </div>
  );
}

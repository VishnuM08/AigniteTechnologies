import React from "react";
import { motion } from "motion/react";
import { ArrowLeft, Shield, Clock } from "lucide-react";
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

export default function AignitePrivacyPolicyPage() {
  const sections = [
    {
      id: "introduction",
      title: "1. Introduction",
      content: (
        <>
          <p className="mb-4">
            Welcome to Aignite Technologies ("we," "us," or "our"). This Privacy
            Policy explains how we collect, use, and protect your personal
            information across all our websites, applications, and services.
          </p>
          <p>
            By using our general website and our suite of products, you agree to
            the collection and use of information in accordance with this
            policy. We build our products with privacy as a fundamental
            principle, prioritizing the security and confidentiality of your
            data.
          </p>
        </>
      ),
    },
    {
      id: "information-we-collect",
      title: "2. Information We Collect",
      content: (
        <>
          <p className="mb-4">
            When you visit our website or use our services, we may collect the
            following types of information:
          </p>
          <ul className="list-disc pl-5 space-y-2 mb-4">
            <li>
              <strong>Contact Information:</strong> When you subscribe to our
              newsletter or contact us, we collect your email address and any
              other details you provide.
            </li>
            <li>
              <strong>Usage Data:</strong> We may collect non-personally
              identifiable information on how our websites and services are
              accessed and used to improve user experience.
            </li>
            <li>
              <strong>Device Information:</strong> We may collect basic
              analytics such as browser type, operating system, and pages
              visited to understand our audience better.
            </li>
          </ul>
        </>
      ),
    },
    {
      id: "how-we-use-information",
      title: "3. How We Use Information",
      content: (
        <>
          <p className="mb-4">The information we collect is used to:</p>
          <ul className="list-disc pl-5 space-y-2">
            <li>Provide, operate, and maintain our websites and services.</li>
            <li>
              Respond to your comments, questions, and provide customer service.
            </li>
            <li>
              Send you technical notices, updates, security alerts, and
              administrative messages.
            </li>
            <li>
              Communicate with you about products, services, and events offered
              by Aignite Technologies.
            </li>
          </ul>
        </>
      ),
    },
    {
      id: "data-security",
      title: "4. Data Security",
      content: (
        <>
          <p className="mb-4">
            We implement robust security measures to protect your personal
            information. Transmission over the internet is secured using
            encryption (HTTPS/SSL), and data is stored on secure servers with
            restricted access.
          </p>
          <p>
            However, no system is perfectly secure. We continuously monitor and
            improve our security protocols, but we cannot guarantee absolute
            security of your data.
          </p>
        </>
      ),
    },
    {
      id: "third-party-services",
      title: "5. Third-Party Services",
      content: (
        <>
          <p>
            We do not sell, trade, or rent your personal identification
            information to others. We may use trusted third-party service
            providers (such as hosting or analytics platforms) who assist us in
            operating our business and websites. These parties are obligated to
            keep your information confidential and use it only for the specific
            services they provide to us.
          </p>
        </>
      ),
    },
    {
      id: "product-specific-policies",
      title: "6. Product-Specific Policies",
      content: (
        <>
          <p>
            Certain applications built by Aignite Technologies, such as Kakeibo
            or Peerova, may have their own specific privacy policies detailing
            the unique data they handle (e.g., financial data or communication
            logs). Where a product-specific policy exists, it will supersede
            this general policy for that specific app.
          </p>
        </>
      ),
    },
    {
      id: "contact-information",
      title: "7. Contact Information",
      content: (
        <>
          <p className="mb-4">
            If you have any questions or concerns regarding this Privacy Policy
            or our overall privacy practices, please contact us:
          </p>
          <div className="bg-[#f5f5f7] dark:bg-[#1a1a1a] p-6 rounded-2xl border border-[#d2d2d7]/30 dark:border-[#2a2a2a]/60 mt-6">
            <ul className="space-y-3">
              <li>
                <strong>Company:</strong> Aignite Technologies
              </li>
              <li>
                <strong>Owner:</strong> Vishnu Magesh
              </li>
              <li>
                <strong>Country:</strong> India
              </li>
              <li>
                <strong>Email:</strong>{" "}
                <a
                  href="mailto:admin@theaignite.app"
                  className="text-[#0071e3] hover:underline"
                >
                  admin@theaignite.app
                </a>
              </li>
            </ul>
          </div>
        </>
      ),
    },
  ];

  return (
    <div className="min-h-screen bg-white dark:bg-[#111111] transition-colors duration-300">
      <SEO
        title="Privacy Policy | Aignite Technologies"
        description="General Privacy Policy for Aignite Technologies, detailing our commitment to user privacy and data protection."
        keywords="privacy policy, data protection, security, Aignite Technologies"
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
              className="flex items-center gap-3 mb-6 text-[#0071e3]"
              variants={fadeInUp}
            >
              <Shield size={28} />
              <span className="font-semibold tracking-wide uppercase text-sm">
                Legal
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
              Privacy Policy
            </motion.h1>

            <motion.p
              className="text-[#86868b] text-xl md:text-2xl mb-8 font-medium"
              variants={fadeInUp}
            >
              Aignite Technologies
            </motion.p>

            <motion.div
              className="flex items-center gap-2 text-[#86868b] bg-[#f5f5f7] dark:bg-[#1a1a1a] w-fit px-4 py-2 rounded-full border border-[#d2d2d7]/50 dark:border-[#2a2a2a]"
              variants={fadeInUp}
            >
              <Clock size={16} />
              <span style={{ fontSize: "0.875rem", fontWeight: 500 }}>
                Last Updated: March 9, 2026
              </span>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* Content */}
      <section className="px-6 py-16 md:py-24">
        <div className="max-w-3xl mx-auto">
          <motion.div
            className="prose prose-lg dark:prose-invert max-w-none prose-headings:font-semibold prose-headings:tracking-tight prose-a:text-[#0071e3] hover:prose-a:text-[#0077ed] prose-p:text-[#424245] dark:prose-p:text-[#a1a1a6] prose-li:text-[#424245] dark:prose-li:text-[#a1a1a6]"
            initial="hidden"
            animate="visible"
            variants={staggerContainer}
          >
            <motion.p
              className="text-lg md:text-xl text-[#1a1a1a] dark:text-[#f5f5f7] mb-12 font-medium"
              variants={fadeInUp}
            >
              We believe privacy is a fundamental human right. Our products are
              engineered with privacy by default, ensuring your data is handled
              securely and transparently.
            </motion.p>

            {sections.map((section) => (
              <motion.div
                key={section.id}
                variants={fadeInUp}
                className="mb-14 scroll-mt-24"
                id={section.id}
              >
                <h2 className="text-2xl md:text-3xl text-[#1a1a1a] dark:text-white mb-6 border-b border-[#d2d2d7]/30 dark:border-[#2a2a2a] pb-4">
                  {section.title}
                </h2>
                <div className="text-base md:text-lg leading-relaxed text-[#424245] dark:text-[#a1a1a6]">
                  {section.content}
                </div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Short Footer matching app vibe */}
      <footer className="px-6 py-12 border-t border-[#d2d2d7]/50 dark:border-[#2a2a2a] bg-[#fbfbfd] dark:bg-[#111111]">
        <div className="max-w-6xl mx-auto text-center flex flex-col sm:flex-row justify-between items-center gap-4">
          <p className="text-[#86868b]" style={{ fontSize: "0.875rem" }}>
            © {new Date().getFullYear()} Aignite Technologies
          </p>
        </div>
      </footer>
    </div>
  );
}

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

export default function PrivacyPolicyPage() {
  const sections = [
    {
      id: "introduction",
      title: "1. Introduction",
      content: (
        <>
          <p className="mb-4">
            Welcome to Kakeibo: Mindful Finance Tracker, operated by Aignite
            Technologies ("we," "us," or "our"). We are committed to protecting
            your privacy and ensuring you have a positive experience on our
            mobile application and related services.
          </p>
          <p>
            This Privacy Policy outlines how we collect, use, store, and share
            your personal information when you use our Kakeibo Android
            application. By using our services, you agree to the collection and
            use of information in accordance with this policy.
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
            We may collect the following types of information to provide and
            improve our services:
          </p>
          <ul className="list-disc pl-5 space-y-2 mb-4">
            <li>
              <strong>Account Information:</strong> We collect your email
              address when you create an account to log in and sync your data.
            </li>
            <li>
              <strong>Financial Data:</strong> We collect expense and budgeting
              data entered by you, such as categories, amounts, and descriptions
              of your transactions, to provide the core functionality of the
              Kakeibo method.
            </li>
            <li>
              <strong>Device Information:</strong> We may collect basic device
              information (such as device model, operating system version, and
              unique device identifiers) necessary for app functionality,
              debugging, and improving performance.
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
          <p className="mb-4">
            The information we collect is used solely for the following
            purposes:
          </p>
          <ul className="list-disc pl-5 space-y-2">
            <li>
              To provide, maintain, and improve the Kakeibo app's functionality
              and your user experience.
            </li>
            <li>
              To manage your account, authenticate you upon login, and sync your
              financial data securely across your devices.
            </li>
            <li>To provide user support and respond to your inquiries.</li>
            <li>To monitor usage trends and debug technical issues.</li>
          </ul>
          <p className="mt-4">
            <strong>Importantly:</strong> Your financial data is used
            exclusively to provide you with insights and budgeting features
            within the app. We do not use your financial data for advertising
            profiling.
          </p>
        </>
      ),
    },
    {
      id: "data-storage-and-security",
      title: "4. Data Storage and Security",
      content: (
        <>
          <p className="mb-4">
            Security is a core principle for us. All data transmitted between
            your device and our servers is encrypted in transit using
            industry-standard secure protocols (HTTPS).
          </p>
          <p>
            We utilize secure cloud infrastructure (including AWS EC2 and
            PostgreSQL databases) to host our services and store your data.
            While we implement strong technical architectures to protect your
            information, please be aware that no method of electronic
            transmission or data storage is 100% secure.
          </p>
        </>
      ),
    },
    {
      id: "data-sharing",
      title: "5. Data Sharing",
      content: (
        <>
          <p className="mb-4">
            We value your privacy.{" "}
            <strong>
              We do not sell, rent, or trade your personal or financial data to
              third parties.
            </strong>
          </p>
          <p>
            Your information may only be shared in the following limited
            circumstances:
          </p>
          <ul className="list-disc pl-5 space-y-2 mt-4">
            <li>
              To comply with legal obligations, valid subpoenas, or court
              orders.
            </li>
            <li>
              To protect our rights, prevent fraud, or address security or
              technical issues.
            </li>
          </ul>
        </>
      ),
    },
    {
      id: "third-party-services",
      title: "6. Third-Party Services",
      content: (
        <>
          <p>
            Our app may rely on third-party service providers to facilitate our
            services (e.g., hosting providers like AWS). These providers only
            have access to perform these specific tasks on our behalf and are
            obligated not to disclose or use your information for any other
            purpose.
          </p>
        </>
      ),
    },
    {
      id: "user-data-control",
      title: "7. User Data Control",
      content: (
        <>
          <p>
            You retain full control over your data. You can access, update, or
            request the deletion of your personal account and financial data at
            any time through the app settings or by contacting our support team.
            Upon your request to delete your account, we will erase all your
            personal and financial data from our active databases.
          </p>
        </>
      ),
    },
    {
      id: "childrens-privacy",
      title: "8. Children's Privacy",
      content: (
        <>
          <p>
            Our services do not target, and are not intended to attract,
            individuals under the age of 13. We do not knowingly collect
            personal information from children under 13. If we become aware that
            we have inadvertently received personal information from a visitor
            under the age of 13, we will delete the information from our
            records.
          </p>
        </>
      ),
    },
    {
      id: "changes-to-privacy-policy",
      title: "9. Changes to Privacy Policy",
      content: (
        <>
          <p>
            We may update our Privacy Policy periodically to reflect changes in
            our practices or for other operational, legal, or regulatory
            reasons. We will notify you of any material changes by updating the
            "Last Updated" date on this page. We encourage you to review this
            policy periodically.
          </p>
        </>
      ),
    },
    {
      id: "contact-information",
      title: "10. Contact Information",
      content: (
        <>
          <p className="mb-4">
            If you have any questions or concerns regarding this Privacy Policy
            or our privacy practices, please contact us:
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
                <strong>Support Email:</strong>{" "}
                <a
                  href="mailto:support@theaignite.app"
                  className="text-[#0071e3] hover:underline"
                >
                  support@theaignite.app
                </a>
              </li>
              <li>
                <strong>Admin Email:</strong>{" "}
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
        title="Privacy Policy | Kakeibo App | Aignite Technologies"
        description="Privacy Policy for Kakeibo: Mindful Finance Tracker. Learn how we collect, use, and protect your data."
        keywords="privacy policy, Kakeibo app, physical data, data protection, Aignite Technologies"
      />

      {/* Header */}
      <section className="px-6 pt-32 pb-16 md:pt-40 md:pb-24 border-b border-[#d2d2d7]/30 dark:border-[#2a2a2a]">
        <div className="max-w-3xl mx-auto">
          <Link
            to="/products/kakeibo"
            className="inline-flex items-center gap-2 mb-8 text-[#86868b] hover:text-[#1a1a1a] dark:hover:text-white transition-colors"
            style={{ fontSize: "0.9375rem", fontWeight: 500 }}
          >
            <ArrowLeft size={18} />
            Back to Kakeibo
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
              Kakeibo: Mindful Finance Tracker
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
              Your privacy is fundamentally important to us. This policy
              outlines our commitment to protecting your personal and financial
              information while you use the Kakeibo tracking app.
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
          <Link
            to="/"
            className="text-[#0071e3] hover:underline"
            style={{ fontSize: "0.875rem" }}
          >
            Back to main website
          </Link>
        </div>
      </footer>
    </div>
  );
}

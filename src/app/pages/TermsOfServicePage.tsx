import React from "react";
import { motion } from "motion/react";
import { ArrowLeft, FileText, Clock } from "lucide-react";
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

export default function TermsOfServicePage() {
  const sections = [
    {
      id: "agreement-to-terms",
      title: "1. Agreement to Terms",
      content: (
        <>
          <p className="mb-4">
            These Terms of Service ("Terms") constitute a legally binding
            agreement made between you, whether personally or on behalf of an
            entity ("you"), and Aignite Technologies ("we," "us," or "our"),
            concerning your access to and use of our products, websites, and
            associated services.
          </p>
          <p>
            By accessing or using our services, you agree that you have read,
            understood, and agreed to be bound by all of these Terms. If you do
            not agree with all of these Terms, then you are expressly prohibited
            from using our services and you must discontinue use immediately.
          </p>
        </>
      ),
    },
    {
      id: "intellectual-property",
      title: "2. Intellectual Property Rights",
      content: (
        <>
          <p className="mb-4">
            Unless otherwise indicated, the Site and our Products (including
            Kakeibo, Peerova, and future software) are our proprietary property.
            All source code, databases, functionality, software, website
            designs, audio, video, text, photographs, and graphics on our
            platforms (collectively, the "Content") and the trademarks, service
            marks, and logos contained therein (the "Marks") are owned or
            controlled by us or licensed to us.
          </p>
          <p>
            Except as expressly provided in these Terms, no part of our
            services, Content, or Marks may be copied, reproduced, aggregated,
            republished, uploaded, posted, publicly displayed, encoded,
            translated, transmitted, distributed, sold, licensed, or otherwise
            exploited for any commercial purpose whatsoever, without our express
            prior written permission.
          </p>
        </>
      ),
    },
    {
      id: "user-representations",
      title: "3. User Representations",
      content: (
        <>
          <p className="mb-4">
            By using our services, you represent and warrant that:
          </p>
          <ul className="list-disc pl-5 space-y-2">
            <li>
              You have the legal capacity and you agree to comply with these
              Terms.
            </li>
            <li>
              You are not a minor in the jurisdiction in which you reside.
            </li>
            <li>
              You will not access the services through automated or non-human
              means, whether through a bot, script, or otherwise.
            </li>
            <li>
              You will not use our services for any illegal or unauthorized
              purpose.
            </li>
            <li>
              Your use of the services will not violate any applicable law or
              regulation.
            </li>
          </ul>
        </>
      ),
    },
    {
      id: "prohibited-activities",
      title: "4. Prohibited Activities",
      content: (
        <>
          <p className="mb-4">
            You may not access or use our services for any purpose other than
            that for which we make the services available. The services may not
            be used in connection with any commercial endeavors except those
            that are specifically endorsed or approved by us. As a user of our
            services, you agree not to:
          </p>
          <ul className="list-disc pl-5 space-y-2">
            <li>
              Systematically retrieve data or other content from the services to
              create or compile a collection, compilation, database, or
              directory without written permission from us.
            </li>
            <li>
              Trick, defraud, or mislead us and other users, especially in any
              attempt to learn sensitive account information such as user
              passwords.
            </li>
            <li>
              Circumvent, disable, or otherwise interfere with security-related
              features of the services.
            </li>
            <li>
              Disparage, tarnish, or otherwise harm, in our opinion, us and/or
              our services.
            </li>
            <li>
              Use any information obtained from the services in order to harass,
              abuse, or harm another person.
            </li>
          </ul>
        </>
      ),
    },
    {
      id: "modifications-and-interruptions",
      title: "5. Modifications and Interruptions",
      content: (
        <>
          <p className="mb-4">
            We reserve the right to change, modify, or remove the contents of
            our services at any time or for any reason at our sole discretion
            without notice. However, we have no obligation to update any
            information on our services. We also reserve the right to modify or
            discontinue all or part of our services without notice at any time.
          </p>
          <p>
            We will not be liable to you or any third party for any
            modification, price change, suspension, or discontinuance of the
            services. We cannot guarantee our services will be available at all
            times. We may experience hardware, software, or other problems or
            need to perform maintenance resulting in interruptions, delays, or
            errors.
          </p>
        </>
      ),
    },
    {
      id: "governing-law",
      title: "6. Governing Law",
      content: (
        <>
          <p>
            These Terms shall be governed by and defined following the laws of
            India. Aignite Technologies and yourself irrevocably consent that
            the courts of India shall have exclusive jurisdiction to resolve any
            dispute which may arise in connection with these Terms.
          </p>
        </>
      ),
    },
    {
      id: "contact-us",
      title: "7. Contact Us",
      content: (
        <>
          <p className="mb-4">
            In order to resolve a complaint regarding the services or to receive
            further information regarding use of the services, please contact us
            at:
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
        title="Terms of Service | Aignite Technologies"
        description="Terms of Service and usage conditions for Aignite Technologies products and websites."
        keywords="terms of service, tos, conditions of use, legal, Aignite Technologies"
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
              <FileText size={28} />
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
              Terms of Service
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
              Please read these terms carefully before using our software or
              services. They outline the rules and guidelines for engaging with
              Aignite Technologies products.
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

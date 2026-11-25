import React, { useState } from "react";
import { motion } from "motion/react";
import { ArrowLeft, Shield, Clock, ChevronDown, ChevronUp, Check, ExternalLink } from "lucide-react";
import { Link } from "react-router";
import { SEO } from "../components/SEO";
import { Variants } from "motion/react";

const fadeInUp: Variants = {
  hidden: { opacity: 0, y: 30 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.5, ease: [0.6, 0.05, 0.01, 0.9] },
  },
};

const staggerContainer = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.08,
    },
  },
};

export default function PengokuPrivacyPolicyPage() {
  const [isTocOpen, setIsTocOpen] = useState(false);

  const sections = [
    {
      id: "introduction",
      number: "1",
      title: "Introduction",
      content: (
        <>
          <p className="mb-4">
            AIgnite Technologies ("we," "us," or "our") operates the mobile game Pengoku ("the App")
            and its associated online services, available at{" "}
            <a href="https://theaignite.app" target="_blank" rel="noopener noreferrer" className="text-[#0071e3] hover:underline">
              https://theaignite.app
            </a>.
          </p>
          <p className="mb-4">
            This Privacy Policy explains how we collect, use, store, and disclose information when you download,
            install, and play Pengoku on Android devices.
          </p>
          <p>
            By downloading, accessing, or playing Pengoku, you acknowledge that you have read and understood this
            Privacy Policy. If you do not agree with any part of this policy, please do not use the application or its online services.
          </p>
        </>
      ),
    },
    {
      id: "information-stored-on-device",
      number: "2",
      title: "Information Stored Locally on Your Device",
      content: (
        <>
          <p className="mb-4">
            Pengoku is designed with local-first privacy. The core gameplay operates offline without requiring an account or network connection.
            The following data is stored exclusively on your device using Android Jetpack DataStore and Room local database:
          </p>
          <ul className="list-disc pl-5 space-y-2 mb-4">
            <li><strong>Level Progress & Stars:</strong> Unlocked campaign chapters, completed levels, best completion times, and star ratings.</li>
            <li><strong>In-Progress Board Snapshots:</strong> Temporary board state and timer for the level you are currently solving, allowing you to resume seamlessly.</li>
            <li><strong>Player Preferences:</strong> Audio volume, haptic feedback toggles, theme settings (Day, Night, or System), and display modes (2D / 3D).</li>
            <li><strong>In-Game Currency & Collectibles:</strong> Fish currency balance, rescued sanctuary animals, and unlocked cosmetic skins.</li>
          </ul>
          <p>
            None of this on-device gameplay data is transmitted to or stored on our servers unless you explicitly sign in to Google Play Games Services for online leaderboards.
            Uninstalling the game or clearing app storage in Android Settings permanently deletes all local data from your device.
          </p>
        </>
      ),
    },
    {
      id: "play-games-and-leaderboards",
      number: "3",
      title: "Google Play Games Services and Online Leaderboards",
      content: (
        <>
          <p className="mb-4">
            Signing in to Google Play Games Services is completely optional. If you choose to sign in to compete on global, weekly, or daily leaderboards:
          </p>
          <ul className="list-disc pl-5 space-y-2 mb-4">
            <li>
              <strong>Profile Information:</strong> We receive your Google Play Games pseudonymised player ID and public display name via the Google Play Games v2 SDK. We do not receive your email address, phone number, or real identity.
            </li>
            <li>
              <strong>Gameplay Verification Data:</strong> When you complete a puzzle run while signed in, the app submits your completion time (in milliseconds), hearts remaining, final score, and the chronological sequence of moves (row, column, action type, timestamp). This move log is processed solely by our backend anti-cheat engine to verify score integrity and prevent automated tampering.
            </li>
            <li>
              <strong>Server Location:</strong> Leaderboard scores, player display names, and move validation logs are securely stored on servers operated by Amazon Web Services (AWS) in the Mumbai (ap-south-1) region, India.
            </li>
            <li>
              <strong>Public Visibility:</strong> Your Play Games public display name and puzzle scores are publicly visible to other players on global, daily, and weekly leaderboards.
            </li>
          </ul>
        </>
      ),
    },
    {
      id: "advertising",
      number: "4",
      title: "Advertising",
      content: (
        <>
          <p className="mb-4">
            Pengoku displays in-game advertisements provided by Google AdMob to support the development and maintenance of the game:
          </p>
          <ul className="list-disc pl-5 space-y-2 mb-4">
            <li>
              <strong>Data Processed:</strong> Google AdMob and its advertising technology partners may collect and process device identifiers (such as the Google Advertising ID), IP address, coarse location, and app interaction data to serve, personalise, and measure the effectiveness of advertisements.
            </li>
            <li>
              <strong>European Privacy Regulations (EEA, UK & Switzerland):</strong> Prior to displaying ads to users in the European Economic Area, the United Kingdom, and Switzerland, consent is obtained via Google's User Messaging Platform (UMP) consent SDK. Users can grant, customize, or revoke their consent preferences at any time within the in-game Settings menu.
            </li>
            <li>
              <strong>Opt-Out & Reset:</strong> You can reset or delete your Android Advertising ID at any time through your device settings: <em>Settings &gt; Google &gt; Ads &gt; Reset advertising ID / Delete advertising ID</em>.
            </li>
            <li>
              <strong>Remove Ads:</strong> Players who purchase the in-game "Remove Ads" item have banner and interstitial ads permanently deactivated.
            </li>
          </ul>
          <p>
            For more information on how Google uses data from partner apps, please review Google's Partner Privacy Policy:{" "}
            <a
              href="https://policies.google.com/technologies/partner-sites"
              target="_blank"
              rel="noopener noreferrer"
              className="text-[#0071e3] hover:underline inline-flex items-center gap-1"
            >
              How Google uses information from sites or apps that use our services <ExternalLink size={14} />
            </a>.
          </p>
        </>
      ),
    },
    {
      id: "analytics",
      number: "5",
      title: "Analytics",
      content: (
        <>
          <p className="mb-4">
            We use Google Analytics for Firebase to understand gameplay patterns, diagnose stability issues, and improve puzzle balance:
          </p>
          <ul className="list-disc pl-5 space-y-2 mb-4">
            <li>
              <strong>Events Collected:</strong> Gameplay telemetry such as levels started, levels completed, puzzle abandon rates, screen views, and session duration.
            </li>
            <li>
              <strong>Device Metrics:</strong> Device model, operating system version, app version, approximate geographic region (country level), and Firebase installation ID.
            </li>
            <li>
              <strong>No Personal Profiling:</strong> Analytics telemetry is aggregated and pseudonymous. We do not link Firebase analytics with your real identity or external accounts.
            </li>
          </ul>
          <p>
            Learn more about Firebase data protection in the{" "}
            <a
              href="https://firebase.google.com/support/privacy"
              target="_blank"
              rel="noopener noreferrer"
              className="text-[#0071e3] hover:underline inline-flex items-center gap-1"
            >
              Firebase Privacy and Security Documentation <ExternalLink size={14} />
            </a>.
          </p>
        </>
      ),
    },
    {
      id: "in-app-purchases",
      number: "6",
      title: "In-App Purchases",
      content: (
        <>
          <p className="mb-4">
            Pengoku offers optional in-app purchases (such as cosmetic items, fish packs, or ad-removal) fulfilled through the Google Play In-App Billing library.
          </p>
          <p className="mb-4">
            <strong>Payment Security:</strong> All financial transactions and payment processing are handled exclusively by Google Play. AIgnite Technologies never receives, collects, or stores your credit card numbers, bank details, or billing addresses.
          </p>
          <p className="mb-6">
            We receive only an encrypted digital receipt and purchase token from Google Play confirming that a transaction succeeded, enabling us to entitle the purchased items to your game.
          </p>

          {/* Clean Data Table for Sections 3-6 */}
          <div className="mt-8 mb-4">
            <h3 className="text-xl font-semibold text-[#1a1a1a] dark:text-white mb-4">
              Summary of Third-Party Data Processing
            </h3>
            <div className="overflow-x-auto rounded-xl border border-[#d2d2d7]/50 dark:border-[#2a2a2a] bg-white dark:bg-[#1a1a1a]">
              <table className="w-full text-left text-sm">
                <thead className="bg-[#f5f5f7] dark:bg-[#222222] text-[#1a1a1a] dark:text-white border-b border-[#d2d2d7]/50 dark:border-[#2a2a2a]">
                  <tr>
                    <th className="py-3 px-4 font-semibold">Data Category</th>
                    <th className="py-3 px-4 font-semibold">Purpose</th>
                    <th className="py-3 px-4 font-semibold">Shared With</th>
                    <th className="py-3 px-4 font-semibold">Stored Where</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-[#d2d2d7]/30 dark:divide-[#2a2a2a] text-[#424245] dark:text-[#a1a1a6]">
                  <tr>
                    <td className="py-3 px-4 font-medium text-[#1a1a1a] dark:text-white">Play Games ID & Display Name</td>
                    <td className="py-3 px-4">Optional online leaderboard ranking and player identification</td>
                    <td className="py-3 px-4">Google LLC & Public Players</td>
                    <td className="py-3 px-4">AWS Mumbai (India)</td>
                  </tr>
                  <tr>
                    <td className="py-3 px-4 font-medium text-[#1a1a1a] dark:text-white">Puzzle Scores & Move Logs</td>
                    <td className="py-3 px-4">Score verification, anti-cheat validation, and leaderboard ranking</td>
                    <td className="py-3 px-4">AWS Infrastructure (Private)</td>
                    <td className="py-3 px-4">AWS Mumbai (India)</td>
                  </tr>
                  <tr>
                    <td className="py-3 px-4 font-medium text-[#1a1a1a] dark:text-white">Advertising ID & Diagnostics</td>
                    <td className="py-3 px-4">Serving, frequency capping, and measurement of AdMob ads</td>
                    <td className="py-3 px-4">Google LLC (AdMob)</td>
                    <td className="py-3 px-4">Google Global Data Centers</td>
                  </tr>
                  <tr>
                    <td className="py-3 px-4 font-medium text-[#1a1a1a] dark:text-white">Usage Events & Device Model</td>
                    <td className="py-3 px-4">Aggregated crash diagnostics, telemetry, and game tuning</td>
                    <td className="py-3 px-4">Google LLC (Firebase)</td>
                    <td className="py-3 px-4">Google Global Data Centers</td>
                  </tr>
                  <tr>
                    <td className="py-3 px-4 font-medium text-[#1a1a1a] dark:text-white">Purchase Tokens & Status</td>
                    <td className="py-3 px-4">Validating item ownership and unlocking purchased features</td>
                    <td className="py-3 px-4">Google Play Billing</td>
                    <td className="py-3 px-4">Google Servers / On-Device</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </>
      ),
    },
    {
      id: "server-logs-and-security",
      number: "7",
      title: "Server Logs and System Security",
      content: (
        <>
          <p className="mb-4">
            When your application connects to our backend API endpoints (such as submitting leaderboard scores or checking server status),
            our servers temporarily process standard web request metadata:
          </p>
          <ul className="list-disc pl-5 space-y-2 mb-4">
            <li>Internet Protocol (IP) address.</li>
            <li>Date, time, and duration of the connection.</li>
            <li>HTTP request payload, response status code, and app version header.</li>
          </ul>
          <p>
            These server logs are retained strictly for security monitoring, detecting Distributed Denial of Service (DDoS) attempts,
            preventing automated score spoofing, and debugging network connectivity. Logs are routinely rotated and purged.
          </p>
        </>
      ),
    },
    {
      id: "how-we-use-information",
      number: "8",
      title: "How We Use Information",
      content: (
        <>
          <p className="mb-4">We use the collected information strictly for the following purposes:</p>
          <ul className="list-disc pl-5 space-y-2">
            <li>To provide, operate, and maintain Pengoku and its puzzle mechanics.</li>
            <li>To verify puzzle move sequences and calculate fair, cheat-free global and daily leaderboards.</li>
            <li>To deliver in-game rewards, hints, and revives earned through rewarded advertising.</li>
            <li>To diagnose performance bottlenecks, optimize battery and rendering performance, and fix crashes.</li>
            <li>To process and restore purchased virtual goods.</li>
            <li>To detect, investigate, and prevent fraudulent activity and policy violations.</li>
            <li>To comply with statutory legal and regulatory obligations.</li>
          </ul>
        </>
      ),
    },
    {
      id: "legal-bases",
      number: "9",
      title: "Legal Bases for Processing (EEA / UK Users)",
      content: (
        <>
          <p className="mb-4">
            If you are located in the European Economic Area (EEA) or the United Kingdom, our legal grounds for processing personal data under the General Data Protection Regulation (GDPR) and UK GDPR are:
          </p>
          <ul className="list-disc pl-5 space-y-2">
            <li>
              <strong>Performance of a Contract:</strong> Providing online leaderboard participation, validating scores, and fulfilling purchased digital items upon your request.
            </li>
            <li>
              <strong>Legitimate Interests:</strong> Securing our infrastructure, enforcing anti-cheat rules, analyzing game health, and preventing fraudulent abuse.
            </li>
            <li>
              <strong>Consent:</strong> Serving personalized advertisements and accessing mobile advertising identifiers where required by law, as collected through the UMP consent dialog.
            </li>
            <li>
              <strong>Legal Compliance:</strong> Retaining records where mandatory under applicable financial, tax, or legal disclosure requirements.
            </li>
          </ul>
        </>
      ),
    },
    {
      id: "sharing-and-disclosure",
      number: "10",
      title: "Data Sharing and Disclosure",
      content: (
        <>
          <p className="mb-4">
            AIgnite Technologies does not sell, rent, monetize, or trade your personal information to third parties. We share data only in the following specific circumstances:
          </p>
          <ul className="list-disc pl-5 space-y-2 mb-4">
            <li>
              <strong>Cloud and Infrastructure Providers:</strong> Amazon Web Services (AWS) hosts our backend validation services and leaderboard databases under strict confidentiality and data protection agreements.
            </li>
            <li>
              <strong>Google Platforms:</strong> Google LLC provides Google Play Services, AdMob advertising, and Firebase analytics under their respective enterprise security standards.
            </li>
            <li>
              <strong>Public Leaderboards:</strong> Your Play Games public display name and puzzle scores are visible to other players of Pengoku.
            </li>
            <li>
              <strong>Legal Requirements:</strong> We may disclose information if required to do so by applicable law, court order, or governmental authority, or to protect the safety, rights, and property of AIgnite Technologies, our players, or the public.
            </li>
          </ul>
        </>
      ),
    },
    {
      id: "delete-data",
      number: "11",
      title: "Data Retention and Deletion",
      content: (
        <>
          <p className="mb-4">
            We retain your data only for as long as necessary to provide the game's features and satisfy the purposes outlined in this policy:
          </p>
          <ul className="list-disc pl-5 space-y-2 mb-4">
            <li>
              <strong>Leaderboard Cycles:</strong> Daily and weekly rankings automatically expire and rotate according to the leaderboard schedule. Historical top rankings and verified global campaign scores remain stored while your player account is active.
            </li>
            <li>
              <strong>On-Device Data:</strong> All local campaign progress, stars, settings, and coins are deleted immediately when you uninstall Pengoku or clear the application storage in Android Settings.
            </li>
            <li>
              <strong>Online Data Deletion in App:</strong> You can purge your online leaderboard records directly inside the game by opening <em>Settings &gt; Delete my online data</em>.
            </li>
            <li>
              <strong>Deletion by Email Request:</strong> You can also request complete deletion of your online player profile, scores, and move logs by sending an email to{" "}
              <a href="mailto:admin@theaignite.app" className="text-[#0071e3] hover:underline font-medium">
                admin@theaignite.app
              </a>{" "}
              with the subject line:
            </li>
          </ul>
          <div className="bg-[#f5f5f7] dark:bg-[#1a1a1a] p-4 rounded-xl border border-[#d2d2d7]/50 dark:border-[#2a2a2a] my-4 text-sm">
            <p className="font-mono text-[#1a1a1a] dark:text-white">
              Subject: Delete my Pengoku data
            </p>
            <p className="text-[#86868b] mt-1">
              Please include your Google Play Games public display name in the message body so we can verify and locate your records.
            </p>
          </div>
          <p>
            Upon receipt of a verified deletion request, we will permanently remove your player record, scores, and associated logs from our production databases within 30 calendar days.
          </p>
        </>
      ),
    },
    {
      id: "data-security",
      number: "12",
      title: "Data Security",
      content: (
        <>
          <p className="mb-4">
            We take administrative, technical, and physical measures to safeguard your information against unauthorized access, loss, or alteration:
          </p>
          <ul className="list-disc pl-5 space-y-2 mb-4">
            <li>All network communications between the Pengoku mobile client and our servers are encrypted in transit using industry-standard Transport Layer Security (HTTPS / TLS 1.3).</li>
            <li>Production databases are isolated in private subnets with restricted firewall access and tokenized authentication.</li>
            <li>Internal access to score logs and administrative utilities is restricted strictly to authorized engineering personnel.</li>
          </ul>
          <p>
            While we apply stringent security practices, no method of electronic transmission or cloud storage is 100% secure, and we cannot guarantee absolute security.
          </p>
        </>
      ),
    },
    {
      id: "international-transfers",
      number: "13",
      title: "International Data Transfers",
      content: (
        <>
          <p className="mb-4">
            AIgnite Technologies is headquartered in India. Our primary leaderboard and anti-cheat infrastructure is hosted on Amazon Web Services in Mumbai, India.
            If you access Pengoku from outside India (including the EEA, UK, United States, or other jurisdictions), your information will be transferred to, stored,
            and processed in India and in data centers operated globally by Google.
          </p>
          <p>
            Where cross-border data transfers occur from the EEA or UK, we ensure adequate protections are in place through standard contractual clauses,
            reliance on adequacy decisions, or enterprise vendor compliance frameworks.
          </p>
        </>
      ),
    },
    {
      id: "childrens-privacy",
      number: "14",
      title: "Children's Privacy",
      content: (
        <>
          <p className="mb-4">
            Pengoku is a general audience logic puzzle game and is not directed to children under 13 years of age (or under 16 in the European Union).
          </p>
          <p className="mb-4">
            We do not knowingly collect, solicit, or maintain personally identifiable information from children under 13.
            If you are a parent or legal guardian and discover that your child has provided personal information or participated in online leaderboards without your consent,
            please contact us immediately at{" "}
            <a href="mailto:admin@theaignite.app" className="text-[#0071e3] hover:underline">
              admin@theaignite.app
            </a>.
          </p>
          <p>
            Upon notification, we will promptly verify and delete such information from our servers.
          </p>
        </>
      ),
    },
    {
      id: "your-rights",
      number: "15",
      title: "Your Privacy Rights",
      content: (
        <>
          <p className="mb-4">
            Depending on your geographic location and applicable local data protection legislation (including India's Digital Personal Data Protection Act 2023,
            the EU/UK GDPR, California Consumer Privacy Act / CPRA, and similar privacy regulations), you have specific statutory rights:
          </p>
          <ul className="list-disc pl-5 space-y-2 mb-4">
            <li><strong>Right to Access:</strong> Request a confirmation and copy of the personal information we maintain about you.</li>
            <li><strong>Right to Rectification:</strong> Request correction of inaccurate or incomplete records.</li>
            <li><strong>Right to Erasure:</strong> Request the deletion of your online player profile and leaderboard scores (see section 11).</li>
            <li><strong>Right to Restrict or Object:</strong> Object to or request restriction of certain processing activities.</li>
            <li><strong>Right to Withdraw Consent:</strong> Revoke consent for personalized advertising at any time via in-game Settings.</li>
            <li><strong>Right to Lodge a Complaint:</strong> Lodge a complaint with your jurisdiction's competent data protection supervisory authority.</li>
          </ul>
          <p>
            To exercise any of these statutory rights, please email us at{" "}
            <a href="mailto:admin@theaignite.app" className="text-[#0071e3] hover:underline font-medium">
              admin@theaignite.app
            </a>.
            We will verify your request and respond within 30 calendar days at no cost to you.
          </p>
        </>
      ),
    },
    {
      id: "changes-to-policy",
      number: "16",
      title: "Changes to This Privacy Policy",
      content: (
        <>
          <p className="mb-4">
            We may periodically update this Privacy Policy to reflect modifications to Pengoku's gameplay, our privacy practices, or legal and regulatory standards.
          </p>
          <p className="mb-4">
            Any revisions will be posted on this page with an updated "Last updated" date at the top.
            For material changes affecting your rights, we will provide prominent notice inside the mobile application or through in-game notifications prior to the change taking effect.
          </p>
          <p>
            We encourage you to review this Privacy Policy periodically to stay informed about how we safeguard your information.
          </p>
        </>
      ),
    },
    {
      id: "contact-us",
      number: "17",
      title: "Contact Us",
      content: (
        <>
          <p className="mb-4">
            If you have questions, comments, or data privacy requests concerning Pengoku or this Privacy Policy, please reach out to our team:
          </p>
          <div className="bg-[#f5f5f7] dark:bg-[#1a1a1a] p-6 rounded-2xl border border-[#d2d2d7]/50 dark:border-[#2a2a2a] mt-4">
            <ul className="space-y-3 text-sm md:text-base">
              <li>
                <strong className="text-[#1a1a1a] dark:text-white">Entity:</strong>{" "}
                <span className="text-[#424245] dark:text-[#a1a1a6]">AIgnite Technologies</span>
              </li>
              <li>
                <strong className="text-[#1a1a1a] dark:text-white">Website:</strong>{" "}
                <a href="https://theaignite.app" className="text-[#0071e3] hover:underline" target="_blank" rel="noopener noreferrer">
                  https://theaignite.app
                </a>
              </li>
              <li>
                <strong className="text-[#1a1a1a] dark:text-white">Email:</strong>{" "}
                <a href="mailto:admin@theaignite.app" className="text-[#0071e3] hover:underline font-medium">
                  admin@theaignite.app
                </a>
              </li>
              <li>
                <strong className="text-[#1a1a1a] dark:text-white">Location:</strong>{" "}
                <span className="text-[#424245] dark:text-[#a1a1a6]">Tamil Nadu, India</span>
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
        title="Pengoku Privacy Policy | AIgnite Technologies"
        description="Official Privacy Policy for Pengoku Android game, operated by AIgnite Technologies. Learn how your data, leaderboards, and privacy rights are handled."
        keywords="Pengoku, Privacy Policy, AIgnite Technologies, Pengoku Android, logic puzzle game, data privacy"
      />

      {/* Hero / Header Section */}
      <section className="px-6 pt-32 pb-14 md:pt-40 md:pb-20 border-b border-[#d2d2d7]/30 dark:border-[#2a2a2a]">
        <div className="max-w-3xl mx-auto">
          <Link
            to="/"
            className="inline-flex items-center gap-2 mb-8 text-[#86868b] hover:text-[#1a1a1a] dark:hover:text-white transition-colors"
            style={{ fontSize: "0.9375rem", fontWeight: 500 }}
          >
            <ArrowLeft size={18} />
            Back to home
          </Link>

          <motion.div initial="hidden" animate="visible" variants={staggerContainer}>
            <motion.div className="flex items-center gap-3 mb-6 text-[#0071e3]" variants={fadeInUp}>
              <Shield size={28} />
              <span className="font-semibold tracking-wide uppercase text-sm">Legal &amp; Privacy</span>
            </motion.div>

            <motion.h1
              className="mb-4 text-[#1a1a1a] dark:text-white"
              style={{
                fontSize: "clamp(2.5rem, 6vw, 4rem)",
                fontWeight: 600,
                letterSpacing: "-0.02em",
                lineHeight: 1.1,
              }}
              variants={fadeInUp}
            >
              Pengoku Privacy Policy
            </motion.h1>

            <motion.p className="text-[#86868b] text-xl md:text-2xl mb-8 font-medium" variants={fadeInUp}>
              AIgnite Technologies
            </motion.p>

            <motion.div className="flex flex-wrap items-center gap-3 text-[#86868b]" variants={fadeInUp}>
              <div className="flex items-center gap-2 bg-[#f5f5f7] dark:bg-[#1a1a1a] px-4 py-2 rounded-full border border-[#d2d2d7]/50 dark:border-[#2a2a2a]">
                <Clock size={16} />
                <span style={{ fontSize: "0.875rem", fontWeight: 500 }}>
                  Effective date: 23 November 2026
                </span>
              </div>
              <div className="flex items-center gap-2 bg-[#f5f5f7] dark:bg-[#1a1a1a] px-4 py-2 rounded-full border border-[#d2d2d7]/50 dark:border-[#2a2a2a]">
                <Clock size={16} />
                <span style={{ fontSize: "0.875rem", fontWeight: 500 }}>
                  Last updated: 23 November 2026
                </span>
              </div>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* Main Content Area */}
      <section className="px-6 py-14 md:py-20">
        <div className="max-w-3xl mx-auto">
          {/* Summary Box: Privacy at a Glance */}
          <div className="bg-[#f5f5f7] dark:bg-[#1a1a1a] rounded-2xl p-6 md:p-8 mb-12 border border-[#d2d2d7]/50 dark:border-[#2a2a2a] shadow-sm">
            <h2 className="text-xl md:text-2xl font-semibold text-[#1a1a1a] dark:text-white mb-4 flex items-center gap-2">
              <Shield size={22} className="text-[#0071e3]" />
              Privacy at a Glance
            </h2>
            <ul className="space-y-3 text-sm md:text-base text-[#424245] dark:text-[#a1a1a6]">
              <li className="flex items-start gap-3">
                <span className="p-1 rounded-full bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 mt-0.5">
                  <Check size={16} strokeWidth={2.5} />
                </span>
                <span><strong>Progress stays on your device:</strong> Puzzles, coins, cosmetics, and settings are saved locally and never sent to our servers.</span>
              </li>
              <li className="flex items-start gap-3">
                <span className="p-1 rounded-full bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 mt-0.5">
                  <Check size={16} strokeWidth={2.5} />
                </span>
                <span><strong>Optional Play Games sign-in:</strong> Used exclusively for public leaderboards and cheat-free score ranking.</span>
              </li>
              <li className="flex items-start gap-3">
                <span className="p-1 rounded-full bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 mt-0.5">
                  <Check size={16} strokeWidth={2.5} />
                </span>
                <span><strong>Transparent advertising:</strong> Ads provided by Google AdMob with GDPR/UMP consent management and easy opt-out controls.</span>
              </li>
              <li className="flex items-start gap-3">
                <span className="p-1 rounded-full bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 mt-0.5">
                  <Check size={16} strokeWidth={2.5} />
                </span>
                <span><strong>We never sell your data:</strong> We do not sell, rent, or trade your personal information to third parties. Ever.</span>
              </li>
            </ul>
          </div>

          {/* Table of Contents */}
          <div className="mb-14 rounded-2xl border border-[#d2d2d7]/50 dark:border-[#2a2a2a] bg-[#fbfbfd] dark:bg-[#161616] p-6">
            <button
              onClick={() => setIsTocOpen(!isTocOpen)}
              className="flex items-center justify-between w-full text-left font-semibold text-[#1a1a1a] dark:text-white"
            >
              <span className="text-lg">Table of Contents</span>
              <span className="text-[#86868b]">
                {isTocOpen ? <ChevronUp size={20} /> : <ChevronDown size={20} />}
              </span>
            </button>
            <div className={`mt-4 ${isTocOpen ? "block" : "hidden md:block"}`}>
              <ol className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-sm text-[#86868b] pt-2 border-t border-[#d2d2d7]/30 dark:border-[#2a2a2a]">
                {sections.map((section) => (
                  <li key={section.id}>
                    <a
                      href={`#${section.id}`}
                      className="hover:text-[#0071e3] dark:hover:text-white transition-colors flex items-baseline gap-1.5 py-1"
                    >
                      <span className="font-mono text-xs text-[#0071e3]">{section.number}.</span>
                      <span>{section.title}</span>
                    </a>
                  </li>
                ))}
              </ol>
            </div>
          </div>

          {/* Policy Sections */}
          <div className="prose prose-lg dark:prose-invert max-w-none prose-headings:font-semibold prose-headings:tracking-tight prose-a:text-[#0071e3] hover:prose-a:text-[#0077ed] prose-p:text-[#424245] dark:prose-p:text-[#a1a1a6] prose-li:text-[#424245] dark:prose-li:text-[#a1a1a6]">
            {sections.map((section) => (
              <div
                key={section.id}
                id={section.id}
                className="mb-14 scroll-mt-28"
              >
                <h2 className="text-2xl md:text-3xl text-[#1a1a1a] dark:text-white mb-6 border-b border-[#d2d2d7]/30 dark:border-[#2a2a2a] pb-4 flex items-baseline gap-3">
                  <span className="text-[#0071e3] text-xl font-mono">{section.number}.</span>
                  <span>{section.title}</span>
                </h2>
                <div className="text-base md:text-lg leading-relaxed text-[#424245] dark:text-[#a1a1a6]">
                  {section.content}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="px-6 py-12 border-t border-[#d2d2d7]/50 dark:border-[#2a2a2a] bg-[#fbfbfd] dark:bg-[#111111]">
        <div className="max-w-6xl mx-auto flex flex-col sm:flex-row justify-between items-center gap-4 text-sm text-[#86868b]">
          <p>© {new Date().getFullYear()} AIgnite Technologies. All rights reserved.</p>
          <div className="flex flex-wrap gap-6">
            <Link to="/pengoku/terms" className="hover:text-[#0071e3] transition-colors">Pengoku Terms</Link>
            <Link to="/privacy" className="hover:text-[#0071e3] transition-colors">Aignite Privacy</Link>
            <Link to="/terms" className="hover:text-[#0071e3] transition-colors">Site Terms</Link>
            <a href="mailto:admin@theaignite.app" className="hover:text-[#0071e3] transition-colors">Contact</a>
          </div>
        </div>
      </footer>
    </div>
  );
}

import React, { useState } from "react";
import { motion } from "motion/react";
import { ArrowLeft, FileText, Clock, ChevronDown, ChevronUp, Check, ExternalLink, ShieldCheck, Scale } from "lucide-react";
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

export default function PengokuTermsPage() {
  const [isTocOpen, setIsTocOpen] = useState(false);

  const sections = [
    {
      id: "acceptance-of-terms",
      number: "1",
      title: "Acceptance of Terms",
      content: (
        <>
          <p className="mb-4">
            These Terms of Service ("Terms") constitute a legally binding agreement between you ("you," "player," or "user")
            and <strong>AIgnite Technologies</strong> ("we," "us," or "our"), regarding your download, installation,
            access, and play of the mobile game <strong>Pengoku</strong> ("the App" or "the Game") and its associated online
            services available at{" "}
            <a href="https://theaignite.app" target="_blank" rel="noopener noreferrer" className="text-[#0071e3] hover:underline">
              https://theaignite.app
            </a>.
          </p>
          <p className="mb-4">
            Pengoku is an original logic puzzle title developed by <strong>Lavish Studio</strong> and published, operated, and maintained by <strong>AIgnite Technologies</strong>.
          </p>
          <p className="mb-4">
            By downloading, installing, accessing, or playing Pengoku, you acknowledge that you have read, understood,
            and agree to be bound by these Terms and our{" "}
            <Link to="/pengoku/privacy" className="text-[#0071e3] hover:underline font-medium">
              Pengoku Privacy Policy
            </Link>. If you do not agree with all of these Terms, you are expressly prohibited from using the App, and you must discontinue play and uninstall the application immediately.
          </p>
          <p>
            <strong>Eligibility:</strong> You must be at least 13 years of age (or the legal age of digital consent in your jurisdiction) to play Pengoku. If you are under the age of majority in your jurisdiction, you confirm that your parent or legal guardian has reviewed and agreed to these Terms on your behalf.
          </p>
        </>
      ),
    },
    {
      id: "studio-credit-and-ip",
      number: "2",
      title: "Studio Credit and Intellectual Property",
      content: (
        <>
          <p className="mb-4">
            <strong>Studio Credit:</strong> Pengoku is conceived, designed, and developed by <strong>Lavish Studio</strong>. All puzzle mechanics, artistic assets, penguin character models, floe designs, musical themes, audio effects, and UI layouts are creative works of Lavish Studio.
          </p>
          <p className="mb-4">
            <strong>Publisher &amp; Operator:</strong> <strong>AIgnite Technologies</strong> is the official publisher, distributor, and backend operator of Pengoku.
          </p>
          <p className="mb-4">
            All proprietary rights, software code, puzzle generation algorithms, databases, graphics, artwork, visual interfaces, sound recordings, trademarks, service marks, and trade names embodied within Pengoku (collectively, the "Game Content") are the exclusive intellectual property of AIgnite Technologies and Lavish Studio, protected by Indian and international copyright, trademark, and intellectual property laws.
          </p>
          <p>
            Except as explicitly granted in these Terms, no portion of the Game Content may be copied, reproduced, decompiled, extracted, republished, or exploited for any commercial purpose without prior written authorization from AIgnite Technologies.
          </p>
        </>
      ),
    },
    {
      id: "licence-to-use-app",
      number: "3",
      title: "Licence to Use the App",
      content: (
        <>
          <p className="mb-4">
            Subject to your continuous compliance with these Terms, AIgnite Technologies grants you a personal, non-exclusive, non-transferable, non-sublicensable, revocable, and limited licence to download, install, and execute one copy of Pengoku on an Android device that you own or control, solely for your personal, non-commercial entertainment.
          </p>
          <p className="mb-4">
            <strong>Licence Restrictions:</strong> You expressly agree that you shall not, directly or indirectly:
          </p>
          <ul className="list-disc pl-5 space-y-2 mb-4">
            <li>Reverse engineer, decompile, disassemble, or attempt to derive the source code, puzzle engine logic, or underlying algorithms of the App.</li>
            <li>Modify, adapt, translate, or create derivative works based upon Pengoku or any part thereof.</li>
            <li>Distribute, sell, lease, rent, sublicense, or commercially exploit the App or any in-game assets.</li>
            <li>Remove, obscure, or alter any copyright notices, trademark indicators, or proprietary watermarks.</li>
            <li>Bypass, disable, or circumvent any technical security measures, digital rights management (DRM), anti-cheat protections, or API integrity checks.</li>
          </ul>
          <p>
            Any violation of these licence restrictions will result in the immediate and automatic revocation of your licence, without prejudice to any legal remedies available under applicable law.
          </p>
        </>
      ),
    },
    {
      id: "in-app-purchases-and-billing",
      number: "4",
      title: "In-App Purchases and Google Play Billing",
      content: (
        <>
          <p className="mb-4">
            Pengoku offers optional digital in-app purchases ("IAP") through the Google Play Store to enhance your gameplay experience:
          </p>
          <div className="overflow-x-auto my-6 rounded-xl border border-[#d2d2d7]/50 dark:border-[#2a2a2a] bg-[#fbfbfd] dark:bg-[#161616]">
            <table className="w-full text-left text-sm">
              <thead className="bg-[#f5f5f7] dark:bg-[#1a1a1a] text-[#1a1a1a] dark:text-white border-b border-[#d2d2d7]/50 dark:border-[#2a2a2a]">
                <tr>
                  <th className="py-3 px-4 font-semibold">Purchase Item</th>
                  <th className="py-3 px-4 font-semibold">Classification</th>
                  <th className="py-3 px-4 font-semibold">Details &amp; Restoration</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-[#d2d2d7]/30 dark:divide-[#2a2a2a] text-[#424245] dark:text-[#a1a1a6]">
                <tr>
                  <td className="py-3 px-4 font-medium text-[#1a1a1a] dark:text-white">Remove Ads</td>
                  <td className="py-3 px-4">One-time, non-consumable</td>
                  <td className="py-3 px-4">
                    Permanently removes non-rewarded banner and interstitial advertisements across all campaign boards. Can be restored across devices signed in with the same Google Play account via "Restore Purchases".
                  </td>
                </tr>
                <tr>
                  <td className="py-3 px-4 font-medium text-[#1a1a1a] dark:text-white">In-game Fish / Cosmetics</td>
                  <td className="py-3 px-4">Virtual gameplay currency</td>
                  <td className="py-3 px-4">
                    Earned through puzzle completions and sanctuary milestones. Used exclusively within the game for aesthetic items and hints. Holds zero real-world cash value.
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
          <ul className="list-disc pl-5 space-y-2 mb-4">
            <li>
              <strong>Billing via Google Play:</strong> All transactions are processed, billed, and managed exclusively by Google LLC through <strong>Google Play In-App Billing</strong>. AIgnite Technologies does not collect, receive, or store your payment card numbers, banking details, or billing address.
            </li>
            <li>
              <strong>Refund Policy:</strong> All in-app purchases are subject to <strong>Google Play's standard refund policies</strong>. If you wish to request a refund, you must submit your request directly to Google Play via your Google Play account purchase history (
              <a href="https://support.google.com/googleplay" target="_blank" rel="noopener noreferrer" className="text-[#0071e3] hover:underline">
                support.google.com/googleplay
              </a>). AIgnite Technologies cannot directly process monetary refunds for purchases billed through Google Play.
            </li>
            <li>
              <strong>Restoration of Purchases:</strong> Because "Remove Ads" is a non-consumable digital product tied to your Google Play account, you may restore it on any compatible Android device using the "Restore Purchases" button in the in-game Settings screen, provided you are signed in with the purchasing Google account.
            </li>
            <li>
              <strong>Virtual Items:</strong> Virtual currency ("Fish"), sanctuary companions, and cosmetic skins are virtual gameplay elements. They do not constitute personal property, have no monetary value outside of Pengoku, cannot be redeemed for fiat currency, and cannot be transferred or sold to third parties.
            </li>
          </ul>
        </>
      ),
    },
    {
      id: "advertising-and-third-party-services",
      number: "5",
      title: "Advertisements and Third-Party Services",
      content: (
        <>
          <p className="mb-4">
            Pengoku is supported by advertising delivered through <strong>Google AdMob</strong> (Google LLC):
          </p>
          <ul className="list-disc pl-5 space-y-2 mb-4">
            <li>
              <strong>Ad Formats:</strong> Ads may be displayed as bottom banner placements or intermittent full-screen interstitial transitions between puzzle levels. Purchasing "Remove Ads" permanently disables these banner and interstitial placements.
            </li>
            <li>
              <strong>Optional Rewarded Ads:</strong> Rewarded video advertisements are 100% voluntary. You will only see a rewarded ad if you actively tap a button to earn optional in-game bonuses (such as extra fish currency or puzzle hints). Rewarded ads remain available even if "Remove Ads" has been purchased.
            </li>
            <li>
              <strong>Privacy and Consent:</strong> Ad delivery strictly complies with Google Play Developer Policies and applicable data protection regulations (including GDPR, UK GDPR, and CPRA through Google's User Messaging Platform consent SDK). Players in regulated regions are presented with consent dialogs and can modify their advertising preferences at any time via in-game Settings.
            </li>
            <li>
              <strong>Third-Party Links:</strong> Advertisements may contain links to third-party mobile applications, products, or websites. AIgnite Technologies does not endorse, sponsor, or assume any responsibility for the goods, services, content, or privacy practices of external advertisers.
            </li>
          </ul>
        </>
      ),
    },
    {
      id: "play-games-and-leaderboards",
      number: "6",
      title: "Google Play Games Services and Leaderboards",
      content: (
        <>
          <p className="mb-4">
            Pengoku incorporates Google Play Games Services v2 for optional online leaderboard rankings:
          </p>
          <ul className="list-disc pl-5 space-y-2 mb-4">
            <li>
              <strong>Optional Sign-In:</strong> Signing in with Google Play Games is entirely optional. You may play the full offline campaign, unlock chapters, solve daily puzzles, and rescue sanctuary animals without ever signing in.
            </li>
            <li>
              <strong>Leaderboard Participation:</strong> If you sign in, your pseudonymised player ID and public Play Games display name will appear on global, weekly, and daily scoreboards alongside your puzzle completion times and star ratings.
            </li>
            <li>
              <strong>Score Verification:</strong> When you complete a puzzle while signed in, the App transmits your score, completion time, hearts remaining, and chronological move sequence to AIgnite Technologies' anti-cheat verification backend to certify score authenticity before listing it publicly.
            </li>
            <li>
              <strong>Leaderboard Availability:</strong> While we endeavor to keep leaderboard services operational 24/7, we do not guarantee continuous or uninterrupted uptime. Leaderboards may undergo periodic maintenance, seasonal rollovers, or schema updates without liability.
            </li>
          </ul>
        </>
      ),
    },
    {
      id: "user-conduct-and-fair-play",
      number: "7",
      title: "User Conduct and Anti-Cheat Policy",
      content: (
        <>
          <p className="mb-4">
            Pengoku is a pure logic puzzle game built to reward genuine problem-solving, cognitive reasoning, and human skill. Fair play is fundamental to the community.
          </p>
          <p className="mb-4">
            <strong>Strictly Prohibited Conduct:</strong> You agree that you will not, under any circumstances:
          </p>
          <ul className="list-disc pl-5 space-y-2 mb-4">
            <li>Use automated bots, macros, autoklickers, AI solvers, or scripts to solve boards or simulate gameplay.</li>
            <li>Utilize memory modification software, speed hacks, debugger hooks, or runtime injection tools (such as Cheat Engine, GameGuardian, or Frida).</li>
            <li>Sideload modified or tampered APKs, cracked builds, or unofficial game distributions.</li>
            <li>Intercept, reverse engineer, forge, replay, or manipulate network traffic to our backend API endpoints (e.g., <code>/api/scores</code> or <code>/api/auth/play-games</code>).</li>
            <li>Submit fabricated completion times, impossible move sequences, or alter local system clocks to manipulate daily challenges or leaderboard timings.</li>
            <li>Exploit unintended glitches, board generation bugs, or network flaws for unfair leaderboard ranking.</li>
            <li>Use offensive, defamatory, harassing, sexually explicit, or unlawful display names through your Google Play Games profile on public leaderboards.</li>
          </ul>
          <p className="mb-4">
            <strong>Anti-Cheat Enforcement:</strong> AIgnite Technologies employs automated move log simulation and heuristic anti-cheat algorithms. We reserve the absolute right, in our sole discretion and without prior notice, to:
          </p>
          <ul className="list-disc pl-5 space-y-2">
            <li>Reject and discard any score submission that fails mathematical verification or move plausibility checks.</li>
            <li>Remove fraudulent, impossible, or suspicious scores from all public leaderboards.</li>
            <li>Permanently ban or suspend the associated Google Play Games account and device identifier from participating in Pengoku online leaderboards.</li>
          </ul>
        </>
      ),
    },
    {
      id: "account-and-data-deletion",
      number: "8",
      title: "Account and Data Deletion",
      content: (
        <>
          <p className="mb-4">
            We respect your privacy and provide transparent mechanisms to delete your gameplay and online records at any time:
          </p>
          <ul className="list-disc pl-5 space-y-2 mb-4">
            <li>
              <strong>Local Game Data:</strong> All local campaign progress, completed levels, fish currency, and personal settings are stored locally on your device (using Android Jetpack DataStore and Room). You can permanently delete this data at any time by clearing application data in Android OS Settings (<em>Settings &gt; Apps &gt; Pengoku &gt; Storage &gt; Clear Data</em>) or by uninstalling the App.
            </li>
            <li>
              <strong>Online Leaderboard Data Deletion:</strong> If you have signed in with Google Play Games and have records on our backend leaderboards, you can delete your online profile, high scores, and move logs immediately from within the game by tapping <strong>"Delete my online data"</strong> in the in-game Settings menu (<em>Settings &gt; Account &gt; Delete my online data</em>).
            </li>
            <li>
              <strong>Manual Deletion Request:</strong> You may also request the deletion of your online data by emailing our privacy team at{" "}
              <a href="mailto:admin@theaignite.app" className="text-[#0071e3] hover:underline font-medium">
                admin@theaignite.app
              </a>.
            </li>
            <li>
              <strong>Privacy Policy Reference:</strong> For exhaustive information on how data is handled, stored, and permanently deleted, please consult our{" "}
              <Link to="/pengoku/privacy#delete-data" className="text-[#0071e3] hover:underline font-medium">
                Pengoku Privacy Policy (Section 11: How to Delete Your Data)
              </Link>.
            </li>
          </ul>
        </>
      ),
    },
    {
      id: "disclaimers-of-warranties",
      number: "9",
      title: "Disclaimers of Warranties",
      content: (
        <>
          <p className="mb-4">
            TO THE MAXIMUM EXTENT PERMITTED BY APPLICABLE LAW, PENGOKU, ITS GAME CONTENT, AND ALL ASSOCIATED ONLINE SERVICES ARE PROVIDED ON AN <strong>"AS IS"</strong> AND <strong>"AS AVAILABLE"</strong> BASIS, WITH ALL FAULTS AND WITHOUT WARRANTY OF ANY KIND.
          </p>
          <p className="mb-4">
            AIGNITE TECHNOLOGIES, LAVISH STUDIO, AND THEIR AFFILIATES, OFFICERS, EMPLOYEES, AND LICENSORS EXPRESSLY DISCLAIM ALL WARRANTIES, WHETHER EXPRESS, IMPLIED, STATUTORY, OR OTHERWISE, INCLUDING BUT NOT LIMITED TO:
          </p>
          <ul className="list-disc pl-5 space-y-2 mb-4">
            <li>IMPLIED WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE, TITLE, AND NON-INFRINGEMENT.</li>
            <li>WARRANTIES THAT THE APP WILL MEET YOUR INDIVIDUAL REQUIREMENTS OR EXPECTATIONS.</li>
            <li>WARRANTIES THAT OPERATION OF THE APP WILL BE UNINTERRUPTED, SECURE, ACCURATE, OR ERROR-FREE.</li>
            <li>WARRANTIES THAT DEFECTS, BUGS, OR GLITCHES WILL BE CORRECTED PROMPTLY OR AT ALL.</li>
            <li>WARRANTIES REGARDING COMPATIBILITY WITH SPECIFIC HARDWARE, OPERATING SYSTEM RELEASES, OR SCREEN SIZES.</li>
          </ul>
          <p>
            YOU ACKNOWLEDGE THAT DOWNLOADING, INSTALLING, AND PLAYING PENGOKU IS AT YOUR SOLE DISCRETION AND RISK.
          </p>
        </>
      ),
    },
    {
      id: "limitation-of-liability",
      number: "10",
      title: "Limitation of Liability",
      content: (
        <>
          <p className="mb-4">
            TO THE FULLEST EXTENT PERMITTED UNDER APPLICABLE LAW, IN NO EVENT SHALL <strong>AIGNITE TECHNOLOGIES</strong>, <strong>LAVISH STUDIO</strong>, OR THEIR RESPECTIVE DIRECTORS, OFFICERS, EMPLOYEES, CONTRACTORS, PARTNERS, OR LICENSORS BE LIABLE TO YOU OR ANY THIRD PARTY FOR:
          </p>
          <ul className="list-disc pl-5 space-y-2 mb-4">
            <li>
              ANY INDIRECT, INCIDENTAL, SPECIAL, CONSEQUENTIAL, PUNITIVE, OR EXEMPLARY DAMAGES WHATSOEVER;
            </li>
            <li>
              LOSS OF PROFITS, LOSS OF REVENUE, LOSS OF DATA, LOSS OF GOODWILL, WORK STOPPAGE, COMPUTER OR MOBILE DEVICE DAMAGE, BATTERY DRAIN, OR SYSTEM FAILURE;
            </li>
            <li>
              ANY MATTER ARISING OUT OF OR IN CONNECTION WITH YOUR USE OF OR INABILITY TO USE PENGOKU OR ITS ONLINE SERVICES, EVEN IF ADVISED OF THE POSSIBILITY OF SUCH DAMAGES.
            </li>
          </ul>
          <p>
            IN ALL EVENTS, THE TOTAL AGGREGATE LIABILITY OF AIGNITE TECHNOLOGIES AND LAVISH STUDIO FOR ANY AND ALL CLAIMS ARISING OUT OF OR RELATING TO THESE TERMS OR THE GAME SHALL NOT EXCEED THE TOTAL AMOUNT ACTUALLY PAID BY YOU FOR IN-APP PURCHASES IN PENGOKU DURING THE TWELVE (12) MONTHS PRECEDING THE CLAIM, OR FIVE HUNDRED INDIAN RUPEES (INR ₹500), WHICHEVER IS GREATER.
          </p>
        </>
      ),
    },
    {
      id: "indemnification",
      number: "11",
      title: "Indemnification",
      content: (
        <>
          <p>
            You agree to defend, indemnify, and hold harmless AIgnite Technologies, Lavish Studio, and their respective directors, officers, employees, agents, successors, and assigns from and against any claims, liabilities, damages, judgments, awards, losses, costs, expenses, or legal fees arising out of or relating to: (a) your violation of these Terms; (b) your misuse of Pengoku or its online services; (c) your violation of any third-party rights, including intellectual property or privacy rights; or (d) any cheating, hacking, or fraudulent activity conducted through your device or account.
          </p>
        </>
      ),
    },
    {
      id: "governing-law-and-jurisdiction",
      number: "12",
      title: "Governing Law and Dispute Resolution",
      content: (
        <>
          <p className="mb-4">
            <strong>Governing Law:</strong> These Terms of Service, their interpretation, and any claims or disputes arising out of or related to Pengoku shall be governed by and construed in accordance with the laws of the <strong>Republic of India</strong>, without giving effect to any principles of conflicts of law.
          </p>
          <p className="mb-4">
            <strong>Exclusive Jurisdiction:</strong> You agree that any legal suit, action, arbitration, or proceeding arising out of or relating to these Terms or the Game shall be instituted exclusively in the competent courts located in <strong>Salem, Tamil Nadu, India</strong>. You hereby waive any and all objections to the exercise of jurisdiction over you by such courts and to venue in such courts.
          </p>
          <p>
            <strong>Informal Resolution:</strong> Before initiating formal legal proceedings, we strongly encourage you to contact us at{" "}
            <a href="mailto:admin@theaignite.app" className="text-[#0071e3] hover:underline font-medium">
              admin@theaignite.app
            </a>{" "}
            so we may attempt to resolve any dispute or grievance informally and amicably.
          </p>
        </>
      ),
    },
    {
      id: "changes-to-terms",
      number: "13",
      title: "Changes to These Terms",
      content: (
        <>
          <p className="mb-4">
            We reserve the right, at our sole discretion, to modify, update, or replace these Terms of Service at any time.
          </p>
          <p className="mb-4">
            Any revisions will be posted on this page (<code>https://theaignite.app/pengoku/terms</code>) with an updated "Last updated" date at the top. For material updates that significantly affect your rights or obligations, we may provide prominent in-app notices or notifications prior to the effective date of the revisions.
          </p>
          <p>
            By continuing to access or play Pengoku after revised Terms become effective, you agree to be bound by the updated terms. If you do not agree to the new terms, you must discontinue use and uninstall the App.
          </p>
        </>
      ),
    },
    {
      id: "termination-and-severability",
      number: "14",
      title: "Termination and Severability",
      content: (
        <>
          <p className="mb-4">
            <strong>Termination:</strong> These Terms remain effective until terminated by either you or AIgnite Technologies. You may terminate these Terms at any time by ceasing all use of the Game and uninstalling it from your devices. AIgnite Technologies may suspend, terminate, or restrict your access to Pengoku or its online leaderboards immediately, without prior notice, if you breach any provision of these Terms (including engaging in cheating or unauthorized reverse engineering).
          </p>
          <p className="mb-4">
            <strong>Severability:</strong> If any provision of these Terms is held to be invalid, illegal, or unenforceable by a court of competent jurisdiction, that provision shall be modified to the minimum extent necessary to make it valid and enforceable, or severed if modification is not possible, and the remaining provisions of these Terms shall remain in full force and effect.
          </p>
          <p>
            <strong>Entire Agreement:</strong> These Terms of Service, together with the Pengoku Privacy Policy, constitute the sole and entire agreement between you and AIgnite Technologies regarding Pengoku and supersede all prior understandings or agreements.
          </p>
        </>
      ),
    },
    {
      id: "contact-us",
      number: "15",
      title: "Contact Information",
      content: (
        <>
          <p className="mb-4">
            If you have questions, inquiries, feedback, or legal concerns regarding these Terms of Service or Pengoku, please contact our team:
          </p>
          <div className="bg-[#f5f5f7] dark:bg-[#1a1a1a] rounded-xl p-5 border border-[#d2d2d7]/50 dark:border-[#2a2a2a] max-w-md">
            <ul className="space-y-2 text-sm">
              <li>
                <strong className="text-[#1a1a1a] dark:text-white">Operating Entity:</strong>{" "}
                <span className="text-[#424245] dark:text-[#a1a1a6]">AIgnite Technologies</span>
              </li>
              <li>
                <strong className="text-[#1a1a1a] dark:text-white">Studio Credit:</strong>{" "}
                <span className="text-[#424245] dark:text-[#a1a1a6]">Lavish Studio</span>
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
                <strong className="text-[#1a1a1a] dark:text-white">Jurisdiction:</strong>{" "}
                <span className="text-[#424245] dark:text-[#a1a1a6]">Salem, Tamil Nadu, India</span>
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
        title="Pengoku Terms of Service | AIgnite Technologies"
        description="Official Terms of Service for Pengoku Android logic puzzle game, developed by Lavish Studio and published by AIgnite Technologies. Learn about user rights, in-app purchases, fair play, and leaderboards."
        keywords="Pengoku, Terms of Service, Pengoku Terms, Lavish Studio, AIgnite Technologies, Android puzzle game, user conduct, in-app purchases"
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
              <FileText size={28} />
              <span className="font-semibold tracking-wide uppercase text-sm">Legal &amp; Terms</span>
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
              Pengoku Terms of Service
            </motion.h1>

            <motion.p className="text-[#86868b] text-xl md:text-2xl mb-2 font-medium" variants={fadeInUp}>
              AIgnite Technologies
            </motion.p>
            <motion.p className="text-[#0071e3] text-base md:text-lg mb-8 font-medium" variants={fadeInUp}>
              Studio Credit: Lavish Studio
            </motion.p>

            <motion.div className="flex flex-wrap items-center gap-3 text-[#86868b]" variants={fadeInUp}>
              <div className="flex items-center gap-2 bg-[#f5f5f7] dark:bg-[#1a1a1a] px-4 py-2 rounded-full border border-[#d2d2d7]/50 dark:border-[#2a2a2a]">
                <Clock size={16} />
                <span style={{ fontSize: "0.875rem", fontWeight: 500 }}>
                  Effective date: 25 November 2026
                </span>
              </div>
              <div className="flex items-center gap-2 bg-[#f5f5f7] dark:bg-[#1a1a1a] px-4 py-2 rounded-full border border-[#d2d2d7]/50 dark:border-[#2a2a2a]">
                <Clock size={16} />
                <span style={{ fontSize: "0.875rem", fontWeight: 500 }}>
                  Last updated: 25 November 2026
                </span>
              </div>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* Main Content Area */}
      <section className="px-6 py-14 md:py-20">
        <div className="max-w-3xl mx-auto">
          {/* Summary Box: Terms at a Glance */}
          <div className="bg-[#f5f5f7] dark:bg-[#1a1a1a] rounded-2xl p-6 md:p-8 mb-12 border border-[#d2d2d7]/50 dark:border-[#2a2a2a] shadow-sm">
            <h2 className="text-xl md:text-2xl font-semibold text-[#1a1a1a] dark:text-white mb-4 flex items-center gap-2">
              <ShieldCheck size={22} className="text-[#0071e3]" />
              Terms at a Glance
            </h2>
            <ul className="space-y-3 text-sm md:text-base text-[#424245] dark:text-[#a1a1a6]">
              <li className="flex items-start gap-3">
                <span className="p-1 rounded-full bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 mt-0.5">
                  <Check size={16} strokeWidth={2.5} />
                </span>
                <span><strong>Personal Entertainment Licence:</strong> Free, non-exclusive, revocable licence to play Pengoku on Android devices for personal enjoyment.</span>
              </li>
              <li className="flex items-start gap-3">
                <span className="p-1 rounded-full bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 mt-0.5">
                  <Check size={16} strokeWidth={2.5} />
                </span>
                <span><strong>One-Time IAP:</strong> "Remove Ads" is a one-time, non-consumable purchase processed by Google Play. Refunds follow Google Play's standard refund policies.</span>
              </li>
              <li className="flex items-start gap-3">
                <span className="p-1 rounded-full bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 mt-0.5">
                  <Check size={16} strokeWidth={2.5} />
                </span>
                <span><strong>Zero-Tolerance Anti-Cheat:</strong> Bots, autoklickers, modified APKs, and score spoofing are prohibited and result in score purging and leaderboard bans.</span>
              </li>
              <li className="flex items-start gap-3">
                <span className="p-1 rounded-full bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 mt-0.5">
                  <Check size={16} strokeWidth={2.5} />
                </span>
                <span><strong>Complete Data Control:</strong> You can delete your online data anytime via the in-app "Delete my online data" button or via our Privacy Policy.</span>
              </li>
              <li className="flex items-start gap-3">
                <span className="p-1 rounded-full bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 mt-0.5">
                  <Check size={16} strokeWidth={2.5} />
                </span>
                <span><strong>Governing Law:</strong> Governed by the laws of India, under the exclusive jurisdiction of the competent courts of Salem, Tamil Nadu.</span>
              </li>
              <li className="flex items-start gap-3">
                <span className="p-1 rounded-full bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 mt-0.5">
                  <Check size={16} strokeWidth={2.5} />
                </span>
                <span><strong>Studio &amp; Publisher:</strong> Developed by Lavish Studio, published and operated by AIgnite Technologies.</span>
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

          {/* Terms Sections */}
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
          <p>© {new Date().getFullYear()} AIgnite Technologies. All rights reserved. Studio Credit: Lavish Studio.</p>
          <div className="flex flex-wrap gap-6">
            <Link to="/pengoku/privacy" className="hover:text-[#0071e3] transition-colors">Pengoku Privacy</Link>
            <Link to="/privacy" className="hover:text-[#0071e3] transition-colors">Aignite Privacy</Link>
            <Link to="/terms" className="hover:text-[#0071e3] transition-colors">Site Terms</Link>
            <a href="mailto:admin@theaignite.app" className="hover:text-[#0071e3] transition-colors">Contact</a>
          </div>
        </div>
      </footer>
    </div>
  );
}

import React from 'react';
import { FileText, Clock, MapPin } from 'lucide-react';
import MainLayout from './MainLayout';
import WelcomeBanner from '../components/WelcomeBanner';
import Breadcrumb from '../components/Breadcrumb';

const TermsPage = () => {
  const lastUpdated = new Date(2026, 8, 1);

  const sections = [
    {
      id: 'intro',
      title: '1. Introduction & Acceptance',
      content: `These Terms and Conditions ("Terms") govern your access and use of the Library Management System (LMS) website and services ("Service"). By accessing or using the LMS, you agree to be bound by these Terms. If you do not agree with any part of these Terms, you may not use the Service.

We reserve the right to modify these Terms at any time. Your continued use of the Service following any such modification constitutes your acceptance of the updated Terms.`,
    },
    {
      id: 'account',
      title: '2. User Accounts',
      content: `To use the Service, you must create an account and provide accurate, complete, and current information. You are responsible for maintaining the confidentiality of your password and account credentials. You agree to accept responsibility for all activities that occur under your account.

You agree not to:
• Create multiple accounts
• Impersonate another person
• Share your account credentials with others
• Use the Service for any unlawful purpose`,
    },
    {
      id: 'borrowing',
      title: '3. Borrowing Policies',
      content: `Library members can borrow books according to the following policies:

Borrowing Limits:
• Maximum 5 books per member
• Borrowing period: 14 days
• Renewal: Up to 2 times if no holds exist

Late Returns:
• Late fee: Shs 1,000 per day
• Maximum fine per book: Shs 20,000
• Items with outstanding fines cannot be borrowed

Damage & Loss:
• Members are liable for damage to borrowed items
• Lost books must be paid in full (replacement value)
• Damaged items require repair fees paid by the member`,
    },
    {
      id: 'reservations',
      title: '4. Reservation & Hold System',
      content: `You may reserve up to 5 books at a time. Reservations are valid for 7 days once a book becomes available. If not collected within 7 days, the reservation will be automatically released.

The library maintains a priority queue system for reservations based on reservation time. We will notify you via email or SMS when your reserved book is ready for pickup.`,
    },
    {
      id: 'intellectual',
      title: '5. Intellectual Property Rights',
      content: `All content on the LMS platform, including text, graphics, logos, and software, is the property of the Library or its content suppliers and is protected by international intellectual property laws.

You may not:
• Reproduce, distribute, or transmit content without permission
• Create derivative works
• Attempt to reverse engineer or decompile the Service
• Use content for commercial purposes`,
    },
    {
      id: 'limitations',
      title: '6. Limitation of Liability',
      content: `To the fullest extent permitted by law, the Library shall not be liable for any indirect, incidental, special, or consequential damages arising from your use of or inability to use the Service, including loss of data, loss of profits, or business interruption.

Our total liability for any claim arising from this agreement shall not exceed the amount you have paid to the Library in the 12 months preceding the claim.`,
    },
    {
      id: 'termination',
      title: '7. Termination',
      content: `We may terminate or suspend your account immediately for:
• Violation of these Terms
• Repeated late returns or non-return of items
• Outstanding fines or fees
• Unlawful activity
• Breach of library policies

Upon termination, you must return all borrowed items and settle any outstanding fees.`,
    },
    {
      id: 'privacy',
      title: '8. Privacy & Data Protection',
      content: `Your use of the Service is governed by our Privacy Policy. We collect and process personal information in accordance with applicable data protection laws. Please review our Privacy Policy to understand our practices.`,
    },
    {
      id: 'contact',
      title: '9. Contact & Support',
      content: `If you have questions about these Terms, please contact us at:

Email: terms@library.local
Phone: +256 XXX XXX XXX
Address: Library Main Building, University Campus`,
    },
  ];

  return (
    <MainLayout>
      <div className="space-y-8 animate-fade-in max-w-4xl">
        <WelcomeBanner
          userName="Terms of Service"
          userRole="member"
          primaryText="Please read carefully"
          secondaryText={`Last updated: ${lastUpdated.toLocaleDateString()}`}
        />

        <Breadcrumb
          items={[
            { label: 'Home', href: '/' },
            { label: 'Terms of Service' },
          ]}
        />

        {/* Table of Contents */}
        <div className="card bg-slate-50 dark:bg-slate-800/50">
          <h2 className="font-bold text-lg mb-4 flex items-center gap-2">
            <FileText className="w-5 h-5 text-sky-600" />
            Table of Contents
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
            {sections.map(section => (
              <a
                key={section.id}
                href={`#${section.id}`}
                className="text-sky-600 hover:text-sky-700 dark:hover:text-sky-400 text-sm hover:underline"
              >
                {section.title}
              </a>
            ))}
          </div>
        </div>

        {/* Last Updated */}
        <div className="flex items-center gap-3 texts-sm text-muted">
          <Clock className="w-4 h-4" />
          <span>Last updated: {lastUpdated.toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })}</span>
        </div>

        {/* Sections */}
        <div className="space-y-6">
          {sections.map(section => (
            <section key={section.id} id={section.id} className="card scroll-mt-20">
              <h2 className="text-xl font-bold mb-4 text-slate-900 dark:text-white">
                {section.title}
              </h2>
              <p className="text-slate-700 dark:text-slate-300 leading-relaxed whitespace-pre-wrap">
                {section.content}
              </p>
            </section>
          ))}
        </div>

        {/* Acceptance */}
        <div className="card bg-sky-50 dark:bg-sky-900/20 border-sky-200 dark:border-sky-800">
          <h3 className="font-bold text-lg mb-3">Acceptance of Terms</h3>
          <p className="text-slate-700 dark:text-slate-300 mb-4">
            By clicking "I Accept" during registration or by continuing to use the Service after any modifications to these Terms, you acknowledge that you have read, understood, and agree to be bound by these Terms and Conditions.
          </p>
          <div className="flex gap-3">
            <button className="px-6 py-2 bg-sky-600 hover:bg-sky-700 text-white rounded-lg font-medium transition-smooth">
              Accept Terms
            </button>
            <button className="px-6 py-2 border-2 border-sky-600 text-sky-600 hover:bg-sky-50 dark:hover:bg-sky-900/30 rounded-lg font-medium transition-smooth">
              Print Terms
            </button>
          </div>
        </div>

        {/* Contact */}
        <div className="card bg-gradient-to-r from-slate-50 to-blue-50 dark:from-slate-900/30 dark:to-blue-900/30">
          <h3 className="font-bold text-lg mb-4 flex items-center gap-2">
            <MapPin className="w-5 h-5 text-slate-600 dark:text-slate-400" />
            Questions about these Terms?
          </h3>
          <p className="text-slate-700 dark:text-slate-300 mb-3">
            If you have any questions or concerns about our Terms of Service, please don't hesitate to contact us.
          </p>
          <a
            href="/contact"
            className="inline-block px-6 py-2 bg-slate-200 dark:bg-slate-700 hover:bg-slate-300 dark:hover:bg-slate-600 rounded-lg font-medium transition-smooth"
          >
            Contact Support
          </a>
        </div>
      </div>
    </MainLayout>
  );
};

export default TermsPage;

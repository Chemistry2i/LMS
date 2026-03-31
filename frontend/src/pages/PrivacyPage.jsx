import React from 'react';
import { Shield, Clock, Lock, Eye } from 'lucide-react';
import MainLayout from './MainLayout';
import WelcomeBanner from '../components/WelcomeBanner';
import Breadcrumb from '../components/Breadcrumb';

const PrivacyPage = () => {
  const lastUpdated = new Date(2026, 8, 1);

  const sections = [
    {
      id: 'intro',
      title: '1. Introduction',
      content: `This Privacy Policy explains how the Library Management System (LMS) collects, uses, and protects your personal data. We are committed to respecting your privacy and ensuring transparency in our data practices.

This Policy applies to all users of the LMS platform, including members, librarians, and administrators.`,
    },
    {
      id: 'data-collection',
      title: '2. Data We Collect',
      content: `We collect the following types of personal data:

Registration Information:
• Full name, email address, phone number
• Home address and location
• Date of birth (for age verification)
• Student/Staff ID (if applicable)

Borrowing Information:
• Books borrowed and return dates
• Reservation and hold history
• Fine and payment records
• Library usage patterns

Technical Data:
• IP address and device information
• Browser type and operating system
• Pages visited and time spent
• Cookies and tracking data

Communication Data:
• Messages and feedback you provide
• Support tickets and inquiries
• Notification preferences`,
    },
    {
      id: 'data-usage',
      title: '3. How We Use Your Data',
      content: `We use your personal data for the following purposes:

Primary Uses:
• To provide library services and manage your account
• To track borrowed items and manage returns
• To calculate and collect fines and fees
• To send notifications and reminders

Secondary Uses:
• To improve the LMS platform and user experience
• To analyze usage patterns and trends
• To conduct library research and statistics
• To comply with legal obligations
• To prevent fraud and unauthorized access

Marketing & Communications:
• To send newsletters and library announcements (with your consent)
• To notify you of new books and services
• To remind you of due dates and holds`,
    },
    {
      id: 'data-sharing',
      title: '4. Data Sharing & Disclosure',
      content: `We do not sell your personal data. However, we may share your information with:

Service Providers:
• Payment processors for fine collection
• Email service providers for notifications
• Analytics providers for usage insights

Legal Requirements:
• Government agencies and law enforcement
• Court orders and legal proceedings
• To comply with applicable laws

Other Situations:
• With your explicit consent
• In case of merger or acquisition
• To protect our legal rights

We require all third parties to maintain appropriate data security and confidentiality.`,
    },
    {
      id: 'data-security',
      title: '5. Data Security',
      content: `We implement comprehensive security measures to protect your data:

Technical Measures:
• SSL/TLS encryption for data transmission
• Password hashing and salting
• Regular security audits and penetration testing
• Secure servers and firewalls

Organizational Measures:
• Limited access to personal data
• Employee confidentiality agreements
• Privacy training for staff
• Incident response procedures

Your Responsibilities:
• Keep your password confidential
• Log out after using the platform
• Report suspicious activity immediately`,
    },
    {
      id: 'cookies',
      title: '6. Cookies & Tracking',
      content: `We use cookies and similar tracking technologies for:

Functional Cookies:
• Remember login information
• Maintain session continuity
• Store user preferences

Analytics Cookies:
• Track site usage and behavior
• Improve user experience
• Identify technical issues

You can manage cookies through your browser settings. Disabling cookies may affect some platform functionality.`,
    },
    {
      id: 'rights',
      title: '7. Your Rights',
      content: `You have the following rights regarding your personal data:

Access: Request a copy of all data we hold about you
Correction: Update or correct inaccurate information
Deletion: Request deletion of your data (right to be forgotten)
Portability: Receive your data in a structured format
Objection: Opt-out of certain data processing activities

To exercise these rights, please contact us with your request and proof of identity.`,
    },
    {
      id: 'retention',
      title: '8. Data Retention',
      content: `We retain personal data as follows:

Active Account Data:
• Stored for the duration of your membership
• Deleted upon account closure + 30 days notice period

Transaction Data:
• Retained for 7 years for accounting purposes
• Older records are archived or deleted

Logs & Analytics:
• Retained for 90 days
• Older logs are deleted

You can request early deletion subject to legal requirements.`,
    },
    {
      id: 'children',
      title: '9. Children\'s Privacy',
      content: `The LMS is not intended for children under 18. We do not knowingly collect data from minors without parental consent. If we discover we have collected data from a minor without proper consent, we will delete it immediately.

Parents or guardians can request information about or deletion of a minor's data.`,
    },
    {
      id: 'updates',
      title: '10. Policy Updates',
      content: `We may update this Privacy Policy periodically. We will notify you of material changes via email or by posting an alert on the platform. Your continued use of the Service constitutes acceptance of the updated Policy.`,
    },
  ];

  return (
    <MainLayout>
      <div className="space-y-8 animate-fade-in max-w-4xl">
        <WelcomeBanner
          userName="Privacy Policy"
          userRole="member"
          primaryText="Your privacy matters to us"
          secondaryText="Learn how we protect and use your data"
        />

        <Breadcrumb
          items={[
            { label: 'Home', href: '/' },
            { label: 'Privacy Policy' },
          ]}
        />

        {/* Key Principles */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="card">
            <Shield className="w-8 h-8 text-sky-600 mb-3" />
            <h3 className="font-bold mb-2">Secure</h3>
            <p className="text-sm text-muted">Your data is encrypted and protected with industry-standard security measures.</p>
          </div>
          <div className="card">
            <Lock className="w-8 h-8 text-emerald-600 mb-3" />
            <h3 className="font-bold mb-2">Private</h3>
            <p className="text-sm text-muted">We never sell your data. It's used only for providing library services.</p>
          </div>
          <div className="card">
            <Eye className="w-8 h-8 text-blue-600 mb-3" />
            <h3 className="font-bold mb-2">Transparent</h3>
            <p className="text-sm text-muted">We clearly explain what data we collect and why we collect it.</p>
          </div>
        </div>

        {/* Table of Contents */}
        <div className="card bg-slate-50 dark:bg-slate-800/50">
          <h2 className="font-bold text-lg mb-4">Quick Links</h2>
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
        <div className="flex items-center gap-3 text-sm text-muted">
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

        {/* Contact */}
        <div className="card bg-gradient-to-r from-sky-50 to-blue-50 dark:from-sky-900/30 dark:to-blue-900/30">
          <h3 className="font-bold text-lg mb-3">Data Protection Authority</h3>
          <p className="text-slate-700 dark:text-slate-300 mb-4">
            If you have concerns about how we handle your data, you have the right to lodge a complaint with your local data protection authority.
          </p>
          <p className="text-slate-700 dark:text-slate-300 mb-4">
            For privacy-related questions or data requests, please contact us at:
          </p>
          <div className="space-y-2 text-sm">
            <p><strong>Email:</strong> privacy@library.local</p>
            <p><strong>Phone:</strong> +256 XXX XXX XXX</p>
            <p><strong>Address:</strong> Privacy Officer, Library Main Building</p>
          </div>
        </div>
      </div>
    </MainLayout>
  );
};

export default PrivacyPage;

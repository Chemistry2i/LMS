import React from 'react';
import { BookOpen, Users, Award, Globe, Heart, Zap } from 'lucide-react';
// import MainLayout from './MainLayout';
import WelcomeBanner from '../components/WelcomeBanner';
import Breadcrumb from '../components/Breadcrumb';

const AboutPage = () => {
  const features = [
    {
      icon: BookOpen,
      title: 'Vast Collection',
      description: 'Access our extensive library of books across multiple categories and genres.',
    },
    {
      icon: Zap,
      title: 'Easy Management',
      description: 'Seamlessly borrow, return, and reserve books with our intuitive platform.',
    },
    {
      icon: Users,
      title: 'Community Driven',
      description: 'Connect with readers, share reviews, and discover recommendations.',
    },
    {
      icon: Award,
      title: 'Quality Service',
      description: 'Dedicated support team ensuring the best library experience for all members.',
    },
  ];

  const milestones = [
    {
      year: '2020',
      title: 'Foundation',
      description: 'Our library management system was established to revolutionize book management.',
    },
    {
      year: '2021',
      title: 'Digital Launch',
      description: 'Launched our online platform enabling members to access services remotely.',
    },
    {
      year: '2022',
      title: 'Expansion',
      description: 'Expanded collection to 50,000+ books and welcomed 10,000+ active members.',
    },
    {
      year: '2024',
      title: 'Innovation',
      description: 'Introduced advanced search, recommendations, and mobile app features.',
    },
  ];

  const team = [
    { name: 'Sarah Johnson', role: 'Founder & Director', emoji: '👩‍💼' },
    { name: 'Michael Chen', role: 'Head Librarian', emoji: '👨‍💼' },
    { name: 'Emily Rodriguez', role: 'Tech Lead', emoji: '👩‍💻' },
    { name: 'James Smith', role: 'Community Manager', emoji: '👨‍💼' },
  ];

  const stats = [
    { number: '50K+', label: 'Books in Collection' },
    { number: '25K+', label: 'Active Members' },
    { number: '150K+', label: 'Borrows Annually' },
    { number: '4.8★', label: 'Customer Rating' },
  ];

  return (
    <>
      <div className="space-y-12 animate-fade-in max-w-4xl mx-auto py-10 px-4 md:px-0">
        <WelcomeBanner
          userName="About Our Library"
          userRole="member"
          primaryText="Building a community of readers"
          secondaryText="Discover our mission, vision, and impact"
        />

        <Breadcrumb
          items={[
            { label: 'Home', href: '/' },
            { label: 'About Us' },
          ]}
        />

        {/* Mission & Vision */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="card bg-sky-50 dark:bg-sky-900/20 border-sky-200 dark:border-sky-800">
            <h2 className="text-2xl font-bold mb-4 text-sky-900 dark:text-sky-100">Our Mission</h2>
            <p className="text-slate-700 dark:text-slate-300 leading-relaxed">
              To provide equitable access to knowledge and foster a love of reading by maintaining a diverse, inclusive, and well-managed library that serves the needs of our entire community.
            </p>
          </div>
          <div className="card bg-emerald-50 dark:bg-emerald-900/20 border-emerald-200 dark:border-emerald-800">
            <h2 className="text-2xl font-bold mb-4 text-emerald-900 dark:text-emerald-100">Our Vision</h2>
            <p className="text-slate-700 dark:text-slate-300 leading-relaxed">
              To become the leading digital library platform, transforming how people discover, access, and enjoy books while building a vibrant community of lifelong learners.
            </p>
          </div>
        </div>

        {/* Core Values */}
        <div className="card">
          <h2 className="text-2xl font-bold mb-6">Our Core Values</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="flex gap-4">
              <Heart className="w-6 h-6 text-red-600 flex-shrink-0 mt-1" />
              <div>
                <h3 className="font-bold mb-2">Community</h3>
                <p className="text-sm text-slate-700 dark:text-slate-300">
                  We believe in building a supportive community where knowledge is shared and everyone feels welcome.
                </p>
              </div>
            </div>
            <div className="flex gap-4">
              <BookOpen className="w-6 h-6 text-sky-600 flex-shrink-0 mt-1" />
              <div>
                <h3 className="font-bold mb-2">Accessibility</h3>
                <p className="text-sm text-slate-700 dark:text-slate-300">
                  We strive to make knowledge accessible to everyone, regardless of background or ability.
                </p>
              </div>
            </div>
            <div className="flex gap-4">
              <Award className="w-6 h-6 text-emerald-600 flex-shrink-0 mt-1" />
              <div>
                <h3 className="font-bold mb-2">Excellence</h3>
                <p className="text-sm text-slate-700 dark:text-slate-300">
                  Through continuous improvement, we maintain the highest standards in library services.
                </p>
              </div>
            </div>
            <div className="flex gap-4">
              <Zap className="w-6 h-6 text-amber-600 flex-shrink-0 mt-1" />
              <div>
                <h3 className="font-bold mb-2">Innovation</h3>
                <p className="text-sm text-slate-700 dark:text-slate-300">
                  We embrace technology and new ideas to enhance the library experience for all.
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {stats.map((stat, idx) => (
            <div key={idx} className="card text-center">
              <p className="text-3xl font-bold text-sky-600 mb-2">{stat.number}</p>
              <p className="text-sm text-muted">{stat.label}</p>
            </div>
          ))}
        </div>

        {/* Why Choose Us */}
        <div>
          <h2 className="text-2xl font-bold mb-6">Why Choose Our Library?</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {features.map((feature, idx) => {
              const Icon = feature.icon;
              return (
                <div key={idx} className="card hover:shadow-lg transition-shadow">
                  <Icon className="w-8 h-8 text-sky-600 mb-3" />
                  <h3 className="font-bold mb-2">{feature.title}</h3>
                  <p className="text-sm text-slate-700 dark:text-slate-300">
                    {feature.description}
                  </p>
                </div>
              );
            })}
          </div>
        </div>

        {/* Milestones */}
        <div>
          <h2 className="text-2xl font-bold mb-6">Our Journey</h2>
          <div className="space-y-4">
            {milestones.map((milestone, idx) => (
              <div key={idx} className="card border-l-4 border-sky-600">
                <div className="flex items-start gap-4">
                  <div className="bg-sky-600 text-white px-3 py-1 rounded font-bold text-sm flex-shrink-0">
                    {milestone.year}
                  </div>
                  <div>
                    <h3 className="font-bold mb-1">{milestone.title}</h3>
                    <p className="text-sm text-slate-700 dark:text-slate-300">
                      {milestone.description}
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Team */}
        <div>
          <h2 className="text-2xl font-bold mb-6">Meet Our Team</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            {team.map((member, idx) => (
              <div key={idx} className="card text-center">
                <div className="text-5xl mb-3">{member.emoji}</div>
                <h3 className="font-bold">{member.name}</h3>
                <p className="text-xs text-muted mt-1">{member.role}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Contact CTA */}
        <div className="card bg-gradient-to-r from-sky-50 to-blue-50 dark:from-sky-900/30 dark:to-blue-900/30 text-center">
          <h2 className="text-2xl font-bold mb-3">Get in Touch</h2>
          <p className="text-slate-700 dark:text-slate-300 mb-6">
            Have questions or feedback? We'd love to hear from you!
          </p>
          <div className="flex flex-col sm:flex-row gap-3 justify-center">
            <button className="px-6 py-3 bg-sky-600 hover:bg-sky-700 text-white rounded-lg font-medium transition-smooth">
              Contact Us
            </button>
            <button className="px-6 py-3 border-2 border-sky-600 text-sky-600 hover:bg-sky-50 dark:hover:bg-sky-900/30 rounded-lg font-medium transition-smooth">
              Send Feedback
            </button>
          </div>
        </div>
      </div>
    </>
  );
};

export default AboutPage;

import React, { useState } from 'react';
import { ChevronDown, HelpCircle, MessageCircle, AlertCircle, Search } from 'lucide-react';
import MainLayout from './MainLayout';
import WelcomeBanner from '../components/WelcomeBanner';
import SearchBar from '../components/SearchBar';
import Badge from '../components/Badge';

const FAQPage = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [expandedId, setExpandedId] = useState(null);

  const faqs = [
    {
      category: 'Account & Authentication',
      icon: AlertCircle,
      color: 'primary',
      items: [
        {
          id: 1,
          question: 'How do I create an account?',
          answer: 'Click the "Get Started" button on the landing page. Fill in your details (first name, last name, username, email, and password), then click "Create Account". You\'ll receive a verification email to confirm your account.'
        },
        {
          id: 2,
          question: 'I forgot my password. How do I reset it?',
          answer: 'On the login page, click "Forgot Password?" Enter your email address. You\'ll receive an email with a link to reset your password. Click the link and follow the instructions to create a new password.'
        },
        {
          id: 3,
          question: 'How do I update my profile information?',
          answer: 'Go to your Profile page (click your avatar in the sidebar). Click the Edit button, update your information (name, email, phone, location), and click Save Changes.'
        },
        {
          id: 4,
          question: 'Can I change my username?',
          answer: 'Currently, usernames cannot be changed after account creation. This is to maintain consistency across the system. Contact support if you need assistance.'
        },
      ]
    },
    {
      category: 'Books & Borrowing',
      icon: HelpCircle,
      color: 'success',
      items: [
        {
          id: 5,
          question: 'How do I borrow a book?',
          answer: 'Browse the catalog, find a book you want, and click "Borrow" on the book details page. If the book is available, it will be added to your active borrowings. You\'ll have a default borrowing period of 14 days.'
        },
        {
          id: 6,
          question: 'What is the borrowing limit?',
          answer: 'Members can borrow up to 5 books at a time. Once you return a book, you can immediately borrow another one.'
        },
        {
          id: 7,
          question: 'How do I renew a book?',
          answer: 'Go to "My Bookshelf" and find the book you want to renew. If it\'s eligible for renewal (not requested by another member), click the "Renew" button. You can renew a book up to 2 times.'
        },
        {
          id: 8,
          question: 'What happens if I return a book late?',
          answer: 'Late returns incur a fine of Shs 1,000 per day. You can view your outstanding fines in your Dashboard. Pay online through the "Fine Payment" section in your profile.'
        },
        {
          id: 9,
          question: 'Can I reserve a book that\'s currently borrowed?',
          answer: 'Yes! If a book is not available, you can reserve it. You\'ll be notified via email when it becomes available. You have 3 days to pick it up before the reservation is cancelled.'
        },
      ]
    },
    {
      category: 'Search & Filters',
      icon: Search,
      color: 'warning',
      items: [
        {
          id: 10,
          question: 'How do I search for books?',
          answer: 'Use the search bar to find books by title, author, or ISBN. Results will show matching books with their availability status.'
        },
        {
          id: 11,
          question: 'Can I filter books by category?',
          answer: 'Yes! Use the category filter in the Browse Books page. You can select multiple categories to narrow down your search results.'
        },
        {
          id: 12,
          question: 'How do I sort search results?',
          answer: 'Click the Sort dropdown and choose from: Most Recent, Most Popular, Author (A-Z), or Title (A-Z). The results will be reordered instantly.'
        },
      ]
    },
    {
      category: 'Wishlist & Reviews',
      icon: MessageCircle,
      color: 'info',
      items: [
        {
          id: 13,
          question: 'How do I add a book to my wishlist?',
          answer: 'On any book details page, click the heart icon or "Add to Wishlist" button. You can view your wishlist from the sidebar under "My Wishlist".'
        },
        {
          id: 14,
          question: 'How do I leave a book review?',
          answer: 'After borrowing and returning a book, go to your borrowing history and find the book. Click "Leave Review", rate the book (1-5 stars), and write your review. Your review helps other members!'
        },
        {
          id: 15,
          question: 'Can I edit or delete my review?',
          answer: 'Yes. Go to your profile and find "My Reviews". You can edit or delete any review you\'ve written within 30 days of posting. After 30 days, reviews become permanent.'
        },
      ]
    },
    {
      category: 'Technical Issues',
      icon: AlertCircle,
      color: 'danger',
      items: [
        {
          id: 16,
          question: 'The app is loading slowly. What can I do?',
          answer: 'Try clearing your browser cache and cookies, then refresh the page. If the issue persists, try a different browser or update your current one. Contact support if the problem continues.'
        },
        {
          id: 17,
          question: 'I see an error message. What should I do?',
          answer: 'Take note of the error message and screenshot it if possible. Then try refreshing the page or logging out and back in. If the error persists, contact our support team with the error details.'
        },
        {
          id: 18,
          question: 'Is the app available on mobile?',
          answer: 'Currently, LMS is optimized for mobile browsers. Download the web app to your home screen for a native app-like experience. A native mobile app is in development.'
        },
      ]
    },
    {
      category: 'Billing & Fines',
      icon: HelpCircle,
      color: 'primary',
      items: [
        {
          id: 19,
          question: 'Are there any membership fees?',
          answer: 'No! LMS membership is completely free. You only pay fines if you return books late.'
        },
        {
          id: 20,
          question: 'What payment methods do you accept?',
          answer: 'We accept Visa, Mastercard, and Ugandan mobile money (MTN, Airtel). All payments are secure and encrypted.'
        },
      ]
    },
  ];

  const filteredFaqs = searchQuery.trim() === '' 
    ? faqs 
    : faqs.map(category => ({
        ...category,
        items: category.items.filter(item =>
          item.question.toLowerCase().includes(searchQuery.toLowerCase()) ||
          item.answer.toLowerCase().includes(searchQuery.toLowerCase())
        )
      })).filter(category => category.items.length > 0);

  return (
    <MainLayout>
      <div className="space-y-8 animate-fade-in">
        <WelcomeBanner 
          userName="Help & FAQ"
          userRole="support"
          primaryText="Find answers to common questions"
          secondaryText="Can't find what you're looking for? Contact our support team"
        />

        {/* Search Bar */}
        <div className="max-w-2xl mx-auto">
          <SearchBar
            placeholder="Search FAQs..."
            value={searchQuery}
            onChange={setSearchQuery}
            variant="default"
          />
        </div>

        {/* FAQ Sections */}
        <div className="max-w-4xl mx-auto space-y-8">
          {filteredFaqs.length > 0 ? (
            filteredFaqs.map((category, catIdx) => (
              <div key={catIdx}>
                <div className="flex items-center gap-3 mb-4">
                  <category.icon className={`w-6 h-6 text-${category.color}-600`} />
                  <h2 className="text-2xl font-bold">{category.category}</h2>
                  <Badge variant="primary">{category.items.length}</Badge>
                </div>

                <div className="space-y-2">
                  {category.items.map((item) => (
                    <div key={item.id} className="card border border-slate-200 dark:border-slate-700 p-0 overflow-hidden">
                      <button
                        onClick={() => setExpandedId(expandedId === item.id ? null : item.id)}
                        className="w-full flex items-center justify-between p-4 hover:bg-slate-50 dark:hover:bg-slate-800/50 transition-colors text-left"
                      >
                        <h3 className="font-semibold text-slate-900 dark:text-white">{item.question}</h3>
                        <ChevronDown
                          className={`w-5 h-5 text-slate-600 dark:text-slate-400 transition-transform flex-shrink-0 ${
                            expandedId === item.id ? 'rotate-180' : ''
                          }`}
                        />
                      </button>

                      {expandedId === item.id && (
                        <div className="px-4 py-3 bg-slate-50 dark:bg-slate-800/30 border-t border-slate-200 dark:border-slate-700">
                          <p className="text-slate-700 dark:text-slate-300 leading-relaxed">{item.answer}</p>
                        </div>
                      )}
                    </div>
                  ))}
                </div>
              </div>
            ))
          ) : (
            <div className="text-center py-12 bg-slate-50 dark:bg-slate-800/50 rounded-xl border-2 border-dashed border-slate-200 dark:border-slate-700">
              <HelpCircle className="w-12 h-12 text-slate-300 dark:text-slate-700 mx-auto mb-3" />
              <p className="text-muted font-medium">No results found</p>
              <p className="text-xs text-muted mt-1">Try searching with different keywords</p>
            </div>
          )}
        </div>

        {/* Contact Support */}
        <div className="max-w-4xl mx-auto bg-gradient-to-r from-sky-500 to-blue-600 dark:from-sky-900/40 dark:to-blue-900/40 rounded-xl p-8 text-white">
          <div className="flex flex-col md:flex-row items-center justify-between gap-4">
            <div>
              <h3 className="text-xl font-bold mb-2">Didn't find your answer?</h3>
              <p className="text-sky-100">Our support team is here to help. Contact us anytime.</p>
            </div>
            <button className="px-6 py-3 bg-white text-sky-600 rounded-lg font-semibold hover:bg-sky-50 transition-smooth flex-shrink-0">
              Contact Support
            </button>
          </div>
        </div>
      </div>
    </MainLayout>
  );
};

export default FAQPage;

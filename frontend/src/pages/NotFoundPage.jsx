import React from 'react';
import { Home, AlertTriangle, ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';
import { useTheme } from '../context/ThemeContext';

const NotFoundPage = () => {
  const { isDark } = useTheme();

  return (
    <div className={`min-h-screen flex items-center justify-center ${isDark ? 'dark' : ''}`}>
      <div className="relative w-full">
        {/* Animated background */}
        <div className="absolute inset-0 bg-gradient-to-br from-sky-50 to-blue-50 dark:from-slate-900 dark:to-slate-800 -z-10"></div>
        <div className="absolute top-20 right-20 w-72 h-72 bg-sky-200 dark:bg-sky-900/20 rounded-full blur-3xl opacity-30 -z-10"></div>
        <div className="absolute -bottom-40 left-20 w-80 h-80 bg-blue-200 dark:bg-blue-900/20 rounded-full blur-3xl opacity-30 -z-10"></div>

        {/* Content */}
        <div className="px-4 py-20 max-w-2xl mx-auto text-center">
          {/* 404 Number */}
          <div className="mb-8 relative">
            <h1 className="text-9xl font-black text-transparent bg-clip-text bg-gradient-to-r from-sky-600 to-blue-600 drop-shadow-lg">
              404
            </h1>
            <AlertTriangle className="w-16 h-16 text-amber-500 absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 animate-bounce" />
          </div>

          {/* Message */}
          <h2 className="text-4xl font-bold text-slate-900 dark:text-white mb-4">Oops! Page Not Found</h2>
          <p className="text-lg text-slate-600 dark:text-slate-300 mb-2">
            The page you're looking for seems to have disappeared.
          </p>
          <p className="text-slate-500 dark:text-slate-400 mb-8">
            It might have been moved, deleted, or never existed in the first place.
          </p>

          {/* Quick Links */}
          <div className="bg-white dark:bg-slate-800 rounded-2xl p-8 shadow-lg mb-8 border border-slate-200 dark:border-slate-700">
            <p className="text-sm font-semibold text-slate-600 dark:text-slate-300 mb-4">Quick Navigation</p>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <Link
                to="/dashboard"
                className="flex items-center justify-center gap-2 p-3 bg-sky-600 text-white rounded-lg hover:bg-sky-700 transition-smooth font-medium"
              >
                <Home className="w-5 h-5" /> Dashboard
              </Link>
              <Link
                to="/books"
                className="flex items-center justify-center gap-2 p-3 border-2 border-sky-600 text-sky-600 dark:text-sky-400 rounded-lg hover:bg-sky-50 dark:hover:bg-sky-900/20 transition-smooth font-medium"
              >
                Browse Books
              </Link>
              <Link
                to="/"
                className="flex items-center justify-center gap-2 p-3 border-2 border-slate-200 dark:border-slate-700 text-slate-700 dark:text-slate-300 rounded-lg hover:bg-slate-50 dark:hover:bg-slate-800 transition-smooth font-medium"
              >
                Home Page
              </Link>
            </div>
          </div>

          {/* Help Text */}
          <p className="text-slate-500 dark:text-slate-400 mb-6">
            If you think this is a mistake, please <span className="text-sky-600 font-semibold">contact our support team</span>.
          </p>

          {/* Back Button */}
          <button
            onClick={() => window.history.back()}
            className="inline-flex items-center gap-2 px-6 py-3 bg-slate-100 hover:bg-slate-200 dark:bg-slate-800 dark:hover:bg-slate-700 rounded-lg font-medium text-slate-900 dark:text-white transition-smooth"
          >
            Go Back
            <ArrowRight className="w-4 h-4 rotate-180" />
          </button>
        </div>

        {/* Footer Info */}
        <div className="absolute bottom-8 left-0 right-0">
          <p className="text-center text-xs text-slate-500 dark:text-slate-500">
            Error Code: 404 | Page Not Found | <Link to="/" className="text-sky-600 hover:underline">Return to Home</Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default NotFoundPage;

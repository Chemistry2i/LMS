import React from 'react';
import { Link } from 'react-router-dom';
import { useTheme } from '../context/ThemeContext';
import { MailCheck, ArrowRight, RefreshCcw, BookOpen, Sun, Moon } from 'lucide-react';
import toast from 'react-hot-toast';

const VerifyEmailPage = () => {
  const { isDark, toggleTheme } = useTheme();
  const handleResend = () => {
    toast.success('Verification link resent to your email!');
  };

  return (
    <div className={`min-h-screen ${isDark ? 'dark' : ''} bg-slate-50 dark:bg-slate-950 font-outfit`}>
      <nav className="fixed top-0 w-full bg-white/80 dark:bg-slate-900/80 backdrop-blur-md z-50 border-b border-slate-100 dark:border-slate-800">
        <div className="max-w-7xl mx-auto px-4 h-16 flex items-center justify-between">
          <Link to="/" className="flex items-center gap-2">
            <div className="w-8 h-8 bg-sky-600 rounded-lg flex items-center justify-center">
              <BookOpen className="w-5 h-5 text-white" />
            </div>
            <span className="text-xl font-bold text-slate-900 dark:text-white">LMS</span>
          </Link>
          <div className="flex items-center gap-4">
            <button onClick={toggleTheme} className="p-2 rounded-lg bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-700 transition-smooth">
              {isDark ? <Sun className="w-5 h-5 text-amber-500" /> : <Moon className="w-5 h-5 text-sky-600" />}
            </button>
            <Link to="/" className="text-sm font-bold text-slate-500 hover:text-sky-600 transition-smooth">
              Back to Home
            </Link>
          </div>
        </div>
      </nav>

      <div className="min-h-screen flex items-center justify-center pt-16 bg-gradient-to-br from-sky-50 to-blue-50 dark:from-slate-900 dark:to-slate-800">
        <div className="max-w-md w-full mx-4">
          <div className="card shadow-2xl text-center">
            <div className="w-20 h-20 bg-sky-100 dark:bg-sky-900/30 rounded-full flex items-center justify-center mx-auto mb-6">
              <MailCheck className="w-10 h-10 text-sky-600" />
            </div>
            <h1 className="text-2xl font-bold text-slate-900 dark:text-white mb-2">Verify your email</h1>
            <p className="text-muted mb-8 leading-relaxed">
              We've sent a verification link to your email address. Please click the link to activate your account.
            </p>
            <div className="space-y-4">
              <Link 
                to="/login" 
                className="w-full py-4 bg-gradient-to-r from-sky-500 to-blue-600 text-white rounded-xl font-bold hover:shadow-lg transition-smooth flex items-center justify-center gap-2"
              >
                Back to Login <ArrowRight className="w-5 h-5" />
              </Link>
              <button 
                onClick={handleResend}
                className="flex items-center justify-center gap-2 mx-auto text-sm font-bold text-slate-500 hover:text-sky-600 transition-smooth"
              >
                <RefreshCcw className="w-4 h-4" /> Resend verification email
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default VerifyEmailPage;
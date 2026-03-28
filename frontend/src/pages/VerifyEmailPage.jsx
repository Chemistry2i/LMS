import React from 'react';
import { Link } from 'react-router-dom';
import { MailCheck, ArrowRight, RefreshCcw } from 'lucide-react';
import toast from 'react-hot-toast';

const VerifyEmailPage = () => {
  const handleResend = () => {
    toast.success('Verification link resent to your email!');
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-sky-50 to-blue-50 dark:from-slate-900 dark:to-slate-800 font-outfit">
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
  );
};

export default VerifyEmailPage;
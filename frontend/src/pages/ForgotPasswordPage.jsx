import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import toast from 'react-hot-toast';
import { Mail, ArrowRight, ArrowLeft } from 'lucide-react';

const ForgotPasswordPage = () => {
  const [email, setEmail] = useState('');
  const [loading, setLoading] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1500));
      setSubmitted(true);
      toast.success('Reset link sent to your email!');
    } catch (error) {
      toast.error('Something went wrong. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-sky-50 to-blue-50 dark:from-slate-900 dark:to-slate-800 font-outfit">
      <div className="max-w-md w-full mx-4">
        <div className="card shadow-2xl">
          {!submitted ? (
            <>
              <div className="text-center mb-8">
                <h1 className="heading-md text-slate-900 dark:text-white">Forgot Password?</h1>
                <p className="text-muted mt-2">Enter your email and we'll send you a link to reset your password.</p>
              </div>
              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="space-y-2">
                  <label className="text-sm font-semibold text-slate-700 dark:text-slate-300 ml-1">Email Address</label>
                  <div className="relative">
                    <Mail className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400" />
                    <input required type="email" value={email} onChange={(e) => setEmail(e.target.value)} placeholder="you@example.com" className="input-base pl-12 h-12" />
                  </div>
                </div>
                <button disabled={loading} type="submit" className="w-full py-4 bg-gradient-to-r from-sky-500 to-blue-600 text-white rounded-xl font-bold hover:shadow-lg transition-smooth flex items-center justify-center gap-2 disabled:opacity-50">
                  {loading ? 'Sending...' : 'Send Reset Link'}
                  {!loading && <ArrowRight className="w-5 h-5" />}
                </button>
              </form>
            </>
          ) : (
            <div className="text-center py-8">
              <div className="w-16 h-16 bg-sky-100 dark:bg-sky-900 rounded-full flex items-center justify-center mx-auto mb-6"><Mail className="w-8 h-8 text-sky-600" /></div>
              <h2 className="text-2xl font-bold text-slate-900 dark:text-white mb-2">Check your email</h2>
              <p className="text-muted mb-8">We've sent a password reset link to <span className="font-bold text-slate-900 dark:text-white">{email}</span></p>
              <button onClick={() => setSubmitted(false)} className="text-sky-600 font-bold hover:underline">Try another email</button>
            </div>
          )}
          <div className="mt-8 pt-6 border-t border-slate-100 dark:border-slate-800 text-center">
            <Link to="/login" className="inline-flex items-center gap-2 text-sm font-bold text-slate-500 hover:text-sky-600 transition-smooth"><ArrowLeft className="w-4 h-4" /> Back to Login</Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ForgotPasswordPage;
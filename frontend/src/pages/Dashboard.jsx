import React from 'react';
import { useAuth } from '../context/AuthContext';
import { Book, Clock, Star, Search, ArrowRight, AlertCircle, CheckCircle2 } from 'lucide-react';
import { Link } from 'react-router-dom';
import MainLayout from './MainLayout';
import WelcomeBanner from '../components/WelcomeBanner';

const Dashboard = () => {
  const { user } = useAuth();

  const dashboardStats = [
    { label: 'Active Borrowings', value: '3', icon: Book },
    { label: 'Pending Returns', value: '1', icon: AlertCircle },
    { label: 'My Reviews', value: '7', icon: Star },
    { label: 'Wishlist', value: '12', icon: CheckCircle2 },
  ];

  return (
    <MainLayout>
      <div className="space-y-8 animate-fade-in">
        <WelcomeBanner 
          userName={user?.username || 'Member'}
          userRole="member"
          primaryText="Ready to explore some knowledge today?"
          secondaryText="Discover new books, track your borrowings, and connect with the library community"
          stats={dashboardStats}
        />

        <div className="flex flex-wrap gap-3 mb-6">
          <Link to="/books" className="px-6 py-3 bg-sky-600 text-white rounded-lg flex items-center gap-2 hover:bg-sky-700 transition-smooth font-medium">
            <Search className="w-5 h-5" /> Browse Books
          </Link>
          <Link to="/my-library" className="px-6 py-3 border-2 border-sky-600 text-sky-600 dark:text-sky-400 rounded-lg flex items-center gap-2 hover:bg-sky-50 dark:hover:bg-sky-900/20 transition-smooth font-medium">
            <Book className="w-5 h-5" /> My Bookshelf
          </Link>
        </div>

        <div className="grid md:grid-cols-3 gap-6">
            <div className="card-compact bg-sky-50 dark:bg-sky-900/20 border-sky-100 dark:border-sky-800">
              <div className="text-3xl font-bold text-sky-600">0</div>
              <p className="text-muted mt-2">Active Borrowings</p>
            </div>

            <div className="card-compact bg-blue-50 dark:bg-blue-900/20 border-blue-100 dark:border-blue-800">
              <div className="text-3xl font-bold text-blue-600">0</div>
              <p className="text-muted mt-2">Total Reviews</p>
            </div>

            <div className="card-compact bg-indigo-50 dark:bg-indigo-900/20 border-indigo-100 dark:border-indigo-800">
              <div className="text-3xl font-bold text-indigo-600">Shs 0</div>
              <p className="text-muted mt-2">Outstanding Fines</p>
            </div>
        </div>

        {/* Recently Viewed / Recommended */}
        <div className="mt-8 grid md:grid-cols-2 gap-8">
           <div className="card">
              <h3 className="font-bold flex items-center justify-between mb-4">
                <span className="flex items-center gap-2">
                <Clock className="w-5 h-5 text-sky-500" /> Recently Viewed
                </span>
                <Link to="/history" className="text-xs text-sky-600 hover:underline">View History</Link>
              </h3>
              <div className="text-center py-12 bg-slate-50 dark:bg-slate-800/20 rounded-2xl border-2 border-dashed border-slate-200 dark:border-slate-800">
                 <p className="text-muted text-sm italic">You haven't browsed any books yet.</p>
                 <Link to="/books" className="text-sky-600 text-sm font-bold mt-2 inline-block">Explore Catalog</Link>
              </div>
           </div>
           <div className="card">
              <h3 className="font-bold flex items-center gap-2 mb-4">
                <Star className="w-5 h-5 text-yellow-500" /> Recommended for You
              </h3>
              <div className="space-y-4">
                 {[1, 2].map(i => (
                   <div key={i} className="flex gap-4 p-3 bg-slate-50 dark:bg-slate-800/50 rounded-lg animate-pulse">
                      <div className="w-12 h-16 bg-slate-200 dark:bg-slate-700 rounded" />
                      <div className="flex-1 space-y-2">
                         <div className="h-4 bg-slate-200 dark:bg-slate-700 rounded w-3/4" />
                         <div className="h-3 bg-slate-200 dark:bg-slate-700 rounded w-1/2" />
                      </div>
                   </div>
                 ))}
              </div>
           </div>
        </div>
      </div>
    </MainLayout>
  );
};

export default Dashboard;

import React from 'react';
import { useAuth } from '../context/AuthContext';
import { LogOut, Book, Clock, Star, Search } from 'lucide-react';
import { Link } from 'react-router-dom';

const Dashboard = () => {
  const { user, logout } = useAuth();

  const handleLogout = async () => {
    await logout();
  };

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-950">
      <nav className="bg-white dark:bg-slate-800 shadow-subtle">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
          <h1 className="text-xl font-bold text-sky-600">LMS Dashboard</h1>
          <button
            onClick={handleLogout}
            className="flex items-center gap-2 px-4 py-2 rounded-lg hover:bg-slate-100 dark:hover:bg-slate-700 transition-smooth"
          >
            <LogOut className="w-5 h-5" />
            Logout
          </button>
        </div>
      </nav>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="card">
          <h2 className="heading-md mb-4">Welcome, {user?.username}!</h2>
          <div className="flex flex-wrap gap-4 mb-8">
             <Link to="/books" className="px-6 py-3 bg-sky-600 text-white rounded-lg flex items-center gap-2 hover:bg-sky-700 transition-smooth">
                <Search className="w-5 h-5" /> Browse Books
             </Link>
             <Link to="/my-library" className="px-6 py-3 border border-slate-200 dark:border-slate-700 rounded-lg flex items-center gap-2 hover:bg-slate-50 dark:hover:bg-slate-800 transition-smooth">
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
              <div className="text-3xl font-bold text-indigo-600">$0</div>
              <p className="text-muted mt-2">Outstanding Fines</p>
            </div>
          </div>
        </div>

        {/* Recently Viewed / Recommended */}
        <div className="mt-8 grid md:grid-cols-2 gap-8">
           <div className="card">
              <h3 className="font-bold flex items-center gap-2 mb-4">
                <Clock className="w-5 h-5 text-sky-500" /> Recently Viewed
              </h3>
              <div className="text-center py-10 border-2 border-dashed border-slate-200 dark:border-slate-800 rounded-xl">
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
    </div>
  );
};

export default Dashboard;

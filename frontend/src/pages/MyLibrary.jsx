import React, { useState } from 'react';
import MainLayout from './MainLayout';
import BookCard from './BookCard';
import { Library, Clock, CheckCircle2, AlertCircle } from 'lucide-react';

const MyLibrary = () => {
  // Mock data for user's borrowed books
  const borrowedBooks = [
    { 
      id: 1, 
      title: 'Things Fall Apart', 
      author: 'Chinua Achebe', 
      category: 'Fiction', 
      status: 'Borrowed', 
      dueDate: '2026-04-15',
      fine_per_day: 500 
    },
    { 
      id: 3, 
      title: 'Kintu', 
      author: 'Jennifer Nansubuga Makumbi', 
      category: 'Luganda Literature', 
      status: 'Borrowed', 
      dueDate: '2026-04-10',
      fine_per_day: 500 
    },
  ];

  const stats = [
    { label: 'Currently Borrowed', value: borrowedBooks.length, icon: Library, color: 'text-sky-600', bg: 'bg-sky-50' },
    { label: 'Due Soon', value: '1', icon: Clock, color: 'text-amber-600', bg: 'bg-amber-50' },
    { label: 'Returned (Month)', value: '4', icon: CheckCircle2, color: 'text-emerald-600', bg: 'bg-emerald-50' },
    { label: 'Overdue Fines', value: 'Shs 0', icon: AlertCircle, color: 'text-rose-600', bg: 'bg-rose-50' },
  ];

  return (
    <MainLayout>
      <div className="flex flex-col gap-8">
        {/* Header */}
        <div>
          <h1 className="text-3xl font-bold text-slate-900 dark:text-white">My Bookshelf</h1>
          <p className="text-muted mt-1">Manage your active borrowings and track due dates</p>
        </div>

        {/* Quick Stats */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {stats.map((stat, idx) => (
            <div key={idx} className="card bg-white dark:bg-slate-900 border-none shadow-subtle p-6">
              <div className={`${stat.bg} w-12 h-12 rounded-xl flex items-center justify-center mb-4`}>
                <stat.icon className={`w-6 h-6 ${stat.color}`} />
              </div>
              <p className="text-xs font-medium text-slate-500 uppercase tracking-wider">{stat.label}</p>
              <h3 className="text-2xl font-bold mt-1">{stat.value}</h3>
            </div>
          ))}
        </div>

        {/* Active Borrowings Section */}
        <div className="space-y-6">
          <div className="flex items-center justify-between">
            <h2 className="text-xl font-bold flex items-center gap-2">
              <Library className="w-5 h-5 text-sky-600" />
              Active Borrowings
            </h2>
          </div>

          {borrowedBooks.length > 0 ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
              {borrowedBooks.map(book => (
                <div key={book.id} className="relative group">
                  <BookCard book={book} />
                  <div className="mt-2 px-3 py-2 bg-amber-50 dark:bg-amber-900/20 border border-amber-100 dark:border-amber-800 rounded-lg">
                    <p className="text-[10px] font-bold text-amber-700 dark:text-amber-400 uppercase tracking-tight">
                      Due: {new Date(book.dueDate).toLocaleDateString('en-GB', { day: 'numeric', month: 'short', year: 'numeric' })}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="flex flex-col items-center justify-center py-20 bg-white dark:bg-slate-900 rounded-3xl border-2 border-dashed border-slate-200 dark:border-slate-800">
              <div className="w-20 h-20 bg-slate-50 dark:bg-slate-800 rounded-full flex items-center justify-center mb-4">
                <Library className="w-10 h-10 text-slate-300" />
              </div>
              <h3 className="text-xl font-bold">Your shelf is empty</h3>
              <p className="text-muted max-w-xs text-center mt-2">
                You haven't borrowed any books recently. Browse our catalog to find your next great read!
              </p>
              <button className="mt-6 px-6 py-2 bg-sky-600 text-white rounded-lg font-bold hover:bg-sky-700 transition-smooth">
                Explore Catalog
              </button>
            </div>
          )}
        </div>
      </div>
    </MainLayout>
  );
};

export default MyLibrary;
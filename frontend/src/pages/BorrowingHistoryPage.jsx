import React, { useState } from 'react';
import { Download, Calendar, Copy, AlertCircle } from 'lucide-react';
import MainLayout from './MainLayout';
import WelcomeBanner from '../components/WelcomeBanner';
import Breadcrumb from '../components/Breadcrumb';
import Badge from '../components/Badge';
import Pagination from '../components/Pagination';

const BorrowingHistoryPage = () => {
  const [currentPage, setCurrentPage] = useState(1);

  const borrowingHistory = [
    {
      id: 1,
      title: 'The Midnight Library',
      author: 'Matt Haig',
      isbn: '978-0020195368',
      borrowedDate: new Date(2026, 5, 15),
      returnedDate: new Date(2026, 6, 1),
      daysOverdue: 0,
      status: 'returned',
      fineAmount: 0,
      coverImage: '📚',
    },
    {
      id: 2,
      title: 'Atomic Habits',
      author: 'James Clear',
      isbn: '978-0735211292',
      borrowedDate: new Date(2026, 6, 5),
      returnedDate: new Date(2026, 7, 15),
      daysOverdue: 2,
      status: 'returned',
      fineAmount: 2000,
      coverImage: '📖',
    },
    {
      id: 3,
      title: 'Educated',
      author: 'Tara Westover',
      isbn: '978-0399590504',
      borrowedDate: new Date(2026, 7, 20),
      returnedDate: null,
      daysOverdue: 5,
      status: 'overdue',
      fineAmount: 5000,
      coverImage: '📕',
    },
    {
      id: 4,
      title: 'The Lean Startup',
      author: 'Eric Ries',
      isbn: '978-0307887894',
      borrowedDate: new Date(2026, 4, 10),
      returnedDate: new Date(2026, 5, 10),
      daysOverdue: 0,
      status: 'returned',
      fineAmount: 0,
      coverImage: '📗',
    },
    {
      id: 5,
      title: 'Thinking, Fast and Slow',
      author: 'Daniel Kahneman',
      isbn: '978-0374275631',
      borrowedDate: new Date(2026, 8, 1),
      returnedDate: null,
      daysOverdue: 0,
      status: 'active',
      fineAmount: 0,
      coverImage: '📘',
    },
  ];

  const itemsPerPage = 5;
  const totalPages = Math.ceil(borrowingHistory.length / itemsPerPage);
  const paginatedItems = borrowingHistory.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  const getStatusBadge = (status, daysOverdue) => {
    if (status === 'returned') {
      return <Badge variant="success">Returned</Badge>;
    }
    if (status === 'overdue') {
      return <Badge variant="danger">Overdue ({daysOverdue} days)</Badge>;
    }
    return <Badge variant="primary">Active</Badge>;
  };

  const getStatusColor = (status) => {
    if (status === 'returned') return 'text-emerald-600';
    if (status === 'overdue') return 'text-red-600';
    return 'text-sky-600';
  };

  const formatDate = (date) => {
    return new Date(date).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
    });
  };

  const calculateDaysBorrowed = (borrowed, returned) => {
    const end = returned || new Date();
    const start = new Date(borrowed);
    return Math.floor((end - start) / (1000 * 60 * 60 * 24));
  };

  return (
    <MainLayout>
      <div className="space-y-8 animate-fade-in">
        <WelcomeBanner 
          userName="Borrowing History"
          userRole="member"
          primaryText="View your complete borrowing record"
          secondaryText="Track books you've borrowed, returned dates, and any fines"
        />

        <Breadcrumb items={[
          { label: 'My Library', href: '/my-library' },
          { label: 'Borrowing History' },
        ]} />

        {/* Summary Cards */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <div className="card bg-sky-50 dark:bg-sky-900/20 border-sky-200 dark:border-sky-800">
            <p className="text-muted text-sm">Total Borrowed</p>
            <p className="text-3xl font-bold text-sky-600 mt-2">{borrowingHistory.length}</p>
          </div>
          <div className="card bg-emerald-50 dark:bg-emerald-900/20 border-emerald-200 dark:border-emerald-800">
            <p className="text-muted text-sm">Currently Active</p>
            <p className="text-3xl font-bold text-emerald-600 mt-2">
              {borrowingHistory.filter(b => b.status === 'active').length}
            </p>
          </div>
          <div className="card bg-red-50 dark:bg-red-900/20 border-red-200 dark:border-red-800">
            <p className="text-muted text-sm">Overdue</p>
            <p className="text-3xl font-bold text-red-600 mt-2">
              {borrowingHistory.filter(b => b.status === 'overdue').length}
            </p>
          </div>
          <div className="card bg-amber-50 dark:bg-amber-900/20 border-amber-200 dark:border-amber-800">
            <p className="text-muted text-sm">Outstanding Fines</p>
            <p className="text-3xl font-bold text-amber-600 mt-2">
              Shs {borrowingHistory.reduce((sum, b) => sum + b.fineAmount, 0).toLocaleString()}
            </p>
          </div>
        </div>

        {/* Borrowing Records */}
        <div className="card">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-2xl font-bold">Borrowing Records</h2>
            <button className="flex items-center gap-2 px-4 py-2 bg-sky-100 dark:bg-sky-900/30 text-sky-600 dark:text-sky-400 rounded-lg hover:bg-sky-200 dark:hover:bg-sky-900/50 transition-smooth font-medium text-sm">
              <Download className="w-4 h-4" /> Export as PDF
            </button>
          </div>

          {/* Table */}
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b-2 border-slate-200 dark:border-slate-700">
                  <th className="text-left py-4 px-4 font-semibold text-slate-900 dark:text-white">Book Title</th>
                  <th className="text-left py-4 px-4 font-semibold text-slate-900 dark:text-white">Author</th>
                  <th className="text-left py-4 px-4 font-semibold text-slate-900 dark:text-white">Borrowed Date</th>
                  <th className="text-left py-4 px-4 font-semibold text-slate-900 dark:text-white">Days</th>
                  <th className="text-left py-4 px-4 font-semibold text-slate-900 dark:text-white">Status</th>
                  <th className="text-right py-4 px-4 font-semibold text-slate-900 dark:text-white">Fine</th>
                </tr>
              </thead>
              <tbody>
                {paginatedItems.map((item) => (
                  <tr key={item.id} className="border-b border-slate-200 dark:border-slate-700 hover:bg-slate-50 dark:hover:bg-slate-800/50 transition-colors">
                    <td className="py-4 px-4">
                      <div className="flex items-center gap-3">
                        <span className="text-2xl">{item.coverImage}</span>
                        <div className="text-left">
                          <p className="font-semibold text-slate-900 dark:text-white">{item.title}</p>
                          <p className="text-xs text-muted">ISBN: {item.isbn}</p>
                        </div>
                      </div>
                    </td>
                    <td className="py-4 px-4 text-slate-700 dark:text-slate-300">{item.author}</td>
                    <td className="py-4 px-4 text-slate-700 dark:text-slate-300">
                      {formatDate(item.borrowedDate)}
                    </td>
                    <td className="py-4 px-4">
                      <span className={`font-medium ${getStatusColor(item.status)}`}>
                        {calculateDaysBorrowed(item.borrowedDate, item.returnedDate)}d
                      </span>
                    </td>
                    <td className="py-4 px-4">
                      {getStatusBadge(item.status, item.daysOverdue)}
                    </td>
                    <td className="py-4 px-4 text-right">
                      <span className={`font-semibold ${item.fineAmount > 0 ? 'text-red-600' : 'text-emerald-600'}`}>
                        {item.fineAmount > 0 ? `Shs ${item.fineAmount.toLocaleString()}` : 'No Fine'}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* Pagination */}
          <div className="mt-6 pt-6 border-t border-slate-200 dark:border-slate-700">
            <Pagination
              currentPage={currentPage}
              totalPages={totalPages}
              onPageChange={setCurrentPage}
              itemsPerPage={itemsPerPage}
              totalItems={borrowingHistory.length}
            />
          </div>
        </div>

        {/* Overdue Notice */}
        {borrowingHistory.some(b => b.status === 'overdue') && (
          <div className="card bg-red-50 dark:bg-red-900/20 border-l-4 border-red-600">
            <div className="flex gap-4">
              <AlertCircle className="w-6 h-6 text-red-600 flex-shrink-0 mt-0.5" />
              <div>
                <h3 className="font-bold text-red-900 dark:text-red-100">You have overdue books</h3>
                <p className="text-sm text-red-800 dark:text-red-200 mt-2">
                  Please return your overdue books as soon as possible. Fines accumulate daily.
                </p>
                <button className="mt-4 px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-smooth font-medium text-sm">
                  Return Books
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </MainLayout>
  );
};

export default BorrowingHistoryPage;

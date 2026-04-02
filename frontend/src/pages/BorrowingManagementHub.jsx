import React, { useState } from 'react';
import { motion } from 'framer-motion';
import {
  BarChart3,
  BookMarked,
  AlertCircle,
  Clock,
  History,
  CheckCircle2,
  Zap,
} from 'lucide-react';
import MainLayout from './MainLayout';

// Simple content components for each tab
const OverviewContent = () => (
  <div className="p-8">
    <div className="bg-gradient-to-r from-sky-50 to-blue-50 dark:from-slate-800 dark:to-slate-900 rounded-lg p-12 text-center">
      <BarChart3 className="w-16 h-16 mx-auto mb-4 text-sky-600" />
      <h2 className="text-2xl font-bold text-slate-900 dark:text-white mb-2">Borrowing Overview</h2>
      <p className="text-slate-600 dark:text-slate-400">Dashboard with key metrics and statistics</p>
    </div>
  </div>
);

const ActiveBorrowingsContent = () => (
  <div className="p-8">
    <div className="bg-white dark:bg-slate-800 rounded-lg p-8">
      <h2 className="text-2xl font-bold text-slate-900 dark:text-white mb-4">Active Borrowings</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {[1, 2, 3, 4, 5, 6].map(i => (
          <div key={i} className="border border-slate-200 dark:border-slate-700 rounded-lg p-4 hover:shadow-md transition-shadow">
            <div className="flex items-start gap-3">
              <BookMarked className="w-5 h-5 text-sky-600 mt-1" />
              <div className="flex-1">
                <p className="font-semibold text-slate-900 dark:text-white">Borrowing #{i}</p>
                <p className="text-sm text-slate-600 dark:text-slate-400">Member: John Doe</p>
                <p className="text-sm text-slate-600 dark:text-slate-400">Due: 2025-03-24</p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  </div>
);

const OverdueContent = () => (
  <div className="p-8">
    <div className="bg-red-50 dark:bg-red-900/20 rounded-lg p-8 border border-red-200 dark:border-red-800">
      <div className="flex items-center gap-3 mb-4">
        <AlertCircle className="w-6 h-6 text-red-600" />
        <h2 className="text-2xl font-bold text-red-900 dark:text-red-200">Overdue Items</h2>
      </div>
      <p className="text-red-700 dark:text-red-300 mb-4">12 items are currently overdue</p>
      <div className="space-y-3">
        {[1, 2, 3].map(i => (
          <div key={i} className="bg-white dark:bg-slate-800 p-4 rounded-lg flex items-center justify-between">
            <div>
              <p className="font-semibold text-slate-900 dark:text-white">Book Title #{i}</p>
              <p className="text-sm text-slate-600 dark:text-slate-400">Overdue by 5 days</p>
            </div>
            <span className="bg-red-100 dark:bg-red-900/30 text-red-700 dark:text-red-300 px-3 py-1 rounded-full text-sm font-semibold">5 days</span>
          </div>
        ))}
      </div>
    </div>
  </div>
);

const DueSoonContent = () => (
  <div className="p-8">
    <div className="bg-yellow-50 dark:bg-yellow-900/20 rounded-lg p-8 border border-yellow-200 dark:border-yellow-800">
      <div className="flex items-center gap-3 mb-4">
        <Clock className="w-6 h-6 text-yellow-600" />
        <h2 className="text-2xl font-bold text-yellow-900 dark:text-yellow-200">Due Soon</h2>
      </div>
      <p className="text-yellow-700 dark:text-yellow-300 mb-4">Books due within the next 3 days</p>
      <div className="space-y-3">
        {[1, 2, 3, 4].map(i => (
          <div key={i} className="bg-white dark:bg-slate-800 p-4 rounded-lg flex items-center justify-between">
            <div>
              <p className="font-semibold text-slate-900 dark:text-white">Book Title #{i}</p>
              <p className="text-sm text-slate-600 dark:text-slate-400">Due in {i} day(s)</p>
            </div>
            <span className="bg-yellow-100 dark:bg-yellow-900/30 text-yellow-700 dark:text-yellow-300 px-3 py-1 rounded-full text-sm font-semibold">{i}d</span>
          </div>
        ))}
      </div>
    </div>
  </div>
);

const HistoryContent = () => (
  <div className="p-8">
    <div className="bg-white dark:bg-slate-800 rounded-lg p-8">
      <h2 className="text-2xl font-bold text-slate-900 dark:text-white mb-4">Borrowing History</h2>
      <div className="space-y-3">
        {[1, 2, 3, 4, 5].map(i => (
          <div key={i} className="border border-slate-200 dark:border-slate-700 rounded-lg p-4 flex items-center justify-between">
            <div>
              <p className="font-semibold text-slate-900 dark:text-white">Book #{i} - Returned</p>
              <p className="text-sm text-slate-600 dark:text-slate-400">Returned on 2025-03-20</p>
            </div>
            <span className="bg-green-100 dark:bg-green-900/30 text-green-700 dark:text-green-300 px-3 py-1 rounded-full text-sm font-semibold">Returned</span>
          </div>
        ))}
      </div>
    </div>
  </div>
);

const ProcessReturnContent = () => (
  <div className="p-8">
    <div className="bg-white dark:bg-slate-800 rounded-lg p-8">
      <h2 className="text-2xl font-bold text-slate-900 dark:text-white mb-4">Process Return</h2>
      <div className="space-y-4">
        <div className="border border-slate-200 dark:border-slate-700 rounded-lg p-6">
          <div className="flex items-center justify-between mb-4">
            <div>
              <p className="font-semibold text-slate-900 dark:text-white">Book Title</p>
              <p className="text-sm text-slate-600 dark:text-slate-400">ISBN: 978-0743273565</p>
            </div>
            <button className="bg-sky-600 text-white px-4 py-2 rounded-lg hover:bg-sky-700 transition-colors">Process Return</button>
          </div>
        </div>
      </div>
    </div>
  </div>
);

const RenewBooksContent = () => (
  <div className="p-8">
    <div className="bg-white dark:bg-slate-800 rounded-lg p-8">
      <h2 className="text-2xl font-bold text-slate-900 dark:text-white mb-4">Renew Books</h2>
      <div className="space-y-3">
        {[1, 2, 3, 4].map(i => (
          <div key={i} className="border border-slate-200 dark:border-slate-700 rounded-lg p-4 flex items-center justify-between">
            <div>
              <p className="font-semibold text-slate-900 dark:text-white">Book #{i}</p>
              <p className="text-sm text-slate-600 dark:text-slate-400">Current due: 2025-03-24</p>
            </div>
            <button className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors">Renew</button>
          </div>
        ))}
      </div>
    </div>
  </div>
);

const BorrowingManagementHub = () => {
  const [activeTab, setActiveTab] = useState('overview');

  const tabs = [
    {
      id: 'overview',
      label: 'Overview',
      icon: BarChart3,
      component: OverviewContent,
    },
    {
      id: 'active',
      label: 'Active Borrowings',
      icon: BookMarked,
      component: ActiveBorrowingsContent,
    },
    {
      id: 'overdue',
      label: 'Overdue Items',
      icon: AlertCircle,
      component: OverdueContent,
      badge: '12',
      badgeColor: 'bg-red-500',
    },
    {
      id: 'due-soon',
      label: 'Due Soon',
      icon: Clock,
      component: DueSoonContent,
    },
    {
      id: 'history',
      label: 'History',
      icon: History,
      component: HistoryContent,
    },
    {
      id: 'process-return',
      label: 'Process Return',
      icon: CheckCircle2,
      component: ProcessReturnContent,
    },
    {
      id: 'renew',
      label: 'Renew Books',
      icon: Zap,
      component: RenewBooksContent,
    },
  ];

  const activeTabData = tabs.find((tab) => tab.id === activeTab);
  const ActiveComponent = activeTabData?.component;

  return (
    <MainLayout>
      <div className="min-h-screen bg-slate-50 dark:bg-slate-950">
        {/* Header */}
        <div className="bg-white dark:bg-slate-900 border-b border-slate-200 dark:border-slate-800 p-6">
          <h1 className="text-3xl font-bold text-slate-900 dark:text-white mb-2">
            📚 Borrowing Management Hub
          </h1>
          <p className="text-slate-600 dark:text-slate-400">
            Manage all library borrowing operations in one place
          </p>
        </div>

        {/* Tab Navigation */}
        <div className="bg-white dark:bg-slate-900 border-b border-slate-200 dark:border-slate-800 sticky top-0 z-30 shadow-sm">
          <div className="max-w-7xl mx-auto px-4 overflow-x-auto">
            <div className="flex gap-2 py-4">
              {tabs.map((tab) => {
                const TabIcon = tab.icon;
                const isActive = activeTab === tab.id;

                return (
                  <motion.button
                    key={tab.id}
                    onClick={() => setActiveTab(tab.id)}
                    whileTap={{ scale: 0.95 }}
                    className={`flex items-center gap-2 px-4 py-2 rounded-lg font-semibold text-sm whitespace-nowrap transition-all relative ${
                      isActive
                        ? 'bg-sky-600 text-white shadow-lg'
                        : 'bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 hover:bg-slate-200 dark:hover:bg-slate-700'
                    }`}
                  >
                    <TabIcon className="w-4 h-4" />
                    <span>{tab.label}</span>

                    {/* Badge */}
                    {tab.badge && (
                      <motion.span
                        initial={{ scale: 0 }}
                        animate={{ scale: 1 }}
                        className={`ml-2 ${tab.badgeColor} text-white text-xs font-bold px-2 py-1 rounded-full`}
                      >
                        {tab.badge}
                      </motion.span>
                    )}

                    {/* Active indicator */}
                    {isActive && (
                      <motion.div
                        layoutId="activeTab"
                        className="absolute bottom-0 left-0 right-0 h-1 bg-white rounded-t-lg"
                        transition={{ type: 'spring', stiffness: 380, damping: 40 }}
                      />
                    )}
                  </motion.button>
                );
              })}
            </div>
          </div>
        </div>

        {/* Content */}
        <motion.div
          key={activeTab}
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.2 }}
        >
          {ActiveComponent ? (
            <ActiveComponent />
          ) : (
            <div className="p-8 text-center">
              <p className="text-slate-500">Coming soon...</p>
            </div>
          )}
        </motion.div>
      </div>
    </MainLayout>
  );
};

export default BorrowingManagementHub;

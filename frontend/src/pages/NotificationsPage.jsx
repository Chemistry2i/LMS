import React, { useState } from 'react';
import { Bell, Trash2, Check, Clock, AlertCircle } from 'lucide-react';
import MainLayout from './MainLayout';
import WelcomeBanner from '../components/WelcomeBanner';
import Badge from '../components/Badge';
import Pagination from '../components/Pagination';

const NotificationsPage = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const [notifications, setNotifications] = useState([
    {
      id: 1,
      type: 'return_reminder',
      title: 'Book Return Reminder',
      message: 'Please return "The Midnight Library" before June 30, 2026',
      timestamp: new Date(Date.now() - 2 * 3600000),
      read: false,
      icon: Clock,
      color: 'primary',
    },
    {
      id: 2,
      type: 'new_book',
      title: 'New Book Available',
      message: 'Fresh arrival: "Atomic Habits" by James Clear is now available in the library',
      timestamp: new Date(Date.now() - 24 * 3600000),
      read: false,
      icon: Bell,
      color: 'success',
    },
    {
      id: 3,
      type: 'fine',
      title: 'Fine Notice',
      message: 'Outstanding fine of Shs 5,000 from overdue book return',
      timestamp: new Date(Date.now() - 3 * 24 * 3600000),
      read: true,
      icon: AlertCircle,
      color: 'warning',
    },
  ]);

  const handleMarkAsRead = (id) => {
    setNotifications(notifications.map(n => 
      n.id === id ? { ...n, read: true } : n
    ));
  };

  const handleDelete = (id) => {
    setNotifications(notifications.filter(n => n.id !== id));
  };

  const handleMarkAllAsRead = () => {
    setNotifications(notifications.map(n => ({ ...n, read: true })));
  };

  const unreadCount = notifications.filter(n => !n.read).length;
  const itemsPerPage = 5;
  const totalPages = Math.ceil(notifications.length / itemsPerPage);
  const paginatedNotifications = notifications.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  const formatTime = (date) => {
    const now = new Date();
    const diff = now - date;
    const hours = Math.floor(diff / 3600000);
    const days = Math.floor(diff / 86400000);

    if (hours < 1) return 'just now';
    if (hours < 24) return `${hours}h ago`;
    if (days < 7) return `${days}d ago`;
    return date.toLocaleDateString();
  };

  return (
    <MainLayout>
      <div className="space-y-8 animate-fade-in">
        <WelcomeBanner 
          userName="Notifications"
          userRole="member"
          primaryText={`You have ${unreadCount} unread notification${unreadCount !== 1 ? 's' : ''}`}
          secondaryText="Stay updated with library events and reminders"
        />

        <div className="max-w-3xl mx-auto">
          {/* Header Actions */}
          <div className="flex items-center justify-between mb-6">
            <div className="flex items-center gap-2">
              <Bell className="w-5 h-5 text-sky-600" />
              <h2 className="text-xl font-bold">All Notifications</h2>
              {unreadCount > 0 && (
                <Badge variant="primary">{unreadCount}</Badge>
              )}
            </div>
            {unreadCount > 0 && (
              <button
                onClick={handleMarkAllAsRead}
                className="text-sm text-sky-600 hover:text-sky-700 font-medium transition-smooth flex items-center gap-1"
              >
                <Check className="w-4 h-4" /> Mark all as read
              </button>
            )}
          </div>

          {/* Notifications List */}
          <div className="space-y-3">
            {paginatedNotifications.length > 0 ? (
              paginatedNotifications.map(notification => (
                <div
                  key={notification.id}
                  className={`card transition-smooth ${
                    !notification.read
                      ? 'bg-sky-50 dark:bg-sky-900/20 border-sky-200 dark:border-sky-800'
                      : ''
                  }`}
                >
                  <div className="flex gap-4">
                    {/* Icon */}
                    <div className={`w-12 h-12 rounded-lg flex items-center justify-center flex-shrink-0 ${
                      !notification.read ? 'bg-sky-100 dark:bg-sky-900' : 'bg-slate-100 dark:bg-slate-800'
                    }`}>
                      <notification.icon className={`w-6 h-6 ${
                        notification.color === 'primary' ? 'text-sky-600' :
                        notification.color === 'success' ? 'text-emerald-600' :
                        notification.color === 'warning' ? 'text-amber-600' :
                        'text-slate-600'
                      }`} />
                    </div>

                    {/* Content */}
                    <div className="flex-1 min-w-0">
                      <div className="flex items-start justify-between gap-2 mb-1">
                        <h3 className={`font-bold ${!notification.read ? 'text-slate-900 dark:text-white' : 'text-slate-700 dark:text-slate-300'}`}>
                          {notification.title}
                        </h3>
                        {!notification.read && (
                          <span className="w-2 h-2 bg-sky-600 rounded-full flex-shrink-0 mt-2"></span>
                        )}
                      </div>
                      <p className="text-sm text-muted mb-2">{notification.message}</p>
                      <p className="text-xs text-muted">{formatTime(notification.timestamp)}</p>
                    </div>

                    {/* Actions */}
                    <div className="flex items-center gap-2 flex-shrink-0">
                      {!notification.read && (
                        <button
                          onClick={() => handleMarkAsRead(notification.id)}
                          className="p-2 hover:bg-sky-200 dark:hover:bg-sky-800 rounded-lg transition-smooth text-sky-600"
                          title="Mark as read"
                        >
                          <Check className="w-4 h-4" />
                        </button>
                      )}
                      <button
                        onClick={() => handleDelete(notification.id)}
                        className="p-2 hover:bg-red-100 dark:hover:bg-red-900/20 rounded-lg transition-smooth text-red-600"
                        title="Delete notification"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  </div>
                </div>
              ))
            ) : (
              <div className="text-center py-12 bg-slate-50 dark:bg-slate-800/50 rounded-xl border-2 border-dashed border-slate-200 dark:border-slate-700">
                <Bell className="w-12 h-12 text-slate-300 dark:text-slate-700 mx-auto mb-3" />
                <p className="text-muted font-medium">No notifications yet</p>
                <p className="text-xs text-muted mt-1">You're all caught up! Check back later.</p>
              </div>
            )}
          </div>

          {/* Pagination */}
          {notifications.length > itemsPerPage && (
            <div className="mt-6">
              <Pagination
                currentPage={currentPage}
                totalPages={totalPages}
                onPageChange={setCurrentPage}
                itemsPerPage={itemsPerPage}
                totalItems={notifications.length}
              />
            </div>
          )}
        </div>
      </div>
    </MainLayout>
  );
};

export default NotificationsPage;

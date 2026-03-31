import React, { useState } from 'react';
import {
  Calendar,
  Clock,
  AlertCircle,
  CheckCircle2,
  XCircle,
  Trash2,
  Eye,
} from 'lucide-react';
import MainLayout from './MainLayout';
import WelcomeBanner from '../components/WelcomeBanner';
import Breadcrumb from '../components/Breadcrumb';
import Badge from '../components/Badge';
import Pagination from '../components/Pagination';
import ConfirmationModal from '../components/ConfirmationModal';

const ReservationPage = () => {
  const [currentTab, setCurrentTab] = useState('active');
  const [currentPage, setCurrentPage] = useState(1);
  const [showCancelModal, setShowCancelModal] = useState(false);
  const [selectedReservation, setSelectedReservation] = useState(null);

  const reservations = [
    {
      id: 1,
      title: 'The Midnight Library',
      author: 'Matt Haig',
      reslookupedDate: new Date(2026, 8, 15),
      coverImage: '📚',
      status: 'active',
      position: 1,
      estimatedDate: new Date(2026, 8, 22),
      category: 'Fiction',
    },
    {
      id: 2,
      title: 'Atomic Habits',
      author: 'James Clear',
      reservedDate: new Date(2026, 8, 10),
      coverImage: '📖',
      status: 'active',
      position: 3,
      estimatedDate: new Date(2026, 8, 25),
      category: 'Self-Help',
    },
    {
      id: 3,
      title: 'Educated',
      author: 'Tara Westover',
      reservedDate: new Date(2026, 7, 28),
      coverImage: '📕',
      status: 'ready',
      position: 0,
      estimatedDate: new Date(2026, 8, 20),
      category: 'Biography',
      daysToPickup: 2,
    },
    {
      id: 4,
      title: 'Thinking, Fast and Slow',
      author: 'Daniel Kahneman',
      reservedDate: new Date(2026, 7, 10),
      coverImage: '📘',
      status: 'completed',
      position: 0,
      completedDate: new Date(2026, 8, 5),
      category: 'Psychology',
    },
    {
      id: 5,
      title: 'The Lean Startup',
      author: 'Eric Ries',
      reservedDate: new Date(2026, 7, 5),
      coverImage: '📗',
      status: 'completed',
      position: 0,
      completedDate: new Date(2026, 7, 28),
      category: 'Business',
    },
  ];

  const activeReservations = reservations.filter(r => r.status === 'active' || r.status === 'ready');
  const completedReservations = reservations.filter(r => r.status === 'completed');

  const displayedReservations = currentTab === 'active' ? activeReservations : completedReservations;
  const itemsPerPage = 10;
  const totalPages = Math.ceil(displayedReservations.length / itemsPerPage);
  const paginatedReservations = displayedReservations.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  const getStatusBadge = (status) => {
    if (status === 'ready') {
      return <Badge variant="success">Ready to Pickup</Badge>;
    } else if (status === 'active') {
      return <Badge variant="primary">In Queue</Badge>;
    } else {
      return <Badge variant="default">Completed</Badge>;
    }
  };

  const formatDate = (date) => {
    return new Date(date).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
    });
  };

  const handleCancelClick = (reservation) => {
    setSelectedReservation(reservation);
    setShowCancelModal(true);
  };

  const handleConfirmCancel = () => {
    // Handle cancellation logic
    setShowCancelModal(false);
    setSelectedReservation(null);
  };

  return (
    <MainLayout>
      <div className="space-y-8 animate-fade-in">
        <WelcomeBanner
          userName="My Reservations"
          userRole="member"
          primaryText="Books you've reserved"
          secondaryText={`${activeReservations.length} active reservations`}
        />

        <Breadcrumb
          items={[
            { label: 'My Library', href: '/my-library' },
            { label: 'Reservations' },
          ]}
        />

        {/* Summary Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="card bg-sky-50 dark:bg-sky-900/20 border-sky-200 dark:border-sky-800">
            <p className="text-muted text-sm">Active Reservations</p>
            <p className="text-3xl font-bold text-sky-600 mt-2">{activeReservations.length}</p>
          </div>
          <div className="card bg-emerald-50 dark:bg-emerald-900/20 border-emerald-200 dark:border-emerald-800">
            <p className="text-muted text-sm">Ready for Pickup</p>
            <p className="text-3xl font-bold text-emerald-600 mt-2">
              {activeReservations.filter(r => r.status === 'ready').length}
            </p>
          </div>
          <div className="card bg-blue-50 dark:bg-blue-900/20 border-blue-200 dark:border-blue-800">
            <p className="text-muted text-sm">Completed</p>
            <p className="text-3xl font-bold text-blue-600 mt-2">{completedReservations.length}</p>
          </div>
        </div>

        {/* Ready to Pickup Alert */}
        {activeReservations.filter(r => r.status === 'ready').length > 0 && (
          <div className="p-4 bg-emerald-50 dark:bg-emerald-900/20 border-l-4 border-emerald-500 rounded-lg flex gap-3">
            <CheckCircle2 className="w-6 h-6 text-emerald-600 flex-shrink-0 mt-0.5" />
            <div>
              <p className="font-semibold text-emerald-900 dark:text-emerald-100">
                {activeReservations.filter(r => r.status === 'ready').length} book(s) ready for pickup!
              </p>
              <p className="text-sm text-emerald-800 dark:text-emerald-200 mt-1">
                Please visit the library to collect your reserved books. Available for pickup for 7 days.
              </p>
            </div>
          </div>
        )}

        {/* Tabs */}
        <div className="flex gap-3 border-b border-slate-200 dark:border-slate-700">
          <button
            onClick={() => {
              setCurrentTab('active');
              setCurrentPage(1);
            }}
            className={`px-4 py-3 font-semibold border-b-2 transition-smooth ${
              currentTab === 'active'
                ? 'text-sky-600 border-sky-600'
                : 'text-muted border-transparent hover:text-slate-700 dark:hover:text-slate-200'
            }`}
          >
            Active ({activeReservations.length})
          </button>
          <button
            onClick={() => {
              setCurrentTab('completed');
              setCurrentPage(1);
            }}
            className={`px-4 py-3 font-semibold border-b-2 transition-smooth ${
              currentTab === 'completed'
                ? 'text-sky-600 border-sky-600'
                : 'text-muted border-transparent hover:text-slate-700 dark:hover:text-slate-200'
            }`}
          >
            Completed ({completedReservations.length})
          </button>
        </div>

        {/* Reservations List */}
        <div className="space-y-3">
          {paginatedReservations.length > 0 ? (
            paginatedReservations.map(reservation => (
              <div key={reservation.id} className="card hover:shadow-lg transition-shadow">
                <div className="flex gap-6 items-start">
                  {/* Cover Image */}
                  <div className="w-20 h-32 bg-slate-200 dark:bg-slate-700 rounded-lg flex items-center justify-center flex-shrink-0 text-4xl">
                    {reservation.coverImage}
                  </div>

                  {/* Content */}
                  <div className="flex-1 min-w-0">
                    <div className="flex items-start justify-between gap-4 mb-2">
                      <div>
                        <h3 className="font-bold text-lg text-slate-900 dark:text-white">
                          {reservation.title}
                        </h3>
                        <p className="text-muted text-sm">by {reservation.author}</p>
                      </div>
                      {getStatusBadge(reservation.status)}
                    </div>

                    {/* Reservation Details */}
                    <div className="space-y-2 mt-3">
                      {reservation.status === 'active' && (
                        <>
                          <div className="flex items-center gap-2 text-sm">
                            <AlertCircle className="w-4 h-4 text-amber-600" />
                            <span className="text-muted">
                              Position in queue: <span className="font-semibold">{reservation.position}</span>
                            </span>
                          </div>
                          <div className="flex items-center gap-2 text-sm">
                            <Calendar className="w-4 h-4 text-slate-400" />
                            <span className="text-muted">
                              Reserved: {formatDate(reservation.reservedDate)}
                            </span>
                          </div>
                          <div className="flex items-center gap-2 text-sm">
                            <Clock className="w-4 h-4 text-slate-400" />
                            <span className="text-muted">
                              Est. available: <span className="text-sky-600 font-semibold">{formatDate(reservation.estimatedDate)}</span>
                            </span>
                          </div>
                        </>
                      )}

                      {reservation.status === 'ready' && (
                        <>
                          <div className="flex items-center gap-2 text-sm">
                            <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                            <span className="text-emerald-600 font-semibold">Ready for pickup!</span>
                          </div>
                          <div className="flex items-center gap-2 text-sm">
                            <Clock className="w-4 h-4 text-slate-400" />
                            <span className="text-muted">
                              Pick up within {reservation.daysToPickup} days
                            </span>
                          </div>
                          <div className="flex items-center gap-2 text-sm">
                            <Calendar className="w-4 h-4 text-slate-400" />
                            <span className="text-muted">
                              Available from: {formatDate(reservation.estimatedDate)}
                            </span>
                          </div>
                        </>
                      )}

                      {reservation.status === 'completed' && (
                        <>
                          <div className="flex items-center gap-2 text-sm">
                            <XCircle className="w-4 h-4 text-slate-400" />
                            <span className="text-muted">
                              Completed: <span className="font-semibold">{formatDate(reservation.completedDate)}</span>
                            </span>
                          </div>
                        </>
                      )}
                    </div>
                  </div>

                  {/* Actions */}
                  {reservation.status !== 'completed' && (
                    <div className="flex gap-2 flex-shrink-0">
                      <button className="p-3 bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-400 rounded-lg hover:bg-slate-200 dark:hover:bg-slate-700 transition-smooth">
                        <Eye className="w-5 h-5" />
                      </button>
                      <button
                        onClick={() => handleCancelClick(reservation)}
                        className="p-3 bg-red-100 dark:bg-red-900/30 text-red-600 dark:text-red-400 rounded-lg hover:bg-red-200 dark:hover:bg-red-900/50 transition-smooth"
                      >
                        <Trash2 className="w-5 h-5" />
                      </button>
                    </div>
                  )}
                </div>
              </div>
            ))
          ) : (
            <div className="text-center py-12 bg-slate-50 dark:bg-slate-800/50 rounded-xl border-2 border-dashed border-slate-200 dark:border-slate-700">
              <Calendar className="w-12 h-12 text-slate-300 dark:text-slate-700 mx-auto mb-3" />
              <p className="text-muted font-medium">
                {currentTab === 'active' ? 'No active reservations' : 'No completed reservations'}
              </p>
              <p className="text-xs text-muted mt-1">
                {currentTab === 'active' 
                  ? 'Reserve a book and it will appear here'
                  : 'Your completed reservations will appear here'}
              </p>
            </div>
          )}
        </div>

        {/* Pagination */}
        {paginatedReservations.length > 0 && (
          <div>
            <Pagination
              currentPage={currentPage}
              totalPages={totalPages}
              onPageChange={setCurrentPage}
              itemsPerPage={itemsPerPage}
              totalItems={displayedReservations.length}
            />
          </div>
        )}

        {/* Info Box */}
        <div className="card bg-gradient-to-r from-sky-50 to-blue-50 dark:from-sky-900/20 dark:to-blue-900/20 border-sky-200 dark:border-sky-800">
          <h3 className="font-bold mb-3 flex items-center gap-2">
            <AlertCircle className="w-5 h-5 text-sky-600" />
            Reservation Policy
          </h3>
          <ul className="space-y-2 text-sm text-slate-700 dark:text-slate-300">
            <li>• • Reservations are valid for 7 days from the ready date</li>
            <li>• You can cancel a reservation anytime before it's ready</li>
            <li>• Priority queue is based on reservation time</li>
            <li>• Maximum 5 active reservations at a time</li>
          </ul>
        </div>
      </div>

      {/* Cancel Confirmation Modal */}
      <ConfirmationModal
        isOpen={showCancelModal}
        title="Cancel Reservation?"
        message={`Are you sure you want to cancel your reservation for "${selectedReservation?.title}"? This action cannot be undone.`}
        confirmText="Cancel Reservation"
        cancelText="Keep Reservation"
        onConfirm={handleConfirmCancel}
        onCancel={() => setShowCancelModal(false)}
        isDangerous={true}
      />
    </MainLayout>
  );
};

export default ReservationPage;

import React, { useState } from 'react';
import { Heart, Filter, Globe, Trash2, Share2 } from 'lucide-react';
import MainLayout from './MainLayout';
import WelcomeBanner from '../components/WelcomeBanner';
import Breadcrumb from '../components/Breadcrumb';
import Badge from '../components/Badge';
import Pagination from '../components/Pagination';

const WishlistPage = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const [filterStatus, setFilterStatus] = useState('all');

  const wishlistItems = [
    {
      id: 1,
      title: 'The Psychology of Money',
      author: 'Morgan Housel',
      category: 'Finance',
      rating: 4.8,
      reviews: 324,
      status: 'available',
      addedDate: new Date(2026, 8, 15),
      coverImage: '📙',
      description: 'A masterwork on how to make better decisions with money',
    },
    {
      id: 2,
      title: 'Sapiens',
      author: 'Yuval Noah Harari',
      category: 'History',
      rating: 4.7,
      reviews: 892,
      status: 'borrowed',
      addedDate: new Date(2026, 8, 10),
      coverImage: '📕',
      description: 'A brief history of humankind from the Stone Age to modern times',
    },
    {
      id: 3,
      title: 'Deep Work',
      author: 'Cal Newport',
      category: 'Productivity',
      rating: 4.6,
      reviews: 567,
      status: 'available',
      addedDate: new Date(2026, 8, 5),
      coverImage: '📗',
      description: 'Rules for focused success in a distracted world',
    },
    {
      id: 4,
      title: 'The Alchemist',
      author: 'Paulo Coelho',
      category: 'Fiction',
      rating: 4.9,
      reviews: 1203,
      status: 'reserved',
      addedDate: new Date(2026, 7, 28),
      coverImage: '📔',
      description: 'A philosophical novel about pursuing your personal legend',
    },
    {
      id: 5,
      title: 'Mindset',
      author: 'Carol S. Dweck',
      category: 'Psychology',
      rating: 4.5,
      reviews: 445,
      status: 'available',
      addedDate: new Date(2026, 7, 20),
      coverImage: '📘',
      description: 'Changing the way you think to fulfill your potential',
    },
  ];

  const itemsPerPage = 10;
  const filteredItems = filterStatus === 'all' 
    ? wishlistItems 
    : wishlistItems.filter(item => item.status === filterStatus);
  
  const totalPages = Math.ceil(filteredItems.length / itemsPerPage);
  const paginatedItems = filteredItems.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  const getStatusBadge = (status) => {
    if (status === 'available') {
      return <Badge variant="success">Available</Badge>;
    } else if (status === 'borrowed') {
      return <Badge variant="primary">Borrowed</Badge>;
    } else {
      return <Badge variant="warning">Reserved</Badge>;
    }
  };

  const getStatusColor = (status) => {
    if (status === 'available') return 'text-emerald-600';
    if (status === 'borrowed') return 'text-sky-600';
    return 'text-amber-600';
  };

  const renderStars = (rating) => {
    return [...Array(5)].map((_, i) => (
      <span key={i} className={i < Math.floor(rating) ? '⭐' : '☆'}>
        {i < Math.floor(rating) ? '⭐' : '☆'}
      </span>
    ));
  };

  const formatDate = (date) => {
    return new Date(date).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
    });
  };

  return (
    <MainLayout>
      <div className="space-y-8 animate-fade-in">
        <WelcomeBanner 
          userName="My Wishlist"
          userRole="member"
          primaryText="Books you want to read"
          secondaryText={`You have ${wishlistItems.length} books in your wishlist`}
        />

        <Breadcrumb items={[
          { label: 'My Library', href: '/my-library' },
          { label: 'Wishlist' },
        ]} />

        {/* Summary */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="card bg-sky-50 dark:bg-sky-900/20 border-sky-200 dark:border-sky-800">
            <p className="text-muted text-sm">Total Items</p>
            <p className="text-3xl font-bold text-sky-600 mt-2">{wishlistItems.length}</p>
          </div>
          <div className="card bg-emerald-50 dark:bg-emerald-900/20 border-emerald-200 dark:border-emerald-800">
            <p className="text-muted text-sm">Available Now</p>
            <p className="text-3xl font-bold text-emerald-600 mt-2">
              {wishlistItems.filter(i => i.status === 'available').length}
            </p>
          </div>
          <div className="card bg-blue-50 dark:bg-blue-900/20 border-blue-200 dark:border-blue-800">
            <p className="text-muted text-sm">Average Rating</p>
            <p className="text-3xl font-bold text-blue-600 mt-2">
              {(wishlistItems.reduce((sum, i) => sum + i.rating, 0) / wishlistItems.length).toFixed(1)}★
            </p>
          </div>
        </div>

        {/* Filters */}
        <div className="card">
          <div className="flex items-center gap-2 mb-4">
            <Filter className="w-5 h-5 text-sky-600" />
            <h3 className="font-bold">Filter by Status</h3>
          </div>
          <div className="flex flex-wrap gap-2">
            {[
              { value: 'all', label: 'All Books', count: wishlistItems.length },
              { value: 'available', label: 'Available', count: wishlistItems.filter(i => i.status === 'available').length },
              { value: 'borrowed', label: 'Borrowed', count: wishlistItems.filter(i => i.status === 'borrowed').length },
              { value: 'reserved', label: 'Reserved', count: wishlistItems.filter(i => i.status === 'reserved').length },
            ].map(filter => (
              <button
                key={filter.value}
                onClick={() => {
                  setFilterStatus(filter.value);
                  setCurrentPage(1);
                }}
                className={`px-4 py-2 rounded-lg transition-smooth font-medium text-sm ${
                  filterStatus === filter.value
                    ? 'bg-sky-600 text-white'
                    : 'bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 hover:bg-slate-200 dark:hover:bg-slate-700'
                }`}
              >
                {filter.label} ({filter.count})
              </button>
            ))}
          </div>
        </div>

        {/* Wishlist Items */}
        <div className="space-y-3">
          {paginatedItems.length > 0 ? (
            paginatedItems.map((item) => (
              <div key={item.id} className="card hover:shadow-lg transition-shadow">
                <div className="flex gap-6">
                  {/* Cover Image */}
                  <div className="w-20 h-32 bg-slate-200 dark:bg-slate-700 rounded-lg flex items-center justify-center flex-shrink-0 text-4xl">
                    {item.coverImage}
                  </div>

                  {/* Content */}
                  <div className="flex-1 min-w-0">
                    <div className="flex items-start justify-between gap-4 mb-2">
                      <div>
                        <h3 className="font-bold text-lg text-slate-900 dark:text-white">{item.title}</h3>
                        <p className="text-muted text-sm">by {item.author}</p>
                      </div>
                      {getStatusBadge(item.status)}
                    </div>

                    <p className="text-muted text-sm mb-3">{item.description}</p>

                    <div className="flex flex-wrap items-center gap-4 text-sm">
                      <Badge variant="default">{item.category}</Badge>
                      <div className="flex items-center gap-1">
                        {renderStars(item.rating)}
                        <span className="text-muted text-xs ml-2">({item.reviews} reviews)</span>
                      </div>
                      <p className="text-muted text-xs">Added {formatDate(item.addedDate)}</p>
                    </div>
                  </div>

                  {/* Actions */}
                  <div className="flex flex-col gap-2 flex-shrink-0">
                    <button className={`p-3 rounded-lg transition-smooth ${
                      item.status === 'available'
                        ? 'bg-sky-100 dark:bg-sky-900/30 text-sky-600 hover:bg-sky-200 dark:hover:bg-sky-900/50'
                        : 'bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-400'
                    }`}>
                      <Globe className="w-5 h-5" />
                    </button>
                    <button className="p-3 bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-400 rounded-lg hover:bg-slate-200 dark:hover:bg-slate-700 transition-smooth">
                      <Share2 className="w-5 h-5" />
                    </button>
                    <button className="p-3 bg-red-100 dark:bg-red-900/30 text-red-600 dark:text-red-400 rounded-lg hover:bg-red-200 dark:hover:bg-red-900/50 transition-smooth">
                      <Trash2 className="w-5 h-5" />
                    </button>
                  </div>
                </div>
              </div>
            ))
          ) : (
            <div className="text-center py-12 bg-slate-50 dark:bg-slate-800/50 rounded-xl border-2 border-dashed border-slate-200 dark:border-slate-700">
              <Heart className="w-12 h-12 text-slate-300 dark:text-slate-700 mx-auto mb-3" />
              <p className="text-muted font-medium">Your wishlist is empty</p>
              <p className="text-xs text-muted mt-1">Books you want to read will appear here</p>
            </div>
          )}
        </div>

        {/* Pagination */}
        {paginatedItems.length > 0 && (
          <div>
            <Pagination
              currentPage={currentPage}
              totalPages={totalPages}
              onPageChange={setCurrentPage}
              itemsPerPage={itemsPerPage}
              totalItems={filteredItems.length}
            />
          </div>
        )}
      </div>
    </MainLayout>
  );
};

export default WishlistPage;

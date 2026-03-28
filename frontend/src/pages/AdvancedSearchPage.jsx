import React, { useState } from 'react';
import {
  Search,
  Filter,
  SortAsc,
  Book,
  Star,
  MapPin,
  Clock,
} from 'lucide-react';
import MainLayout from './MainLayout';
import WelcomeBanner from '../components/WelcomeBanner';
import Breadcrumb from '../components/Breadcrumb';
import Badge from '../components/Badge';
import Pagination from '../components/Pagination';
import SearchBar from '../components/SearchBar';

const AdvancedSearchPage = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [selectedRating, setSelectedRating] = useState('all');
  const [sortBy, setSortBy] = useState('popular');

  const books = [
    {
      id: 1,
      title: 'The Midnight Library',
      author: 'Matt Haig',
      category: 'Fiction',
      rating: 4.8,
      reviews: 234,
      status: 'available',
      coverImage: '📚',
    },
    {
      id: 2,
      title: 'Atomic Habits',
      author: 'James Clear',
      category: 'Self-Help',
      rating: 4.7,
      reviews: 567,
      status: 'available',
      coverImage: '📖',
    },
    {
      id: 3,
      title: 'Educated',
      author: 'Tara Westover',
      category: 'Biography',
      rating: 4.9,
      reviews: 445,
      status: 'borrowed',
      coverImage: '📕',
    },
    {
      id: 4,
      title: 'The Lean Startup',
      author: 'Eric Ries',
      category: 'Business',
      rating: 4.5,
      reviews: 321,
      status: 'available',
      coverImage: '📗',
    },
    {
      id: 5,
      title: 'Thinking, Fast and Slow',
      author: 'Daniel Kahneman',
      category: 'Psychology',
      rating: 4.6,
      reviews: 392,
      status: 'available',
      coverImage: '📘',
    },
  ];

  const categories = ['all', 'Fiction', 'Self-Help', 'Biography', 'Business', 'Psychology'];
  const ratings = ['all', '5', '4+', '3+'];

  // Filter and search
  let filteredBooks = books.filter(book => {
    const matchesSearch =
      book.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      book.author.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCategory = selectedCategory === 'all' || book.category === selectedCategory;
    const matchesRating =
      selectedRating === 'all' ||
      (selectedRating === '5' && book.rating === 5) ||
      (selectedRating === '4+' && book.rating >= 4) ||
      (selectedRating === '3+' && book.rating >= 3);

    return matchesSearch && matchesCategory && matchesRating;
  });

  // Sort
  if (sortBy === 'popular') {
    filteredBooks.sort((a, b) => b.reviews - a.reviews);
  } else if (sortBy === 'rating') {
    filteredBooks.sort((a, b) => b.rating - a.rating);
  } else if (sortBy === 'title') {
    filteredBooks.sort((a, b) => a.title.localeCompare(b.title));
  }

  const itemsPerPage = 10;
  const totalPages = Math.ceil(filteredBooks.length / itemsPerPage);
  const paginatedBooks = filteredBooks.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  return (
    <MainLayout>
      <div className="space-y-8 animate-fade-in">
        <WelcomeBanner 
          userName="Book Search"
          userRole="member"
          primaryText="Advanced search with powerful filters"
          secondaryText="Find exactly what you're looking for"
        />

        <Breadcrumb items={[
          { label: 'Books', href: '/books' },
          { label: 'Advanced Search' },
        ]} />

        <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
          {/* Sidebar Filters */}
          <div className="space-y-6">
            {/* Search Input */}
            <div>
              <label className="block text-sm font-semibold mb-2">Search</label>
              <SearchBar
                placeholder="Search books..."
                value={searchQuery}
                onChange={setSearchQuery}
                variant="subtle"
              />
            </div>

            {/* Category Filter */}
            <div className="card p-4">
              <h3 className="font-bold flex items-center gap-2 mb-4">
                <Filter className="w-4 h-4" /> Category
              </h3>
              <div className="space-y-2">
                {categories.map(cat => (
                  <label key={cat} className="flex items-center gap-2 cursor-pointer hover:opacity-80 transition">
                    <input
                      type="radio"
                      name="category"
                      value={cat}
                      checked={selectedCategory === cat}
                      onChange={(e) => {
                        setSelectedCategory(e.target.value);
                        setCurrentPage(1);
                      }}
                      className="w-4 h-4 text-sky-600 cursor-pointer"
                    />
                    <span className="text-sm text-slate-700 dark:text-slate-300 capitalize">
                      {cat === 'all' ? 'All Categories' : cat}
                    </span>
                  </label>
                ))}
              </div>
            </div>

            {/* Rating Filter */}
            <div className="card p-4">
              <h3 className="font-bold flex items-center gap-2 mb-4">
                <Star className="w-4 h-4" /> Rating
              </h3>
              <div className="space-y-2">
                {ratings.map(rating => (
                  <label key={rating} className="flex items-center gap-2 cursor-pointer hover:opacity-80 transition">
                    <input
                      type="radio"
                      name="rating"
                      value={rating}
                      checked={selectedRating === rating}
                      onChange={(e) => {
                        setSelectedRating(e.target.value);
                        setCurrentPage(1);
                      }}
                      className="w-4 h-4 text-sky-600 cursor-pointer"
                    />
                    <span className="text-sm text-slate-700 dark:text-slate-300">
                      {rating === 'all' ? 'All Ratings' : `${rating} & up`}
                    </span>
                  </label>
                ))}
              </div>
            </div>

            {/* Sort */}
            <div className="card p-4">
              <h3 className="font-bold flex items-center gap-2 mb-4">
                <SortAsc className="w-4 h-4" /> Sort By
              </h3>
              <select
                value={sortBy}
                onChange={(e) => {
                  setSortBy(e.target.value);
                  setCurrentPage(1);
                }}
                className="w-full px-3 py-2 border border-slate-300 dark:border-slate-600 rounded-lg bg-white dark:bg-slate-800 text-slate-900 dark:text-white"
              >
                <option value="popular">Most Popular</option>
                <option value="rating">Highest Rated</option>
                <option value="title">Title (A-Z)</option>
              </select>
            </div>
          </div>

          {/* Results */}
          <div className="lg:col-span-3">
            {/* Result Count */}
            <div className="mb-6 flex items-center justify-between">
              <div>
                <p className="text-slate-600 dark:text-slate-400">
                  Showing <span className="font-bold">{paginatedBooks.length}</span> of{' '}
                  <span className="font-bold">{filteredBooks.length}</span> books
                </p>
              </div>
            </div>

            {/* Books Grid */}
            {paginatedBooks.length > 0 ? (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {paginatedBooks.map(book => (
                  <div key={book.id} className="card hover:shadow-lg transition-shadow cursor-pointer group">
                    <div className="flex gap-4">
                      {/* Cover */}
                      <div className="w-20 h-32 bg-slate-200 dark:bg-slate-700 rounded-lg flex items-center justify-center flex-shrink-0 text-3xl group-hover:scale-110 transition-transform">
                        {book.coverImage}
                      </div>

                      {/* Info */}
                      <div className="flex-1 min-w-0">
                        <div className="flex items-start justify-between gap-2 mb-2">
                          <div>
                            <h3 className="font-bold text-slate-900 dark:text-white line-clamp-2">
                              {book.title}
                            </h3>
                            <p className="text-sm text-muted">{book.author}</p>
                          </div>
                          <Badge variant="primary">{book.status === 'available' ? '✓' : '✗'}</Badge>
                        </div>

                        <div className="flex items-center gap-2 mb-3">
                          <div className="flex items-center">
                            {[...Array(5)].map((_, i) => (
                              <span key={i} className={i < Math.floor(book.rating) ? '⭐' : '☆'}>
                                {i < Math.floor(book.rating) ? '⭐' : '☆'}
                              </span>
                            ))}
                          </div>
                          <span className="text-xs text-muted">({book.reviews})</span>
                        </div>

                        <button className={`w-full px-3 py-2 rounded-lg font-medium text-sm transition-smooth ${
                          book.status === 'available'
                            ? 'bg-sky-600 hover:bg-sky-700 text-white'
                            : 'bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-400 cursor-not-allowed'
                        }`}>
                          {book.status === 'available' ? 'Borrow Now' : 'Unavailable'}
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div className="text-center py-16 bg-slate-50 dark:bg-slate-800/50 rounded-xl border-2 border-dashed border-slate-200 dark:border-slate-700">
                <Book className="w-12 h-12 text-slate-300 dark:text-slate-700 mx-auto mb-3" />
                <p className="text-muted font-medium">No books found</p>
                <p className="text-xs text-muted mt-1">Try adjusting your filters or search query</p>
              </div>
            )}

            {/* Pagination */}
            {paginatedBooks.length > 0 && (
              <div className="mt-8">
                <Pagination
                  currentPage={currentPage}
                  totalPages={totalPages}
                  onPageChange={setCurrentPage}
                  itemsPerPage={itemsPerPage}
                  totalItems={filteredBooks.length}
                />
              </div>
            )}
          </div>
        </div>
      </div>
    </MainLayout>
  );
};

export default AdvancedSearchPage;

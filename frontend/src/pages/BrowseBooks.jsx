import React, { useState } from 'react';
import MainLayout from './MainLayout';
import BookCard from './BookCard';
import { Search, Filter, SlidersHorizontal, BookOpen } from 'lucide-react';

const BrowseBooks = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All');

  // Mock data for the catalog
  const books = [
    { id: 1, title: 'Things Fall Apart', author: 'Chinua Achebe', category: 'Fiction', status: 'Available', fine_per_day: 500, cover_url: null },
    { id: 2, title: 'The River Between', author: 'Ngũgĩ wa Thiong\'o', category: 'Academic', status: 'Borrowed', fine_per_day: 1000, cover_url: null },
    { id: 3, title: 'Kintu', author: 'Jennifer Nansubuga Makumbi', category: 'Luganda Literature', status: 'Available', fine_per_day: 500, cover_url: null },
    { id: 4, title: 'The First Woman', author: 'Jennifer Nansubuga Makumbi', category: 'Fiction', status: 'Reserved', fine_per_day: 700, cover_url: null },
    { id: 5, title: 'Abyssinian Chronicles', author: 'Moses Isegawa', category: 'History', status: 'Available', fine_per_day: 800, cover_url: null },
    { id: 6, title: 'Tropical Fish', author: 'Doreen Baingana', category: 'Fiction', status: 'Available', fine_per_day: 500, cover_url: null },
  ];

  const categories = ['All', 'Fiction', 'Academic', 'Biography', 'History', 'Luganda Literature', 'Technology'];

  const filteredBooks = books.filter(book => {
    const matchesSearch = book.title.toLowerCase().includes(searchQuery.toLowerCase()) || 
                         book.author.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCategory = selectedCategory === 'All' || book.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  return (
    <MainLayout>
      <div className="flex flex-col gap-8">
        {/* Header Section */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <h1 className="text-3xl font-bold text-slate-900 dark:text-white">Library Catalog</h1>
            <p className="text-muted mt-1">Explore over 1,200 books in our Kampala collection</p>
          </div>
          <div className="flex items-center gap-2 px-4 py-2 bg-sky-50 dark:bg-sky-900/20 text-sky-600 rounded-lg">
            <BookOpen className="w-5 h-5" />
            <span className="font-bold">{filteredBooks.length} Books Found</span>
          </div>
        </div>

        {/* Search and Filter Bar */}
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-4">
          <div className="lg:col-span-2 relative">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400" />
            <input 
              type="text"
              placeholder="Search by title, author, or keyword..."
              className="input-base pl-12 h-12 text-lg shadow-sm"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>
          <div className="relative">
            <Filter className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
            <select 
              className="input-base pl-10 h-12 appearance-none bg-white dark:bg-slate-900"
              value={selectedCategory}
              onChange={(e) => setSelectedCategory(e.target.value)}
            >
              {categories.map(cat => <option key={cat} value={cat}>{cat}</option>)}
            </select>
          </div>
          <button className="h-12 btn-outline flex items-center justify-center gap-2 hover:bg-sky-50 transition-smooth">
            <SlidersHorizontal className="w-4 h-4" />
            Advanced Filters
          </button>
        </div>

        {/* Results Grid */}
        {filteredBooks.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {filteredBooks.map(book => (
              <BookCard key={book.id} book={book} />
            ))}
          </div>
        ) : (
          <div className="flex flex-col items-center justify-center py-20 bg-white dark:bg-slate-900 rounded-3xl border-2 border-dashed border-slate-200 dark:border-slate-800">
            <div className="w-20 h-20 bg-slate-50 dark:bg-slate-800 rounded-full flex items-center justify-center mb-4">
              <Search className="w-10 h-10 text-slate-300" />
            </div>
            <h3 className="text-xl font-bold">No books found</h3>
            <p className="text-muted max-w-xs text-center mt-2">
              We couldn't find any books matching "{searchQuery}". Try a different keyword or category.
            </p>
            <button 
              onClick={() => {setSearchQuery(''); setSelectedCategory('All');}}
              className="mt-6 text-sky-600 font-bold hover:underline"
            >
              Clear all filters
            </button>
          </div>
        )}

        {/* Pagination Placeholder */}
        <div className="flex justify-center mt-8">
          <div className="flex gap-2">
            {[1, 2, 3].map(p => (
              <button key={p} className={`w-10 h-10 rounded-lg flex items-center justify-center font-bold transition-smooth ${p === 1 ? 'bg-sky-600 text-white shadow-lg' : 'bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 hover:bg-sky-50'}`}>
                {p}
              </button>
            ))}
          </div>
        </div>
      </div>
    </MainLayout>
  );
};

export default BrowseBooks;
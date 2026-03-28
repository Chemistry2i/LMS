import React, { useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import MainLayout from './MainLayout';
import { 
  Book as BookIcon, 
  User, 
  Tag, 
  Hash, 
  Calendar, 
  ShieldCheck, 
  ArrowLeft, 
  Star,
  Share2,
  BookmarkPlus
} from 'lucide-react';
import toast from 'react-hot-toast';

const BookDetails = () => {
  const { id } = useParams();
  const [loading, setLoading] = useState(false);

  // Mock data for a single book
  const book = {
    id,
    title: 'Things Fall Apart',
    author: 'Chinua Achebe',
    category: 'Fiction',
    status: 'Available',
    isbn: '978-0385474542',
    description: 'Things Fall Apart is the debut novel by Nigerian author Chinua Achebe, first published in 1958. It depicts pre-colonial life in the southeastern part of Nigeria and the arrival of Europeans during the late 19th century.',
    fine_per_day: 500,
    published_year: 1958,
    copies_available: 4,
    rating: 4.8
  };

  const handleBorrow = async () => {
    setLoading(true);
    await new Promise(resolve => setTimeout(resolve, 1000));
    toast.success(`Request to borrow "${book.title}" submitted!`);
    setLoading(false);
  };

  return (
    <MainLayout>
      <div className="max-w-5xl mx-auto animate-fade-in">
        <Link to="/books" className="inline-flex items-center gap-2 text-sm font-bold text-slate-500 hover:text-sky-600 transition-smooth mb-8">
          <ArrowLeft className="w-4 h-4" /> Back to Catalog
        </Link>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
          {/* Left: Book Cover Visual */}
          <div className="space-y-6">
            <div className="aspect-[3/4] bg-white dark:bg-slate-900 rounded-3xl shadow-2xl border border-slate-100 dark:border-slate-800 flex items-center justify-center relative overflow-hidden group">
              <BookIcon className="w-32 h-32 text-slate-200 dark:text-slate-700 group-hover:scale-110 transition-transform duration-500" />
              <div className="absolute top-4 right-4 p-2 bg-white/80 dark:bg-slate-800/80 backdrop-blur-md rounded-full shadow-sm">
                <Star className="w-5 h-5 text-amber-500 fill-amber-500" />
              </div>
            </div>
            <div className="flex gap-3">
              <button className="flex-1 btn-outline flex items-center justify-center gap-2">
                <BookmarkPlus className="w-4 h-4" /> Wishlist
              </button>
              <button className="p-3 btn-outline">
                <Share2 className="w-4 h-4" />
              </button>
            </div>
          </div>

          {/* Right: Book Info & Actions */}
          <div className="lg:col-span-2 space-y-8">
            <div>
              <div className="flex items-center gap-3 mb-4">
                <span className="px-3 py-1 bg-sky-100 dark:bg-sky-900/30 text-sky-600 dark:text-sky-400 rounded-full text-xs font-bold uppercase tracking-wider">
                  {book.category}
                </span>
                <span className={`px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider ${book.status === 'Available' ? 'bg-emerald-100 text-emerald-600' : 'bg-rose-100 text-rose-600'}`}>
                  {book.status}
                </span>
              </div>
              <h1 className="text-4xl font-bold text-slate-900 dark:text-white mb-2">{book.title}</h1>
              <p className="text-xl text-muted flex items-center gap-2">
                by <span className="font-semibold text-slate-700 dark:text-slate-300">{book.author}</span>
              </p>
            </div>

            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              <div className="p-4 bg-white dark:bg-slate-900 rounded-2xl border border-slate-100 dark:border-slate-800">
                <p className="text-[10px] font-bold text-slate-400 uppercase mb-1">ISBN</p>
                <p className="text-sm font-bold truncate">{book.isbn}</p>
              </div>
              <div className="p-4 bg-white dark:bg-slate-900 rounded-2xl border border-slate-100 dark:border-slate-800">
                <p className="text-[10px] font-bold text-slate-400 uppercase mb-1">Fine/Day</p>
                <p className="text-sm font-bold text-sky-600">Shs {book.fine_per_day}</p>
              </div>
              <div className="p-4 bg-white dark:bg-slate-900 rounded-2xl border border-slate-100 dark:border-slate-800">
                <p className="text-[10px] font-bold text-slate-400 uppercase mb-1">Published</p>
                <p className="text-sm font-bold">{book.published_year}</p>
              </div>
              <div className="p-4 bg-white dark:bg-slate-900 rounded-2xl border border-slate-100 dark:border-slate-800">
                <p className="text-[10px] font-bold text-slate-400 uppercase mb-1">Available</p>
                <p className="text-sm font-bold">{book.copies_available} Copies</p>
              </div>
            </div>

            <div className="space-y-4">
              <h3 className="font-bold text-lg">About this book</h3>
              <p className="text-muted leading-relaxed text-lg">
                {book.description}
              </p>
            </div>

            <div className="pt-8 border-t border-slate-100 dark:border-slate-800">
              <button 
                onClick={handleBorrow}
                disabled={loading || book.status !== 'Available'}
                className="w-full md:w-auto px-12 py-4 bg-sky-600 hover:bg-sky-700 text-white rounded-2xl font-bold shadow-xl shadow-sky-200 dark:shadow-none transition-smooth flex items-center justify-center gap-3 disabled:opacity-50"
              >
                <ShieldCheck className="w-6 h-6" />
                {loading ? 'Processing...' : book.status === 'Available' ? 'Borrow This Book' : 'Join Waitlist'}
              </button>
              <p className="text-xs text-center md:text-left text-muted mt-4">
                * By borrowing, you agree to return the book within 14 days to avoid Shs 500/day late fees.
              </p>
            </div>
          </div>
        </div>
      </div>
    </MainLayout>
  );
};

export default BookDetails;
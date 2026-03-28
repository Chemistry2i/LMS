import React, { useState } from 'react';
import MainLayout from './MainLayout';
import { Plus, Book, Hash, User, Tag, FileText, Banknote, Save } from 'lucide-react';
import toast from 'react-hot-toast';

const ManageBooks = () => {
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    title: '',
    author: '',
    isbn: '',
    category: 'Fiction',
    description: '',
    quantity: 1,
    price: 50000,
  });

  const categories = ['Fiction', 'Academic', 'Biography', 'Science', 'Technology', 'History', 'Luganda Literature'];

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1000));
      toast.success(`${formData.title} added to collection!`);
      setFormData({ title: '', author: '', isbn: '', category: 'Fiction', description: '', quantity: 1, price: 50000 });
    } catch (err) {
      toast.error('Failed to add book');
    } finally {
      setLoading(false);
    }
  };

  return (
    <MainLayout>
      <div className="max-w-3xl mx-auto">
        <div className="flex items-center gap-3 mb-8">
          <div className="p-3 bg-sky-100 rounded-xl">
            <Plus className="w-6 h-6 text-sky-600" />
          </div>
          <div>
            <h1 className="text-2xl font-bold">Add New Book</h1>
            <p className="text-sm text-muted">Register a new item in the library catalog</p>
          </div>
        </div>

        <form onSubmit={handleSubmit} className="card space-y-6">
          <div className="grid md:grid-cols-2 gap-6">
            <div className="space-y-2">
              <label className="text-sm font-semibold flex items-center gap-2">
                <Book className="w-4 h-4 text-sky-500" /> Book Title
              </label>
              <input 
                required
                type="text" 
                className="input-base" 
                placeholder="e.g. Things Fall Apart"
                value={formData.title}
                onChange={(e) => setFormData({...formData, title: e.target.value})}
              />
            </div>
            <div className="space-y-2">
              <label className="text-sm font-semibold flex items-center gap-2">
                <User className="w-4 h-4 text-sky-500" /> Author Name
              </label>
              <input 
                required
                type="text" 
                className="input-base" 
                placeholder="Chinua Achebe"
                value={formData.author}
                onChange={(e) => setFormData({...formData, author: e.target.value})}
              />
            </div>
            <div className="space-y-2">
              <label className="text-sm font-semibold flex items-center gap-2">
                <Hash className="w-4 h-4 text-sky-500" /> ISBN Number
              </label>
              <input 
                required
                type="text" 
                className="input-base" 
                placeholder="978-0..."
                value={formData.isbn}
                onChange={(e) => setFormData({...formData, isbn: e.target.value})}
              />
            </div>
            <div className="space-y-2">
              <label className="text-sm font-semibold flex items-center gap-2">
                <Tag className="w-4 h-4 text-sky-500" /> Category
              </label>
              <select 
                className="input-base"
                value={formData.category}
                onChange={(e) => setFormData({...formData, category: e.target.value})}
              >
                {categories.map(c => <option key={c} value={c}>{c}</option>)}
              </select>
            </div>
          </div>

          <div className="space-y-2">
            <label className="text-sm font-semibold flex items-center gap-2">
              <FileText className="w-4 h-4 text-sky-500" /> Description
            </label>
            <textarea 
              className="input-base min-h-[120px] py-3" 
              placeholder="Enter book summary and metadata..."
              value={formData.description}
              onChange={(e) => setFormData({...formData, description: e.target.value})}
            ></textarea>
          </div>

          <div className="flex justify-end gap-4 pt-4 border-t border-slate-100 dark:border-slate-800">
            <button type="button" className="btn-outline">Cancel</button>
            <button 
              disabled={loading}
              type="submit" 
              className="px-8 py-3 bg-sky-600 text-white rounded-xl font-bold hover:bg-sky-700 transition-smooth flex items-center gap-2 disabled:opacity-50"
            >
              <Save className="w-5 h-5" />
              {loading ? 'Adding...' : 'Add to Collection'}
            </button>
          </div>
        </form>
      </div>
    </MainLayout>
  );
};

export default ManageBooks;
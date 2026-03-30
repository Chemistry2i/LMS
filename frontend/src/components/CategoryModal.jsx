import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X } from 'lucide-react';

const CategoryModal = ({ open, onClose, onSubmit, loading }) => {
  const [category_name, setCategoryName] = useState('');
  const [description, setDescription] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit({ category_name, description });
  };

  React.useEffect(() => {
    if (!open) {
      setCategoryName('');
      setDescription('');
    }
  }, [open]);

  return (
    <AnimatePresence>
      {open && (
        <motion.div 
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/30 backdrop-blur-sm"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
        >
          <motion.form 
            className="bg-white dark:bg-slate-900 rounded-xl shadow-xl p-8 w-full max-w-md relative"
            initial={{ scale: 0.95, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.95, opacity: 0 }}
            onSubmit={handleSubmit}
          >
            <button type="button" className="absolute top-4 right-4 text-slate-400 hover:text-red-500" onClick={onClose}>
              <X className="w-5 h-5" />
            </button>
            <h2 className="text-xl font-bold mb-4 text-slate-900 dark:text-white">Add New Category</h2>
            <div className="mb-4">
              <label className="block text-sm font-medium mb-1">Category Name</label>
              <input
                type="text"
                className="input-base w-full"
                value={category_name}
                onChange={e => setCategoryName(e.target.value)}
                required
                placeholder="e.g. Science Fiction"
              />
            </div>
            <div className="mb-6">
              <label className="block text-sm font-medium mb-1">Description</label>
              <textarea
                className="input-base w-full min-h-[80px]"
                value={description}
                onChange={e => setDescription(e.target.value)}
                placeholder="Short description (optional)"
              />
            </div>
            <button
              type="submit"
              className="w-full py-3 bg-sky-600 text-white rounded-xl font-bold hover:bg-sky-700 transition-smooth disabled:opacity-60"
              disabled={loading}
            >
              {loading ? 'Adding...' : 'Add Category'}
            </button>
          </motion.form>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default CategoryModal;

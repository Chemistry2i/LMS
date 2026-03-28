import React, { useState, useCallback } from 'react';
import { Search, X } from 'lucide-react';

const SearchBar = ({ 
  placeholder = 'Search...',
  onSearch,
  onChange,
  value,
  debounceDelay = 300,
  variant = 'default'
}) => {
  const [searchValue, setSearchValue] = useState(value || '');
  const [timeoutId, setTimeoutId] = useState(null);

  const handleChange = useCallback((e) => {
    const val = e.target.value;
    setSearchValue(val);
    onChange?.(val);

    // Clear existing timeout
    if (timeoutId) clearTimeout(timeoutId);

    // Set new timeout for debounced search
    const newTimeoutId = setTimeout(() => {
      onSearch?.(val);
    }, debounceDelay);

    setTimeoutId(newTimeoutId);
  }, [debounceDelay, onSearch, onChange, timeoutId]);

  const handleClear = () => {
    setSearchValue('');
    onChange?.('');
    onSearch?.('');
  };

  const variants = {
    default: 'bg-white dark:bg-slate-800 border border-slate-300 dark:border-slate-600',
    subtle: 'bg-slate-100 dark:bg-slate-700 border-0',
    outline: 'bg-transparent border-2 border-sky-500 dark:border-sky-400',
  };

  return (
    <div className={`relative rounded-lg flex items-center px-4 py-2.5 transition-smooth ${variants[variant]}`}>
      <Search className="absolute left-4 w-5 h-5 text-slate-400 dark:text-slate-500" />
      <input
        type="text"
        placeholder={placeholder}
        value={searchValue}
        onChange={handleChange}
        className="w-full bg-transparent pl-6 pr-10 outline-none text-slate-900 dark:text-white placeholder-slate-500 dark:placeholder-slate-400"
      />
      {searchValue && (
        <button
          onClick={handleClear}
          className="absolute right-3 p-1 hover:bg-slate-100 dark:hover:bg-slate-700 rounded-md transition-smooth"
          aria-label="Clear search"
        >
          <X className="w-4 h-4 text-slate-400" />
        </button>
      )}
    </div>
  );
};

export default SearchBar;

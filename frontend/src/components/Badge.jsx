import React from 'react';

const Badge = ({ 
  children, 
  variant = 'default',
  size = 'md',
  icon: Icon,
  removable = false,
  onRemove
}) => {
  const variants = {
    default: 'bg-slate-100 text-slate-800 dark:bg-slate-800 dark:text-slate-100',
    primary: 'bg-sky-100 text-sky-800 dark:bg-sky-900 dark:text-sky-200',
    success: 'bg-emerald-100 text-emerald-800 dark:bg-emerald-900 dark:text-emerald-200',
    warning: 'bg-amber-100 text-amber-800 dark:bg-amber-900 dark:text-amber-200',
    danger: 'bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200',
    info: 'bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200',
  };

  const sizes = {
    sm: 'px-2 py-1 text-xs',
    md: 'px-3 py-1.5 text-sm',
    lg: 'px-4 py-2 text-base',
  };

  return (
    <span
      className={`inline-flex items-center gap-1.5 rounded-full font-medium transition-smooth ${
        variants[variant]
      } ${sizes[size]}`}
    >
      {Icon && <Icon className="w-3 h-3" />}
      {children}
      {removable && (
        <button
          onClick={onRemove}
          className="ml-1 hover:opacity-70 transition-smooth"
          aria-label="Remove badge"
        >
          ✕
        </button>
      )}
    </span>
  );
};

export default Badge;

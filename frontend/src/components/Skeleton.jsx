import React from 'react';

const Skeleton = ({ 
  className = '', 
  width = 'w-full', 
  height = 'h-4',
  circle = false,
  count = 1,
  lines = false
}) => {
  if (lines) {
    return (
      <div className={`space-y-2 ${className}`}>
        {[...Array(count)].map((_, i) => (
          <div 
            key={i} 
            className={`${width} ${height} bg-slate-200 dark:bg-slate-700 rounded animate-pulse`}
          />
        ))}
      </div>
    );
  }

  return (
    <div
      className={`
        ${width} ${height}
        ${circle ? 'rounded-full' : 'rounded-lg'}
        bg-slate-200 dark:bg-slate-700 animate-pulse
        ${className}
      `}
    />
  );
};

// Preset Skeleton Loaders

export const CardSkeleton = () => (
  <div className="card space-y-4 animate-pulse">
    <Skeleton height="h-6" width="w-2/3" />
    <Skeleton height="h-4" width="w-full" lines count={3} />
    <div className="flex gap-2 pt-4">
      <Skeleton height="h-10" width="w-24" />
      <Skeleton height="h-10" width="w-24" />
    </div>
  </div>
);

export const BookCardSkeleton = () => (
  <div className="card space-y-3 animate-pulse">
    <Skeleton height="h-48" width="w-full" />
    <Skeleton height="h-5" width="w-3/4" />
    <Skeleton height="h-4" width="w-full" />
    <Skeleton height="h-4" width="w-2/3" />
  </div>
);

export const TableRowSkeleton = () => (
  <tr className="border-b border-slate-200 dark:border-slate-700">
    <td className="py-4 px-6" colSpan="5">
      <div className="space-y-3">
        <div className="flex gap-4">
          <Skeleton height="h-4" width="w-1/5" />
          <Skeleton height="h-4" width="w-1/5" />
          <Skeleton height="h-4" width="w-1/5" />
          <Skeleton height="h-4" width="w-1/5" />
          <Skeleton height="h-4" width="w-1/5" />
        </div>
        <div className="flex gap-4">
          <Skeleton height="h-4" width="w-1/5" />
          <Skeleton height="h-4" width="w-1/5" />
          <Skeleton height="h-4" width="w-1/5" />
          <Skeleton height="h-4" width="w-1/5" />
          <Skeleton height="h-4" width="w-1/5" />
        </div>
      </div>
    </td>
  </tr>
);

export const ProfileSkeleton = () => (
  <div className="card space-y-6 animate-pulse">
    <div className="flex gap-6">
      <Skeleton height="h-20" width="w-20" circle />
      <div className="flex-1 space-y-2">
        <Skeleton height="h-6" width="w-2/5" />
        <Skeleton height="h-4" width="w-1/3" />
      </div>
    </div>
    <div className="space-y-3">
      <Skeleton height="h-4" width="w-full" />
      <Skeleton height="h-4" width="w-full" />
      <Skeleton height="h-4" width="w-3/4" />
    </div>
  </div>
);

export const ListSkeleton = ({ count = 5 }) => (
  <div className="space-y-3">
    {[...Array(count)].map((_, i) => (
      <div key={i} className="card p-4 space-y-2 animate-pulse">
        <Skeleton height="h-5" width="w-2/3" />
        <Skeleton height="h-3" width="w-full" />
        <Skeleton height="h-3" width="w-4/5" />
      </div>
    ))}
  </div>
);

export default Skeleton;

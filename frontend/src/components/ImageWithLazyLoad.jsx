import React, { useState, useRef, useEffect } from 'react';
import { Skeleton } from 'lucide-react';

const ImageWithLazyLoad = ({
  src,
  alt = 'Image',
  width = 'auto',
  height = 'auto',
  blur = true,
  blurDataUrl = 'data:image/svg+xml,%3Csvg xmlns=\'http://www.w3.org/2000/svg\' viewBox=\'0 0 10 10\'%3E%3Cfilter id=\'blur\'%3E%3CfeGaussianBlur in=\'SourceGraphic\' stdDeviation=\'5\' /%3E%3C/filter%3E%3Crect width=\'10\' height=\'10\' fill=\'%23e2e8f0\' filter=\'url(%23blur)\'/%3E%3C/svg%3E',
  className = '',
  objectFit = 'cover',
  onLoad = () => {},
  onError = () => {},
  loading = 'lazy',
}) => {
  const [isLoaded, setIsLoaded] = useState(false);
  const [hasError, setHasError] = useState(false);
  const imgRef = useRef(null);

  useEffect(() => {
    // Intersection Observer for lazy loading
    if (imgRef.current && loading === 'lazy') {
      const observer = new IntersectionObserver(
        ([entry]) => {
          if (entry.isIntersecting) {
            imgRef.current.src = src;
            observer.unobserve(imgRef.current);
          }
        },
        { threshold: 0.1 }
      );
      observer.observe(imgRef.current);
      return () => observer.disconnect();
    }
  }, [src, loading]);

  const handleLoad = () => {
    setIsLoaded(true);
    onLoad();
  };

  const handleError = () => {
    setHasError(true);
    onError();
  };

  return (
    <div
      className={`relative overflow-hidden bg-slate-200 dark:bg-slate-700 ${className}`}
      style={{ width, height }}
    >
      {/* Loading Skeleton */}
      {!isLoaded && !hasError && (
        <div className="absolute inset-0 animate-pulse bg-gradient-to-r from-slate-200 via-slate-100 to-slate-200 dark:from-slate-700 dark:via-slate-600 dark:to-slate-700" />
      )}

      {/* Blur Placeholder */}
      {blur && loading === 'lazy' && !isLoaded && (
        <img
          src={blurDataUrl}
          alt=""
          className="absolute inset-0 w-full h-full"
          style={{ objectFit }}
        />
      )}

      {/* Main Image */}
      <img
        ref={imgRef}
        src={loading === 'eager' ? src : undefined}
        alt={alt}
        onLoad={handleLoad}
        onError={handleError}
        className={`w-full h-full transition-opacity duration-300 ${
          isLoaded ? 'opacity-100' : 'opacity-0'
        } ${hasError ? 'hidden' : ''}`}
        style={{ objectFit }}
      />

      {/* Error Fallback */}
      {hasError && (
        <div className="absolute inset-0 flex items-center justify-center bg-slate-100 dark:bg-slate-800">
          <div className="text-center">
            <div className="text-4xl mb-2">📷</div>
            <p className="text-xs text-slate-500 dark:text-slate-400">Image not found</p>
          </div>
        </div>
      )}
    </div>
  );
};

export default ImageWithLazyLoad;

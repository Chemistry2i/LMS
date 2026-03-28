/**
 * Image Optimization Utilities
 * Lazy loading, compression, and WebP format support
 */

// Lazy Loading Image Component
export const LazyImage = ({ 
  src, 
  alt, 
  placeholder = 'blur',
  className,
  width,
  height,
  ...props 
}) => {
  const [imageSrc, setImageSrc] = React.useState(placeholder === 'blur' ? src : '');
  const [imageRef, setImageRef] = React.useState(null);

  React.useEffect(() => {
    let observer;

    if (imageRef && placeholder === 'blur') {
      observer = new IntersectionObserver((entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setImageSrc(src);
            observer?.unobserve(imageRef);
          }
        });
      });

      observer.observe(imageRef);
    }

    return () => {
      observer?.unobserve(imageRef);
    };
  }, [imageRef, src, placeholder]);

  return (
    <img
      ref={setImageRef}
      src={imageSrc || src}
      alt={alt}
      className={`transition-opacity duration-300 ${
        imageSrc ? 'opacity-100' : 'opacity-50 blur-sm'
      } ${className}`}
      width={width}
      height={height}
      loading="lazy"
      {...props}
    />
  );
};

// Generate optimized image URL with size
export const getOptimizedImageUrl = (url, width, height, format = 'webp') => {
  if (!url) return null;

  // If using a CDN or image service (e.g., Cloudinary, Imgix)
  // Adjust this based on your image service
  const optimizedUrl = new URL(url);
  
  // Example for local optimization
  return `${url}?w=${width}&h=${height}&fmt=${format}&q=80`;
};

// Preload images
export const preloadImage = (src) => {
  return new Promise((resolve, reject) => {
    const img = new Image();
    img.onload = () => resolve(img);
    img.onerror = () => reject(new Error(`Failed to preload image: ${src}`));
    img.src = src;
  });
};

// Responsive image srcset generator
export const generateSrcSet = (imageName) => {
  const sizes = [320, 640, 960, 1280, 1600];
  return sizes.map((size) => `${imageName}-${size}w.webp ${size}w`).join(', ');
};

// Picture component with WebP fallback
export const PictureComponent = ({ 
  src, 
  alt, 
  width, 
  height, 
  className,
  ...props 
}) => {
  return (
    <picture>
      <source 
        srcSet={generateSrcSet(src.replace(/\.[^.]+$/, ''))} 
        type="image/webp" 
      />
      <img
        src={src}
        alt={alt}
        width={width}
        height={height}
        className={className}
        loading="lazy"
        {...props}
      />
    </picture>
  );
};

// Image compression utility
export const compressImage = async (file, quality = 0.8) => {
  return new Promise((resolve) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = (event) => {
      const img = new Image();
      img.src = event.target.result;
      img.onload = () => {
        const canvas = document.createElement('canvas');
        const ctx = canvas.getContext('2d');
        
        canvas.width = img.width;
        canvas.height = img.height;
        
        ctx.drawImage(img, 0, 0);
        
        canvas.toBlob(
          (blob) => resolve(blob),
          'image/webp',
          quality
        );
      };
    };
  });
};

// Get image dimensions
export const getImageDimensions = (url) => {
  return new Promise((resolve, reject) => {
    const img = new Image();
    img.onload = () => resolve({ width: img.width, height: img.height });
    img.onerror = () => reject(new Error('Failed to load image'));
    img.src = url;
  });
};

export default {
  LazyImage,
  getOptimizedImageUrl,
  preloadImage,
  generateSrcSet,
  PictureComponent,
  compressImage,
  getImageDimensions,
};

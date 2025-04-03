
import { useState, useEffect, useCallback, useRef } from 'react';

interface UseImageLazyLoadOptions {
  threshold?: number;
  rootMargin?: string;
}

const useImageLazyLoad = (
  src: string, 
  placeholderSrc: string = "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 1 1'%3E%3C/svg%3E",
  options: UseImageLazyLoadOptions = {}
) => {
  const [imageSrc, setImageSrc] = useState(placeholderSrc);
  const [imageRef, setImageRef] = useState<HTMLImageElement | null>(null);
  const [isLoaded, setIsLoaded] = useState(false);
  const observerRef = useRef<IntersectionObserver | null>(null);

  const { threshold = 0.1, rootMargin = '150px' } = options;

  const onLoad = useCallback(() => {
    setIsLoaded(true);
  }, []);

  const onError = useCallback(() => {
    setIsLoaded(false);
    setImageSrc(placeholderSrc);
    console.error("Failed to load image:", src);
  }, [placeholderSrc, src]);

  useEffect(() => {
    let didCancel = false;

    if (imageRef && !isLoaded) {
      // Cleanup previous observer
      if (observerRef.current) {
        observerRef.current.disconnect();
      }

      if ('IntersectionObserver' in window) {
        observerRef.current = new IntersectionObserver(
          (entries) => {
            entries.forEach((entry) => {
              // When image is visible in the viewport
              if (
                !didCancel &&
                (entry.intersectionRatio > 0 || entry.isIntersecting)
              ) {
                // Create new image to preload
                const img = new Image();
                img.src = src;
                img.onload = () => {
                  if (!didCancel) {
                    setImageSrc(src);
                  }
                };
                img.onerror = onError;
                
                // Stop watching once the entry is detected
                if (observerRef.current && imageRef) {
                  observerRef.current.unobserve(imageRef);
                }
              }
            });
          },
          {
            threshold,
            rootMargin, // Increased to start loading earlier
          }
        );
        observerRef.current.observe(imageRef);
      } else {
        // Fallback for browsers that don't support IntersectionObserver
        setImageSrc(src);
      }
    }

    return () => {
      didCancel = true;
      if (observerRef.current && imageRef) {
        observerRef.current.unobserve(imageRef);
        observerRef.current.disconnect();
      }
    };
  }, [src, imageRef, isLoaded, threshold, rootMargin, onError]);

  return { imageSrc, setImageRef, isLoaded, onLoad, onError };
};

export default useImageLazyLoad;

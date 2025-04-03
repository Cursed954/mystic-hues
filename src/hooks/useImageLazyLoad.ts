
import { useState, useEffect, useCallback } from 'react';

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

  const { threshold = 0.1, rootMargin = '0px' } = options;

  const onLoad = useCallback(() => {
    setIsLoaded(true);
  }, []);

  const onError = useCallback(() => {
    setIsLoaded(false);
    setImageSrc(placeholderSrc);
  }, [placeholderSrc]);

  useEffect(() => {
    let observer: IntersectionObserver;
    let didCancel = false;

    if (imageRef && !isLoaded) {
      if (IntersectionObserver) {
        observer = new IntersectionObserver(
          (entries) => {
            entries.forEach((entry) => {
              // When image is visible in the viewport
              if (
                !didCancel &&
                (entry.intersectionRatio > 0 || entry.isIntersecting)
              ) {
                setImageSrc(src);
                // Stop watching once the image is loaded
                observer.unobserve(imageRef);
              }
            });
          },
          {
            threshold,
            rootMargin,
          }
        );
        observer.observe(imageRef);
      } else {
        // Fallback for browsers that don't support IntersectionObserver
        setImageSrc(src);
      }
    }

    return () => {
      didCancel = true;
      if (observer && imageRef) {
        observer.unobserve(imageRef);
      }
    };
  }, [src, imageRef, isLoaded, threshold, rootMargin]);

  return { imageSrc, setImageRef, isLoaded, onLoad, onError };
};

export default useImageLazyLoad;

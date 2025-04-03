
import React, { memo } from 'react';
import useImageLazyLoad from '@/hooks/useImageLazyLoad';
import { cn } from '@/lib/utils';

interface LazyImageProps extends React.ImgHTMLAttributes<HTMLImageElement> {
  src: string;
  alt: string;
  placeholderSrc?: string;
  className?: string;
  rootMargin?: string;
}

const LazyImage = memo(({
  src,
  alt,
  placeholderSrc,
  className,
  rootMargin = '150px',
  ...props
}: LazyImageProps) => {
  const { imageSrc, setImageRef, onLoad, onError } = useImageLazyLoad(
    src,
    placeholderSrc,
    { rootMargin }
  );

  return (
    <div className={cn("relative overflow-hidden", className)}>
      <img
        ref={setImageRef}
        src={imageSrc}
        alt={alt}
        onLoad={onLoad}
        onError={onError}
        className={cn("will-change-transform transition-opacity duration-300", className)}
        loading="lazy"
        {...props}
      />
    </div>
  );
});

LazyImage.displayName = 'LazyImage';

export default LazyImage;

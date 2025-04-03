
import React, { useState, useRef } from 'react';
import { ScrollArea } from '@/components/ui/scroll-area';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { Button } from '@/components/ui/button';
import useMobile from '@/hooks/use-mobile';
import { cn } from '@/lib/utils';

interface HorizontalScrollProps {
  children: React.ReactNode;
  className?: string;
  itemClassName?: string;
  showControls?: boolean;
}

const HorizontalScroll: React.FC<HorizontalScrollProps> = ({
  children,
  className,
  showControls = true,
}) => {
  const scrollRef = useRef<HTMLDivElement>(null);
  const [canScrollLeft, setCanScrollLeft] = useState(false);
  const [canScrollRight, setCanScrollRight] = useState(true);
  const isMobile = useMobile();

  const checkScrollButtons = () => {
    if (!scrollRef.current) return;
    
    const { scrollLeft, scrollWidth, clientWidth } = scrollRef.current;
    setCanScrollLeft(scrollLeft > 0);
    setCanScrollRight(scrollLeft < scrollWidth - clientWidth - 10);
  };

  const scroll = (direction: 'left' | 'right') => {
    if (!scrollRef.current) return;
    
    const scrollAmount = scrollRef.current.clientWidth * 0.8;
    scrollRef.current.scrollBy({
      left: direction === 'left' ? -scrollAmount : scrollAmount,
      behavior: 'smooth',
    });
  };

  return (
    <div className={cn("relative group", className)}>
      {showControls && !isMobile && canScrollLeft && (
        <Button
          variant="outline"
          size="icon"
          className="absolute left-0 top-1/2 -translate-y-1/2 z-10 opacity-80 hover:opacity-100 bg-background/80 backdrop-blur-sm"
          onClick={() => scroll('left')}
        >
          <ChevronLeft className="h-4 w-4" />
          <span className="sr-only">Scroll left</span>
        </Button>
      )}
      
      <div 
        ref={scrollRef}
        className="overflow-x-auto pb-4 scrollbar-hide snap-x snap-mandatory"
        onScroll={checkScrollButtons}
      >
        <div className="flex space-x-4 px-4">
          {children}
        </div>
      </div>
      
      {showControls && !isMobile && canScrollRight && (
        <Button
          variant="outline"
          size="icon"
          className="absolute right-0 top-1/2 -translate-y-1/2 z-10 opacity-80 hover:opacity-100 bg-background/80 backdrop-blur-sm"
          onClick={() => scroll('right')}
        >
          <ChevronRight className="h-4 w-4" />
          <span className="sr-only">Scroll right</span>
        </Button>
      )}
    </div>
  );
};

export default HorizontalScroll;


import React, { useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import { cn } from '@/lib/utils';
import { fadeIn, slideIn, scaleIn } from '@/lib/animations';

interface ScrollRevealProps {
  children: React.ReactNode;
  className?: string;
  threshold?: number;
  delay?: number;
  animation?: 'fade-in' | 'fade-in-right' | 'fade-in-left' | 'slide-up' | 'scale-in';
}

const ScrollReveal: React.FC<ScrollRevealProps> = ({
  children,
  className,
  threshold = 0.1,
  delay = 0,
  animation = 'fade-in',
}) => {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, amount: threshold });

  const getVariants = () => {
    switch (animation) {
      case 'fade-in-right':
        return fadeIn('right', delay * 0.1);
      case 'fade-in-left':
        return fadeIn('left', delay * 0.1);
      case 'slide-up':
        return slideIn('up', delay * 0.1);
      case 'scale-in':
        return scaleIn(delay * 0.1);
      default:
        return fadeIn('up', delay * 0.1);
    }
  };

  return (
    <motion.div
      ref={ref}
      initial="hidden"
      animate={isInView ? "visible" : "hidden"}
      variants={getVariants()}
      className={cn(className)}
      style={{ willChange: 'opacity, transform' }}
    >
      {children}
    </motion.div>
  );
};

export default ScrollReveal;

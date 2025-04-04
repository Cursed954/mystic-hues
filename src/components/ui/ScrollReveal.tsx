
import React, { useRef } from 'react';
import { motion, useInView, Variants } from 'framer-motion';
import { cn } from '@/lib/utils';
import { 
  fadeIn, 
  slideIn, 
  scaleIn, 
  rubikRotate, 
  morphEffect,
  revealFromLeft,
  revealFromRight,
  reveal3D
} from '@/lib/animations';

type AnimationType = 
  | 'fade-in' 
  | 'fade-in-right' 
  | 'fade-in-left'
  | 'slide-up' 
  | 'slide-down'
  | 'slide-left'
  | 'slide-right'
  | 'scale-in'
  | 'scale-in-bounce'
  | 'flip'
  | 'rotate'
  | 'morph'
  | 'reveal-left'
  | 'reveal-right'
  | '3d-reveal';

interface ScrollRevealProps {
  children: React.ReactNode;
  className?: string;
  threshold?: number;
  delay?: number;
  duration?: number;
  animation?: AnimationType;
  amount?: number;
  once?: boolean;
  useScrollTrigger?: boolean;
}

const ScrollReveal: React.FC<ScrollRevealProps> = ({
  children,
  className,
  threshold = 0.1,
  delay = 0,
  duration = 0.6,
  animation = 'fade-in',
  amount = 0.3,
  once = true,
  useScrollTrigger = true
}) => {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { 
    once, 
    amount: threshold
  });
  
  const getVariants = (): Variants => {
    const delayValue = delay * 0.1;
    
    switch (animation) {
      case 'fade-in-right':
        return fadeIn('right', delayValue);
      case 'fade-in-left':
        return fadeIn('left', delayValue);
      case 'slide-up':
        return slideIn('up', delayValue);
      case 'slide-down':
        return slideIn('down', delayValue);
      case 'slide-left':
        return slideIn('left', delayValue);
      case 'slide-right':
        return slideIn('right', delayValue);
      case 'scale-in':
        return scaleIn(delayValue);
      case 'scale-in-bounce':
        return {
          hidden: { scale: 0.7, opacity: 0 },
          visible: { 
            scale: [0.7, 1.05, 1],
            opacity: 1,
            transition: {
              duration: 0.6,
              times: [0, 0.7, 1],
              delay: delayValue
            }
          }
        };
      case 'flip':
        return rubikRotate(delayValue);
      case 'morph':
        return morphEffect(delayValue);
      case 'reveal-left':
        return revealFromLeft(delayValue);
      case 'reveal-right':
        return revealFromRight(delayValue);
      case '3d-reveal':
        return reveal3D(delayValue);
      case 'rotate':
        return {
          hidden: { opacity: 0, rotate: 15, scale: 0.8 },
          visible: {
            opacity: 1,
            rotate: 0,
            scale: 1,
            transition: {
              type: "spring",
              damping: 15,
              stiffness: 150,
              delay: delayValue,
              duration
            }
          }
        };
      default:
        return fadeIn('up', delayValue);
    }
  };

  // If we're not using scroll trigger, just render with initial animation
  if (!useScrollTrigger) {
    return (
      <motion.div
        initial="hidden"
        animate="visible"
        variants={getVariants()}
        className={cn(className)}
        style={{ willChange: 'opacity, transform' }}
      >
        {children}
      </motion.div>
    );
  }

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

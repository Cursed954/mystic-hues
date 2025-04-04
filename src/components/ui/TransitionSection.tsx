
import React, { useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import { cn } from '@/lib/utils';

type TransitionType = 
  | 'fade-up'
  | 'fade-down'
  | 'fade-left'
  | 'fade-right'
  | 'zoom-in'
  | 'zoom-out'
  | 'flip-up'
  | 'flip-down'
  | 'slide-up'
  | 'slide-down'
  | 'rotate';

interface TransitionSectionProps {
  children: React.ReactNode;
  className?: string;
  transition?: TransitionType;
  delay?: number;
  duration?: number;
  threshold?: number;
  once?: boolean;
  staggerChildren?: boolean;
  staggerDelay?: number;
}

const transitions = {
  'fade-up': { 
    hidden: { opacity: 0, y: 50 }, 
    visible: { opacity: 1, y: 0 } 
  },
  'fade-down': { 
    hidden: { opacity: 0, y: -50 }, 
    visible: { opacity: 1, y: 0 } 
  },
  'fade-left': { 
    hidden: { opacity: 0, x: -50 }, 
    visible: { opacity: 1, x: 0 } 
  },
  'fade-right': { 
    hidden: { opacity: 0, x: 50 }, 
    visible: { opacity: 1, x: 0 } 
  },
  'zoom-in': { 
    hidden: { opacity: 0, scale: 0.8 }, 
    visible: { opacity: 1, scale: 1 } 
  },
  'zoom-out': { 
    hidden: { opacity: 0, scale: 1.2 }, 
    visible: { opacity: 1, scale: 1 } 
  },
  'flip-up': { 
    hidden: { opacity: 0, rotateX: 80 }, 
    visible: { opacity: 1, rotateX: 0 } 
  },
  'flip-down': { 
    hidden: { opacity: 0, rotateX: -80 }, 
    visible: { opacity: 1, rotateX: 0 } 
  },
  'slide-up': { 
    hidden: { y: 100 }, 
    visible: { y: 0 } 
  },
  'slide-down': { 
    hidden: { y: -100 }, 
    visible: { y: 0 } 
  },
  'rotate': { 
    hidden: { opacity: 0, rotate: 20, scale: 0.8 }, 
    visible: { opacity: 1, rotate: 0, scale: 1 } 
  }
};

const TransitionSection: React.FC<TransitionSectionProps> = ({
  children,
  className,
  transition = 'fade-up',
  delay = 0,
  duration = 0.6,
  threshold = 0.1,
  once = true,
  staggerChildren = false,
  staggerDelay = 0.1
}) => {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { 
    once,
    amount: threshold
  });

  const currentTransition = transitions[transition];

  return (
    <motion.div
      ref={ref}
      className={cn('overflow-hidden', className)}
      initial="hidden"
      animate={isInView ? "visible" : "hidden"}
      variants={staggerChildren ? {
        hidden: { opacity: 0 },
        visible: {
          opacity: 1,
          transition: {
            staggerChildren: staggerDelay,
            delayChildren: delay
          }
        }
      } : undefined}
      style={{
        willChange: 'transform, opacity',
        transformStyle: transition.includes('flip') ? 'preserve-3d' : undefined
      }}
      transition={{
        duration,
        delay: staggerChildren ? 0 : delay,
        ease: "easeOut"
      }}
    >
      {staggerChildren ? (
        React.Children.map(children, (child, index) => (
          <motion.div
            key={index}
            variants={currentTransition}
            transition={{
              duration,
              ease: "easeOut"
            }}
          >
            {child}
          </motion.div>
        ))
      ) : (
        <motion.div variants={currentTransition}>
          {children}
        </motion.div>
      )}
    </motion.div>
  );
};

export default TransitionSection;

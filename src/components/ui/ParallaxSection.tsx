
import React, { useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { cn } from '@/lib/utils';

interface ParallaxSectionProps {
  children: React.ReactNode;
  className?: string;
  speed?: number;
  direction?: 'up' | 'down' | 'left' | 'right';
  easing?: 'linear' | 'easeIn' | 'easeOut' | 'easeInOut';
  offset?: ["start end", "end start"];
  scale?: boolean;
  rotate?: boolean;
}

const ParallaxSection: React.FC<ParallaxSectionProps> = ({
  children,
  className,
  speed = 0.1,
  direction = 'up',
  easing = 'easeOut',
  offset = ["start end", "end start"],
  scale = false,
  rotate = false,
}) => {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: offset
  });

  // Y motion based on direction
  const factor = direction === 'up' || direction === 'left' ? -1 : 1;
  const isHorizontal = direction === 'left' || direction === 'right';
  
  // Create dynamic transform values based on props
  const y = isHorizontal ? 0 : useTransform(scrollYProgress, [0, 1], [0, 200 * speed * factor]);
  const x = isHorizontal ? useTransform(scrollYProgress, [0, 1], [0, 200 * speed * factor]) : 0;
  const scaleValue = scale ? useTransform(scrollYProgress, [0, 0.5, 1], [1, 1 + (speed * 0.2), 1]) : 1;
  const rotateValue = rotate ? useTransform(scrollYProgress, [0, 1], [0, 10 * speed * factor]) : 0;
  const opacity = useTransform(scrollYProgress, [0, 0.2, 0.8, 1], [0.6, 1, 1, 0.6]);

  return (
    <div 
      ref={ref} 
      className={cn('overflow-hidden', className)}
    >
      <motion.div
        style={{ 
          y, 
          x, 
          scale: scaleValue,
          rotate: rotateValue,
          opacity
        }}
        transition={{ ease: easing }}
      >
        {children}
      </motion.div>
    </div>
  );
};

export default ParallaxSection;

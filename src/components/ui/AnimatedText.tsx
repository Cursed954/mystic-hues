
import React from 'react';
import { motion } from 'framer-motion';
import { cn } from '@/lib/utils';

// Animation variants
const animations = {
  fadeIn: {
    initial: { opacity: 0, y: 20 },
    animate: { opacity: 1, y: 0 }
  },
  slideIn: {
    initial: { opacity: 0, x: -20 },
    animate: { opacity: 1, x: 0 }
  },
  scaleIn: {
    initial: { opacity: 0, scale: 0.8 },
    animate: { opacity: 1, scale: 1 }
  },
  typewriter: {
    // This is handled differently in the component
  },
  highlight: {
    initial: { backgroundSize: "0% 100%" },
    animate: { backgroundSize: "100% 100%" }
  }
};

// Text hover effects
const hoverEffects = {
  glow: {
    hover: { textShadow: "0 0 8px rgba(255,255,255,0.8)" }
  },
  scale: {
    hover: { scale: 1.05 }
  },
  underline: {
    hover: { textDecoration: "underline" }
  },
  color: (color: string) => ({
    hover: { color }
  }),
  none: {} // Add this empty object for the "none" case
};

type AnimationType = keyof typeof animations;
type HoverEffectType = keyof typeof hoverEffects;

interface AnimatedTextProps {
  text: string;
  className?: string;
  animation?: AnimationType;
  hoverEffect?: HoverEffectType;
  hoverColor?: string;
  delay?: number;
  duration?: number;
  as?: React.ElementType;
  staggerChildren?: number;
  highlightColor?: string;
  repeat?: boolean;
}

const AnimatedText: React.FC<AnimatedTextProps> = ({
  text,
  className,
  animation = "fadeIn",
  hoverEffect = "none",
  hoverColor = "#ff7e11",
  delay = 0,
  duration = 0.5,
  as: Component = "span",
  staggerChildren = 0.03,
  highlightColor = "rgba(255,126,17,0.2)",
  repeat = false
}) => {
  // Handle typewriter effect separately
  if (animation === "typewriter") {
    return (
      <Component className={cn("inline-block", className)}>
        {text.split("").map((char, index) => (
          <motion.span
            key={index}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{
              duration: 0.1,
              delay: delay + index * staggerChildren,
              repeat: repeat ? Infinity : 0,
              repeatDelay: text.length * staggerChildren + 1
            }}
          >
            {char}
          </motion.span>
        ))}
      </Component>
    );
  }

  // For highlight animation, add specific styling
  if (animation === "highlight") {
    return (
      <motion.span
        className={cn("inline-block bg-left-bottom bg-no-repeat", className)}
        style={{
          backgroundImage: `linear-gradient(to right, ${highlightColor}, ${highlightColor})`,
          backgroundSize: "0% 100%",
          backgroundPosition: "left bottom"
        }}
        initial={animations[animation].initial}
        animate={animations[animation].animate}
        transition={{
          duration,
          delay,
          ease: "easeOut"
        }}
      >
        {text}
      </motion.span>
    );
  }

  // For other animations
  const getHoverAnimation = () => {
    if (hoverEffect === "none") return {};
    if (hoverEffect === "color") return hoverEffects.color(hoverColor).hover;
    return hoverEffects[hoverEffect]?.hover || {};
  };

  return (
    <motion.span
      className={cn("inline-block", className)}
      initial={animations[animation].initial}
      animate={animations[animation].animate}
      whileHover={getHoverAnimation()}
      transition={{
        duration,
        delay,
        type: "spring",
        stiffness: 100,
        ease: "easeOut",
        repeat: repeat ? Infinity : 0,
        repeatDelay: 3
      }}
    >
      {text}
    </motion.span>
  );
};

export default AnimatedText;


// Home: Experience the timeless spirit of India

import React, { useRef, useEffect, useState } from 'react';
import { ArrowRight } from 'lucide-react';
import ParallaxSection from '../ui/ParallaxSection';
import { motion, useScroll, useTransform, AnimatePresence } from 'framer-motion';
import { textVariant, fadeIn, staggerContainer, slideIn, scaleIn, morphEffect, neonPulse } from '@/lib/animations';

const Hero: React.FC = () => {
  const targetRef = useRef<HTMLDivElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);
  const [isVideoLoaded, setIsVideoLoaded] = useState(false);
  
  const { scrollYProgress } = useScroll({
    target: targetRef,
    offset: ["start start", "end start"]
  });

  const opacity = useTransform(scrollYProgress, [0, 0.5], [1, 0]);
  const scale = useTransform(scrollYProgress, [0, 0.5], [1, 0.8]);
  const y = useTransform(scrollYProgress, [0, 0.5], [0, 100]);
  
  // Additional parallax effects for stats cards
  const rotateX = useTransform(scrollYProgress, [0, 0.5], [0, 10]);
  const statsOpacity = useTransform(scrollYProgress, [0, 0.3, 0.5], [1, 0.8, 0]);

  // Ensure video autoplay works properly with high priority loading
  useEffect(() => {
    if (videoRef.current) {
      videoRef.current.defaultMuted = true;
      videoRef.current.muted = true;
      videoRef.current.autoplay = true;
      videoRef.current.loop = true;
      videoRef.current.playsInline = true;
      
      // Handle video load event
      videoRef.current.onloadeddata = () => setIsVideoLoaded(true);
      
      // Set the starting time to 18 seconds
      videoRef.current.currentTime = 18;
      
      // Set high priority for this video using a data attribute instead
      videoRef.current.setAttribute('importance', 'high');
      
      // Attempt to play immediately
      const playPromise = videoRef.current.play();
      
      if (playPromise !== undefined) {
        playPromise.catch(e => {
          console.error("Video autoplay failed:", e);
          // Try again after user interaction
          document.body.addEventListener('click', () => {
            if (videoRef.current) {
              videoRef.current.currentTime = 18;
              videoRef.current.play().catch(e => console.error("Video play failed after click:", e));
            }
          }, { once: true });
        });
      }
    }
  }, []);

  const floatingAnimation = {
    y: [0, -10, 0],
    transition: {
      duration: 3,
      repeat: Infinity,
      repeatType: "reverse" as const,
      ease: "easeInOut"
    }
  };

  return (
    <section id="home" ref={targetRef} className="relative min-h-screen flex items-center overflow-hidden">
      {/* Video Background with Overlay */}
      <div className="absolute inset-0 z-0 overflow-hidden">
        <AnimatePresence>
          {!isVideoLoaded && (
            <motion.div
              initial={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.8, ease: "easeOut" }}
              className="absolute inset-0 bg-spice-900 flex items-center justify-center z-20"
            >
              <motion.div
                initial={{ scale: 0.5, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                transition={{ duration: 1, ease: "easeOut" }}
                className="text-4xl text-white font-serif"
              >
                Mystic India
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>
        
        <motion.div 
          className="absolute inset-0 bg-gradient-to-b from-black/70 via-black/50 to-background z-10"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5, duration: 1.5 }}
        ></motion.div>
        
        <video
          ref={videoRef}
          className="w-full h-full object-cover"
          autoPlay
          muted
          loop
          playsInline
        >
          <source 
            src="https://player.vimeo.com/progressive_redirect/playback/921376317/rendition/1080p/file.mp4?loc=external&oauth2_token_id=1747418641&signature=81fe3100ce7a792e4a2487a6a6a26a72df29adc0cfe19bf09dcae05be11dce97" 
            type="video/mp4" 
          />
          Your browser does not support the video tag.
        </video>
      </div>

      {/* Abstract Pattern Overlay with shimmer effect */}
      <motion.div 
        className="absolute inset-0 bg-repeat opacity-15 z-[1] mix-blend-soft-light" 
        style={{ backgroundImage: 'url("https://www.transparenttextures.com/patterns/oriental-tiles.png")' }}
        animate={{ 
          backgroundPosition: ["0% 0%", "100% 100%"],
        }}
        transition={{ 
          duration: 120, 
          ease: "linear", 
          repeat: Infinity,
          repeatType: "reverse" 
        }}
      >
      </motion.div>

      {/* Floating light particles */}
      {Array.from({ length: 15 }).map((_, index) => (
        <motion.div 
          key={index}
          className="absolute w-1 h-1 bg-white rounded-full opacity-50 z-[2]"
          style={{ 
            left: `${Math.random() * 100}%`, 
            top: `${Math.random() * 100}%` 
          }}
          animate={{
            opacity: [0.2, 0.8, 0.2],
            scale: [1, 2, 1],
          }}
          transition={{
            duration: 3 + Math.random() * 5,
            repeat: Infinity,
            delay: Math.random() * 2
          }}
        />
      ))}

      {/* Content */}
      <motion.div 
        style={{ opacity, scale, y }}
        className="container mx-auto px-6 z-10 mt-16 relative"
      >
        <motion.div 
          variants={staggerContainer}
          initial="visible"
          animate="visible"
          className="max-w-3xl"
        >
          <motion.div
            className="relative mb-3"
            whileHover={{ scale: 1.05 }}
            transition={{ type: "spring", stiffness: 400, damping: 10 }}
          >
            <motion.p 
              variants={textVariant(0)}
              className="subtitle mb-3 text-white relative z-10"
            >
              Experience the timeless spirit of India
            </motion.p>
            <motion.div 
              className="absolute -bottom-1 left-0 h-[2px] bg-spice-400"
              initial={{ width: 0 }}
              animate={{ width: "100%" }}
              transition={{ delay: 0.5, duration: 1.2, ease: "easeInOut" }}
            />
          </motion.div>
          
          <motion.h1 
            variants={textVariant(0)}
            className="text-4xl md:text-5xl lg:text-7xl font-serif font-medium leading-tight mb-6 text-white"
          >
            Journey Through India's{" "}
            <motion.span 
              className="text-spice-400 relative inline-block"
              animate={{ 
                textShadow: ["0 0 0px rgba(255,126,17,0)", "0 0 10px rgba(255,126,17,0.5)", "0 0 0px rgba(255,126,17,0)"] 
              }}
              transition={{ 
                duration: 3, 
                repeat: Infinity, 
                repeatType: "reverse" 
              }}
            >
              Rich
            </motion.span>{" "}
            Cultural Heritage
          </motion.h1>
          
          <motion.p 
            variants={textVariant(0)}
            className="text-lg text-white/90 mb-8 max-w-2xl"
          >
            Explore the vibrant tapestry of traditions, art forms, and cuisines that make up India's diverse cultural landscape, from ancient temples to living traditions passed down through generations.
          </motion.p>
          
          <motion.div 
            variants={fadeIn("up", 0)}
            className="flex flex-wrap gap-4"
          >
            <motion.a 
              href="#states" 
              className="btn-primary flex items-center group"
              whileHover={{ 
                scale: 1.05, 
                boxShadow: "0 10px 25px rgba(255, 126, 17, 0.4)" 
              }}
              whileTap={{ scale: 0.95 }}
            >
              Explore States 
              <motion.div
                animate={{ x: [0, 5, 0] }}
                transition={{ repeat: Infinity, duration: 1.5, ease: "easeInOut" }}
              >
                <ArrowRight size={16} className="ml-2" />
              </motion.div>
            </motion.a>
            <motion.a 
              href="#about" 
              className="btn-outline bg-white/10 backdrop-blur-sm text-white hover:bg-white/20 transition-colors"
              whileHover={{ 
                scale: 1.05, 
                backgroundColor: "rgba(255, 255, 255, 0.15)" 
              }}
              whileTap={{ scale: 0.95 }}
            >
              Learn More
            </motion.a>
          </motion.div>
          
          {/* Stats with improved animation */}
          <motion.div 
            variants={staggerContainer}
            initial="visible"
            animate="visible"
            className="mt-16 grid grid-cols-2 md:grid-cols-4 gap-6"
            style={{ opacity: statsOpacity, rotateX }}
          >
            {[
              { number: "28+", label: "States" },
              { number: "1000+", label: "Cultural Traditions" },
              { number: "22+", label: "Official Languages" },
              { number: "5000+", label: "Years of History" }
            ].map((stat, index) => (
              <motion.div 
                key={index}
                variants={fadeIn("up", 0)}
                className="glass-panel p-4 rounded-lg bg-white/10 backdrop-blur-md border border-white/20"
                whileHover={{ 
                  y: -10, 
                  boxShadow: "0 15px 30px rgba(0, 0, 0, 0.2)",
                  backgroundColor: "rgba(255, 255, 255, 0.15)",
                  borderColor: "rgba(255, 255, 255, 0.3)"
                }}
                transition={{ 
                  type: "spring", 
                  stiffness: 300, 
                  damping: 15 
                }}
                {...(index % 2 === 0 ? { animate: floatingAnimation } : {})}
              >
                <motion.h3 
                  className="text-3xl font-medium text-spice-400 mb-1"
                  animate={{ 
                    textShadow: ["0 0 0px rgba(255,126,17,0)", "0 0 8px rgba(255,126,17,0.5)", "0 0 0px rgba(255,126,17,0)"] 
                  }}
                  transition={{ 
                    duration: 2, 
                    repeat: Infinity, 
                    repeatType: "reverse",
                    delay: index * 0.5
                  }}
                >
                  {stat.number}
                </motion.h3>
                <p className="text-sm text-white/80">{stat.label}</p>
              </motion.div>
            ))}
          </motion.div>
        </motion.div>
      </motion.div>
      
      {/* Enhanced Scroll Indicator */}
      <motion.div 
        className="absolute bottom-10 left-1/2 transform -translate-x-1/2 flex flex-col items-center"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, delay: 1 }}
      >
        <motion.div 
          className="w-[30px] h-[50px] rounded-full border-2 border-spice-400 mb-2 flex justify-center relative overflow-hidden"
          animate={{ 
            boxShadow: [
              "0 0 0 rgba(255, 126, 17, 0)", 
              "0 0 10px rgba(255, 126, 17, 0.5)", 
              "0 0 0 rgba(255, 126, 17, 0)"
            ] 
          }}
          transition={{ duration: 2, repeat: Infinity }}
        >
          <motion.div 
            className="w-1.5 h-3 bg-spice-400 rounded-full mt-2"
            animate={{ 
              y: [0, 28, 0],
              opacity: [1, 0.5, 1] 
            }}
            transition={{ 
              repeat: Infinity, 
              duration: 1.5, 
              ease: "easeInOut" 
            }}
          ></motion.div>
        </motion.div>
        <motion.p 
          className="text-xs uppercase tracking-widest text-white/80 font-light"
          animate={{ 
            opacity: [0.6, 1, 0.6],
          }}
          transition={{ 
            repeat: Infinity, 
            duration: 1.5, 
            ease: "easeInOut" 
          }}
        >
          Scroll Down
        </motion.p>
      </motion.div>
    </section>
  );
};

export default Hero;

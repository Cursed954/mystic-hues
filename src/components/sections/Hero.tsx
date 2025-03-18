
import React, { useRef } from 'react';
import { ArrowRight } from 'lucide-react';
import ParallaxSection from '../ui/ParallaxSection';
import { motion, useScroll, useTransform } from 'framer-motion';
import { textVariant, fadeIn, staggerContainer } from '@/lib/animations';

const Hero: React.FC = () => {
  const targetRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: targetRef,
    offset: ["start start", "end start"]
  });

  const opacity = useTransform(scrollYProgress, [0, 0.5], [1, 0]);
  const scale = useTransform(scrollYProgress, [0, 0.5], [1, 0.8]);
  const y = useTransform(scrollYProgress, [0, 0.5], [0, 100]);

  return (
    <section id="home" ref={targetRef} className="relative min-h-screen flex items-center overflow-hidden">
      {/* Background Image with Parallax */}
      <ParallaxSection speed={0.2} className="absolute inset-0 z-0">
        <div className="absolute inset-0 bg-gradient-to-b from-black/50 via-black/30 to-background z-10"></div>
        <motion.img
          style={{ scale: useTransform(scrollYProgress, [0, 1], [1.1, 1]) }}
          src="https://images.unsplash.com/photo-1524413840807-0c3cb6fa808d?q=80&w=2070"
          alt="Majestic Indian temple with ornate architecture at sunset"
          className="w-full h-full object-cover"
        />
      </ParallaxSection>

      {/* Abstract Pattern Overlay */}
      <div className="absolute inset-0 bg-repeat opacity-15 z-[1] mix-blend-soft-light" 
           style={{ backgroundImage: 'url("https://www.transparenttextures.com/patterns/oriental-tiles.png")' }}>
      </div>

      {/* Content */}
      <motion.div 
        style={{ opacity, scale, y }}
        className="container mx-auto px-6 z-10 mt-16 relative"
      >
        <motion.div 
          variants={staggerContainer}
          initial="hidden"
          animate="visible"
          className="max-w-3xl"
        >
          <motion.p 
            variants={textVariant(0.1)}
            className="subtitle mb-3 text-white"
          >
            Experience the timeless spirit of India
          </motion.p>
          
          <motion.h1 
            variants={textVariant(0.2)}
            className="text-4xl md:text-5xl lg:text-7xl font-serif font-medium leading-tight mb-6 text-white"
          >
            Journey Through India's <span className="text-spice-400">Rich</span> Cultural Heritage
          </motion.h1>
          
          <motion.p 
            variants={textVariant(0.3)}
            className="text-lg text-white/90 mb-8 max-w-2xl"
          >
            Explore the vibrant tapestry of traditions, art forms, and cuisines that make up India's diverse cultural landscape, from ancient temples to living traditions passed down through generations.
          </motion.p>
          
          <motion.div 
            variants={fadeIn("up", 0.4)}
            className="flex flex-wrap gap-4"
          >
            <a href="#states" className="btn-primary flex items-center group">
              Explore States <ArrowRight size={16} className="ml-2 group-hover:translate-x-1 transition-transform" />
            </a>
            <a href="#about" className="btn-outline bg-white/10 backdrop-blur-sm text-white hover:bg-white/20 transition-colors">
              Learn More
            </a>
          </motion.div>
          
          {/* Stats */}
          <motion.div 
            variants={staggerContainer}
            initial="hidden"
            animate="visible"
            className="mt-16 grid grid-cols-2 md:grid-cols-4 gap-6"
          >
            {[
              { number: "28+", label: "States" },
              { number: "1000+", label: "Cultural Traditions" },
              { number: "22+", label: "Official Languages" },
              { number: "5000+", label: "Years of History" }
            ].map((stat, index) => (
              <motion.div 
                key={index}
                variants={fadeIn("up", 0.5 + index * 0.1)}
                className="glass-panel p-4 rounded-lg bg-white/10 backdrop-blur-md border border-white/20"
                whileHover={{ y: -5, transition: { duration: 0.2 } }}
              >
                <h3 className="text-3xl font-medium text-spice-400 mb-1">{stat.number}</h3>
                <p className="text-sm text-white/80">{stat.label}</p>
              </motion.div>
            ))}
          </motion.div>
        </motion.div>
      </motion.div>
      
      {/* Scroll Indicator */}
      <motion.div 
        className="absolute bottom-10 left-1/2 transform -translate-x-1/2 flex flex-col items-center"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.6, delay: 1 }}
      >
        <div className="w-[30px] h-[50px] rounded-full border-2 border-spice-400 mb-2 flex justify-center">
          <motion.div 
            className="w-1.5 h-3 bg-spice-400 rounded-full mt-2"
            animate={{ y: [0, 15, 0] }}
            transition={{ repeat: Infinity, duration: 1.5, ease: "easeInOut" }}
          ></motion.div>
        </div>
        <p className="text-xs uppercase tracking-widest text-white/80 font-light">Scroll Down</p>
      </motion.div>
    </section>
  );
};

export default Hero;

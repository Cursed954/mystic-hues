
import React from 'react';
import { ArrowRight } from 'lucide-react';
import ParallaxSection from '../ui/ParallaxSection';
import { motion } from 'framer-motion';

const Hero: React.FC = () => {
  return (
    <section id="home" className="relative min-h-screen flex items-center overflow-hidden">
      {/* Background Image with Parallax */}
      <ParallaxSection speed={0.15} className="absolute inset-0 z-0">
        <div className="absolute inset-0 bg-gradient-to-b from-black/30 via-transparent to-background z-10"></div>
        <img
          src="https://images.unsplash.com/photo-1524413840807-0c3cb6fa808d?q=80&w=2070"
          alt="Majestic Indian temple with ornate architecture at sunset"
          className="w-full h-full object-cover"
        />
      </ParallaxSection>

      {/* Abstract Pattern Overlay */}
      <div className="absolute inset-0 bg-repeat opacity-10 z-[1]" 
           style={{ backgroundImage: 'url("https://www.transparenttextures.com/patterns/cubes.png")' }}>
      </div>

      {/* Content */}
      <div className="container mx-auto px-6 z-10 mt-16 relative">
        <div className="max-w-3xl">
          <motion.p 
            className="subtitle mb-3"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
          >
            Experience the timeless spirit of India
          </motion.p>
          
          <motion.h1 
            className="text-4xl md:text-5xl lg:text-6xl font-serif font-medium leading-tight mb-6"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            Journey Through India's <span className="text-spice-500">Rich</span> Cultural Heritage
          </motion.h1>
          
          <motion.p 
            className="text-lg text-foreground/80 mb-8 max-w-2xl"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
          >
            Explore the vibrant tapestry of traditions, art forms, and cuisines that make up India's diverse cultural landscape, from ancient temples to living traditions passed down through generations.
          </motion.p>
          
          <motion.div 
            className="flex flex-wrap gap-4"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
          >
            <a href="#states" className="btn-primary flex items-center">
              Explore States <ArrowRight size={16} className="ml-2" />
            </a>
            <a href="#about" className="btn-outline">
              Learn More
            </a>
          </motion.div>
          
          {/* Stats */}
          <motion.div 
            className="mt-16 grid grid-cols-2 md:grid-cols-4 gap-6"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.5 }}
          >
            <div className="glass-panel p-4 rounded-lg">
              <h3 className="text-3xl font-medium text-spice-500 mb-1">28+</h3>
              <p className="text-sm text-foreground/70">States</p>
            </div>
            <div className="glass-panel p-4 rounded-lg">
              <h3 className="text-3xl font-medium text-spice-500 mb-1">1000+</h3>
              <p className="text-sm text-foreground/70">Cultural Traditions</p>
            </div>
            <div className="glass-panel p-4 rounded-lg">
              <h3 className="text-3xl font-medium text-spice-500 mb-1">22+</h3>
              <p className="text-sm text-foreground/70">Official Languages</p>
            </div>
            <div className="glass-panel p-4 rounded-lg">
              <h3 className="text-3xl font-medium text-spice-500 mb-1">5000+</h3>
              <p className="text-sm text-foreground/70">Years of History</p>
            </div>
          </motion.div>
        </div>
      </div>
      
      {/* Scroll Indicator */}
      <motion.div 
        className="absolute bottom-10 left-1/2 transform -translate-x-1/2 flex flex-col items-center"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.6, delay: 0.7 }}
      >
        <div className="w-[30px] h-[50px] rounded-full border-2 border-spice-500 mb-2 flex justify-center">
          <motion.div 
            className="w-1.5 h-3 bg-spice-500 rounded-full mt-2"
            animate={{ y: [0, 15, 0] }}
            transition={{ repeat: Infinity, duration: 1.5, ease: "easeInOut" }}
          ></motion.div>
        </div>
        <p className="text-xs uppercase tracking-widest text-foreground/70">Scroll Down</p>
      </motion.div>
    </section>
  );
};

export default Hero;

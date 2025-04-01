
import React from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { staggerContainer } from '@/lib/animations';
import { ArrowRight } from 'lucide-react';

const Hero = () => {
  const navigate = useNavigate();

  return (
    <section className="min-h-screen flex items-center justify-center px-4 relative">
      {/* Background Elements */}
      <div className="absolute inset-0 overflow-hidden -z-10">
        <div className="absolute top-1/4 right-1/4 w-96 h-96 bg-spice-500/20 rounded-full filter blur-3xl opacity-20 animate-pulse-slow" />
        <div className="absolute bottom-1/4 left-1/4 w-96 h-96 bg-indigo-500/20 rounded-full filter blur-3xl opacity-20 animate-float" />
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-full h-full bg-[url('/src/assets/india-map-outline.svg')] bg-no-repeat bg-center opacity-5" />
      </div>

      <div className="container mx-auto">
        <motion.div 
          variants={staggerContainer}
          initial="hidden"
          animate="show"
          className="flex flex-col md:flex-row items-center gap-12 md:gap-20"
        >
          {/* Hero Content */}
          <motion.div 
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="flex-1 text-center md:text-left"
          >
            <h1 className="text-5xl md:text-7xl font-bold mb-6 leading-tight">
              Discover the <span className="text-transparent bg-clip-text bg-gradient-to-r from-spice-500 to-spice-600">Magic</span> of India
            </h1>
            
            <p className="text-lg md:text-xl text-gray-600 dark:text-gray-300 mb-8 max-w-xl leading-relaxed">
              Embark on a virtual journey through India's vibrant culture, stunning landscapes, and ancient traditions.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4 justify-center md:justify-start">
              <motion.button
                whileHover={{ scale: 1.03 }}
                whileTap={{ scale: 0.98 }}
                className="group relative px-8 py-4 bg-spice-500 hover:bg-spice-600 text-white rounded-full font-semibold text-lg flex items-center justify-center overflow-hidden transition-all duration-300 shadow-lg shadow-spice-500/20"
                onClick={() => navigate('/signup')}
                initial={{ boxShadow: '0 10px 15px -3px rgba(239, 68, 68, 0.1), 0 4px 6px -2px rgba(239, 68, 68, 0.05)' }}
                key="signup-button" // Add a key to force re-rendering
              >
                <span className="relative z-10 flex items-center">
                  Sign up for free
                  <ArrowRight className="ml-2 h-5 w-5 transition-transform group-hover:translate-x-1" />
                </span>
                <div className="absolute inset-0 bg-gradient-to-r from-spice-600 to-spice-500 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
              </motion.button>
              
              <motion.button
                whileHover={{ scale: 1.03 }}
                whileTap={{ scale: 0.98 }}
                className="px-8 py-4 border-2 border-spice-500 dark:border-spice-400 hover:bg-spice-500/10 text-spice-500 dark:text-spice-400 rounded-full font-semibold text-lg transition-all duration-300"
                onClick={() => document.getElementById('about')?.scrollIntoView({ behavior: 'smooth' })}
                key="learn-more-button" // Add a key to force re-rendering
              >
                Learn more
              </motion.button>
            </div>
          </motion.div>
          
          {/* Hero Image */}
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="flex-1 relative w-full max-w-lg"
          >
            <div className="relative w-full aspect-square">
              {/* Main Hero Image */}
              <img 
                src="/images/hero-image.jpg" 
                alt="Traditional Indian Architecture" 
                className="rounded-2xl object-cover shadow-2xl shadow-spice-500/10 w-full h-full"
              />
              
              {/* Decorative Elements */}
              <div className="absolute -bottom-6 -right-6 w-40 h-40 bg-indigo-500/10 rounded-full"></div>
              <div className="absolute -top-6 -left-6 w-24 h-24 bg-spice-500/10 rounded-full"></div>
              
              {/* Floating Elements */}
              <motion.div 
                className="absolute -top-8 right-10 p-2 bg-white/90 dark:bg-gray-900/90 rounded-xl shadow-lg"
                animate={{ y: [0, -10, 0] }}
                transition={{ duration: 4, repeat: Infinity, repeatType: "reverse" }}
              >
                <img src="/images/taj-mahal-icon.png" alt="Taj Mahal" className="w-10 h-10" />
              </motion.div>
              
              <motion.div 
                className="absolute -bottom-4 left-10 p-2 bg-white/90 dark:bg-gray-900/90 rounded-xl shadow-lg"
                animate={{ y: [0, 10, 0] }}
                transition={{ duration: 5, repeat: Infinity, repeatType: "reverse", delay: 1 }}
              >
                <img src="/images/india-food-icon.png" alt="Indian Cuisine" className="w-10 h-10" />
              </motion.div>
            </div>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
};

export default Hero;


import React, { useEffect, useState } from 'react';
import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';
import Hero from '@/components/sections/Hero';
import About from '@/components/sections/About';
import Gallery from '@/components/sections/Gallery';
import Experience from '@/components/sections/Experience';
import Contact from '@/components/sections/Contact';
import States from '@/components/sections/States';
import Cuisine from '@/components/sections/Cuisine';
import Reviews from '@/components/sections/Reviews';
import { useTheme } from '@/components/theme/ThemeProvider';
import useMobile from '@/hooks/use-mobile';
import { HomeStarsCanvas } from '@/components/ui/StarBackground';

const Index = () => {
  const { theme, themeLoaded } = useTheme();
  const isMobile = useMobile();
  const [pageLoaded, setPageLoaded] = useState(false);
  
  useEffect(() => {
    // Priority loading for homepage - set highest priority for FCP
    document.documentElement.setAttribute('data-priority', 'high');
    
    // Mark page as loaded after a short delay to ensure animations start properly
    const timer = setTimeout(() => setPageLoaded(true), 100);
    
    // Smooth scroll to hash on page load
    if (window.location.hash) {
      const element = document.querySelector(window.location.hash);
      if (element) {
        setTimeout(() => {
          element.scrollIntoView({ behavior: 'smooth' });
        }, 300); // Increased timeout to ensure page is fully loaded
      }
    }
    
    // Disable overscroll on mobile
    if (isMobile) {
      document.body.classList.add('overflow-hidden');
      return () => {
        document.body.classList.remove('overflow-hidden');
        document.documentElement.removeAttribute('data-priority');
        clearTimeout(timer);
      };
    }
    
    return () => {
      document.documentElement.removeAttribute('data-priority');
      clearTimeout(timer);
    };
  }, [isMobile]);

  // Show a loading state until both theme and page are ready
  if (!themeLoaded || !pageLoaded) {
    return (
      <div className="fixed inset-0 flex items-center justify-center bg-background">
        <div className="flex flex-col items-center space-y-4">
          <div className="w-12 h-12 rounded-full border-4 border-primary border-t-transparent animate-spin"></div>
          <p className="text-foreground/80">Loading experience...</p>
        </div>
      </div>
    );
  }

  return (
    <div className={`min-h-screen relative w-full ${isMobile ? 'mobile-view' : ''}`}>
      {/* Display stars for both themes with different densities */}
      <HomeStarsCanvas />
      
      {/* Abstract colored overlays for visual interest */}
      {theme === 'light' && (
        <>
          <div className="fixed top-0 right-0 w-96 h-96 bg-spice-100 rounded-full filter blur-3xl opacity-30 -translate-y-1/2 translate-x-1/2 z-[0]"></div>
          <div className="fixed bottom-0 left-0 w-96 h-96 bg-indigo-200 rounded-full filter blur-3xl opacity-30 translate-y-1/2 -translate-x-1/2 z-[0]"></div>
        </>
      )}
      
      {/* Dark mode accent elements */}
      {theme === 'dark' && (
        <>
          <div className="fixed top-1/4 right-1/4 w-96 h-96 bg-purple-900 rounded-full filter blur-3xl opacity-10 z-[0]"></div>
          <div className="fixed bottom-1/4 left-1/4 w-96 h-96 bg-blue-900 rounded-full filter blur-3xl opacity-10 z-[0]"></div>
        </>
      )}
      
      <Navbar />
      <main className={`relative z-[1] ${isMobile ? "mobile-snap-container hardware-accelerated" : ""}`}>
        <div className={isMobile ? "mobile-snap-item" : ""}>
          <Hero />
        </div>
        
        {/* Add translucent background layer to content sections */}
        <div className="relative">
          <div className="absolute inset-0 bg-white/70 dark:bg-black/50 backdrop-blur-sm z-0"></div>
          <div className="relative z-10">
            <div className={isMobile ? "mobile-snap-item" : ""}>
              <About />
            </div>
            <div className={isMobile ? "mobile-snap-item" : ""}>
              <States />
            </div>
            <div className={isMobile ? "mobile-snap-item" : ""}>
              <Gallery />
            </div>
            <div className={isMobile ? "mobile-snap-item" : ""}>
              <Cuisine />
            </div>
            <div className={isMobile ? "mobile-snap-item" : ""}>
              <Experience />
            </div>
            <div className={isMobile ? "mobile-snap-item" : ""}>
              <Reviews />
            </div>
            <div className={isMobile ? "mobile-snap-item" : ""}>
              <Contact />
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default Index;

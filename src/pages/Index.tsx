
import React, { useEffect } from 'react';
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

const Index = () => {
  const { theme } = useTheme();
  const isMobile = useMobile();
  
  useEffect(() => {
    // Smooth scroll to hash on page load
    if (window.location.hash) {
      const element = document.querySelector(window.location.hash);
      if (element) {
        setTimeout(() => {
          element.scrollIntoView({ behavior: 'smooth' });
        }, 100);
      }
    }
  }, []);

  return (
    <div className={`min-h-screen relative ${isMobile ? 'mobile-view' : ''}`}>
      {/* Abstract backgrounds for light mode only */}
      {theme === 'light' && (
        <>
          <div className="fixed top-0 right-0 w-96 h-96 bg-spice-100 rounded-full filter blur-3xl opacity-20 -translate-y-1/2 translate-x-1/2 z-[-1]"></div>
          <div className="fixed bottom-0 left-0 w-96 h-96 bg-indigo-200 rounded-full filter blur-3xl opacity-20 translate-y-1/2 -translate-x-1/2 z-[-1]"></div>
          <div className="fixed inset-0 z-[-1] opacity-10 pointer-events-none" style={{backgroundImage: 'url("https://images.unsplash.com/photo-1552083974-186346191183?w=800&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTl8fGFic3RyYWN0fGVufDB8fDB8fHww")'}}></div>
        </>
      )}
      
      {/* Dark mode accent elements */}
      {theme === 'dark' && (
        <>
          <div className="fixed top-1/4 right-1/4 w-96 h-96 bg-purple-900 rounded-full filter blur-3xl opacity-10 z-[-1]"></div>
          <div className="fixed bottom-1/4 left-1/4 w-96 h-96 bg-blue-900 rounded-full filter blur-3xl opacity-10 z-[-1]"></div>
        </>
      )}
      
      <Navbar />
      <main>
        <Hero />
        {/* Add translucent background layer to content sections */}
        <div className="relative">
          <div className="absolute inset-0 bg-white/70 dark:bg-black/50 backdrop-blur-sm"></div>
          <div className="relative z-10">
            <About />
            <States />
            <Gallery />
            <Cuisine />
            <Experience />
            <Reviews />
            <Contact />
          </div>
        </div>
      </main>
      <Footer />

      {/* Add custom CSS for mobile view */}
      <style dangerouslySetInnerHTML={{
        __html: `
        @media (max-width: 768px) {
          .mobile-view section {
            scroll-snap-align: start;
            min-height: 100vh;
            display: flex;
            flex-direction: column;
            justify-content: center;
          }
          
          .mobile-view main {
            scroll-snap-type: y mandatory;
            overflow-y: scroll;
            height: calc(100vh - 64px); /* Adjust based on your navbar height */
          }
        }
        
        .scrollbar-hide::-webkit-scrollbar {
          display: none;
        }
        
        .scrollbar-hide {
          -ms-overflow-style: none;
          scrollbar-width: none;
        }
      `}} />
    </div>
  );
};

export default Index;

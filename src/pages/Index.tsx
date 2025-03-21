
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

const Index = () => {
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
    
    // Add abstract pattern to the background
    const pattern = document.createElement('div');
    pattern.className = 'fixed inset-0 z-[-1] opacity-10 pointer-events-none';
    pattern.style.backgroundImage = 'url("https://www.transparenttextures.com/patterns/binding-dark.png")';
    document.body.appendChild(pattern);
    
    return () => {
      document.body.removeChild(pattern);
    };
  }, []);

  return (
    <div className="min-h-screen relative overflow-hidden">
      {/* Abstract patterns */}
      <div className="fixed top-0 right-0 w-96 h-96 bg-spice-100 rounded-full filter blur-3xl opacity-20 -translate-y-1/2 translate-x-1/2 z-[-1]"></div>
      <div className="fixed bottom-0 left-0 w-96 h-96 bg-indigo-200 rounded-full filter blur-3xl opacity-20 translate-y-1/2 -translate-x-1/2 z-[-1]"></div>
      
      <Navbar />
      <main>
        <Hero />
        <About />
        <States />
        <Gallery />
        <Cuisine />
        <Experience />
        <Reviews />
        <Contact />
      </main>
      <Footer />
    </div>
  );
};

export default Index;

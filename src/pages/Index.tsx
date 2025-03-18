
import React, { useEffect } from 'react';
import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';
import Hero from '@/components/sections/Hero';
import About from '@/components/sections/About';
import Gallery from '@/components/sections/Gallery';
import Experience from '@/components/sections/Experience';
import Contact from '@/components/sections/Contact';
import States from '@/components/sections/States';
import VirtualTours from '@/components/sections/VirtualTours';
import Cuisine from '@/components/sections/Cuisine';
import Reviews from '@/components/sections/Reviews';

const Index = () => {
  useEffect(() => {
    // Smooth scroll to hash on page load
    if (window.location.hash) {
      const element = document.querySelector(window.location.hash);
      if (element) {
        element.scrollIntoView({ behavior: 'smooth' });
      }
    }
  }, []);

  return (
    <div className="min-h-screen">
      <Navbar />
      <main>
        <Hero />
        <About />
        <States />
        <VirtualTours />
        <Cuisine />
        <Gallery />
        <Experience />
        <Reviews />
        <Contact />
      </main>
      <Footer />
    </div>
  );
};

export default Index;

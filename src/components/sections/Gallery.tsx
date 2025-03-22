
import React, { useState } from 'react';
import ScrollReveal from '../ui/ScrollReveal';
import { ChevronLeft, ChevronRight, X, Download } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { useTheme } from '../theme/ThemeProvider';

type ImageType = {
  id: number;
  url: string;
  alt: string;
  location: string;
};

const Gallery: React.FC = () => {
  const [selectedImage, setSelectedImage] = useState<ImageType | null>(null);
  const { theme } = useTheme();

  const images: ImageType[] = [
    {
      id: 1,
      url: "https://images.unsplash.com/photo-1524413840807-0c3cb6fa808d",
      alt: "Ancient Indian temple with intricate carvings",
      location: "Karnataka",
    },
    {
      id: 2,
      url: "https://images.unsplash.com/photo-1564507592333-c60657eea523",
      alt: "Colorful Holi festival celebration",
      location: "Uttar Pradesh",
    },
    {
      id: 3,
      url: "https://images.unsplash.com/photo-1566552881560-0be862a7c445",
      alt: "Traditional Kathakali dancer with elaborate makeup",
      location: "Kerala",
    },
    {
      id: 4,
      url: "https://images.unsplash.com/photo-1561361398-a8cb5b48162e",
      alt: "Majestic Taj Mahal at sunrise",
      location: "Agra",
    },
    {
      id: 5,
      url: "https://images.unsplash.com/photo-1582510144528-add4a68470d5",
      alt: "Traditional Indian wedding ceremony",
      location: "Rajasthan",
    },
    {
      id: 6,
      url: "https://images.unsplash.com/photo-1567591414240-e9c1adcd3049",
      alt: "Boat riding through Kerala's backwaters",
      location: "Kerala",
    },
  ];

  const locationColor = theme === 'dark' ? "#53a6ff" : "#ff7e11";

  const openLightbox = (image: ImageType) => {
    setSelectedImage(image);
    document.body.style.overflow = 'hidden';
  };

  const closeLightbox = () => {
    setSelectedImage(null);
    document.body.style.overflow = 'auto';
  };

  const navigateImage = (direction: 'next' | 'prev') => {
    if (!selectedImage) return;
    
    const currentIndex = images.findIndex(img => img.id === selectedImage.id);
    let newIndex;
    
    if (direction === 'next') {
      newIndex = (currentIndex + 1) % images.length;
    } else {
      newIndex = (currentIndex - 1 + images.length) % images.length;
    }
    
    setSelectedImage(images[newIndex]);
  };

  const downloadImage = (url: string, filename: string) => {
    const link = document.createElement('a');
    link.href = url;
    link.download = `mystic-india-${filename.toLowerCase().replace(/\s+/g, '-')}.jpg`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <section id="gallery" className="py-24 px-6 section-gallery relative overflow-hidden">
      {/* Abstract backgrounds */}
      {theme === 'light' && (
        <>
          <div className="absolute top-0 right-0 w-96 h-96 rounded-full bg-spice-100 filter blur-3xl opacity-30 z-0"></div>
          <div className="absolute bottom-0 left-0 w-96 h-96 rounded-full bg-indigo-100 filter blur-3xl opacity-30 z-0"></div>
        </>
      )}
      
      {theme === 'dark' && (
        <>
          <div className="absolute top-0 right-0 w-96 h-96 rounded-full bg-purple-900/30 filter blur-3xl opacity-30 z-0"></div>
          <div className="absolute bottom-0 left-0 w-96 h-96 rounded-full bg-blue-900/30 filter blur-3xl opacity-30 z-0"></div>
        </>
      )}
      
      <div className="container mx-auto relative z-10">
        {/* Section Header */}
        <ScrollReveal>
          <div className="text-center mb-16">
            <p className="subtitle mb-3">Visual Stories</p>
            <h2 className="section-title after:left-1/2 after:-translate-x-1/2">Capturing India's Essence</h2>
          </div>
        </ScrollReveal>

        {/* Gallery Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 md:gap-6">
          {images.map((image, index) => (
            <ScrollReveal key={image.id} delay={(index % 3) * 0.1} className="h-full">
              <motion.div 
                className={`image-card h-full ${theme === 'dark' ? 'gallery-card' : 'bg-white shadow-sm'} rounded-lg overflow-hidden cursor-pointer`}
                onClick={() => openLightbox(image)}
                whileHover={{ y: -5, scale: 1.02, transition: { duration: 0.2 } }}
              >
                <div className="relative h-64 overflow-hidden">
                  <img 
                    src={image.url} 
                    alt={image.alt} 
                    className="w-full h-full object-cover transition-transform duration-700 hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 hover:opacity-100 transition-opacity flex items-end p-4">
                    <span className="text-white font-medium">{image.location}</span>
                  </div>
                </div>
                <div className="p-4">
                  <span className="text-xs uppercase tracking-wider font-medium" style={{ color: locationColor }}>
                    {image.location}
                  </span>
                  <h3 className="text-lg font-medium mt-1">{image.alt}</h3>
                </div>
              </motion.div>
            </ScrollReveal>
          ))}
        </div>

        {/* Lightbox */}
        <AnimatePresence>
          {selectedImage && (
            <motion.div 
              className="fixed inset-0 bg-black/90 z-50 flex items-center justify-center p-4"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
            >
              <button 
                className="absolute top-5 right-5 text-white hover:text-pink-500 transition-colors"
                onClick={closeLightbox}
              >
                <X size={32} />
              </button>
              
              <button 
                className="absolute left-5 top-1/2 -translate-y-1/2 w-12 h-12 rounded-full bg-white/10 hover:bg-white/20 flex items-center justify-center transition-colors text-white"
                onClick={() => navigateImage('prev')}
              >
                <ChevronLeft size={24} />
              </button>
              
              <motion.div 
                className="max-w-4xl max-h-full"
                initial={{ scale: 0.9, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                transition={{ type: "spring", damping: 25 }}
              >
                <img 
                  src={selectedImage.url} 
                  alt={selectedImage.alt} 
                  className="max-w-full max-h-[80vh] object-contain"
                />
                <div className="mt-4 text-white flex justify-between items-center">
                  <div className="text-left">
                    <h3 className="text-xl font-medium">{selectedImage.alt}</h3>
                    <p className="text-white/70 mt-1">{selectedImage.location}</p>
                  </div>
                  <motion.button 
                    className={`px-4 py-2 rounded-md flex items-center transition-colors ${theme === 'dark' ? 'bg-gradient-to-r from-purple-600 to-pink-500 hover:from-purple-700 hover:to-pink-600' : 'bg-spice-500 hover:bg-spice-600'}`}
                    onClick={() => downloadImage(selectedImage.url, selectedImage.alt)}
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    <Download size={16} className="mr-2" />
                    Download
                  </motion.button>
                </div>
              </motion.div>
              
              <button 
                className="absolute right-5 top-1/2 -translate-y-1/2 w-12 h-12 rounded-full bg-white/10 hover:bg-white/20 flex items-center justify-center transition-colors text-white"
                onClick={() => navigateImage('next')}
              >
                <ChevronRight size={24} />
              </button>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </section>
  );
};

export default Gallery;


import React, { useState } from 'react';
import ScrollReveal from '../ui/ScrollReveal';
import { ChevronLeft, ChevronRight, X } from 'lucide-react';

type ImageType = {
  id: number;
  url: string;
  alt: string;
  location: string;
};

const Gallery: React.FC = () => {
  const [selectedImage, setSelectedImage] = useState<ImageType | null>(null);

  const images: ImageType[] = [
    {
      id: 1,
      url: "https://images.unsplash.com/photo-1506744038136-46273834b3fb",
      alt: "Serene landscape with mountains and river",
      location: "Himalayas",
    },
    {
      id: 2,
      url: "https://images.unsplash.com/photo-1465146344425-f00d5f5c8f07",
      alt: "Vibrant orange marigold flowers",
      location: "Rajasthan",
    },
    {
      id: 3,
      url: "https://images.unsplash.com/photo-1482938289607-e9573fc25ebb",
      alt: "Mountain river landscape",
      location: "Kashmir",
    },
    {
      id: 4,
      url: "https://images.unsplash.com/photo-1470071459604-3b5ec3a7fe05",
      alt: "Misty mountain peaks",
      location: "Uttarakhand",
    },
    {
      id: 5,
      url: "https://images.unsplash.com/photo-1466442929976-97f336a657be",
      alt: "Ancient temple architecture",
      location: "Tamil Nadu",
    },
    {
      id: 6,
      url: "https://images.unsplash.com/photo-1472396961693-142e6e269027",
      alt: "Wildlife in natural habitat",
      location: "National Park",
    },
  ];

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

  return (
    <section id="gallery" className="py-24 px-6 bg-mystic-50">
      <div className="container mx-auto">
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
            <ScrollReveal key={image.id} delay={(index % 3) * 100} className="h-full">
              <div 
                className="image-card h-full bg-white shadow-sm rounded-lg overflow-hidden cursor-pointer"
                onClick={() => openLightbox(image)}
              >
                <div className="relative h-64 overflow-hidden">
                  <img 
                    src={image.url} 
                    alt={image.alt} 
                    className="w-full h-full object-cover"
                  />
                </div>
                <div className="p-4">
                  <span className="text-xs uppercase tracking-wider text-spice-500 font-medium">
                    {image.location}
                  </span>
                  <h3 className="text-lg font-medium mt-1">{image.alt}</h3>
                </div>
              </div>
            </ScrollReveal>
          ))}
        </div>

        {/* Lightbox */}
        {selectedImage && (
          <div className="fixed inset-0 bg-black/90 z-50 flex items-center justify-center p-4">
            <button 
              className="absolute top-5 right-5 text-white hover:text-spice-500 transition-colors"
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
            
            <div className="max-w-4xl max-h-full">
              <img 
                src={selectedImage.url} 
                alt={selectedImage.alt} 
                className="max-w-full max-h-[80vh] object-contain"
              />
              <div className="mt-4 text-white text-center">
                <h3 className="text-xl font-medium">{selectedImage.alt}</h3>
                <p className="text-white/70 mt-1">{selectedImage.location}</p>
              </div>
            </div>
            
            <button 
              className="absolute right-5 top-1/2 -translate-y-1/2 w-12 h-12 rounded-full bg-white/10 hover:bg-white/20 flex items-center justify-center transition-colors text-white"
              onClick={() => navigateImage('next')}
            >
              <ChevronRight size={24} />
            </button>
          </div>
        )}
      </div>
    </section>
  );
};

export default Gallery;

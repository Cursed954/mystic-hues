
import React, { useState, useEffect } from 'react';
import { MapPin, Users, Compass, Clock } from 'lucide-react';
import ScrollReveal from '../ui/ScrollReveal';
import SectionHeader from '../ui/SectionHeader';
import { motion, AnimatePresence } from 'framer-motion';

// Cultural images from the Culture page
const culturalImages = [
  "https://images.unsplash.com/photo-1576487236230-eaa4afe68192?q=80&w=1170",
  "https://images.unsplash.com/photo-1594026112334-d8040bd05749?q=80&w=1170",
  "https://images.unsplash.com/photo-1540122995631-7c74c46c0b8f?q=80&w=1170",
  "https://images.unsplash.com/photo-1584806749948-697891c67821?q=80&w=1170",
  "https://images.unsplash.com/photo-1594815101424-0c644c8c63c6?q=80&w=1170",
  "https://images.unsplash.com/photo-1599661046289-e31897d36a68?q=80&w=1170"
];

const FeatureItem: React.FC<{
  icon: React.ReactNode;
  title: string;
  description: string;
  delay?: number;
}> = ({ icon, title, description, delay = 0 }) => (
  <ScrollReveal animation="fade-in-left" delay={delay}>
    <motion.div 
      className="flex items-start"
      whileHover={{ x: 5 }}
      transition={{ type: "spring", stiffness: 400, damping: 10 }}
    >
      <div className="w-12 h-12 rounded-full bg-spice-50 flex items-center justify-center mr-4 shrink-0">
        {icon}
      </div>
      <div>
        <h4 className="font-medium mb-2">{title}</h4>
        <p className="text-sm text-foreground/70">{description}</p>
      </div>
    </motion.div>
  </ScrollReveal>
);

const About: React.FC = () => {
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  useEffect(() => {
    // Change image every 5 seconds
    const interval = setInterval(() => {
      setCurrentImageIndex(prevIndex => 
        prevIndex === culturalImages.length - 1 ? 0 : prevIndex + 1
      );
    }, 5000);

    return () => clearInterval(interval);
  }, []);

  return (
    <section id="about" className="py-24 px-6">
      <div className="container mx-auto">
        {/* Section Header */}
        <SectionHeader 
          subtitle="Our Story"
          title="The Mystic India Journey"
        />

        {/* Main Content */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          {/* Left Column - Image Carousel */}
          <ScrollReveal animation="fade-in-right">
            <div className="relative">
              <div className="relative z-10 overflow-hidden rounded-lg shadow-xl h-[500px]">
                <AnimatePresence mode="wait">
                  <motion.img 
                    key={currentImageIndex}
                    src={culturalImages[currentImageIndex]} 
                    alt="Cultural heritage of India" 
                    className="w-full h-full object-cover"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 0.5 }}
                  />
                </AnimatePresence>
                
                <motion.div 
                  className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent"
                  initial={{ opacity: 0 }}
                  whileHover={{ opacity: 1 }}
                  transition={{ duration: 0.3 }}
                >
                  <div className="absolute bottom-6 left-6 text-white">
                    <h3 className="font-serif text-2xl mb-2">Discover India</h3>
                    <p className="text-white/80 text-sm max-w-xs">
                      From ancient temples to bustling markets, experience the true essence of India
                    </p>
                  </div>
                </motion.div>
              </div>
              
              <motion.div 
                className="absolute top-10 -right-6 w-24 h-24 bg-spice-500/20 rounded-full backdrop-blur-sm z-0"
                animate={{ scale: [1, 1.2, 1] }}
                transition={{ duration: 3, repeat: Infinity }}
              />
              <motion.div 
                className="absolute -bottom-6 -left-6 w-32 h-32 bg-indigo-500/10 rounded-full backdrop-blur-sm z-0"
                animate={{ scale: [1, 1.3, 1] }}
                transition={{ duration: 4, repeat: Infinity, delay: 1 }}
              />
            </div>
          </ScrollReveal>

          {/* Right Column - Text */}
          <div className="space-y-8">
            <ScrollReveal animation="fade-in-left" delay={100}>
              <h3 className="text-2xl font-serif font-medium mb-4">
                Unveiling India's Rich Tapestry of Cultures and Landscapes
              </h3>
              <p className="text-foreground/80 leading-relaxed mb-6">
                Founded in 2016, Mystic India was born from a passion to share the authentic essence of India with the world. 
                We believe travel should be transformative, connecting you with the soul of a place through its people, traditions, and natural beauty.
              </p>
              <p className="text-foreground/80 leading-relaxed">
                Our journeys are carefully crafted to balance iconic landmarks with hidden gems, allowing you to experience both the grandeur and intimate charm 
                of India's diverse regions. From the snow-capped Himalayas to the serene backwaters of Kerala, from bustling Delhi bazaars to tranquil temple towns, 
                we reveal the many hues that make India an extraordinary destination.
              </p>
            </ScrollReveal>

            {/* Features */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 mt-8">
              <FeatureItem 
                icon={<MapPin className="text-spice-500" size={22} />}
                title="Curated Destinations"
                description="Handpicked locations that showcase India's diversity"
                delay={200}
              />
              
              <FeatureItem 
                icon={<Users className="text-spice-500" size={22} />}
                title="Local Experiences"
                description="Connect with communities and traditional cultures"
                delay={300}
              />
              
              <FeatureItem 
                icon={<Compass className="text-spice-500" size={22} />}
                title="Expert Guidance"
                description="Knowledgeable guides who bring stories to life"
                delay={400}
              />
              
              <FeatureItem 
                icon={<Clock className="text-spice-500" size={22} />}
                title="Mindful Travel"
                description="Sustainable practices that respect people and places"
                delay={500}
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default About;


import React from 'react';
import ScrollReveal from '../ui/ScrollReveal';
import { MapPin, Users, Compass, Clock } from 'lucide-react';

const About: React.FC = () => {
  return (
    <section id="about" className="py-24 px-6">
      <div className="container mx-auto">
        {/* Section Header */}
        <ScrollReveal>
          <div className="text-center mb-16">
            <p className="subtitle mb-3">Our Story</p>
            <h2 className="section-title after:left-1/2 after:-translate-x-1/2">The Mystic Hues Journey</h2>
          </div>
        </ScrollReveal>

        {/* Main Content */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          {/* Left Column - Image */}
          <ScrollReveal animation="fade-in-right">
            <div className="relative">
              <div className="relative z-10 overflow-hidden rounded-lg shadow-xl">
                <img 
                  src="https://images.unsplash.com/photo-1470071459604-3b5ec3a7fe05" 
                  alt="Mystical mountain landscape in India" 
                  className="w-full h-[500px] object-cover"
                />
              </div>
              <div className="absolute top-10 -right-6 w-24 h-24 bg-spice-500/20 rounded-full backdrop-blur-sm z-0"></div>
              <div className="absolute -bottom-6 -left-6 w-32 h-32 bg-indigo-500/10 rounded-full backdrop-blur-sm z-0"></div>
            </div>
          </ScrollReveal>

          {/* Right Column - Text */}
          <div className="space-y-8">
            <ScrollReveal animation="fade-in-left" delay={100}>
              <h3 className="text-2xl font-serif font-medium mb-4">
                Unveiling India's Rich Tapestry of Cultures and Landscapes
              </h3>
              <p className="text-foreground/80 leading-relaxed mb-6">
                Founded in 2016, Mystic Hues was born from a passion to share the authentic essence of India with the world. 
                We believe travel should be transformative, connecting you with the soul of a place through its people, traditions, and natural beauty.
              </p>
              <p className="text-foreground/80 leading-relaxed">
                Our journeys are carefully crafted to balance iconic landmarks with hidden gems, allowing you to experience both the grandeur and intimate charm 
                of India's diverse regions. From the snow-capped Himalayas to the serene backwaters of Kerala, from bustling Delhi bazaars to tranquil temple towns, 
                we reveal the many hues that make India an extraordinary destination.
              </p>
            </ScrollReveal>

            {/* Features */}
            <ScrollReveal animation="fade-in-left" delay={200}>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 mt-8">
                <div className="flex items-start">
                  <div className="w-12 h-12 rounded-full bg-spice-50 flex items-center justify-center mr-4 shrink-0">
                    <MapPin className="text-spice-500" size={22} />
                  </div>
                  <div>
                    <h4 className="font-medium mb-2">Curated Destinations</h4>
                    <p className="text-sm text-foreground/70">Handpicked locations that showcase India's diversity</p>
                  </div>
                </div>
                
                <div className="flex items-start">
                  <div className="w-12 h-12 rounded-full bg-spice-50 flex items-center justify-center mr-4 shrink-0">
                    <Users className="text-spice-500" size={22} />
                  </div>
                  <div>
                    <h4 className="font-medium mb-2">Local Experiences</h4>
                    <p className="text-sm text-foreground/70">Connect with communities and traditional cultures</p>
                  </div>
                </div>
                
                <div className="flex items-start">
                  <div className="w-12 h-12 rounded-full bg-spice-50 flex items-center justify-center mr-4 shrink-0">
                    <Compass className="text-spice-500" size={22} />
                  </div>
                  <div>
                    <h4 className="font-medium mb-2">Expert Guidance</h4>
                    <p className="text-sm text-foreground/70">Knowledgeable guides who bring stories to life</p>
                  </div>
                </div>
                
                <div className="flex items-start">
                  <div className="w-12 h-12 rounded-full bg-spice-50 flex items-center justify-center mr-4 shrink-0">
                    <Clock className="text-spice-500" size={22} />
                  </div>
                  <div>
                    <h4 className="font-medium mb-2">Mindful Travel</h4>
                    <p className="text-sm text-foreground/70">Sustainable practices that respect people and places</p>
                  </div>
                </div>
              </div>
            </ScrollReveal>
          </div>
        </div>
      </div>
    </section>
  );
};

export default About;
